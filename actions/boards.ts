'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const createBoardSchema = z.object({
  title: z.string().min(1).max(50).trim()
})

export async function createBoard(formData: FormData) {
  // Simple signature: NO prevState param, NO return value
  const userId = (await headers()).get('x-user-id')
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const validatedFields = createBoardSchema.safeParse({
    title: formData.get('title')
  })

  if (!validatedFields.success) {
    throw new Error('Invalid board title (1-50 characters)')
  }

  await prisma.board.create({
    data: {
      title: validatedFields.data.title,
      ownerId: userId
    }
  })

  revalidatePath('/boards')
  // NO RETURN VALUE - just void
}
