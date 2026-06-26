// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureDatabricksManagementContext,
  AzureDatabricksManagementClientOptionalParams,
  createAzureDatabricksManagement,
} from "./api/index.js";
import {
  AccessConnectorsOperations,
  _getAccessConnectorsOperations,
} from "./classic/accessConnectors/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  OutboundNetworkDependenciesEndpointsOperations,
  _getOutboundNetworkDependenciesEndpointsOperations,
} from "./classic/outboundNetworkDependenciesEndpoints/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { VNetPeeringOperations, _getVNetPeeringOperations } from "./classic/vNetPeering/index.js";
import { WorkspacesOperations, _getWorkspacesOperations } from "./classic/workspaces/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureDatabricksManagementClientOptionalParams } from "./api/azureDatabricksManagementContext.js";

export class AzureDatabricksManagementClient {
  private _client: AzureDatabricksManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureDatabricksManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureDatabricksManagementClientOptionalParams,
  );
  /** ARM Databricks */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureDatabricksManagementClientOptionalParams,
    options?: AzureDatabricksManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureDatabricksManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.vNetPeering = _getVNetPeeringOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.outboundNetworkDependenciesEndpoints = _getOutboundNetworkDependenciesEndpointsOperations(
      this._client,
    );
    this.accessConnectors = _getAccessConnectorsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.workspaces = _getWorkspacesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for vNetPeering */
  public readonly vNetPeering: VNetPeeringOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for outboundNetworkDependenciesEndpoints */
  public readonly outboundNetworkDependenciesEndpoints: OutboundNetworkDependenciesEndpointsOperations;
  /** The operation groups for accessConnectors */
  public readonly accessConnectors: AccessConnectorsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
