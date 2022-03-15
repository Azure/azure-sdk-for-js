// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import {
  createMapsAzureKeyCredentialPolicy,
  createMapsClientIdPolicy,
  LatLon,
  GeoJsonFeatureCollection,
  GeoJsonLineString,
  BatchPoller,
  BatchPollerProxy,
} from "@azure/maps-common";
import {
  mapFuzzySearchOptions,
  mapReverseSearchAddressBatchResult,
  mapReverseSearchAddressResult,
  mapReverseSearchCrossStreetAddressResult,
  mapSearchAddressBatchResult,
  mapSearchAddressOptions,
  mapSearchAddressResult,
  mapSearchPointOfInterestOptions,
} from "./models/mappers";
import {
  SearchGetPointOfInterestCategoryTreeOptionalParams as GetPointOfInterestCategoryTreeOptionalParams,
  SearchListPolygonsOptionalParams as ListPolygonsOptionalParams,
  PointOfInterestCategory,
  ReverseSearchAddressBatchResult,
  SearchReverseSearchAddressOptionalParams as ReverseSearchAddressOptionalParams,
  SearchReverseSearchCrossStreetAddressOptionalParams as ReverseSearchCrossStreetAddressOptionalParams,
  SearchAddressBatchResult,
  SearchSearchAlongRouteOptionalParams as SearchAlongRouteOptionalParams,
  SearchSearchInsideGeometryOptionalParams as SearchInsideGeometryOptionalParams,
  SearchSearchStructuredAddressOptionalParams as SearchStructuredAddressOptionalParams,
  SearchSearchNearbyPointOfInterestOptionalParams as SearchNearbyPointOfInterestOptionalParams,
} from "./generated/models";
import { SearchGeometry, StructuredAddress } from "./models/models";
import {
  createFuzzySearchBatchRequest,
  createReverseSearchAddressBatchRequest,
  createSearchAddressBatchRequest,
} from "./models/mappers";
import {
  EntityGeometry,
  BatchResult,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressResult,
} from "./models/results";
import { GeneratedClient } from "./generated";
import {
  FuzzySearchBatchOptions,
  FuzzySearchOptions,
  GetPointOfInterestCategoriesOptions,
  GetGeometriesOptions,
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
  SearchStructuredAddressOptions,
  BatchPollerOptions,
  SearchQuery,
  FuzzySearchRequest,
  SearchAddressRequest,
  ReverseSearchAddressRequest,
} from "./models/options";
import { logger } from "./utils/logger";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { OperationOptions } from "@azure/core-client";

const isMapsSearchClientOptions = (
  clientIdOrOptions: any
): clientIdOrOptions is MapsSearchClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

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
   * Creates an instance of MapsSearchClient from a subscription key.
   *
   * @example
   * ```ts
   * import { MapsSearchClient, AzureKeyCredential } from "@azure/maps-search";
   * const credential = new AzureKeyCredential("<subscription-key>");
   *
   * const client = new MapsSearchClient(credential);
   *```
   *
   * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
   * @param options - Options used to configure the Search Client
   */
  constructor(credential: AzureKeyCredential, options?: MapsSearchClientOptions);
  /**
   * Creates an instance of MapsSearchClient from an Azure Identity `TokenCredential`.
   *
   * @example
   * ```ts
   * import { MapsSearchClient } from "@azure/maps-search";
   * import { DefaultAzureCredential } from "@azure/identity";
   * const credential = new DefaultAzureCredential();
   *
   * const client = new MapsSearchClient(credential, "<maps-account-client-id>");
   *```
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
          logger: logger.info,
        },
      },
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
          scopes: "https://atlas.microsoft.com/.default",
        })
      );
      this.client.pipeline.addPolicy(createMapsClientIdPolicy(clientId));
    } else {
      this.client.pipeline.addPolicy(createMapsAzureKeyCredentialPolicy(credential));
    }
  }

  /**
   * Requests the geometry data such as a city or country outline for a set of entities.
   *
   * @param geometryIds - Comma separated list of geometry UUIDs, previously retrieved from an Online Search request.
   * @param options - Optional parameters for the operation
   */
  public async getGeometries(
    geometryIds: string[],
    options: GetGeometriesOptions = {}
  ): Promise<EntityGeometry[]> {
    if (!Array.isArray(geometryIds) || geometryIds.length === 0) {
      throw new Error("geometryIds must be a non-empty array");
    }

    const { span, updatedOptions } = createSpan("MapsSearchClient-getGeometries", options);
    const internalOptions = updatedOptions as ListPolygonsOptionalParams;
    try {
      const result = await this.client.search.listPolygons(
        this.defaultFormat,
        geometryIds,
        internalOptions
      );
      return result.polygons
        ? result.polygons.map((p) => {
            return {
              providerID: p.providerID,
              geometryData: p.geometryData
                ? (p.geometryData as GeoJsonFeatureCollection)
                : undefined,
            };
          })
        : [];
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Performs a free-form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens.
   *
   * @param searchQuery - Text query and location information to search
   * @param options - Options for fuzzy search
   */
  public async fuzzySearch(
    searchQuery: SearchQuery,
    options: FuzzySearchOptions & OperationOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-fuzzySearch", options);
    const { query, coordinates, countryFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryFilter?: string[];
    };

    const internalOptions = mapFuzzySearchOptions(updatedOptions);
    if (coordinates) {
      internalOptions.lat = coordinates.latitude;
      internalOptions.lon = coordinates.longitude;
    }

    if (countryFilter) {
      internalOptions.countryFilter = countryFilter;
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
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interest (POI) results by name
   *
   * @param searchQuery - Text query and location information to search
   * @param options - Options for search POI
   */
  public async searchPointOfInterest(
    searchQuery: SearchQuery,
    options: SearchPointOfInterestOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchPointOfInterest", options);
    const { query, coordinates, countryFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryFilter?: string[];
    };

    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (coordinates) {
      internalOptions.lat = coordinates.latitude;
      internalOptions.lon = coordinates.longitude;
    }

    if (countryFilter) {
      internalOptions.countryFilter = countryFilter;
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
        message: e.message,
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
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests points of interests (POI) results from given category.
   *
   * @param searchQuery - Text query and location information to search
   * @param options - Options for search POI category
   */
  public async searchPointOfInterestCategory(
    searchQuery: SearchQuery,
    options: SearchPointOfInterestCategoryOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-searchPointOfInterestCategory",
      options
    );
    const { query, coordinates, countryFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryFilter?: string[];
    };
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (coordinates) {
      internalOptions.lat = coordinates.latitude;
      internalOptions.lon = coordinates.longitude;
    }

    if (countryFilter) {
      internalOptions.countryFilter = countryFilter;
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
        message: e.message,
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
  public async getPointOfInterestCategories(
    options: GetPointOfInterestCategoriesOptions = {}
  ): Promise<PointOfInterestCategory[]> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-getPointOfInterestCategories",
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
        message: e.message,
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
    options: SearchAddressOptions & OperationOptions = {}
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
        message: e.message,
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
    options: ReverseSearchAddressOptions & OperationOptions = {}
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
        message: e.message,
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
        message: e.message,
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
      ...structuredAddressOptions,
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
        message: e.message,
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
    geometry: SearchGeometry,
    options: SearchInsideGeometryOptions = {}
  ): Promise<SearchAddressResult> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchInsideGeometry", options);
    const internalOptions = updatedOptions as SearchInsideGeometryOptionalParams;
    try {
      const result = await this.client.search.searchInsideGeometry(
        this.defaultFormat,
        query,
        {
          geometry: geometry as unknown as Record<string, unknown>,
        },
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of fuzzy search requests.
   * The method return the result directly.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 100 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async fuzzySearchBatch(
    requests: FuzzySearchRequest[],
    options: FuzzySearchBatchOptions = {}
  ): Promise<BatchResult<SearchAddressResult>> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-fuzzySearchBatch", options);
    const batchRequest = createFuzzySearchBatchRequest(requests);
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
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of fuzzy search requests.
   * The method returns a poller for retrieving the result later.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 10,000 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async beginFuzzySearchBatch(
    requests: FuzzySearchRequest[],
    options: FuzzySearchBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-beginFuzzySearchBatch", options);
    const batchRequest = createFuzzySearchBatchRequest(requests);
    try {
      const internalPoller = await this.client.search.beginFuzzySearchBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );
      const poller = new BatchPollerProxy<
        BatchResult<SearchAddressResult>,
        SearchAddressBatchResult
      >(internalPoller, mapSearchAddressBatchResult);

      await poller.poll();
      return poller;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves the result of a previous fuzzy search batch request.
   * The method returns a poller for retrieving the result.
   *
   * @param batchId - Batch id for querying the operation.
   * @param options - Optional parameters for the operation
   */
  public async beginGetFuzzySearchBatchResult(
    batchId: string,
    options: FuzzySearchBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-beginGetFuzzySearchBatchResult",
      options
    );
    try {
      const internalPoller = await this.client.search.beginGetFuzzySearchBatch(
        batchId,
        updatedOptions
      );
      const poller = new BatchPollerProxy<
        BatchResult<SearchAddressResult>,
        SearchAddressBatchResult
      >(internalPoller, mapSearchAddressBatchResult);

      await poller.poll();
      return poller;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of geocoding requests.
   * The method return the result directly.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 100 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async searchAddressBatch(
    requests: SearchAddressRequest[],
    options: SearchAddressBatchOptions = {}
  ): Promise<BatchResult<SearchAddressResult>> {
    const { span, updatedOptions } = createSpan("MapsSearchClient-searchAddressBatch", options);
    const batchRequest = createSearchAddressBatchRequest(requests);
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
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of geocoding requests.
   * The method returns a poller for retrieving the result later.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 10,000 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async beginSearchAddressBatch(
    requests: SearchAddressRequest[],
    options: SearchAddressBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
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
      const poller = new BatchPollerProxy<
        BatchResult<SearchAddressResult>,
        SearchAddressBatchResult
      >(internalPoller, mapSearchAddressBatchResult);

      await poller.poll();
      return poller;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves the result of a previous search address batch request
   * The method returns a poller for retrieving the result.
   *
   * @param batchId - Batch id for querying the operation.
   * @param options - Optional parameters for the operation
   */
  public async beginGetSearchAddressBatchResult(
    batchId: string,
    options: SearchAddressBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-beginGetSearchAddressBatchResult",
      options
    );
    try {
      const internalPoller = await this.client.search.beginGetSearchAddressBatch(
        batchId,
        updatedOptions
      );
      const poller = new BatchPollerProxy<
        BatchResult<SearchAddressResult>,
        SearchAddressBatchResult
      >(internalPoller, mapSearchAddressBatchResult);

      await poller.poll();
      return poller;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of reverse geocoding requests.
   * The method return the result directly.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 100 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async reverseSearchAddressBatch(
    requests: ReverseSearchAddressRequest[],
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<BatchResult<ReverseSearchAddressResult>> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-reverseSearchAddressBatch",
      options
    );
    const batchRequest = createReverseSearchAddressBatchRequest(requests);
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
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends batches of reverse geocoding requests.
   * The method returns a poller for retrieving the result later.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 10,000 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async beginReverseSearchAddressBatch(
    requests: ReverseSearchAddressRequest[],
    options: ReverseSearchAddressBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<ReverseSearchAddressResult>>> {
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

      const poller = new BatchPollerProxy<
        BatchResult<ReverseSearchAddressResult>,
        ReverseSearchAddressBatchResult
      >(internalPoller, mapReverseSearchAddressBatchResult);

      await poller.poll();
      return poller;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves the result of a previous reverse search address batch request.
   * The method returns a poller for retrieving the result.
   *
   * @param batchId - Batch id for querying the operation.
   * @param options - Optional parameters for the operation
   */
  public async beginGetReverseSearchAddressBatchResult(
    batchId: string,
    options: ReverseSearchAddressBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    const { span, updatedOptions } = createSpan(
      "MapsSearchClient-beginGetReverseSearchAddressBatchResult",
      options
    );
    try {
      const internalPoller = await this.client.search.beginGetReverseSearchAddressBatch(
        batchId,
        updatedOptions
      );
      const poller = new BatchPollerProxy<
        BatchResult<ReverseSearchAddressResult>,
        ReverseSearchAddressBatchResult
      >(internalPoller, mapReverseSearchAddressBatchResult);

      await poller.poll();
      return poller;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
