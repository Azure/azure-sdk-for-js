// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrackedResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A ContosoProviderHub resource */
export interface GalleryEmployee extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: GalleryEmployeeProperties;
}

export function galleryEmployeeSerializer(item: GalleryEmployee): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : galleryEmployeePropertiesSerializer(item["properties"]),
  };
}

export function galleryEmployeeDeserializer(item: any): GalleryEmployee {
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
    properties: !item["properties"]
      ? item["properties"]
      : galleryEmployeePropertiesDeserializer(item["properties"]),
  };
}

/** Employee properties */
export interface GalleryEmployeeProperties {
  /** Age of employee */
  age?: number;
  /** City of employee */
  city?: string;
  /** Profile of employee */
  profile?: Uint8Array;
  /** The status of the last operation. */
  readonly provisioningState?: GalleryProvisioningState;
}

export function galleryEmployeePropertiesSerializer(item: GalleryEmployeeProperties): any {
  return {
    age: item["age"],
    city: item["city"],
    profile: !item["profile"] ? item["profile"] : uint8ArrayToString(item["profile"], "base64url"),
  };
}

export function galleryEmployeePropertiesDeserializer(item: any): GalleryEmployeeProperties {
  return {
    age: item["age"],
    city: item["city"],
    profile: !item["profile"]
      ? item["profile"]
      : typeof item["profile"] === "string"
        ? stringToUint8Array(item["profile"], "base64url")
        : item["profile"],
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning state of a resource. */
export enum KnownGalleryProvisioningState {
  /** The resource create request has been accepted */
  Accepted = "Accepted",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being deleted */
  Deleting = "Deleting",
}

/**
 * The provisioning state of a resource. \
 * {@link KnownGalleryProvisioningState} can be used interchangeably with GalleryProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The resource create request has been accepted \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Deleting**: The resource is being deleted
 */
export type GalleryProvisioningState = string;

/** Employee update request body */
export interface GalleryEmployeeUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: GalleryEmployeeUpdateProperties;
}

export function galleryEmployeeUpdateSerializer(item: GalleryEmployeeUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : galleryEmployeeUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Employee update properties */
export interface GalleryEmployeeUpdateProperties {
  /** Age of employee */
  age?: number;
  /** City of employee */
  city?: string;
  /** Profile of employee */
  profile?: Uint8Array;
}

export function galleryEmployeeUpdatePropertiesSerializer(
  item: GalleryEmployeeUpdateProperties,
): any {
  return {
    age: item["age"],
    city: item["city"],
    profile: !item["profile"] ? item["profile"] : uint8ArrayToString(item["profile"], "base64url"),
  };
}

export function galleryEmployeeArraySerializer(result: Array<GalleryEmployee>): any[] {
  return result.map((item) => {
    return galleryEmployeeSerializer(item);
  });
}

export function galleryEmployeeArrayDeserializer(result: Array<GalleryEmployee>): any[] {
  return result.map((item) => {
    return galleryEmployeeDeserializer(item);
  });
}

/** Employee move request */
export interface GalleryMoveRequest {
  /** The moving from location */
  from: string;
  /** The moving to location */
  to: string;
}

export function galleryMoveRequestSerializer(item: GalleryMoveRequest): any {
  return { from: item["from"], to: item["to"] };
}

/** Employee move response */
export interface GalleryMoveResponse {
  /** The status of the move */
  movingStatus: string;
}

export function galleryMoveResponseDeserializer(item: any): GalleryMoveResponse {
  return {
    movingStatus: item["movingStatus"],
  };
}
