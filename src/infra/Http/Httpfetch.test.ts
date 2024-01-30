import { IreqParams } from '../../domain/shared/interfaces/reqparams.interface';
import { Repository } from '../repository/Interface/Irepository';
import {Httpfetch} from './Httpfetch';

describe("Httpfetch",()=>{
    describe("GET method",()=>{
        test("should make a GET request with parameters and return JSON", async()=>{
            const mockUrl = "http://mockurl.com/api/v2"
    
            const mockReqParams: IreqParams = {
                path:'/pokemon',
                pathParam: '/1',
                searchParams: {offset:0, limit:10}
            }
    
            const mockConfig = {}
    
            const mockStorageCache: Repository = {
                find: jest.fn(() => null),
                create: jest.fn(),
                delete: jest.fn()
            }
    
            const httpfetch = new Httpfetch(mockUrl,mockConfig,mockStorageCache);
            const mockDataResponse = {result: 'data'}
    
            global.fetch = jest.fn(()=>
                Promise.resolve({
                    json: ()=> Promise.resolve(mockDataResponse)
                } as Response)
            );
    
            const res = await httpfetch.get(mockReqParams);
            const instanceUrl = new URL(mockUrl+'/pokemon/1')
            instanceUrl.searchParams.append("offset",'0')
            instanceUrl.searchParams.append("limit",'10')
    
            expect(global.fetch).toHaveBeenCalledWith(instanceUrl,{});
            
            expect(mockStorageCache.find).toHaveBeenCalledWith(`${instanceUrl}`);
    
            expect(mockStorageCache.create).toHaveBeenCalledWith(mockDataResponse,`${instanceUrl}`);
    
            expect(res).toEqual(mockDataResponse);
        })
    })

    describe("POST method",()=>{
        test("should make a POST request with JSON body",async ()=>{
            const mockUrl = 'https://example.com/api';
            const mockPath = '/endpoint';
            const mockBody = { key: 'value' };

            const mockStorageCache: Repository = {
                find: jest.fn(() => null),
                create: jest.fn(),
                delete: jest.fn()
            }

            const httpfetch = new Httpfetch(mockUrl, {}, mockStorageCache);
            global.fetch = jest.fn(() => Promise.resolve({} as Response));

            await httpfetch.post(mockPath,mockBody);

            expect(global.fetch).toHaveBeenCalledWith("https://example.com/api/endpoint",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockBody),
            })
        })
    })
})