import { useFetcher } from "../useFetcher";

interface CommentListOptions {
    page_id: string,
    page: number,
    limit: number,
    label: string,
    post_id: string,
    date_range: [string, string],
}

interface LabelChangeOptions {
    id: string,
    label: string,
}

export function useCommentFetcher() {
    const { status, error, response, fetcher } = useFetcher();

    return {
        status,
        error,
        response,
        list: async (options: any) => {
            fetcher({
                options,
                method: "post",
                url: `/comment`,
            });
        },
    };
}

export function useCommentUpdater() {
    const { status, error, fetcher } = useFetcher();

    return {
        status,
        error,
        changeLabel: async ({ id, label }: any) =>
            fetcher({
                method: "put",
                url: `{{api}}/comment/${id}`,
            }),
    };
}
