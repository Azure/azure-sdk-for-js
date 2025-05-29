import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApiOperation, IntegrationServiceEnvironmentManagedApiOperationsListOptionalParams } from "../models/index.js";
/** Interface representing a IntegrationServiceEnvironmentManagedApiOperations. */
export interface IntegrationServiceEnvironmentManagedApiOperations {
    /**
     * Gets the managed Api operations.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param options The options parameters.
     */
    list(resourceGroup: string, integrationServiceEnvironmentName: string, apiName: string, options?: IntegrationServiceEnvironmentManagedApiOperationsListOptionalParams): PagedAsyncIterableIterator<ApiOperation>;
}
//# sourceMappingURL=integrationServiceEnvironmentManagedApiOperations.d.ts.map