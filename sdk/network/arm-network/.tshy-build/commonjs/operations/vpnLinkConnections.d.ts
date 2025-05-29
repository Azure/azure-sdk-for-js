import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VpnLinkConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ConnectionSharedKeyResult, VpnLinkConnectionsGetAllSharedKeysOptionalParams, VpnSiteLinkConnection, VpnLinkConnectionsListByVpnConnectionOptionalParams, VpnLinkConnectionsResetConnectionOptionalParams, VpnLinkConnectionsGetDefaultSharedKeyOptionalParams, VpnLinkConnectionsGetDefaultSharedKeyResponse, VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams, VpnLinkConnectionsSetOrInitDefaultSharedKeyResponse, VpnLinkConnectionsListDefaultSharedKeyOptionalParams, VpnLinkConnectionsListDefaultSharedKeyResponse, VpnLinkConnectionsGetIkeSasOptionalParams, VpnLinkConnectionsGetIkeSasResponse } from "../models/index.js";
/** Class containing VpnLinkConnections operations. */
export declare class VpnLinkConnectionsImpl implements VpnLinkConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class VpnLinkConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all shared keys of VpnLink connection specified.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    listAllSharedKeys(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnLinkConnectionsGetAllSharedKeysOptionalParams): PagedAsyncIterableIterator<ConnectionSharedKeyResult>;
    private getAllSharedKeysPagingPage;
    private getAllSharedKeysPagingAll;
    /**
     * Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection.
     * @param resourceGroupName The resource group name of the vpn gateway.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param options The options parameters.
     */
    listByVpnConnection(resourceGroupName: string, gatewayName: string, connectionName: string, options?: VpnLinkConnectionsListByVpnConnectionOptionalParams): PagedAsyncIterableIterator<VpnSiteLinkConnection>;
    private listByVpnConnectionPagingPage;
    private listByVpnConnectionPagingAll;
    /**
     * Resets the VpnLink connection specified.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    beginResetConnection(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnLinkConnectionsResetConnectionOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Resets the VpnLink connection specified.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    beginResetConnectionAndWait(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnLinkConnectionsResetConnectionOptionalParams): Promise<void>;
    /**
     * Lists all shared keys of VpnLink connection specified.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    private _getAllSharedKeys;
    /**
     * Gets the shared key of VpnLink connection specified.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    getDefaultSharedKey(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnLinkConnectionsGetDefaultSharedKeyOptionalParams): Promise<VpnLinkConnectionsGetDefaultSharedKeyResponse>;
    /**
     * Sets or auto generates the shared key based on the user input. If users give a shared key value, it
     * does the set operation. If key length is given, the operation creates a random key of the
     * pre-defined length.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param connectionSharedKeyParameters Parameters supplied to set or auto generate the shared key for
     *                                      the vpn link connection.
     * @param options The options parameters.
     */
    beginSetOrInitDefaultSharedKey(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, connectionSharedKeyParameters: ConnectionSharedKeyResult, options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams): Promise<SimplePollerLike<OperationState<VpnLinkConnectionsSetOrInitDefaultSharedKeyResponse>, VpnLinkConnectionsSetOrInitDefaultSharedKeyResponse>>;
    /**
     * Sets or auto generates the shared key based on the user input. If users give a shared key value, it
     * does the set operation. If key length is given, the operation creates a random key of the
     * pre-defined length.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param connectionSharedKeyParameters Parameters supplied to set or auto generate the shared key for
     *                                      the vpn link connection.
     * @param options The options parameters.
     */
    beginSetOrInitDefaultSharedKeyAndWait(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, connectionSharedKeyParameters: ConnectionSharedKeyResult, options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams): Promise<VpnLinkConnectionsSetOrInitDefaultSharedKeyResponse>;
    /**
     * Gets the value of the shared key of VpnLink connection specified.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    listDefaultSharedKey(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnLinkConnectionsListDefaultSharedKeyOptionalParams): Promise<VpnLinkConnectionsListDefaultSharedKeyResponse>;
    /**
     * Lists IKE Security Associations for Vpn Site Link Connection in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    beginGetIkeSas(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnLinkConnectionsGetIkeSasOptionalParams): Promise<SimplePollerLike<OperationState<VpnLinkConnectionsGetIkeSasResponse>, VpnLinkConnectionsGetIkeSasResponse>>;
    /**
     * Lists IKE Security Associations for Vpn Site Link Connection in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param options The options parameters.
     */
    beginGetIkeSasAndWait(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnLinkConnectionsGetIkeSasOptionalParams): Promise<VpnLinkConnectionsGetIkeSasResponse>;
    /**
     * Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection.
     * @param resourceGroupName The resource group name of the vpn gateway.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param options The options parameters.
     */
    private _listByVpnConnection;
    /**
     * GetAllSharedKeysNext
     * @param resourceGroupName The name of the resource group.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn link connection.
     * @param nextLink The nextLink from the previous successful call to the GetAllSharedKeys method.
     * @param options The options parameters.
     */
    private _getAllSharedKeysNext;
    /**
     * ListByVpnConnectionNext
     * @param resourceGroupName The resource group name of the vpn gateway.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param nextLink The nextLink from the previous successful call to the ListByVpnConnection method.
     * @param options The options parameters.
     */
    private _listByVpnConnectionNext;
}
//# sourceMappingURL=vpnLinkConnections.d.ts.map