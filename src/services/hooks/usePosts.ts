import { useFetcher } from "../useFetcher";

export function usePostFetcher() {
    const { status, error, response, fetcher } = useFetcher();

    return {
        status,
        error,
        response,
        list: async (options: any) => {
            // console.log("options: ", options);
            fetcher({
                options,
                method: "post",
                url: `/post`,
            });
        },
        fetchDetail: async (options: any) => {
            fetcher({
                options,
                method: "post",
                url: `/post/detail`,
            });
        },
        fetchReport: async (options: any) => {
            fetcher({
                options,
                method: "post",
                url: `/post/report`,
            });
        },
        fetchCategory: async () => {
            fetcher({
                method: "get",
                url: `/post/category`,
            });
        },
    };
}
