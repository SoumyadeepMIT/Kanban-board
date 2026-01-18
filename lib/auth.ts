import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma} from '@/lib/prisma'
import type { User } from '@prisma/client'

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function createJWT(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { 
    expiresIn: '7d' 
  })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
  } catch {
    return null
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  })
}

export function clearAuthCookie() {
  document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
