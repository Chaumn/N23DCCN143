import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Trang chủ Blog</h1>

      <ul className="list-disc pl-6">
        <li><Link href="/blog" className="text-blue-500">Danh sách bài viết</Link></li>
        <li><Link href="/categories" className="text-blue-500">Danh mục bài viết</Link></li>
      </ul>
    </div>
  );
}