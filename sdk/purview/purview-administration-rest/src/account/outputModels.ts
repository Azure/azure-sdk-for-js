// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AccountOutput {
  /** Gets or sets the identifier. */
  id?: string;
  /** Identity Info on the tracked resource */
  identity?: IdentityOutput;
  /** Gets or sets the location. */
  location?: string;
  /** Gets or sets the name. */
  name?: string;
  /** Gets or sets the properties. */
  properties?: AccountPropertiesOutput;
  /** Gets or sets the Sku. */
  sku?: AccountSkuOutput;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: AccountSystemDataOutput;
  /** Tags on the azure resource. */
  tags?: Record<string, string>;
  /** Gets or sets the type. */
  type?: string;
}

export interface IdentityOutput {
  /** Service principal object Id */
  principalId?: string;
  /** Tenant Id */
  tenantId?: string;
  /** Identity Type */
  type?: "SystemAssigned";
}

export interface AccountPropertiesOutput {
  /**
   * Cloud connectors.
   * External cloud identifier used as part of scanning configuration.
   */
  cloudConnectors?: CloudConnectorsOutput;
  /** Gets the time at which the entity was created. */
  createdAt?: string;
  /** Gets the creator of the entity. */
  createdBy?: string;
  /** Gets the creators of the entity's object id. */
  createdByObjectId?: string;
  /** The URIs that are the public endpoints of the account. */
  endpoints?: AccountPropertiesEndpointsOutput;
  /** Gets or sets the friendly name. */
  friendlyName?: string;
  /** Gets or sets the managed resource group name */
  managedResourceGroupName?: string;
  /** Gets the resource identifiers of the managed resources. */
  managedResources?: AccountPropertiesManagedResourcesOutput;
  /** Gets the private endpoint connections information. */
  privateEndpointConnections?: Array<PrivateEndpointConnectionOutput>;
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

export interface CloudConnectorsOutput {
  /**
   * AWS external identifier.
   * Configured in AWS to allow use of the role arn used for scanning
   */
  awsExternalId?: string;
}

export interface AccountPropertiesEndpointsOutput
  extends AccountEndpointsOutput {}

export interface AccountEndpointsOutput {
  /** Gets the catalog endpoint. */
  catalog?: string;
  /** Gets the guardian endpoint. */
  guardian?: string;
  /** Gets the scan endpoint. */
  scan?: string;
}

export interface AccountPropertiesManagedResourcesOutput
  extends ManagedResourcesOutput {}

export interface ManagedResourcesOutput {
  /** Gets the managed event hub namespace resource identifier. */
  eventHubNamespace?: string;
  /** Gets the managed resource group resource identifier. This resource group will host resource dependencies for the account. */
  resourceGroup?: string;
  /** Gets the managed storage account resource identifier. */
  storageAccount?: string;
}

export interface PrivateEndpointConnectionOutput {
  /** Gets or sets the identifier. */
  id?: string;
  /** Gets or sets the name. */
  name?: string;
  /** The connection identifier. */
  properties?: PrivateEndpointConnectionPropertiesOutput;
  /** Gets or sets the type. */
  type?: string;
}

export interface PrivateEndpointConnectionPropertiesOutput {
  /** The private endpoint information. */
  privateEndpoint?: PrivateEndpointOutput;
  /** The private link service connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateOutput;
  /** The provisioning state. */
  provisioningState?: string;
}

export interface PrivateEndpointOutput {
  /** The private endpoint identifier. */
  id?: string;
}

export interface PrivateLinkServiceConnectionStateOutput {
  /** The required actions. */
  actionsRequired?: string;
  /** The description. */
  description?: string;
  /** The status. */
  status?: "Unknown" | "Pending" | "Approved" | "Rejected" | "Disconnected";
}

export interface AccountSkuOutput {
  /** Gets or sets the sku capacity. Possible values include: 4, 16 */
  capacity?: number;
  /** Gets or sets the sku name. */
  name?: "Standard";
}

export interface AccountSystemDataOutput extends SystemDataOutput {}

export interface SystemDataOutput {
  /** The timestamp of resource creation (UTC). */
  createdAt?: string;
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of the last modification the resource (UTC). */
  lastModifiedAt?: string;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
}

export interface ErrorResponseModelOutput {
  /** Gets or sets the error. */
  error?: ErrorResponseModelErrorOutput;
}

export interface ErrorResponseModelErrorOutput extends ErrorModelOutput {}

export interface ErrorModelOutput {
  /** Gets or sets the code. */
  code?: string;
  /** Gets or sets the details. */
  details?: Array<ErrorModelOutput>;
  /** Gets or sets the messages. */
  message?: string;
  /** Gets or sets the target. */
  target?: string;
}

export interface AccessKeysOutput {
  /** Gets or sets the primary connection string. */
  atlasKafkaPrimaryEndpoint?: string;
  /** Gets or sets the secondary connection string. */
  atlasKafkaSecondaryEndpoint?: string;
}

export interface CollectionOutput {
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
  parentCollection?: CollectionReferenceOutput;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: CollectionSystemDataOutput;
}

export interface CollectionReferenceOutput {
  /** Gets or sets the reference name. */
  referenceName?: string;
  /** Gets or sets the reference type property. */
  type?: string;
}

export interface CollectionSystemDataOutput extends SystemDataOutput {}

export interface CollectionListOutput {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<CollectionOutput>;
}

export interface CollectionNameResponseListOutput {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<CollectionNameResponseOutput>;
}

export interface CollectionNameResponseOutput {
  /** Gets or sets the friendly name of the collection. */
  friendlyName?: string;
  /** Gets the name. */
  name?: string;
}

export interface CollectionPathResponseOutput {
  /** The friendly names of ancestors starting from the default (root) collection and ending with the immediate parent. */
  parentFriendlyNameChain?: Array<string>;
  /** The names of ancestors starting from the default (root) collection and ending with the immediate parent. */
  parentNameChain?: Array<string>;
}

export interface ResourceSetRuleConfigOutput {
  /** Gets or sets the advanced resource set property of the account. */
  advancedResourceSet?: AdvancedResourceSetOutput;
  /** The name of the rule */
  name?: string;
  /** The configuration rules for path pattern extraction. */
  pathPatternConfig?: PathPatternExtractorConfigOutput;
}

export interface AdvancedResourceSetOutput {
  /** Date at which ResourceSetProcessing property of the account is updated. */
  modifiedAt?: string;
  /** The advanced resource property of the account. */
  resourceSetProcessing?: "Default" | "Advanced";
}

export interface PathPatternExtractorConfigOutput {
  acceptedPatterns?: Array<FilterOutput>;
  complexReplacers?: Array<ComplexReplacerConfigOutput>;
  createdBy: string;
  enableDefaultPatterns: boolean;
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  normalizationRules?: Array<NormalizationRuleOutput>;
  regexReplacers?: Array<RegexReplacerOutput>;
  rejectedPatterns?: Array<FilterOutput>;
  scopedRules?: Array<ScopedRuleOutput>;
  version?: number;
}

export interface FilterOutput {
  createdBy?: string;
  filterType?: "Pattern" | "Regex";
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  name: string;
  path: string;
}

export interface ComplexReplacerConfigOutput {
  createdBy?: string;
  description?: string;
  disabled?: boolean;
  disableRecursiveReplacerApplication?: boolean;
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  name?: string;
  typeName?: string;
}

export interface NormalizationRuleOutput {
  description?: string;
  disabled?: boolean;
  dynamicReplacement?: boolean;
  entityTypes?: Array<string>;
  lastUpdatedTimestamp?: number;
  name?: string;
  regex?: FastRegexOutput;
  replaceWith?: string;
  version?: number;
}

export interface FastRegexOutput {
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

export interface RegexReplacerOutput {
  condition?: string;
  createdBy?: string;
  description?: string;
  disabled: boolean;
  disableRecursiveReplacerApplication?: boolean;
  doNotReplaceRegex?: FastRegexOutput;
  lastUpdatedTimestamp?: number;
  modifiedBy?: string;
  name: string;
  regex?: FastRegexOutput;
  replaceWith?: string;
}

export interface ScopedRuleOutput {
  bindingUrl: string;
  rules?: Array<RuleOutput>;
  storeType: string;
}

export interface RuleOutput {
  displayName?: string;
  isResourceSet?: boolean;
  lastUpdatedTimestamp?: number;
  name?: string;
  qualifiedName: string;
}

export interface ResourceSetRuleConfigListOutput {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<ResourceSetRuleConfigOutput>;
}
