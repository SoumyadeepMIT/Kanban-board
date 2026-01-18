import { createJWT, getUserByEmail, verifyPassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        const isValid = await verifyPassword(password, user.password);
        if(!isValid){
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        const token = createJWT(user.id);
        return NextResponse.json({ token, success: true }, {
            status: 200,
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
            }
        });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}