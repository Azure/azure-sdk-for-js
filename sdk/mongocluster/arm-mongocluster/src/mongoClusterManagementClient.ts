// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getMongoClustersOperations,
  MongoClustersOperations,
} from "./classic/mongoClusters/index.js";
import {
  getFirewallRulesOperations,
  FirewallRulesOperations,
} from "./classic/firewallRules/index.js";
import {
  getPrivateEndpointConnectionsOperations,
  PrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  getPrivateLinksOperations,
  PrivateLinksOperations,
} from "./classic/privateLinks/index.js";
import {
  createMongoClusterManagement,
  MongoClusterManagementClientOptions,
  DocumentDBContext,
} from "./api/index.js";

export { MongoClusterManagementClientOptions } from "./api/mongoClusterManagementContext.js";

export class MongoClusterManagementClient {
  private _client: DocumentDBContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Microsoft Azure management API provides create, read, update, and delete functionality for Azure Cosmos DB for MongoDB vCore resources including clusters and firewall rules. */
  constructor(
    credential: TokenCredential,
    options: MongoClusterManagementClientOptions = {},
  ) {
    this._client = createMongoClusterManagement(credential, options);
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.mongoClusters = getMongoClustersOperations(this._client);
    this.firewallRules = getFirewallRulesOperations(this._client);
    this.privateEndpointConnections = getPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.privateLinks = getPrivateLinksOperations(this._client);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for MongoClusters */
  public readonly mongoClusters: MongoClustersOperations;
  /** The operation groups for FirewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for PrivateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for PrivateLinks */
  public readonly privateLinks: PrivateLinksOperations;
}
