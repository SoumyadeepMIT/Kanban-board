"use client";
import { createTask } from "@/actions/kanban";
import React, { useState, useTransition } from "react";

interface Props {
  columnId: string;
  boardId: string;
}

const CreateTask = ({ columnId, boardId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <div className="p-1">
      {isOpen ? (
        <form action={createTask}>
          <input type="hidden" name="columnId" value={columnId} />
          <input type="hidden" name="boardId" value={boardId} />
          <input
            name="title"
            placeholder="Add a task..."
            className="w-full p-4 border border-gray-200/50 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg placeholder-gray-400 font-medium shadow-sm text-gray-900"
            required
            maxLength={100}
            autoFocus
            disabled={isPending}
          />

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
              className="flex-1 p-3 text-sm font-medium text-gray-700 bg-white/60 hover:bg-white rounded-lg border border-gray-200/50 hover:shadow-sm transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {isPending ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => startTransition(() => setIsOpen(true))}
          className="w-full p-4 text-left text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 rounded-xl transition-all border-2 border-transparent hover:border-gray-200 group flex items-center gap-2"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add task
        </button>
      )}
    </div>
  );
};

export default CreateTask;
