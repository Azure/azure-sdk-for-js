// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeActionsManagementClient } from "./edgeActionsManagementClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type EdgeAction,
  type EdgeActionProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type EdgeActionAttachment,
  type SkuType,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type EdgeActionUpdate,
  type EdgeActionPropertiesUpdate,
  type SkuTypeUpdate,
  type EdgeActionVersion,
  type EdgeActionVersionProperties,
  KnownEdgeActionVersionDeploymentType,
  type EdgeActionVersionDeploymentType,
  KnownEdgeActionVersionValidationStatus,
  type EdgeActionVersionValidationStatus,
  KnownEdgeActionIsDefaultVersion,
  type EdgeActionIsDefaultVersion,
  type EdgeActionVersionUpdate,
  type EdgeActionVersionUpdateProperties,
  type VersionCode,
  type EdgeActionExecutionFilter,
  type EdgeActionExecutionFilterProperties,
  type EdgeActionExecutionFilterUpdate,
  type EdgeActionExecutionFilterUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export type { EdgeActionsManagementClientOptionalParams } from "./api/index.js";
export type {
  EdgeActionExecutionFiltersListByEdgeActionOptionalParams,
  EdgeActionExecutionFiltersDeleteOptionalParams,
  EdgeActionExecutionFiltersUpdateOptionalParams,
  EdgeActionExecutionFiltersCreateOptionalParams,
  EdgeActionExecutionFiltersGetOptionalParams,
} from "./api/edgeActionExecutionFilters/index.js";
export type {
  EdgeActionsListBySubscriptionOptionalParams,
  EdgeActionsListByResourceGroupOptionalParams,
  EdgeActionsDeleteOptionalParams,
  EdgeActionsUpdateOptionalParams,
  EdgeActionsCreateOptionalParams,
  EdgeActionsGetOptionalParams,
} from "./api/edgeActions/index.js";
export type {
  EdgeActionVersionsSwapDefaultOptionalParams,
  EdgeActionVersionsGetVersionCodeOptionalParams,
  EdgeActionVersionsDeployVersionCodeOptionalParams,
  EdgeActionVersionsListByEdgeActionOptionalParams,
  EdgeActionVersionsDeleteOptionalParams,
  EdgeActionVersionsUpdateOptionalParams,
  EdgeActionVersionsCreateOptionalParams,
  EdgeActionVersionsGetOptionalParams,
} from "./api/edgeActionVersions/index.js";
export type {
  EdgeActionExecutionFiltersOperations,
  EdgeActionsOperations,
  EdgeActionVersionsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
