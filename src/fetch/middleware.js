/**
 * log
 * @param next
 * @returns {function(...[*]=): (Promise$1|PromiseLike<T | never>|Promise<T | never>)}
 */
export const log = next => (...params) => {
    const [url, argv] = params
    const start = Date.now()
    return next(...params).then(data => {
        const img = data.err
            ? 'https://tu.jiuwa.net/pic/20170910/1505053332939917.jpg'
            : 'http://pic.9ht.com/up/2018-2/15181644163000303.jpg'
        console.group('API接口调用')
        console.log('%c  ', `background:url("${img}");padding:45px;background-size:100%; background-repeat:no-repeat;`)
        console.log(`%c URL 路径:`, 'color:#CC33CC', url)
        // console.log(' ')
        console.log(`%c PARAMS 参数:`, 'color:#FF9933', argv)
        if (data.err) {
            console.log(`%c RESULT ERROR 失败结果:`, 'color:#993333', data.err)
        } else {
            console.log(`%c RESULT DATA 成功结果:`, 'color:#99CC00', data.data)
        }
        console.log(`%c TIME 时间:`, 'color:#FF0066', Date.now() - start + 'ms')
        console.groupEnd()
        return data
    })
}
