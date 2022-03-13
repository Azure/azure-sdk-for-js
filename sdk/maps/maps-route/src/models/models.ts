// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeoJsonGeometryCollection, GeoJsonMultiPolygon } from "./geojsons";

export {
  BatchRequest,
  RouteDirectionsBatchResult,
  RouteMatrixResult,
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
  RouteOptimizedWaypoint,
  RouteReport,
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

/** Post body parameters for Route directions. */
export interface RouteDirectionParameters {
  /**
   * A GeoJSON Geometry collection representing sequence of coordinates used as input for route reconstruction and for calculating zero or more alternative routes to this reference route.
   *   - The provided sequence of supporting points is used as input for route reconstruction.
   *   - The alternative routes are calculated between the origin and destination points specified in the base path parameter locations.
   *   - If both _minDeviationDistance_ and _minDeviationTime_ are set to zero, then these origin and destination points are
   *   expected to be at (or very near) the beginning and end of the reference route, respectively.
   *   - Intermediate locations (_waypoints_) are not supported when using <_supportingPoints_>.
   *   - The reference route may contain traffic incidents of type _ROAD_CLOSURE_, which are
   *   ignored for the calculation of the reference route's travel time and traffic delay.
   */
  supportingPoints?: GeoJsonGeometryCollection;
  /** This is a list of 3-character, ISO 3166-1, alpha-3 country codes of countries in which all toll roads with vignettes are to be avoided, e.g. "AUS,CHE". Toll roads with vignettes in countries not in the list are unaffected. Note: It is an error to specify both **avoidVignette** and **allowVignette**. */
  avoidVignette?: string[];
  /** This is a list of 3-character, ISO 3166-1, alpha-3 country codes of countries in which toll roads with vignettes are allowed, e.g. "AUS,CHE". Specifying **allowVignette** with some countries X is equivalent to specifying **avoidVignette** with all countries but X. Specifying **allowVignette** with an empty list is the same as avoiding all toll roads with vignettes. Note: It is an error to specify both **avoidVignette** and **allowVignette**. */
  allowVignette?: string[];
  /** A GeoJSON MultiPolygon representing list of areas to avoid. Only rectangle polygons are supported. The maximum size of a rectangle is about 160x160 km. Maximum number of avoided areas is **10**. It cannot cross the 180th meridian. It must be between -80 and +80 degrees of latitude. */
  avoidAreas?: GeoJsonMultiPolygon;
}
