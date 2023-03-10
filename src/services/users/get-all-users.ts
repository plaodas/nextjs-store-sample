import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

/**
 * get user list
 * @param context ApiContext
 * @returns User[]
 */
const getAllUsers = async (context: ApiContext): Promise<User[]> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/users`, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getAllUsers
