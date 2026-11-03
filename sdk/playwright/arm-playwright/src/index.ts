// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PlaywrightManagementClient } from "./playwrightManagementClient.js";
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
  PlaywrightWorkspace,
  PlaywrightWorkspaceProperties,
  ProvisioningState,
  EnablementStatus,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  PlaywrightWorkspaceUpdate,
  PlaywrightWorkspaceUpdateProperties,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
  PlaywrightQuota,
  PlaywrightQuotaProperties,
  FreeTrialProperties,
  FreeTrialState,
  QuotaName,
  ProxyResource,
  PlaywrightWorkspaceQuota,
  PlaywrightWorkspaceQuotaProperties,
  PlaywrightWorkspaceFreeTrialProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownEnablementStatus,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownCheckNameAvailabilityReason,
  KnownFreeTrialState,
  KnownQuotaName,
  KnownVersions,
} from "./models/index.js";
export type { PlaywrightManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PlaywrightQuotasListBySubscriptionOptionalParams,
  PlaywrightQuotasGetOptionalParams,
} from "./api/playwrightQuotas/index.js";
export type {
  PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams,
  PlaywrightWorkspaceQuotasGetOptionalParams,
} from "./api/playwrightWorkspaceQuotas/index.js";
export type {
  PlaywrightWorkspacesCheckNameAvailabilityOptionalParams,
  PlaywrightWorkspacesListBySubscriptionOptionalParams,
  PlaywrightWorkspacesListByResourceGroupOptionalParams,
  PlaywrightWorkspacesDeleteOptionalParams,
  PlaywrightWorkspacesUpdateOptionalParams,
  PlaywrightWorkspacesCreateOrUpdateOptionalParams,
  PlaywrightWorkspacesGetOptionalParams,
} from "./api/playwrightWorkspaces/index.js";
export type {
  OperationsOperations,
  PlaywrightQuotasOperations,
  PlaywrightWorkspaceQuotasOperations,
  PlaywrightWorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
