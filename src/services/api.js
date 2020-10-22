let token;
export const setToken = (value) => token = value;

const _apiBase = `https://mycatalog-com.firebaseio.com/`;
const headers = {"Content-Type": "application/x-www-form-urlencoded"};

const _getResource = async (url) => {
    const res = await fetch(`${_apiBase}${url}`);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
    }
    return await res.json();
};

const _setResource = async (method, url, data) => {
    const res = await fetch(`${_apiBase}${url}`,{
        body: JSON.stringify(data),
        headers,
        method
    });
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
    }
    return await res.json();
};

const getAllGoods = async () => {
    return await _getResource(`goods.json`);
};

const createGood = async (data) => {
    return await _setResource('POST', `goods.json`, data);
};

const updateGood = async (data) => {
    return await _setResource('PUT', `goods/${data.id}.json`, data);
};

const deleteGood = async (id) =>{
    return await _setResource('DELETE', `goods/${id}.json`);
};


export {
    getAllGoods,
    createGood,
    updateGood,
    deleteGood,
}


