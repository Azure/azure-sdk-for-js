// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
}

/** Shared query filter parameter to configure carbon emissions data queries for all different report type defined in ReportTypeEnum. */
export interface QueryFilter {
  /** The ReportType requested for carbon emissions data. Required. Specifies how data is aggregated and displayed in the output, as explained in the ReportTypeEnum. */
  /** The discriminator possible values: OverallSummaryReport, MonthlySummaryReport, TopItemsSummaryReport, TopItemsMonthlySummaryReport, ItemDetailsReport */
  reportType: ReportTypeEnum;
  /** The start and end dates for carbon emissions data. Required. For ItemDetailsReport and TopItemsSummaryReport, only one month of data is supported at a time, so start and end dates should be equal within DateRange (e.g., start: 2024-06-01 and end: 2024-06-01). */
  dateRange: DateRange;
  /** List of subscription IDs for which carbon emissions data is requested. Required. Each subscription ID should be in lowercase format. The max length of list is 100. */
  subscriptionList: string[];
  /** List of resource group URLs for carbon emissions data. Optional. Each URL must follow the format '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroup}', and should be in all lowercase. */
  resourceGroupUrlList?: string[];
  /** List of resource types for carbon emissions data. Optional. Each resource type should be specified in lowercase, following the format 'microsoft.{service}/{resourceType}', e.g., 'microsoft.storage/storageaccounts'. */
  resourceTypeList?: string[];
  /** List of locations(Azure Region Display Name) for carbon emissions data, with each location specified in lowercase (e.g., 'east us'). Optional. You can use the command 'az account list-locations -o table' to find Azure Region Display Names. */
  locationList?: string[];
  /** List of carbon emission scopes. Required. Accepts one or more values from EmissionScopeEnum (e.g., Scope1, Scope2, Scope3) in list form. The output will include the total emissions for the specified scopes. */
  carbonScopeList: EmissionScopeEnum[];
}

export function queryFilterSerializer(item: QueryFilter): any {
  return {
    reportType: item["reportType"],
    dateRange: dateRangeSerializer(item["dateRange"]),
    subscriptionList: item["subscriptionList"].map((p: any) => {
      return p;
    }),
    resourceGroupUrlList: !item["resourceGroupUrlList"]
      ? item["resourceGroupUrlList"]
      : item["resourceGroupUrlList"].map((p: any) => {
          return p;
        }),
    resourceTypeList: !item["resourceTypeList"]
      ? item["resourceTypeList"]
      : item["resourceTypeList"].map((p: any) => {
          return p;
        }),
    locationList: !item["locationList"]
      ? item["locationList"]
      : item["locationList"].map((p: any) => {
          return p;
        }),
    carbonScopeList: item["carbonScopeList"].map((p: any) => {
      return p;
    }),
  };
}

/** Alias for QueryFilterUnion */
export type QueryFilterUnion =
  | OverallSummaryReportQueryFilter
  | MonthlySummaryReportQueryFilter
  | TopItemsSummaryReportQueryFilter
  | TopItemsMonthlySummaryReportQueryFilter
  | ItemDetailsQueryFilter
  | QueryFilter;

export function queryFilterUnionSerializer(item: QueryFilterUnion): any {
  switch (item.reportType) {
    case "OverallSummaryReport":
      return overallSummaryReportQueryFilterSerializer(item as OverallSummaryReportQueryFilter);

    case "MonthlySummaryReport":
      return monthlySummaryReportQueryFilterSerializer(item as MonthlySummaryReportQueryFilter);

    case "TopItemsSummaryReport":
      return topItemsSummaryReportQueryFilterSerializer(item as TopItemsSummaryReportQueryFilter);

    case "TopItemsMonthlySummaryReport":
      return topItemsMonthlySummaryReportQueryFilterSerializer(
        item as TopItemsMonthlySummaryReportQueryFilter,
      );

    case "ItemDetailsReport":
      return itemDetailsQueryFilterSerializer(item as ItemDetailsQueryFilter);

    default:
      return queryFilterSerializer(item);
  }
}

/** Enum for Report Type, specifying different report formats for carbon emissions data. Each report type returns different aggregations of carbon emissions across various categories, date range, emissions scope, and other parameters. */
export enum KnownReportTypeEnum {
  /** Overall summary report provides total carbon emissions for the specified date range and query parameters, as well as comparative values for a high-level overview. This report type can accept different values in the start and end fields within DateRange (e.g., start: 2024-03-01 and end: 2024-06-01). */
  OverallSummaryReport = "OverallSummaryReport",
  /** MonthlySummaryReport provides carbon emissions data by month for the specified query parameters. This report type can accept different values in the start and end fields within DateRange (e.g., start: 2024-03-01 and end: 2024-06-01). */
  MonthlySummaryReport = "MonthlySummaryReport",
  /** TopItemsSummaryReport provides the N highest-emitting items for the specified query filters. This report returns data for a single month at a time, so it requires the same values for the start and end fields within DateRange. A maximum of N=10 items can be returned at a time. */
  TopItemsSummaryReport = "TopItemsSummaryReport",
  /** TopItemsMonthlyReport provides the N highest-emitting items by month for the specified query filter. Returns emissions data for the top N items by month within the given date range. A maximum of N=10 items can be returned at a time. */
  TopItemsMonthlySummaryReport = "TopItemsMonthlySummaryReport",
  /** ItemDetailsReport provides a granular list of items based on the specified CategoryType (e.g., Resource, ResourceGroup, ResourceType, Location, or Subscription) for the query filter. This report can be queried for only one month at a time, requiring the same values in the start and end fields within DateRange. */
  ItemDetailsReport = "ItemDetailsReport",
}

/**
 * Enum for Report Type, specifying different report formats for carbon emissions data. Each report type returns different aggregations of carbon emissions across various categories, date range, emissions scope, and other parameters. \
 * {@link KnownReportTypeEnum} can be used interchangeably with ReportTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OverallSummaryReport**: Overall summary report provides total carbon emissions for the specified date range and query parameters, as well as comparative values for a high-level overview. This report type can accept different values in the start and end fields within DateRange (e.g., start: 2024-03-01 and end: 2024-06-01). \
 * **MonthlySummaryReport**: MonthlySummaryReport provides carbon emissions data by month for the specified query parameters. This report type can accept different values in the start and end fields within DateRange (e.g., start: 2024-03-01 and end: 2024-06-01). \
 * **TopItemsSummaryReport**: TopItemsSummaryReport provides the N highest-emitting items for the specified query filters. This report returns data for a single month at a time, so it requires the same values for the start and end fields within DateRange. A maximum of N=10 items can be returned at a time. \
 * **TopItemsMonthlySummaryReport**: TopItemsMonthlyReport provides the N highest-emitting items by month for the specified query filter. Returns emissions data for the top N items by month within the given date range. A maximum of N=10 items can be returned at a time. \
 * **ItemDetailsReport**: ItemDetailsReport provides a granular list of items based on the specified CategoryType (e.g., Resource, ResourceGroup, ResourceType, Location, or Subscription) for the query filter. This report can be queried for only one month at a time, requiring the same values in the start and end fields within DateRange.
 */
export type ReportTypeEnum = string;

/** Date range to be used with QueryParameter, it should be within 12 months between start and end date. In certain cases, start and end dates must be the same date. */
export interface DateRange {
  /** Start date parameter in yyyy-MM-01 format. Only the first day of each month is accepted. */
  start: string;
  /** End date parameter in yyyy-MM-01 format. Only the first day of each month is accepted. */
  end: string;
}

export function dateRangeSerializer(item: DateRange): any {
  return { start: item["start"], end: item["end"] };
}

/** Supported carbon emission scopes to be used with QueryParameter, as defined by the GHG Protocol. At least one scope must be specified. The output will return a total of all specified scopes. */
export enum KnownEmissionScopeEnum {
  /** Scope1 carbon emission */
  Scope1 = "Scope1",
  /** Scope2 carbon emission */
  Scope2 = "Scope2",
  /** Scope3 carbon emission */
  Scope3 = "Scope3",
}

/**
 * Supported carbon emission scopes to be used with QueryParameter, as defined by the GHG Protocol. At least one scope must be specified. The output will return a total of all specified scopes. \
 * {@link KnownEmissionScopeEnum} can be used interchangeably with EmissionScopeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Scope1**: Scope1 carbon emission \
 * **Scope2**: Scope2 carbon emission \
 * **Scope3**: Scope3 carbon emission
 */
export type EmissionScopeEnum = string;

/** Query filter parameter to configure OverallSummaryReport queries. */
export interface OverallSummaryReportQueryFilter extends QueryFilter {
  /** Specifies that the report type is a overall summary report for carbon emissions data. */
  reportType: "OverallSummaryReport";
}

export function overallSummaryReportQueryFilterSerializer(
  item: OverallSummaryReportQueryFilter,
): any {
  return {
    reportType: item["reportType"],
    dateRange: dateRangeSerializer(item["dateRange"]),
    subscriptionList: item["subscriptionList"].map((p: any) => {
      return p;
    }),
    resourceGroupUrlList: !item["resourceGroupUrlList"]
      ? item["resourceGroupUrlList"]
      : item["resourceGroupUrlList"].map((p: any) => {
          return p;
        }),
    resourceTypeList: !item["resourceTypeList"]
      ? item["resourceTypeList"]
      : item["resourceTypeList"].map((p: any) => {
          return p;
        }),
    locationList: !item["locationList"]
      ? item["locationList"]
      : item["locationList"].map((p: any) => {
          return p;
        }),
    carbonScopeList: item["carbonScopeList"].map((p: any) => {
      return p;
    }),
  };
}

/** Query filter parameter to configure MonthlySummaryReport queries. */
export interface MonthlySummaryReportQueryFilter extends QueryFilter {
  /** Specifies that the report type is a monthly summary report for carbon emissions data. */
  reportType: "MonthlySummaryReport";
}

export function monthlySummaryReportQueryFilterSerializer(
  item: MonthlySummaryReportQueryFilter,
): any {
  return {
    reportType: item["reportType"],
    dateRange: dateRangeSerializer(item["dateRange"]),
    subscriptionList: item["subscriptionList"].map((p: any) => {
      return p;
    }),
    resourceGroupUrlList: !item["resourceGroupUrlList"]
      ? item["resourceGroupUrlList"]
      : item["resourceGroupUrlList"].map((p: any) => {
          return p;
        }),
    resourceTypeList: !item["resourceTypeList"]
      ? item["resourceTypeList"]
      : item["resourceTypeList"].map((p: any) => {
          return p;
        }),
    locationList: !item["locationList"]
      ? item["locationList"]
      : item["locationList"].map((p: any) => {
          return p;
        }),
    carbonScopeList: item["carbonScopeList"].map((p: any) => {
      return p;
    }),
  };
}

/** Query filter parameter to configure TopItemsSummaryReport queries. */
export interface TopItemsSummaryReportQueryFilter extends QueryFilter {
  /** Specifies that the report type is a top items summary report for carbon emissions data, aggregated by category type. */
  reportType: "TopItemsSummaryReport";
  /** Specifies the category type for which to retrieve top-emitting items. See supported values defined in CategoryTypeEnum. */
  categoryType: CategoryTypeEnum;
  /** The number of top items to return, based on emissions. This value must be between 1 and 10. */
  topItems: number;
}

export function topItemsSummaryReportQueryFilterSerializer(
  item: TopItemsSummaryReportQueryFilter,
): any {
  return {
    reportType: item["reportType"],
    dateRange: dateRangeSerializer(item["dateRange"]),
    subscriptionList: item["subscriptionList"].map((p: any) => {
      return p;
    }),
    resourceGroupUrlList: !item["resourceGroupUrlList"]
      ? item["resourceGroupUrlList"]
      : item["resourceGroupUrlList"].map((p: any) => {
          return p;
        }),
    resourceTypeList: !item["resourceTypeList"]
      ? item["resourceTypeList"]
      : item["resourceTypeList"].map((p: any) => {
          return p;
        }),
    locationList: !item["locationList"]
      ? item["locationList"]
      : item["locationList"].map((p: any) => {
          return p;
        }),
    carbonScopeList: item["carbonScopeList"].map((p: any) => {
      return p;
    }),
    categoryType: item["categoryType"],
    topItems: item["topItems"],
  };
}

/** Supported category types to be used with QueryParameter. Each type represents a different level of emissions data aggregation. */
export enum KnownCategoryTypeEnum {
  /** Emissions aggregated at the subscription level. */
  Subscription = "Subscription",
  /** Emissions aggregated at the resource group level. */
  ResourceGroup = "ResourceGroup",
  /** Emissions aggregated at the location level. */
  Location = "Location",
  /** Emissions aggregated at the resource level. */
  Resource = "Resource",
  /** Emissions aggregated at the resource type level. */
  ResourceType = "ResourceType",
}

/**
 * Supported category types to be used with QueryParameter. Each type represents a different level of emissions data aggregation. \
 * {@link KnownCategoryTypeEnum} can be used interchangeably with CategoryTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Subscription**: Emissions aggregated at the subscription level. \
 * **ResourceGroup**: Emissions aggregated at the resource group level. \
 * **Location**: Emissions aggregated at the location level. \
 * **Resource**: Emissions aggregated at the resource level. \
 * **ResourceType**: Emissions aggregated at the resource type level.
 */
export type CategoryTypeEnum = string;

/** Query filter parameter to configure TopItemsMonthlySummaryReport queries. */
export interface TopItemsMonthlySummaryReportQueryFilter extends QueryFilter {
  /** Specifies that the report type is a top items monthly summary report for carbon emissions data. */
  reportType: "TopItemsMonthlySummaryReport";
  /** Specifies the category type to retrieve top-emitting items, aggregated by month. See supported types in CategoryTypeEnum. */
  categoryType: CategoryTypeEnum;
  /** The number of top items to return, based on emissions. Must be between 1 and 10. */
  topItems: number;
}

export function topItemsMonthlySummaryReportQueryFilterSerializer(
  item: TopItemsMonthlySummaryReportQueryFilter,
): any {
  return {
    reportType: item["reportType"],
    dateRange: dateRangeSerializer(item["dateRange"]),
    subscriptionList: item["subscriptionList"].map((p: any) => {
      return p;
    }),
    resourceGroupUrlList: !item["resourceGroupUrlList"]
      ? item["resourceGroupUrlList"]
      : item["resourceGroupUrlList"].map((p: any) => {
          return p;
        }),
    resourceTypeList: !item["resourceTypeList"]
      ? item["resourceTypeList"]
      : item["resourceTypeList"].map((p: any) => {
          return p;
        }),
    locationList: !item["locationList"]
      ? item["locationList"]
      : item["locationList"].map((p: any) => {
          return p;
        }),
    carbonScopeList: item["carbonScopeList"].map((p: any) => {
      return p;
    }),
    categoryType: item["categoryType"],
    topItems: item["topItems"],
  };
}

/** Query Parameters for ItemDetailsReport */
export interface ItemDetailsQueryFilter extends QueryFilter {
  /** Specifies that the report type is an item details report for granular carbon emissions data. This is a paginated report. */
  reportType: "ItemDetailsReport";
  /** Specifies the category type for detailed emissions data, such as Resource, ResourceGroup, ResourceType, Location, or Subscription. See supported types in CategoryTypeEnum. */
  categoryType: CategoryTypeEnum;
  /** The column name to order the results by. See supported values in OrderByColumnEnum. */
  orderBy: OrderByColumnEnum;
  /** Direction for sorting results. See supported values in SortDirectionEnum. */
  sortDirection: SortDirectionEnum;
  /** Number of items to return in one request, max value is 5000. */
  pageSize: number;
  /** Pagination token for fetching the next page of data. This token is nullable and will be returned in the previous response if additional data pages are available. */
  skipToken?: string;
}

export function itemDetailsQueryFilterSerializer(item: ItemDetailsQueryFilter): any {
  return {
    reportType: item["reportType"],
    dateRange: dateRangeSerializer(item["dateRange"]),
    subscriptionList: item["subscriptionList"].map((p: any) => {
      return p;
    }),
    resourceGroupUrlList: !item["resourceGroupUrlList"]
      ? item["resourceGroupUrlList"]
      : item["resourceGroupUrlList"].map((p: any) => {
          return p;
        }),
    resourceTypeList: !item["resourceTypeList"]
      ? item["resourceTypeList"]
      : item["resourceTypeList"].map((p: any) => {
          return p;
        }),
    locationList: !item["locationList"]
      ? item["locationList"]
      : item["locationList"].map((p: any) => {
          return p;
        }),
    carbonScopeList: item["carbonScopeList"].map((p: any) => {
      return p;
    }),
    categoryType: item["categoryType"],
    orderBy: item["orderBy"],
    sortDirection: item["sortDirection"],
    pageSize: item["pageSize"],
    skipToken: item["skipToken"],
  };
}

/** Sorting is supported for columns in ItemDetailsReport. This object includes the column names that sorting is allowed for. Select one of these supported values */
export enum KnownOrderByColumnEnum {
  /** The itemName filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. */
  ItemName = "ItemName",
  /** The latestMonthEmissions filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. */
  LatestMonthEmissions = "LatestMonthEmissions",
  /** The previousMonthEmissions filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. */
  PreviousMonthEmissions = "PreviousMonthEmissions",
  /** The monthOverMonthEmissionsChangeRatio filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. */
  MonthOverMonthEmissionsChangeRatio = "MonthOverMonthEmissionsChangeRatio",
  /** The monthlyEmissionsChangeValue filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. */
  MonthlyEmissionsChangeValue = "MonthlyEmissionsChangeValue",
  /** The resourceGroup filed in ResourceCarbonEmissionItemDetailData result, see ResourceCarbonEmissionItemDetailData for more information. */
  ResourceGroup = "ResourceGroup",
}

/**
 * Sorting is supported for columns in ItemDetailsReport. This object includes the column names that sorting is allowed for. Select one of these supported values \
 * {@link KnownOrderByColumnEnum} can be used interchangeably with OrderByColumnEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ItemName**: The itemName filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. \
 * **LatestMonthEmissions**: The latestMonthEmissions filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. \
 * **PreviousMonthEmissions**: The previousMonthEmissions filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. \
 * **MonthOverMonthEmissionsChangeRatio**: The monthOverMonthEmissionsChangeRatio filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. \
 * **MonthlyEmissionsChangeValue**: The monthlyEmissionsChangeValue filed in ItemDetailsReport result, see CarbonEmissionItemDetailData for more information. \
 * **ResourceGroup**: The resourceGroup filed in ResourceCarbonEmissionItemDetailData result, see ResourceCarbonEmissionItemDetailData for more information.
 */
export type OrderByColumnEnum = string;

/** Sorting is supported for columns in ItemDetailsReport. This object define sorting direction. */
export enum KnownSortDirectionEnum {
  /** Descending order for query result. */
  Desc = "Desc",
  /** Ascending order for query result. */
  Asc = "Asc",
}

/**
 * Sorting is supported for columns in ItemDetailsReport. This object define sorting direction. \
 * {@link KnownSortDirectionEnum} can be used interchangeably with SortDirectionEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Desc**: Descending order for query result. \
 * **Asc**: Ascending order for query result.
 */
export type SortDirectionEnum = string;

/** List of carbon emission results */
export interface CarbonEmissionDataListResult {
  /** The CarbonEmissionData items on this page */
  value: CarbonEmissionDataUnion[];
  /** The pagination token to fetch next page data, it's null or empty if it doesn't have next page data */
  skipToken?: string;
  /** The access decision list for each input subscription */
  subscriptionAccessDecisionList?: SubscriptionAccessDecision[];
}

export function carbonEmissionDataListResultDeserializer(item: any): CarbonEmissionDataListResult {
  return {
    value: carbonEmissionDataUnionArrayDeserializer(item["value"]),
    skipToken: item["skipToken"],
    subscriptionAccessDecisionList: !item["subscriptionAccessDecisionList"]
      ? item["subscriptionAccessDecisionList"]
      : subscriptionAccessDecisionArrayDeserializer(item["subscriptionAccessDecisionList"]),
  };
}

export function carbonEmissionDataUnionArrayDeserializer(
  result: Array<CarbonEmissionDataUnion>,
): any[] {
  return result.map((item) => {
    return carbonEmissionDataUnionDeserializer(item);
  });
}

/** The basic response for different query report, all query report result will have these information */
export interface CarbonEmissionData {
  /** The data type of the query result, indicating the format of the returned response. */
  /** The discriminator possible values: OverallSummaryData, MonthlySummaryData, TopItemsSummaryData, ResourceTopItemsSummaryData, ResourceGroupTopItemsSummaryData, TopItemsMonthlySummaryData, ResourceTopItemsMonthlySummaryData, ResourceGroupTopItemsMonthlySummaryData, ItemDetailsData, ResourceItemDetailsData, ResourceGroupItemDetailsData */
  dataType: ResponseDataTypeEnum;
  /** Total carbon emissions for the specified query parameters, measured in kgCO2E. This value represents total emissions over the specified date range (e.g., March-June). */
  latestMonthEmissions: number;
  /** Total carbon emissions for the previous month’s date range, which is the same period as the specified date range but shifted left by one month (e.g., if the specified range is March - June, the previous month’s range will be Feb - May). The value is measured in kgCO2E. */
  previousMonthEmissions: number;
  /** The percentage change in carbon emissions between the current and previous DateRange. This is calculated as: (latestMonthEmissions - previousMonthEmissions) / previousMonthEmissions. */
  monthOverMonthEmissionsChangeRatio?: number;
  /** The change in carbon emissions between the current and previous period, calculated as: latestMonthEmissions - previousMonthEmissions. */
  monthlyEmissionsChangeValue?: number;
}

export function carbonEmissionDataDeserializer(item: any): CarbonEmissionData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
  };
}

/** Alias for CarbonEmissionDataUnion */
export type CarbonEmissionDataUnion =
  | CarbonEmissionOverallSummaryData
  | CarbonEmissionMonthlySummaryData
  | CarbonEmissionTopItemsSummaryData
  | ResourceCarbonEmissionTopItemsSummaryData
  | ResourceGroupCarbonEmissionTopItemsSummaryData
  | CarbonEmissionTopItemMonthlySummaryData
  | ResourceCarbonEmissionTopItemMonthlySummaryData
  | ResourceGroupCarbonEmissionTopItemMonthlySummaryData
  | CarbonEmissionItemDetailData
  | ResourceCarbonEmissionItemDetailData
  | ResourceGroupCarbonEmissionItemDetailData
  | CarbonEmissionData;

export function carbonEmissionDataUnionDeserializer(item: any): CarbonEmissionDataUnion {
  switch (item.dataType) {
    case "OverallSummaryData":
      return carbonEmissionOverallSummaryDataDeserializer(item as CarbonEmissionOverallSummaryData);

    case "MonthlySummaryData":
      return carbonEmissionMonthlySummaryDataDeserializer(item as CarbonEmissionMonthlySummaryData);

    case "TopItemsSummaryData":
      return carbonEmissionTopItemsSummaryDataDeserializer(
        item as CarbonEmissionTopItemsSummaryData,
      );

    case "ResourceTopItemsSummaryData":
      return resourceCarbonEmissionTopItemsSummaryDataDeserializer(
        item as ResourceCarbonEmissionTopItemsSummaryData,
      );

    case "ResourceGroupTopItemsSummaryData":
      return resourceGroupCarbonEmissionTopItemsSummaryDataDeserializer(
        item as ResourceGroupCarbonEmissionTopItemsSummaryData,
      );

    case "TopItemsMonthlySummaryData":
      return carbonEmissionTopItemMonthlySummaryDataDeserializer(
        item as CarbonEmissionTopItemMonthlySummaryData,
      );

    case "ResourceTopItemsMonthlySummaryData":
      return resourceCarbonEmissionTopItemMonthlySummaryDataDeserializer(
        item as ResourceCarbonEmissionTopItemMonthlySummaryData,
      );

    case "ResourceGroupTopItemsMonthlySummaryData":
      return resourceGroupCarbonEmissionTopItemMonthlySummaryDataDeserializer(
        item as ResourceGroupCarbonEmissionTopItemMonthlySummaryData,
      );

    case "ItemDetailsData":
      return carbonEmissionItemDetailDataDeserializer(item as CarbonEmissionItemDetailData);

    case "ResourceItemDetailsData":
      return resourceCarbonEmissionItemDetailDataDeserializer(
        item as ResourceCarbonEmissionItemDetailData,
      );

    case "ResourceGroupItemDetailsData":
      return resourceGroupCarbonEmissionItemDetailDataDeserializer(
        item as ResourceGroupCarbonEmissionItemDetailData,
      );

    default:
      return carbonEmissionDataDeserializer(item);
  }
}

/** The response data type of Carbon emission data */
export enum KnownResponseDataTypeEnum {
  /** The response data type for OverallSummaryReport */
  OverallSummaryData = "OverallSummaryData",
  /** The response data type for MonthlySummaryReport */
  MonthlySummaryData = "MonthlySummaryData",
  /** The response data type for TopItemsSummaryReport */
  TopItemsSummaryData = "TopItemsSummaryData",
  /** The response data type for Resource's TopItemsSummaryReport */
  ResourceTopItemsSummaryData = "ResourceTopItemsSummaryData",
  /** The response data type for ResourceGroup's TopItemsSummaryReport */
  ResourceGroupTopItemsSummaryData = "ResourceGroupTopItemsSummaryData",
  /** The response data type for TopItemsMonthlySummaryReport */
  TopItemsMonthlySummaryData = "TopItemsMonthlySummaryData",
  /** The response data type for Resource's TopItemsMonthlySummaryReport */
  ResourceTopItemsMonthlySummaryData = "ResourceTopItemsMonthlySummaryData",
  /** The response data type for ResourceGroup's TopItemsMonthlySummaryReport */
  ResourceGroupTopItemsMonthlySummaryData = "ResourceGroupTopItemsMonthlySummaryData",
  /** The response data type for ItemDetailsReport */
  ItemDetailsData = "ItemDetailsData",
  /** The response data type for Resource's ItemDetailsReport */
  ResourceItemDetailsData = "ResourceItemDetailsData",
  /** The response data type for ResourceGroup's ItemDetailsReport */
  ResourceGroupItemDetailsData = "ResourceGroupItemDetailsData",
}

/**
 * The response data type of Carbon emission data \
 * {@link KnownResponseDataTypeEnum} can be used interchangeably with ResponseDataTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OverallSummaryData**: The response data type for OverallSummaryReport \
 * **MonthlySummaryData**: The response data type for MonthlySummaryReport \
 * **TopItemsSummaryData**: The response data type for TopItemsSummaryReport \
 * **ResourceTopItemsSummaryData**: The response data type for Resource's TopItemsSummaryReport \
 * **ResourceGroupTopItemsSummaryData**: The response data type for ResourceGroup's TopItemsSummaryReport \
 * **TopItemsMonthlySummaryData**: The response data type for TopItemsMonthlySummaryReport \
 * **ResourceTopItemsMonthlySummaryData**: The response data type for Resource's TopItemsMonthlySummaryReport \
 * **ResourceGroupTopItemsMonthlySummaryData**: The response data type for ResourceGroup's TopItemsMonthlySummaryReport \
 * **ItemDetailsData**: The response data type for ItemDetailsReport \
 * **ResourceItemDetailsData**: The response data type for Resource's ItemDetailsReport \
 * **ResourceGroupItemDetailsData**: The response data type for ResourceGroup's ItemDetailsReport
 */
export type ResponseDataTypeEnum = string;

/** Response for Overall Carbon Emissions Summary */
export interface CarbonEmissionOverallSummaryData extends CarbonEmissionData {
  /** Overall summary data */
  dataType: "OverallSummaryData";
}

export function carbonEmissionOverallSummaryDataDeserializer(
  item: any,
): CarbonEmissionOverallSummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
  };
}

/** Response for Monthly Carbon Emissions Summary */
export interface CarbonEmissionMonthlySummaryData extends CarbonEmissionData {
  /** Monthly summary data */
  dataType: "MonthlySummaryData";
  /** The date, representing the month, for which the emissions data is reported, formatted as yyyy-MM-dd (e.g., 2024-03-01) */
  date: string;
  /** Carbon intensity for the specified month, typically in units of kgCO2E per unit of normalized usage */
  carbonIntensity: number;
}

export function carbonEmissionMonthlySummaryDataDeserializer(
  item: any,
): CarbonEmissionMonthlySummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    date: item["date"],
    carbonIntensity: item["carbonIntensity"],
  };
}

/** Response for Top Items by Category Type */
export interface CarbonEmissionTopItemsSummaryData extends CarbonEmissionData {
  /** Top items summary data */
  dataType: "TopItemsSummaryData";
  /** The identifier of the item being reported on, which could refer to the resource name, resource type name, location, resource group name, or subscription ID, depending on the specified category type. */
  itemName: string;
  /** The category type of the item. This defines which dimension the emissions are aggregated by, and the supported values are defined in CategoryTypeEnum (e.g., Subscription, ResourceGroup, Resource, etc.). */
  categoryType: CategoryTypeEnum;
}

export function carbonEmissionTopItemsSummaryDataDeserializer(
  item: any,
): CarbonEmissionTopItemsSummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
  };
}

/** Response for Top Items For Resource Category */
export interface ResourceCarbonEmissionTopItemsSummaryData extends CarbonEmissionData {
  /** Data for the top items carbon emissions summary report specific to resource category */
  dataType: "ResourceTopItemsSummaryData";
  /** The resource name of the resource for the Resource Category. */
  itemName: string;
  /** The category type of the item. This defines which dimension the emissions are aggregated by, and the supported values are defined in CategoryTypeEnum (e.g., Subscription, ResourceGroup, Resource, etc.). */
  categoryType: CategoryTypeEnum;
  /** Subscription Id */
  subscriptionId: string;
  /** Resource group name */
  resourceGroup: string;
  /** Resource Id, The URI of the resource for the Resource Category. This identifies the resource being reported. */
  resourceId: string;
}

export function resourceCarbonEmissionTopItemsSummaryDataDeserializer(
  item: any,
): ResourceCarbonEmissionTopItemsSummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceId: item["resourceId"],
  };
}

/** Response for Top Items For ResourceGroup */
export interface ResourceGroupCarbonEmissionTopItemsSummaryData extends CarbonEmissionData {
  /** Resource group top items summary data */
  dataType: "ResourceGroupTopItemsSummaryData";
  /** The resourceGroup name of the resource for ResourceGroup Category */
  itemName: string;
  /** ResourceGroup Item category */
  categoryType: CategoryTypeEnum;
  /** Subscription Id */
  subscriptionId: string;
  /** Resource Group url, value format is '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroup}' */
  resourceGroupUrl: string;
}

export function resourceGroupCarbonEmissionTopItemsSummaryDataDeserializer(
  item: any,
): ResourceGroupCarbonEmissionTopItemsSummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
    subscriptionId: item["subscriptionId"],
    resourceGroupUrl: item["resourceGroupUrl"],
  };
}

/** Response for Top Items Carbon Emissions by Month */
export interface CarbonEmissionTopItemMonthlySummaryData extends CarbonEmissionData {
  /** Top items Monthly summary data */
  dataType: "TopItemsMonthlySummaryData";
  /** Item name, it can be resource name, resource type name, location, resource group name or subscriptionId. It depends on category type. */
  itemName: string;
  /** Item category, see supported type value defined in CategoryTypeEnum */
  categoryType: CategoryTypeEnum;
  /** The date, representing the month, for which the emissions data is reported, formatted as yyyy-MM-dd (e.g., 2024-03-01) */
  date: string;
}

export function carbonEmissionTopItemMonthlySummaryDataDeserializer(
  item: any,
): CarbonEmissionTopItemMonthlySummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
    date: item["date"],
  };
}

/** Response for top items carbon emissions by month for resource */
export interface ResourceCarbonEmissionTopItemMonthlySummaryData extends CarbonEmissionData {
  /** Resource top items Monthly summary data */
  dataType: "ResourceTopItemsMonthlySummaryData";
  /** The resource name of resource for Resource Category */
  itemName: string;
  /** Resource Item category */
  categoryType: CategoryTypeEnum;
  /** Monthly date string, format is yyyy-MM-dd */
  date: string;
  /** Subscription Id */
  subscriptionId: string;
  /** Resource Group */
  resourceGroup: string;
  /** The fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  resourceId: string;
}

export function resourceCarbonEmissionTopItemMonthlySummaryDataDeserializer(
  item: any,
): ResourceCarbonEmissionTopItemMonthlySummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
    date: item["date"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceId: item["resourceId"],
  };
}

/** Response for top items carbon emissions by month for resource group */
export interface ResourceGroupCarbonEmissionTopItemMonthlySummaryData extends CarbonEmissionData {
  /** Resource group top items Monthly summary data */
  dataType: "ResourceGroupTopItemsMonthlySummaryData";
  /** It's resource group name for ResourceGroup category */
  itemName: string;
  /** ResourceGroup Item category */
  categoryType: CategoryTypeEnum;
  /** Monthly date string, format is yyyy-MM-dd */
  date: string;
  /** Subscription Id */
  subscriptionId: string;
  /** Resource Group url, the format is '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroup}' */
  resourceGroupUrl: string;
}

export function resourceGroupCarbonEmissionTopItemMonthlySummaryDataDeserializer(
  item: any,
): ResourceGroupCarbonEmissionTopItemMonthlySummaryData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
    date: item["date"],
    subscriptionId: item["subscriptionId"],
    resourceGroupUrl: item["resourceGroupUrl"],
  };
}

/** Response for detailed carbon emissions */
export interface CarbonEmissionItemDetailData extends CarbonEmissionData {
  /** Item details data */
  dataType: "ItemDetailsData";
  /** Item name, it can be resource name, resource type name, location, resource group name or subscriptionId. It depends on category type. */
  itemName: string;
  /** Item category, see supported type value defined in CategoryTypeEnum */
  categoryType: CategoryTypeEnum;
}

export function carbonEmissionItemDetailDataDeserializer(item: any): CarbonEmissionItemDetailData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
  };
}

/** Response for Resource detailed carbon emissions */
export interface ResourceCarbonEmissionItemDetailData extends CarbonEmissionData {
  /** ResourceGroup's item details data */
  dataType: "ResourceItemDetailsData";
  /** It's resource name. */
  itemName: string;
  /** Resource Item category, see supported value defined in CategoryTypeEnum */
  categoryType: CategoryTypeEnum;
  /** Subscription Id */
  subscriptionId: string;
  /** Resource Group */
  resourceGroup: string;
  /** The fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  resourceId: string;
  /** Resource Location (e.g., 'east us'). */
  location?: string;
  /** The type of resource, for example: microsoft.storage/storageaccounts */
  resourceType?: string;
}

export function resourceCarbonEmissionItemDetailDataDeserializer(
  item: any,
): ResourceCarbonEmissionItemDetailData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceId: item["resourceId"],
    location: item["location"],
    resourceType: item["resourceType"],
  };
}

/** Response for Resource Group detailed carbon emissions */
export interface ResourceGroupCarbonEmissionItemDetailData extends CarbonEmissionData {
  /** ResourceGroup item details data */
  dataType: "ResourceGroupItemDetailsData";
  /** It's resource group name */
  itemName: string;
  /** ResourceGroup Item category */
  categoryType: CategoryTypeEnum;
  /** Subscription Id */
  subscriptionId: string;
  /** Resource Group url, value format is '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroup}' */
  resourceGroupUrl: string;
}

export function resourceGroupCarbonEmissionItemDetailDataDeserializer(
  item: any,
): ResourceGroupCarbonEmissionItemDetailData {
  return {
    dataType: item["dataType"],
    latestMonthEmissions: item["latestMonthEmissions"],
    previousMonthEmissions: item["previousMonthEmissions"],
    monthOverMonthEmissionsChangeRatio: item["monthOverMonthEmissionsChangeRatio"],
    monthlyEmissionsChangeValue: item["monthlyEmissionsChangeValue"],
    itemName: item["itemName"],
    categoryType: item["categoryType"],
    subscriptionId: item["subscriptionId"],
    resourceGroupUrl: item["resourceGroupUrl"],
  };
}

export function subscriptionAccessDecisionArrayDeserializer(
  result: Array<SubscriptionAccessDecision>,
): any[] {
  return result.map((item) => {
    return subscriptionAccessDecisionDeserializer(item);
  });
}

/** Access Decision for each Subscription */
export interface SubscriptionAccessDecision {
  /** Id of Subscription */
  subscriptionId: string;
  /** Access decision to subscription */
  decision: AccessDecisionEnum;
  /** The reason why access request got denied */
  denialReason?: string;
}

export function subscriptionAccessDecisionDeserializer(item: any): SubscriptionAccessDecision {
  return {
    subscriptionId: item["subscriptionId"],
    decision: item["decision"],
    denialReason: item["denialReason"],
  };
}

/** Enum for Access Decision */
export enum KnownAccessDecisionEnum {
  /** Access allowed */
  Allowed = "Allowed",
  /** Access denied */
  Denied = "Denied",
}

/**
 * Enum for Access Decision \
 * {@link KnownAccessDecisionEnum} can be used interchangeably with AccessDecisionEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allowed**: Access allowed \
 * **Denied**: Access denied
 */
export type AccessDecisionEnum = string;

/** Response for available date range of carbon emission data */
export interface CarbonEmissionDataAvailableDateRange {
  /** Start date parameter, format is yyyy-MM-dd */
  startDate: string;
  /** End date parameter, format is yyyy-MM-dd */
  endDate: string;
}

export function carbonEmissionDataAvailableDateRangeDeserializer(
  item: any,
): CarbonEmissionDataAvailableDateRange {
  return {
    startDate: item["startDate"],
    endDate: item["endDate"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-04-01 API version. */
  V20250401 = "2025-04-01",
}
