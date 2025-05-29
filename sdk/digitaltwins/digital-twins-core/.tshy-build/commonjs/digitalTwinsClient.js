"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalTwinsClient = void 0;
const tslib_1 = require("tslib");
const core_util_1 = require("@azure/core-util");
const azureDigitalTwinsAPI_js_1 = require("./generated/azureDigitalTwinsAPI.js");
const tracing_js_1 = require("./tracing.js");
const logger_js_1 = require("./logger.js");
const DEFAULT_DIGITALTWINS_SCOPE = "https://digitaltwins.azure.net/.default";
/**
 * Client for Azure IoT DigitalTwins API.
 */
class DigitalTwinsClient {
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
    constructor(endpointUrl, credential, options = {}) {
        const internalPipelineOptions = Object.assign(Object.assign({}, options), { loggingOptions: {
                logger: logger_js_1.logger.info,
                additionalAllowedHeaderNames: ["x-ms-request-id"],
            } });
        this.client = new azureDigitalTwinsAPI_js_1.AzureDigitalTwinsAPI(Object.assign({ endpoint: endpointUrl, credential, credentialScopes: DEFAULT_DIGITALTWINS_SCOPE }, internalPipelineOptions));
    }
    /**
     * Get a digital twin
     *
     * @param digitalTwinId - The Id of the digital twin.
     * @param options - The operation options
     * @returns The application/json digital twin.
     */
    getDigitalTwin(digitalTwinId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.getDigitalTwin", options, async (updatedOptions) => {
            return this.client.digitalTwins.getById(digitalTwinId, updatedOptions);
        });
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
    upsertDigitalTwin(digitalTwinId, digitalTwinJson, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.upsertDigitalTwin", options, async (updatedOptions) => {
            const payload = JSON.parse(digitalTwinJson);
            return this.client.digitalTwins.add(digitalTwinId, payload, updatedOptions);
        });
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
    updateDigitalTwin(digitalTwinId, jsonPatch, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.updateDigitalTwin", options, async (updatedOptions) => {
            return this.client.digitalTwins.update(digitalTwinId, jsonPatch, updatedOptions);
        });
    }
    /**
     * Delete a digital twin
     *
     * @param digitalTwinId - The Id of the digital twin to delete.
     * @param options - Extended operation options including
     *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
  
     */
    deleteDigitalTwin(digitalTwinId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.deleteDigitalTwin", options, async (updatedOptions) => {
            return this.client.digitalTwins.delete(digitalTwinId, updatedOptions);
        });
    }
    /**
     * Get a component on a digital twin.
     *
     * @param digitalTwinId - The Id of the digital twin.
     * @param componentName - The component being retrieved.
     * @param options - The operation options
     * @returns Json string representation of the component corresponding to the provided componentName.
     */
    getComponent(digitalTwinId, componentName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.getComponent", options, async (updatedOptions) => {
            return this.client.digitalTwins.getComponent(digitalTwinId, componentName, updatedOptions);
        });
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
    updateComponent(digitalTwinId, componentName, jsonPatch, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.updateComponent", options, async (updatedOptions) => {
            return this.client.digitalTwins.updateComponent(digitalTwinId, componentName, jsonPatch, updatedOptions);
        });
    }
    /**
     * Get a relationship on a digital twin.
     *
     * @param digitalTwinId - The Id of the source digital twin.
     * @param relationshipId - The Id of the relationship to retrieve.
     * @param options - The operation options
     * @returns The pageable list of application/json relationships belonging to the specified digital twin.
     */
    getRelationship(digitalTwinId, relationshipId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.getRelationship", options, async (updatedOptions) => {
            return this.client.digitalTwins.getRelationshipById(digitalTwinId, relationshipId, updatedOptions);
        });
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
    upsertRelationship(digitalTwinId, relationshipId, relationship, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.upsertRelationship", options, async (updatedOptions) => {
            return this.client.digitalTwins.addRelationship(digitalTwinId, relationshipId, relationship, updatedOptions);
        });
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
    updateRelationship(digitalTwinId, relationshipId, jsonPatch, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.updateRelationship", options, async (updatedOptions) => {
            return this.client.digitalTwins.updateRelationship(digitalTwinId, relationshipId, jsonPatch, updatedOptions);
        });
    }
    /**
     * Delete a relationship on a digital twin.
     *
     * @param digitalTwinId - The Id of the source digital twin.
     * @param relationshipId - The Id of the relationship to delete.
     * @param options - The operation options
     *   ifMatch: Only perform the operation if the entity's etag matches one of the etags provided or * is
  
     */
    deleteRelationship(digitalTwinId, relationshipId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.deleteRelationship", options, async (updatedOptions) => {
            return this.client.digitalTwins.deleteRelationship(digitalTwinId, relationshipId, updatedOptions);
        });
    }
    /**
     * Retrieve relationships for a digital twin.
     *
     * @param digitalTwinId - The Id of the digital twin.
     */
    listRelationships(digitalTwinId, options) {
        return this.client.digitalTwins.listRelationships(digitalTwinId, options);
    }
    /**
     * Retrieve all incoming relationships for a digital twin.
     *
     * @param digitalTwinId - The Id of the digital twin.
     */
    listIncomingRelationships(digitalTwinId, options) {
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
    publishTelemetry(digitalTwinId, payload, messageId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.publishTelemetry", options, async (updatedOptions) => {
            return this.client.digitalTwins.sendTelemetry(digitalTwinId, messageId || (0, core_util_1.randomUUID)(), payload, Object.assign(Object.assign({}, updatedOptions), { telemetrySourceTime: new Date().toISOString() }));
        });
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
    publishComponentTelemetry(digitalTwinId, componentName, payload, messageId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.publishComponentTelemetry", options, async (updatedOptions) => {
            return this.client.digitalTwins.sendComponentTelemetry(digitalTwinId, componentName, messageId || (0, core_util_1.randomUUID)(), payload, Object.assign(Object.assign({}, updatedOptions), { telemetrySourceTime: new Date().toISOString() }));
        });
    }
    /**
     * Get a model, including the model metadata and the model definition.
     *
     * @param modelId - The Id of the model.
     * @param options - Options for this operation
     * @returns The application/json model.
     */
    getModel(modelId, options = {}) {
        var _a;
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.getModel", Object.assign(Object.assign({}, options), { includeModelDefinition: (_a = options === null || options === void 0 ? void 0 : options.includeModelDefinition) !== null && _a !== void 0 ? _a : false }), async (updatedOptions) => {
            return this.client.digitalTwinModels.getById(modelId, updatedOptions);
        });
    }
    /**
     * Get the list of models
     *
     * @param options - Options for listing models.
     * @returns A pageable set of application/json models.
     */
    listModels(options = {}) {
        var _a;
        return this.client.digitalTwinModels.list(Object.assign(Object.assign({}, options), { includeModelDefinition: (_a = options === null || options === void 0 ? void 0 : options.includeModelDefinition) !== null && _a !== void 0 ? _a : false }));
    }
    /**
     * Create one or many
     *
     * @param dtdlModels - The set of models to create. Each string corresponds to exactly one model.
     * @param options - The operation options
     * @returns The created application/json models.
     */
    createModels(dtdlModels, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.createModels", Object.assign(Object.assign({}, options), { models: dtdlModels }), async (updatedOptions) => {
            return this.client.digitalTwinModels.add(dtdlModels, updatedOptions);
        });
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
    decomissionModel(modelId, options = {}) {
        const jsonPatch = [{ op: "replace", path: "/decommissioned", value: true }];
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.decomissionModel", options, async (updatedOptions) => {
            return this.client.digitalTwinModels.update(modelId, jsonPatch, updatedOptions);
        });
    }
    /**
     * Delete a model.
     *
     * @param modelId - The Id of the model to delete.
     * @param options - The operation options
  
     */
    deleteModel(modelId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.deleteModel", options, async (updatedOptions) => {
            return this.client.digitalTwinModels.delete(modelId, updatedOptions);
        });
    }
    /**
     * Get an event route.
     *
     * @param modelId - The Id of the event route.
     * @param options - The operation options
     * @returns The application/json event route.
     */
    getEventRoute(eventRouteId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.getEventRoute", options, async (updatedOptions) => {
            return this.client.eventRoutes.getById(eventRouteId, updatedOptions);
        });
    }
    /**
     * List the event routes in a digital twins instance.
     *
     * @param options - Options for listEventRoutes.
     * @returns The application/json event route.
     */
    listEventRoutes(options) {
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
    upsertEventRoute(eventRouteId, endpointId, filter, options = {}) {
        const eventRoute = {
            endpointName: endpointId,
            filter,
        };
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.upsertEventRoute", Object.assign({ eventRoute }, options), async (updatedOptions) => {
            return this.client.eventRoutes.add(eventRouteId, eventRoute, updatedOptions);
        });
    }
    /**
     * Delete an event route.
     *
     * @param eventRouteId - The Id of the eventRoute to delete.
     * @param options - The operation options
  
     */
    deleteEventRoute(eventRouteId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DigitalTwinsClient.deleteEventRoute", options, async (updatedOptions) => {
            return this.client.eventRoutes.delete(eventRouteId, updatedOptions);
        });
    }
    /**
     * Deals with the pagination of {@link query}.
     *
     * @param query - The query string, in SQL-like syntax.
     * @param options - Common options for the iterative endpoints.
     * @param continuationState - An object that indicates the position of the paginated request.
     *
     */
    queryTwinsPage(query, options, continuationState) {
        return tslib_1.__asyncGenerator(this, arguments, function* queryTwinsPage_1() {
            let { continuationToken } = continuationState !== null && continuationState !== void 0 ? continuationState : {};
            if (!continuationToken) {
                const queryResult = yield tslib_1.__await(this.client.query.queryTwins({ query }, options));
                continuationToken = queryResult.continuationToken;
                yield yield tslib_1.__await(queryResult);
            }
            while (continuationToken) {
                const queryResult = yield tslib_1.__await(this.client.query.queryTwins({ query, continuationToken }, options));
                continuationToken = queryResult.continuationToken;
                yield yield tslib_1.__await(queryResult);
            }
        });
    }
    /**
     * Deals with the iteration of all the available results of {@link query}.
     * @param query - The query string, in SQL-like syntax.
     * @param options - Common options for the iterative endpoints.
     */
    queryTwinsAll(query, options) {
        return tslib_1.__asyncGenerator(this, arguments, function* queryTwinsAll_1() {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.queryTwinsPage(query, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    if (page.value) {
                        yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(page.value)));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    /**
     * Query for digital twins.
     *
     * @param query - The query string, in SQL-like syntax.
     * @param options - Options for the query operation.
     * @returns The pageable list of query results.
     */
    queryTwins(query, options = {}) {
        const iter = this.queryTwinsAll(query, options);
        return {
            next() {
                return iter.next();
            },
            [Symbol.asyncIterator]() {
                return this;
            },
            byPage: (settings = {}) => this.queryTwinsPage(query, options, settings),
        };
    }
}
exports.DigitalTwinsClient = DigitalTwinsClient;
//# sourceMappingURL=digitalTwinsClient.js.map