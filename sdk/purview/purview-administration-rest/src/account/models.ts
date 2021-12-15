// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AccountSystemData extends SystemData {}

export interface SystemData {
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date | string;
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of the last modification the resource (UTC). */
  lastModifiedAt?: Date | string;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
}

export interface DataPlaneAccountUpdateParameters {
  /** The friendly name for the azure resource. */
  friendlyName?: string;
}

export interface AccessKeyOptions {
  /** The access key type. */
  keyType?: "PrimaryAtlasKafkaKey" | "SecondaryAtlasKafkaKey";
}

export interface Collection {
  /** Gets the state of the provisioning. */
  collectionProvisioningState?:
    | "Unknown"
    | "Creating"
    | "Moving"
    | "Deleting"
    | "Failed"
    | "Succeeded";
  /** Gets or sets the description. */
  description?: string;
  /** Gets or sets the friendly name of the collection. */
  friendlyName?: string;
  /** Gets the name. */
  name?: string;
  /** Gets or sets the parent collection reference. */
  parentCollection?: CollectionReference;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: CollectionSystemData;
}

export interface CollectionReference {
  /** Gets or sets the reference name. */
  referenceName?: string;
  /** Gets or sets the reference type property. */
  type?: string;
}

export interface CollectionSystemData extends SystemData {}

export interface ResourceSetRuleConfig {
  /** Gets or sets the advanced resource set property of the account. */
  advancedResourceSet?: AdvancedResourceSet;
  /** The name of the rule */
  name?: string;
  /** The configuration rules for path pattern extraction. */
  pathPatternConfig?: PathPatternExtractorConfig;
}

export interface AdvancedResourceSet {
  /** Date at which ResourceSetProcessing property of the account is updated. */
  modifiedAt?: Date | string;
  /** The advanced resource property of the account. */
  resourceSetProcessing?: "Default" | "Advanced";
}

export interface PathPatternExtractorConfig {
  acceptedPatterns?: Array<Filter>;
  complexReplacers?: Array<ComplexReplacerConfig>;
  createdBy: string;
  enableDefaultPatterns: boolean;
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  normalizationRules?: Array<NormalizationRule>;
  regexReplacers?: Array<RegexReplacer>;
  rejectedPatterns?: Array<Filter>;
  scopedRules?: Array<ScopedRule>;
  version?: number;
}

export interface Filter {
  createdBy?: string;
  filterType?: "Pattern" | "Regex";
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  name: string;
  path: string;
}

export interface ComplexReplacerConfig {
  createdBy?: string;
  description?: string;
  disabled?: boolean;
  disableRecursiveReplacerApplication?: boolean;
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  name?: string;
  typeName?: string;
}

export interface NormalizationRule {
  description?: string;
  disabled?: boolean;
  dynamicReplacement?: boolean;
  entityTypes?: Array<string>;
  lastUpdatedTimestamp?: number;
  name?: string;
  regex?: FastRegex;
  replaceWith?: string;
  version?: number;
}

export interface FastRegex {
  maxDigits?: number;
  maxLetters?: number;
  minDashes?: number;
  minDigits?: number;
  minDigitsOrLetters?: number;
  minDots?: number;
  minHex?: number;
  minLetters?: number;
  minUnderscores?: number;
  options?: number;
  regexStr?: string;
}

export interface RegexReplacer {
  condition?: string;
  createdBy?: string;
  description?: string;
  disabled: boolean;
  disableRecursiveReplacerApplication?: boolean;
  doNotReplaceRegex?: FastRegex;
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  name: string;
  regex?: FastRegex;
  replaceWith?: string;
}

export interface ScopedRule {
  bindingUrl: string;
  rules?: Array<Rule>;
  storeType: string;
}

export interface Rule {
  displayName?: string;
  isResourceSet?: boolean;
  lastUpdatedTimestamp?: number;
  name?: string;
  qualifiedName: string;
}
