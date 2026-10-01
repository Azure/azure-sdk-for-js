// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getResiliencyInformation,
  getRoutesInformation,
  stopSiteFailoverTest,
  startSiteFailoverTest,
  getFailoverSingleTestDetails,
  getFailoverAllTestsDetails,
  listBySubscription,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
  ExpressRouteGatewaysGetRoutesInformationOptionalParams,
  ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
  ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
  ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
  ExpressRouteGatewaysListBySubscriptionOptionalParams,
  ExpressRouteGatewaysListByResourceGroupOptionalParams,
  ExpressRouteGatewaysDeleteOptionalParams,
  ExpressRouteGatewaysUpdateTagsOptionalParams,
  ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ExpressRouteGatewaysGetOptionalParams,
} from "./options.js";
