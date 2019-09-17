// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  AtomXmlSerializer,
  serializeToAtomXmlRequest,
  deserializeAtomXmlResponse,
  HttpOperationResponse
} from "@azure/core-http";
import * as Constants from "../util/constants";

export interface RuleOptions {
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
  correlationFilter?: string;

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
 * @ignore RuleResourceSerializer for serializing / deserializing Rule entities
 */
export class RuleResourceSerializer implements AtomXmlSerializer {
  serialize(rule: RuleOptions): string {
    const properties = ["Name", "Filter", "Action"];

    const resource: { Name: any; Filter: any; Action: any } = {
      Name: rule.name,
      Filter: [],
      Action: []
    };

    if (rule) {
      const filters = [];
      if (rule.sqlExpressionFilter) {
        const sqlFilter = {
          $: {
            type: "SqlFilter"
          },
          SqlExpression: rule.sqlExpressionFilter,
          CompatibilityLevel: 20
        };

        filters.push(sqlFilter);
      } else if (rule.correlationFilter) {
        const correlationFilter = {
          $: {
            type: "CorrelationFilter"
          },
          CorrelationId: rule.correlationFilter
        };

        filters.push(correlationFilter);
      } else if (rule.trueFilter) {
        const trueFilter = {
          $: {
            type: "TrueFilter"
          },
          SqlExpression: rule.trueFilter,
          CompatibilityLevel: 20
        };

        filters.push(trueFilter);
      } else if (rule.falseFilter) {
        const falseFilter = {
          $: {
            type: "FalseFilter"
          },
          SqlExpression: rule.falseFilter,
          CompatibilityLevel: 20
        };

        filters.push(falseFilter);
      }

      if (filters.length > 0) {
        resource.Filter = filters;
      }

      const actions = [];

      if (rule.sqlRuleAction) {
        const sqlAction = {
          $: {
            type: "SqlFilterExpression"
          },
          SqlExpression: rule.sqlRuleAction
        };

        actions.push(sqlAction);
      } else {
        const emptyRuleAction = {
          $: {
            type: "EmptyRuleAction"
          }
        };

        actions.push(emptyRuleAction);
      }

      if (actions.length > 0) {
        resource.Action = actions;
      }
    }

    return serializeToAtomXmlRequest(
      "RuleDescription",
      resource,
      properties,
      Constants.XML_NAMESPACE
    );
  }

  async deserialize(
    response: HttpOperationResponse,
    shouldParseResponse: boolean
  ): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(
      ["TopicName", "SubscriptionName", "RuleName"],
      response,
      shouldParseResponse
    );
  }
}
