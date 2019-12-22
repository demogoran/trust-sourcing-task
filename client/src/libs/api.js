const fetchWithToken = (url, method, options) => {
    const fetchArgs = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.VUE_APP_TOKEN}`,
        },
    };
    if (options && method === 'POST') {
        fetchArgs.body = JSON.stringify(options)
    }
    return fetch(`${process.env.VUE_APP_API_URL}${url}`, fetchArgs).then(x => x.json())
}

export const API = {
    getPageContent: (options = {}) => fetchWithToken(`/page/${options.pageID}`, "GET"),

    getAllEvents: () => fetchWithToken(`/events/list`, "GET"),
    postPageEvent: (options = {}) => fetchWithToken('/events/create', "POST", options),

    getFilteredPageid: (searchValue) => fetchWithToken(`/events/pageid/${searchValue}`, "GET"),
    getFilteredBrowser: (searchValue) => fetchWithToken(`/events/browser/${searchValue}`, "GET"),
    getFilteredCountry: () => fetchWithToken(`/events/country`, "GET"),
    getFilteredUserCountry: () => fetchWithToken(`/events/usercountry`, "GET"),
    getFilteredReturningUsers: () => fetchWithToken(`/events/retusers`, "GET"),
}