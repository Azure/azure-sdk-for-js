// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type {
  PrivateLinkResourceProperties,
  Resource,
  ErrorDetail,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointConnectionProvisioningState,
  TrackedResource,
  ProxyResource,
} from "../../models.js";
import {
  privateLinkResourcePropertiesDeserializer,
  systemDataDeserializer,
  errorDetailDeserializer,
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
export interface MicrosoftPrivateLinkScopesPrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function microsoftPrivateLinkScopesPrivateLinkResourceDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesPrivateLinkResource {
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

export function microsoftPrivateLinkScopesPrivateLinkResourceArrayDeserializer(
  result: Array<MicrosoftPrivateLinkScopesPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesPrivateLinkResourceDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface MicrosoftPrivateLinkScopesPrivateEndpointConnection extends Resource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function microsoftPrivateLinkScopesPrivateEndpointConnectionSerializer(
  item: MicrosoftPrivateLinkScopesPrivateEndpointConnection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function microsoftPrivateLinkScopesPrivateEndpointConnectionDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesPrivateEndpointConnection {
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

/** An Azure Monitor PrivateLinkScope definition. */
export interface MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScope extends TrackedResource {
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
  readonly provisioningState?: MicrosoftPrivateLinkScopesPrivateLinkScopeProvisioningState;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: MicrosoftPrivateLinkScopesPrivateEndpointConnection[];
  /** Access mode settings */
  accessModeSettings: MicrosoftPrivateLinkScopesAccessModeSettings;
}

export function microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopeSerializer(
  item: MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScope,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _azureMonitorPrivateLinkScopePropertiesSerializer(item),
  };
}

export function microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopeDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScope {
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
export interface MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScopeProperties {
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
  readonly provisioningState?: MicrosoftPrivateLinkScopesPrivateLinkScopeProvisioningState;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: MicrosoftPrivateLinkScopesPrivateEndpointConnection[];
  /** Access mode settings */
  accessModeSettings: MicrosoftPrivateLinkScopesAccessModeSettings;
}

export function microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopePropertiesSerializer(
  item: MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScopeProperties,
): any {
  return {
    accessModeSettings: microsoftPrivateLinkScopesAccessModeSettingsSerializer(
      item["accessModeSettings"],
    ),
  };
}

export function microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopePropertiesDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScopeProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : microsoftPrivateLinkScopesPrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    accessModeSettings: microsoftPrivateLinkScopesAccessModeSettingsDeserializer(
      item["accessModeSettings"],
    ),
  };
}

/** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. */
export enum KnownMicrosoftPrivateLinkScopesPrivateLinkScopeProvisioningState {
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
 * {@link KnownMicrosoftPrivateLinkScopesPrivateLinkScopeProvisioningState} can be used interchangeably with MicrosoftPrivateLinkScopesPrivateLinkScopeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Deleting**: Deleting \
 * **Canceled**: Canceled
 */
export type MicrosoftPrivateLinkScopesPrivateLinkScopeProvisioningState = string;

export function microsoftPrivateLinkScopesPrivateEndpointConnectionArraySerializer(
  result: Array<MicrosoftPrivateLinkScopesPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesPrivateEndpointConnectionSerializer(item);
  });
}

export function microsoftPrivateLinkScopesPrivateEndpointConnectionArrayDeserializer(
  result: Array<MicrosoftPrivateLinkScopesPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesPrivateEndpointConnectionDeserializer(item);
  });
}

/** Properties that define the scope private link mode settings. */
export interface MicrosoftPrivateLinkScopesAccessModeSettings {
  /** Specifies the default access mode of queries through associated private endpoints in scope. If not specified default value is 'Open'. You can override this default setting for a specific private endpoint connection by adding an exclusion in the 'exclusions' array. */
  queryAccessMode: MicrosoftPrivateLinkScopesAccessMode;
  /** Specifies the default access mode of ingestion through associated private endpoints in scope. If not specified default value is 'Open'. You can override this default setting for a specific private endpoint connection by adding an exclusion in the 'exclusions' array. */
  ingestionAccessMode: MicrosoftPrivateLinkScopesAccessMode;
  /** List of exclusions that override the default access mode settings for specific private endpoint connections. */
  exclusions?: MicrosoftPrivateLinkScopesAccessModeSettingsExclusion[];
}

export function microsoftPrivateLinkScopesAccessModeSettingsSerializer(
  item: MicrosoftPrivateLinkScopesAccessModeSettings,
): any {
  return {
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : microsoftPrivateLinkScopesAccessModeSettingsExclusionArraySerializer(item["exclusions"]),
  };
}

export function microsoftPrivateLinkScopesAccessModeSettingsDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesAccessModeSettings {
  return {
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : microsoftPrivateLinkScopesAccessModeSettingsExclusionArrayDeserializer(item["exclusions"]),
  };
}

/** Access mode types. */
export enum KnownMicrosoftPrivateLinkScopesAccessMode {
  /** Open */
  Open = "Open",
  /** PrivateOnly */
  PrivateOnly = "PrivateOnly",
}

/**
 * Access mode types. \
 * {@link KnownMicrosoftPrivateLinkScopesAccessMode} can be used interchangeably with MicrosoftPrivateLinkScopesAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Open**: Open \
 * **PrivateOnly**: PrivateOnly
 */
export type MicrosoftPrivateLinkScopesAccessMode = string;

export function microsoftPrivateLinkScopesAccessModeSettingsExclusionArraySerializer(
  result: Array<MicrosoftPrivateLinkScopesAccessModeSettingsExclusion>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesAccessModeSettingsExclusionSerializer(item);
  });
}

export function microsoftPrivateLinkScopesAccessModeSettingsExclusionArrayDeserializer(
  result: Array<MicrosoftPrivateLinkScopesAccessModeSettingsExclusion>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesAccessModeSettingsExclusionDeserializer(item);
  });
}

/** Properties that define the scope private link mode settings exclusion item. This setting applies to a specific private endpoint connection and overrides the default settings for that private endpoint connection. */
export interface MicrosoftPrivateLinkScopesAccessModeSettingsExclusion {
  /** The private endpoint connection name associated to the private endpoint on which we want to apply the specific access mode settings. */
  privateEndpointConnectionName?: string;
  /** Specifies the access mode of queries through the specified private endpoint connection in the exclusion. */
  queryAccessMode?: MicrosoftPrivateLinkScopesAccessMode;
  /** Specifies the access mode of ingestion through the specified private endpoint connection in the exclusion. */
  ingestionAccessMode?: MicrosoftPrivateLinkScopesAccessMode;
}

export function microsoftPrivateLinkScopesAccessModeSettingsExclusionSerializer(
  item: MicrosoftPrivateLinkScopesAccessModeSettingsExclusion,
): any {
  return {
    privateEndpointConnectionName: item["privateEndpointConnectionName"],
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
  };
}

export function microsoftPrivateLinkScopesAccessModeSettingsExclusionDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesAccessModeSettingsExclusion {
  return {
    privateEndpointConnectionName: item["privateEndpointConnectionName"],
    queryAccessMode: item["queryAccessMode"],
    ingestionAccessMode: item["ingestionAccessMode"],
  };
}

/** A container holding only the Tags for a resource, allowing the user to update the tags on a PrivateLinkScope instance. */
export interface MicrosoftPrivateLinkScopesTagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function microsoftPrivateLinkScopesTagsResourceSerializer(
  item: MicrosoftPrivateLinkScopesTagsResource,
): any {
  return { tags: item["tags"] };
}

export function microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopeArraySerializer(
  result: Array<MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopeSerializer(item);
  });
}

export function microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopeArrayDeserializer(
  result: Array<MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesAzureMonitorPrivateLinkScopeDeserializer(item);
  });
}

/** A private link scoped resource */
export interface MicrosoftPrivateLinkScopesScopedResource extends ProxyResource {
  /** The kind of scoped Azure monitor resource. */
  kind?: MicrosoftPrivateLinkScopesScopedResourceKind;
  /** The resource id of the scoped Azure monitor resource. */
  linkedResourceId?: string;
  /** The location of a scoped subscription. Only needs to be specified for metric dataplane subscriptions. */
  subscriptionLocation?: string;
  /** State of the Azure monitor resource. */
  readonly provisioningState?: MicrosoftPrivateLinkScopesScopedResourceProvisioningState;
}

export function microsoftPrivateLinkScopesScopedResourceSerializer(
  item: MicrosoftPrivateLinkScopesScopedResource,
): any {
  return {
    properties: areAllPropsUndefined(item, ["kind", "linkedResourceId", "subscriptionLocation"])
      ? undefined
      : _scopedResourcePropertiesSerializer(item),
  };
}

export function microsoftPrivateLinkScopesScopedResourceDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesScopedResource {
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
export interface MicrosoftPrivateLinkScopesScopedResourceProperties {
  /** The kind of scoped Azure monitor resource. */
  kind?: MicrosoftPrivateLinkScopesScopedResourceKind;
  /** The resource id of the scoped Azure monitor resource. */
  linkedResourceId?: string;
  /** The location of a scoped subscription. Only needs to be specified for metric dataplane subscriptions. */
  subscriptionLocation?: string;
  /** State of the Azure monitor resource. */
  readonly provisioningState?: MicrosoftPrivateLinkScopesScopedResourceProvisioningState;
}

export function microsoftPrivateLinkScopesScopedResourcePropertiesSerializer(
  item: MicrosoftPrivateLinkScopesScopedResourceProperties,
): any {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
  };
}

export function microsoftPrivateLinkScopesScopedResourcePropertiesDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesScopedResourceProperties {
  return {
    kind: item["kind"],
    linkedResourceId: item["linkedResourceId"],
    subscriptionLocation: item["subscriptionLocation"],
    provisioningState: item["provisioningState"],
  };
}

/** The kind of scoped Azure monitor resource. */
export enum KnownMicrosoftPrivateLinkScopesScopedResourceKind {
  /** Resource */
  Resource = "Resource",
  /** Metrics */
  Metrics = "Metrics",
}

/**
 * The kind of scoped Azure monitor resource. \
 * {@link KnownMicrosoftPrivateLinkScopesScopedResourceKind} can be used interchangeably with MicrosoftPrivateLinkScopesScopedResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resource**: Resource \
 * **Metrics**: Metrics
 */
export type MicrosoftPrivateLinkScopesScopedResourceKind = string;

/** State of the Azure monitor resource. */
export enum KnownMicrosoftPrivateLinkScopesScopedResourceProvisioningState {
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
 * {@link KnownMicrosoftPrivateLinkScopesScopedResourceProvisioningState} can be used interchangeably with MicrosoftPrivateLinkScopesScopedResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Provisioning**: Provisioning \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type MicrosoftPrivateLinkScopesScopedResourceProvisioningState = string;

export function microsoftPrivateLinkScopesScopedResourceArraySerializer(
  result: Array<MicrosoftPrivateLinkScopesScopedResource>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesScopedResourceSerializer(item);
  });
}

export function microsoftPrivateLinkScopesScopedResourceArrayDeserializer(
  result: Array<MicrosoftPrivateLinkScopesScopedResource>,
): any[] {
  return result.map((item) => {
    return microsoftPrivateLinkScopesScopedResourceDeserializer(item);
  });
}

/** The status of operation. */
export interface MicrosoftPrivateLinkScopesOperationStatus {
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
  error?: ErrorDetail;
}

export function microsoftPrivateLinkScopesOperationStatusDeserializer(
  item: any,
): MicrosoftPrivateLinkScopesOperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

export function _azureMonitorPrivateLinkScopePropertiesSerializer(
  item: MicrosoftPrivateLinkScopesAzureMonitorPrivateLinkScope,
): any {
  return {
    accessModeSettings: microsoftPrivateLinkScopesAccessModeSettingsSerializer(
      item["accessModeSettings"],
    ),
  };
}

export function _azureMonitorPrivateLinkScopePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : microsoftPrivateLinkScopesPrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    accessModeSettings: microsoftPrivateLinkScopesAccessModeSettingsDeserializer(
      item["accessModeSettings"],
    ),
  };
}

export function _scopedResourcePropertiesSerializer(
  item: MicrosoftPrivateLinkScopesScopedResource,
): any {
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
