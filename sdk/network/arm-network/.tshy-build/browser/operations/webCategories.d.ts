import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebCategories } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { AzureWebCategory, WebCategoriesListBySubscriptionOptionalParams, WebCategoriesGetOptionalParams, WebCategoriesGetResponse } from "../models/index.js";
/** Class containing WebCategories operations. */
export declare class WebCategoriesImpl implements WebCategories {
    private readonly client;
    /**
     * Initialize a new instance of the class WebCategories class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the Azure Web Categories in a subscription.
     * @param options The options parameters.
     */
    listBySubscription(options?: WebCategoriesListBySubscriptionOptionalParams): PagedAsyncIterableIterator<AzureWebCategory>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Gets the specified Azure Web Category.
     * @param name The name of the azureWebCategory.
     * @param options The options parameters.
     */
    get(name: string, options?: WebCategoriesGetOptionalParams): Promise<WebCategoriesGetResponse>;
    /**
     * Gets all the Azure Web Categories in a subscription.
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
}
//# sourceMappingURL=webCategories.d.ts.map