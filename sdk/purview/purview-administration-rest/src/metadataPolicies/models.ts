// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AttributeMatcher {
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

export interface MetadataPolicy {
  /** The name of policy */
  name?: string;
  /** The id of policy */
  id?: string;
  /** The version of policy */
  version?: number;
  properties?: MetadataPolicyProperties;
}

export interface MetadataPolicyProperties {
  /** The description of policy */
  description?: string;
  /** The DecisionRules of policy */
  decisionRules?: Array<DecisionRule>;
  /** The AttributeRules of policy */
  attributeRules?: Array<AttributeRule>;
  /** The collection reference for a policy */
  collection?: CollectionReference;
  /** The parent collection of the policy */
  parentCollectionName?: string;
}

export interface DecisionRule {
  /** The kind of rule */
  kind?: "decisionrule" | "attributerule";
  /** The effect for rule */
  effect?: "Deny" | "Permit";
  /** The dnf Condition for a rule */
  dnfCondition?: Array<Array<AttributeMatcher>>;
}

export interface AttributeRule {
  /** The kind of rule */
  kind?: "decisionrule" | "attributerule";
  /** The id for rule */
  id?: string;
  /** The name for rule */
  name?: string;
  /** The dnf Condition for a rule */
  dnfCondition?: Array<Array<AttributeMatcher>>;
}

export interface CollectionReference {
  /** The type of reference */
  type?: string;
  /** The name of reference */
  referenceName?: string;
}
