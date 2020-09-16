import {
    InstanceOptions,
    IOContext,
    ExternalClient,
} from '@vtex/api'

import { statusToError } from '../utils'

export class MasterData extends ExternalClient {
    public constructor(ctx: IOContext, options?: InstanceOptions) {
        super(`http://api.vtex.com/${ctx.account}/dataentities`, ctx, {
            ...options,
            headers: {
                ...(options && options.headers),
                ...{ Accept: 'application/vnd.vtex.ds.v10+json' },
                ...(ctx.adminUserAuthToken
                    ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
                    : null),
                ...(ctx.storeUserAuthToken
                    ? { VtexIdclientAutCookie: ctx.storeUserAuthToken }
                    : null),
            },
        })
    }

    public updateDocument = (
        fields: object
    ) => this.patch('CL/documents', fields)


    protected patch = <T>(url: string, data?: any) => 
        this.http.patch<T>(url, data).catch<any>(statusToError)

}
