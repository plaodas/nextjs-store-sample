import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

export type GetUserParams = {
  /**
   * User ID
   */
  id: number
}

/**
 * User API
 * @param context API context
 * @param params parameters
 * @return User
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/users/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getUser
