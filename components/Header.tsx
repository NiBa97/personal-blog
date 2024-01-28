import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="mb-4 flex items-center justify-center py-4">
      <div className="flex w-full justify-between space-x-4 leading-5 sm:space-x-6">
        <div className="flex items-center space-x-4 font-bold sm:space-x-6">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-bold uppercase text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
