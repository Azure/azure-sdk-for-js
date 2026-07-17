// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** VM Insights onboarding status for a resource. */
export interface VMInsightsOnboardingStatus extends ExtensionResource {
  /** Azure Resource Manager identifier of the resource whose onboarding status is being represented. */
  resourceId?: string;
  /** The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. */
  onboardingStatus?: OnboardingStatus;
  /** The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. */
  dataStatus?: DataStatus;
  /** Containers that currently store VM Insights data for the specified resource. */
  data?: DataContainer[];
}

export function vmInsightsOnboardingStatusDeserializer(item: any): VMInsightsOnboardingStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _vmInsightsOnboardingStatusPropertiesDeserializer(item["properties"])),
  };
}

/** Resource properties. */
export interface VMInsightsOnboardingStatusProperties {
  /** Azure Resource Manager identifier of the resource whose onboarding status is being represented. */
  resourceId: string;
  /** The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. */
  onboardingStatus: OnboardingStatus;
  /** The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. */
  dataStatus: DataStatus;
  /** Containers that currently store VM Insights data for the specified resource. */
  data?: DataContainer[];
}

export function vmInsightsOnboardingStatusPropertiesDeserializer(
  item: any,
): VMInsightsOnboardingStatusProperties {
  return {
    resourceId: item["resourceId"],
    onboardingStatus: item["onboardingStatus"],
    dataStatus: item["dataStatus"],
    data: !item["data"] ? item["data"] : dataContainerArrayDeserializer(item["data"]),
  };
}

/** The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. */
export enum KnownOnboardingStatus {
  /** onboarded */
  Onboarded = "onboarded",
  /** notOnboarded */
  NotOnboarded = "notOnboarded",
  /** unknown */
  Unknown = "unknown",
}

/**
 * The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. \
 * {@link KnownOnboardingStatus} can be used interchangeably with OnboardingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **onboarded**: onboarded \
 * **notOnboarded**: notOnboarded \
 * **unknown**: unknown
 */
export type OnboardingStatus = string;

/** The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. */
export enum KnownDataStatus {
  /** present */
  Present = "present",
  /** notPresent */
  NotPresent = "notPresent",
}

/**
 * The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. \
 * {@link KnownDataStatus} can be used interchangeably with DataStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **present**: present \
 * **notPresent**: notPresent
 */
export type DataStatus = string;

export function dataContainerArrayDeserializer(result: Array<DataContainer>): any[] {
  return result.map((item) => {
    return dataContainerDeserializer(item);
  });
}

/** Information about a container with data for a given resource. */
export interface DataContainer {
  /** Log Analytics workspace information. */
  workspace: WorkspaceInfo;
}

export function dataContainerDeserializer(item: any): DataContainer {
  return {
    workspace: workspaceInfoDeserializer(item["workspace"]),
  };
}

/** Information about a Log Analytics Workspace. */
export interface WorkspaceInfo {
  /** Azure Resource Manager identifier of the Log Analytics Workspace. */
  id: string;
  /** Location of the Log Analytics workspace. */
  location: string;
  /** Log Analytics workspace identifier. */
  customerId: string;
}

export function workspaceInfoDeserializer(item: any): WorkspaceInfo {
  return {
    id: item["id"],
    location: item["location"],
    ..._workspaceInfoPropertiesDeserializer(item["properties"]),
  };
}

/** Resource properties. */
export interface WorkspaceInfoProperties {
  /** Log Analytics workspace identifier. */
  customerId: string;
}

export function workspaceInfoPropertiesDeserializer(item: any): WorkspaceInfoProperties {
  return {
    customerId: item["customerId"],
  };
}

/** An error response from the API. */
export interface ResponseWithError {
  /** Error information. */
  error: ErrorModel;
}

export function responseWithErrorDeserializer(item: any): ResponseWithError {
  return {
    error: errorDeserializer(item["error"]),
  };
}

/** Error details. */
export interface ErrorModel {
  /** Error code identifying the specific error. */
  code: string;
  /** Error message in the caller's locale. */
  message?: string;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function _workspaceInfoPropertiesDeserializer(item: any) {
  return {
    customerId: item["customerId"],
  };
}

export function _vmInsightsOnboardingStatusPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    onboardingStatus: item["onboardingStatus"],
    dataStatus: item["dataStatus"],
    data: !item["data"] ? item["data"] : dataContainerArrayDeserializer(item["data"]),
  };
}
