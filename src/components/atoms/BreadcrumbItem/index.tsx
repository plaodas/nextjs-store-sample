import styled from 'styled-components'

/**
 * パンくずリスト要素
 */
const BreadcrumbItemBase = styled.li`
  list-style: none;
  display: inline;

  &:not(:first-child) {
    &::before {
      content: '/';
      color: ${({ theme }) => theme.colors.gray};
      padding: 0px 8px;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.gray};
    &:hover {
      text-decoration: underline;
    }
  }
`

interface BreadcrumbItemProps {
  children?: React.ReactNode
}

/**
 * パンくずリスト
 */
const BreadcrumbItem = ({ children }: BreadcrumbItemProps) => {
  return (
    <BreadcrumbItemBase
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      {children}
    </BreadcrumbItemBase>
  )
}

export default BreadcrumbItem
