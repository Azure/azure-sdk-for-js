// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants as AMQPConstants, parseConnectionString } from "@azure/core-amqp";
import {
  TokenCredential,
  isTokenCredential,
  NamedKeyCredential,
  isNamedKeyCredential,
} from "@azure/core-auth";
import {
  ServiceClient,
  OperationOptions,
  CommonClientOptions,
  FullOperationResponse,
} from "@azure/core-client";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import {
  bearerTokenAuthenticationPolicy,
  RestError,
  PipelineResponse,
  createPipelineFromOptions,
  PipelineRequest,
  createPipelineRequest,
  PipelinePolicy,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { CorrelationRuleFilter } from "./core/managementClient";
import { administrationLogger as logger } from "./log";
import {
  buildNamespace,
  NamespaceProperties,
  NamespaceResourceSerializer,
} from "./serializers/namespaceResourceSerializer";
import {
  buildQueue,
  buildQueueOptions,
  buildQueueRuntimeProperties,
  CreateQueueOptions,
  InternalQueueOptions,
  QueueProperties,
  QueueResourceSerializer,
  QueueRuntimeProperties,
} from "./serializers/queueResourceSerializer";
import {
  buildRule,
  CreateRuleOptions,
  isSqlRuleAction,
  RuleProperties,
  RuleResourceSerializer,
  SqlRuleAction,
  SqlRuleFilter,
} from "./serializers/ruleResourceSerializer";
import {
  buildSubscription,
  buildSubscriptionOptions,
  buildSubscriptionRuntimeProperties,
  CreateSubscriptionOptions,
  InternalSubscriptionOptions,
  SubscriptionProperties,
  SubscriptionResourceSerializer,
  SubscriptionRuntimeProperties,
} from "./serializers/subscriptionResourceSerializer";
import {
  buildTopic,
  buildTopicOptions,
  buildTopicRuntimeProperties,
  CreateTopicOptions,
  InternalTopicOptions,
  TopicProperties,
  TopicResourceSerializer,
  TopicRuntimeProperties,
} from "./serializers/topicResourceSerializer";
import { AtomXmlSerializer, executeAtomXmlOperation } from "./util/atomXmlHelper";
import * as Constants from "./util/constants";
import { parseURL } from "./util/parseUrl";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import { tracingClient } from "./diagnostics/tracing";
import { isDefined } from "@azure/core-util";
import {
  formatUserAgentPrefix,
  getHttpResponseOnly,
  isAbsoluteUrl,
  isJSONLikeObject,
  ServiceBusAtomAPIVersion,
} from "./util/utils";
import { HttpResponse } from "./util/compat";

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
// eslint-disable-next-line @typescript-eslint/ban-types
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
// eslint-disable-next-line @typescript-eslint/ban-types
export type EntitiesResponse<T extends object> = WithResponse<Array<T>> &
  Pick<PageSettings, "continuationToken">;

function signingPolicy(credentials: {
  signRequest(request: PipelineRequest): Promise<PipelineRequest>;
}): PipelinePolicy {
  return {
    name: "signingPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
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
export class ServiceBusAdministrationClient extends ServiceClient {
  /**
   * Reference to the endpoint as extracted from input connection string.
   */
  private endpoint: string;

  /**
   * Reference to the endpoint with protocol prefix as extracted from input connection string.
   */
  private endpointWithProtocol: string;

  private serviceVersion: ServiceBusAtomAPIVersion;

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
   * Initializes a new instance of the ServiceBusAdministrationClient class.
   * @param connectionString - The connection string needed for the client to connect to Azure.
   * @param options - PipelineOptions
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
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
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential | NamedKeyCredential,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ServiceBusAdministrationClientOptions
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    credentialOrOptions2?:
      | TokenCredential
      | NamedKeyCredential
      | ServiceBusAdministrationClientOptions,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options3?: ServiceBusAdministrationClientOptions
  ) {
    let options: ServiceBusAdministrationClientOptions;
    let fullyQualifiedNamespace: string;
    let credentials: SasServiceClientCredentials | TokenCredential;
    let authPolicy: PipelinePolicy;
    if (isTokenCredential(credentialOrOptions2)) {
      fullyQualifiedNamespace = fullyQualifiedNamespaceOrConnectionString1;
      options = options3 || {};
      credentials = credentialOrOptions2;
      authPolicy = bearerTokenAuthenticationPolicy({
        credential: credentials,
        scopes: AMQPConstants.aadServiceBusScope,
      });
    } else if (isNamedKeyCredential(credentialOrOptions2)) {
      fullyQualifiedNamespace = fullyQualifiedNamespaceOrConnectionString1;
      credentials = new SasServiceClientCredentials(credentialOrOptions2);
      options = options3 || {};
      authPolicy = signingPolicy(credentials);
    } else {
      const connectionString = fullyQualifiedNamespaceOrConnectionString1;
      options = credentialOrOptions2 || {};
      const connectionStringObj: any = parseConnectionString(connectionString);
      if (connectionStringObj.Endpoint === undefined) {
        throw new Error("Missing Endpoint in connection string.");
      }
      try {
        fullyQualifiedNamespace = connectionStringObj.Endpoint.match(".*://([^/]*)")[1];
      } catch (error: any) {
        throw new Error("Endpoint in the connection string is not valid.");
      }
      credentials = new SasServiceClientCredentials({
        key: connectionStringObj.SharedAccessKey,
        name: connectionStringObj.SharedAccessKeyName,
      });
      authPolicy = signingPolicy(credentials);
    }

    const userAgentPrefix = formatUserAgentPrefix(options.userAgentOptions?.userAgentPrefix);
    const serviceClientOptions = createPipelineFromOptions({
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
    });
    serviceClientOptions.addPolicy(authPolicy);
    super({ pipeline: serviceClientOptions });
    this.endpoint = fullyQualifiedNamespace;
    this.endpointWithProtocol = fullyQualifiedNamespace.endsWith("/")
      ? "sb://" + fullyQualifiedNamespace
      : "sb://" + fullyQualifiedNamespace + "/";
    this.serviceVersion = options.serviceVersion ?? Constants.CURRENT_API_VERSION;
    this.credentials = credentials;
    this.namespaceResourceSerializer = new NamespaceResourceSerializer();
    this.queueResourceSerializer = new QueueResourceSerializer();
    this.topicResourceSerializer = new TopicResourceSerializer();
    this.subscriptionResourceSerializer = new SubscriptionResourceSerializer();
    this.ruleResourceSerializer = new RuleResourceSerializer();
  }

  /**
   * Returns an object representing the metadata related to a service bus namespace.
   * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
   *
   */
  async getNamespaceProperties(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<NamespaceProperties>> {
    logger.verbose(`Performing management operation - getNamespaceProperties()`);

    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getNamespaceProperties",
      operationOptions,
      async (updatedOptions) => {
        const response = await this.getResource(
          "$namespaceinfo",
          this.namespaceResourceSerializer,
          updatedOptions
        );
        return this.buildNamespacePropertiesResponse(response);
      }
    );
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
  async createQueue(
    queueName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: CreateQueueOptions = {}
  ): Promise<WithResponse<QueueProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.createQueue",
      options,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - createQueue() for "${queueName}" with options: %j`,
          options
        );
        const response = await this.putResource(
          queueName,
          buildQueueOptions(options || {}),
          this.queueResourceSerializer,
          false,
          updatedOptions
        );

        return this.buildQueueResponse(response);
      }
    );
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
  async getQueue(
    queueName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<QueueProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getQueue",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - getQueue() for "${queueName}"`);
        const response = await this.getResource(
          queueName,
          this.queueResourceSerializer,
          updatedOptions
        );

        return this.buildQueueResponse(response);
      }
    );
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
  async getQueueRuntimeProperties(
    queueName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<QueueRuntimeProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getQueueRuntimeProperties",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getQueueRuntimeProperties() for "${queueName}"`
        );
        const response = await this.getResource(
          queueName,
          this.queueResourceSerializer,
          updatedOptions
        );

        return this.buildQueueRuntimePropertiesResponse(response);
      }
    );
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
  private async getQueues(
    options: ListRequestOptions & OperationOptions = {}
  ): Promise<EntitiesResponse<QueueProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getQueues",
      options,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - getQueues() with options: %j`, options);
        const response = await this.listResources(
          "$Resources/Queues",
          updatedOptions,
          this.queueResourceSerializer
        );

        return this.buildListQueuesResponse(response);
      }
    );
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
        ...options,
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
   * @returns An asyncIterableIterator that supports paging.
   */
  public listQueues(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<QueueProperties, EntitiesResponse<QueueProperties>> {
    logger.verbose(`Performing management operation - listQueues() with options: %j`, options);
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
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listQueuesPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
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
  private async getQueuesRuntimeProperties(
    options: ListRequestOptions & OperationOptions = {}
  ): Promise<EntitiesResponse<QueueRuntimeProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getQueuesRuntimeProperties",
      options,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getQueuesRuntimeProperties() with options: %j`,
          options
        );
        const response = await this.listResources(
          "$Resources/Queues",
          updatedOptions,
          this.queueResourceSerializer
        );

        return this.buildListQueuesRuntimePropertiesResponse(response);
      }
    );
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
        ...options,
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
   * @returns An asyncIterableIterator that supports paging.
   */
  public listQueuesRuntimeProperties(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<QueueRuntimeProperties, EntitiesResponse<QueueRuntimeProperties>> {
    logger.verbose(
      `Performing management operation - listQueuesRuntimeProperties() with options: %j`,
      options
    );
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
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listQueuesRuntimePropertiesPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
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
  async updateQueue(
    queue: WithResponse<QueueProperties>,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<QueueProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.updateQueue",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - updateQueue() for "${queue.name}" with options: %j`,
          queue
        );

        if (!isJSONLikeObject(queue) || queue == null) {
          throw new TypeError(
            `Parameter "queue" must be an object of type "QueueDescription" and cannot be undefined or null.`
          );
        }

        if (!queue.name) {
          throw new TypeError(`"name" attribute of the parameter "queue" cannot be undefined.`);
        }

        const response = await this.putResource(
          queue.name,
          buildQueueOptions(queue),
          this.queueResourceSerializer,
          true,
          updatedOptions
        );

        return this.buildQueueResponse(response);
      }
    );
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
  async deleteQueue(
    queueName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<WithResponse<{}>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.deleteQueue",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - deleteQueue() for "${queueName}"`);
        const response = await this.deleteResource(
          queueName,
          this.queueResourceSerializer,
          updatedOptions
        );

        return { _response: getHttpResponseOnly(response) };
      }
    );
  }

  /**
   * Checks whether a given queue exists or not.
   * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  async queueExists(queueName: string, operationOptions: OperationOptions = {}): Promise<boolean> {
    logger.verbose(`Performing management operation - queueExists() for "${queueName}"`);
    const { span, updatedOptions } = tracingClient.startSpan(
      "ServiceBusAdministrationClient.queueExists",
      operationOptions
    );
    try {
      await this.getQueue(queueName, updatedOptions);
      span.setStatus({ status: "success" });
      return true;
    } catch (e: any) {
      span.setStatus({ status: "error", error: e });
      return false;
    } finally {
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
  async createTopic(
    topicName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: CreateTopicOptions = {}
  ): Promise<WithResponse<TopicProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.createTopic",
      options,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - createTopic() for "${topicName}" with options: %j`,
          options
        );
        const response = await this.putResource(
          topicName,
          buildTopicOptions(options || {}),
          this.topicResourceSerializer,
          false,
          updatedOptions
        );

        return this.buildTopicResponse(response);
      }
    );
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
  async getTopic(
    topicName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<TopicProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getTopic",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - getTopic() for "${topicName}"`);
        const response = await this.getResource(
          topicName,
          this.topicResourceSerializer,
          updatedOptions
        );

        return this.buildTopicResponse(response);
      }
    );
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
  async getTopicRuntimeProperties(
    topicName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<TopicRuntimeProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getTopicRuntimeProperties",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getTopicRuntimeProperties() for "${topicName}"`
        );
        const response = await this.getResource(
          topicName,
          this.topicResourceSerializer,
          updatedOptions
        );

        return this.buildTopicRuntimePropertiesResponse(response);
      }
    );
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
  private async getTopics(
    options: ListRequestOptions & OperationOptions = {}
  ): Promise<EntitiesResponse<TopicProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getTopics",
      options,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - getTopics() with options: %j`, options);
        const response = await this.listResources(
          "$Resources/Topics",
          updatedOptions,
          this.topicResourceSerializer
        );

        return this.buildListTopicsResponse(response);
      }
    );
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
        ...options,
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
   * @returns An asyncIterableIterator that supports paging.
   */
  public listTopics(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<TopicProperties, EntitiesResponse<TopicProperties>> {
    logger.verbose(`Performing management operation - listTopics() with options: %j`, options);
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
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listTopicsPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
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
  private async getTopicsRuntimeProperties(
    options: ListRequestOptions & OperationOptions = {}
  ): Promise<EntitiesResponse<TopicRuntimeProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getTopicsRuntimeProperties",

      options,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getTopicsRuntimeProperties() with options: %j`,
          options
        );
        const response = await this.listResources(
          "$Resources/Topics",
          updatedOptions,
          this.topicResourceSerializer
        );

        return this.buildListTopicsRuntimePropertiesResponse(response);
      }
    );
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
        ...options,
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
   * @returns An asyncIterableIterator that supports paging.
   */
  public listTopicsRuntimeProperties(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<TopicRuntimeProperties, EntitiesResponse<TopicRuntimeProperties>> {
    logger.verbose(
      `Performing management operation - listTopicsRuntimeProperties() with options: %j`,
      options
    );
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
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listTopicsRuntimePropertiesPage(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
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
  async updateTopic(
    topic: WithResponse<TopicProperties>,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<TopicProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.updateTopic",

      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - updateTopic() for "${topic.name}" with options: %j`,
          topic
        );

        if (!isJSONLikeObject(topic) || topic == null) {
          throw new TypeError(
            `Parameter "topic" must be an object of type "TopicDescription" and cannot be undefined or null.`
          );
        }

        if (!topic.name) {
          throw new TypeError(`"name" attribute of the parameter "topic" cannot be undefined.`);
        }

        const response = await this.putResource(
          topic.name,
          buildTopicOptions(topic),
          this.topicResourceSerializer,
          true,
          updatedOptions
        );

        return this.buildTopicResponse(response);
      }
    );
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
  async deleteTopic(
    topicName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<WithResponse<{}>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.deleteTopic",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - deleteTopic() for "${topicName}"`);
        const response = await this.deleteResource(
          topicName,
          this.topicResourceSerializer,
          updatedOptions
        );

        return { _response: getHttpResponseOnly(response) };
      }
    );
  }

  /**
   * Checks whether a given topic exists or not.
   * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  async topicExists(topicName: string, operationOptions?: OperationOptions): Promise<boolean> {
    logger.verbose(`Performing management operation - topicExists() for "${topicName}"`);
    const { span, updatedOptions } = tracingClient.startSpan(
      "ServiceBusAdministrationClient.topicExists",
      operationOptions
    );
    try {
      span.setStatus({ status: "success" });
      await this.getTopic(topicName, updatedOptions);
      return true;
    } catch (e: any) {
      span.setStatus({ status: "error", error: e });
      return false;
    } finally {
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
  async createSubscription(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: CreateSubscriptionOptions = {}
  ): Promise<WithResponse<SubscriptionProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.createSubscription",
      options,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - createSubscription() for "${subscriptionName}" with options: %j`,
          options
        );
        const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
        const response = await this.putResource(
          fullPath,
          buildSubscriptionOptions(options || {}),
          this.subscriptionResourceSerializer,
          false,
          updatedOptions
        );

        return this.buildSubscriptionResponse(response);
      }
    );
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
  async getSubscription(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<SubscriptionProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getSubscription",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getSubscription() for "${subscriptionName}"`
        );
        const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
        const response = await this.getResource(
          fullPath,
          this.subscriptionResourceSerializer,
          updatedOptions
        );

        return this.buildSubscriptionResponse(response);
      }
    );
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
  async getSubscriptionRuntimeProperties(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<SubscriptionRuntimeProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getSubscriptionRuntimeProperties",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getSubscriptionRuntimeProperties() for "${subscriptionName}"`
        );
        const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
        const response = await this.getResource(
          fullPath,
          this.subscriptionResourceSerializer,
          updatedOptions
        );

        return this.buildSubscriptionRuntimePropertiesResponse(response);
      }
    );
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
  private async getSubscriptions(
    topicName: string,
    options: ListRequestOptions & OperationOptions = {}
  ): Promise<EntitiesResponse<SubscriptionProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getSubscriptions",
      options,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getSubscriptions() with options: %j`,
          options
        );
        const response = await this.listResources(
          topicName + "/Subscriptions/",
          updatedOptions,
          this.subscriptionResourceSerializer
        );

        return this.buildListSubscriptionsResponse(response);
      }
    );
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
        ...options,
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
   * @returns An asyncIterableIterator that supports paging.
   */
  public listSubscriptions(
    topicName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<SubscriptionProperties, EntitiesResponse<SubscriptionProperties>> {
    logger.verbose(
      `Performing management operation - listSubscriptions() with options: %j`,
      options
    );
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
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listSubscriptionsPage(topicName, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
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
  private async getSubscriptionsRuntimeProperties(
    topicName: string,
    options: ListRequestOptions & OperationOptions = {}
  ): Promise<EntitiesResponse<SubscriptionRuntimeProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getSubscriptionsRuntimeProperties",
      options,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - getSubscriptionsRuntimeProperties() with options: %j`,
          options
        );
        const response = await this.listResources(
          topicName + "/Subscriptions/",
          updatedOptions,
          this.subscriptionResourceSerializer
        );

        return this.buildListSubscriptionsRuntimePropertiesResponse(response);
      }
    );
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
        ...options,
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
   * @returns An asyncIterableIterator that supports paging.
   */
  public listSubscriptionsRuntimeProperties(
    topicName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<
    SubscriptionRuntimeProperties,
    EntitiesResponse<SubscriptionRuntimeProperties>
  > {
    logger.verbose(
      `Performing management operation - listSubscriptionsRuntimeProperties() with options: %j`,
      options
    );
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
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listSubscriptionsRuntimePropertiesPage(topicName, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
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
  async updateSubscription(
    subscription: WithResponse<SubscriptionProperties>,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<SubscriptionProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.updateSubscription",

      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - updateSubscription() for "${subscription.subscriptionName}" with options: %j`,
          subscription
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

        const response = await this.putResource(
          fullPath,
          buildSubscriptionOptions(subscription),
          this.subscriptionResourceSerializer,
          true,
          updatedOptions
        );

        return this.buildSubscriptionResponse(response);
      }
    );
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
  async deleteSubscription(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<WithResponse<{}>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.deleteSubscription",

      operationOptions,
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - deleteSubscription() for "${subscriptionName}"`
        );
        const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
        const response = await this.deleteResource(
          fullPath,
          this.subscriptionResourceSerializer,
          updatedOptions
        );

        return { _response: getHttpResponseOnly(response) };
      }
    );
  }

  /**
   * Checks whether a given subscription exists in the topic or not.
   * @param operationOptions - The options that can be used to abort, trace and control other configurations on the HTTP request.
   */
  async subscriptionExists(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<boolean> {
    logger.verbose(
      `Performing management operation - subscriptionExists() for "${topicName}" and "${subscriptionName}"`
    );
    const { span, updatedOptions } = tracingClient.startSpan(
      "ServiceBusAdministrationClient.subscriptionExists",
      operationOptions
    );
    try {
      span.setStatus({ status: "success" });
      await this.getSubscription(topicName, subscriptionName, updatedOptions);
      return true;
    } catch (e: any) {
      span.setStatus({ status: "error", error: e });
      return false;
    } finally {
      span.end();
    }
  }

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
  createRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    ruleFilter: SqlRuleFilter | CorrelationRuleFilter,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions?: OperationOptions
  ): Promise<WithResponse<RuleProperties>>;
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
  createRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    ruleFilter: SqlRuleFilter | CorrelationRuleFilter,
    ruleAction: SqlRuleAction,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions?: OperationOptions
  ): Promise<WithResponse<RuleProperties>>;
  async createRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    ruleFilter: SqlRuleFilter | CorrelationRuleFilter,
    ruleActionOrOperationOptions?: SqlRuleAction | OperationOptions,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions?: OperationOptions
  ): Promise<WithResponse<RuleProperties>> {
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

    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.createRule",
      operOptions ?? {},
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - createRule() for "${ruleName}" with filter: "%j"`,
          ruleFilter
        );
        const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
        const response = await this.putResource(
          fullPath,
          { name: ruleName, filter: ruleFilter, action: ruleAction },
          this.ruleResourceSerializer,
          false,
          updatedOptions
        );
        return this.buildRuleResponse(response);
      }
    );
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
  async getRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<WithResponse<RuleProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getRule",
      operationOptions,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - getRule() for "${ruleName}"`);
        const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
        const response = await this.getResource(
          fullPath,
          this.ruleResourceSerializer,
          updatedOptions
        );

        return this.buildRuleResponse(response);
      }
    );
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
  private async getRules(
    topicName: string,
    subscriptionName: string,
    options: ListRequestOptions & OperationOptions = {}
  ): Promise<EntitiesResponse<RuleProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getRules",

      options,
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - getRules() with options: %j`, options);
        const fullPath = this.getSubscriptionPath(topicName, subscriptionName) + "/Rules/";
        const response = await this.listResources(
          fullPath,
          updatedOptions,
          this.ruleResourceSerializer
        );

        return this.buildListRulesResponse(response);
      }
    );
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
        ...options,
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
   * @returns An asyncIterableIterator that supports paging.
   */
  public listRules(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<RuleProperties, EntitiesResponse<RuleProperties>> {
    logger.verbose(`Performing management operation - listRules() with options: %j`, options);
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
      byPage: (settings: PageSettings = {}) => {
        this.throwIfInvalidContinuationToken(settings.continuationToken);
        return this.listRulesPage(topicName, subscriptionName, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
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
  async updateRule(
    topicName: string,
    subscriptionName: string,
    rule: WithResponse<RuleProperties>,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions?: OperationOptions
  ): Promise<WithResponse<RuleProperties>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.updateRule",
      operationOptions ?? {},
      async (updatedOptions) => {
        logger.verbose(
          `Performing management operation - updateRule() for "${rule.name}" with options: %j`,
          rule
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
        const response = await this.putResource(
          fullPath,
          rule,
          this.ruleResourceSerializer,
          true,
          updatedOptions
        );

        return this.buildRuleResponse(response);
      }
    );
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
  async deleteRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions?: OperationOptions
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<WithResponse<{}>> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.deleteRule",
      operationOptions ?? {},
      async (updatedOptions) => {
        logger.verbose(`Performing management operation - deleteRule() for "${ruleName}"`);
        const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
        const response = await this.deleteResource(
          fullPath,
          this.ruleResourceSerializer,
          updatedOptions
        );

        return { _response: getHttpResponseOnly(response) };
      }
    );
  }

  /**
   * Checks whether a given rule exists or not.
   *
   */
  async ruleExists(
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    operationOptions: OperationOptions = {}
  ): Promise<boolean> {
    logger.verbose(`Performing management operation - ruleExists() for "${ruleName}"`);
    const { span, updatedOptions } = tracingClient.startSpan(
      "ServiceBusAdministrationClient.ruleExists",
      operationOptions
    );
    try {
      span.setStatus({ status: "success" });
      await this.getRule(topicName, subscriptionName, ruleName, updatedOptions);
      return true;
    } catch (e: any) {
      span.setStatus({ status: "error", error: e });
      return false;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a resource based on `isUpdate` parameter.
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
  ): Promise<PipelineResponse> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.putResource",
      operationOptions,
      async (updatedOptions) => {
        const request: PipelineRequest = createPipelineRequest({
          url: this.getUrl(name),
          method: "PUT",
        });
        if (isUpdate) {
          request.headers.set("If-Match", "*");
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
            request.headers.set("ServiceBusSupplementaryAuthorization", token);
            if (!isAbsoluteUrl(queueOrSubscriptionFields.ForwardTo)) {
              queueOrSubscriptionFields.ForwardTo = this.endpointWithProtocol.concat(
                queueOrSubscriptionFields.ForwardTo
              );
            }
          }
          if (queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo) {
            request.headers.set("ServiceBusDlqSupplementaryAuthorization", token);
            if (!isAbsoluteUrl(queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo)) {
              queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo =
                this.endpointWithProtocol.concat(
                  queueOrSubscriptionFields.ForwardDeadLetteredMessagesTo
                );
            }
          }
        }

        request.headers.set("content-type", "application/atom+xml;type=entry;charset=utf-8");

        return executeAtomXmlOperation(this, request, serializer, updatedOptions, entityFields);
      }
    );
  }

  /**
   * Gets a resource.
   */
  private async getResource(
    name: string,
    serializer: AtomXmlSerializer,
    operationOptions: OperationOptions = {}
  ): Promise<FullOperationResponse> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.getResource",
      operationOptions,
      async (updatedOptions) => {
        const request = createPipelineRequest({
          url: this.getUrl(name),
          method: "GET",
        });

        const response = await executeAtomXmlOperation(this, request, serializer, updatedOptions);
        if (
          !isDefined(response.parsedBody) ||
          (Array.isArray(response.parsedBody) && response.parsedBody.length === 0)
        ) {
          const err = new RestError(
            `The messaging entity "${name}" being requested cannot be found.`,
            {
              code: "MessageEntityNotFoundError",
              statusCode: response.status,
              request,
              response,
            }
          );
          throw err;
        }
        return response;
      }
    );
  }

  /**
   * Lists existing resources
   */
  private async listResources(
    name: string,
    options: ListRequestOptions & OperationOptions = {},
    serializer: AtomXmlSerializer
  ): Promise<FullOperationResponse> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.listResources",
      options,
      async (updatedOptions) => {
        const queryParams: { [key: string]: string } = {};
        if (options) {
          if (options.skip) {
            queryParams["$skip"] = options.skip.toString();
          }
          if (options.maxCount) {
            queryParams["$top"] = options.maxCount.toString();
          }
        }

        const request = createPipelineRequest({
          url: this.getUrl(name, queryParams),
          method: "GET",
        });

        return executeAtomXmlOperation(this, request, serializer, updatedOptions);
      }
    );
  }

  /**
   * Deletes a resource.
   */
  private async deleteResource(
    name: string,
    serializer: AtomXmlSerializer,
    operationOptions: OperationOptions = {}
  ): Promise<FullOperationResponse> {
    return tracingClient.withSpan(
      "ServiceBusAdministrationClient.deleteResource",
      operationOptions,
      async (updatedOptions) => {
        const request = createPipelineRequest({
          url: this.getUrl(name),
          method: "DELETE",
        });
        return executeAtomXmlOperation(this, request, serializer, updatedOptions);
      }
    );
  }

  private getUrl(path: string, queryParams?: { [key: string]: string }): string {
    const baseUri = `https://${this.endpoint}/${path}`;

    const requestUrl = new URL(baseUri);
    requestUrl.searchParams.set(Constants.API_VERSION_QUERY_KEY, this.serviceVersion);

    if (queryParams) {
      for (const key of Object.keys(queryParams)) {
        requestUrl.searchParams.set(key, queryParams[key]);
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
      const value = parseURL(url).searchParams.get(Constants.XML_METADATA_MARKER + "skip");
      return value !== null ? value : undefined;
    } catch (error: any) {
      throw new Error(
        `Unable to parse the '${Constants.XML_METADATA_MARKER}skip' from the next-link in the response ` +
          error
      );
    }
  }

  private buildNamespacePropertiesResponse(
    response: FullOperationResponse
  ): WithResponse<NamespaceProperties> {
    try {
      const namespace = buildNamespace(response.parsedBody);
      const namespaceResponse: WithResponse<NamespaceProperties> = Object.defineProperty(
        namespace || {},
        "_response",
        { value: getHttpResponseOnly(response) }
      ) as WithResponse<NamespaceProperties>;
      return namespaceResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a namespace object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildListQueuesResponse(
    response: FullOperationResponse
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
      const listQueuesResponse: EntitiesResponse<QueueProperties> = Object.defineProperty(
        queues,
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as EntitiesResponse<QueueProperties>;
      listQueuesResponse.continuationToken = nextMarker;
      return listQueuesResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of queues using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildListQueuesRuntimePropertiesResponse(
    response: FullOperationResponse
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
      const listQueuesResponse: EntitiesResponse<QueueRuntimeProperties> = Object.defineProperty(
        queues,
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as EntitiesResponse<QueueRuntimeProperties>;
      listQueuesResponse.continuationToken = nextMarker;
      return listQueuesResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of queues using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildQueueResponse(response: FullOperationResponse): WithResponse<QueueProperties> {
    try {
      const queue = buildQueue(response.parsedBody);
      const queueResponse: WithResponse<QueueProperties> = Object.defineProperty(
        queue || {},
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as WithResponse<QueueProperties>;
      return queueResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a queue object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildQueueRuntimePropertiesResponse(
    response: FullOperationResponse
  ): WithResponse<QueueRuntimeProperties> {
    try {
      const queue = buildQueueRuntimeProperties(response.parsedBody);
      const queueResponse: WithResponse<QueueRuntimeProperties> = Object.defineProperty(
        queue || {},
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as WithResponse<QueueRuntimeProperties>;
      return queueResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a queue object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildListTopicsResponse(
    response: FullOperationResponse
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
      const listTopicsResponse: EntitiesResponse<TopicProperties> = Object.defineProperty(
        topics,
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as EntitiesResponse<TopicProperties>;
      listTopicsResponse.continuationToken = nextMarker;
      return listTopicsResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of topics using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildListTopicsRuntimePropertiesResponse(
    response: FullOperationResponse
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
      const listTopicsResponse: EntitiesResponse<TopicRuntimeProperties> = Object.defineProperty(
        topics,
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as EntitiesResponse<TopicRuntimeProperties>;
      listTopicsResponse.continuationToken = nextMarker;
      return listTopicsResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of topics using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }
  private buildTopicResponse(response: FullOperationResponse): WithResponse<TopicProperties> {
    try {
      const topic = buildTopic(response.parsedBody);
      const topicResponse: WithResponse<TopicProperties> = Object.defineProperty(
        topic || {},
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as WithResponse<TopicProperties>;
      return topicResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a topic object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildTopicRuntimePropertiesResponse(
    response: FullOperationResponse
  ): WithResponse<TopicRuntimeProperties> {
    try {
      const topic = buildTopicRuntimeProperties(response.parsedBody);
      const topicResponse: WithResponse<TopicRuntimeProperties> = Object.defineProperty(
        topic || {},
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as WithResponse<TopicRuntimeProperties>;
      return topicResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a topic object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildListSubscriptionsResponse(
    response: FullOperationResponse
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
      const listSubscriptionsResponse: EntitiesResponse<SubscriptionProperties> =
        Object.defineProperty(subscriptions, "_response", {
          value: getHttpResponseOnly(response),
        }) as EntitiesResponse<SubscriptionProperties>;
      listSubscriptionsResponse.continuationToken = nextMarker;
      return listSubscriptionsResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of subscriptions using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildListSubscriptionsRuntimePropertiesResponse(
    response: FullOperationResponse
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
      const listSubscriptionsResponse: EntitiesResponse<SubscriptionRuntimeProperties> =
        Object.defineProperty(subscriptions, "_response", {
          value: getHttpResponseOnly(response),
        }) as EntitiesResponse<SubscriptionRuntimeProperties>;
      listSubscriptionsResponse.continuationToken = nextMarker;
      return listSubscriptionsResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of subscriptions using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildSubscriptionResponse(
    response: FullOperationResponse
  ): WithResponse<SubscriptionProperties> {
    try {
      const subscription = buildSubscription(response.parsedBody);
      const subscriptionResponse: WithResponse<SubscriptionProperties> = Object.defineProperty(
        subscription || {},
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as WithResponse<SubscriptionProperties>;
      return subscriptionResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a subscription object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildSubscriptionRuntimePropertiesResponse(
    response: FullOperationResponse
  ): WithResponse<SubscriptionRuntimeProperties> {
    try {
      const subscription = buildSubscriptionRuntimeProperties(response.parsedBody);
      const subscriptionResponse: WithResponse<SubscriptionRuntimeProperties> =
        Object.defineProperty(subscription || {}, "_response", {
          value: getHttpResponseOnly(response),
        }) as WithResponse<SubscriptionRuntimeProperties>;
      return subscriptionResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a subscription object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildListRulesResponse(
    response: FullOperationResponse
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
      const listRulesResponse: EntitiesResponse<RuleProperties> = Object.defineProperty(
        rules,
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as EntitiesResponse<RuleProperties>;
      listRulesResponse.continuationToken = nextMarker;
      return listRulesResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a list of rules using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private buildRuleResponse(response: FullOperationResponse): WithResponse<RuleProperties> {
    try {
      const rule = buildRule(response.parsedBody);
      const ruleResponse: WithResponse<RuleProperties> = Object.defineProperty(
        rule || {},
        "_response",
        {
          value: getHttpResponseOnly(response),
        }
      ) as WithResponse<RuleProperties>;
      return ruleResponse;
    } catch (err: any) {
      logger.logError(err, "Failure parsing response from service");
      throw new RestError(
        `Error occurred while parsing the response body - cannot form a rule object using the response from the service.`,
        {
          code: RestError.PARSE_ERROR,
          statusCode: response.status,
          request: response.request,
          response,
        }
      );
    }
  }

  private throwIfInvalidContinuationToken(token: string | undefined): void {
    if (!(token === undefined || (typeof token === "string" && Number(token) >= 0))) {
      throw new Error(`Invalid continuationToken ${token} provided`);
    }
  }
}
