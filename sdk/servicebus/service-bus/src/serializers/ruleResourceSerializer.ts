// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse } from "@azure/core-client";
import { CorrelationRuleFilter } from "../core/managementClient";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest,
} from "../util/atomXmlHelper";
import * as Constants from "../util/constants";
import { isDefined, isObjectWithProperties } from "@azure/core-util";
import { getString, getStringOrUndefined } from "../util/utils";

/**
 * @internal
 * Builds the rule object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildRule(rawRule: Record<string, any>): RuleProperties {
  return {
    name: getString(rawRule["RuleName"], "ruleName"),
    filter: getTopicFilter(rawRule["Filter"]),
    action: getRuleAction(rawRule["Action"]),
  };
}

/**
 * @internal
 * Helper utility to retrieve `filter` value from given input,
 * or undefined if not passed in.
 */
function getTopicFilter(value: any): SqlRuleFilter | CorrelationRuleFilter {
  let result: SqlRuleFilter | CorrelationRuleFilter;

  if (isDefined(value["SqlExpression"])) {
    result = {
      sqlExpression: value["SqlExpression"],
      sqlParameters: getKeyValuePairsOrUndefined(value["Parameters"], "SQLParameters"),
    };
  } else {
    result = {
      correlationId: getStringOrUndefined(value["CorrelationId"]),
      subject: getStringOrUndefined(value["Label"]),
      to: getStringOrUndefined(value["To"]),
      replyTo: getStringOrUndefined(value["ReplyTo"]),
      replyToSessionId: getStringOrUndefined(value["ReplyToSessionId"]),
      sessionId: getStringOrUndefined(value["SessionId"]),
      messageId: getStringOrUndefined(value["MessageId"]),
      contentType: getStringOrUndefined(value["ContentType"]),
      applicationProperties: getKeyValuePairsOrUndefined(
        value["Properties"],
        "ApplicationProperties"
      ),
    };
  }
  return result;
}

/**
 * @internal
 * Helper utility to retrieve rule `action` value from given input.
 */
function getRuleAction(value: any): SqlRuleAction {
  return {
    sqlExpression: value["SqlExpression"],
    sqlParameters: getKeyValuePairsOrUndefined(value["Parameters"], "SQLParameters"),
  };
}

/**
 * Represents the options to create a rule for a subscription.
 * @internal
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
 * Represents all possible fields on SqlRuleAction
 */
export type SqlRuleAction = {
  /**
   * SQL expression to use in the rule action.
   */
  sqlExpression?: string;

  /**
   * SQL parameters to the SQL expression in the rule action.
   */
  sqlParameters?: { [key: string]: string | number | boolean };
};

/**
 * Represents all possible fields on SqlRuleFilter
 */
export interface SqlRuleFilter {
  /**
   * SQL expression to use in the rule filter. It is evaluated against the messages'
   * user-defined properties and system properties. All system properties will be prefixed with
   * `sys.` in the condition expression.
   * Defaults to creating a true filter if none specified
   */
  sqlExpression: string;

  /**
   * SQL parameters to the SQL expression in the rule filter.
   */
  sqlParameters?: { [key: string]: string | number | boolean };
}

/**
 * @internal
 *
 */
export interface InternalRuleOptions {
  Name: string;
  Filter: any;
  Action: any;
}

/**
 * @internal
 *
 */
export function buildInternalRuleResource(rule: CreateRuleOptions): InternalRuleOptions {
  const resource: InternalRuleOptions = {
    Filter: {},
    Action: {},
    Name: rule.name,
  };

  if (!isDefined(rule.filter)) {
    // Defaults to creating a true filter if none specified
    resource.Filter = {
      SqlExpression: "1=1",
    };
    resource.Filter[Constants.XML_METADATA_MARKER] = {
      "p4:type": "SqlFilter",
      "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
    };
  } else {
    if (isObjectWithProperties(rule.filter, ["sqlExpression"])) {
      const sqlFilter: SqlRuleFilter = rule.filter as SqlRuleFilter;
      resource.Filter = {
        SqlExpression: sqlFilter.sqlExpression,
        Parameters: buildInternalRawKeyValuePairs(sqlFilter.sqlParameters, "sqlParameters"),
      };
      resource.Filter[Constants.XML_METADATA_MARKER] = {
        "p4:type": "SqlFilter",
        "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
      };
    } else {
      const correlationFilter: CorrelationRuleFilter = rule.filter as CorrelationRuleFilter;

      resource.Filter = {
        CorrelationId: correlationFilter.correlationId,
        Label: correlationFilter.subject,
        To: correlationFilter.to,
        ReplyTo: correlationFilter.replyTo,
        ReplyToSessionId: correlationFilter.replyToSessionId,
        ContentType: correlationFilter.contentType,
        SessionId: correlationFilter.sessionId,
        MessageId: correlationFilter.messageId,
        Properties: buildInternalRawKeyValuePairs(
          correlationFilter.applicationProperties,
          "applicationProperties"
        ),
      };
      resource.Filter[Constants.XML_METADATA_MARKER] = {
        "p4:type": "CorrelationFilter",
        "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
      };
    }
  }

  if (!isDefined(rule.action) || !isDefined(rule.action.sqlExpression)) {
    // Defaults to creating an empty rule action instance if none specified
    resource.Action = {};
    resource.Action[Constants.XML_METADATA_MARKER] = {
      "p4:type": "EmptyRuleAction",
      "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
    };
  } else {
    resource.Action = {
      SqlExpression: rule.action.sqlExpression,
      Parameters: buildInternalRawKeyValuePairs(rule.action.sqlParameters, "sqlParameters"),
    };
    resource.Action[Constants.XML_METADATA_MARKER] = {
      "p4:type": "SqlRuleAction",
      "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
    };
  }

  return resource;
}

/**
 * @internal
 * RuleResourceSerializer for serializing / deserializing Rule entities
 */
export class RuleResourceSerializer implements AtomXmlSerializer {
  serialize(rule: RuleProperties): Record<string, unknown> {
    return serializeToAtomXmlRequest("RuleDescription", buildInternalRuleResource(rule));
  }

  async deserialize(response: FullOperationResponse): Promise<FullOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName", "SubscriptionName", "RuleName"], response);
  }
}

/**
 * @internal
 */
export function isSqlRuleAction(action: unknown): action is SqlRuleAction {
  return isObjectWithProperties(action, ["sqlExpression"]);
}

/**
 * Service expects the XML request with the special type names serialized in the request,
 * the request would fail otherwise.
 *
 * @internal
 */
enum TypeMapForRequestSerialization {
  double = "l28:double",
  string = "l28:string",
  long = "l28:long",
  date = "l28:dateTime",
  boolean = "l28:boolean",
}

/**
 * @internal
 */
enum TypeMapForResponseDeserialization {
  int = "int",
  double = "double",
  string = "string",
  boolean = "boolean",
  date = "dateTime",
}

/**
 * @internal
 * Internal representation of key-value pair
 */
type RawKeyValuePair = {
  Key: string;
  Value: any;
};

/**
 * @internal
 */
interface InternalRawKeyValuePairs {
  KeyValueOfstringanyType: RawKeyValuePair[];
}

/**
 * Key-value pairs are supposed to be wrapped with this tag in the XML request, they are ignored otherwise.
 *
 * @internal
 */
const keyValuePairXMLTag = "KeyValueOfstringanyType";

/**
 * @internal
 * Helper utility to retrieve the key-value pairs from the RawKeyValue object from given input,
 * or undefined if not passed in.
 */
function getKeyValuePairsOrUndefined(
  value: any,
  attribute: "ApplicationProperties" | "SQLParameters"
): { [key: string]: any } | undefined {
  if (!value) {
    return undefined;
  }
  const properties: any = {};
  let rawProperties;
  if (!Array.isArray(value[keyValuePairXMLTag]) && value[keyValuePairXMLTag]?.Key) {
    // When a single property is present,
    //    value["KeyValueOfstringanyType"] is { Key: <key>, Value: [Object] }
    // When multiple properties are present,
    //    value["KeyValueOfstringanyType"] is [ { Key: <key-1>, Value: [Object] }, { Key: <key-2>, Value: [Object] } ]
    // For consistency, wrapping `value["KeyValueOfstringanyType"]` as an array for the "single property" case.
    rawProperties = [value[keyValuePairXMLTag]];
  } else {
    rawProperties = value[keyValuePairXMLTag];
  }
  if (Array.isArray(rawProperties)) {
    for (const rawProperty of rawProperties) {
      const key = rawProperty.Key;
      const _value = rawProperty.Value["_"];
      const encodedValueType = rawProperty.Value["$"]["i:type"].toString().substring(5);
      if (
        encodedValueType === TypeMapForResponseDeserialization.int ||
        encodedValueType === TypeMapForResponseDeserialization.double
      ) {
        properties[key] = Number(_value);
      } else if (encodedValueType === TypeMapForResponseDeserialization.string) {
        properties[key] = _value;
      } else if (encodedValueType === TypeMapForResponseDeserialization.boolean) {
        properties[key] = _value === "true" ? true : false;
      } else if (encodedValueType === TypeMapForResponseDeserialization.date) {
        properties[key] = new Date(_value);
      } else {
        throw new TypeError(
          `Unable to parse the key-value pairs in the response - ${JSON.stringify(rawProperty)}`
        );
      }
    }
  } else {
    throw new TypeError(
      `${attribute} in the response is not an array, unable to parse the response - ${JSON.stringify(
        value
      )}`
    );
  }
  return properties;
}

/**
 * @internal
 * Helper utility to extract array of user properties key-value instances from given input,
 * or undefined if not passed in.
 */
export function buildInternalRawKeyValuePairs(
  parameters: { [key: string]: any } | undefined,
  attribute: "applicationProperties" | "sqlParameters"
): InternalRawKeyValuePairs | undefined {
  if (!isDefined(parameters)) {
    return undefined;
  }
  if (
    Array.isArray(parameters) ||
    typeof parameters === "string" ||
    typeof parameters !== "object" ||
    Object.entries(parameters).length < 1
  ) {
    throw new TypeError(
      `Unsupported value for the ${attribute} ${JSON.stringify(
        parameters
      )}, expected a JSON object with key-value pairs.`
    );
  }
  const rawParameters: RawKeyValuePair[] = [];
  for (const key of Object.keys(parameters)) {
    let type: string | number | boolean;
    let value = parameters[key];
    if (typeof value === "number") {
      type = TypeMapForRequestSerialization.double;
    } else if (typeof value === "string") {
      type = TypeMapForRequestSerialization.string;
    } else if (typeof value === "boolean") {
      type = TypeMapForRequestSerialization.boolean;
    } else if (value instanceof Date && !isNaN(value.valueOf())) {
      type = TypeMapForRequestSerialization.date;
      value = value.toJSON();
    } else {
      throw new TypeError(
        `Unsupported type for the value in the ${attribute} for the key '${key}'`
      );
    }

    const rawParameter: RawKeyValuePair = {
      Key: key,
      Value: {
        [Constants.XML_METADATA_MARKER]: {
          "p4:type": type,
          "xmlns:l28": "http://www.w3.org/2001/XMLSchema",
        },
        [Constants.XML_VALUE_MARKER]: value,
      },
    };
    rawParameters.push(rawParameter);
  }
  return {
    [keyValuePairXMLTag]: rawParameters,
  };
}
