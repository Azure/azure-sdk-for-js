// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An error response from the Compute service. */
export interface CloudError {
  /** Api error. */
  error?: ApiError;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** Api error. */
export interface ApiError {
  /** The Api error details */
  details?: ApiErrorBase[];
  /** The Api inner error */
  innererror?: InnerError;
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
}

export function apiErrorDeserializer(item: any): ApiError {
  return {
    details: !item["details"] ? item["details"] : apiErrorBaseArrayDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : innerErrorDeserializer(item["innererror"]),
    code: item["code"],
    target: item["target"],
    message: item["message"],
  };
}

export function apiErrorBaseArrayDeserializer(result: Array<ApiErrorBase>): any[] {
  return result.map((item) => {
    return apiErrorBaseDeserializer(item);
  });
}

/** Api error base. */
export interface ApiErrorBase {
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
}

export function apiErrorBaseDeserializer(item: any): ApiErrorBase {
  return {
    code: item["code"],
    target: item["target"],
    message: item["message"],
  };
}

/** Inner error details. */
export interface InnerError {
  /** The exception type. */
  exceptiontype?: string;
  /** The internal error message or exception dump. */
  errordetail?: string;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    exceptiontype: item["exceptiontype"],
    errordetail: item["errordetail"],
  };
}

/** model interface SubResource */
export interface SubResource {
  /** Resource Id */
  id?: string;
}

export function subResourceSerializer(item: SubResource): any {
  return { id: item["id"] };
}

export function subResourceDeserializer(item: any): SubResource {
  return {
    id: item["id"],
  };
}

/** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.** */
export type OperatingSystemTypes = "Windows" | "Linux";

export function subResourceArraySerializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceSerializer(item);
  });
}

export function subResourceArrayDeserializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceDeserializer(item);
  });
}

/** The type of identity used for the virtual machine scale set. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine scale set. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function userAssignedIdentitiesValueRecordSerializer(
  item: Record<string, UserAssignedIdentitiesValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesValueSerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentitiesValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentitiesValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesValueDeserializer(item[key]);
  });
  return result;
}

/** model interface UserAssignedIdentitiesValue */
export interface UserAssignedIdentitiesValue {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitiesValueSerializer(_item: UserAssignedIdentitiesValue): any {
  return {};
}

export function userAssignedIdentitiesValueDeserializer(item: any): UserAssignedIdentitiesValue {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of extendedLocation. */
export enum KnownExtendedLocationTypes {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**
 */
export type ExtendedLocationTypes = string;

/** model interface SubResourceReadOnly */
export interface SubResourceReadOnly {
  /** Resource Id */
  readonly id?: string;
}

export function subResourceReadOnlySerializer(_item: SubResourceReadOnly): any {
  return {};
}

export function subResourceReadOnlyDeserializer(item: any): SubResourceReadOnly {
  return {
    id: item["id"],
  };
}

export function subResourceReadOnlyArraySerializer(result: Array<SubResourceReadOnly>): any[] {
  return result.map((item) => {
    return subResourceReadOnlySerializer(item);
  });
}

export function subResourceReadOnlyArrayDeserializer(result: Array<SubResourceReadOnly>): any[] {
  return result.map((item) => {
    return subResourceReadOnlyDeserializer(item);
  });
}

/** The OS State. For managed images, use Generalized. */
export type OperatingSystemStateTypes = "Generalized" | "Specialized";

/** The state of snapshot which determines the access availability of the snapshot. */
export enum KnownSnapshotAccessState {
  /** Default value. */
  Unknown = "Unknown",
  /** The snapshot cannot be used for restore, copy or download to offline. */
  Pending = "Pending",
  /** The snapshot can be used for restore, copy to different region, and download to offline. */
  Available = "Available",
  /** The snapshot can be used for restoring disks with fast performance but cannot be copied or downloaded. */
  InstantAccess = "InstantAccess",
  /** The snapshot can be used for restoring disks with fast performance, copied and downloaded. */
  AvailableWithInstantAccess = "AvailableWithInstantAccess",
}

/**
 * The state of snapshot which determines the access availability of the snapshot. \
 * {@link KnownSnapshotAccessState} can be used interchangeably with SnapshotAccessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Default value. \
 * **Pending**: The snapshot cannot be used for restore, copy or download to offline. \
 * **Available**: The snapshot can be used for restore, copy to different region, and download to offline. \
 * **InstantAccess**: The snapshot can be used for restoring disks with fast performance but cannot be copied or downloaded. \
 * **AvailableWithInstantAccess**: The snapshot can be used for restoring disks with fast performance, copied and downloaded.
 */
export type SnapshotAccessState = string;

/** The hypervisor generation of the Virtual Machine. */
export enum KnownHyperVGeneration {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * The hypervisor generation of the Virtual Machine. \
 * {@link KnownHyperVGeneration} can be used interchangeably with HyperVGeneration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGeneration = string;

/** CPU architecture supported by an OS disk. */
export enum KnownArchitecture {
  /** x64 */
  X64 = "x64",
  /** Arm64 */
  Arm64 = "Arm64",
}

/**
 * CPU architecture supported by an OS disk. \
 * {@link KnownArchitecture} can be used interchangeably with Architecture,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **x64** \
 * **Arm64**
 */
export type Architecture = string;
