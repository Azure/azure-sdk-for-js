// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TokenCredential,
  ServiceClientCredentials,
  RestResponse,
  RequestOptionsBase,
} from "@azure/core-http";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { v4 } from "uuid";
import { AzureDigitalTwinsAPI as GeneratedClient } from "./generated/azureDigitalTwinsAPI";
import {
  AzureDigitalTwinsAPIOptions,
  DigitalTwinsGetByIdResponse,
  DigitalTwinsAddOptionalParams,
  DigitalTwinsAddResponse,
  DigitalTwinsUpdateOptionalParams,
  DigitalTwinsUpdateResponse,
  DigitalTwinsDeleteMethodOptionalParams,
  DigitalTwinsGetComponentResponse,
  DigitalTwinsUpdateComponentResponse,
  DigitalTwinsUpdateComponentOptionalParams,
  DigitalTwinsAddRelationshipResponse,
  DigitalTwinsAddRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipResponse,
  DigitalTwinsDeleteRelationshipOptionalParams,
  DigitalTwinsListIncomingRelationshipsResponse,
  DigitalTwinsListRelationshipsOptionalParams,
  DigitalTwinsListRelationshipsResponse,
  DigitalTwinsSendTelemetryOptionalParams,
  DigitalTwinsSendComponentTelemetryOptionalParams,
  DigitalTwinModelsGetByIdResponse,
  DigitalTwinModelsListOptionalParams,
  DigitalTwinModelsListResponse,
  DigitalTwinModelsListOptions,
  DigitalTwinModelsAddResponse,
  DigitalTwinModelsAddOptionalParams,
  ModelData,
  IncomingRelationship,
  EventRoutesGetByIdResponse,
  EventRoutesListOptionalParams,
  EventRoutesListNextResponse,
  EventRoute,
  EventRoutesAddOptionalParams,
  QueryQueryTwinsResponse,
  QuerySpecification,
} from "./generated/models";

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

  // private readonly client!: AzureDigitalTwinsAPI;

  /**
   * Creates an instance of AzureDigitalTwinsAPI.
   *
   * Example usage:
   * ```ts
   * const { DigitalTwinsClient, ServiceClientCredentials } = require("@azure/digitaltwins");
   *
   * const client = new DigitalTwinsClient(
   *   "<endpoint>",
   *   new DefaultAzureCredential();
   * );
   * ```
   * @param {string} endpoint The endpoint of the service. If options parameter is given than this value will be ignored.
   * @param {TokenCredential | ServiceClientCredentials} credential Used to authenticate requests to the service.
   * @param {AzureDigitalTwinsAPIOptions} [options] Used to configure the service client.
   */
  constructor(
    endpoint: string,
    credential: TokenCredential | ServiceClientCredentials,
    options: AzureDigitalTwinsAPIOptions = {}
  ) {
    options.baseUri = endpoint;
    this.client = new GeneratedClient(credential, options);
  }

  /**
   * Get a digital twin
   *
   * @param digitalTwinId The Id of the digital twin.
   * @returns The application/json digital twin and the http response.
   */
  public getDigitalTwin(digitalTwinId: string): Promise<DigitalTwinsGetByIdResponse> {
    return this.client.digitalTwins.getById(digitalTwinId);
  }

  /**
   * Create or update a digital twin
   *
   * @param digitalTwinId The Id of the digital twin to create or update.
   * @param digitalTwinJson The application/json digital twin to create.
   * @param enableUpdate If true then update of an existing digital twin is enabled.
   * @returns The created application/json digital twin and the http response.
   */
  public upsertDigitalTwin(
    digitalTwinId: string,
    digitalTwinJson: string,
    options?: DigitalTwinsAddOptionalParams
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
   * @returns The http response.
   */
  public updateDigitalTwin(
    digitalTwinId: string,
    twinPatch: any,
    options?: DigitalTwinsUpdateOptionalParams
  ): Promise<DigitalTwinsUpdateResponse> {
    return this.client.digitalTwins.update(digitalTwinId, twinPatch, options);
  }

  /**
   * Delete a digital twin
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param ifMatch Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public deleteDigitalTwin(digitalTwinId: string, ifMatch?: string): Promise<RestResponse> {
    var options = <DigitalTwinsDeleteMethodOptionalParams>{};
    options.ifMatch = ifMatch;
    return this.client.digitalTwins.deleteMethod(digitalTwinId, options);
  }

  /**
   * Get a component on a digital twin.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param componentPath The component being retrieved.
   * @returns Json string representation of the component corresponding to the provided componentPath and the HTTP response.
   */
  public getComponent(
    digitalTwinId: string,
    componentPath: string
  ): Promise<DigitalTwinsGetComponentResponse> {
    return this.client.digitalTwins.getComponent(digitalTwinId, componentPath);
  }

  /**
   * Update properties of a component on a digital twin using a JSON patch.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param componentPath The component being updated.
   * @param componentPatch The application/json-patch+json operations to be performed on the specified digital twin's component.
   * @param ifMatch The etag of the component to update. Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public updateComponent(
    digitalTwinId: string,
    componentPath: string,
    options?: DigitalTwinsUpdateComponentOptionalParams
  ): Promise<DigitalTwinsUpdateComponentResponse> {
    return this.client.digitalTwins.updateComponent(digitalTwinId, componentPath, options);
  }

  /**
   * Get a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to retrieve.
   * @returns The pageable list of application/json relationships belonging to the specified digital twin and the http response.
   */
  public getRelationship(
    digitalTwinId: string,
    relationshipId: string
  ): Promise<DigitalTwinsGetByIdResponse> {
    return this.client.digitalTwins.getRelationshipById(digitalTwinId, relationshipId);
  }

  /**
   * Create or update a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to create.
   * @param relationship: The application/json relationship to be created.
   * @param enableUpdate If true then update of an existing relationship is enabled.
   */
  public upsertRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options?: DigitalTwinsAddRelationshipOptionalParams
  ): Promise<DigitalTwinsAddRelationshipResponse> {
    return this.client.digitalTwins.addRelationship(digitalTwinId, relationshipId, options);
  }

  /**
   * Updates the properties of a relationship on a digital twin using a JSON patch.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param relationshipId The Id of the relationship to be updated.
   * @param relationshipPatch The application/json-patch+json operations to be performed on the specified digital twin's relationship.
   * @param ifMatch Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   */
  public updateRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options?: DigitalTwinsUpdateRelationshipOptionalParams
  ): Promise<DigitalTwinsUpdateRelationshipResponse> {
    return this.client.digitalTwins.updateRelationship(digitalTwinId, relationshipId, options);
  }

  /**
   * Delete a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to delete.
   * @param ifMatch Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public deleteRelationship(
    digitalTwinId: string,
    relationshipId: string,
    ifMatch: string
  ): Promise<RestResponse> {
    var options = <DigitalTwinsDeleteRelationshipOptionalParams>{};
    options.ifMatch = ifMatch;
    return this.client.digitalTwins.deleteRelationship(digitalTwinId, relationshipId, options);
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
    options: DigitalTwinsListRelationshipsOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinsListRelationshipsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: DigitalTwinsListRelationshipsOptionalParams = {
        maxresults: continuationState.maxPageSize,
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
    options: DigitalTwinsListRelationshipsOptionalParams
  ): AsyncIterableIterator<any> {
    for await (const page of this.listRelationshipsPage(digitalTwinId, options, {})) {
      for (const item of page) {
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
    options: DigitalTwinsListRelationshipsOptionalParams & PageSettings = {}
  ): PagedAsyncIterableIterator<any> {
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
        ...options,
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
    const f = {};

    for await (const page of this.listIncomingRelationshipsPage(digitalTwinId, options, f)) {
      for (const item of page) {
        yield item;
      }
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
        this.listIncomingRelationshipsPage(digitalTwinId, options, settings),
    };
  }

  /**
   * Publish telemetry from a digital twin, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param payload The application/json telemetry payload to be sent.
   * @param messageId The message Id.
   * @returns The http response.
   */
  public publishTelemetry(
    digitalTwinId: string,
    payload: any,
    messageId?: string
  ): Promise<RestResponse> {
    var options = <DigitalTwinsSendTelemetryOptionalParams>{};
    options.dtTimestamp = new Date().getTime().toString();
    if (!messageId) {
      messageId = v4();
    }
    return this.client.digitalTwins.sendTelemetry(digitalTwinId, payload, messageId, options);
  }

  /**
   * Publish telemetry from a digital twin's component, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param componentPath The name of the DTDL component.
   * @param payload The application/json telemetry payload to be sent.
   * @param messageId The message Id.
   * @returns The http response.
   */
  public publishComponentTelemetry(
    digitalTwinId: string,
    componentPath: string,
    payload: string,
    messageId?: string
  ): Promise<RestResponse> {
    var options = <DigitalTwinsSendComponentTelemetryOptionalParams>{};
    options.dtTimestamp = new Date().getTime().toString();
    if (!messageId) {
      messageId = v4();
    }
    return this.client.digitalTwins.sendComponentTelemetry(
      digitalTwinId,
      componentPath,
      payload,
      messageId,
      options
    );
  }

  /**
   * Get a model, including the model metadata and the model definition.
   *
   * @param modelId The Id of the model.
   * @returns The application/json model and the http response.
   */
  public getModel(modelId: string): Promise<DigitalTwinModelsGetByIdResponse> {
    return this.client.digitalTwinModels.getById(modelId);
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
        maxresults: continuationState.maxPageSize,
        ...options,
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
      for (const item of page) {
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
    var options: DigitalTwinModelsListOptionalParams & PageSettings = {};
    options.dependenciesFor = dependeciesFor;
    options.includeModelDefinition = includeModelDefinition;

    var maxItemOption: DigitalTwinModelsListOptions = {};
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
      byPage: (settings: PageSettings = {}) => this.getModelsPage(options, settings),
    };
  }

  /**
   * Create one or many
   *
   * @param models The set of models to create. Each string corresponds to exactly one model.
   * @returns The created application/json models and the http response.
   */
  public createModels(models: any[]): Promise<DigitalTwinModelsAddResponse> {
    var options = <DigitalTwinModelsAddOptionalParams>{};
    options.models = models;
    return this.client.digitalTwinModels.add(models);
  }

  /**
   * Decommission a model using a json patch.
   *
   * @param modelId The Id of the model to decommission.
   * @param updateModel An update specification described by JSON Patch. Only the decommissioned
   * property can be replaced.
   * @returns The http response.
   * @summary When a model is decomissioned, new digital twins will no longer be able to be
   * defined by this model. However, existing digital twins may continue to use this model.
   * Once a model is decomissioned, it may not be recommissioned.
   */
  public decomissionModel(modelId: string, updateModel: any[]): Promise<RestResponse> {
    return this.client.digitalTwinModels.update(modelId, updateModel);
  }

  /**
   * Delete a model.
   *
   * @param modelId The Id of the model to delete.
   * @returns The http response.
   */
  public deleteModel(modelId: string): Promise<RestResponse> {
    return this.client.digitalTwins.deleteMethod(modelId);
  }

  /**
   * Get an event route.
   *
   * @param modelId The Id of the event route.
   * @returns The application/json event route and the http response.
   */
  public getEventRoute(eventRouteId: string): Promise<EventRoutesGetByIdResponse> {
    return this.client.eventRoutes.getById(eventRouteId);
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
        maxresults: continuationState.maxPageSize,
        ...options,
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
      for (const item of page) {
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
    var options: EventRoutesListOptionalParams & PageSettings = {};
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
      byPage: (settings: PageSettings = {}) => this.getEventRoutesPage(options, settings),
    };
  }

  /**
   * Create or update an event route.
   *
   * @param eventRouteId The Id of the event route to create or update.
   * @param endpointId The id of the endpoint this event route is bound to.
   * @param filter An expression which describes the events which are routed to the endpoint.
   * @returns The http response.
   */
  public upsertEventRoute(
    eventRouteId: string,
    endpointName: string,
    filter?: string
  ): Promise<RestResponse> {
    var options: EventRoutesAddOptionalParams = {};
    var eventRoute: EventRoute = {
      endpointName,
      filter,
    };
    options.eventRoute = eventRoute;
    return this.client.eventRoutes.add(eventRouteId, options);
  }

  /**
   * Delete an event route.
   *
   * @param eventRouteId The Id of the model to delete.
   * @returns The http response.
   */
  public deleteEventRoute(eventRouteId: string): Promise<RestResponse> {
    return this.client.eventRoutes.deleteMethod(eventRouteId);
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
        ...options,
      };
      const queryResponse = await this.client.query.queryTwins(optionsComplete);
      continuationState.continuationToken = queryResponse.continuationToken;
      yield queryResponse;
    }
    while (continuationState.continuationToken) {
      const optionsNext: QuerySpecification = {
        continuationToken: continuationState.continuationToken,
        ...options,
      };
      const queryResponse = await this.client.query.queryTwins(optionsNext, options);

      continuationState.continuationToken = queryResponse.continuationToken;
      yield queryResponse;
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
    var querySpecification = <QuerySpecification>{};
    querySpecification.query = query;

    const iter = this.queryTwinsAll(querySpecification);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.queryTwinsPage(querySpecification, settings),
    };
  }
}

export {
  AzureDigitalTwinsAPIOptions,
  DigitalTwinsAddHeaders,
  DigitalTwinsAddOptionalParams,
  DigitalTwinsAddResponse,
  DigitalTwinsGetByIdResponse,
  DigitalTwinsUpdateHeaders,
  DigitalTwinsGetByIdHeaders,
  DigitalTwinsAddRelationshipHeaders,
  DigitalTwinsAddRelationshipOptionalParams,
  DigitalTwinsAddRelationshipResponse,
  DigitalTwinsUpdateRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipResponse,
  DigitalTwinsUpdateRelationshipHeaders,
  DigitalTwinsListRelationshipsOptionalParams,
  DigitalTwinsListRelationshipsResponse,
  DigitalTwinsDeleteRelationshipOptionalParams,
  RelationshipCollection,
  DigitalTwinsListIncomingRelationshipsResponse,
  IncomingRelationship,
  IncomingRelationshipCollection,
  DigitalTwinsSendComponentTelemetryOptionalParams,
  DigitalTwinsUpdateComponentHeaders,
  DigitalTwinsGetComponentHeaders,
  DigitalTwinsUpdateComponentOptionalParams,
  DigitalTwinsUpdateComponentResponse,
  DigitalTwinsGetComponentResponse,
  DigitalTwinsSendTelemetryOptionalParams,
  DigitalTwinsDeleteMethodOptionalParams,
  DigitalTwinModelsGetByIdResponse,
  DigitalTwinModelsListOptionalParams,
  DigitalTwinModelsListResponse,
  DigitalTwinModelsListOptions,
  DigitalTwinModelsAddResponse,
  DigitalTwinModelsAddOptionalParams,
  DigitalTwinsUpdateOptionalParams,
  DigitalTwinsUpdateResponse,
  EventRoute,
  EventRouteCollection,
  EventRoutesAddOptionalParams,
  EventRoutesGetByIdResponse,
  EventRoutesListNextResponse,
  EventRoutesListOptionalParams,
  EventRoutesListOptions,
  IfNoneMatch,
  IfNoneMatch1,
  ModelData,
  PagedModelDataCollection,
  QueryQueryTwinsHeaders,
  QueryQueryTwinsResponse,
  QueryResult,
  QuerySpecification,
} from "./generated/models";
