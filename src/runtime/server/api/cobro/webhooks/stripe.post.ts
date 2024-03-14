export default defineEventHandler(async (event) => {
  await handleWebhook()

  return 'success'
})
