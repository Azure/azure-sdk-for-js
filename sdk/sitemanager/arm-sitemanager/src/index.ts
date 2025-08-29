// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeClient } from "./edgeClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Site,
  SiteProperties,
  SiteAddressProperties,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SiteUpdate,
  SiteUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export { EdgeClientOptionalParams } from "./api/index.js";
export {
  SitesListByResourceGroupOptionalParams,
  SitesDeleteOptionalParams,
  SitesUpdateOptionalParams,
  SitesCreateOrUpdateOptionalParams,
  SitesGetOptionalParams,
} from "./api/sites/index.js";
export {
  SitesByServiceGroupDeleteOptionalParams,
  SitesByServiceGroupUpdateOptionalParams,
  SitesByServiceGroupCreateOrUpdateOptionalParams,
  SitesByServiceGroupGetOptionalParams,
  SitesByServiceGroupListByServiceGroupOptionalParams,
} from "./api/sitesByServiceGroup/index.js";
export {
  SitesBySubscriptionDeleteOptionalParams,
  SitesBySubscriptionUpdateOptionalParams,
  SitesBySubscriptionCreateOrUpdateOptionalParams,
  SitesBySubscriptionGetOptionalParams,
  SitesBySubscriptionListOptionalParams,
} from "./api/sitesBySubscription/index.js";
export {
  SitesOperations,
  SitesByServiceGroupOperations,
  SitesBySubscriptionOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
