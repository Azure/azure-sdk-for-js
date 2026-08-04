// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ActionGroupPatchBody } from "../../actionGroupsApi/models.js";
import type { ErrorAdditionalInfo } from "../../models.js";
import { errorAdditionalInfoArrayDeserializer } from "../../models.js";
import type { TenantActionGroupPatchBody } from "../../tenantActionGroups/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function emailReceiverArraySerializer(result: Array<EmailReceiver>): any[] {
  return result.map((item) => {
    return emailReceiverSerializer(item);
  });
}

export function emailReceiverArrayDeserializer(result: Array<EmailReceiver>): any[] {
  return result.map((item) => {
    return emailReceiverDeserializer(item);
  });
}

/** An email receiver. */
export interface EmailReceiver {
  /** The name of the email receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address of this receiver. */
  emailAddress: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The receiver status of the e-mail. */
  readonly status?: ReceiverStatus;
}

export function emailReceiverSerializer(item: EmailReceiver): any {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function emailReceiverDeserializer(item: any): EmailReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    status: item["status"],
  };
}

/** Indicates the status of the receiver. Receivers that are not Enabled will not receive any communications. */
export type ReceiverStatus = "NotSpecified" | "Enabled" | "Disabled";

export function smsReceiverArraySerializer(result: Array<SmsReceiver>): any[] {
  return result.map((item) => {
    return smsReceiverSerializer(item);
  });
}

export function smsReceiverArrayDeserializer(result: Array<SmsReceiver>): any[] {
  return result.map((item) => {
    return smsReceiverDeserializer(item);
  });
}

/** An SMS receiver. */
export interface SmsReceiver {
  /** The name of the SMS receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the SMS receiver. */
  countryCode: string;
  /** The phone number of the SMS receiver. */
  phoneNumber: string;
  /** The status of the receiver. */
  readonly status?: ReceiverStatus;
}

export function smsReceiverSerializer(item: SmsReceiver): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function smsReceiverDeserializer(item: any): SmsReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
    status: item["status"],
  };
}

export function azureAppPushReceiverArraySerializer(result: Array<AzureAppPushReceiver>): any[] {
  return result.map((item) => {
    return azureAppPushReceiverSerializer(item);
  });
}

export function azureAppPushReceiverArrayDeserializer(result: Array<AzureAppPushReceiver>): any[] {
  return result.map((item) => {
    return azureAppPushReceiverDeserializer(item);
  });
}

/** The Azure mobile App push notification receiver. */
export interface AzureAppPushReceiver {
  /** The name of the Azure mobile app push receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address registered for the Azure mobile app. */
  emailAddress: string;
}

export function azureAppPushReceiverSerializer(item: AzureAppPushReceiver): any {
  return { name: item["name"], emailAddress: item["emailAddress"] };
}

export function azureAppPushReceiverDeserializer(item: any): AzureAppPushReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
  };
}

export function voiceReceiverArraySerializer(result: Array<VoiceReceiver>): any[] {
  return result.map((item) => {
    return voiceReceiverSerializer(item);
  });
}

export function voiceReceiverArrayDeserializer(result: Array<VoiceReceiver>): any[] {
  return result.map((item) => {
    return voiceReceiverDeserializer(item);
  });
}

/** A voice receiver. */
export interface VoiceReceiver {
  /** The name of the voice receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the voice receiver. */
  countryCode: string;
  /** The phone number of the voice receiver. */
  phoneNumber: string;
}

export function voiceReceiverSerializer(item: VoiceReceiver): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function voiceReceiverDeserializer(item: any): VoiceReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
  };
}

/** The context info */
export interface Context {
  /** The source of the notification request */
  notificationSource?: string;
  /** The context id type */
  contextType?: string;
}

export function contextDeserializer(item: any): Context {
  return {
    notificationSource: item["notificationSource"],
    contextType: item["contextType"],
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

/** The localizable string class. */
export interface LocalizableString {
  /** the invariant value. */
  value: string;
  /** the locale specific value. */
  localizedValue?: string;
}

export function localizableStringDeserializer(item: any): LocalizableString {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

export function localizableStringArrayDeserializer(result: Array<LocalizableString>): any[] {
  return result.map((item) => {
    return localizableStringDeserializer(item);
  });
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface ErrorContract {
  /** The error object. */
  error?: CommonErrorResponse;
}

export function errorContractDeserializer(item: any): ErrorContract {
  return {
    error: !item["error"] ? item["error"] : commonErrorResponseDeserializer(item["error"]),
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface CommonErrorResponse {
  /** Error code */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: CommonErrorResponse[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function commonErrorResponseDeserializer(item: any): CommonErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : commonErrorResponseArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function commonErrorResponseArrayDeserializer(result: Array<CommonErrorResponse>): any[] {
  return result.map((item) => {
    return commonErrorResponseDeserializer(item);
  });
}

/** Specifies the retention policy for the log. */
export interface RetentionPolicy {
  /** a value indicating whether the retention policy is enabled. */
  enabled: boolean;
  /** the number of days for the retention in days. A value of 0 will retain the events indefinitely. */
  days: number;
}

export function retentionPolicySerializer(item: RetentionPolicy): any {
  return { enabled: item["enabled"], days: item["days"] };
}

export function retentionPolicyDeserializer(item: any): RetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
  };
}

/** Specifies the type of threshold criteria. Previously undocumented values might be returned */
export enum KnownCriterionType {
  /** StaticThresholdCriterion */
  StaticThresholdCriterion = "StaticThresholdCriterion",
  /** DynamicThresholdCriterion */
  DynamicThresholdCriterion = "DynamicThresholdCriterion",
}

/**
 * Specifies the type of threshold criteria. Previously undocumented values might be returned \
 * {@link KnownCriterionType} can be used interchangeably with CriterionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StaticThresholdCriterion**: StaticThresholdCriterion \
 * **DynamicThresholdCriterion**: DynamicThresholdCriterion
 */
export type CriterionType = string;

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** Type of managed service identity. */
  type: IdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity. */
export type IdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function userIdentityPropertiesRecordSerializer(
  item: Record<string, UserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function userIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** Properties of the user assigned identity. */
export interface UserIdentityProperties {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The client ID of resource identity. */
  readonly clientId?: string;
}

export function userIdentityPropertiesSerializer(_item: UserIdentityProperties): any {
  return {};
}

export function userIdentityPropertiesDeserializer(item: any): UserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** model interface ErrorResponseError */
export interface ErrorResponseError {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. If Accept-Language is set in the request, it must be localized to that language. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of additional nested error response info objects, as described by this contract. */
  details?: ErrorDetail[];
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: ErrorResponseErrorAdditionalInfoItem[];
}

export function errorResponseErrorDeserializer(item: any): ErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorResponseErrorAdditionalInfoItemArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

/** Describes details of an error response. */
export interface ErrorDetail {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: ErrorDetailAdditionalInfoItem[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorDetailAdditionalInfoItemArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailAdditionalInfoItemArrayDeserializer(
  result: Array<ErrorDetailAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return errorDetailAdditionalInfoItemDeserializer(item);
  });
}

/** model interface ErrorDetailAdditionalInfoItem */
export interface ErrorDetailAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function errorDetailAdditionalInfoItemDeserializer(
  item: any,
): ErrorDetailAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function errorResponseErrorAdditionalInfoItemArrayDeserializer(
  result: Array<ErrorResponseErrorAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return errorResponseErrorAdditionalInfoItemDeserializer(item);
  });
}

/** model interface ErrorResponseErrorAdditionalInfoItem */
export interface ErrorResponseErrorAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function errorResponseErrorAdditionalInfoItemDeserializer(
  item: any,
): ErrorResponseErrorAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Action group settings for patch operations. */
export interface ActionGroupPatch {
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function actionGroupPatchSerializer(item: ActionGroupPatch): any {
  return { enabled: item["enabled"] };
}

/** Type of ResultType */
export type ResultType = "Data" | "Metadata";

export function _actionGroupPatchBodyPropertiesSerializer(item: ActionGroupPatchBody): any {
  return { enabled: item["enabled"] };
}

export function _tenantActionGroupPatchBodyPropertiesSerializer(
  item: TenantActionGroupPatchBody,
): any {
  return { enabled: item["enabled"] };
}
