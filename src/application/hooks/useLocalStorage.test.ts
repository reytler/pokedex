import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";
import { Repository } from "../../infra/repository/Interface/Irepository";

class MockStorage implements Repository {
    private cache: {[key: string]:any} = {}

    find(key: string){
        return this.cache[key];
    };

    create(value: any, key: string){
        this.cache[key] = value;
    }

    delete(key: string){
        delete this.cache[key];
    }

}


describe("useLocalStorage",()=>{
    test("should init correctly with default value",()=>{
        const { result } = renderHook(()=> useLocalStorage('testeKey','defaultValue',new MockStorage()));

        expect(result.current[0]).toBe('defaultValue');
    })

    test("should store in localstorage when setting the state",()=>{
        const instanceStorage = new MockStorage()
        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue',instanceStorage));

        act(() => {
            result.current[1]('newValue');
        });

        expect(result.current[0]).toBe('newValue');
    })

    test("should call create in useEffect when defining state",()=>{
        const instanceStorage = new MockStorage()

        const { result } = renderHook(
            ({ key, value }) => useLocalStorage(key, value,instanceStorage),
            { initialProps: { key: 'testKey', value: 'defaultValue' } }
        );

        act(() => {
            result.current[1]('newValue');
        });

        
        expect(instanceStorage.find('testKey')).toBe('newValue')
    })
})