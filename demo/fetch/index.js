const fetch = http.createFetch(http.applyMiddleware(
    http.methods,
    http.filter,
    http.log
))
const url = "https://api.apiopen.top/recommendPoetry"
fetch.get(url,{
    name:123,
    age:789
}).then(result=>{
    console.log(result);
});


