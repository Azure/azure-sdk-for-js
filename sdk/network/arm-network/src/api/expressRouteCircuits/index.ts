// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getPeeringStats,
  listRoutesTableSummary,
  listRoutesTable,
  listArpTable,
  stopCircuitLinkFailoverTest,
  startCircuitLinkFailoverTest,
  getCircuitLinkFailoverSingleTestDetails,
  getCircuitLinkFailoverAllTestsDetails,
  getStats,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ExpressRouteCircuitsGetPeeringStatsOptionalParams,
  ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
  ExpressRouteCircuitsListRoutesTableOptionalParams,
  ExpressRouteCircuitsListArpTableOptionalParams,
  ExpressRouteCircuitsStopCircuitLinkFailoverTestOptionalParams,
  ExpressRouteCircuitsStartCircuitLinkFailoverTestOptionalParams,
  ExpressRouteCircuitsGetCircuitLinkFailoverSingleTestDetailsOptionalParams,
  ExpressRouteCircuitsGetCircuitLinkFailoverAllTestsDetailsOptionalParams,
  ExpressRouteCircuitsGetStatsOptionalParams,
  ExpressRouteCircuitsListAllOptionalParams,
  ExpressRouteCircuitsListOptionalParams,
  ExpressRouteCircuitsDeleteOptionalParams,
  ExpressRouteCircuitsUpdateTagsOptionalParams,
  ExpressRouteCircuitsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitsGetOptionalParams,
} from "./options.js";
