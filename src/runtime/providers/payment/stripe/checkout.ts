import Stripe from 'stripe'
import { defu } from 'defu'
import type { Billable } from '../../../../types'
import { useStripeClient } from './stripe'

export const createBillingPortalUrl = async (customer_id: string, sessionOptions: Partial<Stripe.BillingPortal.SessionCreateParams> = {}): Promise<string> => {
  const session = await useStripeClient().billingPortal.sessions.create({
    ...sessionOptions,
    customer: customer_id,
  })

  return session.url
}

const defaultSessionOptions: Stripe.Checkout.SessionCreateParams = {
  mode: 'subscription',
  customer_update: { name: 'auto', address: 'auto' }
}

export const createCheckoutSession = async (customer: Customer, sessionOptions: Stripe.Checkout.SessionCreateParams = {}): Promise<Stripe.Checkout.Session> => {
  const client = await useStripeClient()

  if (!sessionOptions.customer) { sessionOptions.customer = customer.customer_id! }

  const options = defu(sessionOptions, defaultSessionOptions)

  return client.checkout.sessions.create(options)
}

export const createHostedCheckoutSession = async (customer: Customer, sessionOptions: Stripe.Checkout.SessionCreateParams = {}): Promise<Stripe.Checkout.Session> => {
  return createCheckoutSession(customer, { ...sessionOptions, ui_mode: 'hosted' })
}

export const createEmbedCheckoutSession = async (customer: Customer, sessionOptions: Stripe.Checkout.SessionCreateParams = {}): Promise<Stripe.Checkout.Session> => {
  // sessionOptions.success_url = undefined
  return createCheckoutSession(customer, { ...sessionOptions, ui_mode: 'embedded' })
}
