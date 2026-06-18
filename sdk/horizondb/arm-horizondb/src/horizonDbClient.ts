// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbContext, HorizonDbClientOptionalParams, createHorizonDb } from "./api/index.js";
import {
  HorizonDbClustersOperations,
  _getHorizonDbClustersOperations,
} from "./classic/horizonDbClusters/index.js";
import {
  HorizonDbFirewallRulesOperations,
  _getHorizonDbFirewallRulesOperations,
} from "./classic/horizonDbFirewallRules/index.js";
import {
  HorizonDbParameterGroupsOperations,
  _getHorizonDbParameterGroupsOperations,
} from "./classic/horizonDbParameterGroups/index.js";
import {
  HorizonDbPoolsOperations,
  _getHorizonDbPoolsOperations,
} from "./classic/horizonDbPools/index.js";
import {
  HorizonDbPrivateEndpointConnectionsOperations,
  _getHorizonDbPrivateEndpointConnectionsOperations,
} from "./classic/horizonDbPrivateEndpointConnections/index.js";
import {
  HorizonDbPrivateLinkResourcesOperations,
  _getHorizonDbPrivateLinkResourcesOperations,
} from "./classic/horizonDbPrivateLinkResources/index.js";
import {
  HorizonDbReplicasOperations,
  _getHorizonDbReplicasOperations,
} from "./classic/horizonDbReplicas/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { HorizonDbClientOptionalParams } from "./api/horizonDbContext.js";

export class HorizonDbClient {
  private _client: HorizonDbContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Resource Provider API for managing HorizonDb clusters, pools, replicas, and firewall rules */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: HorizonDbClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createHorizonDb(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.horizonDbParameterGroups = _getHorizonDbParameterGroupsOperations(this._client);
    this.horizonDbPrivateLinkResources = _getHorizonDbPrivateLinkResourcesOperations(this._client);
    this.horizonDbPrivateEndpointConnections = _getHorizonDbPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.horizonDbFirewallRules = _getHorizonDbFirewallRulesOperations(this._client);
    this.horizonDbReplicas = _getHorizonDbReplicasOperations(this._client);
    this.horizonDbPools = _getHorizonDbPoolsOperations(this._client);
    this.horizonDbClusters = _getHorizonDbClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for horizonDbParameterGroups */
  public readonly horizonDbParameterGroups: HorizonDbParameterGroupsOperations;
  /** The operation groups for horizonDbPrivateLinkResources */
  public readonly horizonDbPrivateLinkResources: HorizonDbPrivateLinkResourcesOperations;
  /** The operation groups for horizonDbPrivateEndpointConnections */
  public readonly horizonDbPrivateEndpointConnections: HorizonDbPrivateEndpointConnectionsOperations;
  /** The operation groups for horizonDbFirewallRules */
  public readonly horizonDbFirewallRules: HorizonDbFirewallRulesOperations;
  /** The operation groups for horizonDbReplicas */
  public readonly horizonDbReplicas: HorizonDbReplicasOperations;
  /** The operation groups for horizonDbPools */
  public readonly horizonDbPools: HorizonDbPoolsOperations;
  /** The operation groups for horizonDbClusters */
  public readonly horizonDbClusters: HorizonDbClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
