// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RedisManagementContext,
  RedisManagementClientOptionalParams,
  createRedisManagement,
} from "./api/index.js";
import {
  AccessPolicyOperations,
  _getAccessPolicyOperations,
} from "./classic/accessPolicy/index.js";
import {
  AccessPolicyAssignmentOperations,
  _getAccessPolicyAssignmentOperations,
} from "./classic/accessPolicyAssignment/index.js";
import {
  AsyncOperationStatusOperations,
  _getAsyncOperationStatusOperations,
} from "./classic/asyncOperationStatus/index.js";
import {
  FirewallRulesOperations,
  _getFirewallRulesOperations,
} from "./classic/firewallRules/index.js";
import {
  LinkedServerOperations,
  _getLinkedServerOperations,
} from "./classic/linkedServer/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PatchSchedulesOperations,
  _getPatchSchedulesOperations,
} from "./classic/patchSchedules/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { RedisOperations, _getRedisOperations } from "./classic/redis/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { RedisManagementClientOptionalParams } from "./api/redisManagementContext.js";

export class RedisManagementClient {
  private _client: RedisManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: RedisManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: RedisManagementClientOptionalParams,
  );
  /** REST API for Azure Redis Cache Service. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | RedisManagementClientOptionalParams,
    options?: RedisManagementClientOptionalParams,
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
    this._client = createRedisManagement(credential, subscriptionId ?? "", {
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
