import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { CustomizationPolicy, CustomizationPoliciesListOptionalParams, CustomizationPoliciesGetOptionalParams, CustomizationPoliciesGetResponse } from "../models/index.js";
/** Interface representing a CustomizationPolicies. */
export interface CustomizationPolicies {
    /**
     * Returns list of customization policies in region for private cloud
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param options The options parameters.
     */
    list(regionId: string, pcName: string, options?: CustomizationPoliciesListOptionalParams): PagedAsyncIterableIterator<CustomizationPolicy>;
    /**
     * Returns customization policy by its name
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param customizationPolicyName customization policy name
     * @param options The options parameters.
     */
    get(regionId: string, pcName: string, customizationPolicyName: string, options?: CustomizationPoliciesGetOptionalParams): Promise<CustomizationPoliciesGetResponse>;
}
//# sourceMappingURL=customizationPolicies.d.ts.map