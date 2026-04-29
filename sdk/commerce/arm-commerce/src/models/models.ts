// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The response of a UsageAggregation list operation. */
export interface _UsageAggregationListResult {
  /** The UsageAggregation items on this page */
  value: UsageAggregation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _usageAggregationListResultDeserializer(item: any): _UsageAggregationListResult {
  return {
    value: usageAggregationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageAggregationArrayDeserializer(result: Array<UsageAggregation>): any[] {
  return result.map((item) => {
    return usageAggregationDeserializer(item);
  });
}

/** Describes the usageAggregation. */
export interface UsageAggregation {
  /** Unique Id for the usage aggregate. */
  id?: string;
  /** Name of the usage aggregate. */
  name?: string;
  /** Type of the resource being returned. */
  type?: string;
  /** The subscription identifier for the Azure user. */
  subscriptionId?: string;
  /** Unique ID for the resource that was consumed (aka ResourceID). */
  meterId?: string;
  /** UTC start time for the usage bucket to which this usage aggregate belongs. */
  usageStartTime?: Date;
  /** UTC end time for the usage bucket to which this usage aggregate belongs. */
  usageEndTime?: Date;
  /** The amount of the resource consumption that occurred in this time frame. */
  quantity?: number;
  /** The unit in which the usage for this resource is being counted, e.g. Hours, GB. */
  unit?: string;
  /** Friendly name of the resource being consumed. */
  meterName?: string;
  /** Category of the consumed resource. */
  meterCategory?: string;
  /** Sub-category of the consumed resource. */
  meterSubCategory?: string;
  /** Region of the meterId used for billing purposes */
  meterRegion?: string;
  /** Key-value pairs of instance details (legacy format). */
  infoFields?: any;
  /** Key-value pairs of instance details represented as a string. */
  instanceData?: string;
}

export function usageAggregationDeserializer(item: any): UsageAggregation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _usageAggregationPropertiesDeserializer(item["properties"])),
  };
}

/** Describes a sample of the usageAggregation. */
export interface UsageSample {
  /** The subscription identifier for the Azure user. */
  subscriptionId?: string;
  /** Unique ID for the resource that was consumed (aka ResourceID). */
  meterId?: string;
  /** UTC start time for the usage bucket to which this usage aggregate belongs. */
  usageStartTime?: Date;
  /** UTC end time for the usage bucket to which this usage aggregate belongs. */
  usageEndTime?: Date;
  /** The amount of the resource consumption that occurred in this time frame. */
  quantity?: number;
  /** The unit in which the usage for this resource is being counted, e.g. Hours, GB. */
  unit?: string;
  /** Friendly name of the resource being consumed. */
  meterName?: string;
  /** Category of the consumed resource. */
  meterCategory?: string;
  /** Sub-category of the consumed resource. */
  meterSubCategory?: string;
  /** Region of the meterId used for billing purposes */
  meterRegion?: string;
  /** Key-value pairs of instance details (legacy format). */
  infoFields?: any;
  /** Key-value pairs of instance details represented as a string. */
  instanceData?: string;
}

export function usageSampleDeserializer(item: any): UsageSample {
  return {
    subscriptionId: item["subscriptionId"],
    meterId: item["meterId"],
    usageStartTime: !item["usageStartTime"]
      ? item["usageStartTime"]
      : new Date(item["usageStartTime"]),
    usageEndTime: !item["usageEndTime"] ? item["usageEndTime"] : new Date(item["usageEndTime"]),
    quantity: item["quantity"],
    unit: item["unit"],
    meterName: item["meterName"],
    meterCategory: item["meterCategory"],
    meterSubCategory: item["meterSubCategory"],
    meterRegion: item["meterRegion"],
    infoFields: item["infoFields"],
    instanceData: item["instanceData"],
  };
}

/** Describes the format of Error response with a wrapper object */
export interface ErrorObjectResponse {
  /** Wrapper object for error information */
  error?: ErrorResponse;
}

export function errorObjectResponseDeserializer(item: any): ErrorObjectResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** Describes the format of Error response. */
export interface ErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Price and Metadata information for resources */
export interface ResourceRateCardInfo {
  /** The currency in which the rates are provided. */
  currency?: string;
  /** The culture in which the resource information is localized. */
  locale?: string;
  /** All rates are pretax, so this will always be returned as 'false'. */
  isTaxIncluded?: boolean;
  /** A list of offer terms. */
  offerTerms?: OfferTermInfoUnion[];
  /** A list of meters. */
  meters?: MeterInfo[];
}

export function resourceRateCardInfoDeserializer(item: any): ResourceRateCardInfo {
  return {
    currency: item["Currency"],
    locale: item["Locale"],
    isTaxIncluded: item["IsTaxIncluded"],
    offerTerms: !item["OfferTerms"]
      ? item["OfferTerms"]
      : offerTermInfoUnionArrayDeserializer(item["OfferTerms"]),
    meters: !item["Meters"] ? item["Meters"] : meterInfoArrayDeserializer(item["Meters"]),
  };
}

export function offerTermInfoUnionArrayDeserializer(result: Array<OfferTermInfoUnion>): any[] {
  return result.map((item) => {
    return offerTermInfoUnionDeserializer(item);
  });
}

/** Describes the offer term. */
export interface OfferTermInfo {
  /** Name of the offer term */
  /** The discriminator possible values: Monetary Credit, Monetary Commitment, Recurring Charge */
  name: OfferTermInfoName;
  /** Indicates the date from which the offer term is effective. */
  effectiveDate?: Date;
}

export function offerTermInfoDeserializer(item: any): OfferTermInfo {
  return {
    name: item["Name"],
    effectiveDate: !item["EffectiveDate"] ? item["EffectiveDate"] : new Date(item["EffectiveDate"]),
  };
}

/** Alias for OfferTermInfoUnion */
export type OfferTermInfoUnion =
  | MonetaryCredit
  | MonetaryCommitment
  | RecurringCharge
  | OfferTermInfo;

export function offerTermInfoUnionDeserializer(item: any): OfferTermInfoUnion {
  switch (item["Name"]) {
    case "Monetary Credit":
      return monetaryCreditDeserializer(item as MonetaryCredit);

    case "Monetary Commitment":
      return monetaryCommitmentDeserializer(item as MonetaryCommitment);

    case "Recurring Charge":
      return recurringChargeDeserializer(item as RecurringCharge);

    default:
      return offerTermInfoDeserializer(item);
  }
}

/** Name of the offer term */
export type OfferTermInfoName = "Recurring Charge" | "Monetary Commitment" | "Monetary Credit";

/** Indicates that this is a monetary credit offer. */
export interface MonetaryCredit extends OfferTermInfo {
  /** The amount of credit provided under the terms of the given offer level. */
  credit?: number;
  /** An array of meter ids that are excluded from the given offer terms. */
  excludedMeterIds?: string[];
  /** Name of the offer term */
  name: "Monetary Credit";
}

export function monetaryCreditDeserializer(item: any): MonetaryCredit {
  return {
    name: item["Name"],
    effectiveDate: !item["EffectiveDate"] ? item["EffectiveDate"] : new Date(item["EffectiveDate"]),
    credit: item["Credit"],
    excludedMeterIds: !item["ExcludedMeterIds"]
      ? item["ExcludedMeterIds"]
      : item["ExcludedMeterIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Indicates that a monetary commitment is required for this offer */
export interface MonetaryCommitment extends OfferTermInfo {
  /** The list of key/value pairs for the tiered meter rates, in the format 'key':'value' where key = price, and value = the corresponding discount percentage. This field is used only by offer terms of type 'Monetary Commitment'. */
  tieredDiscount?: Record<string, number>;
  /** An array of meter ids that are excluded from the given offer terms. */
  excludedMeterIds?: string[];
  /** Name of the offer term */
  name: "Monetary Commitment";
}

export function monetaryCommitmentDeserializer(item: any): MonetaryCommitment {
  return {
    name: item["Name"],
    effectiveDate: !item["EffectiveDate"] ? item["EffectiveDate"] : new Date(item["EffectiveDate"]),
    tieredDiscount: !item["TieredDiscount"]
      ? item["TieredDiscount"]
      : Object.fromEntries(
          Object.entries(item["TieredDiscount"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    excludedMeterIds: !item["ExcludedMeterIds"]
      ? item["ExcludedMeterIds"]
      : item["ExcludedMeterIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Indicates a recurring charge is present for this offer. */
export interface RecurringCharge extends OfferTermInfo {
  /** The amount of recurring charge as per the offer term. */
  recurringCharge?: number;
  /** Name of the offer term */
  name: "Recurring Charge";
}

export function recurringChargeDeserializer(item: any): RecurringCharge {
  return {
    name: item["Name"],
    effectiveDate: !item["EffectiveDate"] ? item["EffectiveDate"] : new Date(item["EffectiveDate"]),
    recurringCharge: item["RecurringCharge"],
  };
}

export function meterInfoArrayDeserializer(result: Array<MeterInfo>): any[] {
  return result.map((item) => {
    return meterInfoDeserializer(item);
  });
}

/** Detailed information about the meter. */
export interface MeterInfo {
  /** The unique identifier of the resource. */
  meterId?: string;
  /** The name of the meter, within the given meter category */
  meterName?: string;
  /** The category of the meter, e.g., 'Cloud services', 'Networking', etc.. */
  meterCategory?: string;
  /** The subcategory of the meter, e.g., 'A6 Cloud services', 'ExpressRoute (IXP)', etc.. */
  meterSubCategory?: string;
  /** The unit in which the meter consumption is charged, e.g., 'Hours', 'GB', etc. */
  unit?: string;
  /** Provides additional meter data. 'Third Party' indicates a meter with no discount. Blanks indicate First Party. */
  meterTags?: string[];
  /** The region in which the Azure service is available. */
  meterRegion?: string;
  /** The list of key/value pairs for the meter rates, in the format 'key':'value' where key = the meter quantity, and value = the corresponding price */
  meterRates?: Record<string, number>;
  /** Indicates the date from which the meter rate is effective. */
  effectiveDate?: Date;
  /** The resource quantity that is included in the offer at no cost. Consumption beyond this quantity will be charged. */
  includedQuantity?: number;
}

export function meterInfoDeserializer(item: any): MeterInfo {
  return {
    meterId: item["MeterId"],
    meterName: item["MeterName"],
    meterCategory: item["MeterCategory"],
    meterSubCategory: item["MeterSubCategory"],
    unit: item["Unit"],
    meterTags: !item["MeterTags"]
      ? item["MeterTags"]
      : item["MeterTags"].map((p: any) => {
          return p;
        }),
    meterRegion: item["MeterRegion"],
    meterRates: !item["MeterRates"]
      ? item["MeterRates"]
      : Object.fromEntries(
          Object.entries(item["MeterRates"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    effectiveDate: !item["EffectiveDate"] ? item["EffectiveDate"] : new Date(item["EffectiveDate"]),
    includedQuantity: item["IncludedQuantity"],
  };
}

/** Type of AggregationGranularity */
export type AggregationGranularity = "Daily" | "Hourly";

/** The available API versions. */
export enum KnownVersions {
  /** The 2015-06-01-preview API version. */
  V20150601Preview = "2015-06-01-preview",
}

export function _usageAggregationPropertiesDeserializer(item: any) {
  return {
    subscriptionId: item["subscriptionId"],
    meterId: item["meterId"],
    usageStartTime: !item["usageStartTime"]
      ? item["usageStartTime"]
      : new Date(item["usageStartTime"]),
    usageEndTime: !item["usageEndTime"] ? item["usageEndTime"] : new Date(item["usageEndTime"]),
    quantity: item["quantity"],
    unit: item["unit"],
    meterName: item["meterName"],
    meterCategory: item["meterCategory"],
    meterSubCategory: item["meterSubCategory"],
    meterRegion: item["meterRegion"],
    infoFields: item["infoFields"],
    instanceData: item["instanceData"],
  };
}
