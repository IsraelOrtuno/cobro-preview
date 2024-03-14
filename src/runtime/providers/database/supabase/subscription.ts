import { useServiceRoleClient } from './client'
import type { Billable, Subscription } from '../../../../types'

export const saveSubscription = async (billable:Billable, subscription: Subscription) => {
  const client = await useServiceRoleClient()

  await client.from('subscriptions').upsert({
    billable_id: billable.billable_id,
    ...subscription
  }, { onConflict: 'subscription_id' })
}
