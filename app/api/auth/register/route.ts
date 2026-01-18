import { hashPassword, getUserByEmail, createJWT } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();
        if(!email || !password || !name){
            return NextResponse.json({ message: 'Name, email and password are required' }, { status: 400 });
        }
        const user = await getUserByEmail(email);
        if(user){
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const token = createJWT(newUser.id);
        return NextResponse.json({ token, success: true }, {
            status: 201,
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
            }
        });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}