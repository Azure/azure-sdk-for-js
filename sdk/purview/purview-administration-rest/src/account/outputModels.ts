// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Account resource */
export interface AccountOutput {
  /** Gets or sets the identifier. */
  readonly id?: string;
  /** Identity Info on the tracked resource */
  identity?: IdentityOutput;
  /** Gets or sets the location. */
  location?: string;
  /** Gets or sets the name. */
  readonly name?: string;
  /** Gets or sets the properties. */
  properties?: AccountPropertiesOutput;
  /** Gets or sets the Sku. */
  sku?: AccountSkuOutput;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: AccountSystemDataOutput;
  /** Tags on the azure resource. */
  tags?: Record<string, string>;
  /** Gets or sets the type. */
  readonly type?: string;
}

/** The Managed Identity of the resource */
export interface IdentityOutput {
  /** Service principal object Id */
  readonly principalId?: string;
  /** Tenant Id */
  readonly tenantId?: string;
  /** Identity Type */
  type?: "SystemAssigned";
}

/** The account properties */
export interface AccountPropertiesOutput {
  /**
   * Cloud connectors.
   * External cloud identifier used as part of scanning configuration.
   */
  cloudConnectors?: CloudConnectorsOutput;
  /** Gets the time at which the entity was created. */
  readonly createdAt?: string;
  /** Gets the creator of the entity. */
  readonly createdBy?: string;
  /** Gets the creators of the entity's object id. */
  readonly createdByObjectId?: string;
  /** The URIs that are the public endpoints of the account. */
  readonly endpoints?: AccountPropertiesEndpointsOutput;
  /** Gets or sets the friendly name. */
  readonly friendlyName?: string;
  /** Gets or sets the managed resource group name */
  managedResourceGroupName?: string;
  /** Gets the resource identifiers of the managed resources. */
  readonly managedResources?: AccountPropertiesManagedResourcesOutput;
  /** Gets the private endpoint connections information. */
  readonly privateEndpointConnections?: Array<PrivateEndpointConnectionOutput>;
  /** Gets or sets the state of the provisioning. */
  readonly provisioningState?:
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
  readonly awsExternalId?: string;
}

/** The URIs that are the public endpoints of the account. */
export interface AccountPropertiesEndpointsOutput
  extends AccountEndpointsOutput {}

/** The account endpoints */
export interface AccountEndpointsOutput {
  /** Gets the catalog endpoint. */
  readonly catalog?: string;
  /** Gets the guardian endpoint. */
  readonly guardian?: string;
  /** Gets the scan endpoint. */
  readonly scan?: string;
}

/** Gets the resource identifiers of the managed resources. */
export interface AccountPropertiesManagedResourcesOutput
  extends ManagedResourcesOutput {}

/** The managed resources in customer subscription. */
export interface ManagedResourcesOutput {
  /** Gets the managed event hub namespace resource identifier. */
  readonly eventHubNamespace?: string;
  /** Gets the managed resource group resource identifier. This resource group will host resource dependencies for the account. */
  readonly resourceGroup?: string;
  /** Gets the managed storage account resource identifier. */
  readonly storageAccount?: string;
}

/** A private endpoint connection class. */
export interface PrivateEndpointConnectionOutput {
  /** Gets or sets the identifier. */
  readonly id?: string;
  /** Gets or sets the name. */
  readonly name?: string;
  /** The connection identifier. */
  properties?: PrivateEndpointConnectionPropertiesOutput;
  /** Gets or sets the type. */
  readonly type?: string;
}

/** A private endpoint connection properties class. */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The private endpoint information. */
  privateEndpoint?: PrivateEndpointOutput;
  /** The private link service connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateOutput;
  /** The provisioning state. */
  readonly provisioningState?: string;
}

/** A private endpoint class. */
export interface PrivateEndpointOutput {
  /** The private endpoint identifier. */
  id?: string;
}

/** The private link service connection state. */
export interface PrivateLinkServiceConnectionStateOutput {
  /** The required actions. */
  actionsRequired?: string;
  /** The description. */
  description?: string;
  /** The status. */
  status?: "Unknown" | "Pending" | "Approved" | "Rejected" | "Disconnected";
}

/** The Sku */
export interface AccountSkuOutput {
  /** Gets or sets the sku capacity. Possible values include: 4, 16 */
  capacity?: number;
  /** Gets or sets the sku name. */
  name?: "Standard";
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface AccountSystemDataOutput extends SystemDataOutput {}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The timestamp of resource creation (UTC). */
  readonly createdAt?: string;
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The type of identity that created the resource. */
  readonly createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of the last modification the resource (UTC). */
  readonly lastModifiedAt?: string;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  readonly lastModifiedByType?:
    | "User"
    | "Application"
    | "ManagedIdentity"
    | "Key";
}

/** Default error response model */
export interface ErrorResponseModelOutput {
  /** Gets or sets the error. */
  readonly error?: ErrorResponseModelErrorOutput;
}

/** Gets or sets the error. */
export interface ErrorResponseModelErrorOutput extends ErrorModelOutput {}

/** Default error model */
export interface ErrorModelOutput {
  /** Gets or sets the code. */
  readonly code?: string;
  /** Gets or sets the details. */
  readonly details?: Array<ErrorModelOutput>;
  /** Gets or sets the messages. */
  readonly message?: string;
  /** Gets or sets the target. */
  readonly target?: string;
}

/** The Account access keys. */
export interface AccessKeysOutput {
  /** Gets or sets the primary connection string. */
  atlasKafkaPrimaryEndpoint?: string;
  /** Gets or sets the secondary connection string. */
  atlasKafkaSecondaryEndpoint?: string;
}

/** Collection resource. */
export interface CollectionOutput {
  /** Gets the state of the provisioning. */
  readonly collectionProvisioningState?:
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
  readonly name?: string;
  /** Gets or sets the parent collection reference. */
  parentCollection?: CollectionReferenceOutput;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: CollectionSystemDataOutput;
}

/** Reference to a Collection. */
export interface CollectionReferenceOutput {
  /** Gets or sets the reference name. */
  referenceName?: string;
  /** Gets or sets the reference type property. */
  type?: string;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface CollectionSystemDataOutput extends SystemDataOutput {}

/** Paged list of collections. */
export interface CollectionListOutput {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<CollectionOutput>;
}

/** Paged list of collections. */
export interface CollectionNameResponseListOutput {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<CollectionNameResponseOutput>;
}

/** Collection resource. */
export interface CollectionNameResponseOutput {
  /** Gets or sets the friendly name of the collection. */
  readonly friendlyName?: string;
  /** Gets the name. */
  readonly name?: string;
}

/** Collection resource. */
export interface CollectionPathResponseOutput {
  /** The friendly names of ancestors starting from the default (root) collection and ending with the immediate parent. */
  readonly parentFriendlyNameChain?: Array<string>;
  /** The names of ancestors starting from the default (root) collection and ending with the immediate parent. */
  readonly parentNameChain?: Array<string>;
}

/** ResourceSetRuleConfig implementation class. */
export interface ResourceSetRuleConfigOutput {
  /** Gets or sets the advanced resource set property of the account. */
  advancedResourceSet?: AdvancedResourceSetOutput;
  /** The name of the rule */
  readonly name?: string;
  /** The configuration rules for path pattern extraction. */
  pathPatternConfig?: PathPatternExtractorConfigOutput;
}

/** The resource set processing property of the account. */
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

/** Paged list of account resources */
export interface ResourceSetRuleConfigListOutput {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Array<ResourceSetRuleConfigOutput>;
}
