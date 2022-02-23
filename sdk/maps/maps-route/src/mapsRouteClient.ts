// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import { mapsAzureKeyCredentialPolicy } from "./credential/mapsAzureKeyCredentialPolicy";
import { mapsClientIdPolicy } from "./credential/mapsClientIdPolicy";
import {
  BatchRequest,
  GeneratedClient,
  RouteDirectionParameters,
  RouteDirections,
  RouteDirectionsBatchResult,
  RouteGetRouteDirectionsBatchOptionalParams as GetRouteDirectionsBatchOptionalParams,
  RouteGetRouteDirectionsOptionalParams as GetRouteDirectionsOptionalParams,
  RouteGetRouteDirectionsWithAdditionalParametersOptionalParams as GetRouteDirectionsWithAdditionalParametersOptionalParams,
  RouteGetRouteMatrixOptionalParams as GetRouteMatrixOptionalParams,
  RouteGetRouteRangeOptionalParams as GetRouteRangeOptionalParams,
  RouteMatrixQuery,
  RouteMatrixResult,
  RouteRangeResult,
  RouteRequestRouteDirectionsBatchOptionalParams as RequestRouteDirectionsBatchOptionalParams,
  RouteRequestRouteDirectionsBatchSyncOptionalParams as RequestRouteDirectionsBatchSyncOptionalParams,
  RouteRequestRouteMatrixOptionalParams as RequestRouteMatrixOptionalParams,
  RouteRequestRouteMatrixSyncOptionalParams as RequestRouteMatrixSyncOptionalParams,
} from "./generated";
import {
  GetRouteDirectionsBatchOptions,
  GetRouteDirectionsOptions,
  GetRouteDirectionsWithAdditionalParametersOptions,
  GetRouteMatrixOptions,
  GetRouteRangeOptions,
  MapsRouteClientOptions,
  RequestRouteDirectionsBatchOptions,
  RequestRouteMatrixOptions,
} from "./models/options";
import { logger } from "./utils/logger";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { PollerLike, PollOperationState } from "@azure/core-lro";

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
      this.client.pipeline.addPolicy(mapsClientIdPolicy(clientId));
    } else {
      this.client.pipeline.addPolicy(mapsAzureKeyCredentialPolicy(credential));
    }
  }

  /**
   *
   * @param routePoints
   * @param options
   * @returns
   */
  public async getRouteDirections(
    routePoints: string,
    options?: GetRouteDirectionsOptions
  ): Promise<RouteDirections> {
    const { span, updatedOptions } = createSpan("MapsRouteClient-getRouteDirections", options);
    const internalOptions = updatedOptions as GetRouteDirectionsOptionalParams;
    try {
      const result = await this.client.routeOperations.getRouteDirections(
        this.defaultFormat,
        routePoints,
        internalOptions
      );
      return result;
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
   *
   * @param routePoints
   * @param routeDirectionParameters
   * @param options
   * @returns
   */
  public async getRouteDirectionsWithAdditionalParameters(
    routePoints: string,
    routeDirectionParameters: RouteDirectionParameters,
    options?: GetRouteDirectionsWithAdditionalParametersOptions
  ): Promise<RouteDirections> {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-getRouteDirectionsWithAdditionalParameters",
      options
    );
    const internalOptions =
      updatedOptions as GetRouteDirectionsWithAdditionalParametersOptionalParams;
    try {
      const result = await this.client.routeOperations.getRouteDirectionsWithAdditionalParameters(
        this.defaultFormat,
        routePoints,
        routeDirectionParameters,
        internalOptions
      );
      return result;
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
   *
   * @param query
   * @param options
   * @returns
   */
  public async getRouteRange(
    query: number[],
    options?: GetRouteRangeOptions
  ): Promise<RouteRangeResult> {
    const { span, updatedOptions } = createSpan("MapsRouteClient-getRouteRange", options);
    const internalOptions = updatedOptions as GetRouteRangeOptionalParams;
    try {
      const result = await this.client.routeOperations.getRouteRange(
        this.defaultFormat,
        query,
        internalOptions
      );
      return result;
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
   *
   * @param routeDirectionsBatchQueries
   * @param options
   * @returns
   */
  public async requestRouteDirectionsBatch(
    routeDirectionsBatchQueries: BatchRequest,
    options?: RequestRouteDirectionsBatchOptions
  ): Promise<RouteDirectionsBatchResult> {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-requestRouteDirectionsBatch",
      options
    );
    const internalOptions = updatedOptions as RequestRouteDirectionsBatchSyncOptionalParams;
    try {
      const result = await this.client.routeOperations.requestRouteDirectionsBatchSync(
        this.defaultFormat,
        routeDirectionsBatchQueries,
        internalOptions
      );
      return result;
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
   *
   * @param routeDirectionsBatchQueries
   * @param options
   * @returns
   */
  public async beginRequestRouteDirectionsBatch(
    routeDirectionsBatchQueries: BatchRequest,
    options?: RequestRouteDirectionsBatchOptions
  ): Promise<
    PollerLike<PollOperationState<RouteDirectionsBatchResult>, RouteDirectionsBatchResult>
  > {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-beginRequestRouteDirectionsBatch",
      options
    );
    const internalOptions = updatedOptions as RequestRouteDirectionsBatchOptionalParams;
    try {
      const poller = await this.client.routeOperations.beginRequestRouteDirectionsBatch(
        this.defaultFormat,
        routeDirectionsBatchQueries,
        internalOptions
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
   *
   * @param batchId
   * @param options
   * @returns
   */
  public async beginGetRouteDirectionsBatchResult(
    batchId: string,
    options?: GetRouteDirectionsBatchOptions
  ): Promise<
    PollerLike<PollOperationState<RouteDirectionsBatchResult>, RouteDirectionsBatchResult>
  > {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-beginGetRouteDirectionsBatchResult",
      options
    );
    const internalOptions = updatedOptions as GetRouteDirectionsBatchOptionalParams;
    try {
      const poller = await this.client.routeOperations.beginGetRouteDirectionsBatch(
        batchId,
        internalOptions
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
   *
   * @param routeMatrixQuery
   * @param options
   * @returns
   */
  public async requestRouteMatrix(
    routeMatrixQuery: RouteMatrixQuery,
    options?: RequestRouteMatrixOptions
  ): Promise<RouteMatrixResult> {
    const { span, updatedOptions } = createSpan("MapsRouteClient-beginRequestRouteMatrix", options);
    const internalOptions = updatedOptions as RequestRouteMatrixSyncOptionalParams;
    try {
      const result = await this.client.routeOperations.requestRouteMatrixSync(
        this.defaultFormat,
        routeMatrixQuery,
        internalOptions
      );
      return result;
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
   *
   * @param routeMatrixQuery
   * @param options
   * @returns
   */
  public async beginRequestRouteMatrix(
    routeMatrixQuery: RouteMatrixQuery,
    options?: RequestRouteMatrixOptions
  ): Promise<PollerLike<PollOperationState<RouteMatrixResult>, RouteMatrixResult>> {
    const { span, updatedOptions } = createSpan("MapsRouteClient-beginRequestRouteMatrix", options);
    const internalOptions = updatedOptions as RequestRouteMatrixOptionalParams;
    try {
      const poller = await this.client.routeOperations.beginRequestRouteMatrix(
        this.defaultFormat,
        routeMatrixQuery,
        internalOptions
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
   *
   * @param matrixId
   * @param options
   * @returns
   */
  public async beginGetRouteMatrixResult(
    matrixId: string,
    options?: GetRouteMatrixOptions
  ): Promise<PollerLike<PollOperationState<RouteMatrixResult>, RouteMatrixResult>> {
    const { span, updatedOptions } = createSpan(
      "MapsRouteClient-beginGetRouteMatrixResult",
      options
    );
    const internalOptions = updatedOptions as GetRouteMatrixOptionalParams;
    try {
      const poller = await this.client.routeOperations.beginGetRouteMatrix(
        matrixId,
        internalOptions
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
