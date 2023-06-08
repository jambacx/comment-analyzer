import { useState, useEffect } from 'react';
import HTTP, { } from '../http';

interface FetcherResult<T> {
    data: T | null;
    error: any;
    loading: boolean;
}

const useFetcher = <T>(url: string, options?: any): FetcherResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await HTTP.get<T>(url, options);
                setData(result);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};

export default useFetcher;
