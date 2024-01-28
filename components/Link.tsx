/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <Link href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }
  console.log('test')
  console.log(href, rest)
  if (rest.type && rest.type === 'external') {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer no-wrap"
        href={href}
        {...rest}
        className="external-link inline-flex underline decoration-dashed underline-offset-4"
      >
        {rest.children}
        <FaExternalLinkAlt size={10} />
      </a>
    )
  }
  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
