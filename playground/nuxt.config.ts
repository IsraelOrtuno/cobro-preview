export default defineNuxtConfig({
  modules: [
    '../src/module', 
    '@nuxtjs/supabase'
  ],

  devtools: { enabled: true },


  runtimeConfig: {
    public: {
      stripeKey: process.env.STRIPE_KEY,
    },

    stripeSecret: process.env.STRIPE_SECRET,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  experimental: {
    asyncContext: true
  }
})