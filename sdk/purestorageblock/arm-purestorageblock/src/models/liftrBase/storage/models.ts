// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { TrackedResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";
import type { MarketplaceDetails, UserDetails, ProvisioningState } from "../models.js";
import {
  marketplaceDetailsSerializer,
  marketplaceDetailsDeserializer,
  userDetailsSerializer,
  userDetailsDeserializer,
} from "../models.js";

/** Pure Storage cloud service resource type, also called reservation */
export interface Reservation extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ReservationPropertiesBaseResourceProperties;
}

export function reservationSerializer(item: Reservation): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : reservationPropertiesBaseResourcePropertiesSerializer(item["properties"]),
  };
}

export function reservationDeserializer(item: any): Reservation {
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
      : reservationPropertiesBaseResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Reservation resource. */
export interface ReservationPropertiesBaseResourceProperties {
  /** Pure Storage's internal ID for the reservation */
  readonly reservationInternalId?: string;
  /** Marketplace details */
  marketplace: MarketplaceDetails;
  /** User details */
  user?: UserDetails;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function reservationPropertiesBaseResourcePropertiesSerializer(
  item: ReservationPropertiesBaseResourceProperties,
): any {
  return {
    marketplace: marketplaceDetailsSerializer(item["marketplace"]),
    user: !item["user"] ? item["user"] : userDetailsSerializer(item["user"]),
  };
}

export function reservationPropertiesBaseResourcePropertiesDeserializer(
  item: any,
): ReservationPropertiesBaseResourceProperties {
  return {
    reservationInternalId: item["reservationInternalId"],
    marketplace: marketplaceDetailsDeserializer(item["marketplace"]),
    user: !item["user"] ? item["user"] : userDetailsDeserializer(item["user"]),
    provisioningState: item["provisioningState"],
  };
}

export function reservationArraySerializer(result: Array<Reservation>): any[] {
  return result.map((item) => {
    return reservationSerializer(item);
  });
}

export function reservationArrayDeserializer(result: Array<Reservation>): any[] {
  return result.map((item) => {
    return reservationDeserializer(item);
  });
}
