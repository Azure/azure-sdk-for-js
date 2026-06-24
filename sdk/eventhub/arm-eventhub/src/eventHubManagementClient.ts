// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EventHubManagementContext,
  EventHubManagementClientOptionalParams,
  createEventHubManagement,
} from "./api/index.js";
import {
  ApplicationGroupOperationsOperations,
  _getApplicationGroupOperationsOperations,
} from "./classic/applicationGroupOperations/index.js";
import { ClustersOperations, _getClustersOperations } from "./classic/clusters/index.js";
import {
  ConfigurationOperations,
  _getConfigurationOperations,
} from "./classic/configuration/index.js";
import {
  ConsumerGroupsOperations,
  _getConsumerGroupsOperations,
} from "./classic/consumerGroups/index.js";
import {
  DisasterRecoveryConfigsOperations,
  _getDisasterRecoveryConfigsOperations,
} from "./classic/disasterRecoveryConfigs/index.js";
import { EventHubsOperations, _getEventHubsOperations } from "./classic/eventHubs/index.js";
import { NamespacesOperations, _getNamespacesOperations } from "./classic/namespaces/index.js";
import {
  NetworkSecurityPerimeterConfigurationOperationsOperations,
  _getNetworkSecurityPerimeterConfigurationOperationsOperations,
} from "./classic/networkSecurityPerimeterConfigurationOperations/index.js";
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
import {
  SchemaRegistryOperations,
  _getSchemaRegistryOperations,
} from "./classic/schemaRegistry/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
    this.applicationGroupOperations = _getApplicationGroupOperationsOperations(this._client);
    this.schemaRegistry = _getSchemaRegistryOperations(this._client);
    this.networkSecurityPerimeterConfigurationOperations =
      _getNetworkSecurityPerimeterConfigurationOperationsOperations(this._client);
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

  /** The operation groups for applicationGroupOperations */
  public readonly applicationGroupOperations: ApplicationGroupOperationsOperations;
  /** The operation groups for schemaRegistry */
  public readonly schemaRegistry: SchemaRegistryOperations;
  /** The operation groups for networkSecurityPerimeterConfigurationOperations */
  public readonly networkSecurityPerimeterConfigurationOperations: NetworkSecurityPerimeterConfigurationOperationsOperations;
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
