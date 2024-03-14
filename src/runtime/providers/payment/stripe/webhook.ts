import type { Stripe } from "stripe"
import { useStripeEvent, useStripeObject } from "./stripe"
import { syncSubscription } from "./subscription"

export const handleWebhook = async () => {
  const stripeEvent = await useStripeEvent()

  switch (stripeEvent.type) {
    case 'customer.created':
      // handleCustomerCreated()
      break
    // case 'customer.updated': (event); break;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.resumed':
    case 'customer.subscription.paused':
    case 'customer.subscription.deleted':
      syncSubscription(await useStripeObject<Stripe.Subscription>())
      break
  }
}