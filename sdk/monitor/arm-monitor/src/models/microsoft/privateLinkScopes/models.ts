// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type {
  PrivateLinkResourceProperties,
  Resource,
  ArmErrorDetail,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointConnectionProvisioningState,
  TrackedResource,
  ProxyResource,
} from "../../models.js";
import {
  privateLinkResourcePropertiesDeserializer,
  systemDataDeserializer,
  armErrorDetailDeserializer,
  _privateEndpointConnectionPropertiesSerializer,
  _privateEndpointConnectionPropertiesDeserializer,
} from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A private link resource */
export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** List of private endpoint connection associated with the specified storage account */
export interface PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
}

export function privateEndpointConnectionListResultDeserializer(
  item: any,
): PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** An Azure Monitor PrivateLinkScope definition. */
export interface AzureMonitorPrivateLinkScope extends TrackedResource {
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
  readonly provisioningState?: PrivateLinkScopeProvisioningState;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Access mode settings */
  accessModeSettings: AccessModeSettings;
}

export function azureMonitorPrivateLinkScopeSerializer(item: AzureMonitorPrivateLinkScope): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _azureMonitorPrivateLinkScopePropertiesSerializer(item),
  };
}

export function azureMonitorPrivateLinkScopeDeserializer(item: any): AzureMonitorPrivateLinkScope {
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
    ..._azureMonitorPrivateLinkScopePropertiesDeserializer(item["properties"]),
  };
}

/** Properties that define a Azure Monitor PrivateLinkScope resource. */
export interface AzureMonitorPrivateLinkScopeProperties {
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
  readonly provisioningState?: PrivateLinkScopeProvisioningState;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Access mode settings */
  accessModeSettings: AccessModeSettings;
}

export function azureMonitorPrivateLinkScopePropertiesSerializer(
  item: AzureMonitorPrivateLinkScopeProperties,
): any {
  return { accessModeSettings: accessModeSettingsSerializer(item["accessModeSettings"]) };
}

export function azureMonitorPrivateLinkScopePropertiesDeserializer(
  item: any,
): AzureMonitorPrivateLinkScopeProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    accessModeSettings: accessModeSettingsDeserializer(item["accessModeSettings"]),
  };
}

/** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
export enum KnownPrivateLinkScopeProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. \
 * {@link KnownPrivateLinkScopeProvisioningState} can be used interchangeably with PrivateLinkScopeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Deleting**: Deleting \
 * **Canceled**: Canceled
 */
export type PrivateLinkScopeProvisioningState = string;

/** Properties that define the scope private link mode settings. */
export interface AccessModeSettings {
  /** Specifies the default access mode of queries through associated private endpoints in scope. If not specified default value is 'Open'. You can override this default setting for a specific private endpoint connection by adding an exclusion in the 'exclusions' array. */
  queryAccessMode: AccessMode;
  /** Specifies the default access mode of ingestion through associated private endpoints in scope. If not specified default value is 'Open'. You can override this default setting for a specific private endpoint connection by adding an exclusion in the 'exclusions' array. */
  ingestionAccessMode: AccessMode;
  /** List of exclusions that override the default access mode settings for specific private endpoint connections. */
  exclusions?: AccessModeSettingsExclusion[];
}

export function accessModeSettingsSerializer(item: AccessModeSettings): any {
  return {
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : accessModeSettingsExclusionArraySerializer(item["exclusions"]),
  };
}

export function accessModeSettingsDeserializer(item: any): AccessModeSettings {
  return {
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : accessModeSettingsExclusionArrayDeserializer(item["exclusions"]),
  };
}

/** Access mode types. */
export enum KnownAccessMode {
  /** Open */
  Open = "Open",
  /** PrivateOnly */
  PrivateOnly = "PrivateOnly",
}

/**
 * Access mode types. \
 * {@link KnownAccessMode} can be used interchangeably with AccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Open**: Open \
 * **PrivateOnly**: PrivateOnly
 */
export type AccessMode = string;

export function accessModeSettingsExclusionArraySerializer(
  result: Array<AccessModeSettingsExclusion>,
): any[] {
  return result.map((item) => {
    return accessModeSettingsExclusionSerializer(item);
  });
}

export function accessModeSettingsExclusionArrayDeserializer(
  result: Array<AccessModeSettingsExclusion>,
): any[] {
  return result.map((item) => {
    return accessModeSettingsExclusionDeserializer(item);
  });
}

/** Properties that define the scope private link mode settings exclusion item. This setting applies to a specific private endpoint connection and overrides the default settings for that private endpoint connection. */
export interface AccessModeSettingsExclusion {
  /** The private endpoint connection name associated to the private endpoint on which we want to apply the specific access mode settings. */
  privateEndpointConnectionName?: string;
  /** Specifies the access mode of queries through the specified private endpoint connection in the exclusion. */
  queryAccessMode?: AccessMode;
  /** Specifies the access mode of ingestion through the specified private endpoint connection in the exclusion. */
  ingestionAccessMode?: AccessMode;
}

export function accessModeSettingsExclusionSerializer(item: AccessModeSettingsExclusion): any {
  return {
    privateEndpointConnectionName: item["privateEndpointConnectionName"],
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
  };
}

export function accessModeSettingsExclusionDeserializer(item: any): AccessModeSettingsExclusion {
  return {
    privateEndpointConnectionName: item["privateEndpointConnectionName"],
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
  };
}

/** A container holding only the Tags for a resource, allowing the user to update the tags on a PrivateLinkScope instance. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

export function azureMonitorPrivateLinkScopeArraySerializer(
  result: Array<AzureMonitorPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return azureMonitorPrivateLinkScopeSerializer(item);
  });
}

export function azureMonitorPrivateLinkScopeArrayDeserializer(
  result: Array<AzureMonitorPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return azureMonitorPrivateLinkScopeDeserializer(item);
  });
}

/** A private link scoped resource */
export interface ScopedResource extends ProxyResource {
  /** The kind of scoped Azure monitor resource. */
  kind?: ScopedResourceKind;
  /** The resource id of the scoped Azure monitor resource. */
  linkedResourceId?: string;
  /** The location of a scoped subscription. Only needs to be specified for metric dataplane subscriptions. */
  subscriptionLocation?: string;
  /** State of the Azure monitor resource. */
  readonly provisioningState?: ScopedResourceProvisioningState;
}

export function scopedResourceSerializer(item: ScopedResource): any {
  return {
    properties: areAllPropsUndefined(item, ["kind", "linkedResourceId", "subscriptionLocation"])
      ? undefined
      : _scopedResourcePropertiesSerializer(item),
  };
}

export function scopedResourceDeserializer(item: any): ScopedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _scopedResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link scoped resource. */
export interface ScopedResourceProperties {
  /** The kind of scoped Azure monitor resource. */
  kind?: ScopedResourceKind;
  /** The resource id of the scoped Azure monitor resource. */
  linkedResourceId?: string;
  /** The location of a scoped subscription. Only needs to be specified for metric dataplane subscriptions. */
  subscriptionLocation?: string;
  /** State of the Azure monitor resource. */
  readonly provisioningState?: ScopedResourceProvisioningState;
}

export function scopedResourcePropertiesSerializer(item: ScopedResourceProperties): any {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
  };
}

export function scopedResourcePropertiesDeserializer(item: any): ScopedResourceProperties {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
    provisioningState: item["provisioningState"],
  };
}

/** The kind of scoped Azure monitor resource. */
export enum KnownScopedResourceKind {
  /** Resource */
  Resource = "Resource",
  /** Metrics */
  Metrics = "Metrics",
}

/**
 * The kind of scoped Azure monitor resource. \
 * {@link KnownScopedResourceKind} can be used interchangeably with ScopedResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resource**: Resource \
 * **Metrics**: Metrics
 */
export type ScopedResourceKind = string;

/** State of the Azure monitor resource. */
export enum KnownScopedResourceProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * State of the Azure monitor resource. \
 * {@link KnownScopedResourceProvisioningState} can be used interchangeably with ScopedResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Provisioning**: Provisioning \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type ScopedResourceProvisioningState = string;

export function scopedResourceArraySerializer(result: Array<ScopedResource>): any[] {
  return result.map((item) => {
    return scopedResourceSerializer(item);
  });
}

export function scopedResourceArrayDeserializer(result: Array<ScopedResource>): any[] {
  return result.map((item) => {
    return scopedResourceDeserializer(item);
  });
}

/** The status of operation. */
export interface OperationStatus {
  /** The operation Id. */
  id?: string;
  /** The operation name. */
  name?: string;
  /** Start time of the job in standard ISO8601 format. */
  startTime?: Date;
  /** End time of the job in standard ISO8601 format. */
  endTime?: Date;
  /** The status of the operation. */
  status?: string;
  /** The error detail of the operation if any. */
  error?: ArmErrorDetail;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : armErrorDetailDeserializer(item["error"]),
  };
}

export function _azureMonitorPrivateLinkScopePropertiesSerializer(
  item: AzureMonitorPrivateLinkScope,
): any {
  return { accessModeSettings: accessModeSettingsSerializer(item["accessModeSettings"]) };
}

export function _azureMonitorPrivateLinkScopePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    accessModeSettings: accessModeSettingsDeserializer(item["accessModeSettings"]),
  };
}

export function _scopedResourcePropertiesSerializer(item: ScopedResource): any {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
  };
}

export function _scopedResourcePropertiesDeserializer(item: any) {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
    provisioningState: item["provisioningState"],
  };
}
