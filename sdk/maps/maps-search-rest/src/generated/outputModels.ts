// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** This object is returned from a successful Search Polygon call */
export interface PolygonResultOutput {
  /** Results array */
  additionalData?: Array<PolygonOutput>;
}

export interface PolygonOutput {
  /** ID of the returned entity */
  providerID: string;
  /** Geometry data in GeoJSON format. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946) for details. Present only if "error" is not present. */
  geometryData?: GeoJsonObjectOutput;
}

/** A valid `GeoJSON` object. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3) for details. */
export interface GeoJsonObjectOutputParent {
  type:
    | "GeoJsonObject"
    | "GeoJsonGeometry"
    | "LineString"
    | "Point"
    | "MultiPoint"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | "Feature"
    | "FeatureCollection";
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

/** This object is returned from a successful Search calls. */
export interface SearchAddressResultOutput {
  /** Summary object for a Search API response */
  summary: SearchSummaryOutput;
  /** A list of Search API results. */
  results: Array<SearchAddressResultItemOutput>;
}

/** Summary object for a Search API response. */
export interface SearchSummaryOutput {
  /** The query parameter that was used to produce these search results. */
  query?: string;
  /** The type of query being returned: NEARBY or NON_NEAR. */
  queryType?: "NEARBY" | "NON_NEAR";
  /** Time spent resolving the query, in milliseconds. */
  queryTime: number;
  /** Number of results in the response. */
  numResults: number;
  /** The starting offset of the returned Results within the full Result set. */
  offset?: number;
  /** The total number of Results found. */
  totalResults?: number;
  /** The maximum fuzzy level required to provide Results. */
  fuzzyLevel?: number;
  /** Indication when the internal search engine has applied a geospatial bias to improve the ranking of results.  In  some methods, this can be affected by setting the lat and lon parameters where available.  In other cases it is  purely internal. */
  geoBias?: LatLongPairAbbreviatedOutput;
}

/** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
export interface LatLongPairAbbreviatedOutput {
  /** Latitude property */
  lat: number;
  /** Longitude property */
  lon: number;
}

/** Result object for a Search API response. */
export interface SearchAddressResultItemOutput {
  /**
   * One of:
   * * POI
   * * Street
   * * Geography
   * * Point Address
   * * Address Range
   * * Cross Street
   */
  type:
    | "POI"
    | "Street"
    | "Geography"
    | "Point Address"
    | "Address Range"
    | "Cross Street";
  /** Id property */
  id: string;
  /** The value within a result set to indicate the relative matching score between results.  You can use this to  determine that result x is twice as likely to be as relevant as result y if the value of x is 2x the value of y.   The values vary between queries and is only meant as a relative value for one result set. */
  score: number;
  /** Straight line distance between the result and geobias location in meters. */
  dist?: number;
  /** Information about the original data source of the Result. Used for support requests. */
  info?: string;
  entityType?:
    | "Country"
    | "CountrySubdivision"
    | "CountrySecondarySubdivision"
    | "CountryTertiarySubdivision"
    | "Municipality"
    | "MunicipalitySubdivision"
    | "Neighbourhood"
    | "PostalCodeArea";
  /** Details of the returned POI including information such as the name, phone, url address, and classifications. */
  poi?: PointOfInterestOutput;
  /** The address of the result */
  address: AddressOutput;
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  position: LatLongPairAbbreviatedOutput;
  /** The viewport that covers the result represented by the top-left and bottom-right coordinates of the viewport. */
  viewport: BoundingBoxOutput;
  /** Array of EntryPoints. Those describe the types of entrances available at the location. The type can be "main" for main entrances such as a front door, or a lobby, and "minor", for side and back doors. */
  entryPoints?: Array<EntryPointOutput>;
  /** Describes the address range on both sides of the street for a search result. Coordinates for the start and end locations of the address range are included. */
  addressRanges?: AddressRangesOutput;
  /** Optional section. Reference geometry id for use with the [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. */
  dataSources?: DataSourceOutput;
  /**
   * Information on the type of match.
   *
   * One of:
   *   * AddressPoint
   *   * HouseNumberRange
   *   * Street
   */
  matchType?: "AddressPoint" | "HouseNumberRange" | "Street";
  /** Detour time in seconds. Only returned for calls to the Search Along Route API. */
  detourTime?: number;
}

/** Details of the returned POI including information such as the name, phone, url address, and classifications. */
export interface PointOfInterestOutput {
  /** Name of the POI property */
  name: string;
  /** Telephone number property */
  phone?: string;
  /** Website URL property */
  url?: string;
  /** The list of the most specific POI categories */
  categorySet?: Array<PointOfInterestCategorySetOutput>;
  /** Categories array */
  categories?: Array<string>;
  /** Classification array */
  classifications?: Array<ClassificationOutput>;
  /** Brands array. The name of the brand for the POI being returned. */
  brands?: Array<BrandOutput>;
  /** Opening hours for a POI (Points of Interest). */
  openingHours?: OperatingHoursOutput;
}

/** POI category */
export interface PointOfInterestCategorySetOutput {
  /** Category ID */
  id: number;
}

/** The classification for the POI being returned */
export interface ClassificationOutput {
  /** Code property */
  code: string;
  /** Names array */
  names: Array<ClassificationNameOutput>;
}

/** Name for the classification */
export interface ClassificationNameOutput {
  /** Name Locale property */
  nameLocale: string;
  /** Name property */
  name: string;
}

/** The brand associated with the POI */
export interface BrandOutput {
  /** Name of the brand */
  name: string;
}

/** Opening hours for a POI (Points of Interest). */
export interface OperatingHoursOutput {
  /** Value used in the request: none or "nextSevenDays" */
  mode: string;
  /** List of time ranges for the next 7 days */
  timeRanges: Array<OperatingHoursTimeRangeOutput>;
}

/** Open time range for a day */
export interface OperatingHoursTimeRangeOutput {
  /** The point in the next 7 days range when a given POI is being opened, or the beginning of the range if it was opened before the range. */
  startTime: OperatingHoursTimeOutput;
  /** The point in the next 7 days range when a given POI is being closed, or the beginning of the range if it was closed before the range. */
  endTime: OperatingHoursTimeOutput;
}

/** Represents a date and time */
export interface OperatingHoursTimeOutput {
  /** Represents current calendar date in POI time zone, e.g. "2019-02-07". */
  date: string;
  /** Hours are in the 24 hour format in the local time of a POI; possible values are 0 - 23. */
  hour: number;
  /** Minutes are in the local time of a POI; possible values are 0 - 59. */
  minute: number;
}

/** The address of the result */
export interface AddressOutput {
  /** The building number on the street. DEPRECATED, use streetNumber instead. */
  buildingNumber?: string;
  /** The street name. DEPRECATED, use streetName instead. */
  street?: string;
  /** The name of the street being crossed. */
  crossStreet?: string;
  /** The building number on the street. */
  streetNumber?: string;
  /** The codes used to unambiguously identify the street */
  routeNumbers?: Array<string>;
  /** The street name. */
  streetName?: string;
  /** The street name and number. */
  streetNameAndNumber?: string;
  /** City / Town */
  municipality?: string;
  /** Sub / Super City */
  municipalitySubdivision?: string;
  /** Named Area */
  countryTertiarySubdivision?: string;
  /** County */
  countrySecondarySubdivision?: string;
  /** State or Province */
  countrySubdivision?: string;
  /** Postal Code / Zip Code */
  postalCode?: string;
  /** Extended postal code (availability is dependent on the region). */
  extendedPostalCode?: string;
  /** Country (Note: This is a two-letter code, not a country name.) */
  countryCode?: string;
  /** Country name */
  country?: string;
  /** ISO alpha-3 country code */
  countryCodeISO3?: string;
  /** An address line formatted according to the formatting rules of a Result's country of origin, or in the case of a country, its full country name. */
  freeformAddress?: string;
  /** The full name of a first level of country administrative hierarchy. This field appears only in case countrySubdivision is presented in an abbreviated form. Only supported for USA, Canada, and United Kingdom. */
  countrySubdivisionName?: string;
  /** An address component which represents the name of a geographic area or locality that groups a number of addressable objects for addressing purposes, without being an administrative unit. This field is used to build the `freeformAddress` property. */
  localName?: string;
  /** The bounding box of the location. */
  boundingBox?: BoundingBoxCompassNotationOutput;
}

/** The bounding box of the location. */
export interface BoundingBoxCompassNotationOutput {
  /** North-east latitude,longitude coordinate of the bounding box as comma-separated floats */
  northEast: string;
  /** South-west latitude,longitude coordinate of the bounding box as comma-separated floats */
  southWest: string;
  /** Entity type source of the bounding box. For reverse-geocoding this is always equal to position. */
  entity?: "position";
}

/** The viewport that covers the result represented by the top-left and bottom-right coordinates of the viewport. */
export interface BoundingBoxOutput {
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  topLeftPoint: LatLongPairAbbreviatedOutput;
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  btmRightPoint: LatLongPairAbbreviatedOutput;
}

/** The entry point for the POI being returned. */
export interface EntryPointOutput {
  /** The type of entry point. Value can be either _main_ or _minor_. */
  type: "main" | "minor";
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  position: LatLongPairAbbreviatedOutput;
}

/** Describes the address range on both sides of the street for a search result. Coordinates for the start and end locations of the address range are included. */
export interface AddressRangesOutput {
  /** Address range on the left side of the street. */
  rangeLeft: string;
  /** Address range on the right side of the street. */
  rangeRight: string;
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  from: LatLongPairAbbreviatedOutput;
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  to: LatLongPairAbbreviatedOutput;
}

/** Optional section. Reference ids for use with the [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. */
export interface DataSourceOutput {
  /** Information about the geometric shape of the result. Only present if type == Geography. */
  geometry?: GeometryIdentifierOutput;
}

/** Information about the geometric shape of the result. Only present if type == Geography. */
export interface GeometryIdentifierOutput {
  /** Pass this as geometryId to the [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API to fetch geometry information for this result. */
  id: string;
}

/** This object is returned from a successful POI Category Tree call */
export interface PointOfInterestCategoryTreeResultOutput {
  /** Categories array */
  poiCategories?: Array<PointOfInterestCategoryOutput>;
}

/** POI category result */
export interface PointOfInterestCategoryOutput {
  /** Unique ID for the category. ID can be used to restrict search results to specific categories through other Search Service APIs, like [Get Search POI](https://docs.microsoft.com/rest/api/maps/search/getsearchpoi). */
  id: number;
  /** Name of the category */
  name: string;
  /** Array of child category ids */
  childCategoryIds: Array<number>;
  /** Array of alternative names of the category */
  synonyms: Array<string>;
}

/** This object is returned from a successful Search Address Reverse call */
export interface ReverseSearchAddressResultOutput {
  /** Summary object for a Search Address Reverse response */
  summary: SearchSummaryOutput;
  /** Addresses array */
  addresses: Array<ReverseSearchAddressResultItemOutput>;
}

/** Result object for a Search Address Reverse response */
export interface ReverseSearchAddressResultItemOutput {
  /** The address of the result */
  address: AddressOutput;
  /** Position property in the form of "{latitude},{longitude}" */
  position: string;
  roadUse?: Array<
    | "LimitedAccess"
    | "Arterial"
    | "Terminal"
    | "Ramp"
    | "Rotary"
    | "LocalStreet"
  >;
  /**
   * Information on the type of match.
   *
   * One of:
   *   * AddressPoint
   *   * HouseNumberRange
   *   * Street
   */
  matchType?: "AddressPoint" | "HouseNumberRange" | "Street";
}

/** This object is returned from a successful Search Address Reverse CrossStreet call */
export interface ReverseSearchCrossStreetAddressResultOutput {
  /** Summary object for a Search Address Reverse Cross Street response */
  summary: SearchSummaryOutput;
  /** Addresses array */
  addresses: Array<ReverseSearchCrossStreetAddressResultItemOutput>;
}

/** Result object for a Search Address Reverse Cross Street response */
export interface ReverseSearchCrossStreetAddressResultItemOutput {
  /** The address of the result */
  address?: AddressOutput;
  /** Position property in the form of "{latitude},{longitude}" */
  position?: string;
}

/** A valid `GeoJSON LineString` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.4) for details. */
export interface GeoJsonLineStringOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonLineStringDataOutput {
  type: "LineString";
}

/** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
export interface GeoJsonGeometryOutputParent extends GeoJsonObjectOutputParent {
  type:
    | "GeoJsonGeometry"
    | "LineString"
    | "Point"
    | "MultiPoint"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection";
}

export interface GeoJsonLineStringDataOutput {
  /** Coordinates for the `GeoJson LineString` geometry. */
  coordinates: Array<Array<number>>;
}

/** This object is returned from a successful Search Address Batch service call. */
export interface SearchAddressBatchResultOutput extends BatchResultOutput {
  /** Array containing the batch results. */
  batchItems: Array<SearchAddressBatchItemOutput>;
}

/** An item returned from Search Address Batch service call. */
export interface SearchAddressBatchItemOutput extends BatchResultItemOutput {
  /** The result of the query. SearchAddressResponse if the query completed successfully, ErrorResponse otherwise. */
  response: SearchAddressBatchItemResponseOutput;
}

/** The result of the query. SearchAddressResponse if the query completed successfully, ErrorResponse otherwise. */
export interface SearchAddressBatchItemResponseOutput
  extends SearchAddressResultOutput,
    ErrorResponseOutput {}

/** An item returned from Batch API. Extend with 'response' property. */
export interface BatchResultItemOutput {
  /** HTTP request status code. */
  statusCode: number;
}

/** This object is returned from a successful Batch service call. Extend with 'batchItems' property. */
export interface BatchResultOutput {
  /** Summary of the results for the batch request */
  summary: BatchResultSummaryOutput;
}

/** Summary of the results for the batch request */
export interface BatchResultSummaryOutput {
  /** Number of successful requests in the batch */
  successfulRequests: number;
  /** Total number of requests in the batch */
  totalRequests: number;
}

/** This object is returned from a successful Search Address Reverse Batch service call. */
export interface ReverseSearchAddressBatchResultOutput
  extends BatchResultOutput {
  /** Array containing the batch results. */
  batchItems: Array<ReverseSearchAddressBatchItemOutput>;
}

/** An item returned from Search Address Reverse Batch service call. */
export interface ReverseSearchAddressBatchItemOutput
  extends BatchResultItemOutput {
  /** The result of the query. SearchAddressReverseResponse if the query completed successfully, ErrorResponse otherwise. */
  response: ReverseSearchAddressBatchItemResponseOutput;
}

/** The result of the query. SearchAddressReverseResponse if the query completed successfully, ErrorResponse otherwise. */
export interface ReverseSearchAddressBatchItemResponseOutput
  extends ReverseSearchAddressResultOutput,
    ErrorResponseOutput {}

/** A valid `GeoJSON Point` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.2) for details. */
export interface GeoJsonPointOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonPointDataOutput {
  type: "Point";
}

/** Data contained by a `GeoJson Point`. */
export interface GeoJsonPointDataOutput {
  /** A `Position` is an array of numbers with two or more elements. The first two elements are _longitude_ and _latitude_, precisely in that order. _Altitude/Elevation_ is an optional third element. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.1) for details. */
  coordinates: Array<number>;
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

/** A valid `GeoJSON Feature` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.2) for details. */
export interface GeoJsonFeatureOutput
  extends GeoJsonObjectOutputParent,
    GeoJsonFeatureDataOutput {
  type: "Feature";
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

/** A valid `GeoJSON` object. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3) for details. */
export type GeoJsonObjectOutput =
  | GeoJsonGeometryOutput
  | GeoJsonLineStringOutput
  | GeoJsonPointOutput
  | GeoJsonMultiPointOutput
  | GeoJsonMultiLineStringOutput
  | GeoJsonPolygonOutput
  | GeoJsonMultiPolygonOutput
  | GeoJsonGeometryCollectionOutput
  | GeoJsonFeatureOutput
  | GeoJsonFeatureCollectionOutput;
/** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
export type GeoJsonGeometryOutput =
  | GeoJsonGeometryOutputParent
  | GeoJsonLineStringOutput
  | GeoJsonPointOutput
  | GeoJsonMultiPointOutput
  | GeoJsonMultiLineStringOutput
  | GeoJsonPolygonOutput
  | GeoJsonMultiPolygonOutput
  | GeoJsonGeometryCollectionOutput;
