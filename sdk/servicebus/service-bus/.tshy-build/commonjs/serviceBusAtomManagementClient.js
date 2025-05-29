"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusAdministrationClient = void 0;
const tslib_1 = require("tslib");
const core_amqp_1 = require("@azure/core-amqp");
const core_auth_1 = require("@azure/core-auth");
const core_client_1 = require("@azure/core-client");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const log_js_1 = require("./log.js");
const namespaceResourceSerializer_js_1 = require("./serializers/namespaceResourceSerializer.js");
const queueResourceSerializer_js_1 = require("./serializers/queueResourceSerializer.js");
const ruleResourceSerializer_js_1 = require("./serializers/ruleResourceSerializer.js");
const subscriptionResourceSerializer_js_1 = require("./serializers/subscriptionResourceSerializer.js");
const topicResourceSerializer_js_1 = require("./serializers/topicResourceSerializer.js");
const atomXmlHelper_js_1 = require("./util/atomXmlHelper.js");
const Constants = tslib_1.__importStar(require("./util/constants.js"));
const parseUrl_js_1 = require("./util/parseUrl.js");
const sasServiceClientCredentials_js_1 = require("./util/sasServiceClientCredentials.js");
const tracing_js_1 = require("./diagnostics/tracing.js");
const core_util_1 = require("@azure/core-util");
const utils_js_1 = require("./util/utils.js");
function signingPolicy(credentials) {
    return {
        name: "signingPolicy",
        async sendRequest(request, next) {
            const signed = await credentials.signRequest(request);
            return next(signed);
        },
    };
}
/**
 * All operations return promises that resolve to an object that has the relevant output.
 * These objects also have a property called `_response` that you can use if you want to
 * access the direct response from the service.
 */
class ServiceBusAdministrationClient extends core_client_1.ServiceClient {
    constructor(fullyQualifiedNamespaceOrConnectionString1, credentialOrOptions2, options3) {
        var _a, _b;
        let options;
        let fullyQualifiedNamespace;
        let credentials;
        let authPolicy;
        let useTls = true;
        if ((0, core_auth_1.isTokenCredential)(credentialOrOptions2)) {
            fullyQualifiedNamespace = fullyQualifiedNamespaceOrConnectionString1;
            options = options3 || {};
            credentials = credentialOrOptions2;
            authPolicy = (0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
                credential: credentials,
                scopes: core_amqp_1.Constants.aadServiceBusScope,
            });
        }
        else if ((0, core_auth_1.isNamedKeyCredential)(credentialOrOptions2)) {
            fullyQualifiedNamespace = fullyQualifiedNamespaceOrConnectionString1;
            credentials = new sasServiceClientCredentials_js_1.SasServiceClientCredentials(credentialOrOptions2);
            options = options3 || {};
            authPolicy = signingPolicy(credentials);
        }
        else {
            const connectionString = fullyQualifiedNamespaceOrConnectionString1;
            options = credentialOrOptions2 || {};
            const connectionStringObj = (0, core_amqp_1.parseConnectionString)(connectionString);
            if (connectionStringObj.Endpoint === undefined) {
                throw new Error("Missing Endpoint in connection string.");
            }
            try {
                fullyQualifiedNamespace = connectionStringObj.Endpoint.match(".*://([^/]*)")[1];
            }
            catch (_c) {
                throw new Error("Endpoint in the connection string is not valid.");
            }
            if (connectionStringObj.UseDevelopmentEmulator) {
                useTls = false;
            }
            credentials = new sasServiceClientCredentials_js_1.SasServiceClientCredentials({
                key: connectionStringObj.SharedAccessKey,
                name: connectionStringObj.SharedAccessKeyName,
            });
            authPolicy = signingPolicy(credentials);
        }
        const userAgentPrefix = (0, utils_js_1.formatUserAgentPrefix)((_a = options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix);
        const serviceClientOptions = (0, core_rest_pipeline_1.createPipelineFromOptions)(Object.assign(Object.assign({}, options), { userAgentOptions: {
                userAgentPrefix,
            } }));
        serviceClientOptions.addPolicy(authPolicy);
        super({ pipeline: serviceClientOptions });
        this.endpoint = fullyQualifiedNamespace;
        this.endpointWithProtocol = fullyQualifiedNamespace.endsWith("/")
            ? "sb://" + fullyQualifiedNamespace
            : "sb://" + fullyQualifiedNamespace + "/";
        this.serviceVersion = (_b = options.serviceVersion) !== null && _b !== void 0 ? _b : Constants.CURRENT_API_VERSION;
        this.useTls = useTls;
        this.credentials = credentials;
        this.namespaceResourceSerializer = new namespaceResourceSerializer_js_1.NamespaceResourceSerializer();
        this.queueResourceSerializer = new queueResourceSerializer_js_1.QueueResourceSerializer();
        this.topicResourceSerializer = new topicResourceSerializer_js_1.TopicResourceSerializer();
        this.subscriptionResourceSerializer = new subscriptionResourceSerializer_js_1.SubscriptionResourceSerializer();
        this.ruleResourceSerializer = new ruleResourceSerializer_js_1.RuleResourceSerializer();
    }
    /**
     * Returns an object representing the metadata related to a service bus namespace.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     */
    async getNamespaceProperties(operationOptions = {}) {
        log_js_1.administrationLogger.verbose(`Performing management operation - getNamespaceProperties()`);
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getNamespaceProperties", operationOptions, async (updatedOptions) => {
            const response = await this.getResource("$namespaceinfo", this.namespaceResourceSerializer, updatedOptions);
            return this.buildNamespacePropertiesResponse(response);
        });
    }
    /**
     * Creates a queue with given name, configured using the given options
     * @param options - Options to configure the Queue being created(For example, you can configure a queue to support partitions or sessions)
     *  and the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityAlreadyExistsError` when requested messaging entity already exists,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `QuotaExceededError` when requested operation fails due to quote limits exceeding from service side,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async createQueue(queueName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.createQueue", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - createQueue() for "${queueName}" with options: %j`, options);
            const response = await this.putResource(queueName, (0, queueResourceSerializer_js_1.buildQueueOptions)(options || {}), this.queueResourceSerializer, false, updatedOptions);
            return this.buildQueueResponse(response);
        });
    }
    /**
     * Returns an object representing the Queue and its properties.
     * If you want to get the Queue runtime info like message count details, use `getQueueRuntimeProperties` API.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getQueue(queueName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getQueue", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getQueue() for "${queueName}"`);
            const response = await this.getResource(queueName, this.queueResourceSerializer, updatedOptions);
            return this.buildQueueResponse(response);
        });
    }
    /**
     * Returns an object representing the Queue runtime info like message count details.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getQueueRuntimeProperties(queueName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getQueueRuntimeProperties", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getQueueRuntimeProperties() for "${queueName}"`);
            const response = await this.getResource(queueName, this.queueResourceSerializer, updatedOptions);
            return this.buildQueueRuntimePropertiesResponse(response);
        });
    }
    /**
     * Returns a list of objects, each representing a Queue along with its properties.
     * If you want to get the runtime info of the queues like message count, use `getQueuesRuntimeProperties` API instead.
     * @param options - The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getQueues(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getQueues", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getQueues() with options: %j`, options);
            const response = await this.listResources("$Resources/Queues", updatedOptions, this.queueResourceSerializer);
            return this.buildListQueuesResponse(response);
        });
    }
    listQueuesPage(marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listQueuesPage_1(marker, options = {}) {
            let listResponse;
            do {
                listResponse = yield tslib_1.__await(this.getQueues(Object.assign({ skip: Number(marker), maxCount: options.maxPageSize }, options)));
                marker = listResponse.continuationToken;
                yield yield tslib_1.__await(listResponse);
            } while (marker);
        });
    }
    listQueuesAll() {
        return tslib_1.__asyncGenerator(this, arguments, function* listQueuesAll_1(options = {}) {
            var _a, e_1, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listQueuesPage(marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment)));
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
     * Returns an async iterable iterator to list all the queues.
     *
     * .byPage() returns an async iterable iterator to list the queues in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listQueues(options) {
        log_js_1.administrationLogger.verbose(`Performing management operation - listQueues() with options: %j`, options);
        const iter = this.listQueuesAll(options);
        return {
            /**
             */
            next() {
                return iter.next();
            },
            /**
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             */
            byPage: (settings = {}) => {
                this.throwIfInvalidContinuationToken(settings.continuationToken);
                return this.listQueuesPage(settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, options));
            },
        };
    }
    /**
     * Returns a list of objects, each representing a Queue's runtime info like message count details.
     * @param options - The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getQueuesRuntimeProperties(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getQueuesRuntimeProperties", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getQueuesRuntimeProperties() with options: %j`, options);
            const response = await this.listResources("$Resources/Queues", updatedOptions, this.queueResourceSerializer);
            return this.buildListQueuesRuntimePropertiesResponse(response);
        });
    }
    listQueuesRuntimePropertiesPage(marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listQueuesRuntimePropertiesPage_1(marker, options = {}) {
            let listResponse;
            do {
                listResponse = yield tslib_1.__await(this.getQueuesRuntimeProperties(Object.assign({ skip: Number(marker), maxCount: options.maxPageSize }, options)));
                marker = listResponse.continuationToken;
                yield yield tslib_1.__await(listResponse);
            } while (marker);
        });
    }
    listQueuesRuntimePropertiesAll() {
        return tslib_1.__asyncGenerator(this, arguments, function* listQueuesRuntimePropertiesAll_1(options = {}) {
            var _a, e_2, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listQueuesRuntimePropertiesPage(marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment)));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    /**
     * Returns an async iterable iterator to list runtime info of the queues.
     *
     * .byPage() returns an async iterable iterator to list runtime info of the queues in pages.
     *
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listQueuesRuntimeProperties(options) {
        log_js_1.administrationLogger.verbose(`Performing management operation - listQueuesRuntimeProperties() with options: %j`, options);
        const iter = this.listQueuesRuntimePropertiesAll(options);
        return {
            /**
             */
            next() {
                return iter.next();
            },
            /**
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             */
            byPage: (settings = {}) => {
                this.throwIfInvalidContinuationToken(settings.continuationToken);
                return this.listQueuesRuntimePropertiesPage(settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, options));
            },
        };
    }
    /**
     * Updates the queue based on the queue properties provided.
     * All queue properties must be set even though only a subset of them are actually updatable.
     * Therefore, the suggested flow is to use the output from `getQueue()`, update the desired properties in it, and then pass the modified object to `updateQueue()`.
     *
     * The properties that cannot be updated are marked as readonly in the `QueueProperties` interface.
     *
     * @param queue - Object representing the properties of the queue and the raw response.
     * `requiresSession`, `requiresDuplicateDetection`, `enablePartitioning`, and `name` can't be updated after creating the queue.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async updateQueue(queue, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.updateQueue", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - updateQueue() for "${queue.name}" with options: %j`, queue);
            if (!(0, utils_js_1.isJSONLikeObject)(queue) || queue == null) {
                throw new TypeError(`Parameter "queue" must be an object of type "QueueDescription" and cannot be undefined or null.`);
            }
            if (!queue.name) {
                throw new TypeError(`"name" attribute of the parameter "queue" cannot be undefined.`);
            }
            const response = await this.putResource(queue.name, (0, queueResourceSerializer_js_1.buildQueueOptions)(queue), this.queueResourceSerializer, true, updatedOptions);
            return this.buildQueueResponse(response);
        });
    }
    /**
     * Deletes a queue.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async deleteQueue(queueName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.deleteQueue", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - deleteQueue() for "${queueName}"`);
            const response = await this.deleteResource(queueName, this.queueResourceSerializer, updatedOptions);
            return { _response: (0, utils_js_1.getHttpResponseOnly)(response) };
        });
    }
    /**
     * Checks whether a given queue exists or not.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     */
    async queueExists(queueName, operationOptions = {}) {
        log_js_1.administrationLogger.verbose(`Performing management operation - queueExists() for "${queueName}"`);
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ServiceBusAdministrationClient.queueExists", operationOptions);
        try {
            await this.getQueue(queueName, updatedOptions);
            span.setStatus({ status: "success" });
            return true;
        }
        catch (e) {
            span.setStatus({ status: "error", error: e });
            return false;
        }
        finally {
            span.end();
        }
    }
    /**
     * Creates a topic with given name, configured using the given options
     * @param options - Options to configure the Topic being created(For example, you can configure a topic to support partitions)
     * and the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityAlreadyExistsError` when requested messaging entity already exists,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `QuotaExceededError` when requested operation fails due to quote limits exceeding from service side,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async createTopic(topicName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.createTopic", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - createTopic() for "${topicName}" with options: %j`, options);
            const response = await this.putResource(topicName, (0, topicResourceSerializer_js_1.buildTopicOptions)(options || {}), this.topicResourceSerializer, false, updatedOptions);
            return this.buildTopicResponse(response);
        });
    }
    /**
     * Returns an object representing the Topic and its properties.
     * If you want to get the Topic runtime info like subscription count details, use `getTopicRuntimeProperties` API.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getTopic(topicName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getTopic", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getTopic() for "${topicName}"`);
            const response = await this.getResource(topicName, this.topicResourceSerializer, updatedOptions);
            return this.buildTopicResponse(response);
        });
    }
    /**
     * Returns an object representing the Topic runtime info like subscription count.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getTopicRuntimeProperties(topicName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getTopicRuntimeProperties", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getTopicRuntimeProperties() for "${topicName}"`);
            const response = await this.getResource(topicName, this.topicResourceSerializer, updatedOptions);
            return this.buildTopicRuntimePropertiesResponse(response);
        });
    }
    /**
     * Returns a list of objects, each representing a Topic along with its properties.
     * If you want to get the runtime info of the topics like subscription count, use `getTopicsRuntimeProperties` API instead.
     * @param options - The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getTopics(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getTopics", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getTopics() with options: %j`, options);
            const response = await this.listResources("$Resources/Topics", updatedOptions, this.topicResourceSerializer);
            return this.buildListTopicsResponse(response);
        });
    }
    listTopicsPage(marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listTopicsPage_1(marker, options = {}) {
            let listResponse;
            do {
                listResponse = yield tslib_1.__await(this.getTopics(Object.assign({ skip: Number(marker), maxCount: options.maxPageSize }, options)));
                marker = listResponse.continuationToken;
                yield yield tslib_1.__await(listResponse);
            } while (marker);
        });
    }
    listTopicsAll() {
        return tslib_1.__asyncGenerator(this, arguments, function* listTopicsAll_1(options = {}) {
            var _a, e_3, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listTopicsPage(marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment)));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    }
    /**
     * Returns an async iterable iterator to list all the topics.
     *
     * .byPage() returns an async iterable iterator to list the topics in pages.
     *
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listTopics(options) {
        log_js_1.administrationLogger.verbose(`Performing management operation - listTopics() with options: %j`, options);
        const iter = this.listTopicsAll(options);
        return {
            /**
             */
            next() {
                return iter.next();
            },
            /**
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             */
            byPage: (settings = {}) => {
                this.throwIfInvalidContinuationToken(settings.continuationToken);
                return this.listTopicsPage(settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, options));
            },
        };
    }
    /**
     * Returns a list of objects, each representing a Topic's runtime info like subscription count.
     * @param options - The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getTopicsRuntimeProperties(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getTopicsRuntimeProperties", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getTopicsRuntimeProperties() with options: %j`, options);
            const response = await this.listResources("$Resources/Topics", updatedOptions, this.topicResourceSerializer);
            return this.buildListTopicsRuntimePropertiesResponse(response);
        });
    }
    listTopicsRuntimePropertiesPage(marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listTopicsRuntimePropertiesPage_1(marker, options = {}) {
            let listResponse;
            do {
                listResponse = yield tslib_1.__await(this.getTopicsRuntimeProperties(Object.assign({ skip: Number(marker), maxCount: options.maxPageSize }, options)));
                marker = listResponse.continuationToken;
                yield yield tslib_1.__await(listResponse);
            } while (marker);
        });
    }
    listTopicsRuntimePropertiesAll() {
        return tslib_1.__asyncGenerator(this, arguments, function* listTopicsRuntimePropertiesAll_1(options = {}) {
            var _a, e_4, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listTopicsRuntimePropertiesPage(marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment)));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_4) throw e_4.error; }
            }
        });
    }
    /**
     * Returns an async iterable iterator to list runtime info of the topics.
     *
     * .byPage() returns an async iterable iterator to list runtime info of the topics in pages.
     *
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listTopicsRuntimeProperties(options) {
        log_js_1.administrationLogger.verbose(`Performing management operation - listTopicsRuntimeProperties() with options: %j`, options);
        const iter = this.listTopicsRuntimePropertiesAll(options);
        return {
            /**
             * The next method, part of the iteration protocol
             */
            next() {
                return iter.next();
            },
            /**
             * The connection to the async iterator, part of the iteration protocol
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             * Return an AsyncIterableIterator that works a page at a time
             */
            byPage: (settings = {}) => {
                this.throwIfInvalidContinuationToken(settings.continuationToken);
                return this.listTopicsRuntimePropertiesPage(settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, options));
            },
        };
    }
    /**
     * Updates the topic based on the topic properties provided.
     * All topic properties must be set even though only a subset of them are actually updatable.
     * Therefore, the suggested flow is to use the output from `getTopic()`, update the desired properties in it, and then pass the modified object to `updateTopic()`.
     *
     * The properties that cannot be updated are marked as readonly in the `TopicProperties` interface.
     *
     * @param topic - Object representing the properties of the topic and the raw response.
     * `requiresDuplicateDetection`, `enablePartitioning`, and `name` can't be updated after creating the topic.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async updateTopic(topic, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.updateTopic", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - updateTopic() for "${topic.name}" with options: %j`, topic);
            if (!(0, utils_js_1.isJSONLikeObject)(topic) || topic == null) {
                throw new TypeError(`Parameter "topic" must be an object of type "TopicDescription" and cannot be undefined or null.`);
            }
            if (!topic.name) {
                throw new TypeError(`"name" attribute of the parameter "topic" cannot be undefined.`);
            }
            const response = await this.putResource(topic.name, (0, topicResourceSerializer_js_1.buildTopicOptions)(topic), this.topicResourceSerializer, true, updatedOptions);
            return this.buildTopicResponse(response);
        });
    }
    /**
     * Deletes a topic.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async deleteTopic(topicName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.deleteTopic", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - deleteTopic() for "${topicName}"`);
            const response = await this.deleteResource(topicName, this.topicResourceSerializer, updatedOptions);
            return { _response: (0, utils_js_1.getHttpResponseOnly)(response) };
        });
    }
    /**
     * Checks whether a given topic exists or not.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     */
    async topicExists(topicName, operationOptions) {
        log_js_1.administrationLogger.verbose(`Performing management operation - topicExists() for "${topicName}"`);
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ServiceBusAdministrationClient.topicExists", operationOptions);
        try {
            span.setStatus({ status: "success" });
            await this.getTopic(topicName, updatedOptions);
            return true;
        }
        catch (e) {
            span.setStatus({ status: "error", error: e });
            return false;
        }
        finally {
            span.end();
        }
    }
    /**
     * Creates a subscription with given name, configured using the given options
     * @param options - Options to configure the Subscription being created(For example, you can configure a Subscription to support partitions or sessions)
     * and the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityAlreadyExistsError` when requested messaging entity already exists,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `QuotaExceededError` when requested operation fails due to quote limits exceeding from service side,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async createSubscription(topicName, subscriptionName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.createSubscription", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - createSubscription() for "${subscriptionName}" with options: %j`, options);
            const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
            const response = await this.putResource(fullPath, (0, subscriptionResourceSerializer_js_1.buildSubscriptionOptions)(options || {}), this.subscriptionResourceSerializer, false, updatedOptions);
            return this.buildSubscriptionResponse(response);
        });
    }
    /**
     * Returns an object representing the Subscription and its properties.
     * If you want to get the Subscription runtime info like message count details, use `getSubscriptionRuntimeProperties` API.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getSubscription(topicName, subscriptionName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getSubscription", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getSubscription() for "${subscriptionName}"`);
            const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
            const response = await this.getResource(fullPath, this.subscriptionResourceSerializer, updatedOptions);
            return this.buildSubscriptionResponse(response);
        });
    }
    /**
     * Returns an object representing the Subscription runtime info like message count details.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getSubscriptionRuntimeProperties(topicName, subscriptionName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getSubscriptionRuntimeProperties", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getSubscriptionRuntimeProperties() for "${subscriptionName}"`);
            const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
            const response = await this.getResource(fullPath, this.subscriptionResourceSerializer, updatedOptions);
            return this.buildSubscriptionRuntimePropertiesResponse(response);
        });
    }
    /**
     * Returns a list of objects, each representing a Subscription along with its properties.
     * If you want to get the runtime info of the subscriptions like message count, use `getSubscriptionsRuntimeProperties` API instead.
     * @param options - The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getSubscriptions(topicName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getSubscriptions", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getSubscriptions() with options: %j`, options);
            const response = await this.listResources(topicName + "/Subscriptions/", updatedOptions, this.subscriptionResourceSerializer);
            return this.buildListSubscriptionsResponse(response);
        });
    }
    listSubscriptionsPage(topicName_1, marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listSubscriptionsPage_1(topicName, marker, options = {}) {
            let listResponse;
            do {
                listResponse = yield tslib_1.__await(this.getSubscriptions(topicName, Object.assign({ skip: Number(marker), maxCount: options.maxPageSize }, options)));
                marker = listResponse.continuationToken;
                yield yield tslib_1.__await(listResponse);
            } while (marker);
        });
    }
    listSubscriptionsAll(topicName_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listSubscriptionsAll_1(topicName, options = {}) {
            var _a, e_5, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listSubscriptionsPage(topicName, marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment)));
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_5) throw e_5.error; }
            }
        });
    }
    /**
     *
     * Returns an async iterable iterator to list all the subscriptions
     * under the specified topic.
     *
     * .byPage() returns an async iterable iterator to list the subscriptions in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listSubscriptions(topicName, options) {
        log_js_1.administrationLogger.verbose(`Performing management operation - listSubscriptions() with options: %j`, options);
        const iter = this.listSubscriptionsAll(topicName, options);
        return {
            /**
             */
            next() {
                return iter.next();
            },
            /**
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             */
            byPage: (settings = {}) => {
                this.throwIfInvalidContinuationToken(settings.continuationToken);
                return this.listSubscriptionsPage(topicName, settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, options));
            },
        };
    }
    /**
     * Returns a list of objects, each representing a Subscription's runtime info like message count details.
     * @param options - The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getSubscriptionsRuntimeProperties(topicName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getSubscriptionsRuntimeProperties", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getSubscriptionsRuntimeProperties() with options: %j`, options);
            const response = await this.listResources(topicName + "/Subscriptions/", updatedOptions, this.subscriptionResourceSerializer);
            return this.buildListSubscriptionsRuntimePropertiesResponse(response);
        });
    }
    listSubscriptionsRuntimePropertiesPage(topicName_1, marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listSubscriptionsRuntimePropertiesPage_1(topicName, marker, options = {}) {
            let listResponse;
            do {
                listResponse = yield tslib_1.__await(this.getSubscriptionsRuntimeProperties(topicName, Object.assign({ skip: Number(marker), maxCount: options.maxPageSize }, options)));
                marker = listResponse.continuationToken;
                yield yield tslib_1.__await(listResponse);
            } while (marker);
        });
    }
    listSubscriptionsRuntimePropertiesAll(topicName_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listSubscriptionsRuntimePropertiesAll_1(topicName, options = {}) {
            var _a, e_6, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listSubscriptionsRuntimePropertiesPage(topicName, marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment)));
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_6) throw e_6.error; }
            }
        });
    }
    /**
     * Returns an async iterable iterator to list runtime info of the subscriptions
     * under the specified topic.
     *
     * .byPage() returns an async iterable iterator to list runtime info of subscriptions in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listSubscriptionsRuntimeProperties(topicName, options) {
        log_js_1.administrationLogger.verbose(`Performing management operation - listSubscriptionsRuntimeProperties() with options: %j`, options);
        const iter = this.listSubscriptionsRuntimePropertiesAll(topicName, options);
        return {
            /**
             */
            next() {
                return iter.next();
            },
            /**
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             */
            byPage: (settings = {}) => {
                this.throwIfInvalidContinuationToken(settings.continuationToken);
                return this.listSubscriptionsRuntimePropertiesPage(topicName, settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, options));
            },
        };
    }
    /**
     * Updates the subscription based on the subscription properties provided.
     * All subscription properties must be set even though only a subset of them are actually updatable.
     * Therefore, the suggested flow is to use the output from `getSubscription()`, update the desired properties in it, and then pass the modified object to `updateSubscription()`.
     *
     * The properties that cannot be updated are marked as readonly in the `SubscriptionProperties` interface.
     * @param subscription - Object representing the properties of the subscription and the raw response.
     * `subscriptionName`, `topicName`, and `requiresSession` can't be updated after creating the subscription.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async updateSubscription(subscription, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.updateSubscription", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - updateSubscription() for "${subscription.subscriptionName}" with options: %j`, subscription);
            if (!(0, utils_js_1.isJSONLikeObject)(subscription) || subscription == null) {
                throw new TypeError(`Parameter "subscription" must be an object of type "SubscriptionDescription" and cannot be undefined or null.`);
            }
            if (!subscription.topicName || !subscription.subscriptionName) {
                throw new TypeError(`The attributes "topicName" and "subscriptionName" of the parameter "subscription" cannot be undefined.`);
            }
            const fullPath = this.getSubscriptionPath(subscription.topicName, subscription.subscriptionName);
            const response = await this.putResource(fullPath, (0, subscriptionResourceSerializer_js_1.buildSubscriptionOptions)(subscription), this.subscriptionResourceSerializer, true, updatedOptions);
            return this.buildSubscriptionResponse(response);
        });
    }
    /**
     * Deletes a subscription.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async deleteSubscription(topicName, subscriptionName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.deleteSubscription", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - deleteSubscription() for "${subscriptionName}"`);
            const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
            const response = await this.deleteResource(fullPath, this.subscriptionResourceSerializer, updatedOptions);
            return { _response: (0, utils_js_1.getHttpResponseOnly)(response) };
        });
    }
    /**
     * Checks whether a given subscription exists in the topic or not.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     */
    async subscriptionExists(topicName, subscriptionName, operationOptions = {}) {
        log_js_1.administrationLogger.verbose(`Performing management operation - subscriptionExists() for "${topicName}" and "${subscriptionName}"`);
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ServiceBusAdministrationClient.subscriptionExists", operationOptions);
        try {
            span.setStatus({ status: "success" });
            await this.getSubscription(topicName, subscriptionName, updatedOptions);
            return true;
        }
        catch (e) {
            span.setStatus({ status: "error", error: e });
            return false;
        }
        finally {
            span.end();
        }
    }
    async createRule(topicName, subscriptionName, ruleName, ruleFilter, ruleActionOrOperationOptions, operationOptions) {
        let ruleAction = undefined;
        let operOptions;
        if (ruleActionOrOperationOptions) {
            if ((0, ruleResourceSerializer_js_1.isSqlRuleAction)(ruleActionOrOperationOptions)) {
                // Overload#2 - where the sqlExpression in the ruleAction is defined
                ruleAction = ruleActionOrOperationOptions;
                operOptions = operationOptions;
            }
            else {
                // Overload#1
                // Overload#2 - where the sqlExpression in the ruleAction is undefined
                operOptions = Object.assign(Object.assign({}, ruleActionOrOperationOptions), operationOptions);
            }
        }
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.createRule", operOptions !== null && operOptions !== void 0 ? operOptions : {}, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - createRule() for "${ruleName}" with filter: "%j"`, ruleFilter);
            const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
            const response = await this.putResource(fullPath, { name: ruleName, filter: ruleFilter, action: ruleAction }, this.ruleResourceSerializer, false, updatedOptions);
            return this.buildRuleResponse(response);
        });
    }
    /**
     * Returns an object representing the Rule with the given name along with all its properties.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getRule(topicName, subscriptionName, ruleName, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getRule", operationOptions, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getRule() for "${ruleName}"`);
            const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
            const response = await this.getResource(fullPath, this.ruleResourceSerializer, updatedOptions);
            return this.buildRuleResponse(response);
        });
    }
    /**
     * Lists existing rules.
     * @param options - The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async getRules(topicName, subscriptionName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getRules", options, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - getRules() with options: %j`, options);
            const fullPath = this.getSubscriptionPath(topicName, subscriptionName) + "/Rules/";
            const response = await this.listResources(fullPath, updatedOptions, this.ruleResourceSerializer);
            return this.buildListRulesResponse(response);
        });
    }
    listRulesPage(topicName_1, subscriptionName_1, marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listRulesPage_1(topicName, subscriptionName, marker, options = {}) {
            let listResponse;
            do {
                listResponse = yield tslib_1.__await(this.getRules(topicName, subscriptionName, Object.assign({ skip: Number(marker), maxCount: options.maxPageSize }, options)));
                marker = listResponse.continuationToken;
                yield yield tslib_1.__await(listResponse);
            } while (marker);
        });
    }
    listRulesAll(topicName_1, subscriptionName_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listRulesAll_1(topicName, subscriptionName, options = {}) {
            var _a, e_7, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listRulesPage(topicName, subscriptionName, marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment)));
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_7) throw e_7.error; }
            }
        });
    }
    /**
     * Returns an async iterable iterator to list all the rules
     * under the specified subscription.
     *
     * .byPage() returns an async iterable iterator to list the rules in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listRules(topicName, subscriptionName, options) {
        log_js_1.administrationLogger.verbose(`Performing management operation - listRules() with options: %j`, options);
        const iter = this.listRulesAll(topicName, subscriptionName, options);
        return {
            /**
             */
            next() {
                return iter.next();
            },
            /**
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             */
            byPage: (settings = {}) => {
                this.throwIfInvalidContinuationToken(settings.continuationToken);
                return this.listRulesPage(topicName, subscriptionName, settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, options));
            },
        };
    }
    /**
     * Updates properties on the Rule by the given name based on the given options.
     * All rule properties must be set even if one of them is being updated.
     * Therefore, the suggested flow is to use the output from `getRule()`, update the desired properties in it, and then pass the modified object to `updateRule()`.
     *
     * @param rule - Options to configure the Rule being updated and the raw response.
     * For example, you can configure the filter to apply on associated Topic/Subscription.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async updateRule(topicName, subscriptionName, rule, operationOptions) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.updateRule", operationOptions !== null && operationOptions !== void 0 ? operationOptions : {}, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - updateRule() for "${rule.name}" with options: %j`, rule);
            if (!(0, utils_js_1.isJSONLikeObject)(rule) || rule === null) {
                throw new TypeError(`Parameter "rule" must be an object of type "RuleDescription" and cannot be undefined or null.`);
            }
            if (!rule.name) {
                throw new TypeError(`"name" attribute of the parameter "rule" cannot be undefined.`);
            }
            const fullPath = this.getRulePath(topicName, subscriptionName, rule.name);
            const response = await this.putResource(fullPath, rule, this.ruleResourceSerializer, true, updatedOptions);
            return this.buildRuleResponse(response);
        });
    }
    /**
     * Deletes a rule.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     * Following are errors that can be expected from this operation
     * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
     * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
     * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
     * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
     * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
     * bad requests or requests resulting in conflicting operation on the server,
     * @throws `RestError` with code and statusCode representing the standard set of REST API errors.
     */
    async deleteRule(topicName, subscriptionName, ruleName, operationOptions) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.deleteRule", operationOptions !== null && operationOptions !== void 0 ? operationOptions : {}, async (updatedOptions) => {
            log_js_1.administrationLogger.verbose(`Performing management operation - deleteRule() for "${ruleName}"`);
            const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
            const response = await this.deleteResource(fullPath, this.ruleResourceSerializer, updatedOptions);
            return { _response: (0, utils_js_1.getHttpResponseOnly)(response) };
        });
    }
    /**
     * Checks whether a given rule exists or not.
     *
     */
    async ruleExists(topicName, subscriptionName, ruleName, operationOptions = {}) {
        log_js_1.administrationLogger.verbose(`Performing management operation - ruleExists() for "${ruleName}"`);
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ServiceBusAdministrationClient.ruleExists", operationOptions);
        try {
            span.setStatus({ status: "success" });
            await this.getRule(topicName, subscriptionName, ruleName, updatedOptions);
            return true;
        }
        catch (e) {
            span.setStatus({ status: "error", error: e });
            return false;
        }
        finally {
            span.end();
        }
    }
    /**
     * Creates or updates a resource based on `isUpdate` parameter.
     */
    async putResource(name, entityFields, serializer, isUpdate = false, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.putResource", operationOptions, async (updatedOptions) => {
            const request = (0, core_rest_pipeline_1.createPipelineRequest)({
                url: this.getUrl(name),
                method: "PUT",
                allowInsecureConnection: !this.useTls,
            });
            if (isUpdate) {
                request.headers.set("If-Match", "*");
            }
            const queueOrSubscriptionFields = entityFields;
            if (queueOrSubscriptionFields.ForwardTo ||
                queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo) {
                const token = this.credentials instanceof sasServiceClientCredentials_js_1.SasServiceClientCredentials
                    ? (await this.credentials.getToken(this.endpoint)).token
                    : (await this.credentials.getToken([core_amqp_1.Constants.aadServiceBusScope])).token;
                if (queueOrSubscriptionFields.ForwardTo) {
                    request.headers.set("ServiceBusSupplementaryAuthorization", token);
                    if (!(0, utils_js_1.isAbsoluteUrl)(queueOrSubscriptionFields.ForwardTo)) {
                        queueOrSubscriptionFields.ForwardTo = this.endpointWithProtocol.concat(queueOrSubscriptionFields.ForwardTo);
                    }
                }
                if (queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo) {
                    request.headers.set("ServiceBusDlqSupplementaryAuthorization", token);
                    if (!(0, utils_js_1.isAbsoluteUrl)(queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo)) {
                        queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo =
                            this.endpointWithProtocol.concat(queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo);
                    }
                }
            }
            request.headers.set("content-type", "application/atom+xml;type=entry;charset=utf-8");
            return (0, atomXmlHelper_js_1.executeAtomXmlOperation)(this, request, serializer, updatedOptions, entityFields);
        });
    }
    /**
     * Gets a resource.
     */
    async getResource(name, serializer, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.getResource", operationOptions, async (updatedOptions) => {
            const request = (0, core_rest_pipeline_1.createPipelineRequest)({
                url: this.getUrl(name),
                method: "GET",
                allowInsecureConnection: !this.useTls,
            });
            const response = await (0, atomXmlHelper_js_1.executeAtomXmlOperation)(this, request, serializer, updatedOptions);
            if (!(0, core_util_1.isDefined)(response.parsedBody) ||
                (Array.isArray(response.parsedBody) && response.parsedBody.length === 0)) {
                const err = new core_rest_pipeline_1.RestError(`The messaging entity "${name}" being requested cannot be found.`, {
                    code: "MessageEntityNotFoundError",
                    statusCode: response.status,
                    request,
                    response,
                });
                throw err;
            }
            return response;
        });
    }
    /**
     * Lists existing resources
     */
    async listResources(name, options = {}, serializer) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.listResources", options, async (updatedOptions) => {
            const queryParams = {};
            if (options) {
                if (options.skip) {
                    queryParams["$skip"] = options.skip.toString();
                }
                if (options.maxCount) {
                    queryParams["$top"] = options.maxCount.toString();
                }
            }
            const request = (0, core_rest_pipeline_1.createPipelineRequest)({
                url: this.getUrl(name, queryParams),
                method: "GET",
                allowInsecureConnection: !this.useTls,
            });
            return (0, atomXmlHelper_js_1.executeAtomXmlOperation)(this, request, serializer, updatedOptions);
        });
    }
    /**
     * Deletes a resource.
     */
    async deleteResource(name, serializer, operationOptions = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusAdministrationClient.deleteResource", operationOptions, async (updatedOptions) => {
            const request = (0, core_rest_pipeline_1.createPipelineRequest)({
                url: this.getUrl(name),
                method: "DELETE",
                allowInsecureConnection: !this.useTls,
            });
            return (0, atomXmlHelper_js_1.executeAtomXmlOperation)(this, request, serializer, updatedOptions);
        });
    }
    getUrl(path, queryParams) {
        const baseUri = `${this.useTls ? "https" : "http"}://${this.endpoint}/${path}`;
        const requestUrl = new URL(baseUri);
        requestUrl.searchParams.set(Constants.API_VERSION_QUERY_KEY, this.serviceVersion);
        if (queryParams) {
            for (const key of Object.keys(queryParams)) {
                requestUrl.searchParams.set(key, queryParams[key]);
            }
        }
        return requestUrl.toString();
    }
    getSubscriptionPath(topicName, subscriptionName) {
        return topicName + "/Subscriptions/" + subscriptionName;
    }
    getRulePath(topicName, subscriptionName, ruleName) {
        return topicName + "/Subscriptions/" + subscriptionName + "/Rules/" + ruleName;
    }
    getMarkerFromNextLinkUrl(url) {
        if (!url) {
            return undefined;
        }
        try {
            const value = (0, parseUrl_js_1.parseURL)(url).searchParams.get(Constants.XML_METADATA_MARKER + "skip");
            return value !== null ? value : undefined;
        }
        catch (error) {
            throw new Error(`Unable to parse the '${Constants.XML_METADATA_MARKER}skip' from the next-link in the response ` +
                error);
        }
    }
    buildNamespacePropertiesResponse(response) {
        try {
            const namespace = (0, namespaceResourceSerializer_js_1.buildNamespace)(response.parsedBody);
            const namespaceResponse = Object.defineProperty(namespace || {}, "_response", { value: (0, utils_js_1.getHttpResponseOnly)(response) });
            return namespaceResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a namespace object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildListQueuesResponse(response) {
        try {
            const queues = [];
            const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
            if (!Array.isArray(response.parsedBody)) {
                throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
            }
            const rawQueueArray = response.parsedBody;
            for (let i = 0; i < rawQueueArray.length; i++) {
                const queue = (0, queueResourceSerializer_js_1.buildQueue)(rawQueueArray[i]);
                if (queue) {
                    queues.push(queue);
                }
            }
            const listQueuesResponse = Object.defineProperty(queues, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            listQueuesResponse.continuationToken = nextMarker;
            return listQueuesResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a list of queues using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildListQueuesRuntimePropertiesResponse(response) {
        try {
            const queues = [];
            const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
            if (!Array.isArray(response.parsedBody)) {
                throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
            }
            const rawQueueArray = response.parsedBody;
            for (let i = 0; i < rawQueueArray.length; i++) {
                const queue = (0, queueResourceSerializer_js_1.buildQueueRuntimeProperties)(rawQueueArray[i]);
                if (queue) {
                    queues.push(queue);
                }
            }
            const listQueuesResponse = Object.defineProperty(queues, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            listQueuesResponse.continuationToken = nextMarker;
            return listQueuesResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a list of queues using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildQueueResponse(response) {
        try {
            const queue = (0, queueResourceSerializer_js_1.buildQueue)(response.parsedBody);
            const queueResponse = Object.defineProperty(queue || {}, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            return queueResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a queue object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildQueueRuntimePropertiesResponse(response) {
        try {
            const queue = (0, queueResourceSerializer_js_1.buildQueueRuntimeProperties)(response.parsedBody);
            const queueResponse = Object.defineProperty(queue || {}, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            return queueResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a queue object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildListTopicsResponse(response) {
        try {
            const topics = [];
            const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
            if (!Array.isArray(response.parsedBody)) {
                throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
            }
            const rawTopicArray = response.parsedBody;
            for (let i = 0; i < rawTopicArray.length; i++) {
                const topic = (0, topicResourceSerializer_js_1.buildTopic)(rawTopicArray[i]);
                if (topic) {
                    topics.push(topic);
                }
            }
            const listTopicsResponse = Object.defineProperty(topics, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            listTopicsResponse.continuationToken = nextMarker;
            return listTopicsResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a list of topics using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildListTopicsRuntimePropertiesResponse(response) {
        try {
            const topics = [];
            const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
            if (!Array.isArray(response.parsedBody)) {
                throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
            }
            const rawTopicArray = response.parsedBody;
            for (let i = 0; i < rawTopicArray.length; i++) {
                const topic = (0, topicResourceSerializer_js_1.buildTopicRuntimeProperties)(rawTopicArray[i]);
                if (topic) {
                    topics.push(topic);
                }
            }
            const listTopicsResponse = Object.defineProperty(topics, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            listTopicsResponse.continuationToken = nextMarker;
            return listTopicsResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a list of topics using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildTopicResponse(response) {
        try {
            const topic = (0, topicResourceSerializer_js_1.buildTopic)(response.parsedBody);
            const topicResponse = Object.defineProperty(topic || {}, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            return topicResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a topic object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildTopicRuntimePropertiesResponse(response) {
        try {
            const topic = (0, topicResourceSerializer_js_1.buildTopicRuntimeProperties)(response.parsedBody);
            const topicResponse = Object.defineProperty(topic || {}, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            return topicResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a topic object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildListSubscriptionsResponse(response) {
        try {
            const subscriptions = [];
            const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
            if (!Array.isArray(response.parsedBody)) {
                throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
            }
            const rawSubscriptionArray = response.parsedBody;
            for (let i = 0; i < rawSubscriptionArray.length; i++) {
                const subscription = (0, subscriptionResourceSerializer_js_1.buildSubscription)(rawSubscriptionArray[i]);
                if (subscription) {
                    subscriptions.push(subscription);
                }
            }
            const listSubscriptionsResponse = Object.defineProperty(subscriptions, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            listSubscriptionsResponse.continuationToken = nextMarker;
            return listSubscriptionsResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a list of subscriptions using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildListSubscriptionsRuntimePropertiesResponse(response) {
        try {
            const subscriptions = [];
            const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
            if (!Array.isArray(response.parsedBody)) {
                throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
            }
            const rawSubscriptionArray = response.parsedBody;
            for (let i = 0; i < rawSubscriptionArray.length; i++) {
                const subscription = (0, subscriptionResourceSerializer_js_1.buildSubscriptionRuntimeProperties)(rawSubscriptionArray[i]);
                if (subscription) {
                    subscriptions.push(subscription);
                }
            }
            const listSubscriptionsResponse = Object.defineProperty(subscriptions, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            listSubscriptionsResponse.continuationToken = nextMarker;
            return listSubscriptionsResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a list of subscriptions using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildSubscriptionResponse(response) {
        try {
            const subscription = (0, subscriptionResourceSerializer_js_1.buildSubscription)(response.parsedBody);
            const subscriptionResponse = Object.defineProperty(subscription || {}, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            return subscriptionResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a subscription object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildSubscriptionRuntimePropertiesResponse(response) {
        try {
            const subscription = (0, subscriptionResourceSerializer_js_1.buildSubscriptionRuntimeProperties)(response.parsedBody);
            const subscriptionResponse = Object.defineProperty(subscription || {}, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            return subscriptionResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a subscription object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildListRulesResponse(response) {
        try {
            const rules = [];
            const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
            if (!Array.isArray(response.parsedBody)) {
                throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
            }
            const rawRuleArray = response.parsedBody;
            for (let i = 0; i < rawRuleArray.length; i++) {
                const rule = (0, ruleResourceSerializer_js_1.buildRule)(rawRuleArray[i]);
                if (rule) {
                    rules.push(rule);
                }
            }
            const listRulesResponse = Object.defineProperty(rules, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            listRulesResponse.continuationToken = nextMarker;
            return listRulesResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a list of rules using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    buildRuleResponse(response) {
        try {
            const rule = (0, ruleResourceSerializer_js_1.buildRule)(response.parsedBody);
            const ruleResponse = Object.defineProperty(rule || {}, "_response", {
                value: (0, utils_js_1.getHttpResponseOnly)(response),
            });
            return ruleResponse;
        }
        catch (err) {
            log_js_1.administrationLogger.logError(err, "Failure parsing response from service");
            throw new core_rest_pipeline_1.RestError(`Error occurred while parsing the response body - cannot form a rule object using the response from the service.`, {
                code: core_rest_pipeline_1.RestError.PARSE_ERROR,
                statusCode: response.status,
                request: response.request,
                response,
            });
        }
    }
    throwIfInvalidContinuationToken(token) {
        if (!(token === undefined || (typeof token === "string" && Number(token) >= 0))) {
            throw new Error(`Invalid continuationToken ${token} provided`);
        }
    }
}
exports.ServiceBusAdministrationClient = ServiceBusAdministrationClient;
//# sourceMappingURL=serviceBusAtomManagementClient.js.map