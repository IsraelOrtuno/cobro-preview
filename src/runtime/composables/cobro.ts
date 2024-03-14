import type { Billable } from '../../types'

export const findOrCreateBillable = async (): Promise<Billable> => {
  // const { getCustomer, updateUserCustomerId } = useCobroRepository()
  // const { findOrCreateProviderCustomer } = useCobroProvider()

  const customer = await getCustomer()
  // const billable = await getBillable()

  // if (!billable?.customer_id) {
  //   const customer = await findOrCreateBillable()
  // }

  // if (!customer.customer_id) {
  //   const providerCustomer = await findOrCreateProviderCustomer(customer)
  //   await updateUserCustomerId(providerCustomer.user_id, providerCustomer.customer_id!)
  //   return providerCustomer
  // }

  // return customer
}
