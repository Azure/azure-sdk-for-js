// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface MetadataRoleListOutput {
  values: Array<MetadataRoleOutput>;
  nextLink?: string;
}

export interface MetadataRoleOutput {
  /** The Id of role */
  id?: string;
  /** The name of role */
  name?: string;
  /** The type of role */
  type?: string;
  properties?: MetadataRolePropertiesOutput;
}

export interface MetadataRolePropertiesOutput {
  /** The provisioningState of role */
  provisioningState?: string;
  /** The type of role */
  roleType?: string;
  /** The friendly name of role */
  friendlyName?: string;
  /** The description of role */
  description?: string;
  /** The cnf Condition for a rule */
  cnfCondition?: Array<Array<AttributeMatcherOutput>>;
  /** The dnf Condition for a rule */
  dnfCondition?: Array<Array<AttributeMatcherOutput>>;
  /** The version of role */
  version?: number;
}

export interface AttributeMatcherOutput {
  /** AttributeName */
  attributeName?: string;
  /** Value for attribute */
  attributeValueIncludes?: string;
  /** List of values for attribute */
  attributeValueIncludedIn?: Array<string>;
  /** Value excluded for attribute */
  attributeValueExcludes?: string;
  /** List of values excluded for attribute */
  attributeValueExcludedIn?: Array<string>;
}

export interface ErrorResponseModelOutput {
  /** The error model for metadata policy */
  error: ErrorModelOutput;
}

export interface ErrorModelOutput {
  /** The error code */
  code: string;
  /** The error message */
  message: string;
  /** The error target */
  target?: string;
  /** The error details */
  details?: Array<ErrorModelOutput>;
}

export interface MetadataPolicyListOutput {
  values: Array<MetadataPolicyOutput>;
  nextLink?: string;
}

export interface MetadataPolicyOutput {
  /** The name of policy */
  name?: string;
  /** The id of policy */
  id?: string;
  /** The version of policy */
  version?: number;
  properties?: MetadataPolicyPropertiesOutput;
}

export interface MetadataPolicyPropertiesOutput {
  /** The description of policy */
  description?: string;
  /** The DecisionRules of policy */
  decisionRules?: Array<DecisionRuleOutput>;
  /** The AttributeRules of policy */
  attributeRules?: Array<AttributeRuleOutput>;
  /** The collection reference for a policy */
  collection?: CollectionReferenceOutput;
  /** The parent collection of the policy */
  parentCollectionName?: string;
}

export interface DecisionRuleOutput {
  /** The kind of rule */
  kind?: "decisionrule" | "attributerule";
  /** The effect for rule */
  effect?: "Deny" | "Permit";
  /** The dnf Condition for a rule */
  dnfCondition?: Array<Array<AttributeMatcherOutput>>;
}

export interface AttributeRuleOutput {
  /** The kind of rule */
  kind?: "decisionrule" | "attributerule";
  /** The id for rule */
  id?: string;
  /** The name for rule */
  name?: string;
  /** The dnf Condition for a rule */
  dnfCondition?: Array<Array<AttributeMatcherOutput>>;
}

export interface CollectionReferenceOutput {
  /** The type of reference */
  type?: string;
  /** The name of reference */
  referenceName?: string;
}
