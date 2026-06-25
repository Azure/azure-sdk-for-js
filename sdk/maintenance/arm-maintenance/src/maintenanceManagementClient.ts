// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MaintenanceManagementContext,
  MaintenanceManagementClientOptionalParams,
  createMaintenanceManagement,
} from "./api/index.js";
import {
  ApplyUpdateForResourceGroupOperations,
  _getApplyUpdateForResourceGroupOperations,
} from "./classic/applyUpdateForResourceGroup/index.js";
import {
  ApplyUpdatesOperations,
  _getApplyUpdatesOperations,
} from "./classic/applyUpdates/index.js";
import {
  ConfigurationAssignmentsOperations,
  _getConfigurationAssignmentsOperations,
} from "./classic/configurationAssignments/index.js";
import {
  ConfigurationAssignmentsForResourceGroupOperations,
  _getConfigurationAssignmentsForResourceGroupOperations,
} from "./classic/configurationAssignmentsForResourceGroup/index.js";
import {
  ConfigurationAssignmentsForSubscriptionsOperations,
  _getConfigurationAssignmentsForSubscriptionsOperations,
} from "./classic/configurationAssignmentsForSubscriptions/index.js";
import {
  ConfigurationAssignmentsWithinSubscriptionOperations,
  _getConfigurationAssignmentsWithinSubscriptionOperations,
} from "./classic/configurationAssignmentsWithinSubscription/index.js";
import {
  MaintenanceConfigurationsOperations,
  _getMaintenanceConfigurationsOperations,
} from "./classic/maintenanceConfigurations/index.js";
import {
  MaintenanceConfigurationsForResourceGroupOperations,
  _getMaintenanceConfigurationsForResourceGroupOperations,
} from "./classic/maintenanceConfigurationsForResourceGroup/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PublicMaintenanceConfigurationsOperations,
  _getPublicMaintenanceConfigurationsOperations,
} from "./classic/publicMaintenanceConfigurations/index.js";
import {
  ScheduledEventsOperations,
  _getScheduledEventsOperations,
} from "./classic/scheduledEvents/index.js";
import { UpdatesOperations, _getUpdatesOperations } from "./classic/updates/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MaintenanceManagementClientOptionalParams } from "./api/maintenanceManagementContext.js";

export class MaintenanceManagementClient {
  private _client: MaintenanceManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: MaintenanceManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MaintenanceManagementClientOptionalParams,
  );
  /** Azure Maintenance Management Client */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MaintenanceManagementClientOptionalParams,
    options?: MaintenanceManagementClientOptionalParams,
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
    this._client = createMaintenanceManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.updates = _getUpdatesOperations(this._client);
    this.applyUpdateForResourceGroup = _getApplyUpdateForResourceGroupOperations(this._client);
    this.scheduledEvents = _getScheduledEventsOperations(this._client);
    this.configurationAssignmentsWithinSubscription =
      _getConfigurationAssignmentsWithinSubscriptionOperations(this._client);
    this.maintenanceConfigurationsForResourceGroup =
      _getMaintenanceConfigurationsForResourceGroupOperations(this._client);
    this.publicMaintenanceConfigurations = _getPublicMaintenanceConfigurationsOperations(
      this._client,
    );
    this.configurationAssignmentsForResourceGroup =
      _getConfigurationAssignmentsForResourceGroupOperations(this._client);
    this.configurationAssignmentsForSubscriptions =
      _getConfigurationAssignmentsForSubscriptionsOperations(this._client);
    this.configurationAssignments = _getConfigurationAssignmentsOperations(this._client);
    this.applyUpdates = _getApplyUpdatesOperations(this._client);
    this.maintenanceConfigurations = _getMaintenanceConfigurationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for updates */
  public readonly updates: UpdatesOperations;
  /** The operation groups for applyUpdateForResourceGroup */
  public readonly applyUpdateForResourceGroup: ApplyUpdateForResourceGroupOperations;
  /** The operation groups for scheduledEvents */
  public readonly scheduledEvents: ScheduledEventsOperations;
  /** The operation groups for configurationAssignmentsWithinSubscription */
  public readonly configurationAssignmentsWithinSubscription: ConfigurationAssignmentsWithinSubscriptionOperations;
  /** The operation groups for maintenanceConfigurationsForResourceGroup */
  public readonly maintenanceConfigurationsForResourceGroup: MaintenanceConfigurationsForResourceGroupOperations;
  /** The operation groups for publicMaintenanceConfigurations */
  public readonly publicMaintenanceConfigurations: PublicMaintenanceConfigurationsOperations;
  /** The operation groups for configurationAssignmentsForResourceGroup */
  public readonly configurationAssignmentsForResourceGroup: ConfigurationAssignmentsForResourceGroupOperations;
  /** The operation groups for configurationAssignmentsForSubscriptions */
  public readonly configurationAssignmentsForSubscriptions: ConfigurationAssignmentsForSubscriptionsOperations;
  /** The operation groups for configurationAssignments */
  public readonly configurationAssignments: ConfigurationAssignmentsOperations;
  /** The operation groups for applyUpdates */
  public readonly applyUpdates: ApplyUpdatesOperations;
  /** The operation groups for maintenanceConfigurations */
  public readonly maintenanceConfigurations: MaintenanceConfigurationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
