// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
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
export { type PlaywrightManagementClientOptionalParams } from "./api/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type PlaywrightQuotasListBySubscriptionOptionalParams,
  type PlaywrightQuotasGetOptionalParams,
} from "./api/playwrightQuotas/index.js";
export {
  type PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams,
  type PlaywrightWorkspaceQuotasGetOptionalParams,
} from "./api/playwrightWorkspaceQuotas/index.js";
export {
  type PlaywrightWorkspacesCheckNameAvailabilityOptionalParams,
  type PlaywrightWorkspacesListBySubscriptionOptionalParams,
  type PlaywrightWorkspacesListByResourceGroupOptionalParams,
  type PlaywrightWorkspacesDeleteOptionalParams,
  type PlaywrightWorkspacesUpdateOptionalParams,
  type PlaywrightWorkspacesCreateOrUpdateOptionalParams,
  type PlaywrightWorkspacesGetOptionalParams,
} from "./api/playwrightWorkspaces/index.js";
export {
  type OperationsOperations,
  type PlaywrightQuotasOperations,
  type PlaywrightWorkspaceQuotasOperations,
  type PlaywrightWorkspacesOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
