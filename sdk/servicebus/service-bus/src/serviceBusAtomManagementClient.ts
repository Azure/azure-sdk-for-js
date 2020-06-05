// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isTokenCredential,
  parseConnectionString,
  SharedKeyCredential,
  TokenCredential
} from "@azure/core-amqp";
import {
  HttpOperationResponse,
  proxyPolicy,
  ProxySettings,
  RequestPolicyFactory,
  RestError,
  ServiceClient,
  ServiceClientOptions,
  signingPolicy,
  stripRequest,
  stripResponse,
  URLBuilder,
  WebResource,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";
import * as log from "./log";
import {
  buildNamespace,
  NamespaceProperties,
  NamespaceResourceSerializer
} from "./serializers/namespaceResourceSerializer";
import {
  buildQueue,
  buildQueueOptions,
  buildQueueRuntimeInfo,
  InternalQueueOptions,
  QueueDescription,
  QueueResourceSerializer,
  QueueRuntimeInfo
} from "./serializers/queueResourceSerializer";
import {
  buildRule,
  RuleDescription,
  RuleResourceSerializer
} from "./serializers/ruleResourceSerializer";
import {
  buildSubscription,
  buildSubscriptionOptions,
  buildSubscriptionRuntimeInfo,
  InternalSubscriptionOptions,
  SubscriptionDescription,
  SubscriptionResourceSerializer,
  SubscriptionRuntimeInfo
} from "./serializers/subscriptionResourceSerializer";
import {
  buildTopic,
  buildTopicOptions,
  buildTopicRuntimeInfo,
  InternalTopicOptions,
  TopicDescription,
  TopicResourceSerializer,
  TopicRuntimeInfo
} from "./serializers/topicResourceSerializer";
import { AtomXmlSerializer, executeAtomXmlOperation } from "./util/atomXmlHelper";
import * as Constants from "./util/constants";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import { isAbsoluteUrl, isJSONLikeObject } from "./util/utils";
import { Constants as AMQPConstants } from "@azure/core-amqp";
/**
 * Options to use with ServiceBusManagementClient creation
 */
export interface ServiceBusManagementClientOptions {
  /**
   * Proxy related settings
   */
  proxySettings?: ProxySettings;
}

/**
 * Request options for list<entity-type>() operations
 */
export interface ListRequestOptions {
  /**
   * Count of entities to fetch.
   */
  top?: number;

  /**
   * Count of entities to skip from being fetched.
   */
  skip?: number;
}
/**
 * Represents properties of the namespace.
 */
export interface NamespaceResponse extends NamespaceProperties {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}
/**
 * Represents properties of the namespace.
 */
export type GetNamespaceResponse = NamespaceResponse;

/**
 * Represents result of create, get, update and delete operations on queue.
 */
export interface GetQueueRuntimeInfoResponse extends QueueRuntimeInfo {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on queue.
 */
export interface GetQueuesRuntimeInfoResponse extends Array<QueueRuntimeInfo> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on queue.
 */
export interface QueueResponse extends QueueDescription {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Create Queue response
 */
export type CreateQueueResponse = QueueResponse;

/**
 * Get Queue response
 */
export type GetQueueResponse = QueueResponse;

/**
 * Update Queue response
 */
export type UpdateQueueResponse = QueueResponse;

/**
 * Delete Queue response
 */
export interface DeleteQueueResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of list operation on queues.
 */
export interface GetQueuesResponse extends Array<QueueDescription> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on topic.
 */
export interface TopicResponse extends TopicDescription {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Create Topic response
 */
export type CreateTopicResponse = TopicResponse;

/**
 * Get Topic response
 */
export type GetTopicResponse = TopicResponse;
/**
 * Update Topic response
 */
export type UpdateTopicResponse = TopicResponse;

/**
 * Delete Topic response
 */
export interface DeleteTopicResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of list operation on topics.
 */
export interface GetTopicsResponse extends Array<TopicDescription> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on topic.
 */
export interface GetTopicRuntimeInfoResponse extends TopicRuntimeInfo {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on topic.
 */
export interface GetTopicsRuntimeInfoResponse extends Array<TopicRuntimeInfo> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on subscription.
 */
export interface SubscriptionResponse extends SubscriptionDescription {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Create Subscription response
 */
export type CreateSubscriptionResponse = SubscriptionResponse;

/**
 * Get Subscription response
 */
export type GetSubscriptionResponse = SubscriptionResponse;

/**
 * Update Subscription response
 */
export type UpdateSubscriptionResponse = SubscriptionResponse;

/**
 * Delete Subscription response
 */
export interface DeleteSubscriptionResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of list operation on subscriptions.
 */
export interface GetSubscriptionsResponse extends Array<SubscriptionDescription> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on topic.
 */
export interface GetSubscriptionRuntimeInfoResponse extends SubscriptionRuntimeInfo {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on topic.
 */
export interface GetSubscriptionsRuntimeInfoResponse extends Array<SubscriptionRuntimeInfo> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on rule.
 */
export interface RuleResponse extends RuleDescription {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Create Rule response
 */
export type CreateRuleResponse = RuleResponse;
/**
 * Get Rule response
 */
export type GetRuleResponse = RuleResponse;

/**
 * Update Rule response
 */
export type UpdateRuleResponse = RuleResponse;

/**
 * Delete Rule response
 */
export interface DeleteRuleResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of list operation on rules.
 */
export interface GetRulesResponse extends Array<RuleDescription> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

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
   * Token provider used to generate tokens as required for the various operations.
   */
  private tokenProvider: SharedKeyCredential | TokenCredential;

  /**
   * Initializes a new instance of the ServiceBusManagementClient class.
   * @param connectionString The connection string needed for the client to connect to Azure.
   * @param options ServiceBusManagementClientOptions
   */
  constructor(connectionString: string, options?: ServiceBusManagementClientOptions);
  /**
   *
   * @param fullyQualifiedNamespace The fully qualified namespace of your Service Bus instance which is
   * likely to be similar to <yournamespace>.servicebus.windows.net.
   * @param credential A credential object used by the client to get the token to authenticate the connection
   * with the Azure Service Bus. See &commat;azure/identity for creating the credentials.
   * If you're using your own implementation of the `TokenCredential` interface against AAD, then set the "scopes" for service-bus
   * to be `["https://servicebus.azure.net//user_impersonation"]` to get the appropriate token.
   * @param options ServiceBusManagementClientOptions
   */
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential,
    options?: ServiceBusManagementClientOptions
  );

  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    credentialOrOptions2?: TokenCredential | ServiceBusManagementClientOptions,
    options3?: ServiceBusManagementClientOptions
  ) {
    if (isTokenCredential(credentialOrOptions2)) {
      const fullyQualifiedNamespace = fullyQualifiedNamespaceOrConnectionString1;
      const credential = credentialOrOptions2;
      const requestPolicyFactories: RequestPolicyFactory[] = [];
      if (options3 && options3.proxySettings) {
        requestPolicyFactories.push(proxyPolicy(options3.proxySettings));
      }
      requestPolicyFactories.push(
        bearerTokenAuthenticationPolicy(credential, AMQPConstants.aadServiceBusScope)
      );
      const serviceClientOptions: ServiceClientOptions = {
        requestPolicyFactories: requestPolicyFactories
      };
      super(credential, serviceClientOptions);
      this.tokenProvider = credential;
      this.endpoint = fullyQualifiedNamespace;
      this.endpointWithProtocol = "sb://" + fullyQualifiedNamespace;
    } else {
      const connectionString = fullyQualifiedNamespaceOrConnectionString1;
      const options = credentialOrOptions2;
      const connectionStringObj: any = parseConnectionString(connectionString);

      if (connectionStringObj.Endpoint == undefined) {
        throw new Error("Missing Endpoint in connection string.");
      }

      const credentials = new SasServiceClientCredentials(
        connectionStringObj.SharedAccessKeyName,
        connectionStringObj.SharedAccessKey
      );

      const requestPolicyFactories: RequestPolicyFactory[] = [];
      requestPolicyFactories.push(signingPolicy(credentials));

      if (options && options.proxySettings) {
        requestPolicyFactories.push(proxyPolicy(options.proxySettings));
      }
      const serviceClientOptions: ServiceClientOptions = {
        requestPolicyFactories: requestPolicyFactories
      };

      super(credentials, serviceClientOptions);
      this.endpoint = (connectionString.match("Endpoint=.*://(.*)/;") || "")[1];
      this.endpointWithProtocol = connectionStringObj.Endpoint;

      this.tokenProvider = new SharedKeyCredential(
        connectionStringObj.SharedAccessKeyName,
        connectionStringObj.SharedAccessKey
      );
    }
    this.namespaceResourceSerializer = new NamespaceResourceSerializer();
    this.queueResourceSerializer = new QueueResourceSerializer();
    this.topicResourceSerializer = new TopicResourceSerializer();
    this.subscriptionResourceSerializer = new SubscriptionResourceSerializer();
    this.ruleResourceSerializer = new RuleResourceSerializer();
  }

  /**
   * Returns an object representing the metadata related to a service bus namespace.
   * @param queueName
   *
   */
  async getNamespaceProperties(): Promise<GetNamespaceResponse> {
    log.httpAtomXml(`Performing management operation - getNamespaceProperties()`);
    const response: HttpOperationResponse = await this.getResource(
      "$namespaceinfo",
      this.namespaceResourceSerializer
    );

    return this.buildNamespaceResponse(response);
  }

  /**
   * Creates a queue with given name, configured using the given options
   * @param queueName
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
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createQueue(queueName: string): Promise<CreateQueueResponse>;
  /**
   * Creates a queue configured using the given options
   * @param queue Options to configure the Queue being created.
   * For example, you can configure a queue to support partitions or sessions.
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
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createQueue(queue: QueueDescription): Promise<CreateQueueResponse>;
  async createQueue(queueNameOrOptions: string | QueueDescription): Promise<CreateQueueResponse> {
    let queue: QueueDescription;
    if (typeof queueNameOrOptions === "string") {
      queue = { name: queueNameOrOptions };
    } else {
      queue = queueNameOrOptions;
    }
    log.httpAtomXml(
      `Performing management operation - createQueue() for "${queue.name}" with options: ${queue}`
    );
    const response: HttpOperationResponse = await this.putResource(
      queue.name,
      buildQueueOptions(queue),
      this.queueResourceSerializer,
      false
    );

    return this.buildQueueResponse(response);
  }

  /**
   * Returns an object representing the Queue and its properties.
   * If you want to get the Queue runtime info like message count details, use `getQueueRuntimeInfo` API.
   * @param queueName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getQueue(queueName: string): Promise<GetQueueResponse> {
    log.httpAtomXml(`Performing management operation - getQueue() for "${queueName}"`);
    const response: HttpOperationResponse = await this.getResource(
      queueName,
      this.queueResourceSerializer
    );

    return this.buildQueueResponse(response);
  }

  /**
   * Returns an object representing the Queue runtime info like message count details.
   * @param queueName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getQueueRuntimeInfo(queueName: string): Promise<GetQueueRuntimeInfoResponse> {
    log.httpAtomXml(`Performing management operation - getQueue() for "${queueName}"`);
    const response: HttpOperationResponse = await this.getResource(
      queueName,
      this.queueResourceSerializer
    );

    return this.buildQueueRuntimeInfoResponse(response);
  }

  /**
   * Returns a list of objects, each representing a Queue along with its properties.
   * If you want to get the runtime info of the queues like message count, use `getQueuesRuntimeInfo` API instead.
   * @param listRequestOptions
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getQueues(listRequestOptions?: ListRequestOptions): Promise<GetQueuesResponse> {
    log.httpAtomXml(
      `Performing management operation - listQueues() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this.listResources(
      "$Resources/Queues",
      listRequestOptions,
      this.queueResourceSerializer
    );

    return this.buildListQueuesResponse(response);
  }

  /**
   * Returns a list of objects, each representing a Queue's runtime info like message count details.
   * @param listRequestOptions
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getQueuesRuntimeInfo(
    listRequestOptions?: ListRequestOptions
  ): Promise<GetQueuesRuntimeInfoResponse> {
    log.httpAtomXml(
      `Performing management operation - listQueues() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this.listResources(
      "$Resources/Queues",
      listRequestOptions,
      this.queueResourceSerializer
    );

    return this.buildListQueuesRuntimeInfoResponse(response);
  }

  /**
   * Updates properties on the Queue by the given name based on the given options
   * @param queue Options to configure the Queue being updated.
   * For example, you can configure a queue to support partitions or sessions.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateQueue(queue: QueueDescription): Promise<UpdateQueueResponse> {
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

    const finalQueueOptions: QueueDescription = { name: queue.name };
    const getQueueResult = await this.getQueue(queue.name);
    Object.assign(finalQueueOptions, getQueueResult, queue);

    const response: HttpOperationResponse = await this.putResource(
      queue.name,
      buildQueueOptions(finalQueueOptions),
      this.queueResourceSerializer,
      true
    );

    return this.buildQueueResponse(response);
  }

  /**
   * Deletes a queue.
   * @param queueName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteQueue(queueName: string): Promise<DeleteQueueResponse> {
    log.httpAtomXml(`Performing management operation - deleteQueue() for "${queueName}"`);
    const response: HttpOperationResponse = await this.deleteResource(
      queueName,
      this.queueResourceSerializer
    );

    return { _response: response };
  }

  /**
   * Checks whether a given queue exists or not.
   * @param queueName
   */
  async queueExists(queueName: string): Promise<boolean> {
    log.httpAtomXml(`Performing management operation - queueExists() for "${queueName}"`);
    try {
      await this.getQueue(queueName);
    } catch (error) {
      if (error.code == "MessageEntityNotFoundError") {
        return false;
      }
      throw error;
    }
    return true;
  }

  /**
   * Creates a topic with given name, configured using the given options
   * @param topicName
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
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createTopic(topicName: string): Promise<CreateTopicResponse>;
  /**
   * Creates a topic with given name, configured using the given options
   * @param topic Options to configure the Topic being created.
   * For example, you can configure a topic to support partitions or sessions.
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
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createTopic(topic: TopicDescription): Promise<CreateTopicResponse>;
  async createTopic(topicNameOrOptions: string | TopicDescription): Promise<CreateTopicResponse> {
    let topic: TopicDescription;
    if (typeof topicNameOrOptions === "string") {
      topic = { name: topicNameOrOptions };
    } else {
      topic = topicNameOrOptions;
    }
    log.httpAtomXml(
      `Performing management operation - createTopic() for "${topic.name}" with options: ${topic}`
    );
    const response: HttpOperationResponse = await this.putResource(
      topic.name,
      buildTopicOptions(topic),
      this.topicResourceSerializer,
      false
    );

    return this.buildTopicResponse(response);
  }

  /**
   * Returns an object representing the Topic and its properties.
   * If you want to get the Topic runtime info like subscription count details, use `getTopicRuntimeInfo` API.
   * @param topicName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getTopic(topicName: string): Promise<GetTopicResponse> {
    log.httpAtomXml(`Performing management operation - getTopic() for "${topicName}"`);
    const response: HttpOperationResponse = await this.getResource(
      topicName,
      this.topicResourceSerializer
    );

    return this.buildTopicResponse(response);
  }

  /**
   * Returns an object representing the Topic runtime info like subscription count.
   * @param topicName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getTopicRuntimeInfo(topicName: string): Promise<GetTopicRuntimeInfoResponse> {
    log.httpAtomXml(`Performing management operation - getTopicRuntimeInfo() for "${topicName}"`);
    const response: HttpOperationResponse = await this.getResource(
      topicName,
      this.topicResourceSerializer
    );

    return this.buildTopicRuntimeInfoResponse(response);
  }

  /**
   * Returns a list of objects, each representing a Topic along with its properties.
   * If you want to get the runtime info of the topics like subscription count, use `getTopicsRuntimeInfo` API instead.
   * @param listRequestOptions
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getTopics(listRequestOptions?: ListRequestOptions): Promise<GetTopicsResponse> {
    log.httpAtomXml(
      `Performing management operation - listTopics() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this.listResources(
      "$Resources/Topics",
      listRequestOptions,
      this.topicResourceSerializer
    );

    return this.buildListTopicsResponse(response);
  }

  /**
   * Returns a list of objects, each representing a Topic's runtime info like subscription count.
   * @param listRequestOptions
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getTopicsRuntimeInfo(
    listRequestOptions?: ListRequestOptions
  ): Promise<GetTopicsRuntimeInfoResponse> {
    log.httpAtomXml(
      `Performing management operation - listTopics() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this.listResources(
      "$Resources/Topics",
      listRequestOptions,
      this.topicResourceSerializer
    );

    return this.buildListTopicsRuntimeInfoResponse(response);
  }

  /**
   * Updates properties on the Topic by the given name based on the given options
   * @param topic Options to configure the Topic being updated.
   * For example, you can configure a topic to support partitions or sessions.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateTopic(topic: TopicDescription): Promise<UpdateTopicResponse> {
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

    const finalTopicOptions: TopicDescription = { name: topic.name };
    const getTopicResult = await this.getTopic(topic.name);
    Object.assign(finalTopicOptions, getTopicResult, topic);

    const response: HttpOperationResponse = await this.putResource(
      topic.name,
      buildTopicOptions(finalTopicOptions),
      this.topicResourceSerializer,
      true
    );

    return this.buildTopicResponse(response);
  }

  /**
   * Deletes a topic.
   * @param topicName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteTopic(topicName: string): Promise<DeleteTopicResponse> {
    log.httpAtomXml(`Performing management operation - deleteTopic() for "${topicName}"`);
    const response: HttpOperationResponse = await this.deleteResource(
      topicName,
      this.topicResourceSerializer
    );

    return { _response: response };
  }

  /**
   * Checks whether a given topic exists or not.
   * @param topicName
   */
  async topicExists(topicName: string): Promise<boolean> {
    log.httpAtomXml(`Performing management operation - topicExists() for "${topicName}"`);
    try {
      await this.getTopic(topicName);
    } catch (error) {
      if (error.code == "MessageEntityNotFoundError") {
        return false;
      }
      throw error;
    }
    return true;
  }

  /**
   * Creates a subscription with given name, configured using the given options
   * @param topicName
   * @param subscriptionName
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
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createSubscription(
    topicName: string,
    subscriptionName: string
  ): Promise<CreateSubscriptionResponse>;

  /**
   * Creates a subscription with given name, configured using the given options
   * @param subscription Options to configure the Subscription being created.
   * For example, you can configure a Subscription to support partitions or sessions.
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
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createSubscription(
    subscription: SubscriptionDescription
  ): Promise<CreateSubscriptionResponse>;
  async createSubscription(
    topicNameOrSubscriptionOptions: string | SubscriptionDescription,
    subscriptionName?: string
  ): Promise<CreateSubscriptionResponse> {
    let subscription: SubscriptionDescription;
    if (typeof topicNameOrSubscriptionOptions === "string") {
      if (!subscriptionName) {
        throw new Error("Subscription name is not provided");
      }
      subscription = {
        topicName: topicNameOrSubscriptionOptions,
        subscriptionName: subscriptionName
      };
    } else {
      subscription = topicNameOrSubscriptionOptions;
    }
    log.httpAtomXml(
      `Performing management operation - createSubscription() for "${subscription.subscriptionName}" with options: ${subscription}`
    );
    const fullPath = this.getSubscriptionPath(
      subscription.topicName,
      subscription.subscriptionName
    );
    const response: HttpOperationResponse = await this.putResource(
      fullPath,
      buildSubscriptionOptions(subscription),
      this.subscriptionResourceSerializer,
      false
    );

    return this.buildSubscriptionResponse(response);
  }

  /**
   * Returns an object representing the Subscription and its properties.
   * If you want to get the Subscription runtime info like message count details, use `getSubscriptionRuntimeInfo` API.
   * @param topicName
   * @param subscriptionName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getSubscription(
    topicName: string,
    subscriptionName: string
  ): Promise<GetSubscriptionResponse> {
    log.httpAtomXml(
      `Performing management operation - getSubscription() for "${subscriptionName}"`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
    const response: HttpOperationResponse = await this.getResource(
      fullPath,
      this.subscriptionResourceSerializer
    );

    return this.buildSubscriptionRuntimeInfoResponse(response);
  }

  /**
   * Returns an object representing the Subscription runtime info like message count details.
   * @param topicName
   * @param subscriptionName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getSubscriptionRuntimeInfo(
    topicName: string,
    subscriptionName: string
  ): Promise<GetSubscriptionRuntimeInfoResponse> {
    log.httpAtomXml(
      `Performing management operation - getSubscription() for "${subscriptionName}"`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
    const response: HttpOperationResponse = await this.getResource(
      fullPath,
      this.subscriptionResourceSerializer
    );

    return this.buildSubscriptionRuntimeInfoResponse(response);
  }

  /**
   * Returns a list of objects, each representing a Subscription along with its properties.
   * If you want to get the runtime info of the subscriptions like message count, use `getSubscriptionsRuntimeInfo` API instead.
   * @param topicName
   * @param listRequestOptions
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getSubscriptions(
    topicName: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<GetSubscriptionsResponse> {
    log.httpAtomXml(
      `Performing management operation - listSubscriptions() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this.listResources(
      topicName + "/Subscriptions/",
      listRequestOptions,
      this.subscriptionResourceSerializer
    );

    return this.buildListSubscriptionsResponse(response);
  }

  /**
   * Returns a list of objects, each representing a Subscription's runtime info like message count details.
   * @param topicName
   * @param listRequestOptions
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getSubscriptionsRuntimeInfo(
    topicName: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<GetSubscriptionsRuntimeInfoResponse> {
    log.httpAtomXml(
      `Performing management operation - listSubscriptions() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this.listResources(
      topicName + "/Subscriptions/",
      listRequestOptions,
      this.subscriptionResourceSerializer
    );

    return this.buildListSubscriptionsRuntimeInfoResponse(response);
  }

  /**
   * Updates properties on the Subscription by the given name based on the given options
   * @param subscription Options to configure the Subscription being updated.
   * For example, you can configure a Subscription to support partitions or sessions.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateSubscription(
    subscription: SubscriptionDescription
  ): Promise<UpdateSubscriptionResponse> {
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

    const finalSubscriptionOptions: SubscriptionDescription = {
      topicName: subscription.topicName,
      subscriptionName: subscription.subscriptionName
    };
    const getSubscriptionResult = await this.getSubscription(
      subscription.topicName,
      subscription.subscriptionName
    );
    Object.assign(finalSubscriptionOptions, getSubscriptionResult, subscription);

    const response: HttpOperationResponse = await this.putResource(
      fullPath,
      buildSubscriptionOptions(finalSubscriptionOptions),
      this.subscriptionResourceSerializer,
      true
    );

    return this.buildSubscriptionResponse(response);
  }

  /**
   * Deletes a subscription.
   * @param topicName
   * @param subscriptionName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteSubscription(
    topicName: string,
    subscriptionName: string
  ): Promise<DeleteSubscriptionResponse> {
    log.httpAtomXml(
      `Performing management operation - deleteSubscription() for "${subscriptionName}"`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
    const response: HttpOperationResponse = await this.deleteResource(
      fullPath,
      this.subscriptionResourceSerializer
    );

    return { _response: response };
  }

  /**
   * Checks whether a given subscription exists in the topic or not.
   * @param topicName
   * @param subscriptionName
   *
   */
  async subscriptionExists(topicName: string, subscriptionName: string): Promise<boolean> {
    log.httpAtomXml(
      `Performing management operation - subscriptionExists() for "${topicName}" and "${subscriptionName}"`
    );
    try {
      await this.getSubscription(topicName, subscriptionName);
    } catch (error) {
      if (error.code == "MessageEntityNotFoundError") {
        return false;
      }
      throw error;
    }
    return true;
  }

  /**
   * Creates a rule with given name, configured using the given options.
   * @param topicName
   * @param subscriptionName
   * @param rule
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
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async createRule(
    topicName: string,
    subscriptionName: string,
    rule: RuleDescription
  ): Promise<CreateRuleResponse> {
    log.httpAtomXml(
      `Performing management operation - createRule() for "${rule.name}" with options: "${rule}"`
    );
    const fullPath = this.getRulePath(topicName, subscriptionName, rule.name);
    const response: HttpOperationResponse = await this.putResource(
      fullPath,
      rule,
      this.ruleResourceSerializer,
      false
    );
    return this.buildRuleResponse(response);
  }

  /**
   * Returns an object representing the Rule with the given name along with all its properties.
   * @param topicName
   * @param subscriptioName
   * @param ruleName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getRule(
    topicName: string,
    subscriptioName: string,
    ruleName: string
  ): Promise<GetRuleResponse> {
    log.httpAtomXml(`Performing management operation - getRule() for "${ruleName}"`);
    const fullPath = this.getRulePath(topicName, subscriptioName, ruleName);
    const response: HttpOperationResponse = await this.getResource(
      fullPath,
      this.ruleResourceSerializer
    );

    return this.buildRuleResponse(response);
  }

  /**
   * Lists existing rules.
   * @param topicName
   * @param subscriptionName
   * @param listRequestOptions
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async getRules(
    topicName: string,
    subscriptionName: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<GetRulesResponse> {
    log.httpAtomXml(
      `Performing management operation - listRules() with options: ${listRequestOptions}`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName) + "/Rules/";
    const response: HttpOperationResponse = await this.listResources(
      fullPath,
      listRequestOptions,
      this.ruleResourceSerializer
    );

    return this.buildListRulesResponse(response);
  }

  /**
   * Updates properties on the Rule by the given name based on the given options.
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param ruleOptions Options to configure the Rule being updated.
   * For example, you can configure the filter to apply on associated Topic/Subscription.
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async updateRule(
    topicName: string,
    subscriptionName: string,
    rule: RuleDescription
  ): Promise<UpdateRuleResponse> {
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
      true
    );

    return this.buildRuleResponse(response);
  }

  /**
   * Deletes a rule.
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   *
   * Following are errors that can be expected from this operation
   * @throws `RestError` with code `UnauthorizedRequestError` when given request fails due to authorization problems,
   * @throws `RestError` with code `MessageEntityNotFoundError` when requested messaging entity does not exist,
   * @throws `RestError` with code `InvalidOperationError` when requested operation is invalid and we encounter a 403 HTTP status code,
   * @throws `RestError` with code `ServerBusyError` when the request fails due to server being busy,
   * @throws `RestError` with code `ServiceError` when receiving unrecognized HTTP status or for a scenarios such as
   * bad requests or requests resulting in conflicting operation on the server,
   * @throws `RestError` with code that is a value from the standard set of HTTP status codes as documented at
   * https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
   */
  async deleteRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string
  ): Promise<DeleteRuleResponse> {
    log.httpAtomXml(`Performing management operation - deleteRule() for "${ruleName}"`);
    const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
    const response: HttpOperationResponse = await this.deleteResource(
      fullPath,
      this.ruleResourceSerializer
    );

    return { _response: response };
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
      | RuleDescription,
    serializer: AtomXmlSerializer,
    isUpdate: boolean = false
  ): Promise<HttpOperationResponse> {
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
        this.tokenProvider instanceof SharedKeyCredential
          ? this.tokenProvider.getToken(this.endpoint)!.token
          : (await this.tokenProvider.getToken([AMQPConstants.aadServiceBusScope]))!.token;

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

    return executeAtomXmlOperation(this, webResource, serializer);
  }

  /**
   * Gets a resource.
   * @param name
   * @param serializer
   */
  private async getResource(
    name: string,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const webResource: WebResource = new WebResource(this.getUrl(name), "GET");

    const response = await executeAtomXmlOperation(this, webResource, serializer);
    if (
      response.parsedBody == undefined ||
      (Array.isArray(response.parsedBody) && response.parsedBody.length == 0)
    ) {
      const err = new RestError(
        `The messaging entity "${name}" being requested cannot be found.`,
        "MessageEntityNotFoundError",
        404,
        stripRequest(webResource),
        stripResponse(response)
      );
      throw err;
    }
    return response;
  }

  /**
   * Lists existing resources
   * @param name
   * @param listRequestOptions
   * @param serializer
   */
  private async listResources(
    name: string,
    listRequestOptions: ListRequestOptions | undefined,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const queryParams: { [key: string]: string } = {};
    if (listRequestOptions) {
      if (listRequestOptions.skip) {
        queryParams["$skip"] = listRequestOptions.skip.toString();
      }
      if (listRequestOptions.top) {
        queryParams["$top"] = listRequestOptions.top.toString();
      }
    }

    const webResource: WebResource = new WebResource(this.getUrl(name, queryParams), "GET");

    return executeAtomXmlOperation(this, webResource, serializer);
  }

  /**
   * Deletes a resource.
   * @param name
   */
  private async deleteResource(
    name: string,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const webResource: WebResource = new WebResource(this.getUrl(name), "DELETE");

    return executeAtomXmlOperation(this, webResource, serializer);
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

  private buildNamespaceResponse(response: HttpOperationResponse): NamespaceResponse {
    try {
      const namespace = buildNamespace(response.parsedBody);
      const namespaceResponse: NamespaceResponse = Object.assign(namespace || {}, {
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

  private buildListQueuesResponse(response: HttpOperationResponse): GetQueuesResponse {
    try {
      const queues: QueueDescription[] = [];
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
      const listQueuesResponse: GetQueuesResponse = Object.assign(queues, {
        _response: response
      });
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

  private buildListQueuesRuntimeInfoResponse(
    response: HttpOperationResponse
  ): GetQueuesRuntimeInfoResponse {
    try {
      const queues: QueueRuntimeInfo[] = [];
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawQueueArray: any = response.parsedBody;
      for (let i = 0; i < rawQueueArray.length; i++) {
        const queue = buildQueueRuntimeInfo(rawQueueArray[i]);
        if (queue) {
          queues.push(queue);
        }
      }
      const listQueuesResponse: GetQueuesRuntimeInfoResponse = Object.assign(queues, {
        _response: response
      });
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

  private buildQueueRuntimeInfoResponse(
    response: HttpOperationResponse
  ): GetQueueRuntimeInfoResponse {
    try {
      const queue = buildQueueRuntimeInfo(response.parsedBody);
      const queueResponse: GetQueueRuntimeInfoResponse = Object.assign(queue || {}, {
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

  private buildListTopicsResponse(response: HttpOperationResponse): GetTopicsResponse {
    try {
      const topics: TopicDescription[] = [];
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
      const listTopicsResponse: GetTopicsResponse = Object.assign(topics, {
        _response: response
      });
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

  private buildListTopicsRuntimeInfoResponse(
    response: HttpOperationResponse
  ): GetTopicsRuntimeInfoResponse {
    try {
      const topics: TopicRuntimeInfo[] = [];
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawTopicArray: any = response.parsedBody;
      for (let i = 0; i < rawTopicArray.length; i++) {
        const topic = buildTopicRuntimeInfo(rawTopicArray[i]);
        if (topic) {
          topics.push(topic);
        }
      }
      const listTopicsResponse: GetTopicsRuntimeInfoResponse = Object.assign(topics, {
        _response: response
      });
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

  private buildTopicRuntimeInfoResponse(
    response: HttpOperationResponse
  ): GetTopicRuntimeInfoResponse {
    try {
      const topic = buildTopicRuntimeInfo(response.parsedBody);
      const topicResponse: GetTopicRuntimeInfoResponse = Object.assign(topic || {}, {
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
  ): GetSubscriptionsResponse {
    try {
      const subscriptions: SubscriptionDescription[] = [];
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
      const listSubscriptionsResponse: GetSubscriptionsResponse = Object.assign(subscriptions, {
        _response: response
      });
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

  private buildListSubscriptionsRuntimeInfoResponse(
    response: HttpOperationResponse
  ): GetSubscriptionsRuntimeInfoResponse {
    try {
      const subscriptions: SubscriptionRuntimeInfo[] = [];
      if (!Array.isArray(response.parsedBody)) {
        throw new TypeError(`${response.parsedBody} was expected to be of type Array`);
      }
      const rawSubscriptionArray: any = response.parsedBody;
      for (let i = 0; i < rawSubscriptionArray.length; i++) {
        const subscription = buildSubscriptionRuntimeInfo(rawSubscriptionArray[i]);
        if (subscription) {
          subscriptions.push(subscription);
        }
      }
      const listSubscriptionsResponse: GetSubscriptionsRuntimeInfoResponse = Object.assign(
        subscriptions,
        {
          _response: response
        }
      );
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

  private buildSubscriptionRuntimeInfoResponse(
    response: HttpOperationResponse
  ): GetSubscriptionRuntimeInfoResponse {
    try {
      const subscription = buildSubscriptionRuntimeInfo(response.parsedBody);
      const subscriptionResponse: GetSubscriptionRuntimeInfoResponse = Object.assign(
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

  private buildListRulesResponse(response: HttpOperationResponse): GetRulesResponse {
    try {
      const rules: RuleDescription[] = [];
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
      const listRulesResponse: GetRulesResponse = Object.assign(rules, {
        _response: response
      });
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
}
