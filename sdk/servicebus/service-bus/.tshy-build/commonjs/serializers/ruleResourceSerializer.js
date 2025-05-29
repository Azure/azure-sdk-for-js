"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleResourceSerializer = void 0;
exports.buildRule = buildRule;
exports.buildInternalRuleResource = buildInternalRuleResource;
exports.isSqlRuleAction = isSqlRuleAction;
exports.buildInternalRawKeyValuePairs = buildInternalRawKeyValuePairs;
const tslib_1 = require("tslib");
const atomXmlHelper_js_1 = require("../util/atomXmlHelper.js");
const Constants = tslib_1.__importStar(require("../util/constants.js"));
const core_util_1 = require("@azure/core-util");
const utils_js_1 = require("../util/utils.js");
/**
 * @internal
 * Builds the rule object from the raw json object gotten after deserializing the
 * response from the service
 */
function buildRule(rawRule) {
    return {
        name: (0, utils_js_1.getString)(rawRule["RuleName"], "ruleName"),
        filter: getTopicFilter(rawRule["Filter"]),
        action: getRuleAction(rawRule["Action"]),
    };
}
/**
 * @internal
 * Helper utility to retrieve `filter` value from given input,
 * or undefined if not passed in.
 */
function getTopicFilter(value) {
    let result;
    if ((0, core_util_1.isDefined)(value["SqlExpression"])) {
        result = {
            sqlExpression: value["SqlExpression"],
            sqlParameters: getKeyValuePairsOrUndefined(value["Parameters"], "SQLParameters"),
        };
    }
    else {
        result = {
            correlationId: (0, utils_js_1.getStringOrUndefined)(value["CorrelationId"]),
            subject: (0, utils_js_1.getStringOrUndefined)(value["Label"]),
            to: (0, utils_js_1.getStringOrUndefined)(value["To"]),
            replyTo: (0, utils_js_1.getStringOrUndefined)(value["ReplyTo"]),
            replyToSessionId: (0, utils_js_1.getStringOrUndefined)(value["ReplyToSessionId"]),
            sessionId: (0, utils_js_1.getStringOrUndefined)(value["SessionId"]),
            messageId: (0, utils_js_1.getStringOrUndefined)(value["MessageId"]),
            contentType: (0, utils_js_1.getStringOrUndefined)(value["ContentType"]),
            applicationProperties: getKeyValuePairsOrUndefined(value["Properties"], "ApplicationProperties"),
        };
    }
    return result;
}
/**
 * @internal
 * Helper utility to retrieve rule `action` value from given input.
 */
function getRuleAction(value) {
    return {
        sqlExpression: value["SqlExpression"],
        sqlParameters: getKeyValuePairsOrUndefined(value["Parameters"], "SQLParameters"),
    };
}
/**
 * @internal
 *
 */
function buildInternalRuleResource(rule) {
    const resource = {
        Filter: {},
        Action: {},
        Name: rule.name,
    };
    if (!(0, core_util_1.isDefined)(rule.filter)) {
        // Defaults to creating a true filter if none specified
        resource.Filter = {
            SqlExpression: "1=1",
        };
        resource.Filter[Constants.XML_METADATA_MARKER] = {
            "p4:type": "SqlFilter",
            "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
        };
    }
    else {
        if ((0, core_util_1.isObjectWithProperties)(rule.filter, ["sqlExpression"])) {
            const sqlFilter = rule.filter;
            resource.Filter = {
                SqlExpression: sqlFilter.sqlExpression,
                Parameters: buildInternalRawKeyValuePairs(sqlFilter.sqlParameters, "sqlParameters"),
            };
            resource.Filter[Constants.XML_METADATA_MARKER] = {
                "p4:type": "SqlFilter",
                "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
            };
        }
        else {
            const correlationFilter = rule.filter;
            resource.Filter = {
                CorrelationId: correlationFilter.correlationId,
                Label: correlationFilter.subject,
                To: correlationFilter.to,
                ReplyTo: correlationFilter.replyTo,
                ReplyToSessionId: correlationFilter.replyToSessionId,
                ContentType: correlationFilter.contentType,
                SessionId: correlationFilter.sessionId,
                MessageId: correlationFilter.messageId,
                Properties: buildInternalRawKeyValuePairs(correlationFilter.applicationProperties, "applicationProperties"),
            };
            resource.Filter[Constants.XML_METADATA_MARKER] = {
                "p4:type": "CorrelationFilter",
                "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
            };
        }
    }
    if (!(0, core_util_1.isDefined)(rule.action) || !(0, core_util_1.isDefined)(rule.action.sqlExpression)) {
        // Defaults to creating an empty rule action instance if none specified
        resource.Action = {};
        resource.Action[Constants.XML_METADATA_MARKER] = {
            "p4:type": "EmptyRuleAction",
            "xmlns:p4": "http://www.w3.org/2001/XMLSchema-instance",
        };
    }
    else {
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
class RuleResourceSerializer {
    serialize(rule) {
        return (0, atomXmlHelper_js_1.serializeToAtomXmlRequest)("RuleDescription", buildInternalRuleResource(rule));
    }
    async deserialize(response) {
        return (0, atomXmlHelper_js_1.deserializeAtomXmlResponse)(["TopicName", "SubscriptionName", "RuleName"], response);
    }
}
exports.RuleResourceSerializer = RuleResourceSerializer;
/**
 * @internal
 */
function isSqlRuleAction(action) {
    return (0, core_util_1.isObjectWithProperties)(action, ["sqlExpression"]);
}
/**
 * Service expects the XML request with the special type names serialized in the request,
 * the request would fail otherwise.
 *
 * @internal
 */
var TypeMapForRequestSerialization;
(function (TypeMapForRequestSerialization) {
    TypeMapForRequestSerialization["double"] = "l28:double";
    TypeMapForRequestSerialization["string"] = "l28:string";
    TypeMapForRequestSerialization["long"] = "l28:long";
    TypeMapForRequestSerialization["date"] = "l28:dateTime";
    TypeMapForRequestSerialization["boolean"] = "l28:boolean";
})(TypeMapForRequestSerialization || (TypeMapForRequestSerialization = {}));
/**
 * @internal
 */
var TypeMapForResponseDeserialization;
(function (TypeMapForResponseDeserialization) {
    TypeMapForResponseDeserialization["int"] = "int";
    TypeMapForResponseDeserialization["double"] = "double";
    TypeMapForResponseDeserialization["string"] = "string";
    TypeMapForResponseDeserialization["boolean"] = "boolean";
    TypeMapForResponseDeserialization["date"] = "dateTime";
})(TypeMapForResponseDeserialization || (TypeMapForResponseDeserialization = {}));
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
function getKeyValuePairsOrUndefined(value, attribute) {
    var _a;
    if (!value) {
        return undefined;
    }
    const properties = {};
    let rawProperties;
    if (!Array.isArray(value[keyValuePairXMLTag]) && ((_a = value[keyValuePairXMLTag]) === null || _a === void 0 ? void 0 : _a.Key)) {
        // When a single property is present,
        //    value["KeyValueOfstringanyType"] is { Key: <key>, Value: [Object] }
        // When multiple properties are present,
        //    value["KeyValueOfstringanyType"] is [ { Key: <key-1>, Value: [Object] }, { Key: <key-2>, Value: [Object] } ]
        // For consistency, wrapping `value["KeyValueOfstringanyType"]` as an array for the "single property" case.
        rawProperties = [value[keyValuePairXMLTag]];
    }
    else {
        rawProperties = value[keyValuePairXMLTag];
    }
    if (Array.isArray(rawProperties)) {
        for (const rawProperty of rawProperties) {
            const key = rawProperty.Key;
            const _value = rawProperty.Value["_"];
            const encodedValueType = rawProperty.Value["$"]["i:type"].toString().substring(5);
            if (encodedValueType === TypeMapForResponseDeserialization.int ||
                encodedValueType === TypeMapForResponseDeserialization.double) {
                properties[key] = Number(_value);
            }
            else if (encodedValueType === TypeMapForResponseDeserialization.string) {
                properties[key] = _value;
            }
            else if (encodedValueType === TypeMapForResponseDeserialization.boolean) {
                properties[key] = _value === "true" ? true : false;
            }
            else if (encodedValueType === TypeMapForResponseDeserialization.date) {
                properties[key] = new Date(_value);
            }
            else {
                throw new TypeError(`Unable to parse the key-value pairs in the response - ${JSON.stringify(rawProperty)}`);
            }
        }
    }
    else {
        throw new TypeError(`${attribute} in the response is not an array, unable to parse the response - ${JSON.stringify(value)}`);
    }
    return properties;
}
/**
 * @internal
 * Helper utility to extract array of user properties key-value instances from given input,
 * or undefined if not passed in.
 */
function buildInternalRawKeyValuePairs(parameters, attribute) {
    if (!(0, core_util_1.isDefined)(parameters)) {
        return undefined;
    }
    if (Array.isArray(parameters) ||
        typeof parameters === "string" ||
        typeof parameters !== "object" ||
        Object.entries(parameters).length < 1) {
        throw new TypeError(`Unsupported value for the ${attribute} ${JSON.stringify(parameters)}, expected a JSON object with key-value pairs.`);
    }
    const rawParameters = [];
    for (const key of Object.keys(parameters)) {
        let type;
        let value = parameters[key];
        if (typeof value === "number") {
            type = TypeMapForRequestSerialization.double;
        }
        else if (typeof value === "string") {
            type = TypeMapForRequestSerialization.string;
        }
        else if (typeof value === "boolean") {
            type = TypeMapForRequestSerialization.boolean;
        }
        else if (value instanceof Date && !isNaN(value.valueOf())) {
            type = TypeMapForRequestSerialization.date;
            value = value.toJSON();
        }
        else {
            throw new TypeError(`Unsupported type for the value in the ${attribute} for the key '${key}'`);
        }
        const rawParameter = {
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
//# sourceMappingURL=ruleResourceSerializer.js.map