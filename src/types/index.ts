import Stripe from 'stripe'

export interface Billable {
  billable_id: string
  customer_id: string | null // external customer_id from provider (stripe ...)
}

export interface Customer extends Billable {
  name: string
  email: string
}

export type SubscriptionStatus = Stripe.Subscription.Status

export interface Subscription {
  name: string
  subscription_id: string // external subscription_id from provider (stripe ...)
  status: SubscriptionStatus
  ends_at: string | null
  trial_ends_at: string | null
}
