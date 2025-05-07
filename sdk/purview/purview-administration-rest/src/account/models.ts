// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Metadata pertaining to creation and last modification of the resource. */
export interface AccountSystemData extends SystemData {}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {}

/** The account properties that can be updated through data plane. */
export interface DataPlaneAccountUpdateParameters {
  /** The friendly name for the azure resource. */
  friendlyName?: string;
}

/** A access key options used for regeneration. */
export interface AccessKeyOptions {
  /** The access key type. */
  keyType?: "PrimaryAtlasKafkaKey" | "SecondaryAtlasKafkaKey";
}

/** Collection resource. */
export interface Collection {
  /** Gets or sets the description. */
  description?: string;
  /** Gets or sets the friendly name of the collection. */
  friendlyName?: string;
  /** Gets or sets the parent collection reference. */
  parentCollection?: CollectionReference;
}

/** Reference to a Collection. */
export interface CollectionReference {
  /** Gets or sets the reference name. */
  referenceName?: string;
  /** Gets or sets the reference type property. */
  type?: string;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface CollectionSystemData extends SystemData {}

/** ResourceSetRuleConfig implementation class. */
export interface ResourceSetRuleConfig {
  /** Gets or sets the advanced resource set property of the account. */
  advancedResourceSet?: AdvancedResourceSet;
  /** The configuration rules for path pattern extraction. */
  pathPatternConfig?: PathPatternExtractorConfig;
}

/** The resource set processing property of the account. */
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
