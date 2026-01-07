import { getPayload } from 'payload'
import config from '../payload.config'
import { importMap } from '../app/(payload)/importMap'

export const getLocalPayload = async () => {
    return await getPayload({ config, importMap })
}
