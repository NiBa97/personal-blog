import { FaRegClock } from 'react-icons/fa'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
import Tag from './Tag'
import Link from 'next/link'
import Card from './Card'
export default function PostCard({ post }) {
  return (
    <Card>
      <div className=" flex h-full flex-col">
        <div className="mb-1 line-clamp-2 h-16 text-2xl font-bold">
          <Link href={`/${post.path}`}>{post.title}</Link>
        </div>
        <div className="mb-1 flex flex-wrap">
          {post.tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
        <p className="mb-1 flex-grow text-gray-600 dark:text-gray-400">{post.summary}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <FaRegClock />
            <span className="ml-1">{post.readingTime.text}</span>
          </div>
          <Link href={`/${post.path}`} className="flex items-center gap-1">
            Read <FaRegArrowAltCircleRight />
          </Link>
        </div>
      </div>
    </Card>
  )
}
