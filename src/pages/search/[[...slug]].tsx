import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import BreadcrumbLink from 'components/atoms/BreadcrumbLink'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'
import FilterGroup from 'components/molecules/FilterGroup'
import Layout from 'components/templates/Layout'
import ProductCardListContainer from 'containers/ProductCardListContainer'
import type { Category, Condition } from 'types'

const categoryNameDict: Record<Category, string> = {
  book: '本',
  shoes: 'シューズ',
  clothes: 'トップス',
}

const SearchPage: NextPage = () => {
  const router = useRouter()
  // 商品のカテゴリーをクエリから取得
  const slug: Category[] = Array.isArray(router.query.slug)
    ? (router.query.slug as Category[])
    : []
  // 商品の状態をクエリから取得
  const conditions = (() => {
    if (Array.isArray(router.query.condition)) {
      return router.query.condition as Condition[]
    } else if (router.query.condition) {
      return [router.query.condition as Condition]
    } else {
      return []
    }
  })()

  // const jsonld = {
  //   '@content': 'https://schema.org',
  //   '@type': 'BreadcrumbList',
  //   name: 'パンくずリスト',
  //   itemListElement: [
  //     {
  //       '@type': 'ListItem',
  //       position: 1,
  //       item: { name: 'トップ', '@id': 'http://localhost:3000/' },
  //     },
  //     {
  //       '@type': 'ListItem',
  //       position: 2,
  //       item: { name: '検索', '@id': 'http://localhost:3000/search' },
  //     },
  //     {
  //       '@type': 'ListItem',
  //       position: 3,
  //       item: {
  //         name: 'トップス',
  //         '@id': 'http://localhost:3000/search/clothes',
  //       },
  //     },
  //   ],
  // }

  const handleChange = (selected: string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        slug,
        condition: selected,
      },
    })
  }

  return (
    <Layout>
      {/* <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        ></script>
      </Head> */}
      <Box
        paddingLeft={{
          base: 2,
          md: 3,
        }}
        paddingRight={{
          base: 2,
          md: 3,
        }}
        paddingTop={2}
        paddingBottom={2}
      >
        <Box marginBottom={1}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink position={1} name="トップ" href="/" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink position={2} name="検索" href="/search" />
            </BreadcrumbItem>
            {/* パンくずリストを選択したカテゴリから生成 */}
            {slug.slice(0, slug.length - 1).map((category, i) => (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink
                  position={i + 2}
                  name={categoryNameDict[category] ?? 'Unknown'}
                  href={`/search/${slug.slice(0, i + 1).join('/')}`}
                />
              </BreadcrumbItem>
            ))}
            {slug.length == 0 && <BreadcrumbItem>すべて</BreadcrumbItem>}
            {slug.length > 0 && (
              <BreadcrumbItem>
                {categoryNameDict[slug[slug.length - 1]] ?? 'Unknown'}
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
        <Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Box as="aside" minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
              {/* 商品の状態のフィルタ */}
              <FilterGroup
                title="商品の状態"
                items={[
                  { label: '新品', name: 'new' },
                  { label: '中古', name: 'used' },
                ]}
                value={conditions}
                onChange={handleChange}
              />
              <Box paddingTop={1}>
                <Text as="h2" fontWeight="bold" variant="mediumLarge">
                  カテゴリ
                </Text>
                <Box>
                  <Link href="/search/" passHref>
                    すべて
                  </Link>
                </Box>
                {/* カテゴリのリンク */}
                {Object.keys(categoryNameDict).map(
                  (category: string, i: number) => (
                    <Box key={i} marginTop={1}>
                      <Link href={`/search/${category}`} passHref>
                        {categoryNameDict[category as Category]}
                      </Link>
                    </Box>
                  ),
                )}
              </Box>
            </Box>
            <Box>
              <Text
                as="h2"
                display={{ base: 'block', md: 'none' }}
                fontWeight="bold"
                variant="mediumLarge"
              >
                商品一覧
              </Text>
              {/*
                  商品カードリストコンテナ
                  検索クエリから商品カードリストを表示
                 */}
              <ProductCardListContainer
                category={slug.length > 0 ? slug[slug.length - 1] : undefined}
                conditions={conditions}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

export default SearchPage
