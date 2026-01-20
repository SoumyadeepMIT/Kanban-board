"use client";
import { createColumn } from "@/actions/kanban";
import React, { useState, useTransition } from "react";

interface Props {
  boardId: string;
}

const CreateColumn = ({ boardId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <div className="min-w-[320px] flex flex-col shrink-0">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50/50 border-2 border-dashed border-indigo-200/50 rounded-2xl p-8 flex-1 flex flex-col items-center justify-center hover:border-indigo-300/70 hover:shadow-md transition-all group">
        {isOpen ? (
          <form action={createColumn} className="w-full space-y-4">
            <input type="hidden" name="boardId" value={boardId}/>
            <input
              name="title"
              placeholder="Column name..."
              className="text-gray-700 w-full p-4 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg placeholder-gray-400 font-medium shadow-sm"
              required
              maxLength={30}
              autoFocus
            />
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 p-3 text-sm font-medium text-gray-700 bg-white/50 hover:bg-white rounded-xl border border-gray-200/50 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg disabled:opacity-50 transition-all"
              >
                {isPending ? "Creating..." : "Add Column"}
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => startTransition(() => setIsOpen(true))}
            className="group flex flex-col items-center gap-3 p-8 text-center transition-all hover:scale-105"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-900 mb-1">
                New Column
              </p>
              <p className="text-sm text-gray-600">Click to add a column</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateColumn;
