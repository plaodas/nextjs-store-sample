import type { ApiContext } from 'types'
import { fetcher } from 'utils'

export type GetProductParams = {
  id: number
}

const getProduct = async (context: ApiContext, { id }: GetProductParams) => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
    {
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getProduct
