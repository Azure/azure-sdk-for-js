// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AppConfigurationManagementContext,
  AppConfigurationManagementClientOptionalParams,
  createAppConfigurationManagement,
} from "./api/index.js";
import {
  ConfigurationStoresOperations,
  _getConfigurationStoresOperations,
} from "./classic/configurationStores/index.js";
import { KeyValuesOperations, _getKeyValuesOperations } from "./classic/keyValues/index.js";
import {
  NetworkSecurityPerimeterConfigurationsOperations,
  _getNetworkSecurityPerimeterConfigurationsOperations,
} from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { ReplicasOperations, _getReplicasOperations } from "./classic/replicas/index.js";
import { SnapshotsOperations, _getSnapshotsOperations } from "./classic/snapshots/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AppConfigurationManagementClientOptionalParams } from "./api/appConfigurationManagementContext.js";

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
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
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
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for configurationStores */
  public readonly configurationStores: ConfigurationStoresOperations;
}
