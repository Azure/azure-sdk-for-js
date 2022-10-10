// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BoundingBox, LatLon } from "./models";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import {
  ElectricVehicleConnector,
  GeographicEntityType,
  LocalizedMapView,
  OperatingHoursRange,
  RoadUseType,
  SearchIndexes,
} from "../generated/models";

/**
 * Client options used to configure the Maps Search Client
 */
export type MapsSearchClientOptions = CommonClientOptions & {
  /** Overrides client endpoint. Default: "https://atlas.microsoft.com"*/
  endpoint?: string;
};

/**
 * Options for retrieving polygon geometries given geometry ids
 */
export type GetGeometriesOptions = OperationOptions;

/**
 * Options for retrieving point of interest categories
 */
export interface GetPointOfInterestCategoriesOptions extends OperationOptions {
  /** Language in which search results should be returned. */
  language?: string;
}

/**
 * Base options for search operations
 */

export interface SearchBaseOptions {
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  top?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  skip?: number;
  /** Language in which search results should be returned. */
  language?: string;
  /** Indexes for which extended postal codes should be included in the results */
  extendedPostalCodesFor?: SearchIndexes[];
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
}

/**
 * Base options for search address operations
 */
export interface SearchAddressBaseOptions extends SearchBaseOptions {
  /** Bounding box of the search range */
  boundingBox?: BoundingBox;
  /** Whether the query should be interpreted as a partial input and the search will enter predictive mode */
  isTypeAhead?: boolean;
  /** The radius in meters to for the results to be constrained to the defined area */
  radiusInMeters?: number;
}

/**
 * Options for specifying extra filters
 */
export interface SearchExtraFilterOptions {
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories.
   * ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   * The list of supported categories can be discovered using [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315`(Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017`(Search Points of Interest of category either Italian or French Restaurant)
   */
  categoryFilter?: number[];
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands.
   * Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned.
   * Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   * `brandSet=Foo`
   * `brandSet=Foo,Bar`
   * `brandSet="A,B,C Comma",Bar`
   * */
  brandFilter?: string[];
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types.
   * Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Usage examples:
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  electricVehicleConnectorFilter?: ElectricVehicleConnector[];
}

/**
 * Base Options for searching points of interest
 */
export interface SearchPointOfInterestBaseOptions
  extends SearchAddressBaseOptions,
    SearchExtraFilterOptions {
  /** Hours of operation for a POI (Points of Interest). */
  operatingHours?: OperatingHoursRange;
}

/**
 * Base Options for fuzzy search
 */
export interface FuzzySearchBaseOptions extends SearchPointOfInterestBaseOptions {
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
  /** Minimum fuzziness level to be used. Default: 1 */
  minFuzzyLevel?: number;
  /** Maximum fuzziness level to be used. Default: 1 */
  maxFuzzyLevel?: number;
  /** A comma separated list of indexes which should be utilized for the search. Item order does not matter.
   *  Available indexes are:
   *   - Addr = Address range interpolation,
   *   - Geo = Geographies, PAD = Point Addresses,
   *   - POI = Points of interest, Str = Streets,
   *   - Xstr = Cross Streets (intersections)
   * */
  indexFilter?: SearchIndexes[];
}

/**
 * Fuzzy search query
 */
export type SearchQuery = { query: string; coordinates?: LatLon; countryCodeFilter?: string[] };

/**
 * Options for fuzzy search
 */
export type FuzzySearchOptions = FuzzySearchBaseOptions;
/**
 * Options for searching points of interest
 */
export type SearchPointOfInterestOptions = SearchPointOfInterestBaseOptions & OperationOptions;
/**
 * Options for seaching points of interest by categories
 */
export type SearchPointOfInterestCategoryOptions = SearchPointOfInterestOptions;

/**
 * Options for searching nearby points of interest
 */
export interface SearchNearbyPointOfInterestOptions
  extends SearchBaseOptions,
    SearchExtraFilterOptions,
    OperationOptions {
  /** Counter filters that limit the search to the specified countries */
  countryCodeFilter?: string[];
  /** The radius in meters to for the results to be constrained to the defined area, Min value is 1, Max Value is 50000. */
  radiusInMeters?: number;
}

/**
 * Options for searching addresses (geocoding)
 */
export interface SearchAddressOptions extends SearchAddressBaseOptions {
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
  /** Counter filters that limit the search to the specified countries */
  countryCodeFilter?: string[];
  /** The coordinates where results should be biased */
  coordinates?: LatLon;
}

/**
 * Options for searching structured addresses
 */
export interface SearchStructuredAddressOptions extends SearchBaseOptions, OperationOptions {
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
}

/**
 * Base options for reverse search operations
 */
export interface ReverseSearchBaseOptions {
  /** The radius in meters to for the results to be constrained to the defined area */
  radiusInMeters?: number;
  /** Language in which search results should be returned. */
  language?: string;
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
  /** The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is North, 90 is East and so on, values range from -360 to 360. The precision can include upto one decimal place */
  heading?: number;
}

/**
 * Options for reverse search address operations
 */
export interface ReverseSearchAddressOptions extends ReverseSearchBaseOptions {
  /** The entityType specifies the level of filtering performed on geographies */
  entityType?: GeographicEntityType;
  /** To enable return of the posted speed limit */
  includeSpeedLimit?: boolean;
  /** Street number as a string. If a number is sent in along with the request, the response may include the side of the street (Left/Right) and also an offset position for that number */
  streetNumber?: string;
  /** Boolean. To enable return of the road use array for reverse geocodes at street level */
  includeRoadUse?: boolean;
  /** To restrict reverse geocodes to a certain type of road use. The road use array for reverse geocodes can be one or more of LimitedAccess, Arterial, Terminal, Ramp, Rotary, LocalStreet */
  roadUse?: RoadUseType[];
  /**
   * Format of newlines in the formatted address.
   *
   * If true, the address will contain newlines.
   * If false, newlines will be converted to commas.
   */
  allowFreeformNewline?: boolean;
  /** Include information on the type of match the geocoder achieved in the response. */
  includeMatchType?: boolean;
}

/**
 * Options for reverse-searching cross street addresses
 */
export interface ReverseSearchCrossStreetAddressOptions
  extends ReverseSearchBaseOptions,
    OperationOptions {
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  top?: number;
}

/**
 * Base options for geometry search operations
 */
export interface SearchGeometryBaseOptions {
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  top?: number;
  /** The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. */
  localizedMapView?: LocalizedMapView;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories.
   * ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   * The list of supported categories can be discovered using [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree).
   *
   * Usage examples:
   * `categorySet=7315`(Search Points of Interest from category Restaurant)
   * `categorySet=7315025,7315017`(Search Points of Interest of category either Italian or French Restaurant)
   */
  categoryFilter?: number[];
  /** Hours of operation for a POI (Points of Interest). */
  operatingHours?: OperatingHoursRange;
}

/**
 * Options for searching inside geometries
 */
export interface SearchInsideGeometryOptions extends SearchGeometryBaseOptions, OperationOptions {
  /** Language in which search results should be returned. */
  language?: string;
  /** Indexes for which extended postal codes should be included in the results */
  extendedPostalCodesFor?: SearchIndexes[];
  /** A comma separated list of indexes which should be utilized for the search. Item order does not matter.
   *  Available indexes are:
   *   - Addr = Address range interpolation,
   *   - Geo = Geographies, PAD = Point Addresses,
   *   - POI = Points of interest, Str = Streets,
   *   - Xstr = Cross Streets (intersections)
   * */
  indexFilter?: SearchIndexes[];
}

/**
 * Options for searching along routes
 */
export interface SearchAlongRouteOptions extends SearchGeometryBaseOptions, OperationOptions {
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands.
   * Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned.
   * Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   * `brandSet=Foo`
   * `brandSet=Foo,Bar`
   * `brandSet="A,B,C Comma",Bar`
   * */
  brandFilter?: string[];
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types.
   * Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Usage examples:
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  electricVehicleConnectorFilter?: ElectricVehicleConnector[];
}

/**
 * Options for batch operation poller
 */
export interface BatchPollerOptions {
  /**
   * Time between each polling in milliseconds.
   */
  updateIntervalInMs?: number;
}

/**
 * Options for performing batch fuzzy searches
 */
export type FuzzySearchBatchOptions = OperationOptions & BatchPollerOptions;
/**
 * Options for performing batch address searches
 */
export type SearchAddressBatchOptions = OperationOptions & BatchPollerOptions;
/**
 * Options for performing batch reverse searches
 */
export type ReverseSearchAddressBatchOptions = OperationOptions & BatchPollerOptions;

/**
 * Request object containing parameters for making fuzzy search call
 */
export interface FuzzySearchRequest {
  searchQuery: SearchQuery;
  options?: FuzzySearchOptions;
}

/**
 * Request object containing parameters for making search address call
 */
export interface SearchAddressRequest {
  query: string;
  options?: SearchAddressOptions;
}

/**
 * Request object containing parameters for making reverse search address call
 */
export interface ReverseSearchAddressRequest {
  coordinates: LatLon;
  options?: ReverseSearchAddressOptions;
}
