// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeClient } from "./edgeClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Site,
  type SiteProperties,
  type SiteAddressProperties,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type SiteUpdate,
  type SiteUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export { type EdgeClientOptionalParams } from "./api/index.js";
export {
  type SitesListByResourceGroupOptionalParams,
  type SitesDeleteOptionalParams,
  type SitesUpdateOptionalParams,
  type SitesCreateOrUpdateOptionalParams,
  type SitesGetOptionalParams,
} from "./api/sites/index.js";
export {
  type SitesByServiceGroupDeleteOptionalParams,
  type SitesByServiceGroupUpdateOptionalParams,
  type SitesByServiceGroupCreateOrUpdateOptionalParams,
  type SitesByServiceGroupGetOptionalParams,
  type SitesByServiceGroupListByServiceGroupOptionalParams,
} from "./api/sitesByServiceGroup/index.js";
export {
  type SitesBySubscriptionDeleteOptionalParams,
  type SitesBySubscriptionUpdateOptionalParams,
  type SitesBySubscriptionCreateOrUpdateOptionalParams,
  type SitesBySubscriptionGetOptionalParams,
  type SitesBySubscriptionListOptionalParams,
} from "./api/sitesBySubscription/index.js";
export {
  type SitesOperations,
  type SitesByServiceGroupOperations,
  type SitesBySubscriptionOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
