import { FirewallPolicyIdpsSignaturesFilterValues } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SignatureOverridesFilterValuesQuery, FirewallPolicyIdpsSignaturesFilterValuesListOptionalParams, FirewallPolicyIdpsSignaturesFilterValuesListResponse } from "../models/index.js";
/** Class containing FirewallPolicyIdpsSignaturesFilterValues operations. */
export declare class FirewallPolicyIdpsSignaturesFilterValuesImpl implements FirewallPolicyIdpsSignaturesFilterValues {
    private readonly client;
    /**
     * Initialize a new instance of the class FirewallPolicyIdpsSignaturesFilterValues class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the current filter values for the signatures overrides
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param parameters Describes the filter values possibles for a given column
     * @param options The options parameters.
     */
    list(resourceGroupName: string, firewallPolicyName: string, parameters: SignatureOverridesFilterValuesQuery, options?: FirewallPolicyIdpsSignaturesFilterValuesListOptionalParams): Promise<FirewallPolicyIdpsSignaturesFilterValuesListResponse>;
}
//# sourceMappingURL=firewallPolicyIdpsSignaturesFilterValues.d.ts.map