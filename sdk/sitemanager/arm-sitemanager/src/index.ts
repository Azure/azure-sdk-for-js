// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeClient } from "./edgeClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Site,
  SiteProperties,
  SiteAddressProperties,
  ResourceProvisioningState,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SiteUpdate,
  SiteUpdateProperties,
} from "./models/index.js";
export {
  KnownResourceProvisioningState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { EdgeClientOptionalParams } from "./api/index.js";
export type {
  SitesDeleteOptionalParams,
  SitesUpdateOptionalParams,
  SitesCreateOrUpdateOptionalParams,
  SitesGetOptionalParams,
  SitesListByResourceGroupOptionalParams,
} from "./api/sites/index.js";
export type {
  SitesByServiceGroupDeleteOptionalParams,
  SitesByServiceGroupUpdateOptionalParams,
  SitesByServiceGroupCreateOrUpdateOptionalParams,
  SitesByServiceGroupGetOptionalParams,
  SitesByServiceGroupListByServiceGroupOptionalParams,
} from "./api/sitesByServiceGroup/index.js";
export type {
  SitesBySubscriptionDeleteOptionalParams,
  SitesBySubscriptionUpdateOptionalParams,
  SitesBySubscriptionCreateOrUpdateOptionalParams,
  SitesBySubscriptionGetOptionalParams,
  SitesBySubscriptionListOptionalParams,
} from "./api/sitesBySubscription/index.js";
export type {
  SitesOperations,
  SitesByServiceGroupOperations,
  SitesBySubscriptionOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
