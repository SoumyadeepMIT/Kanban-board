import { deleteTask } from "@/actions/kanban";
import { TaskMinimal } from "@/types";
import React from "react";

interface Props {
  task: TaskMinimal;
}

const TaskCard = ({ task }: Props) => {
  return (
    <form action={deleteTask} className="group">
      <input type="hidden" name="taskId" value={task.id} />
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
        {/* Drag handle (placeholder for DnD) */}
        <div className="absolute left-4 top-4 w-1 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Content */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {task.title}
        </h3>

        {/* Delete button */}
        <button
          type="submit"
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
          title="Delete task"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default TaskCard;
