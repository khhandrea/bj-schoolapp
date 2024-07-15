import fetch from "node-fetch";
const API_URL = "https://schoolmenukr.ml/api/high/J100004918?hideAllergy=true";

export const getMenu = (month, date) => {
    let REQUEST_URL = API_URL;
    if (month > 0) {
        REQUEST_URL += `&month=${month}`;
    }
    if (date > 0) {
        REQUEST_URL += `&date=${date}`;
    }
    return fetch(`${REQUEST_URL}`)
        .then(res => res.json())
        .then(json => json.menu);
};