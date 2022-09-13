// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchRequest,
  ErrorResponse,
  LatLongPair,
  RouteDirectionsBatchResult,
  RouteGetRouteDirectionsResponse,
  RouteGetRouteRangeResponse,
} from "src/generated";
import { BatchResult, RouteDirections, RouteRangeResult } from "./results";
import { RouteDirectionsOptions, RouteDirectionsRequest } from "./options";
import { LatLon, RouteMatrixResult, RouteSummary } from "./models";

/**
 * @internal
 */
export function toLatLonString(coordinates: LatLon): string {
  return `${coordinates[0]},${coordinates[1]}`;
}

/**
 * @internal
 */
export function toLatLonTuple(coordinates: LatLongPair): LatLon {
  return [coordinates.latitude, coordinates.longitude];
}

/**
 * @internal
 */
export function toColonDelimitedLatLonString(coordinates: LatLon[]): string {
  return coordinates.map((c) => toLatLonString(c)).join(":");
}

/**
 * If the response returned from `resume*` method, the Date will be serialized to string.
 * We need to convert it back manually.
 */
function mapRouteSummary({
  arrivalTime,
  departureTime,
  ...restSummary
}: RouteSummary): RouteSummary {
  return {
    arrivalTime: new Date(arrivalTime),
    departureTime: new Date(departureTime),
    ...restSummary,
  };
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
          response: {
            ...item.response,
            routes: item.response.routes.map(({ summary, legs, ...restRoute }) => ({
              summary: mapRouteSummary(summary),
              legs: legs.map(({ summary: legSummary, ...restLeg }) => ({
                summary: mapRouteSummary(legSummary),
                ...restLeg,
              })),
              ...restRoute,
            })),
          },
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    }),
  };
  return result;
}

/**
 * @internal
 */
export function mapRouteMatrixResult({
  matrix,
  ...restResult
}: RouteMatrixResult): RouteMatrixResult {
  return {
    matrix: matrix.map((row) =>
      row.map(({ routeSummary, ...rest }) => ({
        ...(routeSummary && { routeSummary: mapRouteSummary(routeSummary) }),
        ...rest,
      }))
    ),
    ...restResult,
  };
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

/**
 * @internal
 */
export function mapResponseToRouteDirections({
  routes,
  ...restResponse
}: RouteGetRouteDirectionsResponse): RouteDirections {
  return {
    routes: routes.map(({ legs, guidance, ...restRoute }) => ({
      legs: legs.map((leg) => ({
        ...leg,
        points: leg.points.map(toLatLonTuple),
      })),
      ...(guidance && {
        guidance: {
          instructionGroups: guidance.instructionGroups,
          instructions: guidance.instructions.map(({ point, ...instruction }) => ({
            ...(point && { point: toLatLonTuple(point) }),
            ...instruction,
          })),
        },
      }),
      ...restRoute,
    })),
    ...restResponse,
  };
}

/**
 * @internal
 */
export function mapResponseToRouteRangeResult({
  reachableRange,
  ...restResponse
}: RouteGetRouteRangeResponse): RouteRangeResult {
  return {
    reachableRange: {
      center: toLatLonTuple(reachableRange.center),
      boundary: reachableRange.boundary.map(toLatLonTuple),
    },
    ...restResponse,
  };
}
