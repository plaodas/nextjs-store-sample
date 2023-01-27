import Link from 'next/link'
import styled from 'styled-components'
import AppLogo from 'components/atoms/AppLogo'
import Button from 'components/atoms/Button'
import {
  SearchIcon,
  PersonIcon,
  ShoppingCartIcon,
} from 'components/atoms/IconButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Spinner from 'components/atoms/Spinner'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import BadgeIconButton from 'components/molecules/BadgeIconButton'
import { useAuthContext } from 'contexts/AuthContext'
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'

// ヘッダーのルート
const HeaderRoot = styled.header`
  height: 88px;
  padding: ${({ theme }) => theme.spaces[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

// ナビゲーション
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }
`

// ナビゲーションのリンク
const NavLink = styled.span`
  display: inline;
`

/**
 * ヘッダー
 */
const Header = () => {
  const { cart } = useShoppingCartContext()
  const { authUser, isLoading } = useAuthContext()

  return (
    <HeaderRoot>
      <Flex paddingLeft={3} paddingRight={3} justifyContent="space-between">
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Link href="/" passHref>
              <AppLogo />
            </Link>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <Link href="/search" passHref>
                すべて
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <Link href="/search/clothes" passHref>
                トップス
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <Link href="/search/book" passHref>
                本
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <Link href="/search/shoes" passHref>
                シューズ
              </Link>
            </Box>
          </NavLink>
        </Nav>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Box display={{ base: 'block', md: 'none' }}>
              <Link href="/search" passHref>
                <SearchIcon />
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Link href="/cart" passHref>
              <BadgeIconButton
                icon={<ShoppingCartIcon size={24} />}
                size="24px"
                badgeContent={cart.length === 0 ? undefined : cart.length}
                badgeBackgroundColor="primary"
              />
            </Link>
          </NavLink>
          <NavLink>
            {(() => {
              // 認証していたらアイコンを表示
              if (authUser) {
                return (
                  <Link href={`/users/${authUser.id}`} passHref>
                    <ShapeImage
                      shape="circle"
                      src={authUser.profileImageUrl}
                      width={24}
                      height={24}
                      data-testid="profile-shape-image"
                      alt={''}
                    />
                  </Link>
                )
              } else if (isLoading) {
                // ロード中はスピナーを表示
                return <Spinner size={20} strokeWidth={2} />
              } else {
                // サインインしてない場合はアイコンを表示
                return (
                  <Link href="/signin" passHref>
                    <PersonIcon size={24} />
                  </Link>
                )
              }
            })()}
          </NavLink>
          <NavLink>
            <Link href="/sell" passHref>
              <Button>出品</Button>
            </Link>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
  )
}

export default Header
