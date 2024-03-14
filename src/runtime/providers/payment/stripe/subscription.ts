import Stripe from 'stripe'
import type { Subscription } from '~/src/types'

const castStripeSubscription = (subscription: Stripe.Subscription):Subscription => {
  const trialEndsAt = subscription.status === 'trialing'
    ? new Date(subscription.trial_end! * 1000).toISOString()
    : null

  return {
    name: subscription.metadata.name || 'default',
    subscription_id: subscription.id,
    status: subscription.status,
    ends_at: subscription.ended_at ? new Date(subscription.ended_at * 1000).toISOString() : null,
    trial_ends_at: trialEndsAt
  }
}

export const syncSubscription = async (stripeSubscription: Stripe.Subscription): Promise<void> => {
  const billable = await getBillableByCustomerId(stripeSubscription.customer.toString())

  if (!billable) {
    throw new Error('Billable not found')
  }

  const subscription = castStripeSubscription(stripeSubscription)

  await saveSubscription(billable, subscription)
}

// export const syncSubscriptionById = async (subscriptionId: string): Promise<void> => {
//   const { findUserByCustomerId } = useCobroRepository()
//   const subscription = await useStripeClient().subscriptions.retrieve(subscriptionId)

//   const profile = await findUserByCustomerId(subscription.customer.toString())

//   await syncSubscription(subscription, profile!.id)
// }

// export const syncSubscriptionByUserId = async (userId: string): Promise<void> => {
//   const { findUserById } = useCobroRepository()

//   const profile = await findUserById(userId)

//   if (!profile) { return }

//   const subscriptions = await useStripeClient().subscriptions.list({ customer: profile.customer_id! })

//   if (!subscriptions.data.length) { return }

//   Promise.all(subscriptions.data.map(subscription => syncSubscription(subscription, profile.id)))
// }
