import { useServiceRoleClient } from './client'

export const billableQuery = () => {
  const client = useServiceRoleClient()

  client.from('profiles').select('id, customer_id, ...auth.users(email), name')
}

export const getUser = async (column: 'id' | 'customer_id', value: string) => {
  const client = await useServiceRoleClient()

  const { data: user } = await client.from('profiles').select('id, customer_id').eq(column, value).single()

  return user
}

export const findUserById = (id: string) => getUser('id', id)

export const findUserByCustomerId = (customerId: string) => getUser('customer_id', customerId)
