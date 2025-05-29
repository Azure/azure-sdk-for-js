import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubCustomCertificates } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { CustomCertificate, WebPubSubCustomCertificatesListOptionalParams, WebPubSubCustomCertificatesGetOptionalParams, WebPubSubCustomCertificatesGetResponse, WebPubSubCustomCertificatesCreateOrUpdateOptionalParams, WebPubSubCustomCertificatesCreateOrUpdateResponse, WebPubSubCustomCertificatesDeleteOptionalParams } from "../models/index.js";
/** Class containing WebPubSubCustomCertificates operations. */
export declare class WebPubSubCustomCertificatesImpl implements WebPubSubCustomCertificates {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubCustomCertificates class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List all custom certificates.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubCustomCertificatesListOptionalParams): PagedAsyncIterableIterator<CustomCertificate>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List all custom certificates.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get a custom certificate.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param certificateName Custom certificate name
     * @param options The options parameters.
     */
    get(resourceGroupName: string, resourceName: string, certificateName: string, options?: WebPubSubCustomCertificatesGetOptionalParams): Promise<WebPubSubCustomCertificatesGetResponse>;
    /**
     * Create or update a custom certificate.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param certificateName Custom certificate name
     * @param parameters A custom certificate.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, resourceName: string, certificateName: string, parameters: CustomCertificate, options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubCustomCertificatesCreateOrUpdateResponse>, WebPubSubCustomCertificatesCreateOrUpdateResponse>>;
    /**
     * Create or update a custom certificate.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param certificateName Custom certificate name
     * @param parameters A custom certificate.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, resourceName: string, certificateName: string, parameters: CustomCertificate, options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams): Promise<WebPubSubCustomCertificatesCreateOrUpdateResponse>;
    /**
     * Delete a custom certificate.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param certificateName Custom certificate name
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, resourceName: string, certificateName: string, options?: WebPubSubCustomCertificatesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubCustomCertificates.d.ts.map