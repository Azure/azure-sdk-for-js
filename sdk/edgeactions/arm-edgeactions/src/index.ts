// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeActionsManagementClient } from "./edgeActionsManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  EdgeAction,
  EdgeActionProperties,
  ProvisioningState,
  EdgeActionAttachment,
  SkuType,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  EdgeActionUpdate,
  EdgeActionPropertiesUpdate,
  SkuTypeUpdate,
  EdgeActionVersion,
  EdgeActionVersionProperties,
  EdgeActionVersionDeploymentType,
  EdgeActionVersionValidationStatus,
  EdgeActionIsDefaultVersion,
  EdgeActionVersionUpdate,
  EdgeActionVersionUpdateProperties,
  VersionCode,
  EdgeActionExecutionFilter,
  EdgeActionExecutionFilterProperties,
  EdgeActionExecutionFilterUpdate,
  EdgeActionExecutionFilterUpdateProperties,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownCreatedByType,
  KnownEdgeActionVersionDeploymentType,
  KnownEdgeActionVersionValidationStatus,
  KnownEdgeActionIsDefaultVersion,
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
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
