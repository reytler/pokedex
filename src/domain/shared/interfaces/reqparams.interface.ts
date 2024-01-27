export interface IreqParams {
    searchParams: searchParams
    path: string
    pathParam?: string
    body?: Object
}

interface searchParams {
    [key: string]: number
}