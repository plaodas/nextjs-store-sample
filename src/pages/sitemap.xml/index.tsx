import { react } from '@babel/types'
import { GetServerSideProps } from 'next'
import React from 'react'
import getAllProducts from 'services/products/get-all-products'
import getAllUsers from 'services/users/get-all-users'
import type { ApiContext } from 'types'

const SiteMap = () => null

type SitemapInfo = {
  path: string
  lastmod?: Date
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
}

const StaticPageInfo: SitemapInfo[] = [
  {
    path: '/',
    changefreq: 'hourly',
    priority: 1.0,
  },
  {
    path: '/search',
    changefreq: 'always',
    priority: 1.0,
  },
  {
    path: '/signin',
    changefreq: 'daily',
    priority: 0.5,
  },
]

const getProductPagesInfo = async (): Promise<SitemapInfo[]> => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const products = await getAllProducts(context)

  return products.map((p) => ({
    path: `/product/${p.id}`,
    changefreq: 'daily',
    priority: 0.5,
  }))
}

const getUserPagesInfo = async (): Promise<SitemapInfo[]> => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const users = await getAllUsers(context)

  return users.map((p) => ({
    path: `/users/${p.id}`,
    changefreq: 'daily',
    priority: 0.5,
  }))
}

const generateSitemapXML = (baseURL: string, sitemapInfos: SitemapInfo[]) => {
  const urls = sitemapInfos.map((info) => {
    const children = Object.entries(info)
      .map(([key, value]) => {
        if (!value) return null

        switch (key) {
          case 'path':
            return `<loc>${baseURL}${value}</loc>`
          case 'lastmod': {
            const year = value.getFullYear()
            const month = value.getMonth() + 1
            const day = value.getDate()
            return `<lastmod>${year}-${month}-${day}</lastmod>`
          }
          default:
            return `<${key}>${value}</${key}>`
        }
      })
      .filter((child) => child !== null)

    return `<url>${children.join('\n')}</url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">${urls.join(
    '\n',
  )}</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const host = req?.headers?.host ?? 'localhost'
  const protocol =
    req.headers['x-forwarded-proto'] || req.connection.crypted
      ? 'https'
      : 'http'
  const base = `${protocol}://${host}`
  const sitemapInfo = [
    ...StaticPageInfo,
    ...(await getProductPagesInfo()),
    ...(await getUserPagesInfo()),
  ]

  const sitemapXML = generateSitemapXML(base, sitemapInfo)

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemapXML)
  res.end()

  return { props: {} }
}

export default SiteMap
