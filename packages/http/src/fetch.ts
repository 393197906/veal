
import {Fetch} from "./types"
const fetch: Fetch<Promise<Response>> = (url: string, params) => {
    return window.fetch(url, params)
}
export default fetch



