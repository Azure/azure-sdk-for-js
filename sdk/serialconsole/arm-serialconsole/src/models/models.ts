// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Returns whether or not Serial Console is disabled. */
export interface SerialConsoleStatus {
  properties?: SerialConsoleStatusProperties;
}

export function serialConsoleStatusDeserializer(item: any): SerialConsoleStatus {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serialConsoleStatusPropertiesDeserializer(item["properties"]),
  };
}

/** model interface SerialConsoleStatusProperties */
export interface SerialConsoleStatusProperties {
  /** Whether or not Serial Console is disabled. */
  disabled?: boolean;
}

export function serialConsoleStatusPropertiesDeserializer(
  item: any,
): SerialConsoleStatusProperties {
  return {
    disabled: item["disabled"],
  };
}

/** Error saying that the provided subscription could not be found */
export interface GetSerialConsoleSubscriptionNotFound {
  /** Error code */
  code?: string;
  /** Subscription not found message */
  message?: string;
}

export function getSerialConsoleSubscriptionNotFoundDeserializer(
  item: any,
): GetSerialConsoleSubscriptionNotFound {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** An error response from the service. */
export interface CloudError {
  /** Cloud error body. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the Batch service. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** Serial Console operations */
export interface SerialConsoleOperations {
  /** A list of Serial Console operations */
  value?: SerialConsoleOperationsValueItem[];
}

export function serialConsoleOperationsDeserializer(item: any): SerialConsoleOperations {
  return {
    value: !item["value"]
      ? item["value"]
      : serialConsoleOperationsValueItemArrayDeserializer(item["value"]),
  };
}

export function serialConsoleOperationsValueItemArrayDeserializer(
  result: Array<SerialConsoleOperationsValueItem>,
): any[] {
  return result.map((item) => {
    return serialConsoleOperationsValueItemDeserializer(item);
  });
}

/** model interface SerialConsoleOperationsValueItem */
export interface SerialConsoleOperationsValueItem {
  name?: string;
  isDataAction?: string;
  display?: SerialConsoleOperationsValueItemDisplay;
}

export function serialConsoleOperationsValueItemDeserializer(
  item: any,
): SerialConsoleOperationsValueItem {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : serialConsoleOperationsValueItemDisplayDeserializer(item["display"]),
  };
}

/** model interface SerialConsoleOperationsValueItemDisplay */
export interface SerialConsoleOperationsValueItemDisplay {
  provider?: string;
  resource?: string;
  operation?: string;
  description?: string;
}

export function serialConsoleOperationsValueItemDisplayDeserializer(
  item: any,
): SerialConsoleOperationsValueItemDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Represents the serial port of the parent resource. */
export interface SerialPort extends ProxyResource {
  /** Specifies whether the port is enabled for a serial console connection. */
  state?: SerialPortState;
  /** Specifies whether the port is currently active. */
  connectionState?: SerialPortConnectionState;
}

export function serialPortSerializer(item: SerialPort): any {
  return {
    properties: areAllPropsUndefined(item, ["state", "connectionState"])
      ? undefined
      : _serialPortPropertiesSerializer(item),
  };
}

export function serialPortDeserializer(item: any): SerialPort {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serialPortPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of the serial port. */
export interface SerialPortProperties {
  /** Specifies whether the port is enabled for a serial console connection. */
  state?: SerialPortState;
  /** Specifies whether the port is currently active. */
  connectionState?: SerialPortConnectionState;
}

export function serialPortPropertiesSerializer(item: SerialPortProperties): any {
  return { state: item["state"], connectionState: item["connectionState"] };
}

export function serialPortPropertiesDeserializer(item: any): SerialPortProperties {
  return {
    state: item["state"],
    connectionState: item["connectionState"],
  };
}

/** Specifies whether the port is enabled for a serial console connection. */
export type SerialPortState = "enabled" | "disabled";
/** Specifies whether the port is currently active. */
export type SerialPortConnectionState = "active" | "inactive";

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
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

export function resourceSerializer(item: Resource): any {
  return item;
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

/** The list serial ports operation response. */
export interface SerialPortListResult {
  /** The list of serial ports. */
  value?: SerialPort[];
}

export function serialPortListResultDeserializer(item: any): SerialPortListResult {
  return {
    value: !item["value"] ? item["value"] : serialPortArrayDeserializer(item["value"]),
  };
}

export function serialPortArraySerializer(result: Array<SerialPort>): any[] {
  return result.map((item) => {
    return serialPortSerializer(item);
  });
}

export function serialPortArrayDeserializer(result: Array<SerialPort>): any[] {
  return result.map((item) => {
    return serialPortDeserializer(item);
  });
}

/** Returns a connection string to the serial port of the resource. */
export interface SerialPortConnectResult {
  /** Connection string to the serial port of the resource. */
  connectionString?: string;
}

export function serialPortConnectResultDeserializer(item: any): SerialPortConnectResult {
  return {
    connectionString: item["connectionString"],
  };
}

/** Returns whether or not Serial Console is disabled. */
export interface DisableSerialConsoleResult {
  properties?: DisableSerialConsoleResultProperties;
}

export function disableSerialConsoleResultDeserializer(item: any): DisableSerialConsoleResult {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : disableSerialConsoleResultPropertiesDeserializer(item["properties"]),
  };
}

/** model interface DisableSerialConsoleResultProperties */
export interface DisableSerialConsoleResultProperties {
  /** Whether or not Serial Console is disabled. */
  disabled?: boolean;
}

export function disableSerialConsoleResultPropertiesDeserializer(
  item: any,
): DisableSerialConsoleResultProperties {
  return {
    disabled: item["disabled"],
  };
}

/** Returns whether or not Serial Console is disabled (enabled). */
export interface EnableSerialConsoleResult {
  properties?: EnableSerialConsoleResultProperties;
}

export function enableSerialConsoleResultDeserializer(item: any): EnableSerialConsoleResult {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : enableSerialConsoleResultPropertiesDeserializer(item["properties"]),
  };
}

/** model interface EnableSerialConsoleResultProperties */
export interface EnableSerialConsoleResultProperties {
  /** Whether or not Serial Console is disabled. */
  disabled?: boolean;
}

export function enableSerialConsoleResultPropertiesDeserializer(
  item: any,
): EnableSerialConsoleResultProperties {
  return {
    disabled: item["disabled"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-07-01 API version. */
  V20240701 = "2024-07-01",
}

export function _serialPortPropertiesSerializer(item: SerialPort): any {
  return { state: item["state"], connectionState: item["connectionState"] };
}

export function _serialPortPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    connectionState: item["connectionState"],
  };
}
