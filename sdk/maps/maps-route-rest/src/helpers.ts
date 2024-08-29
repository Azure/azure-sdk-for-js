// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LatLon } from "@azure/maps-common";
import { BatchRequest, RouteGetRouteDirectionsQueryParamProperties } from "./generated";

function toLatLonString(coordinates: LatLon): string {
  return `${coordinates[0]},${coordinates[1]}`;
}

/**
 * Transform an array of [Latitude, Longtitute] to a string in the following format:
 * "Latitude_1,Longtitute_1:Latitude_2,Longtitute_2:..."
 *
 * @param coordinates - An array of Latitude/Longtitute pair to transform.
 * @returns The transformed string.
 */
export function toColonDelimitedLatLonString(coordinates: LatLon[]): string {
  return coordinates.map((c) => toLatLonString(c)).join(":");
}

/**
 * Create a batch request body of a bunch of route direction requests.
 *
 * @param queryParamProperties - An object of the query parameters for a route direction request
 * @returns The composed batch request.
 */
export function createRouteDirectionsBatchRequest(
  queryParamProperties: RouteGetRouteDirectionsQueryParamProperties[],
): BatchRequest {
  return {
    batchItems: queryParamProperties.map((queryParam) => ({
      query:
        "?" +
        Object.entries(queryParam)
          .map(([k, v]) => {
            // Skip if no value
            if (typeof v === "undefined" || v === null) {
              return "";
            }
            // Check name mappings: Array values
            if ((k === "departAt" || k === "arriveAt") && v instanceof Date) {
              return `${k}=${v.toISOString()}`;
            }
            return `${k}=${v}`;
          })
          .filter((s) => s !== "")
          .join("&"),
    })),
  };
}
