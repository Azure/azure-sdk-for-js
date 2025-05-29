import { FirewallPolicyDeployments } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { FirewallPolicyDeploymentsDeployOptionalParams, FirewallPolicyDeploymentsDeployResponse } from "../models/index.js";
/** Class containing FirewallPolicyDeployments operations. */
export declare class FirewallPolicyDeploymentsImpl implements FirewallPolicyDeployments {
    private readonly client;
    /**
     * Initialize a new instance of the class FirewallPolicyDeployments class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Deploys the firewall policy draft and child rule collection group drafts.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    beginDeploy(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPolicyDeploymentsDeployOptionalParams): Promise<SimplePollerLike<OperationState<FirewallPolicyDeploymentsDeployResponse>, FirewallPolicyDeploymentsDeployResponse>>;
    /**
     * Deploys the firewall policy draft and child rule collection group drafts.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    beginDeployAndWait(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPolicyDeploymentsDeployOptionalParams): Promise<FirewallPolicyDeploymentsDeployResponse>;
}
//# sourceMappingURL=firewallPolicyDeployments.d.ts.map