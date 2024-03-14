import Stripe from 'stripe'

export const useStripeClient = (): Stripe => {
  const event = useEvent()
  const { stripeSecret } = useRuntimeConfig()

  if (!stripeSecret) { throw new Error('Stripe secret not found in runtime config') }

  if (!event.context.__stripe) {
    const stripeInstance = new Stripe(stripeSecret, { apiVersion: '2023-10-16' })
    event.context.__stripe = stripeInstance
  }

  return event.context.__stripe
}

export const useStripeEvent = async (): Promise<Stripe.Event> => {
  const client = useStripeClient()
  const { stripeWebhookSecret } = useRuntimeConfig()
  const headers = getHeaders(useEvent())
  const body = await readRawBody(useEvent()) as string

  const stripeEvent = client.webhooks.constructEvent(body, headers['stripe-signature']!, stripeWebhookSecret)

  return stripeEvent
}

export const useStripeObject = async <T>(): Promise<T> => {
  const payload = await useStripeEvent()

  return payload.data.object as T
}
