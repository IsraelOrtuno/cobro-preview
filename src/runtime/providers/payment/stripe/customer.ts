import Stripe from 'stripe'
import type { Customer } from '../../../../types'
import { useStripeClient } from './stripe'

const castCustomer = (customer: Customer, stripeCustomer: Stripe.Customer): Customer => {
  return {
    billable_id: customer.billable_id,
    customer_id: stripeCustomer.id,
    name: stripeCustomer.name!,
    email: stripeCustomer.email!
  }
}

export const findCustomer = async (customer: Customer): Promise<Customer | null> => {
  if (!customer.customer_id) {
    return null
  }

  const stripeCustomer = await useStripeClient().customers.retrieve(customer.customer_id)

  if (stripeCustomer.deleted) { return null }

  return castCustomer(customer, stripeCustomer)
}

export const createCustomer = async (customer: Customer, providerOptions: any = {}): Promise<Customer> => {
  const stripeCustomer = await useStripeClient().customers.create({
    name: customer.name, email: customer.email, ...providerOptions
  })

  await saveBillableCustomerId(customer.billable_id, stripeCustomer.id)

  return castCustomer(customer, stripeCustomer)
}

export const findOrCreateCustomer = async (customer: Customer): Promise<Customer> => {
  return (await findCustomer(customer)) || (await createCustomer(customer))
}
