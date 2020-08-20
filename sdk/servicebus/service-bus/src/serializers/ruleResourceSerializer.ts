// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "@azure/core-http";
import { CorrelationRuleFilter } from "../core/managementClient";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest
} from "../util/atomXmlHelper";
import * as Constants from "../util/constants";
import {
  getBooleanOrUndefined,
  getIntegerOrUndefined,
  getString,
  getStringOrUndefined,
  isJSONLikeObject
} from "../util/utils";

/**
 * @internal
 * @ignore
 * Builds the rule object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawRule
 */
export function buildRule(rawRule: any): RuleProperties {
  return {
    name: getString(rawRule["RuleName"], "ruleName"),
    filter: getTopicFilter(rawRule["Filter"]),
    action: getRuleAction(rawRule["Action"])
  };
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve `filter` value from given input,
 * or undefined if not passed in.
 * @param value
 */
function getTopicFilter(value: any): SqlRuleFilter | CorrelationRuleFilter {
  let result: SqlRuleFilter | CorrelationRuleFilter;

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
      properties: getUserPropertiesOrUndefined(value["Properties"])
    };
  }
  return result;
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve rule `action` value from given input.
 * @param value
 */
function getRuleAction(value: any): SqlRuleAction {
  return {
    sqlExpression: value["SqlExpression"],
    sqlParameters: getSqlParametersOrUndefined(value["Parameters"]),
    compatibilityLevel: getIntegerOrUndefined(value["CompatibilityLevel"]),
    requiresPreprocessing: getBooleanOrUndefined(value["RequiresPreprocessing"])
  };
}

/**
 * Represents the options to create a rule for a subscription.
 * @internal
 * @ignore
 */
export interface CreateRuleOptions {
  /**
   * Name of the rule
   */
  name: string;

  /**
   * Defines the filter expression that the rule evaluates. For `SqlRuleFilter` input,
   * the expression string is interpreted as a SQL92 expression which must
   * evaluate to True or False. Only one between a `CorrelationRuleFilter` or
   * a `SqlRuleFilter` can be defined.
   */
  filter?: SqlRuleFilter | CorrelationRuleFilter;

  /**
   * The SQL like expression that can be executed on the message should the
   * associated filter apply.
   */
  action?: SqlRuleAction;
}

/**
 * Represents all the attributes of a rule.
 */
export interface RuleProperties {
  /**
   * Name of the rule
   */
  readonly name: string;

  /**
   * Defines the filter expression that the rule evaluates. For `SqlRuleFilter` input,
   * the expression string is interpreted as a SQL92 expression which must
   * evaluate to True or False. Only one between a `CorrelationRuleFilter` or
   * a `SqlRuleFilter` can be defined.
   */
  filter: SqlRuleFilter | CorrelationRuleFilter;

  /**
   * The SQL like expression that can be executed on the message should the
   * associated filter apply.
   */
  action: SqlRuleAction;
}

/**
 * Represents all possible fields on SqlAction
 */
export type SqlRuleAction = SqlRuleFilter;

/**
 * Represents all possible fields on SqlRuleFilter
 */
export interface SqlRuleFilter {
  /**
   * SQL expression to use.
   */
  sqlExpression?: string;

  /**
   * SQL parameters to the expression
   */
  sqlParameters?: SqlParameter[];

  /**
   * This property is reserved for future use. An integer value showing the
   * compatibility level, currently hard-coded to 20.
   */
  compatibilityLevel?: number;

  /**
   * Boolean value indicating whether the SQL filter expression requires preprocessing
   */
  requiresPreprocessing?: boolean;
}

/**
 * @internal
 * @ignore
 * RuleResourceSerializer for serializing / deserializing Rule entities
 */
export class RuleResourceSerializer implements AtomXmlSerializer {
  serialize(rule: RuleProperties): object {
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
        const sqlFilter: SqlRuleFilter = rule.filter as SqlRuleFilter;
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
        const correlationFilter: CorrelationRuleFilter = rule.filter as CorrelationRuleFilter;

        resource.Filter = {
          CorrelationId: correlationFilter.correlationId,
          Label: correlationFilter.label,
          To: correlationFilter.to,
          ReplyTo: correlationFilter.replyTo,
          ReplyToSessionId: correlationFilter.replyToSessionId,
          ContentType: correlationFilter.contentType,
          SessionId: correlationFilter.sessionId,
          MessageId: correlationFilter.messageId,
          Properties: getRawUserProperties(correlationFilter.properties)
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

/**
 * @internal
 * @ignore
 */
export function isSqlRuleAction(action: any): action is SqlRuleAction {
  return action != null && typeof action === "object" && "sqlExpression" in action;
}

/**
 * Service expects the XML request with the special type names serialized in the request,
 * the request would fail otherwise.
 *
 * @internal
 * @ignore
 */
const TypeMapForRequestSerialization: Record<string, string> = {
  int: "l28:int",
  string: "l28:string",
  long: "l28:long",
  date: "l28:date",
  boolean: "l28:boolean"
};

/**
 * @internal
 * @ignore
 */
const TypeMapForResponseDeserialization: Record<string, string> = {
  number: "d6p1:int",
  string: "d6p1:string",
  boolean: "d6p1:boolean"
};

/**
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
 * Internal representation of key-value pair
 */
type RawKeyValuePair = {
  Key: string;
  Value: any;
};

/**
 * @internal
 * @ignore
 */
interface InternalRawKeyValuePairs {
  KeyValueOfstringanyType: RawKeyValuePair[];
}

/**
 * Key-value pairs are supposed to be wrapped with this tag in the XML request, they are ignored otherwise.
 *
 * @internal
 * @ignore
 */
const keyValuePairXMLTag = "KeyValueOfstringanyType";

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

  const rawParameters = value[keyValuePairXMLTag];
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
 * Helper utility to retrieve the user-properties from given input,
 * or undefined if not passed in.
 * @param value
 */
function getUserPropertiesOrUndefined(value: any): { [key: string]: any } | undefined {
  if (!value) {
    return undefined;
  }
  const properties: any = {};
  let rawProperties;
  if (!Array.isArray(value[keyValuePairXMLTag]) && value[keyValuePairXMLTag]?.Key) {
    // When a single property is present,
    //    value["KeyValueOfstringanyType"] = { Key: <key>, Value: [Object] }
    // When multiple properties are present,
    //    value["KeyValueOfstringanyType"] = [ { Key: <key-1>, Value: [Object] }, { Key: <key-2>, Value: [Object] } ]
    // For consistency, wrapping `value["KeyValueOfstringanyType"]` as an array for the "single property" case.
    rawProperties = [value[keyValuePairXMLTag]];
  } else {
    rawProperties = value[keyValuePairXMLTag];
  }
  if (Array.isArray(rawProperties)) {
    for (const rawProperty of rawProperties) {
      if (rawProperty.Value["$"]["i:type"] === TypeMapForResponseDeserialization.number) {
        properties[rawProperty.Key] = Number(rawProperty.Value["_"]);
      } else if (rawProperty.Value["$"]["i:type"] === TypeMapForResponseDeserialization.string) {
        properties[rawProperty.Key] = rawProperty.Value["_"];
      } else if (rawProperty.Value["$"]["i:type"] === TypeMapForResponseDeserialization.boolean) {
        properties[rawProperty.Key] = rawProperty.Value["_"] === "true" ? true : false;
      } else {
        throw new TypeError(
          `Unable to parse the user property in the response - ${JSON.stringify(rawProperty)}`
        );
      }
    }
  } else {
    throw new TypeError(
      `"UserProperties" in the response is not an array, unable to parse the response - ${JSON.stringify(
        value
      )}`
    );
  }
  return properties;
}

/**
 * @internal
 * @ignore
 * Helper utility to build an instance of parsed SQL parameters `Parameter`
 * from given input
 * @param value
 */
function buildSqlParameter(value: RawKeyValuePair): SqlParameter {
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
      throw new TypeError(
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
export function getRawSqlParameters(
  parameters: SqlParameter[] | undefined
): InternalRawKeyValuePairs | undefined {
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

  const rawParameters: RawKeyValuePair[] = [];
  for (let i = 0; i < parameters.length; i++) {
    rawParameters.push(buildRawKeyValuePairFromSqlParameter(parameters[i]));
  }
  return { [keyValuePairXMLTag]: rawParameters };
}

/**
 * @internal
 * @ignore
 * Helper utility to extract array of user properties key-value instances from given input,
 * or undefined if not passed in.
 * @param value
 */
export function getRawUserProperties(
  parameters: { [key: string]: any } | undefined
): InternalRawKeyValuePairs | undefined {
  if (parameters == undefined) {
    return undefined;
  }
  if (
    Array.isArray(parameters) ||
    typeof parameters === "string" ||
    typeof parameters !== "object" ||
    Object.entries(parameters).length < 1
  ) {
    throw new TypeError(
      `Unsupported value for the properties ${JSON.stringify(
        parameters
      )}, expected a JSON object with key-value pairs.`
    );
  }
  const rawParameters: RawKeyValuePair[] = [];
  for (let [key, value] of Object.entries(parameters)) {
    let type: string | number | boolean;
    if (typeof value === "number") {
      type = TypeMapForRequestSerialization.int;
    } else if (typeof value === "string") {
      type = TypeMapForRequestSerialization.string;
    } else if (typeof value === "boolean") {
      type = TypeMapForRequestSerialization.boolean;
    } else {
      throw new TypeError(
        `Unsupported type for the value in the user property {${key}:${JSON.stringify(value)}}`
      );
    }

    const rawParameter: RawKeyValuePair = {
      Key: key,
      Value: {
        [Constants.XML_METADATA_MARKER]: {
          "p4:type": type,
          "xmlns:l28": "http://www.w3.org/2001/XMLSchema"
        },
        [Constants.XML_VALUE_MARKER]: value
      }
    };
    rawParameters.push(rawParameter);
  }
  return {
    [keyValuePairXMLTag]: rawParameters
  };
}

/**
 * @internal
 * @ignore
 * Helper utility to build an instance of raw SQL parameter as `RawKeyValuePair`
 * from given `SqlParameter` input,
 * @param parameter parsed SQL parameter instance
 */
function buildRawKeyValuePairFromSqlParameter(parameter: SqlParameter): RawKeyValuePair {
  if (!isJSONLikeObject(parameter) || parameter === null) {
    throw new TypeError(
      `Expected SQL parameter input to be a JS object value, but received ${JSON.stringify(
        parameter,
        undefined,
        2
      )}`
    );
  }

  let paramType = TypeMapForRequestSerialization[parameter.type];
  if (!paramType) {
    throw new Error(
      `Invalid type "${parameter.type}" supplied for the SQL Parameter. Must be either of "int", "string", "long" or "date".`
    );
  }

  const rawParameter: RawKeyValuePair = {
    Key: parameter.key,
    Value: {
      [Constants.XML_METADATA_MARKER]: {
        "p4:type": paramType,
        "xmlns:l28": "http://www.w3.org/2001/XMLSchema"
      },
      [Constants.XML_VALUE_MARKER]: parameter.value
    }
  };
  return rawParameter;
}
