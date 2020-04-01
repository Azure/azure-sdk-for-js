// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpOperationResponse } from "@azure/core-http";
import * as Constants from "../util/constants";
import {
  serializeToAtomXmlRequest,
  deserializeAtomXmlResponse,
  AtomXmlSerializer
} from "../util/atomXmlHelper";
import {
  getIntegerOrUndefined,
  getStringOrUndefined,
  getBooleanOrUndefined,
  getString,
  isJSONLikeObject
} from "../util/utils";
import { CorrelationFilter } from "../core/managementClient";

/**
 * @internal
 * @ignore
 * Builds the rule options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 * @param name
 * @param ruleOptions
 */
export function buildRuleOptions(name: string, ruleOptions: RuleOptions = {}): InternalRuleOptions {
  const internalRuleOptions: InternalRuleOptions = Object.assign({}, ruleOptions, { name: name });
  return internalRuleOptions;
}

/**
 * @internal
 * @ignore
 * Builds the rule object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawRule
 */
export function buildRule(rawRule: any): RuleDetails {
  return {
    ruleName: getString(rawRule["RuleName"], "ruleName"),
    topicName: getString(rawRule["TopicName"], "topicName"),
    subscriptionName: getString(rawRule["SubscriptionName"], "subscriptionName"),
    filter: getTopicFilter(rawRule["Filter"]),
    action: getRuleActionOrUndefined(rawRule["Action"]),
    createdOn: getString(rawRule["CreatedAt"], "createdOn")
  };
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve `filter` value from given input,
 * or undefined if not passed in.
 * @param value
 */
function getTopicFilter(value: any): SqlFilter | CorrelationFilter {
  let result: SqlFilter | CorrelationFilter;

  if (value["SqlExpression"] != undefined) {
    result = {
      sqlExpression: value["SqlExpression"],
      sqlParameters: getSqlParametersOrUndefined(value["Parameters"]),
      compatibilityLevel: getIntegerOrUndefined(value["CompatibilityLevel"]),
      requiresPreprocessing: getBooleanOrUndefined(value["RequiresPreprocessing"])
    };
  } else {
    result = {
      correlationId: getStringOrUndefined(value["CorrelationId"]),
      label: getStringOrUndefined(value["Label"]),
      to: getStringOrUndefined(value["To"]),
      replyTo: getStringOrUndefined(value["ReplyTo"]),
      replyToSessionId: getStringOrUndefined(value["ReplyToSessionId"]),
      sessionId: getStringOrUndefined(value["SessionId"]),
      messageId: getStringOrUndefined(value["MessageId"]),
      contentType: getStringOrUndefined(value["ContentType"]),
      userProperties: value["UserProperties"]
    };
  }
  return result;
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve rule `action` value from given input,
 * or undefined if not passed in.
 * @param value
 */
function getRuleActionOrUndefined(value: any): SqlAction | undefined {
  if (value == undefined) {
    return undefined;
  } else {
    return {
      sqlExpression: value["SqlExpression"],
      sqlParameters: getSqlParametersOrUndefined(value["Parameters"]),
      compatibilityLevel: getIntegerOrUndefined(value["CompatibilityLevel"]),
      requiresPreprocessing: getBooleanOrUndefined(value["RequiresPreprocessing"])
    };
  }
}

/**
 * @internal
 * @ignore
 * Represents settable options on a rule
 */
export interface RuleOptions {
  /**
   * @internal
   * @ignore
   * Defines the filter expression that the rule evaluates. For `SqlFilter` input,
   * the expression string is interpreted as a SQL92 expression which must
   * evaluate to True or False. Only one between a `CorrelationFilter` or
   * a `SqlFilter` can be defined.
   */
  filter?: SqlFilter | CorrelationFilter;

  /**
   * @internal
   * @ignore
   * The SQL like expression that can be executed on the message should the
   * associated filter apply.
   */
  action?: SqlAction;
}

/**
 * @internal
 * @ignore
 * Internal representation of settable options on a rule
 */
export interface InternalRuleOptions extends RuleOptions {
  /**
   * @internal
   * @ignore
   * Name of the rule.
   */
  name?: string;
}

/**
 * @internal
 * @ignore
 * Represents all attributes of a rule entity
 */
export interface RuleDetails {
  /**
   * @internal
   * @ignore
   * Name of the rule
   */
  ruleName: string;

  /**
   * @internal
   * @ignore
   * Defines the filter expression that the rule evaluates. For `SqlFilter` input,
   * the expression string is interpreted as a SQL92 expression which must
   * evaluate to True or False. Only one between a `CorrelationFilter` or
   * a `SqlFilter` can be defined.
   */
  filter?: SqlFilter | CorrelationFilter;

  /**
   * @internal
   * @ignore
   * The SQL like expression that can be executed on the message should the
   * associated filter apply.
   */
  action?: SqlAction;

  /**
   * @internal
   * @ignore
   * Name of topic
   */
  topicName: string;

  /**
   * @internal
   * @ignore
   * Name of subscription
   */
  subscriptionName: string;

  /**
   * @internal
   * @ignore
   * Created at timestamp
   */
  createdOn: string;
}

/**
 * @internal
 * @ignore
 * Represents all possible fields on SqlAction
 */
export type SqlAction = SqlFilter;

/**
 * @internal
 * @ignore
 * Represents all possible fields on SqlFilter
 */
export interface SqlFilter {
  /**
   * @internal
   * @ignore
   * SQL expression to use.
   */
  sqlExpression?: string;

  /**
   * @internal
   * @ignore
   * SQL parameters to the expression
   */
  sqlParameters?: SqlParameter[];

  /**
   * @internal
   * @ignore
   * This property is reserved for future use. An integer value showing the
   * compatibility level, currently hard-coded to 20.
   */
  compatibilityLevel?: number;

  /**
   * @internal
   * @ignore
   * Boolean value indicating whether the SQL filter expression requires preprocessing
   */
  requiresPreprocessing?: boolean;
}

/**
 * @internal
 * @ignore RuleResourceSerializer for serializing / deserializing Rule entities
 */
export class RuleResourceSerializer implements AtomXmlSerializer {
  serialize(rule: InternalRuleOptions): object {
    const resource: { Name: any; Filter: any; Action: any } = {
      Filter: {},
      Action: {},
      Name: rule.name
    };

    if (rule.filter == undefined) {
      // Defaults to creating a true filter if none specified
      resource.Filter = {
        SqlExpression: "1=1",
        CompatibilityLevel: 20
      };
      resource.Filter[Constants.XML_METADATA_MARKER] = {
        "p4:type": "SqlFilter",
        "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance"
      };
    } else {
      if (rule.filter.hasOwnProperty("sqlExpression")) {
        const sqlFilter: SqlFilter = rule.filter as SqlFilter;
        resource.Filter = {
          SqlExpression: sqlFilter.sqlExpression,
          Parameters: getRawSqlParameters(sqlFilter.sqlParameters),
          CompatibilityLevel: 20,
          RequiresPreprocessing: getStringOrUndefined(sqlFilter.requiresPreprocessing)
        };
        resource.Filter[Constants.XML_METADATA_MARKER] = {
          "p4:type": "SqlFilter",
          "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance"
        };
      } else {
        const correlationFilter: CorrelationFilter = rule.filter as CorrelationFilter;

        resource.Filter = {
          CorrelationId: correlationFilter.correlationId,
          Label: correlationFilter.label,
          To: correlationFilter.to,
          ReplyTo: correlationFilter.replyTo,
          ReplyToSessionId: correlationFilter.replyToSessionId,
          ContentType: correlationFilter.contentType,
          SessionId: correlationFilter.sessionId,
          MessageId: correlationFilter.messageId,
          Properties: correlationFilter.userProperties
        };
        resource.Filter[Constants.XML_METADATA_MARKER] = {
          "p4:type": "CorrelationFilter",
          "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance"
        };
      }
    }

    if (rule.action == undefined || rule.action.sqlExpression == undefined) {
      // Defaults to creating an empty rule action instance if none specified
      resource.Action = {};
      resource.Action[Constants.XML_METADATA_MARKER] = {
        "p4:type": "EmptyRuleAction",
        "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance"
      };
    } else {
      resource.Action = {
        SqlExpression: rule.action.sqlExpression,
        Parameters: getRawSqlParameters(rule.action.sqlParameters),
        CompatibilityLevel: 20,
        RequiresPreprocessing: getStringOrUndefined(rule.action.requiresPreprocessing)
      };
      resource.Action[Constants.XML_METADATA_MARKER] = {
        "p4:type": "SqlRuleAction",
        "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance"
      };
    }

    return serializeToAtomXmlRequest("RuleDescription", resource);
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName", "SubscriptionName", "RuleName"], response);
  }
}

enum SqlParameterType {
  Integer = "l28:int",
  String = "l28:string",
  Long = "l28:long",
  Date = "l28:date"
}
/**
 * @internal
 * @ignore
 * Represents type of SQL `Parameter` in ATOM based management operations
 */
export type SqlParameter = {
  key: string;
  value: string | number;
  type: string;
};

/**
 * @internal
 * @ignore
 * Internal representation of SQL parameter info
 */
type RawSqlParameter = {
  Key: string;
  Value: any;
};

/**
 * @internal
 * @ignore
 * Helper utility to retrieve array of `SqlParameter` from given input,
 * or undefined if not passed in.
 * @param value
 */
function getSqlParametersOrUndefined(value: any): SqlParameter[] | undefined {
  const parameters: SqlParameter[] = [];

  // Ignore special case as Service Bus treats "" as a valid value for SQL parameters
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  if (value == undefined) {
    return undefined;
  }

  let rawParameters = value["KeyValueOfstringanyType"];
  if (Array.isArray(rawParameters)) {
    for (let i = 0; i < rawParameters.length; i++) {
      parameters.push(buildSqlParameter(rawParameters[i]));
    }
  } else {
    parameters.push(buildSqlParameter(rawParameters));
  }
  return parameters;
}

/**
 * @internal
 * @ignore
 * Helper utility to build an instance of parsed SQL parameteras `Parameter`
 * from given input
 * @param value
 */
function buildSqlParameter(value: RawSqlParameter): SqlParameter {
  const rawValue = value["Value"]["_"];
  const type = value["Value"]["$"]["i:type"].toString().substring(5);
  let parsedValue: any;
  switch (type) {
    case "int":
      parsedValue = getIntegerOrUndefined(rawValue);
      break;
    case "string":
    case "long":
    case "date":
      parsedValue = rawValue;
      break;

    default:
      throw new Error(
        `Invalid type "${type}" on the SQL Parameter. Must be either of "interface, "string", "long" or "date".`
      );
  }
  const parameter: SqlParameter = {
    key: value["Key"],
    value: parsedValue,
    type: type
  };
  return parameter;
}

/**
 * @internal
 * @ignore
 * Helper utility to extract array of `RawSqlParameter` instances from given input,
 * or undefined if not passed in.
 * @param value
 */
export function getRawSqlParameters(parameters: SqlParameter[] | undefined): any {
  if (parameters == undefined) {
    return undefined;
  }

  if (!Array.isArray(parameters)) {
    throw new TypeError(
      `parameters must be an array of SqlParameter objects or undefined, but received ${JSON.stringify(
        parameters,
        undefined,
        2
      )}`
    );
  }

  const rawParameters: RawSqlParameter[] = [];
  for (let i = 0; i < parameters.length; i++) {
    rawParameters.push(buildRawSqlParameter(parameters[i]));
  }
  return { KeyValueOfstringanyType: rawParameters };
}

/**
 * @internal
 * @ignore
 * Helper utility to build an instance of raw SQL parameter as `RawSqlParameter`
 * from given `SqlParameter` input,
 * @param parameter parsed SQL parameter instance
 */
function buildRawSqlParameter(parameter: SqlParameter): RawSqlParameter {
  if (!isJSONLikeObject(parameter) || parameter === null) {
    throw new TypeError(
      `Expected SQL parameter input to be a JS object value, but received ${JSON.stringify(
        parameter,
        undefined,
        2
      )}`
    );
  }

  let type: SqlParameterType;
  switch (parameter.type) {
    case "int":
      type = SqlParameterType.Integer;
      break;
    case "string":
      type = SqlParameterType.String;
      break;
    case "long":
      type = SqlParameterType.Long;
      break;
    case "date":
      type = SqlParameterType.Date;
      break;

    default:
      throw new Error(
        `Invalid type "${parameter.type}" supplied for the SQL Parameter. Must be either of "interface, "string", "long" or "date".`
      );
  }

  const rawParameterValue: any = {};
  rawParameterValue[Constants.XML_METADATA_MARKER] = {
    "p4:type": type.valueOf(),
    "xmlns:l28": "http://www.w3.org/2001/XMLSchema"
  };
  rawParameterValue[Constants.XML_VALUE_MARKER] = parameter.value;

  const rawParameter: RawSqlParameter = {
    Key: parameter.key,
    Value: rawParameterValue
  };
  return rawParameter;
}
