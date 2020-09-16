import json from 'co-body'
import { UserInputError } from '@vtex/api'

declare let process: {
  env: {
    VTEX_APP_ID: string
  }
}

const IntegerLimit = 4294967295

function generateId(min: number): number {
  const max = Math.floor(IntegerLimit)
  return Math.floor(Math.random() * (max - min)) + min
}

export async function newCustomerId(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { apps, masterdata },
  } = ctx

  const body = await json(ctx.req)
  const appId = process.env.VTEX_APP_ID
  const { lastCustomerId } = await apps.getAppSettings(appId)

  ctx.status = 200

  var bodyToPatch = { ...body, customerId: generateId(Math.ceil(parseInt(lastCustomerId, 10))) }
  
  masterdata.updateDocument(bodyToPatch).catch((error:any) => {      
    if (error.response.data.Message ===  'duplicate entry at indice: CL-AlternateKeyCustomerId')
    {      
      bodyToPatch = {...bodyToPatch, customerId:generateId(Math.ceil(parseInt(lastCustomerId, 10)))}     
      masterdata.updateDocument(bodyToPatch).catch(() => {throw new UserInputError(`Cannot update registry: ${body}`)})
    }
    else{
      throw new UserInputError(`Cannot update registry: ${body}`)
    }    
  }) 

  ctx.body = bodyToPatch

  await next()
}
