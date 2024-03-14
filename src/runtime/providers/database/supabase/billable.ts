import { useUser, useClient, useServiceRoleClient } from './client'
import type { Billable, Customer } from '../../../../types'

export const getCustomer = async (): Promise<Customer | null> => {
  const user = await useUser()
  const billable = await getBillable()
  const client = await useClient()

  if (!user || !billable) return null

  const { data: profile } = await client.from('profiles').select('name').single()

  return {
    ...billable,
    name: profile.name,
    email: user.email,
  }
}

export const getBillable = async (): Promise<Billable | null> => {
  const user = await useUser()
  const client = await useClient()

  const { data: billable, error } = await client.from('teams')
    .select('id,customer_id')
    .eq('user_id', user.id).single()

  if (error) {
    return null
  }

  return {
    billable_id: billable.id,
    customer_id: billable.customer_id
  }
}

export const getBillableByCustomerId = async (customerId: string): Promise<Billable | null> => {
  const client = await useServiceRoleClient()

  const { data: billable, error } = await client.from('teams').select('id,customer_id').eq('customer_id', customerId).single()

  if (error) {
    return null
  }

  return {
    billable_id: billable.id,
    customer_id: billable.customer_id
  }
}

export const saveBillableCustomerId = async (billableId: string, customerId: string): Promise<void> => {
  const client = await useServiceRoleClient()

  const {data, error} = await client.from('teams').update({ customer_id: customerId }).eq('id', billableId)
}