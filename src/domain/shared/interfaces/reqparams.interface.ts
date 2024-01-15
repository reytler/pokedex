export interface IreqParams {
    searchParams: searchParams
    path: string
    pathParam?: string
    body?: Object
}

interface searchParams {
    limit?: number
    offset?: number
}