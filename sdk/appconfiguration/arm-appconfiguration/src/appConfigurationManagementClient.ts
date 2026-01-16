// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AppConfigurationManagementContext,
  AppConfigurationManagementClientOptionalParams,
} from "./api/index.js";
import { createAppConfigurationManagement } from "./api/index.js";
import type { ConfigurationStoresOperations } from "./classic/configurationStores/index.js";
import { _getConfigurationStoresOperations } from "./classic/configurationStores/index.js";
import type { KeyValuesOperations } from "./classic/keyValues/index.js";
import { _getKeyValuesOperations } from "./classic/keyValues/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { ReplicasOperations } from "./classic/replicas/index.js";
import { _getReplicasOperations } from "./classic/replicas/index.js";
import type { SnapshotsOperations } from "./classic/snapshots/index.js";
import { _getSnapshotsOperations } from "./classic/snapshots/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { AppConfigurationManagementClientOptionalParams } from "./api/appConfigurationManagementContext.js";

export class AppConfigurationManagementClient {
  private _client: AppConfigurationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: AppConfigurationManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AppConfigurationManagementClientOptionalParams,
  );
  /** // (missing-service-description) Add service description */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AppConfigurationManagementClientOptionalParams,
    options?: AppConfigurationManagementClientOptionalParams,
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
    this._client = createAppConfigurationManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = _getOperationsOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.replicas = _getReplicasOperations(this._client);
    this.keyValues = _getKeyValuesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.configurationStores = _getConfigurationStoresOperations(this._client);
  }

  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for snapshots */
  public readonly snapshots: SnapshotsOperations;
  /** The operation groups for replicas */
  public readonly replicas: ReplicasOperations;
  /** The operation groups for keyValues */
  public readonly keyValues: KeyValuesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for configurationStores */
  public readonly configurationStores: ConfigurationStoresOperations;
}
