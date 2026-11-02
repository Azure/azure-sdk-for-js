// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ManagedServiceIdentity, TrackedResource } from "../../models.js";
import {
  managedServiceIdentitySerializer,
  managedServiceIdentityDeserializer,
  systemDataDeserializer,
} from "../../models.js";
import type { MarketplaceDetails, ProvisioningState, UserDetails } from "../models.js";
import {
  marketplaceDetailsSerializer,
  marketplaceDetailsDeserializer,
  userDetailsSerializer,
  userDetailsDeserializer,
} from "../models.js";

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface FileSystemResource extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Marketplace details */
  marketplaceDetails?: MarketplaceDetails;
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Storage Sku */
  storageSku?: string;
  /** User Details */
  userDetails?: UserDetails;
  /** Delegated subnet id for Vnet injection */
  delegatedSubnetId?: string;
  /** Pre-Provisioned Performance of the Resource */
  performanceTier?: string;
  /** File system Id of the resource */
  clusterLoginUrl?: string;
  /** Private IPs of the resource */
  privateIPs?: string[];
  /** Initial administrator password of the resource */
  adminPassword?: string;
  /** Availability zone */
  availabilityZone?: string;
}

export function fileSystemResourceSerializer(item: FileSystemResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "marketplaceDetails",
      "storageSku",
      "userDetails",
      "delegatedSubnetId",
      "performanceTier",
      "clusterLoginUrl",
      "privateIPs",
      "adminPassword",
      "availabilityZone",
    ])
      ? undefined
      : _fileSystemResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function fileSystemResourceDeserializer(item: any): FileSystemResource {
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
      : _fileSystemResourcePropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties specific to the Qumulo File System resource */
export interface FileSystemResourceProperties {
  /** Marketplace details */
  marketplaceDetails: MarketplaceDetails;
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Storage Sku */
  storageSku: string;
  /** User Details */
  userDetails: UserDetails;
  /** Delegated subnet id for Vnet injection */
  delegatedSubnetId: string;
  /** Pre-Provisioned Performance of the Resource */
  performanceTier?: string;
  /** File system Id of the resource */
  clusterLoginUrl?: string;
  /** Private IPs of the resource */
  privateIPs?: string[];
  /** Initial administrator password of the resource */
  adminPassword: string;
  /** Availability zone */
  availabilityZone?: string;
}

export function fileSystemResourcePropertiesSerializer(item: FileSystemResourceProperties): any {
  return {
    marketplaceDetails: marketplaceDetailsSerializer(item["marketplaceDetails"]),
    storageSku: item["storageSku"],
    userDetails: userDetailsSerializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
    clusterLoginUrl: item["clusterLoginUrl"],
    privateIPs: !item["privateIPs"]
      ? item["privateIPs"]
      : item["privateIPs"].map((p: any) => {
          return p;
        }),
    adminPassword: item["adminPassword"],
    availabilityZone: item["availabilityZone"],
  };
}

export function fileSystemResourcePropertiesDeserializer(item: any): FileSystemResourceProperties {
  return {
    marketplaceDetails: marketplaceDetailsDeserializer(item["marketplaceDetails"]),
    provisioningState: item["provisioningState"],
    storageSku: item["storageSku"],
    userDetails: userDetailsDeserializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
    clusterLoginUrl: item["clusterLoginUrl"],
    privateIPs: !item["privateIPs"]
      ? item["privateIPs"]
      : item["privateIPs"].map((p: any) => {
          return p;
        }),
    adminPassword: item["adminPassword"],
    availabilityZone: item["availabilityZone"],
  };
}

/** The type used for update operations of the FileSystemResource. */
export interface FileSystemResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The updatable properties of the FileSystemResource. */
  properties?: FileSystemResourceUpdateProperties;
}

export function fileSystemResourceUpdateSerializer(item: FileSystemResourceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : fileSystemResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the FileSystemResource. */
export interface FileSystemResourceUpdateProperties {
  /** Marketplace details */
  marketplaceDetails?: MarketplaceDetails;
  /** User Details */
  userDetails?: UserDetails;
  /** Delegated subnet id for Vnet injection */
  delegatedSubnetId?: string;
  /** Pre-Provisioned Performance of the Resource */
  performanceTier?: string;
}

export function fileSystemResourceUpdatePropertiesSerializer(
  item: FileSystemResourceUpdateProperties,
): any {
  return {
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsSerializer(item["marketplaceDetails"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsSerializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
  };
}

export function fileSystemResourceArraySerializer(result: Array<FileSystemResource>): any[] {
  return result.map((item) => {
    return fileSystemResourceSerializer(item);
  });
}

export function fileSystemResourceArrayDeserializer(result: Array<FileSystemResource>): any[] {
  return result.map((item) => {
    return fileSystemResourceDeserializer(item);
  });
}

export function _fileSystemResourcePropertiesSerializer(item: FileSystemResource): any {
  return {
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsSerializer(item["marketplaceDetails"]),
    storageSku: item["storageSku"],
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsSerializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
    clusterLoginUrl: item["clusterLoginUrl"],
    privateIPs: !item["privateIPs"]
      ? item["privateIPs"]
      : item["privateIPs"].map((p: any) => {
          return p;
        }),
    adminPassword: item["adminPassword"],
    availabilityZone: item["availabilityZone"],
  };
}

export function _fileSystemResourcePropertiesDeserializer(item: any) {
  return {
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsDeserializer(item["marketplaceDetails"]),
    provisioningState: item["provisioningState"],
    storageSku: item["storageSku"],
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsDeserializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
    clusterLoginUrl: item["clusterLoginUrl"],
    privateIPs: !item["privateIPs"]
      ? item["privateIPs"]
      : item["privateIPs"].map((p: any) => {
          return p;
        }),
    adminPassword: item["adminPassword"],
    availabilityZone: item["availabilityZone"],
  };
}
