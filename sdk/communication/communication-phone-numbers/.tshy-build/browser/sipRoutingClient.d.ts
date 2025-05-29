import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { ListSipRoutesOptions, ListSipTrunksOptions, SipTrunk, SipTrunkRoute } from "./models.js";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
export * from "./models.js";
/**
 * Client options used to configure the SipRoutingClient API requests.
 */
export interface SipRoutingClientOptions extends CommonClientOptions {
}
/**
 * Client class for interacting with Azure Communication Services SIP Routing Administration.
 */
export declare class SipRoutingClient {
    /**
     * A reference to the auto-generated SipRouting HTTP client.
     */
    private readonly client;
    /**
     * Initializes a new instance of the SipRoutingClient class using a connection string.
     *
     * @param connectionString - Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, options?: SipRoutingClientOptions);
    /**
     * Initializes a new instance of the SipRoutingClient class using an Azure KeyCredential.
     *
     * @param endpoint - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net).
     * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(endpoint: string, credential: KeyCredential, options?: SipRoutingClientOptions);
    /**
     * Initializes a new instance of the SipRoutingClient class using a TokenCredential.
     * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
     * @param credential - TokenCredential that is used to authenticate requests to the service.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(endpoint: string, credential: TokenCredential, options?: SipRoutingClientOptions);
    /**
     * Lists the SIP trunks.
     * @param options - The options parameters.
     */
    listTrunks(options?: ListSipTrunksOptions): PagedAsyncIterableIterator<SipTrunk>;
    /**
     * Gets the SIP trunk.
     * @param fqdn - The trunk's FQDN.
     * @param options - The options parameters.
     */
    getTrunk(fqdn: string, options?: OperationOptions): Promise<SipTrunk>;
    /**
     * Lists the SIP trunk routes.
     * @param options - The options parameters.
     */
    listRoutes(options?: ListSipRoutesOptions): PagedAsyncIterableIterator<SipTrunkRoute>;
    /**
     * Sets the SIP trunks.
     * @param trunks - The SIP trunks to be set.
     * @param options - The options parameters.
     */
    setTrunks(trunks: SipTrunk[], options?: OperationOptions): Promise<SipTrunk[]>;
    /**
     * Sets the SIP trunk.
     * @param trunk - The SIP trunk to be set.
     * @param options - The options parameters.
     */
    setTrunk(trunk: SipTrunk, options?: OperationOptions): Promise<SipTrunk>;
    /**
     * Sets the SIP trunk routes.
     * @param routes - The SIP trunk routes to be set.
     * @param options - The options parameters.
     */
    setRoutes(routes: SipTrunkRoute[], options?: OperationOptions): Promise<SipTrunkRoute[]>;
    /**
     * Deletes the SIP trunk.
     * @param fqdn - The trunk's FQDN.
     * @param options - The options parameters.
     */
    deleteTrunk(fqdn: string, options?: OperationOptions): Promise<void>;
    private getRoutesInternal;
    private getTrunksInternal;
    private listRoutesPagingAll;
    private listTrunksPagingAll;
    private listTrunksPagingPage;
    private listRoutesPagingPage;
}
//# sourceMappingURL=sipRoutingClient.d.ts.map