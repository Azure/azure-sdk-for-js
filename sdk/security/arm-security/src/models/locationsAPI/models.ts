// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The ASC location of the subscription is in the "name" field */
export interface LocationsAPIAscLocation extends ProxyResource {
  /** An empty set of properties */
  properties?: any;
}

export function locationsAPIAscLocationDeserializer(item: any): LocationsAPIAscLocation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: item["properties"],
  };
}

/** List of locations where ASC saves your data */
export interface _LocationsAPIAscLocationList {
  /** List of locations */
  readonly value?: LocationsAPIAscLocation[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _locationsAPIAscLocationListDeserializer(item: any): _LocationsAPIAscLocationList {
  return {
    value: !item["value"] ? item["value"] : locationsAPIAscLocationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function locationsAPIAscLocationArrayDeserializer(
  result: Array<LocationsAPIAscLocation>,
): any[] {
  return result.map((item) => {
    return locationsAPIAscLocationDeserializer(item);
  });
}
