// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext, HorizonDbClientOptionalParams } from "./api/index.js";
import { createHorizonDb } from "./api/index.js";
import type { HorizonDbClustersOperations } from "./classic/horizonDbClusters/index.js";
import { _getHorizonDbClustersOperations } from "./classic/horizonDbClusters/index.js";
import type { HorizonDbFirewallRulesOperations } from "./classic/horizonDbFirewallRules/index.js";
import { _getHorizonDbFirewallRulesOperations } from "./classic/horizonDbFirewallRules/index.js";
import type { HorizonDbParameterGroupsOperations } from "./classic/horizonDbParameterGroups/index.js";
import { _getHorizonDbParameterGroupsOperations } from "./classic/horizonDbParameterGroups/index.js";
import type { HorizonDbPoolsOperations } from "./classic/horizonDbPools/index.js";
import { _getHorizonDbPoolsOperations } from "./classic/horizonDbPools/index.js";
import type { HorizonDbPrivateEndpointConnectionsOperations } from "./classic/horizonDbPrivateEndpointConnections/index.js";
import { _getHorizonDbPrivateEndpointConnectionsOperations } from "./classic/horizonDbPrivateEndpointConnections/index.js";
import type { HorizonDbPrivateLinkResourcesOperations } from "./classic/horizonDbPrivateLinkResources/index.js";
import { _getHorizonDbPrivateLinkResourcesOperations } from "./classic/horizonDbPrivateLinkResources/index.js";
import type { HorizonDbReplicasOperations } from "./classic/horizonDbReplicas/index.js";
import { _getHorizonDbReplicasOperations } from "./classic/horizonDbReplicas/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
