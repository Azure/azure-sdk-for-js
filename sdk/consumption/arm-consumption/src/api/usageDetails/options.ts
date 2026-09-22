// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Metrictype } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UsageDetailsListOptionalParams extends OperationOptions {
  /** May be used to expand the properties/additionalInfo or properties/meterDetails within a list of usage details. By default, these fields are not included when listing usage details. */
  expand?: string;
  /** May be used to filter usageDetails by properties/resourceGroup, properties/resourceName, properties/resourceId, properties/chargeType, properties/reservationId, properties/publisherType or tags. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'. Tag filter is a key value pair string where key and value is separated by a colon (:). PublisherType Filter accepts two values azure and marketplace and it is currently supported for Web Direct Offer Type */
  filter?: string;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
  /** May be used to limit the number of results to the most recent N usageDetails. */
  top?: number;
  /** Allows to select different type of cost/usage records. */
  metric?: Metrictype;
}
