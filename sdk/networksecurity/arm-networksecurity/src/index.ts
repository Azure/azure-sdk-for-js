// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NetworkSecurityManagementClient } from "./networkSecurityManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  OperationStatusResult,
  NeuroShieldResource,
  NeuroShieldProperties,
  ProvisioningStateNeuroShield,
  NeuroShieldResponseMode,
  NeuroShieldSeverityThreshold,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  NeuroShieldPatch,
  NeuroShieldPatchProperties,
  NeuroShieldSummary,
  NeuroShieldSummaryProperties,
  ResourceProvisioningState,
  ProxyResource,
  NeuroShieldProtectedResource,
  NeuroShieldProtectedResourceProperties,
  NeuroShieldProtectedResourceIdentity,
  ManagedServiceIdentityType,
  NeuroShieldProtectedResourceUserAssignedIdentity,
  NeuroShieldAgentHealth,
  NeuroShieldInventoryUploadRequestMetadata,
  NeuroShieldInventoryUploadRequestResult,
  NeuroShieldFinding,
  NeuroShieldFindingProperties,
  NeuroShieldFindingStatus,
  NeuroShieldMitigationActionResult,
  NeuroShieldMitigation,
  NeuroShieldMitigationProperties,
  NeuroShieldMitigationStatus,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningStateNeuroShield,
  KnownNeuroShieldResponseMode,
  KnownNeuroShieldSeverityThreshold,
  KnownCreatedByType,
  KnownResourceProvisioningState,
  KnownManagedServiceIdentityType,
  KnownNeuroShieldFindingStatus,
  KnownNeuroShieldMitigationStatus,
  KnownVersions,
} from "./models/index.js";
export type { NetworkSecurityManagementClientOptionalParams } from "./api/index.js";
export type {
  NeuroShieldFindingsRollbackOptionalParams,
  NeuroShieldFindingsMitigateOptionalParams,
  NeuroShieldFindingsListByNeuroShieldOptionalParams,
  NeuroShieldFindingsListOptionalParams,
  NeuroShieldFindingsGetOptionalParams,
} from "./api/neuroShieldFindings/index.js";
export type {
  NeuroShieldMitigationsRollbackOptionalParams,
  NeuroShieldMitigationsExecuteOptionalParams,
  NeuroShieldMitigationsListByNeuroShieldOptionalParams,
  NeuroShieldMitigationsListOptionalParams,
  NeuroShieldMitigationsGetOptionalParams,
} from "./api/neuroShieldMitigations/index.js";
export type { NeuroShieldOperationStatusesGetOptionalParams } from "./api/neuroShieldOperationStatuses/index.js";
export type {
  NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams,
  NeuroShieldProtectedResourcesListOptionalParams,
  NeuroShieldProtectedResourcesDeleteOptionalParams,
  NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams,
  NeuroShieldProtectedResourcesGetOptionalParams,
} from "./api/neuroShieldProtectedResources/index.js";
export type {
  NeuroShieldsListBySubscriptionOptionalParams,
  NeuroShieldsListByResourceGroupOptionalParams,
  NeuroShieldsDeleteOptionalParams,
  NeuroShieldsUpdateOptionalParams,
  NeuroShieldsCreateOrUpdateOptionalParams,
  NeuroShieldsGetOptionalParams,
} from "./api/neuroShields/index.js";
export type {
  NeuroShieldSummariesGetOptionalParams,
  NeuroShieldSummariesListOptionalParams,
} from "./api/neuroShieldSummaries/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  NeuroShieldFindingsOperations,
  NeuroShieldMitigationsOperations,
  NeuroShieldOperationStatusesOperations,
  NeuroShieldProtectedResourcesOperations,
  NeuroShieldsOperations,
  NeuroShieldSummariesOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
