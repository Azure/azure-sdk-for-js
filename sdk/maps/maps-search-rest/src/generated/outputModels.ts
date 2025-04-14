// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** This object is returned from a successful Geocoding call */
export interface GeocodingResponseOutput {
  /** The type of a FeatureCollection object must be FeatureCollection. */
  type?: "FeatureCollection";
  features?: Array<FeaturesItemOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

export interface FeaturesItemOutput {
  /** The type of a feature must be Feature. */
  type?: "Feature";
  /** ID for feature returned */
  id?: string;
  properties?: FeaturesItemPropertiesOutput;
  /** A valid `GeoJSON Point` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.2) for details. */
  geometry: GeoJsonPointOutput;
  /** Bounding box. Projection used - EPSG:3857. Please refer to [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946#section-5) for details. */
  bbox?: Array<number>;
}

export interface FeaturesItemPropertiesOutput {
  /**
   * One of:
   * * Address
   * * RoadBlock
   * * RoadIntersection
   * * Neighborhood
   * * PopulatedPlace
   * * Postcode1
   * * AdminDivision1
   * * AdminDivision2
   * * CountryRegion
   */
  type?: string;
  /**
   * The level of confidence that the geocoded location result is a match. Use this value with the match code to determine for more complete information about the match.
   *
   * The confidence of a geocoded location is based on many factors including the relative importance of the geocoded location and the user’s location, if specified.
   */
  confidence?: "High" | "Medium" | "Low";
  /**
   * One or more match code values that represent the geocoding level for each location in the response.
   *
   * For example, a geocoded location with match codes of `Good` and `Ambiguous` means that more than one geocode location was found for the location information and that the geocode service did not have search up-hierarchy to find a match.
   *
   * Similarly, a geocoded location with match codes of `Ambiguous` and `UpHierarchy` implies that a geocode location could not be found that matched all the provided location information, so the geocode service had to search up-hierarchy and found multiple matches at that level. An example of up an `Ambiguous` and `UpHierarchy` result is when you provide complete address information, but the geocode service cannot locate a match for the street address and instead returns information for more than one RoadBlock value.
   *
   * The possible values are:
   *
   * `Good`: The location has only one match or all returned matches are considered strong matches. For example, a query for New York returns several Good matches.
   *
   * `Ambiguous`: The location is one of a set of possible matches. For example, when you query for the street address 128 Main St., the response may return two locations for 128 North Main St. and 128 South Main St. because there is not enough information to determine which option to choose.
   *
   * `UpHierarchy`: The location represents a move up the geographic hierarchy. This occurs when a match for the location request was not found, so a less precise result is returned. For example, if a match for the requested address cannot be found, then a match code of `UpHierarchy` with a RoadBlock entity type may be returned.
   */
  matchCodes?: Array<"Good" | "Ambiguous" | "UpHierarchy">;
  /** The address of the result */
  address?: AddressOutput;
  /** A collection of geocode points that differ in how they were calculated and their suggested use. */
  geocodePoints?: Array<GeocodePointsItemOutput>;
}

/** The address of the result */
export interface AddressOutput {
  /** AddressLine that includes Street Name and Number */
  addressLine?: string;
  /** locality property */
  locality?: string;
  /** neighborhood property */
  neighborhood?: string;
  /** The subdivision name in the country or region for an address. This element is typically treated as the first order administrative subdivision, but in some cases it also contains the second, third, or fourth order subdivision in a country, dependency, or region. */
  adminDistricts?: Array<AddressAdminDistrictsItemOutput>;
  /** Postal Code property */
  postalCode?: string;
  countryRegion?: AddressCountryRegionOutput;
  /** Formatted Address property */
  formattedAddress?: string;
  /** The address of the result. */
  intersection?: IntersectionOutput;
}

export interface AddressAdminDistrictsItemOutput {
  /**
   * The name for the corresponding adminDistrict field,
   * For adminDistrict[0], this could be full name of state such as Washington,
   * For adminDistrict[1], this could be the full name of the county
   */
  name?: string;
  /**
   * The short name for the corresponding adminDistrict field,
   * For adminDistrict[0], this could be short name of state such as WA,
   * For adminDistrict[1], this could be the short name of the county
   */
  shortName?: string;
}

export interface AddressCountryRegionOutput {
  /** ISO of country/region */
  ISO?: string;
  /** name of country/region */
  name?: string;
}

/** The address of the result. */
export interface IntersectionOutput {
  /** Primary street for the location. */
  baseStreet?: string;
  /** The first intersecting street. */
  secondaryStreet1?: string;
  /** If any, the second intersecting street. */
  secondaryStreet2?: string;
  /** Type of intersection. */
  intersectionType?: string;
  /** Complete name of the intersection. */
  displayName?: string;
}

export interface GeocodePointsItemOutput {
  /** A valid `GeoJSON Point` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.2) for details. */
  geometry?: GeoJsonPointOutput;
  /** The method that was used to compute the geocode point. */
  calculationMethod?:
    | "Interpolation"
    | "InterpolationOffset"
    | "Parcel"
    | "Rooftop";
  /**
   * The best use for the geocode point.
   * Each geocode point is defined as a `Route` point, a `Display` point or both.
   * Use `Route` points if you are creating a route to the location. Use `Display` points if you are showing the location on a map. For example, if the location is a park, a `Route` point may specify an entrance to the park where you can enter with a car, and a `Display` point may be a point that specifies the center of the park.
   */
  usageTypes?: Array<"Display" | "Route">;
}

/** A valid `GeoJSON Point` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.2) for details. */
export interface GeoJsonPointOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonPointDataOutput {
  type: "Point";
}

/** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
export interface GeoJsonGeometryOutputParent extends GeoJsonObjectOutputParent {
  type:
    | "GeoJsonGeometry"
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection";
}

/** A valid `GeoJSON` object. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3) for details. */
export interface GeoJsonObjectOutputParent {
  /** Bounding box. Projection used - EPSG:3857. Please refer to [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946#section-5) for details. */
  bbox?: Array<number>;
  type:
    | "GeoJsonObject"
    | "GeoJsonGeometry"
    | "Point"
    | "Feature"
    | "Boundary"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | "FeatureCollection";
}

/** Data contained by a `GeoJson Point`. */
export interface GeoJsonPointDataOutput {
  /** A `Position` is an array of numbers with two or more elements. The first two elements are _longitude_ and _latitude_, precisely in that order. _Altitude/Elevation_ is an optional third element. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.1) for details. */
  coordinates: Array<number>;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  readonly additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, unknown>;
}

/** This object is returned from a successful Geocoding Batch service call. */
export interface GeocodingBatchResponseOutput {
  /** Summary for the batch request */
  summary?: GeocodingBatchResponseSummaryOutput;
  /** Array containing the batch results. */
  batchItems?: Array<GeocodingBatchResponseItemOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

/** Summary for the batch request */
export interface GeocodingBatchResponseSummaryOutput {
  /** Number of successful requests in the batch */
  successfulRequests?: number;
  /** Total number of requests in the batch */
  totalRequests?: number;
}

export interface GeocodingBatchResponseItemOutput {
  /** id of the batchItem which would be the same as the id in the request */
  optionalId?: string;
  /** The type of a FeatureCollection object must be FeatureCollection. */
  type?: "FeatureCollection";
  features?: Array<FeaturesItemOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
  /** The error detail. */
  error?: ErrorDetailOutput;
}

/**
 * `GeoJSON GeocodingFeature` object that describe the boundaries of a geographical area. Geometry of the feature is described with `GeoJSON GeometryCollection`.
 *
 * Please note, the service typically returns a GeometryCollection with Polygon or MultiPolygon sub-types.
 */
export interface BoundaryOutput
  extends GeoJsonFeatureOutputParent,
    BoundaryPropertiesOutput {
  type: "Boundary";
}

/** A valid `GeoJSON Feature` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.2) for details. */
export interface GeoJsonFeatureOutputParent
  extends GeoJsonObjectOutputParent,
    GeoJsonFeatureDataOutput {
  type: "Feature" | "Boundary";
}

export interface GeoJsonFeatureDataOutput {
  /** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
  geometry: GeoJsonGeometryOutput;
  /** Properties can contain any additional metadata about the `Feature`. Value can be any JSON object or a JSON null value */
  properties?: Record<string, unknown>;
  /** Identifier for the feature. */
  id?: string;
  /** The type of the feature. The value depends on the data model the current feature is part of. Some data models may have an empty value. */
  featureType?: string;
}

/** Properties of a Boundary object. */
export interface BoundaryPropertiesOutput {
  /** The name associated with the geographical area. */
  name?: string;
  /** The copyright string. */
  copyright?: string;
  /** A URL that lists many of the data providers for Azure Maps and their related copyright information. */
  copyrightURL?: string;
  /** A collection of copyright information for each geometry of the Boundary object in the same order they appear. */
  geometriesCopyright?: Array<GeometryCopyrightOutput>;
}

/** Copyright information of a geometry of a Boundary object. */
export interface GeometryCopyrightOutput {
  /** The name of the data provider */
  sourceName?: string;
  /** The copyright string for the data provider */
  copyright?: string;
}

/** A valid `GeoJSON MultiPoint` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.3) for details. */
export interface GeoJsonMultiPointOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonMultiPointDataOutput {
  type: "MultiPoint";
}

/** Data contained by a `GeoJson MultiPoint`. */
export interface GeoJsonMultiPointDataOutput {
  /** Coordinates for the `GeoJson MultiPoint` geometry. */
  coordinates: Array<Array<number>>;
}

/** A valid `GeoJSON LineString` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.4) for details. */
export interface GeoJsonLineStringOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonLineStringDataOutput {
  type: "LineString";
}

export interface GeoJsonLineStringDataOutput {
  /** Coordinates for the `GeoJson LineString` geometry. */
  coordinates: Array<Array<number>>;
}

/** A valid `GeoJSON MultiLineString` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.5) for details. */
export interface GeoJsonMultiLineStringOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonMultiLineStringDataOutput {
  type: "MultiLineString";
}

export interface GeoJsonMultiLineStringDataOutput {
  /** Coordinates for the `GeoJson MultiLineString` geometry. */
  coordinates: Array<Array<Array<number>>>;
}

/** A valid `GeoJSON Polygon` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6) for details. */
export interface GeoJsonPolygonOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonPolygonDataOutput {
  type: "Polygon";
}

export interface GeoJsonPolygonDataOutput {
  /** Coordinates for the `GeoJson Polygon` geometry type. */
  coordinates: Array<Array<Array<number>>>;
}

/** A valid `GeoJSON MultiPolygon` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.7) for details. */
export interface GeoJsonMultiPolygonOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonMultiPolygonDataOutput {
  type: "MultiPolygon";
}

export interface GeoJsonMultiPolygonDataOutput {
  /** Contains a list of valid `GeoJSON Polygon` objects. **Note** that coordinates in GeoJSON are in x, y order (longitude, latitude). */
  coordinates: Array<Array<Array<Array<number>>>>;
}

/** A valid `GeoJSON GeometryCollection` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.8) for details. */
export interface GeoJsonGeometryCollectionOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonGeometryCollectionDataOutput {
  type: "GeometryCollection";
}

export interface GeoJsonGeometryCollectionDataOutput {
  /** Contains a list of valid `GeoJSON` geometry objects. **Note** that coordinates in GeoJSON are in x, y order (longitude, latitude). */
  geometries: Array<GeoJsonGeometryOutput>;
}

/** A valid `GeoJSON FeatureCollection` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details. */
export interface GeoJsonFeatureCollectionOutput
  extends GeoJsonObjectOutputParent,
    GeoJsonFeatureCollectionDataOutput {
  type: "FeatureCollection";
}

export interface GeoJsonFeatureCollectionDataOutput {
  /** Contains a list of valid `GeoJSON Feature` objects. */
  features: Array<GeoJsonFeatureOutput>;
}

/** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
export type GeoJsonGeometryOutput =
  | GeoJsonGeometryOutputParent
  | GeoJsonPointOutput
  | GeoJsonMultiPointOutput
  | GeoJsonLineStringOutput
  | GeoJsonMultiLineStringOutput
  | GeoJsonPolygonOutput
  | GeoJsonMultiPolygonOutput
  | GeoJsonGeometryCollectionOutput;
/** A valid `GeoJSON` object. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3) for details. */
export type GeoJsonObjectOutput =
  | GeoJsonGeometryOutput
  | GeoJsonPointOutput
  | GeoJsonFeatureOutput
  | BoundaryOutput
  | GeoJsonMultiPointOutput
  | GeoJsonLineStringOutput
  | GeoJsonMultiLineStringOutput
  | GeoJsonPolygonOutput
  | GeoJsonMultiPolygonOutput
  | GeoJsonGeometryCollectionOutput
  | GeoJsonFeatureCollectionOutput;
/** A valid `GeoJSON Feature` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.2) for details. */
export type GeoJsonFeatureOutput = GeoJsonFeatureOutputParent | BoundaryOutput;
