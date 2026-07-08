// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorAdditionalInfo } from "../../models.js";
import { errorAdditionalInfoArrayDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes the format of Error response. */
export interface MicrosoftCommonErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function microsoftCommonErrorResponseDeserializer(item: any): MicrosoftCommonErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The localizable string class. */
export interface MicrosoftCommonLocalizableString {
  /** the invariant value. */
  value: string;
  /** the locale specific value. */
  localizedValue?: string;
}

export function microsoftCommonLocalizableStringDeserializer(
  item: any,
): MicrosoftCommonLocalizableString {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

export function microsoftCommonLocalizableStringArrayDeserializer(
  result: Array<MicrosoftCommonLocalizableString>,
): any[] {
  return result.map((item) => {
    return microsoftCommonLocalizableStringDeserializer(item);
  });
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface MicrosoftCommonErrorContract {
  /** The error object. */
  error?: MicrosoftCommonCommonErrorResponse;
}

export function microsoftCommonErrorContractDeserializer(item: any): MicrosoftCommonErrorContract {
  return {
    error: !item["error"]
      ? item["error"]
      : microsoftCommonCommonErrorResponseDeserializer(item["error"]),
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface MicrosoftCommonCommonErrorResponse {
  /** Error code */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: MicrosoftCommonCommonErrorResponse[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function microsoftCommonCommonErrorResponseDeserializer(
  item: any,
): MicrosoftCommonCommonErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : microsoftCommonCommonErrorResponseArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function microsoftCommonCommonErrorResponseArrayDeserializer(
  result: Array<MicrosoftCommonCommonErrorResponse>,
): any[] {
  return result.map((item) => {
    return microsoftCommonCommonErrorResponseDeserializer(item);
  });
}

/** Specifies the retention policy for the log. */
export interface MicrosoftCommonRetentionPolicy {
  /** a value indicating whether the retention policy is enabled. */
  enabled: boolean;
  /** the number of days for the retention in days. A value of 0 will retain the events indefinitely. */
  days: number;
}

export function microsoftCommonRetentionPolicySerializer(
  item: MicrosoftCommonRetentionPolicy,
): any {
  return { enabled: item["enabled"], days: item["days"] };
}

export function microsoftCommonRetentionPolicyDeserializer(
  item: any,
): MicrosoftCommonRetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
  };
}

/** Specifies the type of threshold criteria. Previously undocumented values might be returned */
export enum KnownMicrosoftCommonCriterionType {
  /** StaticThresholdCriterion */
  StaticThresholdCriterion = "StaticThresholdCriterion",
  /** DynamicThresholdCriterion */
  DynamicThresholdCriterion = "DynamicThresholdCriterion",
}

/**
 * Specifies the type of threshold criteria. Previously undocumented values might be returned \
 * {@link KnownMicrosoftCommonCriterionType} can be used interchangeably with MicrosoftCommonCriterionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StaticThresholdCriterion**: StaticThresholdCriterion \
 * **DynamicThresholdCriterion**: DynamicThresholdCriterion
 */
export type MicrosoftCommonCriterionType = string;

/** Identity for the resource. */
export interface MicrosoftCommonIdentity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** Type of managed service identity. */
  type: MicrosoftCommonIdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, MicrosoftCommonUserIdentityProperties>;
}

export function microsoftCommonIdentitySerializer(item: MicrosoftCommonIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : microsoftCommonUserIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function microsoftCommonIdentityDeserializer(item: any): MicrosoftCommonIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : microsoftCommonUserIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity. */
export type MicrosoftCommonIdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function microsoftCommonUserIdentityPropertiesRecordSerializer(
  item: Record<string, MicrosoftCommonUserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftCommonUserIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function microsoftCommonUserIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, MicrosoftCommonUserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftCommonUserIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** Properties of the user assigned identity. */
export interface MicrosoftCommonUserIdentityProperties {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The client ID of resource identity. */
  readonly clientId?: string;
}

export function microsoftCommonUserIdentityPropertiesSerializer(
  _item: MicrosoftCommonUserIdentityProperties,
): any {
  return {};
}

export function microsoftCommonUserIdentityPropertiesDeserializer(
  item: any,
): MicrosoftCommonUserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** model interface MicrosoftCommonErrorResponseError */
export interface MicrosoftCommonErrorResponseError {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. If Accept-Language is set in the request, it must be localized to that language. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of additional nested error response info objects, as described by this contract. */
  details?: MicrosoftCommonErrorDetail[];
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: MicrosoftCommonErrorResponseErrorAdditionalInfoItem[];
}

export function microsoftCommonErrorResponseErrorDeserializer(
  item: any,
): MicrosoftCommonErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : microsoftCommonErrorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : microsoftCommonErrorResponseErrorAdditionalInfoItemArrayDeserializer(
          item["additionalInfo"],
        ),
  };
}

export function microsoftCommonErrorDetailArrayDeserializer(
  result: Array<MicrosoftCommonErrorDetail>,
): any[] {
  return result.map((item) => {
    return microsoftCommonErrorDetailDeserializer(item);
  });
}

/** Describes details of an error response. */
export interface MicrosoftCommonErrorDetail {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: MicrosoftCommonErrorDetailAdditionalInfoItem[];
}

export function microsoftCommonErrorDetailDeserializer(item: any): MicrosoftCommonErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : microsoftCommonErrorDetailAdditionalInfoItemArrayDeserializer(item["additionalInfo"]),
  };
}

export function microsoftCommonErrorDetailAdditionalInfoItemArrayDeserializer(
  result: Array<MicrosoftCommonErrorDetailAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return microsoftCommonErrorDetailAdditionalInfoItemDeserializer(item);
  });
}

/** model interface MicrosoftCommonErrorDetailAdditionalInfoItem */
export interface MicrosoftCommonErrorDetailAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function microsoftCommonErrorDetailAdditionalInfoItemDeserializer(
  item: any,
): MicrosoftCommonErrorDetailAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function microsoftCommonErrorResponseErrorAdditionalInfoItemArrayDeserializer(
  result: Array<MicrosoftCommonErrorResponseErrorAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return microsoftCommonErrorResponseErrorAdditionalInfoItemDeserializer(item);
  });
}

/** model interface MicrosoftCommonErrorResponseErrorAdditionalInfoItem */
export interface MicrosoftCommonErrorResponseErrorAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function microsoftCommonErrorResponseErrorAdditionalInfoItemDeserializer(
  item: any,
): MicrosoftCommonErrorResponseErrorAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Type of MicrosoftCommonResultType */
export type MicrosoftCommonResultType = "Data" | "Metadata";
