import React from 'react'
import classNames from 'classnames'
import DarkModeSwitch from './DarkModeSwitch'
import { Link } from 'gatsby'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const fullName = process.env.GATSBY_FULL_NAME
const avatarPath = '/images/avatar.jpg'
const navigation = [
  { title: 'Home', location: '/' },
  { title: 'Journal', location: '/journal' },
  { title: 'Portfolio', location: '/portfolio' },
]

type Props = {
  title: string
  location: string
}

const Navbar = ({ title, location }: Props) => {
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-20 space-x-4 bg-ice px-3 py-2 text-gray-800 dark:bg-navy dark:text-white md:py-0 md:px-3"
    >
      {({ open }) => {
        return (
          <>
            <div className={classNames(open ? 'p-0' : 'p-2', 'relative flex items-center justify-between md:py-0')}>
              <Hamburger open={open} />
              <Header title={title} location={location} />
            </div>
            <Mobile title={title} location={location} />
          </>
        )
      }}
    </Disclosure>
  )
}

const Hamburger = ({ open }: { open: boolean }) => (
  <div
    className={classNames(
      'z-50 md:hidden',
      open
        ? 'absolute top-2 right-2 my-auto flex h-6 items-center justify-end space-x-2'
        : 'flex w-full items-center justify-between'
    )}
  >
    <Link to="/">
      {open ? (
        <img className="avatar top-0.5 h-5 w-5" src={avatarPath} alt={fullName} />
      ) : (
        <img className="avatar h-6 w-6" src={avatarPath} alt={fullName} />
      )}
    </Link>

    <div className="flex items-center space-x-1">
      <DarkModeSwitch />
      <Disclosure.Button className="group text-gray-800 transition duration-200 ease-in dark:text-white md:hidden">
        <span className="sr-only">Open nav menu</span>
        {open ? (
          <XIcon
            className="ease block h-6 w-6 transition duration-200 group-hover:text-primary/75 dark:group-hover:text-primary/75"
            aria-hidden="true"
          />
        ) : (
          <MenuIcon
            className="ease block h-6 w-6 transition duration-200 group-hover:text-primary/75 dark:group-hover:text-primary/75"
            aria-hidden="true"
          />
        )}
      </Disclosure.Button>
    </div>
  </div>
)

const Header = ({ title, location }: Props) => (
  <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-between">
    <div className="relative hidden h-auto space-x-12 self-center duration-200 hover:opacity-75 md:inline-flex">
      <Link to="/" className="flex items-center space-x-2">
        <img src={avatarPath} alt={fullName} className="z-20 inline-flex h-6 w-6 rounded-full transition" />
        <h2 className="text-xs font-bold tracking-tighter duration-150 lg:text-base">{title}</h2>
      </Link>
    </div>

    <div className="hidden space-x-5 self-center md:inline-flex">
      {navigation.map((link, linkIdx: number) => (
        <Link to={link.location} key={`nav-${linkIdx}`} className="relative py-1">
          <button
            type="button"
            className={classNames(
              'flex h-12 items-center justify-center font-medium capitalize tracking-wide transition hover:underline',
              location === link.title
                ? 'font-bold text-primary dark:text-white'
                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
            )}
          >
            <span className="flex items-center justify-center">{link.title}</span>
          </button>
        </Link>
      ))}
      <DarkModeSwitch />
    </div>
  </div>
)

const Mobile = ({ title, location }: Props) => (
  <Disclosure.Panel className="flex flex-col space-y-3 py-2 md:hidden">
    {navigation.map((link, index) => (
      <Link to={link.location} className="relative h-auto" key={`mobile-nav-${index}`}>
        <button
          type="button"
          className={classNames(
            'flex h-auto items-center justify-center font-medium capitalize tracking-wide transition',
            location === link.title
              ? 'text-primary dark:text-white'
              : 'text-gray-800/70 hover:text-gray-800 dark:text-white/60 dark:hover:text-white'
          )}
        >
          <span className="flex items-center justify-center">{link.title}</span>
          {location === link.title ? (
            <span className="absolute -left-4 h-full w-1 rounded-sm bg-primary dark:bg-tertiary" />
          ) : null}
        </button>
      </Link>
    ))}
  </Disclosure.Panel>
)

export default Navbar
