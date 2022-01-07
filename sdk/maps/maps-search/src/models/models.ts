// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GeoJsonFeature,
  GeoJsonFeatureCollection,
  GeoJsonGeometryCollection,
  GeoJsonPoint,
  GeoJsonPolygon
} from "./geojsons";

export {
  SearchIndexes,
  KnownSearchIndexes,
  GeographicEntityType,
  KnownGeographicEntityType,
  LocalizedMapView,
  KnownLocalizedMapView,
  QueryType,
  KnownQueryType,
  SearchAddressResultType,
  KnownSearchAddressResultType,
  MatchType,
  KnownMatchType,
  EntryPointType,
  KnownEntryPointType,
  ElectricVehicleConnector,
  KnownElectricVehicleConnector,
  OperatingHoursRange,
  KnownOperatingHoursRange,
  RoadUseType,
  KnownRoadUseType,
  PointOfInterest,
  GeometryIdentifier,
  DataSource,
  BrandName,
  Classification,
  ClassificationName,
  PointOfInterestCategorySet,
  OperatingHours,
  OperatingHoursTimeRange,
  OperatingHoursTime,
  PointOfInterestCategoryTreeResult,
  PointOfInterestCategory
} from "../generated/models";

/**
 * Bounding Box
 */
export interface BoundingBox {
  /** Top left corner of the bounding box */
  topLeft: LatLon;
  /** Bottom right corner of the bounding box */
  bottomRight: LatLon;
}

/**
 * Latitude/Longitude Pair
 */
export interface LatLon {
  latitude: number;
  longitude: number;
}

/**
 * Structured address
 */
export interface StructuredAddress {
  /** The 2 or 3 letter [ISO3166-1](https://www.iso.org/iso-3166-country-codes.html) country code portion of an address. E.g. US. */
  countryCode: string;
  /** The street number portion of an address */
  streetNumber?: string;
  /** The street name portion of an address */
  streetName?: string;
  /** The cross street name for the structured address */
  crossStreet?: string;
  /** The municipality portion of an address */
  municipality?: string;
  /** The municipality subdivision (sub/super city) for the structured address */
  municipalitySubdivision?: string;
  /** The named area for the structured address */
  countryTertiarySubdivision?: string;
  /** The county for the structured address */
  countrySecondarySubdivision?: string;
  /** The country subdivision portion of an address */
  countrySubdivision?: string;
  /** The postal code portion of an address */
  postalCode?: string;
}

/**
 * Entity Geometry
 */
export interface EntityGeometry {
  /**  ID of the returned entity */
  readonly providerID?: string;
  /** Geometry data in GeoJSON FeatureCollection format. */
  geometryData?: GeoJsonFeatureCollection;
}

/**
 * GeoJSON Geomtry Collection containing only polygons
 */
export interface GeoJsonPolygonCollection extends GeoJsonGeometryCollection {
  geometries: GeoJsonPolygon[];
}

/**
 * GeoJSON Feature that is either polygon or circle
 */
export interface GeoJsonPolygonFeature extends GeoJsonFeature {
  geometry: GeoJsonPolygon;
}

export interface GeoJsonCircleFeature extends GeoJsonFeature {
  geometry: GeoJsonPoint;
  properties: {
    subType: "Circle";
    radius: number;
  };
}

export type GeoJsonCircleOrPolygonFeature = GeoJsonPolygonFeature | GeoJsonCircleFeature;
/**
 * GeoJSON Feature Collection containing only polygons or circles
 */
export interface GeoJsonCircleOrPolygonFeatureCollection extends GeoJsonFeatureCollection {
  features: GeoJsonCircleOrPolygonFeature[];
}

export type SearchGeometry =
  | GeoJsonPolygon
  | GeoJsonPolygonCollection
  | GeoJsonCircleOrPolygonFeatureCollection;
