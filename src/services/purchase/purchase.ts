import { ApiContext } from 'types'
import { fetcher } from 'utils'

export type PurchaseParams = {
  productId: number
}

/**
 * 購入API
 * @param context Api Context
 * @param params 商品ID
 * @returns 結果メッセージ
 */
const purchase = async (
  context: ApiContext,
  params: PurchaseParams,
): Promise<{ message: string }> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/purchases`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(params),
  })
}

export default purchase
