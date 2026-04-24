// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { CommonProvisioningState } from "../common/models.js";
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
export interface PrivateLinksAPIPrivateLinkGroupResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinksAPIPrivateLinkGroupResourceDeserializer(
  item: any,
): PrivateLinksAPIPrivateLinkGroupResource {
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

export function privateLinksAPIPrivateLinkGroupResourceArrayDeserializer(
  result: Array<PrivateLinksAPIPrivateLinkGroupResource>,
): any[] {
  return result.map((item) => {
    return privateLinksAPIPrivateLinkGroupResourceDeserializer(item);
  });
}

/** The private endpoint connection resource. */
export interface PrivateLinksAPIPrivateEndpointConnection extends Resource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateLinksAPIPrivateEndpointConnectionSerializer(
  item: PrivateLinksAPIPrivateEndpointConnection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateLinksAPIPrivateEndpointConnectionDeserializer(
  item: any,
): PrivateLinksAPIPrivateEndpointConnection {
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

export function privateLinksAPIPrivateEndpointConnectionArraySerializer(
  result: Array<PrivateLinksAPIPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateLinksAPIPrivateEndpointConnectionSerializer(item);
  });
}

export function privateLinksAPIPrivateEndpointConnectionArrayDeserializer(
  result: Array<PrivateLinksAPIPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateLinksAPIPrivateEndpointConnectionDeserializer(item);
  });
}

/** A private link resource that enables secure, private connectivity to Microsoft Defender for Cloud services. This resource manages the lifecycle of private endpoint connections and provides the necessary infrastructure for private connectivity. */
export interface PrivateLinksAPIPrivateLinkResource extends TrackedResource {
  /** The current provisioning state of the private link resource. Indicates whether the resource is being created, updated, deleted, or has completed successfully. */
  readonly provisioningState?: CommonProvisioningState;
  /** List of private endpoint connections associated with this private link. Each connection represents a private endpoint from a customer's virtual network. */
  readonly privateEndpointConnections?: PrivateLinksAPIPrivateEndpointConnection[];
  /** List of private link resources available for connection. For Defender services, this typically includes the 'containers' group with 'api' and regional data endpoints. */
  readonly privateLinkResources?: PrivateLinksAPIPrivateLinkGroupResource[];
  /** This determines if traffic is allowed over public network. By default it is disabled. */
  publicNetworkAccess?: PrivateLinksAPIPublicNetworkAccess;
}

export function privateLinksAPIPrivateLinkResourceSerializer(
  item: PrivateLinksAPIPrivateLinkResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _privateLinkResourcePropertiesSerializer(item),
  };
}

export function privateLinksAPIPrivateLinkResourceDeserializer(
  item: any,
): PrivateLinksAPIPrivateLinkResource {
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
export interface PrivateLinksAPIPrivateLinkProperties {
  /** The current provisioning state of the private link resource. Indicates whether the resource is being created, updated, deleted, or has completed successfully. */
  readonly provisioningState?: CommonProvisioningState;
  /** List of private endpoint connections associated with this private link. Each connection represents a private endpoint from a customer's virtual network. */
  readonly privateEndpointConnections?: PrivateLinksAPIPrivateEndpointConnection[];
  /** List of private link resources available for connection. For Defender services, this typically includes the 'containers' group with 'api' and regional data endpoints. */
  readonly privateLinkResources?: PrivateLinksAPIPrivateLinkGroupResource[];
  /** This determines if traffic is allowed over public network. By default it is disabled. */
  publicNetworkAccess?: PrivateLinksAPIPublicNetworkAccess;
}

export function privateLinksAPIPrivateLinkPropertiesSerializer(
  item: PrivateLinksAPIPrivateLinkProperties,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function privateLinksAPIPrivateLinkPropertiesDeserializer(
  item: any,
): PrivateLinksAPIPrivateLinkProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateLinksAPIPrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinksAPIPrivateLinkGroupResourceArrayDeserializer(item["privateLinkResources"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** This determines if traffic is allowed over public network. By default it is disabled. */
export enum KnownPrivateLinksAPIPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * This determines if traffic is allowed over public network. By default it is disabled. \
 * {@link KnownPrivateLinksAPIPublicNetworkAccess} can be used interchangeably with PrivateLinksAPIPublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type PrivateLinksAPIPublicNetworkAccess = string;

/** Request payload for updating a private link resource. Used in PATCH operations to update specific mutable properties without affecting the entire resource configuration. */
export interface PrivateLinksAPIPrivateLinkUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function privateLinksAPIPrivateLinkUpdateSerializer(
  item: PrivateLinksAPIPrivateLinkUpdate,
): any {
  return { tags: item["tags"] };
}

/** Paginated list of private link resources. Contains an array of private links and optional pagination information. */
export interface _PrivateLinksAPIPrivateLinksList {
  /** The PrivateLinkResource items on this page */
  readonly value: PrivateLinksAPIPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinksAPIPrivateLinksListDeserializer(
  item: any,
): _PrivateLinksAPIPrivateLinksList {
  return {
    value: privateLinksAPIPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinksAPIPrivateLinkResourceArraySerializer(
  result: Array<PrivateLinksAPIPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return privateLinksAPIPrivateLinkResourceSerializer(item);
  });
}

export function privateLinksAPIPrivateLinkResourceArrayDeserializer(
  result: Array<PrivateLinksAPIPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return privateLinksAPIPrivateLinkResourceDeserializer(item);
  });
}

export function _privateLinkResourcePropertiesSerializer(
  item: PrivateLinksAPIPrivateLinkResource,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateLinksAPIPrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinksAPIPrivateLinkGroupResourceArrayDeserializer(item["privateLinkResources"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}
