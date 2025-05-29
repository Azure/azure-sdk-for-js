import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ProviderStatus, ProvidersGetStatusOptionalParams } from "../models/index.js";
/** Interface representing a Providers. */
export interface Providers {
    /**
     * Get provider status.
     * @param options The options parameters.
     */
    listStatus(options?: ProvidersGetStatusOptionalParams): PagedAsyncIterableIterator<ProviderStatus>;
}
//# sourceMappingURL=providers.d.ts.map