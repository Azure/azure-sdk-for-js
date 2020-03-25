// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  WebResource,
  ServiceClient,
  ServiceClientOptions,
  HttpOperationResponse,
  signingPolicy,
  proxyPolicy,
  RequestPolicyFactory,
  URLBuilder,
  ProxySettings,
  stripRequest,
  stripResponse,
  RestError
} from "@azure/core-http";

import { SasTokenProvider, parseConnectionString } from "@azure/amqp-common";

import { AtomXmlSerializer, executeAtomXmlOperation } from "./util/atomXmlHelper";

import * as log from "./log";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import * as Constants from "./util/constants";

import {
  QueueResourceSerializer,
  InternalQueueOptions,
  QueueOptions,
  buildQueueOptions,
  QueueDetails,
  buildQueue
} from "./serializers/queueResourceSerializer";
import {
  TopicResourceSerializer,
  InternalTopicOptions,
  TopicOptions,
  buildTopicOptions,
  TopicDetails,
  buildTopic
} from "./serializers/topicResourceSerializer";
import {
  SubscriptionResourceSerializer,
  InternalSubscriptionOptions,
  SubscriptionOptions,
  buildSubscriptionOptions,
  SubscriptionDetails,
  buildSubscription
} from "./serializers/subscriptionResourceSerializer";
import {
  RuleResourceSerializer,
  InternalRuleOptions,
  RuleOptions,
  buildRuleOptions,
  RuleDetails,
  buildRule
} from "./serializers/ruleResourceSerializer";
import { isJSONLikeObject, isAbsoluteUrl } from "./util/utils";

/**
 * @internal
 * @ignore
 * Options to use with ServiceBusAtomManagementClient creation
 */
export interface ServiceBusAtomManagementClientOptions {
  /**
   * Proxy related settings
   */
  proxySettings?: ProxySettings;
}

/**
 * @internal
 * @ignore
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
 * @internal
 * @ignore
 * Represents result of create, get, update and delete operations on queue.
 */
export interface QueueResponse extends QueueDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Create Queue response
 */
export interface CreateQueueResponse extends QueueDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Get Queue response
 */
export interface GetQueueResponse extends QueueDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Update Queue response
 */
export interface UpdateQueueResponse extends QueueDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Delete Queue response
 */
export interface DeleteQueueResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Represents result of list operation on queues.
 */
export interface ListQueuesResponse extends Array<QueueDetails> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Represents result of create, get, update and delete operations on topic.
 */
export interface TopicResponse extends TopicDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Create Topic response
 */
export interface CreateTopicResponse extends TopicDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Get Topic response
 */
export interface GetTopicResponse extends TopicDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Update Topic response
 */
export interface UpdateTopicResponse extends TopicDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Delete Topic response
 */
export interface DeleteTopicResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Represents result of list operation on topics.
 */
export interface ListTopicsResponse extends Array<TopicDetails> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Represents result of create, get, update and delete operations on subscription.
 */
export interface SubscriptionResponse extends SubscriptionDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Create Subscription response
 */
export interface CreateSubscriptionResponse extends SubscriptionDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Get Subscription response
 */
export interface GetSubscriptionResponse extends SubscriptionDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Update Subscription response
 */
export interface UpdateSubscriptionResponse extends SubscriptionDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Delete Subscription response
 */
export interface DeleteSubscriptionResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Represents result of list operation on subscriptions.
 */
export interface ListSubscriptionsResponse extends Array<SubscriptionDetails> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Represents result of create, get, update and delete operations on rule.
 */
export interface RuleResponse extends RuleDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Create Rule response
 */
export interface CreateRuleResponse extends RuleDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Get Rule response
 */
export interface GetRuleResponse extends RuleDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Update Rule response
 */
export interface UpdateRuleResponse extends RuleDetails {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Delete Rule response
 */
export interface DeleteRuleResponse {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * Represents result of list operation on rules.
 */
export interface ListRulesResponse extends Array<RuleDetails> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * @internal
 * @ignore
 * All operations return promises that resolve to an object that has the relevant output.
 * These objects also have a property called `_response` that you can use if you want to
 * access the direct response from the service.
 */
export class ServiceBusAtomManagementClient extends ServiceClient {
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
  private queueResourceSerializer: AtomXmlSerializer;
  private topicResourceSerializer: AtomXmlSerializer;
  private subscriptionResourceSerializer: AtomXmlSerializer;
  private ruleResourceSerializer: AtomXmlSerializer;

  /**
   * SAS token provider used to generate tokens as required for the various operations.
   */
  private sasTokenProvider: SasTokenProvider;

  /**
   * Initializes a new instance of the ServiceBusManagementClient class.
   * @param connectionString The connection string needed for the client to connect to Azure.
   * @param options ServiceBusAtomManagementClientOptions
   */
  constructor(connectionString: string, options?: ServiceBusAtomManagementClientOptions) {
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
    this.queueResourceSerializer = new QueueResourceSerializer();
    this.topicResourceSerializer = new TopicResourceSerializer();
    this.subscriptionResourceSerializer = new SubscriptionResourceSerializer();
    this.ruleResourceSerializer = new RuleResourceSerializer();
    this.endpoint = (connectionString.match("Endpoint=sb://(.*)/;") || "")[1];
    this.endpointWithProtocol = connectionStringObj.Endpoint;

    this.sasTokenProvider = new SasTokenProvider(
      connectionStringObj.Endpoint,
      connectionStringObj.SharedAccessKeyName,
      connectionStringObj.SharedAccessKey
    );
  }

  /**
   * Creates a queue with given name, configured using the given options
   * @param queueName
   * @param queueOptions Options to configure the Queue being created.
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
  async createQueue(queueName: string, queueOptions?: QueueOptions): Promise<CreateQueueResponse> {
    log.httpAtomXml(
      `Performing management operation - createQueue() for "${queueName}" with options: ${queueOptions}`
    );
    const response: HttpOperationResponse = await this.putResource(
      queueName,
      buildQueueOptions(queueOptions || {}),
      this.queueResourceSerializer,
      false
    );

    return this.buildQueueResponse(response);
  }

  /**
   * Returns an object representing the Queue with the given name along with all its properties
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
  async getQueueDetails(queueName: string): Promise<GetQueueResponse> {
    log.httpAtomXml(`Performing management operation - getQueue() for "${queueName}"`);
    const response: HttpOperationResponse = await this.getResource(
      queueName,
      this.queueResourceSerializer
    );

    return this.buildQueueResponse(response);
  }

  /**
   * Lists existing queues.
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
  async listQueues(listRequestOptions?: ListRequestOptions): Promise<ListQueuesResponse> {
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
   * Updates properties on the Queue by the given name based on the given options
   * @param queueName
   * @param queueOptions Options to configure the Queue being updated.
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
  async updateQueue(queueName: string, queueOptions: QueueOptions): Promise<UpdateQueueResponse> {
    log.httpAtomXml(
      `Performing management operation - updateQueue() for "${queueName}" with options: ${queueOptions}`
    );

    if (!isJSONLikeObject(queueOptions) || queueOptions === null) {
      throw new TypeError(
        `Parameter "queueOptions" must be an object of type "QueueOptions" and cannot be undefined or null.`
      );
    }

    const finalQueueOptions: QueueOptions = {};
    const getQueueResult = await this.getQueueDetails(queueName);
    Object.assign(finalQueueOptions, getQueueResult, queueOptions);

    const response: HttpOperationResponse = await this.putResource(
      queueName,
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
   * Creates a topic with given name, configured using the given options
   * @param topicName
   * @param topicOptions Options to configure the Topic being created.
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
  async createTopic(topicName: string, topicOptions?: TopicOptions): Promise<CreateTopicResponse> {
    log.httpAtomXml(
      `Performing management operation - createTopic() for "${topicName}" with options: ${topicOptions}`
    );
    const response: HttpOperationResponse = await this.putResource(
      topicName,
      buildTopicOptions(topicOptions || {}),
      this.topicResourceSerializer,
      false
    );

    return this.buildTopicResponse(response);
  }

  /**
   * Returns an object representing the Topic with the given name along with all its properties
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
  async getTopicDetails(topicName: string): Promise<GetTopicResponse> {
    log.httpAtomXml(`Performing management operation - getTopic() for "${topicName}"`);
    const response: HttpOperationResponse = await this.getResource(
      topicName,
      this.topicResourceSerializer
    );

    return this.buildTopicResponse(response);
  }

  /**
   * Lists existing topics.
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
  async listTopics(listRequestOptions?: ListRequestOptions): Promise<ListTopicsResponse> {
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
   * Updates properties on the Topic by the given name based on the given options
   * @param topicName
   * @param topicOptions Options to configure the Topic being updated.
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
  async updateTopic(topicName: string, topicOptions: TopicOptions): Promise<UpdateTopicResponse> {
    log.httpAtomXml(
      `Performing management operation - updateTopic() for "${topicName}" with options: ${topicOptions}`
    );

    if (!isJSONLikeObject(topicOptions) || topicOptions === null) {
      throw new TypeError(
        `Parameter "topicOptions" must be an object of type "TopicOptions" and cannot be undefined or null.`
      );
    }

    const finalTopicOptions: TopicOptions = {};
    const getTopicResult = await this.getTopicDetails(topicName);
    Object.assign(finalTopicOptions, getTopicResult, topicOptions);

    const response: HttpOperationResponse = await this.putResource(
      topicName,
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
   * Creates a subscription with given name, configured using the given options
   * @param topicName
   * @param subscriptionName
   * @param subscriptionOptions Options to configure the Subscription being created.
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
    topicName: string,
    subscriptionName: string,
    subscriptionOptions?: SubscriptionOptions
  ): Promise<CreateSubscriptionResponse> {
    log.httpAtomXml(
      `Performing management operation - createSubscription() for "${subscriptionName}" with options: ${subscriptionOptions}`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
    const response: HttpOperationResponse = await this.putResource(
      fullPath,
      buildSubscriptionOptions(subscriptionOptions || {}),
      this.subscriptionResourceSerializer,
      false
    );

    return this.buildSubscriptionResponse(response);
  }

  /**
   * Returns an object representing the Subscription with the given name along with all its properties
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
  async getSubscriptionDetails(
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

    return this.buildSubscriptionResponse(response);
  }

  /**
   * Lists existing subscriptions.
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
  async listSubscriptions(
    topicName: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<ListSubscriptionsResponse> {
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
   * Updates properties on the Subscription by the given name based on the given options
   * @param topicName
   * @param subscriptionName
   * @param subscriptionOptions Options to configure the Subscription being updated.
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
    topicName: string,
    subscriptionName: string,
    subscriptionOptions: SubscriptionOptions
  ): Promise<UpdateSubscriptionResponse> {
    log.httpAtomXml(
      `Performing management operation - updateSubscription() for "${subscriptionName}" with options: ${subscriptionOptions}`
    );

    if (!isJSONLikeObject(subscriptionOptions) || subscriptionOptions === null) {
      throw new TypeError(
        `Parameter "subscriptionOptions" must be an object of type "SubscriptionOptions" and cannot be undefined or null.`
      );
    }

    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);

    const finalSubscriptionOptions: SubscriptionOptions = {};
    const getSubscriptionResult = await this.getSubscriptionDetails(topicName, subscriptionName);
    Object.assign(finalSubscriptionOptions, getSubscriptionResult, subscriptionOptions);

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
   * Creates a rule with given name, configured using the given options.
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param ruleOptions
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
    ruleName: string,
    ruleOptions?: RuleOptions
  ): Promise<CreateRuleResponse> {
    log.httpAtomXml(
      `Performing management operation - createRule() for "${ruleName}" with options: "${ruleOptions}"`
    );
    const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
    const response: HttpOperationResponse = await this.putResource(
      fullPath,
      buildRuleOptions(ruleName, ruleOptions),
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
  async getRuleDetails(
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
  async listRules(
    topicName: string,
    subscriptionName: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<ListRulesResponse> {
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
    ruleName: string,
    ruleOptions: RuleOptions
  ): Promise<UpdateRuleResponse> {
    log.httpAtomXml(
      `Performing management operation - updateRule() for "${ruleName}" with options: ${ruleOptions}`
    );

    if (!isJSONLikeObject(ruleOptions) || ruleOptions === null) {
      throw new TypeError(
        `Parameter "ruleOptions" must be an object of type "RuleOptions" and cannot be undefined or null.`
      );
    }

    const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
    const response: HttpOperationResponse = await this.putResource(
      fullPath,
      buildRuleOptions(ruleName, ruleOptions),
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
      | InternalRuleOptions,
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
      const token = (await this.sasTokenProvider.getToken(this.endpoint)).token;
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

  private buildListQueuesResponse(response: HttpOperationResponse): ListQueuesResponse {
    try {
      const queues: QueueDetails[] = [];
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
      const listQueuesResponse: ListQueuesResponse = Object.assign(queues, {
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

  private buildListTopicsResponse(response: HttpOperationResponse): ListTopicsResponse {
    try {
      const topics: TopicDetails[] = [];
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
      const listTopicsResponse: ListTopicsResponse = Object.assign(topics, {
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

  private buildListSubscriptionsResponse(
    response: HttpOperationResponse
  ): ListSubscriptionsResponse {
    try {
      const subscriptions: SubscriptionDetails[] = [];
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
      const listSubscriptionsResponse: ListSubscriptionsResponse = Object.assign(subscriptions, {
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

  private buildListRulesResponse(response: HttpOperationResponse): ListRulesResponse {
    try {
      const rules: RuleDetails[] = [];
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
      const listRulesResponse: ListRulesResponse = Object.assign(rules, {
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
