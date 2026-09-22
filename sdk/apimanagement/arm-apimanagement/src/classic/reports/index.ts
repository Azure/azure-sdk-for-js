// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByRequest,
  listByTime,
  listBySubscription,
  listByGeo,
  listByProduct,
  listByOperation,
  listByUser,
  listByApi,
} from "../../api/reports/operations.js";
import type {
  ReportsListByRequestOptionalParams,
  ReportsListByTimeOptionalParams,
  ReportsListBySubscriptionOptionalParams,
  ReportsListByGeoOptionalParams,
  ReportsListByProductOptionalParams,
  ReportsListByOperationOptionalParams,
  ReportsListByUserOptionalParams,
  ReportsListByApiOptionalParams,
} from "../../api/reports/options.js";
import type { ReportRecordContract, RequestReportRecordContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Reports operations. */
export interface ReportsOperations {
  /** Lists report records by Request. */
  listByRequest: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    options?: ReportsListByRequestOptionalParams,
  ) => PagedAsyncIterableIterator<RequestReportRecordContract>;
  /** Lists report records by Time. */
  listByTime: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    interval: string,
    options?: ReportsListByTimeOptionalParams,
  ) => PagedAsyncIterableIterator<ReportRecordContract>;
  /** Lists report records by subscription. */
  listBySubscription: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    options?: ReportsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ReportRecordContract>;
  /** Lists report records by geography. */
  listByGeo: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    options?: ReportsListByGeoOptionalParams,
  ) => PagedAsyncIterableIterator<ReportRecordContract>;
  /** Lists report records by Product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    options?: ReportsListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<ReportRecordContract>;
  /** Lists report records by API Operations. */
  listByOperation: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    options?: ReportsListByOperationOptionalParams,
  ) => PagedAsyncIterableIterator<ReportRecordContract>;
  /** Lists report records by User. */
  listByUser: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    options?: ReportsListByUserOptionalParams,
  ) => PagedAsyncIterableIterator<ReportRecordContract>;
  /** Lists report records by API. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    filter: string,
    options?: ReportsListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<ReportRecordContract>;
}

function _getReports(context: ApiManagementContext) {
  return {
    listByRequest: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      options?: ReportsListByRequestOptionalParams,
    ) => listByRequest(context, resourceGroupName, serviceName, filter, options),
    listByTime: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      interval: string,
      options?: ReportsListByTimeOptionalParams,
    ) => listByTime(context, resourceGroupName, serviceName, filter, interval, options),
    listBySubscription: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      options?: ReportsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, resourceGroupName, serviceName, filter, options),
    listByGeo: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      options?: ReportsListByGeoOptionalParams,
    ) => listByGeo(context, resourceGroupName, serviceName, filter, options),
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      options?: ReportsListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, filter, options),
    listByOperation: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      options?: ReportsListByOperationOptionalParams,
    ) => listByOperation(context, resourceGroupName, serviceName, filter, options),
    listByUser: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      options?: ReportsListByUserOptionalParams,
    ) => listByUser(context, resourceGroupName, serviceName, filter, options),
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      filter: string,
      options?: ReportsListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, filter, options),
  };
}

export function _getReportsOperations(context: ApiManagementContext): ReportsOperations {
  return {
    ..._getReports(context),
  };
}
