// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResultType } from "../../models/microsoft/common/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BaselinesListOptionalParams extends OperationOptions {
  /** The names of the metrics (comma separated) to retrieve. Special case: If a metricname itself has a comma in it then use %2 to indicate it. Eg: 'Metric,Name1' should be **'Metric%2Name1'** */
  metricnames?: string;
  /** Metric namespace that contains the requested metric names. */
  metricnamespace?: string;
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan?: string;
  /** The interval (i.e. timegrain) of the query. */
  interval?: string;
  /** The list of aggregation types (comma separated) to retrieve. */
  aggregation?: string;
  /** The list of sensitivities (comma separated) to retrieve. */
  sensitivities?: string;
  /** The **$filter** is used to reduce the set of metric data returned. Example: Metric contains metadata A, B and C. - Return all time series of C where A = a1 and B = b1 or b2 **$filter=A eq 'a1' and B eq 'b1' or B eq 'b2' and C eq '*'** - Invalid variant: **$filter=A eq 'a1' and B eq 'b1' and C eq '*' or B = 'b2'** This is invalid because the logical or operator cannot separate two different metadata names. - Return all time series where A = a1, B = b1 and C = c1: **$filter=A eq 'a1' and B eq 'b1' and C eq 'c1'** - Return all time series where A = a1 **$filter=A eq 'a1' and B eq '*' and C eq '*'**. Special case: When dimension name or dimension value uses round brackets. Eg: When dimension name is **dim (test) 1** Instead of using $filter= "dim (test) 1 eq '*' " use **$filter= "dim %2528test%2529 1 eq '*' "** When dimension name is **dim (test) 3** and dimension value is **dim3 (test) val** Instead of using $filter= "dim (test) 3 eq 'dim3 (test) val' " use **$filter= "dim %2528test%2529 3 eq 'dim3 %2528test%2529 val' "** */
  filter?: string;
  /** Allows retrieving only metadata of the baseline. On data request all information is retrieved. */
  resultType?: ResultType;
}
