// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The status of the long running operation for cost detailed report. */
export interface GenerateDetailedCostReportOperationStatuses extends ExtensionResource {
  /** The status of the long running operation. */
  status?: Status;
  /** The startTime of the operation. */
  startTime?: string;
  /** The endTime of the operation. */
  endTime?: string;
  /** The details of the error. */
  error?: ErrorDetails;
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  readonly expiryTime?: Date;
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  validTill?: Date;
  /** The URL to download the generated report. */
  downloadUrl?: string;
}

export function generateDetailedCostReportOperationStatusesDeserializer(
  item: any,
): GenerateDetailedCostReportOperationStatuses {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _generateDetailedCostReportOperationStatusesPropertiesDeserializer(item["properties"])),
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    startTime: item["startTime"],
    endTime: item["endTime"],
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

/** The URL to download the generated report. */
export interface DownloadURL {
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  readonly expiryTime?: Date;
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  validTill?: Date;
  /** The URL to download the generated report. */
  downloadUrl?: string;
}

export function downloadURLDeserializer(item: any): DownloadURL {
  return {
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    validTill: !item["validTill"] ? item["validTill"] : new Date(item["validTill"]),
    downloadUrl: item["downloadUrl"],
  };
}

/** The status of the long running operation. */
export interface Status {
  /** The status of the long running operation. */
  status?: ReportOperationStatusType;
}

export function statusDeserializer(item: any): Status {
  return {
    status: item["status"],
  };
}

/** The status of the long running operation. */
export enum KnownReportOperationStatusType {
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Queued */
  Queued = "Queued",
  /** NoDataFound */
  NoDataFound = "NoDataFound",
  /** ReadyToDownload */
  ReadyToDownload = "ReadyToDownload",
  /** TimedOut */
  TimedOut = "TimedOut",
}

/**
 * The status of the long running operation. \
 * {@link KnownReportOperationStatusType} can be used interchangeably with ReportOperationStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Completed** \
 * **Failed** \
 * **Queued** \
 * **NoDataFound** \
 * **ReadyToDownload** \
 * **TimedOut**
 */
export type ReportOperationStatusType = string;

/** The details of the error. */
export interface ErrorDetails {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(_item: ExtensionResource): any {
  return {};
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(_item: Resource): any {
  return {};
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Error response indicates that the service is not able to process the incoming request. The reason is provided in the error message. \n\nSome Error responses: \n\n * 429 TooManyRequests - Request is throttled. Retry after waiting for the time specified in the \"x-ms-ratelimit-microsoft.consumption-retry-after\" header. \n\n * 503 ServiceUnavailable - Service is temporarily unavailable. Retry after waiting for the time specified in the \"Retry-After\" header. */
export interface ErrorResponse {
  /** The details of the error. */
  error?: ErrorDetails;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

/** Result of listing cost management operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of cost management operations supported by the Microsoft.CostManagement resource provider. */
  readonly value?: CostManagementOperation[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : costManagementOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function costManagementOperationArrayDeserializer(
  result: Array<CostManagementOperation>,
): any[] {
  return result.map((item) => {
    return costManagementOperationDeserializer(item);
  });
}

/** A Cost management REST API operation. */
export interface CostManagementOperation extends Operation {
  /** Operation id: {provider}/{resource}/{operation}. */
  readonly id?: string;
}

export function costManagementOperationDeserializer(item: any): CostManagementOperation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
    id: item["id"],
  };
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

/** Localized display information for an operation. */
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

/** A budget resource. */
export interface Budget extends ExtensionResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /**
   * The category of the budget.
   * - 'Cost' defines a Budget.
   * - 'ReservationUtilization' defines a Reservation Utilization Alert Rule.
   */
  category?: CategoryType;
  /**
   * The total amount of cost to track with the budget.
   *
   * Supported for CategoryType(s): Cost.
   *
   * Required for CategoryType(s): Cost.
   */
  amount?: number;
  /**
   * The time covered by a budget. Tracking of the amount will be reset based on the time grain.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * Supported timeGrainTypes for **CategoryType: Cost**
   *
   * - Monthly
   * - Quarterly
   * - Annually
   * - BillingMonth*
   * - BillingQuarter*
   * - BillingAnnual*
   *
   * *only supported for Web Direct customers.
   *
   * Supported timeGrainTypes for **CategoryType: ReservationUtilization**
   * - Last7Days
   * - Last30Days
   *
   * Required for CategoryType(s): Cost, ReservationUtilization.
   */
  timeGrain?: TimeGrainType;
  /**
   * The time period that defines the active period of the budget. The budget will evaluate data on or after the startDate and will expire on the endDate.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * Required for CategoryType(s): Cost, ReservationUtilization.
   */
  timePeriod?: BudgetTimePeriod;
  /**
   * May be used to filter budgets by user-specified dimensions and/or tags.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   */
  filter?: BudgetFilter;
  /**
   * The current amount of cost which is being tracked for a budget.
   *
   * Supported for CategoryType(s): Cost.
   */
  readonly currentSpend?: CurrentSpend;
  /**
   * Dictionary of notifications associated with the budget.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * - Constraints for **CategoryType: Cost** - Budget can have up to 5 notifications with thresholdType: Actual and 5 notifications with thresholdType: Forecasted.
   * - Constraints for **CategoryType: ReservationUtilization** - Only one notification allowed. thresholdType is not applicable.
   */
  notifications?: Record<string, Notification>;
  /**
   * The forecasted cost which is being tracked for a budget.
   *
   * Supported for CategoryType(s): Cost.
   */
  readonly forecastSpend?: ForecastSpend;
}

export function budgetSerializer(item: Budget): any {
  return {
    properties: areAllPropsUndefined(item, [
      "category",
      "amount",
      "timeGrain",
      "timePeriod",
      "filter",
      "notifications",
    ])
      ? undefined
      : _budgetPropertiesSerializer(item),
    eTag: item["eTag"],
  };
}

export function budgetDeserializer(item: any): Budget {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _budgetPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** The properties of the budget. */
export interface BudgetProperties {
  /**
   * The category of the budget.
   * - 'Cost' defines a Budget.
   * - 'ReservationUtilization' defines a Reservation Utilization Alert Rule.
   */
  category: CategoryType;
  /**
   * The total amount of cost to track with the budget.
   *
   * Supported for CategoryType(s): Cost.
   *
   * Required for CategoryType(s): Cost.
   */
  amount?: number;
  /**
   * The time covered by a budget. Tracking of the amount will be reset based on the time grain.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * Supported timeGrainTypes for **CategoryType: Cost**
   *
   * - Monthly
   * - Quarterly
   * - Annually
   * - BillingMonth*
   * - BillingQuarter*
   * - BillingAnnual*
   *
   * *only supported for Web Direct customers.
   *
   * Supported timeGrainTypes for **CategoryType: ReservationUtilization**
   * - Last7Days
   * - Last30Days
   *
   * Required for CategoryType(s): Cost, ReservationUtilization.
   */
  timeGrain: TimeGrainType;
  /**
   * The time period that defines the active period of the budget. The budget will evaluate data on or after the startDate and will expire on the endDate.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * Required for CategoryType(s): Cost, ReservationUtilization.
   */
  timePeriod: BudgetTimePeriod;
  /**
   * May be used to filter budgets by user-specified dimensions and/or tags.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   */
  filter?: BudgetFilter;
  /**
   * The current amount of cost which is being tracked for a budget.
   *
   * Supported for CategoryType(s): Cost.
   */
  readonly currentSpend?: CurrentSpend;
  /**
   * Dictionary of notifications associated with the budget.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * - Constraints for **CategoryType: Cost** - Budget can have up to 5 notifications with thresholdType: Actual and 5 notifications with thresholdType: Forecasted.
   * - Constraints for **CategoryType: ReservationUtilization** - Only one notification allowed. thresholdType is not applicable.
   */
  notifications?: Record<string, Notification>;
  /**
   * The forecasted cost which is being tracked for a budget.
   *
   * Supported for CategoryType(s): Cost.
   */
  readonly forecastSpend?: ForecastSpend;
}

export function budgetPropertiesSerializer(item: BudgetProperties): any {
  return {
    category: item["category"],
    amount: item["amount"],
    timeGrain: item["timeGrain"],
    timePeriod: budgetTimePeriodSerializer(item["timePeriod"]),
    filter: !item["filter"] ? item["filter"] : budgetFilterSerializer(item["filter"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationRecordSerializer(item["notifications"]),
  };
}

export function budgetPropertiesDeserializer(item: any): BudgetProperties {
  return {
    category: item["category"],
    amount: item["amount"],
    timeGrain: item["timeGrain"],
    timePeriod: budgetTimePeriodDeserializer(item["timePeriod"]),
    filter: !item["filter"] ? item["filter"] : budgetFilterDeserializer(item["filter"]),
    currentSpend: !item["currentSpend"]
      ? item["currentSpend"]
      : currentSpendDeserializer(item["currentSpend"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationRecordDeserializer(item["notifications"]),
    forecastSpend: !item["forecastSpend"]
      ? item["forecastSpend"]
      : forecastSpendDeserializer(item["forecastSpend"]),
  };
}

/**
 * The category of the budget.
 * - 'Cost' defines a Budget.
 * - 'ReservationUtilization' defines a Reservation Utilization Alert Rule.
 */
export enum KnownCategoryType {
  /** A Budget that evaluates monetary cost of Azure resources against an amount, and alerts based on a configured notification threshold. */
  Cost = "Cost",
  /** An Alert Rule that evaluates the utilization percentage of Azure Reservations, and alerts based on a configured notification threshold. */
  ReservationUtilization = "ReservationUtilization",
}

/**
 * The category of the budget.
 * - 'Cost' defines a Budget.
 * - 'ReservationUtilization' defines a Reservation Utilization Alert Rule. \
 * {@link KnownCategoryType} can be used interchangeably with CategoryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cost**: A Budget that evaluates monetary cost of Azure resources against an amount, and alerts based on a configured notification threshold. \
 * **ReservationUtilization**: An Alert Rule that evaluates the utilization percentage of Azure Reservations, and alerts based on a configured notification threshold.
 */
export type CategoryType = string;

/**
 * The time covered by a budget. Tracking of the amount will be reset based on the time grain.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 *
 * Supported timeGrainTypes for **CategoryType: Cost**
 *
 * - Monthly
 * - Quarterly
 * - Annually
 * - BillingMonth*
 * - BillingQuarter*
 * - BillingAnnual*
 *
 * *only supported for Web Direct customers.
 *
 * Supported timeGrainTypes for **CategoryType: ReservationUtilization**
 * - Last7Days
 * - Last30Days
 *
 * Required for CategoryType(s): Cost, ReservationUtilization.
 */
export enum KnownTimeGrainType {
  /**
   * The budget will track costs in the current calendar month against the amount.
   *
   * Supported for CategoryType: Cost only.
   */
  Monthly = "Monthly",
  /**
   * The budget will track costs in the current calendar quarter against the amount.
   *
   * Supported for CategoryType: Cost only.
   */
  Quarterly = "Quarterly",
  /**
   * The budget will track costs in the current calendar year against the amount.
   *
   * Supported for CategoryType: Cost only.
   */
  Annually = "Annually",
  /**
   * The budget will track costs in the current billing month against the amount.
   *
   * Supported for CategoryType: Cost and Web Direct customers only.
   */
  BillingMonth = "BillingMonth",
  /**
   * The budget will track costs in the current billing quarter against the amount.
   *
   * Supported for CategoryType: Cost and Web Direct customers only.
   */
  BillingQuarter = "BillingQuarter",
  /**
   * The budget will track costs in the current billing year against the amount.
   *
   * Supported for CategoryType: Cost and Web Direct customers only.
   */
  BillingAnnual = "BillingAnnual",
  /**
   * The Reservation Utilization Alert Rule will evaluate reservations based on their 7-Day utilization percentage.
   *
   * Supported for CategoryType: ReservationUtilization only.
   */
  Last7Days = "Last7Days",
  /**
   * The Reservation Utilization Alert Rule will evaluate reservations based on their 30-Day utilization percentage.
   *
   * Supported for CategoryType: ReservationUtilization only.
   */
  Last30Days = "Last30Days",
}

/**
 * The time covered by a budget. Tracking of the amount will be reset based on the time grain.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 *
 * Supported timeGrainTypes for **CategoryType: Cost**
 *
 * - Monthly
 * - Quarterly
 * - Annually
 * - BillingMonth*
 * - BillingQuarter*
 * - BillingAnnual*
 *
 * *only supported for Web Direct customers.
 *
 * Supported timeGrainTypes for **CategoryType: ReservationUtilization**
 * - Last7Days
 * - Last30Days
 *
 * Required for CategoryType(s): Cost, ReservationUtilization. \
 * {@link KnownTimeGrainType} can be used interchangeably with TimeGrainType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monthly**: The budget will track costs in the current calendar month against the amount.
 *
 * Supported for CategoryType: Cost only. \
 * **Quarterly**: The budget will track costs in the current calendar quarter against the amount.
 *
 * Supported for CategoryType: Cost only. \
 * **Annually**: The budget will track costs in the current calendar year against the amount.
 *
 * Supported for CategoryType: Cost only. \
 * **BillingMonth**: The budget will track costs in the current billing month against the amount.
 *
 * Supported for CategoryType: Cost and Web Direct customers only. \
 * **BillingQuarter**: The budget will track costs in the current billing quarter against the amount.
 *
 * Supported for CategoryType: Cost and Web Direct customers only. \
 * **BillingAnnual**: The budget will track costs in the current billing year against the amount.
 *
 * Supported for CategoryType: Cost and Web Direct customers only. \
 * **Last7Days**: The Reservation Utilization Alert Rule will evaluate reservations based on their 7-Day utilization percentage.
 *
 * Supported for CategoryType: ReservationUtilization only. \
 * **Last30Days**: The Reservation Utilization Alert Rule will evaluate reservations based on their 30-Day utilization percentage.
 *
 * Supported for CategoryType: ReservationUtilization only.
 */
export type TimeGrainType = string;

/**
 * The time period that defines the active period of the budget. The budget will evaluate data on or after the startDate and will expire on the endDate.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 *
 * Required for CategoryType(s): Cost, ReservationUtilization.
 */
export interface BudgetTimePeriod {
  /**
   * The start date for the budget.
   *
   * - Constraints for **CategoryType: Cost** - Must be first of the month and should be less than the end date. Budget start date must be on or after June 1, 2017. Future start date should not be more than twelve months. Past start date should  be selected within the timegrain period.
   *
   * - Constraints for **CategoryType: ReservationUtilization** - Must be on or after the current date and less than the end date.
   */
  startDate: Date;
  /**
   * The end date for the budget.
   *
   * - Constraints for **CategoryType: Cost** - No constraints. If not provided, we default this to 10 years from the start date.
   *
   * - Constraints for **CategoryType: ReservationUtilization** - End date cannot be more than 3 years after the start date.
   */
  endDate?: Date;
}

export function budgetTimePeriodSerializer(item: BudgetTimePeriod): any {
  return {
    startDate: item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
  };
}

export function budgetTimePeriodDeserializer(item: any): BudgetTimePeriod {
  return {
    startDate: new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
  };
}

/**
 * May be used to filter budgets by user-specified dimensions and/or tags.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 */
export interface BudgetFilter {
  /**
   * The logical "AND" expression. Must have at least 2 items.
   *
   * Supported for CategoryType(s): Cost.
   */
  and?: BudgetFilterProperties[];
  /**
   * Has comparison expression for a dimension.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * Supported dimension names for **CategoryType: ReservationUtilization**
   * - ReservationId
   * - ReservedResourceType
   */
  dimensions?: BudgetComparisonExpression;
  /**
   * Has comparison expression for a tag.
   *
   * Supported for CategoryType(s): Cost.
   */
  tags?: BudgetComparisonExpression;
}

export function budgetFilterSerializer(item: BudgetFilter): any {
  return {
    and: !item["and"] ? item["and"] : budgetFilterPropertiesArraySerializer(item["and"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : budgetComparisonExpressionSerializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : budgetComparisonExpressionSerializer(item["tags"]),
  };
}

export function budgetFilterDeserializer(item: any): BudgetFilter {
  return {
    and: !item["and"] ? item["and"] : budgetFilterPropertiesArrayDeserializer(item["and"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : budgetComparisonExpressionDeserializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : budgetComparisonExpressionDeserializer(item["tags"]),
  };
}

export function budgetFilterPropertiesArraySerializer(
  result: Array<BudgetFilterProperties>,
): any[] {
  return result.map((item) => {
    return budgetFilterPropertiesSerializer(item);
  });
}

export function budgetFilterPropertiesArrayDeserializer(
  result: Array<BudgetFilterProperties>,
): any[] {
  return result.map((item) => {
    return budgetFilterPropertiesDeserializer(item);
  });
}

/**
 * The Dimensions or Tags to filter a budget by.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 */
export interface BudgetFilterProperties {
  /**
   * Has comparison expression for a dimension.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * Supported dimension names for **CategoryType: ReservationUtilization**
   * - ReservationId
   * - ReservedResourceType
   */
  dimensions?: BudgetComparisonExpression;
  /**
   * Has comparison expression for a tag.
   *
   * Supported for CategoryType(s): Cost.
   */
  tags?: BudgetComparisonExpression;
}

export function budgetFilterPropertiesSerializer(item: BudgetFilterProperties): any {
  return {
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : budgetComparisonExpressionSerializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : budgetComparisonExpressionSerializer(item["tags"]),
  };
}

export function budgetFilterPropertiesDeserializer(item: any): BudgetFilterProperties {
  return {
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : budgetComparisonExpressionDeserializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : budgetComparisonExpressionDeserializer(item["tags"]),
  };
}

/** The comparison expression to be used in the budgets. */
export interface BudgetComparisonExpression {
  /** The name of the column to use in comparison. */
  name: string;
  /** The operator to use for comparison. */
  operator: BudgetOperatorType;
  /** Array of values to use for comparison */
  values: string[];
}

export function budgetComparisonExpressionSerializer(item: BudgetComparisonExpression): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function budgetComparisonExpressionDeserializer(item: any): BudgetComparisonExpression {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** The operator to use for comparison. */
export enum KnownBudgetOperatorType {
  /** In */
  In = "In",
}

/**
 * The operator to use for comparison. \
 * {@link KnownBudgetOperatorType} can be used interchangeably with BudgetOperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In**
 */
export type BudgetOperatorType = string;

/**
 * The current amount of cost which is being tracked for a budget.
 *
 * Supported for CategoryType(s): Cost.
 */
export interface CurrentSpend {
  /** The total amount of cost which is being tracked by the budget. */
  readonly amount?: number;
  /** The unit of measure for the budget amount. */
  readonly unit?: string;
}

export function currentSpendDeserializer(item: any): CurrentSpend {
  return {
    amount: item["amount"],
    unit: item["unit"],
  };
}

export function notificationRecordSerializer(
  item: Record<string, Notification>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : notificationSerializer(item[key]);
  });
  return result;
}

export function notificationRecordDeserializer(
  item: Record<string, any>,
): Record<string, Notification> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : notificationDeserializer(item[key]);
  });
  return result;
}

/**
 * The notification associated with a budget.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 */
export interface Notification {
  /**
   * The notification is enabled or not.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   */
  enabled: boolean;
  /**
   * The comparison operator.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * Supported operators for **CategoryType: Cost**
   * - GreaterThan
   * - GreaterThanOrEqualTo
   *
   * Supported operators for **CategoryType: ReservationUtilization**
   * - LessThan
   */
  operator: BudgetNotificationOperatorType;
  /**
   * Threshold value associated with a notification. It is always percent with a maximum of 2 decimal places.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   *
   * **CategoryType: Cost** - Must be between 0 and 1000. Notification is sent when the cost exceeded the threshold.
   *
   * **CategoryType: ReservationUtilization** - Must be between 0 and 100. Notification is sent when a reservation has a utilization percentage below the threshold.
   */
  threshold: number;
  /**
   * Frequency of a notification. Represents how long the notification will be silent after triggering an alert for a threshold breach. If not specified, the frequency will be set by default based on the timeGrain (Weekly when timeGrain: Last7Days, Monthly when timeGrain: Last30Days).
   *
   * Supported for CategoryType(s): ReservationUtilization.
   */
  frequency?: Frequency;
  /**
   * Email addresses to send the notification to when the threshold is breached. Must have at least one contact email or contact group specified at the Subscription or Resource Group scopes. All other scopes must have at least one contact email specified.
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   */
  contactEmails: string[];
  /**
   * Subscription or Resource Group scopes only. Contact roles to send the notification to when the threshold is breached.
   *
   * Supported for CategoryType(s): Cost.
   */
  contactRoles?: string[];
  /**
   * Subscription or Resource Group scopes only. Action groups to send the notification to when the threshold is exceeded. Must be provided as a fully qualified Azure resource id.
   *
   * Supported for CategoryType(s): Cost.
   */
  contactGroups?: string[];
  /**
   * The type of threshold.
   *
   * Supported for CategoryType(s): Cost.
   */
  thresholdType?: ThresholdType;
  /**
   * Language in which the recipient will receive the notification,
   *
   * Supported for CategoryType(s): Cost, ReservationUtilization.
   */
  locale?: CultureCode;
}

export function notificationSerializer(item: Notification): any {
  return {
    enabled: item["enabled"],
    operator: item["operator"],
    threshold: item["threshold"],
    frequency: item["frequency"],
    contactEmails: item["contactEmails"].map((p: any) => {
      return p;
    }),
    contactRoles: !item["contactRoles"]
      ? item["contactRoles"]
      : item["contactRoles"].map((p: any) => {
          return p;
        }),
    contactGroups: !item["contactGroups"]
      ? item["contactGroups"]
      : item["contactGroups"].map((p: any) => {
          return p;
        }),
    thresholdType: item["thresholdType"],
    locale: item["locale"],
  };
}

export function notificationDeserializer(item: any): Notification {
  return {
    enabled: item["enabled"],
    operator: item["operator"],
    threshold: item["threshold"],
    frequency: item["frequency"],
    contactEmails: item["contactEmails"].map((p: any) => {
      return p;
    }),
    contactRoles: !item["contactRoles"]
      ? item["contactRoles"]
      : item["contactRoles"].map((p: any) => {
          return p;
        }),
    contactGroups: !item["contactGroups"]
      ? item["contactGroups"]
      : item["contactGroups"].map((p: any) => {
          return p;
        }),
    thresholdType: item["thresholdType"],
    locale: item["locale"],
  };
}

/**
 * The comparison operator.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 *
 * Supported operators for **CategoryType: Cost**
 * - GreaterThan
 * - GreaterThanOrEqualTo
 *
 * Supported operators for **CategoryType: ReservationUtilization**
 * - LessThan
 */
export enum KnownBudgetNotificationOperatorType {
  /**
   * Notification will be triggered if the evaluated cost is the same as threshold value. Note: It’s not recommended to use this OperatorType as there’s low chance of cost being exactly the same as threshold value, leading to missing of your alert. This OperatorType will be deprecated in future.
   *
   * Supported for CategoryType(s): Cost.
   */
  EqualTo = "EqualTo",
  /**
   * Notification will be triggered if the evaluated cost is greater than the threshold value. Note: This is the recommended OperatorType while configuring Budget Alert.
   *
   * Supported for CategoryType(s): Cost.
   */
  GreaterThan = "GreaterThan",
  /**
   * Notification will be triggered if the evaluated cost is greater than or equal to the threshold value.
   *
   * Supported for CategoryType(s): Cost.
   */
  GreaterThanOrEqualTo = "GreaterThanOrEqualTo",
  /**
   * Notification will be triggered if any Reservations in the scope of the Reservation Utilization Alert Rule have a utilization less than the threshold percentage.
   *
   * Supported for CategoryType(s): ReservationUtilization.
   */
  LessThan = "LessThan",
}

/**
 * The comparison operator.
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 *
 * Supported operators for **CategoryType: Cost**
 * - GreaterThan
 * - GreaterThanOrEqualTo
 *
 * Supported operators for **CategoryType: ReservationUtilization**
 * - LessThan \
 * {@link KnownBudgetNotificationOperatorType} can be used interchangeably with BudgetNotificationOperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EqualTo**: Notification will be triggered if the evaluated cost is the same as threshold value. Note: It’s not recommended to use this OperatorType as there’s low chance of cost being exactly the same as threshold value, leading to missing of your alert. This OperatorType will be deprecated in future.
 *
 * Supported for CategoryType(s): Cost. \
 * **GreaterThan**: Notification will be triggered if the evaluated cost is greater than the threshold value. Note: This is the recommended OperatorType while configuring Budget Alert.
 *
 * Supported for CategoryType(s): Cost. \
 * **GreaterThanOrEqualTo**: Notification will be triggered if the evaluated cost is greater than or equal to the threshold value.
 *
 * Supported for CategoryType(s): Cost. \
 * **LessThan**: Notification will be triggered if any Reservations in the scope of the Reservation Utilization Alert Rule have a utilization less than the threshold percentage.
 *
 * Supported for CategoryType(s): ReservationUtilization.
 */
export type BudgetNotificationOperatorType = string;

/**
 * Frequency of a notification. Represents how long the notification will be silent after triggering an alert for a threshold breach. If not specified, the frequency will be set by default based on the timeGrain (Weekly when timeGrain: Last7Days, Monthly when timeGrain: Last30Days).
 *
 * Supported for CategoryType(s): ReservationUtilization.
 */
export enum KnownFrequency {
  /** After the threshold breaches and an Alert is fired, no further alerts will be sent until the next calendar day. */
  Daily = "Daily",
  /** After the threshold breaches and an Alert is fired, no further alerts will be sent for 7 calendar days. */
  Weekly = "Weekly",
  /** After the threshold breaches and an Alert is fired, no further alerts will be sent for 30 calendar days. */
  Monthly = "Monthly",
}

/**
 * Frequency of a notification. Represents how long the notification will be silent after triggering an alert for a threshold breach. If not specified, the frequency will be set by default based on the timeGrain (Weekly when timeGrain: Last7Days, Monthly when timeGrain: Last30Days).
 *
 * Supported for CategoryType(s): ReservationUtilization. \
 * {@link KnownFrequency} can be used interchangeably with Frequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily**: After the threshold breaches and an Alert is fired, no further alerts will be sent until the next calendar day. \
 * **Weekly**: After the threshold breaches and an Alert is fired, no further alerts will be sent for 7 calendar days. \
 * **Monthly**: After the threshold breaches and an Alert is fired, no further alerts will be sent for 30 calendar days.
 */
export type Frequency = string;

/**
 * The type of threshold.
 *
 * Supported for CategoryType(s): Cost.
 */
export enum KnownThresholdType {
  /** Actual costs budget alerts notify when the actual accrued cost exceeds the allocated budget. */
  Actual = "Actual",
  /** Forecasted costs budget alerts provide advanced notification that your spending trends are likely to exceed your allocated budget, as it relies on forecasted cost predictions. */
  Forecasted = "Forecasted",
}

/**
 * The type of threshold.
 *
 * Supported for CategoryType(s): Cost. \
 * {@link KnownThresholdType} can be used interchangeably with ThresholdType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Actual**: Actual costs budget alerts notify when the actual accrued cost exceeds the allocated budget. \
 * **Forecasted**: Forecasted costs budget alerts provide advanced notification that your spending trends are likely to exceed your allocated budget, as it relies on forecasted cost predictions.
 */
export type ThresholdType = string;

/**
 * Language in which the recipient will receive the notification,
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization.
 */
export enum KnownCultureCode {
  /** en-us */
  EnUs = "en-us",
  /** ja-jp */
  JaJp = "ja-jp",
  /** zh-cn */
  ZhCn = "zh-cn",
  /** de-de */
  DeDe = "de-de",
  /** es-es */
  EsEs = "es-es",
  /** fr-fr */
  FrFr = "fr-fr",
  /** it-it */
  ItIt = "it-it",
  /** ko-kr */
  KoKr = "ko-kr",
  /** pt-br */
  PtBr = "pt-br",
  /** ru-ru */
  RuRu = "ru-ru",
  /** zh-tw */
  ZhTw = "zh-tw",
  /** cs-cz */
  CsCz = "cs-cz",
  /** pl-pl */
  PlPl = "pl-pl",
  /** tr-tr */
  TrTr = "tr-tr",
  /** da-dk */
  DaDk = "da-dk",
  /** en-gb */
  EnGb = "en-gb",
  /** hu-hu */
  HuHu = "hu-hu",
  /** nb-no */
  NbNo = "nb-no",
  /** nl-nl */
  NlNl = "nl-nl",
  /** pt-pt */
  PtPt = "pt-pt",
  /** sv-se */
  SvSe = "sv-se",
}

/**
 * Language in which the recipient will receive the notification,
 *
 * Supported for CategoryType(s): Cost, ReservationUtilization. \
 * {@link KnownCultureCode} can be used interchangeably with CultureCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **en-us** \
 * **ja-jp** \
 * **zh-cn** \
 * **de-de** \
 * **es-es** \
 * **fr-fr** \
 * **it-it** \
 * **ko-kr** \
 * **pt-br** \
 * **ru-ru** \
 * **zh-tw** \
 * **cs-cz** \
 * **pl-pl** \
 * **tr-tr** \
 * **da-dk** \
 * **en-gb** \
 * **hu-hu** \
 * **nb-no** \
 * **nl-nl** \
 * **pt-pt** \
 * **sv-se**
 */
export type CultureCode = string;

/**
 * The forecasted cost which is being tracked for a budget.
 *
 * Supported for CategoryType(s): Cost.
 */
export interface ForecastSpend {
  /** The forecasted cost for the total time period which is being tracked by the budget. This value is only provided if the budget contains a forecast alert type. */
  readonly amount?: number;
  /** The unit of measure for the budget amount. */
  readonly unit?: string;
}

export function forecastSpendDeserializer(item: any): ForecastSpend {
  return {
    amount: item["amount"],
    unit: item["unit"],
  };
}

/** Result of listing budgets. It contains a list of available budgets in the scope provided. */
export interface _BudgetsListResult {
  /** The list of budgets. */
  readonly value?: Budget[];
  /** The link (url) to the next page of results.\r\nIt's null for now, added for future use. */
  nextLink?: string;
}

export function _budgetsListResultDeserializer(item: any): _BudgetsListResult {
  return {
    value: !item["value"] ? item["value"] : budgetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function budgetArraySerializer(result: Array<Budget>): any[] {
  return result.map((item) => {
    return budgetSerializer(item);
  });
}

export function budgetArrayDeserializer(result: Array<Budget>): any[] {
  return result.map((item) => {
    return budgetDeserializer(item);
  });
}

/** An export resource. */
export interface Export extends ExtensionResource {
  /** The managed identity associated with Export */
  identity?: SystemAssignedServiceIdentity;
  /** The location of the Export's managed identity. Only required when utilizing managed identity. */
  location?: string;
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /** The format of the export being delivered. */
  format?: FormatType;
  /** Has delivery information for the export. */
  deliveryInfo?: ExportDeliveryInfo;
  /** Has the definition for the export. */
  definition?: ExportDefinition;
  /** If requested, has the most recent run history for the export. */
  runHistory?: ExportExecutionListResult;
  /** If set to true, exported data will be partitioned by size and placed in a blob directory together with a manifest file. */
  partitionData?: boolean;
  /** Allow customers to select overwrite data(OverwritePreviousReport) for exports. This setting will enable overwrite data for the same month in customer storage account. By default set to CreateNewReport. */
  dataOverwriteBehavior?: DataOverwriteBehaviorType;
  /** Allow customers to select compress data for exports. This setting will enable destination file compression scheme at runtime. By default set to None. Gzip is for csv and snappy for parquet. */
  compressionMode?: CompressionModeType;
  /** The export description set by customer at time of export creation/update. */
  exportDescription?: string;
  /** If the export has an active schedule, provides an estimate of the next run time. */
  readonly nextRunTimeEstimate?: Date;
  /** The export suspension reason if export is in SystemSuspended state. This is not populated currently. */
  readonly systemSuspensionContext?: ExportSuspensionContext;
  /** Has schedule information for the export. */
  schedule?: ExportSchedule;
}

export function exportSerializer(item: Export): any {
  return {
    properties: areAllPropsUndefined(item, [
      "format",
      "deliveryInfo",
      "definition",
      "runHistory",
      "partitionData",
      "dataOverwriteBehavior",
      "compressionMode",
      "exportDescription",
      "schedule",
    ])
      ? undefined
      : _exportPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
    location: item["location"],
    eTag: item["eTag"],
  };
}

export function exportDeserializer(item: any): Export {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _exportPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityDeserializer(item["identity"]),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** The properties of the export. */
export interface ExportProperties extends CommonExportProperties {
  /** Has schedule information for the export. */
  schedule?: ExportSchedule;
}

export function exportPropertiesSerializer(item: ExportProperties): any {
  return {
    format: item["format"],
    deliveryInfo: exportDeliveryInfoSerializer(item["deliveryInfo"]),
    definition: exportDefinitionSerializer(item["definition"]),
    runHistory: !item["runHistory"]
      ? item["runHistory"]
      : exportExecutionListResultSerializer(item["runHistory"]),
    partitionData: item["partitionData"],
    dataOverwriteBehavior: item["dataOverwriteBehavior"],
    compressionMode: item["compressionMode"],
    exportDescription: item["exportDescription"],
    schedule: !item["schedule"] ? item["schedule"] : exportScheduleSerializer(item["schedule"]),
  };
}

export function exportPropertiesDeserializer(item: any): ExportProperties {
  return {
    format: item["format"],
    deliveryInfo: exportDeliveryInfoDeserializer(item["deliveryInfo"]),
    definition: exportDefinitionDeserializer(item["definition"]),
    runHistory: !item["runHistory"]
      ? item["runHistory"]
      : exportExecutionListResultDeserializer(item["runHistory"]),
    partitionData: item["partitionData"],
    dataOverwriteBehavior: item["dataOverwriteBehavior"],
    compressionMode: item["compressionMode"],
    exportDescription: item["exportDescription"],
    nextRunTimeEstimate: !item["nextRunTimeEstimate"]
      ? item["nextRunTimeEstimate"]
      : new Date(item["nextRunTimeEstimate"]),
    systemSuspensionContext: !item["systemSuspensionContext"]
      ? item["systemSuspensionContext"]
      : exportSuspensionContextDeserializer(item["systemSuspensionContext"]),
    schedule: !item["schedule"] ? item["schedule"] : exportScheduleDeserializer(item["schedule"]),
  };
}

/** The schedule associated with the export. */
export interface ExportSchedule {
  /** The status of the export's schedule. If 'Inactive', the export's schedule is paused. To enable export set the status to be Active and then make a PUT request. */
  status?: StatusType;
  /** The schedule recurrence. */
  recurrence?: RecurrenceType;
  /** Has start and end date of the recurrence. The start date must be in future. If present, the end date must be greater than start date. */
  recurrencePeriod?: ExportRecurrencePeriod;
}

export function exportScheduleSerializer(item: ExportSchedule): any {
  return {
    status: item["status"],
    recurrence: item["recurrence"],
    recurrencePeriod: !item["recurrencePeriod"]
      ? item["recurrencePeriod"]
      : exportRecurrencePeriodSerializer(item["recurrencePeriod"]),
  };
}

export function exportScheduleDeserializer(item: any): ExportSchedule {
  return {
    status: item["status"],
    recurrence: item["recurrence"],
    recurrencePeriod: !item["recurrencePeriod"]
      ? item["recurrencePeriod"]
      : exportRecurrencePeriodDeserializer(item["recurrencePeriod"]),
  };
}

/** The status of the export's schedule. If 'Inactive', the export's schedule is paused. To enable export set the status to be Active and then make a PUT request. */
export enum KnownStatusType {
  /** Active */
  Active = "Active",
  /** Inactive */
  Inactive = "Inactive",
}

/**
 * The status of the export's schedule. If 'Inactive', the export's schedule is paused. To enable export set the status to be Active and then make a PUT request. \
 * {@link KnownStatusType} can be used interchangeably with StatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Inactive**
 */
export type StatusType = string;

/** The schedule recurrence. */
export enum KnownRecurrenceType {
  /** Daily */
  Daily = "Daily",
  /** Weekly */
  Weekly = "Weekly",
  /** Monthly */
  Monthly = "Monthly",
  /** Annually */
  Annually = "Annually",
}

/**
 * The schedule recurrence. \
 * {@link KnownRecurrenceType} can be used interchangeably with RecurrenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily** \
 * **Weekly** \
 * **Monthly** \
 * **Annually**
 */
export type RecurrenceType = string;

/** The start and end date for recurrence schedule. */
export interface ExportRecurrencePeriod {
  /** The start date of recurrence. */
  from: Date;
  /** The end date of recurrence. */
  to?: Date;
}

export function exportRecurrencePeriodSerializer(item: ExportRecurrencePeriod): any {
  return {
    from: item["from"].toISOString(),
    to: !item["to"] ? item["to"] : item["to"].toISOString(),
  };
}

export function exportRecurrencePeriodDeserializer(item: any): ExportRecurrencePeriod {
  return {
    from: new Date(item["from"]),
    to: !item["to"] ? item["to"] : new Date(item["to"]),
  };
}

/** Managed service identity (either system assigned, or none) */
export interface SystemAssignedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: SystemAssignedServiceIdentityType;
}

export function systemAssignedServiceIdentitySerializer(item: SystemAssignedServiceIdentity): any {
  return { type: item["type"] };
}

export function systemAssignedServiceIdentityDeserializer(
  item: any,
): SystemAssignedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Type of managed service identity (either system assigned, or none). */
export enum KnownSystemAssignedServiceIdentityType {
  /** No managed system identity. */
  None = "None",
  /** System assigned managed system identity. */
  SystemAssigned = "SystemAssigned",
}

/**
 * Type of managed service identity (either system assigned, or none). \
 * {@link KnownSystemAssignedServiceIdentityType} can be used interchangeably with SystemAssignedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed system identity. \
 * **SystemAssigned**: System assigned managed system identity.
 */
export type SystemAssignedServiceIdentityType = string;

/** The common properties of the export. */
export interface CommonExportProperties {
  /** The format of the export being delivered. */
  format?: FormatType;
  /** Has delivery information for the export. */
  deliveryInfo: ExportDeliveryInfo;
  /** Has the definition for the export. */
  definition: ExportDefinition;
  /** If requested, has the most recent run history for the export. */
  runHistory?: ExportExecutionListResult;
  /** If set to true, exported data will be partitioned by size and placed in a blob directory together with a manifest file. */
  partitionData?: boolean;
  /** Allow customers to select overwrite data(OverwritePreviousReport) for exports. This setting will enable overwrite data for the same month in customer storage account. By default set to CreateNewReport. */
  dataOverwriteBehavior?: DataOverwriteBehaviorType;
  /** Allow customers to select compress data for exports. This setting will enable destination file compression scheme at runtime. By default set to None. Gzip is for csv and snappy for parquet. */
  compressionMode?: CompressionModeType;
  /** The export description set by customer at time of export creation/update. */
  exportDescription?: string;
  /** If the export has an active schedule, provides an estimate of the next run time. */
  readonly nextRunTimeEstimate?: Date;
  /** The export suspension reason if export is in SystemSuspended state. This is not populated currently. */
  readonly systemSuspensionContext?: ExportSuspensionContext;
}

export function commonExportPropertiesSerializer(item: CommonExportProperties): any {
  return {
    format: item["format"],
    deliveryInfo: exportDeliveryInfoSerializer(item["deliveryInfo"]),
    definition: exportDefinitionSerializer(item["definition"]),
    runHistory: !item["runHistory"]
      ? item["runHistory"]
      : exportExecutionListResultSerializer(item["runHistory"]),
    partitionData: item["partitionData"],
    dataOverwriteBehavior: item["dataOverwriteBehavior"],
    compressionMode: item["compressionMode"],
    exportDescription: item["exportDescription"],
  };
}

export function commonExportPropertiesDeserializer(item: any): CommonExportProperties {
  return {
    format: item["format"],
    deliveryInfo: exportDeliveryInfoDeserializer(item["deliveryInfo"]),
    definition: exportDefinitionDeserializer(item["definition"]),
    runHistory: !item["runHistory"]
      ? item["runHistory"]
      : exportExecutionListResultDeserializer(item["runHistory"]),
    partitionData: item["partitionData"],
    dataOverwriteBehavior: item["dataOverwriteBehavior"],
    compressionMode: item["compressionMode"],
    exportDescription: item["exportDescription"],
    nextRunTimeEstimate: !item["nextRunTimeEstimate"]
      ? item["nextRunTimeEstimate"]
      : new Date(item["nextRunTimeEstimate"]),
    systemSuspensionContext: !item["systemSuspensionContext"]
      ? item["systemSuspensionContext"]
      : exportSuspensionContextDeserializer(item["systemSuspensionContext"]),
  };
}

/** The format of the export being delivered. */
export enum KnownFormatType {
  /** Csv */
  Csv = "Csv",
  /** Parquet */
  Parquet = "Parquet",
}

/**
 * The format of the export being delivered. \
 * {@link KnownFormatType} can be used interchangeably with FormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Csv** \
 * **Parquet**
 */
export type FormatType = string;

/** The delivery information associated with a export. */
export interface ExportDeliveryInfo {
  /** Has destination for the export being delivered. */
  destination: ExportDeliveryDestination;
}

export function exportDeliveryInfoSerializer(item: ExportDeliveryInfo): any {
  return { destination: exportDeliveryDestinationSerializer(item["destination"]) };
}

export function exportDeliveryInfoDeserializer(item: any): ExportDeliveryInfo {
  return {
    destination: exportDeliveryDestinationDeserializer(item["destination"]),
  };
}

/** This represents the blob storage account location where exports of costs will be delivered. There are two ways to configure the destination. The approach recommended for most customers is to specify the resourceId of the storage account. This requires a one-time registration of the account's subscription with the Microsoft.CostManagementExports resource provider in order to give Cost Management services access to the storage. When creating an export in the Azure portal this registration is performed automatically but API users may need to register the subscription explicitly (for more information see https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-supported-services ). Another way to configure the destination is available ONLY to Partners with a Microsoft Partner Agreement plan who are global admins of their billing account. These Partners, instead of specifying the resourceId of a storage account, can specify the storage account name along with a SAS token for the account. This allows exports of costs to a storage account in any tenant. The SAS token should be created for the blob service with Service/Container/Object resource types and with Read/Write/Delete/List/Add/Create permissions (for more information see https://docs.microsoft.com/en-us/azure/cost-management-billing/costs/export-cost-data-storage-account-sas-key ). */
export interface ExportDeliveryDestination {
  /** The export delivery destination type. Currently only 'AzureBlob' is supported. */
  type?: DestinationType;
  /** The resource id of the storage account where exports will be delivered. This is not required if a sasToken and storageAccount are specified. */
  resourceId?: string;
  /** The name of the container where exports will be uploaded. If the container does not exist it will be created. */
  container: string;
  /** The name of the directory where exports will be uploaded. */
  rootFolderPath?: string;
  /** A SAS token for the storage account. For a restricted set of Azure customers this together with storageAccount can be specified instead of resourceId. Note: the value returned by the API for this property will always be obfuscated. Returning this same obfuscated value will not result in the SAS token being updated. To update this value a new SAS token must be specified. */
  sasToken?: string;
  /** The storage account where exports will be uploaded. For a restricted set of Azure customers this together with sasToken can be specified instead of resourceId. */
  storageAccount?: string;
}

export function exportDeliveryDestinationSerializer(item: ExportDeliveryDestination): any {
  return {
    type: item["type"],
    resourceId: item["resourceId"],
    container: item["container"],
    rootFolderPath: item["rootFolderPath"],
    sasToken: item["sasToken"],
    storageAccount: item["storageAccount"],
  };
}

export function exportDeliveryDestinationDeserializer(item: any): ExportDeliveryDestination {
  return {
    type: item["type"],
    resourceId: item["resourceId"],
    container: item["container"],
    rootFolderPath: item["rootFolderPath"],
    sasToken: item["sasToken"],
    storageAccount: item["storageAccount"],
  };
}

/** The export delivery destination type. Currently only 'AzureBlob' is supported. */
export enum KnownDestinationType {
  /** AzureBlob */
  AzureBlob = "AzureBlob",
}

/**
 * The export delivery destination type. Currently only 'AzureBlob' is supported. \
 * {@link KnownDestinationType} can be used interchangeably with DestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureBlob**
 */
export type DestinationType = string;

/** The definition of an export. */
export interface ExportDefinition {
  /** The type of the export. Note that 'Usage' is equivalent to 'ActualCost' and is applicable to exports that do not yet provide data for charges or amortization for service reservations. */
  type: ExportType;
  /** The time frame for pulling data for the export. If custom, then a specific time period must be provided. */
  timeframe: TimeframeType;
  /** Has time period for pulling data for the export. */
  timePeriod?: ExportTimePeriod;
  /** The definition for data in the export. */
  dataSet?: ExportDataset;
}

export function exportDefinitionSerializer(item: ExportDefinition): any {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : exportTimePeriodSerializer(item["timePeriod"]),
    dataSet: !item["dataSet"] ? item["dataSet"] : exportDatasetSerializer(item["dataSet"]),
  };
}

export function exportDefinitionDeserializer(item: any): ExportDefinition {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : exportTimePeriodDeserializer(item["timePeriod"]),
    dataSet: !item["dataSet"] ? item["dataSet"] : exportDatasetDeserializer(item["dataSet"]),
  };
}

/** The type of the export. Note that 'Usage' is equivalent to 'ActualCost' and is applicable to exports that do not yet provide data for charges or amortization for service reservations. */
export enum KnownExportType {
  /** Usage */
  Usage = "Usage",
  /** ActualCost */
  ActualCost = "ActualCost",
  /** AmortizedCost */
  AmortizedCost = "AmortizedCost",
  /** FocusCost */
  FocusCost = "FocusCost",
  /** PriceSheet */
  PriceSheet = "PriceSheet",
  /** ReservationTransactions */
  ReservationTransactions = "ReservationTransactions",
  /** ReservationRecommendations */
  ReservationRecommendations = "ReservationRecommendations",
  /** ReservationDetails */
  ReservationDetails = "ReservationDetails",
}

/**
 * The type of the export. Note that 'Usage' is equivalent to 'ActualCost' and is applicable to exports that do not yet provide data for charges or amortization for service reservations. \
 * {@link KnownExportType} can be used interchangeably with ExportType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Usage** \
 * **ActualCost** \
 * **AmortizedCost** \
 * **FocusCost** \
 * **PriceSheet** \
 * **ReservationTransactions** \
 * **ReservationRecommendations** \
 * **ReservationDetails**
 */
export type ExportType = string;

/** The time frame for pulling data for the export. If custom, then a specific time period must be provided. */
export enum KnownTimeframeType {
  /** MonthToDate */
  MonthToDate = "MonthToDate",
  /** BillingMonthToDate */
  BillingMonthToDate = "BillingMonthToDate",
  /** TheLastMonth */
  TheLastMonth = "TheLastMonth",
  /** TheLastBillingMonth */
  TheLastBillingMonth = "TheLastBillingMonth",
  /** WeekToDate */
  WeekToDate = "WeekToDate",
  /** Custom */
  Custom = "Custom",
  /** TheCurrentMonth */
  TheCurrentMonth = "TheCurrentMonth",
}

/**
 * The time frame for pulling data for the export. If custom, then a specific time period must be provided. \
 * {@link KnownTimeframeType} can be used interchangeably with TimeframeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MonthToDate** \
 * **BillingMonthToDate** \
 * **TheLastMonth** \
 * **TheLastBillingMonth** \
 * **WeekToDate** \
 * **Custom** \
 * **TheCurrentMonth**
 */
export type TimeframeType = string;

/** The date range for data in the export. This should only be specified with timeFrame set to 'Custom'. The maximum date range is 1 calendar month. */
export interface ExportTimePeriod {
  /** The start date for export data. */
  from: Date;
  /** The end date for export data. */
  to: Date;
}

export function exportTimePeriodSerializer(item: ExportTimePeriod): any {
  return { from: item["from"].toISOString(), to: item["to"].toISOString() };
}

export function exportTimePeriodDeserializer(item: any): ExportTimePeriod {
  return {
    from: new Date(item["from"]),
    to: new Date(item["to"]),
  };
}

/** The definition for data in the export. */
export interface ExportDataset {
  /** The granularity of rows in the export. Currently 'Daily' is supported for most cases. */
  granularity?: GranularityType;
  /** The export dataset configuration. */
  configuration?: ExportDatasetConfiguration;
}

export function exportDatasetSerializer(item: ExportDataset): any {
  return {
    granularity: item["granularity"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : exportDatasetConfigurationSerializer(item["configuration"]),
  };
}

export function exportDatasetDeserializer(item: any): ExportDataset {
  return {
    granularity: item["granularity"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : exportDatasetConfigurationDeserializer(item["configuration"]),
  };
}

/** The granularity of rows in the export. Currently 'Daily' is supported for most cases. */
export enum KnownGranularityType {
  /** Daily */
  Daily = "Daily",
  /** Monthly */
  Monthly = "Monthly",
}

/**
 * The granularity of rows in the export. Currently 'Daily' is supported for most cases. \
 * {@link KnownGranularityType} can be used interchangeably with GranularityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily** \
 * **Monthly**
 */
export type GranularityType = string;

/** This is on path to deprecation and will not be supported going forward. */
export interface ExportDatasetConfiguration {
  /** Array of column names to be included in the export. If not provided then the export will include all available columns. The available columns can vary by customer channel (see examples). */
  columns?: string[];
  /** The data version for the selected for the export. If not provided then the export will default to latest data version. */
  dataVersion?: string;
  /** Filters associated with the data sets. */
  filters?: FilterItems[];
}

export function exportDatasetConfigurationSerializer(item: ExportDatasetConfiguration): any {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : item["columns"].map((p: any) => {
          return p;
        }),
    dataVersion: item["dataVersion"],
    filters: !item["filters"] ? item["filters"] : filterItemsArraySerializer(item["filters"]),
  };
}

export function exportDatasetConfigurationDeserializer(item: any): ExportDatasetConfiguration {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : item["columns"].map((p: any) => {
          return p;
        }),
    dataVersion: item["dataVersion"],
    filters: !item["filters"] ? item["filters"] : filterItemsArrayDeserializer(item["filters"]),
  };
}

export function filterItemsArraySerializer(result: Array<FilterItems>): any[] {
  return result.map((item) => {
    return filterItemsSerializer(item);
  });
}

export function filterItemsArrayDeserializer(result: Array<FilterItems>): any[] {
  return result.map((item) => {
    return filterItemsDeserializer(item);
  });
}

/** Will contain the filter name and value to operate on. This is currently only supported for Export Definition type of ReservationRecommendations. */
export interface FilterItems {
  /** The name of the filter. This is currently only supported for Export Definition type of ReservationRecommendations. Supported names are ['ReservationScope', 'LookBackPeriod', 'ResourceType'] */
  name?: FilterItemNames;
  /** Value to filter by. Currently values supported per name are, for 'ReservationScope' supported values are ['Single', 'Shared'], for 'LookBackPeriod' supported values are ['Last7Days', 'Last30Days', 'Last60Days'] and for 'ResourceType' supported values are ['VirtualMachines', 'SQLDatabases', 'PostgreSQL', 'ManagedDisk', 'MySQL', 'RedHat', 'MariaDB', 'RedisCache', 'CosmosDB', 'SqlDataWarehouse', 'SUSELinux', 'AppService', 'BlockBlob', 'AzureDataExplorer', 'VMwareCloudSimple']. */
  value?: string;
}

export function filterItemsSerializer(item: FilterItems): any {
  return { name: item["name"], value: item["value"] };
}

export function filterItemsDeserializer(item: any): FilterItems {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The name of the filter. This is currently only supported for Export Definition type of ReservationRecommendations. Supported names are ['ReservationScope', 'LookBackPeriod', 'ResourceType'] */
export enum KnownFilterItemNames {
  /** ReservationScope */
  ReservationScope = "ReservationScope",
  /** ResourceType */
  ResourceType = "ResourceType",
  /** LookBackPeriod */
  LookBackPeriod = "LookBackPeriod",
}

/**
 * The name of the filter. This is currently only supported for Export Definition type of ReservationRecommendations. Supported names are ['ReservationScope', 'LookBackPeriod', 'ResourceType'] \
 * {@link KnownFilterItemNames} can be used interchangeably with FilterItemNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReservationScope** \
 * **ResourceType** \
 * **LookBackPeriod**
 */
export type FilterItemNames = string;

/** Result of listing the run history of an export. */
export interface ExportExecutionListResult {
  /** A list of export runs. */
  readonly value?: ExportRun[];
}

export function exportExecutionListResultSerializer(_item: ExportExecutionListResult): any {
  return {};
}

export function exportExecutionListResultDeserializer(item: any): ExportExecutionListResult {
  return {
    value: !item["value"] ? item["value"] : exportRunArrayDeserializer(item["value"]),
  };
}

export function exportRunArrayDeserializer(result: Array<ExportRun>): any[] {
  return result.map((item) => {
    return exportRunDeserializer(item);
  });
}

/** An export run. */
export interface ExportRun extends CostManagementProxyResource {
  /** The type of the export run. */
  executionType?: ExecutionType;
  /** The last known status of the export run. */
  status?: ExecutionStatus;
  /** The identifier for the entity that triggered the export. For on-demand runs it is the user email. For scheduled runs it is 'System'. */
  submittedBy?: string;
  /** The time when export was queued to be run. */
  submittedTime?: Date;
  /** The time when export was picked up to be run. */
  processingStartTime?: Date;
  /** The time when the export run finished. */
  processingEndTime?: Date;
  /** The start datetime for the export. */
  startDate?: Date;
  /** The end datetime for the export. */
  endDate?: Date;
  /** The name of the exported file. */
  fileName?: string;
  /** The manifest file location(URI location) for the exported files. */
  manifestFile?: string;
  /** The export settings that were in effect for this run. */
  runSettings?: CommonExportProperties;
  /** The details of any error. */
  error?: ErrorDetails;
}

export function exportRunDeserializer(item: any): ExportRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    eTag: item["eTag"],
    ...(!item["properties"]
      ? item["properties"]
      : _exportRunPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of the export run. */
export interface ExportRunProperties {
  /** The type of the export run. */
  executionType?: ExecutionType;
  /** The last known status of the export run. */
  status?: ExecutionStatus;
  /** The identifier for the entity that triggered the export. For on-demand runs it is the user email. For scheduled runs it is 'System'. */
  submittedBy?: string;
  /** The time when export was queued to be run. */
  submittedTime?: Date;
  /** The time when export was picked up to be run. */
  processingStartTime?: Date;
  /** The time when the export run finished. */
  processingEndTime?: Date;
  /** The start datetime for the export. */
  startDate?: Date;
  /** The end datetime for the export. */
  endDate?: Date;
  /** The name of the exported file. */
  fileName?: string;
  /** The manifest file location(URI location) for the exported files. */
  manifestFile?: string;
  /** The export settings that were in effect for this run. */
  runSettings?: CommonExportProperties;
  /** The details of any error. */
  error?: ErrorDetails;
}

export function exportRunPropertiesDeserializer(item: any): ExportRunProperties {
  return {
    executionType: item["executionType"],
    status: item["status"],
    submittedBy: item["submittedBy"],
    submittedTime: !item["submittedTime"] ? item["submittedTime"] : new Date(item["submittedTime"]),
    processingStartTime: !item["processingStartTime"]
      ? item["processingStartTime"]
      : new Date(item["processingStartTime"]),
    processingEndTime: !item["processingEndTime"]
      ? item["processingEndTime"]
      : new Date(item["processingEndTime"]),
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    fileName: item["fileName"],
    manifestFile: item["manifestFile"],
    runSettings: !item["runSettings"]
      ? item["runSettings"]
      : commonExportPropertiesDeserializer(item["runSettings"]),
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

/** The type of the export run. */
export enum KnownExecutionType {
  /** OnDemand */
  OnDemand = "OnDemand",
  /** Scheduled */
  Scheduled = "Scheduled",
}

/**
 * The type of the export run. \
 * {@link KnownExecutionType} can be used interchangeably with ExecutionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnDemand** \
 * **Scheduled**
 */
export type ExecutionType = string;

/** The last known status of the export run. */
export enum KnownExecutionStatus {
  /** Queued */
  Queued = "Queued",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Timeout */
  Timeout = "Timeout",
  /** NewDataNotAvailable */
  NewDataNotAvailable = "NewDataNotAvailable",
  /** DataNotAvailable */
  DataNotAvailable = "DataNotAvailable",
}

/**
 * The last known status of the export run. \
 * {@link KnownExecutionStatus} can be used interchangeably with ExecutionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queued** \
 * **InProgress** \
 * **Completed** \
 * **Failed** \
 * **Timeout** \
 * **NewDataNotAvailable** \
 * **DataNotAvailable**
 */
export type ExecutionStatus = string;

/** Allow customers to select overwrite data(OverwritePreviousReport) for exports. This setting will enable overwrite data for the same month in customer storage account. By default set to CreateNewReport. */
export enum KnownDataOverwriteBehaviorType {
  /** OverwritePreviousReport */
  OverwritePreviousReport = "OverwritePreviousReport",
  /** CreateNewReport */
  CreateNewReport = "CreateNewReport",
}

/**
 * Allow customers to select overwrite data(OverwritePreviousReport) for exports. This setting will enable overwrite data for the same month in customer storage account. By default set to CreateNewReport. \
 * {@link KnownDataOverwriteBehaviorType} can be used interchangeably with DataOverwriteBehaviorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OverwritePreviousReport** \
 * **CreateNewReport**
 */
export type DataOverwriteBehaviorType = string;

/** Allow customers to select compress data for exports. This setting will enable destination file compression scheme at runtime. By default set to None. Gzip is for csv and snappy for parquet. */
export enum KnownCompressionModeType {
  /** gzip */
  Gzip = "gzip",
  /** snappy */
  Snappy = "snappy",
  /** none */
  None = "none",
}

/**
 * Allow customers to select compress data for exports. This setting will enable destination file compression scheme at runtime. By default set to None. Gzip is for csv and snappy for parquet. \
 * {@link KnownCompressionModeType} can be used interchangeably with CompressionModeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **gzip** \
 * **snappy** \
 * **none**
 */
export type CompressionModeType = string;

/** The properties of the export run. This is not populated currently. */
export interface ExportSuspensionContext {
  /** The code for export suspension. */
  suspensionCode?: string;
  /** The detailed reason for export suspension. */
  suspensionReason?: string;
  /** The time when the export was suspended. */
  suspensionTime?: Date;
}

export function exportSuspensionContextDeserializer(item: any): ExportSuspensionContext {
  return {
    suspensionCode: item["suspensionCode"],
    suspensionReason: item["suspensionReason"],
    suspensionTime: !item["suspensionTime"]
      ? item["suspensionTime"]
      : new Date(item["suspensionTime"]),
  };
}

/** The Resource model definition. */
export interface CostManagementProxyResource {
  /** Resource Id. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
}

export function costManagementProxyResourceDeserializer(item: any): CostManagementProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    eTag: item["eTag"],
  };
}

/** Result of listing exports. It contains a list of available exports in the scope provided. */
export interface ExportListResult {
  /** The list of exports. */
  readonly value?: Export[];
}

export function exportListResultDeserializer(item: any): ExportListResult {
  return {
    value: !item["value"] ? item["value"] : exportArrayDeserializer(item["value"]),
  };
}

export function exportArraySerializer(result: Array<Export>): any[] {
  return result.map((item) => {
    return exportSerializer(item);
  });
}

export function exportArrayDeserializer(result: Array<Export>): any[] {
  return result.map((item) => {
    return exportDeserializer(item);
  });
}

/** The export run request. */
export interface ExportRunRequest {
  /** Has time period for pulling data for the export. */
  timePeriod?: ExportTimePeriod;
}

export function exportRunRequestSerializer(item: ExportRunRequest): any {
  return {
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : exportTimePeriodSerializer(item["timePeriod"]),
  };
}

/** The result of the long running operation for cost detailed report. */
export interface GenerateDetailedCostReportOperationResult extends ExtensionResource {
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  readonly expiryTime?: Date;
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  validTill?: Date;
  /** The URL to download the generated report. */
  downloadUrl?: string;
}

export function generateDetailedCostReportOperationResultDeserializer(
  item: any,
): GenerateDetailedCostReportOperationResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _generateDetailedCostReportOperationResultPropertiesDeserializer(item["properties"])),
  };
}

/** States and configurations of Cost Analysis. */
export interface View extends ProxyResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /** User input name of the view. Required. */
  displayName?: string;
  /** Cost Management scope to save the view on. This includes 'subscriptions/{subscriptionId}' for subscription scope, 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for BillingProfile scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/invoiceSections/{invoiceSectionId}' for InvoiceSection scope, 'providers/Microsoft.Management/managementGroups/{managementGroupId}' for Management Group scope, '/providers/Microsoft.CostManagement/externalBillingAccounts/{externalBillingAccountName}' for ExternalBillingAccount scope, and '/providers/Microsoft.CostManagement/externalSubscriptions/{externalSubscriptionName}' for ExternalSubscription scope. */
  scope?: string;
  /** Date the user created this view. */
  readonly createdOn?: Date;
  /** Date when the user last modified this view. */
  modifiedOn?: Date;
  /** Date range of the current view. */
  dateRange?: string;
  /** Currency of the current view. */
  readonly currency?: string;
  /** Query body configuration. Required. */
  query?: ReportConfigDefinition;
  /** Chart type of the main view in Cost Analysis. Required. */
  chart?: ChartType;
  /** Show costs accumulated over time. */
  accumulated?: AccumulatedType;
  /** Metric to use when displaying costs. */
  metric?: MetricType;
  /** List of KPIs to show in Cost Analysis UI. */
  kpis?: KpiProperties[];
  /** Configuration of 3 sub-views in the Cost Analysis UI. */
  pivots?: PivotProperties[];
}

export function viewSerializer(item: View): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "scope",
      "modifiedOn",
      "dateRange",
      "query",
      "chart",
      "accumulated",
      "metric",
      "kpis",
      "pivots",
    ])
      ? undefined
      : _viewPropertiesSerializer(item),
    eTag: item["eTag"],
  };
}

export function viewDeserializer(item: any): View {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _viewPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** The properties of the view. */
export interface ViewProperties {
  /** User input name of the view. Required. */
  displayName?: string;
  /** Cost Management scope to save the view on. This includes 'subscriptions/{subscriptionId}' for subscription scope, 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for BillingProfile scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/invoiceSections/{invoiceSectionId}' for InvoiceSection scope, 'providers/Microsoft.Management/managementGroups/{managementGroupId}' for Management Group scope, '/providers/Microsoft.CostManagement/externalBillingAccounts/{externalBillingAccountName}' for ExternalBillingAccount scope, and '/providers/Microsoft.CostManagement/externalSubscriptions/{externalSubscriptionName}' for ExternalSubscription scope. */
  scope?: string;
  /** Date the user created this view. */
  readonly createdOn?: Date;
  /** Date when the user last modified this view. */
  modifiedOn?: Date;
  /** Date range of the current view. */
  dateRange?: string;
  /** Currency of the current view. */
  readonly currency?: string;
  /** Chart type of the main view in Cost Analysis. Required. */
  chart?: ChartType;
  /** Show costs accumulated over time. */
  accumulated?: AccumulatedType;
  /** Metric to use when displaying costs. */
  metric?: MetricType;
  /** List of KPIs to show in Cost Analysis UI. */
  kpis?: KpiProperties[];
  /** Configuration of 3 sub-views in the Cost Analysis UI. */
  pivots?: PivotProperties[];
  /** The type of the report. Usage represents actual usage, forecast represents forecasted data and UsageAndForecast represents both usage and forecasted data. Actual usage and forecasted data can be differentiated based on dates. */
  type?: ReportType;
  /** The time frame for pulling data for the report. If custom, then a specific time period must be provided. */
  timeframe?: ReportTimeframeType;
  /** Has time period for pulling data for the report. */
  timePeriod?: ReportConfigTimePeriod;
  /** Has definition for data in this report config. */
  dataSet?: ReportConfigDataset;
  /** If true, report includes monetary commitment. */
  includeMonetaryCommitment?: boolean;
}

export function viewPropertiesSerializer(item: ViewProperties): any {
  return {
    displayName: item["displayName"],
    scope: item["scope"],
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : item["modifiedOn"].toISOString(),
    dateRange: item["dateRange"],
    query: areAllPropsUndefined(item, [
      "type",
      "timeframe",
      "timePeriod",
      "dataSet",
      "includeMonetaryCommitment",
    ])
      ? undefined
      : _viewPropertiesQuerySerializer(item),
    chart: item["chart"],
    accumulated: item["accumulated"],
    metric: item["metric"],
    kpis: !item["kpis"] ? item["kpis"] : kpiPropertiesArraySerializer(item["kpis"]),
    pivots: !item["pivots"] ? item["pivots"] : pivotPropertiesArraySerializer(item["pivots"]),
  };
}

export function viewPropertiesDeserializer(item: any): ViewProperties {
  return {
    displayName: item["displayName"],
    scope: item["scope"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    dateRange: item["dateRange"],
    currency: item["currency"],
    ...(!item["query"] ? item["query"] : _viewPropertiesQueryDeserializer(item["query"])),
    chart: item["chart"],
    accumulated: item["accumulated"],
    metric: item["metric"],
    kpis: !item["kpis"] ? item["kpis"] : kpiPropertiesArrayDeserializer(item["kpis"]),
    pivots: !item["pivots"] ? item["pivots"] : pivotPropertiesArrayDeserializer(item["pivots"]),
  };
}

/** The definition of a report config. */
export interface ReportConfigDefinition {
  /** The type of the report. Usage represents actual usage, forecast represents forecasted data and UsageAndForecast represents both usage and forecasted data. Actual usage and forecasted data can be differentiated based on dates. */
  type: ReportType;
  /** The time frame for pulling data for the report. If custom, then a specific time period must be provided. */
  timeframe: ReportTimeframeType;
  /** Has time period for pulling data for the report. */
  timePeriod?: ReportConfigTimePeriod;
  /** Has definition for data in this report config. */
  dataSet?: ReportConfigDataset;
  /** If true, report includes monetary commitment. */
  includeMonetaryCommitment?: boolean;
}

export function reportConfigDefinitionSerializer(item: ReportConfigDefinition): any {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : reportConfigTimePeriodSerializer(item["timePeriod"]),
    dataSet: !item["dataSet"] ? item["dataSet"] : reportConfigDatasetSerializer(item["dataSet"]),
    includeMonetaryCommitment: item["includeMonetaryCommitment"],
  };
}

export function reportConfigDefinitionDeserializer(item: any): ReportConfigDefinition {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : reportConfigTimePeriodDeserializer(item["timePeriod"]),
    dataSet: !item["dataSet"] ? item["dataSet"] : reportConfigDatasetDeserializer(item["dataSet"]),
    includeMonetaryCommitment: item["includeMonetaryCommitment"],
  };
}

/** The type of the report. Usage represents actual usage, forecast represents forecasted data and UsageAndForecast represents both usage and forecasted data. Actual usage and forecasted data can be differentiated based on dates. */
export enum KnownReportType {
  /** Usage */
  Usage = "Usage",
}

/**
 * The type of the report. Usage represents actual usage, forecast represents forecasted data and UsageAndForecast represents both usage and forecasted data. Actual usage and forecasted data can be differentiated based on dates. \
 * {@link KnownReportType} can be used interchangeably with ReportType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Usage**
 */
export type ReportType = string;

/** The time frame for pulling data for the report. If custom, then a specific time period must be provided. */
export enum KnownReportTimeframeType {
  /** WeekToDate */
  WeekToDate = "WeekToDate",
  /** MonthToDate */
  MonthToDate = "MonthToDate",
  /** YearToDate */
  YearToDate = "YearToDate",
  /** Custom */
  Custom = "Custom",
}

/**
 * The time frame for pulling data for the report. If custom, then a specific time period must be provided. \
 * {@link KnownReportTimeframeType} can be used interchangeably with ReportTimeframeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WeekToDate** \
 * **MonthToDate** \
 * **YearToDate** \
 * **Custom**
 */
export type ReportTimeframeType = string;

/** The start and end date for pulling data for the report. */
export interface ReportConfigTimePeriod {
  /** The start date to pull data from. */
  from: Date;
  /** The end date to pull data to. */
  to: Date;
}

export function reportConfigTimePeriodSerializer(item: ReportConfigTimePeriod): any {
  return { from: item["from"].toISOString(), to: item["to"].toISOString() };
}

export function reportConfigTimePeriodDeserializer(item: any): ReportConfigTimePeriod {
  return {
    from: new Date(item["from"]),
    to: new Date(item["to"]),
  };
}

/** The definition of data present in the report. */
export interface ReportConfigDataset {
  /** The granularity of rows in the report. */
  granularity?: ReportGranularityType;
  /** Has configuration information for the data in the report. The configuration will be ignored if aggregation and grouping are provided. */
  configuration?: ReportConfigDatasetConfiguration;
  /** Dictionary of aggregation expression to use in the report. The key of each item in the dictionary is the alias for the aggregated column. Report can have up to 2 aggregation clauses. */
  aggregation?: Record<string, ReportConfigAggregation>;
  /** Array of group by expression to use in the report. Report can have up to 2 group by clauses. */
  grouping?: ReportConfigGrouping[];
  /** Array of order by expression to use in the report. */
  sorting?: ReportConfigSorting[];
  /** Has filter expression to use in the report. */
  filter?: ReportConfigFilter;
}

export function reportConfigDatasetSerializer(item: ReportConfigDataset): any {
  return {
    granularity: item["granularity"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : reportConfigDatasetConfigurationSerializer(item["configuration"]),
    aggregation: !item["aggregation"]
      ? item["aggregation"]
      : reportConfigAggregationRecordSerializer(item["aggregation"]),
    grouping: !item["grouping"]
      ? item["grouping"]
      : reportConfigGroupingArraySerializer(item["grouping"]),
    sorting: !item["sorting"]
      ? item["sorting"]
      : reportConfigSortingArraySerializer(item["sorting"]),
    filter: !item["filter"] ? item["filter"] : reportConfigFilterSerializer(item["filter"]),
  };
}

export function reportConfigDatasetDeserializer(item: any): ReportConfigDataset {
  return {
    granularity: item["granularity"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : reportConfigDatasetConfigurationDeserializer(item["configuration"]),
    aggregation: !item["aggregation"]
      ? item["aggregation"]
      : reportConfigAggregationRecordDeserializer(item["aggregation"]),
    grouping: !item["grouping"]
      ? item["grouping"]
      : reportConfigGroupingArrayDeserializer(item["grouping"]),
    sorting: !item["sorting"]
      ? item["sorting"]
      : reportConfigSortingArrayDeserializer(item["sorting"]),
    filter: !item["filter"] ? item["filter"] : reportConfigFilterDeserializer(item["filter"]),
  };
}

/** The granularity of rows in the report. */
export enum KnownReportGranularityType {
  /** Daily */
  Daily = "Daily",
  /** Monthly */
  Monthly = "Monthly",
}

/**
 * The granularity of rows in the report. \
 * {@link KnownReportGranularityType} can be used interchangeably with ReportGranularityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily** \
 * **Monthly**
 */
export type ReportGranularityType = string;

/** The configuration of dataset in the report. */
export interface ReportConfigDatasetConfiguration {
  /** Array of column names to be included in the report. Any valid report column name is allowed. If not provided, then report includes all columns. */
  columns?: string[];
}

export function reportConfigDatasetConfigurationSerializer(
  item: ReportConfigDatasetConfiguration,
): any {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : item["columns"].map((p: any) => {
          return p;
        }),
  };
}

export function reportConfigDatasetConfigurationDeserializer(
  item: any,
): ReportConfigDatasetConfiguration {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : item["columns"].map((p: any) => {
          return p;
        }),
  };
}

export function reportConfigAggregationRecordSerializer(
  item: Record<string, ReportConfigAggregation>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : reportConfigAggregationSerializer(item[key]);
  });
  return result;
}

export function reportConfigAggregationRecordDeserializer(
  item: Record<string, any>,
): Record<string, ReportConfigAggregation> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : reportConfigAggregationDeserializer(item[key]);
  });
  return result;
}

/** The aggregation expression to be used in the report. */
export interface ReportConfigAggregation {
  /** The name of the column to aggregate. */
  name: string;
  /** The name of the aggregation function to use. */
  function: FunctionType;
}

export function reportConfigAggregationSerializer(item: ReportConfigAggregation): any {
  return { name: item["name"], function: item["function"] };
}

export function reportConfigAggregationDeserializer(item: any): ReportConfigAggregation {
  return {
    name: item["name"],
    function: item["function"],
  };
}

/** The name of the aggregation function to use. */
export enum KnownFunctionType {
  /** Sum */
  Sum = "Sum",
}

/**
 * The name of the aggregation function to use. \
 * {@link KnownFunctionType} can be used interchangeably with FunctionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sum**
 */
export type FunctionType = string;

export function reportConfigGroupingArraySerializer(result: Array<ReportConfigGrouping>): any[] {
  return result.map((item) => {
    return reportConfigGroupingSerializer(item);
  });
}

export function reportConfigGroupingArrayDeserializer(result: Array<ReportConfigGrouping>): any[] {
  return result.map((item) => {
    return reportConfigGroupingDeserializer(item);
  });
}

/** The group by expression to be used in the report. */
export interface ReportConfigGrouping {
  /** Has type of the column to group. */
  type: QueryColumnType;
  /** The name of the column to group. This version supports subscription lowest possible grain. */
  name: string;
}

export function reportConfigGroupingSerializer(item: ReportConfigGrouping): any {
  return { type: item["type"], name: item["name"] };
}

export function reportConfigGroupingDeserializer(item: any): ReportConfigGrouping {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** The type of the column in the report. */
export enum KnownQueryColumnType {
  /** The tag associated with the cost data. */
  TagKey = "TagKey",
  /** The dimension of cost data. */
  Dimension = "Dimension",
}

/**
 * The type of the column in the report. \
 * {@link KnownQueryColumnType} can be used interchangeably with QueryColumnType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TagKey**: The tag associated with the cost data. \
 * **Dimension**: The dimension of cost data.
 */
export type QueryColumnType = string;

export function reportConfigSortingArraySerializer(result: Array<ReportConfigSorting>): any[] {
  return result.map((item) => {
    return reportConfigSortingSerializer(item);
  });
}

export function reportConfigSortingArrayDeserializer(result: Array<ReportConfigSorting>): any[] {
  return result.map((item) => {
    return reportConfigSortingDeserializer(item);
  });
}

/** The order by expression to be used in the report. */
export interface ReportConfigSorting {
  /** Direction of sort. */
  direction?: ReportConfigSortingType;
  /** The name of the column to sort. */
  name: string;
}

export function reportConfigSortingSerializer(item: ReportConfigSorting): any {
  return { direction: item["direction"], name: item["name"] };
}

export function reportConfigSortingDeserializer(item: any): ReportConfigSorting {
  return {
    direction: item["direction"],
    name: item["name"],
  };
}

/** Direction of sort. */
export enum KnownReportConfigSortingType {
  /** Ascending */
  Ascending = "Ascending",
  /** Descending */
  Descending = "Descending",
}

/**
 * Direction of sort. \
 * {@link KnownReportConfigSortingType} can be used interchangeably with ReportConfigSortingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ascending** \
 * **Descending**
 */
export type ReportConfigSortingType = string;

/** The filter expression to be used in the report. */
export interface ReportConfigFilter {
  /** The logical "AND" expression. Must have at least 2 items. */
  and?: ReportConfigFilter[];
  /** The logical "OR" expression. Must have at least 2 items. */
  or?: ReportConfigFilter[];
  /** Has comparison expression for a dimension */
  dimensions?: ReportConfigComparisonExpression;
  /** Has comparison expression for a tag */
  tags?: ReportConfigComparisonExpression;
}

export function reportConfigFilterSerializer(item: ReportConfigFilter): any {
  return {
    and: !item["and"] ? item["and"] : reportConfigFilterArraySerializer(item["and"]),
    or: !item["or"] ? item["or"] : reportConfigFilterArraySerializer(item["or"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : reportConfigComparisonExpressionSerializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : reportConfigComparisonExpressionSerializer(item["tags"]),
  };
}

export function reportConfigFilterDeserializer(item: any): ReportConfigFilter {
  return {
    and: !item["and"] ? item["and"] : reportConfigFilterArrayDeserializer(item["and"]),
    or: !item["or"] ? item["or"] : reportConfigFilterArrayDeserializer(item["or"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : reportConfigComparisonExpressionDeserializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : reportConfigComparisonExpressionDeserializer(item["tags"]),
  };
}

export function reportConfigFilterArraySerializer(result: Array<ReportConfigFilter>): any[] {
  return result.map((item) => {
    return reportConfigFilterSerializer(item);
  });
}

export function reportConfigFilterArrayDeserializer(result: Array<ReportConfigFilter>): any[] {
  return result.map((item) => {
    return reportConfigFilterDeserializer(item);
  });
}

/** The comparison expression to be used in the report. */
export interface ReportConfigComparisonExpression {
  /** The name of the column to use in comparison. */
  name: string;
  /** The operator to use for comparison. */
  operator: OperatorType;
  /** Array of values to use for comparison */
  values: string[];
}

export function reportConfigComparisonExpressionSerializer(
  item: ReportConfigComparisonExpression,
): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function reportConfigComparisonExpressionDeserializer(
  item: any,
): ReportConfigComparisonExpression {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** The operator to use for comparison. */
export enum KnownOperatorType {
  /** In */
  In = "In",
  /** Contains */
  Contains = "Contains",
}

/**
 * The operator to use for comparison. \
 * {@link KnownOperatorType} can be used interchangeably with OperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In** \
 * **Contains**
 */
export type OperatorType = string;

/** Chart type of the main view in Cost Analysis. Required. */
export enum KnownChartType {
  /** Area */
  Area = "Area",
  /** Line */
  Line = "Line",
  /** StackedColumn */
  StackedColumn = "StackedColumn",
  /** GroupedColumn */
  GroupedColumn = "GroupedColumn",
  /** Table */
  Table = "Table",
}

/**
 * Chart type of the main view in Cost Analysis. Required. \
 * {@link KnownChartType} can be used interchangeably with ChartType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Area** \
 * **Line** \
 * **StackedColumn** \
 * **GroupedColumn** \
 * **Table**
 */
export type ChartType = string;

/** Show costs accumulated over time. */
export enum KnownAccumulatedType {
  /** true */
  True = "true",
  /** false */
  False = "false",
}

/**
 * Show costs accumulated over time. \
 * {@link KnownAccumulatedType} can be used interchangeably with AccumulatedType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **true** \
 * **false**
 */
export type AccumulatedType = string;

/** Metric to use when displaying costs. */
export enum KnownMetricType {
  /** ActualCost */
  ActualCost = "ActualCost",
  /** AmortizedCost */
  AmortizedCost = "AmortizedCost",
  /** AHUB */
  Ahub = "AHUB",
}

/**
 * Metric to use when displaying costs. \
 * {@link KnownMetricType} can be used interchangeably with MetricType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActualCost** \
 * **AmortizedCost** \
 * **AHUB**
 */
export type MetricType = string;

export function kpiPropertiesArraySerializer(result: Array<KpiProperties>): any[] {
  return result.map((item) => {
    return kpiPropertiesSerializer(item);
  });
}

export function kpiPropertiesArrayDeserializer(result: Array<KpiProperties>): any[] {
  return result.map((item) => {
    return kpiPropertiesDeserializer(item);
  });
}

/** Each KPI must contain a 'type' and 'enabled' key. */
export interface KpiProperties {
  /** KPI type (Forecast, Budget). */
  type?: KpiType;
  /** ID of resource related to metric (budget). */
  id?: string;
  /** show the KPI in the UI? */
  enabled?: boolean;
}

export function kpiPropertiesSerializer(item: KpiProperties): any {
  return { type: item["type"], id: item["id"], enabled: item["enabled"] };
}

export function kpiPropertiesDeserializer(item: any): KpiProperties {
  return {
    type: item["type"],
    id: item["id"],
    enabled: item["enabled"],
  };
}

/** KPI type (Forecast, Budget). */
export enum KnownKpiType {
  /** Forecast */
  Forecast = "Forecast",
  /** Budget */
  Budget = "Budget",
}

/**
 * KPI type (Forecast, Budget). \
 * {@link KnownKpiType} can be used interchangeably with KpiType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Forecast** \
 * **Budget**
 */
export type KpiType = string;

export function pivotPropertiesArraySerializer(result: Array<PivotProperties>): any[] {
  return result.map((item) => {
    return pivotPropertiesSerializer(item);
  });
}

export function pivotPropertiesArrayDeserializer(result: Array<PivotProperties>): any[] {
  return result.map((item) => {
    return pivotPropertiesDeserializer(item);
  });
}

/** Each pivot must contain a 'type' and 'name'. */
export interface PivotProperties {
  /** Data type to show in view. */
  type?: PivotType;
  /** Data field to show in view. */
  name?: string;
}

export function pivotPropertiesSerializer(item: PivotProperties): any {
  return { type: item["type"], name: item["name"] };
}

export function pivotPropertiesDeserializer(item: any): PivotProperties {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Data type to show in view. */
export enum KnownPivotType {
  /** Dimension */
  Dimension = "Dimension",
  /** TagKey */
  TagKey = "TagKey",
}

/**
 * Data type to show in view. \
 * {@link KnownPivotType} can be used interchangeably with PivotType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dimension** \
 * **TagKey**
 */
export type PivotType = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Result of listing views. It contains a list of available views. */
export interface _ViewListResult {
  /** The list of views. */
  readonly value?: View[];
  /** The link (url) to the next page of results. */
  nextLink?: string;
}

export function _viewListResultDeserializer(item: any): _ViewListResult {
  return {
    value: !item["value"] ? item["value"] : viewArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function viewArraySerializer(result: Array<View>): any[] {
  return result.map((item) => {
    return viewSerializer(item);
  });
}

export function viewArrayDeserializer(result: Array<View>): any[] {
  return result.map((item) => {
    return viewDeserializer(item);
  });
}

/** An individual alert. */
export interface Alert extends ExtensionResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /** defines the type of alert */
  definition?: AlertPropertiesDefinition;
  /** Alert description */
  description?: string;
  /** Source of alert */
  source?: AlertSource;
  /** Alert details */
  details?: AlertPropertiesDetails;
  /** related budget */
  costEntityId?: string;
  /** alert status */
  status?: AlertStatus;
  /** dateTime in which alert was created */
  creationTime?: string;
  /** dateTime in which alert was closed */
  closeTime?: string;
  /** dateTime in which alert was last modified */
  modificationTime?: string;
  /** User who last modified the alert */
  statusModificationUserName?: string;
  /** dateTime in which the alert status was last modified */
  statusModificationTime?: string;
}

export function alertDeserializer(item: any): Alert {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _alertPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** Alert properties. */
export interface AlertProperties {
  /** defines the type of alert */
  definition?: AlertPropertiesDefinition;
  /** Alert description */
  description?: string;
  /** Source of alert */
  source?: AlertSource;
  /** Alert details */
  details?: AlertPropertiesDetails;
  /** related budget */
  costEntityId?: string;
  /** alert status */
  status?: AlertStatus;
  /** dateTime in which alert was created */
  creationTime?: string;
  /** dateTime in which alert was closed */
  closeTime?: string;
  /** dateTime in which alert was last modified */
  modificationTime?: string;
  /** User who last modified the alert */
  statusModificationUserName?: string;
  /** dateTime in which the alert status was last modified */
  statusModificationTime?: string;
}

export function alertPropertiesSerializer(item: AlertProperties): any {
  return {
    definition: !item["definition"]
      ? item["definition"]
      : alertPropertiesDefinitionSerializer(item["definition"]),
    description: item["description"],
    source: item["source"],
    details: !item["details"] ? item["details"] : alertPropertiesDetailsSerializer(item["details"]),
    costEntityId: item["costEntityId"],
    status: item["status"],
    creationTime: item["creationTime"],
    closeTime: item["closeTime"],
    modificationTime: item["modificationTime"],
    statusModificationUserName: item["statusModificationUserName"],
    statusModificationTime: item["statusModificationTime"],
  };
}

export function alertPropertiesDeserializer(item: any): AlertProperties {
  return {
    definition: !item["definition"]
      ? item["definition"]
      : alertPropertiesDefinitionDeserializer(item["definition"]),
    description: item["description"],
    source: item["source"],
    details: !item["details"]
      ? item["details"]
      : alertPropertiesDetailsDeserializer(item["details"]),
    costEntityId: item["costEntityId"],
    status: item["status"],
    creationTime: item["creationTime"],
    closeTime: item["closeTime"],
    modificationTime: item["modificationTime"],
    statusModificationUserName: item["statusModificationUserName"],
    statusModificationTime: item["statusModificationTime"],
  };
}

/** defines the type of alert */
export interface AlertPropertiesDefinition {
  /** type of alert */
  type?: AlertType;
  /** Alert category */
  category?: AlertCategory;
  /** Criteria that triggered alert */
  criteria?: AlertCriteria;
}

export function alertPropertiesDefinitionSerializer(item: AlertPropertiesDefinition): any {
  return { type: item["type"], category: item["category"], criteria: item["criteria"] };
}

export function alertPropertiesDefinitionDeserializer(item: any): AlertPropertiesDefinition {
  return {
    type: item["type"],
    category: item["category"],
    criteria: item["criteria"],
  };
}

/** type of alert */
export enum KnownAlertType {
  /** Budget */
  Budget = "Budget",
  /** Invoice */
  Invoice = "Invoice",
  /** Credit */
  Credit = "Credit",
  /** Quota */
  Quota = "Quota",
  /** General */
  General = "General",
  /** xCloud */
  XCloud = "xCloud",
  /** BudgetForecast */
  BudgetForecast = "BudgetForecast",
}

/**
 * type of alert \
 * {@link KnownAlertType} can be used interchangeably with AlertType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Budget** \
 * **Invoice** \
 * **Credit** \
 * **Quota** \
 * **General** \
 * **xCloud** \
 * **BudgetForecast**
 */
export type AlertType = string;

/** Alert category */
export enum KnownAlertCategory {
  /** Cost */
  Cost = "Cost",
  /** Usage */
  Usage = "Usage",
  /** Billing */
  Billing = "Billing",
  /** System */
  System = "System",
}

/**
 * Alert category \
 * {@link KnownAlertCategory} can be used interchangeably with AlertCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cost** \
 * **Usage** \
 * **Billing** \
 * **System**
 */
export type AlertCategory = string;

/** Criteria that triggered alert */
export enum KnownAlertCriteria {
  /** CostThresholdExceeded */
  CostThresholdExceeded = "CostThresholdExceeded",
  /** UsageThresholdExceeded */
  UsageThresholdExceeded = "UsageThresholdExceeded",
  /** CreditThresholdApproaching */
  CreditThresholdApproaching = "CreditThresholdApproaching",
  /** CreditThresholdReached */
  CreditThresholdReached = "CreditThresholdReached",
  /** QuotaThresholdApproaching */
  QuotaThresholdApproaching = "QuotaThresholdApproaching",
  /** QuotaThresholdReached */
  QuotaThresholdReached = "QuotaThresholdReached",
  /** MultiCurrency */
  MultiCurrency = "MultiCurrency",
  /** ForecastCostThresholdExceeded */
  ForecastCostThresholdExceeded = "ForecastCostThresholdExceeded",
  /** ForecastUsageThresholdExceeded */
  ForecastUsageThresholdExceeded = "ForecastUsageThresholdExceeded",
  /** InvoiceDueDateApproaching */
  InvoiceDueDateApproaching = "InvoiceDueDateApproaching",
  /** InvoiceDueDateReached */
  InvoiceDueDateReached = "InvoiceDueDateReached",
  /** CrossCloudNewDataAvailable */
  CrossCloudNewDataAvailable = "CrossCloudNewDataAvailable",
  /** CrossCloudCollectionError */
  CrossCloudCollectionError = "CrossCloudCollectionError",
  /** GeneralThresholdError */
  GeneralThresholdError = "GeneralThresholdError",
}

/**
 * Criteria that triggered alert \
 * {@link KnownAlertCriteria} can be used interchangeably with AlertCriteria,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CostThresholdExceeded** \
 * **UsageThresholdExceeded** \
 * **CreditThresholdApproaching** \
 * **CreditThresholdReached** \
 * **QuotaThresholdApproaching** \
 * **QuotaThresholdReached** \
 * **MultiCurrency** \
 * **ForecastCostThresholdExceeded** \
 * **ForecastUsageThresholdExceeded** \
 * **InvoiceDueDateApproaching** \
 * **InvoiceDueDateReached** \
 * **CrossCloudNewDataAvailable** \
 * **CrossCloudCollectionError** \
 * **GeneralThresholdError**
 */
export type AlertCriteria = string;

/** Source of alert */
export enum KnownAlertSource {
  /** Preset */
  Preset = "Preset",
  /** User */
  User = "User",
}

/**
 * Source of alert \
 * {@link KnownAlertSource} can be used interchangeably with AlertSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preset** \
 * **User**
 */
export type AlertSource = string;

/** Alert details */
export interface AlertPropertiesDetails {
  /** Type of timegrain cadence */
  timeGrainType?: AlertTimeGrainType;
  /** datetime of periodStartDate */
  periodStartDate?: string;
  /** notificationId that triggered this alert */
  triggeredBy?: string;
  /** array of resourceGroups to filter by */
  resourceGroupFilter?: any[];
  /** array of resources to filter by */
  resourceFilter?: any[];
  /** array of meters to filter by */
  meterFilter?: any[];
  /** tags to filter by */
  tagFilter?: any;
  /** notification threshold percentage as a decimal which activated this alert */
  threshold?: number;
  /** operator used to compare currentSpend with amount */
  operator?: AlertOperator;
  /** budget threshold amount */
  amount?: number;
  /** unit of currency being used */
  unit?: string;
  /** current spend */
  currentSpend?: number;
  /** list of emails to contact */
  contactEmails?: string[];
  /** list of action groups to broadcast to */
  contactGroups?: string[];
  /** list of contact roles */
  contactRoles?: string[];
  /** overriding alert */
  overridingAlert?: string;
  /** department name */
  departmentName?: string;
  /** company name */
  companyName?: string;
  /** enrollment number */
  enrollmentNumber?: string;
  /** datetime of enrollmentStartDate */
  enrollmentStartDate?: string;
  /** datetime of enrollmentEndDate */
  enrollmentEndDate?: string;
  /** invoicing threshold */
  invoicingThreshold?: number;
}

export function alertPropertiesDetailsSerializer(item: AlertPropertiesDetails): any {
  return {
    timeGrainType: item["timeGrainType"],
    periodStartDate: item["periodStartDate"],
    triggeredBy: item["triggeredBy"],
    resourceGroupFilter: !item["resourceGroupFilter"]
      ? item["resourceGroupFilter"]
      : item["resourceGroupFilter"].map((p: any) => {
          return p;
        }),
    resourceFilter: !item["resourceFilter"]
      ? item["resourceFilter"]
      : item["resourceFilter"].map((p: any) => {
          return p;
        }),
    meterFilter: !item["meterFilter"]
      ? item["meterFilter"]
      : item["meterFilter"].map((p: any) => {
          return p;
        }),
    tagFilter: item["tagFilter"],
    threshold: item["threshold"],
    operator: item["operator"],
    amount: item["amount"],
    unit: item["unit"],
    currentSpend: item["currentSpend"],
    contactEmails: !item["contactEmails"]
      ? item["contactEmails"]
      : item["contactEmails"].map((p: any) => {
          return p;
        }),
    contactGroups: !item["contactGroups"]
      ? item["contactGroups"]
      : item["contactGroups"].map((p: any) => {
          return p;
        }),
    contactRoles: !item["contactRoles"]
      ? item["contactRoles"]
      : item["contactRoles"].map((p: any) => {
          return p;
        }),
    overridingAlert: item["overridingAlert"],
    departmentName: item["departmentName"],
    companyName: item["companyName"],
    enrollmentNumber: item["enrollmentNumber"],
    enrollmentStartDate: item["enrollmentStartDate"],
    enrollmentEndDate: item["enrollmentEndDate"],
    invoicingThreshold: item["invoicingThreshold"],
  };
}

export function alertPropertiesDetailsDeserializer(item: any): AlertPropertiesDetails {
  return {
    timeGrainType: item["timeGrainType"],
    periodStartDate: item["periodStartDate"],
    triggeredBy: item["triggeredBy"],
    resourceGroupFilter: !item["resourceGroupFilter"]
      ? item["resourceGroupFilter"]
      : item["resourceGroupFilter"].map((p: any) => {
          return p;
        }),
    resourceFilter: !item["resourceFilter"]
      ? item["resourceFilter"]
      : item["resourceFilter"].map((p: any) => {
          return p;
        }),
    meterFilter: !item["meterFilter"]
      ? item["meterFilter"]
      : item["meterFilter"].map((p: any) => {
          return p;
        }),
    tagFilter: item["tagFilter"],
    threshold: item["threshold"],
    operator: item["operator"],
    amount: item["amount"],
    unit: item["unit"],
    currentSpend: item["currentSpend"],
    contactEmails: !item["contactEmails"]
      ? item["contactEmails"]
      : item["contactEmails"].map((p: any) => {
          return p;
        }),
    contactGroups: !item["contactGroups"]
      ? item["contactGroups"]
      : item["contactGroups"].map((p: any) => {
          return p;
        }),
    contactRoles: !item["contactRoles"]
      ? item["contactRoles"]
      : item["contactRoles"].map((p: any) => {
          return p;
        }),
    overridingAlert: item["overridingAlert"],
    departmentName: item["departmentName"],
    companyName: item["companyName"],
    enrollmentNumber: item["enrollmentNumber"],
    enrollmentStartDate: item["enrollmentStartDate"],
    enrollmentEndDate: item["enrollmentEndDate"],
    invoicingThreshold: item["invoicingThreshold"],
  };
}

/** Type of timegrain cadence */
export enum KnownAlertTimeGrainType {
  /** None */
  None = "None",
  /** Monthly */
  Monthly = "Monthly",
  /** Quarterly */
  Quarterly = "Quarterly",
  /** Annually */
  Annually = "Annually",
  /** BillingMonth */
  BillingMonth = "BillingMonth",
  /** BillingQuarter */
  BillingQuarter = "BillingQuarter",
  /** BillingAnnual */
  BillingAnnual = "BillingAnnual",
}

/**
 * Type of timegrain cadence \
 * {@link KnownAlertTimeGrainType} can be used interchangeably with AlertTimeGrainType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Monthly** \
 * **Quarterly** \
 * **Annually** \
 * **BillingMonth** \
 * **BillingQuarter** \
 * **BillingAnnual**
 */
export type AlertTimeGrainType = string;

/** operator used to compare currentSpend with amount */
export enum KnownAlertOperator {
  /** None */
  None = "None",
  /** EqualTo */
  EqualTo = "EqualTo",
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** GreaterThanOrEqualTo */
  GreaterThanOrEqualTo = "GreaterThanOrEqualTo",
  /** LessThan */
  LessThan = "LessThan",
  /** LessThanOrEqualTo */
  LessThanOrEqualTo = "LessThanOrEqualTo",
}

/**
 * operator used to compare currentSpend with amount \
 * {@link KnownAlertOperator} can be used interchangeably with AlertOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **EqualTo** \
 * **GreaterThan** \
 * **GreaterThanOrEqualTo** \
 * **LessThan** \
 * **LessThanOrEqualTo**
 */
export type AlertOperator = string;

/** alert status */
export enum KnownAlertStatus {
  /** None */
  None = "None",
  /** Active */
  Active = "Active",
  /** Overridden */
  Overridden = "Overridden",
  /** Resolved */
  Resolved = "Resolved",
  /** Dismissed */
  Dismissed = "Dismissed",
}

/**
 * alert status \
 * {@link KnownAlertStatus} can be used interchangeably with AlertStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Active** \
 * **Overridden** \
 * **Resolved** \
 * **Dismissed**
 */
export type AlertStatus = string;

/** The request payload to update an alert */
export interface DismissAlertPayload {
  /** defines the type of alert */
  definition?: AlertPropertiesDefinition;
  /** Alert description */
  description?: string;
  /** Source of alert */
  source?: AlertSource;
  /** Alert details */
  details?: AlertPropertiesDetails;
  /** related budget */
  costEntityId?: string;
  /** alert status */
  status?: AlertStatus;
  /** dateTime in which alert was created */
  creationTime?: string;
  /** dateTime in which alert was closed */
  closeTime?: string;
  /** dateTime in which alert was last modified */
  modificationTime?: string;
  /** User who last modified the alert */
  statusModificationUserName?: string;
  /** dateTime in which the alert status was last modified */
  statusModificationTime?: string;
}

export function dismissAlertPayloadSerializer(item: DismissAlertPayload): any {
  return {
    properties: areAllPropsUndefined(item, [
      "definition",
      "description",
      "source",
      "details",
      "costEntityId",
      "status",
      "creationTime",
      "closeTime",
      "modificationTime",
      "statusModificationUserName",
      "statusModificationTime",
    ])
      ? undefined
      : _dismissAlertPayloadPropertiesSerializer(item),
  };
}

/** Result of alerts. */
export interface AlertsResult {
  /** List of alerts. */
  readonly value?: Alert[];
  /** URL to get the next set of alerts results if there are any. */
  readonly nextLink?: string;
}

export function alertsResultDeserializer(item: any): AlertsResult {
  return {
    value: !item["value"] ? item["value"] : alertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertArrayDeserializer(result: Array<Alert>): any[] {
  return result.map((item) => {
    return alertDeserializer(item);
  });
}

/** Scheduled action definition. */
export interface ScheduledAction extends ProxyResource {
  /** Resource Etag. For update calls, eTag is optional and can be specified to achieve optimistic concurrency. Fetch the resource's eTag by doing a 'GET' call first and then including the latest eTag as part of the request body or 'If-Match' header while performing the update. For create calls, eTag is not required. */
  eTag?: string;
  /** Kind of the scheduled action. */
  kind?: ScheduledActionKind;
  /** Scheduled action name. */
  displayName?: string;
  /** Destination format of the view data. This is optional. */
  fileDestination?: FileDestination;
  /** Notification properties based on scheduled action kind. */
  notification?: NotificationProperties;
  /** Email address of the point of contact that should get the unsubscribe requests and notification emails. */
  notificationEmail?: string;
  /** Schedule of the scheduled action. */
  schedule?: ScheduleProperties;
  /** For private scheduled action(Create or Update), scope will be empty.<br /> For shared scheduled action(Create or Update By Scope), Cost Management scope can be 'subscriptions/{subscriptionId}' for subscription scope, 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for BillingProfile scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/invoiceSections/{invoiceSectionId}' for InvoiceSection scope, '/providers/Microsoft.CostManagement/externalBillingAccounts/{externalBillingAccountName}' for ExternalBillingAccount scope, and '/providers/Microsoft.CostManagement/externalSubscriptions/{externalSubscriptionName}' for ExternalSubscription scope. */
  scope?: string;
  /** Status of the scheduled action. */
  status?: ScheduledActionStatus;
  /** Cost analysis viewId used for scheduled action. For example, '/providers/Microsoft.CostManagement/views/swaggerExample' */
  viewId?: string;
}

export function scheduledActionSerializer(item: ScheduledAction): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "fileDestination",
      "notification",
      "notificationEmail",
      "schedule",
      "scope",
      "status",
      "viewId",
    ])
      ? undefined
      : _scheduledActionPropertiesSerializer(item),
    eTag: item["eTag"],
    kind: item["kind"],
  };
}

export function scheduledActionDeserializer(item: any): ScheduledAction {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _scheduledActionPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
    kind: item["kind"],
  };
}

/** The properties of the scheduled action. */
export interface ScheduledActionProperties {
  /** Scheduled action name. */
  displayName: string;
  /** Destination format of the view data. This is optional. */
  fileDestination?: FileDestination;
  /** Notification properties based on scheduled action kind. */
  notification: NotificationProperties;
  /** Email address of the point of contact that should get the unsubscribe requests and notification emails. */
  notificationEmail?: string;
  /** Schedule of the scheduled action. */
  schedule: ScheduleProperties;
  /** For private scheduled action(Create or Update), scope will be empty.<br /> For shared scheduled action(Create or Update By Scope), Cost Management scope can be 'subscriptions/{subscriptionId}' for subscription scope, 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for BillingProfile scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/invoiceSections/{invoiceSectionId}' for InvoiceSection scope, '/providers/Microsoft.CostManagement/externalBillingAccounts/{externalBillingAccountName}' for ExternalBillingAccount scope, and '/providers/Microsoft.CostManagement/externalSubscriptions/{externalSubscriptionName}' for ExternalSubscription scope. */
  scope?: string;
  /** Status of the scheduled action. */
  status: ScheduledActionStatus;
  /** Cost analysis viewId used for scheduled action. For example, '/providers/Microsoft.CostManagement/views/swaggerExample' */
  viewId: string;
}

export function scheduledActionPropertiesSerializer(item: ScheduledActionProperties): any {
  return {
    displayName: item["displayName"],
    fileDestination: !item["fileDestination"]
      ? item["fileDestination"]
      : fileDestinationSerializer(item["fileDestination"]),
    notification: notificationPropertiesSerializer(item["notification"]),
    notificationEmail: item["notificationEmail"],
    schedule: schedulePropertiesSerializer(item["schedule"]),
    scope: item["scope"],
    status: item["status"],
    viewId: item["viewId"],
  };
}

export function scheduledActionPropertiesDeserializer(item: any): ScheduledActionProperties {
  return {
    displayName: item["displayName"],
    fileDestination: !item["fileDestination"]
      ? item["fileDestination"]
      : fileDestinationDeserializer(item["fileDestination"]),
    notification: notificationPropertiesDeserializer(item["notification"]),
    notificationEmail: item["notificationEmail"],
    schedule: schedulePropertiesDeserializer(item["schedule"]),
    scope: item["scope"],
    status: item["status"],
    viewId: item["viewId"],
  };
}

/** Destination of the view data. This is optional. Currently only CSV format is supported. */
export interface FileDestination {
  /** Destination of the view data. Currently only CSV format is supported. */
  fileFormats?: FileFormat[];
}

export function fileDestinationSerializer(item: FileDestination): any {
  return {
    fileFormats: !item["fileFormats"]
      ? item["fileFormats"]
      : item["fileFormats"].map((p: any) => {
          return p;
        }),
  };
}

export function fileDestinationDeserializer(item: any): FileDestination {
  return {
    fileFormats: !item["fileFormats"]
      ? item["fileFormats"]
      : item["fileFormats"].map((p: any) => {
          return p;
        }),
  };
}

/** Destination of the view data. Currently only CSV format is supported. */
export enum KnownFileFormat {
  /** Csv */
  Csv = "Csv",
}

/**
 * Destination of the view data. Currently only CSV format is supported. \
 * {@link KnownFileFormat} can be used interchangeably with FileFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Csv**
 */
export type FileFormat = string;

/** The properties of the scheduled action notification. */
export interface NotificationProperties {
  /** Array of email addresses. */
  to: string[];
  /** Locale of the email. */
  language?: string;
  /** Optional message to be added in the email. Length is limited to 250 characters. */
  message?: string;
  /** Regional format used for formatting date/time and currency values in the email. */
  regionalFormat?: string;
  /** Subject of the email. Length is limited to 70 characters. */
  subject: string;
}

export function notificationPropertiesSerializer(item: NotificationProperties): any {
  return {
    to: item["to"].map((p: any) => {
      return p;
    }),
    language: item["language"],
    message: item["message"],
    regionalFormat: item["regionalFormat"],
    subject: item["subject"],
  };
}

export function notificationPropertiesDeserializer(item: any): NotificationProperties {
  return {
    to: item["to"].map((p: any) => {
      return p;
    }),
    language: item["language"],
    message: item["message"],
    regionalFormat: item["regionalFormat"],
    subject: item["subject"],
  };
}

/** The properties of the schedule. */
export interface ScheduleProperties {
  /** Frequency of the schedule. */
  frequency: ScheduleFrequency;
  /** UTC time at which cost analysis data will be emailed. */
  hourOfDay?: number;
  /** Day names in english on which cost analysis data will be emailed. This property is applicable when frequency is Weekly or Monthly. */
  daysOfWeek?: DaysOfWeek[];
  /** Weeks in which cost analysis data will be emailed. This property is applicable when frequency is Monthly and used in combination with daysOfWeek. */
  weeksOfMonth?: WeeksOfMonth[];
  /** UTC day on which cost analysis data will be emailed. Must be between 1 and 31. This property is applicable when frequency is Monthly and overrides weeksOfMonth or daysOfWeek. */
  dayOfMonth?: number;
  /** The start date and time of the scheduled action (UTC). */
  startDate: Date;
  /** The end date and time of the scheduled action (UTC). */
  endDate: Date;
}

export function schedulePropertiesSerializer(item: ScheduleProperties): any {
  return {
    frequency: item["frequency"],
    hourOfDay: item["hourOfDay"],
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : item["daysOfWeek"].map((p: any) => {
          return p;
        }),
    weeksOfMonth: !item["weeksOfMonth"]
      ? item["weeksOfMonth"]
      : item["weeksOfMonth"].map((p: any) => {
          return p;
        }),
    dayOfMonth: item["dayOfMonth"],
    startDate: item["startDate"].toISOString(),
    endDate: item["endDate"].toISOString(),
  };
}

export function schedulePropertiesDeserializer(item: any): ScheduleProperties {
  return {
    frequency: item["frequency"],
    hourOfDay: item["hourOfDay"],
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : item["daysOfWeek"].map((p: any) => {
          return p;
        }),
    weeksOfMonth: !item["weeksOfMonth"]
      ? item["weeksOfMonth"]
      : item["weeksOfMonth"].map((p: any) => {
          return p;
        }),
    dayOfMonth: item["dayOfMonth"],
    startDate: new Date(item["startDate"]),
    endDate: new Date(item["endDate"]),
  };
}

/** Frequency of the schedule. */
export enum KnownScheduleFrequency {
  /** Cost analysis data will be emailed every day. */
  Daily = "Daily",
  /** Cost analysis data will be emailed every week. */
  Weekly = "Weekly",
  /** Cost analysis data will be emailed every month. */
  Monthly = "Monthly",
}

/**
 * Frequency of the schedule. \
 * {@link KnownScheduleFrequency} can be used interchangeably with ScheduleFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily**: Cost analysis data will be emailed every day. \
 * **Weekly**: Cost analysis data will be emailed every week. \
 * **Monthly**: Cost analysis data will be emailed every month.
 */
export type ScheduleFrequency = string;

/** Days of Week. */
export enum KnownDaysOfWeek {
  /** Monday */
  Monday = "Monday",
  /** Tuesday */
  Tuesday = "Tuesday",
  /** Wednesday */
  Wednesday = "Wednesday",
  /** Thursday */
  Thursday = "Thursday",
  /** Friday */
  Friday = "Friday",
  /** Saturday */
  Saturday = "Saturday",
  /** Sunday */
  Sunday = "Sunday",
}

/**
 * Days of Week. \
 * {@link KnownDaysOfWeek} can be used interchangeably with DaysOfWeek,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monday** \
 * **Tuesday** \
 * **Wednesday** \
 * **Thursday** \
 * **Friday** \
 * **Saturday** \
 * **Sunday**
 */
export type DaysOfWeek = string;

/** Weeks of month. */
export enum KnownWeeksOfMonth {
  /** First */
  First = "First",
  /** Second */
  Second = "Second",
  /** Third */
  Third = "Third",
  /** Fourth */
  Fourth = "Fourth",
  /** Last */
  Last = "Last",
}

/**
 * Weeks of month. \
 * {@link KnownWeeksOfMonth} can be used interchangeably with WeeksOfMonth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **First** \
 * **Second** \
 * **Third** \
 * **Fourth** \
 * **Last**
 */
export type WeeksOfMonth = string;

/** Status of the scheduled action. */
export enum KnownScheduledActionStatus {
  /** Scheduled action is saved and will be run. */
  Enabled = "Enabled",
  /** Scheduled action is expired. */
  Expired = "Expired",
  /** Scheduled action is saved but will not be run. */
  Disabled = "Disabled",
}

/**
 * Status of the scheduled action. \
 * {@link KnownScheduledActionStatus} can be used interchangeably with ScheduledActionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Scheduled action is saved and will be run. \
 * **Expired**: Scheduled action is expired. \
 * **Disabled**: Scheduled action is saved but will not be run.
 */
export type ScheduledActionStatus = string;

/** Kind of the scheduled action. */
export enum KnownScheduledActionKind {
  /** Cost analysis data will be emailed. */
  Email = "Email",
  /** Cost anomaly information will be emailed. Available only on subscription scope at daily frequency. If no anomaly is detected on the resource, an email won't be sent. */
  InsightAlert = "InsightAlert",
}

/**
 * Kind of the scheduled action. \
 * {@link KnownScheduledActionKind} can be used interchangeably with ScheduledActionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Email**: Cost analysis data will be emailed. \
 * **InsightAlert**: Cost anomaly information will be emailed. Available only on subscription scope at daily frequency. If no anomaly is detected on the resource, an email won't be sent.
 */
export type ScheduledActionKind = string;

/**
 * Error response indicates that the service is not able to process the incoming request. The reason is provided in the error message.
 *
 * Some Error responses:
 *
 * * 429 TooManyRequests - Request is throttled. Retry after waiting for the time specified in the "x-ms-ratelimit-microsoft.consumption-retry-after" header.
 *
 * * 503 ServiceUnavailable - Service is temporarily unavailable. Retry after waiting for the time specified in the "Retry-After" header.
 */
export interface ErrorResponseWithNestedDetails {
  /** The details of the error. */
  error?: ErrorDetailsWithNestedDetails;
}

export function errorResponseWithNestedDetailsDeserializer(
  item: any,
): ErrorResponseWithNestedDetails {
  return {
    error: !item["error"]
      ? item["error"]
      : errorDetailsWithNestedDetailsDeserializer(item["error"]),
  };
}

/** The details of the error. */
export interface ErrorDetailsWithNestedDetails extends ErrorDetails {
  /** The additional details of the error. */
  readonly details?: ErrorDetailsWithNestedDetails[];
}

export function errorDetailsWithNestedDetailsDeserializer(
  item: any,
): ErrorDetailsWithNestedDetails {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : errorDetailsWithNestedDetailsArrayDeserializer(item["details"]),
  };
}

export function errorDetailsWithNestedDetailsArrayDeserializer(
  result: Array<ErrorDetailsWithNestedDetails>,
): any[] {
  return result.map((item) => {
    return errorDetailsWithNestedDetailsDeserializer(item);
  });
}

/** Scheduled actions list result. It contains a list of scheduled actions. */
export interface _ScheduledActionListResult {
  /** The list of scheduled actions. */
  readonly value?: ScheduledAction[];
  /** The link (url) to the next page of results. */
  nextLink?: string;
}

export function _scheduledActionListResultDeserializer(item: any): _ScheduledActionListResult {
  return {
    value: !item["value"] ? item["value"] : scheduledActionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduledActionArraySerializer(result: Array<ScheduledAction>): any[] {
  return result.map((item) => {
    return scheduledActionSerializer(item);
  });
}

export function scheduledActionArrayDeserializer(result: Array<ScheduledAction>): any[] {
  return result.map((item) => {
    return scheduledActionDeserializer(item);
  });
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

/** Setting definition. */
export interface Setting extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: taginheritance */
  kind: SettingsKind;
}

export function settingSerializer(item: Setting): any {
  return { kind: item["kind"] };
}

export function settingDeserializer(item: any): Setting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for SettingUnion */
export type SettingUnion = TagInheritanceSetting | Setting;

export function settingUnionSerializer(item: SettingUnion): any {
  switch (item.kind) {
    case "taginheritance":
      return tagInheritanceSettingSerializer(item as TagInheritanceSetting);

    default:
      return settingSerializer(item);
  }
}

export function settingUnionDeserializer(item: any): SettingUnion {
  switch (item["kind"]) {
    case "taginheritance":
      return tagInheritanceSettingDeserializer(item as TagInheritanceSetting);

    default:
      return settingDeserializer(item);
  }
}

/** Specifies the kind of settings. */
export enum KnownSettingsKind {
  /** taginheritance */
  Taginheritance = "taginheritance",
}

/**
 * Specifies the kind of settings. \
 * {@link KnownSettingsKind} can be used interchangeably with SettingsKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **taginheritance**
 */
export type SettingsKind = string;

/** Known values of {@link SettingType} that the service accepts. */
export enum KnownSettingType {
  /** This setting applies billing profile, invoice section, subscription and resource group tags to current month's usage data of child resources. */
  Taginheritance = "taginheritance",
}

/** Type of SettingType */
export type SettingType = string;

/** Tag Inheritance Setting definition. */
export interface TagInheritanceSetting extends Setting {
  /** The properties of the tag inheritance setting. */
  properties?: TagInheritanceProperties;
  /** Specifies the kind of settings. */
  kind: "taginheritance";
}

export function tagInheritanceSettingSerializer(item: TagInheritanceSetting): any {
  return {
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : tagInheritancePropertiesSerializer(item["properties"]),
  };
}

export function tagInheritanceSettingDeserializer(item: any): TagInheritanceSetting {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : tagInheritancePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the tag inheritance setting. */
export interface TagInheritanceProperties {
  /** This property defines the behavior when an inherited tag being applied matches a lower scope tag (Eg. Subscription tag matches the resource tag). If set to true - when tags match, the highest scope tags will be applied. Billing profile is the highest scope,  followed by invoice sections, subscriptions and resource groups (allows overriding of lower scope tag values). If set to false - when tags match, the lowest scope tags will be applied. So, if a resource has the same tag as a subscription tag, the resource tag will be applied (does not allow overriding of lower scope tag values). */
  preferContainerTags: boolean;
}

export function tagInheritancePropertiesSerializer(item: TagInheritanceProperties): any {
  return { preferContainerTags: item["preferContainerTags"] };
}

export function tagInheritancePropertiesDeserializer(item: any): TagInheritanceProperties {
  return {
    preferContainerTags: item["preferContainerTags"],
  };
}

/** Setting list result. It contains a list of settings. */
export interface SettingsListResult {
  /** The list of settings. */
  readonly value?: SettingUnion[];
}

export function settingsListResultDeserializer(item: any): SettingsListResult {
  return {
    value: !item["value"] ? item["value"] : settingUnionArrayDeserializer(item["value"]),
  };
}

export function settingUnionArraySerializer(result: Array<SettingUnion>): any[] {
  return result.map((item) => {
    return settingUnionSerializer(item);
  });
}

export function settingUnionArrayDeserializer(result: Array<SettingUnion>): any[] {
  return result.map((item) => {
    return settingUnionDeserializer(item);
  });
}

/** The result of the long running operation for cost details Api. */
export interface CostDetailsOperationResults {
  /** The id of the long running operation. */
  id?: string;
  /** The name of the long running operation. */
  name?: string;
  /** The type of the long running operation. */
  type?: string;
  /** The status of the cost details operation */
  status?: CostDetailsStatusType;
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  validTill?: Date;
  /** The details of the error. */
  error?: ErrorDetails;
  /** The Manifest version. */
  manifestVersion?: string;
  /** The data format of the report */
  dataFormat?: CostDetailsDataFormat;
  /** The total number of bytes in all blobs. */
  byteCount?: number;
  /** The total number of blobs. */
  blobCount?: number;
  /** Is the data in compressed format. */
  compressData?: boolean;
  /** The context of the Cost Details request. */
  requestContext?: RequestContext;
  /** List of blob information generated by this operation. */
  blobs?: BlobInfo[];
}

export function costDetailsOperationResultsDeserializer(item: any): CostDetailsOperationResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    status: item["status"],
    ...(!item["manifest"]
      ? item["manifest"]
      : _costDetailsOperationResultsManifestDeserializer(item["manifest"])),
    validTill: !item["validTill"] ? item["validTill"] : new Date(item["validTill"]),
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

/** The status of the cost details operation */
export enum KnownCostDetailsStatusType {
  /** Operation is Completed. */
  CompletedCostDetailsStatusType = "Completed",
  /** Operation is Completed and no cost data found. */
  NoDataFoundCostDetailsStatusType = "NoDataFound",
  /** Operation Failed. */
  FailedCostDetailsStatusType = "Failed",
}

/**
 * The status of the cost details operation \
 * {@link KnownCostDetailsStatusType} can be used interchangeably with CostDetailsStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed**: Operation is Completed. \
 * **NoDataFound**: Operation is Completed and no cost data found. \
 * **Failed**: Operation Failed.
 */
export type CostDetailsStatusType = string;

/** The manifest of the report generated by the operation. */
export interface ReportManifest {
  /** The Manifest version. */
  manifestVersion?: string;
  /** The data format of the report */
  dataFormat?: CostDetailsDataFormat;
  /** The total number of bytes in all blobs. */
  byteCount?: number;
  /** The total number of blobs. */
  blobCount?: number;
  /** Is the data in compressed format. */
  compressData?: boolean;
  /** List of blob information generated by this operation. */
  blobs?: BlobInfo[];
  /** The request scope of the request. */
  requestScope?: string;
  /** The request payload body provided in Cost Details call */
  requestBody?: GenerateCostDetailsReportRequestDefinition;
}

export function reportManifestDeserializer(item: any): ReportManifest {
  return {
    manifestVersion: item["manifestVersion"],
    dataFormat: item["dataFormat"],
    byteCount: item["byteCount"],
    blobCount: item["blobCount"],
    compressData: item["compressData"],
    ...(!item["requestContext"]
      ? item["requestContext"]
      : _reportManifestRequestContextDeserializer(item["requestContext"])),
    blobs: !item["blobs"] ? item["blobs"] : blobInfoArrayDeserializer(item["blobs"]),
  };
}

/** The data format of the report */
export enum KnownCostDetailsDataFormat {
  /** Csv data format. */
  CsvCostDetailsDataFormat = "Csv",
}

/**
 * The data format of the report \
 * {@link KnownCostDetailsDataFormat} can be used interchangeably with CostDetailsDataFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Csv**: Csv data format.
 */
export type CostDetailsDataFormat = string;

/** The context of the Cost Details request. */
export interface RequestContext {
  /** The request scope of the request. */
  requestScope?: string;
  /** The request payload body provided in Cost Details call */
  requestBody?: GenerateCostDetailsReportRequestDefinition;
}

export function requestContextDeserializer(item: any): RequestContext {
  return {
    requestScope: item["requestScope"],
    requestBody: !item["requestBody"]
      ? item["requestBody"]
      : generateCostDetailsReportRequestDefinitionDeserializer(item["requestBody"]),
  };
}

/** The definition of a cost detailed report. */
export interface GenerateCostDetailsReportRequestDefinition {
  /** The type of the detailed report. By default ActualCost is provided */
  metric?: CostDetailsMetricType;
  /** The specific date range of cost details requested for the report. This parameter cannot be used alongside either the invoiceId or billingPeriod parameters. If a timePeriod, invoiceId or billingPeriod parameter is not provided in the request body the API will return the current month's cost. API only allows data to be pulled for 1 month or less and no older than 13 months. If no timePeriod or billingPeriod or invoiceId is provided the API defaults to the open month time period */
  timePeriod?: CostDetailsTimePeriod;
  /** This parameter can be used only by Enterprise Agreement customers. Use the YearMonth(e.g. 202008) format. This parameter cannot be used alongside either the invoiceId or timePeriod parameters. If a timePeriod, invoiceId or billingPeriod parameter is not provided in the request body the API will return the current month's cost. */
  billingPeriod?: string;
  /** This parameter can only be used by Microsoft Customer Agreement customers. Additionally, it can only be used at the Billing Profile or Customer scope. This parameter cannot be used alongside either the billingPeriod or timePeriod parameters. If a timePeriod, invoiceId or billingPeriod parameter is not provided in the request body the API will return the current month's cost. */
  invoiceId?: string;
}

export function generateCostDetailsReportRequestDefinitionSerializer(
  item: GenerateCostDetailsReportRequestDefinition,
): any {
  return {
    metric: item["metric"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : costDetailsTimePeriodSerializer(item["timePeriod"]),
    billingPeriod: item["billingPeriod"],
    invoiceId: item["invoiceId"],
  };
}

export function generateCostDetailsReportRequestDefinitionDeserializer(
  item: any,
): GenerateCostDetailsReportRequestDefinition {
  return {
    metric: item["metric"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : costDetailsTimePeriodDeserializer(item["timePeriod"]),
    billingPeriod: item["billingPeriod"],
    invoiceId: item["invoiceId"],
  };
}

/** The type of the detailed report. By default ActualCost is provided */
export enum KnownCostDetailsMetricType {
  /** Actual cost data. */
  ActualCostCostDetailsMetricType = "ActualCost",
  /** Amortized cost data. */
  AmortizedCostCostDetailsMetricType = "AmortizedCost",
}

/**
 * The type of the detailed report. By default ActualCost is provided \
 * {@link KnownCostDetailsMetricType} can be used interchangeably with CostDetailsMetricType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActualCost**: Actual cost data. \
 * **AmortizedCost**: Amortized cost data.
 */
export type CostDetailsMetricType = string;

/** The start and end date for pulling data for the cost detailed report. API only allows data to be pulled for 1 month or less and no older than 13 months. */
export interface CostDetailsTimePeriod {
  /** The start date to pull data from. example format 2020-03-15 */
  start: string;
  /** The end date to pull data to. example format 2020-03-15 */
  end: string;
}

export function costDetailsTimePeriodSerializer(item: CostDetailsTimePeriod): any {
  return { start: item["start"], end: item["end"] };
}

export function costDetailsTimePeriodDeserializer(item: any): CostDetailsTimePeriod {
  return {
    start: item["start"],
    end: item["end"],
  };
}

export function blobInfoArrayDeserializer(result: Array<BlobInfo>): any[] {
  return result.map((item) => {
    return blobInfoDeserializer(item);
  });
}

/** The blob information generated by this operation. */
export interface BlobInfo {
  /** Link to the blob to download file. */
  blobLink?: string;
  /** Bytes in the blob. */
  byteCount?: number;
}

export function blobInfoDeserializer(item: any): BlobInfo {
  return {
    blobLink: item["blobLink"],
    byteCount: item["byteCount"],
  };
}

/**
 * Error response indicates that the service is not able to process the incoming request. The reason is provided in the error message.
 *
 * Some Error responses:
 *
 * * 400 Bad Request - Invalid Request Payload. Request payload provided is not in a json format or had an invalid member not accepted in the request payload.
 *
 * * 400 Bad Request - Invalid request payload:  can only have either timePeriod or invoiceId or billingPeriod. API only allows data to be pulled for either timePeriod or invoiceId or billingPeriod. Customer should provide only one of these parameters.
 *
 * * 400 Bad Request - Start date must be after . API only allows data to be pulled no older than 13 months from now.
 *
 * * 400 Bad Request - The maximum allowed date range is 1 months. API only allows data to be pulled for 1 month or less.
 *
 * * 429 TooManyRequests - Request is throttled. Retry after waiting for the time specified in the "retry-after" header.
 *
 * * 503 ServiceUnavailable - Service is temporarily unavailable. Retry after waiting for the time specified in the "Retry-After" header.
 */
export interface GenerateCostDetailsReportErrorResponse {
  /** The details of the error. */
  error?: ErrorDetails;
}

export function generateCostDetailsReportErrorResponseDeserializer(
  item: any,
): GenerateCostDetailsReportErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
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
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The cost allocation rule model definition */
export interface CostAllocationRuleDefinition extends ProxyResource {
  /** Cost allocation rule properties */
  properties?: CostAllocationRuleProperties;
}

export function costAllocationRuleDefinitionSerializer(item: CostAllocationRuleDefinition): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : costAllocationRulePropertiesSerializer(item["properties"]),
  };
}

export function costAllocationRuleDefinitionDeserializer(item: any): CostAllocationRuleDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : costAllocationRulePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a cost allocation rule */
export interface CostAllocationRuleProperties {
  /** Description of a cost allocation rule. */
  description?: string;
  /** Resource information for the cost allocation rule */
  details: CostAllocationRuleDetails;
  /** Status of the rule */
  status: RuleStatus;
  /** Time at which the rule was created. Rules that change cost for the same resource are applied in order of creation. */
  readonly createdDate?: Date;
  /** Time at which the rule was last updated. */
  readonly updatedDate?: Date;
}

export function costAllocationRulePropertiesSerializer(item: CostAllocationRuleProperties): any {
  return {
    description: item["description"],
    details: costAllocationRuleDetailsSerializer(item["details"]),
    status: item["status"],
  };
}

export function costAllocationRulePropertiesDeserializer(item: any): CostAllocationRuleProperties {
  return {
    description: item["description"],
    details: costAllocationRuleDetailsDeserializer(item["details"]),
    status: item["status"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
  };
}

/** Resource details of the cost allocation rule */
export interface CostAllocationRuleDetails {
  /** Source resources for cost allocation. At this time, this list can contain no more than one element. */
  sourceResources?: SourceCostAllocationResource[];
  /** Target resources for cost allocation. At this time, this list can contain no more than one element. */
  targetResources?: TargetCostAllocationResource[];
}

export function costAllocationRuleDetailsSerializer(item: CostAllocationRuleDetails): any {
  return {
    sourceResources: !item["sourceResources"]
      ? item["sourceResources"]
      : sourceCostAllocationResourceArraySerializer(item["sourceResources"]),
    targetResources: !item["targetResources"]
      ? item["targetResources"]
      : targetCostAllocationResourceArraySerializer(item["targetResources"]),
  };
}

export function costAllocationRuleDetailsDeserializer(item: any): CostAllocationRuleDetails {
  return {
    sourceResources: !item["sourceResources"]
      ? item["sourceResources"]
      : sourceCostAllocationResourceArrayDeserializer(item["sourceResources"]),
    targetResources: !item["targetResources"]
      ? item["targetResources"]
      : targetCostAllocationResourceArrayDeserializer(item["targetResources"]),
  };
}

export function sourceCostAllocationResourceArraySerializer(
  result: Array<SourceCostAllocationResource>,
): any[] {
  return result.map((item) => {
    return sourceCostAllocationResourceSerializer(item);
  });
}

export function sourceCostAllocationResourceArrayDeserializer(
  result: Array<SourceCostAllocationResource>,
): any[] {
  return result.map((item) => {
    return sourceCostAllocationResourceDeserializer(item);
  });
}

/** Source resources for cost allocation */
export interface SourceCostAllocationResource extends CostAllocationResource {
  /** Source Resources for cost allocation. This list cannot contain more than 25 values. */
  values: string[];
}

export function sourceCostAllocationResourceSerializer(item: SourceCostAllocationResource): any {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function sourceCostAllocationResourceDeserializer(item: any): SourceCostAllocationResource {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function targetCostAllocationResourceArraySerializer(
  result: Array<TargetCostAllocationResource>,
): any[] {
  return result.map((item) => {
    return targetCostAllocationResourceSerializer(item);
  });
}

export function targetCostAllocationResourceArrayDeserializer(
  result: Array<TargetCostAllocationResource>,
): any[] {
  return result.map((item) => {
    return targetCostAllocationResourceDeserializer(item);
  });
}

/** Target resources for cost allocation. */
export interface TargetCostAllocationResource extends CostAllocationResource {
  /** Target resources for cost allocation. This list cannot contain more than 25 values. */
  values: CostAllocationProportion[];
  /** Method of cost allocation for the rule */
  policyType: CostAllocationPolicyType;
}

export function targetCostAllocationResourceSerializer(item: TargetCostAllocationResource): any {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    values: costAllocationProportionArraySerializer(item["values"]),
    policyType: item["policyType"],
  };
}

export function targetCostAllocationResourceDeserializer(item: any): TargetCostAllocationResource {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    values: costAllocationProportionArrayDeserializer(item["values"]),
    policyType: item["policyType"],
  };
}

export function costAllocationProportionArraySerializer(
  result: Array<CostAllocationProportion>,
): any[] {
  return result.map((item) => {
    return costAllocationProportionSerializer(item);
  });
}

export function costAllocationProportionArrayDeserializer(
  result: Array<CostAllocationProportion>,
): any[] {
  return result.map((item) => {
    return costAllocationProportionDeserializer(item);
  });
}

/** Target resources and allocation */
export interface CostAllocationProportion {
  /** Target resource for cost allocation */
  name: string;
  /** Percentage of source cost to allocate to this resource. This value can be specified to two decimal places and the total percentage of all resources in this rule must sum to 100.00. */
  percentage: number;
}

export function costAllocationProportionSerializer(item: CostAllocationProportion): any {
  return { name: item["name"], percentage: item["percentage"] };
}

export function costAllocationProportionDeserializer(item: any): CostAllocationProportion {
  return {
    name: item["name"],
    percentage: item["percentage"],
  };
}

/** Method to use for allocating cost. FixedProportion indicates that cost will be split based on specified percentage values. */
export enum KnownCostAllocationPolicyType {
  /** FixedProportion */
  FixedProportion = "FixedProportion",
}

/**
 * Method to use for allocating cost. FixedProportion indicates that cost will be split based on specified percentage values. \
 * {@link KnownCostAllocationPolicyType} can be used interchangeably with CostAllocationPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FixedProportion**
 */
export type CostAllocationPolicyType = string;

/** Current status of the rule. */
export enum KnownRuleStatus {
  /** Rule is saved but not used to allocate costs. */
  NotActive = "NotActive",
  /** Rule is saved and impacting cost allocation. */
  Active = "Active",
  /** Rule is saved and cost allocation is being updated. Readonly value that cannot be submitted in a put request. */
  Processing = "Processing",
}

/**
 * Current status of the rule. \
 * {@link KnownRuleStatus} can be used interchangeably with RuleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotActive**: Rule is saved but not used to allocate costs. \
 * **Active**: Rule is saved and impacting cost allocation. \
 * **Processing**: Rule is saved and cost allocation is being updated. Readonly value that cannot be submitted in a put request.
 */
export type RuleStatus = string;

/** Common values for resources for cost allocation */
export interface CostAllocationResource {
  /** Type of resources contained in this cost allocation rule */
  resourceType: CostAllocationResourceType;
  /** If resource type is dimension, this must be either ResourceGroupName or SubscriptionId. If resource type is tag, this must be a valid Azure tag */
  name: string;
}

export function costAllocationResourceSerializer(item: CostAllocationResource): any {
  return { resourceType: item["resourceType"], name: item["name"] };
}

export function costAllocationResourceDeserializer(item: any): CostAllocationResource {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
  };
}

/** Category of resource to use for allocation. */
export enum KnownCostAllocationResourceType {
  /** Indicates an Azure dimension such as a subscription id or resource group name is being used for allocation. */
  Dimension = "Dimension",
  /** Allocates cost based on Azure Tag key value pairs. */
  Tag = "Tag",
}

/**
 * Category of resource to use for allocation. \
 * {@link KnownCostAllocationResourceType} can be used interchangeably with CostAllocationResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dimension**: Indicates an Azure dimension such as a subscription id or resource group name is being used for allocation. \
 * **Tag**: Allocates cost based on Azure Tag key value pairs.
 */
export type CostAllocationResourceType = string;

/** Result of listing cost allocation rules. It contains a list of available rules in the billing account or enterprise enrollment provided. */
export interface _CostAllocationRuleList {
  /** The list of cost allocation rules. */
  value?: CostAllocationRuleDefinition[];
  /** URL to get the next set of rule list results if there are any. */
  nextLink?: string;
}

export function _costAllocationRuleListDeserializer(item: any): _CostAllocationRuleList {
  return {
    value: !item["value"]
      ? item["value"]
      : costAllocationRuleDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function costAllocationRuleDefinitionArraySerializer(
  result: Array<CostAllocationRuleDefinition>,
): any[] {
  return result.map((item) => {
    return costAllocationRuleDefinitionSerializer(item);
  });
}

export function costAllocationRuleDefinitionArrayDeserializer(
  result: Array<CostAllocationRuleDefinition>,
): any[] {
  return result.map((item) => {
    return costAllocationRuleDefinitionDeserializer(item);
  });
}

/** The cost allocation rule check name availability request */
export interface CostAllocationRuleCheckNameAvailabilityRequest {
  /** Rule name */
  name?: string;
  /** Resource type. This is expected to be Microsoft.CostManagement/costAllocationRules */
  type?: string;
}

export function costAllocationRuleCheckNameAvailabilityRequestSerializer(
  item: CostAllocationRuleCheckNameAvailabilityRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The cost allocation rule check name availability response */
export interface CostAllocationRuleCheckNameAvailabilityResponse {
  /** Whether this rule name is available */
  nameAvailable?: boolean;
  /** The reason this name is not available */
  reason?: Reason;
  /** Error message if the name is not available */
  message?: string;
}

export function costAllocationRuleCheckNameAvailabilityResponseDeserializer(
  item: any,
): CostAllocationRuleCheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The reason this name is not available. */
export enum KnownReason {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
  /** Valid */
  Valid = "Valid",
}

/**
 * The reason this name is not available. \
 * {@link KnownReason} can be used interchangeably with Reason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AlreadyExists** \
 * **Valid**
 */
export type Reason = string;

/** Result of listing benefit recommendations. */
export interface _BenefitRecommendationsListResult {
  /** The list of benefit recommendations. */
  readonly value?: BenefitRecommendationModel[];
  /** The link (url) to the next page of results. */
  nextLink?: string;
}

export function _benefitRecommendationsListResultDeserializer(
  item: any,
): _BenefitRecommendationsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : benefitRecommendationModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function benefitRecommendationModelArrayDeserializer(
  result: Array<BenefitRecommendationModel>,
): any[] {
  return result.map((item) => {
    return benefitRecommendationModelDeserializer(item);
  });
}

/** benefit plan recommendation details. */
export interface BenefitRecommendationModel extends BenefitResource {
  /** The properties of the benefit recommendations. */
  properties?: BenefitRecommendationPropertiesUnion;
}

export function benefitRecommendationModelDeserializer(item: any): BenefitRecommendationModel {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : benefitRecommendationPropertiesUnionDeserializer(item["properties"]),
  };
}

/** The properties of the benefit recommendations. */
export interface BenefitRecommendationProperties {
  /** The first usage date used for looking back for computing the recommendations. */
  readonly firstConsumptionDate?: Date;
  /** The last usage date used for looking back for computing the recommendations. */
  readonly lastConsumptionDate?: Date;
  /** The number of days of usage evaluated for computing the recommendations. */
  lookBackPeriod?: LookBackPeriod;
  /** The total hours for which the cost is covered. Its equal to number of records in a property 'properties/usage/charges'. */
  readonly totalHours?: number;
  /** On-demand charges between firstConsumptionDate and lastConsumptionDate that were used for computing benefit recommendations. */
  usage?: RecommendationUsageDetails;
  /** ARM SKU name. 'Compute_Savings_Plan' for SavingsPlan. */
  readonly armSkuName?: string;
  /** Term period of the benefit. For example, P1Y or P3Y. */
  term?: Term;
  /** Grain of the proposed commitment amount. Supported values: 'Hourly' */
  commitmentGranularity?: Grain;
  /** An ISO 4217 currency code identifier for the costs and savings amounts. */
  readonly currencyCode?: string;
  /** The current cost without benefit, corresponds to 'totalHours' in the look-back period. */
  readonly costWithoutBenefit?: number;
  /** The details of the proposed recommendation. */
  recommendationDetails?: AllSavingsBenefitDetails;
  /** The list of all benefit recommendations with the recommendation details. */
  readonly allRecommendationDetails?: AllSavingsList;
  /** Benefit scope. For example, Single or Shared. */
  /** The discriminator possible values: Single, Shared */
  scope: Scope;
}

export function benefitRecommendationPropertiesDeserializer(
  item: any,
): BenefitRecommendationProperties {
  return {
    firstConsumptionDate: !item["firstConsumptionDate"]
      ? item["firstConsumptionDate"]
      : new Date(item["firstConsumptionDate"]),
    lastConsumptionDate: !item["lastConsumptionDate"]
      ? item["lastConsumptionDate"]
      : new Date(item["lastConsumptionDate"]),
    lookBackPeriod: item["lookBackPeriod"],
    totalHours: item["totalHours"],
    usage: !item["usage"] ? item["usage"] : recommendationUsageDetailsDeserializer(item["usage"]),
    armSkuName: item["armSkuName"],
    term: item["term"],
    commitmentGranularity: item["commitmentGranularity"],
    currencyCode: item["currencyCode"],
    costWithoutBenefit: item["costWithoutBenefit"],
    recommendationDetails: !item["recommendationDetails"]
      ? item["recommendationDetails"]
      : allSavingsBenefitDetailsDeserializer(item["recommendationDetails"]),
    allRecommendationDetails: !item["allRecommendationDetails"]
      ? item["allRecommendationDetails"]
      : allSavingsListDeserializer(item["allRecommendationDetails"]),
    scope: item["scope"],
  };
}

/** Alias for BenefitRecommendationPropertiesUnion */
export type BenefitRecommendationPropertiesUnion =
  | SingleScopeBenefitRecommendationProperties
  | SharedScopeBenefitRecommendationProperties
  | BenefitRecommendationProperties;

export function benefitRecommendationPropertiesUnionDeserializer(
  item: any,
): BenefitRecommendationPropertiesUnion {
  switch (item["scope"]) {
    case "Single":
      return singleScopeBenefitRecommendationPropertiesDeserializer(
        item as SingleScopeBenefitRecommendationProperties,
      );

    case "Shared":
      return sharedScopeBenefitRecommendationPropertiesDeserializer(
        item as SharedScopeBenefitRecommendationProperties,
      );

    default:
      return benefitRecommendationPropertiesDeserializer(item);
  }
}

/** The number of days used to look back. */
export enum KnownLookBackPeriod {
  /** 7 days used to look back. */
  Last7Days = "Last7Days",
  /** 30 days used to look back. */
  Last30Days = "Last30Days",
  /** 60 days used to look back. */
  Last60Days = "Last60Days",
}

/**
 * The number of days used to look back. \
 * {@link KnownLookBackPeriod} can be used interchangeably with LookBackPeriod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Last7Days**: 7 days used to look back. \
 * **Last30Days**: 30 days used to look back. \
 * **Last60Days**: 60 days used to look back.
 */
export type LookBackPeriod = string;

/** On-demand charges between firstConsumptionDate and lastConsumptionDate that were used for computing benefit recommendations. */
export interface RecommendationUsageDetails {
  /** The grain of the usage. Supported values: 'Hourly' */
  usageGrain?: Grain;
  /** On-demand charges for each hour between firstConsumptionDate and lastConsumptionDate that were used for computing benefit recommendations. */
  readonly charges?: number[];
}

export function recommendationUsageDetailsDeserializer(item: any): RecommendationUsageDetails {
  return {
    usageGrain: item["usageGrain"],
    charges: !item["charges"]
      ? item["charges"]
      : item["charges"].map((p: any) => {
          return p;
        }),
  };
}

/** Grain which corresponds to value. */
export enum KnownGrain {
  /** Hourly grain corresponds to value per hour. */
  Hourly = "Hourly",
  /** Hourly grain corresponds to value per day. */
  Daily = "Daily",
  /** Hourly grain corresponds to value per month. */
  Monthly = "Monthly",
}

/**
 * Grain which corresponds to value. \
 * {@link KnownGrain} can be used interchangeably with Grain,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hourly**: Hourly grain corresponds to value per hour. \
 * **Daily**: Hourly grain corresponds to value per day. \
 * **Monthly**: Hourly grain corresponds to value per month.
 */
export type Grain = string;

/** Grain which corresponds to value. */
export enum KnownTerm {
  /** Benefit term is 1 year. */
  P1Y = "P1Y",
  /** Benefit term is 3 years. */
  P3Y = "P3Y",
}

/**
 * Grain which corresponds to value. \
 * {@link KnownTerm} can be used interchangeably with Term,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1Y**: Benefit term is 1 year. \
 * **P3Y**: Benefit term is 3 years.
 */
export type Term = string;

/** Benefit recommendation details. */
export interface AllSavingsBenefitDetails {
  /** The difference between total cost and benefit cost for the 'totalHours' in the look-back period. */
  readonly overageCost?: number;
  /** The estimated cost with benefit for the 'totalHours' in the look-back period. It's equal to (commitmentAmount * totalHours) */
  readonly benefitCost?: number;
  /** Total cost, which is sum of benefit cost and overage cost. */
  readonly totalCost?: number;
  /** The amount saved for the 'totalHours' in the look-back period, by purchasing the recommended quantity of the benefit. */
  readonly savingsAmount?: number;
  /** The savings in percentage for the 'totalHours' in the look-back period, by purchasing the recommended quantity of benefit. */
  readonly savingsPercentage?: number;
  /** Estimated benefit coverage percentage for the 'totalHours' in the look-back period, with this commitment. */
  readonly coveragePercentage?: number;
  /** The commitment amount at the commitmentGranularity. */
  readonly commitmentAmount?: number;
  /** Estimated average utilization percentage for the 'totalHours' in the look-back period, with this commitment. */
  readonly averageUtilizationPercentage?: number;
  /** Estimated unused portion of the 'benefitCost'. */
  readonly wastageCost?: number;
}

export function allSavingsBenefitDetailsDeserializer(item: any): AllSavingsBenefitDetails {
  return {
    overageCost: item["overageCost"],
    benefitCost: item["benefitCost"],
    totalCost: item["totalCost"],
    savingsAmount: item["savingsAmount"],
    savingsPercentage: item["savingsPercentage"],
    coveragePercentage: item["coveragePercentage"],
    commitmentAmount: item["commitmentAmount"],
    averageUtilizationPercentage: item["averageUtilizationPercentage"],
    wastageCost: item["wastageCost"],
  };
}

/** The list of all benefit recommendations with the recommendation details. */
export interface AllSavingsList {
  /** The list of benefit recommendations with the recommendation details.. */
  readonly value?: AllSavingsBenefitDetails[];
  /** The link (URL) to the next page of results. */
  readonly nextLink?: string;
}

export function allSavingsListDeserializer(item: any): AllSavingsList {
  return {
    value: !item["value"]
      ? item["value"]
      : allSavingsBenefitDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function allSavingsBenefitDetailsArrayDeserializer(
  result: Array<AllSavingsBenefitDetails>,
): any[] {
  return result.map((item) => {
    return allSavingsBenefitDetailsDeserializer(item);
  });
}

/** Kind of the recommendation scope. */
export enum KnownScope {
  /** Single scope recommendation. */
  Single = "Single",
  /** Shared scope recommendation. */
  Shared = "Shared",
}

/**
 * Kind of the recommendation scope. \
 * {@link KnownScope} can be used interchangeably with Scope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Single**: Single scope recommendation. \
 * **Shared**: Shared scope recommendation.
 */
export type Scope = string;

/** The properties of the benefit recommendations when scope is 'Single'. */
export interface SingleScopeBenefitRecommendationProperties extends BenefitRecommendationProperties {
  /** The subscription ID that this single scope recommendation is for. Applicable only if recommendation is for 'Single' scope. */
  readonly subscriptionId?: string;
  /** The resource group that this single scope recommendation is for. Applicable only if recommendation is for 'Single' scope and 'ResourceGroup' request scope. */
  readonly resourceGroup?: string;
  /** Benefit scope. For example, Single or Shared. */
  scope: "Single";
}

export function singleScopeBenefitRecommendationPropertiesDeserializer(
  item: any,
): SingleScopeBenefitRecommendationProperties {
  return {
    firstConsumptionDate: !item["firstConsumptionDate"]
      ? item["firstConsumptionDate"]
      : new Date(item["firstConsumptionDate"]),
    lastConsumptionDate: !item["lastConsumptionDate"]
      ? item["lastConsumptionDate"]
      : new Date(item["lastConsumptionDate"]),
    lookBackPeriod: item["lookBackPeriod"],
    totalHours: item["totalHours"],
    usage: !item["usage"] ? item["usage"] : recommendationUsageDetailsDeserializer(item["usage"]),
    armSkuName: item["armSkuName"],
    term: item["term"],
    commitmentGranularity: item["commitmentGranularity"],
    currencyCode: item["currencyCode"],
    costWithoutBenefit: item["costWithoutBenefit"],
    recommendationDetails: !item["recommendationDetails"]
      ? item["recommendationDetails"]
      : allSavingsBenefitDetailsDeserializer(item["recommendationDetails"]),
    allRecommendationDetails: !item["allRecommendationDetails"]
      ? item["allRecommendationDetails"]
      : allSavingsListDeserializer(item["allRecommendationDetails"]),
    scope: item["scope"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

/** The properties of the benefit recommendation when scope is 'Shared'. */
export interface SharedScopeBenefitRecommendationProperties extends BenefitRecommendationProperties {
  /** Benefit scope. For example, Single or Shared. */
  scope: "Shared";
}

export function sharedScopeBenefitRecommendationPropertiesDeserializer(
  item: any,
): SharedScopeBenefitRecommendationProperties {
  return {
    firstConsumptionDate: !item["firstConsumptionDate"]
      ? item["firstConsumptionDate"]
      : new Date(item["firstConsumptionDate"]),
    lastConsumptionDate: !item["lastConsumptionDate"]
      ? item["lastConsumptionDate"]
      : new Date(item["lastConsumptionDate"]),
    lookBackPeriod: item["lookBackPeriod"],
    totalHours: item["totalHours"],
    usage: !item["usage"] ? item["usage"] : recommendationUsageDetailsDeserializer(item["usage"]),
    armSkuName: item["armSkuName"],
    term: item["term"],
    commitmentGranularity: item["commitmentGranularity"],
    currencyCode: item["currencyCode"],
    costWithoutBenefit: item["costWithoutBenefit"],
    recommendationDetails: !item["recommendationDetails"]
      ? item["recommendationDetails"]
      : allSavingsBenefitDetailsDeserializer(item["recommendationDetails"]),
    allRecommendationDetails: !item["allRecommendationDetails"]
      ? item["allRecommendationDetails"]
      : allSavingsListDeserializer(item["allRecommendationDetails"]),
    scope: item["scope"],
  };
}

/** The benefit resource model definition. */
export interface BenefitResource extends Resource {
  /** Reservation or SavingsPlan. */
  kind?: BenefitKind;
}

export function benefitResourceDeserializer(item: any): BenefitResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Kind/type of the benefit. */
export enum KnownBenefitKind {
  /** Benefit is IncludedQuantity. */
  IncludedQuantity = "IncludedQuantity",
  /** Benefit is Reservation. */
  Reservation = "Reservation",
  /** Benefit is SavingsPlan. */
  SavingsPlan = "SavingsPlan",
}

/**
 * Kind/type of the benefit. \
 * {@link KnownBenefitKind} can be used interchangeably with BenefitKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IncludedQuantity**: Benefit is IncludedQuantity. \
 * **Reservation**: Benefit is Reservation. \
 * **SavingsPlan**: Benefit is SavingsPlan.
 */
export type BenefitKind = string;

/** List of benefit utilization summaries. */
export interface _BenefitUtilizationSummariesListResult {
  /** The list of benefit utilization summaries. */
  readonly value?: BenefitUtilizationSummaryUnion[];
  /** The link (URL) to the next page of results. */
  nextLink?: string;
}

export function _benefitUtilizationSummariesListResultDeserializer(
  item: any,
): _BenefitUtilizationSummariesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : benefitUtilizationSummaryUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function benefitUtilizationSummaryUnionArrayDeserializer(
  result: Array<BenefitUtilizationSummaryUnion>,
): any[] {
  return result.map((item) => {
    return benefitUtilizationSummaryUnionDeserializer(item);
  });
}

/** Benefit utilization summary resource. */
export interface BenefitUtilizationSummary extends Resource {
  /** Supported values: 'SavingsPlan'. */
  /** The discriminator possible values: IncludedQuantity, SavingsPlan */
  kind: BenefitKind;
}

export function benefitUtilizationSummaryDeserializer(item: any): BenefitUtilizationSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for BenefitUtilizationSummaryUnion */
export type BenefitUtilizationSummaryUnion =
  | IncludedQuantityUtilizationSummary
  | SavingsPlanUtilizationSummary
  | BenefitUtilizationSummary;

export function benefitUtilizationSummaryUnionDeserializer(
  item: any,
): BenefitUtilizationSummaryUnion {
  switch (item["kind"]) {
    case "IncludedQuantity":
      return includedQuantityUtilizationSummaryDeserializer(
        item as IncludedQuantityUtilizationSummary,
      );

    case "SavingsPlan":
      return savingsPlanUtilizationSummaryDeserializer(item as SavingsPlanUtilizationSummary);

    default:
      return benefitUtilizationSummaryDeserializer(item);
  }
}

/** Included Quantity utilization summary resource. */
export interface IncludedQuantityUtilizationSummary extends BenefitUtilizationSummary {
  /** Supported values: 'SavingsPlan'. */
  kind: "IncludedQuantity";
  /** ARM SKU name. For example, 'Compute_Savings_Plan' for savings plan. */
  readonly armSkuName?: string;
  /** The benefit ID is the identifier of the benefit. */
  readonly benefitId?: string;
  /** The benefit order ID is the identifier for a benefit purchase. */
  readonly benefitOrderId?: string;
  /** The benefit type. Supported values: 'SavingsPlan'. */
  benefitType?: BenefitKind;
  /** Date corresponding to the utilization summary record. If the grain of data is monthly, value for this field will be first day of the month. */
  readonly usageDate?: Date;
  /** This is the utilized percentage for the benefit ID. */
  readonly utilizationPercentage?: number;
}

export function includedQuantityUtilizationSummaryDeserializer(
  item: any,
): IncludedQuantityUtilizationSummary {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _includedQuantityUtilizationSummaryPropertiesDeserializer(item["properties"])),
  };
}

/** Included Quantity utilization summary properties. */
export interface IncludedQuantityUtilizationSummaryProperties extends BenefitUtilizationSummaryProperties {
  /** This is the utilized percentage for the benefit ID. */
  readonly utilizationPercentage?: number;
}

export function includedQuantityUtilizationSummaryPropertiesDeserializer(
  item: any,
): IncludedQuantityUtilizationSummaryProperties {
  return {
    armSkuName: item["armSkuName"],
    benefitId: item["benefitId"],
    benefitOrderId: item["benefitOrderId"],
    benefitType: item["benefitType"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    utilizationPercentage: item["utilizationPercentage"],
  };
}

/** Savings plan utilization summary resource. */
export interface SavingsPlanUtilizationSummary extends BenefitUtilizationSummary {
  /** Supported values: 'SavingsPlan'. */
  kind: "SavingsPlan";
  /** ARM SKU name. For example, 'Compute_Savings_Plan' for savings plan. */
  readonly armSkuName?: string;
  /** The benefit ID is the identifier of the benefit. */
  readonly benefitId?: string;
  /** The benefit order ID is the identifier for a benefit purchase. */
  readonly benefitOrderId?: string;
  /** The benefit type. Supported values: 'SavingsPlan'. */
  benefitType?: BenefitKind;
  /** Date corresponding to the utilization summary record. If the grain of data is monthly, value for this field will be first day of the month. */
  readonly usageDate?: Date;
  /** This is the average hourly utilization for each date range that corresponds to given grain (Daily, Monthly). Suppose the API call is for usageDate > 2025-03-01 and usageDate < 2022-10-31 at a daily granularity. There will be one record per benefit id for each day. For a single day, the avgUtilizationPercentage value will be equal to the average of the set of values where the set contains 24 utilization percentage entries one for each hour in a specific day. */
  readonly avgUtilizationPercentage?: number;
  /** This is the minimum hourly utilization for each date range that corresponds to given grain (Daily, Monthly). Suppose the API call is for usageDate > 2025-03-01 and usageDate < 2022-10-31 at a daily granularity. There will be one record per benefit id for each day. For a single day, the minUtilizationPercentage value will be equal to the smallest in the set of values where the set contains 24 utilization percentage entries one for each hour in a specific day. If on the day 2022-10-18, the lowest utilization percentage was 10% at hour 4, then the value for the minUtilizationPercentage in the response will be 10%. */
  readonly minUtilizationPercentage?: number;
  /** This is the maximum hourly utilization for each date range that corresponds to given grain (Daily, Monthly). Suppose the API call is for usageDate > 2025-03-01 and usageDate < 2022-10-31 at a daily granularity. There will be one record per benefit id for each day. For a single day, the maxUtilizationPercentage value will be equal to the largest in the set of values where the set contains 24 utilization percentage entries one for each hour in a specific day. If on the day 2022-10-18, the largest utilization percentage was 90% at hour 5, then the value for the maxUtilizationPercentage in the response will be 90%. */
  readonly maxUtilizationPercentage?: number;
}

export function savingsPlanUtilizationSummaryDeserializer(
  item: any,
): SavingsPlanUtilizationSummary {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _savingsPlanUtilizationSummaryPropertiesDeserializer(item["properties"])),
  };
}

/** Savings plan utilization summary properties. */
export interface SavingsPlanUtilizationSummaryProperties extends BenefitUtilizationSummaryProperties {
  /** This is the average hourly utilization for each date range that corresponds to given grain (Daily, Monthly). Suppose the API call is for usageDate > 2025-03-01 and usageDate < 2022-10-31 at a daily granularity. There will be one record per benefit id for each day. For a single day, the avgUtilizationPercentage value will be equal to the average of the set of values where the set contains 24 utilization percentage entries one for each hour in a specific day. */
  readonly avgUtilizationPercentage?: number;
  /** This is the minimum hourly utilization for each date range that corresponds to given grain (Daily, Monthly). Suppose the API call is for usageDate > 2025-03-01 and usageDate < 2022-10-31 at a daily granularity. There will be one record per benefit id for each day. For a single day, the minUtilizationPercentage value will be equal to the smallest in the set of values where the set contains 24 utilization percentage entries one for each hour in a specific day. If on the day 2022-10-18, the lowest utilization percentage was 10% at hour 4, then the value for the minUtilizationPercentage in the response will be 10%. */
  readonly minUtilizationPercentage?: number;
  /** This is the maximum hourly utilization for each date range that corresponds to given grain (Daily, Monthly). Suppose the API call is for usageDate > 2025-03-01 and usageDate < 2022-10-31 at a daily granularity. There will be one record per benefit id for each day. For a single day, the maxUtilizationPercentage value will be equal to the largest in the set of values where the set contains 24 utilization percentage entries one for each hour in a specific day. If on the day 2022-10-18, the largest utilization percentage was 90% at hour 5, then the value for the maxUtilizationPercentage in the response will be 90%. */
  readonly maxUtilizationPercentage?: number;
}

export function savingsPlanUtilizationSummaryPropertiesDeserializer(
  item: any,
): SavingsPlanUtilizationSummaryProperties {
  return {
    armSkuName: item["armSkuName"],
    benefitId: item["benefitId"],
    benefitOrderId: item["benefitOrderId"],
    benefitType: item["benefitType"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    avgUtilizationPercentage: item["avgUtilizationPercentage"],
    minUtilizationPercentage: item["minUtilizationPercentage"],
    maxUtilizationPercentage: item["maxUtilizationPercentage"],
  };
}

/** The properties of a benefit utilization summary. */
export interface BenefitUtilizationSummaryProperties {
  /** ARM SKU name. For example, 'Compute_Savings_Plan' for savings plan. */
  readonly armSkuName?: string;
  /** The benefit ID is the identifier of the benefit. */
  readonly benefitId?: string;
  /** The benefit order ID is the identifier for a benefit purchase. */
  readonly benefitOrderId?: string;
  /** The benefit type. Supported values: 'SavingsPlan'. */
  benefitType?: BenefitKind;
  /** Date corresponding to the utilization summary record. If the grain of data is monthly, value for this field will be first day of the month. */
  readonly usageDate?: Date;
}

export function benefitUtilizationSummaryPropertiesDeserializer(
  item: any,
): BenefitUtilizationSummaryProperties {
  return {
    armSkuName: item["armSkuName"],
    benefitId: item["benefitId"],
    benefitOrderId: item["benefitOrderId"],
    benefitType: item["benefitType"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
  };
}

/** Properties of an async benefit utilization summaries request. */
export interface BenefitUtilizationSummariesRequest {
  /** Billing account the benefit utilization summaries report is for. Required for billing account and billing profile scopes. Not supported for any benefit scopes. */
  billingAccountId?: string;
  /** Billing profile id the benefit utilization summaries report is for. Required for billing profile scope. Not supported for billing account or any benefit scopes. */
  billingProfileId?: string;
  /** Benefit order id the benefit utilization summaries report is for. Required for benefit order and benefit id scopes. Not supported for any billing scopes. */
  benefitOrderId?: string;
  /** Benefit id the benefit utilization summaries report is for. Required for benefit id scope. Not supported for benefit order or any billing scopes. */
  benefitId?: string;
  /** The grain the summaries data is served at in the report. Accepted values are 'Daily' or 'Monthly'. */
  grain: Grain;
  /** The start date of the summaries data that will be served in the report. */
  startDate: Date;
  /** The end date of the summaries data that will be served in the report. */
  endDate: Date;
  /** The type of benefit data requested. Required for billing account and billing profile scopes. Implied and not to be passed at benefit scopes. Supported values are Reservation and SavingsPlan */
  kind?: BenefitKind;
}

export function benefitUtilizationSummariesRequestSerializer(
  item: BenefitUtilizationSummariesRequest,
): any {
  return {
    billingAccountId: item["billingAccountId"],
    billingProfileId: item["billingProfileId"],
    benefitOrderId: item["benefitOrderId"],
    benefitId: item["benefitId"],
    grain: item["grain"],
    startDate: item["startDate"].toISOString(),
    endDate: item["endDate"].toISOString(),
    kind: item["kind"],
  };
}

export function benefitUtilizationSummariesRequestDeserializer(
  item: any,
): BenefitUtilizationSummariesRequest {
  return {
    billingAccountId: item["billingAccountId"],
    billingProfileId: item["billingProfileId"],
    benefitOrderId: item["benefitOrderId"],
    benefitId: item["benefitId"],
    grain: item["grain"],
    startDate: new Date(item["startDate"]),
    endDate: new Date(item["endDate"]),
    kind: item["kind"],
  };
}

/** Status of a benefit utilization summaries report. Provides Async Benefit Utilization Summaries Request input, status, and report sas url. */
export interface BenefitUtilizationSummariesOperationStatus {
  /** Input given to create the benefit utilization summaries report. */
  input?: BenefitUtilizationSummariesRequest;
  /** The status of the creation of the benefit utilization summaries report. */
  status?: OperationStatusType;
  /** Contains sas url to the async benefit utilization summaries report and a date that the url is valid until. These values will be empty if the report is in a Running or Failed state */
  properties?: AsyncOperationStatusProperties;
}

export function benefitUtilizationSummariesOperationStatusDeserializer(
  item: any,
): BenefitUtilizationSummariesOperationStatus {
  return {
    input: !item["input"]
      ? item["input"]
      : benefitUtilizationSummariesRequestDeserializer(item["input"]),
    status: item["status"],
    properties: !item["properties"]
      ? item["properties"]
      : asyncOperationStatusPropertiesDeserializer(item["properties"]),
  };
}

/** Enum representing the status of an async operation. */
export enum KnownOperationStatusType {
  /** Running */
  Running = "Running",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
}

/**
 * Enum representing the status of an async operation. \
 * {@link KnownOperationStatusType} can be used interchangeably with OperationStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running** \
 * **Completed** \
 * **Failed**
 */
export type OperationStatusType = string;

/** Object representing the report url and valid until date of the async report generated. */
export interface AsyncOperationStatusProperties {
  /** Sas url to the async benefit utilization summaries report. Will be empty if the report is in Running or Failed state. */
  reportUrl?: BenefitUtilizationSummaryReportSchema;
  /** Sas url to async benefit utilization summaries report in secondary storage in case of primary outage. Will be empty if the report is in Running or Failed state. */
  secondaryReportUrl?: BenefitUtilizationSummaryReportSchema;
  /** The date that the sas url provided in reportUrl expires. */
  validUntil?: Date;
}

export function asyncOperationStatusPropertiesDeserializer(
  item: any,
): AsyncOperationStatusProperties {
  return {
    reportUrl: item["reportUrl"],
    secondaryReportUrl: item["secondaryReportUrl"],
    validUntil: !item["validUntil"] ? item["validUntil"] : new Date(item["validUntil"]),
  };
}

/** The CSV file from the reportUrl and secondaryReportUrl blob link will consist of the following columns of benefit utilization data. UtilizedPercentage will be 0 for savings plans reports and non data bricks reservations. Utilization percentages will be 0 for data bricks reservations. */
export enum KnownBenefitUtilizationSummaryReportSchema {
  /** Kind */
  Kind = "Kind",
  /** AvgUtilizationPercentage */
  AvgUtilizationPercentage = "AvgUtilizationPercentage",
  /** BenefitOrderId */
  BenefitOrderId = "BenefitOrderId",
  /** BenefitId */
  BenefitId = "BenefitId",
  /** BenefitType */
  BenefitType = "BenefitType",
  /** MaxUtilizationPercentage */
  MaxUtilizationPercentage = "MaxUtilizationPercentage",
  /** MinUtilizationPercentage */
  MinUtilizationPercentage = "MinUtilizationPercentage",
  /** UsageDate */
  UsageDate = "UsageDate",
  /** UtilizedPercentage */
  UtilizedPercentage = "UtilizedPercentage",
}

/**
 * The CSV file from the reportUrl and secondaryReportUrl blob link will consist of the following columns of benefit utilization data. UtilizedPercentage will be 0 for savings plans reports and non data bricks reservations. Utilization percentages will be 0 for data bricks reservations. \
 * {@link KnownBenefitUtilizationSummaryReportSchema} can be used interchangeably with BenefitUtilizationSummaryReportSchema,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Kind** \
 * **AvgUtilizationPercentage** \
 * **BenefitOrderId** \
 * **BenefitId** \
 * **BenefitType** \
 * **MaxUtilizationPercentage** \
 * **MinUtilizationPercentage** \
 * **UsageDate** \
 * **UtilizedPercentage**
 */
export type BenefitUtilizationSummaryReportSchema = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ArmErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function armErrorResponseDeserializer(item: any): ArmErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The definition of a cost detailed report. */
export interface GenerateDetailedCostReportDefinition {
  /** The type of the detailed report. By default ActualCost is provided */
  metric?: GenerateDetailedCostReportMetricType;
  /** Has time period for pulling data for the cost detailed report. Can only have one of either timePeriod or invoiceId or billingPeriod parameters. If none provided current month cost is provided. */
  timePeriod?: GenerateDetailedCostReportTimePeriod;
  /** Billing period in YearMonth(e.g. 202008) format. Only for legacy enterprise customers can use this. Can only have one of either timePeriod or invoiceId or billingPeriod parameters. If none provided current month cost is provided. */
  billingPeriod?: string;
  /** Invoice ID for Pay-as-you-go and Microsoft Customer Agreement scopes. Can only have one of either timePeriod or invoiceId or billingPeriod parameters. If none provided current month cost is provided. */
  invoiceId?: string;
  /** Customer ID for Microsoft Customer Agreement scopes (Invoice Id is also required for this). */
  customerId?: string;
}

export function generateDetailedCostReportDefinitionSerializer(
  item: GenerateDetailedCostReportDefinition,
): any {
  return {
    metric: item["metric"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : generateDetailedCostReportTimePeriodSerializer(item["timePeriod"]),
    billingPeriod: item["billingPeriod"],
    invoiceId: item["invoiceId"],
    customerId: item["customerId"],
  };
}

/** The type of the detailed report. By default ActualCost is provided */
export enum KnownGenerateDetailedCostReportMetricType {
  /** ActualCost */
  ActualCost = "ActualCost",
  /** AmortizedCost */
  AmortizedCost = "AmortizedCost",
}

/**
 * The type of the detailed report. By default ActualCost is provided \
 * {@link KnownGenerateDetailedCostReportMetricType} can be used interchangeably with GenerateDetailedCostReportMetricType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActualCost** \
 * **AmortizedCost**
 */
export type GenerateDetailedCostReportMetricType = string;

/** The start and end date for pulling data for the cost detailed report. */
export interface GenerateDetailedCostReportTimePeriod {
  /** The start date to pull data from. example format 2020-03-15 */
  start: string;
  /** The end date to pull data to. example format 2020-03-15 */
  end: string;
}

export function generateDetailedCostReportTimePeriodSerializer(
  item: GenerateDetailedCostReportTimePeriod,
): any {
  return { start: item["start"], end: item["end"] };
}

/**
 * Error response indicates that the service is not able to process the incoming request. The reason is provided in the error message.
 *
 * Some Error responses:
 *
 * * 413 Request Entity Too Large - Request is throttled. The amount of data required to fulfill the request exceeds the maximum size permitted of 2Gb. Please utilize our Exports feature instead.
 *
 * * 429 TooManyRequests - Request is throttled. Retry after waiting for the time specified in the "x-ms-ratelimit-microsoft.consumption-retry-after" header.
 *
 * * 503 ServiceUnavailable - Service is temporarily unavailable. Retry after waiting for the time specified in the "Retry-After" header.
 */
export interface GenerateDetailedCostReportErrorResponse {
  /** The details of the error. */
  error?: ErrorDetails;
}

export function generateDetailedCostReportErrorResponseDeserializer(
  item: any,
): GenerateDetailedCostReportErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

/** The definition of a forecast. */
export interface ForecastDefinition {
  /** The type of the forecast. */
  type: ForecastType;
  /** The time frame for pulling data for the forecast. If custom, then a specific time period must be provided. */
  timeframe: ForecastTimeframe;
  /** Has time period for pulling data for the forecast. */
  timePeriod?: ForecastTimePeriod;
  /** Has definition for data in this forecast. */
  dataset: ForecastDataset;
  /** A boolean determining if actualCost will be included. */
  includeActualCost?: boolean;
  /** A boolean determining if FreshPartialCost will be included. */
  includeFreshPartialCost?: boolean;
}

export function forecastDefinitionSerializer(item: ForecastDefinition): any {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : forecastTimePeriodSerializer(item["timePeriod"]),
    dataset: forecastDatasetSerializer(item["dataset"]),
    includeActualCost: item["includeActualCost"],
    includeFreshPartialCost: item["includeFreshPartialCost"],
  };
}

/** The type of the forecast. */
export enum KnownForecastType {
  /** Usage */
  Usage = "Usage",
  /** ActualCost */
  ActualCost = "ActualCost",
  /** AmortizedCost */
  AmortizedCost = "AmortizedCost",
}

/**
 * The type of the forecast. \
 * {@link KnownForecastType} can be used interchangeably with ForecastType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Usage** \
 * **ActualCost** \
 * **AmortizedCost**
 */
export type ForecastType = string;

/** The time frame for pulling data for the forecast. */
export enum KnownForecastTimeframe {
  /** Custom */
  Custom = "Custom",
}

/**
 * The time frame for pulling data for the forecast. \
 * {@link KnownForecastTimeframe} can be used interchangeably with ForecastTimeframe,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Custom**
 */
export type ForecastTimeframe = string;

/** Has time period for pulling data for the forecast. */
export interface ForecastTimePeriod {
  /** The start date to pull data from. */
  from: Date;
  /** The end date to pull data to. */
  to: Date;
}

export function forecastTimePeriodSerializer(item: ForecastTimePeriod): any {
  return { from: item["from"].toISOString(), to: item["to"].toISOString() };
}

/** The definition of data present in the forecast. */
export interface ForecastDataset {
  /** The granularity of rows in the forecast. */
  granularity?: GranularityType;
  /** Has configuration information for the data in the export. The configuration will be ignored if aggregation and grouping are provided. */
  configuration?: ForecastDatasetConfiguration;
  /** Dictionary of aggregation expression to use in the forecast. The key of each item in the dictionary is the alias for the aggregated column. forecast can have up to 2 aggregation clauses. */
  aggregation: Record<string, ForecastAggregation>;
  /** Has filter expression to use in the forecast. */
  filter?: ForecastFilter;
}

export function forecastDatasetSerializer(item: ForecastDataset): any {
  return {
    granularity: item["granularity"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : forecastDatasetConfigurationSerializer(item["configuration"]),
    aggregation: forecastAggregationRecordSerializer(item["aggregation"]),
    filter: !item["filter"] ? item["filter"] : forecastFilterSerializer(item["filter"]),
  };
}

/** The configuration of dataset in the forecast. */
export interface ForecastDatasetConfiguration {
  /** Array of column names to be included in the forecast. Any valid forecast column name is allowed. If not provided, then forecast includes all columns. */
  columns?: string[];
}

export function forecastDatasetConfigurationSerializer(item: ForecastDatasetConfiguration): any {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : item["columns"].map((p: any) => {
          return p;
        }),
  };
}

export function forecastAggregationRecordSerializer(
  item: Record<string, ForecastAggregation>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : forecastAggregationSerializer(item[key]);
  });
  return result;
}

/** The aggregation expression to be used in the forecast. */
export interface ForecastAggregation {
  /** The name of the column to aggregate. */
  name: FunctionName;
  /** The name of the aggregation function to use. */
  function: FunctionType;
}

export function forecastAggregationSerializer(item: ForecastAggregation): any {
  return { name: item["name"], function: item["function"] };
}

/** The name of the column to aggregate. */
export enum KnownFunctionName {
  /** PreTaxCostUSD */
  PreTaxCostUSD = "PreTaxCostUSD",
  /** Cost */
  Cost = "Cost",
  /** CostUSD */
  CostUSD = "CostUSD",
  /** PreTaxCost */
  PreTaxCost = "PreTaxCost",
}

/**
 * The name of the column to aggregate. \
 * {@link KnownFunctionName} can be used interchangeably with FunctionName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PreTaxCostUSD** \
 * **Cost** \
 * **CostUSD** \
 * **PreTaxCost**
 */
export type FunctionName = string;

/** The filter expression to be used in the export. */
export interface ForecastFilter {
  /** The logical "AND" expression. Must have at least 2 items. */
  and?: ForecastFilter[];
  /** The logical "OR" expression. Must have at least 2 items. */
  or?: ForecastFilter[];
  /** Has comparison expression for a dimension */
  dimensions?: ForecastComparisonExpression;
  /** Has comparison expression for a tag */
  tags?: ForecastComparisonExpression;
}

export function forecastFilterSerializer(item: ForecastFilter): any {
  return {
    and: !item["and"] ? item["and"] : forecastFilterArraySerializer(item["and"]),
    or: !item["or"] ? item["or"] : forecastFilterArraySerializer(item["or"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : forecastComparisonExpressionSerializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : forecastComparisonExpressionSerializer(item["tags"]),
  };
}

export function forecastFilterArraySerializer(result: Array<ForecastFilter>): any[] {
  return result.map((item) => {
    return forecastFilterSerializer(item);
  });
}

/** The comparison expression to be used in the forecast. */
export interface ForecastComparisonExpression {
  /** The name of the column to use in comparison. */
  name: string;
  /** The operator to use for comparison. */
  operator: ForecastOperatorType;
  /** Array of values to use for comparison */
  values: string[];
}

export function forecastComparisonExpressionSerializer(item: ForecastComparisonExpression): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** The operator to use for comparison. */
export enum KnownForecastOperatorType {
  /** In */
  In = "In",
}

/**
 * The operator to use for comparison. \
 * {@link KnownForecastOperatorType} can be used interchangeably with ForecastOperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In**
 */
export type ForecastOperatorType = string;

/** Result of forecast. It contains all columns listed under groupings and aggregation. */
export interface ForecastResult extends CostManagementResource {
  /** The link (url) to the next page of results. */
  nextLink?: string;
  /** Array of columns */
  columns?: ForecastColumn[];
  /** Array of rows */
  rows?: any[][];
}

export function forecastResultDeserializer(item: any): ForecastResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    sku: item["sku"],
    eTag: item["eTag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _forecastResultPropertiesDeserializer(item["properties"])),
  };
}

/** Forecast properties */
export interface ForecastProperties {
  /** The link (url) to the next page of results. */
  nextLink?: string;
  /** Array of columns */
  columns?: ForecastColumn[];
  /** Array of rows */
  rows?: any[][];
}

export function forecastPropertiesDeserializer(item: any): ForecastProperties {
  return {
    nextLink: item["nextLink"],
    columns: !item["columns"] ? item["columns"] : forecastColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function forecastColumnArrayDeserializer(result: Array<ForecastColumn>): any[] {
  return result.map((item) => {
    return forecastColumnDeserializer(item);
  });
}

/** Forecast column properties */
export interface ForecastColumn {
  /** The name of column. */
  name?: string;
  /** The type of column. */
  type?: string;
}

export function forecastColumnDeserializer(item: any): ForecastColumn {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The Resource model definition. */
export interface CostManagementResource {
  /** Resource Id. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Location of the resource. */
  readonly location?: string;
  /** SKU of the resource. */
  readonly sku?: string;
  /** ETag of the resource. */
  readonly eTag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
}

export function costManagementResourceDeserializer(item: any): CostManagementResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    sku: item["sku"],
    eTag: item["eTag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Result of listing dimensions. It contains a list of available dimensions. */
export interface _DimensionsListResult {
  /** The list of dimensions. */
  readonly value?: Dimension[];
  /** The link (url) to the next page of results. */
  nextLink?: string;
}

export function _dimensionsListResultDeserializer(item: any): _DimensionsListResult {
  return {
    value: !item["value"] ? item["value"] : dimensionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/** List of Dimension. */
export interface Dimension extends CostManagementResource {
  /** Dimension description. */
  readonly description?: string;
  /** Filter enabled. */
  readonly filterEnabled?: boolean;
  /** Grouping enabled. */
  readonly groupingEnabled?: boolean;
  /** Dimension data. */
  data?: string[];
  /** Total number of data for the dimension. */
  readonly total?: number;
  /** Dimension category. */
  readonly category?: string;
  /** Usage start. */
  readonly usageStart?: Date;
  /** Usage end. */
  readonly usageEnd?: Date;
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    sku: item["sku"],
    eTag: item["eTag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _dimensionPropertiesDeserializer(item["properties"])),
  };
}

/** Dimension properties. */
export interface DimensionProperties {
  /** Dimension description. */
  readonly description?: string;
  /** Filter enabled. */
  readonly filterEnabled?: boolean;
  /** Grouping enabled. */
  readonly groupingEnabled?: boolean;
  /** Dimension data. */
  data?: string[];
  /** Total number of data for the dimension. */
  readonly total?: number;
  /** Dimension category. */
  readonly category?: string;
  /** Usage start. */
  readonly usageStart?: Date;
  /** Usage end. */
  readonly usageEnd?: Date;
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function dimensionPropertiesDeserializer(item: any): DimensionProperties {
  return {
    description: item["description"],
    filterEnabled: item["filterEnabled"],
    groupingEnabled: item["groupingEnabled"],
    data: !item["data"]
      ? item["data"]
      : item["data"].map((p: any) => {
          return p;
        }),
    total: item["total"],
    category: item["category"],
    usageStart: !item["usageStart"] ? item["usageStart"] : new Date(item["usageStart"]),
    usageEnd: !item["usageEnd"] ? item["usageEnd"] : new Date(item["usageEnd"]),
    nextLink: item["nextLink"],
  };
}

/** The definition of a query. */
export interface QueryDefinition {
  /** The type of the query. */
  type: ExportType;
  /** The time frame for pulling data for the query. If custom, then a specific time period must be provided. */
  timeframe: TimeframeType;
  /** Has time period for pulling data for the query. */
  timePeriod?: QueryTimePeriod;
  /** Has definition for data in this query. */
  dataset: QueryDataset;
}

export function queryDefinitionSerializer(item: QueryDefinition): any {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : queryTimePeriodSerializer(item["timePeriod"]),
    dataset: queryDatasetSerializer(item["dataset"]),
  };
}

/** The start and end date for pulling data for the query. */
export interface QueryTimePeriod {
  /** The start date to pull data from. */
  from: Date;
  /** The end date to pull data to. */
  to: Date;
}

export function queryTimePeriodSerializer(item: QueryTimePeriod): any {
  return { from: item["from"].toISOString(), to: item["to"].toISOString() };
}

/** The definition of data present in the query. */
export interface QueryDataset {
  /** The granularity of rows in the query. */
  granularity?: GranularityType;
  /** Has configuration information for the data in the export. The configuration will be ignored if aggregation and grouping are provided. */
  configuration?: QueryDatasetConfiguration;
  /** Dictionary of aggregation expression to use in the query. The key of each item in the dictionary is the alias for the aggregated column. Query can have up to 2 aggregation clauses. */
  aggregation?: Record<string, QueryAggregation>;
  /** Array of group by expression to use in the query. Query can have up to 2 group by clauses. */
  grouping?: QueryGrouping[];
  /** The filter expression to use in the query. Please reference our Query API REST documentation for how to properly format the filter. */
  filter?: QueryFilter;
}

export function queryDatasetSerializer(item: QueryDataset): any {
  return {
    granularity: item["granularity"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : queryDatasetConfigurationSerializer(item["configuration"]),
    aggregation: !item["aggregation"]
      ? item["aggregation"]
      : queryAggregationRecordSerializer(item["aggregation"]),
    grouping: !item["grouping"] ? item["grouping"] : queryGroupingArraySerializer(item["grouping"]),
    filter: !item["filter"] ? item["filter"] : queryFilterSerializer(item["filter"]),
  };
}

/** The configuration of dataset in the query. */
export interface QueryDatasetConfiguration {
  /** Array of column names to be included in the query. Any valid query column name is allowed. If not provided, then query includes all columns. */
  columns?: string[];
}

export function queryDatasetConfigurationSerializer(item: QueryDatasetConfiguration): any {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : item["columns"].map((p: any) => {
          return p;
        }),
  };
}

export function queryAggregationRecordSerializer(
  item: Record<string, QueryAggregation>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : queryAggregationSerializer(item[key]);
  });
  return result;
}

/** The aggregation expression to be used in the query. */
export interface QueryAggregation {
  /** The name of the column to aggregate. */
  name: string;
  /** The name of the aggregation function to use. */
  function: FunctionType;
}

export function queryAggregationSerializer(item: QueryAggregation): any {
  return { name: item["name"], function: item["function"] };
}

export function queryGroupingArraySerializer(result: Array<QueryGrouping>): any[] {
  return result.map((item) => {
    return queryGroupingSerializer(item);
  });
}

/** The group by expression to be used in the query. */
export interface QueryGrouping {
  /** Has type of the column to group. */
  type: QueryColumnType;
  /** The name of the column to group. */
  name: string;
}

export function queryGroupingSerializer(item: QueryGrouping): any {
  return { type: item["type"], name: item["name"] };
}

/** The filter expression to be used in the export. */
export interface QueryFilter {
  /** The logical "AND" expression. Must have at least 2 items. */
  and?: QueryFilter[];
  /** The logical "OR" expression. Must have at least 2 items. */
  or?: QueryFilter[];
  /** Has comparison expression for a dimension */
  dimensions?: QueryComparisonExpression;
  /** Has comparison expression for a tag */
  tags?: QueryComparisonExpression;
}

export function queryFilterSerializer(item: QueryFilter): any {
  return {
    and: !item["and"] ? item["and"] : queryFilterArraySerializer(item["and"]),
    or: !item["or"] ? item["or"] : queryFilterArraySerializer(item["or"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : queryComparisonExpressionSerializer(item["dimensions"]),
    tags: !item["tags"] ? item["tags"] : queryComparisonExpressionSerializer(item["tags"]),
  };
}

export function queryFilterArraySerializer(result: Array<QueryFilter>): any[] {
  return result.map((item) => {
    return queryFilterSerializer(item);
  });
}

/** The comparison expression to be used in the query. */
export interface QueryComparisonExpression {
  /** The name of the column to use in comparison. */
  name: string;
  /** The operator to use for comparison. */
  operator: QueryOperatorType;
  /** Array of values to use for comparison */
  values: string[];
}

export function queryComparisonExpressionSerializer(item: QueryComparisonExpression): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** The operator to use for comparison. */
export enum KnownQueryOperatorType {
  /** In */
  In = "In",
}

/**
 * The operator to use for comparison. \
 * {@link KnownQueryOperatorType} can be used interchangeably with QueryOperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In**
 */
export type QueryOperatorType = string;

/** Result of query. It contains all columns listed under groupings and aggregation. */
export interface QueryResult extends CostManagementResource {
  /** The link (url) to the next page of results. */
  nextLink?: string;
  /** Array of columns */
  columns?: QueryColumn[];
  /** Array of rows */
  rows?: any[][];
}

export function queryResultDeserializer(item: any): QueryResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    sku: item["sku"],
    eTag: item["eTag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _queryResultPropertiesDeserializer(item["properties"])),
  };
}

/** Query properties */
export interface QueryProperties {
  /** The link (url) to the next page of results. */
  nextLink?: string;
  /** Array of columns */
  columns?: QueryColumn[];
  /** Array of rows */
  rows?: any[][];
}

export function queryPropertiesDeserializer(item: any): QueryProperties {
  return {
    nextLink: item["nextLink"],
    columns: !item["columns"] ? item["columns"] : queryColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function queryColumnArrayDeserializer(result: Array<QueryColumn>): any[] {
  return result.map((item) => {
    return queryColumnDeserializer(item);
  });
}

/** QueryColumn properties */
export interface QueryColumn {
  /** The name of column. */
  name?: string;
  /** The type of column. */
  type?: string;
}

export function queryColumnDeserializer(item: any): QueryColumn {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The status of the long running operation. */
export interface OperationStatus {
  /** The status of the long running operation. */
  status?: OperationStatusType;
  /** The CSV file from the reportUrl blob link consists of reservation usage data with the following schema at daily granularity */
  reportUrl?: ReservationReportSchema;
  /** The time at which report URL becomes invalid. */
  validUntil?: Date;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    status: item["status"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationStatusPropertiesDeserializer(item["properties"])),
  };
}

/** The URL to download the generated report. */
export interface ReportURL {
  /** The CSV file from the reportUrl blob link consists of reservation usage data with the following schema at daily granularity */
  reportUrl?: ReservationReportSchema;
  /** The time at which report URL becomes invalid. */
  validUntil?: Date;
}

export function reportURLDeserializer(item: any): ReportURL {
  return {
    reportUrl: item["reportUrl"],
    validUntil: !item["validUntil"] ? item["validUntil"] : new Date(item["validUntil"]),
  };
}

/** The CSV file from the reportUrl blob link consists of reservation usage data with the following schema at daily granularity */
export enum KnownReservationReportSchema {
  /** InstanceFlexibilityGroup */
  InstanceFlexibilityGroup = "InstanceFlexibilityGroup",
  /** InstanceFlexibilityRatio */
  InstanceFlexibilityRatio = "InstanceFlexibilityRatio",
  /** InstanceId */
  InstanceId = "InstanceId",
  /** Kind */
  Kind = "Kind",
  /** ReservationId */
  ReservationId = "ReservationId",
  /** ReservationOrderId */
  ReservationOrderId = "ReservationOrderId",
  /** ReservedHours */
  ReservedHours = "ReservedHours",
  /** SkuName */
  SkuName = "SkuName",
  /** TotalReservedQuantity */
  TotalReservedQuantity = "TotalReservedQuantity",
  /** UsageDate */
  UsageDate = "UsageDate",
  /** UsedHours */
  UsedHours = "UsedHours",
}

/**
 * The CSV file from the reportUrl blob link consists of reservation usage data with the following schema at daily granularity \
 * {@link KnownReservationReportSchema} can be used interchangeably with ReservationReportSchema,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InstanceFlexibilityGroup** \
 * **InstanceFlexibilityRatio** \
 * **InstanceId** \
 * **Kind** \
 * **ReservationId** \
 * **ReservationOrderId** \
 * **ReservedHours** \
 * **SkuName** \
 * **TotalReservedQuantity** \
 * **UsageDate** \
 * **UsedHours**
 */
export type ReservationReportSchema = string;

/** The URL to download the generated report. */
export interface PricesheetDownloadProperties {
  /** The time at which report URL becomes invalid/expires in UTC e.g. 2020-12-08T05:55:59.4394737Z. */
  readonly expiryTime?: Date;
  /** The URL to download the generated report. */
  downloadUrl?: string;
  /** The properties in downloaded file */
  downloadFileProperties?: MCAPriceSheetProperties;
}

export function pricesheetDownloadPropertiesDeserializer(item: any): PricesheetDownloadProperties {
  return {
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    downloadUrl: item["downloadUrl"],
    downloadFileProperties: !item["downloadFileProperties"]
      ? item["downloadFileProperties"]
      : mcaPriceSheetPropertiesDeserializer(item["downloadFileProperties"]),
  };
}

/** The properties of the price sheet. */
export interface MCAPriceSheetProperties {
  /** Unique identifier for the billing account. */
  readonly billingAccountID?: string;
  /** Name of the billing profile that is set up to receive invoices. The prices in the price sheet are associated with this billing profile. */
  readonly billingAccountName?: string;
  /** Unique identifier for the billing profile. */
  readonly billingProfileId?: string;
  /** Name of the billing profile that is set up to receive invoices. The prices in the price sheet are associated with this billing profile. */
  readonly billingProfileName?: string;
  /**
   * Name of the purchased product plan. Indicates if this pricing is standard Azure Plan pricing, Dev/Test pricing etc.
   *
   * Currently unavailable for Azure 3rd party and ReservedInstance meters.
   */
  readonly productOrderName?: string;
  /** Type of Azure service. For example, Compute, Analytics, and Security. */
  readonly serviceFamily?: number;
  /** Name of the product accruing the charges. */
  readonly product?: string;
  /** Unique identifier for the product whose meter is consumed. */
  readonly productId?: string;
  /** Unique identifier of the SKU */
  readonly skuId?: string;
  /** How usage is measured for the service */
  readonly unitOfMeasure?: string;
  /** Unique identifier of the meter */
  readonly meterId?: string;
  /** Name of the meter. The meter represents the deployable resource of an Azure service. */
  readonly meterName?: string;
  /** Name of the meter type */
  readonly meterType?: string;
  /** Name of the classification category for the meter. For example, Cloud services, Networking, etc. */
  readonly meterCategory?: string;
  /** Name of the meter subclassification category. */
  readonly meterSubCategory?: string;
  /** Name of the Azure region where the meter for the service is available. */
  readonly meterRegion?: string;
  /** Defines the lower bound of the tier range for which prices are defined. For example, if the range is 0 to 100, tierMinimumUnits would be 0. */
  readonly tierMinimumUnits?: string;
  /** Effective start date of the Price Sheet billing period */
  readonly effectiveStartDate?: Date;
  /** Effective end date of the Price Sheet billing period */
  readonly effectiveEndDate?: Date;
  /**
   * The per-unit price at the time of billing for a given product or service, inclusive of any negotiated discounts on top of the market price.
   *
   * For PriceType ReservedInstance, unit price reflects the total cost of the 1 or 3-year commitment including discounts.
   *
   * Note: The unit price isn't the same as the effective price in usage details downloads when services have differential prices across tiers.
   *
   * If services have multi-tiered pricing, the effective price is a blended rate across the tiers and doesn't show a tier-specific unit price. The blended price or effective price is the net price for the consumed quantity spanning across the multiple tiers (where each tier has a specific unit price).
   */
  readonly unitPrice?: string;
  /**
   * The unit price at the time the customer signs on or the unit price at the time of service meter GA launch if it is after sign-on.
   *
   * This is applicable for Enterprise Agreement users
   */
  readonly basePrice?: string;
  /**
   * The current list price for a given product or service. This price is without any negotiations and is based on your Microsoft Agreement type.
   *
   * For PriceType Consumption, market price is reflected as the pay-as-you-go price.
   *
   * For PriceType Savings Plan, market price reflects the Savings plan benefit on top of pay-as-you-go price for the corresponding commitment term.
   *
   * For PriceType ReservedInstance, market price reflects the total price of the 1 or 3-year commitment.
   */
  readonly marketPrice?: string;
  /** Currency in which all the prices are reflected. */
  readonly currency?: string;
  /** Currency in which charges are posted. */
  readonly billingCurrency?: string;
  /** Term length for Azure Savings Plan or Reservation term – one year or three years (P1Y or P3Y) */
  readonly term?: string;
  /** Price type for a product. For example, an Azure resource with a pay-as-you-go rate with priceType as Consumption. Other price types include ReservedInstance and Savings Plan. */
  readonly priceType?: string;
}

export function mcaPriceSheetPropertiesDeserializer(item: any): MCAPriceSheetProperties {
  return {
    billingAccountID: item["billingAccountID"],
    billingAccountName: item["billingAccountName"],
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    productOrderName: item["productOrderName"],
    serviceFamily: item["serviceFamily"],
    product: item["product"],
    productId: item["productId"],
    skuId: item["skuId"],
    unitOfMeasure: item["unitOfMeasure"],
    meterId: item["meterId"],
    meterName: item["meterName"],
    meterType: item["meterType"],
    meterCategory: item["meterCategory"],
    meterSubCategory: item["meterSubCategory"],
    meterRegion: item["meterRegion"],
    tierMinimumUnits: item["tierMinimumUnits"],
    effectiveStartDate: !item["effectiveStartDate"]
      ? item["effectiveStartDate"]
      : new Date(item["effectiveStartDate"]),
    effectiveEndDate: !item["effectiveEndDate"]
      ? item["effectiveEndDate"]
      : new Date(item["effectiveEndDate"]),
    unitPrice: item["unitPrice"],
    basePrice: item["basePrice"],
    marketPrice: item["marketPrice"],
    currency: item["currency"],
    billingCurrency: item["billingCurrency"],
    term: item["term"],
    priceType: item["priceType"],
  };
}

/** Known values of {@link ExternalCloudProviderType} that the service accepts. */
export enum KnownExternalCloudProviderType {
  /** externalSubscriptions */
  ExternalSubscriptions = "externalSubscriptions",
  /** externalBillingAccounts */
  ExternalBillingAccounts = "externalBillingAccounts",
}

/** Type of ExternalCloudProviderType */
export type ExternalCloudProviderType = string;

/** Known values of {@link GrainParameter} that the service accepts. */
export enum KnownGrainParameter {
  /** Hourly grain corresponds to value per hour. */
  Hourly = "Hourly",
  /** Hourly grain corresponds to value per day. */
  Daily = "Daily",
  /** Hourly grain corresponds to value per month. */
  Monthly = "Monthly",
}

/** Type of GrainParameter */
export type GrainParameter = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-01 API version. */
  V20250301 = "2025-03-01",
}

export function _generateDetailedCostReportOperationStatusesPropertiesDeserializer(item: any) {
  return {
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    validTill: !item["validTill"] ? item["validTill"] : new Date(item["validTill"]),
    downloadUrl: item["downloadUrl"],
  };
}

export function _budgetPropertiesSerializer(item: Budget): any {
  return {
    category: item["category"],
    amount: item["amount"],
    timeGrain: item["timeGrain"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : budgetTimePeriodSerializer(item["timePeriod"]),
    filter: !item["filter"] ? item["filter"] : budgetFilterSerializer(item["filter"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationRecordSerializer(item["notifications"]),
  };
}

export function _budgetPropertiesDeserializer(item: any) {
  return {
    category: item["category"],
    amount: item["amount"],
    timeGrain: item["timeGrain"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : budgetTimePeriodDeserializer(item["timePeriod"]),
    filter: !item["filter"] ? item["filter"] : budgetFilterDeserializer(item["filter"]),
    currentSpend: !item["currentSpend"]
      ? item["currentSpend"]
      : currentSpendDeserializer(item["currentSpend"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationRecordDeserializer(item["notifications"]),
    forecastSpend: !item["forecastSpend"]
      ? item["forecastSpend"]
      : forecastSpendDeserializer(item["forecastSpend"]),
  };
}

export function _exportPropertiesSerializer(item: Export): any {
  return {
    format: item["format"],
    deliveryInfo: !item["deliveryInfo"]
      ? item["deliveryInfo"]
      : exportDeliveryInfoSerializer(item["deliveryInfo"]),
    definition: !item["definition"]
      ? item["definition"]
      : exportDefinitionSerializer(item["definition"]),
    runHistory: !item["runHistory"]
      ? item["runHistory"]
      : exportExecutionListResultSerializer(item["runHistory"]),
    partitionData: item["partitionData"],
    dataOverwriteBehavior: item["dataOverwriteBehavior"],
    compressionMode: item["compressionMode"],
    exportDescription: item["exportDescription"],
    schedule: !item["schedule"] ? item["schedule"] : exportScheduleSerializer(item["schedule"]),
  };
}

export function _exportPropertiesDeserializer(item: any) {
  return {
    format: item["format"],
    deliveryInfo: !item["deliveryInfo"]
      ? item["deliveryInfo"]
      : exportDeliveryInfoDeserializer(item["deliveryInfo"]),
    definition: !item["definition"]
      ? item["definition"]
      : exportDefinitionDeserializer(item["definition"]),
    runHistory: !item["runHistory"]
      ? item["runHistory"]
      : exportExecutionListResultDeserializer(item["runHistory"]),
    partitionData: item["partitionData"],
    dataOverwriteBehavior: item["dataOverwriteBehavior"],
    compressionMode: item["compressionMode"],
    exportDescription: item["exportDescription"],
    nextRunTimeEstimate: !item["nextRunTimeEstimate"]
      ? item["nextRunTimeEstimate"]
      : new Date(item["nextRunTimeEstimate"]),
    systemSuspensionContext: !item["systemSuspensionContext"]
      ? item["systemSuspensionContext"]
      : exportSuspensionContextDeserializer(item["systemSuspensionContext"]),
    schedule: !item["schedule"] ? item["schedule"] : exportScheduleDeserializer(item["schedule"]),
  };
}

export function _exportRunPropertiesDeserializer(item: any) {
  return {
    executionType: item["executionType"],
    status: item["status"],
    submittedBy: item["submittedBy"],
    submittedTime: !item["submittedTime"] ? item["submittedTime"] : new Date(item["submittedTime"]),
    processingStartTime: !item["processingStartTime"]
      ? item["processingStartTime"]
      : new Date(item["processingStartTime"]),
    processingEndTime: !item["processingEndTime"]
      ? item["processingEndTime"]
      : new Date(item["processingEndTime"]),
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    fileName: item["fileName"],
    manifestFile: item["manifestFile"],
    runSettings: !item["runSettings"]
      ? item["runSettings"]
      : commonExportPropertiesDeserializer(item["runSettings"]),
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

export function _generateDetailedCostReportOperationResultPropertiesDeserializer(item: any) {
  return {
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    validTill: !item["validTill"] ? item["validTill"] : new Date(item["validTill"]),
    downloadUrl: item["downloadUrl"],
  };
}

export function _viewPropertiesQuerySerializer(item: ViewProperties): any {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : reportConfigTimePeriodSerializer(item["timePeriod"]),
    dataSet: !item["dataSet"] ? item["dataSet"] : reportConfigDatasetSerializer(item["dataSet"]),
    includeMonetaryCommitment: item["includeMonetaryCommitment"],
  };
}

export function _viewPropertiesQueryDeserializer(item: any) {
  return {
    type: item["type"],
    timeframe: item["timeframe"],
    timePeriod: !item["timePeriod"]
      ? item["timePeriod"]
      : reportConfigTimePeriodDeserializer(item["timePeriod"]),
    dataSet: !item["dataSet"] ? item["dataSet"] : reportConfigDatasetDeserializer(item["dataSet"]),
    includeMonetaryCommitment: item["includeMonetaryCommitment"],
  };
}

export function _viewPropertiesSerializer(item: View): any {
  return {
    displayName: item["displayName"],
    scope: item["scope"],
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : item["modifiedOn"].toISOString(),
    dateRange: item["dateRange"],
    query: !item["query"] ? item["query"] : reportConfigDefinitionSerializer(item["query"]),
    chart: item["chart"],
    accumulated: item["accumulated"],
    metric: item["metric"],
    kpis: !item["kpis"] ? item["kpis"] : kpiPropertiesArraySerializer(item["kpis"]),
    pivots: !item["pivots"] ? item["pivots"] : pivotPropertiesArraySerializer(item["pivots"]),
  };
}

export function _viewPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    scope: item["scope"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    dateRange: item["dateRange"],
    currency: item["currency"],
    query: !item["query"] ? item["query"] : reportConfigDefinitionDeserializer(item["query"]),
    chart: item["chart"],
    accumulated: item["accumulated"],
    metric: item["metric"],
    kpis: !item["kpis"] ? item["kpis"] : kpiPropertiesArrayDeserializer(item["kpis"]),
    pivots: !item["pivots"] ? item["pivots"] : pivotPropertiesArrayDeserializer(item["pivots"]),
  };
}

export function _alertPropertiesSerializer(item: Alert): any {
  return {
    definition: !item["definition"]
      ? item["definition"]
      : alertPropertiesDefinitionSerializer(item["definition"]),
    description: item["description"],
    source: item["source"],
    details: !item["details"] ? item["details"] : alertPropertiesDetailsSerializer(item["details"]),
    costEntityId: item["costEntityId"],
    status: item["status"],
    creationTime: item["creationTime"],
    closeTime: item["closeTime"],
    modificationTime: item["modificationTime"],
    statusModificationUserName: item["statusModificationUserName"],
    statusModificationTime: item["statusModificationTime"],
  };
}

export function _alertPropertiesDeserializer(item: any) {
  return {
    definition: !item["definition"]
      ? item["definition"]
      : alertPropertiesDefinitionDeserializer(item["definition"]),
    description: item["description"],
    source: item["source"],
    details: !item["details"]
      ? item["details"]
      : alertPropertiesDetailsDeserializer(item["details"]),
    costEntityId: item["costEntityId"],
    status: item["status"],
    creationTime: item["creationTime"],
    closeTime: item["closeTime"],
    modificationTime: item["modificationTime"],
    statusModificationUserName: item["statusModificationUserName"],
    statusModificationTime: item["statusModificationTime"],
  };
}

export function _dismissAlertPayloadPropertiesSerializer(item: DismissAlertPayload): any {
  return {
    definition: !item["definition"]
      ? item["definition"]
      : alertPropertiesDefinitionSerializer(item["definition"]),
    description: item["description"],
    source: item["source"],
    details: !item["details"] ? item["details"] : alertPropertiesDetailsSerializer(item["details"]),
    costEntityId: item["costEntityId"],
    status: item["status"],
    creationTime: item["creationTime"],
    closeTime: item["closeTime"],
    modificationTime: item["modificationTime"],
    statusModificationUserName: item["statusModificationUserName"],
    statusModificationTime: item["statusModificationTime"],
  };
}

export function _dismissAlertPayloadPropertiesDeserializer(item: any) {
  return {
    definition: !item["definition"]
      ? item["definition"]
      : alertPropertiesDefinitionDeserializer(item["definition"]),
    description: item["description"],
    source: item["source"],
    details: !item["details"]
      ? item["details"]
      : alertPropertiesDetailsDeserializer(item["details"]),
    costEntityId: item["costEntityId"],
    status: item["status"],
    creationTime: item["creationTime"],
    closeTime: item["closeTime"],
    modificationTime: item["modificationTime"],
    statusModificationUserName: item["statusModificationUserName"],
    statusModificationTime: item["statusModificationTime"],
  };
}

export function _scheduledActionPropertiesSerializer(item: ScheduledAction): any {
  return {
    displayName: item["displayName"],
    fileDestination: !item["fileDestination"]
      ? item["fileDestination"]
      : fileDestinationSerializer(item["fileDestination"]),
    notification: !item["notification"]
      ? item["notification"]
      : notificationPropertiesSerializer(item["notification"]),
    notificationEmail: item["notificationEmail"],
    schedule: !item["schedule"] ? item["schedule"] : schedulePropertiesSerializer(item["schedule"]),
    scope: item["scope"],
    status: item["status"],
    viewId: item["viewId"],
  };
}

export function _scheduledActionPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    fileDestination: !item["fileDestination"]
      ? item["fileDestination"]
      : fileDestinationDeserializer(item["fileDestination"]),
    notification: !item["notification"]
      ? item["notification"]
      : notificationPropertiesDeserializer(item["notification"]),
    notificationEmail: item["notificationEmail"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : schedulePropertiesDeserializer(item["schedule"]),
    scope: item["scope"],
    status: item["status"],
    viewId: item["viewId"],
  };
}

export function _reportManifestRequestContextDeserializer(item: any) {
  return {
    requestScope: item["requestScope"],
    requestBody: !item["requestBody"]
      ? item["requestBody"]
      : generateCostDetailsReportRequestDefinitionDeserializer(item["requestBody"]),
  };
}

export function _costDetailsOperationResultsManifestDeserializer(item: any) {
  return {
    manifestVersion: item["manifestVersion"],
    dataFormat: item["dataFormat"],
    byteCount: item["byteCount"],
    blobCount: item["blobCount"],
    compressData: item["compressData"],
    requestContext: !item["requestContext"]
      ? item["requestContext"]
      : requestContextDeserializer(item["requestContext"]),
    blobs: !item["blobs"] ? item["blobs"] : blobInfoArrayDeserializer(item["blobs"]),
  };
}

export function _includedQuantityUtilizationSummaryPropertiesDeserializer(item: any) {
  return {
    armSkuName: item["armSkuName"],
    benefitId: item["benefitId"],
    benefitOrderId: item["benefitOrderId"],
    benefitType: item["benefitType"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    utilizationPercentage: item["utilizationPercentage"],
  };
}

export function _savingsPlanUtilizationSummaryPropertiesDeserializer(item: any) {
  return {
    armSkuName: item["armSkuName"],
    benefitId: item["benefitId"],
    benefitOrderId: item["benefitOrderId"],
    benefitType: item["benefitType"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    avgUtilizationPercentage: item["avgUtilizationPercentage"],
    minUtilizationPercentage: item["minUtilizationPercentage"],
    maxUtilizationPercentage: item["maxUtilizationPercentage"],
  };
}

export function _forecastResultPropertiesDeserializer(item: any) {
  return {
    nextLink: item["nextLink"],
    columns: !item["columns"] ? item["columns"] : forecastColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function _dimensionPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    filterEnabled: item["filterEnabled"],
    groupingEnabled: item["groupingEnabled"],
    data: !item["data"]
      ? item["data"]
      : item["data"].map((p: any) => {
          return p;
        }),
    total: item["total"],
    category: item["category"],
    usageStart: !item["usageStart"] ? item["usageStart"] : new Date(item["usageStart"]),
    usageEnd: !item["usageEnd"] ? item["usageEnd"] : new Date(item["usageEnd"]),
    nextLink: item["nextLink"],
  };
}

export function _queryResultPropertiesDeserializer(item: any) {
  return {
    nextLink: item["nextLink"],
    columns: !item["columns"] ? item["columns"] : queryColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function _operationStatusPropertiesDeserializer(item: any) {
  return {
    reportUrl: item["reportUrl"],
    validUntil: !item["validUntil"] ? item["validUntil"] : new Date(item["validUntil"]),
  };
}
