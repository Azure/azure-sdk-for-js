// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** List of HANA operations */
export interface _OperationList {
  /** List of HANA operations */
  value?: Operation[];
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
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

/** HANA operation information */
export interface Operation {
  /** The name of the operation being performed on this particular object. This name should match the action name that appears in RBAC / the event service. */
  readonly name?: string;
  /** Displayed HANA operation information */
  display?: Display;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : displayDeserializer(item["display"]),
  };
}

/** Detailed HANA operation information */
export interface Display {
  /** The localized friendly form of the resource provider name. This form is also expected to include the publisher/company responsible. Use Title Casing. Begin with "Microsoft" for 1st party services. */
  readonly provider?: string;
  /** The localized friendly form of the resource type related to this action/operation. This form should match the public documentation for the resource provider. Use Title Casing. For examples, refer to the “name” section. */
  readonly resource?: string;
  /** The localized friendly name for the operation as shown to the user. This name should be concise (to fit in drop downs), but clear (self-documenting). Use Title Casing and include the entity/resource to which it applies. */
  readonly operation?: string;
  /** The localized friendly description for the operation as shown to the user. This description should be thorough, yet concise. It will be used in tool-tips and detailed views. */
  readonly description?: string;
  /** The intended executor of the operation; governs the display of the operation in the RBAC UX and the audit logs UX. Default value is 'user,system' */
  readonly origin?: string;
}

export function displayDeserializer(item: any): Display {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
    origin: item["origin"],
  };
}

/** Describes the format of Error response. */
export interface ErrorResponse {
  /** Describes the error object. */
  error?: ErrorResponseError;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseErrorDeserializer(item["error"]),
  };
}

/** Describes the error object. */
export interface ErrorResponseError {
  /** Error code */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function errorResponseErrorDeserializer(item: any): ErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** SAP monitor info on Azure (ARM properties and SAP monitor properties) */
export interface SapMonitor extends TrackedResource {
  /** State of provisioning of the HanaInstance */
  readonly provisioningState?: HanaProvisioningStatesEnum;
  /** The name of the resource group the SAP Monitor resources get deployed into. */
  readonly managedResourceGroupName?: string;
  /** The ARM ID of the Log Analytics Workspace that is used for monitoring */
  logAnalyticsWorkspaceArmId?: string;
  /** The value indicating whether to send analytics to Microsoft */
  enableCustomerAnalytics?: boolean;
  /** The workspace ID of the log analytics workspace to be used for monitoring */
  logAnalyticsWorkspaceId?: string;
  /** The shared key of the log analytics workspace that is used for monitoring */
  logAnalyticsWorkspaceSharedKey?: string;
  /** The version of the payload running in the Collector VM */
  readonly sapMonitorCollectorVersion?: string;
  /** The subnet which the SAP monitor will be deployed in */
  monitorSubnet?: string;
}

export function sapMonitorSerializer(item: SapMonitor): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "logAnalyticsWorkspaceArmId",
      "enableCustomerAnalytics",
      "logAnalyticsWorkspaceId",
      "logAnalyticsWorkspaceSharedKey",
      "monitorSubnet",
    ])
      ? undefined
      : _sapMonitorPropertiesSerializer(item),
  };
}

export function sapMonitorDeserializer(item: any): SapMonitor {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sapMonitorPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a SAP monitor. */
export interface SapMonitorProperties {
  /** State of provisioning of the HanaInstance */
  readonly provisioningState?: HanaProvisioningStatesEnum;
  /** The name of the resource group the SAP Monitor resources get deployed into. */
  readonly managedResourceGroupName?: string;
  /** The ARM ID of the Log Analytics Workspace that is used for monitoring */
  logAnalyticsWorkspaceArmId?: string;
  /** The value indicating whether to send analytics to Microsoft */
  enableCustomerAnalytics?: boolean;
  /** The workspace ID of the log analytics workspace to be used for monitoring */
  logAnalyticsWorkspaceId?: string;
  /** The shared key of the log analytics workspace that is used for monitoring */
  logAnalyticsWorkspaceSharedKey?: string;
  /** The version of the payload running in the Collector VM */
  readonly sapMonitorCollectorVersion?: string;
  /** The subnet which the SAP monitor will be deployed in */
  monitorSubnet?: string;
}

export function sapMonitorPropertiesSerializer(item: SapMonitorProperties): any {
  return {
    logAnalyticsWorkspaceArmId: item["logAnalyticsWorkspaceArmId"],
    enableCustomerAnalytics: item["enableCustomerAnalytics"],
    logAnalyticsWorkspaceId: item["logAnalyticsWorkspaceId"],
    logAnalyticsWorkspaceSharedKey: item["logAnalyticsWorkspaceSharedKey"],
    monitorSubnet: item["monitorSubnet"],
  };
}

export function sapMonitorPropertiesDeserializer(item: any): SapMonitorProperties {
  return {
    provisioningState: item["provisioningState"],
    managedResourceGroupName: item["managedResourceGroupName"],
    logAnalyticsWorkspaceArmId: item["logAnalyticsWorkspaceArmId"],
    enableCustomerAnalytics: item["enableCustomerAnalytics"],
    logAnalyticsWorkspaceId: item["logAnalyticsWorkspaceId"],
    logAnalyticsWorkspaceSharedKey: item["logAnalyticsWorkspaceSharedKey"],
    sapMonitorCollectorVersion: item["sapMonitorCollectorVersion"],
    monitorSubnet: item["monitorSubnet"],
  };
}

/** State of provisioning of the HanaInstance */
export enum KnownHanaProvisioningStatesEnum {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Deleting */
  Deleting = "Deleting",
  /** Migrating */
  Migrating = "Migrating",
}

/**
 * State of provisioning of the HanaInstance \
 * {@link KnownHanaProvisioningStatesEnum} can be used interchangeably with HanaProvisioningStatesEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Deleting**: Deleting \
 * **Migrating**: Migrating
 */
export type HanaProvisioningStatesEnum = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
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

/** Tags field of the resource. */
export interface Tags {
  /** Tags field of the resource. */
  tags?: Record<string, string>;
}

export function tagsSerializer(item: Tags): any {
  return { tags: item["tags"] };
}

/** The response of a SapMonitor list operation. */
export interface _SapMonitorListResult {
  /** The SapMonitor items on this page */
  value: SapMonitor[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sapMonitorListResultDeserializer(item: any): _SapMonitorListResult {
  return {
    value: sapMonitorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sapMonitorArraySerializer(result: Array<SapMonitor>): any[] {
  return result.map((item) => {
    return sapMonitorSerializer(item);
  });
}

export function sapMonitorArrayDeserializer(result: Array<SapMonitor>): any[] {
  return result.map((item) => {
    return sapMonitorDeserializer(item);
  });
}

/** A provider instance associated with a SAP monitor. */
export interface ProviderInstance extends ProxyResource {
  /** The type of provider instance. */
  typePropertiesType?: string;
  /** A JSON string containing the properties of the provider instance. */
  properties?: string;
  /** A JSON string containing metadata of the provider instance. */
  metadata?: string;
  /** State of provisioning of the provider instance */
  readonly provisioningState?: HanaProvisioningStatesEnum;
}

export function providerInstanceSerializer(item: ProviderInstance): any {
  return {
    properties: areAllPropsUndefined(item, ["type", "properties", "metadata"])
      ? undefined
      : _providerInstancePropertiesSerializer(item),
  };
}

export function providerInstanceDeserializer(item: any): ProviderInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _providerInstancePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a provider instance. */
export interface ProviderInstanceProperties {
  /** The type of provider instance. */
  type?: string;
  /** A JSON string containing the properties of the provider instance. */
  properties?: string;
  /** A JSON string containing metadata of the provider instance. */
  metadata?: string;
  /** State of provisioning of the provider instance */
  readonly provisioningState?: HanaProvisioningStatesEnum;
}

export function providerInstancePropertiesSerializer(item: ProviderInstanceProperties): any {
  return { type: item["type"], properties: item["properties"], metadata: item["metadata"] };
}

export function providerInstancePropertiesDeserializer(item: any): ProviderInstanceProperties {
  return {
    type: item["type"],
    properties: item["properties"],
    metadata: item["metadata"],
    provisioningState: item["provisioningState"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

/** The response of a ProviderInstance list operation. */
export interface _ProviderInstanceListResult {
  /** The ProviderInstance items on this page */
  value: ProviderInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _providerInstanceListResultDeserializer(item: any): _ProviderInstanceListResult {
  return {
    value: providerInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function providerInstanceArraySerializer(result: Array<ProviderInstance>): any[] {
  return result.map((item) => {
    return providerInstanceSerializer(item);
  });
}

export function providerInstanceArrayDeserializer(result: Array<ProviderInstance>): any[] {
  return result.map((item) => {
    return providerInstanceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2020-02-07-preview API version. */
  V20200207Preview = "2020-02-07-preview",
}

export function _sapMonitorPropertiesSerializer(item: SapMonitor): any {
  return {
    logAnalyticsWorkspaceArmId: item["logAnalyticsWorkspaceArmId"],
    enableCustomerAnalytics: item["enableCustomerAnalytics"],
    logAnalyticsWorkspaceId: item["logAnalyticsWorkspaceId"],
    logAnalyticsWorkspaceSharedKey: item["logAnalyticsWorkspaceSharedKey"],
    monitorSubnet: item["monitorSubnet"],
  };
}

export function _sapMonitorPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    managedResourceGroupName: item["managedResourceGroupName"],
    logAnalyticsWorkspaceArmId: item["logAnalyticsWorkspaceArmId"],
    enableCustomerAnalytics: item["enableCustomerAnalytics"],
    logAnalyticsWorkspaceId: item["logAnalyticsWorkspaceId"],
    logAnalyticsWorkspaceSharedKey: item["logAnalyticsWorkspaceSharedKey"],
    sapMonitorCollectorVersion: item["sapMonitorCollectorVersion"],
    monitorSubnet: item["monitorSubnet"],
  };
}

export function _providerInstancePropertiesSerializer(item: ProviderInstance): any {
  return {
    type: item["typePropertiesType"],
    properties: item["properties"],
    metadata: item["metadata"],
  };
}

export function _providerInstancePropertiesDeserializer(item: any) {
  return {
    typePropertiesType: item["type"],
    properties: item["properties"],
    metadata: item["metadata"],
    provisioningState: item["provisioningState"],
  };
}
