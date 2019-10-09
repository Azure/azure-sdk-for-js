// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  WebResource,
  ServiceClient,
  ServiceClientOptions,
  HttpOperationResponse,
  signingPolicy,
  logPolicy,
  proxyPolicy,
  atomSerializationPolicy,
  RequestPolicyFactory,
  AtomXmlSerializer,
  URLBuilder,
  ProxySettings
} from "@azure/core-http";

import * as log from "./log";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import * as Constants from "./util/constants";

import {
  QueueResourceSerializer,
  InternalQueueOptions,
  QueueOptions,
  buildQueueOptions,
  Queue,
  buildQueue
} from "./serializers/queueResourceSerializer";
import {
  TopicResourceSerializer,
  InternalTopicOptions,
  TopicOptions,
  buildTopicOptions,
  Topic,
  buildTopic
} from "./serializers/topicResourceSerializer";
import {
  SubscriptionResourceSerializer,
  InternalSubscriptionOptions,
  SubscriptionOptions,
  buildSubscriptionOptions,
  Subscription,
  buildSubscription
} from "./serializers/subscriptionResourceSerializer";
import {
  RuleResourceSerializer,
  InternalRuleOptions,
  RuleOptions,
  buildRuleOptions,
  Rule,
  buildRule
} from "./serializers/ruleResourceSerializer";

/**
 * Request options for list<entity-type>() operations
 */
export interface ServiceBusAtomManagementClientOptions {
  /**
   * Count of entities to fetch.
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
 * Represents result of create, get, update and delete operations on queue.
 */
export type QueueResponse = Queue & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
};

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
export type DeleteQueueResponse = QueueResponse;

/**
 * Represents result of list operation on queues.
 */
export interface ListQueuesResponse extends Array<Queue> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on topic.
 */
export type TopicResponse = Topic & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
};

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
export type DeleteTopicResponse = TopicResponse;

/**
 * Represents result of list operation on topics.
 */
export interface ListTopicsResponse extends Array<Topic> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on subscription.
 */
export type SubscriptionResponse = Subscription & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
};

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
export type DeleteSubscriptionResponse = SubscriptionResponse;

/**
 * Represents result of list operation on subscriptions.
 */
export interface ListSubscriptionsResponse extends Array<Subscription> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * Represents result of create, get, update and delete operations on rule.
 */
export type RuleResponse = Rule & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
};

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
export type DeleteRuleResponse = RuleResponse;

/**
 * Represents result of list operation on rules.
 */
export interface ListRulesResponse extends Array<Rule> {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse;
}

/**
 * All operations return a `_response` of type `HttpOperationResponse`, of which the `parsedBody` field
 * is populated with the parsed result in JSON format.
 * This is in turn the primary object returned as result of the individual operations.
 */
export class ServiceBusAtomManagementClient extends ServiceClient {
  private endpoint: string;

  private queueResourceSerializer: AtomXmlSerializer;
  private topicResourceSerializer: AtomXmlSerializer;
  private subscriptionResourceSerializer: AtomXmlSerializer;
  private ruleResourceSerializer: AtomXmlSerializer;

  /**
   * Initializes a new instance of the ServiceBusManagementClient class.
   * @param connectionString The connection string needed for the client to connect to Azure.
   * @param options ServiceBusAtomManagementClientOptions
   */
  constructor(connectionString: string, options?: ServiceBusAtomManagementClientOptions) {
    const connectionStringObj = ServiceBusAtomManagementClient.parseConnectionString(
      connectionString
    );

    if (connectionStringObj.Endpoint == undefined) {
      throw new Error("Endpoint must be supplied in the connection string");
    }

    const credentials = new SasServiceClientCredentials(
      connectionStringObj.SharedAccessKeyName,
      connectionStringObj.SharedAccessKey
    );

    const requestPolicyFactories: RequestPolicyFactory[] = [];
    requestPolicyFactories.push(logPolicy(log.httpAtomXml));
    requestPolicyFactories.push(atomSerializationPolicy());
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
  }

  /**
   * Creates a queue with given name, configured using the given options
   * @param queueName
   * @param queueOptions Options to configure the Queue being created.
   * For example, you can configure a queue to support partitions or sessions
   */
  async createQueue(queueName: string, queueOptions?: QueueOptions): Promise<CreateQueueResponse> {
    log.httpAtomXml(
      `Performing management operation - createQueue() for "${queueName}" with options: ${queueOptions}`
    );
    const response: HttpOperationResponse = await this._putResource(
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
   */
  async getQueue(queueName: string): Promise<GetQueueResponse> {
    log.httpAtomXml(`Performing management operation - getQueue() for "${queueName}"`);
    const response: HttpOperationResponse = await this._getResource(
      queueName,
      this.queueResourceSerializer
    );

    return this.buildQueueResponse(response);
  }

  /**
   * Lists existing queues.
   * @param listRequestOptions
   */
  async listQueues(listRequestOptions?: ListRequestOptions): Promise<ListQueuesResponse> {
    log.httpAtomXml(
      `Performing management operation - listQueues() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this._listResources(
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
   * For example, you can configure a queue to support partitions or sessions
   */
  async updateQueue(queueName: string, queueOptions: QueueOptions): Promise<UpdateQueueResponse> {
    log.httpAtomXml(
      `Performing management operation - updateQueue() for "${queueName}" with options: ${queueOptions}`
    );

    const finalQueueOptions: QueueOptions = {};
    const getQueueResult = await this.getQueue(queueName);
    Object.assign(finalQueueOptions, getQueueResult, queueOptions);

    const response: HttpOperationResponse = await this._putResource(
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
   */
  async deleteQueue(queueName: string): Promise<DeleteQueueResponse> {
    log.httpAtomXml(`Performing management operation - deleteQueue() for "${queueName}"`);
    const response: HttpOperationResponse = await this._deleteResource(
      queueName,
      this.queueResourceSerializer
    );

    return this.buildQueueResponse(response);
  }

  /**
   * Creates a topic with given name, configured using the given options
   * @param topicName
   * @param topicOptions Options to configure the Topic being created.
   * For example, you can configure a topic to support partitions or sessions
   */
  async createTopic(topicName: string, topicOptions?: TopicOptions): Promise<CreateTopicResponse> {
    log.httpAtomXml(
      `Performing management operation - createTopic() for "${topicName}" with options: ${topicOptions}`
    );
    const response: HttpOperationResponse = await this._putResource(
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
   */
  async getTopic(topicName: string): Promise<GetTopicResponse> {
    log.httpAtomXml(`Performing management operation - getTopic() for "${topicName}"`);
    const response: HttpOperationResponse = await this._getResource(
      topicName,
      this.topicResourceSerializer
    );

    return this.buildTopicResponse(response);
  }

  /**
   * Lists existing topics.
   * @param listRequestOptions
   */
  async listTopics(listRequestOptions?: ListRequestOptions): Promise<ListTopicsResponse> {
    log.httpAtomXml(
      `Performing management operation - listTopics() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this._listResources(
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
   * For example, you can configure a topic to support partitions or sessions
   */
  async updateTopic(topicName: string, topicOptions: TopicOptions): Promise<UpdateTopicResponse> {
    log.httpAtomXml(
      `Performing management operation - updateTopic() for "${topicName}" with options: ${topicOptions}`
    );

    const finalTopicOptions: TopicOptions = {};
    const getTopicResult = await this.getTopic(topicName);
    Object.assign(finalTopicOptions, getTopicResult, topicOptions);

    const response: HttpOperationResponse = await this._putResource(
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
   */
  async deleteTopic(topicName: string): Promise<DeleteTopicResponse> {
    log.httpAtomXml(`Performing management operation - deleteTopic() for "${topicName}"`);
    const response: HttpOperationResponse = await this._deleteResource(
      topicName,
      this.topicResourceSerializer
    );

    return this.buildTopicResponse(response);
  }

  /**
   * Creates a subscription with given name, configured using the given options
   * @param topicName
   * @param subscriptionName
   * @param subscriptionOptions Options to configure the Subscription being created.
   * For example, you can configure a Subscription to support partitions or sessions
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
    const response: HttpOperationResponse = await this._putResource(
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
   */
  async getSubscription(
    topicName: string,
    subscriptionName: string
  ): Promise<GetSubscriptionResponse> {
    log.httpAtomXml(
      `Performing management operation - getSubscription() for "${subscriptionName}"`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
    const response: HttpOperationResponse = await this._getResource(
      fullPath,
      this.subscriptionResourceSerializer
    );

    return this.buildSubscriptionResponse(response);
  }

  /**
   * Lists existing subscriptions.
   * @param topicName
   * @param listRequestOptions
   */
  async listSubscriptions(
    topicName: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<ListSubscriptionsResponse> {
    log.httpAtomXml(
      `Performing management operation - listSubscriptions() with options: ${listRequestOptions}`
    );
    const response: HttpOperationResponse = await this._listResources(
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
   * For example, you can configure a Subscription to support partitions or sessions
   */
  async updateSubscription(
    topicName: string,
    subscriptionName: string,
    subscriptionOptions: SubscriptionOptions
  ): Promise<UpdateSubscriptionResponse> {
    log.httpAtomXml(
      `Performing management operation - updateSubscription() for "${subscriptionName}" with options: ${subscriptionOptions}`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);

    const finalSubscriptionOptions: SubscriptionOptions = {};
    const getSubscriptionResult = await this.getSubscription(topicName, subscriptionName);
    Object.assign(finalSubscriptionOptions, getSubscriptionResult, subscriptionOptions);

    const response: HttpOperationResponse = await this._putResource(
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
   */
  async deleteSubscription(
    topicName: string,
    subscriptionName: string
  ): Promise<DeleteSubscriptionResponse> {
    log.httpAtomXml(
      `Performing management operation - deleteSubscription() for "${subscriptionName}"`
    );
    const fullPath = this.getSubscriptionPath(topicName, subscriptionName);
    const response: HttpOperationResponse = await this._deleteResource(
      fullPath,
      this.subscriptionResourceSerializer
    );

    return this.buildSubscriptionResponse(response);
  }

  /**
   * Creates a "TrueFilter" rule with given name.
   * TODO: Fix implementation to accept ruleOptions and construct accordingly
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param ruleOptions
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
    const response: HttpOperationResponse = await this._putResource(
      fullPath,
      buildRuleOptions(ruleName, ruleOptions),
      this.ruleResourceSerializer,
      false
    );
    return this.buildRuleResponse(response);
  }

  /**
   * Returns an object representing the Rule with the given name along with all its properties
   * @param topicName
   * @param subscriptioName
   * @param ruleName
   */
  async getRule(
    topicName: string,
    subscriptioName: string,
    ruleName: string
  ): Promise<GetRuleResponse> {
    log.httpAtomXml(`Performing management operation - getRule() for "${ruleName}"`);
    const fullPath = this.getRulePath(topicName, subscriptioName, ruleName);
    const response: HttpOperationResponse = await this._getResource(
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
    const response: HttpOperationResponse = await this._listResources(
      fullPath,
      listRequestOptions,
      this.ruleResourceSerializer
    );

    return this.buildListRulesResponse(response);
  }

  /**
   * Updates properties on the Rule by the given name based on the given options
   * @param topicName
   * @param subscriptionName
   * @param ruleName
   * @param ruleOptions Options to configure the Rule being updated.
   * For example, you can configure the filter to apply on associated Topic/Subscription
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
    const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
    const response: HttpOperationResponse = await this._putResource(
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
   */
  async deleteRule(
    topicName: string,
    subscriptionName: string,
    ruleName: string
  ): Promise<DeleteRuleResponse> {
    log.httpAtomXml(`Performing management operation - deleteRule() for "${ruleName}"`);
    const fullPath = this.getRulePath(topicName, subscriptionName, ruleName);
    const response: HttpOperationResponse = await this._deleteResource(
      fullPath,
      this.ruleResourceSerializer
    );

    return this.buildRuleResponse(response);
  }

  /**
   * Creates or updates a resource based on `isUpdate` parameter.
   * @param name
   * @param entityFields
   * @param isUpdate
   * @param serializer
   */
  private async _putResource(
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
    webResource.body = JSON.stringify(entityFields);
    if (isUpdate) {
      webResource.headers.set("If-Match", "*");
    }
    webResource.headers.set("content-type", "application/atom+xml;type=entry;charset=utf-8");
    webResource.headers.set("content-length", Buffer.byteLength(webResource.body));

    webResource.atomXmlOperationSpec = {
      serializer: serializer
    };

    return this.sendRequest(webResource);
  }

  /**
   * Gets a resource.
   * @param name
   * @param serializer
   */
  private async _getResource(
    name: string,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const webResource: WebResource = new WebResource(this.getUrl(name), "GET");

    webResource.atomXmlOperationSpec = {
      serializer: serializer
    };

    return this.sendRequest(webResource);
  }

  /**
   * Lists existing resources
   * @param name
   * @param listRequestOptions
   * @param serializer
   */
  private async _listResources(
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

    webResource.atomXmlOperationSpec = {
      serializer: serializer
    };

    return this.sendRequest(webResource);
  }

  /**
   * Deletes a resource.
   * @param name
   */
  private async _deleteResource(
    name: string,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const webResource: WebResource = new WebResource(this.getUrl(name), "DELETE");

    webResource.atomXmlOperationSpec = {
      serializer: serializer
    };

    return this.sendRequest(webResource);
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

  private static parseConnectionString(connectionString: string): { [key: string]: string } {
    const output: { [key: string]: string } = {};
    const parts = connectionString.trim().split(";");

    for (let part of parts) {
      part = part.trim();

      if (part === "") {
        // parts can be empty
        continue;
      }

      const splitIndex = part.indexOf("=");
      if (splitIndex === -1) {
        throw new Error(
          "Connection string malformed: each part of the connection string must have an `=` assignment."
        );
      }

      const key = part.substring(0, splitIndex).trim();
      if (key === "") {
        throw new Error("Connection string malformed: missing key for assignment");
      }

      const value = part.substring(splitIndex + 1).trim();

      output[key] = value;
    }

    return output;
  }

  private getSubscriptionPath(topicName: string, subscriptionName: string): string {
    return topicName + "/Subscriptions/" + subscriptionName;
  }

  private getRulePath(topicName: string, subscriptionName: string, ruleName: string): string {
    return topicName + "/Subscriptions/" + subscriptionName + "/Rules/" + ruleName;
  }

  getDeadLetterPath(queueName: string): string {
    return `${queueName}/$DeadLetterQueue`;
  }

  private buildListQueuesResponse(response: HttpOperationResponse): ListQueuesResponse {
    const queues: Queue[] = [];
    const rawQueueArray: any = response.parsedBody || [];
    for (let i = 0; i < rawQueueArray.length; i++) {
      const queue = buildQueue(rawQueueArray[i]);
      if (queue) {
        queues.push(queue);
      }
    }
    const listQueuesResponse: ListQueuesResponse = Object.assign(queues, { _response: response });
    return listQueuesResponse;
  }

  private buildQueueResponse(response: HttpOperationResponse): QueueResponse {
    const queue = buildQueue(response.parsedBody);
    const queueResponse: QueueResponse = Object.assign(queue || {}, { _response: response });
    return queueResponse;
  }

  private buildListTopicsResponse(response: HttpOperationResponse): ListTopicsResponse {
    const topics: Topic[] = [];
    const rawTopicArray: any = response.parsedBody || [];
    for (let i = 0; i < rawTopicArray.length; i++) {
      const topic = buildTopic(rawTopicArray[i]);
      if (topic) {
        topics.push(topic);
      }
    }
    const listTopicsResponse: ListTopicsResponse = Object.assign(topics, { _response: response });
    return listTopicsResponse;
  }

  private buildTopicResponse(response: HttpOperationResponse): TopicResponse {
    const topic = buildTopic(response.parsedBody);
    const topicResponse: TopicResponse = Object.assign(topic || {}, { _response: response });
    return topicResponse;
  }

  private buildListSubscriptionsResponse(
    response: HttpOperationResponse
  ): ListSubscriptionsResponse {
    const subscriptions: Subscription[] = [];
    const rawSubscriptionArray: any = response.parsedBody || [];
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
  }

  private buildSubscriptionResponse(response: HttpOperationResponse): SubscriptionResponse {
    const subscription = buildSubscription(response.parsedBody);
    const subscriptionResponse: SubscriptionResponse = Object.assign(subscription || {}, {
      _response: response
    });
    return subscriptionResponse;
  }

  private buildListRulesResponse(response: HttpOperationResponse): ListRulesResponse {
    const rules: Rule[] = [];
    const rawRuleArray: any = response.parsedBody || [];
    for (let i = 0; i < rawRuleArray.length; i++) {
      const rule = buildRule(rawRuleArray[i]);
      if (rule) {
        rules.push(rule);
      }
    }
    const listRulesResponse: ListRulesResponse = Object.assign(rules, { _response: response });
    return listRulesResponse;
  }

  private buildRuleResponse(response: HttpOperationResponse): RuleResponse {
    const rule = buildRule(response.parsedBody);
    const ruleResponse: RuleResponse = Object.assign(rule || {}, { _response: response });
    return ruleResponse;
  }
}
