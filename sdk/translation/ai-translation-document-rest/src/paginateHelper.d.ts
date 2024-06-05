import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Client, PathUncheckedResponse } from "@azure-rest/core-client";
/**
 * Helper type to extract the type of an array
 */
export type GetArrayType<T> = T extends Array<infer TData> ? TData : never;
/**
 * The type of a custom function that defines how to get a page and a link to the next one if any.
 */
export type GetPage<TPage> = (pageLink: string, maxPageSize?: number) => Promise<{
    page: TPage;
    nextPageLink?: string;
}>;
/**
 * Options for the paging helper
 */
export interface PagingOptions<TResponse> {
    /**
     * Custom function to extract pagination details for crating the PagedAsyncIterableIterator
     */
    customGetPage?: GetPage<PaginateReturn<TResponse>[]>;
}
/**
 * Helper type to infer the Type of the paged elements from the response type
 * This type is generated based on the swagger information for x-ms-pageable
 * specifically on the itemName property which indicates the property of the response
 * where the page items are found. The default value is `value`.
 * This type will allow us to provide strongly typed Iterator based on the response we get as second parameter
 */
export type PaginateReturn<TResult> = TResult extends {
    body: {
        value?: infer TPage;
    };
} ? GetArrayType<TPage> : Array<unknown>;
/**
 * Helper to paginate results from an initial response that follows the specification of Autorest `x-ms-pageable` extension
 * @param client - Client to use for sending the next page requests
 * @param initialResponse - Initial response containing the nextLink and current page of elements
 * @param customGetPage - Optional - Function to define how to extract the page and next link to be used to paginate the results
 * @returns - PagedAsyncIterableIterator to iterate the elements
 */
export declare function paginate<TResponse extends PathUncheckedResponse>(client: Client, initialResponse: TResponse, options?: PagingOptions<TResponse>): PagedAsyncIterableIterator<PaginateReturn<TResponse>>;
//# sourceMappingURL=paginateHelper.d.ts.map