// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  WebResource,
  ServiceClient,
  ServiceClientOptions,
  HttpOperationResponse,
  AtomXmlOperationSpec,
  signingPolicy,
  userAgentPolicy,
  logPolicy,
  proxyPolicy,
  atomSerializationPolicy,
  RequestPolicyFactory,
  AtomXmlSerializer,
  URLBuilder,
  ProxySettings
} from "@azure/core-http";

import { httpAtomXml } from "./log";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import * as Constants from "./util/constants";

import { QueueResourceSerializer, QueueOptions } from "./serializers/queueResourceSerializer";
import { TopicResourceSerializer, TopicOptions } from "./serializers/topicResourceSerializer";
import {
  SubscriptionResourceSerializer,
  SubscriptionOptions
} from "./serializers/subscriptionResourceSerializer";
import { RuleResourceSerializer, RuleOptions } from "./serializers/ruleResourceSerializer";

interface ListRequestOptions {
  top?: number;
  skip?: number;
}

/**
 * All operations return a `Promise<HttpOperationResponse>` object of which the `parsedBody`
 * is populated with the response in JSON format with following structure:
 *  {
 *   response: <actual response>,
 *   result: <parsed result, if any>,
 *   error: <error information, if any>
 *  }
 */
export class ServiceBusAtomManagementClient extends ServiceClient {
  private endpoint: string;

  private queueResourceSerializer: AtomXmlSerializer;
  private topicResourceSerializer: AtomXmlSerializer;
  private subscriptionResourceSerializer: AtomXmlSerializer;
  private ruleResourceSerializer: AtomXmlSerializer;

  /**
   * Initializes a new instance of the ServiceBusManagementClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param options The parameter options
   */
  constructor(connectionString: string, proxySettings?: ProxySettings) {
    const connectionStringObj = ServiceBusAtomManagementClient.parseConnectionString(
      connectionString
    );
    const credentials = new SasServiceClientCredentials(
      connectionStringObj.SharedAccessKeyName,
      connectionStringObj.SharedAccessKey
    );

    const requestPolicyFactories: RequestPolicyFactory[] = [];
    requestPolicyFactories.push(userAgentPolicy());
    requestPolicyFactories.push(logPolicy(httpAtomXml));
    requestPolicyFactories.push(atomSerializationPolicy());
    requestPolicyFactories.push(signingPolicy(credentials));

    if (proxySettings) {
      requestPolicyFactories.push(proxyPolicy(proxySettings));
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
   * Creates a queue.
   * @param queuePath Name of the queue to use
   * @param queueOptions
   */
  async createQueue(queuePath: string, queueOptions: QueueOptions): Promise<HttpOperationResponse> {
    return this._putResource(queuePath, queueOptions, false, this.queueResourceSerializer);
  }

  /**
   * Gets a queue.
   * @param queuePath Name of the queue
   */
  async getQueue(queuePath: string): Promise<HttpOperationResponse> {
    return this._getResource(queuePath, this.queueResourceSerializer);
  }

  /**
   * Lists existing queues.
   * @param listRequestOptions
   */
  async listQueues(listRequestOptions?: ListRequestOptions): Promise<HttpOperationResponse> {
    return this._listResources(
      "$Resources/Queues",
      listRequestOptions,
      this.queueResourceSerializer
    );
  }

  /**
   * Updates a queue.
   * @param queuePath
   * @param queueOptions
   */
  async updateQueue(queuePath: string, queueOptions: QueueOptions): Promise<HttpOperationResponse> {
    return this._putResource(queuePath, queueOptions, true, this.queueResourceSerializer);
  }

  /**
   * Deletes a queue.
   * @param queuePath
   */
  async deleteQueue(queuePath: string): Promise<HttpOperationResponse> {
    return this._deleteResource(queuePath, this.queueResourceSerializer);
  }

  /**
   * Creates a topic.
   * @param topicPath
   * @param topicOptions
   */
  async createTopic(topicPath: string, topicOptions: TopicOptions): Promise<HttpOperationResponse> {
    return this._putResource(topicPath, topicOptions, false, this.topicResourceSerializer);
  }

  /**
   * Updates a topic.
   * @param topicPath
   * @param topicOptions
   */
  async updateTopic(topicPath: string, topicOptions: TopicOptions): Promise<HttpOperationResponse> {
    return this._putResource(topicPath, topicOptions, true, this.topicResourceSerializer);
  }

  /**
   * Deletes a topic.
   * @param topicPath
   */
  async deleteTopic(topicPath: string): Promise<HttpOperationResponse> {
    return this._deleteResource(topicPath, this.topicResourceSerializer);
  }

  /**
   * Gets a topic.
   * @param topicPath
   */
  async getTopic(topicPath: string): Promise<HttpOperationResponse> {
    return this._getResource(topicPath, this.topicResourceSerializer);
  }

  /**
   * Lists existing topics.
   * @param listRequestOptions
   */
  async listTopics(listRequestOptions?: ListRequestOptions): Promise<HttpOperationResponse> {
    return this._listResources(
      "$Resources/Topics",
      listRequestOptions,
      this.topicResourceSerializer
    );
  }

  /**
   * Creates a subscription.
   * @param topicPath
   * @param subscriptionPath
   * @param subscriptionOptions
   */
  createSubscription(
    topicPath: string,
    subscriptionPath: string,
    subscriptionOptions: SubscriptionOptions
  ): Promise<HttpOperationResponse> {
    const fullPath = this.getSubscriptionPath(topicPath, subscriptionPath);
    return this._putResource(
      fullPath,
      subscriptionOptions,
      false,
      this.subscriptionResourceSerializer
    );
  }

  /**
   * Updates a subscription.
   * @param topicPath
   * @param subscriptionPath
   * @param subscriptionOptions
   */
  updateSubscription(
    topicPath: string,
    subscriptionPath: string,
    subscriptionOptions: SubscriptionOptions
  ): Promise<HttpOperationResponse> {
    const fullPath = this.getSubscriptionPath(topicPath, subscriptionPath);
    return this._putResource(
      fullPath,
      subscriptionOptions,
      true,
      this.subscriptionResourceSerializer
    );
  }

  /**
   * Deletes a subscription.
   * @param topicPath
   * @param subscriptionPath
   */
  deleteSubscription(topicPath: string, subscriptionPath: string): Promise<HttpOperationResponse> {
    const fullPath = this.getSubscriptionPath(topicPath, subscriptionPath);
    return this._deleteResource(fullPath, this.subscriptionResourceSerializer);
  }

  /**
   * Gets a subscription.
   * @param topicPath
   * @param subscriptionPath
   */
  getSubscription(topicPath: string, subscriptionPath: string): Promise<HttpOperationResponse> {
    const fullPath = this.getSubscriptionPath(topicPath, subscriptionPath);
    return this._getResource(fullPath, this.subscriptionResourceSerializer);
  }

  /**
   * Lists existing subscriptions.
   * @param topicPath
   * @param listRequestOptions
   */
  async listSubscriptions(
    topicPath: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<HttpOperationResponse> {
    return this._listResources(
      topicPath + "/Subscriptions/",
      listRequestOptions,
      this.subscriptionResourceSerializer
    );
  }

  /**
   * Creates a rule.
   * @param topicPath
   * @param subscriptionPath
   * @param rule
   * @param ruleOptions
   */
  async createRule(
    topicPath: string,
    subscriptionPath: string,
    rule: string,
    ruleOptions: RuleOptions
  ): Promise<HttpOperationResponse> {
    const fullPath = this.getRulePath(topicPath, subscriptionPath, rule);

    return this._putResource(fullPath, ruleOptions, false, this.ruleResourceSerializer);
  }

  /**
   * Updates a rule.
   * @param topicPath
   * @param subscriptionPath
   * @param rule
   * @param ruleOptions
   */
  async updateRule(
    topicPath: string,
    subscriptionPath: string,
    rule: string,
    ruleOptions: RuleOptions
  ): Promise<HttpOperationResponse> {
    const fullPath = this.getRulePath(topicPath, subscriptionPath, rule);

    return this._putResource(fullPath, ruleOptions, true, this.ruleResourceSerializer);
  }

  /**
   * Deletes a rule.
   * @param topicPath
   * @param subscriptionPath
   * @param rule
   */
  async deleteRule(
    topicPath: string,
    subscriptionPath: string,
    rule: string
  ): Promise<HttpOperationResponse> {
    const fullPath = this.getRulePath(topicPath, subscriptionPath, rule);
    return this._deleteResource(fullPath, this.ruleResourceSerializer);
  }

  /**
   * Gets a rule.
   * @param topicPath
   * @param subscriptionPath
   * @param rule
   */
  async getRule(
    topicPath: string,
    subscriptionPath: string,
    rule: string
  ): Promise<HttpOperationResponse> {
    const fullPath = this.getRulePath(topicPath, subscriptionPath, rule);
    return this._getResource(fullPath, this.ruleResourceSerializer);
  }

  /**
   * Lists existing rules.
   * @param topicPath
   * @param subscriptionPath
   * @param listRequestOptions
   */
  async listRules(
    topicPath: string,
    subscriptionPath: string,
    listRequestOptions?: ListRequestOptions
  ): Promise<HttpOperationResponse> {
    const fullPath = this.getSubscriptionPath(topicPath, subscriptionPath) + "/Rules/";
    return this._listResources(fullPath, listRequestOptions, this.ruleResourceSerializer);
  }

  /**
   *
   * @param queuePath
   */
  formatDeadLetterPath(queuePath: string): string {
    return `${queuePath}/$DeadLetterQueue`;
  }

  /**
   * Creates or updates a resource based on `isUpdate` parameter.
   * @param path
   * @param entityOptions
   * @param isUpdate
   * @param serializer
   */
  private async _putResource(
    path: string,
    entityOptions: QueueOptions | TopicOptions | SubscriptionOptions | RuleOptions,
    isUpdate: boolean = false,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const webResource: WebResource = new WebResource(this.getUrl(path), "PUT");
    webResource.body = JSON.stringify(entityOptions);
    if (isUpdate) {
      webResource.headers.set("If-Match", "*");
    }
    webResource.headers.set("content-type", "application/atom+xml;type=entry;charset=utf-8");
    webResource.headers.set("content-length", Buffer.byteLength(webResource.body));

    const atomXmlOperationSpec: AtomXmlOperationSpec = {
      serializer: serializer
    };
    webResource.atomXmlOperationSpec = atomXmlOperationSpec;

    return this.sendRequest(webResource);
  }

  /**
   * Gets a resource.
   * @param path
   * @param serializer
   */
  private async _getResource(
    path: string,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const webResource: WebResource = new WebResource(this.getUrl(path), "GET");

    const atomXmlOperationSpec: AtomXmlOperationSpec = {
      serializer: serializer
    };
    webResource.atomXmlOperationSpec = atomXmlOperationSpec;

    return this.sendRequest(webResource);
  }

  /**
   * Lists existing resources
   * @param path
   * @param listRequestOptions
   * @param serializer
   */
  private async _listResources(
    path: string,
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

    const webResource: WebResource = new WebResource(this.getUrl(path, queryParams), "GET");

    const atomXmlOperationSpec: AtomXmlOperationSpec = {
      serializer: serializer
    };
    webResource.atomXmlOperationSpec = atomXmlOperationSpec;

    return this.sendRequest(webResource);
  }

  /**
   * Deletes a resource.
   * @param path
   */
  private async _deleteResource(
    path: string,
    serializer: AtomXmlSerializer
  ): Promise<HttpOperationResponse> {
    const webResource: WebResource = new WebResource(this.getUrl(path), "DELETE");

    const atomXmlOperationSpec: AtomXmlOperationSpec = {
      serializer: serializer
    };
    webResource.atomXmlOperationSpec = atomXmlOperationSpec;

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

  private getSubscriptionPath(topic: string, subscription: string): string {
    return topic + "/Subscriptions/" + subscription;
  }

  private getRulePath(topic: string, subscription: string, rule: string): string {
    return topic + "/Subscriptions/" + subscription + "/Rules/" + rule;
  }
}
