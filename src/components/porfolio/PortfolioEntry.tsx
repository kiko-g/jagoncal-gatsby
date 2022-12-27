import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ExternalIcon, PinIcon } from '../icons'

type Props = {
  project: any
}

const PortfolioEntry = ({ project }: Props) => {
  const info = project.frontmatter
  const content = project.html
  const coverImage = getImage(info.featuredImage)
  const dates = info.startDate === info.endDate ? info.startDate : `${info.startDate} - ${info.endDate ?? 'Present'}`

  return (
    <div className="entry">
      <aside>
        {info.featuredVideo ? (
          <div className="video">
            <video className="video-inner" controls muted>
              <source src={info.featuredVideo} type="video/mp4" />
            </video>
          </div>
        ) : coverImage ? (
          <GatsbyImage image={coverImage} alt="cover" className="image" />
        ) : (
          <div className="dummy" />
        )}

        {info.pinned && (
          <span className="pinned">
            <PinIcon />
          </span>
        )}
      </aside>

      <section>
        <div className="core">
          <header>
            <div className="title">{info.title}</div>
            <div className="subheader">
              <span>{dates}</span>
            </div>
            <span className="description">{info.description}</span>
          </header>

          <div className="body">
            <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <div className="links">
          {info.external && (
            <a href={info.external} target="_blank" className="external">
              <ExternalIcon />
              <span className="hidden md:flex">Link to resource</span>
            </a>
          )}
        </div>
      </section>
    </div>
  )
}

export default PortfolioEntry
