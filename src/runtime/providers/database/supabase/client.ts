// import { Database } from '~/database.types'
import { serverSupabaseUser, serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'
// import { Customer } from "~/server/types"

export const useUser = () => {
  return serverSupabaseUser(useEvent())
}

export const useClient = () => {
  return serverSupabaseClient(useEvent())
}

export const useServiceRoleClient = () => {
  return serverSupabaseServiceRole(useEvent())
}
