// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ProvisioningState } from "../common/models.js";
import type {
  ProxyResource,
  Resource,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointConnectionProvisioningState,
  TrackedResource,
} from "../models.js";
import {
  systemDataDeserializer,
  _privateLinkGroupResourcePropertiesDeserializer,
  _privateEndpointConnectionPropertiesSerializer,
  _privateEndpointConnectionPropertiesDeserializer,
} from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A private link group resource that describes a grouping for the private link. */
export interface PrivateLinkGroupResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkGroupResourceDeserializer(item: any): PrivateLinkGroupResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkGroupResourcePropertiesDeserializer(item["properties"])),
  };
}

export function privateLinkGroupResourceArrayDeserializer(
  result: Array<PrivateLinkGroupResource>,
): any[] {
  return result.map((item) => {
    return privateLinkGroupResourceDeserializer(item);
  });
}

/** The private endpoint connection resource. */
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

/** A private link resource that enables secure, private connectivity to Microsoft Defender for Cloud services. This resource manages the lifecycle of private endpoint connections and provides the necessary infrastructure for private connectivity. */
export interface PrivateLinkResource extends TrackedResource {
  /** The current provisioning state of the private link resource. Indicates whether the resource is being created, updated, deleted, or has completed successfully. */
  readonly provisioningState?: ProvisioningState;
  /** List of private endpoint connections associated with this private link. Each connection represents a private endpoint from a customer's virtual network. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** List of private link resources available for connection. For Defender services, this typically includes the 'containers' group with 'api' and regional data endpoints. */
  readonly privateLinkResources?: PrivateLinkGroupResource[];
  /** This determines if traffic is allowed over public network. By default it is disabled. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function privateLinkResourceSerializer(item: PrivateLinkResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _privateLinkResourcePropertiesSerializer(item),
  };
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
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
    ..._privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. These properties control the behavior and configuration of private endpoint connectivity to Defender services. */
export interface PrivateLinkProperties {
  /** The current provisioning state of the private link resource. Indicates whether the resource is being created, updated, deleted, or has completed successfully. */
  readonly provisioningState?: ProvisioningState;
  /** List of private endpoint connections associated with this private link. Each connection represents a private endpoint from a customer's virtual network. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** List of private link resources available for connection. For Defender services, this typically includes the 'containers' group with 'api' and regional data endpoints. */
  readonly privateLinkResources?: PrivateLinkGroupResource[];
  /** This determines if traffic is allowed over public network. By default it is disabled. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function privateLinkPropertiesSerializer(item: PrivateLinkProperties): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function privateLinkPropertiesDeserializer(item: any): PrivateLinkProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinkGroupResourceArrayDeserializer(item["privateLinkResources"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** This determines if traffic is allowed over public network. By default it is disabled. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * This determines if traffic is allowed over public network. By default it is disabled. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type PublicNetworkAccess = string;

/** Request payload for updating a private link resource. Used in PATCH operations to update specific mutable properties without affecting the entire resource configuration. */
export interface PrivateLinkUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function privateLinkUpdateSerializer(item: PrivateLinkUpdate): any {
  return { tags: item["tags"] };
}

/** Paginated list of private link resources. Contains an array of private links and optional pagination information. */
export interface _PrivateLinksList {
  /** The PrivateLinkResource items on this page */
  readonly value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinksListDeserializer(item: any): _PrivateLinksList {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArraySerializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceSerializer(item);
  });
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

export function _privateLinkResourcePropertiesSerializer(item: PrivateLinkResource): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinkGroupResourceArrayDeserializer(item["privateLinkResources"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}
