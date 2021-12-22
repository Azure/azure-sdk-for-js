// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-rest-pipeline";
import {
  mapFuzzySearchOptions,
  mapReverseSearchAddressBatchResult,
  mapReverseSearchAddressResult,
  mapReverseSearchCrossStreetAddressResult,
  mapSearchAddressBatchResult,
  mapSearchAddressOptions,
  mapSearchAddressResult,
  mapSearchPointOfInterestOptions
} from "./models/mappers";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import {
  SearchGetPointOfInterestCategoryTreeOptionalParams as GetPointOfInterestCategoryTreeOptionalParams,
  SearchListPolygonsOptionalParams as ListPolygonsOptionalParams,
  PointOfInterestCategory,
  Polygon,
  ReverseSearchAddressBatchProcessResult,
  SearchReverseSearchAddressOptionalParams as ReverseSearchAddressOptionalParams,
  SearchReverseSearchCrossStreetAddressOptionalParams as ReverseSearchCrossStreetAddressOptionalParams,
  SearchAddressBatchResult,
  SearchSearchAlongRouteOptionalParams as SearchAlongRouteOptionalParams,
  SearchSearchInsideGeometryOptionalParams as SearchInsideGeometryOptionalParams,
  SearchSearchStructuredAddressOptionalParams as SearchStructuredAddressOptionalParams,
  SearchSearchNearbyPointOfInterestOptionalParams as SearchNearbyPointOfInterestOptionalParams
} from "./generated/models";
import {
  GeoJsonFeatureCollection,
  GeoJsonGeometryCollection,
  GeoJsonLineString,
  GeoJsonPolygon,
  LatLon,
  StructuredAddress
} from "./models/models";
import {
  FuzzySearchRequest,
  ReverseSearchAddressRequest,
  SearchAddressRequest
} from "./models/requests";
import {
  createFuzzySearchBatchRequest,
  createReverseSearchAddressBatchRequest,
  createSearchAddressBatchRequest
} from "./models/mappers";
import {
  BatchResult,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressResult
} from "./models/results";
import { GeneratedClient } from "./generated";
import {
  FuzzySearchBatchOptions,
  FuzzySearchOptions,
  GetPointOfInterestCategoryTreeOptions,
  GetPolygonsOptions,
  ReverseSearchAddressBatchOptions,
  ReverseSearchAddressOptions,
  ReverseSearchCrossStreetAddressOptions,
  SearchAddressBatchOptions,
  SearchAddressOptions,
  SearchAlongRouteOptions,
  MapsSearchClientOptions,
  SearchInsideGeometryOptions,
  SearchNearbyPointOfInterestOptions,
  SearchPointOfInterestCategoryOptions,
  SearchPointOfInterestOptions,
  SearchStructuredAddressOptions
} from "./models/options";
import { SearchBatchPoller } from "./models/pollers";
import { mapsClientIdPolicy } from "./credential/mapsClientIdPolicy";
import { mapsAzureKeyCredentialPolicy } from "./credential/mapsAzureKeyCredentialPolicy";
import { logger } from "./utils/logger";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";

const isMapsSearchClientOptions = (
  clientIdOrOptions: any
): clientIdOrOptions is MapsSearchClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

const isPOISearchOptions = <
  TPOISearchOptions extends
    | FuzzySearchOptions
    | SearchPointOfInterestOptions
    | SearchPointOfInterestCategoryOptions
>(
  countryFilterOrOptions: any
): countryFilterOrOptions is TPOISearchOptions =>
  countryFilterOrOptions && Array.isArray(countryFilterOrOptions) === false;

const isStringArray = (array: any[]): array is string[] => typeof array[0] === "string";

const isLatLon = (obj: any): obj is LatLon => "latitude" in obj && "longitude" in obj;

/**
 * Client class for interacting with Azure Maps Search Service.
 */
export class MapsSearchClient {
  /**
   * A reference to the auto-generated Search HTTP client.
   */
  private readonly client: GeneratedClient;
  private readonly defaultFormat: string = "json";
  /**
   * Creates an instance of MapsSearchClient.
   *
   * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
   * @param options - Options used to configure the Search Client
   */
  constructor(credential: AzureKeyCredential, options?: MapsSearchClientOptions);
  /**
   * Creates an instance of MapsSearchClient.
   *
   * @param credential - An TokenCredential instance used to authenticate requests to the service
   * @param mapsAccountClientId - The Azure Maps client id of a specific map resource
   * @param options - Options used to configure the Search Client
   */
  constructor(
    credential: TokenCredential,
    mapsAccountClientId: string,
    options?: MapsSearchClientOptions
  );
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    clientIdOrOptions?: string | MapsSearchClientOptions,
    maybeOptions: MapsSearchClientOptions = {}
  ) {
    const options = isMapsSearchClientOptions(clientIdOrOptions) ? clientIdOrOptions : maybeOptions;
    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    this.client = new GeneratedClient(internalPipelineOptions);
    if (isTokenCredential(credential)) {
      const clientId = typeof clientIdOrOptions === "string" ? clientIdOrOptions : "";
      if (!clientId) {
        throw Error("Client id is needed for TokenCredential");
      }
      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: "https://atlas.microsoft.com/.default"
        })
      );
      this.client.pipeline.addPolicy(mapsClientIdPolicy(clientId));
    } else {
      this.client.pipeline.addPolicy(mapsAzureKeyCredentialPolicy(credential));
    }
  }

  /**
   * Requests the geometry data such as a city or country outline for a set of entities.
   *
   * @param geometryIds - Comma separated list of geometry UUIDs, previously retrieved from an Online Search request.
   * @param options - Optional parameters for the operation
   */
  public async getPolygons(
    geometryIds: string[],
    options: GetPolygonsOptions = {}
  ): Promise<Polygon[]> {
    if (!Array.isArray(geometryIds) || geometryIds.length === 0) {
      throw new Error("'geometryIds' must be a non-empty array");
    }

    const { span, updatedOptions } = createSpan("MapsSearchClient-getPolygons", options);
    const internalOptions = updatedOptions as ListPolygonsOptionalParams;
    try {
      const result = await this.client.search.listPolygons(
        this.defaultFormat,
        geometryIds,
        internalOptions
      );
      return result.polygons ? result.polygons : [];
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Perform a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param query - The applicable query string (e.g., "seattle", "pizza").
   * @param coordinates - The coordinates where results should be biased
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    coordinates: LatLon,
    options?: FuzzySearchOptions
  ): Promise<SearchAddressResult>;
  /**
   * Perform a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param query - The applicable query string (e.g., "seattle", "pizza").
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    countryFilter: string[],
    options?: FuzzySearchOptions
  ): Promise<SearchAddressResult>;
  /**
   * Perform a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param query - The applicable query string (e.g., "seattle", "pizza").
   * @param coordinates - The coordinates where results should be biased
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearch(
    query: string,
    coordinates: LatLon,
    countryFilter: string[],
    options?: FuzzySearchOptions
  ): Promise<SearchAddressResult>;
  public async fuzzySearch(
    query: string,
    coordinatesOrCountryFilter: string[] | LatLon,
    countryFilterOrOptions?: string[] | FuzzySearchOptions,
    maybeOptions: FuzzySearchOptions = {}
  ): Promise<SearchAddressResult> {
    const options: FuzzySearchOptions = isPOISearchOptions<FuzzySearchOptions>(
      countryFilterOrOptions
    )
      ? countryFilterOrOptions
      : maybeOptions;
    const { span, updatedOptions } = createSpan("MapsSearchClient-fuzzySearch", options);
    const internalOptions = mapFuzzySearchOptions(updatedOptions);
    if (isLatLon(coordinatesOrCountryFilter)) {
      internalOptions.lat = coordinatesOrCountryFilter.latitude;
      internalOptions.lon = coordinatesOrCountryFilter.longitude;
      if (!isPOISearchOptions<FuzzySearchOptions>(countryFilterOrOptions)) {
        internalOptions.countryFilter = countryFilterOrOptions;
      }
    } else if (
      Array.isArray(coordinatesOrCountryFilter) &&
      isStringArray(coordinatesOrCountryFilter)
    ) {
      internalOptions.countryFilter = coordinatesOrCountryFilter;
    }
    try {
      const result = await this.client.search.fuzzySearch(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interest (POI) results by name
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks")
   * @param coordinates - The coordinates where results should be biased
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    coordinates: LatLon,
    options?: SearchPointOfInterestOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interest (POI) results by name
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks")
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    countryFilter: string[],
    options?: SearchPointOfInterestOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interest (POI) results by name
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks")
   * @param coordinates - The coordinates where results should be biased
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterest(
    query: string,
    coordinates: LatLon,
    countryFilter: string[],
    options?: SearchPointOfInterestOptions
  ): Promise<SearchAddressResult>;
  public async searchPointOfInterest(
    query: string,
    coordinatesOrCountryFilter: string[] | LatLon,
    countryFilterOrOptions?: string[] | SearchPointOfInterestOptions,
    maybeOptions: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const options: SearchPointOfInterestOptions = isPOISearchOptions<SearchPointOfInterestOptions>(
      countryFilterOrOptions
    )
      ? countryFilterOrOptions
      : maybeOptions;
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchPointOfInterest", options);
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (isLatLon(coordinatesOrCountryFilter)) {
      internalOptions.lat = coordinatesOrCountryFilter.latitude;
      internalOptions.lon = coordinatesOrCountryFilter.longitude;
      if (!isPOISearchOptions<SearchPointOfInterestOptions>(countryFilterOrOptions)) {
        internalOptions.countryFilter = countryFilterOrOptions;
      }
    } else if (
      Array.isArray(coordinatesOrCountryFilter) &&
      isStringArray(coordinatesOrCountryFilter)
    ) {
      internalOptions.countryFilter = coordinatesOrCountryFilter;
    }
    try {
      const result = await this.client.search.searchPointOfInterest(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interest (POI) results around a specific location.
   *
   * @param coordinates - The coordinates for the nearby POI search
   * @param options - Optional parameters for the operation
   */
  public async searchNearbyPointOfInterest(
    coordinates: LatLon,
    options: SearchNearbyPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-searchNearbyPointOfInterest",
      options
    );
    const internalOptions: SearchNearbyPointOfInterestOptionalParams = updatedOptions;
    try {
      const result = await this.client.search.searchNearbyPointOfInterest(
        this.defaultFormat,
        coordinates.latitude,
        coordinates.longitude,
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param query - The POI category to search for (e.g., "AIRPORT", "RESTAURANT")
   * @param coordinates - The coordinates where results should be biased
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    coordinates: LatLon,
    options?: SearchPointOfInterestCategoryOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param query - The POI category to search for (e.g., "AIRPORT", "RESTAURANT")
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    countryFilter: string[],
    options?: SearchPointOfInterestCategoryOptions
  ): Promise<SearchAddressResult>;
  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param query - The POI category to search for (e.g., "AIRPORT", "RESTAURANT")
   * @param coordinates - The coordinates where results should be biased
   * @param countryFilter - Counter filters that limit the search to the specified countries
   * @param options - Optional parameters for the operation
   */
  public async searchPointOfInterestCategory(
    query: string,
    coordinates: LatLon,
    countryFilter: string[],
    options?: SearchPointOfInterestCategoryOptions
  ): Promise<SearchAddressResult>;
  public async searchPointOfInterestCategory(
    query: string,
    coordinatesOrCountryFilter: string[] | LatLon,
    countryFilterOrOptions?: string[] | SearchPointOfInterestCategoryOptions,
    maybeOptions: SearchPointOfInterestCategoryOptions = {}
  ): Promise<SearchAddressResult> {
    const options: SearchPointOfInterestCategoryOptions = isPOISearchOptions<
      SearchPointOfInterestCategoryOptions
    >(countryFilterOrOptions)
      ? countryFilterOrOptions
      : maybeOptions;
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-searchPointOfInterestCategory",
      options
    );
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (isLatLon(coordinatesOrCountryFilter)) {
      internalOptions.lat = coordinatesOrCountryFilter.latitude;
      internalOptions.lon = coordinatesOrCountryFilter.longitude;
      if (!isPOISearchOptions<SearchPointOfInterestOptions>(countryFilterOrOptions)) {
        internalOptions.countryFilter = countryFilterOrOptions;
      }
    } else if (
      Array.isArray(coordinatesOrCountryFilter) &&
      isStringArray(coordinatesOrCountryFilter)
    ) {
      internalOptions.countryFilter = coordinatesOrCountryFilter;
    }
    try {
      const result = await this.client.search.searchPointOfInterestCategory(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests a full list of supported Points of Interest (POI) categories.
   *
   * @param options - Optional parameters for the operation
   */
  public async getPointOfInterestCategoryTree(
    options: GetPointOfInterestCategoryTreeOptions = {}
  ): Promise<PointOfInterestCategory[]> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-getPointOfInterestCategoryTree",
      options
    );
    const internalOptions = updatedOptions as GetPointOfInterestCategoryTreeOptionalParams;
    try {
      const result = await this.client.search.getPointOfInterestCategoryTree(
        this.defaultFormat,
        internalOptions
      );
      return result.categories ? result.categories : [];
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Geocodes a address.
   *
   * @param query - The address to search for (e.g., "1 Microsoft way, Redmond, WA")
   * @param options - Optional parameters for the operation
   */
  public async searchAddress(
    query: string,
    options: SearchAddressOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchAddress", options);
    const internalOptions = mapSearchAddressOptions(updatedOptions);
    try {
      const result = await this.client.search.searchAddress(
        this.defaultFormat,
        query,
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Translates a coordinates into a human understandable street address.
   *
   * @param coordinates - The coordinates for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchAddress(
    coordinates: LatLon,
    options: ReverseSearchAddressOptions = {}
  ): Promise<ReverseSearchAddressResult> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-reverseSearchAddress", options);
    const internalOptions = updatedOptions as ReverseSearchAddressOptionalParams;
    try {
      const result = await this.client.search.reverseSearchAddress(
        this.defaultFormat,
        [coordinates.latitude, coordinates.longitude],
        internalOptions
      );
      return mapReverseSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Translates a coordinates into a human understandable cross street.
   *
   * @param coordinates - The coordinates for the reverse search query
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchCrossStreetAddress(
    coordinates: LatLon,
    options: ReverseSearchCrossStreetAddressOptions = {}
  ): Promise<ReverseSearchCrossStreetAddressResult> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-reverseSearchCrossStreetAddress",
      options
    );
    const internalOptions = updatedOptions as ReverseSearchCrossStreetAddressOptionalParams;
    try {
      const result = await this.client.search.reverseSearchCrossStreetAddress(
        this.defaultFormat,
        [coordinates.latitude, coordinates.longitude],
        internalOptions
      );
      return mapReverseSearchCrossStreetAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Geocodes a structured address.
   *
   * @param structuredAddress - Structured address used for geocoding
   * @param options - Optional parameters for the operation
   */
  public async searchStructuredAddress(
    structuredAddress: StructuredAddress,
    options: SearchStructuredAddressOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-searchStructuredAddress",
      options
    );
    const { countryCode, ...structuredAddressOptions } = structuredAddress;
    const internalOptions = {
      ...updatedOptions,
      ...structuredAddressOptions
    } as SearchStructuredAddressOptionalParams;
    try {
      const result = await this.client.search.searchStructuredAddress(
        this.defaultFormat,
        countryCode,
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Performs a free form search inside a single geometry or many of them.
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza").
   * @param geometry - This represents the geometry for one or more geographical features (parks, state
   *                   boundary etc.) to search in and should be a GeoJSON compliant type. Please refer to [RFC
   *                   7946](https://tools.ietf.org/html/rfc7946) for details.
   * @param options - Optional parameters for the operation
   */
  public async searchInsideGeometry(
    query: string,
    geometry: GeoJsonPolygon | GeoJsonGeometryCollection | GeoJsonFeatureCollection,
    options: SearchInsideGeometryOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchInsideGeometry", options);
    const internalOptions = updatedOptions as SearchInsideGeometryOptionalParams;
    try {
      const result = await this.client.search.searchInsideGeometry(
        this.defaultFormat,
        query,
        {
          geometry: (geometry as unknown) as Record<string, unknown>
        },
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Performs a fuzzy search for POIs along a specified route.
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza").
   * @param maxDetourTime - Maximum detour time of the point of interest in seconds. Max value is 3600 seconds
   * @param route - This represents the route to search along and should be a valid `GeoJSON LineString` type.
   * @param options - Optional parameters for the operation
   */
  public async searchAlongRoute(
    query: string,
    maxDetourTime: number,
    route: GeoJsonLineString,
    options: SearchAlongRouteOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchAlongRoute", options);
    const internalOptions = updatedOptions as SearchAlongRouteOptionalParams;
    try {
      const result = await this.client.search.searchAlongRoute(
        this.defaultFormat,
        query,
        maxDetourTime,
        { route: route },
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of fuzzy search queries. The method return the result directly.
   *
   * @param requests - The list of search requests to process. The list can contain a max of 100 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearchBatchSync(
    requests: FuzzySearchRequest[],
    options: FuzzySearchBatchOptions = {}
  ): Promise<BatchResult<SearchAddressResult>> {
    // TODO: Check reqeusts number
    const { span, updatedOptions } = createSpan("MapsSearchClient-fuzzySearchBatchSync", options);
    const batchRequest = createFuzzySearchBatchRequest(requests);
    console.log(batchRequest);
    try {
      const internalResult = await this.client.search.fuzzySearchBatchSync(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
      return mapSearchAddressBatchResult(internalResult);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of fuzzy search queries. The method returns a poller for retrieving the result later.
   *
   * @param requests - The list of search requests to process. The list can contain a max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginFuzzySearchBatch(
    requests: FuzzySearchRequest[],
    options: FuzzySearchBatchOptions = {}
  ): Promise<
    PollerLike<
      PollOperationState<BatchResult<SearchAddressResult>>,
      BatchResult<SearchAddressResult>
    >
  > {
    // TODO: Check reqeusts number
    const { span, updatedOptions } = createSpan("MapsSearchClient-beginFuzzySearchBatch", options);
    const batchRequest = createFuzzySearchBatchRequest(requests);
    try {
      const internalPoller = await this.client.search.beginFuzzySearchBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
      return new SearchBatchPoller<BatchResult<SearchAddressResult>, SearchAddressBatchResult>(
        internalPoller,
        mapSearchAddressBatchResult
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of geocoding queries. The method return the result directly.
   *
   * @param requests - The list of search requests to process. The list can contain a max of 100 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async searchAddressBatchSync(
    requests: SearchAddressRequest[],
    options: SearchAddressBatchOptions = {}
  ): Promise<BatchResult<SearchAddressResult>> {
    // TODO: Check reqeusts number
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchAddressBatchSync", options);
    const batchRequest = createSearchAddressBatchRequest(requests);
    console.log(batchRequest);
    try {
      const internalResult = await this.client.search.searchAddressBatchSync(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
      return mapSearchAddressBatchResult(internalResult);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of geocoding queries. The method returns a poller for retrieving the result later.
   *
   * @param requests - The list of search requests to process. The list can contain a max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginSearchAddressBatch(
    requests: SearchAddressRequest[],
    options: SearchAddressBatchOptions = {}
  ): Promise<
    PollerLike<
      PollOperationState<BatchResult<SearchAddressResult>>,
      BatchResult<SearchAddressResult>
    >
  > {
    // TODO: Check reqeusts number
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-beginSearchAddressBatch",
      options
    );
    const batchRequest = createSearchAddressBatchRequest(requests);
    try {
      const internalPoller = await this.client.search.beginSearchAddressBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
      return new SearchBatchPoller<BatchResult<SearchAddressResult>, SearchAddressBatchResult>(
        internalPoller,
        mapSearchAddressBatchResult
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of reverse geocoding queries. The method return the result directly.
   *
   * @param requests - The list of search requests to process. The list can contain a max of 100 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchAddressBatchSync(
    requests: ReverseSearchAddressRequest[],
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<BatchResult<ReverseSearchAddressResult>> {
    // TODO: Check reqeusts number
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-reverseSearchAddressBatchSync",
      options
    );
    const batchRequest = createReverseSearchAddressBatchRequest(requests);
    console.log(batchRequest);
    try {
      const internalResult = await this.client.search.reverseSearchAddressBatchSync(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
      return mapReverseSearchAddressBatchResult(internalResult);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of reverse geocoding queries. The method returns a poller for retrieving the result later.
   *
   * @param requests - The list of search requests to process. The list can contain a max of 10,000 queries and must contain at least 1 query.
   * @param options - Optional parameters for the operation
   */
  public async beginReverseSearchAddressBatch(
    requests: ReverseSearchAddressRequest[],
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<
    PollerLike<
      PollOperationState<BatchResult<ReverseSearchAddressResult>>,
      BatchResult<ReverseSearchAddressResult>
    >
  > {
    // TODO: Check reqeusts number
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-beginReverseSearchAddressBatch",
      options
    );
    const batchRequest = createReverseSearchAddressBatchRequest(requests);
    try {
      const internalPoller = await this.client.search.beginReverseSearchAddressBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
      return new SearchBatchPoller<
        BatchResult<ReverseSearchAddressResult>,
        ReverseSearchAddressBatchProcessResult
      >(internalPoller, mapSearchAddressBatchResult);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
