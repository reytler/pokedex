export interface IreqParams {
    searchParams: searchParams
    path: string
    pathParam?: string
    body?: Object
}

export interface searchParams {
    [key: string]: number
}