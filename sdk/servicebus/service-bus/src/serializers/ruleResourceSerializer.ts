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

import { AtomResourceSerializerBase, ResourceSerializer } from "@azure/core-http";
import { ServiceBusAtomXmlConstants } from "../util/constants";

export class RuleResourceSerializer implements ResourceSerializer {
  serialize(rule: any): any {
    const properties = ["Name", "Filter", "Action"];

    const resource: any = {};

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
      } else if (rule.correlationIdFilter) {
        const correlationFilter = {
          $: {
            type: "CorrelationFilter"
          },
          CorrelationId: rule.correlationIdFilter
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
    resource.Name = rule.name;
    return AtomResourceSerializerBase.serializeToAtomXmlRequest(
      "RuleDescription",
      resource,
      properties,
      ServiceBusAtomXmlConstants.XML_NAMESPACE
    );
  }

  parse(atomResponseInJson: any): any {
    return AtomResourceSerializerBase.deserializeAtomResponse(
      ["TopicName", "SubscriptionName", "RuleName"],
      atomResponseInJson
    );
  }
}
