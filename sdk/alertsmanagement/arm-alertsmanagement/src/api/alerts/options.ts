// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Severity,
  AlertState,
  MonitorCondition,
  MonitorService,
  Comments,
  AlertsSortByFields,
  SortOrder,
  TimeRange,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AlertsGetSummaryOptionalParams extends OperationOptions {
  /** Include count of the SmartGroups as part of the summary. Default value is 'false'. */
  includeSmartGroupsCount?: boolean;
  /** Filter by target resource( which is full ARM ID) Default value is select all. */
  targetResource?: string;
  /** Filter by target resource type. Default value is select all. */
  targetResourceType?: string;
  /** Filter by target resource group name. Default value is select all. */
  targetResourceGroup?: string;
  /** Filter by monitor service which generates the alert instance. Default value is select all. */
  monitorService?: MonitorService;
  /** Filter by monitor condition which is either 'Fired' or 'Resolved'. Default value is to select all. */
  monitorCondition?: MonitorCondition;
  /** Filter by severity.  Default value is select all. */
  severity?: Severity;
  /** Filter by state of the alert instance. Default value is to select all. */
  alertState?: AlertState;
  /** Filter by specific alert rule.  Default value is to select all. */
  alertRule?: string;
  /** Filter by time range by below listed values. Default value is 1 day. */
  timeRange?: TimeRange;
  /** Filter by custom time range in the format <start-time>/<end-time>  where time is in (ISO-8601 format)'. Permissible values is within 30 days from  query time. Either timeRange or customTimeRange could be used but not both. Default is none. */
  customTimeRange?: string;
}

/** Optional parameters. */
export interface AlertsMetaDataOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsGetEnrichmentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsGetHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsChangeStateOptionalParams extends OperationOptions {
  /** reason of change alert state */
  comment?: Comments;
}

/** Optional parameters. */
export interface AlertsGetAllOptionalParams extends OperationOptions {
  /** Filter by target resource( which is full ARM ID) Default value is select all. */
  targetResource?: string;
  /** Filter by target resource type. Default value is select all. */
  targetResourceType?: string;
  /** Filter by target resource group name. Default value is select all. */
  targetResourceGroup?: string;
  /** Filter by monitor service which generates the alert instance. Default value is select all. */
  monitorService?: MonitorService;
  /** Filter by monitor condition which is either 'Fired' or 'Resolved'. Default value is to select all. */
  monitorCondition?: MonitorCondition;
  /** Filter by severity.  Default value is select all. */
  severity?: Severity;
  /** Filter by state of the alert instance. Default value is to select all. */
  alertState?: AlertState;
  /** Filter by specific alert rule.  Default value is to select all. */
  alertRule?: string;
  /** Filter the alerts list by the Smart Group Id. Default value is none. */
  smartGroupId?: string;
  /** Include context which has contextual data specific to the monitor service. Default value is false' */
  includeContext?: boolean;
  /** Include egress config which would be used for displaying the content in portal.  Default value is 'false'. */
  includeEgressConfig?: boolean;
  /** Determines number of alerts returned per page in response. Permissible value is between 1 to 250. When the "includeContent"  filter is selected, maximum value allowed is 25. Default value is 25. */
  pageCount?: number;
  /** Sort the query results by input field,  Default value is 'lastModifiedDateTime'. */
  sortBy?: AlertsSortByFields;
  /** Sort the query results order in either ascending or descending.  Default value is 'desc' for time fields and 'asc' for others. */
  sortOrder?: SortOrder;
  /** This filter allows to selection of the fields(comma separated) which would  be part of the essential section. This would allow to project only the  required fields rather than getting entire content.  Default is to fetch all the fields in the essentials section. */
  select?: string;
  /** Filter by time range by below listed values. Default value is 1 day. */
  timeRange?: TimeRange;
  /** Filter by custom time range in the format <start-time>/<end-time>  where time is in (ISO-8601 format)'. Permissible values is within 30 days from  query time. Either timeRange or customTimeRange could be used but not both. Default is none. */
  customTimeRange?: string;
}

/** Optional parameters. */
export interface AlertsGetByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsGetAllTenantOptionalParams extends OperationOptions {
  /** Filter by target resource( which is full ARM ID) Default value is select all. */
  targetResource?: string;
  /** Filter by target resource type. Default value is select all. */
  targetResourceType?: string;
  /** Filter by target resource group name. Default value is select all. */
  targetResourceGroup?: string;
  /** Filter by monitor service which generates the alert instance. Default value is select all. */
  monitorService?: MonitorService;
  /** Filter by monitor condition which is either 'Fired' or 'Resolved'. Default value is to select all. */
  monitorCondition?: MonitorCondition;
  /** Filter by severity.  Default value is select all. */
  severity?: Severity;
  /** Filter by state of the alert instance. Default value is to select all. */
  alertState?: AlertState;
  /** Filter by specific alert rule.  Default value is to select all. */
  alertRule?: string;
  /** Filter the alerts list by the Smart Group Id. Default value is none. */
  smartGroupId?: string;
  /** Include context which has contextual data specific to the monitor service. Default value is false' */
  includeContext?: boolean;
  /** Include egress config which would be used for displaying the content in portal.  Default value is 'false'. */
  includeEgressConfig?: boolean;
  /** Determines number of alerts returned per page in response. Permissible value is between 1 to 250. When the "includeContent"  filter is selected, maximum value allowed is 25. Default value is 25. */
  pageCount?: number;
  /** Sort the query results by input field,  Default value is 'lastModifiedDateTime'. */
  sortBy?: AlertsSortByFields;
  /** Sort the query results order in either ascending or descending.  Default value is 'desc' for time fields and 'asc' for others. */
  sortOrder?: SortOrder;
  /** This filter allows to selection of the fields(comma separated) which would  be part of the essential section. This would allow to project only the  required fields rather than getting entire content.  Default is to fetch all the fields in the essentials section. */
  select?: string;
  /** Filter by time range by below listed values. Default value is 1 day. */
  timeRange?: TimeRange;
  /** Filter by custom time range in the format <start-time>/<end-time>  where time is in (ISO-8601 format)'. Permissible values is within 30 days from  query time. Either timeRange or customTimeRange could be used but not both. Default is none. */
  customTimeRange?: string;
}

/** Optional parameters. */
export interface AlertsChangeStateTenantOptionalParams extends OperationOptions {
  /** reason of change alert state */
  comment?: Comments;
}

/** Optional parameters. */
export interface AlertsGetHistoryTenantOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsGetByIdTenantOptionalParams extends OperationOptions {}
