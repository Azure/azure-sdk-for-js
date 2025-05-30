// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createMongoClusterManagement,
  MongoClusterManagementContext,
  MongoClusterManagementClientOptionalParams,
} from "./api/index.js";
import { ReplicasOperations, _getReplicasOperations } from "./classic/replicas/index.js";
import {
  PrivateLinksOperations,
  _getPrivateLinksOperations,
} from "./classic/privateLinks/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  FirewallRulesOperations,
  _getFirewallRulesOperations,
} from "./classic/firewallRules/index.js";
import {
  MongoClustersOperations,
  _getMongoClustersOperations,
} from "./classic/mongoClusters/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { MongoClusterManagementClientOptionalParams } from "./api/mongoClusterManagementContext.js";

export class MongoClusterManagementClient {
  private _client: MongoClusterManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Microsoft Azure management API provides create, read, update, and delete functionality for Azure Cosmos DB for MongoDB vCore resources including clusters and firewall rules. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MongoClusterManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMongoClusterManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.replicas = _getReplicasOperations(this._client);
    this.privateLinks = _getPrivateLinksOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.firewallRules = _getFirewallRulesOperations(this._client);
    this.mongoClusters = _getMongoClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for replicas */
  public readonly replicas: ReplicasOperations;
  /** The operation groups for privateLinks */
  public readonly privateLinks: PrivateLinksOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for firewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for mongoClusters */
  public readonly mongoClusters: MongoClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
