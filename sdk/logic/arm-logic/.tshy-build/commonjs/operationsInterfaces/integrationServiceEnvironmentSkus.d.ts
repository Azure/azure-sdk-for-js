import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationServiceEnvironmentSkuDefinition, IntegrationServiceEnvironmentSkusListOptionalParams } from "../models/index.js";
/** Interface representing a IntegrationServiceEnvironmentSkus. */
export interface IntegrationServiceEnvironmentSkus {
    /**
     * Gets a list of integration service environment Skus.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    list(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentSkusListOptionalParams): PagedAsyncIterableIterator<IntegrationServiceEnvironmentSkuDefinition>;
}
//# sourceMappingURL=integrationServiceEnvironmentSkus.d.ts.map