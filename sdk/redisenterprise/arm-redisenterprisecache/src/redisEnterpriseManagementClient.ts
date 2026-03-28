// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RedisEnterpriseManagementContext,
  RedisEnterpriseManagementClientOptionalParams,
} from "./api/index.js";
import { createRedisEnterpriseManagement } from "./api/index.js";
import type { AccessPolicyAssignmentOperations } from "./classic/accessPolicyAssignment/index.js";
import { _getAccessPolicyAssignmentOperations } from "./classic/accessPolicyAssignment/index.js";
import type { DatabasesOperations } from "./classic/databases/index.js";
import { _getDatabasesOperations } from "./classic/databases/index.js";
import type { MigrationOperations } from "./classic/migration/index.js";
import { _getMigrationOperations } from "./classic/migration/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OperationsStatusOperations } from "./classic/operationsStatus/index.js";
import { _getOperationsStatusOperations } from "./classic/operationsStatus/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { RedisEnterpriseOperations } from "./classic/redisEnterprise/index.js";
import { _getRedisEnterpriseOperations } from "./classic/redisEnterprise/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { RedisEnterpriseManagementClientOptionalParams } from "./api/redisEnterpriseManagementContext.js";

export class RedisEnterpriseManagementClient {
  private _client: RedisEnterpriseManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** REST API for managing Redis Enterprise resources in Azure. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: RedisEnterpriseManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createRedisEnterpriseManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationsStatus = _getOperationsStatusOperations(this._client);
    this.migration = _getMigrationOperations(this._client);
    this.accessPolicyAssignment = _getAccessPolicyAssignmentOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.redisEnterprise = _getRedisEnterpriseOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.databases = _getDatabasesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for operationsStatus */
  public readonly operationsStatus: OperationsStatusOperations;
  /** The operation groups for migration */
  public readonly migration: MigrationOperations;
  /** The operation groups for accessPolicyAssignment */
  public readonly accessPolicyAssignment: AccessPolicyAssignmentOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for redisEnterprise */
  public readonly redisEnterprise: RedisEnterpriseOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for databases */
  public readonly databases: DatabasesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
