// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeActionsManagementClient } from "./edgeActionsManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  EdgeAction,
  EdgeActionProperties,
  KnownProvisioningState,
  ProvisioningState,
  EdgeActionAttachment,
  SkuType,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  EdgeActionUpdate,
  EdgeActionPropertiesUpdate,
  SkuTypeUpdate,
  EdgeActionVersion,
  EdgeActionVersionProperties,
  KnownEdgeActionVersionDeploymentType,
  EdgeActionVersionDeploymentType,
  KnownEdgeActionVersionValidationStatus,
  EdgeActionVersionValidationStatus,
  KnownEdgeActionIsDefaultVersion,
  EdgeActionIsDefaultVersion,
  EdgeActionVersionUpdate,
  EdgeActionVersionUpdateProperties,
  VersionCode,
  EdgeActionExecutionFilter,
  EdgeActionExecutionFilterProperties,
  EdgeActionExecutionFilterUpdate,
  EdgeActionExecutionFilterUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export { EdgeActionsManagementClientOptionalParams } from "./api/index.js";
export {
  EdgeActionExecutionFiltersListByEdgeActionOptionalParams,
  EdgeActionExecutionFiltersDeleteOptionalParams,
  EdgeActionExecutionFiltersUpdateOptionalParams,
  EdgeActionExecutionFiltersCreateOptionalParams,
  EdgeActionExecutionFiltersGetOptionalParams,
} from "./api/edgeActionExecutionFilters/index.js";
export {
  EdgeActionsListBySubscriptionOptionalParams,
  EdgeActionsListByResourceGroupOptionalParams,
  EdgeActionsDeleteOptionalParams,
  EdgeActionsUpdateOptionalParams,
  EdgeActionsCreateOptionalParams,
  EdgeActionsGetOptionalParams,
} from "./api/edgeActions/index.js";
export {
  EdgeActionVersionsSwapDefaultOptionalParams,
  EdgeActionVersionsGetVersionCodeOptionalParams,
  EdgeActionVersionsDeployVersionCodeOptionalParams,
  EdgeActionVersionsListByEdgeActionOptionalParams,
  EdgeActionVersionsDeleteOptionalParams,
  EdgeActionVersionsUpdateOptionalParams,
  EdgeActionVersionsCreateOptionalParams,
  EdgeActionVersionsGetOptionalParams,
} from "./api/edgeActionVersions/index.js";
export {
  EdgeActionExecutionFiltersOperations,
  EdgeActionsOperations,
  EdgeActionVersionsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
