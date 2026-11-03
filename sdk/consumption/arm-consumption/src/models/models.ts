// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of listing consumption operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of consumption operations supported by the Microsoft.Consumption resource provider. */
  readonly value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** A Consumption REST API operation. */
export interface Operation {
  /** Operation Id. */
  readonly id?: string;
  /** Operation name: {provider}/{resource}/{operation}. */
  readonly name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    id: item["id"],
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft.Consumption. */
  readonly provider?: string;
  /** Resource on which the operation is performed: UsageDetail, etc. */
  readonly resource?: string;
  /** Operation type: Read, write, delete, etc. */
  readonly operation?: string;
  /** Description of the operation. */
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
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** An pricesheet resource. */
export interface PriceSheetResult extends ProxyResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** Price sheet */
  readonly pricesheets?: PriceSheetProperties[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** Pricesheet download details. */
  readonly download?: MeterDetails;
}

export function priceSheetResultDeserializer(item: any): PriceSheetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _priceSheetResultPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** price sheet result. It contains the pricesheet associated with billing period */
export interface PriceSheetModel {
  /** Price sheet */
  readonly pricesheets?: PriceSheetProperties[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** Pricesheet download details. */
  readonly download?: MeterDetails;
}

export function priceSheetModelDeserializer(item: any): PriceSheetModel {
  return {
    pricesheets: !item["pricesheets"]
      ? item["pricesheets"]
      : priceSheetPropertiesArrayDeserializer(item["pricesheets"]),
    nextLink: item["nextLink"],
    download: !item["download"] ? item["download"] : meterDetailsDeserializer(item["download"]),
  };
}

export function priceSheetPropertiesArrayDeserializer(result: Array<PriceSheetProperties>): any[] {
  return result.map((item) => {
    return priceSheetPropertiesDeserializer(item);
  });
}

/** The properties of the price sheet. */
export interface PriceSheetProperties {
  /** The id of the billing period resource that the usage belongs to. */
  readonly billingPeriodId?: string;
  /** The meter id (GUID) */
  readonly meterId?: string;
  /** The details about the meter. By default this is not populated, unless it's specified in $expand. */
  readonly meterDetails?: MeterDetails;
  /** Unit of measure */
  readonly unitOfMeasure?: string;
  /** Included quality for an offer */
  readonly includedQuantity?: number;
  /** Part Number */
  readonly partNumber?: string;
  /** Unit Price */
  readonly unitPrice?: number;
  /** Currency Code */
  readonly currencyCode?: string;
  /** Offer Id */
  readonly offerId?: string;
  /** SavingsPlan Details */
  readonly savingsPlan?: SavingsPlan;
}

export function priceSheetPropertiesDeserializer(item: any): PriceSheetProperties {
  return {
    billingPeriodId: item["billingPeriodId"],
    meterId: item["meterId"],
    meterDetails: !item["meterDetails"]
      ? item["meterDetails"]
      : meterDetailsDeserializer(item["meterDetails"]),
    unitOfMeasure: item["unitOfMeasure"],
    includedQuantity: item["includedQuantity"],
    partNumber: item["partNumber"],
    unitPrice: item["unitPrice"],
    currencyCode: item["currencyCode"],
    offerId: item["offerId"],
    savingsPlan: !item["savingsPlan"]
      ? item["savingsPlan"]
      : savingsPlanDeserializer(item["savingsPlan"]),
  };
}

/** The properties of the meter detail. */
export interface MeterDetails {
  /** The name of the meter, within the given meter category */
  readonly meterName?: string;
  /** The category of the meter, for example, 'Cloud services', 'Networking', etc.. */
  readonly meterCategory?: string;
  /** The subcategory of the meter, for example, 'A6 Cloud services', 'ExpressRoute (IXP)', etc.. */
  readonly meterSubCategory?: string;
  /** The unit in which the meter consumption is charged, for example, 'Hours', 'GB', etc. */
  readonly unit?: string;
  /** The location in which the Azure service is available. */
  readonly meterLocation?: string;
  /** The total included quantity associated with the offer. */
  readonly totalIncludedQuantity?: number;
  /** The pretax listing price. */
  readonly pretaxStandardRate?: number;
  /** The name of the service. */
  readonly serviceName?: string;
  /** The service tier. */
  readonly serviceTier?: string;
}

export function meterDetailsDeserializer(item: any): MeterDetails {
  return {
    meterName: item["meterName"],
    meterCategory: item["meterCategory"],
    meterSubCategory: item["meterSubCategory"],
    unit: item["unit"],
    meterLocation: item["meterLocation"],
    totalIncludedQuantity: item["totalIncludedQuantity"],
    pretaxStandardRate: item["pretaxStandardRate"],
    serviceName: item["serviceName"],
    serviceTier: item["serviceTier"],
  };
}

/** The properties of the SavingsPlan. */
export interface SavingsPlan {
  /** SavingsPlan term */
  readonly term?: string;
  /** SavingsPlan Market Price */
  readonly marketPrice?: number;
  /** SavingsPlan Effective Price */
  readonly effectivePrice?: number;
}

export function savingsPlanDeserializer(item: any): SavingsPlan {
  return {
    term: item["term"],
    marketPrice: item["marketPrice"],
    effectivePrice: item["effectivePrice"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** The status of the long running operation. */
export interface OperationStatus {
  /** The status of the long running operation. */
  status?: OperationStatusType;
  /** The link (url) to download the pricesheet. */
  readonly downloadUrl?: string;
  /** Download link validity. */
  readonly validTill?: Date;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    status: item["status"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationStatusPropertiesDeserializer(item["properties"])),
  };
}

/** The status of the long running operation. */
export enum KnownOperationStatusType {
  /** Running */
  Running = "Running",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
}

/**
 * The status of the long running operation. \
 * {@link KnownOperationStatusType} can be used interchangeably with OperationStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running** \
 * **Completed** \
 * **Failed**
 */
export type OperationStatusType = string;

/** The properties of the price sheet download. */
export interface PricesheetDownloadProperties {
  /** The link (url) to download the pricesheet. */
  readonly downloadUrl?: string;
  /** Download link validity. */
  readonly validTill?: Date;
}

export function pricesheetDownloadPropertiesDeserializer(item: any): PricesheetDownloadProperties {
  return {
    downloadUrl: item["downloadUrl"],
    validTill: !item["validTill"] ? item["validTill"] : new Date(item["validTill"]),
  };
}

/** A budget resource. */
export interface Budget extends ExtensionResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /** The category of the budget, whether the budget tracks cost or usage. */
  category?: CategoryType;
  /** The total amount of cost to track with the budget */
  amount?: number;
  /** The time covered by a budget. Tracking of the amount will be reset based on the time grain. BillingMonth, BillingQuarter, and BillingAnnual are only supported by WD customers */
  timeGrain?: TimeGrainType;
  /** Has start and end date of the budget. The start date must be first of the month and should be less than the end date. Budget start date must be on or after June 1, 2017. Future start date should not be more than twelve months. Past start date should  be selected within the timegrain period. There are no restrictions on the end date. */
  timePeriod?: BudgetTimePeriod;
  /** May be used to filter budgets by user-specified dimensions and/or tags. */
  filter?: BudgetFilter;
  /** The current amount of cost which is being tracked for a budget. */
  readonly currentSpend?: CurrentSpend;
  /** Dictionary of notifications associated with the budget. Budget can have up to five notifications. */
  notifications?: Record<string, Notification>;
  /** The forecasted cost which is being tracked for a budget. */
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
  /** The category of the budget, whether the budget tracks cost or usage. */
  category: CategoryType;
  /** The total amount of cost to track with the budget */
  amount: number;
  /** The time covered by a budget. Tracking of the amount will be reset based on the time grain. BillingMonth, BillingQuarter, and BillingAnnual are only supported by WD customers */
  timeGrain: TimeGrainType;
  /** Has start and end date of the budget. The start date must be first of the month and should be less than the end date. Budget start date must be on or after June 1, 2017. Future start date should not be more than twelve months. Past start date should  be selected within the timegrain period. There are no restrictions on the end date. */
  timePeriod: BudgetTimePeriod;
  /** May be used to filter budgets by user-specified dimensions and/or tags. */
  filter?: BudgetFilter;
  /** The current amount of cost which is being tracked for a budget. */
  readonly currentSpend?: CurrentSpend;
  /** Dictionary of notifications associated with the budget. Budget can have up to five notifications. */
  notifications?: Record<string, Notification>;
  /** The forecasted cost which is being tracked for a budget. */
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

/** The category of the budget, whether the budget tracks cost or usage. */
export enum KnownCategoryType {
  /** Cost */
  Cost = "Cost",
}

/**
 * The category of the budget, whether the budget tracks cost or usage. \
 * {@link KnownCategoryType} can be used interchangeably with CategoryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cost**
 */
export type CategoryType = string;

/** The time covered by a budget. Tracking of the amount will be reset based on the time grain. BillingMonth, BillingQuarter, and BillingAnnual are only supported by WD customers */
export enum KnownTimeGrainType {
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
 * The time covered by a budget. Tracking of the amount will be reset based on the time grain. BillingMonth, BillingQuarter, and BillingAnnual are only supported by WD customers \
 * {@link KnownTimeGrainType} can be used interchangeably with TimeGrainType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monthly** \
 * **Quarterly** \
 * **Annually** \
 * **BillingMonth** \
 * **BillingQuarter** \
 * **BillingAnnual**
 */
export type TimeGrainType = string;

/** The start and end date for a budget. */
export interface BudgetTimePeriod {
  /** The start date for the budget. */
  startDate: Date;
  /** The end date for the budget. If not provided, we default this to 10 years from the start date. */
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

/** May be used to filter budgets by resource group, resource, or meter. */
export interface BudgetFilter {
  /** The logical "AND" expression. Must have at least 2 items. */
  and?: BudgetFilterProperties[];
  /** Has comparison expression for a dimension */
  dimensions?: BudgetComparisonExpression;
  /** Has comparison expression for a tag */
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

/** The Dimensions or Tags to filter a budget by. */
export interface BudgetFilterProperties {
  /** Has comparison expression for a dimension */
  dimensions?: BudgetComparisonExpression;
  /** Has comparison expression for a tag */
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

/** The current amount of cost which is being tracked for a budget. */
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

/** The notification associated with a budget. */
export interface Notification {
  /** The notification is enabled or not. */
  enabled: boolean;
  /** The comparison operator. */
  operator: OperatorType;
  /** Threshold value associated with a notification. Notification is sent when the cost exceeded the threshold. It is always percent and has to be between 0 and 1000. */
  threshold: number;
  /** Email addresses to send the budget notification to when the threshold is exceeded. Must have at least one contact email or contact group specified at the Subscription or Resource Group scopes. All other scopes must have at least one contact email specified. */
  contactEmails: string[];
  /** Contact roles to send the budget notification to when the threshold is exceeded. */
  contactRoles?: string[];
  /** Action groups to send the budget notification to when the threshold is exceeded. Must be provided as a fully qualified Azure resource id. Only supported at Subscription or Resource Group scopes. */
  contactGroups?: string[];
  /** The type of threshold */
  thresholdType?: ThresholdType;
  /** Language in which the recipient will receive the notification */
  locale?: CultureCode;
}

export function notificationSerializer(item: Notification): any {
  return {
    enabled: item["enabled"],
    operator: item["operator"],
    threshold: item["threshold"],
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

/** The comparison operator. */
export enum KnownOperatorType {
  /** Alert will be triggered if the evaluated cost is the same as threshold value. Note: It’s not recommended to use this OperatorType as there’s low chance of cost being exactly the same as threshold value, leading to missing of your alert. This OperatorType will be deprecated in future. */
  EqualTo = "EqualTo",
  /** Alert will be triggered if the evaluated cost is greater than the threshold value. Note: This is the recommended OperatorType while configuring Budget Alert. */
  GreaterThan = "GreaterThan",
  /** Alert will be triggered if the evaluated cost is greater than or equal to the threshold value. */
  GreaterThanOrEqualTo = "GreaterThanOrEqualTo",
}

/**
 * The comparison operator. \
 * {@link KnownOperatorType} can be used interchangeably with OperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EqualTo**: Alert will be triggered if the evaluated cost is the same as threshold value. Note: It’s not recommended to use this OperatorType as there’s low chance of cost being exactly the same as threshold value, leading to missing of your alert. This OperatorType will be deprecated in future. \
 * **GreaterThan**: Alert will be triggered if the evaluated cost is greater than the threshold value. Note: This is the recommended OperatorType while configuring Budget Alert. \
 * **GreaterThanOrEqualTo**: Alert will be triggered if the evaluated cost is greater than or equal to the threshold value.
 */
export type OperatorType = string;

/** The type of threshold */
export enum KnownThresholdType {
  /** Actual costs budget alerts notify when the actual accrued cost exceeds the allocated budget . */
  Actual = "Actual",
  /** Forecasted costs budget alerts provide advanced notification that your spending trends are likely to exceed your allocated budget, as it relies on forecasted cost predictions. */
  Forecasted = "Forecasted",
}

/**
 * The type of threshold \
 * {@link KnownThresholdType} can be used interchangeably with ThresholdType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Actual**: Actual costs budget alerts notify when the actual accrued cost exceeds the allocated budget . \
 * **Forecasted**: Forecasted costs budget alerts provide advanced notification that your spending trends are likely to exceed your allocated budget, as it relies on forecasted cost predictions.
 */
export type ThresholdType = string;

/** Language in which the recipient will receive the notification */
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
 * Language in which the recipient will receive the notification \
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

/** The forecasted cost which is being tracked for a budget. */
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

/** Result of listing budgets. It contains a list of available budgets in the scope provided. */
export interface _BudgetsListResult {
  /** The list of budgets. */
  readonly value?: Budget[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
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

/** A credit summary resource. */
export interface CreditSummary extends ProxyResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /** A list of Tag. */
  tags?: Record<string, string>;
  /** Summary of balances associated with this credit summary. */
  readonly balanceSummary?: CreditBalanceSummary;
  /** Pending credit adjustments. */
  readonly pendingCreditAdjustments?: Amount;
  /** Expired credit. */
  readonly expiredCredit?: Amount;
  /** Pending eligible charges. */
  readonly pendingEligibleCharges?: Amount;
  /** The credit currency. */
  readonly creditCurrency?: string;
  /** The billing currency. */
  readonly billingCurrency?: string;
  /** Credit's reseller. */
  readonly reseller?: Reseller;
  /** If true, the listed details are based on an estimation and it will be subjected to change. */
  readonly isEstimatedBalance?: boolean;
  /** The eTag for the resource. */
  readonly eTagPropertiesETag?: string;
}

export function creditSummaryDeserializer(item: any): CreditSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _creditSummaryPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the credit summary. */
export interface CreditSummaryProperties {
  /** Summary of balances associated with this credit summary. */
  readonly balanceSummary?: CreditBalanceSummary;
  /** Pending credit adjustments. */
  readonly pendingCreditAdjustments?: Amount;
  /** Expired credit. */
  readonly expiredCredit?: Amount;
  /** Pending eligible charges. */
  readonly pendingEligibleCharges?: Amount;
  /** The credit currency. */
  readonly creditCurrency?: string;
  /** The billing currency. */
  readonly billingCurrency?: string;
  /** Credit's reseller. */
  readonly reseller?: Reseller;
  /** If true, the listed details are based on an estimation and it will be subjected to change. */
  readonly isEstimatedBalance?: boolean;
  /** The eTag for the resource. */
  readonly eTag?: string;
}

export function creditSummaryPropertiesDeserializer(item: any): CreditSummaryProperties {
  return {
    balanceSummary: !item["balanceSummary"]
      ? item["balanceSummary"]
      : creditBalanceSummaryDeserializer(item["balanceSummary"]),
    pendingCreditAdjustments: !item["pendingCreditAdjustments"]
      ? item["pendingCreditAdjustments"]
      : amountDeserializer(item["pendingCreditAdjustments"]),
    expiredCredit: !item["expiredCredit"]
      ? item["expiredCredit"]
      : amountDeserializer(item["expiredCredit"]),
    pendingEligibleCharges: !item["pendingEligibleCharges"]
      ? item["pendingEligibleCharges"]
      : amountDeserializer(item["pendingEligibleCharges"]),
    creditCurrency: item["creditCurrency"],
    billingCurrency: item["billingCurrency"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    isEstimatedBalance: item["isEstimatedBalance"],
    eTag: item["eTag"],
  };
}

/** Summary of credit balances. */
export interface CreditBalanceSummary {
  /** Estimated balance. */
  readonly estimatedBalance?: Amount;
  /** Current balance. */
  readonly currentBalance?: Amount;
  /** Estimated balance in billing currency. */
  readonly estimatedBalanceInBillingCurrency?: AmountWithExchangeRate;
}

export function creditBalanceSummaryDeserializer(item: any): CreditBalanceSummary {
  return {
    estimatedBalance: !item["estimatedBalance"]
      ? item["estimatedBalance"]
      : amountDeserializer(item["estimatedBalance"]),
    currentBalance: !item["currentBalance"]
      ? item["currentBalance"]
      : amountDeserializer(item["currentBalance"]),
    estimatedBalanceInBillingCurrency: !item["estimatedBalanceInBillingCurrency"]
      ? item["estimatedBalanceInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["estimatedBalanceInBillingCurrency"]),
  };
}

/** The amount plus currency . */
export interface Amount {
  /** Amount currency. */
  readonly currency?: string;
  /** Amount. */
  readonly value?: number;
}

export function amountDeserializer(item: any): Amount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The amount with exchange rate. */
export interface AmountWithExchangeRate extends Amount {
  /** The exchange rate. */
  readonly exchangeRate?: number;
  /** The exchange rate month. */
  readonly exchangeRateMonth?: number;
}

export function amountWithExchangeRateDeserializer(item: any): AmountWithExchangeRate {
  return {
    currency: item["currency"],
    value: item["value"],
    exchangeRate: item["exchangeRate"],
    exchangeRateMonth: item["exchangeRateMonth"],
  };
}

/** The reseller properties. */
export interface Reseller {
  /** The reseller property ID. */
  readonly resellerId?: string;
  /** The reseller property description. */
  readonly resellerDescription?: string;
}

export function resellerDeserializer(item: any): Reseller {
  return {
    resellerId: item["resellerId"],
    resellerDescription: item["resellerDescription"],
  };
}

/** Result of listing usage details. It contains a list of available usage details in reverse chronological order by billing period. */
export interface _UsageDetailsListResult {
  /** The list of usage details. */
  readonly value?: UsageDetailUnion[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _usageDetailsListResultDeserializer(item: any): _UsageDetailsListResult {
  return {
    value: !item["value"] ? item["value"] : usageDetailUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageDetailUnionArrayDeserializer(result: Array<UsageDetailUnion>): any[] {
  return result.map((item) => {
    return usageDetailUnionDeserializer(item);
  });
}

/** An usage detail resource. */
export interface UsageDetail extends Resource {
  /** Specifies the kind of usage details. */
  /** The discriminator possible values: legacy, modern */
  kind: UsageDetailsKind;
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
}

export function usageDetailDeserializer(item: any): UsageDetail {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Alias for UsageDetailUnion */
export type UsageDetailUnion = LegacyUsageDetail | ModernUsageDetail | UsageDetail;

export function usageDetailUnionDeserializer(item: any): UsageDetailUnion {
  switch (item["kind"]) {
    case "legacy":
      return legacyUsageDetailDeserializer(item as LegacyUsageDetail);

    case "modern":
      return modernUsageDetailDeserializer(item as ModernUsageDetail);

    default:
      return usageDetailDeserializer(item);
  }
}

/** Specifies the kind of usage details. */
export enum KnownUsageDetailsKind {
  /** legacy */
  Legacy = "legacy",
  /** modern */
  Modern = "modern",
}

/**
 * Specifies the kind of usage details. \
 * {@link KnownUsageDetailsKind} can be used interchangeably with UsageDetailsKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **legacy** \
 * **modern**
 */
export type UsageDetailsKind = string;

/** Legacy usage detail. */
export interface LegacyUsageDetail extends UsageDetail {
  /** Specifies the kind of usage details. */
  kind: "legacy";
  /** Billing Account identifier. */
  readonly billingAccountId?: string;
  /** Billing Account Name. */
  readonly billingAccountName?: string;
  /** The billing period start date. */
  readonly billingPeriodStartDate?: Date;
  /** The billing period end date. */
  readonly billingPeriodEndDate?: Date;
  /** Billing Profile identifier. */
  readonly billingProfileId?: string;
  /** Billing Profile Name. */
  readonly billingProfileName?: string;
  /** Account Owner Id. */
  readonly accountOwnerId?: string;
  /** Account Name. */
  readonly accountName?: string;
  /** Subscription guid. */
  readonly subscriptionId?: string;
  /** Subscription name. */
  readonly subscriptionName?: string;
  /** Date for the usage record. */
  readonly date?: Date;
  /** Product name for the consumed service or purchase. Not available for Marketplace. */
  readonly product?: string;
  /** Part Number of the service used. Can be used to join with the price sheet. Not available for marketplace. */
  readonly partNumber?: string;
  /** The meter id (GUID). Not available for marketplace. For reserved instance this represents the primary meter for which the reservation was purchased. For the actual VM Size for which the reservation is purchased see productOrderName. */
  readonly meterId?: string;
  /** The details about the meter. By default this is not populated, unless it's specified in $expand. */
  readonly meterDetails?: MeterDetailsResponse;
  /** The usage quantity. */
  readonly quantity?: number;
  /** Effective Price that's charged for the usage. */
  readonly effectivePrice?: number;
  /** The amount of cost before tax. */
  readonly cost?: number;
  /** Unit Price is the price applicable to you. (your EA or other contract price). */
  readonly unitPrice?: number;
  /** Billing Currency. */
  readonly billingCurrency?: string;
  /** Resource Location. */
  readonly resourceLocation?: string;
  /** Consumed service name. Name of the azure resource provider that emits the usage or was purchased. This value is not provided for marketplace usage. */
  readonly consumedService?: string;
  /** Unique identifier of the Azure Resource Manager usage detail resource. */
  readonly resourceId?: string;
  /** Resource Name. */
  readonly resourceName?: string;
  /** Service-specific metadata. */
  readonly serviceInfo1?: string;
  /** Legacy field with optional service-specific metadata. */
  readonly serviceInfo2?: string;
  /** Additional details of this usage item. By default this is not populated, unless it's specified in $expand. Use this field to get usage line item specific details such as the actual VM Size (ServiceType) or the ratio in which the reservation discount is applied. */
  readonly additionalInfo?: string;
  /** Invoice Section Name. */
  readonly invoiceSection?: string;
  /** The cost center of this department if it is a department and a cost center is provided. */
  readonly costCenter?: string;
  /** Resource Group Name. */
  readonly resourceGroup?: string;
  /** ARM resource id of the reservation. Only applies to records relevant to reservations. */
  readonly reservationId?: string;
  /** User provided display name of the reservation. Last known name for a particular day is populated in the daily data. Only applies to records relevant to reservations. */
  readonly reservationName?: string;
  /** Product Order Id. For reservations this is the Reservation Order ID. */
  readonly productOrderId?: string;
  /** Product Order Name. For reservations this is the SKU that was purchased. */
  readonly productOrderName?: string;
  /** Offer Id. Ex: MS-AZR-0017P, MS-AZR-0148P. */
  readonly offerId?: string;
  /** Is Azure Credit Eligible. */
  readonly isAzureCreditEligible?: boolean;
  /** Term (in months). 1 month for monthly recurring purchase. 12 months for a 1 year reservation. 36 months for a 3 year reservation. */
  readonly term?: string;
  /** Publisher Name. */
  readonly publisherName?: string;
  /** Publisher Type. */
  readonly publisherType?: string;
  /** Plan Name. */
  readonly planName?: string;
  /** Indicates a charge represents credits, usage, a Marketplace purchase, a reservation fee, or a refund. */
  readonly chargeType?: string;
  /** Indicates how frequently this charge will occur. OneTime for purchases which only happen once, Monthly for fees which recur every month, and UsageBased for charges based on how much a service is used. */
  readonly frequency?: string;
  /** Retail price for the resource. */
  readonly payGPrice?: number;
  /** Unique identifier for the applicable benefit. */
  readonly benefitId?: string;
  /** Name of the applicable benefit. */
  readonly benefitName?: string;
  /** Identifier that indicates how the meter is priced. */
  readonly pricingModel?: PricingModelType;
}

export function legacyUsageDetailDeserializer(item: any): LegacyUsageDetail {
  return {
    kind: item["kind"],
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._legacyUsageDetailPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the legacy usage detail. */
export interface LegacyUsageDetailProperties {
  /** Billing Account identifier. */
  readonly billingAccountId?: string;
  /** Billing Account Name. */
  readonly billingAccountName?: string;
  /** The billing period start date. */
  readonly billingPeriodStartDate?: Date;
  /** The billing period end date. */
  readonly billingPeriodEndDate?: Date;
  /** Billing Profile identifier. */
  readonly billingProfileId?: string;
  /** Billing Profile Name. */
  readonly billingProfileName?: string;
  /** Account Owner Id. */
  readonly accountOwnerId?: string;
  /** Account Name. */
  readonly accountName?: string;
  /** Subscription guid. */
  readonly subscriptionId?: string;
  /** Subscription name. */
  readonly subscriptionName?: string;
  /** Date for the usage record. */
  readonly date?: Date;
  /** Product name for the consumed service or purchase. Not available for Marketplace. */
  readonly product?: string;
  /** Part Number of the service used. Can be used to join with the price sheet. Not available for marketplace. */
  readonly partNumber?: string;
  /** The meter id (GUID). Not available for marketplace. For reserved instance this represents the primary meter for which the reservation was purchased. For the actual VM Size for which the reservation is purchased see productOrderName. */
  readonly meterId?: string;
  /** The details about the meter. By default this is not populated, unless it's specified in $expand. */
  readonly meterDetails?: MeterDetailsResponse;
  /** The usage quantity. */
  readonly quantity?: number;
  /** Effective Price that's charged for the usage. */
  readonly effectivePrice?: number;
  /** The amount of cost before tax. */
  readonly cost?: number;
  /** Unit Price is the price applicable to you. (your EA or other contract price). */
  readonly unitPrice?: number;
  /** Billing Currency. */
  readonly billingCurrency?: string;
  /** Resource Location. */
  readonly resourceLocation?: string;
  /** Consumed service name. Name of the azure resource provider that emits the usage or was purchased. This value is not provided for marketplace usage. */
  readonly consumedService?: string;
  /** Unique identifier of the Azure Resource Manager usage detail resource. */
  readonly resourceId?: string;
  /** Resource Name. */
  readonly resourceName?: string;
  /** Service-specific metadata. */
  readonly serviceInfo1?: string;
  /** Legacy field with optional service-specific metadata. */
  readonly serviceInfo2?: string;
  /** Additional details of this usage item. By default this is not populated, unless it's specified in $expand. Use this field to get usage line item specific details such as the actual VM Size (ServiceType) or the ratio in which the reservation discount is applied. */
  readonly additionalInfo?: string;
  /** Invoice Section Name. */
  readonly invoiceSection?: string;
  /** The cost center of this department if it is a department and a cost center is provided. */
  readonly costCenter?: string;
  /** Resource Group Name. */
  readonly resourceGroup?: string;
  /** ARM resource id of the reservation. Only applies to records relevant to reservations. */
  readonly reservationId?: string;
  /** User provided display name of the reservation. Last known name for a particular day is populated in the daily data. Only applies to records relevant to reservations. */
  readonly reservationName?: string;
  /** Product Order Id. For reservations this is the Reservation Order ID. */
  readonly productOrderId?: string;
  /** Product Order Name. For reservations this is the SKU that was purchased. */
  readonly productOrderName?: string;
  /** Offer Id. Ex: MS-AZR-0017P, MS-AZR-0148P. */
  readonly offerId?: string;
  /** Is Azure Credit Eligible. */
  readonly isAzureCreditEligible?: boolean;
  /** Term (in months). 1 month for monthly recurring purchase. 12 months for a 1 year reservation. 36 months for a 3 year reservation. */
  readonly term?: string;
  /** Publisher Name. */
  readonly publisherName?: string;
  /** Publisher Type. */
  readonly publisherType?: string;
  /** Plan Name. */
  readonly planName?: string;
  /** Indicates a charge represents credits, usage, a Marketplace purchase, a reservation fee, or a refund. */
  readonly chargeType?: string;
  /** Indicates how frequently this charge will occur. OneTime for purchases which only happen once, Monthly for fees which recur every month, and UsageBased for charges based on how much a service is used. */
  readonly frequency?: string;
  /** Retail price for the resource. */
  readonly payGPrice?: number;
  /** Unique identifier for the applicable benefit. */
  readonly benefitId?: string;
  /** Name of the applicable benefit. */
  readonly benefitName?: string;
  /** Identifier that indicates how the meter is priced. */
  readonly pricingModel?: PricingModelType;
}

export function legacyUsageDetailPropertiesDeserializer(item: any): LegacyUsageDetailProperties {
  return {
    billingAccountId: item["billingAccountId"],
    billingAccountName: item["billingAccountName"],
    billingPeriodStartDate: !item["billingPeriodStartDate"]
      ? item["billingPeriodStartDate"]
      : new Date(item["billingPeriodStartDate"]),
    billingPeriodEndDate: !item["billingPeriodEndDate"]
      ? item["billingPeriodEndDate"]
      : new Date(item["billingPeriodEndDate"]),
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    accountOwnerId: item["accountOwnerId"],
    accountName: item["accountName"],
    subscriptionId: item["subscriptionId"],
    subscriptionName: item["subscriptionName"],
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    product: item["product"],
    partNumber: item["partNumber"],
    meterId: item["meterId"],
    meterDetails: !item["meterDetails"]
      ? item["meterDetails"]
      : meterDetailsResponseDeserializer(item["meterDetails"]),
    quantity: item["quantity"],
    effectivePrice: item["effectivePrice"],
    cost: item["cost"],
    unitPrice: item["unitPrice"],
    billingCurrency: item["billingCurrency"],
    resourceLocation: item["resourceLocation"],
    consumedService: item["consumedService"],
    resourceId: item["resourceId"],
    resourceName: item["resourceName"],
    serviceInfo1: item["serviceInfo1"],
    serviceInfo2: item["serviceInfo2"],
    additionalInfo: item["additionalInfo"],
    invoiceSection: item["invoiceSection"],
    costCenter: item["costCenter"],
    resourceGroup: item["resourceGroup"],
    reservationId: item["reservationId"],
    reservationName: item["reservationName"],
    productOrderId: item["productOrderId"],
    productOrderName: item["productOrderName"],
    offerId: item["offerId"],
    isAzureCreditEligible: item["isAzureCreditEligible"],
    term: item["term"],
    publisherName: item["publisherName"],
    publisherType: item["publisherType"],
    planName: item["planName"],
    chargeType: item["chargeType"],
    frequency: item["frequency"],
    payGPrice: item["payGPrice"],
    benefitId: item["benefitId"],
    benefitName: item["benefitName"],
    pricingModel: item["pricingModel"],
  };
}

/** The properties of the meter detail. */
export interface MeterDetailsResponse {
  /** The name of the meter, within the given meter category */
  readonly meterName?: string;
  /** The category of the meter, for example, 'Cloud services', 'Networking', etc.. */
  readonly meterCategory?: string;
  /** The subcategory of the meter, for example, 'A6 Cloud services', 'ExpressRoute (IXP)', etc.. */
  readonly meterSubCategory?: string;
  /** The unit in which the meter consumption is charged, for example, 'Hours', 'GB', etc. */
  readonly unitOfMeasure?: string;
  /** The service family. */
  readonly serviceFamily?: string;
}

export function meterDetailsResponseDeserializer(item: any): MeterDetailsResponse {
  return {
    meterName: item["meterName"],
    meterCategory: item["meterCategory"],
    meterSubCategory: item["meterSubCategory"],
    unitOfMeasure: item["unitOfMeasure"],
    serviceFamily: item["serviceFamily"],
  };
}

/** Identifier that indicates how the meter is priced. */
export enum KnownPricingModelType {
  /** On Demand */
  OnDemand = "On Demand",
  /** Reservation */
  Reservation = "Reservation",
  /** Spot */
  Spot = "Spot",
}

/**
 * Identifier that indicates how the meter is priced. \
 * {@link KnownPricingModelType} can be used interchangeably with PricingModelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On Demand** \
 * **Reservation** \
 * **Spot**
 */
export type PricingModelType = string;

/** Modern usage detail. */
export interface ModernUsageDetail extends UsageDetail {
  /** Specifies the kind of usage details. */
  kind: "modern";
  /** Billing Account identifier. */
  readonly billingAccountId?: string;
  /** Effective Price that's charged for the usage. */
  readonly effectivePrice?: number;
  /** Identifier that indicates how the meter is priced */
  readonly pricingModel?: PricingModelType;
  /** Name of the Billing Account. */
  readonly billingAccountName?: string;
  /** Billing Period Start Date as in the invoice. */
  readonly billingPeriodStartDate?: Date;
  /** Billing Period End Date as in the invoice. */
  readonly billingPeriodEndDate?: Date;
  /** Identifier for the billing profile that groups costs across invoices in the a singular billing currency across across the customers who have onboarded the Microsoft customer agreement and the customers in CSP who have made entitlement purchases like SaaS, Marketplace, RI, etc. */
  readonly billingProfileId?: string;
  /** Name of the billing profile that groups costs across invoices in the a singular billing currency across across the customers who have onboarded the Microsoft customer agreement and the customers in CSP who have made entitlement purchases like SaaS, Marketplace, RI, etc. */
  readonly billingProfileName?: string;
  /** Unique Microsoft generated identifier for the Azure Subscription. */
  readonly subscriptionGuid?: string;
  /** Name of the Azure Subscription. */
  readonly subscriptionName?: string;
  /** Date for the usage record. */
  readonly date?: Date;
  /** Name of the product that has accrued charges by consumption or purchase as listed in the invoice. Not available for Marketplace. */
  readonly product?: string;
  /** The meter id (GUID). Not available for marketplace. For reserved instance this represents the primary meter for which the reservation was purchased. For the actual VM Size for which the reservation is purchased see productOrderName. */
  readonly meterId?: string;
  /** Identifies the name of the meter against which consumption is measured. */
  readonly meterName?: string;
  /** Identifies the location of the datacenter for certain services that are priced based on datacenter location. */
  readonly meterRegion?: string;
  /** Identifies the top-level service for the usage. */
  readonly meterCategory?: string;
  /** Defines the type or sub-category of Azure service that can affect the rate. */
  readonly meterSubCategory?: string;
  /** List the service family for the product purchased or charged (Example: Storage ; Compute). */
  readonly serviceFamily?: string;
  /** Measure the quantity purchased or consumed.The amount of the meter used during the billing period. */
  readonly quantity?: number;
  /** Identifies the Unit that the service is charged in. For example, GB, hours, 10,000 s. */
  readonly unitOfMeasure?: string;
  /** Instance Name. */
  readonly instanceName?: string;
  /** Estimated extendedCost or blended cost before tax in USD. */
  readonly costInUSD?: number;
  /** Unit Price is the price applicable to you. (your EA or other contract price). */
  readonly unitPrice?: number;
  /** The currency defining the billed cost. */
  readonly billingCurrencyCode?: string;
  /** Name of the resource location. */
  readonly resourceLocation?: string;
  /** Consumed service name. Name of the azure resource provider that emits the usage or was purchased. This value is not provided for marketplace usage. */
  readonly consumedService?: string;
  /** Service-specific metadata. */
  readonly serviceInfo1?: string;
  /** Legacy field with optional service-specific metadata. */
  readonly serviceInfo2?: string;
  /** Additional details of this usage item. Use this field to get usage line item specific details such as the actual VM Size (ServiceType) or the ratio in which the reservation discount is applied. */
  readonly additionalInfo?: string;
  /** Identifier of the project that is being charged in the invoice. Not applicable for Microsoft Customer Agreements onboarded by partners. */
  readonly invoiceSectionId?: string;
  /** Name of the project that is being charged in the invoice. Not applicable for Microsoft Customer Agreements onboarded by partners. */
  readonly invoiceSectionName?: string;
  /** The cost center of this department if it is a department and a cost center is provided. */
  readonly costCenter?: string;
  /** Name of the Azure resource group used for cohesive lifecycle management of resources. */
  readonly resourceGroup?: string;
  /** ARM resource id of the reservation. Only applies to records relevant to reservations. */
  readonly reservationId?: string;
  /** User provided display name of the reservation. Last known name for a particular day is populated in the daily data. Only applies to records relevant to reservations. */
  readonly reservationName?: string;
  /** The identifier for the asset or Azure plan name that the subscription belongs to. For example: Azure Plan. For reservations this is the Reservation Order ID. */
  readonly productOrderId?: string;
  /** Product Order Name. For reservations this is the SKU that was purchased. */
  readonly productOrderName?: string;
  /** Determines if the cost is eligible to be paid for using Azure credits. */
  readonly isAzureCreditEligible?: boolean;
  /** Term (in months). Displays the term for the validity of the offer. For example. In case of reserved instances it displays 12 months for yearly term of reserved instance. For one time purchases or recurring purchases, the terms displays 1 month; This is not applicable for Azure consumption. */
  readonly term?: string;
  /** Name of the publisher of the service including Microsoft or Third Party publishers. */
  readonly publisherName?: string;
  /** Type of publisher that identifies if the publisher is first party, third party reseller or third party agency. */
  readonly publisherType?: string;
  /** Indicates a charge represents credits, usage, a Marketplace purchase, a reservation fee, or a refund. */
  readonly chargeType?: string;
  /** Indicates how frequently this charge will occur. OneTime for purchases which only happen once, Monthly for fees which recur every month, and UsageBased for charges based on how much a service is used. */
  readonly frequency?: string;
  /** ExtendedCost or blended cost before tax in billed currency. */
  readonly costInBillingCurrency?: number;
  /** ExtendedCost or blended cost before tax in pricing currency to correlate with prices. */
  readonly costInPricingCurrency?: number;
  /** Exchange rate used in conversion from pricing currency to billing currency. */
  readonly exchangeRate?: string;
  /** Date on which exchange rate used in conversion from pricing currency to billing currency. */
  readonly exchangeRateDate?: Date;
  /** Invoice ID as on the invoice where the specific transaction appears. */
  readonly invoiceId?: string;
  /** Reference to an original invoice there is a refund (negative cost). This is populated only when there is a refund. */
  readonly previousInvoiceId?: string;
  /** Pricing Billing Currency. */
  readonly pricingCurrencyCode?: string;
  /** Identifier for the product that has accrued charges by consumption or purchase . This is the concatenated key of productId and SkuId in partner center. */
  readonly productIdentifier?: string;
  /** Resource Location Normalized. */
  readonly resourceLocationNormalized?: string;
  /** Start date for the rating period when the service usage was rated for charges. The prices for Azure services are determined for the rating period. */
  readonly servicePeriodStartDate?: Date;
  /** End date for the period when the service usage was rated for charges. The prices for Azure services are determined based on the rating period. */
  readonly servicePeriodEndDate?: Date;
  /** Identifier of the customer's AAD tenant. */
  readonly customerTenantId?: string;
  /** Name of the customer's AAD tenant. */
  readonly customerName?: string;
  /** Identifier for the partner's AAD tenant. */
  readonly partnerTenantId?: string;
  /** Name of the partner' AAD tenant. */
  readonly partnerName?: string;
  /** MPNId for the reseller associated with the subscription. */
  readonly resellerMpnId?: string;
  /** Reseller Name. */
  readonly resellerName?: string;
  /** Publisher Id. */
  readonly publisherId?: string;
  /** Market Price that's charged for the usage. */
  readonly marketPrice?: number;
  /** Exchange Rate from pricing currency to billing currency. */
  readonly exchangeRatePricingToBilling?: number;
  /** The amount of PayG cost before tax in billing currency. */
  readonly paygCostInBillingCurrency?: number;
  /** The amount of PayG cost before tax in US Dollar currency. */
  readonly paygCostInUSD?: number;
  /** Rate of discount applied if there is a partner earned credit (PEC) based on partner admin link access. */
  readonly partnerEarnedCreditRate?: number;
  /** Flag to indicate if partner earned credit has been applied or not. */
  readonly partnerEarnedCreditApplied?: string;
  /** Retail price for the resource. */
  readonly payGPrice?: number;
  /** Unique identifier for the applicable benefit. */
  readonly benefitId?: string;
  /** Name of the applicable benefit. */
  readonly benefitName?: string;
  /** Identifier for Product Category or Line Of Business, Ex - Azure, Microsoft 365, AWS e.t.c */
  readonly provider?: string;
  /** Name for Cost Allocation Rule. */
  readonly costAllocationRuleName?: string;
}

export function modernUsageDetailDeserializer(item: any): ModernUsageDetail {
  return {
    kind: item["kind"],
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._modernUsageDetailPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the usage detail. */
export interface ModernUsageDetailProperties {
  /** Billing Account identifier. */
  readonly billingAccountId?: string;
  /** Effective Price that's charged for the usage. */
  readonly effectivePrice?: number;
  /** Identifier that indicates how the meter is priced */
  readonly pricingModel?: PricingModelType;
  /** Name of the Billing Account. */
  readonly billingAccountName?: string;
  /** Billing Period Start Date as in the invoice. */
  readonly billingPeriodStartDate?: Date;
  /** Billing Period End Date as in the invoice. */
  readonly billingPeriodEndDate?: Date;
  /** Identifier for the billing profile that groups costs across invoices in the a singular billing currency across across the customers who have onboarded the Microsoft customer agreement and the customers in CSP who have made entitlement purchases like SaaS, Marketplace, RI, etc. */
  readonly billingProfileId?: string;
  /** Name of the billing profile that groups costs across invoices in the a singular billing currency across across the customers who have onboarded the Microsoft customer agreement and the customers in CSP who have made entitlement purchases like SaaS, Marketplace, RI, etc. */
  readonly billingProfileName?: string;
  /** Unique Microsoft generated identifier for the Azure Subscription. */
  readonly subscriptionGuid?: string;
  /** Name of the Azure Subscription. */
  readonly subscriptionName?: string;
  /** Date for the usage record. */
  readonly date?: Date;
  /** Name of the product that has accrued charges by consumption or purchase as listed in the invoice. Not available for Marketplace. */
  readonly product?: string;
  /** The meter id (GUID). Not available for marketplace. For reserved instance this represents the primary meter for which the reservation was purchased. For the actual VM Size for which the reservation is purchased see productOrderName. */
  readonly meterId?: string;
  /** Identifies the name of the meter against which consumption is measured. */
  readonly meterName?: string;
  /** Identifies the location of the datacenter for certain services that are priced based on datacenter location. */
  readonly meterRegion?: string;
  /** Identifies the top-level service for the usage. */
  readonly meterCategory?: string;
  /** Defines the type or sub-category of Azure service that can affect the rate. */
  readonly meterSubCategory?: string;
  /** List the service family for the product purchased or charged (Example: Storage ; Compute). */
  readonly serviceFamily?: string;
  /** Measure the quantity purchased or consumed.The amount of the meter used during the billing period. */
  readonly quantity?: number;
  /** Identifies the Unit that the service is charged in. For example, GB, hours, 10,000 s. */
  readonly unitOfMeasure?: string;
  /** Instance Name. */
  readonly instanceName?: string;
  /** Estimated extendedCost or blended cost before tax in USD. */
  readonly costInUSD?: number;
  /** Unit Price is the price applicable to you. (your EA or other contract price). */
  readonly unitPrice?: number;
  /** The currency defining the billed cost. */
  readonly billingCurrencyCode?: string;
  /** Name of the resource location. */
  readonly resourceLocation?: string;
  /** Consumed service name. Name of the azure resource provider that emits the usage or was purchased. This value is not provided for marketplace usage. */
  readonly consumedService?: string;
  /** Service-specific metadata. */
  readonly serviceInfo1?: string;
  /** Legacy field with optional service-specific metadata. */
  readonly serviceInfo2?: string;
  /** Additional details of this usage item. Use this field to get usage line item specific details such as the actual VM Size (ServiceType) or the ratio in which the reservation discount is applied. */
  readonly additionalInfo?: string;
  /** Identifier of the project that is being charged in the invoice. Not applicable for Microsoft Customer Agreements onboarded by partners. */
  readonly invoiceSectionId?: string;
  /** Name of the project that is being charged in the invoice. Not applicable for Microsoft Customer Agreements onboarded by partners. */
  readonly invoiceSectionName?: string;
  /** The cost center of this department if it is a department and a cost center is provided. */
  readonly costCenter?: string;
  /** Name of the Azure resource group used for cohesive lifecycle management of resources. */
  readonly resourceGroup?: string;
  /** ARM resource id of the reservation. Only applies to records relevant to reservations. */
  readonly reservationId?: string;
  /** User provided display name of the reservation. Last known name for a particular day is populated in the daily data. Only applies to records relevant to reservations. */
  readonly reservationName?: string;
  /** The identifier for the asset or Azure plan name that the subscription belongs to. For example: Azure Plan. For reservations this is the Reservation Order ID. */
  readonly productOrderId?: string;
  /** Product Order Name. For reservations this is the SKU that was purchased. */
  readonly productOrderName?: string;
  /** Determines if the cost is eligible to be paid for using Azure credits. */
  readonly isAzureCreditEligible?: boolean;
  /** Term (in months). Displays the term for the validity of the offer. For example. In case of reserved instances it displays 12 months for yearly term of reserved instance. For one time purchases or recurring purchases, the terms displays 1 month; This is not applicable for Azure consumption. */
  readonly term?: string;
  /** Name of the publisher of the service including Microsoft or Third Party publishers. */
  readonly publisherName?: string;
  /** Type of publisher that identifies if the publisher is first party, third party reseller or third party agency. */
  readonly publisherType?: string;
  /** Indicates a charge represents credits, usage, a Marketplace purchase, a reservation fee, or a refund. */
  readonly chargeType?: string;
  /** Indicates how frequently this charge will occur. OneTime for purchases which only happen once, Monthly for fees which recur every month, and UsageBased for charges based on how much a service is used. */
  readonly frequency?: string;
  /** ExtendedCost or blended cost before tax in billed currency. */
  readonly costInBillingCurrency?: number;
  /** ExtendedCost or blended cost before tax in pricing currency to correlate with prices. */
  readonly costInPricingCurrency?: number;
  /** Exchange rate used in conversion from pricing currency to billing currency. */
  readonly exchangeRate?: string;
  /** Date on which exchange rate used in conversion from pricing currency to billing currency. */
  readonly exchangeRateDate?: Date;
  /** Invoice ID as on the invoice where the specific transaction appears. */
  readonly invoiceId?: string;
  /** Reference to an original invoice there is a refund (negative cost). This is populated only when there is a refund. */
  readonly previousInvoiceId?: string;
  /** Pricing Billing Currency. */
  readonly pricingCurrencyCode?: string;
  /** Identifier for the product that has accrued charges by consumption or purchase . This is the concatenated key of productId and SkuId in partner center. */
  readonly productIdentifier?: string;
  /** Resource Location Normalized. */
  readonly resourceLocationNormalized?: string;
  /** Start date for the rating period when the service usage was rated for charges. The prices for Azure services are determined for the rating period. */
  readonly servicePeriodStartDate?: Date;
  /** End date for the period when the service usage was rated for charges. The prices for Azure services are determined based on the rating period. */
  readonly servicePeriodEndDate?: Date;
  /** Identifier of the customer's AAD tenant. */
  readonly customerTenantId?: string;
  /** Name of the customer's AAD tenant. */
  readonly customerName?: string;
  /** Identifier for the partner's AAD tenant. */
  readonly partnerTenantId?: string;
  /** Name of the partner' AAD tenant. */
  readonly partnerName?: string;
  /** MPNId for the reseller associated with the subscription. */
  readonly resellerMpnId?: string;
  /** Reseller Name. */
  readonly resellerName?: string;
  /** Publisher Id. */
  readonly publisherId?: string;
  /** Market Price that's charged for the usage. */
  readonly marketPrice?: number;
  /** Exchange Rate from pricing currency to billing currency. */
  readonly exchangeRatePricingToBilling?: number;
  /** The amount of PayG cost before tax in billing currency. */
  readonly paygCostInBillingCurrency?: number;
  /** The amount of PayG cost before tax in US Dollar currency. */
  readonly paygCostInUSD?: number;
  /** Rate of discount applied if there is a partner earned credit (PEC) based on partner admin link access. */
  readonly partnerEarnedCreditRate?: number;
  /** Flag to indicate if partner earned credit has been applied or not. */
  readonly partnerEarnedCreditApplied?: string;
  /** Retail price for the resource. */
  readonly payGPrice?: number;
  /** Unique identifier for the applicable benefit. */
  readonly benefitId?: string;
  /** Name of the applicable benefit. */
  readonly benefitName?: string;
  /** Identifier for Product Category or Line Of Business, Ex - Azure, Microsoft 365, AWS e.t.c */
  readonly provider?: string;
  /** Name for Cost Allocation Rule. */
  readonly costAllocationRuleName?: string;
}

export function modernUsageDetailPropertiesDeserializer(item: any): ModernUsageDetailProperties {
  return {
    billingAccountId: item["billingAccountId"],
    effectivePrice: item["effectivePrice"],
    pricingModel: item["pricingModel"],
    billingAccountName: item["billingAccountName"],
    billingPeriodStartDate: !item["billingPeriodStartDate"]
      ? item["billingPeriodStartDate"]
      : new Date(item["billingPeriodStartDate"]),
    billingPeriodEndDate: !item["billingPeriodEndDate"]
      ? item["billingPeriodEndDate"]
      : new Date(item["billingPeriodEndDate"]),
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    subscriptionGuid: item["subscriptionGuid"],
    subscriptionName: item["subscriptionName"],
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    product: item["product"],
    meterId: item["meterId"],
    meterName: item["meterName"],
    meterRegion: item["meterRegion"],
    meterCategory: item["meterCategory"],
    meterSubCategory: item["meterSubCategory"],
    serviceFamily: item["serviceFamily"],
    quantity: item["quantity"],
    unitOfMeasure: item["unitOfMeasure"],
    instanceName: item["instanceName"],
    costInUSD: item["costInUSD"],
    unitPrice: item["unitPrice"],
    billingCurrencyCode: item["billingCurrencyCode"],
    resourceLocation: item["resourceLocation"],
    consumedService: item["consumedService"],
    serviceInfo1: item["serviceInfo1"],
    serviceInfo2: item["serviceInfo2"],
    additionalInfo: item["additionalInfo"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionName: item["invoiceSectionName"],
    costCenter: item["costCenter"],
    resourceGroup: item["resourceGroup"],
    reservationId: item["reservationId"],
    reservationName: item["reservationName"],
    productOrderId: item["productOrderId"],
    productOrderName: item["productOrderName"],
    isAzureCreditEligible: item["isAzureCreditEligible"],
    term: item["term"],
    publisherName: item["publisherName"],
    publisherType: item["publisherType"],
    chargeType: item["chargeType"],
    frequency: item["frequency"],
    costInBillingCurrency: item["costInBillingCurrency"],
    costInPricingCurrency: item["costInPricingCurrency"],
    exchangeRate: item["exchangeRate"],
    exchangeRateDate: !item["exchangeRateDate"]
      ? item["exchangeRateDate"]
      : new Date(item["exchangeRateDate"]),
    invoiceId: item["invoiceId"],
    previousInvoiceId: item["previousInvoiceId"],
    pricingCurrencyCode: item["pricingCurrencyCode"],
    productIdentifier: item["productIdentifier"],
    resourceLocationNormalized: item["resourceLocationNormalized"],
    servicePeriodStartDate: !item["servicePeriodStartDate"]
      ? item["servicePeriodStartDate"]
      : new Date(item["servicePeriodStartDate"]),
    servicePeriodEndDate: !item["servicePeriodEndDate"]
      ? item["servicePeriodEndDate"]
      : new Date(item["servicePeriodEndDate"]),
    customerTenantId: item["customerTenantId"],
    customerName: item["customerName"],
    partnerTenantId: item["partnerTenantId"],
    partnerName: item["partnerName"],
    resellerMpnId: item["resellerMpnId"],
    resellerName: item["resellerName"],
    publisherId: item["publisherId"],
    marketPrice: item["marketPrice"],
    exchangeRatePricingToBilling: item["exchangeRatePricingToBilling"],
    paygCostInBillingCurrency: item["paygCostInBillingCurrency"],
    paygCostInUSD: item["paygCostInUSD"],
    partnerEarnedCreditRate: item["partnerEarnedCreditRate"],
    partnerEarnedCreditApplied: item["partnerEarnedCreditApplied"],
    payGPrice: item["payGPrice"],
    benefitId: item["benefitId"],
    benefitName: item["benefitName"],
    provider: item["provider"],
    costAllocationRuleName: item["costAllocationRuleName"],
  };
}

/** Result of listing marketplaces. It contains a list of available marketplaces in reverse chronological order by billing period. */
export interface _MarketplacesListResult {
  /** The list of marketplaces. */
  readonly value?: Marketplace[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _marketplacesListResultDeserializer(item: any): _MarketplacesListResult {
  return {
    value: !item["value"] ? item["value"] : marketplaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function marketplaceArrayDeserializer(result: Array<Marketplace>): any[] {
  return result.map((item) => {
    return marketplaceDeserializer(item);
  });
}

/** A marketplace resource. */
export interface Marketplace extends Resource {
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** The id of the billing period resource that the usage belongs to. */
  readonly billingPeriodId?: string;
  /** The start of the date time range covered by the usage detail. */
  readonly usageStart?: Date;
  /** The end of the date time range covered by the usage detail. */
  readonly usageEnd?: Date;
  /** The marketplace resource rate. */
  readonly resourceRate?: number;
  /** The type of offer. */
  readonly offerName?: string;
  /** The name of resource group. */
  readonly resourceGroup?: string;
  /** Additional information. */
  readonly additionalInfo?: string;
  /** The order number. */
  readonly orderNumber?: string;
  /** The name of the resource instance that the usage is about. */
  readonly instanceName?: string;
  /** The uri of the resource instance that the usage is about. */
  readonly instanceId?: string;
  /** The ISO currency in which the meter is charged, for example, USD. */
  readonly currency?: string;
  /** The quantity of usage. */
  readonly consumedQuantity?: number;
  /** The unit of measure. */
  readonly unitOfMeasure?: string;
  /** The amount of cost before tax. */
  readonly pretaxCost?: number;
  /** The estimated usage is subject to change. */
  readonly isEstimated?: boolean;
  /** The meter id (GUID). */
  readonly meterId?: string;
  /** Subscription guid. */
  readonly subscriptionGuid?: string;
  /** Subscription name. */
  readonly subscriptionName?: string;
  /** Account name. */
  readonly accountName?: string;
  /** Department name. */
  readonly departmentName?: string;
  /** Consumed service name. */
  readonly consumedService?: string;
  /** The cost center of this department if it is a department and a costcenter exists */
  readonly costCenter?: string;
  /** Additional details of this usage item. By default this is not populated, unless it's specified in $expand. */
  readonly additionalProperties?: string;
  /** The name of publisher. */
  readonly publisherName?: string;
  /** The name of plan. */
  readonly planName?: string;
  /** Flag indicating whether this is a recurring charge or not. */
  readonly isRecurringCharge?: boolean;
}

export function marketplaceDeserializer(item: any): Marketplace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _marketplacePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the marketplace usage detail. */
export interface MarketplaceProperties {
  /** The id of the billing period resource that the usage belongs to. */
  readonly billingPeriodId?: string;
  /** The start of the date time range covered by the usage detail. */
  readonly usageStart?: Date;
  /** The end of the date time range covered by the usage detail. */
  readonly usageEnd?: Date;
  /** The marketplace resource rate. */
  readonly resourceRate?: number;
  /** The type of offer. */
  readonly offerName?: string;
  /** The name of resource group. */
  readonly resourceGroup?: string;
  /** Additional information. */
  readonly additionalInfo?: string;
  /** The order number. */
  readonly orderNumber?: string;
  /** The name of the resource instance that the usage is about. */
  readonly instanceName?: string;
  /** The uri of the resource instance that the usage is about. */
  readonly instanceId?: string;
  /** The ISO currency in which the meter is charged, for example, USD. */
  readonly currency?: string;
  /** The quantity of usage. */
  readonly consumedQuantity?: number;
  /** The unit of measure. */
  readonly unitOfMeasure?: string;
  /** The amount of cost before tax. */
  readonly pretaxCost?: number;
  /** The estimated usage is subject to change. */
  readonly isEstimated?: boolean;
  /** The meter id (GUID). */
  readonly meterId?: string;
  /** Subscription guid. */
  readonly subscriptionGuid?: string;
  /** Subscription name. */
  readonly subscriptionName?: string;
  /** Account name. */
  readonly accountName?: string;
  /** Department name. */
  readonly departmentName?: string;
  /** Consumed service name. */
  readonly consumedService?: string;
  /** The cost center of this department if it is a department and a costcenter exists */
  readonly costCenter?: string;
  /** Additional details of this usage item. By default this is not populated, unless it's specified in $expand. */
  readonly additionalProperties?: string;
  /** The name of publisher. */
  readonly publisherName?: string;
  /** The name of plan. */
  readonly planName?: string;
  /** Flag indicating whether this is a recurring charge or not. */
  readonly isRecurringCharge?: boolean;
}

export function marketplacePropertiesDeserializer(item: any): MarketplaceProperties {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: !item["usageStart"] ? item["usageStart"] : new Date(item["usageStart"]),
    usageEnd: !item["usageEnd"] ? item["usageEnd"] : new Date(item["usageEnd"]),
    resourceRate: item["resourceRate"],
    offerName: item["offerName"],
    resourceGroup: item["resourceGroup"],
    additionalInfo: item["additionalInfo"],
    orderNumber: item["orderNumber"],
    instanceName: item["instanceName"],
    instanceId: item["instanceId"],
    currency: item["currency"],
    consumedQuantity: item["consumedQuantity"],
    unitOfMeasure: item["unitOfMeasure"],
    pretaxCost: item["pretaxCost"],
    isEstimated: item["isEstimated"],
    meterId: item["meterId"],
    subscriptionGuid: item["subscriptionGuid"],
    subscriptionName: item["subscriptionName"],
    accountName: item["accountName"],
    departmentName: item["departmentName"],
    consumedService: item["consumedService"],
    costCenter: item["costCenter"],
    additionalProperties: item["additionalProperties"],
    publisherName: item["publisherName"],
    planName: item["planName"],
    isRecurringCharge: item["isRecurringCharge"],
  };
}

/** A resource listing all tags. */
export interface TagsResult extends ProxyResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /** A list of Tag. */
  tags?: Tag[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** The link (url) to the previous page of results. */
  readonly previousLink?: string;
}

export function tagsResultDeserializer(item: any): TagsResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tagsResultPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** The properties of the tag. */
export interface TagProperties {
  /** A list of Tag. */
  tags?: Tag[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** The link (url) to the previous page of results. */
  readonly previousLink?: string;
}

export function tagPropertiesDeserializer(item: any): TagProperties {
  return {
    tags: !item["tags"] ? item["tags"] : tagArrayDeserializer(item["tags"]),
    nextLink: item["nextLink"],
    previousLink: item["previousLink"],
  };
}

export function tagArrayDeserializer(result: Array<Tag>): any[] {
  return result.map((item) => {
    return tagDeserializer(item);
  });
}

/** The tag resource. */
export interface Tag {
  /** Tag key. */
  key?: string;
  /** Tag values. */
  value?: string[];
}

export function tagDeserializer(item: any): Tag {
  return {
    key: item["key"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

/** Result of listing charge summary. */
export interface ChargesListResult {
  /** The list of charge summary */
  readonly value?: ChargeSummaryUnion[];
}

export function chargesListResultDeserializer(item: any): ChargesListResult {
  return {
    value: !item["value"] ? item["value"] : chargeSummaryUnionArrayDeserializer(item["value"]),
  };
}

export function chargeSummaryUnionArrayDeserializer(result: Array<ChargeSummaryUnion>): any[] {
  return result.map((item) => {
    return chargeSummaryUnionDeserializer(item);
  });
}

/** A charge summary resource. */
export interface ChargeSummary extends ProxyResource {
  /** Specifies the kind of charge summary. */
  /** The discriminator possible values: legacy, modern */
  kind: ChargeSummaryKind;
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
}

export function chargeSummaryDeserializer(item: any): ChargeSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    eTag: item["eTag"],
  };
}

/** Alias for ChargeSummaryUnion */
export type ChargeSummaryUnion = LegacyChargeSummary | ModernChargeSummary | ChargeSummary;

export function chargeSummaryUnionDeserializer(item: any): ChargeSummaryUnion {
  switch (item["kind"]) {
    case "legacy":
      return legacyChargeSummaryDeserializer(item as LegacyChargeSummary);

    case "modern":
      return modernChargeSummaryDeserializer(item as ModernChargeSummary);

    default:
      return chargeSummaryDeserializer(item);
  }
}

/** Specifies the kind of charge summary. */
export enum KnownChargeSummaryKind {
  /** legacy */
  Legacy = "legacy",
  /** modern */
  Modern = "modern",
}

/**
 * Specifies the kind of charge summary. \
 * {@link KnownChargeSummaryKind} can be used interchangeably with ChargeSummaryKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **legacy** \
 * **modern**
 */
export type ChargeSummaryKind = string;

/** Legacy charge summary. */
export interface LegacyChargeSummary extends ChargeSummary {
  /** Specifies the kind of charge summary. */
  kind: "legacy";
  /** The id of the billing period resource that the charge belongs to. */
  readonly billingPeriodId?: string;
  /** Usage start date. */
  readonly usageStart?: string;
  /** Usage end date. */
  readonly usageEnd?: string;
  /** Azure Charges. */
  readonly azureCharges?: number;
  /** Charges Billed separately. */
  readonly chargesBilledSeparately?: number;
  /** Marketplace Charges. */
  readonly azureMarketplaceCharges?: number;
  /** Currency Code */
  readonly currency?: string;
}

export function legacyChargeSummaryDeserializer(item: any): LegacyChargeSummary {
  return {
    kind: item["kind"],
    eTag: item["eTag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._legacyChargeSummaryPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of legacy charge summary. */
export interface LegacyChargeSummaryProperties {
  /** The id of the billing period resource that the charge belongs to. */
  readonly billingPeriodId?: string;
  /** Usage start date. */
  readonly usageStart?: string;
  /** Usage end date. */
  readonly usageEnd?: string;
  /** Azure Charges. */
  readonly azureCharges?: number;
  /** Charges Billed separately. */
  readonly chargesBilledSeparately?: number;
  /** Marketplace Charges. */
  readonly azureMarketplaceCharges?: number;
  /** Currency Code */
  readonly currency?: string;
}

export function legacyChargeSummaryPropertiesDeserializer(
  item: any,
): LegacyChargeSummaryProperties {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: item["usageStart"],
    usageEnd: item["usageEnd"],
    azureCharges: item["azureCharges"],
    chargesBilledSeparately: item["chargesBilledSeparately"],
    azureMarketplaceCharges: item["azureMarketplaceCharges"],
    currency: item["currency"],
  };
}

/** Modern charge summary. */
export interface ModernChargeSummary extends ChargeSummary {
  /** Specifies the kind of charge summary. */
  kind: "modern";
  /** The id of the billing period resource that the charge belongs to. */
  readonly billingPeriodId?: string;
  /** Usage start date. */
  readonly usageStart?: string;
  /** Usage end date. */
  readonly usageEnd?: string;
  /** Azure Charges. */
  readonly azureCharges?: Amount;
  /** Charges Billed separately. */
  readonly chargesBilledSeparately?: Amount;
  /** Marketplace Charges. */
  readonly marketplaceCharges?: Amount;
  /** Billing Account Id */
  readonly billingAccountId?: string;
  /** Billing Profile Id */
  readonly billingProfileId?: string;
  /** Invoice Section Id */
  readonly invoiceSectionId?: string;
  /** Customer Id */
  readonly customerId?: string;
  /** Is charge Invoiced */
  readonly isInvoiced?: boolean;
  /** Subscription guid. */
  readonly subscriptionId?: string;
}

export function modernChargeSummaryDeserializer(item: any): ModernChargeSummary {
  return {
    kind: item["kind"],
    eTag: item["eTag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._modernChargeSummaryPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of modern charge summary. */
export interface ModernChargeSummaryProperties {
  /** The id of the billing period resource that the charge belongs to. */
  readonly billingPeriodId?: string;
  /** Usage start date. */
  readonly usageStart?: string;
  /** Usage end date. */
  readonly usageEnd?: string;
  /** Azure Charges. */
  readonly azureCharges?: Amount;
  /** Charges Billed separately. */
  readonly chargesBilledSeparately?: Amount;
  /** Marketplace Charges. */
  readonly marketplaceCharges?: Amount;
  /** Billing Account Id */
  readonly billingAccountId?: string;
  /** Billing Profile Id */
  readonly billingProfileId?: string;
  /** Invoice Section Id */
  readonly invoiceSectionId?: string;
  /** Customer Id */
  readonly customerId?: string;
  /** Is charge Invoiced */
  readonly isInvoiced?: boolean;
  /** Subscription guid. */
  readonly subscriptionId?: string;
}

export function modernChargeSummaryPropertiesDeserializer(
  item: any,
): ModernChargeSummaryProperties {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: item["usageStart"],
    usageEnd: item["usageEnd"],
    azureCharges: !item["azureCharges"]
      ? item["azureCharges"]
      : amountDeserializer(item["azureCharges"]),
    chargesBilledSeparately: !item["chargesBilledSeparately"]
      ? item["chargesBilledSeparately"]
      : amountDeserializer(item["chargesBilledSeparately"]),
    marketplaceCharges: !item["marketplaceCharges"]
      ? item["marketplaceCharges"]
      : amountDeserializer(item["marketplaceCharges"]),
    billingAccountId: item["billingAccountId"],
    billingProfileId: item["billingProfileId"],
    invoiceSectionId: item["invoiceSectionId"],
    customerId: item["customerId"],
    isInvoiced: item["isInvoiced"],
    subscriptionId: item["subscriptionId"],
  };
}

/** A balance resource. */
export interface Balance extends Resource {
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** The ISO currency in which the meter is charged, for example, USD. */
  readonly currency?: string;
  /** The beginning balance for the billing period. */
  readonly beginningBalance?: number;
  /** The ending balance for the billing period (for open periods this will be updated daily). */
  readonly endingBalance?: number;
  /** Total new purchase amount. */
  readonly newPurchases?: number;
  /** Total adjustment amount. */
  readonly adjustments?: number;
  /** Total Commitment usage. */
  readonly utilized?: number;
  /** Overage for Azure services. */
  readonly serviceOverage?: number;
  /** Charges Billed separately. */
  readonly chargesBilledSeparately?: number;
  /** serviceOverage + chargesBilledSeparately. */
  readonly totalOverage?: number;
  /** Azure service commitment + total Overage. */
  readonly totalUsage?: number;
  /** Total charges for Azure Marketplace. */
  readonly azureMarketplaceServiceCharges?: number;
  /** The billing frequency. */
  billingFrequency?: BillingFrequency;
  /** Price is hidden or not. */
  readonly priceHidden?: boolean;
  /** Overage Refunds */
  readonly overageRefund?: number;
  /** List of new purchases. */
  readonly newPurchasesDetails?: BalancePropertiesNewPurchasesDetailsItem[];
  /** List of Adjustments (Promo credit, SIE credit etc.). */
  readonly adjustmentDetails?: BalancePropertiesAdjustmentDetailsItem[];
}

export function balanceDeserializer(item: any): Balance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _balancePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the balance. */
export interface BalanceProperties {
  /** The ISO currency in which the meter is charged, for example, USD. */
  readonly currency?: string;
  /** The beginning balance for the billing period. */
  readonly beginningBalance?: number;
  /** The ending balance for the billing period (for open periods this will be updated daily). */
  readonly endingBalance?: number;
  /** Total new purchase amount. */
  readonly newPurchases?: number;
  /** Total adjustment amount. */
  readonly adjustments?: number;
  /** Total Commitment usage. */
  readonly utilized?: number;
  /** Overage for Azure services. */
  readonly serviceOverage?: number;
  /** Charges Billed separately. */
  readonly chargesBilledSeparately?: number;
  /** serviceOverage + chargesBilledSeparately. */
  readonly totalOverage?: number;
  /** Azure service commitment + total Overage. */
  readonly totalUsage?: number;
  /** Total charges for Azure Marketplace. */
  readonly azureMarketplaceServiceCharges?: number;
  /** The billing frequency. */
  billingFrequency?: BillingFrequency;
  /** Price is hidden or not. */
  readonly priceHidden?: boolean;
  /** Overage Refunds */
  readonly overageRefund?: number;
  /** List of new purchases. */
  readonly newPurchasesDetails?: BalancePropertiesNewPurchasesDetailsItem[];
  /** List of Adjustments (Promo credit, SIE credit etc.). */
  readonly adjustmentDetails?: BalancePropertiesAdjustmentDetailsItem[];
}

export function balancePropertiesDeserializer(item: any): BalanceProperties {
  return {
    currency: item["currency"],
    beginningBalance: item["beginningBalance"],
    endingBalance: item["endingBalance"],
    newPurchases: item["newPurchases"],
    adjustments: item["adjustments"],
    utilized: item["utilized"],
    serviceOverage: item["serviceOverage"],
    chargesBilledSeparately: item["chargesBilledSeparately"],
    totalOverage: item["totalOverage"],
    totalUsage: item["totalUsage"],
    azureMarketplaceServiceCharges: item["azureMarketplaceServiceCharges"],
    billingFrequency: item["billingFrequency"],
    priceHidden: item["priceHidden"],
    overageRefund: item["overageRefund"],
    newPurchasesDetails: !item["newPurchasesDetails"]
      ? item["newPurchasesDetails"]
      : balancePropertiesNewPurchasesDetailsItemArrayDeserializer(item["newPurchasesDetails"]),
    adjustmentDetails: !item["adjustmentDetails"]
      ? item["adjustmentDetails"]
      : balancePropertiesAdjustmentDetailsItemArrayDeserializer(item["adjustmentDetails"]),
  };
}

/** The billing frequency. */
export enum KnownBillingFrequency {
  /** Month */
  Month = "Month",
  /** Quarter */
  Quarter = "Quarter",
  /** Year */
  Year = "Year",
}

/**
 * The billing frequency. \
 * {@link KnownBillingFrequency} can be used interchangeably with BillingFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Month** \
 * **Quarter** \
 * **Year**
 */
export type BillingFrequency = string;

export function balancePropertiesNewPurchasesDetailsItemArrayDeserializer(
  result: Array<BalancePropertiesNewPurchasesDetailsItem>,
): any[] {
  return result.map((item) => {
    return balancePropertiesNewPurchasesDetailsItemDeserializer(item);
  });
}

/** model interface BalancePropertiesNewPurchasesDetailsItem */
export interface BalancePropertiesNewPurchasesDetailsItem {
  /** the name of new purchase. */
  readonly name?: string;
  /** the value of new purchase. */
  readonly value?: number;
}

export function balancePropertiesNewPurchasesDetailsItemDeserializer(
  item: any,
): BalancePropertiesNewPurchasesDetailsItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function balancePropertiesAdjustmentDetailsItemArrayDeserializer(
  result: Array<BalancePropertiesAdjustmentDetailsItem>,
): any[] {
  return result.map((item) => {
    return balancePropertiesAdjustmentDetailsItemDeserializer(item);
  });
}

/** model interface BalancePropertiesAdjustmentDetailsItem */
export interface BalancePropertiesAdjustmentDetailsItem {
  /** the name of new adjustment. */
  readonly name?: string;
  /** the value of new adjustment. */
  readonly value?: number;
}

export function balancePropertiesAdjustmentDetailsItemDeserializer(
  item: any,
): BalancePropertiesAdjustmentDetailsItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Result of listing reservation summaries. */
export interface _ReservationSummariesListResult {
  /** The list of reservation summaries. */
  readonly value?: ReservationSummary[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _reservationSummariesListResultDeserializer(
  item: any,
): _ReservationSummariesListResult {
  return {
    value: !item["value"] ? item["value"] : reservationSummaryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationSummaryArrayDeserializer(result: Array<ReservationSummary>): any[] {
  return result.map((item) => {
    return reservationSummaryDeserializer(item);
  });
}

/** reservation summary resource. */
export interface ReservationSummary extends Resource {
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The reservation ID is the identifier of a reservation within a reservation order. Each reservation is the grouping for applying the benefit scope and also specifies the number of instances to which the reservation benefit can be applied to. */
  readonly reservationId?: string;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly skuName?: string;
  /** This is the total hours reserved. E.g. if reservation for 1 instance was made on 1 PM, this will be 11 hours for that day and 24 hours from subsequent days */
  readonly reservedHours?: number;
  /** Data corresponding to the utilization record. If the grain of data is monthly, it will be first day of month. */
  readonly usageDate?: Date;
  /** Total used hours by the reservation */
  readonly usedHours?: number;
  /** This is the minimum hourly utilization in the usage time (day or month). E.g. if usage record corresponds to 12/10/2017 and on that for hour 4 and 5, utilization was 10%, this field will return 10% for that day */
  readonly minUtilizationPercentage?: number;
  /** This is average utilization for the entire time range. (day or month depending on the grain) */
  readonly avgUtilizationPercentage?: number;
  /** This is the maximum hourly utilization in the usage time (day or month). E.g. if usage record corresponds to 12/10/2017 and on that for hour 4 and 5, utilization was 100%, this field will return 100% for that day. */
  readonly maxUtilizationPercentage?: number;
  /** The reservation kind. */
  readonly kind?: string;
  /** This is the purchased quantity for the reservationId. */
  readonly purchasedQuantity?: number;
  /** This is the remaining quantity for the reservationId. */
  readonly remainingQuantity?: number;
  /** This is the total count of instances that are reserved for the reservationId. */
  readonly totalReservedQuantity?: number;
  /** This is the used quantity for the reservationId. */
  readonly usedQuantity?: number;
  /** This is the utilized percentage for the reservation Id. */
  readonly utilizedPercentage?: number;
}

export function reservationSummaryDeserializer(item: any): ReservationSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _reservationSummaryPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the reservation summary. */
export interface ReservationSummaryProperties {
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The reservation ID is the identifier of a reservation within a reservation order. Each reservation is the grouping for applying the benefit scope and also specifies the number of instances to which the reservation benefit can be applied to. */
  readonly reservationId?: string;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly skuName?: string;
  /** This is the total hours reserved. E.g. if reservation for 1 instance was made on 1 PM, this will be 11 hours for that day and 24 hours from subsequent days */
  readonly reservedHours?: number;
  /** Data corresponding to the utilization record. If the grain of data is monthly, it will be first day of month. */
  readonly usageDate?: Date;
  /** Total used hours by the reservation */
  readonly usedHours?: number;
  /** This is the minimum hourly utilization in the usage time (day or month). E.g. if usage record corresponds to 12/10/2017 and on that for hour 4 and 5, utilization was 10%, this field will return 10% for that day */
  readonly minUtilizationPercentage?: number;
  /** This is average utilization for the entire time range. (day or month depending on the grain) */
  readonly avgUtilizationPercentage?: number;
  /** This is the maximum hourly utilization in the usage time (day or month). E.g. if usage record corresponds to 12/10/2017 and on that for hour 4 and 5, utilization was 100%, this field will return 100% for that day. */
  readonly maxUtilizationPercentage?: number;
  /** The reservation kind. */
  readonly kind?: string;
  /** This is the purchased quantity for the reservationId. */
  readonly purchasedQuantity?: number;
  /** This is the remaining quantity for the reservationId. */
  readonly remainingQuantity?: number;
  /** This is the total count of instances that are reserved for the reservationId. */
  readonly totalReservedQuantity?: number;
  /** This is the used quantity for the reservationId. */
  readonly usedQuantity?: number;
  /** This is the utilized percentage for the reservation Id. */
  readonly utilizedPercentage?: number;
}

export function reservationSummaryPropertiesDeserializer(item: any): ReservationSummaryProperties {
  return {
    reservationOrderId: item["reservationOrderId"],
    reservationId: item["reservationId"],
    skuName: item["skuName"],
    reservedHours: item["reservedHours"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    usedHours: item["usedHours"],
    minUtilizationPercentage: item["minUtilizationPercentage"],
    avgUtilizationPercentage: item["avgUtilizationPercentage"],
    maxUtilizationPercentage: item["maxUtilizationPercentage"],
    kind: item["kind"],
    purchasedQuantity: item["purchasedQuantity"],
    remainingQuantity: item["remainingQuantity"],
    totalReservedQuantity: item["totalReservedQuantity"],
    usedQuantity: item["usedQuantity"],
    utilizedPercentage: item["utilizedPercentage"],
  };
}

/** Result of listing reservation details. */
export interface _ReservationDetailsListResult {
  /** The list of reservation details. */
  readonly value?: ReservationDetail[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _reservationDetailsListResultDeserializer(
  item: any,
): _ReservationDetailsListResult {
  return {
    value: !item["value"] ? item["value"] : reservationDetailArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationDetailArrayDeserializer(result: Array<ReservationDetail>): any[] {
  return result.map((item) => {
    return reservationDetailDeserializer(item);
  });
}

/** reservation detail resource. */
export interface ReservationDetail extends Resource {
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The instance Flexibility Ratio. */
  readonly instanceFlexibilityRatio?: string;
  /** The instance Flexibility Group. */
  readonly instanceFlexibilityGroup?: string;
  /** The reservation ID is the identifier of a reservation within a reservation order. Each reservation is the grouping for applying the benefit scope and also specifies the number of instances to which the reservation benefit can be applied to. */
  readonly reservationId?: string;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly skuName?: string;
  /** This is the total hours reserved for the day. E.g. if reservation for 1 instance was made on 1 PM, this will be 11 hours for that day and 24 hours from subsequent days. */
  readonly reservedHours?: number;
  /** The date on which consumption occurred. */
  readonly usageDate?: Date;
  /** This is the total hours used by the instance. */
  readonly usedHours?: number;
  /** This identifier is the name of the resource or the fully qualified Resource ID. */
  readonly instanceId?: string;
  /** This is the total count of instances that are reserved for the reservationId. */
  readonly totalReservedQuantity?: number;
  /** The reservation kind. */
  readonly kind?: string;
}

export function reservationDetailDeserializer(item: any): ReservationDetail {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _reservationDetailPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the reservation detail. */
export interface ReservationDetailProperties {
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The instance Flexibility Ratio. */
  readonly instanceFlexibilityRatio?: string;
  /** The instance Flexibility Group. */
  readonly instanceFlexibilityGroup?: string;
  /** The reservation ID is the identifier of a reservation within a reservation order. Each reservation is the grouping for applying the benefit scope and also specifies the number of instances to which the reservation benefit can be applied to. */
  readonly reservationId?: string;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly skuName?: string;
  /** This is the total hours reserved for the day. E.g. if reservation for 1 instance was made on 1 PM, this will be 11 hours for that day and 24 hours from subsequent days. */
  readonly reservedHours?: number;
  /** The date on which consumption occurred. */
  readonly usageDate?: Date;
  /** This is the total hours used by the instance. */
  readonly usedHours?: number;
  /** This identifier is the name of the resource or the fully qualified Resource ID. */
  readonly instanceId?: string;
  /** This is the total count of instances that are reserved for the reservationId. */
  readonly totalReservedQuantity?: number;
  /** The reservation kind. */
  readonly kind?: string;
}

export function reservationDetailPropertiesDeserializer(item: any): ReservationDetailProperties {
  return {
    reservationOrderId: item["reservationOrderId"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    reservationId: item["reservationId"],
    skuName: item["skuName"],
    reservedHours: item["reservedHours"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    usedHours: item["usedHours"],
    instanceId: item["instanceId"],
    totalReservedQuantity: item["totalReservedQuantity"],
    kind: item["kind"],
  };
}

/** Result of listing reservation recommendations. */
export interface _ReservationRecommendationsListResult {
  /** The list of reservation recommendations. */
  readonly value?: ReservationRecommendationUnion[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** The link (url) to the previous page of results. */
  readonly previousLink?: string;
}

export function _reservationRecommendationsListResultDeserializer(
  item: any,
): _ReservationRecommendationsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : reservationRecommendationUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    previousLink: item["previousLink"],
  };
}

export function reservationRecommendationUnionArrayDeserializer(
  result: Array<ReservationRecommendationUnion>,
): any[] {
  return result.map((item) => {
    return reservationRecommendationUnionDeserializer(item);
  });
}

/** A reservation recommendation resource. */
export interface ReservationRecommendation {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Resource location */
  readonly location?: string;
  /** Resource sku */
  readonly sku?: string;
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** Specifies the kind of reservation recommendation. */
  /** The discriminator possible values: legacy, modern */
  kind: ReservationRecommendationKind;
}

export function reservationRecommendationDeserializer(item: any): ReservationRecommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    sku: item["sku"],
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    kind: item["kind"],
  };
}

/** Alias for ReservationRecommendationUnion */
export type ReservationRecommendationUnion =
  LegacyReservationRecommendation | ModernReservationRecommendation | ReservationRecommendation;

export function reservationRecommendationUnionDeserializer(
  item: any,
): ReservationRecommendationUnion {
  switch (item["kind"]) {
    case "legacy":
      return legacyReservationRecommendationDeserializer(item as LegacyReservationRecommendation);

    case "modern":
      return modernReservationRecommendationDeserializer(item as ModernReservationRecommendation);

    default:
      return reservationRecommendationDeserializer(item);
  }
}

/** Specifies the kind of reservation recommendation. */
export enum KnownReservationRecommendationKind {
  /** legacy */
  Legacy = "legacy",
  /** modern */
  Modern = "modern",
}

/**
 * Specifies the kind of reservation recommendation. \
 * {@link KnownReservationRecommendationKind} can be used interchangeably with ReservationRecommendationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **legacy** \
 * **modern**
 */
export type ReservationRecommendationKind = string;

/** Legacy reservation recommendation. */
export interface LegacyReservationRecommendation extends ReservationRecommendation {
  /** Properties for legacy reservation recommendation */
  properties: LegacyReservationRecommendationPropertiesUnion;
  /** Specifies the kind of reservation recommendation. */
  kind: "legacy";
}

export function legacyReservationRecommendationDeserializer(
  item: any,
): LegacyReservationRecommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    sku: item["sku"],
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    kind: item["kind"],
    properties: legacyReservationRecommendationPropertiesUnionDeserializer(item["properties"]),
  };
}

/** The properties of the reservation recommendation. */
export interface LegacyReservationRecommendationProperties {
  /** The number of days of usage to look back for recommendation. */
  readonly lookBackPeriod?: string;
  /** The instance Flexibility Ratio. */
  readonly instanceFlexibilityRatio?: number;
  /** The instance Flexibility Group. */
  readonly instanceFlexibilityGroup?: string;
  /** The normalized Size. */
  readonly normalizedSize?: string;
  /** The recommended Quantity Normalized. */
  readonly recommendedQuantityNormalized?: number;
  /** The meter id (GUID) */
  readonly meterId?: string;
  /** The azure resource type. */
  readonly resourceType?: string;
  /** Term period of the reservation. ex: P1M, P1Y or P3Y. */
  readonly term?: string;
  /** The total amount of cost without reserved instances. */
  readonly costWithNoReservedInstances?: number;
  /** Recommended quality for reserved instances. */
  readonly recommendedQuantity?: number;
  /** The total amount of cost with reserved instances. */
  readonly totalCostWithReservedInstances?: number;
  /** Total estimated savings with reserved instances. */
  readonly netSavings?: number;
  /** The usage date for looking back. */
  readonly firstUsageDate?: Date;
  /** Shared or single recommendation. */
  /** The discriminator possible values: Single, Shared */
  scope: string;
  /** List of sku properties */
  readonly skuProperties?: SkuProperty[];
  /** The last usage date used for looking back for computing the recommendation. */
  readonly lastUsageDate?: Date;
  /** The total hours for which the cost is covered. */
  readonly totalHours?: number;
}

export function legacyReservationRecommendationPropertiesDeserializer(
  item: any,
): LegacyReservationRecommendationProperties {
  return {
    lookBackPeriod: item["lookBackPeriod"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    normalizedSize: item["normalizedSize"],
    recommendedQuantityNormalized: item["recommendedQuantityNormalized"],
    meterId: item["meterId"],
    resourceType: item["resourceType"],
    term: item["term"],
    costWithNoReservedInstances: item["costWithNoReservedInstances"],
    recommendedQuantity: item["recommendedQuantity"],
    totalCostWithReservedInstances: item["totalCostWithReservedInstances"],
    netSavings: item["netSavings"],
    firstUsageDate: !item["firstUsageDate"]
      ? item["firstUsageDate"]
      : new Date(item["firstUsageDate"]),
    scope: item["scope"],
    skuProperties: !item["skuProperties"]
      ? item["skuProperties"]
      : skuPropertyArrayDeserializer(item["skuProperties"]),
    lastUsageDate: !item["lastUsageDate"] ? item["lastUsageDate"] : new Date(item["lastUsageDate"]),
    totalHours: item["totalHours"],
  };
}

/** Alias for LegacyReservationRecommendationPropertiesUnion */
export type LegacyReservationRecommendationPropertiesUnion =
  | LegacySingleScopeReservationRecommendationProperties
  | LegacySharedScopeReservationRecommendationProperties
  | LegacyReservationRecommendationProperties;

export function legacyReservationRecommendationPropertiesUnionDeserializer(
  item: any,
): LegacyReservationRecommendationPropertiesUnion {
  switch (item["scope"]) {
    case "Single":
      return legacySingleScopeReservationRecommendationPropertiesDeserializer(
        item as LegacySingleScopeReservationRecommendationProperties,
      );

    case "Shared":
      return legacySharedScopeReservationRecommendationPropertiesDeserializer(
        item as LegacySharedScopeReservationRecommendationProperties,
      );

    default:
      return legacyReservationRecommendationPropertiesDeserializer(item);
  }
}

export function skuPropertyArrayDeserializer(result: Array<SkuProperty>): any[] {
  return result.map((item) => {
    return skuPropertyDeserializer(item);
  });
}

/** The Sku property */
export interface SkuProperty {
  /** The name of sku property. */
  readonly name?: string;
  /** The value of sku property. */
  readonly value?: string;
}

export function skuPropertyDeserializer(item: any): SkuProperty {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The properties of the legacy reservation recommendation for single scope. */
export interface LegacySingleScopeReservationRecommendationProperties extends LegacyReservationRecommendationProperties {
  /** Subscription id associated with single scoped recommendation. */
  readonly subscriptionId?: string;
  /** Shared or single recommendation. */
  scope: "Single";
}

export function legacySingleScopeReservationRecommendationPropertiesDeserializer(
  item: any,
): LegacySingleScopeReservationRecommendationProperties {
  return {
    lookBackPeriod: item["lookBackPeriod"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    normalizedSize: item["normalizedSize"],
    recommendedQuantityNormalized: item["recommendedQuantityNormalized"],
    meterId: item["meterId"],
    resourceType: item["resourceType"],
    term: item["term"],
    costWithNoReservedInstances: item["costWithNoReservedInstances"],
    recommendedQuantity: item["recommendedQuantity"],
    totalCostWithReservedInstances: item["totalCostWithReservedInstances"],
    netSavings: item["netSavings"],
    firstUsageDate: !item["firstUsageDate"]
      ? item["firstUsageDate"]
      : new Date(item["firstUsageDate"]),
    scope: item["scope"],
    skuProperties: !item["skuProperties"]
      ? item["skuProperties"]
      : skuPropertyArrayDeserializer(item["skuProperties"]),
    lastUsageDate: !item["lastUsageDate"] ? item["lastUsageDate"] : new Date(item["lastUsageDate"]),
    totalHours: item["totalHours"],
    subscriptionId: item["subscriptionId"],
  };
}

/** The properties of the legacy reservation recommendation for shared scope. */
export interface LegacySharedScopeReservationRecommendationProperties extends LegacyReservationRecommendationProperties {
  /** Shared or single recommendation. */
  scope: "Shared";
}

export function legacySharedScopeReservationRecommendationPropertiesDeserializer(
  item: any,
): LegacySharedScopeReservationRecommendationProperties {
  return {
    lookBackPeriod: item["lookBackPeriod"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    normalizedSize: item["normalizedSize"],
    recommendedQuantityNormalized: item["recommendedQuantityNormalized"],
    meterId: item["meterId"],
    resourceType: item["resourceType"],
    term: item["term"],
    costWithNoReservedInstances: item["costWithNoReservedInstances"],
    recommendedQuantity: item["recommendedQuantity"],
    totalCostWithReservedInstances: item["totalCostWithReservedInstances"],
    netSavings: item["netSavings"],
    firstUsageDate: !item["firstUsageDate"]
      ? item["firstUsageDate"]
      : new Date(item["firstUsageDate"]),
    scope: item["scope"],
    skuProperties: !item["skuProperties"]
      ? item["skuProperties"]
      : skuPropertyArrayDeserializer(item["skuProperties"]),
    lastUsageDate: !item["lastUsageDate"] ? item["lastUsageDate"] : new Date(item["lastUsageDate"]),
    totalHours: item["totalHours"],
  };
}

/** Modern reservation recommendation. */
export interface ModernReservationRecommendation extends ReservationRecommendation {
  /** Properties for modern reservation recommendation */
  properties: ModernReservationRecommendationPropertiesUnion;
  /** Specifies the kind of reservation recommendation. */
  kind: "modern";
}

export function modernReservationRecommendationDeserializer(
  item: any,
): ModernReservationRecommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    sku: item["sku"],
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    kind: item["kind"],
    properties: modernReservationRecommendationPropertiesUnionDeserializer(item["properties"]),
  };
}

/** The properties of the reservation recommendation. */
export interface ModernReservationRecommendationProperties {
  /** Resource Location. */
  readonly location?: string;
  /** The number of days of usage to look back for recommendation. */
  readonly lookBackPeriod?: number;
  /** The instance Flexibility Ratio. */
  readonly instanceFlexibilityRatio?: number;
  /** The instance Flexibility Group. */
  readonly instanceFlexibilityGroup?: string;
  /** The normalized Size. */
  readonly normalizedSize?: string;
  /** The recommended Quantity Normalized. */
  readonly recommendedQuantityNormalized?: number;
  /** The meter id (GUID) */
  readonly meterId?: string;
  /** Term period of the reservation. ex: P1M, P1Y or P3Y. */
  readonly term?: string;
  /** The total amount of cost without reserved instances. */
  readonly costWithNoReservedInstances?: Amount;
  /** Recommended quality for reserved instances. */
  readonly recommendedQuantity?: number;
  /** Resource type. */
  readonly resourceType?: string;
  /** The total amount of cost with reserved instances. */
  readonly totalCostWithReservedInstances?: Amount;
  /** Total estimated savings with reserved instances. */
  readonly netSavings?: Amount;
  /** The usage date for looking back. */
  readonly firstUsageDate?: Date;
  /** Shared or single recommendation. */
  /** The discriminator possible values: Single, Shared */
  scope: string;
  /** List of sku properties */
  readonly skuProperties?: SkuProperty[];
  /** This is the ARM Sku name. */
  readonly skuName?: string;
  /** The last usage date used for looking back for computing the recommendation. */
  readonly lastUsageDate?: Date;
  /** The total hours for which the cost is covered. */
  readonly totalHours?: number;
}

export function modernReservationRecommendationPropertiesDeserializer(
  item: any,
): ModernReservationRecommendationProperties {
  return {
    location: item["location"],
    lookBackPeriod: item["lookBackPeriod"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    normalizedSize: item["normalizedSize"],
    recommendedQuantityNormalized: item["recommendedQuantityNormalized"],
    meterId: item["meterId"],
    term: item["term"],
    costWithNoReservedInstances: !item["costWithNoReservedInstances"]
      ? item["costWithNoReservedInstances"]
      : amountDeserializer(item["costWithNoReservedInstances"]),
    recommendedQuantity: item["recommendedQuantity"],
    resourceType: item["resourceType"],
    totalCostWithReservedInstances: !item["totalCostWithReservedInstances"]
      ? item["totalCostWithReservedInstances"]
      : amountDeserializer(item["totalCostWithReservedInstances"]),
    netSavings: !item["netSavings"] ? item["netSavings"] : amountDeserializer(item["netSavings"]),
    firstUsageDate: !item["firstUsageDate"]
      ? item["firstUsageDate"]
      : new Date(item["firstUsageDate"]),
    scope: item["scope"],
    skuProperties: !item["skuProperties"]
      ? item["skuProperties"]
      : skuPropertyArrayDeserializer(item["skuProperties"]),
    skuName: item["skuName"],
    lastUsageDate: !item["lastUsageDate"] ? item["lastUsageDate"] : new Date(item["lastUsageDate"]),
    totalHours: item["totalHours"],
  };
}

/** Alias for ModernReservationRecommendationPropertiesUnion */
export type ModernReservationRecommendationPropertiesUnion =
  | ModernSingleScopeReservationRecommendationProperties
  | ModernSharedScopeReservationRecommendationProperties
  | ModernReservationRecommendationProperties;

export function modernReservationRecommendationPropertiesUnionDeserializer(
  item: any,
): ModernReservationRecommendationPropertiesUnion {
  switch (item["scope"]) {
    case "Single":
      return modernSingleScopeReservationRecommendationPropertiesDeserializer(
        item as ModernSingleScopeReservationRecommendationProperties,
      );

    case "Shared":
      return modernSharedScopeReservationRecommendationPropertiesDeserializer(
        item as ModernSharedScopeReservationRecommendationProperties,
      );

    default:
      return modernReservationRecommendationPropertiesDeserializer(item);
  }
}

/** The properties of the modern reservation recommendation for single scope. */
export interface ModernSingleScopeReservationRecommendationProperties extends ModernReservationRecommendationProperties {
  /** Subscription ID associated with single scoped recommendation. */
  readonly subscriptionId?: string;
  /** Shared or single recommendation. */
  scope: "Single";
}

export function modernSingleScopeReservationRecommendationPropertiesDeserializer(
  item: any,
): ModernSingleScopeReservationRecommendationProperties {
  return {
    location: item["location"],
    lookBackPeriod: item["lookBackPeriod"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    normalizedSize: item["normalizedSize"],
    recommendedQuantityNormalized: item["recommendedQuantityNormalized"],
    meterId: item["meterId"],
    term: item["term"],
    costWithNoReservedInstances: !item["costWithNoReservedInstances"]
      ? item["costWithNoReservedInstances"]
      : amountDeserializer(item["costWithNoReservedInstances"]),
    recommendedQuantity: item["recommendedQuantity"],
    resourceType: item["resourceType"],
    totalCostWithReservedInstances: !item["totalCostWithReservedInstances"]
      ? item["totalCostWithReservedInstances"]
      : amountDeserializer(item["totalCostWithReservedInstances"]),
    netSavings: !item["netSavings"] ? item["netSavings"] : amountDeserializer(item["netSavings"]),
    firstUsageDate: !item["firstUsageDate"]
      ? item["firstUsageDate"]
      : new Date(item["firstUsageDate"]),
    scope: item["scope"],
    skuProperties: !item["skuProperties"]
      ? item["skuProperties"]
      : skuPropertyArrayDeserializer(item["skuProperties"]),
    skuName: item["skuName"],
    lastUsageDate: !item["lastUsageDate"] ? item["lastUsageDate"] : new Date(item["lastUsageDate"]),
    totalHours: item["totalHours"],
    subscriptionId: item["subscriptionId"],
  };
}

/** The properties of the modern reservation recommendation for shared scope. */
export interface ModernSharedScopeReservationRecommendationProperties extends ModernReservationRecommendationProperties {
  /** Shared or single recommendation. */
  scope: "Shared";
}

export function modernSharedScopeReservationRecommendationPropertiesDeserializer(
  item: any,
): ModernSharedScopeReservationRecommendationProperties {
  return {
    location: item["location"],
    lookBackPeriod: item["lookBackPeriod"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    normalizedSize: item["normalizedSize"],
    recommendedQuantityNormalized: item["recommendedQuantityNormalized"],
    meterId: item["meterId"],
    term: item["term"],
    costWithNoReservedInstances: !item["costWithNoReservedInstances"]
      ? item["costWithNoReservedInstances"]
      : amountDeserializer(item["costWithNoReservedInstances"]),
    recommendedQuantity: item["recommendedQuantity"],
    resourceType: item["resourceType"],
    totalCostWithReservedInstances: !item["totalCostWithReservedInstances"]
      ? item["totalCostWithReservedInstances"]
      : amountDeserializer(item["totalCostWithReservedInstances"]),
    netSavings: !item["netSavings"] ? item["netSavings"] : amountDeserializer(item["netSavings"]),
    firstUsageDate: !item["firstUsageDate"]
      ? item["firstUsageDate"]
      : new Date(item["firstUsageDate"]),
    scope: item["scope"],
    skuProperties: !item["skuProperties"]
      ? item["skuProperties"]
      : skuPropertyArrayDeserializer(item["skuProperties"]),
    skuName: item["skuName"],
    lastUsageDate: !item["lastUsageDate"] ? item["lastUsageDate"] : new Date(item["lastUsageDate"]),
    totalHours: item["totalHours"],
  };
}

/** Reservation recommendation details. */
export interface ReservationRecommendationDetailsModel extends Resource {
  /** Resource Location. */
  location?: string;
  /** Resource sku */
  sku?: string;
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** An ISO 4217 currency code identifier for the costs and savings */
  readonly currency?: string;
  /** Resource specific properties. */
  readonly resource?: ReservationRecommendationDetailsResourceProperties;
  /** Resource Group. */
  readonly resourceGroup?: string;
  /** Savings information for the recommendation. */
  readonly savings?: ReservationRecommendationDetailsSavingsProperties;
  /** Scope of the reservation, ex: Single or Shared. */
  readonly scope?: string;
  /** Historical usage details used to calculate the estimated savings. */
  readonly usage?: ReservationRecommendationDetailsUsageProperties;
}

export function reservationRecommendationDetailsModelDeserializer(
  item: any,
): ReservationRecommendationDetailsModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    sku: item["sku"],
    ...(!item["properties"]
      ? item["properties"]
      : _reservationRecommendationDetailsModelPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the reservation recommendation. */
export interface ReservationRecommendationDetailsProperties {
  /** An ISO 4217 currency code identifier for the costs and savings */
  readonly currency?: string;
  /** Resource specific properties. */
  readonly resource?: ReservationRecommendationDetailsResourceProperties;
  /** Resource Group. */
  readonly resourceGroup?: string;
  /** Savings information for the recommendation. */
  readonly savings?: ReservationRecommendationDetailsSavingsProperties;
  /** Scope of the reservation, ex: Single or Shared. */
  readonly scope?: string;
  /** Historical usage details used to calculate the estimated savings. */
  readonly usage?: ReservationRecommendationDetailsUsageProperties;
}

export function reservationRecommendationDetailsPropertiesDeserializer(
  item: any,
): ReservationRecommendationDetailsProperties {
  return {
    currency: item["currency"],
    resource: !item["resource"]
      ? item["resource"]
      : reservationRecommendationDetailsResourcePropertiesDeserializer(item["resource"]),
    resourceGroup: item["resourceGroup"],
    savings: !item["savings"]
      ? item["savings"]
      : reservationRecommendationDetailsSavingsPropertiesDeserializer(item["savings"]),
    scope: item["scope"],
    usage: !item["usage"]
      ? item["usage"]
      : reservationRecommendationDetailsUsagePropertiesDeserializer(item["usage"]),
  };
}

/** Details of the resource. */
export interface ReservationRecommendationDetailsResourceProperties {
  /** List of subscriptions for which the reservation is applied. */
  readonly appliedScopes?: string[];
  /** On-demand rate of the resource. Most resources use hourly rates, except for BlockBlob, ManagedDisk, Backup, and Azure Files, which use monthly rates. Only hardware rates are included; software rates are excluded.  Note: there could be new resources that use hourly rates in the future. */
  readonly onDemandRate?: number;
  /** Azure product ex: Standard_E8s_v3 etc. */
  readonly product?: string;
  /** Azure resource region ex:EastUS, WestUS etc. */
  readonly region?: string;
  /** Hourly reservation rate of the resource. Varies based on the term. */
  readonly reservationRate?: number;
  /** The azure resource type. */
  readonly resourceType?: string;
}

export function reservationRecommendationDetailsResourcePropertiesDeserializer(
  item: any,
): ReservationRecommendationDetailsResourceProperties {
  return {
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    onDemandRate: item["onDemandRate"],
    product: item["product"],
    region: item["region"],
    reservationRate: item["reservationRate"],
    resourceType: item["resourceType"],
  };
}

/** Details of the estimated savings. */
export interface ReservationRecommendationDetailsSavingsProperties {
  /** List of calculated savings. */
  calculatedSavings?: ReservationRecommendationDetailsCalculatedSavingsProperties[];
  /** Number of days of usage to look back used for computing the recommendation. */
  readonly lookBackPeriod?: number;
  /** Number of recommended units of the resource. */
  readonly recommendedQuantity?: number;
  /** Term period of the reservation. ex: P1M, P1Y or P3Y. */
  readonly reservationOrderTerm?: string;
  /** Type of savings, ex: instance. */
  readonly savingsType?: string;
  /** Measurement unit ex: hour etc. */
  readonly unitOfMeasure?: string;
}

export function reservationRecommendationDetailsSavingsPropertiesDeserializer(
  item: any,
): ReservationRecommendationDetailsSavingsProperties {
  return {
    calculatedSavings: !item["calculatedSavings"]
      ? item["calculatedSavings"]
      : reservationRecommendationDetailsCalculatedSavingsPropertiesArrayDeserializer(
          item["calculatedSavings"],
        ),
    lookBackPeriod: item["lookBackPeriod"],
    recommendedQuantity: item["recommendedQuantity"],
    reservationOrderTerm: item["reservationOrderTerm"],
    savingsType: item["savingsType"],
    unitOfMeasure: item["unitOfMeasure"],
  };
}

export function reservationRecommendationDetailsCalculatedSavingsPropertiesArrayDeserializer(
  result: Array<ReservationRecommendationDetailsCalculatedSavingsProperties>,
): any[] {
  return result.map((item) => {
    return reservationRecommendationDetailsCalculatedSavingsPropertiesDeserializer(item);
  });
}

/** Details of estimated savings. The costs and savings are estimated for the term. */
export interface ReservationRecommendationDetailsCalculatedSavingsProperties {
  /** The cost without reservation. Includes hardware and software cost. */
  readonly onDemandCost?: number;
  /** The estimated cost for resource meters that are not covered by the reservation and are billed at pay-as-you-go rates. */
  readonly overageCost?: number;
  /** The quantity for calculated savings. */
  readonly quantity?: number;
  /** Hardware cost of the resources covered by the reservation. */
  readonly reservationCost?: number;
  /** Reservation cost + software cost of the resources covered by the reservation + overage cost. */
  readonly totalReservationCost?: number;
  /** The number of reserved units used to calculate savings. Always 1 for virtual machines. */
  reservedUnitCount?: number;
  /** The amount saved by purchasing the recommended quantity of reservation. This is equal to onDemandCost - totalReservationCost. */
  readonly savings?: number;
}

export function reservationRecommendationDetailsCalculatedSavingsPropertiesDeserializer(
  item: any,
): ReservationRecommendationDetailsCalculatedSavingsProperties {
  return {
    onDemandCost: item["onDemandCost"],
    overageCost: item["overageCost"],
    quantity: item["quantity"],
    reservationCost: item["reservationCost"],
    totalReservationCost: item["totalReservationCost"],
    reservedUnitCount: item["reservedUnitCount"],
    savings: item["savings"],
  };
}

/** Details about historical usage data that has been used for computing the recommendation. */
export interface ReservationRecommendationDetailsUsageProperties {
  /** The first usage date used for looking back for computing the recommendation. */
  readonly firstConsumptionDate?: string;
  /** The last usage date used for looking back for computing the recommendation. */
  readonly lastConsumptionDate?: string;
  /** What the usage data values represent ex: virtual machine instance. */
  readonly lookBackUnitType?: string;
  /** The breakdown of historical resource usage.  The values are in the order of usage between the firstConsumptionDate and the lastConsumptionDate. */
  readonly usageData?: number[];
  /** The grain of the values represented in the usage data ex: hourly. */
  readonly usageGrain?: string;
}

export function reservationRecommendationDetailsUsagePropertiesDeserializer(
  item: any,
): ReservationRecommendationDetailsUsageProperties {
  return {
    firstConsumptionDate: item["firstConsumptionDate"],
    lastConsumptionDate: item["lastConsumptionDate"],
    lookBackUnitType: item["lookBackUnitType"],
    usageData: !item["usageData"]
      ? item["usageData"]
      : item["usageData"].map((p: any) => {
          return p;
        }),
    usageGrain: item["usageGrain"],
  };
}

/**
 * Error response indicates that the service is not able to process the incoming request. The reason is provided in the error message.
 *
 * Some Error responses:
 *
 * * 429 TooManyRequests - Request is throttled. Retry after waiting for the time specified in the "x-ms-ratelimit-microsoft.consumption-retry-after" header.
 *
 * * 503 ServiceUnavailable - Service is temporarily unavailable. Retry after waiting for the time specified in the "Retry-After" header.
 */
export interface HighCasedErrorResponse {
  /** The details of the error. */
  error?: HighCasedErrorDetails;
}

export function highCasedErrorResponseDeserializer(item: any): HighCasedErrorResponse {
  return {
    error: !item["error"] ? item["error"] : highCasedErrorDetailsDeserializer(item["error"]),
  };
}

/** The details of the error. */
export interface HighCasedErrorDetails {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function highCasedErrorDetailsDeserializer(item: any): HighCasedErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Result of listing reservation recommendations. */
export interface _ReservationTransactionsListResult {
  /** The list of reservation recommendations. */
  readonly value?: ReservationTransaction[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _reservationTransactionsListResultDeserializer(
  item: any,
): _ReservationTransactionsListResult {
  return {
    value: !item["value"] ? item["value"] : reservationTransactionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationTransactionArrayDeserializer(
  result: Array<ReservationTransaction>,
): any[] {
  return result.map((item) => {
    return reservationTransactionDeserializer(item);
  });
}

/** Reservation transaction resource. */
export interface ReservationTransaction extends Resource {
  /** Resource tags. */
  readonly tags?: string[];
  /** The date of the transaction */
  readonly eventDate?: Date;
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The description of the transaction. */
  readonly description?: string;
  /** The type of the transaction (Purchase, Cancel or Refund). */
  readonly eventType?: string;
  /** The quantity of the transaction. */
  readonly quantity?: number;
  /** The charge of the transaction. */
  readonly amount?: number;
  /** The ISO currency in which the transaction is charged, for example, USD. */
  readonly currency?: string;
  /** The name of the reservation order. */
  readonly reservationOrderName?: string;
  /** The purchasing enrollment. */
  readonly purchasingEnrollment?: string;
  /** The subscription guid that makes the transaction. */
  readonly purchasingSubscriptionGuid?: string;
  /** The subscription name that makes the transaction. */
  readonly purchasingSubscriptionName?: string;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly armSkuName?: string;
  /** This is the term of the transaction. */
  readonly term?: string;
  /** The region of the transaction. */
  readonly region?: string;
  /** The name of the account that makes the transaction. */
  readonly accountName?: string;
  /** The email of the account owner that makes the transaction. */
  readonly accountOwnerEmail?: string;
  /** The department name. */
  readonly departmentName?: string;
  /** The cost center of this department if it is a department and a cost center is provided. */
  readonly costCenter?: string;
  /** The current enrollment. */
  readonly currentEnrollment?: string;
  /** The billing frequency, which can be either one-time or recurring. */
  readonly billingFrequency?: string;
  /** The billing month(yyyyMMdd), on which the event initiated. */
  readonly billingMonth?: number;
  /** The monetary commitment amount at the enrollment scope. */
  readonly monetaryCommitment?: number;
  /** The overage amount at the enrollment scope. */
  readonly overage?: number;
}

export function reservationTransactionDeserializer(item: any): ReservationTransaction {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _reservationTransactionPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
  };
}

/** The properties of a legacy reservation transaction. */
export interface LegacyReservationTransactionProperties {
  /** The date of the transaction */
  readonly eventDate?: Date;
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The description of the transaction. */
  readonly description?: string;
  /** The type of the transaction (Purchase, Cancel or Refund). */
  readonly eventType?: string;
  /** The quantity of the transaction. */
  readonly quantity?: number;
  /** The charge of the transaction. */
  readonly amount?: number;
  /** The ISO currency in which the transaction is charged, for example, USD. */
  readonly currency?: string;
  /** The name of the reservation order. */
  readonly reservationOrderName?: string;
  /** The purchasing enrollment. */
  readonly purchasingEnrollment?: string;
  /** The subscription guid that makes the transaction. */
  readonly purchasingSubscriptionGuid?: string;
  /** The subscription name that makes the transaction. */
  readonly purchasingSubscriptionName?: string;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly armSkuName?: string;
  /** This is the term of the transaction. */
  readonly term?: string;
  /** The region of the transaction. */
  readonly region?: string;
  /** The name of the account that makes the transaction. */
  readonly accountName?: string;
  /** The email of the account owner that makes the transaction. */
  readonly accountOwnerEmail?: string;
  /** The department name. */
  readonly departmentName?: string;
  /** The cost center of this department if it is a department and a cost center is provided. */
  readonly costCenter?: string;
  /** The current enrollment. */
  readonly currentEnrollment?: string;
  /** The billing frequency, which can be either one-time or recurring. */
  readonly billingFrequency?: string;
  /** The billing month(yyyyMMdd), on which the event initiated. */
  readonly billingMonth?: number;
  /** The monetary commitment amount at the enrollment scope. */
  readonly monetaryCommitment?: number;
  /** The overage amount at the enrollment scope. */
  readonly overage?: number;
}

export function legacyReservationTransactionPropertiesDeserializer(
  item: any,
): LegacyReservationTransactionProperties {
  return {
    eventDate: !item["eventDate"] ? item["eventDate"] : new Date(item["eventDate"]),
    reservationOrderId: item["reservationOrderId"],
    description: item["description"],
    eventType: item["eventType"],
    quantity: item["quantity"],
    amount: item["amount"],
    currency: item["currency"],
    reservationOrderName: item["reservationOrderName"],
    purchasingEnrollment: item["purchasingEnrollment"],
    purchasingSubscriptionGuid: item["purchasingSubscriptionGuid"],
    purchasingSubscriptionName: item["purchasingSubscriptionName"],
    armSkuName: item["armSkuName"],
    term: item["term"],
    region: item["region"],
    accountName: item["accountName"],
    accountOwnerEmail: item["accountOwnerEmail"],
    departmentName: item["departmentName"],
    costCenter: item["costCenter"],
    currentEnrollment: item["currentEnrollment"],
    billingFrequency: item["billingFrequency"],
    billingMonth: item["billingMonth"],
    monetaryCommitment: item["monetaryCommitment"],
    overage: item["overage"],
  };
}

/** Result of listing reservation recommendations. */
export interface _ModernReservationTransactionsListResult {
  /** The list of reservation recommendations. */
  readonly value?: ModernReservationTransaction[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _modernReservationTransactionsListResultDeserializer(
  item: any,
): _ModernReservationTransactionsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : modernReservationTransactionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function modernReservationTransactionArrayDeserializer(
  result: Array<ModernReservationTransaction>,
): any[] {
  return result.map((item) => {
    return modernReservationTransactionDeserializer(item);
  });
}

/** Modern Reservation transaction resource. */
export interface ModernReservationTransaction extends Resource {
  /** Resource tags. */
  readonly tags?: string[];
  /** The charge of the transaction. */
  readonly amount?: number;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly armSkuName?: string;
  /** The billing frequency, which can be either one-time or recurring. */
  readonly billingFrequency?: string;
  /** Billing profile Id. */
  readonly billingProfileId?: string;
  /** Billing profile name. */
  readonly billingProfileName?: string;
  /** The ISO currency in which the transaction is charged, for example, USD. */
  readonly currency?: string;
  /** The description of the transaction. */
  readonly description?: string;
  /** The date of the transaction */
  readonly eventDate?: Date;
  /** The type of the transaction (Purchase, Cancel or Refund). */
  readonly eventType?: string;
  /** Invoice Number */
  readonly invoice?: string;
  /** Invoice Id as on the invoice where the specific transaction appears. */
  readonly invoiceId?: string;
  /** Invoice Section Id */
  readonly invoiceSectionId?: string;
  /** Invoice Section Name. */
  readonly invoiceSectionName?: string;
  /** The subscription guid that makes the transaction. */
  readonly purchasingSubscriptionGuid?: string;
  /** The subscription name that makes the transaction. */
  readonly purchasingSubscriptionName?: string;
  /** The quantity of the transaction. */
  readonly quantity?: number;
  /** The region of the transaction. */
  readonly region?: string;
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The name of the reservation order. */
  readonly reservationOrderName?: string;
  /** This is the term of the transaction. */
  readonly term?: string;
}

export function modernReservationTransactionDeserializer(item: any): ModernReservationTransaction {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._modernReservationTransactionPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
  };
}

/** The properties of a modern reservation transaction. */
export interface ModernReservationTransactionProperties {
  /** The charge of the transaction. */
  readonly amount?: number;
  /** This is the ARM Sku name. It can be used to join with the serviceType field in additional info in usage records. */
  readonly armSkuName?: string;
  /** The billing frequency, which can be either one-time or recurring. */
  readonly billingFrequency?: string;
  /** Billing profile Id. */
  readonly billingProfileId?: string;
  /** Billing profile name. */
  readonly billingProfileName?: string;
  /** The ISO currency in which the transaction is charged, for example, USD. */
  readonly currency?: string;
  /** The description of the transaction. */
  readonly description?: string;
  /** The date of the transaction */
  readonly eventDate?: Date;
  /** The type of the transaction (Purchase, Cancel or Refund). */
  readonly eventType?: string;
  /** Invoice Number */
  readonly invoice?: string;
  /** Invoice Id as on the invoice where the specific transaction appears. */
  readonly invoiceId?: string;
  /** Invoice Section Id */
  readonly invoiceSectionId?: string;
  /** Invoice Section Name. */
  readonly invoiceSectionName?: string;
  /** The subscription guid that makes the transaction. */
  readonly purchasingSubscriptionGuid?: string;
  /** The subscription name that makes the transaction. */
  readonly purchasingSubscriptionName?: string;
  /** The quantity of the transaction. */
  readonly quantity?: number;
  /** The region of the transaction. */
  readonly region?: string;
  /** The reservation order ID is the identifier for a reservation purchase. Each reservation order ID represents a single purchase transaction. A reservation order contains reservations. The reservation order specifies the VM size and region for the reservations. */
  readonly reservationOrderId?: string;
  /** The name of the reservation order. */
  readonly reservationOrderName?: string;
  /** This is the term of the transaction. */
  readonly term?: string;
}

export function modernReservationTransactionPropertiesDeserializer(
  item: any,
): ModernReservationTransactionProperties {
  return {
    amount: item["amount"],
    armSkuName: item["armSkuName"],
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    currency: item["currency"],
    description: item["description"],
    eventDate: !item["eventDate"] ? item["eventDate"] : new Date(item["eventDate"]),
    eventType: item["eventType"],
    invoice: item["invoice"],
    invoiceId: item["invoiceId"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionName: item["invoiceSectionName"],
    purchasingSubscriptionGuid: item["purchasingSubscriptionGuid"],
    purchasingSubscriptionName: item["purchasingSubscriptionName"],
    quantity: item["quantity"],
    region: item["region"],
    reservationOrderId: item["reservationOrderId"],
    reservationOrderName: item["reservationOrderName"],
    term: item["term"],
  };
}

/** A management group aggregated cost resource. */
export interface ManagementGroupAggregatedCostResult extends Resource {
  /** The etag for the resource. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** The id of the billing period resource that the aggregated cost belongs to. */
  readonly billingPeriodId?: string;
  /** The start of the date time range covered by aggregated cost. */
  readonly usageStart?: Date;
  /** The end of the date time range covered by the aggregated cost. */
  readonly usageEnd?: Date;
  /** Azure Charges. */
  readonly azureCharges?: number;
  /** Marketplace Charges. */
  readonly marketplaceCharges?: number;
  /** Charges Billed Separately. */
  readonly chargesBilledSeparately?: number;
  /** The ISO currency in which the meter is charged, for example, USD. */
  readonly currency?: string;
  /** Children of a management group */
  children?: ManagementGroupAggregatedCostResult[];
  /** List of subscription Guids included in the calculation of aggregated cost */
  includedSubscriptions?: string[];
  /** List of subscription Guids excluded from the calculation of aggregated cost */
  excludedSubscriptions?: string[];
}

export function managementGroupAggregatedCostResultDeserializer(
  item: any,
): ManagementGroupAggregatedCostResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managementGroupAggregatedCostResultPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the Management Group Aggregated Cost. */
export interface ManagementGroupAggregatedCostProperties {
  /** The id of the billing period resource that the aggregated cost belongs to. */
  readonly billingPeriodId?: string;
  /** The start of the date time range covered by aggregated cost. */
  readonly usageStart?: Date;
  /** The end of the date time range covered by the aggregated cost. */
  readonly usageEnd?: Date;
  /** Azure Charges. */
  readonly azureCharges?: number;
  /** Marketplace Charges. */
  readonly marketplaceCharges?: number;
  /** Charges Billed Separately. */
  readonly chargesBilledSeparately?: number;
  /** The ISO currency in which the meter is charged, for example, USD. */
  readonly currency?: string;
  /** Children of a management group */
  children?: ManagementGroupAggregatedCostResult[];
  /** List of subscription Guids included in the calculation of aggregated cost */
  includedSubscriptions?: string[];
  /** List of subscription Guids excluded from the calculation of aggregated cost */
  excludedSubscriptions?: string[];
}

export function managementGroupAggregatedCostPropertiesDeserializer(
  item: any,
): ManagementGroupAggregatedCostProperties {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: !item["usageStart"] ? item["usageStart"] : new Date(item["usageStart"]),
    usageEnd: !item["usageEnd"] ? item["usageEnd"] : new Date(item["usageEnd"]),
    azureCharges: item["azureCharges"],
    marketplaceCharges: item["marketplaceCharges"],
    chargesBilledSeparately: item["chargesBilledSeparately"],
    currency: item["currency"],
    children: !item["children"]
      ? item["children"]
      : managementGroupAggregatedCostResultArrayDeserializer(item["children"]),
    includedSubscriptions: !item["includedSubscriptions"]
      ? item["includedSubscriptions"]
      : item["includedSubscriptions"].map((p: any) => {
          return p;
        }),
    excludedSubscriptions: !item["excludedSubscriptions"]
      ? item["excludedSubscriptions"]
      : item["excludedSubscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function managementGroupAggregatedCostResultArrayDeserializer(
  result: Array<ManagementGroupAggregatedCostResult>,
): any[] {
  return result.map((item) => {
    return managementGroupAggregatedCostResultDeserializer(item);
  });
}

/** Result of listing event summary. */
export interface _Events {
  /** The list of event summary. */
  readonly value?: EventSummary[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _eventsDeserializer(item: any): _Events {
  return {
    value: !item["value"] ? item["value"] : eventSummaryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventSummaryArrayDeserializer(result: Array<EventSummary>): any[] {
  return result.map((item) => {
    return eventSummaryDeserializer(item);
  });
}

/** An event summary resource. */
export interface EventSummary extends ProxyResource {
  /** The eTag for the resource. */
  readonly eTag?: string;
  /** The date of the event. */
  readonly transactionDate?: Date;
  /** The description of the event. */
  readonly description?: string;
  /** The amount of new credit or commitment for NewCredit or SettleCharges event. */
  readonly newCredit?: Amount;
  /** The amount of balance adjustment. The property is not available for ConsumptionCommitment lots. */
  readonly adjustments?: Amount;
  /** The amount of expired credit or commitment for NewCredit or SettleCharges event. */
  readonly creditExpired?: Amount;
  /** The amount of charges for events of type SettleCharges and PendingEligibleCharges. */
  readonly charges?: Amount;
  /** The balance after the event, Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly closedBalance?: Amount;
  /** Identifier of the billing account. */
  readonly billingAccountId?: string;
  /** Name of the billing account. */
  readonly billingAccountDisplayName?: string;
  /** Identifies the type of the event. */
  eventType?: EventType;
  /** The number which uniquely identifies the invoice on which the event was billed. This will be empty for unbilled events. */
  readonly invoiceNumber?: string;
  /** The ID that uniquely identifies the billing profile for which the event happened. The property is only available for billing account of type MicrosoftCustomerAgreement. */
  readonly billingProfileId?: string;
  /** The display name of the billing profile for which the event happened. The property is only available for billing account of type MicrosoftCustomerAgreement. */
  readonly billingProfileDisplayName?: string;
  /** The ID that uniquely identifies the lot for which the event happened. */
  readonly lotId?: string;
  /** Identifies the source of the lot for which the event happened. */
  readonly lotSource?: string;
  /** Amount of canceled credit. */
  readonly canceledCredit?: Amount;
  /** The credit currency of the event. */
  readonly creditCurrency?: string;
  /** The billing currency of the event. */
  readonly billingCurrency?: string;
  /** The reseller of the event. */
  readonly reseller?: Reseller;
  /** The amount of expired credit or commitment for NewCredit or SettleCharges event in billing currency. */
  readonly creditExpiredInBillingCurrency?: AmountWithExchangeRate;
  /** The amount of new credit or commitment for NewCredit or SettleCharges event in billing currency. */
  readonly newCreditInBillingCurrency?: AmountWithExchangeRate;
  /** The amount of balance adjustment in billing currency. */
  readonly adjustmentsInBillingCurrency?: AmountWithExchangeRate;
  /** The amount of charges for events of type SettleCharges and PendingEligibleCharges in billing currency. */
  readonly chargesInBillingCurrency?: AmountWithExchangeRate;
  /** The balance in billing currency after the event, Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly closedBalanceInBillingCurrency?: AmountWithExchangeRate;
  /** If true, the listed details are based on an estimation and it will be subjected to change. */
  readonly isEstimatedBalance?: boolean;
  /** The eTag for the resource. */
  readonly eTagPropertiesETag?: string;
}

export function eventSummaryDeserializer(item: any): EventSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventSummaryPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** The event properties. */
export interface EventProperties {
  /** The date of the event. */
  readonly transactionDate?: Date;
  /** The description of the event. */
  readonly description?: string;
  /** The amount of new credit or commitment for NewCredit or SettleCharges event. */
  readonly newCredit?: Amount;
  /** The amount of balance adjustment. The property is not available for ConsumptionCommitment lots. */
  readonly adjustments?: Amount;
  /** The amount of expired credit or commitment for NewCredit or SettleCharges event. */
  readonly creditExpired?: Amount;
  /** The amount of charges for events of type SettleCharges and PendingEligibleCharges. */
  readonly charges?: Amount;
  /** The balance after the event, Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly closedBalance?: Amount;
  /** Identifier of the billing account. */
  readonly billingAccountId?: string;
  /** Name of the billing account. */
  readonly billingAccountDisplayName?: string;
  /** Identifies the type of the event. */
  eventType?: EventType;
  /** The number which uniquely identifies the invoice on which the event was billed. This will be empty for unbilled events. */
  readonly invoiceNumber?: string;
  /** The ID that uniquely identifies the billing profile for which the event happened. The property is only available for billing account of type MicrosoftCustomerAgreement. */
  readonly billingProfileId?: string;
  /** The display name of the billing profile for which the event happened. The property is only available for billing account of type MicrosoftCustomerAgreement. */
  readonly billingProfileDisplayName?: string;
  /** The ID that uniquely identifies the lot for which the event happened. */
  readonly lotId?: string;
  /** Identifies the source of the lot for which the event happened. */
  readonly lotSource?: string;
  /** Amount of canceled credit. */
  readonly canceledCredit?: Amount;
  /** The credit currency of the event. */
  readonly creditCurrency?: string;
  /** The billing currency of the event. */
  readonly billingCurrency?: string;
  /** The reseller of the event. */
  readonly reseller?: Reseller;
  /** The amount of expired credit or commitment for NewCredit or SettleCharges event in billing currency. */
  readonly creditExpiredInBillingCurrency?: AmountWithExchangeRate;
  /** The amount of new credit or commitment for NewCredit or SettleCharges event in billing currency. */
  readonly newCreditInBillingCurrency?: AmountWithExchangeRate;
  /** The amount of balance adjustment in billing currency. */
  readonly adjustmentsInBillingCurrency?: AmountWithExchangeRate;
  /** The amount of charges for events of type SettleCharges and PendingEligibleCharges in billing currency. */
  readonly chargesInBillingCurrency?: AmountWithExchangeRate;
  /** The balance in billing currency after the event, Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly closedBalanceInBillingCurrency?: AmountWithExchangeRate;
  /** If true, the listed details are based on an estimation and it will be subjected to change. */
  readonly isEstimatedBalance?: boolean;
  /** The eTag for the resource. */
  readonly eTag?: string;
}

export function eventPropertiesDeserializer(item: any): EventProperties {
  return {
    transactionDate: !item["transactionDate"]
      ? item["transactionDate"]
      : new Date(item["transactionDate"]),
    description: item["description"],
    newCredit: !item["newCredit"] ? item["newCredit"] : amountDeserializer(item["newCredit"]),
    adjustments: !item["adjustments"]
      ? item["adjustments"]
      : amountDeserializer(item["adjustments"]),
    creditExpired: !item["creditExpired"]
      ? item["creditExpired"]
      : amountDeserializer(item["creditExpired"]),
    charges: !item["charges"] ? item["charges"] : amountDeserializer(item["charges"]),
    closedBalance: !item["closedBalance"]
      ? item["closedBalance"]
      : amountDeserializer(item["closedBalance"]),
    billingAccountId: item["billingAccountId"],
    billingAccountDisplayName: item["billingAccountDisplayName"],
    eventType: item["eventType"],
    invoiceNumber: item["invoiceNumber"],
    billingProfileId: item["billingProfileId"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    lotId: item["lotId"],
    lotSource: item["lotSource"],
    canceledCredit: !item["canceledCredit"]
      ? item["canceledCredit"]
      : amountDeserializer(item["canceledCredit"]),
    creditCurrency: item["creditCurrency"],
    billingCurrency: item["billingCurrency"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    creditExpiredInBillingCurrency: !item["creditExpiredInBillingCurrency"]
      ? item["creditExpiredInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["creditExpiredInBillingCurrency"]),
    newCreditInBillingCurrency: !item["newCreditInBillingCurrency"]
      ? item["newCreditInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["newCreditInBillingCurrency"]),
    adjustmentsInBillingCurrency: !item["adjustmentsInBillingCurrency"]
      ? item["adjustmentsInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["adjustmentsInBillingCurrency"]),
    chargesInBillingCurrency: !item["chargesInBillingCurrency"]
      ? item["chargesInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["chargesInBillingCurrency"]),
    closedBalanceInBillingCurrency: !item["closedBalanceInBillingCurrency"]
      ? item["closedBalanceInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["closedBalanceInBillingCurrency"]),
    isEstimatedBalance: item["isEstimatedBalance"],
    eTag: item["eTag"],
  };
}

/** Identifies the type of the event. */
export enum KnownEventType {
  /** SettledCharges */
  SettledCharges = "SettledCharges",
  /** PendingCharges */
  PendingCharges = "PendingCharges",
  /** PendingAdjustments */
  PendingAdjustments = "PendingAdjustments",
  /** PendingNewCredit */
  PendingNewCredit = "PendingNewCredit",
  /** PendingExpiredCredit */
  PendingExpiredCredit = "PendingExpiredCredit",
  /** UnKnown */
  UnKnown = "UnKnown",
  /** NewCredit */
  NewCredit = "NewCredit",
  /** CreditExpired */
  CreditExpired = "CreditExpired",
}

/**
 * Identifies the type of the event. \
 * {@link KnownEventType} can be used interchangeably with EventType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SettledCharges** \
 * **PendingCharges** \
 * **PendingAdjustments** \
 * **PendingNewCredit** \
 * **PendingExpiredCredit** \
 * **UnKnown** \
 * **NewCredit** \
 * **CreditExpired**
 */
export type EventType = string;

/** Result of listing lot summary. */
export interface _Lots {
  /** The list of lot summary. */
  readonly value?: LotSummary[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _lotsDeserializer(item: any): _Lots {
  return {
    value: !item["value"] ? item["value"] : lotSummaryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function lotSummaryArrayDeserializer(result: Array<LotSummary>): any[] {
  return result.map((item) => {
    return lotSummaryDeserializer(item);
  });
}

/** A lot summary resource. */
export interface LotSummary extends ProxyResource {
  /** eTag of the resource. To handle concurrent update scenario, this field will be used to determine whether the user is updating the latest version or not. */
  eTag?: string;
  /** The original amount of a lot, Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly originalAmount?: Amount;
  /** The balance as of the last invoice. */
  readonly closedBalance?: Amount;
  /** The source of the lot. */
  readonly source?: LotSource;
  /** The date when the lot became effective. */
  readonly startDate?: Date;
  /** The expiration date of a lot. */
  readonly expirationDate?: Date;
  /** The po number of the invoice on which the lot was added. This property is not available for ConsumptionCommitment lots. */
  readonly poNumber?: string;
  /** The date when the lot was added. */
  readonly purchasedDate?: Date;
  /** The status of the lot. */
  readonly status?: Status;
  /** The currency of the lot. */
  readonly creditCurrency?: string;
  /** The billing currency of the lot. */
  readonly billingCurrency?: string;
  /** The original amount of a lot in billing currency,  Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly originalAmountInBillingCurrency?: AmountWithExchangeRate;
  /** The balance as of the last invoice in billing currency. */
  readonly closedBalanceInBillingCurrency?: AmountWithExchangeRate;
  /** The reseller of the lot. */
  readonly reseller?: Reseller;
  /** If true, the listed details are based on an estimation and it will be subjected to change. */
  readonly isEstimatedBalance?: boolean;
  /** The eTag for the resource. */
  readonly eTagPropertiesETag?: string;
  /** The organization type of the lot. */
  readonly organizationType?: OrganizationType;
  /** Amount consumed from the commitment. */
  readonly usedAmount?: Amount;
}

export function lotSummaryDeserializer(item: any): LotSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _lotSummaryPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** The lot properties. */
export interface LotProperties {
  /** The original amount of a lot, Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly originalAmount?: Amount;
  /** The balance as of the last invoice. */
  readonly closedBalance?: Amount;
  /** The source of the lot. */
  readonly source?: LotSource;
  /** The date when the lot became effective. */
  readonly startDate?: Date;
  /** The expiration date of a lot. */
  readonly expirationDate?: Date;
  /** The po number of the invoice on which the lot was added. This property is not available for ConsumptionCommitment lots. */
  readonly poNumber?: string;
  /** The date when the lot was added. */
  readonly purchasedDate?: Date;
  /** The status of the lot. */
  readonly status?: Status;
  /** The currency of the lot. */
  readonly creditCurrency?: string;
  /** The billing currency of the lot. */
  readonly billingCurrency?: string;
  /** The original amount of a lot in billing currency,  Note: This will not be returned for Contributor Organization Type in Multi-Entity consumption commitment */
  readonly originalAmountInBillingCurrency?: AmountWithExchangeRate;
  /** The balance as of the last invoice in billing currency. */
  readonly closedBalanceInBillingCurrency?: AmountWithExchangeRate;
  /** The reseller of the lot. */
  readonly reseller?: Reseller;
  /** If true, the listed details are based on an estimation and it will be subjected to change. */
  readonly isEstimatedBalance?: boolean;
  /** The eTag for the resource. */
  readonly eTag?: string;
  /** The organization type of the lot. */
  readonly organizationType?: OrganizationType;
  /** Amount consumed from the commitment. */
  readonly usedAmount?: Amount;
}

export function lotPropertiesDeserializer(item: any): LotProperties {
  return {
    originalAmount: !item["originalAmount"]
      ? item["originalAmount"]
      : amountDeserializer(item["originalAmount"]),
    closedBalance: !item["closedBalance"]
      ? item["closedBalance"]
      : amountDeserializer(item["closedBalance"]),
    source: item["source"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    poNumber: item["poNumber"],
    purchasedDate: !item["purchasedDate"] ? item["purchasedDate"] : new Date(item["purchasedDate"]),
    status: item["status"],
    creditCurrency: item["creditCurrency"],
    billingCurrency: item["billingCurrency"],
    originalAmountInBillingCurrency: !item["originalAmountInBillingCurrency"]
      ? item["originalAmountInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["originalAmountInBillingCurrency"]),
    closedBalanceInBillingCurrency: !item["closedBalanceInBillingCurrency"]
      ? item["closedBalanceInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["closedBalanceInBillingCurrency"]),
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    isEstimatedBalance: item["isEstimatedBalance"],
    eTag: item["eTag"],
    organizationType: item["OrganizationType"],
    usedAmount: !item["usedAmount"] ? item["usedAmount"] : amountDeserializer(item["usedAmount"]),
  };
}

/** The source of the lot. */
export enum KnownLotSource {
  /** PurchasedCredit */
  PurchasedCredit = "PurchasedCredit",
  /** PromotionalCredit */
  PromotionalCredit = "PromotionalCredit",
  /** ConsumptionCommitment */
  ConsumptionCommitment = "ConsumptionCommitment",
}

/**
 * The source of the lot. \
 * {@link KnownLotSource} can be used interchangeably with LotSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PurchasedCredit** \
 * **PromotionalCredit** \
 * **ConsumptionCommitment**
 */
export type LotSource = string;

/** The status of the lot. */
export enum KnownStatus {
  /** None */
  None = "None",
  /** Active */
  Active = "Active",
  /** Inactive */
  Inactive = "Inactive",
  /** Expired */
  Expired = "Expired",
  /** Complete */
  Complete = "Complete",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The status of the lot. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Active** \
 * **Inactive** \
 * **Expired** \
 * **Complete** \
 * **Canceled**
 */
export type Status = string;

/** The organization type of the lot. */
export enum KnownOrganizationType {
  /** Primary organization type for Multi-Entity consumption commitment. */
  PrimaryOrganizationType = "Primary",
  /** Contributor organization type for Multi-Entity consumption commitment. */
  ContributorOrganizationType = "Contributor",
}

/**
 * The organization type of the lot. \
 * {@link KnownOrganizationType} can be used interchangeably with OrganizationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary organization type for Multi-Entity consumption commitment. \
 * **Contributor**: Contributor organization type for Multi-Entity consumption commitment.
 */
export type OrganizationType = string;

/** Known values of {@link Metrictype} that the service accepts. */
export enum KnownMetrictype {
  /** Actual cost data. */
  ActualCostMetricType = "actualcost",
  /** Amortized cost data. */
  AmortizedCostMetricType = "amortizedcost",
  /** Usage data. */
  UsageMetricType = "usage",
}

/** Type of Metrictype */
export type Metrictype = string;

/** Known values of {@link Datagrain} that the service accepts. */
export enum KnownDatagrain {
  /** Daily grain of data */
  DailyGrain = "daily",
  /** Monthly grain of data */
  MonthlyGrain = "monthly",
}

/** Type of Datagrain */
export type Datagrain = string;

/** Known values of {@link Scope} that the service accepts. */
export enum KnownScope {
  /** Single */
  Single = "Single",
  /** Shared */
  Shared = "Shared",
}

/** Type of Scope */
export type Scope = string;

/** Known values of {@link Term} that the service accepts. */
export enum KnownTerm {
  /** 1 month reservation term */
  P1M = "P1M",
  /** 1 year reservation term */
  P1Y = "P1Y",
  /** 3 year reservation term */
  P3Y = "P3Y",
}

/** Type of Term */
export type Term = string;

/** Known values of {@link LookBackPeriod} that the service accepts. */
export enum KnownLookBackPeriod {
  /** Use 7 days of data for recommendations */
  Last07Days = "Last7Days",
  /** Use 30 days of data for recommendations */
  Last30Days = "Last30Days",
  /** Use 60 days of data for recommendations */
  Last60Days = "Last60Days",
}

/** Type of LookBackPeriod */
export type LookBackPeriod = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-08-01 API version. */
  V20240801 = "2024-08-01",
}

export function _priceSheetResultPropertiesDeserializer(item: any) {
  return {
    pricesheets: !item["pricesheets"]
      ? item["pricesheets"]
      : priceSheetPropertiesArrayDeserializer(item["pricesheets"]),
    nextLink: item["nextLink"],
    download: !item["download"] ? item["download"] : meterDetailsDeserializer(item["download"]),
  };
}

export function _operationStatusPropertiesDeserializer(item: any) {
  return {
    downloadUrl: item["downloadUrl"],
    validTill: !item["validTill"] ? item["validTill"] : new Date(item["validTill"]),
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

export function _creditSummaryPropertiesDeserializer(item: any) {
  return {
    balanceSummary: !item["balanceSummary"]
      ? item["balanceSummary"]
      : creditBalanceSummaryDeserializer(item["balanceSummary"]),
    pendingCreditAdjustments: !item["pendingCreditAdjustments"]
      ? item["pendingCreditAdjustments"]
      : amountDeserializer(item["pendingCreditAdjustments"]),
    expiredCredit: !item["expiredCredit"]
      ? item["expiredCredit"]
      : amountDeserializer(item["expiredCredit"]),
    pendingEligibleCharges: !item["pendingEligibleCharges"]
      ? item["pendingEligibleCharges"]
      : amountDeserializer(item["pendingEligibleCharges"]),
    creditCurrency: item["creditCurrency"],
    billingCurrency: item["billingCurrency"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    isEstimatedBalance: item["isEstimatedBalance"],
    eTagPropertiesETag: item["eTag"],
  };
}

export function _legacyUsageDetailPropertiesDeserializer(item: any) {
  return {
    billingAccountId: item["billingAccountId"],
    billingAccountName: item["billingAccountName"],
    billingPeriodStartDate: !item["billingPeriodStartDate"]
      ? item["billingPeriodStartDate"]
      : new Date(item["billingPeriodStartDate"]),
    billingPeriodEndDate: !item["billingPeriodEndDate"]
      ? item["billingPeriodEndDate"]
      : new Date(item["billingPeriodEndDate"]),
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    accountOwnerId: item["accountOwnerId"],
    accountName: item["accountName"],
    subscriptionId: item["subscriptionId"],
    subscriptionName: item["subscriptionName"],
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    product: item["product"],
    partNumber: item["partNumber"],
    meterId: item["meterId"],
    meterDetails: !item["meterDetails"]
      ? item["meterDetails"]
      : meterDetailsResponseDeserializer(item["meterDetails"]),
    quantity: item["quantity"],
    effectivePrice: item["effectivePrice"],
    cost: item["cost"],
    unitPrice: item["unitPrice"],
    billingCurrency: item["billingCurrency"],
    resourceLocation: item["resourceLocation"],
    consumedService: item["consumedService"],
    resourceId: item["resourceId"],
    resourceName: item["resourceName"],
    serviceInfo1: item["serviceInfo1"],
    serviceInfo2: item["serviceInfo2"],
    additionalInfo: item["additionalInfo"],
    invoiceSection: item["invoiceSection"],
    costCenter: item["costCenter"],
    resourceGroup: item["resourceGroup"],
    reservationId: item["reservationId"],
    reservationName: item["reservationName"],
    productOrderId: item["productOrderId"],
    productOrderName: item["productOrderName"],
    offerId: item["offerId"],
    isAzureCreditEligible: item["isAzureCreditEligible"],
    term: item["term"],
    publisherName: item["publisherName"],
    publisherType: item["publisherType"],
    planName: item["planName"],
    chargeType: item["chargeType"],
    frequency: item["frequency"],
    payGPrice: item["payGPrice"],
    benefitId: item["benefitId"],
    benefitName: item["benefitName"],
    pricingModel: item["pricingModel"],
  };
}

export function _modernUsageDetailPropertiesDeserializer(item: any) {
  return {
    billingAccountId: item["billingAccountId"],
    effectivePrice: item["effectivePrice"],
    pricingModel: item["pricingModel"],
    billingAccountName: item["billingAccountName"],
    billingPeriodStartDate: !item["billingPeriodStartDate"]
      ? item["billingPeriodStartDate"]
      : new Date(item["billingPeriodStartDate"]),
    billingPeriodEndDate: !item["billingPeriodEndDate"]
      ? item["billingPeriodEndDate"]
      : new Date(item["billingPeriodEndDate"]),
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    subscriptionGuid: item["subscriptionGuid"],
    subscriptionName: item["subscriptionName"],
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    product: item["product"],
    meterId: item["meterId"],
    meterName: item["meterName"],
    meterRegion: item["meterRegion"],
    meterCategory: item["meterCategory"],
    meterSubCategory: item["meterSubCategory"],
    serviceFamily: item["serviceFamily"],
    quantity: item["quantity"],
    unitOfMeasure: item["unitOfMeasure"],
    instanceName: item["instanceName"],
    costInUSD: item["costInUSD"],
    unitPrice: item["unitPrice"],
    billingCurrencyCode: item["billingCurrencyCode"],
    resourceLocation: item["resourceLocation"],
    consumedService: item["consumedService"],
    serviceInfo1: item["serviceInfo1"],
    serviceInfo2: item["serviceInfo2"],
    additionalInfo: item["additionalInfo"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionName: item["invoiceSectionName"],
    costCenter: item["costCenter"],
    resourceGroup: item["resourceGroup"],
    reservationId: item["reservationId"],
    reservationName: item["reservationName"],
    productOrderId: item["productOrderId"],
    productOrderName: item["productOrderName"],
    isAzureCreditEligible: item["isAzureCreditEligible"],
    term: item["term"],
    publisherName: item["publisherName"],
    publisherType: item["publisherType"],
    chargeType: item["chargeType"],
    frequency: item["frequency"],
    costInBillingCurrency: item["costInBillingCurrency"],
    costInPricingCurrency: item["costInPricingCurrency"],
    exchangeRate: item["exchangeRate"],
    exchangeRateDate: !item["exchangeRateDate"]
      ? item["exchangeRateDate"]
      : new Date(item["exchangeRateDate"]),
    invoiceId: item["invoiceId"],
    previousInvoiceId: item["previousInvoiceId"],
    pricingCurrencyCode: item["pricingCurrencyCode"],
    productIdentifier: item["productIdentifier"],
    resourceLocationNormalized: item["resourceLocationNormalized"],
    servicePeriodStartDate: !item["servicePeriodStartDate"]
      ? item["servicePeriodStartDate"]
      : new Date(item["servicePeriodStartDate"]),
    servicePeriodEndDate: !item["servicePeriodEndDate"]
      ? item["servicePeriodEndDate"]
      : new Date(item["servicePeriodEndDate"]),
    customerTenantId: item["customerTenantId"],
    customerName: item["customerName"],
    partnerTenantId: item["partnerTenantId"],
    partnerName: item["partnerName"],
    resellerMpnId: item["resellerMpnId"],
    resellerName: item["resellerName"],
    publisherId: item["publisherId"],
    marketPrice: item["marketPrice"],
    exchangeRatePricingToBilling: item["exchangeRatePricingToBilling"],
    paygCostInBillingCurrency: item["paygCostInBillingCurrency"],
    paygCostInUSD: item["paygCostInUSD"],
    partnerEarnedCreditRate: item["partnerEarnedCreditRate"],
    partnerEarnedCreditApplied: item["partnerEarnedCreditApplied"],
    payGPrice: item["payGPrice"],
    benefitId: item["benefitId"],
    benefitName: item["benefitName"],
    provider: item["provider"],
    costAllocationRuleName: item["costAllocationRuleName"],
  };
}

export function _marketplacePropertiesDeserializer(item: any) {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: !item["usageStart"] ? item["usageStart"] : new Date(item["usageStart"]),
    usageEnd: !item["usageEnd"] ? item["usageEnd"] : new Date(item["usageEnd"]),
    resourceRate: item["resourceRate"],
    offerName: item["offerName"],
    resourceGroup: item["resourceGroup"],
    additionalInfo: item["additionalInfo"],
    orderNumber: item["orderNumber"],
    instanceName: item["instanceName"],
    instanceId: item["instanceId"],
    currency: item["currency"],
    consumedQuantity: item["consumedQuantity"],
    unitOfMeasure: item["unitOfMeasure"],
    pretaxCost: item["pretaxCost"],
    isEstimated: item["isEstimated"],
    meterId: item["meterId"],
    subscriptionGuid: item["subscriptionGuid"],
    subscriptionName: item["subscriptionName"],
    accountName: item["accountName"],
    departmentName: item["departmentName"],
    consumedService: item["consumedService"],
    costCenter: item["costCenter"],
    additionalProperties: item["additionalProperties"],
    publisherName: item["publisherName"],
    planName: item["planName"],
    isRecurringCharge: item["isRecurringCharge"],
  };
}

export function _tagsResultPropertiesDeserializer(item: any) {
  return {
    tags: !item["tags"] ? item["tags"] : tagArrayDeserializer(item["tags"]),
    nextLink: item["nextLink"],
    previousLink: item["previousLink"],
  };
}

export function _legacyChargeSummaryPropertiesDeserializer(item: any) {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: item["usageStart"],
    usageEnd: item["usageEnd"],
    azureCharges: item["azureCharges"],
    chargesBilledSeparately: item["chargesBilledSeparately"],
    azureMarketplaceCharges: item["azureMarketplaceCharges"],
    currency: item["currency"],
  };
}

export function _modernChargeSummaryPropertiesDeserializer(item: any) {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: item["usageStart"],
    usageEnd: item["usageEnd"],
    azureCharges: !item["azureCharges"]
      ? item["azureCharges"]
      : amountDeserializer(item["azureCharges"]),
    chargesBilledSeparately: !item["chargesBilledSeparately"]
      ? item["chargesBilledSeparately"]
      : amountDeserializer(item["chargesBilledSeparately"]),
    marketplaceCharges: !item["marketplaceCharges"]
      ? item["marketplaceCharges"]
      : amountDeserializer(item["marketplaceCharges"]),
    billingAccountId: item["billingAccountId"],
    billingProfileId: item["billingProfileId"],
    invoiceSectionId: item["invoiceSectionId"],
    customerId: item["customerId"],
    isInvoiced: item["isInvoiced"],
    subscriptionId: item["subscriptionId"],
  };
}

export function _balancePropertiesDeserializer(item: any) {
  return {
    currency: item["currency"],
    beginningBalance: item["beginningBalance"],
    endingBalance: item["endingBalance"],
    newPurchases: item["newPurchases"],
    adjustments: item["adjustments"],
    utilized: item["utilized"],
    serviceOverage: item["serviceOverage"],
    chargesBilledSeparately: item["chargesBilledSeparately"],
    totalOverage: item["totalOverage"],
    totalUsage: item["totalUsage"],
    azureMarketplaceServiceCharges: item["azureMarketplaceServiceCharges"],
    billingFrequency: item["billingFrequency"],
    priceHidden: item["priceHidden"],
    overageRefund: item["overageRefund"],
    newPurchasesDetails: !item["newPurchasesDetails"]
      ? item["newPurchasesDetails"]
      : balancePropertiesNewPurchasesDetailsItemArrayDeserializer(item["newPurchasesDetails"]),
    adjustmentDetails: !item["adjustmentDetails"]
      ? item["adjustmentDetails"]
      : balancePropertiesAdjustmentDetailsItemArrayDeserializer(item["adjustmentDetails"]),
  };
}

export function _reservationSummaryPropertiesDeserializer(item: any) {
  return {
    reservationOrderId: item["reservationOrderId"],
    reservationId: item["reservationId"],
    skuName: item["skuName"],
    reservedHours: item["reservedHours"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    usedHours: item["usedHours"],
    minUtilizationPercentage: item["minUtilizationPercentage"],
    avgUtilizationPercentage: item["avgUtilizationPercentage"],
    maxUtilizationPercentage: item["maxUtilizationPercentage"],
    kind: item["kind"],
    purchasedQuantity: item["purchasedQuantity"],
    remainingQuantity: item["remainingQuantity"],
    totalReservedQuantity: item["totalReservedQuantity"],
    usedQuantity: item["usedQuantity"],
    utilizedPercentage: item["utilizedPercentage"],
  };
}

export function _reservationDetailPropertiesDeserializer(item: any) {
  return {
    reservationOrderId: item["reservationOrderId"],
    instanceFlexibilityRatio: item["instanceFlexibilityRatio"],
    instanceFlexibilityGroup: item["instanceFlexibilityGroup"],
    reservationId: item["reservationId"],
    skuName: item["skuName"],
    reservedHours: item["reservedHours"],
    usageDate: !item["usageDate"] ? item["usageDate"] : new Date(item["usageDate"]),
    usedHours: item["usedHours"],
    instanceId: item["instanceId"],
    totalReservedQuantity: item["totalReservedQuantity"],
    kind: item["kind"],
  };
}

export function _reservationRecommendationDetailsModelPropertiesDeserializer(item: any) {
  return {
    currency: item["currency"],
    resource: !item["resource"]
      ? item["resource"]
      : reservationRecommendationDetailsResourcePropertiesDeserializer(item["resource"]),
    resourceGroup: item["resourceGroup"],
    savings: !item["savings"]
      ? item["savings"]
      : reservationRecommendationDetailsSavingsPropertiesDeserializer(item["savings"]),
    scope: item["scope"],
    usage: !item["usage"]
      ? item["usage"]
      : reservationRecommendationDetailsUsagePropertiesDeserializer(item["usage"]),
  };
}

export function _reservationTransactionPropertiesDeserializer(item: any) {
  return {
    eventDate: !item["eventDate"] ? item["eventDate"] : new Date(item["eventDate"]),
    reservationOrderId: item["reservationOrderId"],
    description: item["description"],
    eventType: item["eventType"],
    quantity: item["quantity"],
    amount: item["amount"],
    currency: item["currency"],
    reservationOrderName: item["reservationOrderName"],
    purchasingEnrollment: item["purchasingEnrollment"],
    purchasingSubscriptionGuid: item["purchasingSubscriptionGuid"],
    purchasingSubscriptionName: item["purchasingSubscriptionName"],
    armSkuName: item["armSkuName"],
    term: item["term"],
    region: item["region"],
    accountName: item["accountName"],
    accountOwnerEmail: item["accountOwnerEmail"],
    departmentName: item["departmentName"],
    costCenter: item["costCenter"],
    currentEnrollment: item["currentEnrollment"],
    billingFrequency: item["billingFrequency"],
    billingMonth: item["billingMonth"],
    monetaryCommitment: item["monetaryCommitment"],
    overage: item["overage"],
  };
}

export function _modernReservationTransactionPropertiesDeserializer(item: any) {
  return {
    amount: item["amount"],
    armSkuName: item["armSkuName"],
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    currency: item["currency"],
    description: item["description"],
    eventDate: !item["eventDate"] ? item["eventDate"] : new Date(item["eventDate"]),
    eventType: item["eventType"],
    invoice: item["invoice"],
    invoiceId: item["invoiceId"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionName: item["invoiceSectionName"],
    purchasingSubscriptionGuid: item["purchasingSubscriptionGuid"],
    purchasingSubscriptionName: item["purchasingSubscriptionName"],
    quantity: item["quantity"],
    region: item["region"],
    reservationOrderId: item["reservationOrderId"],
    reservationOrderName: item["reservationOrderName"],
    term: item["term"],
  };
}

export function _managementGroupAggregatedCostResultPropertiesDeserializer(item: any) {
  return {
    billingPeriodId: item["billingPeriodId"],
    usageStart: !item["usageStart"] ? item["usageStart"] : new Date(item["usageStart"]),
    usageEnd: !item["usageEnd"] ? item["usageEnd"] : new Date(item["usageEnd"]),
    azureCharges: item["azureCharges"],
    marketplaceCharges: item["marketplaceCharges"],
    chargesBilledSeparately: item["chargesBilledSeparately"],
    currency: item["currency"],
    children: !item["children"]
      ? item["children"]
      : managementGroupAggregatedCostResultArrayDeserializer(item["children"]),
    includedSubscriptions: !item["includedSubscriptions"]
      ? item["includedSubscriptions"]
      : item["includedSubscriptions"].map((p: any) => {
          return p;
        }),
    excludedSubscriptions: !item["excludedSubscriptions"]
      ? item["excludedSubscriptions"]
      : item["excludedSubscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function _eventSummaryPropertiesDeserializer(item: any) {
  return {
    transactionDate: !item["transactionDate"]
      ? item["transactionDate"]
      : new Date(item["transactionDate"]),
    description: item["description"],
    newCredit: !item["newCredit"] ? item["newCredit"] : amountDeserializer(item["newCredit"]),
    adjustments: !item["adjustments"]
      ? item["adjustments"]
      : amountDeserializer(item["adjustments"]),
    creditExpired: !item["creditExpired"]
      ? item["creditExpired"]
      : amountDeserializer(item["creditExpired"]),
    charges: !item["charges"] ? item["charges"] : amountDeserializer(item["charges"]),
    closedBalance: !item["closedBalance"]
      ? item["closedBalance"]
      : amountDeserializer(item["closedBalance"]),
    billingAccountId: item["billingAccountId"],
    billingAccountDisplayName: item["billingAccountDisplayName"],
    eventType: item["eventType"],
    invoiceNumber: item["invoiceNumber"],
    billingProfileId: item["billingProfileId"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    lotId: item["lotId"],
    lotSource: item["lotSource"],
    canceledCredit: !item["canceledCredit"]
      ? item["canceledCredit"]
      : amountDeserializer(item["canceledCredit"]),
    creditCurrency: item["creditCurrency"],
    billingCurrency: item["billingCurrency"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    creditExpiredInBillingCurrency: !item["creditExpiredInBillingCurrency"]
      ? item["creditExpiredInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["creditExpiredInBillingCurrency"]),
    newCreditInBillingCurrency: !item["newCreditInBillingCurrency"]
      ? item["newCreditInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["newCreditInBillingCurrency"]),
    adjustmentsInBillingCurrency: !item["adjustmentsInBillingCurrency"]
      ? item["adjustmentsInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["adjustmentsInBillingCurrency"]),
    chargesInBillingCurrency: !item["chargesInBillingCurrency"]
      ? item["chargesInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["chargesInBillingCurrency"]),
    closedBalanceInBillingCurrency: !item["closedBalanceInBillingCurrency"]
      ? item["closedBalanceInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["closedBalanceInBillingCurrency"]),
    isEstimatedBalance: item["isEstimatedBalance"],
    eTagPropertiesETag: item["eTag"],
  };
}

export function _lotSummaryPropertiesDeserializer(item: any) {
  return {
    originalAmount: !item["originalAmount"]
      ? item["originalAmount"]
      : amountDeserializer(item["originalAmount"]),
    closedBalance: !item["closedBalance"]
      ? item["closedBalance"]
      : amountDeserializer(item["closedBalance"]),
    source: item["source"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    poNumber: item["poNumber"],
    purchasedDate: !item["purchasedDate"] ? item["purchasedDate"] : new Date(item["purchasedDate"]),
    status: item["status"],
    creditCurrency: item["creditCurrency"],
    billingCurrency: item["billingCurrency"],
    originalAmountInBillingCurrency: !item["originalAmountInBillingCurrency"]
      ? item["originalAmountInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["originalAmountInBillingCurrency"]),
    closedBalanceInBillingCurrency: !item["closedBalanceInBillingCurrency"]
      ? item["closedBalanceInBillingCurrency"]
      : amountWithExchangeRateDeserializer(item["closedBalanceInBillingCurrency"]),
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    isEstimatedBalance: item["isEstimatedBalance"],
    eTagPropertiesETag: item["eTag"],
    organizationType: item["OrganizationType"],
    usedAmount: !item["usedAmount"] ? item["usedAmount"] : amountDeserializer(item["usedAmount"]),
  };
}
