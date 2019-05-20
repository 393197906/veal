import {action, observable, observe, unobserve,isObservable} from "../src/index"

describe('@aev/observable', () => {
    test("observable",()=>{
        const store = observable({
            name:123,
            setName(value){
                return this.name = value
            }
        })
        expect(store.name).toBe(123)
        store.setName(789)
        expect(store.name).toBe(789)
    })

    test("observe",()=>{
        let testNumber:number = 0
        const store = observable({
            num:123,
            setNum(value){
                return this.num = value
            }
        })
        observe(()=>testNumber = store.num)
        expect(testNumber).toBe(123)
        store.setNum(890)
        expect(testNumber).toBe(890)
    })
    test(`unobserve`,()=>{
        let testNumber:number = 0
        const store = observable({
            num:123,
            setNum(value){
                return this.num = value
            }
        })
        const ob = observe(()=>testNumber = store.num)
        expect(testNumber).toBe(123)
        store.setNum(890)
        expect(testNumber).toBe(890)
        unobserve(ob)
        store.setNum(123)
        expect(testNumber).toBe(890)
    })

    test("only action can set state",()=>{
        const store = observable({
            num:123,
            setNum(value){
                return this.num = value
            }
        })
        const setValue = ()=>store.num = 789
        expect(setValue).toThrowError(new Error('Please use Actions to update observable value'))
        action(setValue)
        expect(store.num).toBe(789)
    })
    test("isObservable",()=>{
        const obj = {name:123}
        const store = observable(obj)
        expect(isObservable(obj)).toBe(false)
        expect(isObservable(store)).toBe(true)
    })

    test("test",()=>{
        let count = 0
        const store = observable({
            name:'veal',
            age:18,
            setName(){
                this.name = "newVeal"
                this.age = 20
            }
        })
        observe(()=>++count,{lazy:true})
        store.setName()
        expect(count).toBe(2)
    })
});
