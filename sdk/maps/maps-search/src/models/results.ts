// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BoundingBox, GeoJsonFeatureCollection, LatLon } from "./models";
import {
  DataSource,
  EntryPointType,
  ErrorResponse,
  GeographicEntityType,
  MatchType,
  PointOfInterest,
  QueryType,
  RoadUseType,
  SearchAddressResultType,
} from "../generated/models";

/** This object is returned from a successful Search calls. */
export interface SearchAddressResult {
  /** The query parameter that was used to produce these search results. */
  readonly query?: string;
  /** The type of query being returned: NEARBY or NON_NEAR. */
  readonly queryType?: QueryType;
  /** Time spent resolving the query, in milliseconds. */
  readonly queryTime: number;
  /** Number of results in the response. */
  readonly numberResults: number;
  /** The starting offset of the returned Results within the full Result set. */
  readonly skip?: number;
  /** The total number of Results found. */
  readonly totalResults?: number;
  /** The maximum fuzzy level required to provide Results. */
  readonly fuzzyLevel?: number;
  /** Indication when the internal search engine has applied a geospatial bias to improve the ranking of results. */
  readonly geoBias?: LatLon;
  /** A list of Search API results. */
  readonly results: SearchAddressResultItem[];
}

/** Result object for a Search API response. */
export interface SearchAddressResultItem {
  /** Result type */
  readonly type: SearchAddressResultType;
  /** Id property */
  readonly id: string;
  /** The value within a result set to indicate the relative matching score between results. */
  readonly score: number;
  /** Straight line distance between the result and geobias location in meters. */
  readonly distanceInMeters?: number;
  /** Information about the original data source of the Result. Used for support requests. */
  readonly info?: string;
  /** Entity type of the search result. Only present if type == Geography. */
  readonly entityType?: GeographicEntityType;
  /** Details of the returned POI including information such as the name, phone, url address, and classifications. */
  readonly pointOfInterest?: PointOfInterest;
  /** The address of the result */
  readonly address: Address;
  /** A location represented as a latitude and longitude using short names 'lat' & 'lon'. */
  readonly position: LatLon;
  /** The viewport that covers the result represented by the top-left and bottom-right coordinates of the viewport. */
  readonly viewport: BoundingBox;
  /** Array of EntryPoints. Those describe the types of entrances available at the location. */
  readonly entryPoints?: EntryPoint[];
  /** Describes the address range on both sides of the street for a search result. */
  readonly addressRanges?: AddressRanges;
  /** Reference geometry id for use with the [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. */
  readonly dataSources?: DataSource;
  /** Information on the type of match. */
  readonly matchType?: MatchType;
  /** Detour time in seconds. Only returned for calls to the Search Along Route API. */
  readonly detourTimeInSeconds?: number;
}

/** The entry point for the POI being returned. */
export interface EntryPoint {
  /** The type of entry point. */
  readonly type: EntryPointType;
  /** Position of the entry point */
  position: LatLon;
}

/** Describes the address range on both sides of the street for a search result. Coordinates for the start and end locations of the address range are included. */
export interface AddressRanges {
  /** Address range on the left side of the street. */
  rangeLeft: string;
  /** Address range on the right side of the street. */
  rangeRight: string;
  /** The beginning point of a street segment */
  from: LatLon;
  /** The end point of a street segment */
  to: LatLon;
}
/** Result type of the reverse search address API */

export interface ReverseSearchAddressResult {
  /** Time spent resolving the query, in milliseconds. */
  readonly queryTime: number;
  /** Number of results in the response. */
  readonly numberResults: number;
  /** The Result list, sorted in descending order by score. */
  readonly results: ReverseSearchAddressResultItem[];
}

/** Result type of the reverse search cross street address API */
export interface ReverseSearchCrossStreetAddressResult {
  /** Time spent resolving the query, in milliseconds. */
  readonly queryTime: number;
  /** Number of results in the response. */
  readonly numberResults: number;
  /** The Result list, sorted in descending order by score. */
  readonly results: ReverseSearchCrossStreetAddressResultItem[];
}

/** The address of the result */
export interface Address {
  /** The building number on the street. DEPRECATED, use streetNumber instead. */
  readonly buildingNumber?: string;
  /** The street name. DEPRECATED, use streetName instead. */
  readonly street?: string;
  /** The name of the street being crossed. */
  readonly crossStreet?: string;
  /** The building number on the street. */
  readonly streetNumber?: string;
  /** The codes used to unambiguously identify the street */
  readonly routeNumbers?: string[];
  /** The street name. */
  readonly streetName?: string;
  /** The street name and number. */
  readonly streetNameAndNumber?: string;
  /** City / Town */
  readonly municipality?: string;
  /** Sub / Super City */
  readonly municipalitySubdivision?: string;
  /** Named Area */
  readonly countryTertiarySubdivision?: string;
  /** County */
  readonly countrySecondarySubdivision?: string;
  /** State or Province */
  readonly countrySubdivision?: string;
  /**  Postal Code / Zip Code */
  readonly postalCode?: string;
  /** Extended postal code (availability is dependent on the region). */
  readonly extendedPostalCode?: string;
  /** Country (Note: This is a two-letter code, not a country name.) */
  readonly countryCode?: string;
  /** Country name */
  readonly country?: string;
  /** ISO alpha-3 country code */
  readonly countryCodeISO3?: string;
  /**
   * An address line formatted according to the formatting rules of a Result's country of origin,
   * or in the case of a country, its full country name.
   */
  readonly freeformAddress?: string;
  /**
   * The full name of a first level of country administrative hierarchy.
   * This field appears only in case countrySubdivision is presented in an abbreviated form.
   * Only supported for USA, Canada, and Great Britain.
   */
  readonly countrySubdivisionName?: string;
  /**
   * An address component which represents the name of a geographic area or locality that groups a number of addressable objects for addressing purposes, without being an administrative unit.
   * This field is used to build the `freeformAddress` property.
   */
  readonly localName?: string;
  /** The bounding box of the location. */
  readonly boundingBox?: BoundingBox;
}

export interface ReverseSearchAddressResultItem {
  /** The address of the result */
  readonly address: Address;
  /** Position of the result */
  readonly position: LatLon;
  /** List of road usage types at the address */
  readonly roadUse?: RoadUseType[];
  /** Information on the type of match. */
  readonly matchType?: MatchType;
}

export interface ReverseSearchCrossStreetAddressResultItem {
  /** The address of the result */
  readonly address?: Address;
  /** Position of the result */
  readonly position?: LatLon;
}

/** This object is returned from a successful Batch service call. */
export interface BatchResult<TResult> {
  /** Number of successful requests in the batch */
  readonly totalSuccessfulRequests: number;
  /** Total number of requests in the batch */
  readonly totalRequests: number;
  /** Array containing the batch results. */
  readonly batchItems: BatchItem<TResult>[];
}

/** An item returned from Batch service call. */
export interface BatchItem<TResult> {
  /** HTTP request status code. */
  readonly statusCode: number;
  /** The result of the query. TResult if the query completed successfully, ErrorResponse otherwise. */
  readonly response: TResult | ErrorResponse;
}

/**
 * Entity Geometry
 */
export interface EntityGeometry {
  /**  ID of the returned entity */
  readonly providerId: string;
  /** Geometry data in GeoJSON FeatureCollection format. */
  geometryData?: GeoJsonFeatureCollection;
}
