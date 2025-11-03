// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MaintenanceManagementClient } from "./maintenanceManagementClient.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  MaintenanceError,
  ErrorDetails,
  MaintenanceConfiguration,
  MaintenanceConfigurationProperties,
  KnownMaintenanceScope,
  MaintenanceScope,
  MaintenanceWindow,
  KnownVisibility,
  Visibility,
  InputPatchConfiguration,
  KnownRebootOptions,
  RebootOptions,
  InputWindowsParameters,
  InputLinuxParameters,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ApplyUpdate,
  ApplyUpdateProperties,
  KnownUpdateStatus,
  UpdateStatus,
  ConfigurationAssignment,
  ConfigurationAssignmentProperties,
  ConfigurationAssignmentFilterProperties,
  TagSettingsProperties,
  TagOperators,
  ScheduledEventApproveResponse,
  Update,
  KnownImpactType,
  ImpactType,
  UpdateProperties,
  KnownVersions,
} from "./models/index.js";
export { MaintenanceManagementClientOptionalParams } from "./api/index.js";
export { ApplyUpdateForResourceGroupListOptionalParams } from "./api/applyUpdateForResourceGroup/index.js";
export {
  ApplyUpdatesCreateOrUpdateOptionalParams,
  ApplyUpdatesCreateOrUpdateParentOptionalParams,
  ApplyUpdatesListOptionalParams,
  ApplyUpdatesCreateOrUpdateOrCancelOptionalParams,
  ApplyUpdatesGetOptionalParams,
  ApplyUpdatesGetParentOptionalParams,
} from "./api/applyUpdates/index.js";
export {
  ConfigurationAssignmentsListOptionalParams,
  ConfigurationAssignmentsDeleteOptionalParams,
  ConfigurationAssignmentsCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsGetOptionalParams,
  ConfigurationAssignmentsListParentOptionalParams,
  ConfigurationAssignmentsDeleteParentOptionalParams,
  ConfigurationAssignmentsCreateOrUpdateParentOptionalParams,
  ConfigurationAssignmentsGetParentOptionalParams,
} from "./api/configurationAssignments/index.js";
export {
  ConfigurationAssignmentsForResourceGroupDeleteOptionalParams,
  ConfigurationAssignmentsForResourceGroupUpdateOptionalParams,
  ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsForResourceGroupGetOptionalParams,
} from "./api/configurationAssignmentsForResourceGroup/index.js";
export {
  ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams,
  ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsGetOptionalParams,
} from "./api/configurationAssignmentsForSubscriptions/index.js";
export { ConfigurationAssignmentsWithinSubscriptionListOptionalParams } from "./api/configurationAssignmentsWithinSubscription/index.js";
export {
  MaintenanceConfigurationsListOptionalParams,
  MaintenanceConfigurationsDeleteOptionalParams,
  MaintenanceConfigurationsUpdateOptionalParams,
  MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  MaintenanceConfigurationsGetOptionalParams,
} from "./api/maintenanceConfigurations/index.js";
export { MaintenanceConfigurationsForResourceGroupListOptionalParams } from "./api/maintenanceConfigurationsForResourceGroup/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  PublicMaintenanceConfigurationsListOptionalParams,
  PublicMaintenanceConfigurationsGetOptionalParams,
} from "./api/publicMaintenanceConfigurations/index.js";
export { ScheduledEventAcknowledgeOptionalParams } from "./api/scheduledEvent/index.js";
export { UpdatesListOptionalParams, UpdatesListParentOptionalParams } from "./api/updates/index.js";
export {
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
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
