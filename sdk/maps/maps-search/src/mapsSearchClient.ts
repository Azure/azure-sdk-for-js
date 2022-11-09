// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Mappers from "./generated/models/mappers";
import * as Parameters from "./generated/models/parameters";
import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { OperationOptions, OperationSpec, createSerializer } from "@azure/core-client";
import {
  createAzureMapsKeyCredentialPolicy,
  createMapsClientIdPolicy,
  createSendPollRequest,
  getRawResponse,
} from "@azure/maps-common";
import {
  EntityGeometry,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressResult,
} from "./models/results";
import {
  FuzzySearchBatchPoller,
  ReverseSearchAddressBatchPoller,
  SearchAddressBatchPoller,
} from "./models/poller";
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
  SearchSearchInsideGeometryOptionalParams as SearchInsideGeometryOptionalParams,
  SearchSearchNearbyPointOfInterestOptionalParams as SearchNearbyPointOfInterestOptionalParams,
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
  mapReverseSearchAddressBatchResult,
} from "./models/mappers";
import {
  mapFuzzySearchOptions,
  mapReverseSearchAddressResult,
  mapReverseSearchCrossStreetAddressResult,
  mapSearchAddressBatchResult,
  mapSearchAddressOptions,
  mapSearchAddressResult,
  mapSearchPointOfInterestOptions,
} from "./models/mappers";
import { createHttpPoller } from "@azure/core-lro";
import { GeneratedClient } from "./generated";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import { logger } from "./utils/logger";
import { SDK_VERSION } from "./constants";

const serializer = createSerializer(Mappers, false);

const getFuzzySearchBatchOperationSpec: OperationSpec = {
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SearchAddressBatchResult,
    },
    202: {
      headersMapper: Mappers.SearchGetFuzzySearchBatchHeaders,
    },
  },
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.accept, Parameters.clientId],
  serializer,
};

const getSearchAddressBatchOperationSpec: OperationSpec = {
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SearchAddressBatchResult,
    },
    202: {
      headersMapper: Mappers.SearchGetSearchAddressBatchHeaders,
    },
  },
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.accept, Parameters.clientId],
  serializer,
};

const getReverseSearchAddressBatchOperationSpec: OperationSpec = {
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ReverseSearchAddressBatchResult,
    },
    202: {
      headersMapper: Mappers.SearchGetReverseSearchAddressBatchHeaders,
    },
  },
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.accept, Parameters.clientId],
  serializer,
};

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
  private readonly tracing: TracingClient;
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
    this.tracing = createTracingClient({
      packageName: "@azure/maps-search",
      packageVersion: SDK_VERSION,
      namespace: "Microsoft.Maps",
    });
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

    return this.tracing.withSpan(
      "MapsSearchClient.getGeometries",
      options,
      async (updatedOptions) => {
        const internalOptions = updatedOptions as ListPolygonsOptionalParams;
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
      }
    );
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
    const { query, coordinates, countryCodeFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryCodeFilter?: string[];
    };
    return this.tracing.withSpan(
      "MapsSearchClient.fuzzySearch",
      options,
      async (updatedOptions) => {
        const internalOptions = mapFuzzySearchOptions(updatedOptions);
        if (coordinates) {
          internalOptions.lat = coordinates[0];
          internalOptions.lon = coordinates[1];
        }

        if (countryCodeFilter) {
          internalOptions.countryCodeFilter = countryCodeFilter;
        }
        const result = await this.client.search.fuzzySearch(
          this.defaultFormat,
          query,
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
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
    const { query, coordinates, countryCodeFilter } = searchQuery as {
      query: string;
      coordinates?: LatLon;
      countryCodeFilter?: string[];
    };
    return this.tracing.withSpan(
      "MapsSearchClient.searchPointOfInterest",
      options,
      async (updatedOptions) => {
        const internalOptions = mapSearchPointOfInterestOptions(updatedOptions);
        if (coordinates) {
          internalOptions.lat = coordinates[0];
          internalOptions.lon = coordinates[1];
        }

        if (countryCodeFilter) {
          internalOptions.countryCodeFilter = countryCodeFilter;
        }

        const result = await this.client.search.searchPointOfInterest(
          this.defaultFormat,
          query,
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
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
    return this.tracing.withSpan(
      "MapsSearchClient.searchNearbyPointOfInterest",
      options,
      async (updatedOptions) => {
        const internalOptions: SearchNearbyPointOfInterestOptionalParams = updatedOptions;
        const result = await this.client.search.searchNearbyPointOfInterest(
          this.defaultFormat,
          coordinates[0],
          coordinates[1],
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
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
    return this.tracing.withSpan(
      "MapsSearchClient.searchPointOfInterestCategory",
      options,
      async (updatedOptions) => {
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
        const result = await this.client.search.searchPointOfInterestCategory(
          this.defaultFormat,
          query,
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
  }

  /**
   * Requests a full list of supported Points of Interest (POI) categories.
   *
   * @param options - Optional parameters for the operation
   */
  public async getPointOfInterestCategories(
    options: GetPointOfInterestCategoriesOptions = {}
  ): Promise<PointOfInterestCategory[]> {
    return this.tracing.withSpan(
      "MapsSearchClient.getPointOfInterestCategories",
      options,
      async (updatedOptions) => {
        const internalOptions = updatedOptions as GetPointOfInterestCategoryTreeOptionalParams;
        const result = await this.client.search.getPointOfInterestCategoryTree(
          this.defaultFormat,
          internalOptions
        );
        return result.categories ? result.categories : [];
      }
    );
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
    return this.tracing.withSpan(
      "MapsSearchClient.searchAddress",
      options,
      async (updatedOptions) => {
        const internalOptions = mapSearchAddressOptions(updatedOptions);
        const result = await this.client.search.searchAddress(
          this.defaultFormat,
          query,
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
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
    return this.tracing.withSpan(
      "MapsSearchClient.reverseSearchAddress",
      options,
      async (updatedOptions) => {
        const internalOptions = updatedOptions as ReverseSearchAddressOptionalParams;
        const result = await this.client.search.reverseSearchAddress(
          this.defaultFormat,
          [coordinates[0], coordinates[1]],
          internalOptions
        );
        return mapReverseSearchAddressResult(result);
      }
    );
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
    return this.tracing.withSpan(
      "MapsSearchClient.reverseSearchCrossStreetAddress",
      options,
      async (updatedOptions) => {
        const internalOptions = updatedOptions as ReverseSearchCrossStreetAddressOptionalParams;
        const result = await this.client.search.reverseSearchCrossStreetAddress(
          this.defaultFormat,
          [coordinates[0], coordinates[1]],
          internalOptions
        );
        return mapReverseSearchCrossStreetAddressResult(result);
      }
    );
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
    return this.tracing.withSpan(
      "MapsSearchClient.searchStructuredAddress",
      options,
      async (updatedOptions) => {
        const { countryCode, ...structuredAddressOptions } = structuredAddress;
        const internalOptions = {
          ...updatedOptions,
          ...structuredAddressOptions,
        } as SearchStructuredAddressOptionalParams;
        const result = await this.client.search.searchStructuredAddress(
          this.defaultFormat,
          countryCode,
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
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
    return this.tracing.withSpan(
      "MapsSearchClient.searchInsideGeometry",
      options,
      async (updatedOptions) => {
        const internalOptions = updatedOptions as SearchInsideGeometryOptionalParams;
        /** Patch an empty object to properties since it's required */
        if (isGeoJsonCircleOrPolygonFeatureCollection(geometry)) {
          geometry.features = geometry.features.map((feature) => {
            if (isGeoJsonPolygonFeature(feature)) {
              return {
                ...feature,
                properties: {},
              };
            }
            return feature;
          });
        }

        const result = await this.client.search.searchInsideGeometry(
          this.defaultFormat,
          query,
          {
            geometry: geometry as unknown as Record<string, unknown>,
          },
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
  }

  /**
   * Performs a fuzzy search for POIs along a specified route.
   *
   * @param query - The POI name to search for (e.g., "statue of liberty", "starbucks", "pizza").
   * @param maxDetourTimeInSeconds - Maximum detour time of the point of interest in seconds. Max value is 3600 seconds
   * @param route - This represents the route to search along and should be a valid `GeoJSON LineString` type.
   * @param options - Optional parameters for the operation
   */
  public async searchAlongRoute(
    query: string,
    maxDetourTimeInSeconds: number,
    route: GeoJsonLineString,
    options: SearchAlongRouteOptions = {}
  ): Promise<SearchAddressResult> {
    return this.tracing.withSpan(
      "MapsSearchClient.searchAlongRoute",
      options,
      async (updatedOptions) => {
        const internalOptions = updatedOptions as SearchAlongRouteOptionalParams;
        const result = await this.client.search.searchAlongRoute(
          this.defaultFormat,
          query,
          maxDetourTimeInSeconds,
          { route: route },
          internalOptions
        );
        return mapSearchAddressResult(result);
      }
    );
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
  ): Promise<FuzzySearchBatchPoller> {
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
   * @param restoreFrom - The serialized state from the previous poller.
   * @param options - Optional parameters for the operation.
   *
   */
  public async resumeFuzzySearchBatch(
    restoreFrom: string,
    options: FuzzySearchBatchOptions = {}
  ): Promise<FuzzySearchBatchPoller> {
    return this.createFuzzySearchBatchPoller(restoreFrom, options);
  }

  private async createFuzzySearchBatchPoller(
    requestsOrRestoreFrom: FuzzySearchRequest[] | string,
    options: FuzzySearchBatchOptions = {}
  ): Promise<FuzzySearchBatchPoller> {
    return this.tracing.withSpan(
      "MapsSearchClient.beginFuzzySearchBatch",
      options,
      async (updatedOptions) => {
        const requests = Array.isArray(requestsOrRestoreFrom) ? requestsOrRestoreFrom : [];
        const restoreFrom = typeof requestsOrRestoreFrom === "string" ? requestsOrRestoreFrom : "";
        const batchRequest = createFuzzySearchBatchRequest(requests);

        const poller = await createHttpPoller(
          {
            sendInitialRequest: async () => {
              return getRawResponse(
                async (paramOptions) =>
                  this.client.search.fuzzySearchBatch(
                    this.defaultFormat,
                    batchRequest,
                    paramOptions
                  ),
                updatedOptions
              );
            },
            sendPollRequest: createSendPollRequest({
              client: this.client,
              options: updatedOptions,
              spec: getFuzzySearchBatchOperationSpec,
            }),
          },
          {
            intervalInMs: options.updateIntervalInMs,
            processResult: (internalResult) =>
              mapSearchAddressBatchResult(internalResult as SearchAddressBatchResult),
            ...(restoreFrom && { restoreFrom }),
          }
        );

        await poller.poll();
        return poller;
      }
    );
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
  ): Promise<SearchAddressBatchPoller> {
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
   * @param restoreFrom - The serialized state from the previous poller.
   * @param options - Optional parameters for the operation.
   *
   */
  public async resumeSearchAddressBatch(
    restoreFrom: string,
    options: SearchAddressBatchOptions = {}
  ): Promise<SearchAddressBatchPoller> {
    return this.createSearchAddressBatchPoller(restoreFrom, options);
  }

  private async createSearchAddressBatchPoller(
    requestsOrRestoreFrom: SearchAddressRequest[] | string,
    options: SearchAddressBatchOptions = {}
  ): Promise<SearchAddressBatchPoller> {
    return this.tracing.withSpan(
      "MapsSearchClient.beginSearchAddressBatch",
      options,
      async (updatedOptions) => {
        const requests = Array.isArray(requestsOrRestoreFrom) ? requestsOrRestoreFrom : [];
        const restoreFrom = typeof requestsOrRestoreFrom === "string" ? requestsOrRestoreFrom : "";
        const batchRequest = createSearchAddressBatchRequest(requests);

        const poller = await createHttpPoller(
          {
            sendInitialRequest: async () => {
              return getRawResponse(
                async (paramOptions) =>
                  this.client.search.searchAddressBatch(
                    this.defaultFormat,
                    batchRequest,
                    paramOptions
                  ),
                updatedOptions
              );
            },
            sendPollRequest: createSendPollRequest({
              client: this.client,
              options: updatedOptions,
              spec: getSearchAddressBatchOperationSpec,
            }),
          },
          {
            intervalInMs: options.updateIntervalInMs,
            processResult: (internalResult) =>
              mapSearchAddressBatchResult(internalResult as SearchAddressBatchResult),
            ...(restoreFrom && { restoreFrom }),
          }
        );

        await poller.poll();
        return poller;
      }
    );
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
  ): Promise<ReverseSearchAddressBatchPoller> {
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
   * @param restoreFrom - The serialized state from the previous poller.
   * @param options - Optional parameters for the operation.
   *
   */
  public async resumeReverseSearchAddressBatch(
    restoreFrom: string,
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<ReverseSearchAddressBatchPoller> {
    return this.createReverseSearchAddressBatchPoller(restoreFrom, options);
  }

  private async createReverseSearchAddressBatchPoller(
    requestsOrRestoreFrom: ReverseSearchAddressRequest[] | string,
    options: ReverseSearchAddressBatchOptions = {}
  ): Promise<ReverseSearchAddressBatchPoller> {
    return this.tracing.withSpan(
      "MapsSearchClient.beginReverseSearchAddressBatch",
      options,
      async (updatedOptions) => {
        const requests = Array.isArray(requestsOrRestoreFrom) ? requestsOrRestoreFrom : [];
        const restoreFrom = typeof requestsOrRestoreFrom === "string" ? requestsOrRestoreFrom : "";
        const batchRequest = createReverseSearchAddressBatchRequest(requests);
        const poller = await createHttpPoller(
          {
            sendInitialRequest: async () => {
              return getRawResponse(
                async (paramOptions) =>
                  this.client.search.reverseSearchAddressBatch(
                    this.defaultFormat,
                    batchRequest,
                    paramOptions
                  ),
                updatedOptions
              );
            },
            sendPollRequest: createSendPollRequest({
              client: this.client,
              options: updatedOptions,
              spec: getReverseSearchAddressBatchOperationSpec,
            }),
          },
          {
            intervalInMs: options.updateIntervalInMs,
            processResult: (internalResult) =>
              mapReverseSearchAddressBatchResult(internalResult as ReverseSearchAddressBatchResult),
            ...(restoreFrom && { restoreFrom }),
          }
        );

        await poller.poll();
        return poller;
      }
    );
  }
}
