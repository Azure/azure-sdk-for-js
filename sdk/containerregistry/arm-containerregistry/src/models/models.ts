// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The result of a request to list container registry operations. */
export interface _OperationListResult {
  /** The list of container registry operations. Since this list may be incomplete, the nextLink field should be used to request the next list of operations. */
  value?: OperationDefinition[];
  /** The URI that can be used to request the next list of container registry operations. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationDefinitionArrayDeserializer(result: Array<OperationDefinition>): any[] {
  return result.map((item) => {
    return operationDefinitionDeserializer(item);
  });
}

/** The definition of a container registry operation. */
export interface OperationDefinition {
  /** The origin information of the container registry operation. */
  origin?: string;
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** The display information for the container registry operation. */
  display?: OperationDisplayDefinition;
  /** The properties information for the container registry operation. */
  properties?: OperationPropertiesDefinition;
  /**
   * This property indicates if the operation is an action or a data action
   * ref: https://docs.microsoft.com/en-us/azure/role-based-access-control/role-definitions#management-and-data-operations
   */
  isDataAction?: boolean;
}

export function operationDefinitionDeserializer(item: any): OperationDefinition {
  return {
    origin: item["origin"],
    name: item["name"],
    display: !item["display"]
      ? item["display"]
      : operationDisplayDefinitionDeserializer(item["display"]),
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDefinitionDeserializer(item["properties"]),
    isDataAction: item["isDataAction"],
  };
}

/** The display information for a container registry operation. */
export interface OperationDisplayDefinition {
  /** The resource provider name: Microsoft.ContainerRegistry. */
  provider?: string;
  /** The resource on which the operation is performed. */
  resource?: string;
  /** The operation that users can perform. */
  operation?: string;
  /** The description for the operation. */
  description?: string;
}

export function operationDisplayDefinitionDeserializer(item: any): OperationDisplayDefinition {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The definition of Azure Monitoring properties. */
export interface OperationPropertiesDefinition {
  /** The definition of Azure Monitoring service. */
  serviceSpecification?: OperationServiceSpecificationDefinition;
}

export function operationPropertiesDefinitionDeserializer(
  item: any,
): OperationPropertiesDefinition {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : operationServiceSpecificationDefinitionDeserializer(item["serviceSpecification"]),
  };
}

/** The definition of Azure Monitoring list. */
export interface OperationServiceSpecificationDefinition {
  /** A list of Azure Monitoring metrics definition. */
  metricSpecifications?: OperationMetricSpecificationDefinition[];
  /** A list of Azure Monitoring log definitions. */
  logSpecifications?: OperationLogSpecificationDefinition[];
}

export function operationServiceSpecificationDefinitionDeserializer(
  item: any,
): OperationServiceSpecificationDefinition {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : operationMetricSpecificationDefinitionArrayDeserializer(item["metricSpecifications"]),
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : operationLogSpecificationDefinitionArrayDeserializer(item["logSpecifications"]),
  };
}

export function operationMetricSpecificationDefinitionArrayDeserializer(
  result: Array<OperationMetricSpecificationDefinition>,
): any[] {
  return result.map((item) => {
    return operationMetricSpecificationDefinitionDeserializer(item);
  });
}

/** The definition of Azure Monitoring metric. */
export interface OperationMetricSpecificationDefinition {
  /** Metric name. */
  name?: string;
  /** Metric display name. */
  displayName?: string;
  /** Metric description. */
  displayDescription?: string;
  /** Metric unit. */
  unit?: string;
  /** Metric aggregation type. */
  aggregationType?: string;
  /** Internal metric name. */
  internalMetricName?: string;
}

export function operationMetricSpecificationDefinitionDeserializer(
  item: any,
): OperationMetricSpecificationDefinition {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    internalMetricName: item["internalMetricName"],
  };
}

export function operationLogSpecificationDefinitionArrayDeserializer(
  result: Array<OperationLogSpecificationDefinition>,
): any[] {
  return result.map((item) => {
    return operationLogSpecificationDefinitionDeserializer(item);
  });
}

/** The definition of Azure Monitoring log. */
export interface OperationLogSpecificationDefinition {
  /** Log name. */
  name?: string;
  /** Log display name. */
  displayName?: string;
  /** Log blob duration. */
  blobDuration?: string;
}

export function operationLogSpecificationDefinitionDeserializer(
  item: any,
): OperationLogSpecificationDefinition {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** An object that represents a archive for a container registry. */
export interface Archive extends ProxyResource {
  /** The properties of the archive. */
  properties?: ArchiveProperties;
}

export function archiveSerializer(item: Archive): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : archivePropertiesSerializer(item["properties"]),
  };
}

export function archiveDeserializer(item: any): Archive {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : archivePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a archive. */
export interface ArchiveProperties {
  /** The package source of the archive. */
  packageSource?: ArchivePackageSourceProperties;
  /** The published version of the archive. */
  publishedVersion?: string;
  repositoryEndpointPrefix?: string;
  readonly repositoryEndpoint?: string;
  /** The provisioning state of the archive at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
}

export function archivePropertiesSerializer(item: ArchiveProperties): any {
  return {
    packageSource: !item["packageSource"]
      ? item["packageSource"]
      : archivePackageSourcePropertiesSerializer(item["packageSource"]),
    publishedVersion: item["publishedVersion"],
    repositoryEndpointPrefix: item["repositoryEndpointPrefix"],
  };
}

export function archivePropertiesDeserializer(item: any): ArchiveProperties {
  return {
    packageSource: !item["packageSource"]
      ? item["packageSource"]
      : archivePackageSourcePropertiesDeserializer(item["packageSource"]),
    publishedVersion: item["publishedVersion"],
    repositoryEndpointPrefix: item["repositoryEndpointPrefix"],
    repositoryEndpoint: item["repositoryEndpoint"],
    provisioningState: item["provisioningState"],
  };
}

/** The properties of the archive package source. */
export interface ArchivePackageSourceProperties {
  /** The type of package source for a archive. */
  type?: PackageSourceType;
  /** The external repository url. */
  url?: string;
}

export function archivePackageSourcePropertiesSerializer(
  item: ArchivePackageSourceProperties,
): any {
  return { type: item["type"], url: item["url"] };
}

export function archivePackageSourcePropertiesDeserializer(
  item: any,
): ArchivePackageSourceProperties {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** The type of package source for a archive. */
export enum KnownPackageSourceType {
  Remote = "remote",
}

/**
 * The type of package source for a archive. \
 * {@link KnownPackageSourceType} can be used interchangeably with PackageSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **remote**
 */
export type PackageSourceType = string;

/** The provisioning state of the archive at the time the operation was called. */
export enum KnownProvisioningState {
  Creating = "Creating",
  Updating = "Updating",
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
}

/**
 * The provisioning state of the archive at the time the operation was called. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The parameters for updating a archive. */
export interface ArchiveUpdateParameters {
  /** The properties of the connected registry update parameters. */
  properties?: ArchiveUpdateProperties;
}

export function archiveUpdateParametersSerializer(item: ArchiveUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : archiveUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The properties of a archive. */
export interface ArchiveUpdateProperties {
  /** The published version of the archive. */
  publishedVersion?: string;
}

export function archiveUpdatePropertiesSerializer(item: ArchiveUpdateProperties): any {
  return { publishedVersion: item["publishedVersion"] };
}

/** The result of a request to list archives for a container registry. */
export interface _ArchiveListResult {
  /** The list of archives. Since this list may be incomplete, the nextLink field should be used to request the next list of archives. */
  value?: Archive[];
  /** The URI that can be used to request the next list of archives. */
  nextLink?: string;
}

export function _archiveListResultDeserializer(item: any): _ArchiveListResult {
  return {
    value: !item["value"] ? item["value"] : archiveArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function archiveArraySerializer(result: Array<Archive>): any[] {
  return result.map((item) => {
    return archiveSerializer(item);
  });
}

export function archiveArrayDeserializer(result: Array<Archive>): any[] {
  return result.map((item) => {
    return archiveDeserializer(item);
  });
}

/** An object that represents a container registry. */
export interface Registry extends TrackedResource {
  /** The properties of the container registry. */
  properties?: RegistryProperties;
  /** The SKU of the container registry. */
  sku: Sku;
  /** The identity of the container registry. */
  identity?: IdentityProperties;
}

export function registrySerializer(item: Registry): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : registryPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function registryDeserializer(item: any): Registry {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : registryPropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** The properties of a container registry. */
export interface RegistryProperties {
  /** The URL that can be used to log into the container registry. */
  readonly loginServer?: string;
  /** The creation date of the container registry in ISO8601 format. */
  readonly creationDate?: Date;
  /** The provisioning state of the container registry at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** The status of the container registry at the time the operation was called. */
  readonly status?: Status;
  /** The value that indicates whether the admin user is enabled. */
  adminUserEnabled?: boolean;
  /** The network rule set for a container registry. */
  networkRuleSet?: NetworkRuleSet;
  /** The policies for a container registry. */
  policies?: Policies;
  /** The encryption settings of container registry. */
  encryption?: EncryptionProperty;
  /** Enable a single data endpoint per region for serving data. */
  dataEndpointEnabled?: boolean;
  /** List of host names that will serve data when dataEndpointEnabled is true. */
  readonly dataEndpointHostNames?: string[];
  /** List of private endpoint connections for a container registry. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Whether or not public network access is allowed for the container registry. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Whether to allow trusted Azure services to access a network restricted registry. */
  networkRuleBypassOptions?: NetworkRuleBypassOptions;
  /** Whether or not Tasks allowed to bypass the network rules for this container registry. */
  networkRuleBypassAllowedForTasks?: boolean;
  /** Whether or not zone redundancy is enabled for this container registry */
  zoneRedundancy?: ZoneRedundancy;
  /** Enables registry-wide pull from unauthenticated clients. */
  anonymousPullEnabled?: boolean;
  /** Determines whether registry artifacts are indexed for metadata search. */
  metadataSearch?: MetadataSearch;
  /** Determines the domain name label reuse scope. */
  autoGeneratedDomainNameLabelScope?: AutoGeneratedDomainNameLabelScope;
  /** Determines registry role assignment mode. */
  roleAssignmentMode?: RoleAssignmentMode;
}

export function registryPropertiesSerializer(item: RegistryProperties): any {
  return {
    adminUserEnabled: item["adminUserEnabled"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    policies: !item["policies"] ? item["policies"] : policiesSerializer(item["policies"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertySerializer(item["encryption"]),
    dataEndpointEnabled: item["dataEndpointEnabled"],
    publicNetworkAccess: item["publicNetworkAccess"],
    networkRuleBypassOptions: item["networkRuleBypassOptions"],
    networkRuleBypassAllowedForTasks: item["networkRuleBypassAllowedForTasks"],
    zoneRedundancy: item["zoneRedundancy"],
    anonymousPullEnabled: item["anonymousPullEnabled"],
    metadataSearch: item["metadataSearch"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    roleAssignmentMode: item["roleAssignmentMode"],
  };
}

export function registryPropertiesDeserializer(item: any): RegistryProperties {
  return {
    loginServer: item["loginServer"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    adminUserEnabled: item["adminUserEnabled"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetDeserializer(item["networkRuleSet"]),
    policies: !item["policies"] ? item["policies"] : policiesDeserializer(item["policies"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertyDeserializer(item["encryption"]),
    dataEndpointEnabled: item["dataEndpointEnabled"],
    dataEndpointHostNames: !item["dataEndpointHostNames"]
      ? item["dataEndpointHostNames"]
      : item["dataEndpointHostNames"].map((p: any) => {
          return p;
        }),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    networkRuleBypassOptions: item["networkRuleBypassOptions"],
    networkRuleBypassAllowedForTasks: item["networkRuleBypassAllowedForTasks"],
    zoneRedundancy: item["zoneRedundancy"],
    anonymousPullEnabled: item["anonymousPullEnabled"],
    metadataSearch: item["metadataSearch"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    roleAssignmentMode: item["roleAssignmentMode"],
  };
}

/** The status of an Azure resource at the time the operation was called. */
export interface Status {
  /** The short label for the status. */
  readonly displayStatus?: string;
  /** The detailed message for the status, including alerts and error messages. */
  readonly message?: string;
  /** The timestamp when the status was changed to the current value. */
  readonly timestamp?: Date;
}

export function statusDeserializer(item: any): Status {
  return {
    displayStatus: item["displayStatus"],
    message: item["message"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

/** The network rule set for a container registry. */
export interface NetworkRuleSet {
  /** The default action of allow or deny when no other rules match. */
  defaultAction: DefaultAction;
  /** The IP ACL rules. */
  ipRules?: IPRule[];
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
  };
}

/** The default action of allow or deny when no other rules match. */
export enum KnownDefaultAction {
  Allow = "Allow",
  Deny = "Deny",
}

/**
 * The default action of allow or deny when no other rules match. \
 * {@link KnownDefaultAction} can be used interchangeably with DefaultAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type DefaultAction = string;

export function ipRuleArraySerializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleSerializer(item);
  });
}

export function ipRuleArrayDeserializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleDeserializer(item);
  });
}

/** IP rule with specific IP or IP range in CIDR format. */
export interface IPRule {
  /** The action of IP ACL rule. */
  action?: Action;
  /** Specifies the IP or IP range in CIDR format. Only IPV4 address is allowed. */
  ipAddressOrRange: string;
}

export function ipRuleSerializer(item: IPRule): any {
  return { action: item["action"], value: item["ipAddressOrRange"] };
}

export function ipRuleDeserializer(item: any): IPRule {
  return {
    action: item["action"],
    ipAddressOrRange: item["value"],
  };
}

/** The action of IP ACL rule. */
export enum KnownAction {
  Allow = "Allow",
}

/**
 * The action of IP ACL rule. \
 * {@link KnownAction} can be used interchangeably with Action,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**
 */
export type Action = string;

/** The policies for a container registry. */
export interface Policies {
  /** The quarantine policy for a container registry. */
  quarantinePolicy?: QuarantinePolicy;
  /** The content trust policy for a container registry. */
  trustPolicy?: TrustPolicy;
  /** The retention policy for a container registry. */
  retentionPolicy?: RetentionPolicy;
  /** The export policy for a container registry. */
  exportPolicy?: ExportPolicy;
  /** The policy for using Azure Resource Manager audience token for a container registry. */
  azureADAuthenticationAsArmPolicy?: AzureADAuthenticationAsArmPolicy;
  /** The soft delete policy for a container registry. */
  softDeletePolicy?: SoftDeletePolicy;
}

export function policiesSerializer(item: Policies): any {
  return {
    quarantinePolicy: !item["quarantinePolicy"]
      ? item["quarantinePolicy"]
      : quarantinePolicySerializer(item["quarantinePolicy"]),
    trustPolicy: !item["trustPolicy"]
      ? item["trustPolicy"]
      : trustPolicySerializer(item["trustPolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
    exportPolicy: !item["exportPolicy"]
      ? item["exportPolicy"]
      : exportPolicySerializer(item["exportPolicy"]),
    azureADAuthenticationAsArmPolicy: !item["azureADAuthenticationAsArmPolicy"]
      ? item["azureADAuthenticationAsArmPolicy"]
      : azureADAuthenticationAsArmPolicySerializer(item["azureADAuthenticationAsArmPolicy"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicySerializer(item["softDeletePolicy"]),
  };
}

export function policiesDeserializer(item: any): Policies {
  return {
    quarantinePolicy: !item["quarantinePolicy"]
      ? item["quarantinePolicy"]
      : quarantinePolicyDeserializer(item["quarantinePolicy"]),
    trustPolicy: !item["trustPolicy"]
      ? item["trustPolicy"]
      : trustPolicyDeserializer(item["trustPolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
    exportPolicy: !item["exportPolicy"]
      ? item["exportPolicy"]
      : exportPolicyDeserializer(item["exportPolicy"]),
    azureADAuthenticationAsArmPolicy: !item["azureADAuthenticationAsArmPolicy"]
      ? item["azureADAuthenticationAsArmPolicy"]
      : azureADAuthenticationAsArmPolicyDeserializer(item["azureADAuthenticationAsArmPolicy"]),
    softDeletePolicy: !item["softDeletePolicy"]
      ? item["softDeletePolicy"]
      : softDeletePolicyDeserializer(item["softDeletePolicy"]),
  };
}

/** The quarantine policy for a container registry. */
export interface QuarantinePolicy {
  /** The value that indicates whether the policy is enabled or not. */
  status?: PolicyStatus;
}

export function quarantinePolicySerializer(item: QuarantinePolicy): any {
  return { status: item["status"] };
}

export function quarantinePolicyDeserializer(item: any): QuarantinePolicy {
  return {
    status: item["status"],
  };
}

/** The value that indicates whether the policy is enabled or not. */
export enum KnownPolicyStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

/**
 * The value that indicates whether the policy is enabled or not. \
 * {@link KnownPolicyStatus} can be used interchangeably with PolicyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type PolicyStatus = string;

/** The content trust policy for a container registry. */
export interface TrustPolicy {
  /** The type of trust policy. */
  type?: TrustPolicyType;
  /** The value that indicates whether the policy is enabled or not. */
  status?: PolicyStatus;
}

export function trustPolicySerializer(item: TrustPolicy): any {
  return { type: item["type"], status: item["status"] };
}

export function trustPolicyDeserializer(item: any): TrustPolicy {
  return {
    type: item["type"],
    status: item["status"],
  };
}

/** The type of trust policy. */
export enum KnownTrustPolicyType {
  Notary = "Notary",
}

/**
 * The type of trust policy. \
 * {@link KnownTrustPolicyType} can be used interchangeably with TrustPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Notary**
 */
export type TrustPolicyType = string;

/** The retention policy for a container registry. */
export interface RetentionPolicy {
  /** The number of days to retain an untagged manifest after which it gets purged. */
  days?: number;
  /** The timestamp when the policy was last updated. */
  readonly lastUpdatedTime?: Date;
  /** The value that indicates whether the policy is enabled or not. */
  status?: PolicyStatus;
}

export function retentionPolicySerializer(item: RetentionPolicy): any {
  return { days: item["days"], status: item["status"] };
}

export function retentionPolicyDeserializer(item: any): RetentionPolicy {
  return {
    days: item["days"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    status: item["status"],
  };
}

/** The export policy for a container registry. */
export interface ExportPolicy {
  /** The value that indicates whether the policy is enabled or not. */
  status?: ExportPolicyStatus;
}

export function exportPolicySerializer(item: ExportPolicy): any {
  return { status: item["status"] };
}

export function exportPolicyDeserializer(item: any): ExportPolicy {
  return {
    status: item["status"],
  };
}

/** The value that indicates whether the policy is enabled or not. */
export enum KnownExportPolicyStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

/**
 * The value that indicates whether the policy is enabled or not. \
 * {@link KnownExportPolicyStatus} can be used interchangeably with ExportPolicyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type ExportPolicyStatus = string;

/** The policy for using Azure Resource Manager audience token for a container registry. */
export interface AzureADAuthenticationAsArmPolicy {
  /** The value that indicates whether the policy is enabled or not. */
  status?: AzureADAuthenticationAsArmPolicyStatus;
}

export function azureADAuthenticationAsArmPolicySerializer(
  item: AzureADAuthenticationAsArmPolicy,
): any {
  return { status: item["status"] };
}

export function azureADAuthenticationAsArmPolicyDeserializer(
  item: any,
): AzureADAuthenticationAsArmPolicy {
  return {
    status: item["status"],
  };
}

/** The value that indicates whether the policy is enabled or not. */
export enum KnownAzureADAuthenticationAsArmPolicyStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

/**
 * The value that indicates whether the policy is enabled or not. \
 * {@link KnownAzureADAuthenticationAsArmPolicyStatus} can be used interchangeably with AzureADAuthenticationAsArmPolicyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type AzureADAuthenticationAsArmPolicyStatus = string;

/** The soft delete policy for a container registry */
export interface SoftDeletePolicy {
  /** The number of days after which a soft-deleted item is permanently deleted. */
  retentionDays?: number;
  /** The timestamp when the policy was last updated. */
  readonly lastUpdatedTime?: Date;
  /** The value that indicates whether the policy is enabled or not. */
  status?: PolicyStatus;
}

export function softDeletePolicySerializer(item: SoftDeletePolicy): any {
  return { retentionDays: item["retentionDays"], status: item["status"] };
}

export function softDeletePolicyDeserializer(item: any): SoftDeletePolicy {
  return {
    retentionDays: item["retentionDays"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    status: item["status"],
  };
}

/** model interface EncryptionProperty */
export interface EncryptionProperty {
  /** Indicates whether or not the encryption is enabled for container registry. */
  status?: EncryptionStatus;
  /** Key vault properties. */
  keyVaultProperties?: KeyVaultProperties;
}

export function encryptionPropertySerializer(item: EncryptionProperty): any {
  return {
    status: item["status"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function encryptionPropertyDeserializer(item: any): EncryptionProperty {
  return {
    status: item["status"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
  };
}

/** Indicates whether or not the encryption is enabled for container registry. */
export enum KnownEncryptionStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

/**
 * Indicates whether or not the encryption is enabled for container registry. \
 * {@link KnownEncryptionStatus} can be used interchangeably with EncryptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type EncryptionStatus = string;

/** model interface KeyVaultProperties */
export interface KeyVaultProperties {
  /** Key vault uri to access the encryption key. */
  keyIdentifier?: string;
  /** The fully qualified key identifier that includes the version of the key that is actually used for encryption. */
  readonly versionedKeyIdentifier?: string;
  /** The client id of the identity which will be used to access key vault. */
  identity?: string;
  /** Auto key rotation status for a CMK enabled registry. */
  readonly keyRotationEnabled?: boolean;
  /** Timestamp of the last successful key rotation. */
  readonly lastKeyRotationTimestamp?: Date;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return { keyIdentifier: item["keyIdentifier"], identity: item["identity"] };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyIdentifier: item["keyIdentifier"],
    versionedKeyIdentifier: item["versionedKeyIdentifier"],
    identity: item["identity"],
    keyRotationEnabled: item["keyRotationEnabled"],
    lastKeyRotationTimestamp: !item["lastKeyRotationTimestamp"]
      ? item["lastKeyRotationTimestamp"]
      : new Date(item["lastKeyRotationTimestamp"]),
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** An object that represents a private endpoint connection for a container registry. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The properties of a private endpoint connection. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of private endpoint connection resource. */
  readonly provisioningState?: ProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {
  /** This is private endpoint resource created with Microsoft.Network resource provider. */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The state of a private link service connection. */
export interface PrivateLinkServiceConnectionState {
  /** The private link service connection status. */
  status?: ConnectionStatus;
  /** The description for connection status. For example if connection is rejected it can indicate reason for rejection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: ActionsRequired;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private link service connection status. */
export enum KnownConnectionStatus {
  Approved = "Approved",
  Pending = "Pending",
  Rejected = "Rejected",
  Disconnected = "Disconnected",
}

/**
 * The private link service connection status. \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved** \
 * **Pending** \
 * **Rejected** \
 * **Disconnected**
 */
export type ConnectionStatus = string;

/** A message indicating if changes on the service provider require any updates on the consumer. */
export enum KnownActionsRequired {
  None = "None",
  Recreate = "Recreate",
}

/**
 * A message indicating if changes on the service provider require any updates on the consumer. \
 * {@link KnownActionsRequired} can be used interchangeably with ActionsRequired,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Recreate**
 */
export type ActionsRequired = string;

/** Whether or not public network access is allowed for the container registry. */
export enum KnownPublicNetworkAccess {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Whether or not public network access is allowed for the container registry. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** Whether to allow trusted Azure services to access a network restricted registry. */
export enum KnownNetworkRuleBypassOptions {
  AzureServices = "AzureServices",
  None = "None",
}

/**
 * Whether to allow trusted Azure services to access a network restricted registry. \
 * {@link KnownNetworkRuleBypassOptions} can be used interchangeably with NetworkRuleBypassOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureServices** \
 * **None**
 */
export type NetworkRuleBypassOptions = string;

/** Whether or not zone redundancy is enabled for this container registry */
export enum KnownZoneRedundancy {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Whether or not zone redundancy is enabled for this container registry \
 * {@link KnownZoneRedundancy} can be used interchangeably with ZoneRedundancy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ZoneRedundancy = string;

/** Determines whether registry artifacts are indexed for metadata search. */
export enum KnownMetadataSearch {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Determines whether registry artifacts are indexed for metadata search. \
 * {@link KnownMetadataSearch} can be used interchangeably with MetadataSearch,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type MetadataSearch = string;

/** The auto generated domain name label of the container registry. This value defaults to "Unsecure". */
export enum KnownAutoGeneratedDomainNameLabelScope {
  Unsecure = "Unsecure",
  TenantReuse = "TenantReuse",
  SubscriptionReuse = "SubscriptionReuse",
  ResourceGroupReuse = "ResourceGroupReuse",
  NoReuse = "NoReuse",
}

/**
 * The auto generated domain name label of the container registry. This value defaults to "Unsecure". \
 * {@link KnownAutoGeneratedDomainNameLabelScope} can be used interchangeably with AutoGeneratedDomainNameLabelScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unsecure** \
 * **TenantReuse** \
 * **SubscriptionReuse** \
 * **ResourceGroupReuse** \
 * **NoReuse**
 */
export type AutoGeneratedDomainNameLabelScope = string;

/** Determines registry role assignment mode. */
export enum KnownRoleAssignmentMode {
  AbacRepositoryPermissions = "AbacRepositoryPermissions",
  LegacyRegistryPermissions = "LegacyRegistryPermissions",
}

/**
 * Determines registry role assignment mode. \
 * {@link KnownRoleAssignmentMode} can be used interchangeably with RoleAssignmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AbacRepositoryPermissions** \
 * **LegacyRegistryPermissions**
 */
export type RoleAssignmentMode = string;

/** The SKU of a container registry. */
export interface Sku {
  /** The SKU name of the container registry. Required for registry creation. */
  name: SkuName;
  /** The SKU tier based on the SKU name. */
  readonly tier?: SkuTier;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The SKU name of the container registry. Required for registry creation. */
export enum KnownSkuName {
  Classic = "Classic",
  Basic = "Basic",
  Standard = "Standard",
  Premium = "Premium",
}

/**
 * The SKU name of the container registry. Required for registry creation. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Classic** \
 * **Basic** \
 * **Standard** \
 * **Premium**
 */
export type SkuName = string;

/** The SKU tier based on the SKU name. */
export enum KnownSkuTier {
  Classic = "Classic",
  Basic = "Basic",
  Standard = "Standard",
  Premium = "Premium",
}

/**
 * The SKU tier based on the SKU name. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Classic** \
 * **Basic** \
 * **Standard** \
 * **Premium**
 */
export type SkuTier = string;

/** Managed identity for the resource. */
export interface IdentityProperties {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: ResourceIdentityType;
  /**
   * The list of user identities associated with the resource. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/
   * providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

export function identityPropertiesSerializer(item: IdentityProperties): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityPropertiesDeserializer(item: any): IdentityProperties {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function userIdentityPropertiesRecordSerializer(
  item: Record<string, UserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function userIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** model interface UserIdentityProperties */
export interface UserIdentityProperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userIdentityPropertiesSerializer(item: UserIdentityProperties): any {
  return item;
}

export function userIdentityPropertiesDeserializer(item: any): UserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** The parameters for updating a container registry. */
export interface RegistryUpdateParameters {
  /** The identity of the container registry. */
  identity?: IdentityProperties;
  /** The tags for the container registry. */
  tags?: Record<string, string>;
  /** The SKU of the container registry. */
  sku?: Sku;
  /** The properties that the container registry will be updated with. */
  properties?: RegistryPropertiesUpdateParameters;
}

export function registryUpdateParametersSerializer(item: RegistryUpdateParameters): any {
  return {
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : registryPropertiesUpdateParametersSerializer(item["properties"]),
  };
}

/** The parameters for updating the properties of a container registry. */
export interface RegistryPropertiesUpdateParameters {
  /** The value that indicates whether the admin user is enabled. */
  adminUserEnabled?: boolean;
  /** The network rule set for a container registry. */
  networkRuleSet?: NetworkRuleSet;
  /** The policies for a container registry. */
  policies?: Policies;
  /** The encryption settings of container registry. */
  encryption?: EncryptionProperty;
  /** Enable a single data endpoint per region for serving data. */
  dataEndpointEnabled?: boolean;
  /** Whether or not public network access is allowed for the container registry. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Whether to allow trusted Azure services to access a network restricted registry. */
  networkRuleBypassOptions?: NetworkRuleBypassOptions;
  /** Whether to allow ACR Tasks service to access a network restricted registry. */
  networkRuleBypassAllowedForTasks?: boolean;
  /** Enables registry-wide pull from unauthenticated clients. */
  anonymousPullEnabled?: boolean;
  /** Determines whether registry artifacts are indexed for metadata search. */
  metadataSearch?: MetadataSearch;
  /** Determines registry role assignment mode. */
  roleAssignmentMode?: RoleAssignmentMode;
}

export function registryPropertiesUpdateParametersSerializer(
  item: RegistryPropertiesUpdateParameters,
): any {
  return {
    adminUserEnabled: item["adminUserEnabled"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    policies: !item["policies"] ? item["policies"] : policiesSerializer(item["policies"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertySerializer(item["encryption"]),
    dataEndpointEnabled: item["dataEndpointEnabled"],
    publicNetworkAccess: item["publicNetworkAccess"],
    networkRuleBypassOptions: item["networkRuleBypassOptions"],
    networkRuleBypassAllowedForTasks: item["networkRuleBypassAllowedForTasks"],
    anonymousPullEnabled: item["anonymousPullEnabled"],
    metadataSearch: item["metadataSearch"],
    roleAssignmentMode: item["roleAssignmentMode"],
  };
}

/** The result of a request to list container registries. */
export interface _RegistryListResult {
  /** The list of container registries. Since this list may be incomplete, the nextLink field should be used to request the next list of container registries. */
  value?: Registry[];
  /** The URI that can be used to request the next list of container registries. */
  nextLink?: string;
}

export function _registryListResultDeserializer(item: any): _RegistryListResult {
  return {
    value: !item["value"] ? item["value"] : registryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function registryArraySerializer(result: Array<Registry>): any[] {
  return result.map((item) => {
    return registrySerializer(item);
  });
}

export function registryArrayDeserializer(result: Array<Registry>): any[] {
  return result.map((item) => {
    return registryDeserializer(item);
  });
}

/** model interface ImportImageParameters */
export interface ImportImageParameters {
  /** The source of the image. */
  source: ImportSource;
  /** List of strings of the form repo[:tag]. When tag is omitted the source will be used (or 'latest' if source tag is also omitted). */
  targetTags?: string[];
  /** List of strings of repository names to do a manifest only copy. No tag will be created. */
  untaggedTargetRepositories?: string[];
  /** When Force, any existing target tags will be overwritten. When NoForce, any existing target tags will fail the operation before any copying begins. */
  mode?: ImportMode;
}

export function importImageParametersSerializer(item: ImportImageParameters): any {
  return {
    source: importSourceSerializer(item["source"]),
    targetTags: !item["targetTags"]
      ? item["targetTags"]
      : item["targetTags"].map((p: any) => {
          return p;
        }),
    untaggedTargetRepositories: !item["untaggedTargetRepositories"]
      ? item["untaggedTargetRepositories"]
      : item["untaggedTargetRepositories"].map((p: any) => {
          return p;
        }),
    mode: item["mode"],
  };
}

/** model interface ImportSource */
export interface ImportSource {
  /** The resource identifier of the source Azure Container Registry. */
  resourceId?: string;
  /** The address of the source registry (e.g. 'mcr.microsoft.com'). */
  registryUri?: string;
  /** Credentials used when importing from a registry uri. */
  credentials?: ImportSourceCredentials;
  /**
   * Repository name of the source image.
   * Specify an image by repository ('hello-world'). This will use the 'latest' tag.
   * Specify an image by tag ('hello-world:latest').
   * Specify an image by sha256-based manifest digest ('hello-world@sha256:abc123').
   */
  sourceImage: string;
}

export function importSourceSerializer(item: ImportSource): any {
  return {
    resourceId: item["resourceId"],
    registryUri: item["registryUri"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : importSourceCredentialsSerializer(item["credentials"]),
    sourceImage: item["sourceImage"],
  };
}

/** model interface ImportSourceCredentials */
export interface ImportSourceCredentials {
  /** The username to authenticate with the source registry. */
  username?: string;
  /** The password used to authenticate with the source registry. */
  password: string;
}

export function importSourceCredentialsSerializer(item: ImportSourceCredentials): any {
  return { username: item["username"], password: item["password"] };
}

/** When Force, any existing target tags will be overwritten. When NoForce, any existing target tags will fail the operation before any copying begins. */
export enum KnownImportMode {
  NoForce = "NoForce",
  Force = "Force",
}

/**
 * When Force, any existing target tags will be overwritten. When NoForce, any existing target tags will fail the operation before any copying begins. \
 * {@link KnownImportMode} can be used interchangeably with ImportMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoForce** \
 * **Force**
 */
export type ImportMode = string;

/** The result of a request to get container registry quota usages. */
export interface _RegistryUsageListResult {
  /** The list of container registry quota usages. */
  value?: RegistryUsage[];
}

export function _registryUsageListResultDeserializer(item: any): _RegistryUsageListResult {
  return {
    value: !item["value"] ? item["value"] : registryUsageArrayDeserializer(item["value"]),
  };
}

export function registryUsageArrayDeserializer(result: Array<RegistryUsage>): any[] {
  return result.map((item) => {
    return registryUsageDeserializer(item);
  });
}

/** The quota usage for a container registry. */
export interface RegistryUsage {
  /** The name of the usage. */
  name?: string;
  /** The limit of the usage. */
  limit?: number;
  /** The current value of the usage. */
  currentValue?: number;
  /** The unit of measurement. */
  unit?: RegistryUsageUnit;
}

export function registryUsageDeserializer(item: any): RegistryUsage {
  return {
    name: item["name"],
    limit: item["limit"],
    currentValue: item["currentValue"],
    unit: item["unit"],
  };
}

/** The unit of measurement. */
export enum KnownRegistryUsageUnit {
  Count = "Count",
  Bytes = "Bytes",
}

/**
 * The unit of measurement. \
 * {@link KnownRegistryUsageUnit} can be used interchangeably with RegistryUsageUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count** \
 * **Bytes**
 */
export type RegistryUsageUnit = string;

/** The response from the ListCredentials operation. */
export interface RegistryListCredentialsResult {
  /** The username for a container registry. */
  username?: string;
  /** The list of passwords for a container registry. */
  passwords?: RegistryPassword[];
}

export function registryListCredentialsResultDeserializer(
  item: any,
): RegistryListCredentialsResult {
  return {
    username: item["username"],
    passwords: !item["passwords"]
      ? item["passwords"]
      : registryPasswordArrayDeserializer(item["passwords"]),
  };
}

export function registryPasswordArrayDeserializer(result: Array<RegistryPassword>): any[] {
  return result.map((item) => {
    return registryPasswordDeserializer(item);
  });
}

/** The login password for the container registry. */
export interface RegistryPassword {
  /** The password name. */
  name?: PasswordName;
  /** The password value. */
  value?: string;
}

export function registryPasswordDeserializer(item: any): RegistryPassword {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The password name. */
export type PasswordName = "password" | "password2";

/** The parameters used to regenerate the login credential. */
export interface RegenerateCredentialParameters {
  /** Specifies name of the password which should be regenerated -- password or password2. */
  name: PasswordName;
}

export function regenerateCredentialParametersSerializer(
  item: RegenerateCredentialParameters,
): any {
  return { name: item["name"] };
}

/** The parameters used to generate credentials for a specified token or user of a container registry. */
export interface GenerateCredentialsParameters {
  /** The resource ID of the token for which credentials have to be generated. */
  tokenId?: string;
  /** The expiry date of the generated credentials after which the credentials become invalid. */
  expiry?: Date;
  /** Specifies name of the password which should be regenerated if any -- password1 or password2. */
  name?: TokenPasswordName;
}

export function generateCredentialsParametersSerializer(item: GenerateCredentialsParameters): any {
  return {
    tokenId: item["tokenId"],
    expiry: !item["expiry"] ? item["expiry"] : item["expiry"].toISOString(),
    name: item["name"],
  };
}

/** The password name "password1" or "password2" */
export enum KnownTokenPasswordName {
  Password1 = "password1",
  Password2 = "password2",
}

/**
 * The password name "password1" or "password2" \
 * {@link KnownTokenPasswordName} can be used interchangeably with TokenPasswordName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **password1** \
 * **password2**
 */
export type TokenPasswordName = string;

/** The response from the GenerateCredentials operation. */
export interface GenerateCredentialsResult {
  /** The username for a container registry. */
  username?: string;
  /** The list of passwords for a container registry. */
  passwords?: TokenPassword[];
}

export function generateCredentialsResultDeserializer(item: any): GenerateCredentialsResult {
  return {
    username: item["username"],
    passwords: !item["passwords"]
      ? item["passwords"]
      : tokenPasswordArrayDeserializer(item["passwords"]),
  };
}

export function tokenPasswordArraySerializer(result: Array<TokenPassword>): any[] {
  return result.map((item) => {
    return tokenPasswordSerializer(item);
  });
}

export function tokenPasswordArrayDeserializer(result: Array<TokenPassword>): any[] {
  return result.map((item) => {
    return tokenPasswordDeserializer(item);
  });
}

/** The password that will be used for authenticating the token of a container registry. */
export interface TokenPassword {
  /** The creation datetime of the password. */
  creationTime?: Date;
  /** The expiry datetime of the password. */
  expiry?: Date;
  /** The password name "password1" or "password2" */
  name?: TokenPasswordName;
  /** The password value. */
  readonly value?: string;
}

export function tokenPasswordSerializer(item: TokenPassword): any {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : item["creationTime"].toISOString(),
    expiry: !item["expiry"] ? item["expiry"] : item["expiry"].toISOString(),
    name: item["name"],
  };
}

export function tokenPasswordDeserializer(item: any): TokenPassword {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    expiry: !item["expiry"] ? item["expiry"] : new Date(item["expiry"]),
    name: item["name"],
    value: item["value"],
  };
}

/** A request to check whether a container registry name is available. */
export interface RegistryNameCheckRequest {
  /** The name of the container registry. */
  name: string;
  /** The resource type of the container registry. This field must be set to 'Microsoft.ContainerRegistry/registries'. */
  type: ContainerRegistryResourceType;
  /** The resource group name of the container registry. */
  resourceGroupName?: string;
  /** The auto generated domain name label of the container registry. This value defaults to "Unsecure". */
  autoGeneratedDomainNameLabelScope?: AutoGeneratedDomainNameLabelScope;
}

export function registryNameCheckRequestSerializer(item: RegistryNameCheckRequest): any {
  return {
    name: item["name"],
    type: item["type"],
    resourceGroupName: item["resourceGroupName"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
  };
}

/** The resource type for Container Registry. */
export type ContainerRegistryResourceType = "Microsoft.ContainerRegistry/registries";

/** The result of a request to check the availability of a container registry name. */
export interface RegistryNameStatus {
  /** The complete login server name with domain name label (DNL) hash, if available */
  availableLoginServerName?: string;
  /** The value that indicates whether the name is available. */
  nameAvailable?: boolean;
  /** If any, the reason that the name is not available. */
  reason?: string;
  /** If any, the error message that provides more detail for the reason that the name is not available. */
  message?: string;
}

export function registryNameStatusDeserializer(item: any): RegistryNameStatus {
  return {
    availableLoginServerName: item["availableLoginServerName"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** A resource that supports private link capabilities. */
export interface PrivateLinkResource extends ProxyResource {
  /** A resource that supports private link capabilities. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  groupId?: string;
  /** The private link resource required member names. */
  requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The result of a request to list private link resources for a container registry. */
export interface _PrivateLinkResourceListResult {
  /** The list of private link resources. Since this list may be incomplete, the nextLink field should be used to request the next list of private link resources. */
  value?: PrivateLinkResource[];
  /** The URI that can be used to request the next list of private link resources. */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** An object that represents an export pipeline for a container registry. */
export interface ArchiveVersion extends ProxyResource {
  /** The properties of the archive. */
  properties?: ArchiveVersionProperties;
}

export function archiveVersionDeserializer(item: any): ArchiveVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : archiveVersionPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an export pipeline. */
export interface ArchiveVersionProperties {
  /** The provisioning state of the archive at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** The detailed error message for the archive version in the case of failure. */
  archiveVersionErrorMessage?: string;
}

export function archiveVersionPropertiesDeserializer(item: any): ArchiveVersionProperties {
  return {
    provisioningState: item["provisioningState"],
    archiveVersionErrorMessage: item["archiveVersionErrorMessage"],
  };
}

/** The result of a request to list archive versions for a container registry. */
export interface _ArchiveVersionListResult {
  /** The list of archive versions. Since this list may be incomplete, the nextLink field should be used to request the next list of archive versions. */
  value?: ArchiveVersion[];
  /** The URI that can be used to request the next list of archive versions. */
  nextLink?: string;
}

export function _archiveVersionListResultDeserializer(item: any): _ArchiveVersionListResult {
  return {
    value: !item["value"] ? item["value"] : archiveVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function archiveVersionArrayDeserializer(result: Array<ArchiveVersion>): any[] {
  return result.map((item) => {
    return archiveVersionDeserializer(item);
  });
}

/** An object that represents a cache rule for a container registry. */
export interface CacheRule extends ProxyResource {
  /** The properties of the cache rule. */
  properties?: CacheRuleProperties;
}

export function cacheRuleSerializer(item: CacheRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : cacheRulePropertiesSerializer(item["properties"]),
  };
}

export function cacheRuleDeserializer(item: any): CacheRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : cacheRulePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a cache rule. */
export interface CacheRuleProperties {
  /** The ARM resource ID of the credential store which is associated with the cache rule. */
  credentialSetResourceId?: string;
  /** Source repository pulled from upstream. */
  sourceRepository?: string;
  /**
   * Target repository specified in docker pull command.
   * Eg: docker pull myregistry.azurecr.io/{targetRepository}:{tag}
   */
  targetRepository?: string;
  /** The creation date of the cache rule. */
  readonly creationDate?: Date;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function cacheRulePropertiesSerializer(item: CacheRuleProperties): any {
  return {
    credentialSetResourceId: item["credentialSetResourceId"],
    sourceRepository: item["sourceRepository"],
    targetRepository: item["targetRepository"],
  };
}

export function cacheRulePropertiesDeserializer(item: any): CacheRuleProperties {
  return {
    credentialSetResourceId: item["credentialSetResourceId"],
    sourceRepository: item["sourceRepository"],
    targetRepository: item["targetRepository"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
  };
}

/** The parameters for updating a cache rule. */
export interface CacheRuleUpdateParameters {
  /** The properties of the cache rule update parameters. */
  properties?: CacheRuleUpdateProperties;
}

export function cacheRuleUpdateParametersSerializer(item: CacheRuleUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : cacheRuleUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The parameters for updating cache rule properties. */
export interface CacheRuleUpdateProperties {
  /** The ARM resource ID of the credential store which is associated with the Cache rule. */
  credentialSetResourceId?: string;
}

export function cacheRuleUpdatePropertiesSerializer(item: CacheRuleUpdateProperties): any {
  return { credentialSetResourceId: item["credentialSetResourceId"] };
}

/** The result of a request to list cache rules for a container registry. */
export interface _CacheRulesListResult {
  /** The list of cache rules. Since this list may be incomplete, the nextLink field should be used to request the next list of cache rules. */
  value?: CacheRule[];
  /** The URI that can be used to request the next list of cache rules. */
  nextLink?: string;
}

export function _cacheRulesListResultDeserializer(item: any): _CacheRulesListResult {
  return {
    value: !item["value"] ? item["value"] : cacheRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cacheRuleArraySerializer(result: Array<CacheRule>): any[] {
  return result.map((item) => {
    return cacheRuleSerializer(item);
  });
}

export function cacheRuleArrayDeserializer(result: Array<CacheRule>): any[] {
  return result.map((item) => {
    return cacheRuleDeserializer(item);
  });
}

/** An object that represents a connected registry for a container registry. */
export interface ConnectedRegistry extends ProxyResource {
  /** The properties of the connected registry. */
  properties?: ConnectedRegistryProperties;
}

export function connectedRegistrySerializer(item: ConnectedRegistry): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectedRegistryPropertiesSerializer(item["properties"]),
  };
}

export function connectedRegistryDeserializer(item: any): ConnectedRegistry {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : connectedRegistryPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a connected registry. */
export interface ConnectedRegistryProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The mode of the connected registry resource that indicates the permissions of the registry. */
  mode: ConnectedRegistryMode;
  /** The current version of ACR runtime on the connected registry. */
  readonly version?: string;
  /** The current connection state of the connected registry. */
  readonly connectionState?: ConnectionState;
  /** The last activity time of the connected registry. */
  readonly lastActivityTime?: Date;
  /** The activation properties of the connected registry. */
  readonly activation?: ActivationProperties;
  /** The parent of the connected registry. */
  parent: ParentProperties;
  /** The list of the ACR token resource IDs used to authenticate clients to the connected registry. */
  clientTokenIds?: string[];
  /** The login server properties of the connected registry. */
  loginServer?: LoginServerProperties;
  /** The logging properties of the connected registry. */
  logging?: LoggingProperties;
  /** The list of current statuses of the connected registry. */
  readonly statusDetails?: StatusDetailProperties[];
  /** The list of notifications subscription information for the connected registry. */
  notificationsList?: string[];
  /** The garbage collection properties of the connected registry. */
  garbageCollection?: GarbageCollectionProperties;
}

export function connectedRegistryPropertiesSerializer(item: ConnectedRegistryProperties): any {
  return {
    mode: item["mode"],
    parent: parentPropertiesSerializer(item["parent"]),
    clientTokenIds: !item["clientTokenIds"]
      ? item["clientTokenIds"]
      : item["clientTokenIds"].map((p: any) => {
          return p;
        }),
    loginServer: !item["loginServer"]
      ? item["loginServer"]
      : loginServerPropertiesSerializer(item["loginServer"]),
    logging: !item["logging"] ? item["logging"] : loggingPropertiesSerializer(item["logging"]),
    notificationsList: !item["notificationsList"]
      ? item["notificationsList"]
      : item["notificationsList"].map((p: any) => {
          return p;
        }),
    garbageCollection: !item["garbageCollection"]
      ? item["garbageCollection"]
      : garbageCollectionPropertiesSerializer(item["garbageCollection"]),
  };
}

export function connectedRegistryPropertiesDeserializer(item: any): ConnectedRegistryProperties {
  return {
    provisioningState: item["provisioningState"],
    mode: item["mode"],
    version: item["version"],
    connectionState: item["connectionState"],
    lastActivityTime: !item["lastActivityTime"]
      ? item["lastActivityTime"]
      : new Date(item["lastActivityTime"]),
    activation: !item["activation"]
      ? item["activation"]
      : activationPropertiesDeserializer(item["activation"]),
    parent: parentPropertiesDeserializer(item["parent"]),
    clientTokenIds: !item["clientTokenIds"]
      ? item["clientTokenIds"]
      : item["clientTokenIds"].map((p: any) => {
          return p;
        }),
    loginServer: !item["loginServer"]
      ? item["loginServer"]
      : loginServerPropertiesDeserializer(item["loginServer"]),
    logging: !item["logging"] ? item["logging"] : loggingPropertiesDeserializer(item["logging"]),
    statusDetails: !item["statusDetails"]
      ? item["statusDetails"]
      : statusDetailPropertiesArrayDeserializer(item["statusDetails"]),
    notificationsList: !item["notificationsList"]
      ? item["notificationsList"]
      : item["notificationsList"].map((p: any) => {
          return p;
        }),
    garbageCollection: !item["garbageCollection"]
      ? item["garbageCollection"]
      : garbageCollectionPropertiesDeserializer(item["garbageCollection"]),
  };
}

/** The mode of the connected registry resource that indicates the permissions of the registry. */
export enum KnownConnectedRegistryMode {
  ReadWrite = "ReadWrite",
  ReadOnly = "ReadOnly",
  Registry = "Registry",
  Mirror = "Mirror",
}

/**
 * The mode of the connected registry resource that indicates the permissions of the registry. \
 * {@link KnownConnectedRegistryMode} can be used interchangeably with ConnectedRegistryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadWrite** \
 * **ReadOnly** \
 * **Registry** \
 * **Mirror**
 */
export type ConnectedRegistryMode = string;

/** The current connection state of the connected registry. */
export enum KnownConnectionState {
  Online = "Online",
  Offline = "Offline",
  Syncing = "Syncing",
  Unhealthy = "Unhealthy",
}

/**
 * The current connection state of the connected registry. \
 * {@link KnownConnectionState} can be used interchangeably with ConnectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Online** \
 * **Offline** \
 * **Syncing** \
 * **Unhealthy**
 */
export type ConnectionState = string;

/** The activation properties of the connected registry. */
export interface ActivationProperties {
  /** The activation status of the connected registry. */
  readonly status?: ActivationStatus;
}

export function activationPropertiesDeserializer(item: any): ActivationProperties {
  return {
    status: item["status"],
  };
}

/** The activation status of the connected registry. */
export enum KnownActivationStatus {
  Active = "Active",
  Inactive = "Inactive",
}

/**
 * The activation status of the connected registry. \
 * {@link KnownActivationStatus} can be used interchangeably with ActivationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Inactive**
 */
export type ActivationStatus = string;

/** The properties of the connected registry parent. */
export interface ParentProperties {
  /** The resource ID of the parent to which the connected registry will be associated. */
  id?: string;
  /** The sync properties of the connected registry with its parent. */
  syncProperties: SyncProperties;
}

export function parentPropertiesSerializer(item: ParentProperties): any {
  return {
    id: item["id"],
    syncProperties: syncPropertiesSerializer(item["syncProperties"]),
  };
}

export function parentPropertiesDeserializer(item: any): ParentProperties {
  return {
    id: item["id"],
    syncProperties: syncPropertiesDeserializer(item["syncProperties"]),
  };
}

/** The sync properties of the connected registry with its parent. */
export interface SyncProperties {
  /** The resource ID of the ACR token used to authenticate the connected registry to its parent during sync. */
  tokenId: string;
  /** The cron expression indicating the schedule that the connected registry will sync with its parent. */
  schedule?: string;
  /** The time window during which sync is enabled for each schedule occurrence. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601. */
  syncWindow?: string;
  /** The period of time for which a message is available to sync before it is expired. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601. */
  messageTtl: string;
  /** The last time a sync occurred between the connected registry and its parent. */
  readonly lastSyncTime?: Date;
  /** The gateway endpoint used by the connected registry to communicate with its parent. */
  readonly gatewayEndpoint?: string;
}

export function syncPropertiesSerializer(item: SyncProperties): any {
  return {
    tokenId: item["tokenId"],
    schedule: item["schedule"],
    syncWindow: item["syncWindow"],
    messageTtl: item["messageTtl"],
  };
}

export function syncPropertiesDeserializer(item: any): SyncProperties {
  return {
    tokenId: item["tokenId"],
    schedule: item["schedule"],
    syncWindow: item["syncWindow"],
    messageTtl: item["messageTtl"],
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
    gatewayEndpoint: item["gatewayEndpoint"],
  };
}

/** The login server properties of the connected registry. */
export interface LoginServerProperties {
  /** The host of the connected registry. Can be FQDN or IP. */
  readonly host?: string;
  /** The TLS properties of the connected registry login server. */
  readonly tls?: TlsProperties;
}

export function loginServerPropertiesSerializer(item: LoginServerProperties): any {
  return item;
}

export function loginServerPropertiesDeserializer(item: any): LoginServerProperties {
  return {
    host: item["host"],
    tls: !item["tls"] ? item["tls"] : tlsPropertiesDeserializer(item["tls"]),
  };
}

/** The TLS properties of the connected registry login server. */
export interface TlsProperties {
  /** Indicates whether HTTPS is enabled for the login server. */
  readonly status?: TlsStatus;
  /** The certificate used to configure HTTPS for the login server. */
  readonly certificate?: TlsCertificateProperties;
}

export function tlsPropertiesDeserializer(item: any): TlsProperties {
  return {
    status: item["status"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : tlsCertificatePropertiesDeserializer(item["certificate"]),
  };
}

/** Indicates whether HTTPS is enabled for the login server. */
export enum KnownTlsStatus {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Indicates whether HTTPS is enabled for the login server. \
 * {@link KnownTlsStatus} can be used interchangeably with TlsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type TlsStatus = string;

/** The TLS certificate properties of the connected registry login server. */
export interface TlsCertificateProperties {
  /** The type of certificate location. */
  readonly type?: CertificateType;
  /** Indicates the location of the certificates. */
  readonly location?: string;
}

export function tlsCertificatePropertiesDeserializer(item: any): TlsCertificateProperties {
  return {
    type: item["type"],
    location: item["location"],
  };
}

/** The type of certificate location. */
export enum KnownCertificateType {
  LocalDirectory = "LocalDirectory",
}

/**
 * The type of certificate location. \
 * {@link KnownCertificateType} can be used interchangeably with CertificateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LocalDirectory**
 */
export type CertificateType = string;

/** The logging properties of the connected registry. */
export interface LoggingProperties {
  /** The verbosity of logs persisted on the connected registry. */
  logLevel?: LogLevel;
  /** Indicates whether audit logs are enabled on the connected registry. */
  auditLogStatus?: AuditLogStatus;
}

export function loggingPropertiesSerializer(item: LoggingProperties): any {
  return { logLevel: item["logLevel"], auditLogStatus: item["auditLogStatus"] };
}

export function loggingPropertiesDeserializer(item: any): LoggingProperties {
  return {
    logLevel: item["logLevel"],
    auditLogStatus: item["auditLogStatus"],
  };
}

/** The verbosity of logs persisted on the connected registry. */
export enum KnownLogLevel {
  Debug = "Debug",
  Information = "Information",
  Warning = "Warning",
  Error = "Error",
  None = "None",
}

/**
 * The verbosity of logs persisted on the connected registry. \
 * {@link KnownLogLevel} can be used interchangeably with LogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Debug** \
 * **Information** \
 * **Warning** \
 * **Error** \
 * **None**
 */
export type LogLevel = string;

/** Indicates whether audit logs are enabled on the connected registry. */
export enum KnownAuditLogStatus {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Indicates whether audit logs are enabled on the connected registry. \
 * {@link KnownAuditLogStatus} can be used interchangeably with AuditLogStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type AuditLogStatus = string;

export function statusDetailPropertiesArrayDeserializer(
  result: Array<StatusDetailProperties>,
): any[] {
  return result.map((item) => {
    return statusDetailPropertiesDeserializer(item);
  });
}

/** The status detail properties of the connected registry. */
export interface StatusDetailProperties {
  /** The component of the connected registry corresponding to the status. */
  readonly type?: string;
  /** The HTTP status code. */
  readonly code?: string;
  /** The description of the status. */
  readonly description?: string;
  /** The timestamp of the status. */
  readonly timestamp?: Date;
  /** The correlation ID of the status. */
  readonly correlationId?: string;
}

export function statusDetailPropertiesDeserializer(item: any): StatusDetailProperties {
  return {
    type: item["type"],
    code: item["code"],
    description: item["description"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    correlationId: item["correlationId"],
  };
}

/** The garbage collection properties of the connected registry. */
export interface GarbageCollectionProperties {
  /** Indicates whether garbage collection is enabled for the connected registry. */
  enabled?: boolean;
  /** The cron expression indicating the schedule that the connected registry will run garbage collection. */
  schedule?: string;
}

export function garbageCollectionPropertiesSerializer(item: GarbageCollectionProperties): any {
  return { enabled: item["enabled"], schedule: item["schedule"] };
}

export function garbageCollectionPropertiesDeserializer(item: any): GarbageCollectionProperties {
  return {
    enabled: item["enabled"],
    schedule: item["schedule"],
  };
}

/** The parameters for updating a connected registry. */
export interface ConnectedRegistryUpdateParameters {
  /** The properties of the connected registry update parameters. */
  properties?: ConnectedRegistryUpdateProperties;
}

export function connectedRegistryUpdateParametersSerializer(
  item: ConnectedRegistryUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectedRegistryUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The parameters for updating token properties. */
export interface ConnectedRegistryUpdateProperties {
  /** The sync properties of the connected registry with its parent. */
  syncProperties?: SyncUpdateProperties;
  /** The logging properties of the connected registry. */
  logging?: LoggingProperties;
  /** The list of the ACR token resource IDs used to authenticate clients to the connected registry. */
  clientTokenIds?: string[];
  /** The list of notifications subscription information for the connected registry. */
  notificationsList?: string[];
  /** The garbage collection properties of the connected registry. */
  garbageCollection?: GarbageCollectionProperties;
}

export function connectedRegistryUpdatePropertiesSerializer(
  item: ConnectedRegistryUpdateProperties,
): any {
  return {
    syncProperties: !item["syncProperties"]
      ? item["syncProperties"]
      : syncUpdatePropertiesSerializer(item["syncProperties"]),
    logging: !item["logging"] ? item["logging"] : loggingPropertiesSerializer(item["logging"]),
    clientTokenIds: !item["clientTokenIds"]
      ? item["clientTokenIds"]
      : item["clientTokenIds"].map((p: any) => {
          return p;
        }),
    notificationsList: !item["notificationsList"]
      ? item["notificationsList"]
      : item["notificationsList"].map((p: any) => {
          return p;
        }),
    garbageCollection: !item["garbageCollection"]
      ? item["garbageCollection"]
      : garbageCollectionPropertiesSerializer(item["garbageCollection"]),
  };
}

/** The parameters for updating the sync properties of the connected registry with its parent. */
export interface SyncUpdateProperties {
  /** The cron expression indicating the schedule that the connected registry will sync with its parent. */
  schedule?: string;
  /** The time window during which sync is enabled for each schedule occurrence. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601. */
  syncWindow?: string;
  /** The period of time for which a message is available to sync before it is expired. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601. */
  messageTtl?: string;
}

export function syncUpdatePropertiesSerializer(item: SyncUpdateProperties): any {
  return {
    schedule: item["schedule"],
    syncWindow: item["syncWindow"],
    messageTtl: item["messageTtl"],
  };
}

/** The result of a request to list connected registries for a container registry. */
export interface _ConnectedRegistryListResult {
  /** The list of connected registries. Since this list may be incomplete, the nextLink field should be used to request the next list of connected registries. */
  value?: ConnectedRegistry[];
  /** The URI that can be used to request the next list of connected registries. */
  nextLink?: string;
}

export function _connectedRegistryListResultDeserializer(item: any): _ConnectedRegistryListResult {
  return {
    value: !item["value"] ? item["value"] : connectedRegistryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectedRegistryArraySerializer(result: Array<ConnectedRegistry>): any[] {
  return result.map((item) => {
    return connectedRegistrySerializer(item);
  });
}

export function connectedRegistryArrayDeserializer(result: Array<ConnectedRegistry>): any[] {
  return result.map((item) => {
    return connectedRegistryDeserializer(item);
  });
}

/** An object that represents a credential set resource for a container registry. */
export interface CredentialSet extends ProxyResource {
  /** The properties of the credential set. */
  properties?: CredentialSetProperties;
  /** Identities associated with the resource. This is used to access the KeyVault secrets. */
  identity?: IdentityProperties;
}

export function credentialSetSerializer(item: CredentialSet): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : credentialSetPropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function credentialSetDeserializer(item: any): CredentialSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : credentialSetPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** The properties of a credential set resource. */
export interface CredentialSetProperties {
  /** The credentials are stored for this upstream or login server. */
  loginServer?: string;
  /**
   * List of authentication credentials stored for an upstream.
   * Usually consists of a primary and an optional secondary credential.
   */
  authCredentials?: AuthCredential[];
  /** The creation date of credential store resource. */
  readonly creationDate?: Date;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function credentialSetPropertiesSerializer(item: CredentialSetProperties): any {
  return {
    loginServer: item["loginServer"],
    authCredentials: !item["authCredentials"]
      ? item["authCredentials"]
      : authCredentialArraySerializer(item["authCredentials"]),
  };
}

export function credentialSetPropertiesDeserializer(item: any): CredentialSetProperties {
  return {
    loginServer: item["loginServer"],
    authCredentials: !item["authCredentials"]
      ? item["authCredentials"]
      : authCredentialArrayDeserializer(item["authCredentials"]),
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
  };
}

export function authCredentialArraySerializer(result: Array<AuthCredential>): any[] {
  return result.map((item) => {
    return authCredentialSerializer(item);
  });
}

export function authCredentialArrayDeserializer(result: Array<AuthCredential>): any[] {
  return result.map((item) => {
    return authCredentialDeserializer(item);
  });
}

/** Authentication credential stored for an upstream. */
export interface AuthCredential {
  /** The name of the credential. */
  name?: CredentialName;
  /** KeyVault Secret URI for accessing the username. */
  usernameSecretIdentifier?: string;
  /** KeyVault Secret URI for accessing the password. */
  passwordSecretIdentifier?: string;
  /** This provides data pertaining to the health of the auth credential. */
  readonly credentialHealth?: CredentialHealth;
}

export function authCredentialSerializer(item: AuthCredential): any {
  return {
    name: item["name"],
    usernameSecretIdentifier: item["usernameSecretIdentifier"],
    passwordSecretIdentifier: item["passwordSecretIdentifier"],
  };
}

export function authCredentialDeserializer(item: any): AuthCredential {
  return {
    name: item["name"],
    usernameSecretIdentifier: item["usernameSecretIdentifier"],
    passwordSecretIdentifier: item["passwordSecretIdentifier"],
    credentialHealth: !item["credentialHealth"]
      ? item["credentialHealth"]
      : credentialHealthDeserializer(item["credentialHealth"]),
  };
}

/** The name of the credential. */
export enum KnownCredentialName {
  Credential1 = "Credential1",
}

/**
 * The name of the credential. \
 * {@link KnownCredentialName} can be used interchangeably with CredentialName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Credential1**
 */
export type CredentialName = string;

/** The health of the auth credential. */
export interface CredentialHealth {
  /** The health status of credential. */
  status?: CredentialHealthStatus;
  /** Error code representing the health check error. */
  errorCode?: string;
  /** Descriptive message representing the health check error. */
  errorMessage?: string;
}

export function credentialHealthDeserializer(item: any): CredentialHealth {
  return {
    status: item["status"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** The health status of credential. */
export enum KnownCredentialHealthStatus {
  Healthy = "Healthy",
  Unhealthy = "Unhealthy",
}

/**
 * The health status of credential. \
 * {@link KnownCredentialHealthStatus} can be used interchangeably with CredentialHealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy** \
 * **Unhealthy**
 */
export type CredentialHealthStatus = string;

/** The parameters for updating a credential set */
export interface CredentialSetUpdateParameters {
  /** The properties of the credential set update parameters */
  properties?: CredentialSetUpdateProperties;
  /** Identities associated with the resource. This is used to access the KeyVault secrets. */
  identity?: IdentityProperties;
}

export function credentialSetUpdateParametersSerializer(item: CredentialSetUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : credentialSetUpdatePropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

/** The parameters for updating credential set properties. */
export interface CredentialSetUpdateProperties {
  /**
   * List of authentication credentials stored for an upstream.
   * Usually consists of a primary and an optional secondary credential.
   */
  authCredentials?: AuthCredential[];
}

export function credentialSetUpdatePropertiesSerializer(item: CredentialSetUpdateProperties): any {
  return {
    authCredentials: !item["authCredentials"]
      ? item["authCredentials"]
      : authCredentialArraySerializer(item["authCredentials"]),
  };
}

/** The result of a request to list credential sets for a container registry. */
export interface _CredentialSetListResult {
  /** The list of credential sets. Since this list may be incomplete, the nextLink field should be used to request the next list of credential sets. */
  value?: CredentialSet[];
  /** The URI that can be used to request the next list of credential sets. */
  nextLink?: string;
}

export function _credentialSetListResultDeserializer(item: any): _CredentialSetListResult {
  return {
    value: !item["value"] ? item["value"] : credentialSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function credentialSetArraySerializer(result: Array<CredentialSet>): any[] {
  return result.map((item) => {
    return credentialSetSerializer(item);
  });
}

export function credentialSetArrayDeserializer(result: Array<CredentialSet>): any[] {
  return result.map((item) => {
    return credentialSetDeserializer(item);
  });
}

/** An object that represents an export pipeline for a container registry. */
export interface ExportPipeline extends ProxyResource {
  /** The properties of the export pipeline. */
  properties?: ExportPipelineProperties;
  /** The location of the export pipeline. */
  location?: string;
  /** The identity of the export pipeline. */
  identity?: IdentityProperties;
}

export function exportPipelineSerializer(item: ExportPipeline): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : exportPipelinePropertiesSerializer(item["properties"]),
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function exportPipelineDeserializer(item: any): ExportPipeline {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : exportPipelinePropertiesDeserializer(item["properties"]),
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** The properties of an export pipeline. */
export interface ExportPipelineProperties {
  /** The target properties of the export pipeline. */
  target: ExportPipelineTargetProperties;
  /** The list of all options configured for the pipeline. */
  options?: PipelineOptions[];
  /** The provisioning state of the pipeline at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
}

export function exportPipelinePropertiesSerializer(item: ExportPipelineProperties): any {
  return {
    target: exportPipelineTargetPropertiesSerializer(item["target"]),
    options: !item["options"]
      ? item["options"]
      : item["options"].map((p: any) => {
          return p;
        }),
  };
}

export function exportPipelinePropertiesDeserializer(item: any): ExportPipelineProperties {
  return {
    target: exportPipelineTargetPropertiesDeserializer(item["target"]),
    options: !item["options"]
      ? item["options"]
      : item["options"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The properties of the export pipeline target. */
export interface ExportPipelineTargetProperties {
  /** The type of target for the export pipeline. */
  type?: string;
  /**
   * The target uri of the export pipeline.
   * When 'AzureStorageBlob': "https://accountName.blob.core.windows.net/containerName/blobName"
   * When 'AzureStorageBlobContainer':  "https://accountName.blob.core.windows.net/containerName"
   */
  uri?: string;
  /** They key vault secret uri to obtain the target storage SAS token. */
  keyVaultUri: string;
}

export function exportPipelineTargetPropertiesSerializer(
  item: ExportPipelineTargetProperties,
): any {
  return {
    type: item["type"],
    uri: item["uri"],
    keyVaultUri: item["keyVaultUri"],
  };
}

export function exportPipelineTargetPropertiesDeserializer(
  item: any,
): ExportPipelineTargetProperties {
  return {
    type: item["type"],
    uri: item["uri"],
    keyVaultUri: item["keyVaultUri"],
  };
}

/** Known values of {@link PipelineOptions} that the service accepts. */
export enum KnownPipelineOptions {
  OverwriteTags = "OverwriteTags",
  OverwriteBlobs = "OverwriteBlobs",
  DeleteSourceBlobOnSuccess = "DeleteSourceBlobOnSuccess",
  ContinueOnErrors = "ContinueOnErrors",
}

/** Type of PipelineOptions */
export type PipelineOptions = string;

/** The result of a request to list export pipelines for a container registry. */
export interface _ExportPipelineListResult {
  /** The list of export pipelines. Since this list may be incomplete, the nextLink field should be used to request the next list of export pipelines. */
  value?: ExportPipeline[];
  /** The URI that can be used to request the next list of export pipelines. */
  nextLink?: string;
}

export function _exportPipelineListResultDeserializer(item: any): _ExportPipelineListResult {
  return {
    value: !item["value"] ? item["value"] : exportPipelineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function exportPipelineArraySerializer(result: Array<ExportPipeline>): any[] {
  return result.map((item) => {
    return exportPipelineSerializer(item);
  });
}

export function exportPipelineArrayDeserializer(result: Array<ExportPipeline>): any[] {
  return result.map((item) => {
    return exportPipelineDeserializer(item);
  });
}

/** An object that represents an import pipeline for a container registry. */
export interface ImportPipeline extends ProxyResource {
  /** The properties of the import pipeline. */
  properties?: ImportPipelineProperties;
  /** The location of the import pipeline. */
  location?: string;
  /** The identity of the import pipeline. */
  identity?: IdentityProperties;
}

export function importPipelineSerializer(item: ImportPipeline): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : importPipelinePropertiesSerializer(item["properties"]),
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function importPipelineDeserializer(item: any): ImportPipeline {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : importPipelinePropertiesDeserializer(item["properties"]),
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** The properties of an import pipeline. */
export interface ImportPipelineProperties {
  /** The source properties of the import pipeline. */
  source: ImportPipelineSourceProperties;
  /** The properties that describe the trigger of the import pipeline. */
  trigger?: PipelineTriggerProperties;
  /** The list of all options configured for the pipeline. */
  options?: PipelineOptions[];
  /** The provisioning state of the pipeline at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
}

export function importPipelinePropertiesSerializer(item: ImportPipelineProperties): any {
  return {
    source: importPipelineSourcePropertiesSerializer(item["source"]),
    trigger: !item["trigger"]
      ? item["trigger"]
      : pipelineTriggerPropertiesSerializer(item["trigger"]),
    options: !item["options"]
      ? item["options"]
      : item["options"].map((p: any) => {
          return p;
        }),
  };
}

export function importPipelinePropertiesDeserializer(item: any): ImportPipelineProperties {
  return {
    source: importPipelineSourcePropertiesDeserializer(item["source"]),
    trigger: !item["trigger"]
      ? item["trigger"]
      : pipelineTriggerPropertiesDeserializer(item["trigger"]),
    options: !item["options"]
      ? item["options"]
      : item["options"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The properties of the import pipeline source. */
export interface ImportPipelineSourceProperties {
  /** The type of source for the import pipeline. */
  type?: PipelineSourceType;
  /**
   * The source uri of the import pipeline.
   * When 'AzureStorageBlob': "https://accountName.blob.core.windows.net/containerName/blobName"
   * When 'AzureStorageBlobContainer': "https://accountName.blob.core.windows.net/containerName"
   */
  uri?: string;
  /** They key vault secret uri to obtain the source storage SAS token. */
  keyVaultUri: string;
}

export function importPipelineSourcePropertiesSerializer(
  item: ImportPipelineSourceProperties,
): any {
  return {
    type: item["type"],
    uri: item["uri"],
    keyVaultUri: item["keyVaultUri"],
  };
}

export function importPipelineSourcePropertiesDeserializer(
  item: any,
): ImportPipelineSourceProperties {
  return {
    type: item["type"],
    uri: item["uri"],
    keyVaultUri: item["keyVaultUri"],
  };
}

/** The type of source for the import pipeline. */
export enum KnownPipelineSourceType {
  AzureStorageBlobContainer = "AzureStorageBlobContainer",
}

/**
 * The type of source for the import pipeline. \
 * {@link KnownPipelineSourceType} can be used interchangeably with PipelineSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureStorageBlobContainer**
 */
export type PipelineSourceType = string;

/** model interface PipelineTriggerProperties */
export interface PipelineTriggerProperties {
  /** The source trigger properties of the pipeline. */
  sourceTrigger?: PipelineSourceTriggerProperties;
}

export function pipelineTriggerPropertiesSerializer(item: PipelineTriggerProperties): any {
  return {
    sourceTrigger: !item["sourceTrigger"]
      ? item["sourceTrigger"]
      : pipelineSourceTriggerPropertiesSerializer(item["sourceTrigger"]),
  };
}

export function pipelineTriggerPropertiesDeserializer(item: any): PipelineTriggerProperties {
  return {
    sourceTrigger: !item["sourceTrigger"]
      ? item["sourceTrigger"]
      : pipelineSourceTriggerPropertiesDeserializer(item["sourceTrigger"]),
  };
}

/** model interface PipelineSourceTriggerProperties */
export interface PipelineSourceTriggerProperties {
  /** The current status of the source trigger. */
  status: TriggerStatus;
}

export function pipelineSourceTriggerPropertiesSerializer(
  item: PipelineSourceTriggerProperties,
): any {
  return { status: item["status"] };
}

export function pipelineSourceTriggerPropertiesDeserializer(
  item: any,
): PipelineSourceTriggerProperties {
  return {
    status: item["status"],
  };
}

/** The current status of the source trigger. */
export enum KnownTriggerStatus {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * The current status of the source trigger. \
 * {@link KnownTriggerStatus} can be used interchangeably with TriggerStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type TriggerStatus = string;

/** The result of a request to list import pipelines for a container registry. */
export interface _ImportPipelineListResult {
  /** The list of import pipelines. Since this list may be incomplete, the nextLink field should be used to request the next list of import pipelines. */
  value?: ImportPipeline[];
  /** The URI that can be used to request the next list of import pipelines. */
  nextLink?: string;
}

export function _importPipelineListResultDeserializer(item: any): _ImportPipelineListResult {
  return {
    value: !item["value"] ? item["value"] : importPipelineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function importPipelineArraySerializer(result: Array<ImportPipeline>): any[] {
  return result.map((item) => {
    return importPipelineSerializer(item);
  });
}

export function importPipelineArrayDeserializer(result: Array<ImportPipeline>): any[] {
  return result.map((item) => {
    return importPipelineDeserializer(item);
  });
}

/** An object that represents a pipeline run for a container registry. */
export interface PipelineRun extends ProxyResource {
  /** The properties of a pipeline run. */
  properties?: PipelineRunProperties;
}

export function pipelineRunSerializer(item: PipelineRun): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : pipelineRunPropertiesSerializer(item["properties"]),
  };
}

export function pipelineRunDeserializer(item: any): PipelineRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : pipelineRunPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a pipeline run. */
export interface PipelineRunProperties {
  /** The provisioning state of a pipeline run. */
  readonly provisioningState?: ProvisioningState;
  /** The request parameters for a pipeline run. */
  request?: PipelineRunRequest;
  /** The response of a pipeline run. */
  readonly response?: PipelineRunResponse;
  /** How the pipeline run should be forced to recreate even if the pipeline run configuration has not changed. */
  forceUpdateTag?: string;
}

export function pipelineRunPropertiesSerializer(item: PipelineRunProperties): any {
  return {
    request: !item["request"] ? item["request"] : pipelineRunRequestSerializer(item["request"]),
    forceUpdateTag: item["forceUpdateTag"],
  };
}

export function pipelineRunPropertiesDeserializer(item: any): PipelineRunProperties {
  return {
    provisioningState: item["provisioningState"],
    request: !item["request"] ? item["request"] : pipelineRunRequestDeserializer(item["request"]),
    response: !item["response"]
      ? item["response"]
      : pipelineRunResponseDeserializer(item["response"]),
    forceUpdateTag: item["forceUpdateTag"],
  };
}

/** The request properties provided for a pipeline run. */
export interface PipelineRunRequest {
  /** The resource ID of the pipeline to run. */
  pipelineResourceId?: string;
  /**
   * List of source artifacts to be transferred by the pipeline.
   * Specify an image by repository ('hello-world'). This will use the 'latest' tag.
   * Specify an image by tag ('hello-world:latest').
   * Specify an image by sha256-based manifest digest ('hello-world@sha256:abc123').
   */
  artifacts?: string[];
  /** The source properties of the pipeline run. */
  source?: PipelineRunSourceProperties;
  /** The target properties of the pipeline run. */
  target?: PipelineRunTargetProperties;
  /** The digest of the tar used to transfer the artifacts. */
  catalogDigest?: string;
}

export function pipelineRunRequestSerializer(item: PipelineRunRequest): any {
  return {
    pipelineResourceId: item["pipelineResourceId"],
    artifacts: !item["artifacts"]
      ? item["artifacts"]
      : item["artifacts"].map((p: any) => {
          return p;
        }),
    source: !item["source"]
      ? item["source"]
      : pipelineRunSourcePropertiesSerializer(item["source"]),
    target: !item["target"]
      ? item["target"]
      : pipelineRunTargetPropertiesSerializer(item["target"]),
    catalogDigest: item["catalogDigest"],
  };
}

export function pipelineRunRequestDeserializer(item: any): PipelineRunRequest {
  return {
    pipelineResourceId: item["pipelineResourceId"],
    artifacts: !item["artifacts"]
      ? item["artifacts"]
      : item["artifacts"].map((p: any) => {
          return p;
        }),
    source: !item["source"]
      ? item["source"]
      : pipelineRunSourcePropertiesDeserializer(item["source"]),
    target: !item["target"]
      ? item["target"]
      : pipelineRunTargetPropertiesDeserializer(item["target"]),
    catalogDigest: item["catalogDigest"],
  };
}

/** model interface PipelineRunSourceProperties */
export interface PipelineRunSourceProperties {
  /** The type of the source. */
  type?: PipelineRunSourceType;
  /** The name of the source. */
  name?: string;
}

export function pipelineRunSourcePropertiesSerializer(item: PipelineRunSourceProperties): any {
  return { type: item["type"], name: item["name"] };
}

export function pipelineRunSourcePropertiesDeserializer(item: any): PipelineRunSourceProperties {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** The type of the source. */
export enum KnownPipelineRunSourceType {
  AzureStorageBlob = "AzureStorageBlob",
}

/**
 * The type of the source. \
 * {@link KnownPipelineRunSourceType} can be used interchangeably with PipelineRunSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureStorageBlob**
 */
export type PipelineRunSourceType = string;

/** model interface PipelineRunTargetProperties */
export interface PipelineRunTargetProperties {
  /** The type of the target. */
  type?: PipelineRunTargetType;
  /** The name of the target. */
  name?: string;
}

export function pipelineRunTargetPropertiesSerializer(item: PipelineRunTargetProperties): any {
  return { type: item["type"], name: item["name"] };
}

export function pipelineRunTargetPropertiesDeserializer(item: any): PipelineRunTargetProperties {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** The type of the target. */
export enum KnownPipelineRunTargetType {
  AzureStorageBlob = "AzureStorageBlob",
}

/**
 * The type of the target. \
 * {@link KnownPipelineRunTargetType} can be used interchangeably with PipelineRunTargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureStorageBlob**
 */
export type PipelineRunTargetType = string;

/** The response properties returned for a pipeline run. */
export interface PipelineRunResponse {
  /** The current status of the pipeline run. */
  status?: string;
  /** The artifacts imported in the pipeline run. */
  importedArtifacts?: string[];
  /** The current progress of the copy operation. */
  progress?: ProgressProperties;
  /** The time the pipeline run started. */
  startTime?: Date;
  /** The time the pipeline run finished. */
  finishTime?: Date;
  /** The source of the pipeline run. */
  source?: ImportPipelineSourceProperties;
  /** The target of the pipeline run. */
  target?: ExportPipelineTargetProperties;
  /** The digest of the tar used to transfer the artifacts. */
  catalogDigest?: string;
  /** The trigger that caused the pipeline run. */
  trigger?: PipelineTriggerDescriptor;
  /** The detailed error message for the pipeline run in the case of failure. */
  pipelineRunErrorMessage?: string;
}

export function pipelineRunResponseDeserializer(item: any): PipelineRunResponse {
  return {
    status: item["status"],
    importedArtifacts: !item["importedArtifacts"]
      ? item["importedArtifacts"]
      : item["importedArtifacts"].map((p: any) => {
          return p;
        }),
    progress: !item["progress"]
      ? item["progress"]
      : progressPropertiesDeserializer(item["progress"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    finishTime: !item["finishTime"] ? item["finishTime"] : new Date(item["finishTime"]),
    source: !item["source"]
      ? item["source"]
      : importPipelineSourcePropertiesDeserializer(item["source"]),
    target: !item["target"]
      ? item["target"]
      : exportPipelineTargetPropertiesDeserializer(item["target"]),
    catalogDigest: item["catalogDigest"],
    trigger: !item["trigger"]
      ? item["trigger"]
      : pipelineTriggerDescriptorDeserializer(item["trigger"]),
    pipelineRunErrorMessage: item["pipelineRunErrorMessage"],
  };
}

/** model interface ProgressProperties */
export interface ProgressProperties {
  /** The percentage complete of the copy operation. */
  percentage?: string;
}

export function progressPropertiesDeserializer(item: any): ProgressProperties {
  return {
    percentage: item["percentage"],
  };
}

/** model interface PipelineTriggerDescriptor */
export interface PipelineTriggerDescriptor {
  /** The source trigger that caused the pipeline run. */
  sourceTrigger?: PipelineSourceTriggerDescriptor;
}

export function pipelineTriggerDescriptorDeserializer(item: any): PipelineTriggerDescriptor {
  return {
    sourceTrigger: !item["sourceTrigger"]
      ? item["sourceTrigger"]
      : pipelineSourceTriggerDescriptorDeserializer(item["sourceTrigger"]),
  };
}

/** model interface PipelineSourceTriggerDescriptor */
export interface PipelineSourceTriggerDescriptor {
  /** The timestamp when the source update happened. */
  timestamp?: Date;
}

export function pipelineSourceTriggerDescriptorDeserializer(
  item: any,
): PipelineSourceTriggerDescriptor {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

/** The result of a request to list pipeline runs for a container registry. */
export interface _PipelineRunListResult {
  /** The list of pipeline runs. Since this list may be incomplete, the nextLink field should be used to request the next list of pipeline runs. */
  value?: PipelineRun[];
  /** The URI that can be used to request the next list of pipeline runs. */
  nextLink?: string;
}

export function _pipelineRunListResultDeserializer(item: any): _PipelineRunListResult {
  return {
    value: !item["value"] ? item["value"] : pipelineRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function pipelineRunArraySerializer(result: Array<PipelineRun>): any[] {
  return result.map((item) => {
    return pipelineRunSerializer(item);
  });
}

export function pipelineRunArrayDeserializer(result: Array<PipelineRun>): any[] {
  return result.map((item) => {
    return pipelineRunDeserializer(item);
  });
}

/** The result of a request to list private endpoint connections for a container registry. */
export interface _PrivateEndpointConnectionListResult {
  /** The list of private endpoint connections. Since this list may be incomplete, the nextLink field should be used to request the next list of private endpoint connections. */
  value?: PrivateEndpointConnection[];
  /** The URI that can be used to request the next list of private endpoint connections. */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** An object that represents a replication for a container registry. */
export interface Replication extends TrackedResource {
  /** The properties of the replication. */
  properties?: ReplicationProperties;
}

export function replicationSerializer(item: Replication): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : replicationPropertiesSerializer(item["properties"]),
  };
}

export function replicationDeserializer(item: any): Replication {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : replicationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a replication. */
export interface ReplicationProperties {
  /** The provisioning state of the replication at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** The status of the replication at the time the operation was called. */
  readonly status?: Status;
  /** Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications. */
  regionEndpointEnabled?: boolean;
  /** Whether or not zone redundancy is enabled for this container registry replication */
  zoneRedundancy?: ZoneRedundancy;
}

export function replicationPropertiesSerializer(item: ReplicationProperties): any {
  return {
    regionEndpointEnabled: item["regionEndpointEnabled"],
    zoneRedundancy: item["zoneRedundancy"],
  };
}

export function replicationPropertiesDeserializer(item: any): ReplicationProperties {
  return {
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    regionEndpointEnabled: item["regionEndpointEnabled"],
    zoneRedundancy: item["zoneRedundancy"],
  };
}

/** The parameters for updating a replication. */
export interface ReplicationUpdateParameters {
  /** The tags for the replication. */
  tags?: Record<string, string>;
  /** The parameters for updating a replication's properties */
  properties?: ReplicationUpdateParametersProperties;
}

export function replicationUpdateParametersSerializer(item: ReplicationUpdateParameters): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : replicationUpdateParametersPropertiesSerializer(item["properties"]),
  };
}

/** model interface ReplicationUpdateParametersProperties */
export interface ReplicationUpdateParametersProperties {
  /** Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications. */
  regionEndpointEnabled?: boolean;
}

export function replicationUpdateParametersPropertiesSerializer(
  item: ReplicationUpdateParametersProperties,
): any {
  return { regionEndpointEnabled: item["regionEndpointEnabled"] };
}

/** The result of a request to list replications for a container registry. */
export interface _ReplicationListResult {
  /** The list of replications. Since this list may be incomplete, the nextLink field should be used to request the next list of replications. */
  value?: Replication[];
  /** The URI that can be used to request the next list of replications. */
  nextLink?: string;
}

export function _replicationListResultDeserializer(item: any): _ReplicationListResult {
  return {
    value: !item["value"] ? item["value"] : replicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationArraySerializer(result: Array<Replication>): any[] {
  return result.map((item) => {
    return replicationSerializer(item);
  });
}

export function replicationArrayDeserializer(result: Array<Replication>): any[] {
  return result.map((item) => {
    return replicationDeserializer(item);
  });
}

/** An object that represents a scope map for a container registry. */
export interface ScopeMap extends ProxyResource {
  /** The properties of the scope map. */
  properties?: ScopeMapProperties;
}

export function scopeMapSerializer(item: ScopeMap): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : scopeMapPropertiesSerializer(item["properties"]),
  };
}

export function scopeMapDeserializer(item: any): ScopeMap {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scopeMapPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a scope map. */
export interface ScopeMapProperties {
  /** The user friendly description of the scope map. */
  description?: string;
  /** The type of the scope map. E.g. BuildIn scope map. */
  readonly type?: string;
  /** The creation date of scope map. */
  readonly creationDate?: Date;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * The list of scoped permissions for registry artifacts.
   * E.g. repositories/repository-name/content/read,
   * repositories/repository-name/metadata/write
   */
  actions: string[];
}

export function scopeMapPropertiesSerializer(item: ScopeMapProperties): any {
  return {
    description: item["description"],
    actions: item["actions"].map((p: any) => {
      return p;
    }),
  };
}

export function scopeMapPropertiesDeserializer(item: any): ScopeMapProperties {
  return {
    description: item["description"],
    type: item["type"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
    actions: item["actions"].map((p: any) => {
      return p;
    }),
  };
}

/** The properties for updating the scope map. */
export interface ScopeMapUpdateParameters {
  /** The update parameters for scope map properties. */
  properties?: ScopeMapPropertiesUpdateParameters;
}

export function scopeMapUpdateParametersSerializer(item: ScopeMapUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : scopeMapPropertiesUpdateParametersSerializer(item["properties"]),
  };
}

/** The update parameters for scope map properties. */
export interface ScopeMapPropertiesUpdateParameters {
  /** The user friendly description of the scope map. */
  description?: string;
  /**
   * The list of scope permissions for registry artifacts.
   * E.g. repositories/repository-name/pull,
   * repositories/repository-name/delete
   */
  actions?: string[];
}

export function scopeMapPropertiesUpdateParametersSerializer(
  item: ScopeMapPropertiesUpdateParameters,
): any {
  return {
    description: item["description"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

/** The result of a request to list scope maps for a container registry. */
export interface _ScopeMapListResult {
  /** The list of scope maps. Since this list may be incomplete, the nextLink field should be used to request the next list of scope maps. */
  value?: ScopeMap[];
  /** The URI that can be used to request the next list of scope maps. */
  nextLink?: string;
}

export function _scopeMapListResultDeserializer(item: any): _ScopeMapListResult {
  return {
    value: !item["value"] ? item["value"] : scopeMapArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scopeMapArraySerializer(result: Array<ScopeMap>): any[] {
  return result.map((item) => {
    return scopeMapSerializer(item);
  });
}

export function scopeMapArrayDeserializer(result: Array<ScopeMap>): any[] {
  return result.map((item) => {
    return scopeMapDeserializer(item);
  });
}

/** An object that represents a token for a container registry. */
export interface Token extends ProxyResource {
  /** The properties of the token. */
  properties?: TokenProperties;
}

export function tokenSerializer(item: Token): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : tokenPropertiesSerializer(item["properties"]),
  };
}

export function tokenDeserializer(item: any): Token {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : tokenPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a token. */
export interface TokenProperties {
  /** The creation date of scope map. */
  readonly creationDate?: Date;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of the scope map to which the token will be associated with. */
  scopeMapId?: string;
  /** The credentials that can be used for authenticating the token. */
  credentials?: TokenCredentialsProperties;
  /** The status of the token example enabled or disabled. */
  status?: TokenStatus;
}

export function tokenPropertiesSerializer(item: TokenProperties): any {
  return {
    scopeMapId: item["scopeMapId"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : tokenCredentialsPropertiesSerializer(item["credentials"]),
    status: item["status"],
  };
}

export function tokenPropertiesDeserializer(item: any): TokenProperties {
  return {
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
    scopeMapId: item["scopeMapId"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : tokenCredentialsPropertiesDeserializer(item["credentials"]),
    status: item["status"],
  };
}

/** The properties of the credentials that can be used for authenticating the token. */
export interface TokenCredentialsProperties {
  certificates?: TokenCertificate[];
  passwords?: TokenPassword[];
}

export function tokenCredentialsPropertiesSerializer(item: TokenCredentialsProperties): any {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : tokenCertificateArraySerializer(item["certificates"]),
    passwords: !item["passwords"]
      ? item["passwords"]
      : tokenPasswordArraySerializer(item["passwords"]),
  };
}

export function tokenCredentialsPropertiesDeserializer(item: any): TokenCredentialsProperties {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : tokenCertificateArrayDeserializer(item["certificates"]),
    passwords: !item["passwords"]
      ? item["passwords"]
      : tokenPasswordArrayDeserializer(item["passwords"]),
  };
}

export function tokenCertificateArraySerializer(result: Array<TokenCertificate>): any[] {
  return result.map((item) => {
    return tokenCertificateSerializer(item);
  });
}

export function tokenCertificateArrayDeserializer(result: Array<TokenCertificate>): any[] {
  return result.map((item) => {
    return tokenCertificateDeserializer(item);
  });
}

/** The properties of a certificate used for authenticating a token. */
export interface TokenCertificate {
  name?: TokenCertificateName;
  /** The expiry datetime of the certificate. */
  expiry?: Date;
  /** The thumbprint of the certificate. */
  thumbprint?: string;
  /** Base 64 encoded string of the public certificate1 in PEM format that will be used for authenticating the token. */
  encodedPemCertificate?: string;
}

export function tokenCertificateSerializer(item: TokenCertificate): any {
  return {
    name: item["name"],
    expiry: !item["expiry"] ? item["expiry"] : item["expiry"].toISOString(),
    thumbprint: item["thumbprint"],
    encodedPemCertificate: item["encodedPemCertificate"],
  };
}

export function tokenCertificateDeserializer(item: any): TokenCertificate {
  return {
    name: item["name"],
    expiry: !item["expiry"] ? item["expiry"] : new Date(item["expiry"]),
    thumbprint: item["thumbprint"],
    encodedPemCertificate: item["encodedPemCertificate"],
  };
}

/** Known values of {@link TokenCertificateName} that the service accepts. */
export enum KnownTokenCertificateName {
  Certificate1 = "certificate1",
  Certificate2 = "certificate2",
}

/** Type of TokenCertificateName */
export type TokenCertificateName = string;

/** The status of the token example enabled or disabled. */
export enum KnownTokenStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

/**
 * The status of the token example enabled or disabled. \
 * {@link KnownTokenStatus} can be used interchangeably with TokenStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type TokenStatus = string;

/** The parameters for updating a token. */
export interface TokenUpdateParameters {
  /** The properties of the token update parameters. */
  properties?: TokenUpdateProperties;
}

export function tokenUpdateParametersSerializer(item: TokenUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : tokenUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The parameters for updating token properties. */
export interface TokenUpdateProperties {
  /** The resource ID of the scope map to which the token will be associated with. */
  scopeMapId?: string;
  /** The status of the token example enabled or disabled. */
  status?: TokenStatus;
  /** The credentials that can be used for authenticating the token. */
  credentials?: TokenCredentialsProperties;
}

export function tokenUpdatePropertiesSerializer(item: TokenUpdateProperties): any {
  return {
    scopeMapId: item["scopeMapId"],
    status: item["status"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : tokenCredentialsPropertiesSerializer(item["credentials"]),
  };
}

/** The result of a request to list tokens for a container registry. */
export interface _TokenListResult {
  /** The list of tokens. Since this list may be incomplete, the nextLink field should be used to request the next list of tokens. */
  value?: Token[];
  /** The URI that can be used to request the next list of tokens. */
  nextLink?: string;
}

export function _tokenListResultDeserializer(item: any): _TokenListResult {
  return {
    value: !item["value"] ? item["value"] : tokenArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tokenArraySerializer(result: Array<Token>): any[] {
  return result.map((item) => {
    return tokenSerializer(item);
  });
}

export function tokenArrayDeserializer(result: Array<Token>): any[] {
  return result.map((item) => {
    return tokenDeserializer(item);
  });
}

/** An object that represents a webhook for a container registry. */
export interface Webhook extends TrackedResource {
  /** The properties of the webhook. */
  properties?: WebhookProperties;
}

export function webhookDeserializer(item: any): Webhook {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : webhookPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a webhook. */
export interface WebhookProperties {
  /** The status of the webhook at the time the operation was called. */
  status?: WebhookStatus;
  /** The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events. */
  scope?: string;
  /** The list of actions that trigger the webhook to post notifications. */
  actions: WebhookAction[];
  /** The provisioning state of the webhook at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
}

export function webhookPropertiesDeserializer(item: any): WebhookProperties {
  return {
    status: item["status"],
    scope: item["scope"],
    actions: item["actions"].map((p: any) => {
      return p;
    }),
    provisioningState: item["provisioningState"],
  };
}

/** The status of the webhook at the time the operation was called. */
export enum KnownWebhookStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

/**
 * The status of the webhook at the time the operation was called. \
 * {@link KnownWebhookStatus} can be used interchangeably with WebhookStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type WebhookStatus = string;

/** Known values of {@link WebhookAction} that the service accepts. */
export enum KnownWebhookAction {
  Push = "push",
  Delete = "delete",
  Quarantine = "quarantine",
  ChartPush = "chart_push",
  ChartDelete = "chart_delete",
}

/** Type of WebhookAction */
export type WebhookAction = string;

/** The parameters for creating a webhook. */
export interface WebhookCreateParameters {
  /** The tags for the webhook. */
  tags?: Record<string, string>;
  /** The location of the webhook. This cannot be changed after the resource is created. */
  location: string;
  /** The properties that the webhook will be created with. */
  properties?: WebhookPropertiesCreateParameters;
}

export function webhookCreateParametersSerializer(item: WebhookCreateParameters): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : webhookPropertiesCreateParametersSerializer(item["properties"]),
  };
}

/** The parameters for creating the properties of a webhook. */
export interface WebhookPropertiesCreateParameters {
  /** The service URI for the webhook to post notifications. */
  serviceUri: string;
  /** Custom headers that will be added to the webhook notifications. */
  customHeaders?: Record<string, string>;
  /** The status of the webhook at the time the operation was called. */
  status?: WebhookStatus;
  /** The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events. */
  scope?: string;
  /** The list of actions that trigger the webhook to post notifications. */
  actions: WebhookAction[];
}

export function webhookPropertiesCreateParametersSerializer(
  item: WebhookPropertiesCreateParameters,
): any {
  return {
    serviceUri: item["serviceUri"],
    customHeaders: item["customHeaders"],
    status: item["status"],
    scope: item["scope"],
    actions: item["actions"].map((p: any) => {
      return p;
    }),
  };
}

/** The parameters for updating a webhook. */
export interface WebhookUpdateParameters {
  /** The tags for the webhook. */
  tags?: Record<string, string>;
  /** The properties that the webhook will be updated with. */
  properties?: WebhookPropertiesUpdateParameters;
}

export function webhookUpdateParametersSerializer(item: WebhookUpdateParameters): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : webhookPropertiesUpdateParametersSerializer(item["properties"]),
  };
}

/** The parameters for updating the properties of a webhook. */
export interface WebhookPropertiesUpdateParameters {
  /** The service URI for the webhook to post notifications. */
  serviceUri?: string;
  /** Custom headers that will be added to the webhook notifications. */
  customHeaders?: Record<string, string>;
  /** The status of the webhook at the time the operation was called. */
  status?: WebhookStatus;
  /** The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events. */
  scope?: string;
  /** The list of actions that trigger the webhook to post notifications. */
  actions?: WebhookAction[];
}

export function webhookPropertiesUpdateParametersSerializer(
  item: WebhookPropertiesUpdateParameters,
): any {
  return {
    serviceUri: item["serviceUri"],
    customHeaders: item["customHeaders"],
    status: item["status"],
    scope: item["scope"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

/** The result of a request to list webhooks for a container registry. */
export interface _WebhookListResult {
  /** The list of webhooks. Since this list may be incomplete, the nextLink field should be used to request the next list of webhooks. */
  value?: Webhook[];
  /** The URI that can be used to request the next list of webhooks. */
  nextLink?: string;
}

export function _webhookListResultDeserializer(item: any): _WebhookListResult {
  return {
    value: !item["value"] ? item["value"] : webhookArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webhookArrayDeserializer(result: Array<Webhook>): any[] {
  return result.map((item) => {
    return webhookDeserializer(item);
  });
}

/** The basic information of an event. */
export interface EventInfo {
  /** The event ID. */
  id?: string;
}

export function eventInfoDeserializer(item: any): EventInfo {
  return {
    id: item["id"],
  };
}

/** The result of a request to list events for a webhook. */
export interface _EventListResult {
  /** The list of events. Since this list may be incomplete, the nextLink field should be used to request the next list of events. */
  value?: Event[];
  /** The URI that can be used to request the next list of events. */
  nextLink?: string;
}

export function _eventListResultDeserializer(item: any): _EventListResult {
  return {
    value: !item["value"] ? item["value"] : eventArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventArrayDeserializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventDeserializer(item);
  });
}

/** The event for a webhook. */
export interface Event extends EventInfo {
  /** The event request message sent to the service URI. */
  eventRequestMessage?: EventRequestMessage;
  /** The event response message received from the service URI. */
  eventResponseMessage?: EventResponseMessage;
}

export function eventDeserializer(item: any): Event {
  return {
    id: item["id"],
    eventRequestMessage: !item["eventRequestMessage"]
      ? item["eventRequestMessage"]
      : eventRequestMessageDeserializer(item["eventRequestMessage"]),
    eventResponseMessage: !item["eventResponseMessage"]
      ? item["eventResponseMessage"]
      : eventResponseMessageDeserializer(item["eventResponseMessage"]),
  };
}

/** The event request message sent to the service URI. */
export interface EventRequestMessage {
  /** The content of the event request message. */
  content?: EventContent;
  /** The headers of the event request message. */
  headers?: Record<string, string>;
  /** The HTTP method used to send the event request message. */
  method?: string;
  /** The URI used to send the event request message. */
  requestUri?: string;
  /** The HTTP message version. */
  version?: string;
}

export function eventRequestMessageDeserializer(item: any): EventRequestMessage {
  return {
    content: !item["content"] ? item["content"] : eventContentDeserializer(item["content"]),
    headers: item["headers"],
    method: item["method"],
    requestUri: item["requestUri"],
    version: item["version"],
  };
}

/** The content of the event request message. */
export interface EventContent {
  /** The event ID. */
  id?: string;
  /** The time at which the event occurred. */
  timestamp?: Date;
  /** The action that encompasses the provided event. */
  action?: string;
  /** The target of the event. */
  target?: Target;
  /** The request that generated the event. */
  request?: Request;
  /** The agent that initiated the event. For most situations, this could be from the authorization context of the request. */
  actor?: Actor;
  /** The registry node that generated the event. Put differently, while the actor initiates the event, the source generates it. */
  source?: Source;
}

export function eventContentDeserializer(item: any): EventContent {
  return {
    id: item["id"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    action: item["action"],
    target: !item["target"] ? item["target"] : targetDeserializer(item["target"]),
    request: !item["request"] ? item["request"] : requestDeserializer(item["request"]),
    actor: !item["actor"] ? item["actor"] : actorDeserializer(item["actor"]),
    source: !item["source"] ? item["source"] : sourceDeserializer(item["source"]),
  };
}

/** The target of the event. */
export interface Target {
  /** The MIME type of the referenced object. */
  mediaType?: string;
  /** The number of bytes of the content. Same as Length field. */
  size?: number;
  /** The digest of the content, as defined by the Registry V2 HTTP API Specification. */
  digest?: string;
  /** The number of bytes of the content. Same as Size field. */
  length?: number;
  /** The repository name. */
  repository?: string;
  /** The direct URL to the content. */
  url?: string;
  /** The tag name. */
  tag?: string;
  /** The name of the artifact. */
  name?: string;
  /** The version of the artifact. */
  version?: string;
}

export function targetDeserializer(item: any): Target {
  return {
    mediaType: item["mediaType"],
    size: item["size"],
    digest: item["digest"],
    length: item["length"],
    repository: item["repository"],
    url: item["url"],
    tag: item["tag"],
    name: item["name"],
    version: item["version"],
  };
}

/** The request that generated the event. */
export interface Request {
  /** The ID of the request that initiated the event. */
  id?: string;
  /** The IP or hostname and possibly port of the client connection that initiated the event. This is the RemoteAddr from the standard http request. */
  addr?: string;
  /** The externally accessible hostname of the registry instance, as specified by the http host header on incoming requests. */
  host?: string;
  /** The request method that generated the event. */
  method?: string;
  /** The user agent header of the request. */
  useragent?: string;
}

export function requestDeserializer(item: any): Request {
  return {
    id: item["id"],
    addr: item["addr"],
    host: item["host"],
    method: item["method"],
    useragent: item["useragent"],
  };
}

/** The agent that initiated the event. For most situations, this could be from the authorization context of the request. */
export interface Actor {
  /** The subject or username associated with the request context that generated the event. */
  name?: string;
}

export function actorDeserializer(item: any): Actor {
  return {
    name: item["name"],
  };
}

/** The registry node that generated the event. Put differently, while the actor initiates the event, the source generates it. */
export interface Source {
  /** The IP or hostname and the port of the registry node that generated the event. Generally, this will be resolved by os.Hostname() along with the running port. */
  addr?: string;
  /** The running instance of an application. Changes after each restart. */
  instanceID?: string;
}

export function sourceDeserializer(item: any): Source {
  return {
    addr: item["addr"],
    instanceID: item["instanceID"],
  };
}

/** The event response message received from the service URI. */
export interface EventResponseMessage {
  /** The content of the event response message. */
  content?: string;
  /** The headers of the event response message. */
  headers?: Record<string, string>;
  /** The reason phrase of the event response message. */
  reasonPhrase?: string;
  /** The status code of the event response message. */
  statusCode?: string;
  /** The HTTP message version. */
  version?: string;
}

export function eventResponseMessageDeserializer(item: any): EventResponseMessage {
  return {
    content: item["content"],
    headers: item["headers"],
    reasonPhrase: item["reasonPhrase"],
    statusCode: item["statusCode"],
    version: item["version"],
  };
}

/** The configuration of service URI and custom headers for the webhook. */
export interface CallbackConfig {
  /** The service URI for the webhook to post notifications. */
  serviceUri: string;
  /** Custom headers that will be added to the webhook notifications. */
  customHeaders?: Record<string, string>;
}

export function callbackConfigDeserializer(item: any): CallbackConfig {
  return {
    serviceUri: item["serviceUri"],
    customHeaders: item["customHeaders"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01-preview API version. */
  V20250501Preview = "2025-05-01-preview",
}
