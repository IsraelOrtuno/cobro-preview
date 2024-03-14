// import { useCobroDatabase } from '#imports'

export default defineEventHandler(async (event) => {
  // useCobroDatabase()
  
  const customer = findOrCreateCustomer(await getCustomer())

  return customer

  return 'testing'

  // return getBillable()
})
