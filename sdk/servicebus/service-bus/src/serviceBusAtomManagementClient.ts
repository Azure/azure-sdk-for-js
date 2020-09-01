// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Constants as AMQPConstants,
  isTokenCredential,
  parseConnectionString,
  TokenCredential
} from "@azure/core-amqp";
import {
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  HttpOperationResponse,
  OperationOptions,
  RequestPolicyFactory,
  RestError,
  ServiceClient,
  signingPolicy,
  stripRequest,
  stripResponse,
  URLBuilder,
  WebResource,
  PipelineOptions
} from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { CorrelationRuleFilter } from "./core/managementClient";
import * as log from "./log";
import {
  buildNamespace,
  NamespaceProperties,
  NamespaceResourceSerializer
} from "./serializers/namespaceResourceSerializer";
import {
  buildQueue,
  buildQueueOptions,
  buildQueueRuntimeProperties,
  CreateQueueOptions,
  InternalQueueOptions,
  QueueProperties,
  QueueResourceSerializer,
  QueueRuntimeProperties
} from "./serializers/queueResourceSerializer";
import {
  buildRule,
  CreateRuleOptions,
  isSqlRuleAction,
  RuleProperties,
  RuleResourceSerializer,
  SqlRuleAction,
  SqlRuleFilter
} from "./serializers/ruleResourceSerializer";
import {
  buildSubscription,
  buildSubscriptionOptions,
  buildSubscriptionRuntimeProperties,
  CreateSubscriptionOptions,
  InternalSubscriptionOptions,
  SubscriptionProperties,
  SubscriptionResourceSerializer,
  SubscriptionRuntimeProperties
} from "./serializers/subscriptionResourceSerializer";
import {
  buildTopic,
  buildTopicOptions,
  buildTopicRuntimeProperties,
  CreateTopicOptions,
  InternalTopicOptions,
  TopicProperties,
  TopicResourceSerializer,
  TopicRuntimeProperties
} from "./serializers/topicResourceSerializer";
import { AtomXmlSerializer, executeAtomXmlOperation } from "./util/atomXmlHelper";
import * as Constants from "./util/constants";
import { parseURL } from "./util/parseUrl";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import { createSpan, getCanonicalCode } from "./util/tracing";
import { formatUserAgentPrefix, isAbsoluteUrl, isJSONLikeObject } from "./util/utils";

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
 * The underlying HTTP response.
 */
export interface Response {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents the result of list operation on entities which also contains the `continuationToken` to start iterating over from.
 */
export interface EntitiesResponse<T>
  extends Array<T>,
    Pick<PageSettings, "continuationToken">,
    Response {}

/**
 * Represents properties of the namespace.
 */
export interface NamespacePropertiesResponse extends NamespaceProperties, Response {}

/**
 * Represents result of create, get, and update operations on queue.
 */
export interface QueueResponse extends QueueProperties, Response {}

/**
 * Represents runtime info of a queue.
 */
export interface QueueRuntimePropertiesResponse extends QueueRuntimeProperties, Response {}

/**
 * Represents result of create, get, and update operations on topic.
 */
export interface TopicResponse extends TopicProperties, Response {}

/**
 * Represents runtime info of a topic.
 */
export interface TopicRuntimePropertiesResponse extends TopicRuntimeProperties, Response {}

/**
 * Represents result of create, get, and update operations on subscription.
 */
export interface SubscriptionResponse extends SubscriptionProperties, Response {}

/**
 * Represents runtime info of a subscription.
 */
export interface SubscriptionRuntimePropertiesResponse
  extends SubscriptionRuntimeProperties,
    Response {}

/**
 * Represents result of create, get, and update operations on rule.
 */
export interface RuleResponse extends RuleProperties, Response {}

/**
 * All operations return promises that resolve to an object that has the relevant output.
 * These objects also have a property called `_response` that you can use if you want to
 * access the direct response from the service.
 */
export class ServiceBusManagementClient extends ServiceClient {
  /**
   * Reference to the endpoint as extracted from input connection string.
   */
  private endpoint: string;

  /**
   * Reference to the endpoint with protocol prefix as extracted from input connection string.
   */
  private endpointWithProtocol: string;

  /**
   * Singleton instances of serializers used across the various operations.
   */
  private namespaceResourceSerializer: AtomXmlSerializer;
  private queueResourceSerializer: AtomXmlSerializer;
  private topicResourceSerializer: AtomXmlSerializer;
  private subscriptionResourceSerializer: AtomXmlSerializer;
  private ruleResourceSerializer: AtomXmlSerializer;

  /**
   * Credentials used to generate tokens as required for the various operations.
   */
  private credentials: SasServiceClientCredentials | TokenCredential;

  /**
   * Initializes a new instance of the ServiceBusManagementClient class.
   * @param connectionString The connection string needed for the client to connect to Azure.
   * @param options PipelineOptions
   */
  constructor(connectionString: string, options?: PipelineOptions);
  /**
   *
   * @param fullyQualifiedNamespace The fully qualified namespace of your Service Bus instance which is
   * likely to be similar to <yournamespace>.servicebus.windows.net.
   * @param credential A credential object used by the client to get the token to authenticate the connection
   * with the Azure Service Bus. See &commat;azure/identity for creating the credentials.
   * If you're using your own implementation of the `TokenCredential` interface against AAD, then set the "scopes" for service-bus
   * to be `["https://servicebus.azure.net//user_impersonation"]` to get the appropriate token.
   * @param options PipelineOptions
   */
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential,
    options?: PipelineOptions
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    credentialOrOptions2?: TokenCredential | PipelineOptions,
    options3?: PipelineOptions
  ) {
    let options: PipelineOptions;
    let fullyQualifiedNamespace: string;
    let credentials: SasServiceClientCredentials | TokenCredential;
    let authPolicy: RequestPolicyFactory;
    if (isTokenCredential(credentialOrOptions2)) {
      fullyQualifiedNamespace = fullyQualifiedNamespaceOrConnectionString1;
      options = options3 || {};
      credentials = credentialOrOptions2;
      authPolicy = bearerTokenAuthenticationPolicy(credentials, AMQPConstants.aadServiceBusScope);
    } else {
      const connectionString = fullyQualifiedNamespaceOrConnectionString1;
      options = credentialOrOptions2 || {};
      const connectionStringObj: any = parseConnectionString(connectionString);
      if (connectionStringObj.Endpoint == undefined) {
        throw new Error("Missing Endpoint in connection string.");
      }
      try {
        fullyQualifiedNamespace = connectionStringObj.Endpoint.match(".*://([^/]*)")[1];
      } catch (error) {
        throw new Error("Endpoint in the connection string is not valid.");
      }
      credentials = new SasServiceClientCredentials(
        connectionStringObj.SharedAccessKeyName,
        connectionStringObj.SharedAccessKey
      );
      authPolicy = signingPolicy(credentials);
    }
    const userAgentPrefix = formatUserAgentPrefix(options.userAgentOptions?.userAgentPrefix);
    const serviceClientOptions = createPipelineFromOptions(
      {
        ...options,
        userAgentOptions: {
          userAgentPrefix
        }
      },
      authPolicy
    );
    super(credentials, serviceClientOptions);
    this.endpoint = fullyQualifiedNamespace;
    this.endpointWithProtocol = fullyQualifiedNamespace.endsWith("/")
      ? "sb://" + fullyQualifiedNamespace
      : "sb://" + fullyQualifiedNamespace + "/";
    this.credentials = credentials;
    this.namespaceResourceSerializer = new NamespaceResourceSerializer();
    this.queueResourceSerializer = new QueueResourceSerializer();
    this.topicResourceSerializer = new TopicResourceSerializer();
    this.subscriptionResourceSerializer = new SubscriptionResourceSerializer();
    this.ruleResourceSerializer = new RuleResourceSerializer();
  }

  /**
   * Returns an object representing the metadata related to a service bus namespace.
   * @param queueName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   */
  async getNamespaceProperties(
    operationOptions?: OperationOptions
  ): Promise<NamespacePropertiesResponse> {
    log.httpAtomXml(`Performing management operation - getNamespaceProperties()`);
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getNamespaceProperties",
      operationOptions
    );
    try {
      const response: HttpOperationResponse = await this.getResource(
        "$namespaceinfo",
        this.namespaceResourceSerializer,
        updatedOperationOptions
      );

      return this.buildNamespacePropertiesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a queue with given name, configured using the given options
   * @param queueName
   * @param options Options to configure the Queue being created(For example, you can configure a queue to support partitions or sessions)
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
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createQueue(queueName: string, options?: CreateQueueOptions): Promise<QueueResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-createQueue",
      options
    );
    try {
      log.httpAtomXml(
        `Performing management operation - createQueue() for "${queueName}" with options: ${options}`
      );
      const response: HttpOperationResponse = await this.putResource(
        queueName,
        buildQueueOptions(options || {}),
        this.queueResourceSerializer,
        false,
        updatedOperationOptions
      );

      return this.buildQueueResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an object representing the Queue and its properties.
   * If you want to get the Queue runtime info like message count details, use `getQueueRuntimeProperties` API.
   * @param queueName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getQueue(queueName: string, operationOptions?: OperationOptions): Promise<QueueResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getQueue",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - getQueue() for "${queueName}"`);
      const response: HttpOperationResponse = await this.getResource(
        queueName,
        this.queueResourceSerializer,
        updatedOperationOptions
      );

      return this.buildQueueResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an object representing the Queue runtime info like message count details.
   * @param queueName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getQueueRuntimeProperties(
    queueName: string,
    operationOptions?: OperationOptions
  ): Promise<QueueRuntimePropertiesResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getQueueRuntimeProperties",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getQueueRuntimeProperties() for "${queueName}"`
      );
      const response: HttpOperationResponse = await this.getResource(
        queueName,
        this.queueResourceSerializer,
        updatedOperationOptions
      );

      return this.buildQueueRuntimePropertiesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns a list of objects, each representing a Queue along with its properties.
   * If you want to get the runtime info of the queues like message count, use `getQueuesRuntimeProperties` API instead.
   * @param options The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  private async getQueues(
    options?: ListRequestOptions & OperationOptions
  ): Promise<EntitiesResponse<QueueProperties>> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getQueues",
      options
    );
    try {
      log.httpAtomXml(`Performing management operation - getQueues() with options: ${options}`);
      const response: HttpOperationResponse = await this.listResources(
        "$Resources/Queues",
        updatedOperationOptions,
        this.queueResourceSerializer
      );

      return this.buildListQueuesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listQueuesPage(
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<EntitiesResponse<QueueProperties>> {
    let listResponse;
    do {
      listResponse = await this.getQueues({
        skip: Number(marker),
        maxCount: options.maxPageSize,
        ...options
      });
      marker = listResponse.continuationToken;
      yield listResponse;
    } while (marker);
  }

  private async *listQueuesAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<QueueProperties> {
    let marker: string | undefined;
    for await (const segment of this.listQueuesPage(marker, options)) {
      yield* segment;
    }
  }

  /**
   * Returns an async iterable iterator to list all the queues.
   *
   * .byPage() returns an async iterable iterator to list the queues in pages.
   *
   * @param {OperationOptions} [options]
   * @returns {PagedAsyncIterableIterator<
   *     QueueProperties,
   *     EntitiesResponse<QueueProperties>,
   *   >} An asyncIterableIterator that supports paging.
   * @memberof ServiceBusManagementClient
   */
  public listQueues(
    options?: OperationOptions
  ): PagedAsyncIterableIterator<QueueProperties, EntitiesResponse<QueueProperties>> {
    log.httpAtomXml(`Performing management operation - listQueues() with options: ${options}`);
    const iter = this.listQueuesAll(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listQueuesPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Returns a list of objects, each representing a Queue's runtime info like message count details.
   * @param options The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  private async getQueuesRuntimeProperties(
    options?: ListRequestOptions & OperationOptions
  ): Promise<EntitiesResponse<QueueRuntimeProperties>> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getQueuesRuntimeProperties",
      options
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getQueuesRuntimeProperties() with options: ${options}`
      );
      const response: HttpOperationResponse = await this.listResources(
        "$Resources/Queues",
        updatedOperationOptions,
        this.queueResourceSerializer
      );

      return this.buildListQueuesRuntimePropertiesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listQueuesRuntimePropertiesPage(
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<EntitiesResponse<QueueRuntimeProperties>> {
    let listResponse;
    do {
      listResponse = await this.getQueuesRuntimeProperties({
        skip: Number(marker),
        maxCount: options.maxPageSize,
        ...options
      });
      marker = listResponse.continuationToken;
      yield listResponse;
    } while (marker);
  }

  private async *listQueuesRuntimePropertiesAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<QueueRuntimeProperties> {
    let marker: string | undefined;
    for await (const segment of this.listQueuesRuntimePropertiesPage(marker, options)) {
      yield* segment;
    }
  }

  /**
   * Returns an async iterable iterator to list runtime info of the queues.
   *
   * .byPage() returns an async iterable iterator to list runtime info of the queues in pages.
   *
   *
   * @param {OperationOptions} [options]
   * @returns {PagedAsyncIterableIterator<
   *     QueueRuntimeProperties,
   *     EntitiesResponse<QueueRuntimeProperties>,
   *   >} An asyncIterableIterator that supports paging.
   * @memberof ServiceBusManagementClient
   */
  public listQueuesRuntimeProperties(
    options?: OperationOptions
  ): PagedAsyncIterableIterator<QueueRuntimeProperties, EntitiesResponse<QueueRuntimeProperties>> {
    log.httpAtomXml(
      `Performing management operation - listQueuesRuntimeProperties() with options: ${options}`
    );
    const iter = this.listQueuesRuntimePropertiesAll(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listQueuesRuntimePropertiesPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Updates the queue based on the queue properties provided.
   * All queue properties must be set even though only a subset of them are actually updatable.
   * Therefore, the suggested flow is to use `getQueue()` to get the complete set of queue properties,
   * update as needed and then pass it to `updateQueue()`.
   * See https://docs.microsoft.com/rest/api/servicebus/update-queue for more details.
   *
   * @param queue Object representing the properties of the queue.
   * `requiresSession`, `requiresDuplicateDetection`, `enablePartitioning`, and `name` can't be updated after creating the queue.
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateQueue(
    queue: QueueProperties,
    operationOptions?: OperationOptions
  ): Promise<QueueResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-updateQueue",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - updateQueue() for "${queue.name}" with options: ${queue}`
      );

      if (!isJSONLikeObject(queue) || queue == null) {
        throw new TypeError(
          `Parameter "queue" must be an object of type "QueueDescription" and cannot be undefined or null.`
        );
      }

      if (!queue.name) {
        throw new TypeError(`"name" attribute of the parameter "queue" cannot be undefined.`);
      }

      const response: HttpOperationResponse = await this.putResource(
        queue.name,
        buildQueueOptions(queue),
        this.queueResourceSerializer,
        true,
        updatedOperationOptions
      );

      return this.buildQueueResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a queue.
   * @param queueName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteQueue(queueName: string, operationOptions?: OperationOptions): Promise<Response> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-deleteQueue",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - deleteQueue() for "${queueName}"`);
      const response: HttpOperationResponse = await this.deleteResource(
        queueName,
        this.queueResourceSerializer,
        updatedOperationOptions
      );

      return { _response: response };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Checks whether a given queue exists or not.
   * @param queueName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   */
  async queueExists(queueName: string, operationOptions?: OperationOptions): Promise<boolean> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-queueExists",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - queueExists() for "${queueName}"`);
      try {
        await this.getQueue(queueName, updatedOperationOptions);
      } catch (error) {
        if (error.code == "MessageEntityNotFoundError") {
          return false;
        }
        throw error;
      }
      return true;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a topic with given name, configured using the given options
   * @param topicName
   * @param options Options to configure the Topic being created(For example, you can configure a topic to support partitions)
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
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createTopic(topicName: string, options?: CreateTopicOptions): Promise<TopicResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-createTopic",
      options
    );
    try {
      log.httpAtomXml(
        `Performing management operation - createTopic() for "${topicName}" with options: ${options}`
      );
      const response: HttpOperationResponse = await this.putResource(
        topicName,
        buildTopicOptions(options || {}),
        this.topicResourceSerializer,
        false,
        updatedOperationOptions
      );

      return this.buildTopicResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an object representing the Topic and its properties.
   * If you want to get the Topic runtime info like subscription count details, use `getTopicRuntimeProperties` API.
   * @param topicName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getTopic(topicName: string, operationOptions?: OperationOptions): Promise<TopicResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getTopic",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - getTopic() for "${topicName}"`);
      const response: HttpOperationResponse = await this.getResource(
        topicName,
        this.topicResourceSerializer,
        updatedOperationOptions
      );

      return this.buildTopicResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an object representing the Topic runtime info like subscription count.
   * @param topicName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getTopicRuntimeProperties(
    topicName: string,
    operationOptions?: OperationOptions
  ): Promise<TopicRuntimePropertiesResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getTopicRuntimeProperties",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getTopicRuntimeProperties() for "${topicName}"`
      );
      const response: HttpOperationResponse = await this.getResource(
        topicName,
        this.topicResourceSerializer,
        updatedOperationOptions
      );

      return this.buildTopicRuntimePropertiesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns a list of objects, each representing a Topic along with its properties.
   * If you want to get the runtime info of the topics like subscription count, use `getTopicsRuntimeProperties` API instead.
   * @param options The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  private async getTopics(
    options?: ListRequestOptions & OperationOptions
  ): Promise<EntitiesResponse<TopicProperties>> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getTopics",
      options
    );
    try {
      log.httpAtomXml(`Performing management operation - getTopics() with options: ${options}`);
      const response: HttpOperationResponse = await this.listResources(
        "$Resources/Topics",
        updatedOperationOptions,
        this.topicResourceSerializer
      );

      return this.buildListTopicsResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listTopicsPage(
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<EntitiesResponse<TopicProperties>> {
    let listResponse;
    do {
      listResponse = await this.getTopics({
        skip: Number(marker),
        maxCount: options.maxPageSize,
        ...options
      });
      marker = listResponse.continuationToken;
      yield listResponse;
    } while (marker);
  }

  private async *listTopicsAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<TopicProperties> {
    let marker: string | undefined;
    for await (const segment of this.listTopicsPage(marker, options)) {
      yield* segment;
    }
  }

  /**
   * Returns an async iterable iterator to list all the topics.
   *
   * .byPage() returns an async iterable iterator to list the topics in pages.
   *
   *
   * @param {OperationOptions} [options]
   * @returns {PagedAsyncIterableIterator<
   *     TopicProperties,
   *     EntitiesResponse<TopicProperties>,
   *   >} An asyncIterableIterator that supports paging.
   * @memberof ServiceBusManagementClient
   */
  public listTopics(
    options?: OperationOptions
  ): PagedAsyncIterableIterator<TopicProperties, EntitiesResponse<TopicProperties>> {
    log.httpAtomXml(`Performing management operation - listTopics() with options: ${options}`);
    const iter = this.listTopicsAll(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listTopicsPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Returns a list of objects, each representing a Topic's runtime info like subscription count.
   * @param options The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  private async getTopicsRuntimeProperties(
    options?: ListRequestOptions & OperationOptions
  ): Promise<EntitiesResponse<TopicRuntimeProperties>> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getTopicsRuntimeProperties",
      options
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getTopicsRuntimeProperties() with options: ${options}`
      );
      const response: HttpOperationResponse = await this.listResources(
        "$Resources/Topics",
        updatedOperationOptions,
        this.topicResourceSerializer
      );

      return this.buildListTopicsRuntimePropertiesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listTopicsRuntimePropertiesPage(
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<EntitiesResponse<TopicRuntimeProperties>> {
    let listResponse;
    do {
      listResponse = await this.getTopicsRuntimeProperties({
        skip: Number(marker),
        maxCount: options.maxPageSize,
        ...options
      });
      marker = listResponse.continuationToken;
      yield listResponse;
    } while (marker);
  }

  private async *listTopicsRuntimePropertiesAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<TopicRuntimeProperties> {
    let marker: string | undefined;
    for await (const segment of this.listTopicsRuntimePropertiesPage(marker, options)) {
      yield* segment;
    }
  }

  /**
   * Returns an async iterable iterator to list runtime info of the topics.
   *
   * .byPage() returns an async iterable iterator to list runtime info of the topics in pages.
   *
   *
   * @param {OperationOptions} [options]
   * @returns {PagedAsyncIterableIterator<
   *     TopicRuntimeProperties,
   *     EntitiesResponse<TopicRuntimeProperties>,

   *   >} An asyncIterableIterator that supports paging.
   * @memberof ServiceBusManagementClient
   */
  public listTopicsRuntimeProperties(
    options?: OperationOptions
  ): PagedAsyncIterableIterator<TopicRuntimeProperties, EntitiesResponse<TopicRuntimeProperties>> {
    log.httpAtomXml(
      `Performing management operation - listTopicsRuntimeProperties() with options: ${options}`
    );
    const iter = this.listTopicsRuntimePropertiesAll(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listTopicsRuntimePropertiesPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Updates the topic based on the topic properties provided.
   * All topic properties must be set even though only a subset of them are actually updatable.
   * Therefore, the suggested flow is to use `getTopic()` to get the complete set of topic properties,
   * update as needed and then pass it to `updateTopic()`.
   * See https://docs.microsoft.com/rest/api/servicebus/update-topic for more details.
   *
   * @param topic Object representing the properties of the topic.
   * `requiresDuplicateDetection`, `enablePartitioning`, and `name` can't be updated after creating the topic.
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateTopic(
    topic: TopicProperties,
    operationOptions?: OperationOptions
  ): Promise<TopicResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-updateTopic",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - updateTopic() for "${topic.name}" with options: ${topic}`
      );

      if (!isJSONLikeObject(topic) || topic == null) {
        throw new TypeError(
          `Parameter "topic" must be an object of type "TopicDescription" and cannot be undefined or null.`
        );
      }

      if (!topic.name) {
        throw new TypeError(`"name" attribute of the parameter "topic" cannot be undefined.`);
      }

      const response: HttpOperationResponse = await this.putResource(
        topic.name,
        buildTopicOptions(topic),
        this.topicResourceSerializer,
        true,
        updatedOperationOptions
      );

      return this.buildTopicResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a topic.
   * @param topicName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteTopic(topicName: string, operationOptions?: OperationOptions): Promise<Response> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-deleteTopic",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - deleteTopic() for "${topicName}"`);
      const response: HttpOperationResponse = await this.deleteResource(
        topicName,
        this.topicResourceSerializer,
        updatedOperationOptions
      );

      return { _response: response };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Checks whether a given topic exists or not.
   * @param topicName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   */
  async topicExists(topicName: string, operationOptions?: OperationOptions): Promise<boolean> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-topicExists",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - topicExists() for "${topicName}"`);
      try {
        await this.getTopic(topicName, updatedOperationOptions);
      } catch (error) {
        if (error.code == "MessageEntityNotFoundError") {
          return false;
        }
        throw error;
      }
      return true;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a subscription with given name, configured using the given options
   * @param topicName
   * @param subscriptionName
   * @param options Options to configure the Subscription being created(For example, you can configure a Subscription to support partitions or sessions)
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
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createSubscription(
    topicName: string,
    subscriptionName: string,
    options?: CreateSubscriptionOptions
  ): Promise<SubscriptionResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-createSubscription",
      options
    );
    try {
      log.httpAtomXml(
        `Performing management operation - createSubscription() for "${subscriptionName}" with options: ${options}`
      );
      const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
      const response: HttpOperationResponse = await this.putResource(
        fullPath,
        buildSubscriptionOptions(options || {}),
        this.subscriptionResourceSerializer,
        false,
        updatedOperationOptions
      );

      return this.buildSubscriptionResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an object representing the Subscription and its properties.
   * If you want to get the Subscription runtime info like message count details, use `getSubscriptionRuntimeProperties` API.
   * @param topicName
   * @param subscriptionName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getSubscription(
    topicName: string,
    subscriptionName: string,
    operationOptions?: OperationOptions
  ): Promise<SubscriptionResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getSubscription",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getSubscription() for "${subscriptionName}"`
      );
      const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
      const response: HttpOperationResponse = await this.getResource(
        fullPath,
        this.subscriptionResourceSerializer,
        updatedOperationOptions
      );

      return this.buildSubscriptionResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an object representing the Subscription runtime info like message count details.
   * @param topicName
   * @param subscriptionName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getSubscriptionRuntimeProperties(
    topicName: string,
    subscriptionName: string,
    operationOptions?: OperationOptions
  ): Promise<SubscriptionRuntimePropertiesResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getSubscriptionRuntimeProperties",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getSubscriptionRuntimeProperties() for "${subscriptionName}"`
      );
      const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
      const response: HttpOperationResponse = await this.getResource(
        fullPath,
        this.subscriptionResourceSerializer,
        updatedOperationOptions
      );

      return this.buildSubscriptionRuntimePropertiesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns a list of objects, each representing a Subscription along with its properties.
   * If you want to get the runtime info of the subscriptions like message count, use `getSubscriptionsRuntimeProperties` API instead.
   * @param topicName
   * @param options The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  private async getSubscriptions(
    topicName: string,
    options?: ListRequestOptions & OperationOptions
  ): Promise<EntitiesResponse<SubscriptionProperties>> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getSubscriptions",
      options
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getSubscriptions() with options: ${options}`
      );
      const response: HttpOperationResponse = await this.listResources(
        topicName + "/Subscriptions/",
        updatedOperationOptions,
        this.subscriptionResourceSerializer
      );

      return this.buildListSubscriptionsResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listSubscriptionsPage(
    topicName: string,
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<EntitiesResponse<SubscriptionProperties>> {
    let listResponse;
    do {
      listResponse = await this.getSubscriptions(topicName, {
        skip: Number(marker),
        maxCount: options.maxPageSize,
        ...options
      });
      marker = listResponse.continuationToken;
      yield listResponse;
    } while (marker);
  }

  private async *listSubscriptionsAll(
    topicName: string,
    options: OperationOptions = {}
  ): AsyncIterableIterator<SubscriptionProperties> {
    let marker: string | undefined;
    for await (const segment of this.listSubscriptionsPage(topicName, marker, options)) {
      yield* segment;
    }
  }

  /**
   *
   * Returns an async iterable iterator to list all the subscriptions
   * under the specified topic.
   *
   * .byPage() returns an async iterable iterator to list the subscriptions in pages.
   *
   * @memberof ServiceBusManagementClient
   * @param {string} topicName
   * @param {OperationOptions} [options]
   * @returns {PagedAsyncIterableIterator<
   *     SubscriptionProperties,
   *     EntitiesResponse<SubscriptionProperties>
   *   >} An asyncIterableIterator that supports paging.
   * @memberof ServiceBusManagementClient
   */
  public listSubscriptions(
    topicName: string,
    options?: OperationOptions
  ): PagedAsyncIterableIterator<SubscriptionProperties, EntitiesResponse<SubscriptionProperties>> {
    log.httpAtomXml(
      `Performing management operation - listSubscriptions() with options: ${options}`
    );
    const iter = this.listSubscriptionsAll(topicName, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listSubscriptionsPage(topicName, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Returns a list of objects, each representing a Subscription's runtime info like message count details.
   * @param topicName
   * @param options The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  private async getSubscriptionsRuntimeProperties(
    topicName: string,
    options?: ListRequestOptions & OperationOptions
  ): Promise<EntitiesResponse<SubscriptionRuntimeProperties>> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getSubscriptionsRuntimeProperties",
      options
    );
    try {
      log.httpAtomXml(
        `Performing management operation - getSubscriptionsRuntimeProperties() with options: ${options}`
      );
      const response: HttpOperationResponse = await this.listResources(
        topicName + "/Subscriptions/",
        updatedOperationOptions,
        this.subscriptionResourceSerializer
      );

      return this.buildListSubscriptionsRuntimePropertiesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listSubscriptionsRuntimePropertiesPage(
    topicName: string,
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<EntitiesResponse<SubscriptionRuntimeProperties>> {
    let listResponse;
    do {
      listResponse = await this.getSubscriptionsRuntimeProperties(topicName, {
        skip: Number(marker),
        maxCount: options.maxPageSize,
        ...options
      });
      marker = listResponse.continuationToken;
      yield listResponse;
    } while (marker);
  }

  private async *listSubscriptionsRuntimePropertiesAll(
    topicName: string,
    options: OperationOptions = {}
  ): AsyncIterableIterator<SubscriptionRuntimeProperties> {
    let marker: string | undefined;
    for await (const segment of this.listSubscriptionsRuntimePropertiesPage(
      topicName,
      marker,
      options
    )) {
      yield* segment;
    }
  }

  /**
   * Returns an async iterable iterator to list runtime info of the subscriptions
   * under the specified topic.
   *
   * .byPage() returns an async iterable iterator to list runtime info of subscriptions in pages.
   *
   * @param {string} topicName
   * @param {OperationOptions} [options]
   * @returns {PagedAsyncIterableIterator<
   *     SubscriptionRuntimeProperties,
   *     EntitiesResponse<SubscriptionRuntimeProperties>,

   *   >}  An asyncIterableIterator that supports paging.
   * @memberof ServiceBusManagementClient
   */
  public listSubscriptionsRuntimeProperties(
    topicName: string,
    options?: OperationOptions
  ): PagedAsyncIterableIterator<
    SubscriptionRuntimeProperties,
    EntitiesResponse<SubscriptionRuntimeProperties>
  > {
    log.httpAtomXml(
      `Performing management operation - listSubscriptionsRuntimeProperties() with options: ${options}`
    );
    const iter = this.listSubscriptionsRuntimePropertiesAll(topicName, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listSubscriptionsRuntimePropertiesPage(topicName, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Updates the subscription based on the subscription properties provided.
   * All subscription properties must be set even though only a subset of them are actually updatable.
   * Therefore, the suggested flow is to use `getSubscription()` to get the complete set of subscription properties,
   * update as needed and then pass it to `updateSubscription()`.
   *
   * @param subscription Object representing the properties of the subscription.
   * `subscriptionName`, `topicName`, and `requiresSession` can't be updated after creating the subscription.
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateSubscription(
    subscription: SubscriptionProperties,
    operationOptions?: OperationOptions
  ): Promise<SubscriptionResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-updateSubscription",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - updateSubscription() for "${subscription.subscriptionName}" with options: ${subscription}`
      );

      if (!isJSONLikeObject(subscription) || subscription == null) {
        throw new TypeError(
          `Parameter "subscription" must be an object of type "SubscriptionDescription" and cannot be undefined or null.`
        );
      }

      if (!subscription.topicName || !subscription.subscriptionName) {
        throw new TypeError(
          `The attributes "topicName" and "subscriptionName" of the parameter "subscription" cannot be undefined.`
        );
      }

      const fullPath = this.getSubscriptionPath(
        subscription.topicName,
        subscription.subscriptionName
      );

      const response: HttpOperationResponse = await this.putResource(
        fullPath,
        buildSubscriptionOptions(subscription),
        this.subscriptionResourceSerializer,
        true,
        updatedOperationOptions
      );

      return this.buildSubscriptionResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a subscription.
   * @param topicName
   * @param subscriptionName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteSubscription(
    topicName: string,
    subscriptionName: string,
    operationOptions?: OperationOptions
  ): Promise<Response> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-deleteSubscription",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - deleteSubscription() for "${subscriptionName}"`
      );
      const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
      const response: HttpOperationResponse = await this.deleteResource(
        fullPath,
        this.subscriptionResourceSerializer,
        updatedOperationOptions
      );

      return { _response: response };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Checks whether a given subscription exists in the topic or not.
   * @param topicName
   * @param subscriptionName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   */
  async subscriptionExists(
    topicName: string,
    subscriptionName: string,
    operationOptions?: OperationOptions
  ): Promise<boolean> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-subscriptionExists",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - subscriptionExists() for "${topicName}" and "${subscriptionName}"`
      );
      try {
        await this.getSubscription(topicName, subscriptionName, updatedOperationOptions);
      } catch (error) {
        if (error.code == "MessageEntityNotFoundError") {
          return false;
        }
        throw error;
      }
      return true;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a rule with given name, configured using the given options.
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param ruleFilter Defines the filter expression that the rule evaluates.
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityAlreadyExistsError` when requested messaging entity already exists,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `QuotaExceededError` when requested operation fails due to quote limits exceeding from service side,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  createRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    ruleFilter: SqlRuleFilter | CorrelationRuleFilter,
    operationOptions?: OperationOptions
  ): Promise<RuleResponse>;
  /**
   * Creates a rule with given name, configured using the given options.
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param ruleFilter Defines the filter expression that the rule evaluates.
   * @param ruleAction The SQL like expression that can be executed on the message should the associated filter apply.
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityAlreadyExistsError` when requested messaging entity already exists,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `QuotaExceededError` when requested operation fails due to quote limits exceeding from service side,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  createRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    ruleFilter: SqlRuleFilter | CorrelationRuleFilter,
    ruleAction: SqlRuleAction,
    operationOptions?: OperationOptions
  ): Promise<RuleResponse>;
  async createRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    ruleFilter: SqlRuleFilter | CorrelationRuleFilter,
    ruleActionOrOperationOptions?: SqlRuleAction | OperationOptions,
    operationOptions?: OperationOptions
  ): Promise<RuleResponse> {
    let ruleAction: SqlRuleAction | undefined = undefined;
    let operOptions: OperationOptions | undefined;
    if (ruleActionOrOperationOptions) {
      if (isSqlRuleAction(ruleActionOrOperationOptions)) {
        // Overload#2 - where the sqlExpression in the ruleAction is defined
        ruleAction = ruleActionOrOperationOptions;
        operOptions = operationOptions;
      } else {
        // Overload#1
        // Overload#2 - where the sqlExpression in the ruleAction is undefined
        operOptions = { ...ruleActionOrOperationOptions, ...operationOptions };
      }
    }
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-createRule",
      operOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - createRule() for "${ruleName}" with filter: "${ruleFilter}"`
      );
      const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
      const response: HttpOperationResponse = await this.putResource(
        fullPath,
        { name: ruleName, filter: ruleFilter, action: ruleAction },
        this.ruleResourceSerializer,
        false,
        updatedOperationOptions
      );
      return this.buildRuleResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an object representing the Rule with the given name along with all its properties.
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    operationOptions?: OperationOptions
  ): Promise<RuleResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getRule",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - getRule() for "${ruleName}"`);
      const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
      const response: HttpOperationResponse = await this.getResource(
        fullPath,
        this.ruleResourceSerializer,
        updatedOperationOptions
      );

      return this.buildRuleResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Lists existing rules.
   * @param topicName
   * @param subscriptionName
   * @param options The options include the maxCount and the count of entities to skip, the operation options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  private async getRules(
    topicName: string,
    subscriptionName: string,
    options?: ListRequestOptions & OperationOptions
  ): Promise<EntitiesResponse<RuleProperties>> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getRules",
      options
    );
    try {
      log.httpAtomXml(`Performing management operation - getRules() with options: ${options}`);
      const fullPath = this.getSubscriptionPath(topicName, subscriptionName) + "/Rules/";
      const response: HttpOperationResponse = await this.listResources(
        fullPath,
        updatedOperationOptions,
        this.ruleResourceSerializer
      );

      return this.buildListRulesResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listRulesPage(
    topicName: string,
    subscriptionName: string,
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<EntitiesResponse<RuleProperties>> {
    let listResponse;
    do {
      listResponse = await this.getRules(topicName, subscriptionName, {
        skip: Number(marker),
        maxCount: options.maxPageSize,
        ...options
      });
      marker = listResponse.continuationToken;
      yield listResponse;
    } while (marker);
  }

  private async *listRulesAll(
    topicName: string,
    subscriptionName: string,
    options: OperationOptions = {}
  ): AsyncIterableIterator<RuleProperties> {
    let marker: string | undefined;
    for await (const segment of this.listRulesPage(topicName, subscriptionName, marker, options)) {
      yield* segment;
    }
  }

  /**
   * Returns an async iterable iterator to list all the rules
   * under the specified subscription.
   *
   * .byPage() returns an async iterable iterator to list the rules in pages.
   *
   * @param {string} topicName
   * @param {string} subscriptionName
   * @param {OperationOptions} [options]
   * @returns {PagedAsyncIterableIterator<RuleProperties, EntitiesResponse<RuleProperties>>} An asyncIterableIterator that supports paging.
   * @memberof ServiceBusManagementClient
   */
  public listRules(
    topicName: string,
    subscriptionName: string,
    options?: OperationOptions
  ): PagedAsyncIterableIterator<RuleProperties, EntitiesResponse<RuleProperties>> {
    log.httpAtomXml(`Performing management operation - listRules() with options: ${options}`);
    const iter = this.listRulesAll(topicName, subscriptionName, options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listRulesPage(topicName, subscriptionName, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Updates properties on the Rule by the given name based on the given options.
   * All rule properties must be set even if one of them is being updated.
   * Therefore, the suggested flow is to use `getRule()` to get the complete set of rule properties,
   * update as needed and then pass it to `updateRule()`.
   *
   * @param topicName
   * @param subscriptionName
   * @param rule Options to configure the Rule being updated.
   * For example, you can configure the filter to apply on associated Topic/Subscription.
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateRule(
    topicName: string,
    subscriptionName: string,
    rule: RuleProperties,
    operationOptions?: OperationOptions
  ): Promise<RuleResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-updateRule",
      operationOptions
    );
    try {
      log.httpAtomXml(
        `Performing management operation - updateRule() for "${rule.name}" with options: ${rule}`
      );

      if (!isJSONLikeObject(rule) || rule === null) {
        throw new TypeError(
          `Parameter "rule" must be an object of type "RuleDescription" and cannot be undefined or null.`
        );
      }

      if (!rule.name) {
        throw new TypeError(`"name" attribute of the parameter "rule" cannot be undefined.`);
      }

      const fullPath = this.getRulePath(topicName, subscriptionName, rule.name);
      const response: HttpOperationResponse = await this.putResource(
        fullPath,
        rule,
        this.ruleResourceSerializer,
        true,
        updatedOperationOptions
      );

      return this.buildRuleResponse(response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a rule.
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param operationOptions The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    operationOptions?: OperationOptions
  ): Promise<Response> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-deleteRule",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - deleteRule() for "${ruleName}"`);
      const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
      const response: HttpOperationResponse = await this.deleteResource(
        fullPath,
        this.ruleResourceSerializer,
        updatedOperationOptions
      );

      return { _response: response };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Checks whether a given rule exists or not.
   *
   * @param {string} topicName
   * @param {string} subscriptionName
   * @param {string} ruleName
   * @param {OperationOptions} [operationOptions]
   */
  async ruleExists(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    operationOptions?: OperationOptions
  ): Promise<boolean> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-ruleExists",
      operationOptions
    );
    try {
      log.httpAtomXml(`Performing management operation - ruleExists() for "${ruleName}"`);
      try {
        await this.getRule(topicName, subscriptionName, ruleName, updatedOperationOptions);
      } catch (error) {
        if (error.code == "MessageEntityNotFoundError") {
          return false;
        }
        throw error;
      }
      return true;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a resource based on `isUpdate` parameter.
   * @param name
   * @param entityFields
   * @param isUpdate
   * @param serializer
   */
  private async putResource(
    name: string,
    entityFields:
      | InternalQueueOptions
      | InternalTopicOptions
      | InternalSubscriptionOptions
      | CreateRuleOptions,
    serializer: AtomXmlSerializer,
    isUpdate: boolean = false,
    operationOptions: OperationOptions = {}
  ): Promise<HttpOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-putResource",
      operationOptions
    );
    try {
      const webResource: WebResource = new WebResource(this.getUrl(name), "PUT");
      webResource.body = entityFields;
      if (isUpdate) {
        webResource.headers.set("If-Match", "*");
      }

      const queueOrSubscriptionFields = entityFields as
        | InternalQueueOptions
        | InternalSubscriptionOptions;
      if (
        queueOrSubscriptionFields.ForwardTo ||
        queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo
      ) {
        const token =
          this.credentials instanceof SasServiceClientCredentials
            ? this.credentials.getToken(this.endpoint).token
            : (await this.credentials.getToken([AMQPConstants.aadServiceBusScope]))!.token;

        if (queueOrSubscriptionFields.ForwardTo) {
          webResource.headers.set("ServiceBusSupplementaryAuthorization", token);
          if (!isAbsoluteUrl(queueOrSubscriptionFields.ForwardTo)) {
            queueOrSubscriptionFields.ForwardTo = this.endpointWithProtocol.concat(
              queueOrSubscriptionFields.ForwardTo
            );
          }
        }
        if (queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo) {
          webResource.headers.set("ServiceBusDlqSupplementaryAuthorization", token);
          if (!isAbsoluteUrl(queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo)) {
            queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo = this.endpointWithProtocol.concat(
              queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo
            );
          }
        }
      }

      webResource.headers.set("content-type", "application/atom+xml;type=entry;charset=utf-8");

      return executeAtomXmlOperation(this, webResource, serializer, updatedOperationOptions);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a resource.
   * @param name
   * @param serializer
   */
  private async getResource(
    name: string,
    serializer: AtomXmlSerializer,
    operationOptions: OperationOptions = {}
  ): Promise<HttpOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-getResource",
      operationOptions
    );
    try {
      const webResource: WebResource = new WebResource(this.getUrl(name), "GET");

      const response = await executeAtomXmlOperation(
        this,
        webResource,
        serializer,
        updatedOperationOptions
      );
      if (
        response.parsedBody == undefined ||
        (Array.isArray(response.parsedBody) && response.parsedBody.length == 0)
      ) {
        const err = new RestError(
          `The messaging entity "${name}" being requested cannot be found.`,
          "MessageEntityNotFoundError",
          response.status,
          stripRequest(webResource),
          stripResponse(response)
        );
        throw err;
      }
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Lists existing resources
   * @param name
   * @param options
   * @param serializer
   */
  private async listResources(
    name: string,
    options: ListRequestOptions & OperationOptions = {},
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-listResources",
      options
    );
    try {
      const queryParams: { [key: string]: string } = {};
      if (options) {
        if (options.skip) {
          queryParams["$skip"] = options.skip.toString();
        }
        if (options.maxCount) {
          queryParams["$top"] = options.maxCount.toString();
        }
      }

      const webResource: WebResource = new WebResource(this.getUrl(name, queryParams), "GET");

      return executeAtomXmlOperation(this, webResource, serializer, updatedOperationOptions);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a resource.
   * @param name
   */
  private async deleteResource(
    name: string,
    serializer: AtomXmlSerializer,
    operationOptions: OperationOptions = {}
  ): Promise<HttpOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "ServiceBusManagementClient-deleteResource",
      operationOptions
    );
    try {
      const webResource: WebResource = new WebResource(this.getUrl(name), "DELETE");

      return executeAtomXmlOperation(this, webResource, serializer, updatedOperationOptions);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private getUrl(path: string, queryParams?: { [key: string]: string }): string {
    const baseUri = `https://${this.endpoint}/${path}`;

    const requestUrl: URLBuilder = URLBuilder.parse(baseUri);
    requestUrl.setQueryParameter(Constants.API_VERSION_QUERY_KEY, Constants.CURRENT_API_VERSION);

    if (queryParams) {
      for (const key of Object.keys(queryParams)) {
        requestUrl.setQueryParameter(key, queryParams[key]);
      }
    }

    return requestUrl.toString();
  }

  private getSubscriptionPath(topicName: string, subscriptionName: string): string {
    return topicName + "/Subscriptions/" + subscriptionName;
  }

  private getRulePath(topicName: string, subscriptionName: string, ruleName: string): string {
    return topicName + "/Subscriptions/" + subscriptionName + "/Rules/" + ruleName;
  }

  private getMarkerFromNextLinkUrl(url: string): string | undefined {
    if (!url) {
      return undefined;
    }
    try {
      return parseURL(url).searchParams.get(Constants.XML_METADATA_MARKER + "skip");
    } catch (error) {
      throw new Error(
        `Unable to parse the '${Constants.XML_METADATA_MARKER}skip' from the next-link in the response ` +
          error
      );
    }
  }

  private buildNamespacePropertiesResponse(
    response: HttpOperationResponse
  ): NamespacePropertiesResponse {
    try {
      const namespace = buildNamespace(response.parsedBody);
      const namespaceResponse: NamespacePropertiesResponse = Object.assign(namespace || {}, {
        _response: response
      });
      return namespaceResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a namespace object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildListQueuesResponse(
    response: HttpOperationResponse
  ): EntitiesResponse<QueueProperties> {
    try {
      const queues: QueueProperties[] = [];
      const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawQueueArray: any = response.parsedBody;
      for (let i = 0; i < rawQueueArray.length; i++) {
        const queue = buildQueue(rawQueueArray[i]);
        if (queue) {
          queues.push(queue);
        }
      }
      const listQueuesResponse: EntitiesResponse<QueueProperties> = Object.assign(queues, {
        _response: response
      });
      listQueuesResponse.continuationToken = nextMarker;
      return listQueuesResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of queues using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildListQueuesRuntimePropertiesResponse(
    response: HttpOperationResponse
  ): EntitiesResponse<QueueRuntimeProperties> {
    try {
      const queues: QueueRuntimeProperties[] = [];
      const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawQueueArray: any = response.parsedBody;
      for (let i = 0; i < rawQueueArray.length; i++) {
        const queue = buildQueueRuntimeProperties(rawQueueArray[i]);
        if (queue) {
          queues.push(queue);
        }
      }
      const listQueuesResponse: EntitiesResponse<QueueRuntimeProperties> = Object.assign(queues, {
        _response: response
      });
      listQueuesResponse.continuationToken = nextMarker;
      return listQueuesResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of queues using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildQueueResponse(response: HttpOperationResponse): QueueResponse {
    try {
      const queue = buildQueue(response.parsedBody);
      const queueResponse: QueueResponse = Object.assign(queue || {}, {
        _response: response
      });
      return queueResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a queue object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildQueueRuntimePropertiesResponse(
    response: HttpOperationResponse
  ): QueueRuntimePropertiesResponse {
    try {
      const queue = buildQueueRuntimeProperties(response.parsedBody);
      const queueResponse: QueueRuntimePropertiesResponse = Object.assign(queue || {}, {
        _response: response
      });
      return queueResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a queue object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildListTopicsResponse(
    response: HttpOperationResponse
  ): EntitiesResponse<TopicProperties> {
    try {
      const topics: TopicProperties[] = [];
      const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawTopicArray: any = response.parsedBody;
      for (let i = 0; i < rawTopicArray.length; i++) {
        const topic = buildTopic(rawTopicArray[i]);
        if (topic) {
          topics.push(topic);
        }
      }
      const listTopicsResponse: EntitiesResponse<TopicProperties> = Object.assign(topics, {
        _response: response
      });
      listTopicsResponse.continuationToken = nextMarker;
      return listTopicsResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of topics using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildListTopicsRuntimePropertiesResponse(
    response: HttpOperationResponse
  ): EntitiesResponse<TopicRuntimeProperties> {
    try {
      const topics: TopicRuntimeProperties[] = [];
      const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawTopicArray: any = response.parsedBody;
      for (let i = 0; i < rawTopicArray.length; i++) {
        const topic = buildTopicRuntimeProperties(rawTopicArray[i]);
        if (topic) {
          topics.push(topic);
        }
      }
      const listTopicsResponse: EntitiesResponse<TopicRuntimeProperties> = Object.assign(topics, {
        _response: response
      });
      listTopicsResponse.continuationToken = nextMarker;
      return listTopicsResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of topics using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }
  private buildTopicResponse(response: HttpOperationResponse): TopicResponse {
    try {
      const topic = buildTopic(response.parsedBody);
      const topicResponse: TopicResponse = Object.assign(topic || {}, {
        _response: response
      });
      return topicResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a topic object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildTopicRuntimePropertiesResponse(
    response: HttpOperationResponse
  ): TopicRuntimePropertiesResponse {
    try {
      const topic = buildTopicRuntimeProperties(response.parsedBody);
      const topicResponse: TopicRuntimePropertiesResponse = Object.assign(topic || {}, {
        _response: response
      });
      return topicResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a topic object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildListSubscriptionsResponse(
    response: HttpOperationResponse
  ): EntitiesResponse<SubscriptionProperties> {
    try {
      const subscriptions: SubscriptionProperties[] = [];
      const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawSubscriptionArray: any = response.parsedBody;
      for (let i = 0; i < rawSubscriptionArray.length; i++) {
        const subscription = buildSubscription(rawSubscriptionArray[i]);
        if (subscription) {
          subscriptions.push(subscription);
        }
      }
      const listSubscriptionsResponse: EntitiesResponse<SubscriptionProperties> = Object.assign(
        subscriptions,
        {
          _response: response
        }
      );
      listSubscriptionsResponse.continuationToken = nextMarker;
      return listSubscriptionsResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of subscriptions using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildListSubscriptionsRuntimePropertiesResponse(
    response: HttpOperationResponse
  ): EntitiesResponse<SubscriptionRuntimeProperties> {
    try {
      const subscriptions: SubscriptionRuntimeProperties[] = [];
      const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawSubscriptionArray: any = response.parsedBody;
      for (let i = 0; i < rawSubscriptionArray.length; i++) {
        const subscription = buildSubscriptionRuntimeProperties(rawSubscriptionArray[i]);
        if (subscription) {
          subscriptions.push(subscription);
        }
      }
      const listSubscriptionsResponse: EntitiesResponse<SubscriptionRuntimeProperties> = Object.assign(
        subscriptions,
        {
          _response: response
        }
      );
      listSubscriptionsResponse.continuationToken = nextMarker;
      return listSubscriptionsResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of subscriptions using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildSubscriptionResponse(response: HttpOperationResponse): SubscriptionResponse {
    try {
      const subscription = buildSubscription(response.parsedBody);
      const subscriptionResponse: SubscriptionResponse = Object.assign(subscription || {}, {
        _response: response
      });
      return subscriptionResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a subscription object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildSubscriptionRuntimePropertiesResponse(
    response: HttpOperationResponse
  ): SubscriptionRuntimePropertiesResponse {
    try {
      const subscription = buildSubscriptionRuntimeProperties(response.parsedBody);
      const subscriptionResponse: SubscriptionRuntimePropertiesResponse = Object.assign(
        subscription || {},
        {
          _response: response
        }
      );
      return subscriptionResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a subscription object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildListRulesResponse(
    response: HttpOperationResponse
  ): EntitiesResponse<RuleProperties> {
    try {
      const rules: RuleProperties[] = [];
      const nextMarker = this.getMarkerFromNextLinkUrl(response.parsedBody.nextLink);
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawRuleArray: any = response.parsedBody;
      for (let i = 0; i < rawRuleArray.length; i++) {
        const rule = buildRule(rawRuleArray[i]);
        if (rule) {
          rules.push(rule);
        }
      }
      const listRulesResponse: EntitiesResponse<RuleProperties> = Object.assign(rules, {
        _response: response
      });
      listRulesResponse.continuationToken = nextMarker;
      return listRulesResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of rules using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private buildRuleResponse(response: HttpOperationResponse): RuleResponse {
    try {
      const rule = buildRule(response.parsedBody);
      const ruleResponse: RuleResponse = Object.assign(rule || {}, { _response: response });
      return ruleResponse;
    } catch (err) {
      log.warning("Failure parsing response from service - %0 ", err);
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a rule object using the response from the service.`,
        RestError.PARSE_ERROR,
        response.status,
        stripRequest(response.request),
        stripResponse(response)
      );
    }
  }

  private throwIfInvalidContinuationToken(token: string | undefined) {
    if (!(token === undefined || (typeof token === "string" && Number(token) >= 0))) {
      throw new Error(`Invalid continuationToken ${token} provided`);
    }
  }
}
