import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Kanban Board</h1>
        <p className="text-gray-600 mb-8">Organize your tasks with drag and drop</p>
        <div className="space-x-4">
          <Link href="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Sign In
          </Link>
          <Link href="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
