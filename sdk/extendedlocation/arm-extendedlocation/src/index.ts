// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CustomLocationsManagementClient } from "./customLocationsManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  CustomLocationOperation,
  CustomLocationOperationValueDisplay,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  CustomLocation,
  CustomLocationProperties,
  CustomLocationPropertiesAuthentication,
  HostType,
  Identity,
  ResourceIdentityType,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  PatchableCustomLocations,
  EnabledResourceType,
  EnabledResourceTypeProperties,
  EnabledResourceTypePropertiesTypesMetadataItem,
  ProxyResource,
  CustomLocationFindTargetResourceGroupProperties,
  CustomLocationFindTargetResourceGroupResult,
  ResourceSyncRule,
  ResourceSyncRuleProperties,
  ResourceSyncRulePropertiesSelector,
  MatchExpressionsProperties,
  PatchableResourceSyncRule,
} from "./models/index.js";
export {
  KnownHostType,
  KnownResourceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { CustomLocationsManagementClientOptionalParams } from "./api/index.js";
export type {
  CustomLocationsFindTargetResourceGroupOptionalParams,
  CustomLocationsListEnabledResourceTypesOptionalParams,
  CustomLocationsListBySubscriptionOptionalParams,
  CustomLocationsListByResourceGroupOptionalParams,
  CustomLocationsDeleteOptionalParams,
  CustomLocationsUpdateOptionalParams,
  CustomLocationsCreateOrUpdateOptionalParams,
  CustomLocationsGetOptionalParams,
  CustomLocationsListOperationsOptionalParams,
} from "./api/customLocations/index.js";
export type {
  ResourceSyncRulesListByCustomLocationIDOptionalParams,
  ResourceSyncRulesDeleteOptionalParams,
  ResourceSyncRulesUpdateOptionalParams,
  ResourceSyncRulesCreateOrUpdateOptionalParams,
  ResourceSyncRulesGetOptionalParams,
} from "./api/resourceSyncRules/index.js";
export type { CustomLocationsOperations, ResourceSyncRulesOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
