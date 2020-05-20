import json from 'co-body'
import { UserInputError } from '@vtex/api'

declare let process: {
    env: {
        VTEX_APP_ID: string
    }
}

const IntegerLimit = 4294967295

function generateId(min: number): Number {
    var max = Math.floor(IntegerLimit)
    return (Math.floor(Math.random() * (max - min)) + min)
}

export async function newCustomerId(ctx: Context, next: () => Promise<any>) {
    const {
        clients: { apps, masterdata },
    } = ctx

    let body = await json(ctx.req)
    const appId = process.env.VTEX_APP_ID
    let { lastCustomerId } = await apps.getAppSettings(appId)

    ctx.status = 200

    let customerId = generateId(Math.ceil(parseInt(lastCustomerId)))

    let bodyToPatch = { ...body, customerId: customerId }
    try {
        await masterdata.updateDocument(bodyToPatch)
    }
    catch (error) {
        console.log('primeiro error', error)
        if (error.response.data.Message === 'duplicate entry at indice: CL-AlternateKeyCustomerId') {
            try {
                console.log('Vai tentar dar o update de novo')
                await masterdata.updateDocument({ ...bodyToPatch, customerId: generateId(Math.ceil(parseInt(lastCustomerId))) })
            }
            catch (error) {
                console.log(error)
                throw new UserInputError(`Cannot update registry: ${body}`)
            }
        }
    }

    ctx.body = bodyToPatch

    await next()
}