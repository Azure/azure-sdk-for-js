// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  /**
   * This property indicates if the operation is an action or a data action
   * ref: https://docs.microsoft.com/en-us/azure/role-based-access-control/role-definitions#management-and-data-operations
   */
  isDataAction?: boolean;
  /** The definition of Azure Monitoring service. */
  serviceSpecification?: OperationServiceSpecificationDefinition;
}

export function operationDefinitionDeserializer(item: any): OperationDefinition {
  return {
    origin: item["origin"],
    name: item["name"],
    display: !item["display"]
      ? item["display"]
      : operationDisplayDefinitionDeserializer(item["display"]),
    ...(!item["properties"]
      ? item["properties"]
      : _operationDefinitionPropertiesDeserializer(item["properties"])),
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

/** An object that represents a container registry. */
export interface Registry extends TrackedResource {
  /** The SKU of the container registry. */
  sku: Sku;
  /** The identity of the container registry. */
  identity?: IdentityProperties;
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
  /** Determines registry role assignment mode. */
  roleAssignmentMode?: RoleAssignmentMode;
}

export function registrySerializer(item: Registry): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "adminUserEnabled",
      "networkRuleSet",
      "policies",
      "encryption",
      "dataEndpointEnabled",
      "publicNetworkAccess",
      "networkRuleBypassOptions",
      "networkRuleBypassAllowedForTasks",
      "zoneRedundancy",
      "anonymousPullEnabled",
      "roleAssignmentMode",
    ])
      ? undefined
      : _registryPropertiesSerializer(item),
    sku: skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function registryDeserializer(item: any): Registry {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _registryPropertiesDeserializer(item["properties"])),
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
    roleAssignmentMode: item["roleAssignmentMode"],
  };
}

/** The provisioning state of the archive at the time the operation was called. */
export enum KnownProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
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
  /** Allow */
  Allow = "Allow",
  /** Deny */
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
  iPAddressOrRange: string;
}

export function ipRuleSerializer(item: IPRule): any {
  return { action: item["action"], value: item["iPAddressOrRange"] };
}

export function ipRuleDeserializer(item: any): IPRule {
  return {
    action: item["action"],
    iPAddressOrRange: item["value"],
  };
}

/** The action of IP ACL rule. */
export enum KnownAction {
  /** Allow */
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
  /** enabled */
  Enabled = "enabled",
  /** disabled */
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
  /** Notary */
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
  /** enabled */
  Enabled = "enabled",
  /** disabled */
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
  /** enabled */
  Enabled = "enabled",
  /** disabled */
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
  /** enabled */
  Enabled = "enabled",
  /** disabled */
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
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of private endpoint connection resource. */
  readonly provisioningState?: ProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
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
  /** Approved */
  Approved = "Approved",
  /** Pending */
  Pending = "Pending",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
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
  /** None */
  None = "None",
  /** Recreate */
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
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
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
  /** AzureServices */
  AzureServices = "AzureServices",
  /** None */
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
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
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

/** Determines registry role assignment mode. */
export enum KnownRoleAssignmentMode {
  /** AbacRepositoryPermissions */
  AbacRepositoryPermissions = "AbacRepositoryPermissions",
  /** LegacyRegistryPermissions */
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
  /** Classic */
  Classic = "Classic",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
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
  /** Classic */
  Classic = "Classic",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
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
  /** The name of the private link resource. */
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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
  /** Determines registry role assignment mode. */
  roleAssignmentMode?: RoleAssignmentMode;
}

export function registryUpdateParametersSerializer(item: RegistryUpdateParameters): any {
  return {
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: areAllPropsUndefined(item, [
      "adminUserEnabled",
      "networkRuleSet",
      "policies",
      "encryption",
      "dataEndpointEnabled",
      "publicNetworkAccess",
      "networkRuleBypassOptions",
      "networkRuleBypassAllowedForTasks",
      "anonymousPullEnabled",
      "roleAssignmentMode",
    ])
      ? undefined
      : _registryUpdateParametersPropertiesSerializer(item),
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
  /** NoForce */
  NoForce = "NoForce",
  /** Force */
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
export interface RegistryUsageListResult {
  /** The list of container registry quota usages. */
  value?: RegistryUsage[];
}

export function registryUsageListResultDeserializer(item: any): RegistryUsageListResult {
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
  /** Count */
  Count = "Count",
  /** Bytes */
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
  /** password1 */
  Password1 = "password1",
  /** password2 */
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
}

export function registryNameCheckRequestSerializer(item: RegistryNameCheckRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The resource type for Container Registry. */
export type ContainerRegistryResourceType = "Microsoft.ContainerRegistry/registries";

/** The result of a request to check the availability of a container registry name. */
export interface RegistryNameStatus {
  /** The value that indicates whether the name is available. */
  nameAvailable?: boolean;
  /** If any, the reason that the name is not available. */
  reason?: string;
  /** If any, the error message that provides more detail for the reason that the name is not available. */
  message?: string;
}

export function registryNameStatusDeserializer(item: any): RegistryNameStatus {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** A private link resource. */
export interface PrivateLinkResource extends Resource {
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

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
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

/** An object that represents a cache rule for a container registry. */
export interface CacheRule extends ProxyResource {
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

export function cacheRuleSerializer(item: CacheRule): any {
  return {
    properties: areAllPropsUndefined(item, [
      "credentialSetResourceId",
      "sourceRepository",
      "targetRepository",
    ])
      ? undefined
      : _cacheRulePropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _cacheRulePropertiesDeserializer(item["properties"])),
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
  /** The ARM resource ID of the credential store which is associated with the Cache rule. */
  credentialSetResourceId?: string;
}

export function cacheRuleUpdateParametersSerializer(item: CacheRuleUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["credentialSetResourceId"])
      ? undefined
      : _cacheRuleUpdateParametersPropertiesSerializer(item),
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

/** An object that represents a credential set resource for a container registry. */
export interface CredentialSet extends ProxyResource {
  /** Identities associated with the resource. This is used to access the KeyVault secrets. */
  identity?: IdentityProperties;
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

export function credentialSetSerializer(item: CredentialSet): any {
  return {
    properties: areAllPropsUndefined(item, ["loginServer", "authCredentials"])
      ? undefined
      : _credentialSetPropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _credentialSetPropertiesDeserializer(item["properties"])),
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
  /** Credential1 */
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
  /** Healthy */
  Healthy = "Healthy",
  /** Unhealthy */
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
  /** Identities associated with the resource. This is used to access the KeyVault secrets. */
  identity?: IdentityProperties;
  /**
   * List of authentication credentials stored for an upstream.
   * Usually consists of a primary and an optional secondary credential.
   */
  authCredentials?: AuthCredential[];
}

export function credentialSetUpdateParametersSerializer(item: CredentialSetUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["authCredentials"])
      ? undefined
      : _credentialSetUpdateParametersPropertiesSerializer(item),
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

/** An object that represents a connected registry for a container registry. */
export interface ConnectedRegistry extends ProxyResource {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The mode of the connected registry resource that indicates the permissions of the registry. */
  mode?: ConnectedRegistryMode;
  /** The current version of ACR runtime on the connected registry. */
  readonly version?: string;
  /** The current connection state of the connected registry. */
  readonly connectionState?: ConnectionState;
  /** The last activity time of the connected registry. */
  readonly lastActivityTime?: Date;
  /** The activation properties of the connected registry. */
  readonly activation?: ActivationProperties;
  /** The parent of the connected registry. */
  parent?: ParentProperties;
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

export function connectedRegistrySerializer(item: ConnectedRegistry): any {
  return {
    properties: areAllPropsUndefined(item, [
      "mode",
      "parent",
      "clientTokenIds",
      "loginServer",
      "logging",
      "notificationsList",
      "garbageCollection",
    ])
      ? undefined
      : _connectedRegistryPropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _connectedRegistryPropertiesDeserializer(item["properties"])),
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
  /** ReadWrite */
  ReadWrite = "ReadWrite",
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** Registry */
  Registry = "Registry",
  /** Mirror */
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
  /** Online */
  Online = "Online",
  /** Offline */
  Offline = "Offline",
  /** Syncing */
  Syncing = "Syncing",
  /** Unhealthy */
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
  /** Active */
  Active = "Active",
  /** Inactive */
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
  return { id: item["id"], syncProperties: syncPropertiesSerializer(item["syncProperties"]) };
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
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
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
  /** LocalDirectory */
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
  /** Debug */
  Debug = "Debug",
  /** Information */
  Information = "Information",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
  /** None */
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
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
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

export function connectedRegistryUpdateParametersSerializer(
  item: ConnectedRegistryUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "syncProperties",
      "logging",
      "clientTokenIds",
      "notificationsList",
      "garbageCollection",
    ])
      ? undefined
      : _connectedRegistryUpdateParametersPropertiesSerializer(item),
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
  /** The provisioning state of the replication at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** The status of the replication at the time the operation was called. */
  readonly status?: Status;
  /** Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications. */
  regionEndpointEnabled?: boolean;
  /** Whether or not zone redundancy is enabled for this container registry replication */
  zoneRedundancy?: ZoneRedundancy;
}

export function replicationSerializer(item: Replication): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["regionEndpointEnabled", "zoneRedundancy"])
      ? undefined
      : _replicationPropertiesSerializer(item),
  };
}

export function replicationDeserializer(item: any): Replication {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _replicationPropertiesDeserializer(item["properties"])),
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
  /** Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications. */
  regionEndpointEnabled?: boolean;
}

export function replicationUpdateParametersSerializer(item: ReplicationUpdateParameters): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["regionEndpointEnabled"])
      ? undefined
      : _replicationUpdateParametersPropertiesSerializer(item),
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
  /** The user friendly description of the scope map. */
  description?: string;
  /** The type of the scope map. E.g. BuildIn scope map. */
  readonly typePropertiesType?: string;
  /** The creation date of scope map. */
  readonly creationDate?: Date;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * The list of scoped permissions for registry artifacts.
   * E.g. repositories/repository-name/content/read,
   * repositories/repository-name/metadata/write
   */
  actions?: string[];
}

export function scopeMapSerializer(item: ScopeMap): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "actions"])
      ? undefined
      : _scopeMapPropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _scopeMapPropertiesDeserializer(item["properties"])),
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
  /** The user friendly description of the scope map. */
  description?: string;
  /**
   * The list of scope permissions for registry artifacts.
   * E.g. repositories/repository-name/pull,
   * repositories/repository-name/delete
   */
  actions?: string[];
}

export function scopeMapUpdateParametersSerializer(item: ScopeMapUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "actions"])
      ? undefined
      : _scopeMapUpdateParametersPropertiesSerializer(item),
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

export function tokenSerializer(item: Token): any {
  return {
    properties: areAllPropsUndefined(item, ["scopeMapId", "credentials", "status"])
      ? undefined
      : _tokenPropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _tokenPropertiesDeserializer(item["properties"])),
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
  /** certificate1 */
  Certificate1 = "certificate1",
  /** certificate2 */
  Certificate2 = "certificate2",
}

/** Type of TokenCertificateName */
export type TokenCertificateName = string;

/** The status of the token example enabled or disabled. */
export enum KnownTokenStatus {
  /** enabled */
  Enabled = "enabled",
  /** disabled */
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
  /** The resource ID of the scope map to which the token will be associated with. */
  scopeMapId?: string;
  /** The status of the token example enabled or disabled. */
  status?: TokenStatus;
  /** The credentials that can be used for authenticating the token. */
  credentials?: TokenCredentialsProperties;
}

export function tokenUpdateParametersSerializer(item: TokenUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["scopeMapId", "status", "credentials"])
      ? undefined
      : _tokenUpdateParametersPropertiesSerializer(item),
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
  /** The status of the webhook at the time the operation was called. */
  status?: WebhookStatus;
  /** The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events. */
  scope?: string;
  /** The list of actions that trigger the webhook to post notifications. */
  actions?: WebhookAction[];
  /** The provisioning state of the webhook at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
}

export function webhookDeserializer(item: any): Webhook {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _webhookPropertiesDeserializer(item["properties"])),
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
  /** enabled */
  Enabled = "enabled",
  /** disabled */
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
  /** push */
  Push = "push",
  /** delete */
  Delete = "delete",
  /** quarantine */
  Quarantine = "quarantine",
  /** chart_push */
  ChartPush = "chart_push",
  /** chart_delete */
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

export function webhookCreateParametersSerializer(item: WebhookCreateParameters): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "serviceUri",
      "customHeaders",
      "status",
      "scope",
      "actions",
    ])
      ? undefined
      : _webhookCreateParametersPropertiesSerializer(item),
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

export function webhookUpdateParametersSerializer(item: WebhookUpdateParameters): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "serviceUri",
      "customHeaders",
      "status",
      "scope",
      "actions",
    ])
      ? undefined
      : _webhookUpdateParametersPropertiesSerializer(item),
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
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(Object.entries(item["headers"]).map(([k, p]: [string, any]) => [k, p])),
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
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(Object.entries(item["headers"]).map(([k, p]: [string, any]) => [k, p])),
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
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : Object.fromEntries(
          Object.entries(item["customHeaders"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01 API version. */
  V20251101 = "2025-11-01",
}

export function _operationDefinitionPropertiesDeserializer(item: any) {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : operationServiceSpecificationDefinitionDeserializer(item["serviceSpecification"]),
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
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

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
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

export function _registryPropertiesSerializer(item: Registry): any {
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
    roleAssignmentMode: item["roleAssignmentMode"],
  };
}

export function _registryPropertiesDeserializer(item: any) {
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
    roleAssignmentMode: item["roleAssignmentMode"],
  };
}

export function _registryUpdateParametersPropertiesSerializer(item: RegistryUpdateParameters): any {
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
    roleAssignmentMode: item["roleAssignmentMode"],
  };
}

export function _cacheRulePropertiesSerializer(item: CacheRule): any {
  return {
    credentialSetResourceId: item["credentialSetResourceId"],
    sourceRepository: item["sourceRepository"],
    targetRepository: item["targetRepository"],
  };
}

export function _cacheRulePropertiesDeserializer(item: any) {
  return {
    credentialSetResourceId: item["credentialSetResourceId"],
    sourceRepository: item["sourceRepository"],
    targetRepository: item["targetRepository"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
  };
}

export function _cacheRuleUpdateParametersPropertiesSerializer(
  item: CacheRuleUpdateParameters,
): any {
  return { credentialSetResourceId: item["credentialSetResourceId"] };
}

export function _credentialSetPropertiesSerializer(item: CredentialSet): any {
  return {
    loginServer: item["loginServer"],
    authCredentials: !item["authCredentials"]
      ? item["authCredentials"]
      : authCredentialArraySerializer(item["authCredentials"]),
  };
}

export function _credentialSetPropertiesDeserializer(item: any) {
  return {
    loginServer: item["loginServer"],
    authCredentials: !item["authCredentials"]
      ? item["authCredentials"]
      : authCredentialArrayDeserializer(item["authCredentials"]),
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
  };
}

export function _credentialSetUpdateParametersPropertiesSerializer(
  item: CredentialSetUpdateParameters,
): any {
  return {
    authCredentials: !item["authCredentials"]
      ? item["authCredentials"]
      : authCredentialArraySerializer(item["authCredentials"]),
  };
}

export function _connectedRegistryPropertiesSerializer(item: ConnectedRegistry): any {
  return {
    mode: item["mode"],
    parent: !item["parent"] ? item["parent"] : parentPropertiesSerializer(item["parent"]),
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

export function _connectedRegistryPropertiesDeserializer(item: any) {
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
    parent: !item["parent"] ? item["parent"] : parentPropertiesDeserializer(item["parent"]),
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

export function _connectedRegistryUpdateParametersPropertiesSerializer(
  item: ConnectedRegistryUpdateParameters,
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

export function _replicationPropertiesSerializer(item: Replication): any {
  return {
    regionEndpointEnabled: item["regionEndpointEnabled"],
    zoneRedundancy: item["zoneRedundancy"],
  };
}

export function _replicationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    regionEndpointEnabled: item["regionEndpointEnabled"],
    zoneRedundancy: item["zoneRedundancy"],
  };
}

export function _replicationUpdateParametersPropertiesSerializer(
  item: ReplicationUpdateParameters,
): any {
  return { regionEndpointEnabled: item["regionEndpointEnabled"] };
}

export function _scopeMapPropertiesSerializer(item: ScopeMap): any {
  return {
    description: item["description"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

export function _scopeMapPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    typePropertiesType: item["type"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    provisioningState: item["provisioningState"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

export function _scopeMapUpdateParametersPropertiesSerializer(item: ScopeMapUpdateParameters): any {
  return {
    description: item["description"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

export function _tokenPropertiesSerializer(item: Token): any {
  return {
    scopeMapId: item["scopeMapId"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : tokenCredentialsPropertiesSerializer(item["credentials"]),
    status: item["status"],
  };
}

export function _tokenPropertiesDeserializer(item: any) {
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

export function _tokenUpdateParametersPropertiesSerializer(item: TokenUpdateParameters): any {
  return {
    scopeMapId: item["scopeMapId"],
    status: item["status"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : tokenCredentialsPropertiesSerializer(item["credentials"]),
  };
}

export function _webhookPropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    scope: item["scope"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _webhookCreateParametersPropertiesSerializer(item: WebhookCreateParameters): any {
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

export function _webhookUpdateParametersPropertiesSerializer(item: WebhookUpdateParameters): any {
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
