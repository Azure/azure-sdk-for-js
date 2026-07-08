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
export interface VmInsightsOnboardingVMInsightsOnboardingStatus extends ExtensionResource {
  /** Azure Resource Manager identifier of the resource whose onboarding status is being represented. */
  resourceId?: string;
  /** The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. */
  onboardingStatus?: VmInsightsOnboardingOnboardingStatus;
  /** The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. */
  dataStatus?: VmInsightsOnboardingDataStatus;
  /** Containers that currently store VM Insights data for the specified resource. */
  data?: VmInsightsOnboardingDataContainer[];
}

export function vmInsightsOnboardingVMInsightsOnboardingStatusDeserializer(
  item: any,
): VmInsightsOnboardingVMInsightsOnboardingStatus {
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
export interface VmInsightsOnboardingVMInsightsOnboardingStatusProperties {
  /** Azure Resource Manager identifier of the resource whose onboarding status is being represented. */
  resourceId: string;
  /** The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. */
  onboardingStatus: VmInsightsOnboardingOnboardingStatus;
  /** The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. */
  dataStatus: VmInsightsOnboardingDataStatus;
  /** Containers that currently store VM Insights data for the specified resource. */
  data?: VmInsightsOnboardingDataContainer[];
}

export function vmInsightsOnboardingVMInsightsOnboardingStatusPropertiesDeserializer(
  item: any,
): VmInsightsOnboardingVMInsightsOnboardingStatusProperties {
  return {
    resourceId: item["resourceId"],
    onboardingStatus: item["onboardingStatus"],
    dataStatus: item["dataStatus"],
    data: !item["data"]
      ? item["data"]
      : vmInsightsOnboardingDataContainerArrayDeserializer(item["data"]),
  };
}

/** The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. */
export enum KnownVmInsightsOnboardingOnboardingStatus {
  /** onboarded */
  Onboarded = "onboarded",
  /** notOnboarded */
  NotOnboarded = "notOnboarded",
  /** unknown */
  Unknown = "unknown",
}

/**
 * The onboarding status for the resource. Note that, a higher level scope, e.g., resource group or subscription, is considered onboarded if at least one resource under it is onboarded. \
 * {@link KnownVmInsightsOnboardingOnboardingStatus} can be used interchangeably with VmInsightsOnboardingOnboardingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **onboarded**: onboarded \
 * **notOnboarded**: notOnboarded \
 * **unknown**: unknown
 */
export type VmInsightsOnboardingOnboardingStatus = string;

/** The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. */
export enum KnownVmInsightsOnboardingDataStatus {
  /** present */
  Present = "present",
  /** notPresent */
  NotPresent = "notPresent",
}

/**
 * The status of VM Insights data from the resource. When reported as `present` the data array will contain information about the data containers to which data for the specified resource is being routed. \
 * {@link KnownVmInsightsOnboardingDataStatus} can be used interchangeably with VmInsightsOnboardingDataStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **present**: present \
 * **notPresent**: notPresent
 */
export type VmInsightsOnboardingDataStatus = string;

export function vmInsightsOnboardingDataContainerArrayDeserializer(
  result: Array<VmInsightsOnboardingDataContainer>,
): any[] {
  return result.map((item) => {
    return vmInsightsOnboardingDataContainerDeserializer(item);
  });
}

/** Information about a container with data for a given resource. */
export interface VmInsightsOnboardingDataContainer {
  /** Log Analytics workspace information. */
  workspace: VmInsightsOnboardingWorkspaceInfo;
}

export function vmInsightsOnboardingDataContainerDeserializer(
  item: any,
): VmInsightsOnboardingDataContainer {
  return {
    workspace: vmInsightsOnboardingWorkspaceInfoDeserializer(item["workspace"]),
  };
}

/** Information about a Log Analytics Workspace. */
export interface VmInsightsOnboardingWorkspaceInfo {
  /** Azure Resource Manager identifier of the Log Analytics Workspace. */
  id: string;
  /** Location of the Log Analytics workspace. */
  location: string;
  /** Log Analytics workspace identifier. */
  customerId: string;
}

export function vmInsightsOnboardingWorkspaceInfoDeserializer(
  item: any,
): VmInsightsOnboardingWorkspaceInfo {
  return {
    id: item["id"],
    location: item["location"],
    ..._workspaceInfoPropertiesDeserializer(item["properties"]),
  };
}

/** Resource properties. */
export interface VmInsightsOnboardingWorkspaceInfoProperties {
  /** Log Analytics workspace identifier. */
  customerId: string;
}

export function vmInsightsOnboardingWorkspaceInfoPropertiesDeserializer(
  item: any,
): VmInsightsOnboardingWorkspaceInfoProperties {
  return {
    customerId: item["customerId"],
  };
}

/** An error response from the API. */
export interface VmInsightsOnboardingResponseWithError {
  /** Error information. */
  error: VmInsightsOnboardingError;
}

export function vmInsightsOnboardingResponseWithErrorDeserializer(
  item: any,
): VmInsightsOnboardingResponseWithError {
  return {
    error: vmInsightsOnboardingErrorDeserializer(item["error"]),
  };
}

/** Error details. */
export interface VmInsightsOnboardingError {
  /** Error code identifying the specific error. */
  code: string;
  /** Error message in the caller's locale. */
  message?: string;
}

export function vmInsightsOnboardingErrorDeserializer(item: any): VmInsightsOnboardingError {
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
    data: !item["data"]
      ? item["data"]
      : vmInsightsOnboardingDataContainerArrayDeserializer(item["data"]),
  };
}
