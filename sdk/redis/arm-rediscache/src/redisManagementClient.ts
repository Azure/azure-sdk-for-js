// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext, RedisManagementClientOptionalParams } from "./api/index.js";
import { createRedisManagement } from "./api/index.js";
import type { AccessPolicyOperations } from "./classic/accessPolicy/index.js";
import { _getAccessPolicyOperations } from "./classic/accessPolicy/index.js";
import type { AccessPolicyAssignmentOperations } from "./classic/accessPolicyAssignment/index.js";
import { _getAccessPolicyAssignmentOperations } from "./classic/accessPolicyAssignment/index.js";
import type { AsyncOperationStatusOperations } from "./classic/asyncOperationStatus/index.js";
import { _getAsyncOperationStatusOperations } from "./classic/asyncOperationStatus/index.js";
import type { FirewallRulesOperations } from "./classic/firewallRules/index.js";
import { _getFirewallRulesOperations } from "./classic/firewallRules/index.js";
import type { LinkedServerOperations } from "./classic/linkedServer/index.js";
import { _getLinkedServerOperations } from "./classic/linkedServer/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PatchSchedulesOperations } from "./classic/patchSchedules/index.js";
import { _getPatchSchedulesOperations } from "./classic/patchSchedules/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { RedisOperations } from "./classic/redis/index.js";
import { _getRedisOperations } from "./classic/redis/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { RedisManagementClientOptionalParams } from "./api/redisManagementContext.js";

export class RedisManagementClient {
  private _client: RedisManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** REST API for Azure Redis Cache Service. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: RedisManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createRedisManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.asyncOperationStatus = _getAsyncOperationStatusOperations(this._client);
    this.accessPolicyAssignment = _getAccessPolicyAssignmentOperations(this._client);
    this.accessPolicy = _getAccessPolicyOperations(this._client);
    this.patchSchedules = _getPatchSchedulesOperations(this._client);
    this.firewallRules = _getFirewallRulesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.redis = _getRedisOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.linkedServer = _getLinkedServerOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for asyncOperationStatus */
  public readonly asyncOperationStatus: AsyncOperationStatusOperations;
  /** The operation groups for accessPolicyAssignment */
  public readonly accessPolicyAssignment: AccessPolicyAssignmentOperations;
  /** The operation groups for accessPolicy */
  public readonly accessPolicy: AccessPolicyOperations;
  /** The operation groups for patchSchedules */
  public readonly patchSchedules: PatchSchedulesOperations;
  /** The operation groups for firewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for redis */
  public readonly redis: RedisOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for linkedServer */
  public readonly linkedServer: LinkedServerOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
