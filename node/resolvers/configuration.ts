import { Apps } from '@vtex/api'

declare let process: {
  env: {
    VTEX_APP_ID: string
  }
}

const getAppId = (): string => {
  return process.env.VTEX_APP_ID || ''
}

export const queries = {
  postSettings: async (_: any, args: any, ctx: Context) => {
    const { settings } = args

    const apps = new Apps(ctx.vtex)
    const app: string = getAppId()
    await apps.saveAppSettings(app, settings)
    return true
  },
}
