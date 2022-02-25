// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  BatchRequest,
  RouteDirectionParameters,
  RouteDirections,
  RouteDirectionsBatchResult,
  RouteMatrixQuery,
  RouteMatrixResult,
  RouteRangeResult,
  AlternativeRouteType,
  ComputeTravelTime,
  InclineLevel,
  Report,
  RouteAvoidType,
  RouteInstructionsType,
  RouteRepresentationForBestOrder,
  RouteType,
  SectionType,
  TravelMode,
  VehicleEngineType,
  VehicleLoadType,
  WindingnessLevel,
  KnownAlternativeRouteType,
  KnownComputeTravelTime,
  KnownInclineLevel,
  KnownReport,
  KnownRouteAvoidType,
  KnownRouteInstructionsType,
  KnownRouteRepresentationForBestOrder,
  KnownRouteType,
  KnownSectionType,
  KnownTravelMode,
  KnownVehicleEngineType,
  KnownVehicleLoadType,
  KnownWindingnessLevel,
} from "../generated/models";

/**
 * Latitude/Longitude Pair
 */
export interface LatLon {
  latitude: number;
  longitude: number;
}
