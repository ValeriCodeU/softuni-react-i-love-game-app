const baseUrl = 'http://localhost:3030';

export default function useRequest() {
    const request = async (url, method, data) => {
        const options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.body = JSON.stringify(data);
            options.headers = {
                'content-type': 'application/json'
            };
        }



        const response = await fetch(`${baseUrl}${url}`, options);

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    }

    return { request }
}