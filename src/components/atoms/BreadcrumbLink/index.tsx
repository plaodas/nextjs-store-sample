import Link from 'next/link'

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
    <Link href={href} passHref legacyBehavior>
      <a itemProp="item">
        <span itemProp="name">{name}</span>
        <meta itemProp="position" content={`${position}`} />
      </a>
    </Link>
  )
}

export default BreadcrumbLink
