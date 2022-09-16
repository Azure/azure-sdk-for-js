// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  GeoJsonCircleOrPolygonFeature,
  GeoJsonCircleOrPolygonFeatureCollection,
  GeoJsonFeatureCollection,
  GeoJsonLineString,
  GeoJsonPolygonFeature,
  LatLon,
  SearchGeometry,
  StructuredAddress,
} from "./models/models";
import {
  BatchPoller,
  BatchPollerProxy,
  createAzureMapsKeyCredentialPolicy,
  createMapsClientIdPolicy,
} from "../../maps-common/src";
import {
  BatchResult,
  EntityGeometry,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressResult,
} from "./models/results";
import {
  FuzzySearchBatchOptions,
  FuzzySearchOptions,
  FuzzySearchRequest,
  GetGeometriesOptions,
  GetPointOfInterestCategoriesOptions,
  MapsSearchClientOptions,
  ReverseSearchAddressBatchOptions,
  ReverseSearchAddressOptions,
  ReverseSearchAddressRequest,
  ReverseSearchCrossStreetAddressOptions,
  SearchAddressBatchOptions,
  SearchAddressOptions,
  SearchAddressRequest,
  SearchAlongRouteOptions,
  SearchInsideGeometryOptions,
  SearchNearbyPointOfInterestOptions,
  SearchPointOfInterestCategoryOptions,
  SearchPointOfInterestOptions,
  SearchQuery,
  SearchStructuredAddressOptions,
} from "./models/options";
import {
  SearchGetPointOfInterestCategoryTreeOptionalParams as GetPointOfInterestCategoryTreeOptionalParams,
  SearchListPolygonsOptionalParams as ListPolygonsOptionalParams,
  PointOfInterestCategory,
  ReverseSearchAddressBatchResult,
  SearchReverseSearchAddressOptionalParams as ReverseSearchAddressOptionalParams,
  SearchReverseSearchCrossStreetAddressOptionalParams as ReverseSearchCrossStreetAddressOptionalParams,
  SearchAddressBatchResult,
  SearchSearchAlongRouteOptionalParams as SearchAlongRouteOptionalParams,
  SearchFuzzySearchBatchOptionalParams,
  SearchSearchInsideGeometryOptionalParams as SearchInsideGeometryOptionalParams,
  SearchSearchNearbyPointOfInterestOptionalParams as SearchNearbyPointOfInterestOptionalParams,
  SearchReverseSearchAddressBatchOptionalParams,
  SearchSearchAddressBatchOptionalParams,
  SearchSearchStructuredAddressOptionalParams as SearchStructuredAddressOptionalParams,
} from "./generated/models";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import {
  createFuzzySearchBatchRequest,
  createReverseSearchAddressBatchRequest,
  createSearchAddressBatchRequest,
} from "./models/mappers";
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
import { GeneratedClient } from "./generated";
import { OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./utils/tracing";
import { logger } from "./utils/logger";

const isMapsSearchClientOptions = (
  clientIdOrOptions: any
): clientIdOrOptions is MapsSearchClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

const isGeoJsonCircleOrPolygonFeatureCollection = (
  geometry: SearchGeometry
): geometry is GeoJsonCircleOrPolygonFeatureCollection => {
  return "features" in geometry;
};

const isGeoJsonPolygonFeature = (
  feature: GeoJsonCircleOrPolygonFeature
): feature is GeoJsonPolygonFeature => {
  return !("properties" in feature);
};

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
   *
   * const credential = new AzureKeyCredential("<subscription-key>");
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
   *
   * const credential = new DefaultAzureCredential();
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
          scopes: `${options.endpoint || "https://atlas.microsoft.com"}/.default`,
        })
      );
      this.client.pipeline.addPolicy(createMapsClientIdPolicy(clientId));
    } else {
      this.client.pipeline.addPolicy(createAzureMapsKeyCredentialPolicy(credential));
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
              providerId: p.providerId,
              geometryData: p.geometryData as GeoJsonFeatureCollection,
            };
          })
        : [];
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (e as any).message,
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
    const { query, coordinates, countryCodeFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryCodeFilter?: string[];
    };

    const internalOptions = mapFuzzySearchOptions(updatedOptions);
    if (coordinates) {
      internalOptions.lat = coordinates[0];
      internalOptions.lon = coordinates[1];
    }

    if (countryCodeFilter) {
      internalOptions.countryCodeFilter = countryCodeFilter;
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
        message: (e as any).message,
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
    const { query, coordinates, countryCodeFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryCodeFilter?: string[];
    };

    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (coordinates) {
      internalOptions.lat = coordinates[0];
      internalOptions.lon = coordinates[1];
    }

    if (countryCodeFilter) {
      internalOptions.countryCodeFilter = countryCodeFilter;
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
        message: (e as any).message,
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
        coordinates[0],
        coordinates[1],
        internalOptions
      );
      return mapSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (e as any).message,
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
    const { query, coordinates, countryCodeFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryCodeFilter?: string[];
    };
    const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
    if (coordinates) {
      internalOptions.lat = coordinates[0];
      internalOptions.lon = coordinates[1];
    }

    if (countryCodeFilter) {
      internalOptions.countryCodeFilter = countryCodeFilter;
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
        message: (e as any).message,
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
        message: (e as any).message,
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
        message: (e as any).message,
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
        [coordinates[0], coordinates[1]],
        internalOptions
      );
      return mapReverseSearchAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (e as any).message,
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
        [coordinates[0], coordinates[1]],
        internalOptions
      );
      return mapReverseSearchCrossStreetAddressResult(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (e as any).message,
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
        message: (e as any).message,
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
    /** Patch an empty object to properties since it's required */
    if (isGeoJsonCircleOrPolygonFeatureCollection(geometry)) {
      console.log("is feature collection");
      geometry.features = geometry.features.map((feature) => {
        if (isGeoJsonPolygonFeature(feature)) {
          console.log("is polygon");
          return {
            ...feature,
            properties: {},
          };
        }
        return feature;
      });
    }
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
        message: (e as any).message,
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
        message: (e as any).message,
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
    options: FuzzySearchBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    return this.createFuzzySearchBatchPoller(requests, options);
  }

  /**
   * Continue the fuzzy search request with a serialized state from other poller.
   *
   * @example
   * ```js
   * const serializedState = poller.toString()
   * const rehydratedPoller = resumeFuzzySearchBatch(serializedState)
   * rehydratedPoller.poll()
   * ```
   *
   * @param resumeFrom - The serialized state from the previous poller.
   * @param options - Optional parameters for the operation.
   *
   */
  public async resumeFuzzySearchBatch(
    resumeFrom: string,
    options: FuzzySearchBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    return this.createFuzzySearchBatchPoller(undefined, { ...options, resumeFrom });
  }

  private async createFuzzySearchBatchPoller(
    requests: FuzzySearchRequest[] = [],
    options: SearchFuzzySearchBatchOptionalParams = {}
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
        message: (e as any).message,
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
    options: SearchAddressBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    return this.createSearchAddressBatchPoller(requests, options);
  }

  /**
   * Continue the address search request with a serialized state from other poller.
   *
   * @example
   * ```js
   * const serializedState = poller.toString()
   * const rehydratedPoller = resumeSearchAddressBatch(serializedState)
   * rehydratedPoller.poll()
   * ```
   *
   * @param resumeFrom - The serialized state from the previous poller.
   * @param options - Optional parameters for the operation.
   *
   */
  public async resumeSearchAddressBatch(
    resumeFrom: string,
    options: SearchAddressBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<SearchAddressResult>>> {
    return this.createSearchAddressBatchPoller(undefined, { ...options, resumeFrom });
  }

  private async createSearchAddressBatchPoller(
    requests: SearchAddressRequest[] = [],
    options: SearchSearchAddressBatchOptionalParams = {}
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
        message: (e as any).message,
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
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<ReverseSearchAddressResult>>> {
    return this.createReverseSearchAddressBatchPoller(requests, options);
  }

  /**
   * Continue the reverse address search request with a serialized state from other poller.
   *
   * @example
   * ```js
   * const serializedState = poller.toString()
   * const rehydratedPoller = resumeReverseSearchAddressBatch(serializedState)
   * rehydratedPoller.poll()
   * ```
   *
   * @param resumeFrom - The serialized state from the previous poller.
   * @param options - Optional parameters for the operation.
   *
   */
  public async resumeReverseSearchAddressBatch(
    resumeFrom: string,
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<ReverseSearchAddressResult>>> {
    return this.createReverseSearchAddressBatchPoller(undefined, { ...options, resumeFrom });
  }

  private async createReverseSearchAddressBatchPoller(
    requests: ReverseSearchAddressRequest[] = [],
    options: SearchReverseSearchAddressBatchOptionalParams = {}
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
        message: (e as any).message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
