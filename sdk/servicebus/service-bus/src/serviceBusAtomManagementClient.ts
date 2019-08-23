//
// Copyright (c) Microsoft and contributors.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import {
  WebResource,
  ServiceClient,
  ServiceClientOptions,
  HttpOperationResponse,
  ServiceBusSASServiceClientCredentials,
  AtomXmlOperationSpec,
  signingPolicy,
  userAgentPolicy,
  serviceBusAtomSerializationPolicy,
  RequestPolicyFactory,
  ResourceSerializer,
  URLBuilder
} from "@azure/core-http";

import { QueueResourceSerializer } from "./serializers/queueResourceSerializer";
import { TopicResourceSerializer } from "./serializers/topicResourceSerializer";
import { SubscriptionResourceSerializer } from "./serializers/subscriptionResourceSerializer";
import { RuleResourceSerializer } from "./serializers/ruleResourceSerializer";

/**
 * All operations return a `Promise<HttpOperationResponse` object of which the `parsedBody`
 * is populated with the response in JSON format with following structure:
 *  {
 *   response: <actual response>,
 *   result: <parsed result, if any>,
 *   error: <error information, if any>
 *  }
 */
export class ServiceBusAtomManagementClient extends ServiceClient {
  endpoint: any;

  queueResourceSerializer: ResourceSerializer;
  topicResourceSerializer: ResourceSerializer;
  subscriptionResourceSerializer: ResourceSerializer;
  ruleResourceSerializer: ResourceSerializer;

  /**
   * Initializes a new instance of the ServiceBusManagementClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param options The parameter options
   */
  constructor(connectionString: any, options?: ServiceClientOptions) {
    const connectionStringObj = ServiceBusAtomManagementClient.parseConnectionString(
      connectionString
    );
    const credentials = new ServiceBusSASServiceClientCredentials(
      connectionStringObj.SharedAccessKeyName,
      connectionStringObj.SharedAccessKey
    );

    if (!options) {
      options = {};
    }
    const requestPolicyFactories = (options.requestPolicyFactories as RequestPolicyFactory[]) || [];
    requestPolicyFactories.push(userAgentPolicy());
    requestPolicyFactories.push(serviceBusAtomSerializationPolicy());
    requestPolicyFactories.push(signingPolicy(credentials));
    options!.requestPolicyFactories = requestPolicyFactories;
    options = {
      requestPolicyFactories: requestPolicyFactories
    };

    super(credentials, options);
    this.queueResourceSerializer = new QueueResourceSerializer();
    this.topicResourceSerializer = new TopicResourceSerializer();
    this.subscriptionResourceSerializer = new SubscriptionResourceSerializer();
    this.ruleResourceSerializer = new RuleResourceSerializer();
    this.endpoint = (connectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
  }

  /**
   * Creates a queue.
   *
   * @param {string}             queuePath                                             A string object that represents the name of the queue to create.
   * @param {object}             [options]                                             The request options.
   * @param {int}                [options.MaxSizeInMegaBytes]                          Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that will cause the queue to exceed this value will fail.
   * @param {PTnHnMnS}           [options.DefaultMessageTimeToLive]                    Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   * @param {PTnHnMnS}           [options.LockDuration]                                Determines the amount of time in seconds in which a message should be locked for processing by a receiver. After this period, the message is unlocked and available for consumption by the next receiver. Settable only at queue creation time.
   * @param {bool}               [options.RequiresSession]                             Settable only at queue creation time. If set to true, the queue will be session-aware and only SessionReceiver will be supported. Session-aware queues are not supported through REST.
   * @param {bool}               [options.RequiresDuplicateDetection]                  Settable only at queue creation time.
   * @param {bool}               [options.DeadLetteringOnMessageExpiration]            This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   * @param {bool}               [options.DuplicateDetectionHistoryTimeWindow]         Specifies the time span during which the Service Bus detects message duplication.
   * @param {bool}               [options.EnablePartitioning]                          Specifies whether the queue should be partitioned.
   *                                                                                   `error` will contain information
   *                                                                                   if an error occurs; otherwise `createqueueresult` will contain
   *                                                                                   the new queue information.
   *                                                                                   `response` will contain information related to this operation.
   * @return {Promise<HttpOperationResponse}
   */
  createQueue(queuePath: string, options: any): Promise<HttpOperationResponse> {
    return this._createResource(queuePath, options, false, this.queueResourceSerializer);
  }

  /**
   * Retrieves a queue.
   *
   * @param {string}             queuePath                          A string object that represents the name of the queue to retrieve.
   * @return {Promise<HttpOperationResponse}
   */
  getQueue(queuePath: string): Promise<HttpOperationResponse> {
    return this._getResource(queuePath, this.queueResourceSerializer);
  }

  /**
   * Returns a list of queues.
   *
   * @param {object}             [options]                                 The request options.
   * @param {int}                [options.top]                             The top clause for listing queues.
   * @param {int}                [options.skip]                            The skip clause for listing queues.
   * @return {Promise<HttpOperationResponse}
   */
  async listQueues(options?: any): Promise<HttpOperationResponse> {
    return this._listResources("$Resources/Queues", options, this.queueResourceSerializer);
  }

  /**
   * Creates a queue.
   *
   * @param {string}             queuePath                                             A string object that represents the name of the queue to update.
   * @param {object}             [options]                                             The request options.
   * @param {int}                [options.MaxSizeInMegaBytes]                          Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that will cause the queue to exceed this value will fail.
   * @param {PTnHnMnS}           [options.DefaultMessageTimeToLive]                    Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   * @param {PTnHnMnS}           [options.LockDuration]                                Determines the amount of time in seconds in which a message should be locked for processing by a receiver. After this period, the message is unlocked and available for consumption by the next receiver. Settable only at queue creation time.
   * @param {bool}               [options.RequiresSession]                             Settable only at queue creation time. If set to true, the queue will be session-aware and only SessionReceiver will be supported. Session-aware queues are not supported through REST.
   * @param {bool}               [options.RequiresDuplicateDetection]                  Settable only at queue creation time.
   * @param {bool}               [options.DeadLetteringOnMessageExpiration]            This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   * @param {bool}               [options.DuplicateDetectionHistoryTimeWindow]         Specifies the time span during which the Service Bus detects message duplication.
   * @param {bool}               [options.EnablePartitioning]                          Specifies whether the queue should be partitioned.
   * @return {Promise<HttpOperationResponse}
   */
  async updateQueue(queuePath: any, options: any): Promise<HttpOperationResponse> {
    return this._createResource(queuePath, options, true, this.queueResourceSerializer);
  }

  /**
   * Deletes a queue.
   *
   * @param {string}             queuePath                A string object that represents the name of the queue to delete.
   * @return {Promise<HttpOperationResponse}
   */
  deleteQueue(queuePath: any): any {
    return this._deleteResource(queuePath);
  }

  /**
   * Creates a topic.
   *
   * @param {TopicInfo}          topicPath                                                   A Topic object that represents the topic to create.
   * @param {object}             [options]                                                   The request options.
   * @param {int}                [options.MaxSizeInMegabytes]                                Specifies the maximum topic size in megabytes. Any attempt to enqueue a message that will cause the topic to exceed this value will fail. All messages that are stored in the topic or any of its subscriptions count towards this value. Multiple copies of a message that reside in one or multiple subscriptions count as a single messages. For example, if message m exists once in subscription s1 and twice in subscription s2, m is counted as a single message.
   * @param {PTnHnMnS}           [options.DefaultMessageTimeToLive]                          Determines how long a message lives in the associated subscriptions. Subscriptions inherit the TTL from the topic unless they are created explicitly with a smaller TTL. Based on whether dead-lettering is enabled, a message whose TTL has expired will either be moved to the subscription’s associated DeadLtterQueue or will be permanently deleted.
   * @param {bool}               [options.RequiresDuplicateDetection]                        If enabled, the topic will detect duplicate messages within the time span specified by the DuplicateDetectionHistoryTimeWindow property. Settable only at topic creation time.
   * @param {PTnHnMnS}           [options.DuplicateDetectionHistoryTimeWindow]               Specifies the time span during which the Service Bus will detect message duplication.
   * @param {bool}               [options.EnableBatchedOperations]                           Specifies if batched operations should be allowed.
   * @param {int}                [options.SizeInBytes]                                       Specifies the topic size in bytes.
   * @param {bool}               [options.SupportOrdering]                                   Specifies whether the topic supports message ordering.
   * @param {bool}               [options.EnablePartitioning]                                Specifies whether the topic should be partitioned
   * @return {Promise<HttpOperationResponse}
   */
  createTopic(topicPath: string, options: any): Promise<HttpOperationResponse> {
    return this._createResource(topicPath, options, false, this.topicResourceSerializer);
  }

  /**
   * Deletes a topic.
   *
   * @param {string}             topicPath               A <code>String</code> object that represents the name of the queue to delete.
   * @return {Promise<HttpOperationResponse}
   */
  deleteTopic(topicPath: any): any {
    return this._deleteResource(topicPath);
  }

  /**
   * Retrieves a topic.
   *
   * @param {string}             topicPath                            A <code>String</code> object that represents the name of the topic to retrieve.
   * @return {Promise<HttpOperationResponse}
   */
  getTopic(topicPath: string): Promise<HttpOperationResponse> {
    return this._getResource(topicPath, this.topicResourceSerializer);
  }

  /**
   * Returns a list of topics.
   *
   * @param {object}             [options]                                 The request options.
   * @param {int}                [options.top]                             The number of topics to fetch.
   * @param {int}                [options.skip]                            The number of topics to skip.
   * @return {Promise<HttpOperationResponse}
   */
  async listTopics(options?: any): Promise<HttpOperationResponse> {
    return this._listResources("$Resources/Topics", options, this.topicResourceSerializer);
  }

  /**
   * Creates a subscription.
   *
   * @param {string}             topicPath                                                   A string object that represents the name of the topic for the subscription.
   * @param {string}             subscriptionPath                                            A string object that represents the name of the subscription.
   * @param {object}             [options]                                                   The request options.
   * @param {PTnHnMnS}           [options.LockDuration]                                      The default lock duration is applied to subscriptions that do not define a lock duration. Settable only at subscription creation time.
   * @param {bool}               [options.RequiresSession]                                   Settable only at subscription creation time. If set to true, the subscription will be session-aware and only SessionReceiver will be supported. Session-aware subscription are not supported through REST.
   * @param {PTnHnMnS}           [options.DefaultMessageTimeToLive]                          Determines how long a message lives in the subscription. Based on whether dead-lettering is enabled, a message whose TTL has expired will either be moved to the subscription’s associated DeadLtterQueue or permanently deleted.
   * @param {bool}               [options.EnableDeadLetteringOnMessageExpiration]            This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the subscription’s dead-letter sub-queue. If disabled, message will be permanently deleted from the subscription’s main queue. Settable only at subscription creation time.
   * @param {bool}               [options.EnableDeadLetteringOnFilterEvaluationExceptions]   Determines how the Service Bus handles a message that causes an exception during a subscription’s filter evaluation. If the value is set to true, the message that caused the exception will be moved to the subscription’s dead-letter queue. Otherwise, it will be discarded. By default this parameter is set to true, allowing the user a chance to investigate the cause of the exception. It can occur from a malformed message or some incorrect assumptions being made in the filter about the form of the message. Settable only at topic creation time.
   * @return {Promise<HttpOperationResponse}
   */

  createSubscription(
    topicPath: string,
    subscriptionPath: string,
    options: any
  ): Promise<HttpOperationResponse> {
    const fullPath = ServiceBusAtomManagementClient.getSubscriptionPath(
      topicPath,
      subscriptionPath
    );
    return this._createResource(fullPath, options, false, this.subscriptionResourceSerializer);
  }

  /**
   * Deletes a subscription.
   *
   * @param {string}             topicPath               A string object that represents the name of the topic for the subscription.
   * @param {string}             subscriptionPath        A string object that represents the name of the subscription to delete.
   * @return {Promise<HttpOperationResponse}
   */
  deleteSubscription(topicPath: string, subscriptionPath: string): any {
    const fullPath = ServiceBusAtomManagementClient.getSubscriptionPath(
      topicPath,
      subscriptionPath
    );
    return this._deleteResource(fullPath);
  }

  /**
   * Retrieves a subscription.
   *
   * @param {string}             topicPath                                           A string object that represents the name of the topic for the subscription.
   * @param {string}             subscription                                        A string object that represents the name of the subscription to retrieve.
   * @return {Promise<HttpOperationResponse}
   */
  getSubscription(topicPath: string, subscriptionPath: string): Promise<HttpOperationResponse> {
    const fullPath = ServiceBusAtomManagementClient.getSubscriptionPath(
      topicPath,
      subscriptionPath
    );
    return this._getResource(fullPath, this.subscriptionResourceSerializer);
  }

  /**
   * Returns a list of subscriptions.
   *
   * @param {string}             topicPath                                 A string object that represents the name of the topic for the subscriptions to retrieve.
   * @param {object}             [options]                                 The request options.
   * @param {int}                [options.top]                             The number of topics to fetch.
   * @param {int}                [options.skip]                            The number of topics to skip.
   * @return {Promise<HttpOperationResponse}
   */
  async listSubscriptions(topicPath: string, options?: any): Promise<HttpOperationResponse> {
    return this._listResources(
      topicPath + "/Subscriptions/",
      options,
      this.subscriptionResourceSerializer
    );
  }

  /**
   * Creates a rule.
   *
   * @param {string}             topicPath                                       A string object that represents the name of the topic for the subscription.
   * @param {string}             subscriptionPath                                A string object that represents the name of the subscription for which the rule will be created.
   * @param {string}             rulePath                                        A string object that represents the name of the rule to be created.
   * @param {object}             [options]                                       The request options.
   * @param {string}             [options.trueFilter]                            Defines the expression that the rule evaluates as a true filter.
   * @param {string}             [options.falseFilter]                           Defines the expression that the rule evaluates as a false filter.
   * @param {string}             [options.sqlExpressionFilter]                   Defines the expression that the rule evaluates. The expression string is interpreted as a SQL92 expression which must evaluate to True or False. Only one between a correlation and a sql expression can be defined.
   * @param {string}             [options.correlationIdFilter]                   Defines the expression that the rule evaluates. Only the messages whose CorrelationId match the CorrelationId set in the filter expression are allowed. Only one between a correlation and a sql expression can be defined.
   * @param {string}             [options.sqlRuleAction]                         Defines the expression that the rule evaluates. If the rule is of type SQL, the expression string is interpreted as a SQL92 expression which must evaluate to True or False. If the rule is of type CorrelationFilterExpression then only the messages whose CorrelationId match the CorrelationId set in the filter expression are allowed.
   * @return {Promise<HttpOperationResponse}
   */
  createRule(
    topicPath: string,
    subscriptionPath: string,
    rule: string,
    options: any
  ): Promise<HttpOperationResponse> {
    const fullPath = ServiceBusAtomManagementClient.getRulePath(topicPath, subscriptionPath, rule);

    return this._createResource(fullPath, options, false, this.ruleResourceSerializer);
  }

  /**
   * Deletes a rule.
   *
   * @param {string}             topicPath                                           A string object that represents the name of the topic for the subscription.
   * @param {string}             subscriptionPath                                    A string object that represents the name of the subscription for which the rule will be deleted.
   * @param {string}             rulePath                                            A string object that represents the name of the rule to delete.
   * @return {Promise<HttpOperationResponse}
   */
  deleteRule(topicPath: string, subscriptionPath: string, rule: string): any {
    const fullPath = ServiceBusAtomManagementClient.getRulePath(topicPath, subscriptionPath, rule);
    return this._deleteResource(fullPath);
  }

  /**
   * Retrieves a rule.
   *
   * @param {string}             topicPath                                           A string object that represents the name of the topic for the subscription.
   * @param {string}             subscriptionPath                                    A string object that represents the name of the subscription for which the rule will be retrieved.
   * @param {string}             rulePath                                            A string object that represents the name of the rule to retrieve.
   * @return {Promise<HttpOperationResponse}
   */
  getRule(
    topicPath: string,
    subscriptionPath: string,
    rule: string
  ): Promise<HttpOperationResponse> {
    const fullPath = ServiceBusAtomManagementClient.getRulePath(topicPath, subscriptionPath, rule);
    return this._getResource(fullPath, this.ruleResourceSerializer);
  }

  /**
   * Returns a list of rules.
   *
   * @param {string}             topicPath                                 A string object that represents the name of the topic for the subscription.
   * @param {string}             subscriptionPath                          A string object that represents the name of the subscription whose rules are being retrieved.
   * @param {object}             [options]                                 The request options.
   * @param {int}                [options.top]                             The number of topics to fetch.
   * @param {int}                [options.skip]                            The number of topics to skip.
   * @return {Promise<HttpOperationResponse}
   */
  async listRules(
    topicPath: string,
    subscriptionPath: string,
    options?: any
  ): Promise<HttpOperationResponse> {
    const fullPath =
      ServiceBusAtomManagementClient.getSubscriptionPath(topicPath, subscriptionPath) + "/Rules/";
    return this._listResources(fullPath, options, this.ruleResourceSerializer);
  }

  /**
   * Formats a queue path to point towards its dead letter queue.
   *
   * @param {string}             queuePath                A string object that represents the name of the queue whose dead letter path you want.
   * @return {string}
   * The path to the queue's dead letter queue
   */
  formatDeadLetterPath(queuePath: any): any {
    return `${queuePath}/$DeadLetterQueue`;
  }

  /**
   * Creates a resource.
   *
   * @param {string}             path                                                The resource path.
   * @param {object}             requestBody                                         The resource handler.
   * @param {boolean}            isUpdate                                            `isUpdate` flag indicates whether the `PUT` request
   *                                                                                 must attempt to update the resource or to create new one.
   * @param {ResourceSerializer} serializer                                          The XML serializer to use.
   * @return {Promise<HttpOperationResponse>}
   */
  private async _createResource(
    path: string,
    requestBody: any,
    isUpdate: boolean = false,
    serializer: ResourceSerializer
  ): Promise<HttpOperationResponse> {
    let webResource: WebResource = new WebResource();

    webResource.method = "PUT";
    webResource.url = this.getUrl(path);
    webResource.body = JSON.stringify(requestBody);
    if (isUpdate) {
      webResource.headers.set("If-Match", "*");
    }
    webResource.headers.set("content-type", "application/atom+xml;type=entry;charset=utf-8");
    webResource.headers.set("content-length", Buffer.byteLength(webResource.body, "utf8"));

    const atomXmlOperationSpec: AtomXmlOperationSpec = {
      serializer: serializer,
      shouldParseResponse: false
    };
    webResource.atomXmlOperationSpec = atomXmlOperationSpec;

    return this.sendRequest(webResource);
  }

  /**
   * Gets a resource.
   *
   * @param {string}             path                                                The resource path.
   * @param {ResourceSerializer} serializer                                          The XML serializer to use.
   * @return {Promise<HttpOperationResponse>}
   */
  private async _getResource(
    path: string,
    serializer: ResourceSerializer
  ): Promise<HttpOperationResponse> {
    let webResource: WebResource = new WebResource();

    webResource.method = "GET";
    webResource.url = this.getUrl(path);

    const atomXmlOperationSpec: AtomXmlOperationSpec = {
      serializer: serializer,
      shouldParseResponse: true
    };
    webResource.atomXmlOperationSpec = atomXmlOperationSpec;

    return this.sendRequest(webResource);
  }

  /**
   * Lists resources.
   *
   * @param {string}             path                                                The resource path.
   * @param {object}             requestBody                                         The resource handler.
   * @param {ResourceSerializer} serializer                                          The XML serializer to use.
   * @return {Promise<HttpOperationResponse>}
   */
  private async _listResources(
    path: string,
    requestBody: any,
    serializer: ResourceSerializer
  ): Promise<HttpOperationResponse> {
    let webResource: WebResource = new WebResource();

    webResource.method = "GET";

    const queryParams: any = {};
    if (requestBody) {
      if (requestBody.skip) {
        queryParams["$skip"] = requestBody.skip;
      }
      if (requestBody.top) {
        queryParams["$top"] = requestBody.top;
      }
    }

    webResource.url = this.getUrl(path, queryParams);

    console.log(webResource.url);

    const atomXmlOperationSpec: AtomXmlOperationSpec = {
      serializer: serializer,
      shouldParseResponse: true
    };
    webResource.atomXmlOperationSpec = atomXmlOperationSpec;

    return this.sendRequest(webResource);
  }

  /**
   * Lists resources.
   *
   * @param {string}             path                                                The resource path.
   * @return {Promise<HttpOperationResponse>}
   */
  private async _deleteResource(path: any): Promise<HttpOperationResponse> {
    let webResource: WebResource = new WebResource();

    webResource.method = "DELETE";
    webResource.url = this.getUrl(path);

    return this.sendRequest(webResource);
  }

  private getUrl(path: string, queryParams?: any) {
    const baseUri = `https://${this.endpoint}.servicebus.windows.net/${path}`;

    const requestUrl: URLBuilder = URLBuilder.parse(baseUri);
    requestUrl.setQueryParameter(`api-version`, `2017-04`);

    if (queryParams) {
      for (let key of Object.keys(queryParams)) {
        requestUrl.setQueryParameter(key, queryParams[key]);
      }
    }

    return requestUrl.toString();
  }
  private static parseConnectionString(connectionString: string): any {
    const output: { [k: string]: string } = {};
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

    return output as any;
  }

  private static getSubscriptionPath(topic: string, subscription: string) {
    return topic + "/Subscriptions/" + subscription;
  }

  private static getRulePath(topic: string, subscription: string, rule: string) {
    return topic + "/Subscriptions/" + subscription + "/Rules/" + rule;
  }
}
