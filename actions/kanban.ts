'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";



export const createColumn = async(formData: FormData) => {
    const title = (formData.get("title") as string).trim();
    const id = formData.get("boardId") as string;
    if(!title || title.length > 30) {
        throw new Error("Column name must be between 1 and 30 characters long.");
    }
    const order = await prisma.column.count({
        where: {
            boardId: id
        }
    })
    await prisma.column.create({
        data: {
            title,
            order,
            boardId: id
        }
    });
    revalidatePath(`/board/${id}`);
}

export const deleteColumn = async(formData: FormData) => {
    const columnId = formData.get("columnId") as string;
    const id = formData.get("boardId") as string;
    await prisma.column.delete({
        where: {
            id: columnId
        }
    })
    revalidatePath(`/board/${id}`);
}

export const createTask = async(formData: FormData) => {
    const columnId = formData.get("columnId") as string;
    const title = (formData.get("title") as string).trim();
    const id = formData.get("boardId") as string;
    if(!title || title.length > 100) {
        throw new Error("Task name must be between 1 and 100 characters long.");
    }
    const order = await prisma.task.count({
        where: {
            columnId: columnId
        }
    })
    
    await prisma.task.create({
        data: {
            title,
            boardId: id,
            columnId,
            order
        }
    });
    revalidatePath(`/board/${id}`);
}

export const deleteTask = async(formData: FormData) => {
    const taskId = formData.get("taskId") as string;
    const id = formData.get("boardId") as string;
    await prisma.task.delete({
        where: {
            id: taskId 
        }
    });
    revalidatePath(`/board/${id}`);
}