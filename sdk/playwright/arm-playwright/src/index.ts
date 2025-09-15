// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PlaywrightManagementClient } from "./playwrightManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  PlaywrightWorkspace,
  PlaywrightWorkspaceProperties,
  KnownProvisioningState,
  ProvisioningState,
  KnownEnablementStatus,
  EnablementStatus,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  PlaywrightWorkspaceUpdate,
  PlaywrightWorkspaceUpdateProperties,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  KnownCheckNameAvailabilityReason,
  CheckNameAvailabilityReason,
  PlaywrightQuota,
  PlaywrightQuotaProperties,
  FreeTrialProperties,
  KnownFreeTrialState,
  FreeTrialState,
  KnownQuotaName,
  QuotaName,
  ProxyResource,
  PlaywrightWorkspaceQuota,
  PlaywrightWorkspaceQuotaProperties,
  PlaywrightWorkspaceFreeTrialProperties,
  KnownVersions,
} from "./models/index.js";
export { PlaywrightManagementClientOptionalParams } from "./api/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  PlaywrightQuotasListBySubscriptionOptionalParams,
  PlaywrightQuotasGetOptionalParams,
} from "./api/playwrightQuotas/index.js";
export {
  PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams,
  PlaywrightWorkspaceQuotasGetOptionalParams,
} from "./api/playwrightWorkspaceQuotas/index.js";
export {
  PlaywrightWorkspacesCheckNameAvailabilityOptionalParams,
  PlaywrightWorkspacesListBySubscriptionOptionalParams,
  PlaywrightWorkspacesListByResourceGroupOptionalParams,
  PlaywrightWorkspacesDeleteOptionalParams,
  PlaywrightWorkspacesUpdateOptionalParams,
  PlaywrightWorkspacesCreateOrUpdateOptionalParams,
  PlaywrightWorkspacesGetOptionalParams,
} from "./api/playwrightWorkspaces/index.js";
export {
  OperationsOperations,
  PlaywrightQuotasOperations,
  PlaywrightWorkspaceQuotasOperations,
  PlaywrightWorkspacesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
