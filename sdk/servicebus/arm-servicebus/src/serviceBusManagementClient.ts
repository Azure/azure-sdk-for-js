// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ServiceBusManagementContext,
  ServiceBusManagementClientOptionalParams,
  createServiceBusManagement,
} from "./api/index.js";
import {
  DisasterRecoveryConfigsOperations,
  _getDisasterRecoveryConfigsOperations,
} from "./classic/disasterRecoveryConfigs/index.js";
import {
  MigrationConfigsOperations,
  _getMigrationConfigsOperations,
} from "./classic/migrationConfigs/index.js";
import { NamespacesOperations, _getNamespacesOperations } from "./classic/namespaces/index.js";
import {
  NetworkSecurityPerimeterConfigurationOperations,
  _getNetworkSecurityPerimeterConfigurationOperations,
} from "./classic/networkSecurityPerimeterConfiguration/index.js";
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
import { QueuesOperations, _getQueuesOperations } from "./classic/queues/index.js";
import { RulesOperations, _getRulesOperations } from "./classic/rules/index.js";
import {
  SubscriptionsOperations,
  _getSubscriptionsOperations,
} from "./classic/subscriptions/index.js";
import { TopicsOperations, _getTopicsOperations } from "./classic/topics/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ServiceBusManagementClientOptionalParams } from "./api/serviceBusManagementContext.js";

export class ServiceBusManagementClient {
  private _client: ServiceBusManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ServiceBusManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ServiceBusManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ServiceBusManagementClientOptionalParams,
    options?: ServiceBusManagementClientOptionalParams,
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
    this._client = createServiceBusManagement(credential, subscriptionId ?? "", {
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
