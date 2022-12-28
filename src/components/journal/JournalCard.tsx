import React from 'react'
import { Link } from 'gatsby'
import { PinIcon } from '../icons'
import classNames from 'classnames'
import { daysDifference } from '../../utils'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

type Props = {
  post: any
}

const JournalCard = ({ post }: Props) => {
  const difference = daysDifference(post.frontmatter.date)
  const coverImage = getImage(post.frontmatter.featuredImage)
  const available = difference >= 0
  const isNew = difference < 60 && available

  return (
    <Link
      to={available ? post.frontmatter.slug : undefined}
      className={classNames(
        'postcard group',
        available
          ? 'bg-lightest hover:bg-teal-800/20 hover:text-gray-800 dark:bg-light/5 dark:hover:bg-teal-800/50 dark:hover:text-white'
          : 'bg-lightest dark:bg-light/5 hover:cursor-not-allowed'
      )}
    >
      <header>
        {coverImage ? (
          <GatsbyImage image={coverImage} alt="cover" className="h-48 w-full rounded-lg object-contain" />
        ) : (
          <div className="h-48 w-full rounded-lg bg-gradient-to-br from-teal-500 via-teal-700 to-teal-800" />
        )}

        {post.frontmatter.pinned && (
          <span className="pinned">
            <PinIcon />
          </span>
        )}

        <span className="date">{post.frontmatter.date}</span>
      </header>

      <section>
        <div className="top">
          <h3 className="title">{post.frontmatter.title}</h3>
        </div>
        <p className="excerpt">{post.excerpt}</p>
        <div className="bottom">
          {isNew && <span className="new">New</span>}
          {!available && <span className="coming-soon">Coming&nbsp;Soon</span>}
        </div>
      </section>
    </Link>
  )
}

export default JournalCard
