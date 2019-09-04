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
    var properties = ["Filter", "Action"];

    var resource: any = {};

    if (rule) {
      var filters = [];
      if (rule.sqlExpressionFilter) {
        var sqlFilter = {
          $: {
            "i:type": "SqlFilter"
          },
          SqlExpression: rule.sqlExpressionFilter,
          CompatibilityLevel: 20
        };

        filters.push(sqlFilter);
      } else if (rule.correlationIdFilter) {
        var correlationFilter = {
          $: {
            "i:type": "CorrelationFilter"
          },
          CorrelationId: rule.correlationIdFilter
        };

        filters.push(correlationFilter);
      } else if (rule.trueFilter) {
        var trueFilter = {
          $: {
            "i:type": "TrueFilter"
          },
          SqlExpression: rule.trueFilter,
          CompatibilityLevel: 20
        };

        filters.push(trueFilter);
      } else if (rule.falseFilter) {
        var falseFilter = {
          $: {
            "i:type": "FalseFilter"
          },
          SqlExpression: rule.falseFilter,
          CompatibilityLevel: 20
        };

        filters.push(falseFilter);
      }

      if (filters.length > 0) {
        resource.Filter = filters;
      }

      var actions = [];

      if (rule.sqlRuleAction) {
        var sqlAction = {
          $: {
            "i:type": "SqlFilterExpression"
          },
          SqlExpression: rule.sqlRuleAction
        };

        actions.push(sqlAction);
      } else {
        var emptyRuleAction = {
          $: {
            "i:type": "EmptyRuleAction"
          }
        };

        actions.push(emptyRuleAction);
      }

      if (actions.length > 0) {
        resource.Action = actions;
      }
    }
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
