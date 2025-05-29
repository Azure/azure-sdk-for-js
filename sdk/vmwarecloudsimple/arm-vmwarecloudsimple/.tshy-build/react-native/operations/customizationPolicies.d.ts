import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { CustomizationPolicies } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { CustomizationPolicy, CustomizationPoliciesListOptionalParams, CustomizationPoliciesGetOptionalParams, CustomizationPoliciesGetResponse } from "../models/index.js";
/** Class containing CustomizationPolicies operations. */
export declare class CustomizationPoliciesImpl implements CustomizationPolicies {
    private readonly client;
    /**
     * Initialize a new instance of the class CustomizationPolicies class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of customization policies in region for private cloud
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param options The options parameters.
     */
    list(regionId: string, pcName: string, options?: CustomizationPoliciesListOptionalParams): PagedAsyncIterableIterator<CustomizationPolicy>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns list of customization policies in region for private cloud
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param options The options parameters.
     */
    private _list;
    /**
     * Returns customization policy by its name
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param customizationPolicyName customization policy name
     * @param options The options parameters.
     */
    get(regionId: string, pcName: string, customizationPolicyName: string, options?: CustomizationPoliciesGetOptionalParams): Promise<CustomizationPoliciesGetResponse>;
    /**
     * ListNext
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=customizationPolicies.d.ts.map