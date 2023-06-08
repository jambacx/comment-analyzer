import { useFetcher } from "../useFetcher";

interface ReportFetchOptions {
    page_id: string,
    page: number,
    limit: number,
    category: string,
    date_range: [string, string],
}

export function useReportFetcher() {
    const { status, error, response, fetcher } = useFetcher();

    return {
        status,
        error,
        response,
        list: async (options: ReportFetchOptions) => {
            fetcher({
                method: "post",
                url: `/post/report`,
                options,
            });
        },
        commentList: async (options: ReportFetchOptions) => {
            fetcher({
                method: "post",
                url: `/comment/report`,
                options,
            });
        },
    };
}
