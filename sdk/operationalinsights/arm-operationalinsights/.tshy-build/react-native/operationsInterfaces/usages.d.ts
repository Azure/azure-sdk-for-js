import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { UsageMetric, UsagesListOptionalParams } from "../models/index.js";
/** Interface representing a Usages. */
export interface Usages {
    /**
     * Gets a list of usage metrics for a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workspaceName: string, options?: UsagesListOptionalParams): PagedAsyncIterableIterator<UsageMetric>;
}
//# sourceMappingURL=usages.d.ts.map