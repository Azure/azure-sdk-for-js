// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AssessmentAPIAzureResourceDetails } from "../assessmentAPI/models.js";
import {
  assessmentAPIAzureResourceDetailsSerializer,
  assessmentAPIAzureResourceDetailsDeserializer,
} from "../assessmentAPI/models.js";
import type { ErrorAdditionalInfo } from "../models.js";
import { errorAdditionalInfoArrayDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface CommonCloudError {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: CommonCloudErrorBody[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function commonCloudErrorDeserializer(item: any): CommonCloudError {
  return {
    ...(!item["error"] ? item["error"] : _cloudErrorErrorDeserializer(item["error"])),
  };
}

/** The error detail. */
export interface CommonCloudErrorBody {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: CommonCloudErrorBody[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function commonCloudErrorBodyDeserializer(item: any): CommonCloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : commonCloudErrorBodyArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function commonCloudErrorBodyArrayDeserializer(result: Array<CommonCloudErrorBody>): any[] {
  return result.map((item) => {
    return commonCloudErrorBodyDeserializer(item);
  });
}

/** The severity level of the assessment */
export enum KnownCommonSeverity {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
  /** Critical */
  Critical = "Critical",
}

/**
 * The severity level of the assessment \
 * {@link KnownCommonSeverity} can be used interchangeably with CommonSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High \
 * **Critical**: Critical
 */
export type CommonSeverity = string;

/** Enum. Indicates the action type. */
export enum KnownCommonActionType {
  /** LogicApp */
  LogicApp = "LogicApp",
  /** EventHub */
  EventHub = "EventHub",
  /** Workspace */
  Workspace = "Workspace",
  /** Internal */
  Internal = "Internal",
}

/**
 * Enum. Indicates the action type. \
 * {@link KnownCommonActionType} can be used interchangeably with CommonActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogicApp**: LogicApp \
 * **EventHub**: EventHub \
 * **Workspace**: Workspace \
 * **Internal**: Internal
 */
export type CommonActionType = string;

/** A list of key value pairs that describe the resource. */
export interface CommonTags {
  /** A list of key value pairs that describe the resource. */
  tags?: Record<string, string>;
}

export function commonTagsSerializer(item: CommonTags): any {
  return { tags: item["tags"] };
}

/** Aggregative state based on the standard's supported controls states */
export enum KnownCommonState {
  /** All supported regulatory compliance controls in the given standard have a passed state */
  Passed = "Passed",
  /** At least one supported regulatory compliance control in the given standard has a state of failed */
  Failed = "Failed",
  /** All supported regulatory compliance controls in the given standard have a state of skipped */
  Skipped = "Skipped",
  /** No supported regulatory compliance data for the given standard */
  Unsupported = "Unsupported",
  /** Send notification on new alerts to the subscription's admins */
  On = "On",
  /** Don't send notification on new alerts to the subscription's admins */
  Off = "Off",
}

/**
 * Aggregative state based on the standard's supported controls states \
 * {@link KnownCommonState} can be used interchangeably with CommonState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Passed**: All supported regulatory compliance controls in the given standard have a passed state \
 * **Failed**: At least one supported regulatory compliance control in the given standard has a state of failed \
 * **Skipped**: All supported regulatory compliance controls in the given standard have a state of skipped \
 * **Unsupported**: No supported regulatory compliance data for the given standard \
 * **On**: Send notification on new alerts to the subscription's admins \
 * **Off**: Don't send notification on new alerts to the subscription's admins
 */
export type CommonState = string;

/** The platform where the assessed resource resides */
export enum KnownCommonSource {
  /** Resource is in Azure */
  Azure = "Azure",
  /** Resource in an on premise machine connected to Azure cloud */
  OnPremise = "OnPremise",
  /** SQL Resource in an on premise machine connected to Azure cloud */
  OnPremiseSql = "OnPremiseSql",
  /** Aws */
  Aws = "Aws",
  /** Gcp */
  Gcp = "Gcp",
}

/**
 * The platform where the assessed resource resides \
 * {@link KnownCommonSource} can be used interchangeably with CommonSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Resource is in Azure \
 * **OnPremise**: Resource in an on premise machine connected to Azure cloud \
 * **OnPremiseSql**: SQL Resource in an on premise machine connected to Azure cloud \
 * **Aws**: Aws \
 * **Gcp**: Gcp
 */
export type CommonSource = string;

/** A status describing the success/failure of the enablement/disablement operation. */
export interface CommonOperationStatus {
  /** The operation status code. */
  code?: string;
  /** Additional information regarding the success/failure of the operation. */
  message?: string;
}

export function commonOperationStatusDeserializer(item: any): CommonOperationStatus {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The current provisioning state of the resource. Indicates the status of the last operation performed on the resource. */
export enum KnownCommonProvisioningState {
  /** The resource has been successfully provisioned and is ready for use. */
  Succeeded = "Succeeded",
  /** The resource is being created. This is a transitional state. */
  Creating = "Creating",
  /** The resource is being updated. This is a transitional state. */
  Updating = "Updating",
  /** The resource is being deleted. This is a transitional state. */
  Deleting = "Deleting",
  /** The last operation on the resource failed. Check the error details for more information. */
  Failed = "Failed",
  /** The operation was canceled before completion. */
  Canceled = "Canceled",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * The current provisioning state of the resource. Indicates the status of the last operation performed on the resource. \
 * {@link KnownCommonProvisioningState} can be used interchangeably with CommonProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The resource has been successfully provisioned and is ready for use. \
 * **Creating**: The resource is being created. This is a transitional state. \
 * **Updating**: The resource is being updated. This is a transitional state. \
 * **Deleting**: The resource is being deleted. This is a transitional state. \
 * **Failed**: The last operation on the resource failed. Check the error details for more information. \
 * **Canceled**: The operation was canceled before completion. \
 * **InProgress**: InProgress
 */
export type CommonProvisioningState = string;

/** Describe the properties of a of a standard assignments object reference */
export interface CommonAssignedStandardItem {
  /** Full resourceId of the Microsoft.Security/standard object */
  id?: string;
}

export function commonAssignedStandardItemSerializer(item: CommonAssignedStandardItem): any {
  return { id: item["id"] };
}

export function commonAssignedStandardItemDeserializer(item: any): CommonAssignedStandardItem {
  return {
    id: item["id"],
  };
}

/** Known values of {@link SettingName} that the service accepts. */
export enum KnownCommonSettingName {
  /** MCAS */
  Mcas = "MCAS",
  /** WDATP */
  Wdatp = "WDATP",
  /** WDATP_EXCLUDE_LINUX_PUBLIC_PREVIEW */
  WdatpExcludeLinuxPublicPreview = "WDATP_EXCLUDE_LINUX_PUBLIC_PREVIEW",
  /** WDATP_UNIFIED_SOLUTION */
  WdatpUnifiedSolution = "WDATP_UNIFIED_SOLUTION",
  /** Sentinel */
  Sentinel = "Sentinel",
  /** Name of the Defender for Storage Settings name. */
  Current = "current",
}

/** Type of CommonSettingName */
export type CommonSettingName = string;

/** Details of the resource that was assessed */
export interface CommonResourceDetails {
  /** The platform where the assessed resource resides */
  /** The discriminator possible values: Azure */
  source: CommonSource;
}

export function commonResourceDetailsSerializer(item: CommonResourceDetails): any {
  return { source: item["source"] };
}

export function commonResourceDetailsDeserializer(item: any): CommonResourceDetails {
  return {
    source: item["source"],
  };
}

/** Alias for CommonResourceDetailsUnion */
export type CommonResourceDetailsUnion = AssessmentAPIAzureResourceDetails | CommonResourceDetails;

export function commonResourceDetailsUnionSerializer(item: CommonResourceDetailsUnion): any {
  switch (item.source) {
    case "Azure":
      return assessmentAPIAzureResourceDetailsSerializer(item as AssessmentAPIAzureResourceDetails);

    default:
      return commonResourceDetailsSerializer(item);
  }
}

export function commonResourceDetailsUnionDeserializer(item: any): CommonResourceDetailsUnion {
  switch (item["source"]) {
    case "Azure":
      return assessmentAPIAzureResourceDetailsDeserializer(
        item as AssessmentAPIAzureResourceDetails,
      );

    default:
      return commonResourceDetailsDeserializer(item);
  }
}

export function _cloudErrorErrorDeserializer(item: any) {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : commonCloudErrorBodyArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}
