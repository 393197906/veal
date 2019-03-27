const fetch = aook.createFetch(aook.applyMiddleware(
    next=>(...params)=>{
        console.log(params);
        return next(...params)
    }
)).put
const url = "https://api.apiopen.top/recommendPoetry"
fetch(url).then(result=>{
    console.log(result);
});


