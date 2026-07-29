// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TablesContext } from "../../api/tablesContext.js";
import { getStatistics, getProperties, setProperties } from "../../api/service/operations.js";
import {
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "../../api/service/options.js";
import {
  TableServiceProperties,
  Logging,
  Metrics,
  CorsRule,
  GeoReplication,
} from "../../models/models.js";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /**
   * Retrieves statistics related to replication for the Table service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the account.
   */
  getStatistics: (options?: ServiceGetStatisticsOptionalParams) => Promise<{
    geoReplication?: GeoReplication;
    date: Date;
    apiVersion: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }>;
  /**
   * Gets the properties of an account's Table service, including properties for
   * Analytics and CORS (Cross-Origin Resource Sharing) rules.
   */
  getProperties: (options?: ServiceGetPropertiesOptionalParams) => Promise<{
    logging?: Logging;
    hourMetrics?: Metrics;
    minuteMetrics?: Metrics;
    cors?: CorsRule[];
    apiVersion: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }>;
  /**
   * Sets properties for an account's Table service endpoint, including properties
   * for Analytics and CORS (Cross-Origin Resource Sharing) rules.
   */
  setProperties: (
    tableServiceProperties: TableServiceProperties,
    options?: ServiceSetPropertiesOptionalParams,
  ) => Promise<{ apiVersion: string; requestId?: string; clientRequestId?: string }>;
}

function _getService(context: TablesContext) {
  return {
    getStatistics: (options?: ServiceGetStatisticsOptionalParams) =>
      getStatistics(context, options),
    getProperties: (options?: ServiceGetPropertiesOptionalParams) =>
      getProperties(context, options),
    setProperties: (
      tableServiceProperties: TableServiceProperties,
      options?: ServiceSetPropertiesOptionalParams,
    ) => setProperties(context, tableServiceProperties, options),
  };
}

export function _getServiceOperations(context: TablesContext): ServiceOperations {
  return {
    ..._getService(context),
  };
}
