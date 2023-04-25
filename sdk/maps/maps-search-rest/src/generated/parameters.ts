// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  SearchInsideGeometryRequest,
  SearchAlongRouteRequest,
  BatchRequest
} from "./models";

export interface SearchListPolygonsQueryParamProperties {
  /** Comma separated list of geometry UUIDs, previously retrieved from an Online Search request. */
  geometries: Array<string>;
}

export interface SearchListPolygonsQueryParam {
  queryParameters: SearchListPolygonsQueryParamProperties;
}

export type SearchListPolygonsParameters = SearchListPolygonsQueryParam &
  RequestParameters;

export interface SearchFuzzySearchQueryParamProperties {
  /** The applicable query string (e.g., "seattle", "pizza"). Can _also_ be specified as a comma separated string composed by latitude followed by longitude (e.g., "47.641268, -122.125679"). Must be properly URL encoded. */
  query: string;
  /** Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and the search will enter predictive mode */
  typeahead?: boolean;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  ofs?: number;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned. The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree). Usage examples:
   *
   * * **categorySet=7315** (Search Points of Interest from category Restaurant)
   *
   * * **categorySet=7315025,7315017** (Search Points of Interest of category either Italian or French Restaurant)
   */
  categorySet?: Array<number>;
  /** Comma separated string of country codes, e.g. FR,ES. This will limit the search to the specified countries */
  countrySet?: Array<string>;
  /** Latitude where results should be biased. E.g. 37.337 */
  lat?: number;
  /** Longitude where results should be biased. E.g. -121.89 */
  lon?: number;
  /** The radius in meters to for the results to be constrained to the defined area */
  radius?: number;
  /** Top left position of the bounding box. E.g. 37.553,-122.453 */
  topLeft?: string;
  /** Bottom right position of the bounding box. E.g. 37.553,-122.453 */
  btmRight?: string;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * Indexes for which extended postal codes should be included in the results.
   *
   * Available indexes are:
   *
   *  **Addr** = Address ranges
   *
   *  **Geo** = Geographies
   *
   *  **PAD** = Point Addresses
   *
   *  **POI** = Points of Interest
   *
   *  **Str** = Streets
   *
   *  **XStr** = Cross Streets (intersections)
   *
   * Value should be a comma separated list of index types (in any order) or **None** for no indexes.
   *
   * By default extended postal codes are included for all indexes except Geo. Extended postal code lists for geographies can be quite long so they have to be explicitly requested when needed.
   *
   * Usage examples:
   *
   *  extendedPostalCodesFor=POI
   *
   *  extendedPostalCodesFor=PAD,Addr,POI
   *
   *  extendedPostalCodesFor=None
   *
   * Extended postal code is returned as an **extendedPostalCode** property of an address. Availability is region-dependent.
   */
  extendedPostalCodesFor?: Array<
    "Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr"
  >;
  /**
   * Minimum fuzziness level to be used. Default: 1, minimum: 1 and maximum: 4
   *
   * * Level 1 has no spell checking.
   *
   * * Level 2 uses normal n-gram spell checking. For example, query "restrant" can be matched to "restaurant."
   *
   * * Level 3 uses sound-like spell checking, and shingle spell checking. Sound-like spell checking is for "rstrnt" to "restaurant" matching. Shingle spell checking is for "mountainview" to "mountain view" matching.
   *
   * * Level 4 doesn’t add any more spell checking functions.
   *
   *
   *
   * The search engine will start looking for a match on the level defined by minFuzzyLevel, and will stop searching at the level specified by maxFuzzyLevel.
   */
  minFuzzyLevel?: number;
  /**
   * Maximum fuzziness level to be used. Default: 2, minimum: 1 and maximum: 4
   *
   * * Level 1 has no spell checking.
   *
   * * Level 2 uses normal n-gram spell checking. For example, query "restrant" can be matched to "restaurant."
   *
   * * Level 3 uses sound-like spell checking, and shingle spell checking. Sound-like spell checking is for "rstrnt" to "restaurant" matching. Shingle spell checking is for "mountainview" to "mountain view" matching.
   *
   * * Level 4 doesn’t add any more spell checking functions.
   *
   *
   *
   * The search engine will start looking for a match on the level defined by minFuzzyLevel, and will stop searching at the level specified by maxFuzzyLevel.
   */
  maxFuzzyLevel?: number;
  /** A comma separated list of indexes which should be utilized for the search. Item order does not matter. Available indexes are: Addr = Address range interpolation, Geo = Geographies, PAD = Point Addresses, POI = Points of interest, Str = Streets, Xstr = Cross Streets (intersections) */
  idxSet?: Array<"Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr">;
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands. Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned. Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   *
   *  brandSet=Foo
   *
   *  brandSet=Foo,Bar
   *
   *  brandSet="A,B,C Comma",Bar
   */
  brandSet?: Array<string>;
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types. Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Available connector types are:
   *   * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a certain region. They are all AC single phase and the standard Voltage and standard Amperage. See also: [Plug & socket types - World Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
   *   * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called Yazaki after the original manufacturer or SAE J1772 after the standard that first published it. Mostly used in combination with 120V single phase or up to 240V single phase infrastructure.
   *   * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a cable and plug attached to the charging point.
   *   * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a socket set into the charging point.
   *   * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame after the original manufacturer. Mostly used in combination with up to 240V single phase or up to 420V three phase infrastructure.
   *   * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power Company and industrial partners. Because of this is is also known as the TEPCO's connector. It supports fast DC charging.
   *   * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309 standard. It is sometime referred to as by some combination of the standard, the color and the fact that is a single phase connector. The connector usually has the "P+N+E, 6h" configuration.
   *   * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309 standard.
   *   * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e. it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly limited to North America or the modified Type 2 (DC over Type 2) in Europe.
   *
   * Usage examples:
   *
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  connectorSet?: Array<
    | "StandardHouseholdCountrySpecific"
    | "IEC62196Type1"
    | "IEC62196Type1CCS"
    | "IEC62196Type2CableAttached"
    | "IEC62196Type2Outlet"
    | "IEC62196Type2CCS"
    | "IEC62196Type3"
    | "Chademo"
    | "IEC60309AC1PhaseBlue"
    | "IEC60309DCWhite"
    | "Tesla"
  >;
  /**
   * Specifies the level of filtering performed on geographies. Narrows the search for specified geography entity types, e.g. return only municipality. The resulting response will contain the geography ID as well as the entity type matched. If you provide more than one entity as a comma separated list, endpoint will return the 'smallest entity available'. Returned Geometry ID can be used to get the geometry of that geography via [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. The following parameters are ignored when entityType is set:
   *
   * * heading
   * * number
   * * returnRoadUse
   * * returnSpeedLimit
   * * roadUse
   * * returnMatchType
   */
  entityType?:
    | "Country"
    | "CountrySubdivision"
    | "CountrySecondarySubdivision"
    | "CountryTertiarySubdivision"
    | "Municipality"
    | "MunicipalitySubdivision"
    | "Neighbourhood"
    | "PostalCodeArea";
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
  /**
   * Hours of operation for a POI (Points of Interest). The availability of hours of operation will vary based on the data available. If not passed, then no opening hours information will be returned.
   * Supported value: nextSevenDays
   */
  openingHours?: "nextSevenDays";
}

export interface SearchFuzzySearchQueryParam {
  queryParameters: SearchFuzzySearchQueryParamProperties;
}

export type SearchFuzzySearchParameters = SearchFuzzySearchQueryParam &
  RequestParameters;

export interface SearchSearchPointOfInterestQueryParamProperties {
  /** The POI name to search for (e.g., "statue of liberty", "starbucks"), must be properly URL encoded. */
  query: string;
  /** Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and the search will enter predictive mode */
  typeahead?: boolean;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  ofs?: number;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned. The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree). Usage examples:
   *
   * * **categorySet=7315** (Search Points of Interest from category Restaurant)
   *
   * * **categorySet=7315025,7315017** (Search Points of Interest of category either Italian or French Restaurant)
   */
  categorySet?: Array<number>;
  /** Comma separated string of country codes, e.g. FR,ES. This will limit the search to the specified countries */
  countrySet?: Array<string>;
  /** Latitude where results should be biased. E.g. 37.337 */
  lat?: number;
  /** Longitude where results should be biased. E.g. -121.89 */
  lon?: number;
  /** The radius in meters to for the results to be constrained to the defined area */
  radius?: number;
  /** Top left position of the bounding box. E.g. 37.553,-122.453 */
  topLeft?: string;
  /** Bottom right position of the bounding box. E.g. 37.553,-122.453 */
  btmRight?: string;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * Indexes for which extended postal codes should be included in the results.
   *
   * Available indexes are:
   *
   *  **POI** = Points of Interest
   *
   * Value should be **POI** or **None** to disable extended postal codes.
   *
   * By default extended postal codes are included.
   *
   * Usage examples:
   *
   *  extendedPostalCodesFor=POI
   *
   *  extendedPostalCodesFor=None
   *
   * Extended postal code is returned as an **extendedPostalCode** property of an address. Availability is region-dependent.
   */
  extendedPostalCodesFor?: Array<"POI" | "None">;
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands. Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned. Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   *
   *  brandSet=Foo
   *
   *  brandSet=Foo,Bar
   *
   *  brandSet="A,B,C Comma",Bar
   */
  brandSet?: Array<string>;
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types. Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Available connector types are:
   *   * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a certain region. They are all AC single phase and the standard Voltage and standard Amperage. See also: [Plug & socket types - World Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
   *   * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called Yazaki after the original manufacturer or SAE J1772 after the standard that first published it. Mostly used in combination with 120V single phase or up to 240V single phase infrastructure.
   *   * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a cable and plug attached to the charging point.
   *   * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a socket set into the charging point.
   *   * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame after the original manufacturer. Mostly used in combination with up to 240V single phase or up to 420V three phase infrastructure.
   *   * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power Company and industrial partners. Because of this is is also known as the TEPCO's connector. It supports fast DC charging.
   *   * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309 standard. It is sometime referred to as by some combination of the standard, the color and the fact that is a single phase connector. The connector usually has the "P+N+E, 6h" configuration.
   *   * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309 standard.
   *   * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e. it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly limited to North America or the modified Type 2 (DC over Type 2) in Europe.
   *
   * Usage examples:
   *
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  connectorSet?: Array<
    | "StandardHouseholdCountrySpecific"
    | "IEC62196Type1"
    | "IEC62196Type1CCS"
    | "IEC62196Type2CableAttached"
    | "IEC62196Type2Outlet"
    | "IEC62196Type2CCS"
    | "IEC62196Type3"
    | "Chademo"
    | "IEC60309AC1PhaseBlue"
    | "IEC60309DCWhite"
    | "Tesla"
  >;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
  /**
   * Hours of operation for a POI (Points of Interest). The availability of hours of operation will vary based on the data available. If not passed, then no opening hours information will be returned.
   * Supported value: nextSevenDays
   */
  openingHours?: "nextSevenDays";
}

export interface SearchSearchPointOfInterestQueryParam {
  queryParameters: SearchSearchPointOfInterestQueryParamProperties;
}

export type SearchSearchPointOfInterestParameters = SearchSearchPointOfInterestQueryParam &
  RequestParameters;

export interface SearchSearchNearbyPointOfInterestQueryParamProperties {
  /** Latitude where results should be biased. E.g. 37.337. */
  lat: number;
  /** Longitude where results should be biased. E.g. -121.89. */
  lon: number;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  ofs?: number;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned. The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree). Usage examples:
   *
   * * **categorySet=7315** (Search Points of Interest from category Restaurant)
   *
   * * **categorySet=7315025,7315017** (Search Points of Interest of category either Italian or French Restaurant)
   */
  categorySet?: Array<number>;
  /** Comma separated string of country codes, e.g. FR,ES. This will limit the search to the specified countries */
  countrySet?: Array<string>;
  /** The radius in meters to for the results to be constrained to the defined area, Min value is 1, Max Value is 50000. */
  radius?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * Indexes for which extended postal codes should be included in the results.
   *
   * Available indexes are:
   *
   *  **Addr** = Address ranges
   *
   *  **Geo** = Geographies
   *
   *  **PAD** = Point Addresses
   *
   *  **POI** = Points of Interest
   *
   *  **Str** = Streets
   *
   *  **XStr** = Cross Streets (intersections)
   *
   * Value should be a comma separated list of index types (in any order) or **None** for no indexes.
   *
   * By default extended postal codes are included for all indexes except Geo. Extended postal code lists for geographies can be quite long so they have to be explicitly requested when needed.
   *
   * Usage examples:
   *
   *  extendedPostalCodesFor=POI
   *
   *  extendedPostalCodesFor=PAD,Addr,POI
   *
   *  extendedPostalCodesFor=None
   *
   * Extended postal code is returned as an **extendedPostalCode** property of an address. Availability is region-dependent.
   */
  extendedPostalCodesFor?: Array<
    "Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr"
  >;
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands. Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned. Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   *
   *  brandSet=Foo
   *
   *  brandSet=Foo,Bar
   *
   *  brandSet="A,B,C Comma",Bar
   */
  brandSet?: Array<string>;
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types. Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Available connector types are:
   *   * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a certain region. They are all AC single phase and the standard Voltage and standard Amperage. See also: [Plug & socket types - World Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
   *   * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called Yazaki after the original manufacturer or SAE J1772 after the standard that first published it. Mostly used in combination with 120V single phase or up to 240V single phase infrastructure.
   *   * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a cable and plug attached to the charging point.
   *   * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a socket set into the charging point.
   *   * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame after the original manufacturer. Mostly used in combination with up to 240V single phase or up to 420V three phase infrastructure.
   *   * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power Company and industrial partners. Because of this is is also known as the TEPCO's connector. It supports fast DC charging.
   *   * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309 standard. It is sometime referred to as by some combination of the standard, the color and the fact that is a single phase connector. The connector usually has the "P+N+E, 6h" configuration.
   *   * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309 standard.
   *   * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e. it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly limited to North America or the modified Type 2 (DC over Type 2) in Europe.
   *
   * Usage examples:
   *
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  connectorSet?: Array<
    | "StandardHouseholdCountrySpecific"
    | "IEC62196Type1"
    | "IEC62196Type1CCS"
    | "IEC62196Type2CableAttached"
    | "IEC62196Type2Outlet"
    | "IEC62196Type2CCS"
    | "IEC62196Type3"
    | "Chademo"
    | "IEC60309AC1PhaseBlue"
    | "IEC60309DCWhite"
    | "Tesla"
  >;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
}

export interface SearchSearchNearbyPointOfInterestQueryParam {
  queryParameters: SearchSearchNearbyPointOfInterestQueryParamProperties;
}

export type SearchSearchNearbyPointOfInterestParameters = SearchSearchNearbyPointOfInterestQueryParam &
  RequestParameters;

export interface SearchSearchPointOfInterestCategoryQueryParamProperties {
  /** The POI category to search for (e.g., "AIRPORT", "RESTAURANT"), must be properly URL encoded. Supported main categories can be requested by calling [Get Search POI Category Tree API](https://aka.ms/AzureMapsPOICategoryTree). List of available categories can also be found [here](https://docs.microsoft.com/azure/azure-maps/supported-search-categories). We recommend to use POI Search Category Tree API to request the supported categories. */
  query: string;
  /** Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and the search will enter predictive mode */
  typeahead?: boolean;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  ofs?: number;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned. The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree). Usage examples:
   *
   * * **categorySet=7315** (Search Points of Interest from category Restaurant)
   *
   * * **categorySet=7315025,7315017** (Search Points of Interest of category either Italian or French Restaurant)
   */
  categorySet?: Array<number>;
  /** Comma separated string of country codes, e.g. FR,ES. This will limit the search to the specified countries */
  countrySet?: Array<string>;
  /** Latitude where results should be biased. E.g. 37.337 */
  lat?: number;
  /** Longitude where results should be biased. E.g. -121.89 */
  lon?: number;
  /** The radius in meters to for the results to be constrained to the defined area */
  radius?: number;
  /** Top left position of the bounding box. E.g. 37.553,-122.453 */
  topLeft?: string;
  /** Bottom right position of the bounding box. E.g. 37.553,-122.453 */
  btmRight?: string;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * Indexes for which extended postal codes should be included in the results.
   *
   * Available indexes are:
   *
   *  **Addr** = Address ranges
   *
   *  **Geo** = Geographies
   *
   *  **PAD** = Point Addresses
   *
   *  **POI** = Points of Interest
   *
   *  **Str** = Streets
   *
   *  **XStr** = Cross Streets (intersections)
   *
   * Value should be a comma separated list of index types (in any order) or **None** for no indexes.
   *
   * By default extended postal codes are included for all indexes except Geo. Extended postal code lists for geographies can be quite long so they have to be explicitly requested when needed.
   *
   * Usage examples:
   *
   *  extendedPostalCodesFor=POI
   *
   *  extendedPostalCodesFor=PAD,Addr,POI
   *
   *  extendedPostalCodesFor=None
   *
   * Extended postal code is returned as an **extendedPostalCode** property of an address. Availability is region-dependent.
   */
  extendedPostalCodesFor?: Array<
    "Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr"
  >;
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands. Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned. Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   *
   *  brandSet=Foo
   *
   *  brandSet=Foo,Bar
   *
   *  brandSet="A,B,C Comma",Bar
   */
  brandSet?: Array<string>;
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types. Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Available connector types are:
   *   * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a certain region. They are all AC single phase and the standard Voltage and standard Amperage. See also: [Plug & socket types - World Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
   *   * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called Yazaki after the original manufacturer or SAE J1772 after the standard that first published it. Mostly used in combination with 120V single phase or up to 240V single phase infrastructure.
   *   * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a cable and plug attached to the charging point.
   *   * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a socket set into the charging point.
   *   * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame after the original manufacturer. Mostly used in combination with up to 240V single phase or up to 420V three phase infrastructure.
   *   * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power Company and industrial partners. Because of this is is also known as the TEPCO's connector. It supports fast DC charging.
   *   * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309 standard. It is sometime referred to as by some combination of the standard, the color and the fact that is a single phase connector. The connector usually has the "P+N+E, 6h" configuration.
   *   * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309 standard.
   *   * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e. it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly limited to North America or the modified Type 2 (DC over Type 2) in Europe.
   *
   * Usage examples:
   *
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  connectorSet?: Array<
    | "StandardHouseholdCountrySpecific"
    | "IEC62196Type1"
    | "IEC62196Type1CCS"
    | "IEC62196Type2CableAttached"
    | "IEC62196Type2Outlet"
    | "IEC62196Type2CCS"
    | "IEC62196Type3"
    | "Chademo"
    | "IEC60309AC1PhaseBlue"
    | "IEC60309DCWhite"
    | "Tesla"
  >;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
  /**
   * Hours of operation for a POI (Points of Interest). The availability of hours of operation will vary based on the data available. If not passed, then no opening hours information will be returned.
   * Supported value: nextSevenDays
   */
  openingHours?: "nextSevenDays";
}

export interface SearchSearchPointOfInterestCategoryQueryParam {
  queryParameters: SearchSearchPointOfInterestCategoryQueryParamProperties;
}

export type SearchSearchPointOfInterestCategoryParameters = SearchSearchPointOfInterestCategoryQueryParam &
  RequestParameters;

export interface SearchGetPointOfInterestCategoryTreeQueryParamProperties {
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, except NGT and NGT-Latn. Language tag is case insensitive. When data in specified language is not available for a specific field, default language is used (English).
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
}

export interface SearchGetPointOfInterestCategoryTreeQueryParam {
  queryParameters?: SearchGetPointOfInterestCategoryTreeQueryParamProperties;
}

export type SearchGetPointOfInterestCategoryTreeParameters = SearchGetPointOfInterestCategoryTreeQueryParam &
  RequestParameters;

export interface SearchSearchAddressQueryParamProperties {
  /** The address to search for (e.g., "1 Microsoft way, Redmond, WA"), must be properly URL encoded. */
  query: string;
  /** Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and the search will enter predictive mode */
  typeahead?: boolean;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  ofs?: number;
  /** Comma separated string of country codes, e.g. FR,ES. This will limit the search to the specified countries */
  countrySet?: Array<string>;
  /** Latitude where results should be biased. E.g. 37.337 */
  lat?: number;
  /** Longitude where results should be biased. E.g. -121.89 */
  lon?: number;
  /** The radius in meters to for the results to be constrained to the defined area */
  radius?: number;
  /** Top left position of the bounding box. E.g. 37.553,-122.453 */
  topLeft?: string;
  /** Bottom right position of the bounding box. E.g. 37.553,-122.453 */
  btmRight?: string;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * Indexes for which extended postal codes should be included in the results.
   *
   * Available indexes are:
   *
   *  **Addr** = Address ranges
   *
   *  **Geo** = Geographies
   *
   *  **PAD** = Point Addresses
   *
   *  **POI** = Points of Interest
   *
   *  **Str** = Streets
   *
   *  **XStr** = Cross Streets (intersections)
   *
   * Value should be a comma separated list of index types (in any order) or **None** for no indexes.
   *
   * By default extended postal codes are included for all indexes except Geo. Extended postal code lists for geographies can be quite long so they have to be explicitly requested when needed.
   *
   * Usage examples:
   *
   *  extendedPostalCodesFor=POI
   *
   *  extendedPostalCodesFor=PAD,Addr,POI
   *
   *  extendedPostalCodesFor=None
   *
   * Extended postal code is returned as an **extendedPostalCode** property of an address. Availability is region-dependent.
   */
  extendedPostalCodesFor?: Array<
    "Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr"
  >;
  /**
   * Specifies the level of filtering performed on geographies. Narrows the search for specified geography entity types, e.g. return only municipality. The resulting response will contain the geography ID as well as the entity type matched. If you provide more than one entity as a comma separated list, endpoint will return the 'smallest entity available'. Returned Geometry ID can be used to get the geometry of that geography via [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. The following parameters are ignored when entityType is set:
   *
   * * heading
   * * number
   * * returnRoadUse
   * * returnSpeedLimit
   * * roadUse
   * * returnMatchType
   */
  entityType?:
    | "Country"
    | "CountrySubdivision"
    | "CountrySecondarySubdivision"
    | "CountryTertiarySubdivision"
    | "Municipality"
    | "MunicipalitySubdivision"
    | "Neighbourhood"
    | "PostalCodeArea";
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
}

export interface SearchSearchAddressQueryParam {
  queryParameters: SearchSearchAddressQueryParamProperties;
}

export type SearchSearchAddressParameters = SearchSearchAddressQueryParam &
  RequestParameters;

export interface SearchReverseSearchAddressQueryParamProperties {
  /** The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679". */
  query: Array<number>;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /** Boolean. To enable return of the posted speed limit */
  returnSpeedLimit?: boolean;
  /** The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is North, 90 is East and so on, values range from -360 to 360. The precision can include upto one decimal place */
  heading?: number;
  /** The radius in meters to for the results to be constrained to the defined area */
  radius?: number;
  /** Street number as a string. If a number is sent in along with the request, the response may include the side of the street (Left/Right) and also an offset position for that number */
  number?: string;
  /** Boolean. To enable return of the road use array for reverse geocodes at street level */
  returnRoadUse?: boolean;
  /** To restrict reverse geocodes to a certain type of road use. The road use array for reverse geocodes can be one or more of LimitedAccess, Arterial, Terminal, Ramp, Rotary, LocalStreet */
  roadUse?: Array<
    | "LimitedAccess"
    | "Arterial"
    | "Terminal"
    | "Ramp"
    | "Rotary"
    | "LocalStreet"
  >;
  /**
   * Format of newlines in the formatted address.
   *
   * If true, the address will contain newlines.
   * If false, newlines will be converted to commas.
   */
  allowFreeformNewline?: boolean;
  /** Include information on the type of match the geocoder achieved in the response. */
  returnMatchType?: boolean;
  /**
   * Specifies the level of filtering performed on geographies. Narrows the search for specified geography entity types, e.g. return only municipality. The resulting response will contain the geography ID as well as the entity type matched. If you provide more than one entity as a comma separated list, endpoint will return the 'smallest entity available'. Returned Geometry ID can be used to get the geometry of that geography via [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. The following parameters are ignored when entityType is set:
   *
   * * heading
   * * number
   * * returnRoadUse
   * * returnSpeedLimit
   * * roadUse
   * * returnMatchType
   */
  entityType?:
    | "Country"
    | "CountrySubdivision"
    | "CountrySecondarySubdivision"
    | "CountryTertiarySubdivision"
    | "Municipality"
    | "MunicipalitySubdivision"
    | "Neighbourhood"
    | "PostalCodeArea";
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
}

export interface SearchReverseSearchAddressQueryParam {
  queryParameters: SearchReverseSearchAddressQueryParamProperties;
}

export type SearchReverseSearchAddressParameters = SearchReverseSearchAddressQueryParam &
  RequestParameters;

export interface SearchReverseSearchCrossStreetAddressQueryParamProperties {
  /** The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679". */
  query: Array<number>;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /** The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is North, 90 is East and so on, values range from -360 to 360. The precision can include upto one decimal place */
  heading?: number;
  /** The radius in meters to for the results to be constrained to the defined area */
  radius?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
}

export interface SearchReverseSearchCrossStreetAddressQueryParam {
  queryParameters: SearchReverseSearchCrossStreetAddressQueryParamProperties;
}

export type SearchReverseSearchCrossStreetAddressParameters = SearchReverseSearchCrossStreetAddressQueryParam &
  RequestParameters;

export interface SearchSearchStructuredAddressQueryParamProperties {
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /** The 2 or 3 letter [ISO3166-1](https://www.iso.org/iso-3166-country-codes.html) country code portion of an address. E.g. US. */
  countryCode: string;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /** Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900 */
  ofs?: number;
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
  /**
   * Indexes for which extended postal codes should be included in the results.
   *
   * Available indexes are:
   *
   *  **Addr** = Address ranges
   *
   *  **Geo** = Geographies
   *
   *  **PAD** = Point Addresses
   *
   *  **POI** = Points of Interest
   *
   *  **Str** = Streets
   *
   *  **XStr** = Cross Streets (intersections)
   *
   * Value should be a comma separated list of index types (in any order) or **None** for no indexes.
   *
   * By default extended postal codes are included for all indexes except Geo. Extended postal code lists for geographies can be quite long so they have to be explicitly requested when needed.
   *
   * Usage examples:
   *
   *  extendedPostalCodesFor=POI
   *
   *  extendedPostalCodesFor=PAD,Addr,POI
   *
   *  extendedPostalCodesFor=None
   *
   * Extended postal code is returned as an **extendedPostalCode** property of an address. Availability is region-dependent.
   */
  extendedPostalCodesFor?: Array<
    "Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr"
  >;
  /**
   * Specifies the level of filtering performed on geographies. Narrows the search for specified geography entity types, e.g. return only municipality. The resulting response will contain the geography ID as well as the entity type matched. If you provide more than one entity as a comma separated list, endpoint will return the 'smallest entity available'. Returned Geometry ID can be used to get the geometry of that geography via [Get Search Polygon](https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon) API. The following parameters are ignored when entityType is set:
   *
   * * heading
   * * number
   * * returnRoadUse
   * * returnSpeedLimit
   * * roadUse
   * * returnMatchType
   */
  entityType?:
    | "Country"
    | "CountrySubdivision"
    | "CountrySecondarySubdivision"
    | "CountryTertiarySubdivision"
    | "Municipality"
    | "MunicipalitySubdivision"
    | "Neighbourhood"
    | "PostalCodeArea";
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
}

export interface SearchSearchStructuredAddressQueryParam {
  queryParameters: SearchSearchStructuredAddressQueryParamProperties;
}

export type SearchSearchStructuredAddressParameters = SearchSearchStructuredAddressQueryParam &
  RequestParameters;

export interface SearchSearchInsideGeometryBodyParam {
  /** This represents the geometry for one or more geographical features (parks, state boundary etc.) to search in and should be a GeoJSON compliant type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946) for details. */
  body: SearchInsideGeometryRequest;
}

export interface SearchSearchInsideGeometryQueryParamProperties {
  /** The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza"). Must be properly URL encoded. */
  query: string;
  /** Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100 */
  limit?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned. The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree). Usage examples:
   *
   * * **categorySet=7315** (Search Points of Interest from category Restaurant)
   *
   * * **categorySet=7315025,7315017** (Search Points of Interest of category either Italian or French Restaurant)
   */
  categorySet?: Array<number>;
  /**
   * Indexes for which extended postal codes should be included in the results.
   *
   * Available indexes are:
   *
   *  **Addr** = Address ranges
   *
   *  **Geo** = Geographies
   *
   *  **PAD** = Point Addresses
   *
   *  **POI** = Points of Interest
   *
   *  **Str** = Streets
   *
   *  **XStr** = Cross Streets (intersections)
   *
   * Value should be a comma separated list of index types (in any order) or **None** for no indexes.
   *
   * By default extended postal codes are included for all indexes except Geo. Extended postal code lists for geographies can be quite long so they have to be explicitly requested when needed.
   *
   * Usage examples:
   *
   *  extendedPostalCodesFor=POI
   *
   *  extendedPostalCodesFor=PAD,Addr,POI
   *
   *  extendedPostalCodesFor=None
   *
   * Extended postal code is returned as an **extendedPostalCode** property of an address. Availability is region-dependent.
   */
  extendedPostalCodesFor?: Array<
    "Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr"
  >;
  /** A comma separated list of indexes which should be utilized for the search. Item order does not matter. Available indexes are: Addr = Address range interpolation, Geo = Geographies, PAD = Point Addresses, POI = Points of interest, Str = Streets, Xstr = Cross Streets (intersections) */
  idxSet?: Array<"Addr" | "Geo" | "PAD" | "POI" | "Str" | "Xstr">;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
  /**
   * Hours of operation for a POI (Points of Interest). The availability of hours of operation will vary based on the data available. If not passed, then no opening hours information will be returned.
   * Supported value: nextSevenDays
   */
  openingHours?: "nextSevenDays";
}

export interface SearchSearchInsideGeometryQueryParam {
  queryParameters: SearchSearchInsideGeometryQueryParamProperties;
}

export interface SearchSearchInsideGeometryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchSearchInsideGeometryParameters = SearchSearchInsideGeometryQueryParam &
  SearchSearchInsideGeometryMediaTypesParam &
  SearchSearchInsideGeometryBodyParam &
  RequestParameters;

export interface SearchSearchAlongRouteBodyParam {
  /** This represents the route to search along and should be a valid `GeoJSON LineString` type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.4) for details. */
  body: SearchAlongRouteRequest;
}

export interface SearchSearchAlongRouteQueryParamProperties {
  /** The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza"). Must be properly URL encoded. */
  query: string;
  /** Maximum detour time of the point of interest in seconds. Max value is 3600 seconds */
  maxDetourTime: number;
  /** Maximum number of responses that will be returned. Default value is 10. Max value is 20 */
  limit?: number;
  /**
   * A comma-separated list of brand names which could be used to restrict the result to specific brands. Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned. Brands that contain a "," in their name should be put into quotes.
   *
   * Usage examples:
   *
   *  brandSet=Foo
   *
   *  brandSet=Foo,Bar
   *
   *  brandSet="A,B,C Comma",Bar
   */
  brandSet?: Array<string>;
  /**
   * A comma-separated list of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned. The list of supported categories can be discovered using  [POI Categories API](https://aka.ms/AzureMapsPOICategoryTree). Usage examples:
   *
   * * **categorySet=7315** (Search Points of Interest from category Restaurant)
   *
   * * **categorySet=7315025,7315017** (Search Points of Interest of category either Italian or French Restaurant)
   */
  categorySet?: Array<number>;
  /**
   * A comma-separated list of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types. Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   *
   * Available connector types are:
   *   * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a certain region. They are all AC single phase and the standard Voltage and standard Amperage. See also: [Plug & socket types - World Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
   *   * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called Yazaki after the original manufacturer or SAE J1772 after the standard that first published it. Mostly used in combination with 120V single phase or up to 240V single phase infrastructure.
   *   * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a cable and plug attached to the charging point.
   *   * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as a socket set into the charging point.
   *   * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard. The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with two additional direct current (DC) contacts to allow DC fast charging.
   *   * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame after the original manufacturer. Mostly used in combination with up to 240V single phase or up to 420V three phase infrastructure.
   *   * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power Company and industrial partners. Because of this is is also known as the TEPCO's connector. It supports fast DC charging.
   *   * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309 standard. It is sometime referred to as by some combination of the standard, the color and the fact that is a single phase connector. The connector usually has the "P+N+E, 6h" configuration.
   *   * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309 standard.
   *   * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e. it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly limited to North America or the modified Type 2 (DC over Type 2) in Europe.
   *
   * Usage examples:
   *
   *  connectorSet=IEC62196Type2CableAttached
   *  connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
   */
  connectorSet?: Array<
    | "StandardHouseholdCountrySpecific"
    | "IEC62196Type1"
    | "IEC62196Type1CCS"
    | "IEC62196Type2CableAttached"
    | "IEC62196Type2Outlet"
    | "IEC62196Type2CCS"
    | "IEC62196Type3"
    | "Chademo"
    | "IEC60309AC1PhaseBlue"
    | "IEC60309DCWhite"
    | "Tesla"
  >;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
  /**
   * Hours of operation for a POI (Points of Interest). The availability of hours of operation will vary based on the data available. If not passed, then no opening hours information will be returned.
   * Supported value: nextSevenDays
   */
  openingHours?: "nextSevenDays";
}

export interface SearchSearchAlongRouteQueryParam {
  queryParameters: SearchSearchAlongRouteQueryParamProperties;
}

export interface SearchSearchAlongRouteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchSearchAlongRouteParameters = SearchSearchAlongRouteQueryParam &
  SearchSearchAlongRouteMediaTypesParam &
  SearchSearchAlongRouteBodyParam &
  RequestParameters;

export interface SearchFuzzySearchBatchSyncBodyParam {
  /** The list of search fuzzy queries/requests to process. The list can contain  a max of 10,000 queries and must contain at least 1 query. */
  body: BatchRequest;
}

export interface SearchFuzzySearchBatchSyncMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchFuzzySearchBatchSyncParameters = SearchFuzzySearchBatchSyncMediaTypesParam &
  SearchFuzzySearchBatchSyncBodyParam &
  RequestParameters;

export interface SearchFuzzySearchBatchBodyParam {
  /** The list of search fuzzy queries/requests to process. The list can contain a max of 10,000 queries and must contain at least 1 query. */
  body: BatchRequest;
}

export interface SearchFuzzySearchBatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchFuzzySearchBatchParameters = SearchFuzzySearchBatchMediaTypesParam &
  SearchFuzzySearchBatchBodyParam &
  RequestParameters;
export type SearchGetFuzzySearchBatchParameters = RequestParameters;

export interface SearchSearchAddressBatchSyncBodyParam {
  /** The list of address geocoding queries/requests to process. The list can contain  a max of 10,000 queries and must contain at least 1 query. */
  body: BatchRequest;
}

export interface SearchSearchAddressBatchSyncMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchSearchAddressBatchSyncParameters = SearchSearchAddressBatchSyncMediaTypesParam &
  SearchSearchAddressBatchSyncBodyParam &
  RequestParameters;

export interface SearchSearchAddressBatchBodyParam {
  /** The list of address geocoding queries/requests to process. The list can contain  a max of 10,000 queries and must contain at least 1 query. */
  body: BatchRequest;
}

export interface SearchSearchAddressBatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchSearchAddressBatchParameters = SearchSearchAddressBatchMediaTypesParam &
  SearchSearchAddressBatchBodyParam &
  RequestParameters;
export type SearchGetSearchAddressBatchParameters = RequestParameters;

export interface SearchReverseSearchAddressBatchSyncBodyParam {
  /** The list of reverse geocoding queries/requests to process. The list can contain  a max of 10,000 queries and must contain at least 1 query. */
  body: BatchRequest;
}

export interface SearchReverseSearchAddressBatchSyncMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchReverseSearchAddressBatchSyncParameters = SearchReverseSearchAddressBatchSyncMediaTypesParam &
  SearchReverseSearchAddressBatchSyncBodyParam &
  RequestParameters;

export interface SearchReverseSearchAddressBatchBodyParam {
  /** The list of reverse geocoding queries/requests to process. The list can contain  a max of 10,000 queries and must contain at least 1 query. */
  body: BatchRequest;
}

export interface SearchReverseSearchAddressBatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SearchReverseSearchAddressBatchParameters = SearchReverseSearchAddressBatchMediaTypesParam &
  SearchReverseSearchAddressBatchBodyParam &
  RequestParameters;
export type SearchGetReverseSearchAddressBatchParameters = RequestParameters;
