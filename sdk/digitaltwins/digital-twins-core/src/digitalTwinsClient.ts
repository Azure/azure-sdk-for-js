// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  OperationOptions,
  InternalClientPipelineOptions,
  CommonClientOptions,
} from "@azure/core-client";
import { TokenCredential } from "@azure/core-auth";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { v4 as generateUuid } from "uuid";
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
  IncomingRelationship,
  DigitalTwinsGetRelationshipByIdResponse,
  DigitalTwinsModelData,
  DigitalTwinModelsGetByIdResponse,
  DigitalTwinModelsAddResponse,
  EventRoutesGetByIdResponse,
  EventRoute,
  QueryQueryTwinsResponse,
  DigitalTwinModelsGetByIdOptionalParams as GetModelOptions,
  DigitalTwinModelsListOptionalParams as ListModelsOptions,
  QueryQueryTwinsOptionalParams as QueryTwinsOptions,
  EventRoutesListOptionalParams as ListEventRoutesOptions,
  DigitalTwinsListRelationshipsOptionalParams as ListRelationshipsOptions,
  DigitalTwinsListIncomingRelationshipsOptionalParams as ListIncomingRelationshipsOptions,
} from "./generated/models";
import { tracingClient } from "./tracing";
import { logger } from "./logger";
export {
  GetModelOptions,
  ListModelsOptions,
  QueryTwinsOptions,
  ListEventRoutesOptions,
  ListIncomingRelationshipsOptions,
  ListRelationshipsOptions,
};

/**
 * Options for the DigitalTwinsClient class
 */
export interface DigitalTwinsClientOptions extends CommonClientOptions {}

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
    options: DigitalTwinsClientOptions = {},
  ) {
    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: ["x-ms-request-id"],
      },
    };

    this.client = new GeneratedClient({
      endpoint: endpointUrl,
      credential,
      credentialScopes: DEFAULT_DIGITALTWINS_SCOPE,
      ...internalPipelineOptions,
    });
  }

  /**
   * Get a digital twin
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param options - The operation options
   * @returns The application/json digital twin.
   */
  public getDigitalTwin(
    digitalTwinId: string,
    options: OperationOptions = {},
  ): Promise<DigitalTwinsGetByIdResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getDigitalTwin",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.getById(digitalTwinId, updatedOptions);
      },
    );
  }

  /**
   * Create or update a digital twin
   *
   * @param digitalTwinId - The Id of the digital twin to create or update.
   * @param digitalTwinJson - The application/json digital twin to create.
   * @param options - Extended operation options including
   *  ifNoneMatch: Only perform the operation if the entity does not already exist.
   * @returns The created application/json digital twin.
   */
  public upsertDigitalTwin(
    digitalTwinId: string,
    digitalTwinJson: string,
    options: DigitalTwinsAddOptionalParams = {},
  ): Promise<DigitalTwinsAddResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.upsertDigitalTwin",
      options,
      async (updatedOptions) => {
        const payload = JSON.parse(digitalTwinJson);
        return this.client.digitalTwins.add(digitalTwinId, payload, updatedOptions);
      },
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

   */
  public updateDigitalTwin(
    digitalTwinId: string,
    jsonPatch: Array<Record<string, unknown>>,
    options: DigitalTwinsUpdateOptionalParams = {},
  ): Promise<DigitalTwinsUpdateResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.updateDigitalTwin",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.update(digitalTwinId, jsonPatch, updatedOptions);
      },
    );
  }

  /**
   * Delete a digital twin
   *
   * @param digitalTwinId - The Id of the digital twin to delete.
   * @param options - Extended operation options including
   *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.

   */
  public deleteDigitalTwin(
    digitalTwinId: string,
    options: DigitalTwinsDeleteOptionalParams = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteDigitalTwin",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.delete(digitalTwinId, updatedOptions);
      },
    );
  }

  /**
   * Get a component on a digital twin.
   *
   * @param digitalTwinId - The Id of the digital twin.
   * @param componentName - The component being retrieved.
   * @param options - The operation options
   * @returns Json string representation of the component corresponding to the provided componentName.
   */
  public getComponent(
    digitalTwinId: string,
    componentName: string,
    options: OperationOptions = {},
  ): Promise<DigitalTwinsGetComponentResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getComponent",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.getComponent(digitalTwinId, componentName, updatedOptions);
      },
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

   */
  public updateComponent(
    digitalTwinId: string,
    componentName: string,
    jsonPatch: Array<Record<string, unknown>>,
    options: DigitalTwinsUpdateComponentOptionalParams = {},
  ): Promise<DigitalTwinsUpdateComponentResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.updateComponent",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.updateComponent(
          digitalTwinId,
          componentName,
          jsonPatch,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Get a relationship on a digital twin.
   *
   * @param digitalTwinId - The Id of the source digital twin.
   * @param relationshipId - The Id of the relationship to retrieve.
   * @param options - The operation options
   * @returns The pageable list of application/json relationships belonging to the specified digital twin.
   */
  public getRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options: OperationOptions = {},
  ): Promise<DigitalTwinsGetRelationshipByIdResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.getRelationshipById(
          digitalTwinId,
          relationshipId,
          updatedOptions,
        );
      },
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
    relationship: Record<string, unknown>,
    options: DigitalTwinsAddRelationshipOptionalParams = {},
  ): Promise<DigitalTwinsAddRelationshipResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.upsertRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.addRelationship(
          digitalTwinId,
          relationshipId,
          relationship,
          updatedOptions,
        );
      },
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
    jsonPatch: Array<Record<string, unknown>>,
    options: DigitalTwinsUpdateRelationshipOptionalParams = {},
  ): Promise<DigitalTwinsUpdateRelationshipResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.updateRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.updateRelationship(
          digitalTwinId,
          relationshipId,
          jsonPatch,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Delete a relationship on a digital twin.
   *
   * @param digitalTwinId - The Id of the source digital twin.
   * @param relationshipId - The Id of the relationship to delete.
   * @param options - The operation options
   *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is

   */
  public deleteRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options: DigitalTwinsDeleteRelationshipOptionalParams = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteRelationship",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.deleteRelationship(
          digitalTwinId,
          relationshipId,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Retrieve relationships for a digital twin.
   *
   * @param digitalTwinId - The Id of the digital twin.
   */
  public listRelationships(
    digitalTwinId: string,
    options?: ListRelationshipsOptions,
  ): PagedAsyncIterableIterator<Record<string, unknown>> {
    return this.client.digitalTwins.listRelationships(digitalTwinId, options);
  }

  /**
   * Retrieve all incoming relationships for a digital twin.
   *
   * @param digitalTwinId - The Id of the digital twin.
   */
  public listIncomingRelationships(
    digitalTwinId: string,
    options?: ListIncomingRelationshipsOptions,
  ): PagedAsyncIterableIterator<IncomingRelationship> {
    return this.client.digitalTwins.listIncomingRelationships(digitalTwinId, options);
  }

  /**
   * Publish telemetry from a digital twin, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId - The Id of the digital twin to delete.
   * @param payload - The application/json telemetry payload to be sent.
   * @param messageId - The message Id.
   * @param options - The operation options

   */
  public publishTelemetry(
    digitalTwinId: string,
    payload: Record<string, unknown>,
    messageId: string,
    options: OperationOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.publishTelemetry",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.sendTelemetry(
          digitalTwinId,
          messageId || generateUuid(),
          payload,
          {
            ...updatedOptions,
            telemetrySourceTime: new Date().toISOString(),
          },
        );
      },
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

   */
  public publishComponentTelemetry(
    digitalTwinId: string,
    componentName: string,
    payload: Record<string, unknown>,
    messageId: string,
    options: OperationOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.publishComponentTelemetry",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwins.sendComponentTelemetry(
          digitalTwinId,
          componentName,
          messageId || generateUuid(),
          payload,
          { ...updatedOptions, telemetrySourceTime: new Date().toISOString() },
        );
      },
    );
  }

  /**
   * Get a model, including the model metadata and the model definition.
   *
   * @param modelId - The Id of the model.
   * @param options - Options for this operation
   * @returns The application/json model.
   */
  public getModel(
    modelId: string,
    options: GetModelOptions = {},
  ): Promise<DigitalTwinModelsGetByIdResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getModel",
      {
        ...options,
        includeModelDefinition: options?.includeModelDefinition ?? false,
      },
      async (updatedOptions) => {
        return this.client.digitalTwinModels.getById(modelId, updatedOptions);
      },
    );
  }

  /**
   * Get the list of models
   *
   * @param options - Options for listing models.
   * @returns A pageable set of application/json models.
   */
  public listModels(
    options: ListModelsOptions = {},
  ): PagedAsyncIterableIterator<DigitalTwinsModelData> {
    return this.client.digitalTwinModels.list({
      ...options,
      includeModelDefinition: options?.includeModelDefinition ?? false,
    });
  }

  /**
   * Create one or many
   *
   * @param dtdlModels - The set of models to create. Each string corresponds to exactly one model.
   * @param options - The operation options
   * @returns The created application/json models.
   */
  public createModels(
    dtdlModels: Array<Record<string, unknown>>,
    options: OperationOptions = {},
  ): Promise<DigitalTwinModelsAddResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.createModels",
      {
        ...options,
        models: dtdlModels,
      },
      async (updatedOptions) => {
        return this.client.digitalTwinModels.add(updatedOptions);
      },
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

   *
   */
  public decomissionModel(modelId: string, options: OperationOptions = {}): Promise<void> {
    const jsonPatch = [{ op: "replace", path: "/decommissioned", value: true }];

    return tracingClient.withSpan(
      "DigitalTwinsClient.decomissionModel",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwinModels.update(modelId, jsonPatch, updatedOptions);
      },
    );
  }

  /**
   * Delete a model.
   *
   * @param modelId - The Id of the model to delete.
   * @param options - The operation options

   */
  public deleteModel(modelId: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteModel",
      options,
      async (updatedOptions) => {
        return this.client.digitalTwinModels.delete(modelId, updatedOptions);
      },
    );
  }

  /**
   * Get an event route.
   *
   * @param modelId - The Id of the event route.
   * @param options - The operation options
   * @returns The application/json event route.
   */
  public getEventRoute(
    eventRouteId: string,
    options: OperationOptions = {},
  ): Promise<EventRoutesGetByIdResponse> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.getEventRoute",
      options,
      async (updatedOptions) => {
        return this.client.eventRoutes.getById(eventRouteId, updatedOptions);
      },
    );
  }

  /**
   * List the event routes in a digital twins instance.
   *
   * @param options - Options for listEventRoutes.
   * @returns The application/json event route.
   */
  public listEventRoutes(options?: ListEventRoutesOptions): PagedAsyncIterableIterator<EventRoute> {
    return this.client.eventRoutes.list(options);
  }

  /**
   * Create or update an event route.
   *
   * @param eventRouteId - The Id of the event route to create or update.
   * @param endpointId - The id of the endpoint this event route is bound to.
   * @param filter - An expression which describes the events which are routed to the endpoint.
   * @param options - The operation options

   */
  public upsertEventRoute(
    eventRouteId: string,
    endpointId: string,
    filter: string,
    options: OperationOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.upsertEventRoute",
      {
        eventRoute: {
          endpointName: endpointId,
          filter,
        },
        ...options,
      },
      async (updatedOptions) => {
        return this.client.eventRoutes.add(eventRouteId, updatedOptions);
      },
    );
  }

  /**
   * Delete an event route.
   *
   * @param eventRouteId - The Id of the eventRoute to delete.
   * @param options - The operation options

   */
  public deleteEventRoute(eventRouteId: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "DigitalTwinsClient.deleteEventRoute",
      options,
      async (updatedOptions) => {
        return this.client.eventRoutes.delete(eventRouteId, updatedOptions);
      },
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
    options: QueryTwinsOptions,
    continuationState?: PageSettings,
  ): AsyncIterableIterator<QueryQueryTwinsResponse> {
    let { continuationToken } = continuationState ?? {};
    if (!continuationToken) {
      const queryResult = await this.client.query.queryTwins({ query }, options);
      continuationToken = queryResult.continuationToken;
      yield queryResult;
    }
    while (continuationToken) {
      const queryResult = await this.client.query.queryTwins({ query, continuationToken }, options);
      continuationToken = queryResult.continuationToken;
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
    options: QueryTwinsOptions,
  ): AsyncIterableIterator<Record<string, unknown>> {
    for await (const page of this.queryTwinsPage(query, options)) {
      if (page.value) {
        yield* page.value;
      }
    }
  }

  /**
   * Query for digital twins.
   *
   * @param query - The query string, in SQL-like syntax.
   * @param options - Options for the query operation.
   * @returns The pageable list of query results.
   */
  public queryTwins(
    query: string,
    options: QueryTwinsOptions = {},
  ): PagedAsyncIterableIterator<Record<string, unknown>, QueryQueryTwinsResponse> {
    const iter = this.queryTwinsAll(query, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.queryTwinsPage(query, options, settings),
    };
  }
}
