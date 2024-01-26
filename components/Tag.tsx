import Link from 'next/link'
import { slug } from 'github-slugger'
import { FaHashtag } from 'react-icons/fa'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 flex flex-row items-center text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      <FaHashtag />
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
