import type { OperationOptions, CommonClientOptions } from "@azure/core-client";
import type { TokenCredential } from "@azure/core-auth";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { DigitalTwinsGetByIdResponse, DigitalTwinsAddOptionalParams, DigitalTwinsAddResponse, DigitalTwinsUpdateOptionalParams, DigitalTwinsUpdateResponse, DigitalTwinsDeleteOptionalParams, DigitalTwinsGetComponentResponse, DigitalTwinsUpdateComponentResponse, DigitalTwinsUpdateComponentOptionalParams, DigitalTwinsAddRelationshipResponse, DigitalTwinsAddRelationshipOptionalParams, DigitalTwinsUpdateRelationshipOptionalParams, DigitalTwinsUpdateRelationshipResponse, DigitalTwinsDeleteRelationshipOptionalParams, IncomingRelationship, DigitalTwinsGetRelationshipByIdResponse, DigitalTwinsModelData, DigitalTwinModelsGetByIdResponse, DigitalTwinModelsAddResponse, EventRoutesGetByIdResponse, EventRoute, QueryQueryTwinsResponse } from "./generated/models/index.js";
import { DigitalTwinModelsGetByIdOptionalParams as GetModelOptions, DigitalTwinModelsListOptionalParams as ListModelsOptions, QueryQueryTwinsOptionalParams as QueryTwinsOptions, EventRoutesListOptionalParams as ListEventRoutesOptions, DigitalTwinsListRelationshipsOptionalParams as ListRelationshipsOptions, DigitalTwinsListIncomingRelationshipsOptionalParams as ListIncomingRelationshipsOptions } from "./generated/models/index.js";
export { GetModelOptions, ListModelsOptions, QueryTwinsOptions, ListEventRoutesOptions, ListIncomingRelationshipsOptions, ListRelationshipsOptions, };
/**
 * Options for the DigitalTwinsClient class
 */
export interface DigitalTwinsClientOptions extends CommonClientOptions {
}
/**
 * Client for Azure IoT DigitalTwins API.
 */
export declare class DigitalTwinsClient {
    /**
     * A reference to the auto-generated AzureDigitalTwinsAPI
     */
    private readonly client;
    /**
     * Creates an instance of AzureDigitalTwinsAPI.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateClient_Node
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { DigitalTwinsClient } from "@azure/digital-twins-core";
     *
     * const url = "<URL to Azure Digital Twins instance>";
     * const credential = new DefaultAzureCredential();
     * const serviceClient = new DigitalTwinsClient(url, credential);
     * ```
     * @param endpointUrl - The endpoint URL of the service.
     * @param credential - Used to authenticate requests to the service.
     * @param options - Used to configure the service client.
     */
    constructor(endpointUrl: string, credential: TokenCredential, options?: DigitalTwinsClientOptions);
    /**
     * Get a digital twin
     *
     * @param digitalTwinId - The Id of the digital twin.
     * @param options - The operation options
     * @returns The application/json digital twin.
     */
    getDigitalTwin(digitalTwinId: string, options?: OperationOptions): Promise<DigitalTwinsGetByIdResponse>;
    /**
     * Create or update a digital twin
     *
     * @param digitalTwinId - The Id of the digital twin to create or update.
     * @param digitalTwinJson - The application/json digital twin to create.
     * @param options - Extended operation options including
     *  ifNoneMatch: Only perform the operation if the entity does not already exist.
     * @returns The created application/json digital twin.
     */
    upsertDigitalTwin(digitalTwinId: string, digitalTwinJson: string, options?: DigitalTwinsAddOptionalParams): Promise<DigitalTwinsAddResponse>;
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
    updateDigitalTwin(digitalTwinId: string, jsonPatch: Array<Record<string, unknown>>, options?: DigitalTwinsUpdateOptionalParams): Promise<DigitalTwinsUpdateResponse>;
    /**
     * Delete a digital twin
     *
     * @param digitalTwinId - The Id of the digital twin to delete.
     * @param options - Extended operation options including
     *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
  
     */
    deleteDigitalTwin(digitalTwinId: string, options?: DigitalTwinsDeleteOptionalParams): Promise<void>;
    /**
     * Get a component on a digital twin.
     *
     * @param digitalTwinId - The Id of the digital twin.
     * @param componentName - The component being retrieved.
     * @param options - The operation options
     * @returns Json string representation of the component corresponding to the provided componentName.
     */
    getComponent(digitalTwinId: string, componentName: string, options?: OperationOptions): Promise<DigitalTwinsGetComponentResponse>;
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
    updateComponent(digitalTwinId: string, componentName: string, jsonPatch: Array<Record<string, unknown>>, options?: DigitalTwinsUpdateComponentOptionalParams): Promise<DigitalTwinsUpdateComponentResponse>;
    /**
     * Get a relationship on a digital twin.
     *
     * @param digitalTwinId - The Id of the source digital twin.
     * @param relationshipId - The Id of the relationship to retrieve.
     * @param options - The operation options
     * @returns The pageable list of application/json relationships belonging to the specified digital twin.
     */
    getRelationship(digitalTwinId: string, relationshipId: string, options?: OperationOptions): Promise<DigitalTwinsGetRelationshipByIdResponse>;
    /**
     * Create or update a relationship on a digital twin.
     *
     * @param digitalTwinId - The Id of the source digital twin.
     * @param relationshipId - The Id of the relationship to create.
     * @param relationship - The application/json relationship to be created.
     * @param options - Extended operation options including
     *  ifNoneMatch: Only perform the operation if the entity does not already exist.
     */
    upsertRelationship(digitalTwinId: string, relationshipId: string, relationship: Record<string, unknown>, options?: DigitalTwinsAddRelationshipOptionalParams): Promise<DigitalTwinsAddRelationshipResponse>;
    /**
     * Updates the properties of a relationship on a digital twin using a JSON patch.
     *
     * @param digitalTwinId - The Id of the digital twin to delete.
     * @param relationshipId - The Id of the relationship to be updated.
     * @param jsonPatch - The application/json-patch+json operations to be performed on the specified digital twin's relationship.
     * @param options - Extended operation options
     *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
     */
    updateRelationship(digitalTwinId: string, relationshipId: string, jsonPatch: Array<Record<string, unknown>>, options?: DigitalTwinsUpdateRelationshipOptionalParams): Promise<DigitalTwinsUpdateRelationshipResponse>;
    /**
     * Delete a relationship on a digital twin.
     *
     * @param digitalTwinId - The Id of the source digital twin.
     * @param relationshipId - The Id of the relationship to delete.
     * @param options - The operation options
     *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is
  
     */
    deleteRelationship(digitalTwinId: string, relationshipId: string, options?: DigitalTwinsDeleteRelationshipOptionalParams): Promise<void>;
    /**
     * Retrieve relationships for a digital twin.
     *
     * @param digitalTwinId - The Id of the digital twin.
     */
    listRelationships(digitalTwinId: string, options?: ListRelationshipsOptions): PagedAsyncIterableIterator<Record<string, unknown>>;
    /**
     * Retrieve all incoming relationships for a digital twin.
     *
     * @param digitalTwinId - The Id of the digital twin.
     */
    listIncomingRelationships(digitalTwinId: string, options?: ListIncomingRelationshipsOptions): PagedAsyncIterableIterator<IncomingRelationship>;
    /**
     * Publish telemetry from a digital twin, which is then consumed by one or many destination endpoints (subscribers) defined under.
     *
     * @param digitalTwinId - The Id of the digital twin to delete.
     * @param payload - The application/json telemetry payload to be sent.
     * @param messageId - The message Id.
     * @param options - The operation options
  
     */
    publishTelemetry(digitalTwinId: string, payload: Record<string, unknown>, messageId: string, options?: OperationOptions): Promise<void>;
    /**
     * Publish telemetry from a digital twin's component, which is then consumed by one or many destination endpoints (subscribers) defined under.
     *
     * @param digitalTwinId - The Id of the digital twin to delete.
     * @param componentName - The name of the DTDL component.
     * @param payload - The application/json telemetry payload to be sent.
     * @param messageId - The message Id.
     * @param options - The operation options
  
     */
    publishComponentTelemetry(digitalTwinId: string, componentName: string, payload: Record<string, unknown>, messageId: string, options?: OperationOptions): Promise<void>;
    /**
     * Get a model, including the model metadata and the model definition.
     *
     * @param modelId - The Id of the model.
     * @param options - Options for this operation
     * @returns The application/json model.
     */
    getModel(modelId: string, options?: GetModelOptions): Promise<DigitalTwinModelsGetByIdResponse>;
    /**
     * Get the list of models
     *
     * @param options - Options for listing models.
     * @returns A pageable set of application/json models.
     */
    listModels(options?: ListModelsOptions): PagedAsyncIterableIterator<DigitalTwinsModelData>;
    /**
     * Create one or many
     *
     * @param dtdlModels - The set of models to create. Each string corresponds to exactly one model.
     * @param options - The operation options
     * @returns The created application/json models.
     */
    createModels(dtdlModels: Array<Record<string, unknown>>, options?: OperationOptions): Promise<DigitalTwinModelsAddResponse>;
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
    decomissionModel(modelId: string, options?: OperationOptions): Promise<void>;
    /**
     * Delete a model.
     *
     * @param modelId - The Id of the model to delete.
     * @param options - The operation options
  
     */
    deleteModel(modelId: string, options?: OperationOptions): Promise<void>;
    /**
     * Get an event route.
     *
     * @param modelId - The Id of the event route.
     * @param options - The operation options
     * @returns The application/json event route.
     */
    getEventRoute(eventRouteId: string, options?: OperationOptions): Promise<EventRoutesGetByIdResponse>;
    /**
     * List the event routes in a digital twins instance.
     *
     * @param options - Options for listEventRoutes.
     * @returns The application/json event route.
     */
    listEventRoutes(options?: ListEventRoutesOptions): PagedAsyncIterableIterator<EventRoute>;
    /**
     * Create or update an event route.
     *
     * @param eventRouteId - The Id of the event route to create or update.
     * @param endpointId - The id of the endpoint this event route is bound to.
     * @param filter - An expression which describes the events which are routed to the endpoint.
     * @param options - The operation options
  
     */
    upsertEventRoute(eventRouteId: string, endpointId: string, filter: string, options?: OperationOptions): Promise<void>;
    /**
     * Delete an event route.
     *
     * @param eventRouteId - The Id of the eventRoute to delete.
     * @param options - The operation options
  
     */
    deleteEventRoute(eventRouteId: string, options?: OperationOptions): Promise<void>;
    /**
     * Deals with the pagination of {@link query}.
     *
     * @param query - The query string, in SQL-like syntax.
     * @param options - Common options for the iterative endpoints.
     * @param continuationState - An object that indicates the position of the paginated request.
     *
     */
    private queryTwinsPage;
    /**
     * Deals with the iteration of all the available results of {@link query}.
     * @param query - The query string, in SQL-like syntax.
     * @param options - Common options for the iterative endpoints.
     */
    private queryTwinsAll;
    /**
     * Query for digital twins.
     *
     * @param query - The query string, in SQL-like syntax.
     * @param options - Options for the query operation.
     * @returns The pageable list of query results.
     */
    queryTwins(query: string, options?: QueryTwinsOptions): PagedAsyncIterableIterator<Record<string, unknown>, QueryQueryTwinsResponse>;
}
//# sourceMappingURL=digitalTwinsClient.d.ts.map