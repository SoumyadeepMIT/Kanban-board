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
    
    // Get the maximum order value for this board
    const maxOrderColumn = await prisma.column.findFirst({
        where: {
            boardId: id
        },
        orderBy: {
            order: 'desc'
        }
    });
    
    const order = (maxOrderColumn?.order ?? -1) + 1;
    
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
    
    // Get the maximum order value for this column
    const maxOrderTask = await prisma.task.findFirst({
        where: {
            columnId: columnId
        },
        orderBy: {
            order: 'desc'
        }
    });
    
    const order = (maxOrderTask?.order ?? -1) + 1;
    
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

export const moveTask = async(formData: FormData) => {
    const taskId = formData.get("taskId") as string;
    const newColumnId = formData.get("newColumnId") as string;
    const boardId = formData.get("boardId") as string;
    const newOrder = parseInt(formData.get("newOrder") as string);

    // Get the task first to know the old column
    const task = await prisma.task.findUnique({
        where: { id: taskId }
    });

    if (!task) throw new Error("Task not found");

    // Use a transaction to avoid unique constraint violations
    await prisma.$transaction(async (tx) => {
        // Step 1: Move the task to a temporary high order to avoid conflicts
        await tx.task.update({
            where: { id: taskId },
            data: { order: 999999 }
        });

        // Step 2: Adjust orders in the old column if moving to a different column
        if (task.columnId !== newColumnId) {
            // Shift down tasks in old column that come after the moved task
            await tx.task.updateMany({
                where: {
                    columnId: task.columnId,
                    order: { gt: task.order }
                },
                data: { order: { decrement: 1 } }
            });

            // Shift up tasks in new column that are at or after the new position
            await tx.task.updateMany({
                where: {
                    columnId: newColumnId,
                    order: { gte: newOrder }
                },
                data: { order: { increment: 1 } }
            });
        } else {
            // Moving within same column - adjust orders between old and new positions
            if (task.order < newOrder) {
                await tx.task.updateMany({
                    where: {
                        columnId: newColumnId,
                        order: { gt: task.order, lte: newOrder }
                    },
                    data: { order: { decrement: 1 } }
                });
            } else if (task.order > newOrder) {
                await tx.task.updateMany({
                    where: {
                        columnId: newColumnId,
                        order: { gte: newOrder, lt: task.order }
                    },
                    data: { order: { increment: 1 } }
                });
            }
        }

        // Step 3: Update the task with final column and order
        await tx.task.update({
            where: { id: taskId },
            data: {
                columnId: newColumnId,
                order: newOrder
            }
        });
    });

    revalidatePath(`/board/${boardId}`);
}