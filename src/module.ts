import { createResolver, defineNuxtModule, addServerHandler, addServerScanDir, addImports } from '@nuxt/kit'
import { resolveProviders } from './provider'
import { defu } from 'defu'

export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'cobro',
    configKey: 'cobro'
  },

  defaults: {
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const runtimeDir = resolver.resolve('runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // nuxt.options.alias['#cobro/types'] = resolver.resolve('types')
    nuxt.options.alias['#cobro'] = resolver.resolve('runtime')

    addServerScanDir(resolver.resolve('runtime/server'))

    const providers = await resolveProviders()

    // nuxt.hook('nitro:config', (nitroConfig) => {
    //   nitroConfig.alias = nitroConfig.alias || {}
    //   nitroConfig.alias['#cobro'] = resolver.resolve('./runtime')
    // })

    if (nuxt.options.nitro.imports !== false) {
      nuxt.options.nitro.imports?.imports
      nuxt.options.nitro.imports = defu(nuxt.options.nitro.imports, {
        presets: [
          {
            from: resolver.resolve(providers.database),
            imports: [
              'getCustomer',
              'getBillable',
              'getBillableByCustomerId',
              'saveBillableCustomerId',
              'saveSubscription'
              // 'saveUserSubscription',
              // 'updateUserCustomerId',
              // 'getUser',
              // 'findUserById',
              // 'findUserByCustomerId'
            ]
          },
          {
            from: resolver.resolve(providers.payment),
            imports: [
              'handleWebhook',
              'findCustomer',
              'createCustomer',
              'findOrCreateCustomer',
            ]
          }
        ]
      })
    }


    // nuxt.hook('nitro:config', (nitroConfig) => {
    //   nitroConfig.alias = nitroConfig.alias || {}

    //   // Inline module runtime in Nitro bundle
    //   nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
    //     inline: [resolver.resolve('./runtime')]
    //   })

    //   nitroConfig.imports

    //   nitroConfig.alias['#cobro/database'] = resolver.resolve(providers.database)
    // })

    // addImports({ name: 'useCobroPayment', from: providers.payment })
  }
})
