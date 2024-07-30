// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import { getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
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
import { getPrivateLinksOperations, PrivateLinksOperations } from "./classic/privateLinks/index.js";
import {
  createMongoClusterManagement,
  MongoClusterManagementClientOptionalParams,
  DocumentDBContext,
} from "./api/index.js";

export { MongoClusterManagementClientOptionalParams } from "./api/mongoClusterManagementContext.js";

export class MongoClusterManagementClient {
  private _client: DocumentDBContext;
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
      : "azsdk-js-client";

    this._client = createMongoClusterManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.mongoClusters = getMongoClustersOperations(this._client, subscriptionId);
    this.firewallRules = getFirewallRulesOperations(this._client, subscriptionId);
    this.privateEndpointConnections = getPrivateEndpointConnectionsOperations(
      this._client,
      subscriptionId,
    );
    this.privateLinks = getPrivateLinksOperations(this._client, subscriptionId);
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
