import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { Providers } from "../operationsInterfaces/index.js";
import type { QuantumJobClient } from "../quantumJobClient.js";
import type { ProviderStatus, ProvidersGetStatusOptionalParams } from "../models/index.js";
/** Class containing Providers operations. */
export declare class ProvidersImpl implements Providers {
    private readonly client;
    /**
     * Initialize a new instance of the class Providers class.
     * @param client Reference to the service client
     */
    constructor(client: QuantumJobClient);
    /**
     * Get provider status.
     * @param options The options parameters.
     */
    listStatus(options?: ProvidersGetStatusOptionalParams): PagedAsyncIterableIterator<ProviderStatus>;
    private getStatusPagingPage;
    private getStatusPagingAll;
    /**
     * Get provider status.
     * @param options The options parameters.
     */
    private _getStatus;
    /**
     * GetStatusNext
     * @param nextLink The nextLink from the previous successful call to the GetStatus method.
     * @param options The options parameters.
     */
    private _getStatusNext;
}
//# sourceMappingURL=providers.d.ts.map