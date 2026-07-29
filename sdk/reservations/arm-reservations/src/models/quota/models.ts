// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Quota request details. */
export interface QuotaRequestDetails extends ProxyResource {
  /** The quota request status. */
  provisioningState?: QuotaRequestState;
  /** User friendly status message. */
  readonly message?: string;
  /** The time when the quota request was submitted using format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  readonly requestSubmitTime?: Date;
  /** The quotaRequests. */
  value?: SubRequest[];
}

export function quotaRequestDetailsDeserializer(item: any): QuotaRequestDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _quotaRequestDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** The details of quota request. */
export interface QuotaRequestProperties {
  /** The quota request status. */
  provisioningState?: QuotaRequestState;
  /** User friendly status message. */
  readonly message?: string;
  /** The time when the quota request was submitted using format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  readonly requestSubmitTime?: Date;
  /** The quotaRequests. */
  value?: SubRequest[];
}

export function quotaRequestPropertiesDeserializer(item: any): QuotaRequestProperties {
  return {
    provisioningState: item["provisioningState"],
    message: item["message"],
    requestSubmitTime: !item["requestSubmitTime"]
      ? item["requestSubmitTime"]
      : new Date(item["requestSubmitTime"]),
    value: !item["value"] ? item["value"] : subRequestArrayDeserializer(item["value"]),
  };
}

/** The quota request status. */
export enum KnownQuotaRequestState {
  /** Accepted */
  Accepted = "Accepted",
  /** Invalid */
  Invalid = "Invalid",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * The quota request status. \
 * {@link KnownQuotaRequestState} can be used interchangeably with QuotaRequestState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted \
 * **Invalid**: Invalid \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **InProgress**: InProgress
 */
export type QuotaRequestState = string;

export function subRequestArrayDeserializer(result: Array<SubRequest>): any[] {
  return result.map((item) => {
    return subRequestDeserializer(item);
  });
}

/** The sub-request submitted with the quota request. */
export interface SubRequest {
  /** Quota (resource limit). */
  readonly limit?: number;
  /** The resource name. */
  name?: ResourceName;
  /** Resource type for which the quota check was made. */
  readonly resourceType?: string;
  /** The limit units, such as **count** and **bytes**. Use the unit field provided in the response of the GET quota operation. */
  unit?: string;
  /** The quota request status. */
  provisioningState?: QuotaRequestState;
  /** User-friendly status message. */
  readonly message?: string;
  /** Sub request ID for individual request. */
  readonly subRequestId?: string;
}

export function subRequestDeserializer(item: any): SubRequest {
  return {
    limit: item["limit"],
    name: !item["name"] ? item["name"] : resourceNameDeserializer(item["name"]),
    resourceType: item["resourceType"],
    unit: item["unit"],
    provisioningState: item["provisioningState"],
    message: item["message"],
    subRequestId: item["subRequestId"],
  };
}

/** Resource name provided by the resource provider. Use this property for quotaRequest parameter. */
export interface ResourceName {
  /** Resource name. */
  value?: string;
  /** Resource display localized name. */
  readonly localizedValue?: string;
}

export function resourceNameSerializer(item: ResourceName): any {
  return { value: item["value"] };
}

export function resourceNameDeserializer(item: any): ResourceName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The API error. */
export interface ExceptionResponse {
  /** The API error details. */
  error?: ServiceError;
}

export function exceptionResponseDeserializer(item: any): ExceptionResponse {
  return {
    error: !item["error"] ? item["error"] : serviceErrorDeserializer(item["error"]),
  };
}

/** The API error details. */
export interface ServiceError {
  /** The error code. */
  code?: string;
  /** The error message text. */
  message?: string;
  /** The list of error details. */
  readonly details?: ServiceErrorDetail[];
}

export function serviceErrorDeserializer(item: any): ServiceError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : serviceErrorDetailArrayDeserializer(item["details"]),
  };
}

export function serviceErrorDetailArrayDeserializer(result: Array<ServiceErrorDetail>): any[] {
  return result.map((item) => {
    return serviceErrorDetailDeserializer(item);
  });
}

/** The error details. */
export interface ServiceErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
}

export function serviceErrorDetailDeserializer(item: any): ServiceErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Quota request details. */
export interface _QuotaRequestDetailsList {
  /** The QuotaRequestDetails items on this page */
  value: QuotaRequestDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaRequestDetailsListDeserializer(item: any): _QuotaRequestDetailsList {
  return {
    value: quotaRequestDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaRequestDetailsArrayDeserializer(result: Array<QuotaRequestDetails>): any[] {
  return result.map((item) => {
    return quotaRequestDetailsDeserializer(item);
  });
}

/** Quota properties. */
export interface CurrentQuotaLimitBase extends ProxyResource {
  /** Quota properties for the resource. */
  properties?: QuotaProperties;
}

export function currentQuotaLimitBaseSerializer(item: CurrentQuotaLimitBase): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : quotaPropertiesSerializer(item["properties"]),
  };
}

export function currentQuotaLimitBaseDeserializer(item: any): CurrentQuotaLimitBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : quotaPropertiesDeserializer(item["properties"]),
  };
}

/** Quota properties for the resource. */
export interface QuotaProperties {
  /** Quota properties. */
  limit?: number;
  /** Current usage value for the resource. */
  readonly currentValue?: number;
  /** The limit units, such as **count** and **bytes**. Use the unit field provided in the response of the GET quota operation. */
  unit?: string;
  /** Name of the resource provide by the resource provider. Use this property for quotaRequests resource operations. */
  name?: ResourceName;
  /** The name of the resource type. */
  resourceType?: ResourceType;
  /** The time period over which the quota usage values are summarized. For example, P1D (per one day), PT1M (per one minute), and PT1S (per one second). This parameter is optional because, for some resources such as compute, the time period is irrelevant. */
  readonly quotaPeriod?: string;
  /** Additional properties for the specified resource provider. */
  properties?: any;
}

export function quotaPropertiesSerializer(item: QuotaProperties): any {
  return {
    limit: item["limit"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : resourceNameSerializer(item["name"]),
    resourceType: item["resourceType"],
    properties: item["properties"],
  };
}

export function quotaPropertiesDeserializer(item: any): QuotaProperties {
  return {
    limit: item["limit"],
    currentValue: item["currentValue"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : resourceNameDeserializer(item["name"]),
    resourceType: item["resourceType"],
    quotaPeriod: item["quotaPeriod"],
    properties: item["properties"],
  };
}

/** The resource types. */
export enum KnownResourceType {
  /** standard */
  Standard = "standard",
  /** dedicated */
  Dedicated = "dedicated",
  /** lowPriority */
  LowPriority = "lowPriority",
  /** shared */
  Shared = "shared",
  /** serviceSpecific */
  ServiceSpecific = "serviceSpecific",
}

/**
 * The resource types. \
 * {@link KnownResourceType} can be used interchangeably with ResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **standard**: standard \
 * **dedicated**: dedicated \
 * **lowPriority**: lowPriority \
 * **shared**: shared \
 * **serviceSpecific**: serviceSpecific
 */
export type ResourceType = string;

/** Quota limits. */
export interface _QuotaLimits {
  /** The CurrentQuotaLimitBase items on this page */
  value: CurrentQuotaLimitBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaLimitsDeserializer(item: any): _QuotaLimits {
  return {
    value: currentQuotaLimitBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function currentQuotaLimitBaseArraySerializer(result: Array<CurrentQuotaLimitBase>): any[] {
  return result.map((item) => {
    return currentQuotaLimitBaseSerializer(item);
  });
}

export function currentQuotaLimitBaseArrayDeserializer(
  result: Array<CurrentQuotaLimitBase>,
): any[] {
  return result.map((item) => {
    return currentQuotaLimitBaseDeserializer(item);
  });
}

export function _quotaRequestDetailsPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    message: item["message"],
    requestSubmitTime: !item["requestSubmitTime"]
      ? item["requestSubmitTime"]
      : new Date(item["requestSubmitTime"]),
    value: !item["value"] ? item["value"] : subRequestArrayDeserializer(item["value"]),
  };
}
