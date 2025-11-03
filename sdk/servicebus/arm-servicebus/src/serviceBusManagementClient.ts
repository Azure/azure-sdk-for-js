// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceBusManagementContext,
  ServiceBusManagementClientOptionalParams,
} from "./api/index.js";
import { createServiceBusManagement } from "./api/index.js";
import type { DisasterRecoveryConfigsOperations } from "./classic/disasterRecoveryConfigs/index.js";
import { _getDisasterRecoveryConfigsOperations } from "./classic/disasterRecoveryConfigs/index.js";
import type { MigrationConfigsOperations } from "./classic/migrationConfigs/index.js";
import { _getMigrationConfigsOperations } from "./classic/migrationConfigs/index.js";
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
import type { QueuesOperations } from "./classic/queues/index.js";
import { _getQueuesOperations } from "./classic/queues/index.js";
import type { RulesOperations } from "./classic/rules/index.js";
import { _getRulesOperations } from "./classic/rules/index.js";
import type { SubscriptionsOperations } from "./classic/subscriptions/index.js";
import { _getSubscriptionsOperations } from "./classic/subscriptions/index.js";
import type { TopicsOperations } from "./classic/topics/index.js";
import { _getTopicsOperations } from "./classic/topics/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ServiceBusManagementClientOptionalParams } from "./api/serviceBusManagementContext.js";

export class ServiceBusManagementClient {
  private _client: ServiceBusManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Service Bus client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ServiceBusManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createServiceBusManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.subscriptions = _getSubscriptionsOperations(this._client);
    this.networkSecurityPerimeterConfiguration =
      _getNetworkSecurityPerimeterConfigurationOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.namespaces = _getNamespacesOperations(this._client);
    this.rules = _getRulesOperations(this._client);
    this.migrationConfigs = _getMigrationConfigsOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.topics = _getTopicsOperations(this._client);
    this.queues = _getQueuesOperations(this._client);
    this.disasterRecoveryConfigs = _getDisasterRecoveryConfigsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for subscriptions */
  public readonly subscriptions: SubscriptionsOperations;
  /** The operation groups for networkSecurityPerimeterConfiguration */
  public readonly networkSecurityPerimeterConfiguration: NetworkSecurityPerimeterConfigurationOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for namespaces */
  public readonly namespaces: NamespacesOperations;
  /** The operation groups for rules */
  public readonly rules: RulesOperations;
  /** The operation groups for migrationConfigs */
  public readonly migrationConfigs: MigrationConfigsOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for topics */
  public readonly topics: TopicsOperations;
  /** The operation groups for queues */
  public readonly queues: QueuesOperations;
  /** The operation groups for disasterRecoveryConfigs */
  public readonly disasterRecoveryConfigs: DisasterRecoveryConfigsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
