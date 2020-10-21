// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  RestResponse,
  RequestOptionsBase,
  OperationOptions,
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  generateUuid,
  PipelineOptions
} from "@azure/core-http";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { AzureDigitalTwinsAPI as GeneratedClient } from "./generated/azureDigitalTwinsAPI";
import {
  DigitalTwinsGetByIdResponse,
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
  ModelData,
  DigitalTwinModelsGetByIdResponse,
  DigitalTwinModelsGetByIdOptionalParams,
  DigitalTwinModelsAddResponse,
  DigitalTwinModelsAddOptionalParams,
  DigitalTwinModelsListResponse,
  DigitalTwinModelsListOptionalParams,
  DigitalTwinModelsListOptions,
  EventRoutesGetByIdResponse,
  EventRoute,
  EventRoutesAddOptionalParams,
  EventRoutesListNextResponse,
  EventRoutesListOptionalParams,
  QueryQueryTwinsResponse,
  QuerySpecification
} from "./generated/models";
import { logger } from "./logger";

export const SDK_VERSION: string = "1.0.0-preview.1";

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
   * @internal
   * @ignore
   * A reference to the auto-generated AzureDigitalTwinsAPI
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of AzureDigitalTwinsAPI.
   *
   * Example usage:
   * ```ts
   * const { DigitalTwinsClient, ServiceClientCredentials } = require("@azure/digital-twins");
   *
   * const client = new DigitalTwinsClient(
   *   "<endpoint>",
   *   new DefaultAzureCredential();
   * );
   * ```
   * @param endpointUrl The endpoint URL of the service.
   * @param credential Used to authenticate requests to the service.
   * @param options Used to configure the service client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential,
    options: DigitalTwinsClientOptions = {}
  ) {
    const authPolicy = bearerTokenAuthenticationPolicy(credential, DEFAULT_DIGITALTWINS_SCOPE);
    const libInfo = `azsdk-js-digital-twins/${SDK_VERSION}`;

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
          allowedHeaderNames: ["x-ms-request-id"]
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient({
      endpoint: endpointUrl,
      apiVersion,
      ...pipeline
    });
  }

  /**
   * Get a digital twin
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param options The operation options
   * @returns The application/json digital twin and the http response.
   */
  public getDigitalTwin(
    digitalTwinId: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetByIdResponse> {
    return this.client.digitalTwins.getById(digitalTwinId, options);
  }

  /**
   * Create or update a digital twin
   *
   * @param digitalTwinId The Id of the digital twin to create or update.
   * @param digitalTwinJson The application/json digital twin to create.
   * @param enableUpdate If true then update of an existing digital twin is enabled.
   * @param options The operation options
   * @returns The created application/json digital twin and the http response.
   */
  public upsertDigitalTwin(
    digitalTwinId: string,
    digitalTwinJson: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsAddResponse> {
    return this.client.digitalTwins.add(digitalTwinId, digitalTwinJson, options);
  }

  /**
   * Update a digital twin using a json patch.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param twinPatch An update specification described by JSON Patch. Updates to property values
   * and $model elements may happen in the same request. Operations are limited to add, replace and
   * remove.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * provided
   * @param options The operation options
   * @returns The http response.
   */
  public updateDigitalTwin(
    digitalTwinId: string,
    twinPatch: any,
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<DigitalTwinsUpdateResponse> {
    const digitalTwinsUpdateOptionalParams: DigitalTwinsUpdateOptionalParams = options;
    digitalTwinsUpdateOptionalParams.ifMatch = etag;
    return this.client.digitalTwins.update(
      digitalTwinId,
      twinPatch,
      digitalTwinsUpdateOptionalParams
    );
  }

  /**
   * Delete a digital twin
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * provided
   * @param options The operation options
   * @returns The http response.
   */
  public deleteDigitalTwin(
    digitalTwinId: string,
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsDeleteOptionalParams: DigitalTwinsDeleteOptionalParams = options;
    digitalTwinsDeleteOptionalParams.ifMatch = etag;
    return this.client.digitalTwins.delete(digitalTwinId, digitalTwinsDeleteOptionalParams);
  }

  /**
   * Get a component on a digital twin.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param componentPath The component being retrieved.
   * @param options The operation options
   * @returns Json string representation of the component corresponding to the provided componentPath and the HTTP response.
   */
  public getComponent(
    digitalTwinId: string,
    componentPath: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetComponentResponse> {
    return this.client.digitalTwins.getComponent(digitalTwinId, componentPath, options);
  }

  /**
   * Update properties of a component on a digital twin using a JSON patch.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param componentPath The component being updated.
   * @param componentPatch The application/json-patch+json operations to be performed on the specified digital twin's component.
   * @param enableUpdate If true then update of an existing digital twin is enabled.
   * @param options The operation options
   * @param etag The etag of the component to update. Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public updateComponent(
    digitalTwinId: string,
    componentPath: string,
    componentPatch: any[] = [],
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<DigitalTwinsUpdateComponentResponse> {
    const digitalTwinsUpdateComponentOptionalParams: DigitalTwinsUpdateComponentOptionalParams = options;
    digitalTwinsUpdateComponentOptionalParams.ifMatch = etag;
    digitalTwinsUpdateComponentOptionalParams.patchDocument = componentPatch;
    return this.client.digitalTwins.updateComponent(
      digitalTwinId,
      componentPath,
      digitalTwinsUpdateComponentOptionalParams
    );
  }

  /**
   * Get a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to retrieve.
   * @param options The operation options
   * @returns The pageable list of application/json relationships belonging to the specified digital twin and the http response.
   */
  public getRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetByIdResponse> {
    return this.client.digitalTwins.getRelationshipById(digitalTwinId, relationshipId, options);
  }

  /**
   * Create or update a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to create.
   * @param relationship: The application/json relationship to be created.
   * @param options The operation options
   */
  public upsertRelationship(
    digitalTwinId: string,
    relationshipId: string,
    relationship: any,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsAddRelationshipResponse> {
    const digitalTwinsAddRelationshipOptionalParams: DigitalTwinsAddRelationshipOptionalParams = options;
    digitalTwinsAddRelationshipOptionalParams.relationship = relationship;
    return this.client.digitalTwins.addRelationship(
      digitalTwinId,
      relationshipId,
      digitalTwinsAddRelationshipOptionalParams
    );
  }

  /**
   * Updates the properties of a relationship on a digital twin using a JSON patch.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param relationshipId The Id of the relationship to be updated.
   * @param relationshipPatch The application/json-patch+json operations to be performed on the specified digital twin's relationship.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * @param options The operation options
   * provided
   */
  public updateRelationship(
    digitalTwinId: string,
    relationshipId: string,
    relationshipPatch: any[],
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<DigitalTwinsUpdateRelationshipResponse> {
    const digitalTwinsUpdateRelationshipOptionalParams: DigitalTwinsUpdateRelationshipOptionalParams = options;
    digitalTwinsUpdateRelationshipOptionalParams.ifMatch = etag;
    digitalTwinsUpdateRelationshipOptionalParams.patchDocument = relationshipPatch;
    return this.client.digitalTwins.updateRelationship(
      digitalTwinId,
      relationshipId,
      digitalTwinsUpdateRelationshipOptionalParams
    );
  }

  /**
   * Delete a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to delete.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * @param options The operation options
   * @returns The http response.
   */
  public deleteRelationship(
    digitalTwinId: string,
    relationshipId: string,
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsDeleteRelationshipOptionalParams: DigitalTwinsDeleteRelationshipOptionalParams = options;
    digitalTwinsDeleteRelationshipOptionalParams.ifMatch = etag;
    return this.client.digitalTwins.deleteRelationship(
      digitalTwinId,
      relationshipId,
      digitalTwinsDeleteRelationshipOptionalParams
    );
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listRelationships}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {DigitalTwinsListRelationshipsOptionalParams} [options] Common options for the iterative endpoints.
   *
   */
  private async *listRelationshipsPage(
    digitalTwinId: string,
    options: RequestOptionsBase,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinsListRelationshipsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: RequestOptionsBase = {
        maxresults: continuationState.maxPageSize,
        ...options
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
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listRelationships}.
   * @param {DigitalTwinsListRelationshipsOptionalParams} [options] Common options for the iterative endpoints.
   */
  private async *listRelationshipsAll(
    digitalTwinId: string,
    options: RequestOptionsBase
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
   * @param digitalTwinId The Id of the digital twin.
   */
  public listRelationships(
    digitalTwinId: string,
    options: RequestOptionsBase & PageSettings = {}
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
        this.listRelationshipsPage(digitalTwinId, options, settings)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listIncomingRelationships}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {RequestOptionsBase} [options] Common options for the iterative endpoints.
   *
   */
  private async *listIncomingRelationshipsPage(
    digitalTwinId: string,
    options: RequestOptionsBase,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinsListIncomingRelationshipsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: RequestOptionsBase = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const listIncomingRelationshipsResponse = await this.client.digitalTwins.listIncomingRelationships(
        digitalTwinId,
        optionsComplete
      );
      continuationState.continuationToken = listIncomingRelationshipsResponse.nextLink;
      yield listIncomingRelationshipsResponse;
    }
    while (continuationState.continuationToken) {
      const listIncomingRelationshipsResponse = await this.client.digitalTwins.listIncomingRelationshipsNext(
        "",
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listIncomingRelationshipsResponse.nextLink;
      yield listIncomingRelationshipsResponse;
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listIncomingRelationships}.
   * @param {RequestOptionsBase} [options] Common options for the iterative endpoints.
   */
  private async *listIncomingRelationshipsAll(
    digitalTwinId: string,
    options: RequestOptionsBase
  ): AsyncIterableIterator<IncomingRelationship> {
    for await (const page of this.listIncomingRelationshipsPage(digitalTwinId, options, {})) {
      const value = page.value || [];
      yield* value;
    }
  }

  /**
   * Retrieve all incoming relationships for a digital twin.
   *
   * @param digitalTwinId The Id of the digital twin.
   */
  public listIncomingRelationships(
    digitalTwinId: string,
    options: RequestOptionsBase & PageSettings = {}
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
        this.listIncomingRelationshipsPage(digitalTwinId, options, settings)
    };
  }

  /**
   * Publish telemetry from a digital twin, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param payload The application/json telemetry payload to be sent.
   * @param messageId The message Id.
   * @param options The operation options
   * @returns The http response.
   */
  public publishTelemetry(
    digitalTwinId: string,
    payload: any,
    messageId?: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsSendTelemetryOptionalParams: DigitalTwinsSendTelemetryOptionalParams = options;
    digitalTwinsSendTelemetryOptionalParams.timestamp = new Date().getTime().toString();
    if (!messageId) {
      messageId = generateUuid();
    }
    return this.client.digitalTwins.sendTelemetry(
      digitalTwinId,
      payload,
      messageId,
      digitalTwinsSendTelemetryOptionalParams
    );
  }

  /**
   * Publish telemetry from a digital twin's component, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param componentPath The name of the DTDL component.
   * @param payload The application/json telemetry payload to be sent.
   * @param messageId The message Id.
   * @param options The operation options
   * @returns The http response.
   */
  public publishComponentTelemetry(
    digitalTwinId: string,
    componentPath: string,
    payload: string,
    messageId?: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsSendComponentTelemetryOptionalParams: DigitalTwinsSendComponentTelemetryOptionalParams = options;
    digitalTwinsSendComponentTelemetryOptionalParams.timestamp = new Date().getTime().toString();
    if (!messageId) {
      messageId = generateUuid();
    }
    return this.client.digitalTwins.sendComponentTelemetry(
      digitalTwinId,
      componentPath,
      payload,
      messageId,
      digitalTwinsSendComponentTelemetryOptionalParams
    );
  }

  /**
   * Get a model, including the model metadata and the model definition.
   *
   * @param modelId The Id of the model.
   * @param includeModelDefinition When true the model definition will be returned as part of the result. Default value: false.
   * @param options The operation options
   * @returns The application/json model and the http response.
   */
  public getModel(
    modelId: string,
    includeModelDefinition?: boolean,
    options: OperationOptions = {}
  ): Promise<DigitalTwinModelsGetByIdResponse> {
    const digitalTwinModelsGetByIdOptionalParams: DigitalTwinModelsGetByIdOptionalParams = options;
    digitalTwinModelsGetByIdOptionalParams.includeModelDefinition = includeModelDefinition;
    return this.client.digitalTwinModels.getById(modelId, digitalTwinModelsGetByIdOptionalParams);
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link list}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {DigitalTwinModelsListOptionalParams} [options] Common options for the iterative endpoints.
   *
   */
  private async *getModelsPage(
    options: DigitalTwinModelsListOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinModelsListResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: DigitalTwinModelsListOptionalParams = {
        digitalTwinModelsListOptions: {
          maxItemCount: continuationState.maxPageSize
        },
        ...options
      };
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
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link list}.
   * @param {DigitalTwinModelsListOptionalParams} [options] Common options for the iterative endpoints.
   */
  private async *getModelsAll(
    options: DigitalTwinModelsListOptionalParams
  ): AsyncIterableIterator<ModelData> {
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
   * @param dependeciesFor The model Ids to have dependencies retrieved. If omitted, all models are retrieved.
   * @param includeModelDefinition Whether to include the model definition in the result. If false, only the model metadata will be returned.
   * @param maxItemCount The maximum number of items to retrieve per request. The server may choose to return less than the requested max. Default value: -1.
   * @returns A pageable set of application/json models and the http response.
   */
  public listModels(
    dependeciesFor?: string[],
    includeModelDefinition: boolean = false,
    maxItemCount: number = -1
  ): PagedAsyncIterableIterator<ModelData, DigitalTwinModelsListResponse> {
    const options: DigitalTwinModelsListOptionalParams & PageSettings = {};
    options.dependenciesFor = dependeciesFor;
    options.includeModelDefinition = includeModelDefinition;

    const maxItemOption: DigitalTwinModelsListOptions = {};
    maxItemOption.maxItemCount = maxItemCount;
    options.digitalTwinModelsListOptions = maxItemOption;

    const iter = this.getModelsAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.getModelsPage(options, settings)
    };
  }

  /**
   * Create one or many
   *
   * @param models The set of models to create. Each string corresponds to exactly one model.
   * @param options The operation options
   * @returns The created application/json models and the http response.
   */
  public createModels(
    models: any[],
    options: OperationOptions = {}
  ): Promise<DigitalTwinModelsAddResponse> {
    const digitalTwinModelsAddOptionalParams: DigitalTwinModelsAddOptionalParams = options;
    digitalTwinModelsAddOptionalParams.models = models;
    return this.client.digitalTwinModels.add(digitalTwinModelsAddOptionalParams);
  }

  /**
   * Decommission a model using a json patch.
   *
   * @param modelId The Id of the model to decommission.
   * @param updateModel An update specification described by JSON Patch. Only the decommissioned
   * property can be replaced.
   * @param options The operation options
   * @returns The http response.
   * @summary When a model is decomissioned, new digital twins will no longer be able to be
   * defined by this model. However, existing digital twins may continue to use this model.
   * Once a model is decomissioned, it may not be recommissioned.
   */
  public decomissionModel(
    modelId: string,
    updateModel: any[],
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    return this.client.digitalTwinModels.update(modelId, updateModel, options);
  }

  /**
   * Delete a model.
   *
   * @param modelId The Id of the model to delete.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * provided
   * @param options The operation options
   * @returns The http response.
   */
  public deleteModel(modelId: string, options: OperationOptions = {}): Promise<RestResponse> {
    return this.client.digitalTwinModels.delete(modelId, options);
  }

  /**
   * Get an event route.
   *
   * @param modelId The Id of the event route.
   * @param options The operation options
   * @returns The application/json event route and the http response.
   */
  public getEventRoute(
    eventRouteId: string,
    options: OperationOptions = {}
  ): Promise<EventRoutesGetByIdResponse> {
    return this.client.eventRoutes.getById(eventRouteId, options);
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link list}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {EventRoutesListOptionalParams} [options] Common options for the iterative endpoints.
   *
   */
  private async *getEventRoutesPage(
    options: EventRoutesListOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<EventRoutesListNextResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: EventRoutesListOptionalParams = {
        eventRoutesListOptions: {
          maxItemCount: continuationState.maxPageSize
        },
        ...options
      };
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
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link list}.
   * @param {EventRoutesListOptionalParams} [options] Common options for the iterative endpoints.
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
   * @param maxItemCount The maximum number of items to retrieve per request. The server may choose to return less than
   * the requested max. Default value: -1.
   * @returns The application/json event route and the http response.
   */
  public listEventRoutes(
    maxItemCount: number = -1
  ): PagedAsyncIterableIterator<EventRoute, EventRoutesListNextResponse> {
    const options: EventRoutesListOptionalParams & PageSettings = {};
    if (maxItemCount !== -1) {
      options.eventRoutesListOptions = {};
      options.eventRoutesListOptions.maxItemCount = maxItemCount;
    }

    const iter = this.getEventRoutesAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.getEventRoutesPage(options, settings)
    };
  }

  /**
   * Create or update an event route.
   *
   * @param eventRouteId The Id of the event route to create or update.
   * @param endpointId The id of the endpoint this event route is bound to.
   * @param filter An expression which describes the events which are routed to the endpoint.
   * @param options The operation options
   * @returns The http response.
   */
  public upsertEventRoute(
    eventRouteId: string,
    endpointId: string,
    filter?: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const requestOptions: EventRoutesAddOptionalParams = options;
    const eventRoute: EventRoute = {
      endpointName: endpointId,
      filter: filter
    };
    requestOptions.eventRoute = eventRoute;
    return this.client.eventRoutes.add(eventRouteId, requestOptions);
  }

  /**
   * Delete an event route.
   *
   * @param eventRouteId The Id of the model to delete.
   * @param options The operation options
   * @returns The http response.
   */
  public deleteEventRoute(
    eventRouteId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    return this.client.eventRoutes.delete(eventRouteId, options);
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link query}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {RequestOptionsBase} [options] Common options for the iterative endpoints.
   *
   */
  private async *queryTwinsPage(
    options: RequestOptionsBase,
    continuationState: PageSettings
  ): AsyncIterableIterator<QueryQueryTwinsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: QuerySpecification = {
        continuationToken: continuationState.continuationToken,
        ...options
      };
      const queryResult = await this.client.query.queryTwins(optionsComplete);
      continuationState.continuationToken = queryResult.continuationToken;
      yield queryResult;
    }
    while (continuationState.continuationToken) {
      const optionsNext: QuerySpecification = {
        continuationToken: continuationState.continuationToken,
        ...options
      };
      const queryResult = await this.client.query.queryTwins(optionsNext, options);

      continuationState.continuationToken = queryResult.continuationToken;
      yield queryResult;
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link query}.
   * @param {RequestOptionsBase} [options] Common options for the iterative endpoints.
   */
  private async *queryTwinsAll(options: RequestOptionsBase): AsyncIterableIterator<any> {
    const f = {};

    for await (const page of this.queryTwinsPage(options, f)) {
      if (page.items) {
        for (const item of page.items) {
          yield item;
        }
      }
    }
  }

  /**
   * Query for digital twins.
   *
   * @param query The query string, in SQL-like syntax.
   * @returns The pageable list of query results.
   */
  public queryTwins(query?: string): PagedAsyncIterableIterator<any, QueryQueryTwinsResponse> {
    const querySpecification: QuerySpecification = {};
    querySpecification.query = query;

    const iter = this.queryTwinsAll(querySpecification);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.queryTwinsPage(querySpecification, settings)
    };
  }
}
