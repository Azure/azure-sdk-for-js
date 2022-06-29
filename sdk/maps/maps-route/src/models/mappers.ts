// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BatchRequest, ErrorResponse, RouteDirectionsBatchResult } from "src/generated";
import { LatLon } from "./models";
import { RouteDirectionsOptions, RouteDirectionsRequest } from "./options";
import { BatchResult, RouteDirections } from "./results";

/**
 * @internal
 */
export function toLatLonString(coordinates: LatLon): string {
  return `${coordinates.latitude},${coordinates.longitude}`;
}

/**
 * @internal
 */
export function toNumericArray(coordinates: LatLon): number[] {
  return [coordinates.latitude, coordinates.longitude];
}

/**
 * @internal
 */
export function toColonDelimitedLatLonString(coordinates: LatLon[]): string {
  return coordinates.map((c) => toLatLonString(c)).join(":");
}

/**
 * @Internal
 */
export function mapRouteDirectionsBatchResult(
  internalResult: RouteDirectionsBatchResult
): BatchResult<RouteDirections> {
  const result: BatchResult<RouteDirections> = {
    totalRequests: internalResult.batchSummary.totalRequests,
    totalSuccessfulRequests: internalResult.batchSummary.totalSuccessfulRequests,
    batchItems: internalResult.batchItems?.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: item.response,
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    }),
  };
  return result;
}

/* Batch request mappers */

/**
 * @internal
 */
const clientToServiceNames: Readonly<Record<string, string>> = {
  inclineLevel: "hilliness",
  useTrafficData: "traffic",
  isCommercialVehicle: "vehicleCommercial",
  constantSpeedConsumptionInLitersPerHundredKm: "constantSpeedConsumptionInLitersPerHundredkm",
  fuelEnergyDensityInMegajoulesPerLiter: "fuelEnergyDensityInMJoulesPerLiter",
  constantSpeedConsumptionInKwHPerHundredKm: "constantSpeedConsumptionInkWhPerHundredkm",
  currentChargeInKwH: "currentChargeInkWh",
  maxChargeInKwH: "maxChargeInkWh",
  auxiliaryPowerInKw: "auxiliaryPowerInkW",
  computeTravelTime: "computeTravelTimeFor",
  filterSectionType: "sectionType",
  computeBestWaypointOrder: "computeBestOrder",
  routeRepresentationForBestOrder: "routeRepresentation",
};

/**
 * @internal
 */
function createPartialQueryStringFromOptions(options: RouteDirectionsOptions): string {
  let partialQuery = "";
  for (const [k, v] of Object.entries(options)) {
    // Skip if no value
    if (typeof v === "undefined" || v === null) continue;
    // Check name mappings: primitive values
    if (k in clientToServiceNames) {
      partialQuery += `&${clientToServiceNames[k]}=${v}`;
      // Check name mappings: Array values
    } else if ((k === "departAt" || k === "arriveAt") && v instanceof Date) {
      partialQuery += `&${k}=${v.toISOString()}`;
    } else {
      partialQuery += `&${k}=${v}`;
    }
  }
  return partialQuery;
}
/**
 * @internal
 */
export function createRouteDirectionsBatchRequest(
  requests: RouteDirectionsRequest[]
): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      // Add top level query parameters
      let queryText = `?query=${toColonDelimitedLatLonString(r.routePoints)}`;

      // Add optional query parameters
      if (r.options) {
        queryText += createPartialQueryStringFromOptions(r.options);
      }
      return { query: queryText };
    }),
  };
}
