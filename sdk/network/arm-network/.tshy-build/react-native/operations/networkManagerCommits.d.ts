import { NetworkManagerCommits } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkManagerCommit, NetworkManagerCommitsPostOptionalParams, NetworkManagerCommitsPostResponse } from "../models/index.js";
/** Class containing NetworkManagerCommits operations. */
export declare class NetworkManagerCommitsImpl implements NetworkManagerCommits {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkManagerCommits class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Post a Network Manager Commit.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param parameters Parameters supplied to specify which Managed Network commit is.
     * @param options The options parameters.
     */
    beginPost(resourceGroupName: string, networkManagerName: string, parameters: NetworkManagerCommit, options?: NetworkManagerCommitsPostOptionalParams): Promise<SimplePollerLike<OperationState<NetworkManagerCommitsPostResponse>, NetworkManagerCommitsPostResponse>>;
    /**
     * Post a Network Manager Commit.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param parameters Parameters supplied to specify which Managed Network commit is.
     * @param options The options parameters.
     */
    beginPostAndWait(resourceGroupName: string, networkManagerName: string, parameters: NetworkManagerCommit, options?: NetworkManagerCommitsPostOptionalParams): Promise<NetworkManagerCommitsPostResponse>;
}
//# sourceMappingURL=networkManagerCommits.d.ts.map