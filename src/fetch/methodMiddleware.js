import {urlEncode} from "../util"

export const GET = next => (...args) => {
    const [url, params] = args
    return next(`${url}?${urlEncode(params).slice(1)}`, {
        method: 'GET',
    })
};
export const POST = next => (...args) => {
    const [url, params] = args
    return next(url, {
        body: JSON.stringify(params),
        method: 'POST',
    })
};


export const DELETE = next => (...args) => {
    const [url, params] = args
    return next(url, {
        body: JSON.stringify(params),
        method: 'DELETE',
    })
};

export const PUT = next => (...args) => {
    const [url, params] = args
    return next(url, {
        body: JSON.stringify(params),
        method: 'PUT',
    })
};

export const base = next => (...args) => {
    return next(...args)
    // handel html response
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            return response
        })
        // handle business response
        .then(response => {
            return response.json().then(data => {
                if (
                    (data.hasOwnProperty("status") && (data['status'] !== true && parseInt(data['status']) !== 200))
                    ||
                    (data.hasOwnProperty("code") && (data['code'] !== true && parseInt(data['code']) !== 200))
                ) {
                    throw new Error(data.message || data.msg || "error message not found")
                }
                return {
                    json: () => Promise.resolve(data)
                }
            })
        })
        // return data
        .then(response => {
            return response.json().then(data => ({data}))
        })
        // return error
        .catch(error => {
            return {err: error, data: {}}
        })
}
