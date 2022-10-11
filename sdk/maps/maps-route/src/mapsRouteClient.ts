// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Mappers from "./generated/models/mappers";
import * as Parameters from "./generated/models/parameters";
import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { BatchPoller, LatLon, RouteDirectionParameters } from "./models/models";
import {
  createAzureMapsKeyCredentialPolicy,
  createMapsClientIdPolicy,
  createSendPollRequest,
  getRawResponse,
} from "@azure/maps-common";
import { BatchResult, RouteDirections, RouteRangeResult } from "./models/results";
import { GeneratedClient, RouteDirectionsBatchResult, RouteMatrixResult } from "./generated";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import {
  MapsRouteClientOptions,
  RouteDirectionsBatchOptions,
  RouteDirectionsOptions,
  RouteDirectionsRequest,
  RouteMatrixQuery,
  RouteMatrixRequestOptions,
  RouteRangeBudget,
  RouteRangeOptions,
} from "./models/options";
import {
  createRouteDirectionsBatchRequest,
  mapResponseToRouteDirections,
  mapResponseToRouteRangeResult,
  mapRouteDirectionsBatchResult,
  mapRouteMatrixResult,
  toColonDelimitedLatLonString,
} from "./models/mappers";
import { createSerializer, OperationOptions, OperationSpec } from "@azure/core-client";
import { createTracingClient, TracingClient } from "@azure/core-tracing";
import { logger } from "./utils/logger";
import { SDK_VERSION } from "./constants";
import { createHttpPoller } from "@azure/core-lro";

const isMapsRouteClientOptions = (
  clientIdOrOptions: any
): clientIdOrOptions is MapsRouteClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

function isRouteDirectionParameters(
  routeDirectionParametersOrOptions:
    | (RouteDirectionsOptions & OperationOptions)
    | RouteDirectionParameters
    | undefined
): routeDirectionParametersOrOptions is RouteDirectionParameters {
  return (
    (routeDirectionParametersOrOptions as RouteDirectionParameters)?.supportingPoints !==
      undefined ||
    (routeDirectionParametersOrOptions as RouteDirectionParameters)?.avoidVignette !== undefined ||
    (routeDirectionParametersOrOptions as RouteDirectionParameters)?.allowVignette !== undefined ||
    (routeDirectionParametersOrOptions as RouteDirectionParameters)?.avoidAreas !== undefined
  );
}

const serializer = createSerializer(Mappers, false);

const getRouteDirectionsBatchOperationSpec: OperationSpec = {
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RouteDirectionsBatchResult,
    },
    202: {
      headersMapper: Mappers.RouteGetRouteDirectionsBatchHeaders,
    },
  },
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.accept, Parameters.clientId],
  serializer,
};

const getRouteMatrixOperationSpec: OperationSpec = {
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RouteMatrixResult,
    },
    202: {
      headersMapper: Mappers.RouteGetRouteMatrixHeaders,
    },
  },
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.accept, Parameters.clientId],
  serializer,
};

/**
 * Client class for interacting with Azure Maps Route Service.
 */
export class MapsRouteClient {
  /**
   * A reference to the auto-generated Route HTTP client.
   */
  private readonly client: GeneratedClient;
  private readonly defaultFormat: string = "json";
  private readonly tracing: TracingClient;
  /**
   * Creates an instance of MapsRouteClient from a subscription key.
   *
   * @example
   * ```ts
   * import { MapsRouteClient, AzureKeyCredential } from "@azure/maps-route";
   *
   * const credential = new AzureKeyCredential("<subscription-key>");
   * const client = new MapsRouteClient(credential);
   *```
   *
   * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
   * @param options - Options used to configure the Route Client
   */
  constructor(credential: AzureKeyCredential, options?: MapsRouteClientOptions);
  /**
   * Creates an instance of MapsRouteClient from an Azure Identity `TokenCredential`.
   *
   * @example
   * ```ts
   * import { MapsRouteClient } from "@azure/maps-route";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new MapsRouteClient(credential, "<maps-account-client-id>");
   *```
   *
   * @param credential - An TokenCredential instance used to authenticate requests to the service
   * @param mapsAccountClientId - The Azure Maps client id of a specific map resource
   * @param options - Options used to configure the Route Client
   */
  constructor(
    credential: TokenCredential,
    mapsAccountClientId: string,
    options?: MapsRouteClientOptions
  );
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    clientIdOrOptions?: string | MapsRouteClientOptions,
    maybeOptions: MapsRouteClientOptions = {}
  ) {
    const options = isMapsRouteClientOptions(clientIdOrOptions) ? clientIdOrOptions : maybeOptions;
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
      packageName: "@azure/maps-route",
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
   * Returns a route between an origin and a destination.
   *
   * @param routePoints - An array of coordinates through which the route is calculated
   * @param options - Optional parameters for the operation
   */
  public async getRouteDirections(
    routePoints: LatLon[],
    options?: RouteDirectionsOptions & OperationOptions
  ): Promise<RouteDirections>;
  /**
   * Returns a route between an origin and a destination, passing through waypoints if they are specified.
   *
   * @param routePoints - An array of coordinates through which the route is calculated
   * @param routeDirectionParameters - Additional parameters used for reconstructing a route and for calculating zero or more alternative routes to this reference route
   * @param options - Optional parameters for the operation
   */
  public async getRouteDirections(
    routePoints: LatLon[],
    routeDirectionParameters: RouteDirectionParameters,
    options?: RouteDirectionsOptions & OperationOptions
  ): Promise<RouteDirections>;
  public async getRouteDirections(
    routePoints: LatLon[],
    routeDirectionParametersOrOptions?:
      | RouteDirectionParameters
      | (RouteDirectionsOptions & OperationOptions),
    maybeOptions?: RouteDirectionsOptions & OperationOptions
  ): Promise<RouteDirections> {
    if (!Array.isArray(routePoints) || routePoints.length === 0) {
      throw new Error("routePoints must be a non-empty array");
    }

    const options =
      (isRouteDirectionParameters(routeDirectionParametersOrOptions)
        ? maybeOptions
        : routeDirectionParametersOrOptions) || {};

    return this.tracing.withSpan(
      "MapsRouteClient.getRouteDirections",
      options,
      async (updatedOptions) => {
        const result = isRouteDirectionParameters(routeDirectionParametersOrOptions)
          ? await this.client.routeOperations.getRouteDirectionsWithAdditionalParameters(
              this.defaultFormat,
              toColonDelimitedLatLonString(routePoints),
              {
                ...routeDirectionParametersOrOptions,
                supportingPoints:
                  routeDirectionParametersOrOptions.supportingPoints as unknown as Record<
                    string,
                    unknown
                  >,
              },
              updatedOptions
            )
          : await this.client.routeOperations.getRouteDirections(
              this.defaultFormat,
              toColonDelimitedLatLonString(routePoints),
              updatedOptions
            );
        return mapResponseToRouteDirections(result);
      }
    );
  }

  /**
   * Calculates a set of locations that can be reached from the origin point based on fuel, energy, or time budget that is specified.
   *
   * @param coordinates - The coordinates from which the range calculation should start
   * @param options - Optional parameters for the operation
   */
  public async getRouteRange(
    coordinates: LatLon,
    budget: RouteRangeBudget,
    options: RouteRangeOptions = {}
  ): Promise<RouteRangeResult> {
    return this.tracing.withSpan(
      "MapsRouteClient.getRouteRange",
      options,
      async (updatedOptions) => {
        const result = await this.client.routeOperations.getRouteRange(
          this.defaultFormat,
          coordinates,
          {
            ...updatedOptions,
            ...budget,
          }
        );
        return mapResponseToRouteRangeResult(result);
      }
    );
  }

  /**
   * Sends batches of route direction queries.
   * The method returns a poller for retrieving the result later.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 700 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async beginRequestRouteDirectionsBatch(
    requests: RouteDirectionsRequest[],
    options: RouteDirectionsBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<RouteDirections>>> {
    return this.createRouteDirectionsBatchPoller(requests, options);
  }

  /**
   * Continue route direction batch request with a serialized state from a previous poller.
   *
   * @example
   * ```js
   * const serializedState = poller.toString()
   * const rehydratedPoller = resumeRequestRouteDirectionsBatch(serializedState)
   * rehydratedPoller.poll()
   * ```
   *
   * @param restoreFrom - The serialized state from a previous poller.
   * @param options - Optional parameters for the operation
   */
  public async resumeRequestRouteDirectionsBatch(
    restoreFrom: string,
    options: RouteDirectionsBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<RouteDirections>>> {
    return this.createRouteDirectionsBatchPoller(restoreFrom, options);
  }

  private async createRouteDirectionsBatchPoller(
    requestsOrRestoreFrom: RouteDirectionsRequest[] | string,
    options: RouteDirectionsBatchOptions = {}
  ): Promise<BatchPoller<BatchResult<RouteDirections>>> {
    const requests = Array.isArray(requestsOrRestoreFrom) ? requestsOrRestoreFrom : [];
    const restoreFrom = typeof requestsOrRestoreFrom === "string" ? requestsOrRestoreFrom : "";
    return this.tracing.withSpan(
      "MapsRouteClient.beginRequestRouteDirectionsBatch",
      options,
      async (updatedOptions) => {
        const batchRequest = createRouteDirectionsBatchRequest(requests);

        const poller = await createHttpPoller(
          {
            sendInitialRequest: async () => {
              return getRawResponse(
                async (paramOptions) =>
                  this.client.routeOperations.requestRouteDirectionsBatch(
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
              spec: getRouteDirectionsBatchOperationSpec,
            }),
          },
          {
            intervalInMs: options.updateIntervalInMs,
            processResult: (internalResult) =>
              mapRouteDirectionsBatchResult(internalResult as RouteDirectionsBatchResult),
            ...(restoreFrom ? { restoreFrom } : {}),
          }
        );

        await poller.poll();
        return poller;
      }
    );
  }

  /**
   * Calculates a matrix of route summaries for a set of routes defined by origin and destination locations.
   * The method returns a poller for retrieving the result later.
   *
   * The maximum size of a matrix for this method is 700 (the number of origins multiplied by the number of destinations)
   *
   * @param routeMatrixQuery - The matrix of origin and destination coordinates to compute the routes.
   * @param options - Optional parameters for the operation
   */
  public async beginRequestRouteMatrix(
    routeMatrixQuery: RouteMatrixQuery,
    options: RouteMatrixRequestOptions = {}
  ): Promise<BatchPoller<RouteMatrixResult>> {
    return this.createRequestRouteMatrixPoller(routeMatrixQuery, options);
  }

  /**
   *
   * Resume route matrix request with a serialized state from a previous poller.
   *
   * @example
   * ```js
   * const serializedState = poller.toString()
   * const rehydratedPoller = resumeRequestRouteMatrix(serializedState)
   * rehydratedPoller.poll()
   * ```
   *
   * @param restoreFrom - The serialized state from a previous poller.
   * @param options - Optional parameters for the operation
   */
  public async resumeRequestRouteMatrix(
    restoreFrom: string,
    options: RouteMatrixRequestOptions = {}
  ): Promise<BatchPoller<RouteMatrixResult>> {
    return this.createRequestRouteMatrixPoller(restoreFrom, options);
  }

  private async createRequestRouteMatrixPoller(
    routeMatrixQueryOrRestoreFrom: RouteMatrixQuery | string,
    options: RouteMatrixRequestOptions = {}
  ): Promise<BatchPoller<RouteMatrixResult>> {
    const routeMatrixQuery =
      typeof routeMatrixQueryOrRestoreFrom === "string"
        ? {
            origins: { type: "MultiPoint", coordinates: [] },
            destinations: { type: "MultiPoint", coordinates: [] },
          }
        : routeMatrixQueryOrRestoreFrom;
    const restoreFrom =
      typeof routeMatrixQueryOrRestoreFrom === "string" ? routeMatrixQueryOrRestoreFrom : "";
    return this.tracing.withSpan(
      "MapsRouteClient.beginRequestRouteMatrix",
      options,
      async (updatedOptions) => {
        const poller = await createHttpPoller(
          {
            sendInitialRequest: async () =>
              getRawResponse(
                async (paramOptions) =>
                  this.client.routeOperations.requestRouteMatrix(
                    this.defaultFormat,
                    routeMatrixQuery as RouteMatrixQuery,
                    paramOptions
                  ),
                updatedOptions
              ),
            sendPollRequest: createSendPollRequest({
              client: this.client,
              options: updatedOptions,
              spec: getRouteMatrixOperationSpec,
            }),
          },
          {
            intervalInMs: options.updateIntervalInMs,
            processResult: (internalResult) =>
              mapRouteMatrixResult(internalResult as RouteMatrixResult),
            ...(restoreFrom ? { restoreFrom } : {}),
          }
        );

        await poller.poll();
        return poller;
      }
    );
  }
}
