import Link from './Link'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import PostCard from './PostCard'

export default function Footer() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <footer>
      <div className="mx-auto hidden max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <h3>Recent posts</h3>
      </div>
      <div className="left-0  hidden  w-screen grid-cols-3 gap-3 px-3 sm:hidden">
        <PostCard post={posts[0]} />
        <PostCard post={posts[1]} />
        <PostCard post={posts[2]} />
      </div>
      <div className=" mx-auto mt-3 flex w-full max-w-3xl flex-row justify-between xl:max-w-5xl">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>{' '}
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
      </div>
    </footer>
  )
}
