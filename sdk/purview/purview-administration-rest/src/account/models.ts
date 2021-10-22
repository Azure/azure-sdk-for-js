// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface Account {
  /** Gets or sets the identifier. */
  id?: string;
  /** Identity Info on the tracked resource */
  identity?: Identity;
  /** Gets or sets the location. */
  location?: string;
  /** Gets or sets the name. */
  name?: string;
  /** Gets or sets the properties. */
  properties?: AccountProperties;
  /** Gets or sets the Sku. */
  sku?: AccountSku;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: AccountSystemData;
  /** Tags on the azure resource. */
  tags?: Record<string, string>;
  /** Gets or sets the type. */
  type?: string;
}

export interface Identity {
  /** Service principal object Id */
  principalId?: string;
  /** Tenant Id */
  tenantId?: string;
  /** Identity Type */
  type?: "SystemAssigned";
}

export interface AccountProperties {
  /**
   * Cloud connectors.
   * External cloud identifier used as part of scanning configuration.
   */
  cloudConnectors?: CloudConnectors;
  /** Gets the time at which the entity was created. */
  createdAt?: Date;
  /** Gets the creator of the entity. */
  createdBy?: string;
  /** Gets the creators of the entity's object id. */
  createdByObjectId?: string;
  /** The URIs that are the public endpoints of the account. */
  endpoints?: AccountPropertiesEndpoints;
  /** Gets or sets the friendly name. */
  friendlyName?: string;
  /** Gets or sets the managed resource group name */
  managedResourceGroupName?: string;
  /** Gets the resource identifiers of the managed resources. */
  managedResources?: AccountPropertiesManagedResources;
  /** Gets the private endpoint connections information. */
  privateEndpointConnections?: Array<PrivateEndpointConnection>;
  /** Gets or sets the state of the provisioning. */
  provisioningState?:
    | "Unknown"
    | "Creating"
    | "Moving"
    | "Deleting"
    | "SoftDeleting"
    | "SoftDeleted"
    | "Failed"
    | "Succeeded"
    | "Canceled";
  /** Gets or sets the public network access. */
  publicNetworkAccess?: "NotSpecified" | "Enabled" | "Disabled";
}

export interface CloudConnectors {
  /**
   * AWS external identifier.
   * Configured in AWS to allow use of the role arn used for scanning
   */
  awsExternalId?: string;
}

export interface AccountEndpoints {
  /** Gets the catalog endpoint. */
  catalog?: string;
  /** Gets the guardian endpoint. */
  guardian?: string;
  /** Gets the scan endpoint. */
  scan?: string;
}

export interface AccountPropertiesEndpoints extends AccountEndpoints {}

export interface ManagedResources {
  /** Gets the managed event hub namespace resource identifier. */
  eventHubNamespace?: string;
  /** Gets the managed resource group resource identifier. This resource group will host resource dependencies for the account. */
  resourceGroup?: string;
  /** Gets the managed storage account resource identifier. */
  storageAccount?: string;
}

export interface AccountPropertiesManagedResources extends ManagedResources {}

export interface PrivateEndpointConnection {
  /** Gets or sets the identifier. */
  id?: string;
  /** Gets or sets the name. */
  name?: string;
  /** The connection identifier. */
  properties?: PrivateEndpointConnectionProperties;
  /** Gets or sets the type. */
  type?: string;
}

export interface PrivateEndpointConnectionProperties {
  /** The private endpoint information. */
  privateEndpoint?: PrivateEndpoint;
  /** The private link service connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state. */
  provisioningState?: string;
}

export interface PrivateEndpoint {
  /** The private endpoint identifier. */
  id?: string;
}

export interface PrivateLinkServiceConnectionState {
  /** The required actions. */
  actionsRequired?: string;
  /** The description. */
  description?: string;
  /** The status. */
  status?: "Unknown" | "Pending" | "Approved" | "Rejected" | "Disconnected";
}

export interface AccountSku {
  /** Gets or sets the sku capacity. Possible values include: 4, 16 */
  capacity?: number;
  /** Gets or sets the sku name. */
  name?: "Standard";
}

export interface SystemData {
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of the last modification the resource (UTC). */
  lastModifiedAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
}

export interface AccountSystemData extends SystemData {}

export interface ErrorResponseModel {
  /** Gets or sets the error. */
  error?: ErrorResponseModelError;
}

export interface ErrorModel {
  /** Gets or sets the code. */
  code?: string;
  /** Gets or sets the details. */
  details?: Array<ErrorModel>;
  /** Gets or sets the messages. */
  message?: string;
  /** Gets or sets the target. */
  target?: string;
}

export interface ErrorResponseModelError extends ErrorModel {}

export interface DataPlaneAccountUpdateParameters {
  /** The friendly name for the azure resource. */
  friendlyName?: string;
}

export interface AccessKeys {
  /** Gets or sets the primary connection string. */
  atlasKafkaPrimaryEndpoint?: string;
  /** Gets or sets the secondary connection string. */
  atlasKafkaSecondaryEndpoint?: string;
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

export interface CollectionList {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<Collection>;
}

export interface CollectionNameResponseList {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<CollectionNameResponse>;
}

export interface CollectionNameResponse {
  /** Gets or sets the friendly name of the collection. */
  friendlyName?: string;
  /** Gets the name. */
  name?: string;
}

export interface CollectionPathResponse {
  /** The friendly names of ancestors starting from the default (root) collection and ending with the immediate parent. */
  parentFriendlyNameChain?: Array<string>;
  /** The names of ancestors starting from the default (root) collection and ending with the immediate parent. */
  parentNameChain?: Array<string>;
}

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
  modifiedAt?: Date;
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

export interface ResourceSetRuleConfigList {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<ResourceSetRuleConfig>;
}
