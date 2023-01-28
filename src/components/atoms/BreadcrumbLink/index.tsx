import Link from 'next/link'
import styled from 'styled-components'

interface BreadcrumbLinkProp {
  position: number
  name: string
  href: string
}

/**
 * パンくずリストリンク
 */
const BreadcrumbLink = ({ position, name, href }: BreadcrumbLinkProp) => {
  return (
    <Link href={href} legacyBehavior>
      <a itemProp="item">
        <span itemProp="name">{name}</span>
        <meta itemProp="position" content={`${position}`} />
      </a>
    </Link>
  )
}

export default BreadcrumbLink
