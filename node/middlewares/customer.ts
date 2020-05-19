declare let process: {
    env: {
        VTEX_APP_ID: string
    }
}

const IntegerLimit = 4294967295

export async function newCustomerId(ctx: Context, next: () => Promise<any>) {
    const {
        clients: { apps },
    } = ctx

    const appId = process.env.VTEX_APP_ID
    let { lastCustomerId } = await apps.getAppSettings(appId)

    var min = Math.ceil(parseInt(lastCustomerId))
    var max = Math.floor(IntegerLimit)

    ctx.status = 200
    ctx.body = { customerId: (Math.floor(Math.random() * (max - min)) + min).toString() }

    await next()
}