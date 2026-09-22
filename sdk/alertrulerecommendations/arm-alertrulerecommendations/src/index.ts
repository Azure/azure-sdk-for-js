// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AlertRuleRecommendationsManagementClient } from "./alertRuleRecommendationsManagementClient.js";
export type {
  AlertRuleRecommendationResource,
  AlertRuleRecommendationProperties,
  RuleArmTemplate,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { AlertRuleRecommendationsManagementClientOptionalParams } from "./api/index.js";
export type {
  AlertRuleRecommendationsListByTargetTypeOptionalParams,
  AlertRuleRecommendationsListByResourceOptionalParams,
} from "./api/alertRuleRecommendations/index.js";
export type { AlertRuleRecommendationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
