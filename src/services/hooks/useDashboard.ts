import { useFetcher } from "../useFetcher";

export function useDashboardFetcher() {
    const { status, error, response, fetcher } = useFetcher();

    return {
        status,
        error,
        response,
        getDashboard: async (options: any) => {
            fetcher({
                options,
                method: "post",
                url: `/dashboard`,
            });
        },
        getGraph: async (options: any) => {
            fetcher({
                options,
                method: "post",
                url: `/dashboard/graph`,
            });
        },
    };
}
