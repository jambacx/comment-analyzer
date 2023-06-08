import { useState } from 'react';
import HTTP from './http';

export type FetcherOptions = {
    url: string,
    options?: any,
    method?: 'get' | 'post' | 'put',
};

export type UseFetcherReturn = {
    fetcher: (args: FetcherOptions) => Promise<void>,
    // body: any | null,
    status: string,
    error: Error | null,
    response: any | null,
};

export function useFetcher(): UseFetcherReturn {
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<string>('idle');
    const [response, setResponse] = useState<any | null>(null);

    const fetcher = async ({
        url,
        options,
        method = "get",
    }: FetcherOptions) => {
        setError(null);
        setStatus("pending");

        try {
            let _response;
            if (method === "get") {
                _response = await HTTP.get(url, options);
            } else if (method === "post") {
                _response = await HTTP.post(url, options);
            }

            setResponse(_response);
        } catch (_error: any) {
            setError(_error);
        }

        setStatus("done");
    };

    return { fetcher, status, error, response };
}
