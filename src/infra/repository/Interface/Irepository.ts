export interface Repository{
    get?: ()=>any,
    find: (value?: any)=>any,
    create: (value: any, key:string)=>void
    delete: (value?: any)=>void
}