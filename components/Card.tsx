import Image from './Image'
import Link from './Link'

const Card = ({ children }) => (
  <div className="h-full w-full rounded-lg bg-white p-4 shadow dark:bg-gray-800">{children}</div>
)

export default Card
