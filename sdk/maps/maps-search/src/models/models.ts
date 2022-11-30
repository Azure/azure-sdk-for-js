// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BBox,
  BBox2D,
  BBox3D,
  BoundingBox,
  GeoJsonFeature,
  GeoJsonFeatureCollection,
  GeoJsonGeometry,
  GeoJsonGeometryCollection,
  GeoJsonLineString,
  GeoJsonMultiLineString,
  GeoJsonMultiPoint,
  GeoJsonMultiPolygon,
  GeoJsonObject,
  GeoJsonPoint,
  GeoJsonPolygon,
  GeoJsonType,
  GeometryType,
  LatLon,
  Position,
  Position2D,
  Position3D,
} from "@azure/maps-common";

export {
  GeoJsonGeometryCollection,
  GeoJsonPolygon,
  GeoJsonFeature,
  GeoJsonPoint,
  GeoJsonFeatureCollection,
  LatLon,
  BoundingBox,
  GeoJsonLineString,
  Position,
  Position2D,
  Position3D,
  BBox,
  BBox2D,
  BBox3D,
  GeometryType,
  GeoJsonType,
  GeoJsonMultiPoint,
  GeoJsonMultiLineString,
  GeoJsonMultiPolygon,
  GeoJsonObject,
  GeoJsonGeometry,
};

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
  Brand,
  Classification,
  ClassificationName,
  PointOfInterestCategorySet,
  OperatingHours,
  OperatingHoursTimeRange,
  OperatingHoursTime,
  PointOfInterestCategoryTreeResult,
  PointOfInterestCategory,
  ErrorResponse,
  ErrorDetail,
} from "../generated/models";

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
/**
 * The exact type of "Circle" feature in the GeoJson format
 */
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
/**
 * The union type of several GeoJSON geometry object which is available for search.
 */
export type SearchGeometry =
  | GeoJsonPolygon
  | GeoJsonPolygonCollection
  | GeoJsonCircleOrPolygonFeatureCollection;
