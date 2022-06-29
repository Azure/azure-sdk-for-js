// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import {
  createAzureMapsKeyCredentialPolicy,
  createMapsClientIdPolicy,
  BatchPollerProxy,
} from "../../maps-common/src";
import { GeneratedClient, RouteDirectionsBatchResult, RouteMatrixResult } from "./generated";
import {
  RouteDirectionsOptions,
  RouteRangeOptions,
  MapsRouteClientOptions,
  RouteMatrixOptions,
  RouteRangeBudget,
  RouteDirectionsRequest,
  RouteDirectionsBatchOptions,
  BatchPollerOptions,
  RouteMatrixQuery,
} from "./models/options";
import { logger } from "./utils/logger";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { RouteDirectionParameters, LatLon, BatchPoller } from "./models/models";
import {
  createRouteDirectionsBatchRequest,
  mapRouteDirectionsBatchResult,
  toColonDelimitedLatLonString,
  toNumericArray,
} from "./models/mappers";
import { BatchResult, RouteDirections, RouteRangeResult } from "./models/results";
import { OperationOptions } from "@azure/core-client";

const isMapsRouteClientOptions = (
  clientIdOrOptions: any
): clientIdOrOptions is MapsRouteClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

/**
 * Client class for interacting with Azure Maps Route Service.
 */
export class MapsRouteClient {
  /**
   * A reference to the auto-generated Route HTTP client.
   */
  private readonly client: GeneratedClient;
  private readonly defaultFormat: string = "json";
  /**
   * Creates an instance of MapsRouteClient from a subscription key.
   *
   * @example
   * ```ts
   * import { MapsRouteClient, AzureKeyCredential } from "@azure/maps-route";
   * const credential = new AzureKeyCredential("<subscription-key>");
   *
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
   * const credential = new DefaultAzureCredential();
   *
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
    options: RouteDirectionsOptions & OperationOptions = {}
  ): Promise<RouteDirections> {
    if (!Array.isArray(routePoints) || routePoints.length === 0) {
      throw new Error("routePoints must be a non-empty array");
    }

    const { span, updatedOptions } = createSpan("MapsRouteClient-getRouteDirections", options);
    try {
      return await this.client.routeOperations.getRouteDirections(
        this.defaultFormat,
        toColonDelimitedLatLonString(routePoints),
        updatedOptions
      );
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
   * Returns a route between an origin and a destination, passing through waypoints if they are specified.
   *
   * @param routePoints - An array of coordinates through which the route is calculated
   * @param routeDirectionParameters - Additional parameters used for reconstructing a route and for calculating zero or more alternative routes to this reference route
   * @param options - Optional parameters for the operation
   */
  public async getRouteDirectionsWithAdditionalParameters(
    routePoints: LatLon[],
    routeDirectionParameters: RouteDirectionParameters,
    options: RouteDirectionsOptions & OperationOptions = {}
  ): Promise<RouteDirections> {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-getRouteDirectionsWithAdditionalParameters",
      options
    );
    try {
      return await this.client.routeOperations.getRouteDirectionsWithAdditionalParameters(
        this.defaultFormat,
        toColonDelimitedLatLonString(routePoints),
        {
          ...routeDirectionParameters,
          supportingPoints: routeDirectionParameters.supportingPoints as unknown as Record<
            string,
            unknown
          >,
        },
        updatedOptions
      );
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
    const { span, updatedOptions } = createSpan("MapsRouteClient-getRouteRange", options);
    try {
      return await this.client.routeOperations.getRouteRange(
        this.defaultFormat,
        toNumericArray(coordinates),
        { ...updatedOptions, ...budget }
      );
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
   * Sends batches of route direction queries.
   * The method returns a poller for retrieving the result later.
   *
   * @param requests - The array of search requests to process. The array can contain a max of 700 requests and must contain at least 1 request.
   * @param options - Optional parameters for the operation
   */
  public async beginRequestRouteDirectionsBatch(
    requests: RouteDirectionsRequest[],
    options: RouteDirectionsBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<RouteDirections>>> {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-beginRequestRouteDirectionsBatch",
      options
    );
    const batchRequest = createRouteDirectionsBatchRequest(requests);
    try {
      const internalPoller = await this.client.routeOperations.beginRequestRouteDirectionsBatch(
        this.defaultFormat,
        batchRequest,
        updatedOptions
      );

      const poller = new BatchPollerProxy<BatchResult<RouteDirections>, RouteDirectionsBatchResult>(
        internalPoller,
        mapRouteDirectionsBatchResult
      );

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
   *  Retrieves the result of a previous route direction batch request. The method returns a poller for retrieving the result.
   *
   * @param batchId - Batch id for querying the operation.
   * @param options - Optional parameters for the operation
   */
  public async beginGetRouteDirectionsBatchResult(
    batchId: string,
    options: RouteDirectionsBatchOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<BatchResult<RouteDirections>>> {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-beginGetRouteDirectionsBatchResult",
      options
    );
    try {
      const internalPoller = await this.client.routeOperations.beginGetRouteDirectionsBatch(
        batchId,
        updatedOptions
      );
      const poller = new BatchPollerProxy<BatchResult<RouteDirections>, RouteDirectionsBatchResult>(
        internalPoller,
        mapRouteDirectionsBatchResult
      );

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
    options: RouteMatrixOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<RouteMatrixResult>> {
    const { span, updatedOptions } = createSpan("MapsRouteClient-beginRequestRouteMatrix", options);
    try {
      const internalPoller = await this.client.routeOperations.beginRequestRouteMatrix(
        this.defaultFormat,
        routeMatrixQuery,
        updatedOptions
      );

      const poller = new BatchPollerProxy<RouteMatrixResult, RouteMatrixResult>(
        internalPoller,
        (res) => res
      );

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
   * Retrieves the result of a previous route matrix request.
   * The method returns a poller for retrieving the result.
   *
   * @param matrixId - Batch id for querying the operation.
   * @param options - Optional parameters for the operation
   */
  public async beginGetRouteMatrixResult(
    matrixId: string,
    options: RouteMatrixOptions & BatchPollerOptions = {}
  ): Promise<BatchPoller<RouteMatrixResult>> {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-beginGetRouteMatrixResult",
      options
    );
    try {
      const internalPoller = await this.client.routeOperations.beginGetRouteMatrix(
        matrixId,
        updatedOptions
      );

      const poller = new BatchPollerProxy<RouteMatrixResult, RouteMatrixResult>(
        internalPoller,
        (res) => res
      );

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
