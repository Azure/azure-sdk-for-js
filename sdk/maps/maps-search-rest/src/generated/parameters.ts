// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  GeocodingBatchRequestBody,
  ReverseGeocodingBatchRequestBody
} from "./models";

export interface SearchGetGeocodingQueryParamProperties {
  /** Maximum number of responses that will be returned. Default: 5, minimum: 1 and maximum: 20. */
  top?: number;
  /** A string that contains information about a location, such as an address or landmark name. */
  query?: string;
  /**
   * The official street line of an address relative to the area, as specified by the locality, or postalCode, properties. Typical use of this element would be to provide a street address or any official address.
   *
   * **If query is given, should not use this parameter.**
   */
  addressLine?: string;
  /**
   * Restrict the geocoding result to an [ISO 3166-1 Alpha-2 region/country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) that is specified e.g. FR. This will limit the search to the specified region.
   *
   * **If query is given, should not use this parameter.**
   */
  countryRegion?: string;
  /**
   * A rectangular area on the earth defined as a bounding box object. The sides of the rectangles are defined by longitude and latitude values. When you specify this parameter, the geographical area is taken into account when computing the results of a location query.
   *
   * Example: lon1,lat1,lon2,lat2
   */
  bbox?: Array<number>;
  /**
   * A string that represents an [ISO 3166-1 Alpha-2 region/country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). This will alter Geopolitical disputed borders and labels to align with the specified user region. By default, the View parameter is set to “Auto” even if you haven’t defined it in the request.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?: string;
  /** A point on the earth specified as a longitude and latitude. When you specify this parameter, the user’s location is taken into account and the results returned may be more relevant to the user. Example: &coordinates=lon,lat */
  coordinates?: Array<number>;
  /**
   * The country subdivision portion of an address, such as WA.
   *
   * **If query is given, should not use this parameter.**
   */
  adminDistrict?: string;
  /**
   * The county for the structured address, such as King.
   *
   * **If query is given, should not use this parameter.**
   */
  adminDistrict2?: string;
  /**
   * The named area for the structured address.
   *
   * **If query is given, should not use this parameter.**
   */
  adminDistrict3?: string;
  /**
   * The locality portion of an address, such as Seattle.
   *
   * **If query is given, should not use this parameter.**
   */
  locality?: string;
  /**
   * The postal code portion of an address.
   *
   * **If query is given, should not use this parameter.**
   */
  postalCode?: string;
}

export interface SearchGetGeocodingQueryParam {
  queryParameters?: SearchGetGeocodingQueryParamProperties;
}

export type SearchGetGeocodingParameters = SearchGetGeocodingQueryParam &
  RequestParameters;

export interface SearchGetGeocodingBatchBodyParam {
  /** The list of address geocoding queries/requests to process. The list can contain a max of 100 queries and must contain at least 1 query. */
  body: GeocodingBatchRequestBody;
}

export interface SearchGetGeocodingBatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchGetGeocodingBatchParameters = SearchGetGeocodingBatchMediaTypesParam &
  SearchGetGeocodingBatchBodyParam &
  RequestParameters;

export interface SearchGetPolygonQueryParamProperties {
  /** A point on the earth specified as a longitude and latitude. Example: &coordinates=lon,lat */
  coordinates: Array<number>;
  /**
   * A string that represents an [ISO 3166-1 Alpha-2 region/country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). This will alter Geopolitical disputed borders and labels to align with the specified user region. By default, the View parameter is set to “Auto” even if you haven’t defined it in the request.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?: string;
  /** The geopolitical concept to return a boundary for. */
  resultType?:
    | "countryRegion"
    | "adminDistrict"
    | "adminDistrict2"
    | "postalCode"
    | "postalCode2"
    | "postalCode3"
    | "postalCode4"
    | "neighborhood"
    | "locality";
  /** Resolution determines the amount of points to send back. */
  resolution?: "small" | "medium" | "large" | "huge";
}

export interface SearchGetPolygonQueryParam {
  queryParameters: SearchGetPolygonQueryParamProperties;
}

export type SearchGetPolygonParameters = SearchGetPolygonQueryParam &
  RequestParameters;

export interface SearchGetReverseGeocodingQueryParamProperties {
  /** The coordinates of the location that you want to reverse geocode. Example: &coordinates=lon,lat */
  coordinates: Array<number>;
  /**
   * Specify entity types that you want in the response. Only the types you specify will be returned. If the point cannot be mapped to the entity types you specify, no location information is returned in the response.
   * Default value is all possible entities.
   * A comma separated list of entity types selected from the following options.
   *
   * - Address
   * - Neighborhood
   * - PopulatedPlace
   * - Postcode1
   * - AdminDivision1
   * - AdminDivision2
   * - CountryRegion
   *
   * These entity types are ordered from the most specific entity to the least specific entity. When entities of more than one entity type are found, only the most specific entity is returned. For example, if you specify Address and AdminDistrict1 as entity types and entities were found for both types, only the Address entity information is returned in the response.
   */
  resultTypes?: Array<
    | "Address"
    | "Neighborhood"
    | "PopulatedPlace"
    | "Postcode1"
    | "AdminDivision1"
    | "AdminDivision2"
    | "CountryRegion"
  >;
  /**
   * A string that represents an [ISO 3166-1 Alpha-2 region/country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). This will alter Geopolitical disputed borders and labels to align with the specified user region. By default, the View parameter is set to “Auto” even if you haven’t defined it in the request.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?: string;
}

export interface SearchGetReverseGeocodingQueryParam {
  queryParameters: SearchGetReverseGeocodingQueryParamProperties;
}

export type SearchGetReverseGeocodingParameters = SearchGetReverseGeocodingQueryParam &
  RequestParameters;

export interface SearchGetReverseGeocodingBatchBodyParam {
  /** The list of reverse geocoding queries/requests to process. The list can contain a max of 100 queries and must contain at least 1 query. */
  body: ReverseGeocodingBatchRequestBody;
}

export interface SearchGetReverseGeocodingBatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchGetReverseGeocodingBatchParameters = SearchGetReverseGeocodingBatchMediaTypesParam &
  SearchGetReverseGeocodingBatchBodyParam &
  RequestParameters;
