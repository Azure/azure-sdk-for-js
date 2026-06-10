// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  EventHubManagementContext,
  EventHubManagementClientOptionalParams,
} from "./api/index.js";
import { createEventHubManagement } from "./api/index.js";
import type { ApplicationGroupOperations } from "./classic/applicationGroup/index.js";
import { _getApplicationGroupOperations } from "./classic/applicationGroup/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { ConfigurationOperations } from "./classic/configuration/index.js";
import { _getConfigurationOperations } from "./classic/configuration/index.js";
import type { ConsumerGroupsOperations } from "./classic/consumerGroups/index.js";
import { _getConsumerGroupsOperations } from "./classic/consumerGroups/index.js";
import type { DisasterRecoveryConfigsOperations } from "./classic/disasterRecoveryConfigs/index.js";
import { _getDisasterRecoveryConfigsOperations } from "./classic/disasterRecoveryConfigs/index.js";
import type { EventHubsOperations } from "./classic/eventHubs/index.js";
import { _getEventHubsOperations } from "./classic/eventHubs/index.js";
import type { NamespacesOperations } from "./classic/namespaces/index.js";
import { _getNamespacesOperations } from "./classic/namespaces/index.js";
import type { NetworkSecurityPerimeterConfigurationOperations } from "./classic/networkSecurityPerimeterConfiguration/index.js";
import { _getNetworkSecurityPerimeterConfigurationOperations } from "./classic/networkSecurityPerimeterConfiguration/index.js";
import type { NetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { _getNetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { SchemaRegistryOperations } from "./classic/schemaRegistry/index.js";
import { _getSchemaRegistryOperations } from "./classic/schemaRegistry/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { EventHubManagementClientOptionalParams } from "./api/eventHubManagementContext.js";

export class EventHubManagementClient {
  private _client: EventHubManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: EventHubManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: EventHubManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | EventHubManagementClientOptionalParams,
    options?: EventHubManagementClientOptionalParams,
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
    this._client = createEventHubManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.applicationGroup = _getApplicationGroupOperations(this._client);
    this.schemaRegistry = _getSchemaRegistryOperations(this._client);
    this.networkSecurityPerimeterConfiguration =
      _getNetworkSecurityPerimeterConfigurationOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.namespaces = _getNamespacesOperations(this._client);
    this.configuration = _getConfigurationOperations(this._client);
    this.consumerGroups = _getConsumerGroupsOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.eventHubs = _getEventHubsOperations(this._client);
    this.disasterRecoveryConfigs = _getDisasterRecoveryConfigsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for applicationGroup */
  public readonly applicationGroup: ApplicationGroupOperations;
  /** The operation groups for schemaRegistry */
  public readonly schemaRegistry: SchemaRegistryOperations;
  /** The operation groups for networkSecurityPerimeterConfiguration */
  public readonly networkSecurityPerimeterConfiguration: NetworkSecurityPerimeterConfigurationOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for namespaces */
  public readonly namespaces: NamespacesOperations;
  /** The operation groups for configuration */
  public readonly configuration: ConfigurationOperations;
  /** The operation groups for consumerGroups */
  public readonly consumerGroups: ConsumerGroupsOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for eventHubs */
  public readonly eventHubs: EventHubsOperations;
  /** The operation groups for disasterRecoveryConfigs */
  public readonly disasterRecoveryConfigs: DisasterRecoveryConfigsOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
