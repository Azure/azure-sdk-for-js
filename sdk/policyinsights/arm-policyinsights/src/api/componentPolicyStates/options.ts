// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams extends OperationOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. One or more comma-separated column names with an optional "desc" (the default) or "asc", e.g. "$orderby=PolicyAssignmentId, ResourceId asc". */
  orderBy?: string;
  /** Select expression using OData notation. Limits the columns on each record to just those requested, e.g. "$select=PolicyAssignmentId, ResourceId". */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. When not specified, the service uses ($to - 1-day). */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. When not specified, the service uses request time. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
}

/** Optional parameters. */
export interface ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams extends OperationOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. One or more comma-separated column names with an optional "desc" (the default) or "asc", e.g. "$orderby=PolicyAssignmentId, ResourceId asc". */
  orderBy?: string;
  /** Select expression using OData notation. Limits the columns on each record to just those requested, e.g. "$select=PolicyAssignmentId, ResourceId". */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. When not specified, the service uses ($to - 1-day). */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. When not specified, the service uses request time. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
}

/** Optional parameters. */
export interface ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams extends OperationOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. One or more comma-separated column names with an optional "desc" (the default) or "asc", e.g. "$orderby=PolicyAssignmentId, ResourceId asc". */
  orderBy?: string;
  /** Select expression using OData notation. Limits the columns on each record to just those requested, e.g. "$select=PolicyAssignmentId, ResourceId". */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. When not specified, the service uses ($to - 1-day). */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. When not specified, the service uses request time. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
}

/** Optional parameters. */
export interface ComponentPolicyStatesListQueryResultsForResourceOptionalParams extends OperationOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. One or more comma-separated column names with an optional "desc" (the default) or "asc", e.g. "$orderby=PolicyAssignmentId, ResourceId asc". */
  orderBy?: string;
  /** Select expression using OData notation. Limits the columns on each record to just those requested, e.g. "$select=PolicyAssignmentId, ResourceId". */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. When not specified, the service uses ($to - 1-day). */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. When not specified, the service uses request time. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** The $expand query parameter. */
  expand?: string;
}

/** Optional parameters. */
export interface ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams extends OperationOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. One or more comma-separated column names with an optional "desc" (the default) or "asc", e.g. "$orderby=PolicyAssignmentId, ResourceId asc". */
  orderBy?: string;
  /** Select expression using OData notation. Limits the columns on each record to just those requested, e.g. "$select=PolicyAssignmentId, ResourceId". */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. When not specified, the service uses ($to - 1-day). */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. When not specified, the service uses request time. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
}

/** Optional parameters. */
export interface ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams extends OperationOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. One or more comma-separated column names with an optional "desc" (the default) or "asc", e.g. "$orderby=PolicyAssignmentId, ResourceId asc". */
  orderBy?: string;
  /** Select expression using OData notation. Limits the columns on each record to just those requested, e.g. "$select=PolicyAssignmentId, ResourceId". */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. When not specified, the service uses ($to - 1-day). */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. When not specified, the service uses request time. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
}
