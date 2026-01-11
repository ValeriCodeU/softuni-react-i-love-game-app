import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030';

export default function useRequest() {

    const { user, isAuthenticated } = useContext(UserContext);

    const request = async (url, method, data, config = {}) => {
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

        console.log(config.accessToken);

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user.accessToken
            }
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