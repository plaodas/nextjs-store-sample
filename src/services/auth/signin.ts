import type { ApiContext, User } from 'types'
import { fetcher } from 'utils/index'

export type SigninParams = {
  username: string
  password: string
}

/**
 * Sign in
 * @param context ApiContext
 * @param params SigninParams
 * @returns User
 */
const signin = async (
  context: ApiContext,
  params: SigninParams,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  )
}

export default signin
