// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type {
  ArmErrorDetail,
  PrivateLinkResourceProperties,
  Resource,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointConnectionProvisioningState,
  TrackedResource,
  ProxyResource,
} from "../models.js";
import {
  armErrorDetailDeserializer,
  privateLinkResourcePropertiesDeserializer,
  systemDataDeserializer,
  _privateEndpointConnectionPropertiesSerializer,
  _privateEndpointConnectionPropertiesDeserializer,
} from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A private link resource */
export interface PrivateLinkScopesApiPrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkScopesApiPrivateLinkResourceDeserializer(
  item: any,
): PrivateLinkScopesApiPrivateLinkResource {
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

export function privateLinkScopesApiPrivateLinkResourceArrayDeserializer(
  result: Array<PrivateLinkScopesApiPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiPrivateLinkResourceDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface PrivateLinkScopesApiPrivateEndpointConnection extends Resource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateLinkScopesApiPrivateEndpointConnectionSerializer(
  item: PrivateLinkScopesApiPrivateEndpointConnection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateLinkScopesApiPrivateEndpointConnectionDeserializer(
  item: any,
): PrivateLinkScopesApiPrivateEndpointConnection {
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
export interface PrivateLinkScopesApiPrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateLinkScopesApiPrivateEndpointConnection[];
}

export function privateLinkScopesApiPrivateEndpointConnectionListResultDeserializer(
  item: any,
): PrivateLinkScopesApiPrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateLinkScopesApiPrivateEndpointConnectionArrayDeserializer(item["value"]),
  };
}

export function privateLinkScopesApiPrivateEndpointConnectionArraySerializer(
  result: Array<PrivateLinkScopesApiPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiPrivateEndpointConnectionSerializer(item);
  });
}

export function privateLinkScopesApiPrivateEndpointConnectionArrayDeserializer(
  result: Array<PrivateLinkScopesApiPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiPrivateEndpointConnectionDeserializer(item);
  });
}

/** An Azure Monitor PrivateLinkScope definition. */
export interface PrivateLinkScopesApiAzureMonitorPrivateLinkScope extends TrackedResource {
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
  readonly provisioningState?: PrivateLinkScopesApiPrivateLinkScopeProvisioningState;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateLinkScopesApiPrivateEndpointConnection[];
  /** Access mode settings */
  accessModeSettings: PrivateLinkScopesApiAccessModeSettings;
}

export function privateLinkScopesApiAzureMonitorPrivateLinkScopeSerializer(
  item: PrivateLinkScopesApiAzureMonitorPrivateLinkScope,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _azureMonitorPrivateLinkScopePropertiesSerializer(item),
  };
}

export function privateLinkScopesApiAzureMonitorPrivateLinkScopeDeserializer(
  item: any,
): PrivateLinkScopesApiAzureMonitorPrivateLinkScope {
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
export interface PrivateLinkScopesApiAzureMonitorPrivateLinkScopeProperties {
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
  readonly provisioningState?: PrivateLinkScopesApiPrivateLinkScopeProvisioningState;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateLinkScopesApiPrivateEndpointConnection[];
  /** Access mode settings */
  accessModeSettings: PrivateLinkScopesApiAccessModeSettings;
}

export function privateLinkScopesApiAzureMonitorPrivateLinkScopePropertiesSerializer(
  item: PrivateLinkScopesApiAzureMonitorPrivateLinkScopeProperties,
): any {
  return {
    accessModeSettings: privateLinkScopesApiAccessModeSettingsSerializer(
      item["accessModeSettings"],
    ),
  };
}

export function privateLinkScopesApiAzureMonitorPrivateLinkScopePropertiesDeserializer(
  item: any,
): PrivateLinkScopesApiAzureMonitorPrivateLinkScopeProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateLinkScopesApiPrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    accessModeSettings: privateLinkScopesApiAccessModeSettingsDeserializer(
      item["accessModeSettings"],
    ),
  };
}

/** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
export enum KnownPrivateLinkScopesApiPrivateLinkScopeProvisioningState {
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
 * {@link KnownPrivateLinkScopesApiPrivateLinkScopeProvisioningState} can be used interchangeably with PrivateLinkScopesApiPrivateLinkScopeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Deleting**: Deleting \
 * **Canceled**: Canceled
 */
export type PrivateLinkScopesApiPrivateLinkScopeProvisioningState = string;

/** Properties that define the scope private link mode settings. */
export interface PrivateLinkScopesApiAccessModeSettings {
  /** Specifies the default access mode of queries through associated private endpoints in scope. If not specified default value is 'Open'. You can override this default setting for a specific private endpoint connection by adding an exclusion in the 'exclusions' array. */
  queryAccessMode: PrivateLinkScopesApiAccessMode;
  /** Specifies the default access mode of ingestion through associated private endpoints in scope. If not specified default value is 'Open'. You can override this default setting for a specific private endpoint connection by adding an exclusion in the 'exclusions' array. */
  ingestionAccessMode: PrivateLinkScopesApiAccessMode;
  /** List of exclusions that override the default access mode settings for specific private endpoint connections. */
  exclusions?: PrivateLinkScopesApiAccessModeSettingsExclusion[];
}

export function privateLinkScopesApiAccessModeSettingsSerializer(
  item: PrivateLinkScopesApiAccessModeSettings,
): any {
  return {
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : privateLinkScopesApiAccessModeSettingsExclusionArraySerializer(item["exclusions"]),
  };
}

export function privateLinkScopesApiAccessModeSettingsDeserializer(
  item: any,
): PrivateLinkScopesApiAccessModeSettings {
  return {
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : privateLinkScopesApiAccessModeSettingsExclusionArrayDeserializer(item["exclusions"]),
  };
}

/** Access mode types. */
export enum KnownPrivateLinkScopesApiAccessMode {
  /** Open */
  Open = "Open",
  /** PrivateOnly */
  PrivateOnly = "PrivateOnly",
}

/**
 * Access mode types. \
 * {@link KnownPrivateLinkScopesApiAccessMode} can be used interchangeably with PrivateLinkScopesApiAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Open**: Open \
 * **PrivateOnly**: PrivateOnly
 */
export type PrivateLinkScopesApiAccessMode = string;

export function privateLinkScopesApiAccessModeSettingsExclusionArraySerializer(
  result: Array<PrivateLinkScopesApiAccessModeSettingsExclusion>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiAccessModeSettingsExclusionSerializer(item);
  });
}

export function privateLinkScopesApiAccessModeSettingsExclusionArrayDeserializer(
  result: Array<PrivateLinkScopesApiAccessModeSettingsExclusion>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiAccessModeSettingsExclusionDeserializer(item);
  });
}

/** Properties that define the scope private link mode settings exclusion item. This setting applies to a specific private endpoint connection and overrides the default settings for that private endpoint connection. */
export interface PrivateLinkScopesApiAccessModeSettingsExclusion {
  /** The private endpoint connection name associated to the private endpoint on which we want to apply the specific access mode settings. */
  privateEndpointConnectionName?: string;
  /** Specifies the access mode of queries through the specified private endpoint connection in the exclusion. */
  queryAccessMode?: PrivateLinkScopesApiAccessMode;
  /** Specifies the access mode of ingestion through the specified private endpoint connection in the exclusion. */
  ingestionAccessMode?: PrivateLinkScopesApiAccessMode;
}

export function privateLinkScopesApiAccessModeSettingsExclusionSerializer(
  item: PrivateLinkScopesApiAccessModeSettingsExclusion,
): any {
  return {
    privateEndpointConnectionName: item["privateEndpointConnectionName"],
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
  };
}

export function privateLinkScopesApiAccessModeSettingsExclusionDeserializer(
  item: any,
): PrivateLinkScopesApiAccessModeSettingsExclusion {
  return {
    privateEndpointConnectionName: item["privateEndpointConnectionName"],
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
  };
}

/** A container holding only the Tags for a resource, allowing the user to update the tags on a PrivateLinkScope instance. */
export interface PrivateLinkScopesApiTagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function privateLinkScopesApiTagsResourceSerializer(
  item: PrivateLinkScopesApiTagsResource,
): any {
  return { tags: item["tags"] };
}

export function privateLinkScopesApiAzureMonitorPrivateLinkScopeArraySerializer(
  result: Array<PrivateLinkScopesApiAzureMonitorPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiAzureMonitorPrivateLinkScopeSerializer(item);
  });
}

export function privateLinkScopesApiAzureMonitorPrivateLinkScopeArrayDeserializer(
  result: Array<PrivateLinkScopesApiAzureMonitorPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiAzureMonitorPrivateLinkScopeDeserializer(item);
  });
}

/** A private link scoped resource */
export interface PrivateLinkScopesApiScopedResource extends ProxyResource {
  /** The kind of scoped Azure monitor resource. */
  kind?: PrivateLinkScopesApiScopedResourceKind;
  /** The resource id of the scoped Azure monitor resource. */
  linkedResourceId?: string;
  /** The location of a scoped subscription. Only needs to be specified for metric dataplane subscriptions. */
  subscriptionLocation?: string;
  /** State of the Azure monitor resource. */
  readonly provisioningState?: PrivateLinkScopesApiScopedResourceProvisioningState;
}

export function privateLinkScopesApiScopedResourceSerializer(
  item: PrivateLinkScopesApiScopedResource,
): any {
  return {
    properties: areAllPropsUndefined(item, ["kind", "linkedResourceId", "subscriptionLocation"])
      ? undefined
      : _scopedResourcePropertiesSerializer(item),
  };
}

export function privateLinkScopesApiScopedResourceDeserializer(
  item: any,
): PrivateLinkScopesApiScopedResource {
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
export interface PrivateLinkScopesApiScopedResourceProperties {
  /** The kind of scoped Azure monitor resource. */
  kind?: PrivateLinkScopesApiScopedResourceKind;
  /** The resource id of the scoped Azure monitor resource. */
  linkedResourceId?: string;
  /** The location of a scoped subscription. Only needs to be specified for metric dataplane subscriptions. */
  subscriptionLocation?: string;
  /** State of the Azure monitor resource. */
  readonly provisioningState?: PrivateLinkScopesApiScopedResourceProvisioningState;
}

export function privateLinkScopesApiScopedResourcePropertiesSerializer(
  item: PrivateLinkScopesApiScopedResourceProperties,
): any {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
  };
}

export function privateLinkScopesApiScopedResourcePropertiesDeserializer(
  item: any,
): PrivateLinkScopesApiScopedResourceProperties {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
    provisioningState: item["provisioningState"],
  };
}

/** The kind of scoped Azure monitor resource. */
export enum KnownPrivateLinkScopesApiScopedResourceKind {
  /** Resource */
  Resource = "Resource",
  /** Metrics */
  Metrics = "Metrics",
}

/**
 * The kind of scoped Azure monitor resource. \
 * {@link KnownPrivateLinkScopesApiScopedResourceKind} can be used interchangeably with PrivateLinkScopesApiScopedResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resource**: Resource \
 * **Metrics**: Metrics
 */
export type PrivateLinkScopesApiScopedResourceKind = string;

/** State of the Azure monitor resource. */
export enum KnownPrivateLinkScopesApiScopedResourceProvisioningState {
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
 * {@link KnownPrivateLinkScopesApiScopedResourceProvisioningState} can be used interchangeably with PrivateLinkScopesApiScopedResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Provisioning**: Provisioning \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type PrivateLinkScopesApiScopedResourceProvisioningState = string;

export function privateLinkScopesApiScopedResourceArraySerializer(
  result: Array<PrivateLinkScopesApiScopedResource>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiScopedResourceSerializer(item);
  });
}

export function privateLinkScopesApiScopedResourceArrayDeserializer(
  result: Array<PrivateLinkScopesApiScopedResource>,
): any[] {
  return result.map((item) => {
    return privateLinkScopesApiScopedResourceDeserializer(item);
  });
}

/** The status of operation. */
export interface PrivateLinkScopesApiOperationStatus {
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

export function privateLinkScopesApiOperationStatusDeserializer(
  item: any,
): PrivateLinkScopesApiOperationStatus {
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
  item: PrivateLinkScopesApiAzureMonitorPrivateLinkScope,
): any {
  return {
    accessModeSettings: privateLinkScopesApiAccessModeSettingsSerializer(
      item["accessModeSettings"],
    ),
  };
}

export function _azureMonitorPrivateLinkScopePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateLinkScopesApiPrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    accessModeSettings: privateLinkScopesApiAccessModeSettingsDeserializer(
      item["accessModeSettings"],
    ),
  };
}

export function _scopedResourcePropertiesSerializer(item: PrivateLinkScopesApiScopedResource): any {
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
