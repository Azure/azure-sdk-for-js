// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AtomXmlSerializer, HttpOperationResponse, XMLRequestInJSON } from "@azure/core-http";
import * as Constants from "../util/constants";
import { serializeToAtomXmlRequest, deserializeAtomXmlResponse } from "../util/atomXmlHelper";
import { getIntegerOrUndefined } from "../util/utils";

const requestProperties = ["Name", "Filter", "Action"];

/**
 * @ignore
 * Builds the rule options object
 * @param name
 * @param ruleOptions
 */
export function buildRuleOptions(name: string, ruleOptions: RuleOptions = {}): InternalRuleOptions {
  const internalRuleOptions: InternalRuleOptions = Object.assign(ruleOptions, { name: name });
  return internalRuleOptions;
}

/**
 * @ignore
 * Builds the rule object
 * @param rawRule
 */
export function buildRule(rawRule: any): Rule | {} {
  if (rawRule == undefined || rawRule == {}) {
    return {};
  } else {
    const result: Rule = {
      ruleName: rawRule["RuleName"],
      topicName: rawRule["TopicName"],
      subscriptionName: rawRule["SubscriptionName"],
      filter: getTopicFilterOrUndefined(rawRule["Filter"]),
      action: rawRule["Action"],
      createdAt: rawRule["CreatedAt"]
    };
    return result;
  }
}

/**
 *  @ignore
 * Helper utility to retrieve `filter` value from given input,
 * or undefined if not passed in.
 * @param value
 */
function getTopicFilterOrUndefined(value: any): Filter | undefined {
  if (value == undefined) {
    return undefined;
  } else {
    let result: Filter | undefined;

    if (value["SqlExpression"] != undefined) {
      result = {
        sqlExpression: value["SqlExpression"],
        compatibilityLevel: getIntegerOrUndefined(value["CompatibilityLevel"])
      };
    } else if (value["CorrelationId"] != undefined) {
      result = {
        correlationId: value["CorrelationId"],
        label: value["Label"],
        to: value["To"],
        replyTo: value["ReplyTo"],
        replyToSessionId: value["ReplyToSessionId"],
        sessionId: value["SessionId"],
        messageId: value["MessageId"],
        contentType: value["ContentType"]
      };
    }
    return result;
  }
}

/**
 * Represents settable options on a rule
 */
export interface RuleOptions {
  /**
   * Defines the expression that the rule evaluates. The expression string is interpreted as a SQL92 expression which must evaluate to True or False. Only one between a correlation and a sql expression can be defined.
   */
  sqlExpressionFilter?: string;

  /**
   * Defines the expression that the rule evaluates. Only the messages whose CorrelationId match the CorrelationId set in the filter expression are allowed. Only one between a correlation and a sql expression can be defined.
   */
  correlationIdFilter?: CorrelationFilterOptions;

  /**
   * Defines the expression that the rule evaluates as a true filter.
   */
  trueFilter?: string;

  /**
   * Defines the expression that the rule evaluates as a false filter.
   */
  falseFilter?: string;

  /**
   * Defines the expression that the rule evaluates. If the rule is of type SQL, the expression string is interpreted as a SQL92 expression which must evaluate to True or False. If the rule is of type CorrelationFilterExpression then only the messages whose CorrelationId match the CorrelationId set in the filter expression are allowed.
   */
  sqlRuleAction?: string;
}

/**
 * @ignore
 * Internal representation of settable options on a rule
 */
export interface InternalRuleOptions {
  /**
   * Name of the rule.
   */
  name?: string;

  /**
   * Defines the expression that the rule evaluates. The expression string is interpreted as a SQL92 expression which must evaluate to True or False. Only one between a correlation and a sql expression can be defined.
   */
  sqlExpressionFilter?: string;

  /**
   * Defines the expression that the rule evaluates. Only the messages whose CorrelationId match the CorrelationId set in the filter expression are allowed. Only one between a correlation and a sql expression can be defined.
   */
  correlationFilter?: CorrelationFilterOptions;

  /**
   * Defines the expression that the rule evaluates as a true filter.
   */
  trueFilter?: string;

  /**
   * Defines the expression that the rule evaluates as a false filter.
   */
  falseFilter?: string;

  /**
   * Defines the expression that the rule evaluates. If the rule is of type SQL, the expression string is interpreted as a SQL92 expression which must evaluate to True or False. If the rule is of type CorrelationFilterExpression then only the messages whose CorrelationId match the CorrelationId set in the filter expression are allowed.
   */
  sqlRuleAction?: string;
}

/**
 * Represents all attributes of a rule entity
 */
export interface Rule {
  /**
   * Name of the rule
   */
  ruleName?: string;

  /**
   * Name of topic
   */
  topicName?: string;

  /**
   * Name of subscription
   */
  subscriptionName?: string;

  /**
   * Represents Topic filter.
   */
  filter?: Filter;

  /**
   * Rule action
   */
  action?: string;

  /**
   * Created at timestamp
   */
  createdAt?: string;
}

/**
 * Represents all possible fields on Topic Filter
 */
export interface Filter extends CorrelationFilterOptions {
  /**
   * SQL expression to use.
   */
  sqlExpression?: string;

  /**
   * CompatibilityLevel field on the SQL rule
   */
  compatibilityLevel?: number;
}

/**
 * Represents settable options on CorrelationFilter
 */
export interface CorrelationFilterOptions {
  /**
   * CorrelationId value
   */
  correlationId?: string;

  /**
   * Message label
   */
  label?: string;

  /**
   * Message ID
   */
  messageId?: number;

  /**
   * Message 'To' field
   */
  to?: number;

  /**
   * Message 'ReplyTo' field
   */
  replyTo?: number;

  /**
   * Message 'SessionId' field
   */
  sessionId?: string;

  /**
   * Message 'ReplyToSessionId' field
   */
  replyToSessionId?: string;

  /**
   * Message 'ContentType' field
   */
  contentType?: string;

  /**
   * Custom key value properties.
   */
  properties?: any;
}

/**
 * @ignore RuleResourceSerializer for serializing / deserializing Rule entities
 */
export class RuleResourceSerializer implements AtomXmlSerializer {
  serialize(rule: InternalRuleOptions): XMLRequestInJSON {
    const resource: { Name: any; Filter: any[]; Action: any[] } = {
      Name: rule.name,
      Filter: [],
      Action: []
    };

    if (rule) {
      if (rule.sqlExpressionFilter) {
        const sqlFilter = {
          $: {
            type: "SqlFilter"
          },
          SqlExpression: rule.sqlExpressionFilter,
          CompatibilityLevel: 20
        };

        resource.Filter.push(sqlFilter);
      } else if (rule.correlationFilter) {
        const correlationFilter = {
          $: {
            type: "CorrelationFilter"
          },
          CorrelationId: rule.correlationFilter.correlationId,
          Label: rule.correlationFilter.label,
          To: rule.correlationFilter.to,
          ReplyTo: rule.correlationFilter.replyTo,
          ReplyToSessionId: rule.correlationFilter.replyToSessionId,
          ContentType: rule.correlationFilter.contentType,
          SessionId: rule.correlationFilter.sessionId,
          MessageId: rule.correlationFilter.messageId,
          Properties: rule.correlationFilter.properties
        };

        resource.Filter.push(correlationFilter);
      } else if (rule.trueFilter) {
        const trueFilter = {
          $: {
            type: "TrueFilter"
          },
          SqlExpression: rule.trueFilter,
          CompatibilityLevel: 20
        };

        resource.Filter.push(trueFilter);
      } else if (rule.falseFilter) {
        const falseFilter = {
          $: {
            type: "FalseFilter"
          },
          SqlExpression: rule.falseFilter,
          CompatibilityLevel: 20
        };

        resource.Filter.push(falseFilter);
      }

      if (rule.sqlRuleAction) {
        const sqlAction = {
          $: {
            type: "SqlFilterExpression"
          },
          SqlExpression: rule.sqlRuleAction
        };

        resource.Action.push(sqlAction);
      } else {
        const emptyRuleAction = {
          $: {
            type: "EmptyRuleAction"
          }
        };

        resource.Action.push(emptyRuleAction);
      }
    }

    return serializeToAtomXmlRequest(
      "RuleDescription",
      resource,
      requestProperties,
      Constants.XML_NAMESPACE
    );
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName", "SubscriptionName", "RuleName"], response);
  }
}
