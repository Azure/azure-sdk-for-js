// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchRequest,
  ErrorResponse,
  LatLongPair,
  Route as RouteInternal,
  RouteDirections as RouteDirectionsInternal,
  RouteDirectionsBatchResult,
  RouteGuidance as RouteGuidanceInternal,
  RouteInstruction as RouteInstructionInternal,
  RouteLeg as RouteLegInternal,
  RouteRange as RouteRangeInternal,
  RouteRangeResult as RouteRangeResultInternal,
} from "src/generated";
import { LatLon } from "./models";
import { RouteDirectionsOptions, RouteDirectionsRequest } from "./options";
import {
  BatchResult,
  Route,
  RouteDirections,
  RouteGuidance,
  RouteInstruction,
  RouteLeg,
  RouteRange,
  RouteRangeResult,
} from "./results";

/**
 * @internal
 */
export function toLatLon(lat: number, lon: number): LatLon {
  return {
    latitude: lat,
    longitude: lon,
  };
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
export function toLatLonString(coordinates: LatLon): string {
  return `${coordinates.latitude},${coordinates.longitude}`;
}

/**
 * @internal
 */
export function toColonDelimitedLatLonString(coordinates: LatLon[]): string {
  return coordinates.map((c) => toLatLonString(c)).join(":");
}

/**
 * @internal
 */
export function removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
}

/**
 * @internal
 */
export function mapLatLongPairToLatLon(latLongPair?: LatLongPair): LatLon | undefined {
  if (latLongPair && latLongPair.latitude && latLongPair.longitude) {
    return toLatLon(latLongPair.latitude, latLongPair.longitude);
  } else {
    return undefined;
  }
}

export function mapLatLongPairArrayToLatLonArray(latLongPairArray: LatLongPair[]): LatLon[] {
  const latLonArray: LatLon[] = [];
  latLongPairArray.forEach((p) => {
    if (p && p.latitude && p.longitude) {
      latLonArray.push(toLatLon(p.latitude, p.longitude));
    }
  });
  return latLonArray;
}

/* Result mappers */

/**
 * @internal
 */
export function mapRouteRange(routeRange?: RouteRangeInternal): RouteRange | undefined {
  if (routeRange) {
    const mappedRouteRange: RouteRange = {
      center: mapLatLongPairToLatLon(routeRange.center),
      boundary:
        routeRange.boundary && Array.isArray(routeRange.boundary)
          ? mapLatLongPairArrayToLatLonArray(routeRange.boundary)
          : undefined,
    };
    return removeUndefinedProperties(mappedRouteRange);
  }
  return undefined;
}

/**
 * @internal
 */
export function mapRouteRangeResult(routeRangeResult: RouteRangeResultInternal): RouteRangeResult {
  const mappedRouteRangeResult: RouteRangeResult = {
    formatVersion: routeRangeResult.formatVersion,
    reachableRange: mapRouteRange(routeRangeResult.reachableRange),
    report: routeRangeResult.report,
  };
  return removeUndefinedProperties(mappedRouteRangeResult);
}

/**
 * @internal
 */
export function mapRouteDirections(routeDirections: RouteDirectionsInternal): RouteDirections {
  const mappedRouteDirections: RouteDirections = {
    formatVersion: routeDirections.formatVersion,
    routes: routeDirections.routes ? mapRoutes(routeDirections.routes) : undefined,
    optimizedWaypoints: routeDirections.optimizedWaypoints,
    report: routeDirections.report,
  };
  return mappedRouteDirections;
}

/**
 * @internal
 */
export function mapRoutes(routes: RouteInternal[]): Route[] {
  return routes.map((r) => {
    return {
      summary: r.summary,
      legs: mapRouteLeg(r.legs),
      sections: r.sections,
      guidance: r.guidance ? mapRouteGuidance(r.guidance) : undefined,
    };
  });
}

/**
 * @internal
 */
export function mapRouteLeg(legs: RouteLegInternal[]): RouteLeg[] {
  return legs.map((l) => {
    return {
      summary: l.summary,
      points: mapLatLongPairArrayToLatLonArray(l.points),
    };
  });
}

/**
 * @internal
 */
export function mapRouteGuidance(guidance: RouteGuidanceInternal): RouteGuidance {
  return {
    instructions: guidance.instructions.map((i) => mapRouteInstruction(i)),
    instructionGroups: guidance.instructionGroups,
  };
}

/**
 * @internal
 */
export function mapRouteInstruction(instruction: RouteInstructionInternal): RouteInstruction {
  return {
    ...instruction,
    point:
      instruction.point && instruction.point.latitude && instruction.point.longitude
        ? { latitude: instruction.point.latitude, longitude: instruction.point.longitude }
        : undefined,
  };
}

/**
 * @Internal
 */
export function mapRouteDirectionsBatchResult(
  internalResult: RouteDirectionsBatchResult
): BatchResult<RouteDirections> {
  const result: BatchResult<RouteDirections> = {
    totalRequests: internalResult.batchSummary?.totalRequests,
    successfulRequests: internalResult.batchSummary?.successfulRequests,
    batchItems: internalResult.batchItems?.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: mapRouteDirections(item.response as RouteDirectionsInternal),
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
