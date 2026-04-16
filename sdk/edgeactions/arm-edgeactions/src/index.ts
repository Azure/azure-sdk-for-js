// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
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
export { type EdgeActionsManagementClientOptionalParams } from "./api/index.js";
export {
  type EdgeActionExecutionFiltersListByEdgeActionOptionalParams,
  type EdgeActionExecutionFiltersDeleteOptionalParams,
  type EdgeActionExecutionFiltersUpdateOptionalParams,
  type EdgeActionExecutionFiltersCreateOptionalParams,
  type EdgeActionExecutionFiltersGetOptionalParams,
} from "./api/edgeActionExecutionFilters/index.js";
export {
  type EdgeActionsListBySubscriptionOptionalParams,
  type EdgeActionsListByResourceGroupOptionalParams,
  type EdgeActionsDeleteOptionalParams,
  type EdgeActionsUpdateOptionalParams,
  type EdgeActionsCreateOptionalParams,
  type EdgeActionsGetOptionalParams,
} from "./api/edgeActions/index.js";
export {
  type EdgeActionVersionsSwapDefaultOptionalParams,
  type EdgeActionVersionsGetVersionCodeOptionalParams,
  type EdgeActionVersionsDeployVersionCodeOptionalParams,
  type EdgeActionVersionsListByEdgeActionOptionalParams,
  type EdgeActionVersionsDeleteOptionalParams,
  type EdgeActionVersionsUpdateOptionalParams,
  type EdgeActionVersionsCreateOptionalParams,
  type EdgeActionVersionsGetOptionalParams,
} from "./api/edgeActionVersions/index.js";
export {
  type EdgeActionExecutionFiltersOperations,
  type EdgeActionsOperations,
  type EdgeActionVersionsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
