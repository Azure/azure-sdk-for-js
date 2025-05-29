import { FirewallPolicyDrafts } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { FirewallPolicyDraft, FirewallPolicyDraftsCreateOrUpdateOptionalParams, FirewallPolicyDraftsCreateOrUpdateResponse, FirewallPolicyDraftsDeleteOptionalParams, FirewallPolicyDraftsGetOptionalParams, FirewallPolicyDraftsGetResponse } from "../models/index.js";
/** Class containing FirewallPolicyDrafts operations. */
export declare class FirewallPolicyDraftsImpl implements FirewallPolicyDrafts {
    private readonly client;
    /**
     * Initialize a new instance of the class FirewallPolicyDrafts class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Create or update a draft Firewall Policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param parameters Parameters supplied to the create or update Firewall Policy Draft operation.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, firewallPolicyName: string, parameters: FirewallPolicyDraft, options?: FirewallPolicyDraftsCreateOrUpdateOptionalParams): Promise<FirewallPolicyDraftsCreateOrUpdateResponse>;
    /**
     * Delete a draft policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPolicyDraftsDeleteOptionalParams): Promise<void>;
    /**
     * Get a draft Firewall Policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPolicyDraftsGetOptionalParams): Promise<FirewallPolicyDraftsGetResponse>;
}
//# sourceMappingURL=firewallPolicyDrafts.d.ts.map