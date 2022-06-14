// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  RestResponse,
  OperationOptions,
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  generateUuid,
  PipelineOptions,
} from "@azure/core-http";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { AzureDigitalTwinsAPI as GeneratedClient } from "./generated/azureDigitalTwinsAPI";
import {
  DigitalTwinsGetByIdResponse,
  DigitalTwinsAddOptionalParams,
  DigitalTwinsAddResponse,
  DigitalTwinsUpdateOptionalParams,
  DigitalTwinsUpdateResponse,
  DigitalTwinsDeleteOptionalParams,
  DigitalTwinsGetComponentResponse,
  DigitalTwinsUpdateComponentResponse,
  DigitalTwinsUpdateComponentOptionalParams,
  DigitalTwinsAddRelationshipResponse,
  DigitalTwinsAddRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipResponse,
  DigitalTwinsDeleteRelationshipOptionalParams,
  DigitalTwinsSendTelemetryOptionalParams,
  DigitalTwinsSendComponentTelemetryOptionalParams,
  DigitalTwinsListRelationshipsResponse,
  IncomingRelationship,
  DigitalTwinsListIncomingRelationshipsResponse,
  DigitalTwinsGetRelationshipByIdResponse,
  DigitalTwinsModelData,
  DigitalTwinModelsGetByIdResponse,
  DigitalTwinModelsGetByIdOptionalParams,
  DigitalTwinModelsAddResponse,
  DigitalTwinModelsAddOptionalParams,
  DigitalTwinModelsListResponse,
  DigitalTwinModelsListOptionalParams,
  EventRoutesGetByIdResponse,
  EventRoute,
  EventRoutesAddOptionalParams,
  EventRoutesListNextResponse,
  EventRoutesListOptionalParams,
  QueryQueryTwinsOptionalParams,
  QueryQueryTwinsResponse,
  QuerySpecification,
} from "./generated/models";
import { tracingClient } from "./tracing";
import { logger } from "./logger";
import { SDK_VERSION } from "./constants";

export interface DigitalTwinsClientOptions extends PipelineOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
}

const DEFAULT_DIGITALTWINS_SCOPE = "https://digitaltwins.azure.net/.default";

/**
 * Client for Azure IoT DigitalTwins API.
 */
export class DigitalTwinsClient {
  /**
   * A reference to the auto-generated AzureDigitalTwinsAPI
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of AzureDigitalTwinsAPI.
   *
   * Example usage:
   * ```ts
   * const { DigitalTwinsClient, ServiceClientCredentials } = require("@azure/digital-twins-core");
   *
   * const client = new DigitalTwinsClient(
   *   "<endpoint>",
   *   new DefaultAzureCredential();
   * );
   * ```
   * @param endpointUrl - The endpoint URL of the service.
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the service client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential,
    options: DigitalTwinsClientOptions = {}
  ) {
    const authPolicy = bearerTokenAuthenticationPolicy(credential, DEFAULT_DIGITALTWINS_SCOPE);
    const libInfo = `azsdk-js-digital-twins-core/${SDK_VERSION}`;

    const { apiVersion, ...pipelineOptions } = options;
    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-request-id"],
        },
      },
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient({
      endpoint: endpointUrl,
      apiVersion,
      ...pipeline,
    });
  }

  /**
   * Get a digital twin
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param options - The operation options
   * @returns The application/json digital twin and the http response.
   */
  public getDigitalTwin(
    digitalTwinId: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetByIdResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getDigitalTwin",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.getById(digitalTwinId, updatedOptions);
      }
    );
  }

  /**
   * Create or update a digital twin
   *
   * @param digitalTwinId - The Id of the digital twin to create or update.
   * @param digitalTwinJson - The application/json digital twin to create.
   * @param options - Extended operation options including
   *  ifNoneMatch: Only perform the operation if the entity does not already exist.
   * @returns The created application/json digital twin and the http response.
   */
  public upsertDigitalTwin(
    digitalTwinId: string,
    digitalTwinJson: string,
    options: DigitalTwinsAddOptionalParams = {}
  ): Promise<DigitalTwinsAddResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.upsertDigitalTwin",
      options,
      async (updatedOptions) => {
        const payload = JSON.parse(digitalTwinJson);
        return this.client.digitalTwins.add(digitalTwinId, payload, updatedOptions);
      }
    );
  }

  /**
   * Update a digital twin using a json patch.
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param jsonPatch - An update specification described by JSON Patch. Updates to property values
   * and $model elements may happen in the same request. Operations are limited to add, replace and
   * remove.
   * @param options - Extended operation options including
   *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public updateDigitalTwin(
    digitalTwinId: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- changing the type any would be a breaking change
    jsonPatch: any,
    options: DigitalTwinsUpdateOptionalParams = {}
  ): Promise<DigitalTwinsUpdateResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.updateDigitalTwin",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.update(digitalTwinId, jsonPatch, updatedOptions);
      }
    );
  }

  /**
   * Delete a digital twin
   *
   * @param digitalTwinId - The Id of the digital twin to delete.
   * @param options - Extended operation options including
   *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public deleteDigitalTwin(
    digitalTwinId: string,
    options: DigitalTwinsDeleteOptionalParams = {}
  ): Promise<RestResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteDigitalTwin",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.delete(digitalTwinId, updatedOptions);
      }
    );
  }

  /**
   * Get a component on a digital twin.
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param componentName - The component being retrieved.
   * @param options - The operation options
   * @returns Json string representation of the component corresponding to the provided componentName and the HTTP response.
   */
  public getComponent(
    digitalTwinId: string,
    componentName: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetComponentResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getComponent",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.getComponent(digitalTwinId, componentName, updatedOptions);
      }
    );
  }

  /**
   * Update properties of a component on a digital twin using a JSON patch.
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param componentName - The component being updated.
   * @param jsonPatch - The application/json-patch+json operations to be performed on the specified digital twin's component.
   * @param enableUpdate - If true then update of an existing digital twin is enabled.
   * @param options - Extended operation options including
   *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public updateComponent(
    digitalTwinId: string,
    componentName: string,
    jsonPatch: any[],
    options: DigitalTwinsUpdateComponentOptionalParams = {}
  ): Promise<DigitalTwinsUpdateComponentResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.updateComponent",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.updateComponent(
          digitalTwinId,
          componentName,
          jsonPatch,
          updatedOptions
        );
      }
    );
  }

  /**
   * Get a relationship on a digital twin.
   *
   * @param digitalTwinId - The Id of the source digital twin.
   * @param relationshipId - The Id of the relationship to retrieve.
   * @param options - The operation options
   * @returns The pageable list of application/json relationships belonging to the specified digital twin and the http response.
   */
  public getRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetRelationshipByIdResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.getRelationshipById(
          digitalTwinId,
          relationshipId,
          updatedOptions
        );
      }
    );
  }

  /**
   * Create or update a relationship on a digital twin.
   *
   * @param digitalTwinId - The Id of the source digital twin.
   * @param relationshipId - The Id of the relationship to create.
   * @param relationship - The application/json relationship to be created.
   * @param options - Extended operation options including
   *  ifNoneMatch: Only perform the operation if the entity does not already exist.
   */
  public upsertRelationship(
    digitalTwinId: string,
    relationshipId: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- changing the type any would be a breaking change
    relationship: any,
    options: DigitalTwinsAddRelationshipOptionalParams = {}
  ): Promise<DigitalTwinsAddRelationshipResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.upsertRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.addRelationship(
          digitalTwinId,
          relationshipId,
          relationship,
          updatedOptions
        );
      }
    );
  }

  /**
   * Updates the properties of a relationship on a digital twin using a JSON patch.
   *
   * @param digitalTwinId - The Id of the digital twin to delete.
   * @param relationshipId - The Id of the relationship to be updated.
   * @param jsonPatch - The application/json-patch+json operations to be performed on the specified digital twin's relationship.
   * @param options - Extended operation options
   *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   */
  public updateRelationship(
    digitalTwinId: string,
    relationshipId: string,
    jsonPatch: any[],
    options: DigitalTwinsUpdateRelationshipOptionalParams = {}
  ): Promise<DigitalTwinsUpdateRelationshipResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.updateRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.updateRelationship(
          digitalTwinId,
          relationshipId,
          jsonPatch,
          updatedOptions
        );
      }
    );
  }

  /**
   * Delete a relationship on a digital twin.
   *
   * @param digitalTwinId - The Id of the source digital twin.
   * @param relationshipId - The Id of the relationship to delete.
   * @param options - The operation options
   *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is
   * @returns The http response.
   */
  public deleteRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options: DigitalTwinsDeleteRelationshipOptionalParams = {}
  ): Promise<RestResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.deleteRelationship(
          digitalTwinId,
          relationshipId,
          updatedOptions
        );
      }
    );
  }

  /**
   * Deals with the pagination of {@link listRelationships}.
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param options - Common options for the iterative endpoints.
   * @param continuationState - An object that indicates the position of the paginated request.
   *
   */
  private async *listRelationshipsPage(
    digitalTwinId: string,
    options: OperationOptions,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinsListRelationshipsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: OperationOptions = {
        ...options,
      };
      const listRelationshipResponse = await this.client.digitalTwins.listRelationships(
        digitalTwinId,
        optionsComplete
      );
      continuationState.continuationToken = listRelationshipResponse.nextLink;
      yield listRelationshipResponse;
    }
    while (continuationState.continuationToken) {
      const listRelationshipResponse = await this.client.digitalTwins.listRelationshipsNext(
        "",
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listRelationshipResponse.nextLink;
      yield listRelationshipResponse;
    }
  }

  /**
   * Deals with the iteration of all the available results of {@link listRelationships}.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listRelationshipsAll(
    digitalTwinId: string,
    options: OperationOptions
  ): AsyncIterableIterator<any> {
    for await (const page of this.listRelationshipsPage(digitalTwinId, options, {})) {
      const value = page.value || [];
      for (const item of value) {
        yield item;
      }
    }
  }

  /**
   * Retrieve relationships for a digital twin.
   *
   * @param digitalTwinId - The Id of the digital twin.
   */
  public listRelationships(
    digitalTwinId: string,
    options: OperationOptions & PageSettings = {}
  ): PagedAsyncIterableIterator<any, DigitalTwinsListRelationshipsResponse> {
    const iter = this.listRelationshipsAll(digitalTwinId, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listRelationshipsPage(digitalTwinId, options, settings),
    };
  }

  /**
   * Deals with the pagination of {@link listIncomingRelationships}.
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param options - Common options for the iterative endpoints.
   * @param continuationState - An object that indicates the position of the paginated request.
   *
   */
  private async *listIncomingRelationshipsPage(
    digitalTwinId: string,
    options: OperationOptions,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinsListIncomingRelationshipsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: OperationOptions = {
        ...options,
      };
      const listIncomingRelationshipsResponse =
        await this.client.digitalTwins.listIncomingRelationships(digitalTwinId, optionsComplete);
      continuationState.continuationToken = listIncomingRelationshipsResponse.nextLink;
      yield listIncomingRelationshipsResponse;
    }
    while (continuationState.continuationToken) {
      const listIncomingRelationshipsResponse =
        await this.client.digitalTwins.listIncomingRelationshipsNext(
          "",
          continuationState.continuationToken,
          options
        );

      continuationState.continuationToken = listIncomingRelationshipsResponse.nextLink;
      yield listIncomingRelationshipsResponse;
    }
  }

  /**
   * Deals with the iteration of all the available results of {@link listIncomingRelationships}.
   * @param digitalTwinId - The Id of the digital twin.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listIncomingRelationshipsAll(
    digitalTwinId: string,
    options: OperationOptions
  ): AsyncIterableIterator<IncomingRelationship> {
    for await (const page of this.listIncomingRelationshipsPage(digitalTwinId, options, {})) {
      const value = page.value || [];
      yield* value;
    }
  }

  /**
   * Retrieve all incoming relationships for a digital twin.
   *
   * @param digitalTwinId - The Id of the digital twin.
   */
  public listIncomingRelationships(
    digitalTwinId: string,
    options: OperationOptions & PageSettings = {}
  ): PagedAsyncIterableIterator<
    IncomingRelationship,
    DigitalTwinsListIncomingRelationshipsResponse
  > {
    const iter = this.listIncomingRelationshipsAll(digitalTwinId, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listIncomingRelationshipsPage(digitalTwinId, options, settings),
    };
  }

  /**
   * Publish telemetry from a digital twin, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId - The Id of the digital twin to delete.
   * @param payload - The application/json telemetry payload to be sent.
   * @param messageId - The message Id.
   * @param options - The operation options
   * @returns The http response.
   */
  public publishTelemetry(
    digitalTwinId: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- changing the type any would be a breaking change
    payload: any,
    messageId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsSendTelemetryOptionalParams: DigitalTwinsSendTelemetryOptionalParams =
      options;
    digitalTwinsSendTelemetryOptionalParams.telemetrySourceTime = new Date().toISOString();
    if (!messageId) {
      messageId = generateUuid();
    }

    return tracingClient.withSpan(
      "DigitalTwinsClient.publishTelemetry",
      digitalTwinsSendTelemetryOptionalParams,
      async (updatedOptions) => {
        return this.client.digitalTwins.sendTelemetry(
          digitalTwinId,
          messageId,
          payload,
          updatedOptions
        );
      }
    );
  }

  /**
   * Publish telemetry from a digital twin's component, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId - The Id of the digital twin to delete.
   * @param componentName - The name of the DTDL component.
   * @param payload - The application/json telemetry payload to be sent.
   * @param messageId - The message Id.
   * @param options - The operation options
   * @returns The http response.
   */
  public publishComponentTelemetry(
    digitalTwinId: string,
    componentName: string,
    payload: string,
    messageId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsSendComponentTelemetryOptionalParams: DigitalTwinsSendComponentTelemetryOptionalParams =
      options;
    digitalTwinsSendComponentTelemetryOptionalParams.telemetrySourceTime = new Date().toISOString();
    if (!messageId) {
      messageId = generateUuid();
    }

    return tracingClient.withSpan(
      "DigitalTwinsClient.publishComponentTelemetry",
      digitalTwinsSendComponentTelemetryOptionalParams,
      async (updatedOptions) => {
        return this.client.digitalTwins.sendComponentTelemetry(
          digitalTwinId,
          componentName,
          payload,
          messageId,
          updatedOptions
        );
      }
    );
  }

  /**
   * Get a model, including the model metadata and the model definition.
   *
   * @param modelId - The Id of the model.
   * @param options - Extended operation options including
   *  includeModelDefinition: When true the model definition will be returned as part of the result. Default value: false.
   * @returns The application/json model and the http response.
   */
  public getModel(
    modelId: string,
    includeModelDefinition: boolean = false,
    options: OperationOptions = {}
  ): Promise<DigitalTwinModelsGetByIdResponse> {
    const digitalTwinModelsGetByIdOptionalParams: DigitalTwinModelsGetByIdOptionalParams = options;
    digitalTwinModelsGetByIdOptionalParams.includeModelDefinition = includeModelDefinition;

    return tracingClient.withSpan(
      "DigitalTwinsClient.getModel",
      digitalTwinModelsGetByIdOptionalParams,
      async (updatedOptions) => {
        return this.client.digitalTwinModels.getById(modelId, updatedOptions);
      }
    );
  }

  /**
   * Deals with the pagination of {@link list}.
   *
   * @param options - Common options for the iterative endpoints.
   * @param continuationState - An object that indicates the position of the paginated request.
   *
   */
  private async *getModelsPage(
    options: DigitalTwinModelsListOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinModelsListResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: DigitalTwinModelsListOptionalParams = options;
      optionsComplete.maxItemsPerPage = continuationState.maxPageSize;

      const listResponse = await this.client.digitalTwinModels.list(optionsComplete);
      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
    while (continuationState.continuationToken) {
      const listResponse = await this.client.digitalTwinModels.listNext(
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
  }

  /**
   * Deals with the iteration of all the available results of {@link list}.
   * @param options - Common options for the iterative endpoints.
   */
  private async *getModelsAll(
    options: DigitalTwinModelsListOptionalParams
  ): AsyncIterableIterator<DigitalTwinsModelData> {
    const f = {};

    for await (const page of this.getModelsPage(options, f)) {
      const value = page.value || [];
      for (const item of value) {
        yield item;
      }
    }
  }

  /**
   * Get the list of models
   *
   * @param dependeciesFor - The model Ids to have dependencies retrieved. If omitted, all models are retrieved.
   * @param includeModelDefinition - Whether to include the model definition in the result. If false, only the model metadata will be returned.
   * @param resultsPerPage - The maximum number of items to retrieve per request. The server may choose to return less than the requested max.
   * @returns A pageable set of application/json models and the http response.
   */
  public listModels(
    dependeciesFor?: string[],
    includeModelDefinition: boolean = false,
    resultsPerPage?: number,
    options: OperationOptions & PageSettings = {}
  ): PagedAsyncIterableIterator<DigitalTwinsModelData, DigitalTwinModelsListResponse> {
    let digitalTwinModelsListOptionalParams: DigitalTwinModelsListOptionalParams = options;
    digitalTwinModelsListOptionalParams = {
      maxItemsPerPage: resultsPerPage,
      dependenciesFor: dependeciesFor,
      includeModelDefinition: includeModelDefinition,
    };

    const iter = this.getModelsAll(digitalTwinModelsListOptionalParams);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.getModelsPage(digitalTwinModelsListOptionalParams, settings),
    };
  }

  /**
   * Create one or many
   *
   * @param models - The set of models to create. Each string corresponds to exactly one model.
   * @param options - The operation options
   * @returns The created application/json models and the http response.
   */
  public createModels(
    dtdlModels: any[],
    options: OperationOptions = {}
  ): Promise<DigitalTwinModelsAddResponse> {
    const digitalTwinModelsAddOptionalParams: DigitalTwinModelsAddOptionalParams = options;
    digitalTwinModelsAddOptionalParams.models = dtdlModels;

    return tracingClient.withSpan(
      "DigitalTwinsClient.createModels",
      digitalTwinModelsAddOptionalParams,
      async (updatedOptions) => {
        return this.client.digitalTwinModels.add(updatedOptions);
      }
    );
  }

  /**
   * Decommission a model using a json patch.
   * When a model is decommissioned, new digital twins will no longer be able to be
   * defined by this model. However, existing digital twins may continue to use this model.
   * Once a model is decommissioned, it may not be recommissioned.
   *
   * @param modelId - The Id of the model to decommission.
   * property can be replaced.
   * @param options - The operation options
   * @returns The http response.
   *
   */
  public decommissionModel(modelId: string, options: OperationOptions = {}): Promise<RestResponse> {
    const jsonPatch = [{ op: "replace", path: "/decommissioned", value: true }];

    return tracingClient.withSpan(
      "DigitalTwinsClient.decommissionModel",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwinModels.update(modelId, jsonPatch, updatedOptions);
      }
    );
  }

  /**
   * @deprecated Please use {@link DigitalTwinsClient.decommissionModel} instead.
   */
  public decomissionModel = this.decommissionModel;

  /**
   * Delete a model.
   *
   * @param modelId - The Id of the model to delete.
   * @param options - The operation options
   * @returns The http response.
   */
  public deleteModel(modelId: string, options: OperationOptions = {}): Promise<RestResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteModel",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwinModels.delete(modelId, updatedOptions);
      }
    );
  }

  /**
   * Get an event route.
   *
   * @param modelId - The Id of the event route.
   * @param options - The operation options
   * @returns The application/json event route and the http response.
   */
  public getEventRoute(
    eventRouteId: string,
    options: OperationOptions = {}
  ): Promise<EventRoutesGetByIdResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getEventRoute",
      options,
      async (updatedOptions) => {
        return this.client.eventRoutes.getById(eventRouteId, updatedOptions);
      }
    );
  }

  /**
   * Deals with the pagination of {@link list}.
   *
   * @param options - Common options for the iterative endpoints.
   * @param continuationState - An object that indicates the position of the paginated request.
   *
   */
  private async *getEventRoutesPage(
    options: EventRoutesListOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<EventRoutesListNextResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: EventRoutesListOptionalParams = options;
      optionsComplete.maxItemsPerPage = continuationState.maxPageSize;

      const listResponse = await this.client.eventRoutes.list(optionsComplete);
      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
    while (continuationState.continuationToken) {
      const listResponse = await this.client.eventRoutes.listNext(
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
  }

  /**
   * Deals with the iteration of all the available results of {@link list}.
   * @param options - Common options for the iterative endpoints.
   */
  private async *getEventRoutesAll(
    options: EventRoutesListOptionalParams
  ): AsyncIterableIterator<EventRoute> {
    const f = {};
    for await (const page of this.getEventRoutesPage(options, f)) {
      const value = page.value || [];
      for (const item of value) {
        yield item;
      }
    }
  }

  /**
   * List the event routes in a digital twins instance.
   *
   * @param resultsPerPage - The maximum number of items to retrieve per request. The server may choose to return less than
   * the requested max.
   * @returns The application/json event route and the http response.
   */
  public listEventRoutes(
    resultsPerPage?: number,
    options: OperationOptions & PageSettings = {}
  ): PagedAsyncIterableIterator<EventRoute, EventRoutesListNextResponse> {
    let eventRoutesListOptionalParams: EventRoutesListOptionalParams = options;
    eventRoutesListOptionalParams = {
      maxItemsPerPage: resultsPerPage,
    };

    const iter = this.getEventRoutesAll(eventRoutesListOptionalParams);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.getEventRoutesPage(eventRoutesListOptionalParams, settings),
    };
  }

  /**
   * Create or update an event route.
   *
   * @param eventRouteId - The Id of the event route to create or update.
   * @param endpointId - The id of the endpoint this event route is bound to.
   * @param filter - An expression which describes the events which are routed to the endpoint.
   * @param options - The operation options
   * @returns The http response.
   */
  public upsertEventRoute(
    eventRouteId: string,
    endpointId: string,
    filter: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const eventRoutesAddOptionalParams: EventRoutesAddOptionalParams = options;
    const eventRoute: EventRoute = {
      endpointName: endpointId,
      filter: filter,
    };
    eventRoutesAddOptionalParams.eventRoute = eventRoute;

    return tracingClient.withSpan(
      "DigitalTwinsClient.upsertEventRoute",
      eventRoutesAddOptionalParams,
      async (updatedOptions) => {
        return this.client.eventRoutes.add(eventRouteId, updatedOptions);
      }
    );
  }

  /**
   * Delete an event route.
   *
   * @param eventRouteId - The Id of the eventRoute to delete.
   * @param options - The operation options
   * @returns The http response.
   */
  public deleteEventRoute(
    eventRouteId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteEventRoute",
      options,
      async (updatedOptions) => {
        return this.client.eventRoutes.delete(eventRouteId, updatedOptions);
      }
    );
  }

  /**
   * Deals with the pagination of {@link query}.
   *
   * @param query - The query string, in SQL-like syntax.
   * @param options - Common options for the iterative endpoints.
   * @param continuationState - An object that indicates the position of the paginated request.
   *
   */
  private async *queryTwinsPage(
    query: string,
    options: QueryQueryTwinsOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<QueryQueryTwinsResponse> {
    if (continuationState.continuationToken == null) {
      const querySpecification: QuerySpecification = {
        query: query,
        continuationToken: continuationState.continuationToken,
      };
      const queryResult = await this.client.query.queryTwins(querySpecification, options);
      continuationState.continuationToken = queryResult.continuationToken;
      yield queryResult;
    }
    while (continuationState.continuationToken) {
      const querySpecification: QuerySpecification = {
        query: query,
        continuationToken: continuationState.continuationToken,
      };
      const queryResult = await this.client.query.queryTwins(querySpecification, options);

      continuationState.continuationToken = queryResult.continuationToken;
      yield queryResult;
    }
  }

  /**
   * Deals with the iteration of all the available results of {@link query}.
   * @param query - The query string, in SQL-like syntax.
   * @param options - Common options for the iterative endpoints.
   */
  private async *queryTwinsAll(
    query: string,
    options: QueryQueryTwinsOptionalParams
  ): AsyncIterableIterator<any> {
    const f = {};

    for await (const page of this.queryTwinsPage(query, options, f)) {
      if (page.value) {
        for (const item of page.value) {
          yield item;
        }
      }
    }
  }

  /**
   * Query for digital twins.
   *
   * @param query - The query string, in SQL-like syntax.
   * @param resultsPerPage - The maximum number of items to retrieve per request. The server may choose to return less than the requested max.
   * @returns The pageable list of query results.
   */
  public queryTwins(
    query: string,
    resultsPerPage?: number,
    options: OperationOptions & PageSettings = {}
  ): PagedAsyncIterableIterator<any, QueryQueryTwinsResponse> {
    let queryQueryTwinsOptionalParams: QueryQueryTwinsOptionalParams = options;
    queryQueryTwinsOptionalParams = {
      maxItemsPerPage: resultsPerPage,
    };

    const iter = this.queryTwinsAll(query, queryQueryTwinsOptionalParams);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.queryTwinsPage(query, queryQueryTwinsOptionalParams, settings),
    };
  }
}
