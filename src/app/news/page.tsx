import Link from 'next/link';

export default function NewsListPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News List</h1>
      <Link href="/news/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create New News
      </Link>
    </div>
  );
}