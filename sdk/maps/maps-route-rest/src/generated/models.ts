// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface RouteMatrixQuery {
  /** A valid `GeoJSON MultiPoint` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.3) for details. */
  origins: GeoJsonMultiPoint;
  /** A valid `GeoJSON MultiPoint` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.3) for details. */
  destinations: GeoJsonMultiPoint;
}

export interface GeoJsonMultiPoint
  extends GeoJsonGeometryBase,
    GeoJsonMultiPointData {
  type: "MultiPoint";
}

export interface GeoJsonGeometryBase extends GeoJsonObjectBase {
  type:
    | "GeoJsonGeometry"
    | "MultiPoint"
    | "MultiPolygon"
    | "Point"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "GeometryCollection";
}

export interface GeoJsonObjectBase {
  type:
    | "GeoJsonObject"
    | "GeoJsonGeometry"
    | "MultiPoint"
    | "MultiPolygon"
    | "Point"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "GeometryCollection"
    | "Feature"
    | "FeatureCollection";
}

export interface GeoJsonMultiPointData {
  /** Coordinates for the `GeoJson MultiPoint` geometry. */
  coordinates: Array<Array<number>>;
}

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
  supportingPoints?: Record<string, unknown>;
  /** This is a list of 3-character, ISO 3166-1, alpha-3 country codes of countries in which all toll roads with vignettes are to be avoided, e.g. "AUS,CHE". Toll roads with vignettes in countries not in the list are unaffected. Note: It is an error to specify both **avoidVignette** and **allowVignette**. */
  avoidVignette?: Array<string>;
  /** This is a list of 3-character, ISO 3166-1, alpha-3 country codes of countries in which toll roads with vignettes are allowed, e.g. "AUS,CHE". Specifying **allowVignette** with some countries X is equivalent to specifying **avoidVignette** with all countries but X. Specifying **allowVignette** with an empty list is the same as avoiding all toll roads with vignettes. Note: It is an error to specify both **avoidVignette** and **allowVignette**. */
  allowVignette?: Array<string>;
  /** A GeoJSON MultiPolygon representing list of areas to avoid. Only rectangle polygons are supported. The maximum size of a rectangle is about 160x160 km. Maximum number of avoided areas is **10**. It cannot cross the 180th meridian. It must be between -80 and +80 degrees of latitude. */
  avoidAreas?: GeoJsonMultiPolygon;
}

export interface GeoJsonMultiPolygon
  extends GeoJsonGeometryBase,
    GeoJsonMultiPolygonData {
  type: "MultiPolygon";
}

export interface GeoJsonMultiPolygonData {
  /** Contains a list of valid `GeoJSON Polygon` objects. **Note** that coordinates in GeoJSON are in x, y order (longitude, latitude). */
  coordinates: Array<Array<Array<Array<number>>>>;
}

export interface BatchRequest {
  /** The list of queries to process. */
  batchItems?: Array<BatchRequestItem>;
}

export interface BatchRequestItem {
  /** This parameter contains a query string used to perform an unstructured geocoding operation. The query string will be passed verbatim to the search API for processing. */
  query?: string;
}

export interface GeoJsonPoint extends GeoJsonGeometryBase, GeoJsonPointData {
  type: "Point";
}

export interface GeoJsonPointData {
  /** A `Position` is an array of numbers with two or more elements. The first two elements are _longitude_ and _latitude_, precisely in that order. _Altitude/Elevation_ is an optional third element. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.1) for details. */
  coordinates: Array<number>;
}

export interface GeoJsonLineString
  extends GeoJsonGeometryBase,
    GeoJsonLineStringData {
  type: "LineString";
}

export interface GeoJsonLineStringData {
  /** Coordinates for the `GeoJson LineString` geometry. */
  coordinates: Array<Array<number>>;
}

export interface GeoJsonMultiLineString
  extends GeoJsonGeometryBase,
    GeoJsonMultiLineStringData {
  type: "MultiLineString";
}

export interface GeoJsonMultiLineStringData {
  /** Coordinates for the `GeoJson MultiLineString` geometry. */
  coordinates: Array<Array<Array<number>>>;
}

export interface GeoJsonPolygon
  extends GeoJsonGeometryBase,
    GeoJsonPolygonData {
  type: "Polygon";
}

export interface GeoJsonPolygonData {
  /** Coordinates for the `GeoJson Polygon` geometry type. */
  coordinates: Array<Array<Array<number>>>;
}

export interface GeoJsonGeometryCollection
  extends GeoJsonGeometryBase,
    GeoJsonGeometryCollectionData {
  type: "GeometryCollection";
}

export interface GeoJsonGeometryCollectionData {
  /** Contains a list of valid `GeoJSON` geometry objects. **Note** that coordinates in GeoJSON are in x, y order (longitude, latitude). */
  geometries: Array<GeoJsonGeometry>;
}

export interface GeoJsonFeature extends GeoJsonObjectBase, GeoJsonFeatureData {
  type: "Feature";
}

export interface GeoJsonFeatureData {
  /** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
  geometry: GeoJsonGeometry;
  /** Properties can contain any additional metadata about the `Feature`. Value can be any JSON object or a JSON null value */
  properties?: Record<string, unknown>;
  /** Identifier for the feature. */
  id?: string;
  /** The type of the feature. The value depends on the data model the current feature is part of. Some data models may have an empty value. */
  featureType?: string;
}

export interface GeoJsonFeatureCollection
  extends GeoJsonObjectBase,
    GeoJsonFeatureCollectionData {
  type: "FeatureCollection";
}

export interface GeoJsonFeatureCollectionData {
  /** Contains a list of valid `GeoJSON Feature` objects. */
  features: Array<GeoJsonFeature>;
}

export type GeoJsonGeometry =
  | GeoJsonGeometryBase
  | GeoJsonMultiPoint
  | GeoJsonMultiPolygon
  | GeoJsonPoint
  | GeoJsonLineString
  | GeoJsonMultiLineString
  | GeoJsonPolygon
  | GeoJsonGeometryCollection;
export type GeoJsonObject =
  | GeoJsonGeometry
  | GeoJsonMultiPoint
  | GeoJsonMultiPolygon
  | GeoJsonPoint
  | GeoJsonLineString
  | GeoJsonMultiLineString
  | GeoJsonPolygon
  | GeoJsonGeometryCollection
  | GeoJsonFeature
  | GeoJsonFeatureCollection;
