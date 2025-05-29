import type { TokenCredential, NamedKeyCredential } from "@azure/core-auth";
import type { OperationOptions, CommonClientOptions } from "@azure/core-client";
import { ServiceClient } from "@azure/core-client";
import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import type { CorrelationRuleFilter } from "./core/managementClient.js";
import type { NamespaceProperties } from "./serializers/namespaceResourceSerializer.js";
import type { CreateQueueOptions, QueueProperties, QueueRuntimeProperties } from "./serializers/queueResourceSerializer.js";
import type { RuleProperties, SqlRuleAction, SqlRuleFilter } from "./serializers/ruleResourceSerializer.js";
import type { CreateSubscriptionOptions, SubscriptionProperties, SubscriptionRuntimeProperties } from "./serializers/subscriptionResourceSerializer.js";
import type { CreateTopicOptions, TopicProperties, TopicRuntimeProperties } from "./serializers/topicResourceSerializer.js";
import type { HttpResponse } from "./util/compat/index.js";
/**
 * Request options for list<entity-type>() operations
 */
export interface ListRequestOptions {
    /**
     * Count of entities to fetch.
     */
    maxCount?: number;
    /**
     * Count of entities to skip from being fetched.
     */
    skip?: number;
}
/**
 * Represents the returned response of the operation along with the raw response.
 */
export type WithResponse<T extends object> = T & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse;
};
/**
 * Represents the client options of the `ServiceBusAdministrationClient`.
 */
export interface ServiceBusAdministrationClientOptions extends CommonClientOptions {
    /**
     * Service version of the ATOM API.
     *
     * Currently supported = "2021-05" | "2017-04"
     *
     * Defaults to "2021-05".
     */
    serviceVersion?: "2021-05" | "2017-04";
}
/**
 * Represents the result of list operation on entities which also contains the `continuationToken` to start iterating over from.
 */
export type EntitiesResponse<T extends object> = WithResponse<Array<T>> & Pick<PageSettings, "continuationToken">;
/**
 * All operations return promises that resolve to an object that has the relevant output.
 * These objects also have a property called `_response` that you can use if you want to
 * access the direct response from the service.
 */
export declare class ServiceBusAdministrationClient extends ServiceClient {
    /**
     * Reference to the endpoint as extracted from input connection string.
     */
    private endpoint;
    /**
     * Reference to the endpoint with protocol prefix as extracted from input connection string.
     */
    private endpointWithProtocol;
    private serviceVersion;
    private useTls;
    /**
     * Singleton instances of serializers used across the various operations.
     */
    private namespaceResourceSerializer;
    private queueResourceSerializer;
    private topicResourceSerializer;
    private subscriptionResourceSerializer;
    private ruleResourceSerializer;
    /**
     * Credentials used to generate tokens as required for the various operations.
     */
    private credentials;
    /**
     * Initializes a new instance of the ServiceBusAdministrationClient class.
     * @param connectionString - The connection string needed for the client to connect to Azure.
     * @param options - PipelineOptions
     */
    constructor(connectionString: string, options?: ServiceBusAdministrationClientOptions);
    /**
     *
     * @param fullyQualifiedNamespace - The fully qualified namespace of your Service Bus instance which is
     * likely to be similar to <yournamespace>.servicebus.windows.net.
     * @param credential - A credential object used by the client to get the token to authenticate the connection
     * with the Azure Service Bus. See &commat;azure/identity for creating the credentials.
     * If you're using your own implementation of the `TokenCredential` interface against AAD, then set the "scopes" for service-bus
     * to be `["https://servicebus.azure.net//user_impersonation"]` to get the appropriate token.
     * Use the `AzureNamedKeyCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessKeyName`
     * and `SharedAccessKey` without using a connection string. These fields map to the `name` and `key` field respectively
     * in `AzureNamedKeyCredential`.
     * @param options - PipelineOptions
     */
    constructor(fullyQualifiedNamespace: string, credential: TokenCredential | NamedKeyCredential, options?: ServiceBusAdministrationClientOptions);
    /**
     * Returns an object representing the metadata related to a service bus namespace.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     *
     */
    getNamespaceProperties(operationOptions?: OperationOptions): Promise<WithResponse<NamespaceProperties>>;
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
    createQueue(queueName: string, options?: CreateQueueOptions): Promise<WithResponse<QueueProperties>>;
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
    getQueue(queueName: string, operationOptions?: OperationOptions): Promise<WithResponse<QueueProperties>>;
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
    getQueueRuntimeProperties(queueName: string, operationOptions?: OperationOptions): Promise<WithResponse<QueueRuntimeProperties>>;
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
    private getQueues;
    private listQueuesPage;
    private listQueuesAll;
    /**
     * Returns an async iterable iterator to list all the queues.
     *
     * .byPage() returns an async iterable iterator to list the queues in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listQueues(options?: OperationOptions): PagedAsyncIterableIterator<QueueProperties, EntitiesResponse<QueueProperties>>;
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
    private getQueuesRuntimeProperties;
    private listQueuesRuntimePropertiesPage;
    private listQueuesRuntimePropertiesAll;
    /**
     * Returns an async iterable iterator to list runtime info of the queues.
     *
     * .byPage() returns an async iterable iterator to list runtime info of the queues in pages.
     *
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listQueuesRuntimeProperties(options?: OperationOptions): PagedAsyncIterableIterator<QueueRuntimeProperties, EntitiesResponse<QueueRuntimeProperties>>;
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
    updateQueue(queue: WithResponse<QueueProperties>, operationOptions?: OperationOptions): Promise<WithResponse<QueueProperties>>;
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
    deleteQueue(queueName: string, operationOptions?: OperationOptions): Promise<WithResponse<{}>>;
    /**
     * Checks whether a given queue exists or not.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     */
    queueExists(queueName: string, operationOptions?: OperationOptions): Promise<boolean>;
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
    createTopic(topicName: string, options?: CreateTopicOptions): Promise<WithResponse<TopicProperties>>;
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
    getTopic(topicName: string, operationOptions?: OperationOptions): Promise<WithResponse<TopicProperties>>;
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
    getTopicRuntimeProperties(topicName: string, operationOptions?: OperationOptions): Promise<WithResponse<TopicRuntimeProperties>>;
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
    private getTopics;
    private listTopicsPage;
    private listTopicsAll;
    /**
     * Returns an async iterable iterator to list all the topics.
     *
     * .byPage() returns an async iterable iterator to list the topics in pages.
     *
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listTopics(options?: OperationOptions): PagedAsyncIterableIterator<TopicProperties, EntitiesResponse<TopicProperties>>;
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
    private getTopicsRuntimeProperties;
    private listTopicsRuntimePropertiesPage;
    private listTopicsRuntimePropertiesAll;
    /**
     * Returns an async iterable iterator to list runtime info of the topics.
     *
     * .byPage() returns an async iterable iterator to list runtime info of the topics in pages.
     *
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listTopicsRuntimeProperties(options?: OperationOptions): PagedAsyncIterableIterator<TopicRuntimeProperties, EntitiesResponse<TopicRuntimeProperties>>;
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
    updateTopic(topic: WithResponse<TopicProperties>, operationOptions?: OperationOptions): Promise<WithResponse<TopicProperties>>;
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
    deleteTopic(topicName: string, operationOptions?: OperationOptions): Promise<WithResponse<{}>>;
    /**
     * Checks whether a given topic exists or not.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     */
    topicExists(topicName: string, operationOptions?: OperationOptions): Promise<boolean>;
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
    createSubscription(topicName: string, subscriptionName: string, options?: CreateSubscriptionOptions): Promise<WithResponse<SubscriptionProperties>>;
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
    getSubscription(topicName: string, subscriptionName: string, operationOptions?: OperationOptions): Promise<WithResponse<SubscriptionProperties>>;
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
    getSubscriptionRuntimeProperties(topicName: string, subscriptionName: string, operationOptions?: OperationOptions): Promise<WithResponse<SubscriptionRuntimeProperties>>;
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
    private getSubscriptions;
    private listSubscriptionsPage;
    private listSubscriptionsAll;
    /**
     *
     * Returns an async iterable iterator to list all the subscriptions
     * under the specified topic.
     *
     * .byPage() returns an async iterable iterator to list the subscriptions in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listSubscriptions(topicName: string, options?: OperationOptions): PagedAsyncIterableIterator<SubscriptionProperties, EntitiesResponse<SubscriptionProperties>>;
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
    private getSubscriptionsRuntimeProperties;
    private listSubscriptionsRuntimePropertiesPage;
    private listSubscriptionsRuntimePropertiesAll;
    /**
     * Returns an async iterable iterator to list runtime info of the subscriptions
     * under the specified topic.
     *
     * .byPage() returns an async iterable iterator to list runtime info of subscriptions in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listSubscriptionsRuntimeProperties(topicName: string, options?: OperationOptions): PagedAsyncIterableIterator<SubscriptionRuntimeProperties, EntitiesResponse<SubscriptionRuntimeProperties>>;
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
    updateSubscription(subscription: WithResponse<SubscriptionProperties>, operationOptions?: OperationOptions): Promise<WithResponse<SubscriptionProperties>>;
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
    deleteSubscription(topicName: string, subscriptionName: string, operationOptions?: OperationOptions): Promise<WithResponse<{}>>;
    /**
     * Checks whether a given subscription exists in the topic or not.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
     */
    subscriptionExists(topicName: string, subscriptionName: string, operationOptions?: OperationOptions): Promise<boolean>;
    /**
     * Creates a rule with given name, configured using the given options.
     * @param ruleFilter - Defines the filter expression that the rule evaluates.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
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
    createRule(topicName: string, subscriptionName: string, ruleName: string, ruleFilter: SqlRuleFilter | CorrelationRuleFilter, operationOptions?: OperationOptions): Promise<WithResponse<RuleProperties>>;
    /**
     * Creates a rule with given name, configured using the given options.
     * @param ruleFilter - Defines the filter expression that the rule evaluates.
     * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
     * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
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
    createRule(topicName: string, subscriptionName: string, ruleName: string, ruleFilter: SqlRuleFilter | CorrelationRuleFilter, ruleAction: SqlRuleAction, operationOptions?: OperationOptions): Promise<WithResponse<RuleProperties>>;
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
    getRule(topicName: string, subscriptionName: string, ruleName: string, operationOptions?: OperationOptions): Promise<WithResponse<RuleProperties>>;
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
    private getRules;
    private listRulesPage;
    private listRulesAll;
    /**
     * Returns an async iterable iterator to list all the rules
     * under the specified subscription.
     *
     * .byPage() returns an async iterable iterator to list the rules in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listRules(topicName: string, subscriptionName: string, options?: OperationOptions): PagedAsyncIterableIterator<RuleProperties, EntitiesResponse<RuleProperties>>;
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
    updateRule(topicName: string, subscriptionName: string, rule: WithResponse<RuleProperties>, operationOptions?: OperationOptions): Promise<WithResponse<RuleProperties>>;
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
    deleteRule(topicName: string, subscriptionName: string, ruleName: string, operationOptions?: OperationOptions): Promise<WithResponse<{}>>;
    /**
     * Checks whether a given rule exists or not.
     *
     */
    ruleExists(topicName: string, subscriptionName: string, ruleName: string, operationOptions?: OperationOptions): Promise<boolean>;
    /**
     * Creates or updates a resource based on `isUpdate` parameter.
     */
    private putResource;
    /**
     * Gets a resource.
     */
    private getResource;
    /**
     * Lists existing resources
     */
    private listResources;
    /**
     * Deletes a resource.
     */
    private deleteResource;
    private getUrl;
    private getSubscriptionPath;
    private getRulePath;
    private getMarkerFromNextLinkUrl;
    private buildNamespacePropertiesResponse;
    private buildListQueuesResponse;
    private buildListQueuesRuntimePropertiesResponse;
    private buildQueueResponse;
    private buildQueueRuntimePropertiesResponse;
    private buildListTopicsResponse;
    private buildListTopicsRuntimePropertiesResponse;
    private buildTopicResponse;
    private buildTopicRuntimePropertiesResponse;
    private buildListSubscriptionsResponse;
    private buildListSubscriptionsRuntimePropertiesResponse;
    private buildSubscriptionResponse;
    private buildSubscriptionRuntimePropertiesResponse;
    private buildListRulesResponse;
    private buildRuleResponse;
    private throwIfInvalidContinuationToken;
}
//# sourceMappingURL=serviceBusAtomManagementClient.d.ts.map