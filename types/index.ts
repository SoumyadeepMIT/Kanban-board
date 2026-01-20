import { Column } from '@prisma/client'

export type TaskMinimal = {
  id: string
  title: string
  order: number
}

export type ColumnWithTasks = Column & {
  tasks: TaskMinimal[]  // ✅ Matches your select: { id, title, order }
}
