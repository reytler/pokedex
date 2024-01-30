import { RamStorage } from "./ramStorage";

describe("RamStorage",()=>{
    describe("find",()=>{
        test("should return null if key does not exist",()=>{
            const ramStorageInstance = new RamStorage()
            const result = ramStorageInstance.find('nonexistentKey')
            expect(result).toBeNull();
        })

        test("should return null if key is expired",()=>{
            const ramStorageInstance = new RamStorage(0)
            ramStorageInstance.create('expiredValue','expiredKey')
            const result = ramStorageInstance.find('nonexistentKey')
            expect(result).toBeNull();
        })

        test("should return stored value if key exists and is not expired",()=>{
            const ramStorageInstance = new RamStorage();
            const key = 'validKey';
            const value = { data: 'validKey' };

            ramStorageInstance.create(value,key);
            const result = ramStorageInstance.find(key);
            expect(result).toEqual(value);
        })
    })

    describe("create",()=>{
        test("should store value in ramStorage",()=>{
            const ramStorageInstance = new RamStorage();
            const key = 'newKey';
            const value = { data: 'example' };

            ramStorageInstance.create(value,key);
            const result = ramStorageInstance.find(key);
            expect(result).toEqual(value);
        })
    })

    describe("delete",()=>{
        test("should remove value from ramStorage",()=>{
            const ramStorageInstance = new RamStorage();
            const key = 'newKey';
            const value = { data: 'example' };

            ramStorageInstance.create(value,key);

            ramStorageInstance.delete(key);
            const result = ramStorageInstance.find(key);
            expect(result).toBeNull();
        })
    })
})