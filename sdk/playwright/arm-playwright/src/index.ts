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
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type PlaywrightWorkspace,
  type PlaywrightWorkspaceProperties,
  KnownProvisioningState,
  type ProvisioningState,
  KnownEnablementStatus,
  type EnablementStatus,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type PlaywrightWorkspaceUpdate,
  type PlaywrightWorkspaceUpdateProperties,
  type CheckNameAvailabilityRequest,
  type CheckNameAvailabilityResponse,
  KnownCheckNameAvailabilityReason,
  type CheckNameAvailabilityReason,
  type PlaywrightQuota,
  type PlaywrightQuotaProperties,
  type FreeTrialProperties,
  KnownFreeTrialState,
  type FreeTrialState,
  KnownQuotaName,
  type QuotaName,
  type ProxyResource,
  type PlaywrightWorkspaceQuota,
  type PlaywrightWorkspaceQuotaProperties,
  type PlaywrightWorkspaceFreeTrialProperties,
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
export { AzureClouds, type AzureSupportedClouds };
