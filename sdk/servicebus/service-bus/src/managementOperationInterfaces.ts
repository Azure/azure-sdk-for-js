// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Queue } from "./serializers/queueResourceSerializer";
import { Topic } from "./serializers/topicResourceSerializer";
import { Subscription } from "./serializers/subscriptionResourceSerializer";
import { Rule } from "./serializers/ruleResourceSerializer";
import { HttpOperationResponse } from "@azure/core-http";

/**
 * Request options for list<entity-type>() operations
 */
export interface ListRequestOptions {
  top?: number;
  skip?: number;
}

export type QueueResult = Queue & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Queue;
  };
};

export type ListQueuesResult = Queue[] & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Queue[];
  };
};

export type TopicResult = Topic & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Topic;
  };
};

export type ListTopicsResult = Topic[] & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Topic[];
  };
};

export type SubscriptionResult = Subscription & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Subscription;
  };
};

export type ListSubscriptionsResult = Subscription[] & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Subscription[];
  };
};

export type RuleResult = Rule & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Rule;
  };
};

export type ListRulesResult = Rule[] & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpOperationResponse & {
    /**
     * The response body as parsed.
     */
    parsedBody: Rule[];
  };
};
