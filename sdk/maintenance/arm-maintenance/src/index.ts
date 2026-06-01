// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MaintenanceManagementClient } from "./maintenanceManagementClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  MaintenanceError,
  ErrorDetails,
  MaintenanceConfiguration,
  MaintenanceConfigurationProperties,
  MaintenanceScope,
  MaintenanceWindow,
  Visibility,
  InputPatchConfiguration,
  RebootOptions,
  InputWindowsParameters,
  InputLinuxParameters,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ApplyUpdate,
  ApplyUpdateProperties,
  UpdateStatus,
  ConfigurationAssignment,
  ConfigurationAssignmentProperties,
  ConfigurationAssignmentFilterProperties,
  TagSettingsProperties,
  TagOperators,
  ScheduledEventApproveResponse,
  Update,
  ImpactType,
  UpdateProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownMaintenanceScope,
  KnownVisibility,
  KnownRebootOptions,
  KnownCreatedByType,
  KnownUpdateStatus,
  KnownImpactType,
  KnownVersions,
} from "./models/index.js";
export type { MaintenanceManagementClientOptionalParams } from "./api/index.js";
export type { ApplyUpdateForResourceGroupListOptionalParams } from "./api/applyUpdateForResourceGroup/index.js";
export type {
  ApplyUpdatesCreateOrUpdateOptionalParams,
  ApplyUpdatesCreateOrUpdateParentOptionalParams,
  ApplyUpdatesListOptionalParams,
  ApplyUpdatesCreateOrUpdateOrCancelOptionalParams,
  ApplyUpdatesGetOptionalParams,
  ApplyUpdatesGetParentOptionalParams,
} from "./api/applyUpdates/index.js";
export type {
  ConfigurationAssignmentsListOptionalParams,
  ConfigurationAssignmentsDeleteOptionalParams,
  ConfigurationAssignmentsCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsGetOptionalParams,
  ConfigurationAssignmentsListParentOptionalParams,
  ConfigurationAssignmentsDeleteParentOptionalParams,
  ConfigurationAssignmentsCreateOrUpdateParentOptionalParams,
  ConfigurationAssignmentsGetParentOptionalParams,
} from "./api/configurationAssignments/index.js";
export type {
  ConfigurationAssignmentsForResourceGroupDeleteOptionalParams,
  ConfigurationAssignmentsForResourceGroupUpdateOptionalParams,
  ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsForResourceGroupGetOptionalParams,
} from "./api/configurationAssignmentsForResourceGroup/index.js";
export type {
  ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams,
  ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsGetOptionalParams,
} from "./api/configurationAssignmentsForSubscriptions/index.js";
export type { ConfigurationAssignmentsWithinSubscriptionListOptionalParams } from "./api/configurationAssignmentsWithinSubscription/index.js";
export type {
  MaintenanceConfigurationsListOptionalParams,
  MaintenanceConfigurationsDeleteOptionalParams,
  MaintenanceConfigurationsUpdateOptionalParams,
  MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  MaintenanceConfigurationsGetOptionalParams,
} from "./api/maintenanceConfigurations/index.js";
export type { MaintenanceConfigurationsForResourceGroupListOptionalParams } from "./api/maintenanceConfigurationsForResourceGroup/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PublicMaintenanceConfigurationsListOptionalParams,
  PublicMaintenanceConfigurationsGetOptionalParams,
} from "./api/publicMaintenanceConfigurations/index.js";
export type { ScheduledEventAcknowledgeOptionalParams } from "./api/scheduledEvent/index.js";
export type {
  UpdatesListOptionalParams,
  UpdatesListParentOptionalParams,
} from "./api/updates/index.js";
export type {
  ApplyUpdateForResourceGroupOperations,
  ApplyUpdatesOperations,
  ConfigurationAssignmentsOperations,
  ConfigurationAssignmentsForResourceGroupOperations,
  ConfigurationAssignmentsForSubscriptionsOperations,
  ConfigurationAssignmentsWithinSubscriptionOperations,
  MaintenanceConfigurationsOperations,
  MaintenanceConfigurationsForResourceGroupOperations,
  OperationsOperations,
  PublicMaintenanceConfigurationsOperations,
  ScheduledEventOperations,
  UpdatesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
