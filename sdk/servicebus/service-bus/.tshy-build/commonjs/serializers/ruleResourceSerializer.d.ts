import type { FullOperationResponse } from "@azure/core-client";
import type { CorrelationRuleFilter } from "../core/managementClient.js";
import type { AtomXmlSerializer } from "../util/atomXmlHelper.js";
/**
 * @internal
 * Builds the rule object from the raw json object gotten after deserializing the
 * response from the service
 */
export declare function buildRule(rawRule: Record<string, any>): RuleProperties;
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
    sqlParameters?: {
        [key: string]: string | number | boolean;
    };
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
    sqlParameters?: {
        [key: string]: string | number | boolean;
    };
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
export declare function buildInternalRuleResource(rule: CreateRuleOptions): InternalRuleOptions;
/**
 * @internal
 * RuleResourceSerializer for serializing / deserializing Rule entities
 */
export declare class RuleResourceSerializer implements AtomXmlSerializer {
    serialize(rule: RuleProperties): Record<string, unknown>;
    deserialize(response: FullOperationResponse): Promise<FullOperationResponse>;
}
/**
 * @internal
 */
export declare function isSqlRuleAction(action: unknown): action is SqlRuleAction;
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
 * @internal
 * Helper utility to extract array of user properties key-value instances from given input,
 * or undefined if not passed in.
 */
export declare function buildInternalRawKeyValuePairs(parameters: {
    [key: string]: any;
} | undefined, attribute: "applicationProperties" | "sqlParameters"): InternalRawKeyValuePairs | undefined;
export {};
//# sourceMappingURL=ruleResourceSerializer.d.ts.map