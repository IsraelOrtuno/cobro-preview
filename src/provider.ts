import { createResolver } from "@nuxt/kit"

const BuiltInDatabaseProviders = [
  'supabase'
]

const BuiltInPaymentProviders = [
  'stripe'
]

export type DatabaseProvider = typeof BuiltInDatabaseProviders[number]
export type PaymentProvider = typeof BuiltInPaymentProviders[number]

export const resolveProviders = (): {
  database: string, payment: string
} => {
  const resolver = createResolver(import.meta.url)
  const database = resolver.resolve(`./runtime/providers/database/${BuiltInDatabaseProviders[0]}`)
  const payment = resolver.resolve(`./runtime/providers/payment/${BuiltInPaymentProviders[0]}`)

  // TODO: Add support for custom providers
  // TODO: Load only the provider from configuration options

  return {
    database,
    payment
  }
}