import TOCInline from 'pliny/ui/TOCInline'
// import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import { AudioComponent } from './Audio'
import PreviewableCode from './PreviewableCode'
import Mermaid from './Mermaid'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: (props) => <PreviewableCode defaultView={'code'} renderers={renderers} children={props.children} {...props} />,
  table: TableWrapper,
  AudioComponent: AudioComponent,
  BlogNewsletterForm,
}


const renderers = {
  mermaid: Mermaid,
}
