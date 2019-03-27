const fetch = aook.createFetch(aook.applyMiddleware(
    aook.logMiddleware
)).get
const url = "https://api.apiopen.top/recommendPoetry"
fetch(url,{
    name:123,
    age:789
}).then(result=>{
    console.log(result);
});


