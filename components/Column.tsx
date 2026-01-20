import { deleteColumn } from "@/actions/kanban";
import { ColumnWithTasks } from "@/types";
import React from "react";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";

interface Props {
  column: ColumnWithTasks;
  boardId: string;
}
const Column = ({ column, boardId }: Props) => {
  return (
    <div className="min-w-[320px] flex flex-col shrink-0">
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-xl mb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent">
            {column.title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
              {column.tasks.length} Tasks
            </span>
            <form action={deleteColumn}>
              <input type="hidden" name="columnId" value={column.id} />
              <input type="hidden" name="boardId" value={boardId} />
              <button
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Delete column"
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
            </form>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 min-h-0 overflow-y-auto">
        {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
        ))}

        <CreateTask columnId={column.id} boardId={boardId} />
      </div>
    </div>
  );
};

export default Column;
