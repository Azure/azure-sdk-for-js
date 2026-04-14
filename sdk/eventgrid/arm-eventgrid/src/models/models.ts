// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the List Operations operation */
export interface _OperationsListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationsListResultDeserializer(item: any): _OperationsListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Represents an operation returned by the GetOperations request. */
export interface Operation {
  /** Name of the operation. */
  name?: string;
  /** Display name of the operation. */
  display?: OperationInfo;
  /** Origin of the operation. */
  origin?: string;
  /** This Boolean is used to determine if the operation is a data plane action or not. */
  isDataAction?: boolean;
  /** Properties of the operation. */
  properties?: any;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationInfoDeserializer(item["display"]),
    origin: item["origin"],
    isDataAction: item["isDataAction"],
    properties: item["properties"],
  };
}

/** Information about an operation */
export interface OperationInfo {
  /** Name of the provider */
  provider?: string;
  /** Name of the resource type */
  resource?: string;
  /** Name of the operation */
  operation?: string;
  /** Description of the operation */
  description?: string;
}

export function operationInfoDeserializer(item: any): OperationInfo {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
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

/** The CA Certificate resource. */
export interface CaCertificate extends ProxyResource {
  /** Description for the CA Certificate resource. */
  description?: string;
  /** Base64 encoded PEM (Privacy Enhanced Mail) format certificate data. */
  encodedCertificate?: string;
  /** Certificate issue time in UTC. This is a read-only field. */
  readonly issueTimeInUtc?: Date;
  /** Certificate expiry time in UTC. This is a read-only field. */
  readonly expiryTimeInUtc?: Date;
  /** Provisioning state of the CA Certificate resource. */
  readonly provisioningState?: CaCertificateProvisioningState;
}

export function caCertificateSerializer(item: CaCertificate): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "encodedCertificate"])
      ? undefined
      : _caCertificatePropertiesSerializer(item),
  };
}

export function caCertificateDeserializer(item: any): CaCertificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _caCertificatePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of CA certificate. */
export interface CaCertificateProperties {
  /** Description for the CA Certificate resource. */
  description?: string;
  /** Base64 encoded PEM (Privacy Enhanced Mail) format certificate data. */
  encodedCertificate?: string;
  /** Certificate issue time in UTC. This is a read-only field. */
  readonly issueTimeInUtc?: Date;
  /** Certificate expiry time in UTC. This is a read-only field. */
  readonly expiryTimeInUtc?: Date;
  /** Provisioning state of the CA Certificate resource. */
  readonly provisioningState?: CaCertificateProvisioningState;
}

export function caCertificatePropertiesSerializer(item: CaCertificateProperties): any {
  return { description: item["description"], encodedCertificate: item["encodedCertificate"] };
}

export function caCertificatePropertiesDeserializer(item: any): CaCertificateProperties {
  return {
    description: item["description"],
    encodedCertificate: item["encodedCertificate"],
    issueTimeInUtc: !item["issueTimeInUtc"]
      ? item["issueTimeInUtc"]
      : new Date(item["issueTimeInUtc"]),
    expiryTimeInUtc: !item["expiryTimeInUtc"]
      ? item["expiryTimeInUtc"]
      : new Date(item["expiryTimeInUtc"]),
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the CA Certificate resource. */
export enum KnownCaCertificateProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning state of the CA Certificate resource. \
 * {@link KnownCaCertificateProvisioningState} can be used interchangeably with CaCertificateProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted
 */
export type CaCertificateProvisioningState = string;

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

/** Result of the List CA Certificate operation. */
export interface _CaCertificatesListResult {
  /** The CaCertificate items on this page */
  value: CaCertificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _caCertificatesListResultDeserializer(item: any): _CaCertificatesListResult {
  return {
    value: caCertificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function caCertificateArraySerializer(result: Array<CaCertificate>): any[] {
  return result.map((item) => {
    return caCertificateSerializer(item);
  });
}

export function caCertificateArrayDeserializer(result: Array<CaCertificate>): any[] {
  return result.map((item) => {
    return caCertificateDeserializer(item);
  });
}

/** Namespace resource. */
export interface Namespace extends TrackedResource {
  /** Represents available Sku pricing tiers. */
  sku?: NamespaceSku;
  /** Identity information for the Namespace resource. */
  identity?: IdentityInfo;
  /** List of private endpoint connections. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the namespace resource. */
  readonly provisioningState?: NamespaceProvisioningState;
  /** Topics configuration information for the namespace resource */
  topicsConfiguration?: TopicsConfiguration;
  /** Topic spaces configuration information for the namespace resource */
  topicSpacesConfiguration?: TopicSpacesConfiguration;
  /**
   * This is an optional property and it allows the user to specify if the namespace resource supports zone-redundancy capability or not. If this
   * property is not specified explicitly by the user, its default value depends on the following conditions:
   * a. For Availability Zones enabled regions - The default property value would be true.
   * b. For non-Availability Zones enabled regions - The default property value would be false.
   * Once specified, this property cannot be updated.
   */
  isZoneRedundant?: boolean;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PubSub.NamespaceProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this namespace. Only TLS version 1.2 is supported. */
  minimumTlsVersionAllowed?: TlsVersion;
}

export function namespaceSerializer(item: Namespace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "privateEndpointConnections",
      "topicsConfiguration",
      "topicSpacesConfiguration",
      "isZoneRedundant",
      "publicNetworkAccess",
      "inboundIpRules",
      "minimumTlsVersionAllowed",
    ])
      ? undefined
      : _namespacePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : namespaceSkuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
  };
}

export function namespaceDeserializer(item: any): Namespace {
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
      : _namespacePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : namespaceSkuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityInfoDeserializer(item["identity"]),
  };
}

/** Properties of the namespace resource. */
export interface NamespaceProperties {
  /** List of private endpoint connections. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the namespace resource. */
  readonly provisioningState?: NamespaceProvisioningState;
  /** Topics configuration information for the namespace resource */
  topicsConfiguration?: TopicsConfiguration;
  /** Topic spaces configuration information for the namespace resource */
  topicSpacesConfiguration?: TopicSpacesConfiguration;
  /**
   * This is an optional property and it allows the user to specify if the namespace resource supports zone-redundancy capability or not. If this
   * property is not specified explicitly by the user, its default value depends on the following conditions:
   * a. For Availability Zones enabled regions - The default property value would be true.
   * b. For non-Availability Zones enabled regions - The default property value would be false.
   * Once specified, this property cannot be updated.
   */
  isZoneRedundant?: boolean;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PubSub.NamespaceProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this namespace. Only TLS version 1.2 is supported. */
  minimumTlsVersionAllowed?: TlsVersion;
}

export function namespacePropertiesSerializer(item: NamespaceProperties): any {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    topicsConfiguration: !item["topicsConfiguration"]
      ? item["topicsConfiguration"]
      : topicsConfigurationSerializer(item["topicsConfiguration"]),
    topicSpacesConfiguration: !item["topicSpacesConfiguration"]
      ? item["topicSpacesConfiguration"]
      : topicSpacesConfigurationSerializer(item["topicSpacesConfiguration"]),
    isZoneRedundant: item["isZoneRedundant"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
  };
}

export function namespacePropertiesDeserializer(item: any): NamespaceProperties {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    topicsConfiguration: !item["topicsConfiguration"]
      ? item["topicsConfiguration"]
      : topicsConfigurationDeserializer(item["topicsConfiguration"]),
    topicSpacesConfiguration: !item["topicSpacesConfiguration"]
      ? item["topicSpacesConfiguration"]
      : topicSpacesConfigurationDeserializer(item["topicSpacesConfiguration"]),
    isZoneRedundant: item["isZoneRedundant"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
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

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The Private Endpoint resource for this Connection. */
  privateEndpoint?: PrivateEndpoint;
  /** GroupIds from the private link service resource. */
  groupIds?: string[];
  /** Details about the state of the connection. */
  privateLinkServiceConnectionState?: ConnectionState;
  /** Provisioning state of the Private Endpoint Connection. */
  provisioningState?: ResourceProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, [
      "privateEndpoint",
      "groupIds",
      "privateLinkServiceConnectionState",
      "provisioningState",
    ])
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

/** Properties of the private endpoint connection resource. */
export interface PrivateEndpointConnectionProperties {
  /** The Private Endpoint resource for this Connection. */
  privateEndpoint?: PrivateEndpoint;
  /** GroupIds from the private link service resource. */
  groupIds?: string[];
  /** Details about the state of the connection. */
  privateLinkServiceConnectionState?: ConnectionState;
  /** Provisioning state of the Private Endpoint Connection. */
  provisioningState?: ResourceProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateSerializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** PrivateEndpoint information. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint. */
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

/** ConnectionState information. */
export interface ConnectionState {
  /** Status of the connection. */
  status?: PersistedConnectionStatus;
  /** Description of the connection state. */
  description?: string;
  /** Actions required (if any). */
  actionsRequired?: string;
}

export function connectionStateSerializer(item: ConnectionState): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function connectionStateDeserializer(item: any): ConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Status of the connection. */
export enum KnownPersistedConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Status of the connection. \
 * {@link KnownPersistedConnectionStatus} can be used interchangeably with PersistedConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Disconnected**: Disconnected
 */
export type PersistedConnectionStatus = string;

/** Provisioning state of the Private Endpoint Connection. */
export enum KnownResourceProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the Private Endpoint Connection. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type ResourceProvisioningState = string;

/** Provisioning state of the namespace resource. */
export enum KnownNamespaceProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
  /** DeleteFailed */
  DeleteFailed = "DeleteFailed",
  /** CreateFailed */
  CreateFailed = "CreateFailed",
  /** UpdatedFailed */
  UpdatedFailed = "UpdatedFailed",
}

/**
 * Provisioning state of the namespace resource. \
 * {@link KnownNamespaceProvisioningState} can be used interchangeably with NamespaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted \
 * **DeleteFailed**: DeleteFailed \
 * **CreateFailed**: CreateFailed \
 * **UpdatedFailed**: UpdatedFailed
 */
export type NamespaceProvisioningState = string;

/** Properties of the Topics Configuration. */
export interface TopicsConfiguration {
  /** The hostname for the topics configuration. This is a read-only property. */
  readonly hostname?: string;
  /** List of custom domain configurations for the namespace. */
  customDomains?: CustomDomainConfiguration[];
}

export function topicsConfigurationSerializer(item: TopicsConfiguration): any {
  return {
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainConfigurationArraySerializer(item["customDomains"]),
  };
}

export function topicsConfigurationDeserializer(item: any): TopicsConfiguration {
  return {
    hostname: item["hostname"],
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainConfigurationArrayDeserializer(item["customDomains"]),
  };
}

export function customDomainConfigurationArraySerializer(
  result: Array<CustomDomainConfiguration>,
): any[] {
  return result.map((item) => {
    return customDomainConfigurationSerializer(item);
  });
}

export function customDomainConfigurationArrayDeserializer(
  result: Array<CustomDomainConfiguration>,
): any[] {
  return result.map((item) => {
    return customDomainConfigurationDeserializer(item);
  });
}

/** A custom domain configuration that allows users to publish to their own domain name. */
export interface CustomDomainConfiguration {
  /** Fully Qualified Domain Name (FQDN) for the custom domain. */
  fullyQualifiedDomainName: string;
  /** Validation state for the custom domain. This is a read only property and is initially set to 'Pending' and will be updated to 'Approved' by Event Grid only after ownership of the domain name has been successfully validated. */
  validationState?: CustomDomainValidationState;
  /** Identity info for accessing the certificate for the custom domain. This identity info must match an identity that has been set on the namespace. */
  identity?: CustomDomainIdentity;
  /**
   * The URL for the certificate that is used for publishing to the custom domain. We currently support certificates stored in Azure Key Vault only. While certificate URL can be either
   * versioned URL of the following format https://{key-vault-name}.vault.azure.net/certificates/{certificate-name}/{version-id}, or unversioned URL of the following format (e.g.,
   * https://contosovault.vault.azure.net/certificates/contosocert, we support unversioned certificate URL only (e.g., https://contosovault.vault.azure.net/certificates/contosocert)
   */
  certificateUrl?: string;
  /**
   * Expected DNS TXT record name. Event Grid will check for a TXT record with this name in the DNS record set of the custom domain name to prove ownership over the domain.
   * The values under this TXT record must contain the expected TXT record value.
   */
  expectedTxtRecordName?: string;
  /** Expected DNS TXT record value. Event Grid will check for a TXT record with this value in the DNS record set of the custom domain name to prove ownership over the domain. */
  expectedTxtRecordValue?: string;
}

export function customDomainConfigurationSerializer(item: CustomDomainConfiguration): any {
  return {
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    validationState: item["validationState"],
    identity: !item["identity"]
      ? item["identity"]
      : customDomainIdentitySerializer(item["identity"]),
    certificateUrl: item["certificateUrl"],
    expectedTxtRecordName: item["expectedTxtRecordName"],
    expectedTxtRecordValue: item["expectedTxtRecordValue"],
  };
}

export function customDomainConfigurationDeserializer(item: any): CustomDomainConfiguration {
  return {
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    validationState: item["validationState"],
    identity: !item["identity"]
      ? item["identity"]
      : customDomainIdentityDeserializer(item["identity"]),
    certificateUrl: item["certificateUrl"],
    expectedTxtRecordName: item["expectedTxtRecordName"],
    expectedTxtRecordValue: item["expectedTxtRecordValue"],
  };
}

/** Validation state for the custom domain. This is a read only property and is initially set to 'Pending' and will be updated to 'Approved' by Event Grid only after ownership of the domain name has been successfully validated. */
export enum KnownCustomDomainValidationState {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** ErrorRetrievingDnsRecord */
  ErrorRetrievingDnsRecord = "ErrorRetrievingDnsRecord",
}

/**
 * Validation state for the custom domain. This is a read only property and is initially set to 'Pending' and will be updated to 'Approved' by Event Grid only after ownership of the domain name has been successfully validated. \
 * {@link KnownCustomDomainValidationState} can be used interchangeably with CustomDomainValidationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **ErrorRetrievingDnsRecord**: ErrorRetrievingDnsRecord
 */
export type CustomDomainValidationState = string;

/** The identity information for retrieving the certificate for the custom domain. */
export interface CustomDomainIdentity {
  /** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
  type?: CustomDomainIdentityType;
  /** The user identity associated with the resource. */
  userAssignedIdentity?: string;
}

export function customDomainIdentitySerializer(item: CustomDomainIdentity): any {
  return { type: item["type"], userAssignedIdentity: item["userAssignedIdentity"] };
}

export function customDomainIdentityDeserializer(item: any): CustomDomainIdentity {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
export enum KnownCustomDomainIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. \
 * {@link KnownCustomDomainIdentityType} can be used interchangeably with CustomDomainIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type CustomDomainIdentityType = string;

/** Properties of the Topic Spaces Configuration. */
export interface TopicSpacesConfiguration {
  /** Indicate if Topic Spaces Configuration is enabled for the namespace. Default is Disabled. */
  state?: TopicSpacesConfigurationState;
  /**
   * Fully qualified Azure Resource Id for the Event Grid Topic to which events will be routed to from TopicSpaces under a namespace.
   * This property should be in the following format '/subscriptions/{subId}/resourcegroups/{resourceGroupName}/providers/microsoft.EventGrid/topics/{topicName}'.
   * This topic should reside in the same region where namespace is located.
   */
  routeTopicResourceId?: string;
  /** The endpoint for the topic spaces configuration. This is a read-only property. */
  readonly hostname?: string;
  /** Routing enrichments for topic spaces configuration */
  routingEnrichments?: RoutingEnrichments;
  /** Client authentication settings for topic spaces configuration. */
  clientAuthentication?: ClientAuthenticationSettings;
  /**
   * The maximum session expiry in hours. The property default value is 1 hour.
   * Min allowed value is 1 hour and max allowed value is 8 hours.
   */
  maximumSessionExpiryInHours?: number;
  /**
   * The maximum number of sessions per authentication name. The property default value is 1.
   * Min allowed value is 1 and max allowed value is 100.
   */
  maximumClientSessionsPerAuthenticationName?: number;
  /** Routing identity info for topic spaces configuration. */
  routingIdentityInfo?: RoutingIdentityInfo;
  /** List of custom domain configurations for the namespace. */
  customDomains?: CustomDomainConfiguration[];
}

export function topicSpacesConfigurationSerializer(item: TopicSpacesConfiguration): any {
  return {
    state: item["state"],
    routeTopicResourceId: item["routeTopicResourceId"],
    routingEnrichments: !item["routingEnrichments"]
      ? item["routingEnrichments"]
      : routingEnrichmentsSerializer(item["routingEnrichments"]),
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : clientAuthenticationSettingsSerializer(item["clientAuthentication"]),
    maximumSessionExpiryInHours: item["maximumSessionExpiryInHours"],
    maximumClientSessionsPerAuthenticationName: item["maximumClientSessionsPerAuthenticationName"],
    routingIdentityInfo: !item["routingIdentityInfo"]
      ? item["routingIdentityInfo"]
      : routingIdentityInfoSerializer(item["routingIdentityInfo"]),
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainConfigurationArraySerializer(item["customDomains"]),
  };
}

export function topicSpacesConfigurationDeserializer(item: any): TopicSpacesConfiguration {
  return {
    state: item["state"],
    routeTopicResourceId: item["routeTopicResourceId"],
    hostname: item["hostname"],
    routingEnrichments: !item["routingEnrichments"]
      ? item["routingEnrichments"]
      : routingEnrichmentsDeserializer(item["routingEnrichments"]),
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : clientAuthenticationSettingsDeserializer(item["clientAuthentication"]),
    maximumSessionExpiryInHours: item["maximumSessionExpiryInHours"],
    maximumClientSessionsPerAuthenticationName: item["maximumClientSessionsPerAuthenticationName"],
    routingIdentityInfo: !item["routingIdentityInfo"]
      ? item["routingIdentityInfo"]
      : routingIdentityInfoDeserializer(item["routingIdentityInfo"]),
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainConfigurationArrayDeserializer(item["customDomains"]),
  };
}

/** Indicate if Topic Spaces Configuration is enabled for the namespace. Default is Disabled. */
export enum KnownTopicSpacesConfigurationState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Indicate if Topic Spaces Configuration is enabled for the namespace. Default is Disabled. \
 * {@link KnownTopicSpacesConfigurationState} can be used interchangeably with TopicSpacesConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type TopicSpacesConfigurationState = string;

/** model interface RoutingEnrichments */
export interface RoutingEnrichments {
  static?: StaticRoutingEnrichmentUnion[];
  dynamic?: DynamicRoutingEnrichment[];
}

export function routingEnrichmentsSerializer(item: RoutingEnrichments): any {
  return {
    static: !item["static"]
      ? item["static"]
      : staticRoutingEnrichmentUnionArraySerializer(item["static"]),
    dynamic: !item["dynamic"]
      ? item["dynamic"]
      : dynamicRoutingEnrichmentArraySerializer(item["dynamic"]),
  };
}

export function routingEnrichmentsDeserializer(item: any): RoutingEnrichments {
  return {
    static: !item["static"]
      ? item["static"]
      : staticRoutingEnrichmentUnionArrayDeserializer(item["static"]),
    dynamic: !item["dynamic"]
      ? item["dynamic"]
      : dynamicRoutingEnrichmentArrayDeserializer(item["dynamic"]),
  };
}

export function staticRoutingEnrichmentUnionArraySerializer(
  result: Array<StaticRoutingEnrichmentUnion>,
): any[] {
  return result.map((item) => {
    return staticRoutingEnrichmentUnionSerializer(item);
  });
}

export function staticRoutingEnrichmentUnionArrayDeserializer(
  result: Array<StaticRoutingEnrichmentUnion>,
): any[] {
  return result.map((item) => {
    return staticRoutingEnrichmentUnionDeserializer(item);
  });
}

/** Static routing enrichment details. */
export interface StaticRoutingEnrichment {
  /** Static routing enrichment key. */
  key?: string;
  /** Static routing enrichment value type. For e.g. this property value can be 'String'. */
  /** The discriminator possible values: String */
  valueType: StaticRoutingEnrichmentType;
}

export function staticRoutingEnrichmentSerializer(item: StaticRoutingEnrichment): any {
  return { key: item["key"], valueType: item["valueType"] };
}

export function staticRoutingEnrichmentDeserializer(item: any): StaticRoutingEnrichment {
  return {
    key: item["key"],
    valueType: item["valueType"],
  };
}

/** Alias for StaticRoutingEnrichmentUnion */
export type StaticRoutingEnrichmentUnion = StaticStringRoutingEnrichment | StaticRoutingEnrichment;

export function staticRoutingEnrichmentUnionSerializer(item: StaticRoutingEnrichmentUnion): any {
  switch (item.valueType) {
    case "String":
      return staticStringRoutingEnrichmentSerializer(item as StaticStringRoutingEnrichment);

    default:
      return staticRoutingEnrichmentSerializer(item);
  }
}

export function staticRoutingEnrichmentUnionDeserializer(item: any): StaticRoutingEnrichmentUnion {
  switch (item["valueType"]) {
    case "String":
      return staticStringRoutingEnrichmentDeserializer(item as StaticStringRoutingEnrichment);

    default:
      return staticRoutingEnrichmentDeserializer(item);
  }
}

/** Static routing enrichment value type. For e.g. this property value can be 'String'. */
export enum KnownStaticRoutingEnrichmentType {
  /** String */
  String = "String",
}

/**
 * Static routing enrichment value type. For e.g. this property value can be 'String'. \
 * {@link KnownStaticRoutingEnrichmentType} can be used interchangeably with StaticRoutingEnrichmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String
 */
export type StaticRoutingEnrichmentType = string;

/** model interface StaticStringRoutingEnrichment */
export interface StaticStringRoutingEnrichment extends StaticRoutingEnrichment {
  /** String type routing enrichment value. */
  value?: string;
  /** Static routing enrichment value type. For e.g. this property value can be 'String'. */
  valueType: "String";
}

export function staticStringRoutingEnrichmentSerializer(item: StaticStringRoutingEnrichment): any {
  return { key: item["key"], valueType: item["valueType"], value: item["value"] };
}

export function staticStringRoutingEnrichmentDeserializer(
  item: any,
): StaticStringRoutingEnrichment {
  return {
    key: item["key"],
    valueType: item["valueType"],
    value: item["value"],
  };
}

export function dynamicRoutingEnrichmentArraySerializer(
  result: Array<DynamicRoutingEnrichment>,
): any[] {
  return result.map((item) => {
    return dynamicRoutingEnrichmentSerializer(item);
  });
}

export function dynamicRoutingEnrichmentArrayDeserializer(
  result: Array<DynamicRoutingEnrichment>,
): any[] {
  return result.map((item) => {
    return dynamicRoutingEnrichmentDeserializer(item);
  });
}

/** model interface DynamicRoutingEnrichment */
export interface DynamicRoutingEnrichment {
  /** Dynamic routing enrichment key. */
  key?: string;
  /** Dynamic routing enrichment value. */
  value?: string;
}

export function dynamicRoutingEnrichmentSerializer(item: DynamicRoutingEnrichment): any {
  return { key: item["key"], value: item["value"] };
}

export function dynamicRoutingEnrichmentDeserializer(item: any): DynamicRoutingEnrichment {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** Client authentication settings for namespace resource. */
export interface ClientAuthenticationSettings {
  /** Alternative authentication name sources related to client authentication settings for namespace resource. */
  alternativeAuthenticationNameSources?: AlternativeAuthenticationNameSource[];
  /** Custom JWT authentication settings for namespace resource. */
  customJwtAuthentication?: CustomJwtAuthenticationSettings;
  /** Authentication settings for a webhook endpoint within a Namespace resource. */
  webhookAuthentication?: WebhookAuthenticationSettings;
}

export function clientAuthenticationSettingsSerializer(item: ClientAuthenticationSettings): any {
  return {
    alternativeAuthenticationNameSources: !item["alternativeAuthenticationNameSources"]
      ? item["alternativeAuthenticationNameSources"]
      : item["alternativeAuthenticationNameSources"].map((p: any) => {
          return p;
        }),
    customJwtAuthentication: !item["customJwtAuthentication"]
      ? item["customJwtAuthentication"]
      : customJwtAuthenticationSettingsSerializer(item["customJwtAuthentication"]),
    webhookAuthentication: !item["webhookAuthentication"]
      ? item["webhookAuthentication"]
      : webhookAuthenticationSettingsSerializer(item["webhookAuthentication"]),
  };
}

export function clientAuthenticationSettingsDeserializer(item: any): ClientAuthenticationSettings {
  return {
    alternativeAuthenticationNameSources: !item["alternativeAuthenticationNameSources"]
      ? item["alternativeAuthenticationNameSources"]
      : item["alternativeAuthenticationNameSources"].map((p: any) => {
          return p;
        }),
    customJwtAuthentication: !item["customJwtAuthentication"]
      ? item["customJwtAuthentication"]
      : customJwtAuthenticationSettingsDeserializer(item["customJwtAuthentication"]),
    webhookAuthentication: !item["webhookAuthentication"]
      ? item["webhookAuthentication"]
      : webhookAuthenticationSettingsDeserializer(item["webhookAuthentication"]),
  };
}

/** Alternative authentication name sources related to client authentication settings for namespace resource. */
export enum KnownAlternativeAuthenticationNameSource {
  /** ClientCertificateSubject */
  ClientCertificateSubject = "ClientCertificateSubject",
  /** ClientCertificateDns */
  ClientCertificateDns = "ClientCertificateDns",
  /** ClientCertificateUri */
  ClientCertificateUri = "ClientCertificateUri",
  /** ClientCertificateIp */
  ClientCertificateIp = "ClientCertificateIp",
  /** ClientCertificateEmail */
  ClientCertificateEmail = "ClientCertificateEmail",
}

/**
 * Alternative authentication name sources related to client authentication settings for namespace resource. \
 * {@link KnownAlternativeAuthenticationNameSource} can be used interchangeably with AlternativeAuthenticationNameSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClientCertificateSubject**: ClientCertificateSubject \
 * **ClientCertificateDns**: ClientCertificateDns \
 * **ClientCertificateUri**: ClientCertificateUri \
 * **ClientCertificateIp**: ClientCertificateIp \
 * **ClientCertificateEmail**: ClientCertificateEmail
 */
export type AlternativeAuthenticationNameSource = string;

/** Custom JWT authentication settings for namespace resource. */
export interface CustomJwtAuthenticationSettings {
  /** Expected JWT token issuer. */
  tokenIssuer?: string;
  /** Information about the certificates that are used for token validation. We currently support maximum 2 certificates. */
  issuerCertificates?: IssuerCertificateInfo[];
  /** Information about the encoded public certificates that are used for custom authentication. */
  encodedIssuerCertificates?: EncodedIssuerCertificateInfo[];
}

export function customJwtAuthenticationSettingsSerializer(
  item: CustomJwtAuthenticationSettings,
): any {
  return {
    tokenIssuer: item["tokenIssuer"],
    issuerCertificates: !item["issuerCertificates"]
      ? item["issuerCertificates"]
      : issuerCertificateInfoArraySerializer(item["issuerCertificates"]),
    encodedIssuerCertificates: !item["encodedIssuerCertificates"]
      ? item["encodedIssuerCertificates"]
      : encodedIssuerCertificateInfoArraySerializer(item["encodedIssuerCertificates"]),
  };
}

export function customJwtAuthenticationSettingsDeserializer(
  item: any,
): CustomJwtAuthenticationSettings {
  return {
    tokenIssuer: item["tokenIssuer"],
    issuerCertificates: !item["issuerCertificates"]
      ? item["issuerCertificates"]
      : issuerCertificateInfoArrayDeserializer(item["issuerCertificates"]),
    encodedIssuerCertificates: !item["encodedIssuerCertificates"]
      ? item["encodedIssuerCertificates"]
      : encodedIssuerCertificateInfoArrayDeserializer(item["encodedIssuerCertificates"]),
  };
}

export function issuerCertificateInfoArraySerializer(result: Array<IssuerCertificateInfo>): any[] {
  return result.map((item) => {
    return issuerCertificateInfoSerializer(item);
  });
}

export function issuerCertificateInfoArrayDeserializer(
  result: Array<IssuerCertificateInfo>,
): any[] {
  return result.map((item) => {
    return issuerCertificateInfoDeserializer(item);
  });
}

/** Information about the certificate that is used for token validation. */
export interface IssuerCertificateInfo {
  /** Keyvault certificate URL in https://keyvaultname.vault.azure.net/certificates/certificateName/certificateVersion format. */
  certificateUrl: string;
  /** The identity that will be used to access the certificate. */
  identity?: CustomJwtAuthenticationManagedIdentity;
}

export function issuerCertificateInfoSerializer(item: IssuerCertificateInfo): any {
  return {
    certificateUrl: item["certificateUrl"],
    identity: !item["identity"]
      ? item["identity"]
      : customJwtAuthenticationManagedIdentitySerializer(item["identity"]),
  };
}

export function issuerCertificateInfoDeserializer(item: any): IssuerCertificateInfo {
  return {
    certificateUrl: item["certificateUrl"],
    identity: !item["identity"]
      ? item["identity"]
      : customJwtAuthenticationManagedIdentityDeserializer(item["identity"]),
  };
}

/** The identity information for retrieving the certificate for custom JWT authentication. */
export interface CustomJwtAuthenticationManagedIdentity {
  /** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
  type: CustomJwtAuthenticationManagedIdentityType;
  /** The user identity associated with the resource. */
  userAssignedIdentity?: string;
}

export function customJwtAuthenticationManagedIdentitySerializer(
  item: CustomJwtAuthenticationManagedIdentity,
): any {
  return { type: item["type"], userAssignedIdentity: item["userAssignedIdentity"] };
}

export function customJwtAuthenticationManagedIdentityDeserializer(
  item: any,
): CustomJwtAuthenticationManagedIdentity {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
export enum KnownCustomJwtAuthenticationManagedIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. \
 * {@link KnownCustomJwtAuthenticationManagedIdentityType} can be used interchangeably with CustomJwtAuthenticationManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type CustomJwtAuthenticationManagedIdentityType = string;

export function encodedIssuerCertificateInfoArraySerializer(
  result: Array<EncodedIssuerCertificateInfo>,
): any[] {
  return result.map((item) => {
    return encodedIssuerCertificateInfoSerializer(item);
  });
}

export function encodedIssuerCertificateInfoArrayDeserializer(
  result: Array<EncodedIssuerCertificateInfo>,
): any[] {
  return result.map((item) => {
    return encodedIssuerCertificateInfoDeserializer(item);
  });
}

/** Information about the public certificate that is used for custom authentication. */
export interface EncodedIssuerCertificateInfo {
  /** Identifier for the certificate. */
  kid: string;
  /** Certificate in pem format. */
  encodedCertificate: string;
}

export function encodedIssuerCertificateInfoSerializer(item: EncodedIssuerCertificateInfo): any {
  return { kid: item["kid"], encodedCertificate: item["encodedCertificate"] };
}

export function encodedIssuerCertificateInfoDeserializer(item: any): EncodedIssuerCertificateInfo {
  return {
    kid: item["kid"],
    encodedCertificate: item["encodedCertificate"],
  };
}

/** Authentication settings for a webhook endpoint within a Namespace resource. */
export interface WebhookAuthenticationSettings {
  /** The identity configuration required for authenticating a custom webhook. */
  identity: CustomWebhookAuthenticationManagedIdentity;
  /** The URL endpoint where the Event Grid service sends authenticated webhook requests using the specified managed identity. */
  endpointUrl: string;
  /** The base URL endpoint where the Event Grid service sends authenticated webhook requests using the specified managed identity. */
  endpointBaseUrl?: string;
  /** Microsoft Entra ID Application ID or URI to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryApplicationIdOrUri: string;
  /** Microsoft Entra ID Tenant ID to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryTenantId: string;
}

export function webhookAuthenticationSettingsSerializer(item: WebhookAuthenticationSettings): any {
  return {
    identity: customWebhookAuthenticationManagedIdentitySerializer(item["identity"]),
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
  };
}

export function webhookAuthenticationSettingsDeserializer(
  item: any,
): WebhookAuthenticationSettings {
  return {
    identity: customWebhookAuthenticationManagedIdentityDeserializer(item["identity"]),
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
  };
}

/** The identity configuration required for authenticating a custom webhook. */
export interface CustomWebhookAuthenticationManagedIdentity {
  /** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
  type: CustomWebhookAuthenticationManagedIdentityType;
  /** The user identity associated with the resource. */
  userAssignedIdentity?: string;
}

export function customWebhookAuthenticationManagedIdentitySerializer(
  item: CustomWebhookAuthenticationManagedIdentity,
): any {
  return { type: item["type"], userAssignedIdentity: item["userAssignedIdentity"] };
}

export function customWebhookAuthenticationManagedIdentityDeserializer(
  item: any,
): CustomWebhookAuthenticationManagedIdentity {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
export enum KnownCustomWebhookAuthenticationManagedIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. \
 * {@link KnownCustomWebhookAuthenticationManagedIdentityType} can be used interchangeably with CustomWebhookAuthenticationManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type CustomWebhookAuthenticationManagedIdentityType = string;

/** Routing identity info for topic spaces configuration. */
export interface RoutingIdentityInfo {
  /** Routing identity type for topic spaces configuration. */
  type?: RoutingIdentityType;
  userAssignedIdentity?: string;
}

export function routingIdentityInfoSerializer(item: RoutingIdentityInfo): any {
  return { type: item["type"], userAssignedIdentity: item["userAssignedIdentity"] };
}

export function routingIdentityInfoDeserializer(item: any): RoutingIdentityInfo {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Routing identity type for topic spaces configuration. */
export enum KnownRoutingIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Routing identity type for topic spaces configuration. \
 * {@link KnownRoutingIdentityType} can be used interchangeably with RoutingIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type RoutingIdentityType = string;

/**
 * This determines if traffic is allowed over public network. By default it is enabled.
 * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.DomainProperties.InboundIpRules" />
 */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * This determines if traffic is allowed over public network. By default it is enabled.
 * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.DomainProperties.InboundIpRules" /> \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **SecuredByPerimeter**: SecuredByPerimeter
 */
export type PublicNetworkAccess = string;

export function inboundIpRuleArraySerializer(result: Array<InboundIpRule>): any[] {
  return result.map((item) => {
    return inboundIpRuleSerializer(item);
  });
}

export function inboundIpRuleArrayDeserializer(result: Array<InboundIpRule>): any[] {
  return result.map((item) => {
    return inboundIpRuleDeserializer(item);
  });
}

/** model interface InboundIpRule */
export interface InboundIpRule {
  /** IP Address in CIDR notation e.g., 10.0.0.0/8. */
  ipMask?: string;
  /** Action to perform based on the match or no match of the IpMask. */
  action?: IpActionType;
}

export function inboundIpRuleSerializer(item: InboundIpRule): any {
  return { ipMask: item["ipMask"], action: item["action"] };
}

export function inboundIpRuleDeserializer(item: any): InboundIpRule {
  return {
    ipMask: item["ipMask"],
    action: item["action"],
  };
}

/** Action to perform based on the match or no match of the IpMask. */
export enum KnownIpActionType {
  /** Allow */
  Allow = "Allow",
}

/**
 * Action to perform based on the match or no match of the IpMask. \
 * {@link KnownIpActionType} can be used interchangeably with IpActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow
 */
export type IpActionType = string;

/** Minimum TLS version of the publisher allowed to publish to this domain */
export enum KnownTlsVersion {
  /** 1.0 */
  One0 = "1.0",
  /** 1.1 */
  One1 = "1.1",
  /** 1.2 */
  One2 = "1.2",
}

/**
 * Minimum TLS version of the publisher allowed to publish to this domain \
 * {@link KnownTlsVersion} can be used interchangeably with TlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1.0**: 1.0 \
 * **1.1**: 1.1 \
 * **1.2**: 1.2
 */
export type TlsVersion = string;

/** Represents available Sku pricing tiers. */
export interface NamespaceSku {
  /** The name of the SKU. */
  name?: SkuName;
  /**
   * Specifies the number of Throughput Units that defines the capacity for the namespace. The property default value is
   * 1 which signifies 1 Throughput Unit = 1MB/s ingress and 2MB/s egress per namespace. Min capacity is 1 and
   * max allowed capacity is 20.
   */
  capacity?: number;
}

export function namespaceSkuSerializer(item: NamespaceSku): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function namespaceSkuDeserializer(item: any): NamespaceSku {
  return {
    name: item["name"],
    capacity: item["capacity"],
  };
}

/** The name of the SKU. */
export enum KnownSkuName {
  /** Standard */
  Standard = "Standard",
}

/**
 * The name of the SKU. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard
 */
export type SkuName = string;

/** The identity information for the resource. */
export interface IdentityInfo {
  /** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identity. */
  type?: IdentityType;
  /** The principal ID of resource identity. */
  principalId?: string;
  /** The tenant ID of resource. */
  tenantId?: string;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   * This property is currently not used and reserved for future usage.
   */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

export function identityInfoSerializer(item: IdentityInfo): any {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityInfoDeserializer(item: any): IdentityInfo {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identity. */
export enum KnownIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned, UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identity. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned \
 * **SystemAssigned, UserAssigned**: SystemAssigned, UserAssigned
 */
export type IdentityType = string;

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

/** The information about the user identity. */
export interface UserIdentityProperties {
  /** The principal id of user assigned identity. */
  principalId?: string;
  /** The client id of user assigned identity. */
  clientId?: string;
}

export function userIdentityPropertiesSerializer(item: UserIdentityProperties): any {
  return { principalId: item["principalId"], clientId: item["clientId"] };
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Properties to update namespace. */
export interface NamespaceUpdateParameters {
  /** Tags of the namespace resource. */
  tags?: Record<string, string>;
  /** Namespace resource identity information. */
  identity?: IdentityInfo;
  /** Represents available Sku pricing tiers. */
  sku?: NamespaceSku;
  /** Topic spaces configuration properties that can be updated. */
  topicSpacesConfiguration?: UpdateTopicSpacesConfigurationInfo;
  /** Topics configuration properties that can be updated. */
  topicsConfiguration?: UpdateTopicsConfigurationInfo;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PubSub.NamespaceUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
}

export function namespaceUpdateParametersSerializer(item: NamespaceUpdateParameters): any {
  return {
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : namespaceSkuSerializer(item["sku"]),
    properties: areAllPropsUndefined(item, [
      "topicSpacesConfiguration",
      "topicsConfiguration",
      "publicNetworkAccess",
      "inboundIpRules",
    ])
      ? undefined
      : _namespaceUpdateParametersPropertiesSerializer(item),
  };
}

/** Information of namespace update parameter properties. */
export interface NamespaceUpdateParameterProperties {
  /** Topic spaces configuration properties that can be updated. */
  topicSpacesConfiguration?: UpdateTopicSpacesConfigurationInfo;
  /** Topics configuration properties that can be updated. */
  topicsConfiguration?: UpdateTopicsConfigurationInfo;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PubSub.NamespaceUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
}

export function namespaceUpdateParameterPropertiesSerializer(
  item: NamespaceUpdateParameterProperties,
): any {
  return {
    topicSpacesConfiguration: !item["topicSpacesConfiguration"]
      ? item["topicSpacesConfiguration"]
      : updateTopicSpacesConfigurationInfoSerializer(item["topicSpacesConfiguration"]),
    topicsConfiguration: !item["topicsConfiguration"]
      ? item["topicsConfiguration"]
      : updateTopicsConfigurationInfoSerializer(item["topicsConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
  };
}

/** Properties of the topic spaces configuration info of a namespace. */
export interface UpdateTopicSpacesConfigurationInfo {
  /** Indicate if Topic Spaces Configuration is enabled for the namespace. Default is Disabled. */
  state?: TopicSpacesConfigurationState;
  /** This property is used to specify custom topic to which events will be routed to from topic spaces configuration under namespace. */
  routeTopicResourceId?: string;
  /** Routing enrichments for topic spaces configuration. */
  routingEnrichments?: RoutingEnrichments;
  /** Client authentication settings for topic spaces configuration. */
  clientAuthentication?: ClientAuthenticationSettings;
  /**
   * The maximum session expiry in hours. The property default value is 1 hour.
   * Min allowed value is 1 hour and max allowed value is 8 hours.
   */
  maximumSessionExpiryInHours?: number;
  /**
   * The maximum number of sessions per authentication name. The property default value is 1.
   * Min allowed value is 1 and max allowed value is 100.
   */
  maximumClientSessionsPerAuthenticationName?: number;
  /** Routing identity info for topic spaces configuration. */
  routingIdentityInfo?: RoutingIdentityInfo;
  /** Custom domain info for topic spaces configuration. */
  customDomains?: CustomDomainConfiguration[];
}

export function updateTopicSpacesConfigurationInfoSerializer(
  item: UpdateTopicSpacesConfigurationInfo,
): any {
  return {
    state: item["state"],
    routeTopicResourceId: item["routeTopicResourceId"],
    routingEnrichments: !item["routingEnrichments"]
      ? item["routingEnrichments"]
      : routingEnrichmentsSerializer(item["routingEnrichments"]),
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : clientAuthenticationSettingsSerializer(item["clientAuthentication"]),
    maximumSessionExpiryInHours: item["maximumSessionExpiryInHours"],
    maximumClientSessionsPerAuthenticationName: item["maximumClientSessionsPerAuthenticationName"],
    routingIdentityInfo: !item["routingIdentityInfo"]
      ? item["routingIdentityInfo"]
      : routingIdentityInfoSerializer(item["routingIdentityInfo"]),
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainConfigurationArraySerializer(item["customDomains"]),
  };
}

/** Properties of the topics configuration info of a namespace. */
export interface UpdateTopicsConfigurationInfo {
  /** Custom domain info for topics configuration. */
  customDomains?: CustomDomainConfiguration[];
}

export function updateTopicsConfigurationInfoSerializer(item: UpdateTopicsConfigurationInfo): any {
  return {
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainConfigurationArraySerializer(item["customDomains"]),
  };
}

/** Result of the List Namespaces operation. */
export interface _NamespacesListResult {
  /** The Namespace items on this page */
  value: Namespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespacesListResultDeserializer(item: any): _NamespacesListResult {
  return {
    value: namespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceArraySerializer(result: Array<Namespace>): any[] {
  return result.map((item) => {
    return namespaceSerializer(item);
  });
}

export function namespaceArrayDeserializer(result: Array<Namespace>): any[] {
  return result.map((item) => {
    return namespaceDeserializer(item);
  });
}

/** Shared access keys of the Namespace. */
export interface NamespaceSharedAccessKeys {
  /** Shared access key1 for the namespace. */
  key1?: string;
  /** Shared access key2 for the namespace. */
  key2?: string;
}

export function namespaceSharedAccessKeysDeserializer(item: any): NamespaceSharedAccessKeys {
  return {
    key1: item["key1"],
    key2: item["key2"],
  };
}

/** Namespace regenerate share access key request. */
export interface NamespaceRegenerateKeyRequest {
  /** Key name to regenerate key1 or key2. */
  keyName: string;
}

export function namespaceRegenerateKeyRequestSerializer(item: NamespaceRegenerateKeyRequest): any {
  return { keyName: item["keyName"] };
}

/** Namespace custom domain ownership validation result. */
export interface CustomDomainOwnershipValidationResult {
  /** List of custom domain configurations for the namespace under topics configuration. */
  customDomainsForTopicsConfiguration?: CustomDomainConfiguration[];
  /** List of custom domain configurations for the namespace under topic spaces configuration. */
  customDomainsForTopicSpacesConfiguration?: CustomDomainConfiguration[];
}

export function customDomainOwnershipValidationResultDeserializer(
  item: any,
): CustomDomainOwnershipValidationResult {
  return {
    customDomainsForTopicsConfiguration: !item["customDomainsForTopicsConfiguration"]
      ? item["customDomainsForTopicsConfiguration"]
      : customDomainConfigurationArrayDeserializer(item["customDomainsForTopicsConfiguration"]),
    customDomainsForTopicSpacesConfiguration: !item["customDomainsForTopicSpacesConfiguration"]
      ? item["customDomainsForTopicSpacesConfiguration"]
      : customDomainConfigurationArrayDeserializer(
          item["customDomainsForTopicSpacesConfiguration"],
        ),
  };
}

/** Channel info. */
export interface Channel extends ProxyResource {
  /** The type of the event channel which represents the direction flow of events. */
  channelType?: ChannelType;
  /** This property should be populated when channelType is PartnerTopic and represents information about the partner topic resource corresponding to the channel. */
  partnerTopicInfo?: PartnerTopicInfo;
  /** This property should be populated when channelType is PartnerDestination and represents information about the partner destination resource corresponding to the channel. */
  partnerDestinationInfo?: PartnerDestinationInfoUnion;
  /** Context or helpful message that can be used during the approval process by the subscriber. */
  messageForActivation?: string;
  /** Provisioning state of the channel. */
  provisioningState?: ChannelProvisioningState;
  /** The readiness state of the corresponding partner topic. */
  readinessState?: ReadinessState;
  /**
   * Expiration time of the channel. If this timer expires while the corresponding partner topic is never activated,
   * the channel and corresponding partner topic are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
}

export function channelSerializer(item: Channel): any {
  return {
    properties: areAllPropsUndefined(item, [
      "channelType",
      "partnerTopicInfo",
      "partnerDestinationInfo",
      "messageForActivation",
      "provisioningState",
      "readinessState",
      "expirationTimeIfNotActivatedUtc",
    ])
      ? undefined
      : _channelPropertiesSerializer(item),
  };
}

export function channelDeserializer(item: any): Channel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _channelPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the Channel. */
export interface ChannelProperties {
  /** The type of the event channel which represents the direction flow of events. */
  channelType?: ChannelType;
  /** This property should be populated when channelType is PartnerTopic and represents information about the partner topic resource corresponding to the channel. */
  partnerTopicInfo?: PartnerTopicInfo;
  /** This property should be populated when channelType is PartnerDestination and represents information about the partner destination resource corresponding to the channel. */
  partnerDestinationInfo?: PartnerDestinationInfoUnion;
  /** Context or helpful message that can be used during the approval process by the subscriber. */
  messageForActivation?: string;
  /** Provisioning state of the channel. */
  provisioningState?: ChannelProvisioningState;
  /** The readiness state of the corresponding partner topic. */
  readinessState?: ReadinessState;
  /**
   * Expiration time of the channel. If this timer expires while the corresponding partner topic is never activated,
   * the channel and corresponding partner topic are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
}

export function channelPropertiesSerializer(item: ChannelProperties): any {
  return {
    channelType: item["channelType"],
    partnerTopicInfo: !item["partnerTopicInfo"]
      ? item["partnerTopicInfo"]
      : partnerTopicInfoSerializer(item["partnerTopicInfo"]),
    partnerDestinationInfo: !item["partnerDestinationInfo"]
      ? item["partnerDestinationInfo"]
      : partnerDestinationInfoUnionSerializer(item["partnerDestinationInfo"]),
    messageForActivation: item["messageForActivation"],
    provisioningState: item["provisioningState"],
    readinessState: item["readinessState"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
  };
}

export function channelPropertiesDeserializer(item: any): ChannelProperties {
  return {
    channelType: item["channelType"],
    partnerTopicInfo: !item["partnerTopicInfo"]
      ? item["partnerTopicInfo"]
      : partnerTopicInfoDeserializer(item["partnerTopicInfo"]),
    partnerDestinationInfo: !item["partnerDestinationInfo"]
      ? item["partnerDestinationInfo"]
      : partnerDestinationInfoUnionDeserializer(item["partnerDestinationInfo"]),
    messageForActivation: item["messageForActivation"],
    provisioningState: item["provisioningState"],
    readinessState: item["readinessState"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : new Date(item["expirationTimeIfNotActivatedUtc"]),
  };
}

/** The type of the event channel which represents the direction flow of events. */
export enum KnownChannelType {
  /** PartnerTopic */
  PartnerTopic = "PartnerTopic",
  /** PartnerDestination */
  PartnerDestination = "PartnerDestination",
}

/**
 * The type of the event channel which represents the direction flow of events. \
 * {@link KnownChannelType} can be used interchangeably with ChannelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PartnerTopic**: PartnerTopic \
 * **PartnerDestination**: PartnerDestination
 */
export type ChannelType = string;

/** Properties of the corresponding partner topic of a Channel. */
export interface PartnerTopicInfo {
  /**
   * Azure subscription ID of the subscriber. The partner topic associated with the channel will be
   * created under this Azure subscription.
   */
  azureSubscriptionId?: string;
  /**
   * Azure Resource Group of the subscriber. The partner topic associated with the channel will be
   * created under this resource group.
   */
  resourceGroupName?: string;
  /** Name of the partner topic associated with the channel. */
  name?: string;
  /**
   * Event Type Information for the partner topic. This information is provided by the publisher and can be used by the
   * subscriber to view different types of events that are published.
   */
  eventTypeInfo?: EventTypeInfo;
  /**
   * The source information is provided by the publisher to determine the scope or context from which the events
   * are originating. This information can be used by the subscriber during the approval process of the
   * created partner topic.
   */
  source?: string;
}

export function partnerTopicInfoSerializer(item: PartnerTopicInfo): any {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    name: item["name"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
    source: item["source"],
  };
}

export function partnerTopicInfoDeserializer(item: any): PartnerTopicInfo {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    name: item["name"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoDeserializer(item["eventTypeInfo"]),
    source: item["source"],
  };
}

/** The event type information for Channels. */
export interface EventTypeInfo {
  /** The kind of event type used. */
  kind?: EventDefinitionKind;
  /**
   * A collection of inline event types for the resource. The inline event type keys are of type string which represents the name of the event.
   * An example of a valid inline event name is "Contoso.OrderCreated".
   * The inline event type values are of type InlineEventProperties and will contain additional information for every inline event type.
   */
  inlineEventTypes?: Record<string, InlineEventProperties>;
}

export function eventTypeInfoSerializer(item: EventTypeInfo): any {
  return {
    kind: item["kind"],
    inlineEventTypes: !item["inlineEventTypes"]
      ? item["inlineEventTypes"]
      : inlineEventPropertiesRecordSerializer(item["inlineEventTypes"]),
  };
}

export function eventTypeInfoDeserializer(item: any): EventTypeInfo {
  return {
    kind: item["kind"],
    inlineEventTypes: !item["inlineEventTypes"]
      ? item["inlineEventTypes"]
      : inlineEventPropertiesRecordDeserializer(item["inlineEventTypes"]),
  };
}

/** The kind of event type used. */
export enum KnownEventDefinitionKind {
  /** Inline */
  Inline = "Inline",
}

/**
 * The kind of event type used. \
 * {@link KnownEventDefinitionKind} can be used interchangeably with EventDefinitionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inline**: Inline
 */
export type EventDefinitionKind = string;

export function inlineEventPropertiesRecordSerializer(
  item: Record<string, InlineEventProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : inlineEventPropertiesSerializer(item[key]);
  });
  return result;
}

export function inlineEventPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, InlineEventProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : inlineEventPropertiesDeserializer(item[key]);
  });
  return result;
}

/** Additional information about every inline event. */
export interface InlineEventProperties {
  /** The description for the inline event. */
  description?: string;
  /** The displayName for the inline event. */
  displayName?: string;
  /** The documentationUrl for the inline event. */
  documentationUrl?: string;
  /** The dataSchemaUrl for the inline event. */
  dataSchemaUrl?: string;
}

export function inlineEventPropertiesSerializer(item: InlineEventProperties): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    documentationUrl: item["documentationUrl"],
    dataSchemaUrl: item["dataSchemaUrl"],
  };
}

export function inlineEventPropertiesDeserializer(item: any): InlineEventProperties {
  return {
    description: item["description"],
    displayName: item["displayName"],
    documentationUrl: item["documentationUrl"],
    dataSchemaUrl: item["dataSchemaUrl"],
  };
}

/** Properties of the corresponding partner destination of a Channel. */
export interface PartnerDestinationInfo {
  /**
   * Azure subscription ID of the subscriber. The partner destination associated with the channel will be
   * created under this Azure subscription.
   */
  azureSubscriptionId?: string;
  /**
   * Azure Resource Group of the subscriber. The partner destination associated with the channel will be
   * created under this resource group.
   */
  resourceGroupName?: string;
  /** Name of the partner destination associated with the channel. */
  name?: string;
  /** Type of the endpoint for the partner destination */
  /** The discriminator possible values: WebHook */
  endpointType: PartnerEndpointType;
  /** Additional context of the partner destination endpoint. */
  endpointServiceContext?: string;
  /** Change history of the resource move. */
  resourceMoveChangeHistory?: ResourceMoveChangeHistory[];
}

export function partnerDestinationInfoSerializer(item: PartnerDestinationInfo): any {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    name: item["name"],
    endpointType: item["endpointType"],
    endpointServiceContext: item["endpointServiceContext"],
    resourceMoveChangeHistory: !item["resourceMoveChangeHistory"]
      ? item["resourceMoveChangeHistory"]
      : resourceMoveChangeHistoryArraySerializer(item["resourceMoveChangeHistory"]),
  };
}

export function partnerDestinationInfoDeserializer(item: any): PartnerDestinationInfo {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    name: item["name"],
    endpointType: item["endpointType"],
    endpointServiceContext: item["endpointServiceContext"],
    resourceMoveChangeHistory: !item["resourceMoveChangeHistory"]
      ? item["resourceMoveChangeHistory"]
      : resourceMoveChangeHistoryArrayDeserializer(item["resourceMoveChangeHistory"]),
  };
}

/** Alias for PartnerDestinationInfoUnion */
export type PartnerDestinationInfoUnion = WebhookPartnerDestinationInfo | PartnerDestinationInfo;

export function partnerDestinationInfoUnionSerializer(item: PartnerDestinationInfoUnion): any {
  switch (item.endpointType) {
    case "WebHook":
      return webhookPartnerDestinationInfoSerializer(item as WebhookPartnerDestinationInfo);

    default:
      return partnerDestinationInfoSerializer(item);
  }
}

export function partnerDestinationInfoUnionDeserializer(item: any): PartnerDestinationInfoUnion {
  switch (item["endpointType"]) {
    case "WebHook":
      return webhookPartnerDestinationInfoDeserializer(item as WebhookPartnerDestinationInfo);

    default:
      return partnerDestinationInfoDeserializer(item);
  }
}

/** Type of the endpoint for the partner destination */
export enum KnownPartnerEndpointType {
  /** WebHook */
  WebHook = "WebHook",
}

/**
 * Type of the endpoint for the partner destination \
 * {@link KnownPartnerEndpointType} can be used interchangeably with PartnerEndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WebHook**: WebHook
 */
export type PartnerEndpointType = string;

export function resourceMoveChangeHistoryArraySerializer(
  result: Array<ResourceMoveChangeHistory>,
): any[] {
  return result.map((item) => {
    return resourceMoveChangeHistorySerializer(item);
  });
}

export function resourceMoveChangeHistoryArrayDeserializer(
  result: Array<ResourceMoveChangeHistory>,
): any[] {
  return result.map((item) => {
    return resourceMoveChangeHistoryDeserializer(item);
  });
}

/** The change history of the resource move. */
export interface ResourceMoveChangeHistory {
  /** Azure subscription ID of the resource. */
  azureSubscriptionId?: string;
  /** Azure Resource Group of the resource. */
  resourceGroupName?: string;
  /** UTC timestamp of when the resource was changed. */
  changedTimeUtc?: Date;
}

export function resourceMoveChangeHistorySerializer(item: ResourceMoveChangeHistory): any {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    changedTimeUtc: !item["changedTimeUtc"]
      ? item["changedTimeUtc"]
      : item["changedTimeUtc"].toISOString(),
  };
}

export function resourceMoveChangeHistoryDeserializer(item: any): ResourceMoveChangeHistory {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    changedTimeUtc: !item["changedTimeUtc"]
      ? item["changedTimeUtc"]
      : new Date(item["changedTimeUtc"]),
  };
}

/** Information about the WebHook of the partner destination. */
export interface WebhookPartnerDestinationInfo extends PartnerDestinationInfo {
  /** Change history of the resource move. */
  resourceMoveChangeHistory?: ResourceMoveChangeHistory[];
  /** Type of the endpoint for the partner destination */
  endpointType: "WebHook";
  /** The URL that represents the endpoint of the partner destination. */
  endpointUrl?: string;
  /** The base URL that represents the endpoint of the partner destination. */
  endpointBaseUrl?: string;
  /** Partner client authentication */
  clientAuthentication?: PartnerClientAuthenticationUnion;
}

export function webhookPartnerDestinationInfoSerializer(item: WebhookPartnerDestinationInfo): any {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    name: item["name"],
    endpointType: item["endpointType"],
    endpointServiceContext: item["endpointServiceContext"],
    resourceMoveChangeHistory: !item["resourceMoveChangeHistory"]
      ? item["resourceMoveChangeHistory"]
      : resourceMoveChangeHistoryArraySerializer(item["resourceMoveChangeHistory"]),
    properties: areAllPropsUndefined(item, [
      "endpointUrl",
      "endpointBaseUrl",
      "clientAuthentication",
    ])
      ? undefined
      : _webhookPartnerDestinationInfoPropertiesSerializer(item),
  };
}

export function webhookPartnerDestinationInfoDeserializer(
  item: any,
): WebhookPartnerDestinationInfo {
  return {
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    name: item["name"],
    endpointType: item["endpointType"],
    endpointServiceContext: item["endpointServiceContext"],
    resourceMoveChangeHistory: !item["resourceMoveChangeHistory"]
      ? item["resourceMoveChangeHistory"]
      : resourceMoveChangeHistoryArrayDeserializer(item["resourceMoveChangeHistory"]),
    ...(!item["properties"]
      ? item["properties"]
      : _webhookPartnerDestinationInfoPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a partner destination webhook. */
export interface WebhookPartnerDestinationProperties {
  /** The URL that represents the endpoint of the partner destination. */
  endpointUrl?: string;
  /** The base URL that represents the endpoint of the partner destination. */
  endpointBaseUrl?: string;
  /** Partner client authentication */
  clientAuthentication?: PartnerClientAuthenticationUnion;
}

export function webhookPartnerDestinationPropertiesSerializer(
  item: WebhookPartnerDestinationProperties,
): any {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : partnerClientAuthenticationUnionSerializer(item["clientAuthentication"]),
  };
}

export function webhookPartnerDestinationPropertiesDeserializer(
  item: any,
): WebhookPartnerDestinationProperties {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : partnerClientAuthenticationUnionDeserializer(item["clientAuthentication"]),
  };
}

/** Partner client authentication */
export interface PartnerClientAuthentication {
  /** Type of client authentication */
  /** The discriminator possible values: AzureAD */
  clientAuthenticationType: PartnerClientAuthenticationType;
}

export function partnerClientAuthenticationSerializer(item: PartnerClientAuthentication): any {
  return { clientAuthenticationType: item["clientAuthenticationType"] };
}

export function partnerClientAuthenticationDeserializer(item: any): PartnerClientAuthentication {
  return {
    clientAuthenticationType: item["clientAuthenticationType"],
  };
}

/** Alias for PartnerClientAuthenticationUnion */
export type PartnerClientAuthenticationUnion =
  | AzureADPartnerClientAuthentication
  | PartnerClientAuthentication;

export function partnerClientAuthenticationUnionSerializer(
  item: PartnerClientAuthenticationUnion,
): any {
  switch (item.clientAuthenticationType) {
    case "AzureAD":
      return azureADPartnerClientAuthenticationSerializer(
        item as AzureADPartnerClientAuthentication,
      );

    default:
      return partnerClientAuthenticationSerializer(item);
  }
}

export function partnerClientAuthenticationUnionDeserializer(
  item: any,
): PartnerClientAuthenticationUnion {
  switch (item["clientAuthenticationType"]) {
    case "AzureAD":
      return azureADPartnerClientAuthenticationDeserializer(
        item as AzureADPartnerClientAuthentication,
      );

    default:
      return partnerClientAuthenticationDeserializer(item);
  }
}

/** Type of client authentication */
export enum KnownPartnerClientAuthenticationType {
  /** AzureAD */
  AzureAD = "AzureAD",
}

/**
 * Type of client authentication \
 * {@link KnownPartnerClientAuthenticationType} can be used interchangeably with PartnerClientAuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureAD**: AzureAD
 */
export type PartnerClientAuthenticationType = string;

/** Microsoft Entra ID Partner Client Authentication */
export interface AzureADPartnerClientAuthentication extends PartnerClientAuthentication {
  /** Type of client authentication */
  clientAuthenticationType: "AzureAD";
  /** The Microsoft Entra ID Tenant ID to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryTenantId?: string;
  /** The Microsoft Entra ID Application ID or URI to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryApplicationIdOrUri?: string;
}

export function azureADPartnerClientAuthenticationSerializer(
  item: AzureADPartnerClientAuthentication,
): any {
  return {
    clientAuthenticationType: item["clientAuthenticationType"],
    properties: areAllPropsUndefined(item, [
      "azureActiveDirectoryTenantId",
      "azureActiveDirectoryApplicationIdOrUri",
    ])
      ? undefined
      : _azureADPartnerClientAuthenticationPropertiesSerializer(item),
  };
}

export function azureADPartnerClientAuthenticationDeserializer(
  item: any,
): AzureADPartnerClientAuthentication {
  return {
    clientAuthenticationType: item["clientAuthenticationType"],
    ...(!item["properties"]
      ? item["properties"]
      : _azureADPartnerClientAuthenticationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a Microsoft Entra ID Partner Client Authentication. */
export interface AzureADPartnerClientAuthenticationProperties {
  /** The Microsoft Entra ID Tenant ID to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryTenantId?: string;
  /** The Microsoft Entra ID Application ID or URI to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryApplicationIdOrUri?: string;
}

export function azureADPartnerClientAuthenticationPropertiesSerializer(
  item: AzureADPartnerClientAuthenticationProperties,
): any {
  return {
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
  };
}

export function azureADPartnerClientAuthenticationPropertiesDeserializer(
  item: any,
): AzureADPartnerClientAuthenticationProperties {
  return {
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
  };
}

/** Provisioning state of the channel. */
export enum KnownChannelProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** IdleDueToMirroredPartnerTopicDeletion */
  IdleDueToMirroredPartnerTopicDeletion = "IdleDueToMirroredPartnerTopicDeletion",
  /** IdleDueToMirroredPartnerDestinationDeletion */
  IdleDueToMirroredPartnerDestinationDeletion = "IdleDueToMirroredPartnerDestinationDeletion",
}

/**
 * Provisioning state of the channel. \
 * {@link KnownChannelProvisioningState} can be used interchangeably with ChannelProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **IdleDueToMirroredPartnerTopicDeletion**: IdleDueToMirroredPartnerTopicDeletion \
 * **IdleDueToMirroredPartnerDestinationDeletion**: IdleDueToMirroredPartnerDestinationDeletion
 */
export type ChannelProvisioningState = string;

/** The readiness state of the corresponding partner topic. */
export enum KnownReadinessState {
  /** NeverActivated */
  NeverActivated = "NeverActivated",
  /** Activated */
  Activated = "Activated",
}

/**
 * The readiness state of the corresponding partner topic. \
 * {@link KnownReadinessState} can be used interchangeably with ReadinessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NeverActivated**: NeverActivated \
 * **Activated**: Activated
 */
export type ReadinessState = string;

/** Properties of the Channel update. */
export interface ChannelUpdateParameters {
  /**
   * Expiration time of the channel. If this timer expires while the corresponding partner topic or partner destination is never activated,
   * the channel and corresponding partner topic or partner destination are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
  /** Partner destination properties which can be updated if the channel is of type PartnerDestination. */
  partnerDestinationInfo?: PartnerUpdateDestinationInfoUnion;
  /** Partner topic properties which can be updated if the channel is of type PartnerTopic. */
  partnerTopicInfo?: PartnerUpdateTopicInfo;
}

export function channelUpdateParametersSerializer(item: ChannelUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "expirationTimeIfNotActivatedUtc",
      "partnerDestinationInfo",
      "partnerTopicInfo",
    ])
      ? undefined
      : _channelUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties of the channel update parameters. */
export interface ChannelUpdateParametersProperties {
  /**
   * Expiration time of the channel. If this timer expires while the corresponding partner topic or partner destination is never activated,
   * the channel and corresponding partner topic or partner destination are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
  /** Partner destination properties which can be updated if the channel is of type PartnerDestination. */
  partnerDestinationInfo?: PartnerUpdateDestinationInfoUnion;
  /** Partner topic properties which can be updated if the channel is of type PartnerTopic. */
  partnerTopicInfo?: PartnerUpdateTopicInfo;
}

export function channelUpdateParametersPropertiesSerializer(
  item: ChannelUpdateParametersProperties,
): any {
  return {
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
    partnerDestinationInfo: !item["partnerDestinationInfo"]
      ? item["partnerDestinationInfo"]
      : partnerUpdateDestinationInfoUnionSerializer(item["partnerDestinationInfo"]),
    partnerTopicInfo: !item["partnerTopicInfo"]
      ? item["partnerTopicInfo"]
      : partnerUpdateTopicInfoSerializer(item["partnerTopicInfo"]),
  };
}

/** Properties of the corresponding partner destination of a Channel. */
export interface PartnerUpdateDestinationInfo {
  /** Type of the endpoint for the partner destination */
  /** The discriminator possible values: WebHook */
  endpointType: PartnerEndpointType;
}

export function partnerUpdateDestinationInfoSerializer(item: PartnerUpdateDestinationInfo): any {
  return { endpointType: item["endpointType"] };
}

/** Alias for PartnerUpdateDestinationInfoUnion */
export type PartnerUpdateDestinationInfoUnion =
  | WebhookUpdatePartnerDestinationInfo
  | PartnerUpdateDestinationInfo;

export function partnerUpdateDestinationInfoUnionSerializer(
  item: PartnerUpdateDestinationInfoUnion,
): any {
  switch (item.endpointType) {
    case "WebHook":
      return webhookUpdatePartnerDestinationInfoSerializer(
        item as WebhookUpdatePartnerDestinationInfo,
      );

    default:
      return partnerUpdateDestinationInfoSerializer(item);
  }
}

/** Information about the update of the WebHook of the partner destination. */
export interface WebhookUpdatePartnerDestinationInfo extends PartnerUpdateDestinationInfo {
  /** Type of the endpoint for the partner destination */
  endpointType: "WebHook";
  /** The URL that represents the endpoint of the partner destination. */
  endpointUrl?: string;
  /** The base URL that represents the endpoint of the partner destination. */
  endpointBaseUrl?: string;
  /** Partner client authentication */
  clientAuthentication?: PartnerClientAuthenticationUnion;
}

export function webhookUpdatePartnerDestinationInfoSerializer(
  item: WebhookUpdatePartnerDestinationInfo,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, [
      "endpointUrl",
      "endpointBaseUrl",
      "clientAuthentication",
    ])
      ? undefined
      : _webhookUpdatePartnerDestinationInfoPropertiesSerializer(item),
  };
}

/** Update properties for the corresponding partner topic of a channel. */
export interface PartnerUpdateTopicInfo {
  /** Event type info for the partner topic */
  eventTypeInfo?: EventTypeInfo;
}

export function partnerUpdateTopicInfoSerializer(item: PartnerUpdateTopicInfo): any {
  return {
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
  };
}

/** Result of the List Channels operation */
export interface _ChannelsListResult {
  /** The Channel items on this page */
  value: Channel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _channelsListResultDeserializer(item: any): _ChannelsListResult {
  return {
    value: channelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function channelArraySerializer(result: Array<Channel>): any[] {
  return result.map((item) => {
    return channelSerializer(item);
  });
}

export function channelArrayDeserializer(result: Array<Channel>): any[] {
  return result.map((item) => {
    return channelDeserializer(item);
  });
}

/** Full endpoint URL of an event subscription */
export interface EventSubscriptionFullUrl {
  /** The URL that represents the endpoint of the destination of an event subscription. */
  endpointUrl?: string;
}

export function eventSubscriptionFullUrlDeserializer(item: any): EventSubscriptionFullUrl {
  return {
    endpointUrl: item["endpointUrl"],
  };
}

/** EventGrid Partner Namespace. */
export interface PartnerNamespace extends TrackedResource {
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the partner namespace. */
  readonly provisioningState?: PartnerNamespaceProvisioningState;
  /**
   * The fully qualified ARM Id of the partner registration that should be associated with this partner namespace. This takes the following format:
   * /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}.
   */
  partnerRegistrationFullyQualifiedId?: string;
  /** Minimum TLS version of the publisher allowed to publish to this partner namespace */
  minimumTlsVersionAllowed?: TlsVersion;
  /** Endpoint for the partner namespace. */
  readonly endpoint?: string;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PartnerNamespaceProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the partner namespace. */
  disableLocalAuth?: boolean;
  /**
   * This determines if events published to this partner namespace should use the source attribute in the event payload
   * or use the channel name in the header when matching to the partner topic. If none is specified, source attribute routing will be used to match the partner topic.
   */
  partnerTopicRoutingMode?: PartnerTopicRoutingMode;
}

export function partnerNamespaceSerializer(item: PartnerNamespace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "partnerRegistrationFullyQualifiedId",
      "minimumTlsVersionAllowed",
      "publicNetworkAccess",
      "inboundIpRules",
      "disableLocalAuth",
      "partnerTopicRoutingMode",
    ])
      ? undefined
      : _partnerNamespacePropertiesSerializer(item),
  };
}

export function partnerNamespaceDeserializer(item: any): PartnerNamespace {
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
      : _partnerNamespacePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the partner namespace. */
export interface PartnerNamespaceProperties {
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the partner namespace. */
  readonly provisioningState?: PartnerNamespaceProvisioningState;
  /**
   * The fully qualified ARM Id of the partner registration that should be associated with this partner namespace. This takes the following format:
   * /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}.
   */
  partnerRegistrationFullyQualifiedId?: string;
  /** Minimum TLS version of the publisher allowed to publish to this partner namespace */
  minimumTlsVersionAllowed?: TlsVersion;
  /** Endpoint for the partner namespace. */
  readonly endpoint?: string;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PartnerNamespaceProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the partner namespace. */
  disableLocalAuth?: boolean;
  /**
   * This determines if events published to this partner namespace should use the source attribute in the event payload
   * or use the channel name in the header when matching to the partner topic. If none is specified, source attribute routing will be used to match the partner topic.
   */
  partnerTopicRoutingMode?: PartnerTopicRoutingMode;
}

export function partnerNamespacePropertiesSerializer(item: PartnerNamespaceProperties): any {
  return {
    partnerRegistrationFullyQualifiedId: item["partnerRegistrationFullyQualifiedId"],
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    partnerTopicRoutingMode: item["partnerTopicRoutingMode"],
  };
}

export function partnerNamespacePropertiesDeserializer(item: any): PartnerNamespaceProperties {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    partnerRegistrationFullyQualifiedId: item["partnerRegistrationFullyQualifiedId"],
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    endpoint: item["endpoint"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    partnerTopicRoutingMode: item["partnerTopicRoutingMode"],
  };
}

/** Provisioning state of the partner namespace. */
export enum KnownPartnerNamespaceProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the partner namespace. \
 * {@link KnownPartnerNamespaceProvisioningState} can be used interchangeably with PartnerNamespaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type PartnerNamespaceProvisioningState = string;

/**
 * This determines if events published to this partner namespace should use the source attribute in the event payload
 * or use the channel name in the header when matching to the partner topic. If none is specified, source attribute routing will be used to match the partner topic.
 */
export enum KnownPartnerTopicRoutingMode {
  /** SourceEventAttribute */
  SourceEventAttribute = "SourceEventAttribute",
  /** ChannelNameHeader */
  ChannelNameHeader = "ChannelNameHeader",
}

/**
 * This determines if events published to this partner namespace should use the source attribute in the event payload
 * or use the channel name in the header when matching to the partner topic. If none is specified, source attribute routing will be used to match the partner topic. \
 * {@link KnownPartnerTopicRoutingMode} can be used interchangeably with PartnerTopicRoutingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SourceEventAttribute**: SourceEventAttribute \
 * **ChannelNameHeader**: ChannelNameHeader
 */
export type PartnerTopicRoutingMode = string;

/** Properties of the Partner Namespace update. */
export interface PartnerNamespaceUpdateParameters {
  /** Tags of the Partner Namespace. */
  tags?: Record<string, string>;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PartnerNamespaceUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the partner namespace. */
  disableLocalAuth?: boolean;
}

export function partnerNamespaceUpdateParametersSerializer(
  item: PartnerNamespaceUpdateParameters,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "publicNetworkAccess",
      "inboundIpRules",
      "minimumTlsVersionAllowed",
      "disableLocalAuth",
    ])
      ? undefined
      : _partnerNamespaceUpdateParametersPropertiesSerializer(item),
  };
}

/** Information of Partner Namespace update parameter properties. */
export interface PartnerNamespaceUpdateParameterProperties {
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.PartnerNamespaceUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the partner namespace. */
  disableLocalAuth?: boolean;
}

export function partnerNamespaceUpdateParameterPropertiesSerializer(
  item: PartnerNamespaceUpdateParameterProperties,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

/** Result of the List Partner Namespaces operation */
export interface _PartnerNamespacesListResult {
  /** The PartnerNamespace items on this page */
  value: PartnerNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _partnerNamespacesListResultDeserializer(item: any): _PartnerNamespacesListResult {
  return {
    value: partnerNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partnerNamespaceArraySerializer(result: Array<PartnerNamespace>): any[] {
  return result.map((item) => {
    return partnerNamespaceSerializer(item);
  });
}

export function partnerNamespaceArrayDeserializer(result: Array<PartnerNamespace>): any[] {
  return result.map((item) => {
    return partnerNamespaceDeserializer(item);
  });
}

/** Shared access keys of the partner namespace. */
export interface PartnerNamespaceSharedAccessKeys {
  /** Shared access key1 for the partner namespace. */
  key1?: string;
  /** Shared access key2 for the partner namespace. */
  key2?: string;
}

export function partnerNamespaceSharedAccessKeysDeserializer(
  item: any,
): PartnerNamespaceSharedAccessKeys {
  return {
    key1: item["key1"],
    key2: item["key2"],
  };
}

/** PartnerNamespace regenerate shared access key request. */
export interface PartnerNamespaceRegenerateKeyRequest {
  /** Key name to regenerate (key1 or key2). */
  keyName: string;
}

export function partnerNamespaceRegenerateKeyRequestSerializer(
  item: PartnerNamespaceRegenerateKeyRequest,
): any {
  return { keyName: item["keyName"] };
}

/** The Client group resource. */
export interface ClientGroup extends ProxyResource {
  /** Description for the Client Group resource. */
  description?: string;
  /**
   * The grouping query for the clients.
   * Example : attributes.keyName IN ['a', 'b', 'c'].
   */
  query?: string;
  /** Provisioning state of the ClientGroup resource. */
  readonly provisioningState?: ClientGroupProvisioningState;
}

export function clientGroupSerializer(item: ClientGroup): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "query"])
      ? undefined
      : _clientGroupPropertiesSerializer(item),
  };
}

export function clientGroupDeserializer(item: any): ClientGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clientGroupPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of client group. */
export interface ClientGroupProperties {
  /** Description for the Client Group resource. */
  description?: string;
  /**
   * The grouping query for the clients.
   * Example : attributes.keyName IN ['a', 'b', 'c'].
   */
  query?: string;
  /** Provisioning state of the ClientGroup resource. */
  readonly provisioningState?: ClientGroupProvisioningState;
}

export function clientGroupPropertiesSerializer(item: ClientGroupProperties): any {
  return { description: item["description"], query: item["query"] };
}

export function clientGroupPropertiesDeserializer(item: any): ClientGroupProperties {
  return {
    description: item["description"],
    query: item["query"],
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the ClientGroup resource. */
export enum KnownClientGroupProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning state of the ClientGroup resource. \
 * {@link KnownClientGroupProvisioningState} can be used interchangeably with ClientGroupProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted
 */
export type ClientGroupProvisioningState = string;

/** Result of the List Client Group operation. */
export interface _ClientGroupsListResult {
  /** The ClientGroup items on this page */
  value: ClientGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clientGroupsListResultDeserializer(item: any): _ClientGroupsListResult {
  return {
    value: clientGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clientGroupArraySerializer(result: Array<ClientGroup>): any[] {
  return result.map((item) => {
    return clientGroupSerializer(item);
  });
}

export function clientGroupArrayDeserializer(result: Array<ClientGroup>): any[] {
  return result.map((item) => {
    return clientGroupDeserializer(item);
  });
}

/** The Client resource. */
export interface Client extends ProxyResource {
  /** Description for the Client resource. */
  description?: string;
  /** The name presented by the client for authentication. The default value is the name of the resource. */
  authenticationName?: string;
  /** The client certificate authentication information. */
  clientCertificateAuthentication?: ClientCertificateAuthentication;
  /** Indicates if the client is enabled or not. Default value is Enabled. */
  state?: ClientState;
  /**
   * Attributes for the client. Supported values are int, bool, string, string[].
   * Example:
   * "attributes": { "room": "345", "floor": 12, "deviceTypes": ["Fan", "Light"] }
   */
  attributes?: Record<string, any>;
  /** Provisioning state of the Client resource. */
  readonly provisioningState?: ClientProvisioningState;
}

export function clientSerializer(item: Client): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "authenticationName",
      "clientCertificateAuthentication",
      "state",
      "attributes",
    ])
      ? undefined
      : _clientPropertiesSerializer(item),
  };
}

export function clientDeserializer(item: any): Client {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clientPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of client. */
export interface ClientProperties {
  /** Description for the Client resource. */
  description?: string;
  /** The name presented by the client for authentication. The default value is the name of the resource. */
  authenticationName?: string;
  /** The client certificate authentication information. */
  clientCertificateAuthentication?: ClientCertificateAuthentication;
  /** Indicates if the client is enabled or not. Default value is Enabled. */
  state?: ClientState;
  /**
   * Attributes for the client. Supported values are int, bool, string, string[].
   * Example:
   * "attributes": { "room": "345", "floor": 12, "deviceTypes": ["Fan", "Light"] }
   */
  attributes?: Record<string, any>;
  /** Provisioning state of the Client resource. */
  readonly provisioningState?: ClientProvisioningState;
}

export function clientPropertiesSerializer(item: ClientProperties): any {
  return {
    description: item["description"],
    authenticationName: item["authenticationName"],
    clientCertificateAuthentication: !item["clientCertificateAuthentication"]
      ? item["clientCertificateAuthentication"]
      : clientCertificateAuthenticationSerializer(item["clientCertificateAuthentication"]),
    state: item["state"],
    attributes: item["attributes"],
  };
}

export function clientPropertiesDeserializer(item: any): ClientProperties {
  return {
    description: item["description"],
    authenticationName: item["authenticationName"],
    clientCertificateAuthentication: !item["clientCertificateAuthentication"]
      ? item["clientCertificateAuthentication"]
      : clientCertificateAuthenticationDeserializer(item["clientCertificateAuthentication"]),
    state: item["state"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : Object.fromEntries(
          Object.entries(item["attributes"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** The certificate authentication properties for the client. */
export interface ClientCertificateAuthentication {
  /** The validation scheme used to authenticate the client. Default value is SubjectMatchesAuthenticationName. */
  validationScheme?: ClientCertificateValidationScheme;
  /** The list of thumbprints that are allowed during client authentication. This property is required only if the validationScheme is 'ThumbprintMatch'. */
  allowedThumbprints?: string[];
}

export function clientCertificateAuthenticationSerializer(
  item: ClientCertificateAuthentication,
): any {
  return {
    validationScheme: item["validationScheme"],
    allowedThumbprints: !item["allowedThumbprints"]
      ? item["allowedThumbprints"]
      : item["allowedThumbprints"].map((p: any) => {
          return p;
        }),
  };
}

export function clientCertificateAuthenticationDeserializer(
  item: any,
): ClientCertificateAuthentication {
  return {
    validationScheme: item["validationScheme"],
    allowedThumbprints: !item["allowedThumbprints"]
      ? item["allowedThumbprints"]
      : item["allowedThumbprints"].map((p: any) => {
          return p;
        }),
  };
}

/** The validation scheme used to authenticate the client. Default value is SubjectMatchesAuthenticationName. */
export enum KnownClientCertificateValidationScheme {
  /** SubjectMatchesAuthenticationName */
  SubjectMatchesAuthenticationName = "SubjectMatchesAuthenticationName",
  /** DnsMatchesAuthenticationName */
  DnsMatchesAuthenticationName = "DnsMatchesAuthenticationName",
  /** UriMatchesAuthenticationName */
  UriMatchesAuthenticationName = "UriMatchesAuthenticationName",
  /** IpMatchesAuthenticationName */
  IpMatchesAuthenticationName = "IpMatchesAuthenticationName",
  /** EmailMatchesAuthenticationName */
  EmailMatchesAuthenticationName = "EmailMatchesAuthenticationName",
  /** ThumbprintMatch */
  ThumbprintMatch = "ThumbprintMatch",
}

/**
 * The validation scheme used to authenticate the client. Default value is SubjectMatchesAuthenticationName. \
 * {@link KnownClientCertificateValidationScheme} can be used interchangeably with ClientCertificateValidationScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SubjectMatchesAuthenticationName**: SubjectMatchesAuthenticationName \
 * **DnsMatchesAuthenticationName**: DnsMatchesAuthenticationName \
 * **UriMatchesAuthenticationName**: UriMatchesAuthenticationName \
 * **IpMatchesAuthenticationName**: IpMatchesAuthenticationName \
 * **EmailMatchesAuthenticationName**: EmailMatchesAuthenticationName \
 * **ThumbprintMatch**: ThumbprintMatch
 */
export type ClientCertificateValidationScheme = string;

/** Indicates if the client is enabled or not. Default value is Enabled. */
export enum KnownClientState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if the client is enabled or not. Default value is Enabled. \
 * {@link KnownClientState} can be used interchangeably with ClientState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ClientState = string;

/** Provisioning state of the Client resource. */
export enum KnownClientProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning state of the Client resource. \
 * {@link KnownClientProvisioningState} can be used interchangeably with ClientProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted
 */
export type ClientProvisioningState = string;

/** Result of the List Client operation. */
export interface _ClientsListResult {
  /** The Client items on this page */
  value: Client[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clientsListResultDeserializer(item: any): _ClientsListResult {
  return {
    value: clientArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clientArraySerializer(result: Array<Client>): any[] {
  return result.map((item) => {
    return clientSerializer(item);
  });
}

export function clientArrayDeserializer(result: Array<Client>): any[] {
  return result.map((item) => {
    return clientDeserializer(item);
  });
}

/** EventGrid Domain. */
export interface Domain extends TrackedResource {
  /** The Sku pricing tier for the Event Grid Domain resource. */
  sku?: ResourceSku;
  /** Identity information for the Event Grid Domain resource. */
  identity?: IdentityInfo;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the Event Grid Domain Resource. */
  readonly provisioningState?: DomainProvisioningState;
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** Endpoint for the Event Grid Domain Resource which is used for publishing the events. */
  readonly endpoint?: string;
  /** This determines the format that Event Grid should expect for incoming events published to the Event Grid Domain Resource. */
  inputSchema?: InputSchema;
  /**
   * Event Type Information for the domain. This information is provided by the publisher and can be used by the
   * subscriber to view different types of events that are published.
   */
  eventTypeInfo?: EventTypeInfo;
  /** Information about the InputSchemaMapping which specified the info about mapping event payload. */
  inputSchemaMapping?: InputSchemaMappingUnion;
  /** Metric resource id for the Event Grid Domain Resource. */
  readonly metricResourceId?: string;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.DomainProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the domain. */
  disableLocalAuth?: boolean;
  /**
   * This Boolean is used to specify the creation mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, creation of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is null or set to true, Event Grid is responsible of automatically creating the domain topic when the first event subscription is
   * created at the scope of the domain topic. If this property is set to false, then creating the first event subscription will require creating a domain topic
   * by the user. The self-management mode can be used if the user wants full control of when the domain topic is created, while auto-managed mode provides the
   * flexibility to perform less operations and manage fewer resources by the user. Also, note that in auto-managed creation mode, user is allowed to create the
   * domain topic on demand if needed.
   */
  autoCreateTopicWithFirstSubscription?: boolean;
  /**
   * This Boolean is used to specify the deletion mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, deletion of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is set to true, Event Grid is responsible of automatically deleting the domain topic when the last event subscription at the scope
   * of the domain topic is deleted. If this property is set to false, then the user needs to manually delete the domain topic when it is no longer needed
   * (e.g., when last event subscription is deleted and the resource needs to be cleaned up). The self-management mode can be used if the user wants full
   * control of when the domain topic needs to be deleted, while auto-managed mode provides the flexibility to perform less operations and manage fewer
   * resources by the user.
   */
  autoDeleteTopicWithLastSubscription?: boolean;
  /** Data Residency Boundary of the resource. */
  dataResidencyBoundary?: DataResidencyBoundary;
}

export function domainSerializer(item: Domain): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "minimumTlsVersionAllowed",
      "inputSchema",
      "eventTypeInfo",
      "inputSchemaMapping",
      "publicNetworkAccess",
      "inboundIpRules",
      "disableLocalAuth",
      "autoCreateTopicWithFirstSubscription",
      "autoDeleteTopicWithLastSubscription",
      "dataResidencyBoundary",
    ])
      ? undefined
      : _domainPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
  };
}

export function domainDeserializer(item: any): Domain {
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
      : _domainPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityInfoDeserializer(item["identity"]),
  };
}

/** Properties of the Event Grid Domain Resource. */
export interface DomainProperties {
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the Event Grid Domain Resource. */
  readonly provisioningState?: DomainProvisioningState;
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** Endpoint for the Event Grid Domain Resource which is used for publishing the events. */
  readonly endpoint?: string;
  /** This determines the format that Event Grid should expect for incoming events published to the Event Grid Domain Resource. */
  inputSchema?: InputSchema;
  /**
   * Event Type Information for the domain. This information is provided by the publisher and can be used by the
   * subscriber to view different types of events that are published.
   */
  eventTypeInfo?: EventTypeInfo;
  /** Information about the InputSchemaMapping which specified the info about mapping event payload. */
  inputSchemaMapping?: InputSchemaMappingUnion;
  /** Metric resource id for the Event Grid Domain Resource. */
  readonly metricResourceId?: string;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.DomainProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the domain. */
  disableLocalAuth?: boolean;
  /**
   * This Boolean is used to specify the creation mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, creation of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is null or set to true, Event Grid is responsible of automatically creating the domain topic when the first event subscription is
   * created at the scope of the domain topic. If this property is set to false, then creating the first event subscription will require creating a domain topic
   * by the user. The self-management mode can be used if the user wants full control of when the domain topic is created, while auto-managed mode provides the
   * flexibility to perform less operations and manage fewer resources by the user. Also, note that in auto-managed creation mode, user is allowed to create the
   * domain topic on demand if needed.
   */
  autoCreateTopicWithFirstSubscription?: boolean;
  /**
   * This Boolean is used to specify the deletion mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, deletion of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is set to true, Event Grid is responsible of automatically deleting the domain topic when the last event subscription at the scope
   * of the domain topic is deleted. If this property is set to false, then the user needs to manually delete the domain topic when it is no longer needed
   * (e.g., when last event subscription is deleted and the resource needs to be cleaned up). The self-management mode can be used if the user wants full
   * control of when the domain topic needs to be deleted, while auto-managed mode provides the flexibility to perform less operations and manage fewer
   * resources by the user.
   */
  autoDeleteTopicWithLastSubscription?: boolean;
  /** Data Residency Boundary of the resource. */
  dataResidencyBoundary?: DataResidencyBoundary;
}

export function domainPropertiesSerializer(item: DomainProperties): any {
  return {
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    inputSchema: item["inputSchema"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionSerializer(item["inputSchemaMapping"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    autoCreateTopicWithFirstSubscription: item["autoCreateTopicWithFirstSubscription"],
    autoDeleteTopicWithLastSubscription: item["autoDeleteTopicWithLastSubscription"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
  };
}

export function domainPropertiesDeserializer(item: any): DomainProperties {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    endpoint: item["endpoint"],
    inputSchema: item["inputSchema"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoDeserializer(item["eventTypeInfo"]),
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionDeserializer(item["inputSchemaMapping"]),
    metricResourceId: item["metricResourceId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    autoCreateTopicWithFirstSubscription: item["autoCreateTopicWithFirstSubscription"],
    autoDeleteTopicWithLastSubscription: item["autoDeleteTopicWithLastSubscription"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
  };
}

/** Provisioning state of the Event Grid Domain Resource. */
export enum KnownDomainProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the Event Grid Domain Resource. \
 * {@link KnownDomainProvisioningState} can be used interchangeably with DomainProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type DomainProvisioningState = string;

/** This determines the format that Event Grid should expect for incoming events published to the Event Grid Domain Resource. */
export enum KnownInputSchema {
  /** EventGridSchema */
  EventGridSchema = "EventGridSchema",
  /** CustomEventSchema */
  CustomEventSchema = "CustomEventSchema",
  /** CloudEventSchemaV1_0 */
  CloudEventSchemaV10 = "CloudEventSchemaV1_0",
}

/**
 * This determines the format that Event Grid should expect for incoming events published to the Event Grid Domain Resource. \
 * {@link KnownInputSchema} can be used interchangeably with InputSchema,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EventGridSchema**: EventGridSchema \
 * **CustomEventSchema**: CustomEventSchema \
 * **CloudEventSchemaV1_0**: CloudEventSchemaV1_0
 */
export type InputSchema = string;

/** By default, Event Grid expects events to be in the Event Grid event schema. Specifying an input schema mapping enables publishing to Event Grid using a custom input schema. Currently, the only supported type of InputSchemaMapping is 'JsonInputSchemaMapping'. */
export interface InputSchemaMapping {
  /** Type of the custom mapping */
  /** The discriminator possible values: Json */
  inputSchemaMappingType: InputSchemaMappingType;
}

export function inputSchemaMappingSerializer(item: InputSchemaMapping): any {
  return { inputSchemaMappingType: item["inputSchemaMappingType"] };
}

export function inputSchemaMappingDeserializer(item: any): InputSchemaMapping {
  return {
    inputSchemaMappingType: item["inputSchemaMappingType"],
  };
}

/** Alias for InputSchemaMappingUnion */
export type InputSchemaMappingUnion = JsonInputSchemaMapping | InputSchemaMapping;

export function inputSchemaMappingUnionSerializer(item: InputSchemaMappingUnion): any {
  switch (item.inputSchemaMappingType) {
    case "Json":
      return jsonInputSchemaMappingSerializer(item as JsonInputSchemaMapping);

    default:
      return inputSchemaMappingSerializer(item);
  }
}

export function inputSchemaMappingUnionDeserializer(item: any): InputSchemaMappingUnion {
  switch (item["inputSchemaMappingType"]) {
    case "Json":
      return jsonInputSchemaMappingDeserializer(item as JsonInputSchemaMapping);

    default:
      return inputSchemaMappingDeserializer(item);
  }
}

/** Type of the custom mapping */
export enum KnownInputSchemaMappingType {
  /** Json */
  Json = "Json",
}

/**
 * Type of the custom mapping \
 * {@link KnownInputSchemaMappingType} can be used interchangeably with InputSchemaMappingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Json**: Json
 */
export type InputSchemaMappingType = string;

/** This enables publishing to Event Grid using a custom input schema. This can be used to map properties from a custom input JSON schema to the Event Grid event schema. */
export interface JsonInputSchemaMapping extends InputSchemaMapping {
  /** Type of the custom mapping */
  inputSchemaMappingType: "Json";
  /** The mapping information for the Id property of the Event Grid Event. */
  id?: JsonField;
  /** The mapping information for the Topic property of the Event Grid Event. */
  topic?: JsonField;
  /** The mapping information for the EventTime property of the Event Grid Event. */
  eventTime?: JsonField;
  /** The mapping information for the EventType property of the Event Grid Event. */
  eventType?: JsonFieldWithDefault;
  /** The mapping information for the Subject property of the Event Grid Event. */
  subject?: JsonFieldWithDefault;
  /** The mapping information for the DataVersion property of the Event Grid Event. */
  dataVersion?: JsonFieldWithDefault;
}

export function jsonInputSchemaMappingSerializer(item: JsonInputSchemaMapping): any {
  return {
    inputSchemaMappingType: item["inputSchemaMappingType"],
    properties: areAllPropsUndefined(item, [
      "id",
      "topic",
      "eventTime",
      "eventType",
      "subject",
      "dataVersion",
    ])
      ? undefined
      : _jsonInputSchemaMappingPropertiesSerializer(item),
  };
}

export function jsonInputSchemaMappingDeserializer(item: any): JsonInputSchemaMapping {
  return {
    inputSchemaMappingType: item["inputSchemaMappingType"],
    ...(!item["properties"]
      ? item["properties"]
      : _jsonInputSchemaMappingPropertiesDeserializer(item["properties"])),
  };
}

/** This can be used to map properties of a source schema (or default values, for certain supported properties) to properties of the EventGridEvent schema. */
export interface JsonInputSchemaMappingProperties {
  /** The mapping information for the Id property of the Event Grid Event. */
  id?: JsonField;
  /** The mapping information for the Topic property of the Event Grid Event. */
  topic?: JsonField;
  /** The mapping information for the EventTime property of the Event Grid Event. */
  eventTime?: JsonField;
  /** The mapping information for the EventType property of the Event Grid Event. */
  eventType?: JsonFieldWithDefault;
  /** The mapping information for the Subject property of the Event Grid Event. */
  subject?: JsonFieldWithDefault;
  /** The mapping information for the DataVersion property of the Event Grid Event. */
  dataVersion?: JsonFieldWithDefault;
}

export function jsonInputSchemaMappingPropertiesSerializer(
  item: JsonInputSchemaMappingProperties,
): any {
  return {
    id: !item["id"] ? item["id"] : jsonFieldSerializer(item["id"]),
    topic: !item["topic"] ? item["topic"] : jsonFieldSerializer(item["topic"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : jsonFieldSerializer(item["eventTime"]),
    eventType: !item["eventType"]
      ? item["eventType"]
      : jsonFieldWithDefaultSerializer(item["eventType"]),
    subject: !item["subject"] ? item["subject"] : jsonFieldWithDefaultSerializer(item["subject"]),
    dataVersion: !item["dataVersion"]
      ? item["dataVersion"]
      : jsonFieldWithDefaultSerializer(item["dataVersion"]),
  };
}

export function jsonInputSchemaMappingPropertiesDeserializer(
  item: any,
): JsonInputSchemaMappingProperties {
  return {
    id: !item["id"] ? item["id"] : jsonFieldDeserializer(item["id"]),
    topic: !item["topic"] ? item["topic"] : jsonFieldDeserializer(item["topic"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : jsonFieldDeserializer(item["eventTime"]),
    eventType: !item["eventType"]
      ? item["eventType"]
      : jsonFieldWithDefaultDeserializer(item["eventType"]),
    subject: !item["subject"] ? item["subject"] : jsonFieldWithDefaultDeserializer(item["subject"]),
    dataVersion: !item["dataVersion"]
      ? item["dataVersion"]
      : jsonFieldWithDefaultDeserializer(item["dataVersion"]),
  };
}

/** This is used to express the source of an input schema mapping for a single target field in the Event Grid Event schema. This is currently used in the mappings for the 'id', 'topic' and 'eventtime' properties. This represents a field in the input event schema. */
export interface JsonField {
  /** Name of a field in the input event schema that's to be used as the source of a mapping. */
  sourceField?: string;
}

export function jsonFieldSerializer(item: JsonField): any {
  return { sourceField: item["sourceField"] };
}

export function jsonFieldDeserializer(item: any): JsonField {
  return {
    sourceField: item["sourceField"],
  };
}

/**
 * This is used to express the source of an input schema mapping for a single target field
 * in the Event Grid Event schema. This is currently used in the mappings for the 'subject',
 * 'eventtype' and 'dataversion' properties. This represents a field in the input event schema
 * along with a default value to be used, and at least one of these two properties should be provided.
 */
export interface JsonFieldWithDefault {
  /** Name of a field in the input event schema that's to be used as the source of a mapping. */
  sourceField?: string;
  /** The default value to be used for mapping when a SourceField is not provided or if there's no property with the specified name in the published JSON event payload. */
  defaultValue?: string;
}

export function jsonFieldWithDefaultSerializer(item: JsonFieldWithDefault): any {
  return { sourceField: item["sourceField"], defaultValue: item["defaultValue"] };
}

export function jsonFieldWithDefaultDeserializer(item: any): JsonFieldWithDefault {
  return {
    sourceField: item["sourceField"],
    defaultValue: item["defaultValue"],
  };
}

/** Data Residency Boundary of the resource. */
export enum KnownDataResidencyBoundary {
  /** WithinGeopair */
  WithinGeopair = "WithinGeopair",
  /** WithinRegion */
  WithinRegion = "WithinRegion",
}

/**
 * Data Residency Boundary of the resource. \
 * {@link KnownDataResidencyBoundary} can be used interchangeably with DataResidencyBoundary,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WithinGeopair**: WithinGeopair \
 * **WithinRegion**: WithinRegion
 */
export type DataResidencyBoundary = string;

/** Describes an EventGrid Resource Sku. */
export interface ResourceSku {
  /** The Sku name of the resource. The possible values are: Basic or Premium. */
  name?: Sku;
}

export function resourceSkuSerializer(item: ResourceSku): any {
  return { name: item["name"] };
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    name: item["name"],
  };
}

/** The Sku name of the resource. The possible values are: Basic or Premium. */
export enum KnownSku {
  /** Basic */
  Basic = "Basic",
  /** Premium */
  Premium = "Premium",
}

/**
 * The Sku name of the resource. The possible values are: Basic or Premium. \
 * {@link KnownSku} can be used interchangeably with Sku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic \
 * **Premium**: Premium
 */
export type Sku = string;

/** Properties of the Domain update. */
export interface DomainUpdateParameters {
  /** Tags of the domains resource. */
  tags?: Record<string, string>;
  /** Identity information for the resource. */
  identity?: IdentityInfo;
  /** The Sku pricing tier for the domain. */
  sku?: ResourceSku;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.DomainUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the domain. */
  disableLocalAuth?: boolean;
  /**
   * This Boolean is used to specify the creation mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, creation of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is null or set to true, Event Grid is responsible of automatically creating the domain topic when the first event subscription is
   * created at the scope of the domain topic. If this property is set to false, then creating the first event subscription will require creating a domain topic
   * by the user. The self-management mode can be used if the user wants full control of when the domain topic is created, while auto-managed mode provides the
   * flexibility to perform less operations and manage fewer resources by the user. Also, note that in auto-managed creation mode, user is allowed to create the
   * domain topic on demand if needed.
   */
  autoCreateTopicWithFirstSubscription?: boolean;
  /**
   * This Boolean is used to specify the deletion mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, deletion of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is set to true, Event Grid is responsible of automatically deleting the domain topic when the last event subscription at the scope
   * of the domain topic is deleted. If this property is set to false, then the user needs to manually delete the domain topic when it is no longer needed
   * (e.g., when last event subscription is deleted and the resource needs to be cleaned up). The self-management mode can be used if the user wants full
   * control of when the domain topic needs to be deleted, while auto-managed mode provides the flexibility to perform less operations and manage fewer
   * resources by the user.
   */
  autoDeleteTopicWithLastSubscription?: boolean;
  /** The data residency boundary for the domain. */
  dataResidencyBoundary?: DataResidencyBoundary;
  /** The eventTypeInfo for the domain. */
  eventTypeInfo?: EventTypeInfo;
}

export function domainUpdateParametersSerializer(item: DomainUpdateParameters): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "publicNetworkAccess",
      "inboundIpRules",
      "minimumTlsVersionAllowed",
      "disableLocalAuth",
      "autoCreateTopicWithFirstSubscription",
      "autoDeleteTopicWithLastSubscription",
      "dataResidencyBoundary",
      "eventTypeInfo",
    ])
      ? undefined
      : _domainUpdateParametersPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
  };
}

/** Information of domain update parameter properties. */
export interface DomainUpdateParameterProperties {
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.DomainUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the domain. */
  disableLocalAuth?: boolean;
  /**
   * This Boolean is used to specify the creation mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, creation of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is null or set to true, Event Grid is responsible of automatically creating the domain topic when the first event subscription is
   * created at the scope of the domain topic. If this property is set to false, then creating the first event subscription will require creating a domain topic
   * by the user. The self-management mode can be used if the user wants full control of when the domain topic is created, while auto-managed mode provides the
   * flexibility to perform less operations and manage fewer resources by the user. Also, note that in auto-managed creation mode, user is allowed to create the
   * domain topic on demand if needed.
   */
  autoCreateTopicWithFirstSubscription?: boolean;
  /**
   * This Boolean is used to specify the deletion mechanism for 'all' the Event Grid Domain Topics associated with this Event Grid Domain resource.
   * In this context, deletion of domain topic can be auto-managed (when true) or self-managed (when false). The default value for this property is true.
   * When this property is set to true, Event Grid is responsible of automatically deleting the domain topic when the last event subscription at the scope
   * of the domain topic is deleted. If this property is set to false, then the user needs to manually delete the domain topic when it is no longer needed
   * (e.g., when last event subscription is deleted and the resource needs to be cleaned up). The self-management mode can be used if the user wants full
   * control of when the domain topic needs to be deleted, while auto-managed mode provides the flexibility to perform less operations and manage fewer
   * resources by the user.
   */
  autoDeleteTopicWithLastSubscription?: boolean;
  /** The data residency boundary for the domain. */
  dataResidencyBoundary?: DataResidencyBoundary;
  /** The eventTypeInfo for the domain. */
  eventTypeInfo?: EventTypeInfo;
}

export function domainUpdateParameterPropertiesSerializer(
  item: DomainUpdateParameterProperties,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    disableLocalAuth: item["disableLocalAuth"],
    autoCreateTopicWithFirstSubscription: item["autoCreateTopicWithFirstSubscription"],
    autoDeleteTopicWithLastSubscription: item["autoDeleteTopicWithLastSubscription"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
  };
}

/** Result of the List Domains operation. */
export interface _DomainsListResult {
  /** The Domain items on this page */
  value: Domain[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _domainsListResultDeserializer(item: any): _DomainsListResult {
  return {
    value: domainArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function domainArraySerializer(result: Array<Domain>): any[] {
  return result.map((item) => {
    return domainSerializer(item);
  });
}

export function domainArrayDeserializer(result: Array<Domain>): any[] {
  return result.map((item) => {
    return domainDeserializer(item);
  });
}

/** Shared access keys of the Domain. */
export interface DomainSharedAccessKeys {
  /** Shared access key1 for the domain. */
  key1?: string;
  /** Shared access key2 for the domain. */
  key2?: string;
}

export function domainSharedAccessKeysDeserializer(item: any): DomainSharedAccessKeys {
  return {
    key1: item["key1"],
    key2: item["key2"],
  };
}

/** Domain regenerate share access key request. */
export interface DomainRegenerateKeyRequest {
  /** Key name to regenerate key1 or key2. */
  keyName: string;
}

export function domainRegenerateKeyRequestSerializer(item: DomainRegenerateKeyRequest): any {
  return { keyName: item["keyName"] };
}

/** Domain Topic. */
export interface DomainTopic extends ProxyResource {
  /** Provisioning state of the domain topic. */
  readonly provisioningState?: DomainTopicProvisioningState;
}

export function domainTopicDeserializer(item: any): DomainTopic {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _domainTopicPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the Domain Topic. */
export interface DomainTopicProperties {
  /** Provisioning state of the domain topic. */
  readonly provisioningState?: DomainTopicProvisioningState;
}

export function domainTopicPropertiesDeserializer(item: any): DomainTopicProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the domain topic. */
export enum KnownDomainTopicProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the domain topic. \
 * {@link KnownDomainTopicProvisioningState} can be used interchangeably with DomainTopicProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type DomainTopicProvisioningState = string;

/** Result of the List Domain Topics operation. */
export interface _DomainTopicsListResult {
  /** The DomainTopic items on this page */
  value: DomainTopic[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _domainTopicsListResultDeserializer(item: any): _DomainTopicsListResult {
  return {
    value: domainTopicArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function domainTopicArrayDeserializer(result: Array<DomainTopic>): any[] {
  return result.map((item) => {
    return domainTopicDeserializer(item);
  });
}

/** Result of the List EventSubscriptions operation */
export interface _EventSubscriptionsListResult {
  /** The EventSubscription items on this page */
  value: EventSubscription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _eventSubscriptionsListResultDeserializer(
  item: any,
): _EventSubscriptionsListResult {
  return {
    value: eventSubscriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventSubscriptionArraySerializer(result: Array<EventSubscription>): any[] {
  return result.map((item) => {
    return eventSubscriptionSerializer(item);
  });
}

export function eventSubscriptionArrayDeserializer(result: Array<EventSubscription>): any[] {
  return result.map((item) => {
    return eventSubscriptionDeserializer(item);
  });
}

/** Event Subscription. */
export interface EventSubscription extends ProxyResource {
  /** Name of the topic of the event subscription. */
  readonly topic?: string;
  /** Provisioning state of the event subscription. */
  readonly provisioningState?: EventSubscriptionProvisioningState;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses Azure Event Grid's identity to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  destination?: EventSubscriptionDestinationUnion;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses the managed identity setup on the parent resource (namely, topic or domain) to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deliveryWithResourceIdentity?: DeliveryWithResourceIdentity;
  /** Information about the filter for the event subscription. */
  filter?: EventSubscriptionFilter;
  /** List of user defined labels. */
  labels?: string[];
  /** Expiration time of the event subscription. */
  expirationTimeUtc?: Date;
  /** The event delivery schema for the event subscription. */
  eventDeliverySchema?: EventDeliverySchema;
  /** The retry policy for events. This can be used to configure maximum number of delivery attempts and time to live for events. */
  retryPolicy?: RetryPolicy;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses Azure Event Grid's identity to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deadLetterDestination?: DeadLetterDestinationUnion;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses the managed identity setup on the parent resource (namely, topic or domain) to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deadLetterWithResourceIdentity?: DeadLetterWithResourceIdentity;
}

export function eventSubscriptionSerializer(item: EventSubscription): any {
  return {
    properties: areAllPropsUndefined(item, [
      "destination",
      "deliveryWithResourceIdentity",
      "filter",
      "labels",
      "expirationTimeUtc",
      "eventDeliverySchema",
      "retryPolicy",
      "deadLetterDestination",
      "deadLetterWithResourceIdentity",
    ])
      ? undefined
      : _eventSubscriptionPropertiesSerializer(item),
  };
}

export function eventSubscriptionDeserializer(item: any): EventSubscription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventSubscriptionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the Event Subscription. */
export interface EventSubscriptionProperties {
  /** Name of the topic of the event subscription. */
  readonly topic?: string;
  /** Provisioning state of the event subscription. */
  readonly provisioningState?: EventSubscriptionProvisioningState;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses Azure Event Grid's identity to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  destination?: EventSubscriptionDestinationUnion;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses the managed identity setup on the parent resource (namely, topic or domain) to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deliveryWithResourceIdentity?: DeliveryWithResourceIdentity;
  /** Information about the filter for the event subscription. */
  filter?: EventSubscriptionFilter;
  /** List of user defined labels. */
  labels?: string[];
  /** Expiration time of the event subscription. */
  expirationTimeUtc?: Date;
  /** The event delivery schema for the event subscription. */
  eventDeliverySchema?: EventDeliverySchema;
  /** The retry policy for events. This can be used to configure maximum number of delivery attempts and time to live for events. */
  retryPolicy?: RetryPolicy;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses Azure Event Grid's identity to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deadLetterDestination?: DeadLetterDestinationUnion;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses the managed identity setup on the parent resource (namely, topic or domain) to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deadLetterWithResourceIdentity?: DeadLetterWithResourceIdentity;
}

export function eventSubscriptionPropertiesSerializer(item: EventSubscriptionProperties): any {
  return {
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionSerializer(item["destination"]),
    deliveryWithResourceIdentity: !item["deliveryWithResourceIdentity"]
      ? item["deliveryWithResourceIdentity"]
      : deliveryWithResourceIdentitySerializer(item["deliveryWithResourceIdentity"]),
    filter: !item["filter"] ? item["filter"] : eventSubscriptionFilterSerializer(item["filter"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    eventDeliverySchema: item["eventDeliverySchema"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicySerializer(item["retryPolicy"]),
    deadLetterDestination: !item["deadLetterDestination"]
      ? item["deadLetterDestination"]
      : deadLetterDestinationUnionSerializer(item["deadLetterDestination"]),
    deadLetterWithResourceIdentity: !item["deadLetterWithResourceIdentity"]
      ? item["deadLetterWithResourceIdentity"]
      : deadLetterWithResourceIdentitySerializer(item["deadLetterWithResourceIdentity"]),
  };
}

export function eventSubscriptionPropertiesDeserializer(item: any): EventSubscriptionProperties {
  return {
    topic: item["topic"],
    provisioningState: item["provisioningState"],
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionDeserializer(item["destination"]),
    deliveryWithResourceIdentity: !item["deliveryWithResourceIdentity"]
      ? item["deliveryWithResourceIdentity"]
      : deliveryWithResourceIdentityDeserializer(item["deliveryWithResourceIdentity"]),
    filter: !item["filter"] ? item["filter"] : eventSubscriptionFilterDeserializer(item["filter"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : new Date(item["expirationTimeUtc"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicyDeserializer(item["retryPolicy"]),
    deadLetterDestination: !item["deadLetterDestination"]
      ? item["deadLetterDestination"]
      : deadLetterDestinationUnionDeserializer(item["deadLetterDestination"]),
    deadLetterWithResourceIdentity: !item["deadLetterWithResourceIdentity"]
      ? item["deadLetterWithResourceIdentity"]
      : deadLetterWithResourceIdentityDeserializer(item["deadLetterWithResourceIdentity"]),
  };
}

/** Provisioning state of the event subscription. */
export enum KnownEventSubscriptionProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** AwaitingManualAction */
  AwaitingManualAction = "AwaitingManualAction",
}

/**
 * Provisioning state of the event subscription. \
 * {@link KnownEventSubscriptionProvisioningState} can be used interchangeably with EventSubscriptionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **AwaitingManualAction**: AwaitingManualAction
 */
export type EventSubscriptionProvisioningState = string;

/** Information about the destination for an event subscription. */
export interface EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  /** The discriminator possible values: WebHook, EventHub, StorageQueue, HybridConnection, ServiceBusQueue, ServiceBusTopic, AzureFunction, PartnerDestination, MonitorAlert, NamespaceTopic */
  endpointType: EndpointType;
}

export function eventSubscriptionDestinationSerializer(item: EventSubscriptionDestination): any {
  return { endpointType: item["endpointType"] };
}

export function eventSubscriptionDestinationDeserializer(item: any): EventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
  };
}

/** Alias for EventSubscriptionDestinationUnion */
export type EventSubscriptionDestinationUnion =
  | WebHookEventSubscriptionDestination
  | EventHubEventSubscriptionDestination
  | StorageQueueEventSubscriptionDestination
  | HybridConnectionEventSubscriptionDestination
  | ServiceBusQueueEventSubscriptionDestination
  | ServiceBusTopicEventSubscriptionDestination
  | AzureFunctionEventSubscriptionDestination
  | PartnerEventSubscriptionDestination
  | MonitorAlertEventSubscriptionDestination
  | NamespaceTopicEventSubscriptionDestination
  | EventSubscriptionDestination;

export function eventSubscriptionDestinationUnionSerializer(
  item: EventSubscriptionDestinationUnion,
): any {
  switch (item.endpointType) {
    case "WebHook":
      return webHookEventSubscriptionDestinationSerializer(
        item as WebHookEventSubscriptionDestination,
      );

    case "EventHub":
      return eventHubEventSubscriptionDestinationSerializer(
        item as EventHubEventSubscriptionDestination,
      );

    case "StorageQueue":
      return storageQueueEventSubscriptionDestinationSerializer(
        item as StorageQueueEventSubscriptionDestination,
      );

    case "HybridConnection":
      return hybridConnectionEventSubscriptionDestinationSerializer(
        item as HybridConnectionEventSubscriptionDestination,
      );

    case "ServiceBusQueue":
      return serviceBusQueueEventSubscriptionDestinationSerializer(
        item as ServiceBusQueueEventSubscriptionDestination,
      );

    case "ServiceBusTopic":
      return serviceBusTopicEventSubscriptionDestinationSerializer(
        item as ServiceBusTopicEventSubscriptionDestination,
      );

    case "AzureFunction":
      return azureFunctionEventSubscriptionDestinationSerializer(
        item as AzureFunctionEventSubscriptionDestination,
      );

    case "PartnerDestination":
      return partnerEventSubscriptionDestinationSerializer(
        item as PartnerEventSubscriptionDestination,
      );

    case "MonitorAlert":
      return monitorAlertEventSubscriptionDestinationSerializer(
        item as MonitorAlertEventSubscriptionDestination,
      );

    case "NamespaceTopic":
      return namespaceTopicEventSubscriptionDestinationSerializer(
        item as NamespaceTopicEventSubscriptionDestination,
      );

    default:
      return eventSubscriptionDestinationSerializer(item);
  }
}

export function eventSubscriptionDestinationUnionDeserializer(
  item: any,
): EventSubscriptionDestinationUnion {
  switch (item["endpointType"]) {
    case "WebHook":
      return webHookEventSubscriptionDestinationDeserializer(
        item as WebHookEventSubscriptionDestination,
      );

    case "EventHub":
      return eventHubEventSubscriptionDestinationDeserializer(
        item as EventHubEventSubscriptionDestination,
      );

    case "StorageQueue":
      return storageQueueEventSubscriptionDestinationDeserializer(
        item as StorageQueueEventSubscriptionDestination,
      );

    case "HybridConnection":
      return hybridConnectionEventSubscriptionDestinationDeserializer(
        item as HybridConnectionEventSubscriptionDestination,
      );

    case "ServiceBusQueue":
      return serviceBusQueueEventSubscriptionDestinationDeserializer(
        item as ServiceBusQueueEventSubscriptionDestination,
      );

    case "ServiceBusTopic":
      return serviceBusTopicEventSubscriptionDestinationDeserializer(
        item as ServiceBusTopicEventSubscriptionDestination,
      );

    case "AzureFunction":
      return azureFunctionEventSubscriptionDestinationDeserializer(
        item as AzureFunctionEventSubscriptionDestination,
      );

    case "PartnerDestination":
      return partnerEventSubscriptionDestinationDeserializer(
        item as PartnerEventSubscriptionDestination,
      );

    case "MonitorAlert":
      return monitorAlertEventSubscriptionDestinationDeserializer(
        item as MonitorAlertEventSubscriptionDestination,
      );

    case "NamespaceTopic":
      return namespaceTopicEventSubscriptionDestinationDeserializer(
        item as NamespaceTopicEventSubscriptionDestination,
      );

    default:
      return eventSubscriptionDestinationDeserializer(item);
  }
}

/** Type of the endpoint for the event subscription destination. */
export enum KnownEndpointType {
  /** WebHook */
  WebHook = "WebHook",
  /** EventHub */
  EventHub = "EventHub",
  /** StorageQueue */
  StorageQueue = "StorageQueue",
  /** HybridConnection */
  HybridConnection = "HybridConnection",
  /** ServiceBusQueue */
  ServiceBusQueue = "ServiceBusQueue",
  /** ServiceBusTopic */
  ServiceBusTopic = "ServiceBusTopic",
  /** AzureFunction */
  AzureFunction = "AzureFunction",
  /** PartnerDestination */
  PartnerDestination = "PartnerDestination",
  /** MonitorAlert */
  MonitorAlert = "MonitorAlert",
  /** NamespaceTopic */
  NamespaceTopic = "NamespaceTopic",
}

/**
 * Type of the endpoint for the event subscription destination. \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WebHook**: WebHook \
 * **EventHub**: EventHub \
 * **StorageQueue**: StorageQueue \
 * **HybridConnection**: HybridConnection \
 * **ServiceBusQueue**: ServiceBusQueue \
 * **ServiceBusTopic**: ServiceBusTopic \
 * **AzureFunction**: AzureFunction \
 * **PartnerDestination**: PartnerDestination \
 * **MonitorAlert**: MonitorAlert \
 * **NamespaceTopic**: NamespaceTopic
 */
export type EndpointType = string;

/** Information about the webhook destination for an event subscription. */
export interface WebHookEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "WebHook";
  /** The URL that represents the endpoint of the destination of an event subscription. */
  endpointUrl?: string;
  /** The base URL that represents the endpoint of the destination of an event subscription. */
  readonly endpointBaseUrl?: string;
  /** Maximum number of events per batch. */
  maxEventsPerBatch?: number;
  /** Preferred batch size in Kilobytes. */
  preferredBatchSizeInKilobytes?: number;
  /** The Microsoft Entra ID Tenant ID to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryTenantId?: string;
  /** The Microsoft Entra ID Application ID or URI to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryApplicationIdOrUri?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
  /** Minimum TLS version that should be supported by webhook endpoint */
  minimumTlsVersionAllowed?: TlsVersion;
}

export function webHookEventSubscriptionDestinationSerializer(
  item: WebHookEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, [
      "endpointUrl",
      "maxEventsPerBatch",
      "preferredBatchSizeInKilobytes",
      "azureActiveDirectoryTenantId",
      "azureActiveDirectoryApplicationIdOrUri",
      "deliveryAttributeMappings",
      "minimumTlsVersionAllowed",
    ])
      ? undefined
      : _webHookEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function webHookEventSubscriptionDestinationDeserializer(
  item: any,
): WebHookEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _webHookEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** Information about the webhook destination properties for an event subscription. */
export interface WebHookEventSubscriptionDestinationProperties {
  /** The URL that represents the endpoint of the destination of an event subscription. */
  endpointUrl?: string;
  /** The base URL that represents the endpoint of the destination of an event subscription. */
  readonly endpointBaseUrl?: string;
  /** Maximum number of events per batch. */
  maxEventsPerBatch?: number;
  /** Preferred batch size in Kilobytes. */
  preferredBatchSizeInKilobytes?: number;
  /** The Microsoft Entra ID Tenant ID to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryTenantId?: string;
  /** The Microsoft Entra ID Application ID or URI to get the access token that will be included as the bearer token in delivery requests. */
  azureActiveDirectoryApplicationIdOrUri?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
  /** Minimum TLS version that should be supported by webhook endpoint */
  minimumTlsVersionAllowed?: TlsVersion;
}

export function webHookEventSubscriptionDestinationPropertiesSerializer(
  item: WebHookEventSubscriptionDestinationProperties,
): any {
  return {
    endpointUrl: item["endpointUrl"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
  };
}

export function webHookEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): WebHookEventSubscriptionDestinationProperties {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
  };
}

export function deliveryAttributeMappingUnionArraySerializer(
  result: Array<DeliveryAttributeMappingUnion>,
): any[] {
  return result.map((item) => {
    return deliveryAttributeMappingUnionSerializer(item);
  });
}

export function deliveryAttributeMappingUnionArrayDeserializer(
  result: Array<DeliveryAttributeMappingUnion>,
): any[] {
  return result.map((item) => {
    return deliveryAttributeMappingUnionDeserializer(item);
  });
}

/** Delivery attribute mapping details. */
export interface DeliveryAttributeMapping {
  /** Name of the delivery attribute or header. */
  name?: string;
  /** Type of the delivery attribute or header name. */
  /** The discriminator possible values: Static, Dynamic */
  type: DeliveryAttributeMappingType;
}

export function deliveryAttributeMappingSerializer(item: DeliveryAttributeMapping): any {
  return { name: item["name"], type: item["type"] };
}

export function deliveryAttributeMappingDeserializer(item: any): DeliveryAttributeMapping {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** Alias for DeliveryAttributeMappingUnion */
export type DeliveryAttributeMappingUnion =
  | StaticDeliveryAttributeMapping
  | DynamicDeliveryAttributeMapping
  | DeliveryAttributeMapping;

export function deliveryAttributeMappingUnionSerializer(item: DeliveryAttributeMappingUnion): any {
  switch (item.type) {
    case "Static":
      return staticDeliveryAttributeMappingSerializer(item as StaticDeliveryAttributeMapping);

    case "Dynamic":
      return dynamicDeliveryAttributeMappingSerializer(item as DynamicDeliveryAttributeMapping);

    default:
      return deliveryAttributeMappingSerializer(item);
  }
}

export function deliveryAttributeMappingUnionDeserializer(
  item: any,
): DeliveryAttributeMappingUnion {
  switch (item["type"]) {
    case "Static":
      return staticDeliveryAttributeMappingDeserializer(item as StaticDeliveryAttributeMapping);

    case "Dynamic":
      return dynamicDeliveryAttributeMappingDeserializer(item as DynamicDeliveryAttributeMapping);

    default:
      return deliveryAttributeMappingDeserializer(item);
  }
}

/** Type of the delivery attribute or header name. */
export enum KnownDeliveryAttributeMappingType {
  /** Static */
  Static = "Static",
  /** Dynamic */
  Dynamic = "Dynamic",
}

/**
 * Type of the delivery attribute or header name. \
 * {@link KnownDeliveryAttributeMappingType} can be used interchangeably with DeliveryAttributeMappingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static**: Static \
 * **Dynamic**: Dynamic
 */
export type DeliveryAttributeMappingType = string;

/** Static delivery attribute mapping details. */
export interface StaticDeliveryAttributeMapping extends DeliveryAttributeMapping {
  /** Type of the delivery attribute or header name. */
  type: "Static";
  /** Value of the delivery attribute. */
  value?: string;
  /** Boolean flag to tell if the attribute contains sensitive information . */
  isSecret?: boolean;
}

export function staticDeliveryAttributeMappingSerializer(
  item: StaticDeliveryAttributeMapping,
): any {
  return {
    name: item["name"],
    type: item["type"],
    properties: areAllPropsUndefined(item, ["value", "isSecret"])
      ? undefined
      : _staticDeliveryAttributeMappingPropertiesSerializer(item),
  };
}

export function staticDeliveryAttributeMappingDeserializer(
  item: any,
): StaticDeliveryAttributeMapping {
  return {
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _staticDeliveryAttributeMappingPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of static delivery attribute mapping. */
export interface StaticDeliveryAttributeMappingProperties {
  /** Value of the delivery attribute. */
  value?: string;
  /** Boolean flag to tell if the attribute contains sensitive information . */
  isSecret?: boolean;
}

export function staticDeliveryAttributeMappingPropertiesSerializer(
  item: StaticDeliveryAttributeMappingProperties,
): any {
  return { value: item["value"], isSecret: item["isSecret"] };
}

export function staticDeliveryAttributeMappingPropertiesDeserializer(
  item: any,
): StaticDeliveryAttributeMappingProperties {
  return {
    value: item["value"],
    isSecret: item["isSecret"],
  };
}

/** Dynamic delivery attribute mapping details. */
export interface DynamicDeliveryAttributeMapping extends DeliveryAttributeMapping {
  /** Type of the delivery attribute or header name. */
  type: "Dynamic";
  /** JSON path in the event which contains attribute value. */
  sourceField?: string;
}

export function dynamicDeliveryAttributeMappingSerializer(
  item: DynamicDeliveryAttributeMapping,
): any {
  return {
    name: item["name"],
    type: item["type"],
    properties: areAllPropsUndefined(item, ["sourceField"])
      ? undefined
      : _dynamicDeliveryAttributeMappingPropertiesSerializer(item),
  };
}

export function dynamicDeliveryAttributeMappingDeserializer(
  item: any,
): DynamicDeliveryAttributeMapping {
  return {
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _dynamicDeliveryAttributeMappingPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of dynamic delivery attribute mapping. */
export interface DynamicDeliveryAttributeMappingProperties {
  /** JSON path in the event which contains attribute value. */
  sourceField?: string;
}

export function dynamicDeliveryAttributeMappingPropertiesSerializer(
  item: DynamicDeliveryAttributeMappingProperties,
): any {
  return { sourceField: item["sourceField"] };
}

export function dynamicDeliveryAttributeMappingPropertiesDeserializer(
  item: any,
): DynamicDeliveryAttributeMappingProperties {
  return {
    sourceField: item["sourceField"],
  };
}

/** Information about the event hub destination for an event subscription. */
export interface EventHubEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "EventHub";
  /** The Azure Resource Id that represents the endpoint of an Event Hub destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function eventHubEventSubscriptionDestinationSerializer(
  item: EventHubEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["resourceId", "deliveryAttributeMappings"])
      ? undefined
      : _eventHubEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function eventHubEventSubscriptionDestinationDeserializer(
  item: any,
): EventHubEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _eventHubEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties for a event hub destination. */
export interface EventHubEventSubscriptionDestinationProperties {
  /** The Azure Resource Id that represents the endpoint of an Event Hub destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function eventHubEventSubscriptionDestinationPropertiesSerializer(
  item: EventHubEventSubscriptionDestinationProperties,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function eventHubEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): EventHubEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

/** Information about the storage queue destination for an event subscription. */
export interface StorageQueueEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "StorageQueue";
  /** The Azure Resource ID of the storage account that contains the queue that is the destination of an event subscription. */
  resourceId?: string;
  /** The name of the Storage queue under a storage account that is the destination of an event subscription. */
  queueName?: string;
  /** Storage queue message time to live in seconds. This value cannot be zero or negative with the exception of using -1 to indicate that the Time To Live of the message is Infinite. */
  queueMessageTimeToLiveInSeconds?: number;
}

export function storageQueueEventSubscriptionDestinationSerializer(
  item: StorageQueueEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, [
      "resourceId",
      "queueName",
      "queueMessageTimeToLiveInSeconds",
    ])
      ? undefined
      : _storageQueueEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function storageQueueEventSubscriptionDestinationDeserializer(
  item: any,
): StorageQueueEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _storageQueueEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties for a storage queue destination. */
export interface StorageQueueEventSubscriptionDestinationProperties {
  /** The Azure Resource ID of the storage account that contains the queue that is the destination of an event subscription. */
  resourceId?: string;
  /** The name of the Storage queue under a storage account that is the destination of an event subscription. */
  queueName?: string;
  /** Storage queue message time to live in seconds. This value cannot be zero or negative with the exception of using -1 to indicate that the Time To Live of the message is Infinite. */
  queueMessageTimeToLiveInSeconds?: number;
}

export function storageQueueEventSubscriptionDestinationPropertiesSerializer(
  item: StorageQueueEventSubscriptionDestinationProperties,
): any {
  return {
    resourceId: item["resourceId"],
    queueName: item["queueName"],
    queueMessageTimeToLiveInSeconds: item["queueMessageTimeToLiveInSeconds"],
  };
}

export function storageQueueEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): StorageQueueEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
    queueName: item["queueName"],
    queueMessageTimeToLiveInSeconds: item["queueMessageTimeToLiveInSeconds"],
  };
}

/** Information about the HybridConnection destination for an event subscription. */
export interface HybridConnectionEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "HybridConnection";
  /** The Azure Resource ID of an hybrid connection that is the destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function hybridConnectionEventSubscriptionDestinationSerializer(
  item: HybridConnectionEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["resourceId", "deliveryAttributeMappings"])
      ? undefined
      : _hybridConnectionEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function hybridConnectionEventSubscriptionDestinationDeserializer(
  item: any,
): HybridConnectionEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _hybridConnectionEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties for a hybrid connection destination. */
export interface HybridConnectionEventSubscriptionDestinationProperties {
  /** The Azure Resource ID of an hybrid connection that is the destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function hybridConnectionEventSubscriptionDestinationPropertiesSerializer(
  item: HybridConnectionEventSubscriptionDestinationProperties,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function hybridConnectionEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): HybridConnectionEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

/** Information about the service bus destination for an event subscription. */
export interface ServiceBusQueueEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "ServiceBusQueue";
  /** The Azure Resource Id that represents the endpoint of the Service Bus destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function serviceBusQueueEventSubscriptionDestinationSerializer(
  item: ServiceBusQueueEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["resourceId", "deliveryAttributeMappings"])
      ? undefined
      : _serviceBusQueueEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function serviceBusQueueEventSubscriptionDestinationDeserializer(
  item: any,
): ServiceBusQueueEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _serviceBusQueueEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that represent the Service Bus destination of an event subscription. */
export interface ServiceBusQueueEventSubscriptionDestinationProperties {
  /** The Azure Resource Id that represents the endpoint of the Service Bus destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function serviceBusQueueEventSubscriptionDestinationPropertiesSerializer(
  item: ServiceBusQueueEventSubscriptionDestinationProperties,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function serviceBusQueueEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): ServiceBusQueueEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

/** Information about the service bus topic destination for an event subscription. */
export interface ServiceBusTopicEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "ServiceBusTopic";
  /** The Azure Resource Id that represents the endpoint of the Service Bus Topic destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function serviceBusTopicEventSubscriptionDestinationSerializer(
  item: ServiceBusTopicEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["resourceId", "deliveryAttributeMappings"])
      ? undefined
      : _serviceBusTopicEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function serviceBusTopicEventSubscriptionDestinationDeserializer(
  item: any,
): ServiceBusTopicEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _serviceBusTopicEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that represent the Service Bus Topic destination of an event subscription. */
export interface ServiceBusTopicEventSubscriptionDestinationProperties {
  /** The Azure Resource Id that represents the endpoint of the Service Bus Topic destination of an event subscription. */
  resourceId?: string;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function serviceBusTopicEventSubscriptionDestinationPropertiesSerializer(
  item: ServiceBusTopicEventSubscriptionDestinationProperties,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function serviceBusTopicEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): ServiceBusTopicEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

/** Information about the azure function destination for an event subscription. */
export interface AzureFunctionEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "AzureFunction";
  /** The Azure Resource Id that represents the endpoint of the Azure Function destination of an event subscription. */
  resourceId?: string;
  /** Maximum number of events per batch. */
  maxEventsPerBatch?: number;
  /** Preferred batch size in Kilobytes. */
  preferredBatchSizeInKilobytes?: number;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function azureFunctionEventSubscriptionDestinationSerializer(
  item: AzureFunctionEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, [
      "resourceId",
      "maxEventsPerBatch",
      "preferredBatchSizeInKilobytes",
      "deliveryAttributeMappings",
    ])
      ? undefined
      : _azureFunctionEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function azureFunctionEventSubscriptionDestinationDeserializer(
  item: any,
): AzureFunctionEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _azureFunctionEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that represent the Azure Function destination of an event subscription. */
export interface AzureFunctionEventSubscriptionDestinationProperties {
  /** The Azure Resource Id that represents the endpoint of the Azure Function destination of an event subscription. */
  resourceId?: string;
  /** Maximum number of events per batch. */
  maxEventsPerBatch?: number;
  /** Preferred batch size in Kilobytes. */
  preferredBatchSizeInKilobytes?: number;
  /** Delivery attribute details. */
  deliveryAttributeMappings?: DeliveryAttributeMappingUnion[];
}

export function azureFunctionEventSubscriptionDestinationPropertiesSerializer(
  item: AzureFunctionEventSubscriptionDestinationProperties,
): any {
  return {
    resourceId: item["resourceId"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function azureFunctionEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): AzureFunctionEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

/** model interface PartnerEventSubscriptionDestination */
export interface PartnerEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "PartnerDestination";
  /** The Azure Resource Id that represents the endpoint of a Partner Destination of an event subscription. */
  resourceId?: string;
}

export function partnerEventSubscriptionDestinationSerializer(
  item: PartnerEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["resourceId"])
      ? undefined
      : _partnerEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function partnerEventSubscriptionDestinationDeserializer(
  item: any,
): PartnerEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _partnerEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** model interface PartnerEventSubscriptionDestinationProperties */
export interface PartnerEventSubscriptionDestinationProperties {
  /** The Azure Resource Id that represents the endpoint of a Partner Destination of an event subscription. */
  resourceId?: string;
}

export function partnerEventSubscriptionDestinationPropertiesSerializer(
  item: PartnerEventSubscriptionDestinationProperties,
): any {
  return { resourceId: item["resourceId"] };
}

export function partnerEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): PartnerEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
  };
}

/** Information about the Monitor Alert destination for an event subscription. */
export interface MonitorAlertEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "MonitorAlert";
  /**
   * The severity that will be attached to every Alert fired through this event subscription.
   * This field must be provided.
   */
  severity?: MonitorAlertSeverity;
  /** The description that will be attached to every Alert fired through this event subscription. */
  description?: string;
  /**
   * The list of ARM Ids of Action Groups that will be triggered on every Alert fired through this event subscription.
   * Each resource ARM Id should follow this pattern: /subscriptions/{AzureSubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Insights/actionGroups/{ActionGroupName}.
   */
  actionGroups?: string[];
}

export function monitorAlertEventSubscriptionDestinationSerializer(
  item: MonitorAlertEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["severity", "description", "actionGroups"])
      ? undefined
      : _monitorAlertEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function monitorAlertEventSubscriptionDestinationDeserializer(
  item: any,
): MonitorAlertEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _monitorAlertEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that represent the Monitor Alert destination of an event subscription. */
export interface MonitorAlertEventSubscriptionDestinationProperties {
  /**
   * The severity that will be attached to every Alert fired through this event subscription.
   * This field must be provided.
   */
  severity?: MonitorAlertSeverity;
  /** The description that will be attached to every Alert fired through this event subscription. */
  description?: string;
  /**
   * The list of ARM Ids of Action Groups that will be triggered on every Alert fired through this event subscription.
   * Each resource ARM Id should follow this pattern: /subscriptions/{AzureSubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Insights/actionGroups/{ActionGroupName}.
   */
  actionGroups?: string[];
}

export function monitorAlertEventSubscriptionDestinationPropertiesSerializer(
  item: MonitorAlertEventSubscriptionDestinationProperties,
): any {
  return {
    severity: item["severity"],
    description: item["description"],
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : item["actionGroups"].map((p: any) => {
          return p;
        }),
  };
}

export function monitorAlertEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): MonitorAlertEventSubscriptionDestinationProperties {
  return {
    severity: item["severity"],
    description: item["description"],
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : item["actionGroups"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * The severity that will be attached to every Alert fired through this event subscription.
 * This field must be provided.
 */
export enum KnownMonitorAlertSeverity {
  /** Sev0 */
  Sev0 = "Sev0",
  /** Sev1 */
  Sev1 = "Sev1",
  /** Sev2 */
  Sev2 = "Sev2",
  /** Sev3 */
  Sev3 = "Sev3",
  /** Sev4 */
  Sev4 = "Sev4",
}

/**
 * The severity that will be attached to every Alert fired through this event subscription.
 * This field must be provided. \
 * {@link KnownMonitorAlertSeverity} can be used interchangeably with MonitorAlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sev0**: Sev0 \
 * **Sev1**: Sev1 \
 * **Sev2**: Sev2 \
 * **Sev3**: Sev3 \
 * **Sev4**: Sev4
 */
export type MonitorAlertSeverity = string;

/** Information about the Namespace Topic destination for an event subscription. */
export interface NamespaceTopicEventSubscriptionDestination extends EventSubscriptionDestination {
  /** Type of the endpoint for the event subscription destination. */
  endpointType: "NamespaceTopic";
  /**
   * The Azure resource Id that represents the endpoint of the Event Grid Namespace Topic destination of an event subscription.
   * This field is required and the Namespace Topic resource listed must already exist.
   * The resource ARM Id should follow this pattern: /subscriptions/{AzureSubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.EventGrid/namespaces/{NamespaceName}/topics/{TopicName}.
   */
  resourceId?: string;
}

export function namespaceTopicEventSubscriptionDestinationSerializer(
  item: NamespaceTopicEventSubscriptionDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["resourceId"])
      ? undefined
      : _namespaceTopicEventSubscriptionDestinationPropertiesSerializer(item),
  };
}

export function namespaceTopicEventSubscriptionDestinationDeserializer(
  item: any,
): NamespaceTopicEventSubscriptionDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _namespaceTopicEventSubscriptionDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that represent the Event Grid Namespace Topic destination of an event subscription. */
export interface NamespaceTopicEventSubscriptionDestinationProperties {
  /**
   * The Azure resource Id that represents the endpoint of the Event Grid Namespace Topic destination of an event subscription.
   * This field is required and the Namespace Topic resource listed must already exist.
   * The resource ARM Id should follow this pattern: /subscriptions/{AzureSubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.EventGrid/namespaces/{NamespaceName}/topics/{TopicName}.
   */
  resourceId?: string;
}

export function namespaceTopicEventSubscriptionDestinationPropertiesSerializer(
  item: NamespaceTopicEventSubscriptionDestinationProperties,
): any {
  return { resourceId: item["resourceId"] };
}

export function namespaceTopicEventSubscriptionDestinationPropertiesDeserializer(
  item: any,
): NamespaceTopicEventSubscriptionDestinationProperties {
  return {
    resourceId: item["resourceId"],
  };
}

/** Information about the delivery for an event subscription with resource identity. */
export interface DeliveryWithResourceIdentity {
  /** The identity to use when delivering events. */
  identity?: EventSubscriptionIdentity;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses the managed identity setup on the parent resource (namely, topic or domain) to acquire the authentication tokens being used during delivery.
   */
  destination?: EventSubscriptionDestinationUnion;
}

export function deliveryWithResourceIdentitySerializer(item: DeliveryWithResourceIdentity): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : eventSubscriptionIdentitySerializer(item["identity"]),
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionSerializer(item["destination"]),
  };
}

export function deliveryWithResourceIdentityDeserializer(item: any): DeliveryWithResourceIdentity {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : eventSubscriptionIdentityDeserializer(item["identity"]),
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionDeserializer(item["destination"]),
  };
}

/** The identity information with the event subscription. */
export interface EventSubscriptionIdentity {
  /** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
  type?: EventSubscriptionIdentityType;
  /** The user identity associated with the resource. */
  userAssignedIdentity?: string;
  /** The details of the Federated Identity Credential (FIC) used with the resource delivery. */
  federatedIdentityCredentialInfo?: FederatedIdentityCredentialInfo;
}

export function eventSubscriptionIdentitySerializer(item: EventSubscriptionIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
    federatedIdentityCredentialInfo: !item["federatedIdentityCredentialInfo"]
      ? item["federatedIdentityCredentialInfo"]
      : federatedIdentityCredentialInfoSerializer(item["federatedIdentityCredentialInfo"]),
  };
}

export function eventSubscriptionIdentityDeserializer(item: any): EventSubscriptionIdentity {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
    federatedIdentityCredentialInfo: !item["federatedIdentityCredentialInfo"]
      ? item["federatedIdentityCredentialInfo"]
      : federatedIdentityCredentialInfoDeserializer(item["federatedIdentityCredentialInfo"]),
  };
}

/** The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. */
export enum KnownEventSubscriptionIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The type of managed identity used. Can be either 'SystemAssigned' or 'UserAssigned'. \
 * {@link KnownEventSubscriptionIdentityType} can be used interchangeably with EventSubscriptionIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type EventSubscriptionIdentityType = string;

/** The details of the Federated Identity Credential (FIC) used with the resource. */
export interface FederatedIdentityCredentialInfo {
  /** The Multi-Tenant Microsoft Entra ID Application where the Federated Identity Credential (FIC) is associated with. */
  federatedClientId: string;
}

export function federatedIdentityCredentialInfoSerializer(
  item: FederatedIdentityCredentialInfo,
): any {
  return { federatedClientId: item["federatedClientId"] };
}

export function federatedIdentityCredentialInfoDeserializer(
  item: any,
): FederatedIdentityCredentialInfo {
  return {
    federatedClientId: item["federatedClientId"],
  };
}

/** Filter for the Event Subscription. */
export interface EventSubscriptionFilter {
  /**
   * An optional string to filter events for an event subscription based on a resource path prefix.
   * The format of this depends on the publisher of the events.
   * Wildcard characters are not supported in this path.
   */
  subjectBeginsWith?: string;
  /**
   * An optional string to filter events for an event subscription based on a resource path suffix.
   * Wildcard characters are not supported in this path.
   */
  subjectEndsWith?: string;
  /** A list of applicable event types that need to be part of the event subscription. If it is desired to subscribe to all default event types, set the IncludedEventTypes to null. */
  includedEventTypes?: string[];
  /**
   * Specifies if the SubjectBeginsWith and SubjectEndsWith properties of the filter
   * should be compared in a case sensitive manner.
   */
  isSubjectCaseSensitive?: boolean;
  /** Allows advanced filters to be evaluated against an array of values instead of expecting a singular value. */
  enableAdvancedFilteringOnArrays?: boolean;
  /** An array of advanced filters that are used for filtering event subscriptions. */
  advancedFilters?: AdvancedFilterUnion[];
}

export function eventSubscriptionFilterSerializer(item: EventSubscriptionFilter): any {
  return {
    subjectBeginsWith: item["subjectBeginsWith"],
    subjectEndsWith: item["subjectEndsWith"],
    includedEventTypes: !item["includedEventTypes"]
      ? item["includedEventTypes"]
      : item["includedEventTypes"].map((p: any) => {
          return p;
        }),
    isSubjectCaseSensitive: item["isSubjectCaseSensitive"],
    enableAdvancedFilteringOnArrays: item["enableAdvancedFilteringOnArrays"],
    advancedFilters: !item["advancedFilters"]
      ? item["advancedFilters"]
      : advancedFilterUnionArraySerializer(item["advancedFilters"]),
  };
}

export function eventSubscriptionFilterDeserializer(item: any): EventSubscriptionFilter {
  return {
    subjectBeginsWith: item["subjectBeginsWith"],
    subjectEndsWith: item["subjectEndsWith"],
    includedEventTypes: !item["includedEventTypes"]
      ? item["includedEventTypes"]
      : item["includedEventTypes"].map((p: any) => {
          return p;
        }),
    isSubjectCaseSensitive: item["isSubjectCaseSensitive"],
    enableAdvancedFilteringOnArrays: item["enableAdvancedFilteringOnArrays"],
    advancedFilters: !item["advancedFilters"]
      ? item["advancedFilters"]
      : advancedFilterUnionArrayDeserializer(item["advancedFilters"]),
  };
}

export function advancedFilterUnionArraySerializer(result: Array<AdvancedFilterUnion>): any[] {
  return result.map((item) => {
    return advancedFilterUnionSerializer(item);
  });
}

export function advancedFilterUnionArrayDeserializer(result: Array<AdvancedFilterUnion>): any[] {
  return result.map((item) => {
    return advancedFilterUnionDeserializer(item);
  });
}

/** This is the base type that represents an advanced filter. To configure an advanced filter, do not directly instantiate an object of this class. Instead, instantiate an object of a derived class such as BoolEqualsAdvancedFilter, NumberInAdvancedFilter, StringEqualsAdvancedFilter etc. depending on the type of the key based on which you want to filter. */
export interface AdvancedFilter {
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  /** The discriminator possible values: NumberIn, NumberNotIn, NumberLessThan, NumberGreaterThan, NumberLessThanOrEquals, NumberGreaterThanOrEquals, BoolEquals, StringIn, StringNotIn, StringBeginsWith, StringEndsWith, StringContains, NumberInRange, NumberNotInRange, StringNotBeginsWith, StringNotEndsWith, StringNotContains, IsNullOrUndefined, IsNotNull */
  operatorType: AdvancedFilterOperatorType;
  /** The field/property in the event based on which you want to filter. */
  key?: string;
}

export function advancedFilterSerializer(item: AdvancedFilter): any {
  return { operatorType: item["operatorType"], key: item["key"] };
}

export function advancedFilterDeserializer(item: any): AdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
  };
}

/** Alias for AdvancedFilterUnion */
export type AdvancedFilterUnion =
  | NumberInAdvancedFilter
  | NumberNotInAdvancedFilter
  | NumberLessThanAdvancedFilter
  | NumberGreaterThanAdvancedFilter
  | NumberLessThanOrEqualsAdvancedFilter
  | NumberGreaterThanOrEqualsAdvancedFilter
  | BoolEqualsAdvancedFilter
  | StringInAdvancedFilter
  | StringNotInAdvancedFilter
  | StringBeginsWithAdvancedFilter
  | StringEndsWithAdvancedFilter
  | StringContainsAdvancedFilter
  | NumberInRangeAdvancedFilter
  | NumberNotInRangeAdvancedFilter
  | StringNotBeginsWithAdvancedFilter
  | StringNotEndsWithAdvancedFilter
  | StringNotContainsAdvancedFilter
  | IsNullOrUndefinedAdvancedFilter
  | IsNotNullAdvancedFilter
  | AdvancedFilter;

export function advancedFilterUnionSerializer(item: AdvancedFilterUnion): any {
  switch (item.operatorType) {
    case "NumberIn":
      return numberInAdvancedFilterSerializer(item as NumberInAdvancedFilter);

    case "NumberNotIn":
      return numberNotInAdvancedFilterSerializer(item as NumberNotInAdvancedFilter);

    case "NumberLessThan":
      return numberLessThanAdvancedFilterSerializer(item as NumberLessThanAdvancedFilter);

    case "NumberGreaterThan":
      return numberGreaterThanAdvancedFilterSerializer(item as NumberGreaterThanAdvancedFilter);

    case "NumberLessThanOrEquals":
      return numberLessThanOrEqualsAdvancedFilterSerializer(
        item as NumberLessThanOrEqualsAdvancedFilter,
      );

    case "NumberGreaterThanOrEquals":
      return numberGreaterThanOrEqualsAdvancedFilterSerializer(
        item as NumberGreaterThanOrEqualsAdvancedFilter,
      );

    case "BoolEquals":
      return boolEqualsAdvancedFilterSerializer(item as BoolEqualsAdvancedFilter);

    case "StringIn":
      return stringInAdvancedFilterSerializer(item as StringInAdvancedFilter);

    case "StringNotIn":
      return stringNotInAdvancedFilterSerializer(item as StringNotInAdvancedFilter);

    case "StringBeginsWith":
      return stringBeginsWithAdvancedFilterSerializer(item as StringBeginsWithAdvancedFilter);

    case "StringEndsWith":
      return stringEndsWithAdvancedFilterSerializer(item as StringEndsWithAdvancedFilter);

    case "StringContains":
      return stringContainsAdvancedFilterSerializer(item as StringContainsAdvancedFilter);

    case "NumberInRange":
      return numberInRangeAdvancedFilterSerializer(item as NumberInRangeAdvancedFilter);

    case "NumberNotInRange":
      return numberNotInRangeAdvancedFilterSerializer(item as NumberNotInRangeAdvancedFilter);

    case "StringNotBeginsWith":
      return stringNotBeginsWithAdvancedFilterSerializer(item as StringNotBeginsWithAdvancedFilter);

    case "StringNotEndsWith":
      return stringNotEndsWithAdvancedFilterSerializer(item as StringNotEndsWithAdvancedFilter);

    case "StringNotContains":
      return stringNotContainsAdvancedFilterSerializer(item as StringNotContainsAdvancedFilter);

    case "IsNullOrUndefined":
      return isNullOrUndefinedAdvancedFilterSerializer(item as IsNullOrUndefinedAdvancedFilter);

    case "IsNotNull":
      return isNotNullAdvancedFilterSerializer(item as IsNotNullAdvancedFilter);

    default:
      return advancedFilterSerializer(item);
  }
}

export function advancedFilterUnionDeserializer(item: any): AdvancedFilterUnion {
  switch (item["operatorType"]) {
    case "NumberIn":
      return numberInAdvancedFilterDeserializer(item as NumberInAdvancedFilter);

    case "NumberNotIn":
      return numberNotInAdvancedFilterDeserializer(item as NumberNotInAdvancedFilter);

    case "NumberLessThan":
      return numberLessThanAdvancedFilterDeserializer(item as NumberLessThanAdvancedFilter);

    case "NumberGreaterThan":
      return numberGreaterThanAdvancedFilterDeserializer(item as NumberGreaterThanAdvancedFilter);

    case "NumberLessThanOrEquals":
      return numberLessThanOrEqualsAdvancedFilterDeserializer(
        item as NumberLessThanOrEqualsAdvancedFilter,
      );

    case "NumberGreaterThanOrEquals":
      return numberGreaterThanOrEqualsAdvancedFilterDeserializer(
        item as NumberGreaterThanOrEqualsAdvancedFilter,
      );

    case "BoolEquals":
      return boolEqualsAdvancedFilterDeserializer(item as BoolEqualsAdvancedFilter);

    case "StringIn":
      return stringInAdvancedFilterDeserializer(item as StringInAdvancedFilter);

    case "StringNotIn":
      return stringNotInAdvancedFilterDeserializer(item as StringNotInAdvancedFilter);

    case "StringBeginsWith":
      return stringBeginsWithAdvancedFilterDeserializer(item as StringBeginsWithAdvancedFilter);

    case "StringEndsWith":
      return stringEndsWithAdvancedFilterDeserializer(item as StringEndsWithAdvancedFilter);

    case "StringContains":
      return stringContainsAdvancedFilterDeserializer(item as StringContainsAdvancedFilter);

    case "NumberInRange":
      return numberInRangeAdvancedFilterDeserializer(item as NumberInRangeAdvancedFilter);

    case "NumberNotInRange":
      return numberNotInRangeAdvancedFilterDeserializer(item as NumberNotInRangeAdvancedFilter);

    case "StringNotBeginsWith":
      return stringNotBeginsWithAdvancedFilterDeserializer(
        item as StringNotBeginsWithAdvancedFilter,
      );

    case "StringNotEndsWith":
      return stringNotEndsWithAdvancedFilterDeserializer(item as StringNotEndsWithAdvancedFilter);

    case "StringNotContains":
      return stringNotContainsAdvancedFilterDeserializer(item as StringNotContainsAdvancedFilter);

    case "IsNullOrUndefined":
      return isNullOrUndefinedAdvancedFilterDeserializer(item as IsNullOrUndefinedAdvancedFilter);

    case "IsNotNull":
      return isNotNullAdvancedFilterDeserializer(item as IsNotNullAdvancedFilter);

    default:
      return advancedFilterDeserializer(item);
  }
}

/** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
export enum KnownAdvancedFilterOperatorType {
  /** NumberIn */
  NumberIn = "NumberIn",
  /** NumberNotIn */
  NumberNotIn = "NumberNotIn",
  /** NumberLessThan */
  NumberLessThan = "NumberLessThan",
  /** NumberGreaterThan */
  NumberGreaterThan = "NumberGreaterThan",
  /** NumberLessThanOrEquals */
  NumberLessThanOrEquals = "NumberLessThanOrEquals",
  /** NumberGreaterThanOrEquals */
  NumberGreaterThanOrEquals = "NumberGreaterThanOrEquals",
  /** BoolEquals */
  BoolEquals = "BoolEquals",
  /** StringIn */
  StringIn = "StringIn",
  /** StringNotIn */
  StringNotIn = "StringNotIn",
  /** StringBeginsWith */
  StringBeginsWith = "StringBeginsWith",
  /** StringEndsWith */
  StringEndsWith = "StringEndsWith",
  /** StringContains */
  StringContains = "StringContains",
  /** NumberInRange */
  NumberInRange = "NumberInRange",
  /** NumberNotInRange */
  NumberNotInRange = "NumberNotInRange",
  /** StringNotBeginsWith */
  StringNotBeginsWith = "StringNotBeginsWith",
  /** StringNotEndsWith */
  StringNotEndsWith = "StringNotEndsWith",
  /** StringNotContains */
  StringNotContains = "StringNotContains",
  /** IsNullOrUndefined */
  IsNullOrUndefined = "IsNullOrUndefined",
  /** IsNotNull */
  IsNotNull = "IsNotNull",
}

/**
 * The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. \
 * {@link KnownAdvancedFilterOperatorType} can be used interchangeably with AdvancedFilterOperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NumberIn**: NumberIn \
 * **NumberNotIn**: NumberNotIn \
 * **NumberLessThan**: NumberLessThan \
 * **NumberGreaterThan**: NumberGreaterThan \
 * **NumberLessThanOrEquals**: NumberLessThanOrEquals \
 * **NumberGreaterThanOrEquals**: NumberGreaterThanOrEquals \
 * **BoolEquals**: BoolEquals \
 * **StringIn**: StringIn \
 * **StringNotIn**: StringNotIn \
 * **StringBeginsWith**: StringBeginsWith \
 * **StringEndsWith**: StringEndsWith \
 * **StringContains**: StringContains \
 * **NumberInRange**: NumberInRange \
 * **NumberNotInRange**: NumberNotInRange \
 * **StringNotBeginsWith**: StringNotBeginsWith \
 * **StringNotEndsWith**: StringNotEndsWith \
 * **StringNotContains**: StringNotContains \
 * **IsNullOrUndefined**: IsNullOrUndefined \
 * **IsNotNull**: IsNotNull
 */
export type AdvancedFilterOperatorType = string;

/** NumberIn Advanced Filter. */
export interface NumberInAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: number[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberIn";
}

export function numberInAdvancedFilterSerializer(item: NumberInAdvancedFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function numberInAdvancedFilterDeserializer(item: any): NumberInAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** NumberNotIn Advanced Filter. */
export interface NumberNotInAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: number[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberNotIn";
}

export function numberNotInAdvancedFilterSerializer(item: NumberNotInAdvancedFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function numberNotInAdvancedFilterDeserializer(item: any): NumberNotInAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** NumberLessThan Advanced Filter. */
export interface NumberLessThanAdvancedFilter extends AdvancedFilter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberLessThan";
}

export function numberLessThanAdvancedFilterSerializer(item: NumberLessThanAdvancedFilter): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberLessThanAdvancedFilterDeserializer(item: any): NumberLessThanAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** NumberGreaterThan Advanced Filter. */
export interface NumberGreaterThanAdvancedFilter extends AdvancedFilter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberGreaterThan";
}

export function numberGreaterThanAdvancedFilterSerializer(
  item: NumberGreaterThanAdvancedFilter,
): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberGreaterThanAdvancedFilterDeserializer(
  item: any,
): NumberGreaterThanAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** NumberLessThanOrEquals Advanced Filter. */
export interface NumberLessThanOrEqualsAdvancedFilter extends AdvancedFilter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberLessThanOrEquals";
}

export function numberLessThanOrEqualsAdvancedFilterSerializer(
  item: NumberLessThanOrEqualsAdvancedFilter,
): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberLessThanOrEqualsAdvancedFilterDeserializer(
  item: any,
): NumberLessThanOrEqualsAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** NumberGreaterThanOrEquals Advanced Filter. */
export interface NumberGreaterThanOrEqualsAdvancedFilter extends AdvancedFilter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberGreaterThanOrEquals";
}

export function numberGreaterThanOrEqualsAdvancedFilterSerializer(
  item: NumberGreaterThanOrEqualsAdvancedFilter,
): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberGreaterThanOrEqualsAdvancedFilterDeserializer(
  item: any,
): NumberGreaterThanOrEqualsAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** BoolEquals Advanced Filter. */
export interface BoolEqualsAdvancedFilter extends AdvancedFilter {
  /** The boolean filter value. */
  value?: boolean;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "BoolEquals";
}

export function boolEqualsAdvancedFilterSerializer(item: BoolEqualsAdvancedFilter): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function boolEqualsAdvancedFilterDeserializer(item: any): BoolEqualsAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** StringIn Advanced Filter. */
export interface StringInAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringIn";
}

export function stringInAdvancedFilterSerializer(item: StringInAdvancedFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringInAdvancedFilterDeserializer(item: any): StringInAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringNotIn Advanced Filter. */
export interface StringNotInAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotIn";
}

export function stringNotInAdvancedFilterSerializer(item: StringNotInAdvancedFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotInAdvancedFilterDeserializer(item: any): StringNotInAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringBeginsWith Advanced Filter. */
export interface StringBeginsWithAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringBeginsWith";
}

export function stringBeginsWithAdvancedFilterSerializer(
  item: StringBeginsWithAdvancedFilter,
): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringBeginsWithAdvancedFilterDeserializer(
  item: any,
): StringBeginsWithAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringEndsWith Advanced Filter. */
export interface StringEndsWithAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringEndsWith";
}

export function stringEndsWithAdvancedFilterSerializer(item: StringEndsWithAdvancedFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringEndsWithAdvancedFilterDeserializer(item: any): StringEndsWithAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringContains Advanced Filter. */
export interface StringContainsAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringContains";
}

export function stringContainsAdvancedFilterSerializer(item: StringContainsAdvancedFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringContainsAdvancedFilterDeserializer(item: any): StringContainsAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** NumberInRange Advanced Filter. */
export interface NumberInRangeAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: number[][];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberInRange";
}

export function numberInRangeAdvancedFilterSerializer(item: NumberInRangeAdvancedFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
  };
}

export function numberInRangeAdvancedFilterDeserializer(item: any): NumberInRangeAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

/** NumberNotInRange Advanced Filter. */
export interface NumberNotInRangeAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: number[][];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberNotInRange";
}

export function numberNotInRangeAdvancedFilterSerializer(
  item: NumberNotInRangeAdvancedFilter,
): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
  };
}

export function numberNotInRangeAdvancedFilterDeserializer(
  item: any,
): NumberNotInRangeAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

/** StringNotBeginsWith Advanced Filter. */
export interface StringNotBeginsWithAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotBeginsWith";
}

export function stringNotBeginsWithAdvancedFilterSerializer(
  item: StringNotBeginsWithAdvancedFilter,
): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotBeginsWithAdvancedFilterDeserializer(
  item: any,
): StringNotBeginsWithAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringNotEndsWith Advanced Filter. */
export interface StringNotEndsWithAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotEndsWith";
}

export function stringNotEndsWithAdvancedFilterSerializer(
  item: StringNotEndsWithAdvancedFilter,
): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotEndsWithAdvancedFilterDeserializer(
  item: any,
): StringNotEndsWithAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringNotContains Advanced Filter. */
export interface StringNotContainsAdvancedFilter extends AdvancedFilter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotContains";
}

export function stringNotContainsAdvancedFilterSerializer(
  item: StringNotContainsAdvancedFilter,
): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotContainsAdvancedFilterDeserializer(
  item: any,
): StringNotContainsAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** IsNullOrUndefined Advanced Filter. */
export interface IsNullOrUndefinedAdvancedFilter extends AdvancedFilter {
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "IsNullOrUndefined";
}

export function isNullOrUndefinedAdvancedFilterSerializer(
  item: IsNullOrUndefinedAdvancedFilter,
): any {
  return { operatorType: item["operatorType"], key: item["key"] };
}

export function isNullOrUndefinedAdvancedFilterDeserializer(
  item: any,
): IsNullOrUndefinedAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
  };
}

/** IsNotNull Advanced Filter. */
export interface IsNotNullAdvancedFilter extends AdvancedFilter {
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "IsNotNull";
}

export function isNotNullAdvancedFilterSerializer(item: IsNotNullAdvancedFilter): any {
  return { operatorType: item["operatorType"], key: item["key"] };
}

export function isNotNullAdvancedFilterDeserializer(item: any): IsNotNullAdvancedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
  };
}

/** The event delivery schema for the event subscription. */
export enum KnownEventDeliverySchema {
  /** EventGridSchema */
  EventGridSchema = "EventGridSchema",
  /** CustomInputSchema */
  CustomInputSchema = "CustomInputSchema",
  /** CloudEventSchemaV1_0 */
  CloudEventSchemaV10 = "CloudEventSchemaV1_0",
}

/**
 * The event delivery schema for the event subscription. \
 * {@link KnownEventDeliverySchema} can be used interchangeably with EventDeliverySchema,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EventGridSchema**: EventGridSchema \
 * **CustomInputSchema**: CustomInputSchema \
 * **CloudEventSchemaV1_0**: CloudEventSchemaV1_0
 */
export type EventDeliverySchema = string;

/** Information about the retry policy for an event subscription. */
export interface RetryPolicy {
  /** Maximum number of delivery retry attempts for events. */
  maxDeliveryAttempts?: number;
  /** Time To Live (in minutes) for events. */
  eventTimeToLiveInMinutes?: number;
}

export function retryPolicySerializer(item: RetryPolicy): any {
  return {
    maxDeliveryAttempts: item["maxDeliveryAttempts"],
    eventTimeToLiveInMinutes: item["eventTimeToLiveInMinutes"],
  };
}

export function retryPolicyDeserializer(item: any): RetryPolicy {
  return {
    maxDeliveryAttempts: item["maxDeliveryAttempts"],
    eventTimeToLiveInMinutes: item["eventTimeToLiveInMinutes"],
  };
}

/** Information about the dead letter destination for an event subscription. To configure a deadletter destination, do not directly instantiate an object of this class. Instead, instantiate an object of a derived class. Currently, StorageBlobDeadLetterDestination is the only class that derives from this class. */
export interface DeadLetterDestination {
  /** Type of the endpoint for the dead letter destination */
  /** The discriminator possible values: StorageBlob */
  endpointType: DeadLetterEndPointType;
}

export function deadLetterDestinationSerializer(item: DeadLetterDestination): any {
  return { endpointType: item["endpointType"] };
}

export function deadLetterDestinationDeserializer(item: any): DeadLetterDestination {
  return {
    endpointType: item["endpointType"],
  };
}

/** Alias for DeadLetterDestinationUnion */
export type DeadLetterDestinationUnion = StorageBlobDeadLetterDestination | DeadLetterDestination;

export function deadLetterDestinationUnionSerializer(item: DeadLetterDestinationUnion): any {
  switch (item.endpointType) {
    case "StorageBlob":
      return storageBlobDeadLetterDestinationSerializer(item as StorageBlobDeadLetterDestination);

    default:
      return deadLetterDestinationSerializer(item);
  }
}

export function deadLetterDestinationUnionDeserializer(item: any): DeadLetterDestinationUnion {
  switch (item["endpointType"]) {
    case "StorageBlob":
      return storageBlobDeadLetterDestinationDeserializer(item as StorageBlobDeadLetterDestination);

    default:
      return deadLetterDestinationDeserializer(item);
  }
}

/** Type of the endpoint for the dead letter destination */
export enum KnownDeadLetterEndPointType {
  /** StorageBlob */
  StorageBlob = "StorageBlob",
}

/**
 * Type of the endpoint for the dead letter destination \
 * {@link KnownDeadLetterEndPointType} can be used interchangeably with DeadLetterEndPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StorageBlob**: StorageBlob
 */
export type DeadLetterEndPointType = string;

/** Information about the storage blob based dead letter destination. */
export interface StorageBlobDeadLetterDestination extends DeadLetterDestination {
  /** Type of the endpoint for the dead letter destination */
  endpointType: "StorageBlob";
  /** The Azure Resource ID of the storage account that is the destination of the deadletter events */
  resourceId?: string;
  /** The name of the Storage blob container that is the destination of the deadletter events */
  blobContainerName?: string;
}

export function storageBlobDeadLetterDestinationSerializer(
  item: StorageBlobDeadLetterDestination,
): any {
  return {
    endpointType: item["endpointType"],
    properties: areAllPropsUndefined(item, ["resourceId", "blobContainerName"])
      ? undefined
      : _storageBlobDeadLetterDestinationPropertiesSerializer(item),
  };
}

export function storageBlobDeadLetterDestinationDeserializer(
  item: any,
): StorageBlobDeadLetterDestination {
  return {
    endpointType: item["endpointType"],
    ...(!item["properties"]
      ? item["properties"]
      : _storageBlobDeadLetterDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the storage blob based dead letter destination. */
export interface StorageBlobDeadLetterDestinationProperties {
  /** The Azure Resource ID of the storage account that is the destination of the deadletter events */
  resourceId?: string;
  /** The name of the Storage blob container that is the destination of the deadletter events */
  blobContainerName?: string;
}

export function storageBlobDeadLetterDestinationPropertiesSerializer(
  item: StorageBlobDeadLetterDestinationProperties,
): any {
  return { resourceId: item["resourceId"], blobContainerName: item["blobContainerName"] };
}

export function storageBlobDeadLetterDestinationPropertiesDeserializer(
  item: any,
): StorageBlobDeadLetterDestinationProperties {
  return {
    resourceId: item["resourceId"],
    blobContainerName: item["blobContainerName"],
  };
}

/** Information about the deadletter destination with resource identity. */
export interface DeadLetterWithResourceIdentity {
  /** The identity to use when dead-lettering events. */
  identity?: EventSubscriptionIdentity;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses the managed identity setup on the parent resource (namely, topic or domain) to acquire the authentication tokens being used during dead-lettering.
   */
  deadLetterDestination?: DeadLetterDestinationUnion;
}

export function deadLetterWithResourceIdentitySerializer(
  item: DeadLetterWithResourceIdentity,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : eventSubscriptionIdentitySerializer(item["identity"]),
    deadLetterDestination: !item["deadLetterDestination"]
      ? item["deadLetterDestination"]
      : deadLetterDestinationUnionSerializer(item["deadLetterDestination"]),
  };
}

export function deadLetterWithResourceIdentityDeserializer(
  item: any,
): DeadLetterWithResourceIdentity {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : eventSubscriptionIdentityDeserializer(item["identity"]),
    deadLetterDestination: !item["deadLetterDestination"]
      ? item["deadLetterDestination"]
      : deadLetterDestinationUnionDeserializer(item["deadLetterDestination"]),
  };
}

/** Properties of the Event Subscription update. */
export interface EventSubscriptionUpdateParameters {
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses Azure Event Grid's identity to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  destination?: EventSubscriptionDestinationUnion;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses the managed identity setup on the parent resource (topic / domain) to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deliveryWithResourceIdentity?: DeliveryWithResourceIdentity;
  /** Information about the filter for the event subscription. */
  filter?: EventSubscriptionFilter;
  /** List of user defined labels. */
  labels?: string[];
  /** Information about the expiration time for the event subscription. */
  expirationTimeUtc?: Date;
  /** The event delivery schema for the event subscription. */
  eventDeliverySchema?: EventDeliverySchema;
  /** The retry policy for events. This can be used to configure maximum number of delivery attempts and time to live for events. */
  retryPolicy?: RetryPolicy;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses Azure Event Grid's identity to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deadLetterDestination?: DeadLetterDestinationUnion;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses the managed identity setup on the parent resource (topic / domain) to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deadLetterWithResourceIdentity?: DeadLetterWithResourceIdentity;
}

export function eventSubscriptionUpdateParametersSerializer(
  item: EventSubscriptionUpdateParameters,
): any {
  return {
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionSerializer(item["destination"]),
    deliveryWithResourceIdentity: !item["deliveryWithResourceIdentity"]
      ? item["deliveryWithResourceIdentity"]
      : deliveryWithResourceIdentitySerializer(item["deliveryWithResourceIdentity"]),
    filter: !item["filter"] ? item["filter"] : eventSubscriptionFilterSerializer(item["filter"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    eventDeliverySchema: item["eventDeliverySchema"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicySerializer(item["retryPolicy"]),
    deadLetterDestination: !item["deadLetterDestination"]
      ? item["deadLetterDestination"]
      : deadLetterDestinationUnionSerializer(item["deadLetterDestination"]),
    deadLetterWithResourceIdentity: !item["deadLetterWithResourceIdentity"]
      ? item["deadLetterWithResourceIdentity"]
      : deadLetterWithResourceIdentitySerializer(item["deadLetterWithResourceIdentity"]),
  };
}

/** Result of the Get delivery attributes operation. */
export interface DeliveryAttributeListResult {
  /** A collection of DeliveryAttributeMapping */
  value?: DeliveryAttributeMappingUnion[];
}

export function deliveryAttributeListResultDeserializer(item: any): DeliveryAttributeListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["value"]),
  };
}

/** Namespace topic details. */
export interface NamespaceTopic extends ProxyResource {
  /** Provisioning state of the namespace topic. */
  readonly provisioningState?: NamespaceTopicProvisioningState;
  /** Publisher type of the namespace topic. */
  publisherType?: PublisherType;
  /** This determines the format that is expected for incoming events published to the topic. */
  inputSchema?: EventInputSchema;
  /**
   * Event retention for the namespace topic expressed in days. The property default value is 1 day.
   * Min event retention duration value is 1 day and max event retention duration value is 1 day.
   */
  eventRetentionInDays?: number;
}

export function namespaceTopicSerializer(item: NamespaceTopic): any {
  return {
    properties: areAllPropsUndefined(item, ["publisherType", "inputSchema", "eventRetentionInDays"])
      ? undefined
      : _namespaceTopicPropertiesSerializer(item),
  };
}

export function namespaceTopicDeserializer(item: any): NamespaceTopic {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _namespaceTopicPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the namespace topic. */
export interface NamespaceTopicProperties {
  /** Provisioning state of the namespace topic. */
  readonly provisioningState?: NamespaceTopicProvisioningState;
  /** Publisher type of the namespace topic. */
  publisherType?: PublisherType;
  /** This determines the format that is expected for incoming events published to the topic. */
  inputSchema?: EventInputSchema;
  /**
   * Event retention for the namespace topic expressed in days. The property default value is 1 day.
   * Min event retention duration value is 1 day and max event retention duration value is 1 day.
   */
  eventRetentionInDays?: number;
}

export function namespaceTopicPropertiesSerializer(item: NamespaceTopicProperties): any {
  return {
    publisherType: item["publisherType"],
    inputSchema: item["inputSchema"],
    eventRetentionInDays: item["eventRetentionInDays"],
  };
}

export function namespaceTopicPropertiesDeserializer(item: any): NamespaceTopicProperties {
  return {
    provisioningState: item["provisioningState"],
    publisherType: item["publisherType"],
    inputSchema: item["inputSchema"],
    eventRetentionInDays: item["eventRetentionInDays"],
  };
}

/** Provisioning state of the namespace topic. */
export enum KnownNamespaceTopicProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
  /** DeleteFailed */
  DeleteFailed = "DeleteFailed",
  /** CreateFailed */
  CreateFailed = "CreateFailed",
  /** UpdatedFailed */
  UpdatedFailed = "UpdatedFailed",
}

/**
 * Provisioning state of the namespace topic. \
 * {@link KnownNamespaceTopicProvisioningState} can be used interchangeably with NamespaceTopicProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted \
 * **DeleteFailed**: DeleteFailed \
 * **CreateFailed**: CreateFailed \
 * **UpdatedFailed**: UpdatedFailed
 */
export type NamespaceTopicProvisioningState = string;

/** Publisher type of the namespace topic. */
export enum KnownPublisherType {
  /** Custom */
  Custom = "Custom",
}

/**
 * Publisher type of the namespace topic. \
 * {@link KnownPublisherType} can be used interchangeably with PublisherType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Custom**: Custom
 */
export type PublisherType = string;

/** This determines the format that is expected for incoming events published to the topic. */
export enum KnownEventInputSchema {
  /** CloudEventSchemaV1_0 */
  CloudEventSchemaV10 = "CloudEventSchemaV1_0",
}

/**
 * This determines the format that is expected for incoming events published to the topic. \
 * {@link KnownEventInputSchema} can be used interchangeably with EventInputSchema,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CloudEventSchemaV1_0**: CloudEventSchemaV1_0
 */
export type EventInputSchema = string;

/** Properties of the namespace topic update. */
export interface NamespaceTopicUpdateParameters {
  /**
   * Event retention for the namespace topic expressed in days. The property default value is 1 day.
   * Min event retention duration value is 1 day and max event retention duration value is 1 day.
   */
  eventRetentionInDays?: number;
}

export function namespaceTopicUpdateParametersSerializer(
  item: NamespaceTopicUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["eventRetentionInDays"])
      ? undefined
      : _namespaceTopicUpdateParametersPropertiesSerializer(item),
  };
}

/** Information of namespace topic update parameter properties. */
export interface NamespaceTopicUpdateParameterProperties {
  /**
   * Event retention for the namespace topic expressed in days. The property default value is 1 day.
   * Min event retention duration value is 1 day and max event retention duration value is 1 day.
   */
  eventRetentionInDays?: number;
}

export function namespaceTopicUpdateParameterPropertiesSerializer(
  item: NamespaceTopicUpdateParameterProperties,
): any {
  return { eventRetentionInDays: item["eventRetentionInDays"] };
}

/** Result of the List namespace topics operation. */
export interface _NamespaceTopicsListResult {
  /** The NamespaceTopic items on this page */
  value: NamespaceTopic[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespaceTopicsListResultDeserializer(item: any): _NamespaceTopicsListResult {
  return {
    value: namespaceTopicArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceTopicArraySerializer(result: Array<NamespaceTopic>): any[] {
  return result.map((item) => {
    return namespaceTopicSerializer(item);
  });
}

export function namespaceTopicArrayDeserializer(result: Array<NamespaceTopic>): any[] {
  return result.map((item) => {
    return namespaceTopicDeserializer(item);
  });
}

/** Shared access keys of the Topic */
export interface TopicSharedAccessKeys {
  /** Shared access key1 for the topic. */
  key1?: string;
  /** Shared access key2 for the topic. */
  key2?: string;
}

export function topicSharedAccessKeysDeserializer(item: any): TopicSharedAccessKeys {
  return {
    key1: item["key1"],
    key2: item["key2"],
  };
}

/** Topic regenerate share access key request */
export interface TopicRegenerateKeyRequest {
  /** Key name to regenerate key1 or key2 */
  keyName: string;
}

export function topicRegenerateKeyRequestSerializer(item: TopicRegenerateKeyRequest): any {
  return { keyName: item["keyName"] };
}

/** Partner configuration information */
export interface PartnerConfiguration extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** The details of authorized partners. */
  partnerAuthorization?: PartnerAuthorization;
  /** Provisioning state of the partner configuration. */
  provisioningState?: PartnerConfigurationProvisioningState;
}

export function partnerConfigurationSerializer(item: PartnerConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, ["partnerAuthorization", "provisioningState"])
      ? undefined
      : _partnerConfigurationPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
  };
}

export function partnerConfigurationDeserializer(item: any): PartnerConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _partnerConfigurationPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Properties of the partner configuration. */
export interface PartnerConfigurationProperties {
  /** The details of authorized partners. */
  partnerAuthorization?: PartnerAuthorization;
  /** Provisioning state of the partner configuration. */
  provisioningState?: PartnerConfigurationProvisioningState;
}

export function partnerConfigurationPropertiesSerializer(
  item: PartnerConfigurationProperties,
): any {
  return {
    partnerAuthorization: !item["partnerAuthorization"]
      ? item["partnerAuthorization"]
      : partnerAuthorizationSerializer(item["partnerAuthorization"]),
    provisioningState: item["provisioningState"],
  };
}

export function partnerConfigurationPropertiesDeserializer(
  item: any,
): PartnerConfigurationProperties {
  return {
    partnerAuthorization: !item["partnerAuthorization"]
      ? item["partnerAuthorization"]
      : partnerAuthorizationDeserializer(item["partnerAuthorization"]),
    provisioningState: item["provisioningState"],
  };
}

/** The partner authorization details. */
export interface PartnerAuthorization {
  /**
   * Time used to validate the authorization expiration time for each authorized partner. If DefaultMaximumExpirationTimeInDays is
   * not specified, the default is 7 days. Otherwise, allowed values are between 1 and 365 days.
   */
  defaultMaximumExpirationTimeInDays?: number;
  /** The list of authorized partners. */
  authorizedPartnersList?: Partner[];
}

export function partnerAuthorizationSerializer(item: PartnerAuthorization): any {
  return {
    defaultMaximumExpirationTimeInDays: item["defaultMaximumExpirationTimeInDays"],
    authorizedPartnersList: !item["authorizedPartnersList"]
      ? item["authorizedPartnersList"]
      : partnerArraySerializer(item["authorizedPartnersList"]),
  };
}

export function partnerAuthorizationDeserializer(item: any): PartnerAuthorization {
  return {
    defaultMaximumExpirationTimeInDays: item["defaultMaximumExpirationTimeInDays"],
    authorizedPartnersList: !item["authorizedPartnersList"]
      ? item["authorizedPartnersList"]
      : partnerArrayDeserializer(item["authorizedPartnersList"]),
  };
}

export function partnerArraySerializer(result: Array<Partner>): any[] {
  return result.map((item) => {
    return partnerSerializer(item);
  });
}

export function partnerArrayDeserializer(result: Array<Partner>): any[] {
  return result.map((item) => {
    return partnerDeserializer(item);
  });
}

/** Information about the partner. */
export interface Partner {
  /** The immutableId of the corresponding partner registration. */
  partnerRegistrationImmutableId?: string;
  /** The partner name. */
  partnerName?: string;
  /**
   * Expiration time of the partner authorization. If this timer expires, any request from this partner to create, update or delete resources in subscriber's
   * context will fail. If specified, the allowed values are between 1 to the value of defaultMaximumExpirationTimeInDays specified in PartnerConfiguration.
   * If not specified, the default value will be the value of defaultMaximumExpirationTimeInDays specified in PartnerConfiguration or 7 if this value is not specified.
   */
  authorizationExpirationTimeInUtc?: Date;
}

export function partnerSerializer(item: Partner): any {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    partnerName: item["partnerName"],
    authorizationExpirationTimeInUtc: !item["authorizationExpirationTimeInUtc"]
      ? item["authorizationExpirationTimeInUtc"]
      : item["authorizationExpirationTimeInUtc"].toISOString(),
  };
}

export function partnerDeserializer(item: any): Partner {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    partnerName: item["partnerName"],
    authorizationExpirationTimeInUtc: !item["authorizationExpirationTimeInUtc"]
      ? item["authorizationExpirationTimeInUtc"]
      : new Date(item["authorizationExpirationTimeInUtc"]),
  };
}

/** Provisioning state of the partner configuration. */
export enum KnownPartnerConfigurationProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the partner configuration. \
 * {@link KnownPartnerConfigurationProvisioningState} can be used interchangeably with PartnerConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type PartnerConfigurationProvisioningState = string;

/** Properties of the partner configuration update. */
export interface PartnerConfigurationUpdateParameters {
  /** Tags of the partner configuration resource. */
  tags?: Record<string, string>;
  /** The default time used to validate the maximum expiration time for each authorized partners in days. Allowed values ar between 1 and 365 days. */
  defaultMaximumExpirationTimeInDays?: number;
}

export function partnerConfigurationUpdateParametersSerializer(
  item: PartnerConfigurationUpdateParameters,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["defaultMaximumExpirationTimeInDays"])
      ? undefined
      : _partnerConfigurationUpdateParametersPropertiesSerializer(item),
  };
}

/** Information of partner configuration update parameter properties. */
export interface PartnerConfigurationUpdateParameterProperties {
  /** The default time used to validate the maximum expiration time for each authorized partners in days. Allowed values ar between 1 and 365 days. */
  defaultMaximumExpirationTimeInDays?: number;
}

export function partnerConfigurationUpdateParameterPropertiesSerializer(
  item: PartnerConfigurationUpdateParameterProperties,
): any {
  return { defaultMaximumExpirationTimeInDays: item["defaultMaximumExpirationTimeInDays"] };
}

/** Result of the List partner configurations operation */
export interface _PartnerConfigurationsListResult {
  /** The PartnerConfiguration items on this page */
  value: PartnerConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _partnerConfigurationsListResultDeserializer(
  item: any,
): _PartnerConfigurationsListResult {
  return {
    value: partnerConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partnerConfigurationArraySerializer(result: Array<PartnerConfiguration>): any[] {
  return result.map((item) => {
    return partnerConfigurationSerializer(item);
  });
}

export function partnerConfigurationArrayDeserializer(result: Array<PartnerConfiguration>): any[] {
  return result.map((item) => {
    return partnerConfigurationDeserializer(item);
  });
}

/** Event Grid Partner Destination. */
export interface PartnerDestination extends TrackedResource {
  /** The immutable Id of the corresponding partner registration. */
  partnerRegistrationImmutableId?: string;
  /** Endpoint context associated with this partner destination. */
  endpointServiceContext?: string;
  /**
   * Expiration time of the partner destination. If this timer expires and the partner destination was never activated,
   * the partner destination and corresponding channel are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
  /** Provisioning state of the partner destination. */
  readonly provisioningState?: PartnerDestinationProvisioningState;
  /** Activation state of the partner destination. */
  activationState?: PartnerDestinationActivationState;
  /** Endpoint Base URL of the partner destination */
  endpointBaseUrl?: string;
  /** Context or helpful message that can be used during the approval process. */
  messageForActivation?: string;
}

export function partnerDestinationSerializer(item: PartnerDestination): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "partnerRegistrationImmutableId",
      "endpointServiceContext",
      "expirationTimeIfNotActivatedUtc",
      "activationState",
      "endpointBaseUrl",
      "messageForActivation",
    ])
      ? undefined
      : _partnerDestinationPropertiesSerializer(item),
  };
}

export function partnerDestinationDeserializer(item: any): PartnerDestination {
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
      : _partnerDestinationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the Partner Destination. */
export interface PartnerDestinationProperties {
  /** The immutable Id of the corresponding partner registration. */
  partnerRegistrationImmutableId?: string;
  /** Endpoint context associated with this partner destination. */
  endpointServiceContext?: string;
  /**
   * Expiration time of the partner destination. If this timer expires and the partner destination was never activated,
   * the partner destination and corresponding channel are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
  /** Provisioning state of the partner destination. */
  readonly provisioningState?: PartnerDestinationProvisioningState;
  /** Activation state of the partner destination. */
  activationState?: PartnerDestinationActivationState;
  /** Endpoint Base URL of the partner destination */
  endpointBaseUrl?: string;
  /** Context or helpful message that can be used during the approval process. */
  messageForActivation?: string;
}

export function partnerDestinationPropertiesSerializer(item: PartnerDestinationProperties): any {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    endpointServiceContext: item["endpointServiceContext"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
    activationState: item["activationState"],
    endpointBaseUrl: item["endpointBaseUrl"],
    messageForActivation: item["messageForActivation"],
  };
}

export function partnerDestinationPropertiesDeserializer(item: any): PartnerDestinationProperties {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    endpointServiceContext: item["endpointServiceContext"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : new Date(item["expirationTimeIfNotActivatedUtc"]),
    provisioningState: item["provisioningState"],
    activationState: item["activationState"],
    endpointBaseUrl: item["endpointBaseUrl"],
    messageForActivation: item["messageForActivation"],
  };
}

/** Provisioning state of the partner destination. */
export enum KnownPartnerDestinationProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** IdleDueToMirroredChannelResourceDeletion */
  IdleDueToMirroredChannelResourceDeletion = "IdleDueToMirroredChannelResourceDeletion",
}

/**
 * Provisioning state of the partner destination. \
 * {@link KnownPartnerDestinationProvisioningState} can be used interchangeably with PartnerDestinationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **IdleDueToMirroredChannelResourceDeletion**: IdleDueToMirroredChannelResourceDeletion
 */
export type PartnerDestinationProvisioningState = string;

/** Activation state of the partner destination. */
export enum KnownPartnerDestinationActivationState {
  /** NeverActivated */
  NeverActivated = "NeverActivated",
  /** Activated */
  Activated = "Activated",
}

/**
 * Activation state of the partner destination. \
 * {@link KnownPartnerDestinationActivationState} can be used interchangeably with PartnerDestinationActivationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NeverActivated**: NeverActivated \
 * **Activated**: Activated
 */
export type PartnerDestinationActivationState = string;

/** Properties of the Partner Destination that can be updated. */
export interface PartnerDestinationUpdateParameters {
  /** Tags of the Partner Destination resource. */
  tags?: Record<string, string>;
}

export function partnerDestinationUpdateParametersSerializer(
  item: PartnerDestinationUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** Result of the List Partner Destinations operation. */
export interface _PartnerDestinationsListResult {
  /** The PartnerDestination items on this page */
  value: PartnerDestination[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _partnerDestinationsListResultDeserializer(
  item: any,
): _PartnerDestinationsListResult {
  return {
    value: partnerDestinationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partnerDestinationArraySerializer(result: Array<PartnerDestination>): any[] {
  return result.map((item) => {
    return partnerDestinationSerializer(item);
  });
}

export function partnerDestinationArrayDeserializer(result: Array<PartnerDestination>): any[] {
  return result.map((item) => {
    return partnerDestinationDeserializer(item);
  });
}

/** Information about a partner registration. */
export interface PartnerRegistration extends TrackedResource {
  /** Provisioning state of the partner registration. */
  readonly provisioningState?: PartnerRegistrationProvisioningState;
  /**
   * The immutableId of the corresponding partner registration.
   * Note: This property is marked for deprecation and is not supported in any future GA API version
   */
  partnerRegistrationImmutableId?: string;
}

export function partnerRegistrationSerializer(item: PartnerRegistration): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["partnerRegistrationImmutableId"])
      ? undefined
      : _partnerRegistrationPropertiesSerializer(item),
  };
}

export function partnerRegistrationDeserializer(item: any): PartnerRegistration {
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
      : _partnerRegistrationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the partner registration. */
export interface PartnerRegistrationProperties {
  /** Provisioning state of the partner registration. */
  readonly provisioningState?: PartnerRegistrationProvisioningState;
  /**
   * The immutableId of the corresponding partner registration.
   * Note: This property is marked for deprecation and is not supported in any future GA API version
   */
  partnerRegistrationImmutableId?: string;
}

export function partnerRegistrationPropertiesSerializer(item: PartnerRegistrationProperties): any {
  return { partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"] };
}

export function partnerRegistrationPropertiesDeserializer(
  item: any,
): PartnerRegistrationProperties {
  return {
    provisioningState: item["provisioningState"],
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
  };
}

/** Provisioning state of the partner registration. */
export enum KnownPartnerRegistrationProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the partner registration. \
 * {@link KnownPartnerRegistrationProvisioningState} can be used interchangeably with PartnerRegistrationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type PartnerRegistrationProvisioningState = string;

/** Properties of the Partner Registration update. */
export interface PartnerRegistrationUpdateParameters {
  /** Tags of the partner registration resource. */
  tags?: Record<string, string>;
}

export function partnerRegistrationUpdateParametersSerializer(
  item: PartnerRegistrationUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** Result of the List Partner Registrations operation. */
export interface _PartnerRegistrationsListResult {
  /** The PartnerRegistration items on this page */
  value: PartnerRegistration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _partnerRegistrationsListResultDeserializer(
  item: any,
): _PartnerRegistrationsListResult {
  return {
    value: partnerRegistrationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partnerRegistrationArraySerializer(result: Array<PartnerRegistration>): any[] {
  return result.map((item) => {
    return partnerRegistrationSerializer(item);
  });
}

export function partnerRegistrationArrayDeserializer(result: Array<PartnerRegistration>): any[] {
  return result.map((item) => {
    return partnerRegistrationDeserializer(item);
  });
}

/** Event Grid Partner Topic. */
export interface PartnerTopic extends TrackedResource {
  /** Identity information for the Partner Topic resource. */
  identity?: IdentityInfo;
  /** The immutableId of the corresponding partner registration. */
  partnerRegistrationImmutableId?: string;
  /** Source associated with this partner topic. This represents a unique partner resource. */
  source?: string;
  /** Event Type information from the corresponding event channel. */
  eventTypeInfo?: EventTypeInfo;
  /**
   * Expiration time of the partner topic. If this timer expires while the partner topic is still never activated,
   * the partner topic and corresponding event channel are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
  /** Provisioning state of the partner topic. */
  readonly provisioningState?: PartnerTopicProvisioningState;
  /** Activation state of the partner topic. */
  activationState?: PartnerTopicActivationState;
  /**
   * Friendly description about the topic. This can be set by the publisher/partner to show custom description for the customer partner topic.
   * This will be helpful to remove any ambiguity of the origin of creation of the partner topic for the customer.
   */
  partnerTopicFriendlyDescription?: string;
  /** Context or helpful message that can be used during the approval process by the subscriber. */
  messageForActivation?: string;
}

export function partnerTopicSerializer(item: PartnerTopic): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "partnerRegistrationImmutableId",
      "source",
      "eventTypeInfo",
      "expirationTimeIfNotActivatedUtc",
      "activationState",
      "partnerTopicFriendlyDescription",
      "messageForActivation",
    ])
      ? undefined
      : _partnerTopicPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
  };
}

export function partnerTopicDeserializer(item: any): PartnerTopic {
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
      : _partnerTopicPropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : identityInfoDeserializer(item["identity"]),
  };
}

/** Properties of the Partner Topic. */
export interface PartnerTopicProperties {
  /** The immutableId of the corresponding partner registration. */
  partnerRegistrationImmutableId?: string;
  /** Source associated with this partner topic. This represents a unique partner resource. */
  source?: string;
  /** Event Type information from the corresponding event channel. */
  eventTypeInfo?: EventTypeInfo;
  /**
   * Expiration time of the partner topic. If this timer expires while the partner topic is still never activated,
   * the partner topic and corresponding event channel are deleted.
   */
  expirationTimeIfNotActivatedUtc?: Date;
  /** Provisioning state of the partner topic. */
  readonly provisioningState?: PartnerTopicProvisioningState;
  /** Activation state of the partner topic. */
  activationState?: PartnerTopicActivationState;
  /**
   * Friendly description about the topic. This can be set by the publisher/partner to show custom description for the customer partner topic.
   * This will be helpful to remove any ambiguity of the origin of creation of the partner topic for the customer.
   */
  partnerTopicFriendlyDescription?: string;
  /** Context or helpful message that can be used during the approval process by the subscriber. */
  messageForActivation?: string;
}

export function partnerTopicPropertiesSerializer(item: PartnerTopicProperties): any {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    source: item["source"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
    activationState: item["activationState"],
    partnerTopicFriendlyDescription: item["partnerTopicFriendlyDescription"],
    messageForActivation: item["messageForActivation"],
  };
}

export function partnerTopicPropertiesDeserializer(item: any): PartnerTopicProperties {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    source: item["source"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoDeserializer(item["eventTypeInfo"]),
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : new Date(item["expirationTimeIfNotActivatedUtc"]),
    provisioningState: item["provisioningState"],
    activationState: item["activationState"],
    partnerTopicFriendlyDescription: item["partnerTopicFriendlyDescription"],
    messageForActivation: item["messageForActivation"],
  };
}

/** Provisioning state of the partner topic. */
export enum KnownPartnerTopicProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** IdleDueToMirroredChannelResourceDeletion */
  IdleDueToMirroredChannelResourceDeletion = "IdleDueToMirroredChannelResourceDeletion",
}

/**
 * Provisioning state of the partner topic. \
 * {@link KnownPartnerTopicProvisioningState} can be used interchangeably with PartnerTopicProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **IdleDueToMirroredChannelResourceDeletion**: IdleDueToMirroredChannelResourceDeletion
 */
export type PartnerTopicProvisioningState = string;

/** Activation state of the partner topic. */
export enum KnownPartnerTopicActivationState {
  /** NeverActivated */
  NeverActivated = "NeverActivated",
  /** Activated */
  Activated = "Activated",
  /** Deactivated */
  Deactivated = "Deactivated",
}

/**
 * Activation state of the partner topic. \
 * {@link KnownPartnerTopicActivationState} can be used interchangeably with PartnerTopicActivationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NeverActivated**: NeverActivated \
 * **Activated**: Activated \
 * **Deactivated**: Deactivated
 */
export type PartnerTopicActivationState = string;

/** Properties of the Partner Topic update. */
export interface PartnerTopicUpdateParameters {
  /** Tags of the Partner Topic resource. */
  tags?: Record<string, string>;
  /** Identity information for the Partner Topic resource. */
  identity?: IdentityInfo;
}

export function partnerTopicUpdateParametersSerializer(item: PartnerTopicUpdateParameters): any {
  return {
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
  };
}

/** Result of the List Partner Topics operation. */
export interface _PartnerTopicsListResult {
  /** The PartnerTopic items on this page */
  value: PartnerTopic[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _partnerTopicsListResultDeserializer(item: any): _PartnerTopicsListResult {
  return {
    value: partnerTopicArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partnerTopicArraySerializer(result: Array<PartnerTopic>): any[] {
  return result.map((item) => {
    return partnerTopicSerializer(item);
  });
}

export function partnerTopicArrayDeserializer(result: Array<PartnerTopic>): any[] {
  return result.map((item) => {
    return partnerTopicDeserializer(item);
  });
}

/** Network security perimeter configuration. */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** Provisioning state to reflect configuration state and indicate status of nsp profile configuration retrieval. */
  provisioningState?: NetworkSecurityPerimeterConfigProvisioningState;
  /** Provisioning issues to reflect status when attempting to retrieve nsp profile configuration. */
  provisioningIssues?: NetworkSecurityPerimeterConfigurationIssues[];
  /** Perimeter info for nsp association. */
  networkSecurityPerimeter?: NetworkSecurityPerimeterInfo;
  /** Nsp association name and access mode of association. */
  resourceAssociation?: ResourceAssociation;
  /** Nsp profile configuration, access rules and diagnostic settings. */
  profile?: NetworkSecurityPerimeterConfigurationProfile;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** Network security perimeter configuration information to reflect latest association and nsp profile configuration. */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /** Provisioning state to reflect configuration state and indicate status of nsp profile configuration retrieval. */
  provisioningState?: NetworkSecurityPerimeterConfigProvisioningState;
  /** Provisioning issues to reflect status when attempting to retrieve nsp profile configuration. */
  provisioningIssues?: NetworkSecurityPerimeterConfigurationIssues[];
  /** Perimeter info for nsp association. */
  networkSecurityPerimeter?: NetworkSecurityPerimeterInfo;
  /** Nsp association name and access mode of association. */
  resourceAssociation?: ResourceAssociation;
  /** Nsp profile configuration, access rules and diagnostic settings. */
  profile?: NetworkSecurityPerimeterConfigurationProfile;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : networkSecurityPerimeterConfigurationIssuesArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterInfoDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterConfigurationProfileDeserializer(item["profile"]),
  };
}

/** Provisioning state to reflect configuration state and indicate status of nsp profile configuration retrieval. */
export enum KnownNetworkSecurityPerimeterConfigProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
  /** Accepted */
  Accepted = "Accepted",
}

/**
 * Provisioning state to reflect configuration state and indicate status of nsp profile configuration retrieval. \
 * {@link KnownNetworkSecurityPerimeterConfigProvisioningState} can be used interchangeably with NetworkSecurityPerimeterConfigProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted \
 * **Accepted**: Accepted
 */
export type NetworkSecurityPerimeterConfigProvisioningState = string;

export function networkSecurityPerimeterConfigurationIssuesArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfigurationIssues>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationIssuesDeserializer(item);
  });
}

/** Network security perimeter configuration issues. */
export interface NetworkSecurityPerimeterConfigurationIssues {
  /** Provisioning issue name. */
  name?: string;
  /** Provisioning issue type. */
  issueType?: NetworkSecurityPerimeterConfigurationIssueType;
  /** Provisioning issue severity. */
  severity?: NetworkSecurityPerimeterConfigurationIssueSeverity;
  /** Provisioning issue description. */
  description?: string;
  /** ARM IDs of resources that can be associated to the same perimeter to remediate the issue. */
  suggestedResourceIds?: string[];
  /** Access rules that can be added to the same profile to remediate the issue. */
  suggestedAccessRules?: string[];
}

export function networkSecurityPerimeterConfigurationIssuesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationIssues {
  return {
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _networkSecurityPerimeterConfigurationIssuesPropertiesDeserializer(item["properties"])),
  };
}

/** Network security perimeter configuration issues properties. */
export interface NetworkSecurityPerimeterConfigurationIssuesProperties {
  /** Provisioning issue type. */
  issueType?: NetworkSecurityPerimeterConfigurationIssueType;
  /** Provisioning issue severity. */
  severity?: NetworkSecurityPerimeterConfigurationIssueSeverity;
  /** Provisioning issue description. */
  description?: string;
  /** ARM IDs of resources that can be associated to the same perimeter to remediate the issue. */
  suggestedResourceIds?: string[];
  /** Access rules that can be added to the same profile to remediate the issue. */
  suggestedAccessRules?: string[];
}

export function networkSecurityPerimeterConfigurationIssuesPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationIssuesProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : item["suggestedAccessRules"].map((p: any) => {
          return p;
        }),
  };
}

/** Provisioning issue type. */
export enum KnownNetworkSecurityPerimeterConfigurationIssueType {
  /** MissingPerimeterConfiguration */
  MissingPerimeterConfiguration = "MissingPerimeterConfiguration",
  /** MissingIdentityConfiguration */
  MissingIdentityConfiguration = "MissingIdentityConfiguration",
  /** ConfigurationPropagationFailure */
  ConfigurationPropagationFailure = "ConfigurationPropagationFailure",
  /** Other */
  Other = "Other",
}

/**
 * Provisioning issue type. \
 * {@link KnownNetworkSecurityPerimeterConfigurationIssueType} can be used interchangeably with NetworkSecurityPerimeterConfigurationIssueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MissingPerimeterConfiguration**: MissingPerimeterConfiguration \
 * **MissingIdentityConfiguration**: MissingIdentityConfiguration \
 * **ConfigurationPropagationFailure**: ConfigurationPropagationFailure \
 * **Other**: Other
 */
export type NetworkSecurityPerimeterConfigurationIssueType = string;

/** Provisioning issue severity. */
export enum KnownNetworkSecurityPerimeterConfigurationIssueSeverity {
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * Provisioning issue severity. \
 * {@link KnownNetworkSecurityPerimeterConfigurationIssueSeverity} can be used interchangeably with NetworkSecurityPerimeterConfigurationIssueSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning**: Warning \
 * **Error**: Error
 */
export type NetworkSecurityPerimeterConfigurationIssueSeverity = string;

/** Network security perimeter info. */
export interface NetworkSecurityPerimeterInfo {
  /** Arm id for network security perimeter. */
  id?: string;
  /** Network security perimeter guid. */
  perimeterGuid?: string;
  /** Network security perimeter location. */
  location?: string;
}

export function networkSecurityPerimeterInfoDeserializer(item: any): NetworkSecurityPerimeterInfo {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Nsp resource association */
export interface ResourceAssociation {
  /** Association name */
  name?: string;
  /** Network security perimeter access mode. */
  accessMode?: NetworkSecurityPerimeterAssociationAccessMode;
}

export function resourceAssociationDeserializer(item: any): ResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Network security perimeter access mode. */
export enum KnownNetworkSecurityPerimeterAssociationAccessMode {
  /** Learning */
  Learning = "Learning",
  /** Enforced */
  Enforced = "Enforced",
  /** Audit */
  Audit = "Audit",
}

/**
 * Network security perimeter access mode. \
 * {@link KnownNetworkSecurityPerimeterAssociationAccessMode} can be used interchangeably with NetworkSecurityPerimeterAssociationAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Learning**: Learning \
 * **Enforced**: Enforced \
 * **Audit**: Audit
 */
export type NetworkSecurityPerimeterAssociationAccessMode = string;

/** Nsp configuration with profile information. */
export interface NetworkSecurityPerimeterConfigurationProfile {
  /** Nsp configuration profile name. */
  name?: string;
  /** Access rules version number for nsp profile. */
  accessRulesVersion?: string;
  /** List of inbound or outbound access rule setup on the nsp profile. */
  accessRules?: NetworkSecurityPerimeterProfileAccessRule[];
  /** Diagnostic settings version number for nsp profile. */
  diagnosticSettingsVersion?: string;
  /** Enabled log categories for nsp profile. */
  enabledLogCategories?: string[];
}

export function networkSecurityPerimeterConfigurationProfileDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : networkSecurityPerimeterProfileAccessRuleArrayDeserializer(item["accessRules"]),
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

export function networkSecurityPerimeterProfileAccessRuleArrayDeserializer(
  result: Array<NetworkSecurityPerimeterProfileAccessRule>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterProfileAccessRuleDeserializer(item);
  });
}

/** Network security perimeter profile access rule. */
export interface NetworkSecurityPerimeterProfileAccessRule {
  /** Fully Qualified Arm id for network security perimeter profile access rule. */
  fullyQualifiedArmId?: string;
  /** Name for nsp access rule. */
  name?: string;
  /** nsp access rule type. */
  type?: string;
  /** NSP access rule direction. */
  direction?: NetworkSecurityPerimeterProfileAccessRuleDirection;
  /** Address prefixes. */
  addressPrefixes?: string[];
  /** List of subscriptions. */
  subscriptions?: NetworkSecurityPerimeterSubscription[];
  /** Network security perimeters. */
  networkSecurityPerimeters?: NetworkSecurityPerimeterInfo[];
  /** Fully qualified domain names. */
  fullyQualifiedDomainNames?: string[];
  /** List of email addresses. */
  emailAddresses?: string[];
  /** List of phone numbers. */
  phoneNumbers?: string[];
}

export function networkSecurityPerimeterProfileAccessRuleDeserializer(
  item: any,
): NetworkSecurityPerimeterProfileAccessRule {
  return {
    fullyQualifiedArmId: item["fullyQualifiedArmId"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _networkSecurityPerimeterProfileAccessRulePropertiesDeserializer(item["properties"])),
  };
}

/** Network security perimeter profile access rule properties. */
export interface NetworkSecurityPerimeterProfileAccessRuleProperties {
  /** NSP access rule direction. */
  direction?: NetworkSecurityPerimeterProfileAccessRuleDirection;
  /** Address prefixes. */
  addressPrefixes?: string[];
  /** List of subscriptions. */
  subscriptions?: NetworkSecurityPerimeterSubscription[];
  /** Network security perimeters. */
  networkSecurityPerimeters?: NetworkSecurityPerimeterInfo[];
  /** Fully qualified domain names. */
  fullyQualifiedDomainNames?: string[];
  /** List of email addresses. */
  emailAddresses?: string[];
  /** List of phone numbers. */
  phoneNumbers?: string[];
}

export function networkSecurityPerimeterProfileAccessRulePropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterProfileAccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : networkSecurityPerimeterSubscriptionArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterInfoArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : item["phoneNumbers"].map((p: any) => {
          return p;
        }),
  };
}

/** NSP access rule direction. */
export enum KnownNetworkSecurityPerimeterProfileAccessRuleDirection {
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
}

/**
 * NSP access rule direction. \
 * {@link KnownNetworkSecurityPerimeterProfileAccessRuleDirection} can be used interchangeably with NetworkSecurityPerimeterProfileAccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Inbound \
 * **Outbound**: Outbound
 */
export type NetworkSecurityPerimeterProfileAccessRuleDirection = string;

export function networkSecurityPerimeterSubscriptionArrayDeserializer(
  result: Array<NetworkSecurityPerimeterSubscription>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterSubscriptionDeserializer(item);
  });
}

/** Network security perimeter subscription inbound access rule. */
export interface NetworkSecurityPerimeterSubscription {
  /** Subscription id. */
  id?: string;
}

export function networkSecurityPerimeterSubscriptionDeserializer(
  item: any,
): NetworkSecurityPerimeterSubscription {
  return {
    id: item["id"],
  };
}

export function networkSecurityPerimeterInfoArrayDeserializer(
  result: Array<NetworkSecurityPerimeterInfo>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterInfoDeserializer(item);
  });
}

/** Network security perimeter configuration List. */
export interface _NetworkSecurityPerimeterConfigurationList {
  /** The NetworkSecurityPerimeterConfiguration items on this page */
  value: NetworkSecurityPerimeterConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationList {
  return {
    value: networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** The Permission binding resource. */
export interface PermissionBinding extends ProxyResource {
  /** Description for the Permission Binding resource. */
  description?: string;
  /**
   * The name of the Topic Space resource that the permission is bound to.
   * The Topic space needs to be a resource under the same namespace the permission binding is a part of.
   */
  topicSpaceName?: string;
  /** The allowed permission. */
  permission?: PermissionType;
  /**
   * The name of the client group resource that the permission is bound to.
   * The client group needs to be a resource under the same namespace the permission binding is a part of.
   */
  clientGroupName?: string;
  /** Provisioning state of the PermissionBinding resource. */
  readonly provisioningState?: PermissionBindingProvisioningState;
}

export function permissionBindingSerializer(item: PermissionBinding): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "topicSpaceName",
      "permission",
      "clientGroupName",
    ])
      ? undefined
      : _permissionBindingPropertiesSerializer(item),
  };
}

export function permissionBindingDeserializer(item: any): PermissionBinding {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _permissionBindingPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of permission binding. */
export interface PermissionBindingProperties {
  /** Description for the Permission Binding resource. */
  description?: string;
  /**
   * The name of the Topic Space resource that the permission is bound to.
   * The Topic space needs to be a resource under the same namespace the permission binding is a part of.
   */
  topicSpaceName?: string;
  /** The allowed permission. */
  permission?: PermissionType;
  /**
   * The name of the client group resource that the permission is bound to.
   * The client group needs to be a resource under the same namespace the permission binding is a part of.
   */
  clientGroupName?: string;
  /** Provisioning state of the PermissionBinding resource. */
  readonly provisioningState?: PermissionBindingProvisioningState;
}

export function permissionBindingPropertiesSerializer(item: PermissionBindingProperties): any {
  return {
    description: item["description"],
    topicSpaceName: item["topicSpaceName"],
    permission: item["permission"],
    clientGroupName: item["clientGroupName"],
  };
}

export function permissionBindingPropertiesDeserializer(item: any): PermissionBindingProperties {
  return {
    description: item["description"],
    topicSpaceName: item["topicSpaceName"],
    permission: item["permission"],
    clientGroupName: item["clientGroupName"],
    provisioningState: item["provisioningState"],
  };
}

/** The allowed permission. */
export enum KnownPermissionType {
  /** Publisher */
  Publisher = "Publisher",
  /** Subscriber */
  Subscriber = "Subscriber",
}

/**
 * The allowed permission. \
 * {@link KnownPermissionType} can be used interchangeably with PermissionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Publisher**: Publisher \
 * **Subscriber**: Subscriber
 */
export type PermissionType = string;

/** Provisioning state of the PermissionBinding resource. */
export enum KnownPermissionBindingProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning state of the PermissionBinding resource. \
 * {@link KnownPermissionBindingProvisioningState} can be used interchangeably with PermissionBindingProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted
 */
export type PermissionBindingProvisioningState = string;

/** Result of the List Permission Binding operation. */
export interface _PermissionBindingsListResult {
  /** The PermissionBinding items on this page */
  value: PermissionBinding[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _permissionBindingsListResultDeserializer(
  item: any,
): _PermissionBindingsListResult {
  return {
    value: permissionBindingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function permissionBindingArraySerializer(result: Array<PermissionBinding>): any[] {
  return result.map((item) => {
    return permissionBindingSerializer(item);
  });
}

export function permissionBindingArrayDeserializer(result: Array<PermissionBinding>): any[] {
  return result.map((item) => {
    return permissionBindingDeserializer(item);
  });
}

/** Result of the list of all private endpoint connections operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Information of the private link resource. */
export interface PrivateLinkResource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** The name of private link resource will be either topic, domain, partnerNamespace or namespace. */
  name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  type?: string;
  groupId?: string;
  displayName?: string;
  requiredMembers?: string[];
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** model interface PrivateLinkResourceProperties */
export interface PrivateLinkResourceProperties {
  groupId?: string;
  displayName?: string;
  requiredMembers?: string[];
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    displayName: item["displayName"],
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

/** Result of the List private link resources operation. */
export interface _PrivateLinkResourcesListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourcesListResultDeserializer(
  item: any,
): _PrivateLinkResourcesListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** EventGrid System Topic. */
export interface SystemTopic extends TrackedResource {
  /** Identity information for the resource. */
  identity?: IdentityInfo;
  /** Provisioning state of the system topic. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Source for the system topic. */
  source?: string;
  /** TopicType for the system topic. */
  topicType?: string;
  /** Metric resource id for the system topic. */
  readonly metricResourceId?: string;
  /** Key encryption configuration properties of the system topic resource. This is an optional property. When not specified, no key encryption is used. */
  encryption?: KeyEncryption;
  /** Represents the platform capabilities of the resource, including Azure Confidential Compute related properties. */
  platformCapabilities?: PlatformCapabilities;
}

export function systemTopicSerializer(item: SystemTopic): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "source",
      "topicType",
      "encryption",
      "platformCapabilities",
    ])
      ? undefined
      : _systemTopicPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
  };
}

export function systemTopicDeserializer(item: any): SystemTopic {
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
      : _systemTopicPropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : identityInfoDeserializer(item["identity"]),
  };
}

/** Properties of the System Topic. */
export interface SystemTopicProperties {
  /** Provisioning state of the system topic. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Source for the system topic. */
  source?: string;
  /** TopicType for the system topic. */
  topicType?: string;
  /** Metric resource id for the system topic. */
  readonly metricResourceId?: string;
  /** Key encryption configuration properties of the system topic resource. This is an optional property. When not specified, no key encryption is used. */
  encryption?: KeyEncryption;
  /** Represents the platform capabilities of the resource, including Azure Confidential Compute related properties. */
  platformCapabilities?: PlatformCapabilities;
}

export function systemTopicPropertiesSerializer(item: SystemTopicProperties): any {
  return {
    source: item["source"],
    topicType: item["topicType"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionSerializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
  };
}

export function systemTopicPropertiesDeserializer(item: any): SystemTopicProperties {
  return {
    provisioningState: item["provisioningState"],
    source: item["source"],
    topicType: item["topicType"],
    metricResourceId: item["metricResourceId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionDeserializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
  };
}

/** Properties of the Encryption settings. */
export interface KeyEncryption {
  /** List of all customer-managed key encryption properties for the resource. However only one key is supported at a time. */
  customerManagedKeyEncryption: CustomerManagedKeyEncryption[];
}

export function keyEncryptionSerializer(item: KeyEncryption): any {
  return {
    customerManagedKeyEncryption: customerManagedKeyEncryptionArraySerializer(
      item["customerManagedKeyEncryption"],
    ),
  };
}

export function keyEncryptionDeserializer(item: any): KeyEncryption {
  return {
    customerManagedKeyEncryption: customerManagedKeyEncryptionArrayDeserializer(
      item["customerManagedKeyEncryption"],
    ),
  };
}

export function customerManagedKeyEncryptionArraySerializer(
  result: Array<CustomerManagedKeyEncryption>,
): any[] {
  return result.map((item) => {
    return customerManagedKeyEncryptionSerializer(item);
  });
}

export function customerManagedKeyEncryptionArrayDeserializer(
  result: Array<CustomerManagedKeyEncryption>,
): any[] {
  return result.map((item) => {
    return customerManagedKeyEncryptionDeserializer(item);
  });
}

/** All Customer-managed key encryption properties for the resource. */
export interface CustomerManagedKeyEncryption {
  /**
   * Key encryption key URL. This URL can be either versioned (e.g., https://contosovault.vault.azure.net/keys/contosokek/562a4bb76b524a1493a6afe8e536ee78), or unversioned (e.g.,
   * https://contosovault.vault.azure.net/keys/contosokek. When versioned URL is used, this version of the key will be used by Event Grid Runtime even if it is rotated. It is user
   * responsibility to update the URL with the new version by updating the namespace resource. When URL without version is used, Event Grid will query and get latest version and will
   * be used automatically.
   */
  keyEncryptionKeyUrl: string;
  /**
   * All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. This is an optional property.
   * When not specified, the SystemAssigned identity will be used.
   */
  keyEncryptionKeyIdentity?: KeyEncryptionKeyIdentity;
  /**
   * The state of the Customer Managed Key (CMK) encryption. This is a read-only property which determines if the associated key is active and valid and used
   * actively by runtime as expected. When the associated CMK becomes invalid (e.g., if it is deleted, or if versioned CMK is not current anymore), Event Grid
   * Service will set this state to disabled to indicate that this key is not valid anymore and requires action from user.
   */
  readonly keyEncryptionKeyStatus?: KeyEncryptionKeyStatus;
  /**
   * Friendly description about the Customer Managed Key (CMK) encryption state. This is a read-only property which determines why the associated key is revoked which
   * will help user to mitigate the issue and re-enable the CMK key.
   */
  readonly keyEncryptionKeyStatusFriendlyDescription?: string;
}

export function customerManagedKeyEncryptionSerializer(item: CustomerManagedKeyEncryption): any {
  return {
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
  };
}

export function customerManagedKeyEncryptionDeserializer(item: any): CustomerManagedKeyEncryption {
  return {
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyStatus: item["keyEncryptionKeyStatus"],
    keyEncryptionKeyStatusFriendlyDescription: item["keyEncryptionKeyStatusFriendlyDescription"],
  };
}

/** model interface KeyEncryptionKeyIdentity */
export interface KeyEncryptionKeyIdentity {
  /** The type of managed identity used. Only UserAssigned or SystemAssigned Identity are supported. */
  type: KeyEncryptionIdentityType;
  /**
   * Azure Resource fully qualified Id for the user-assigned identity associated with the resource. The resource Id takes the following format:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentityResourceId?: string;
}

export function keyEncryptionKeyIdentitySerializer(item: KeyEncryptionKeyIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function keyEncryptionKeyIdentityDeserializer(item: any): KeyEncryptionKeyIdentity {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** The type of managed identity used. Only UserAssigned or SystemAssigned Identity are supported. */
export enum KnownKeyEncryptionIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The type of managed identity used. Only UserAssigned or SystemAssigned Identity are supported. \
 * {@link KnownKeyEncryptionIdentityType} can be used interchangeably with KeyEncryptionIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type KeyEncryptionIdentityType = string;

/**
 * The state of the Customer Managed Key (CMK) encryption. This is a read-only property which determines if the associated key is active and valid and used
 * actively by runtime as expected. When the associated CMK becomes invalid (e.g., if it is deleted, or if versioned CMK is not current anymore), Event Grid
 * Service will set this state to disabled to indicate that this key is not valid anymore and requires action from user.
 */
export enum KnownKeyEncryptionKeyStatus {
  /** Active */
  Active = "Active",
  /** Revoked */
  Revoked = "Revoked",
}

/**
 * The state of the Customer Managed Key (CMK) encryption. This is a read-only property which determines if the associated key is active and valid and used
 * actively by runtime as expected. When the associated CMK becomes invalid (e.g., if it is deleted, or if versioned CMK is not current anymore), Event Grid
 * Service will set this state to disabled to indicate that this key is not valid anymore and requires action from user. \
 * {@link KnownKeyEncryptionKeyStatus} can be used interchangeably with KeyEncryptionKeyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Revoked**: Revoked
 */
export type KeyEncryptionKeyStatus = string;

/** Platform capabilities properties of the resource. */
export interface PlatformCapabilities {
  /** Represents the Azure Confidential Compute properties of the resource. */
  confidentialCompute?: ConfidentialCompute;
}

export function platformCapabilitiesSerializer(item: PlatformCapabilities): any {
  return {
    confidentialCompute: !item["confidentialCompute"]
      ? item["confidentialCompute"]
      : confidentialComputeSerializer(item["confidentialCompute"]),
  };
}

export function platformCapabilitiesDeserializer(item: any): PlatformCapabilities {
  return {
    confidentialCompute: !item["confidentialCompute"]
      ? item["confidentialCompute"]
      : confidentialComputeDeserializer(item["confidentialCompute"]),
  };
}

/** Azure Confidential Compute properties of the resource. */
export interface ConfidentialCompute {
  /**
   * This property specifies the mode of the Azure Confidential Compute configuration.
   * Possible values are 'Disabled' or 'Enabled'.
   * This is an immutable property set at the time of resource creation and cannot be modified later.
   * Enabling this property ensures that messages are processed and stored in a Azure Confidential Compute environment.
   */
  mode: ConfidentialComputeMode;
}

export function confidentialComputeSerializer(item: ConfidentialCompute): any {
  return { mode: item["mode"] };
}

export function confidentialComputeDeserializer(item: any): ConfidentialCompute {
  return {
    mode: item["mode"],
  };
}

/**
 * This property specifies the mode of the Azure Confidential Compute configuration.
 * Possible values are 'Disabled' or 'Enabled'.
 * This is an immutable property set at the time of resource creation and cannot be modified later.
 * Enabling this property ensures that messages are processed and stored in a Azure Confidential Compute environment.
 */
export enum KnownConfidentialComputeMode {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * This property specifies the mode of the Azure Confidential Compute configuration.
 * Possible values are 'Disabled' or 'Enabled'.
 * This is an immutable property set at the time of resource creation and cannot be modified later.
 * Enabling this property ensures that messages are processed and stored in a Azure Confidential Compute environment. \
 * {@link KnownConfidentialComputeMode} can be used interchangeably with ConfidentialComputeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type ConfidentialComputeMode = string;

/** Properties of the System Topic update. */
export interface SystemTopicUpdateParameters {
  /** Tags of the system topic. */
  tags?: Record<string, string>;
  /** Resource identity information. */
  identity?: IdentityInfo;
}

export function systemTopicUpdateParametersSerializer(item: SystemTopicUpdateParameters): any {
  return {
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
  };
}

/** Result of the List System topics operation. */
export interface _SystemTopicsListResult {
  /** The SystemTopic items on this page */
  value: SystemTopic[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _systemTopicsListResultDeserializer(item: any): _SystemTopicsListResult {
  return {
    value: systemTopicArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function systemTopicArraySerializer(result: Array<SystemTopic>): any[] {
  return result.map((item) => {
    return systemTopicSerializer(item);
  });
}

export function systemTopicArrayDeserializer(result: Array<SystemTopic>): any[] {
  return result.map((item) => {
    return systemTopicDeserializer(item);
  });
}

/** EventGrid Topic */
export interface Topic extends TrackedResource {
  /** The Sku pricing tier for the topic. */
  sku?: ResourceSku;
  /** Identity information for the resource. */
  identity?: IdentityInfo;
  /** Kind of the resource. */
  kind?: ResourceKind;
  /** Extended location of the resource. */
  extendedLocation?: ExtendedLocation;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the topic. */
  readonly provisioningState?: TopicProvisioningState;
  /** Endpoint for the topic. */
  readonly endpoint?: string;
  /**
   * Event Type Information for the user topic. This information is provided by the publisher and can be used by the
   * subscriber to view different types of events that are published.
   */
  eventTypeInfo?: EventTypeInfo;
  /** Minimum TLS version of the publisher allowed to publish to this topic */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This determines the format that Event Grid should expect for incoming events published to the topic. */
  inputSchema?: InputSchema;
  /** This enables publishing using custom event schemas. An InputSchemaMapping can be specified to map various properties of a source schema to various required properties of the EventGridEvent schema. */
  inputSchemaMapping?: InputSchemaMappingUnion;
  /** Metric resource id for the topic. */
  readonly metricResourceId?: string;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.TopicProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the topic. */
  disableLocalAuth?: boolean;
  /** Data Residency Boundary of the resource. */
  dataResidencyBoundary?: DataResidencyBoundary;
  /** Key encryption configuration properties of the topic resource. This is an optional property. When not specified, no key encryption is used. */
  encryption?: KeyEncryption;
  /** Represents the platform capabilities of the resource, including Azure Confidential Compute related properties. */
  platformCapabilities?: PlatformCapabilities;
}

export function topicSerializer(item: Topic): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "eventTypeInfo",
      "minimumTlsVersionAllowed",
      "inputSchema",
      "inputSchemaMapping",
      "publicNetworkAccess",
      "inboundIpRules",
      "disableLocalAuth",
      "dataResidencyBoundary",
      "encryption",
      "platformCapabilities",
    ])
      ? undefined
      : _topicPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
    kind: item["kind"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function topicDeserializer(item: any): Topic {
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
      : _topicPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityInfoDeserializer(item["identity"]),
    kind: item["kind"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties of the Topic. */
export interface TopicProperties {
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Provisioning state of the topic. */
  readonly provisioningState?: TopicProvisioningState;
  /** Endpoint for the topic. */
  readonly endpoint?: string;
  /**
   * Event Type Information for the user topic. This information is provided by the publisher and can be used by the
   * subscriber to view different types of events that are published.
   */
  eventTypeInfo?: EventTypeInfo;
  /** Minimum TLS version of the publisher allowed to publish to this topic */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This determines the format that Event Grid should expect for incoming events published to the topic. */
  inputSchema?: InputSchema;
  /** This enables publishing using custom event schemas. An InputSchemaMapping can be specified to map various properties of a source schema to various required properties of the EventGridEvent schema. */
  inputSchemaMapping?: InputSchemaMappingUnion;
  /** Metric resource id for the topic. */
  readonly metricResourceId?: string;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.TopicProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the topic. */
  disableLocalAuth?: boolean;
  /** Data Residency Boundary of the resource. */
  dataResidencyBoundary?: DataResidencyBoundary;
  /** Key encryption configuration properties of the topic resource. This is an optional property. When not specified, no key encryption is used. */
  encryption?: KeyEncryption;
  /** Represents the platform capabilities of the resource, including Azure Confidential Compute related properties. */
  platformCapabilities?: PlatformCapabilities;
}

export function topicPropertiesSerializer(item: TopicProperties): any {
  return {
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    inputSchema: item["inputSchema"],
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionSerializer(item["inputSchemaMapping"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionSerializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
  };
}

export function topicPropertiesDeserializer(item: any): TopicProperties {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    endpoint: item["endpoint"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoDeserializer(item["eventTypeInfo"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    inputSchema: item["inputSchema"],
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionDeserializer(item["inputSchemaMapping"]),
    metricResourceId: item["metricResourceId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionDeserializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
  };
}

/** Provisioning state of the topic. */
export enum KnownTopicProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the topic. \
 * {@link KnownTopicProvisioningState} can be used interchangeably with TopicProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type TopicProvisioningState = string;

/** Kind of the resource. */
export enum KnownResourceKind {
  /** Azure */
  Azure = "Azure",
  /** AzureArc */
  AzureArc = "AzureArc",
}

/**
 * Kind of the resource. \
 * {@link KnownResourceKind} can be used interchangeably with ResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Azure \
 * **AzureArc**: AzureArc
 */
export type ResourceKind = string;

/** Definition of an Extended Location */
export interface ExtendedLocation {
  /** Fully qualified name of the extended location. */
  name?: string;
  /** Type of the extended location. */
  type?: string;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** Properties of the Topic update */
export interface TopicUpdateParameters {
  /** Tags of the Topic resource. */
  tags?: Record<string, string>;
  /** Topic resource identity information. */
  identity?: IdentityInfo;
  /** The Sku pricing tier for the topic. */
  sku?: ResourceSku;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.TopicUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the topic. */
  disableLocalAuth?: boolean;
  /** The data residency boundary for the topic. */
  dataResidencyBoundary?: DataResidencyBoundary;
  /** The eventTypeInfo for the topic. */
  eventTypeInfo?: EventTypeInfo;
}

export function topicUpdateParametersSerializer(item: TopicUpdateParameters): any {
  return {
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identityInfoSerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "publicNetworkAccess",
      "inboundIpRules",
      "minimumTlsVersionAllowed",
      "disableLocalAuth",
      "dataResidencyBoundary",
      "eventTypeInfo",
    ])
      ? undefined
      : _topicUpdateParametersPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
  };
}

/** Information of topic update parameter properties. */
export interface TopicUpdateParameterProperties {
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   * You can further restrict to specific IPs by configuring <seealso cref="P:Microsoft.Azure.Events.ResourceProvider.Common.Contracts.TopicUpdateParameterProperties.InboundIpRules" />
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /** This can be used to restrict traffic from specific IPs instead of all IPs. Note: These are considered only if PublicNetworkAccess is enabled. */
  inboundIpRules?: InboundIpRule[];
  /** Minimum TLS version of the publisher allowed to publish to this domain */
  minimumTlsVersionAllowed?: TlsVersion;
  /** This boolean is used to enable or disable local auth. Default value is false. When the property is set to true, only Microsoft Entra ID token will be used to authenticate if user is allowed to publish to the topic. */
  disableLocalAuth?: boolean;
  /** The data residency boundary for the topic. */
  dataResidencyBoundary?: DataResidencyBoundary;
  /** The eventTypeInfo for the topic. */
  eventTypeInfo?: EventTypeInfo;
}

export function topicUpdateParameterPropertiesSerializer(
  item: TopicUpdateParameterProperties,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    disableLocalAuth: item["disableLocalAuth"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
  };
}

/** Result of the List Topics operation */
export interface _TopicsListResult {
  /** The Topic items on this page */
  value: Topic[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _topicsListResultDeserializer(item: any): _TopicsListResult {
  return {
    value: topicArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topicArraySerializer(result: Array<Topic>): any[] {
  return result.map((item) => {
    return topicSerializer(item);
  });
}

export function topicArrayDeserializer(result: Array<Topic>): any[] {
  return result.map((item) => {
    return topicDeserializer(item);
  });
}

/** Result of the List Event Types operation */
export interface _EventTypesListResult {
  /** A collection of event types */
  value?: EventType[];
  nextLink?: string;
}

export function _eventTypesListResultDeserializer(item: any): _EventTypesListResult {
  return {
    value: !item["value"] ? item["value"] : eventTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventTypeArrayDeserializer(result: Array<EventType>): any[] {
  return result.map((item) => {
    return eventTypeDeserializer(item);
  });
}

/** Event Type for a subject under a topic */
export interface EventType extends Resource {
  /** Display name of the event type. */
  displayName?: string;
  /** Description of the event type. */
  description?: string;
  /** URL of the schema for this event type. */
  schemaUrl?: string;
  /** IsInDefaultSet flag of the event type. */
  isInDefaultSet?: boolean;
}

export function eventTypeDeserializer(item: any): EventType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventTypePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the event type */
export interface EventTypeProperties {
  /** Display name of the event type. */
  displayName?: string;
  /** Description of the event type. */
  description?: string;
  /** URL of the schema for this event type. */
  schemaUrl?: string;
  /** IsInDefaultSet flag of the event type. */
  isInDefaultSet?: boolean;
}

export function eventTypePropertiesDeserializer(item: any): EventTypeProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    schemaUrl: item["schemaUrl"],
    isInDefaultSet: item["isInDefaultSet"],
  };
}

/** Event grid Extension Topic. This is used for getting Event Grid related metrics for Azure resources. */
export interface ExtensionTopic extends ExtensionResource {
  /** Description of the extension topic. */
  description?: string;
  /** System topic resource id which is mapped to the source. */
  systemTopic?: string;
}

export function extensionTopicDeserializer(item: any): ExtensionTopic {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _extensionTopicPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the Extension Topic */
export interface ExtensionTopicProperties {
  /** Description of the extension topic. */
  description?: string;
  /** System topic resource id which is mapped to the source. */
  systemTopic?: string;
}

export function extensionTopicPropertiesDeserializer(item: any): ExtensionTopicProperties {
  return {
    description: item["description"],
    systemTopic: item["systemTopic"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The Topic space resource. */
export interface TopicSpace extends ProxyResource {
  /** Description for the Topic Space resource. */
  description?: string;
  /**
   * The topic filters in the topic space.
   * Example: "topicTemplates": [
   * "devices/foo/bar",
   * "devices/topic1/+",
   * "devices/${principal.name}/${principal.attributes.keyName}" ].
   */
  topicTemplates?: string[];
  /** Provisioning state of the TopicSpace resource. */
  readonly provisioningState?: TopicSpaceProvisioningState;
}

export function topicSpaceSerializer(item: TopicSpace): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "topicTemplates"])
      ? undefined
      : _topicSpacePropertiesSerializer(item),
  };
}

export function topicSpaceDeserializer(item: any): TopicSpace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _topicSpacePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of topic space. */
export interface TopicSpaceProperties {
  /** Description for the Topic Space resource. */
  description?: string;
  /**
   * The topic filters in the topic space.
   * Example: "topicTemplates": [
   * "devices/foo/bar",
   * "devices/topic1/+",
   * "devices/${principal.name}/${principal.attributes.keyName}" ].
   */
  topicTemplates?: string[];
  /** Provisioning state of the TopicSpace resource. */
  readonly provisioningState?: TopicSpaceProvisioningState;
}

export function topicSpacePropertiesSerializer(item: TopicSpaceProperties): any {
  return {
    description: item["description"],
    topicTemplates: !item["topicTemplates"]
      ? item["topicTemplates"]
      : item["topicTemplates"].map((p: any) => {
          return p;
        }),
  };
}

export function topicSpacePropertiesDeserializer(item: any): TopicSpaceProperties {
  return {
    description: item["description"],
    topicTemplates: !item["topicTemplates"]
      ? item["topicTemplates"]
      : item["topicTemplates"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the TopicSpace resource. */
export enum KnownTopicSpaceProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning state of the TopicSpace resource. \
 * {@link KnownTopicSpaceProvisioningState} can be used interchangeably with TopicSpaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Deleted**: Deleted
 */
export type TopicSpaceProvisioningState = string;

/** Result of the List Topic Space operation. */
export interface _TopicSpacesListResult {
  /** The TopicSpace items on this page */
  value: TopicSpace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _topicSpacesListResultDeserializer(item: any): _TopicSpacesListResult {
  return {
    value: topicSpaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topicSpaceArraySerializer(result: Array<TopicSpace>): any[] {
  return result.map((item) => {
    return topicSpaceSerializer(item);
  });
}

export function topicSpaceArrayDeserializer(result: Array<TopicSpace>): any[] {
  return result.map((item) => {
    return topicSpaceDeserializer(item);
  });
}

/** Verified partner information */
export interface VerifiedPartner extends ProxyResource {
  /** ImmutableId of the corresponding partner registration. */
  partnerRegistrationImmutableId?: string;
  /** Official name of the Partner. */
  organizationName?: string;
  /** Display name of the verified partner. */
  partnerDisplayName?: string;
  /** Details of the partner topic scenario. */
  partnerTopicDetails?: PartnerDetails;
  /** Details of the partner destination scenario. */
  partnerDestinationDetails?: PartnerDetails;
  /** Provisioning state of the verified partner. */
  provisioningState?: VerifiedPartnerProvisioningState;
}

export function verifiedPartnerDeserializer(item: any): VerifiedPartner {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _verifiedPartnerPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the verified partner. */
export interface VerifiedPartnerProperties {
  /** ImmutableId of the corresponding partner registration. */
  partnerRegistrationImmutableId?: string;
  /** Official name of the Partner. */
  organizationName?: string;
  /** Display name of the verified partner. */
  partnerDisplayName?: string;
  /** Details of the partner topic scenario. */
  partnerTopicDetails?: PartnerDetails;
  /** Details of the partner destination scenario. */
  partnerDestinationDetails?: PartnerDetails;
  /** Provisioning state of the verified partner. */
  provisioningState?: VerifiedPartnerProvisioningState;
}

export function verifiedPartnerPropertiesDeserializer(item: any): VerifiedPartnerProperties {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    organizationName: item["organizationName"],
    partnerDisplayName: item["partnerDisplayName"],
    partnerTopicDetails: !item["partnerTopicDetails"]
      ? item["partnerTopicDetails"]
      : partnerDetailsDeserializer(item["partnerTopicDetails"]),
    partnerDestinationDetails: !item["partnerDestinationDetails"]
      ? item["partnerDestinationDetails"]
      : partnerDetailsDeserializer(item["partnerDestinationDetails"]),
    provisioningState: item["provisioningState"],
  };
}

/** Information about the partner. */
export interface PartnerDetails {
  /** This is short description about the partner. The length of this description should not exceed 256 characters. */
  description?: string;
  /** Long description for the partner's scenarios and integration.Length of this description should not exceed 2048 characters. */
  longDescription?: string;
  /**
   * URI of the partner website that can be used by Azure customers to setup Event Grid
   * integration on an event source.
   */
  setupUri?: string;
}

export function partnerDetailsDeserializer(item: any): PartnerDetails {
  return {
    description: item["description"],
    longDescription: item["longDescription"],
    setupUri: item["setupUri"],
  };
}

/** Provisioning state of the verified partner. */
export enum KnownVerifiedPartnerProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the verified partner. \
 * {@link KnownVerifiedPartnerProvisioningState} can be used interchangeably with VerifiedPartnerProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type VerifiedPartnerProvisioningState = string;

/** Result of the List Topic Types operation */
export interface _VerifiedPartnersListResult {
  /** The VerifiedPartner items on this page */
  value: VerifiedPartner[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _verifiedPartnersListResultDeserializer(item: any): _VerifiedPartnersListResult {
  return {
    value: verifiedPartnerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function verifiedPartnerArrayDeserializer(result: Array<VerifiedPartner>): any[] {
  return result.map((item) => {
    return verifiedPartnerDeserializer(item);
  });
}

/** Event Subscription. */
export interface Subscription extends ProxyResource {
  /** Provisioning state of the event subscription. */
  readonly provisioningState?: SubscriptionProvisioningState;
  /** Information about the delivery configuration of the event subscription. */
  deliveryConfiguration?: DeliveryConfiguration;
  /** The event delivery schema for the event subscription. */
  eventDeliverySchema?: DeliverySchema;
  /** Information about the filter for the event subscription. */
  filtersConfiguration?: FiltersConfiguration;
  /** Expiration time of the event subscription. */
  expirationTimeUtc?: Date;
  /** Tags relating to Event Subscription resource. */
  tags?: Record<string, string>;
}

export function subscriptionSerializer(item: Subscription): any {
  return {
    properties: areAllPropsUndefined(item, [
      "deliveryConfiguration",
      "eventDeliverySchema",
      "filtersConfiguration",
      "expirationTimeUtc",
      "tags",
    ])
      ? undefined
      : _subscriptionPropertiesSerializer(item),
  };
}

export function subscriptionDeserializer(item: any): Subscription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _subscriptionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the event subscription. */
export interface SubscriptionProperties {
  /** Provisioning state of the event subscription. */
  readonly provisioningState?: SubscriptionProvisioningState;
  /** Information about the delivery configuration of the event subscription. */
  deliveryConfiguration?: DeliveryConfiguration;
  /** The event delivery schema for the event subscription. */
  eventDeliverySchema?: DeliverySchema;
  /** Information about the filter for the event subscription. */
  filtersConfiguration?: FiltersConfiguration;
  /** Expiration time of the event subscription. */
  expirationTimeUtc?: Date;
  /** Tags relating to Event Subscription resource. */
  tags?: Record<string, string>;
}

export function subscriptionPropertiesSerializer(item: SubscriptionProperties): any {
  return {
    deliveryConfiguration: !item["deliveryConfiguration"]
      ? item["deliveryConfiguration"]
      : deliveryConfigurationSerializer(item["deliveryConfiguration"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    filtersConfiguration: !item["filtersConfiguration"]
      ? item["filtersConfiguration"]
      : filtersConfigurationSerializer(item["filtersConfiguration"]),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    tags: item["tags"],
  };
}

export function subscriptionPropertiesDeserializer(item: any): SubscriptionProperties {
  return {
    provisioningState: item["provisioningState"],
    deliveryConfiguration: !item["deliveryConfiguration"]
      ? item["deliveryConfiguration"]
      : deliveryConfigurationDeserializer(item["deliveryConfiguration"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    filtersConfiguration: !item["filtersConfiguration"]
      ? item["filtersConfiguration"]
      : filtersConfigurationDeserializer(item["filtersConfiguration"]),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : new Date(item["expirationTimeUtc"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Provisioning state of the event subscription. */
export enum KnownSubscriptionProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** AwaitingManualAction */
  AwaitingManualAction = "AwaitingManualAction",
  /** Deleted */
  Deleted = "Deleted",
  /** DeleteFailed */
  DeleteFailed = "DeleteFailed",
  /** CreateFailed */
  CreateFailed = "CreateFailed",
  /** UpdatedFailed */
  UpdatedFailed = "UpdatedFailed",
}

/**
 * Provisioning state of the event subscription. \
 * {@link KnownSubscriptionProvisioningState} can be used interchangeably with SubscriptionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **AwaitingManualAction**: AwaitingManualAction \
 * **Deleted**: Deleted \
 * **DeleteFailed**: DeleteFailed \
 * **CreateFailed**: CreateFailed \
 * **UpdatedFailed**: UpdatedFailed
 */
export type SubscriptionProvisioningState = string;

/** Properties of the delivery configuration information of the event subscription. */
export interface DeliveryConfiguration {
  /** Delivery mode of the event subscription. */
  deliveryMode?: DeliveryMode;
  /** This property should be populated when deliveryMode is queue and represents information about the queue subscription. */
  queue?: QueueInfo;
  /** This property should be populated when deliveryMode is push and represents information about the push subscription. */
  push?: PushInfo;
}

export function deliveryConfigurationSerializer(item: DeliveryConfiguration): any {
  return {
    deliveryMode: item["deliveryMode"],
    queue: !item["queue"] ? item["queue"] : queueInfoSerializer(item["queue"]),
    push: !item["push"] ? item["push"] : pushInfoSerializer(item["push"]),
  };
}

export function deliveryConfigurationDeserializer(item: any): DeliveryConfiguration {
  return {
    deliveryMode: item["deliveryMode"],
    queue: !item["queue"] ? item["queue"] : queueInfoDeserializer(item["queue"]),
    push: !item["push"] ? item["push"] : pushInfoDeserializer(item["push"]),
  };
}

/** Delivery mode of the event subscription. */
export enum KnownDeliveryMode {
  /** Queue */
  Queue = "Queue",
  /** Push */
  Push = "Push",
}

/**
 * Delivery mode of the event subscription. \
 * {@link KnownDeliveryMode} can be used interchangeably with DeliveryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queue**: Queue \
 * **Push**: Push
 */
export type DeliveryMode = string;

/** Properties of the Queue info for event subscription. */
export interface QueueInfo {
  /**
   * Maximum period in seconds in which once the message is in received (by the client) state and waiting to be accepted, released or rejected.
   * If this time elapsed after a message has been received by the client and not transitioned into accepted (not processed), released or rejected,
   * the message is available for redelivery. This is an optional field, where default is 60 seconds, minimum is 60 seconds and maximum is 300 seconds.
   */
  receiveLockDurationInSeconds?: number;
  /** The maximum delivery count of the events. */
  maxDeliveryCount?: number;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses the managed identity setup on the parent resource (namely, topic) to acquire the authentication tokens being used during delivery / dead-lettering.
   */
  deadLetterDestinationWithResourceIdentity?: DeadLetterWithResourceIdentity;
  /**
   * Time span duration in ISO 8601 format that determines how long messages are available to the subscription from the time the message was published.
   * This duration value is expressed using the following format: \'P(n)Y(n)M(n)DT(n)H(n)M(n)S\', where:
   * - (n) is replaced by the value of each time element that follows the (n).
   * - P is the duration (or Period) designator and is always placed at the beginning of the duration.
   * - Y is the year designator, and it follows the value for the number of years.
   * - M is the month designator, and it follows the value for the number of months.
   * - W is the week designator, and it follows the value for the number of weeks.
   * - D is the day designator, and it follows the value for the number of days.
   * - T is the time designator, and it precedes the time components.
   * - H is the hour designator, and it follows the value for the number of hours.
   * - M is the minute designator, and it follows the value for the number of minutes.
   * - S is the second designator, and it follows the value for the number of seconds.
   * This duration value cannot be set greater than the topic’s EventRetentionInDays. It is is an optional field where its minimum value is 1 minute, and its maximum is determined
   * by topic’s EventRetentionInDays value. The followings are examples of valid values:
   * - \'P0DT23H12M\' or \'PT23H12M\': for duration of 23 hours and 12 minutes.
   * - \'P1D\' or \'P1DT0H0M0S\': for duration of 1 day.
   */
  eventTimeToLive?: string;
}

export function queueInfoSerializer(item: QueueInfo): any {
  return {
    receiveLockDurationInSeconds: item["receiveLockDurationInSeconds"],
    maxDeliveryCount: item["maxDeliveryCount"],
    deadLetterDestinationWithResourceIdentity: !item["deadLetterDestinationWithResourceIdentity"]
      ? item["deadLetterDestinationWithResourceIdentity"]
      : deadLetterWithResourceIdentitySerializer(item["deadLetterDestinationWithResourceIdentity"]),
    eventTimeToLive: item["eventTimeToLive"],
  };
}

export function queueInfoDeserializer(item: any): QueueInfo {
  return {
    receiveLockDurationInSeconds: item["receiveLockDurationInSeconds"],
    maxDeliveryCount: item["maxDeliveryCount"],
    deadLetterDestinationWithResourceIdentity: !item["deadLetterDestinationWithResourceIdentity"]
      ? item["deadLetterDestinationWithResourceIdentity"]
      : deadLetterWithResourceIdentityDeserializer(
          item["deadLetterDestinationWithResourceIdentity"],
        ),
    eventTimeToLive: item["eventTimeToLive"],
  };
}

/** Properties of the destination info for event subscription supporting push. */
export interface PushInfo {
  /** The maximum delivery count of the events. */
  maxDeliveryCount?: number;
  /**
   * Time span duration in ISO 8601 format that determines how long messages are available to the subscription from the time the message was published.
   * This duration value is expressed using the following format: \'P(n)Y(n)M(n)DT(n)H(n)M(n)S\', where:
   * - (n) is replaced by the value of each time element that follows the (n).
   * - P is the duration (or Period) designator and is always placed at the beginning of the duration.
   * - Y is the year designator, and it follows the value for the number of years.
   * - M is the month designator, and it follows the value for the number of months.
   * - W is the week designator, and it follows the value for the number of weeks.
   * - D is the day designator, and it follows the value for the number of days.
   * - T is the time designator, and it precedes the time components.
   * - H is the hour designator, and it follows the value for the number of hours.
   * - M is the minute designator, and it follows the value for the number of minutes.
   * - S is the second designator, and it follows the value for the number of seconds.
   * This duration value cannot be set greater than the topic’s EventRetentionInDays. It is is an optional field where its minimum value is 1 minute, and its maximum is determined
   * by topic’s EventRetentionInDays value. The followings are examples of valid values:
   * - \'P0DT23H12M\' or \'PT23H12M\': for duration of 23 hours and 12 minutes.
   * - \'P1D\' or \'P1DT0H0M0S\': for duration of 1 day.
   */
  eventTimeToLive?: string;
  /**
   * The dead letter destination of the event subscription. Any event that cannot be delivered to its' destination is sent to the dead letter destination.
   * Uses the managed identity setup on the parent resource (namely, namespace) to acquire the authentication tokens being used during dead-lettering.
   */
  deadLetterDestinationWithResourceIdentity?: DeadLetterWithResourceIdentity;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses the managed identity setup on the parent resource (namely, topic or domain) to acquire the authentication tokens being used during delivery.
   */
  deliveryWithResourceIdentity?: DeliveryWithResourceIdentity;
  /**
   * Information about the destination where events have to be delivered for the event subscription.
   * Uses Azure Event Grid's identity to acquire the authentication tokens being used during delivery.
   */
  destination?: EventSubscriptionDestinationUnion;
}

export function pushInfoSerializer(item: PushInfo): any {
  return {
    maxDeliveryCount: item["maxDeliveryCount"],
    eventTimeToLive: item["eventTimeToLive"],
    deadLetterDestinationWithResourceIdentity: !item["deadLetterDestinationWithResourceIdentity"]
      ? item["deadLetterDestinationWithResourceIdentity"]
      : deadLetterWithResourceIdentitySerializer(item["deadLetterDestinationWithResourceIdentity"]),
    deliveryWithResourceIdentity: !item["deliveryWithResourceIdentity"]
      ? item["deliveryWithResourceIdentity"]
      : deliveryWithResourceIdentitySerializer(item["deliveryWithResourceIdentity"]),
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionSerializer(item["destination"]),
  };
}

export function pushInfoDeserializer(item: any): PushInfo {
  return {
    maxDeliveryCount: item["maxDeliveryCount"],
    eventTimeToLive: item["eventTimeToLive"],
    deadLetterDestinationWithResourceIdentity: !item["deadLetterDestinationWithResourceIdentity"]
      ? item["deadLetterDestinationWithResourceIdentity"]
      : deadLetterWithResourceIdentityDeserializer(
          item["deadLetterDestinationWithResourceIdentity"],
        ),
    deliveryWithResourceIdentity: !item["deliveryWithResourceIdentity"]
      ? item["deliveryWithResourceIdentity"]
      : deliveryWithResourceIdentityDeserializer(item["deliveryWithResourceIdentity"]),
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionDeserializer(item["destination"]),
  };
}

/** The event delivery schema for the event subscription. */
export enum KnownDeliverySchema {
  /** CloudEventSchemaV1_0 */
  CloudEventSchemaV10 = "CloudEventSchemaV1_0",
}

/**
 * The event delivery schema for the event subscription. \
 * {@link KnownDeliverySchema} can be used interchangeably with DeliverySchema,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CloudEventSchemaV1_0**: CloudEventSchemaV1_0
 */
export type DeliverySchema = string;

/** Filters configuration for the Event Subscription. */
export interface FiltersConfiguration {
  /** A list of applicable event types that need to be part of the event subscription. If it is desired to subscribe to all default event types, set the IncludedEventTypes to null. */
  includedEventTypes?: string[];
  /** An array of filters that are used for filtering event subscriptions. */
  filters?: FilterUnion[];
}

export function filtersConfigurationSerializer(item: FiltersConfiguration): any {
  return {
    includedEventTypes: !item["includedEventTypes"]
      ? item["includedEventTypes"]
      : item["includedEventTypes"].map((p: any) => {
          return p;
        }),
    filters: !item["filters"] ? item["filters"] : filterUnionArraySerializer(item["filters"]),
  };
}

export function filtersConfigurationDeserializer(item: any): FiltersConfiguration {
  return {
    includedEventTypes: !item["includedEventTypes"]
      ? item["includedEventTypes"]
      : item["includedEventTypes"].map((p: any) => {
          return p;
        }),
    filters: !item["filters"] ? item["filters"] : filterUnionArrayDeserializer(item["filters"]),
  };
}

export function filterUnionArraySerializer(result: Array<FilterUnion>): any[] {
  return result.map((item) => {
    return filterUnionSerializer(item);
  });
}

export function filterUnionArrayDeserializer(result: Array<FilterUnion>): any[] {
  return result.map((item) => {
    return filterUnionDeserializer(item);
  });
}

/**
 * This is the base type that represents a filter. To configure a filter, do not directly instantiate an object of this class. Instead, instantiate
 * an object of a derived class such as BoolEqualsFilter, NumberInFilter etc depending on the type of the key based on
 * which you want to filter.
 */
export interface Filter {
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  /** The discriminator possible values: NumberIn, NumberNotIn, NumberLessThan, NumberGreaterThan, NumberLessThanOrEquals, NumberGreaterThanOrEquals, BoolEquals, StringIn, StringNotIn, StringBeginsWith, StringEndsWith, StringContains, NumberInRange, NumberNotInRange, StringNotBeginsWith, StringNotEndsWith, StringNotContains, IsNullOrUndefined, IsNotNull */
  operatorType: FilterOperatorType;
  /** The field/property in the event based on which you want to filter. */
  key?: string;
}

export function filterSerializer(item: Filter): any {
  return { operatorType: item["operatorType"], key: item["key"] };
}

export function filterDeserializer(item: any): Filter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
  };
}

/** Alias for FilterUnion */
export type FilterUnion =
  | NumberInFilter
  | NumberNotInFilter
  | NumberLessThanFilter
  | NumberGreaterThanFilter
  | NumberLessThanOrEqualsFilter
  | NumberGreaterThanOrEqualsFilter
  | BoolEqualsFilter
  | StringInFilter
  | StringNotInFilter
  | StringBeginsWithFilter
  | StringEndsWithFilter
  | StringContainsFilter
  | NumberInRangeFilter
  | NumberNotInRangeFilter
  | StringNotBeginsWithFilter
  | StringNotEndsWithFilter
  | StringNotContainsFilter
  | IsNullOrUndefinedFilter
  | IsNotNullFilter
  | Filter;

export function filterUnionSerializer(item: FilterUnion): any {
  switch (item.operatorType) {
    case "NumberIn":
      return numberInFilterSerializer(item as NumberInFilter);

    case "NumberNotIn":
      return numberNotInFilterSerializer(item as NumberNotInFilter);

    case "NumberLessThan":
      return numberLessThanFilterSerializer(item as NumberLessThanFilter);

    case "NumberGreaterThan":
      return numberGreaterThanFilterSerializer(item as NumberGreaterThanFilter);

    case "NumberLessThanOrEquals":
      return numberLessThanOrEqualsFilterSerializer(item as NumberLessThanOrEqualsFilter);

    case "NumberGreaterThanOrEquals":
      return numberGreaterThanOrEqualsFilterSerializer(item as NumberGreaterThanOrEqualsFilter);

    case "BoolEquals":
      return boolEqualsFilterSerializer(item as BoolEqualsFilter);

    case "StringIn":
      return stringInFilterSerializer(item as StringInFilter);

    case "StringNotIn":
      return stringNotInFilterSerializer(item as StringNotInFilter);

    case "StringBeginsWith":
      return stringBeginsWithFilterSerializer(item as StringBeginsWithFilter);

    case "StringEndsWith":
      return stringEndsWithFilterSerializer(item as StringEndsWithFilter);

    case "StringContains":
      return stringContainsFilterSerializer(item as StringContainsFilter);

    case "NumberInRange":
      return numberInRangeFilterSerializer(item as NumberInRangeFilter);

    case "NumberNotInRange":
      return numberNotInRangeFilterSerializer(item as NumberNotInRangeFilter);

    case "StringNotBeginsWith":
      return stringNotBeginsWithFilterSerializer(item as StringNotBeginsWithFilter);

    case "StringNotEndsWith":
      return stringNotEndsWithFilterSerializer(item as StringNotEndsWithFilter);

    case "StringNotContains":
      return stringNotContainsFilterSerializer(item as StringNotContainsFilter);

    case "IsNullOrUndefined":
      return isNullOrUndefinedFilterSerializer(item as IsNullOrUndefinedFilter);

    case "IsNotNull":
      return isNotNullFilterSerializer(item as IsNotNullFilter);

    default:
      return filterSerializer(item);
  }
}

export function filterUnionDeserializer(item: any): FilterUnion {
  switch (item["operatorType"]) {
    case "NumberIn":
      return numberInFilterDeserializer(item as NumberInFilter);

    case "NumberNotIn":
      return numberNotInFilterDeserializer(item as NumberNotInFilter);

    case "NumberLessThan":
      return numberLessThanFilterDeserializer(item as NumberLessThanFilter);

    case "NumberGreaterThan":
      return numberGreaterThanFilterDeserializer(item as NumberGreaterThanFilter);

    case "NumberLessThanOrEquals":
      return numberLessThanOrEqualsFilterDeserializer(item as NumberLessThanOrEqualsFilter);

    case "NumberGreaterThanOrEquals":
      return numberGreaterThanOrEqualsFilterDeserializer(item as NumberGreaterThanOrEqualsFilter);

    case "BoolEquals":
      return boolEqualsFilterDeserializer(item as BoolEqualsFilter);

    case "StringIn":
      return stringInFilterDeserializer(item as StringInFilter);

    case "StringNotIn":
      return stringNotInFilterDeserializer(item as StringNotInFilter);

    case "StringBeginsWith":
      return stringBeginsWithFilterDeserializer(item as StringBeginsWithFilter);

    case "StringEndsWith":
      return stringEndsWithFilterDeserializer(item as StringEndsWithFilter);

    case "StringContains":
      return stringContainsFilterDeserializer(item as StringContainsFilter);

    case "NumberInRange":
      return numberInRangeFilterDeserializer(item as NumberInRangeFilter);

    case "NumberNotInRange":
      return numberNotInRangeFilterDeserializer(item as NumberNotInRangeFilter);

    case "StringNotBeginsWith":
      return stringNotBeginsWithFilterDeserializer(item as StringNotBeginsWithFilter);

    case "StringNotEndsWith":
      return stringNotEndsWithFilterDeserializer(item as StringNotEndsWithFilter);

    case "StringNotContains":
      return stringNotContainsFilterDeserializer(item as StringNotContainsFilter);

    case "IsNullOrUndefined":
      return isNullOrUndefinedFilterDeserializer(item as IsNullOrUndefinedFilter);

    case "IsNotNull":
      return isNotNullFilterDeserializer(item as IsNotNullFilter);

    default:
      return filterDeserializer(item);
  }
}

/** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
export enum KnownFilterOperatorType {
  /** NumberIn */
  NumberIn = "NumberIn",
  /** NumberNotIn */
  NumberNotIn = "NumberNotIn",
  /** NumberLessThan */
  NumberLessThan = "NumberLessThan",
  /** NumberGreaterThan */
  NumberGreaterThan = "NumberGreaterThan",
  /** NumberLessThanOrEquals */
  NumberLessThanOrEquals = "NumberLessThanOrEquals",
  /** NumberGreaterThanOrEquals */
  NumberGreaterThanOrEquals = "NumberGreaterThanOrEquals",
  /** BoolEquals */
  BoolEquals = "BoolEquals",
  /** StringIn */
  StringIn = "StringIn",
  /** StringNotIn */
  StringNotIn = "StringNotIn",
  /** StringBeginsWith */
  StringBeginsWith = "StringBeginsWith",
  /** StringEndsWith */
  StringEndsWith = "StringEndsWith",
  /** StringContains */
  StringContains = "StringContains",
  /** NumberInRange */
  NumberInRange = "NumberInRange",
  /** NumberNotInRange */
  NumberNotInRange = "NumberNotInRange",
  /** StringNotBeginsWith */
  StringNotBeginsWith = "StringNotBeginsWith",
  /** StringNotEndsWith */
  StringNotEndsWith = "StringNotEndsWith",
  /** StringNotContains */
  StringNotContains = "StringNotContains",
  /** IsNullOrUndefined */
  IsNullOrUndefined = "IsNullOrUndefined",
  /** IsNotNull */
  IsNotNull = "IsNotNull",
}

/**
 * The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. \
 * {@link KnownFilterOperatorType} can be used interchangeably with FilterOperatorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NumberIn**: NumberIn \
 * **NumberNotIn**: NumberNotIn \
 * **NumberLessThan**: NumberLessThan \
 * **NumberGreaterThan**: NumberGreaterThan \
 * **NumberLessThanOrEquals**: NumberLessThanOrEquals \
 * **NumberGreaterThanOrEquals**: NumberGreaterThanOrEquals \
 * **BoolEquals**: BoolEquals \
 * **StringIn**: StringIn \
 * **StringNotIn**: StringNotIn \
 * **StringBeginsWith**: StringBeginsWith \
 * **StringEndsWith**: StringEndsWith \
 * **StringContains**: StringContains \
 * **NumberInRange**: NumberInRange \
 * **NumberNotInRange**: NumberNotInRange \
 * **StringNotBeginsWith**: StringNotBeginsWith \
 * **StringNotEndsWith**: StringNotEndsWith \
 * **StringNotContains**: StringNotContains \
 * **IsNullOrUndefined**: IsNullOrUndefined \
 * **IsNotNull**: IsNotNull
 */
export type FilterOperatorType = string;

/** NumberIn Filter. */
export interface NumberInFilter extends Filter {
  /** The set of filter values. */
  values?: number[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberIn";
}

export function numberInFilterSerializer(item: NumberInFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function numberInFilterDeserializer(item: any): NumberInFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** NumberNotIn Filter. */
export interface NumberNotInFilter extends Filter {
  /** The set of filter values. */
  values?: number[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberNotIn";
}

export function numberNotInFilterSerializer(item: NumberNotInFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function numberNotInFilterDeserializer(item: any): NumberNotInFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** NumberLessThan Filter. */
export interface NumberLessThanFilter extends Filter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberLessThan";
}

export function numberLessThanFilterSerializer(item: NumberLessThanFilter): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberLessThanFilterDeserializer(item: any): NumberLessThanFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** NumberGreaterThan Filter. */
export interface NumberGreaterThanFilter extends Filter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberGreaterThan";
}

export function numberGreaterThanFilterSerializer(item: NumberGreaterThanFilter): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberGreaterThanFilterDeserializer(item: any): NumberGreaterThanFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** NumberLessThanOrEquals Filter. */
export interface NumberLessThanOrEqualsFilter extends Filter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberLessThanOrEquals";
}

export function numberLessThanOrEqualsFilterSerializer(item: NumberLessThanOrEqualsFilter): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberLessThanOrEqualsFilterDeserializer(item: any): NumberLessThanOrEqualsFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** NumberGreaterThanOrEquals Filter. */
export interface NumberGreaterThanOrEqualsFilter extends Filter {
  /** The filter value. */
  value?: number;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberGreaterThanOrEquals";
}

export function numberGreaterThanOrEqualsFilterSerializer(
  item: NumberGreaterThanOrEqualsFilter,
): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function numberGreaterThanOrEqualsFilterDeserializer(
  item: any,
): NumberGreaterThanOrEqualsFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** BoolEquals Filter. */
export interface BoolEqualsFilter extends Filter {
  /** The boolean filter value. */
  value?: boolean;
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "BoolEquals";
}

export function boolEqualsFilterSerializer(item: BoolEqualsFilter): any {
  return { operatorType: item["operatorType"], key: item["key"], value: item["value"] };
}

export function boolEqualsFilterDeserializer(item: any): BoolEqualsFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    value: item["value"],
  };
}

/** StringIn Filter. */
export interface StringInFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringIn";
}

export function stringInFilterSerializer(item: StringInFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringInFilterDeserializer(item: any): StringInFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringNotIn Filter. */
export interface StringNotInFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotIn";
}

export function stringNotInFilterSerializer(item: StringNotInFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotInFilterDeserializer(item: any): StringNotInFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringBeginsWith Filter. */
export interface StringBeginsWithFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringBeginsWith";
}

export function stringBeginsWithFilterSerializer(item: StringBeginsWithFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringBeginsWithFilterDeserializer(item: any): StringBeginsWithFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringEndsWith Filter. */
export interface StringEndsWithFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringEndsWith";
}

export function stringEndsWithFilterSerializer(item: StringEndsWithFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringEndsWithFilterDeserializer(item: any): StringEndsWithFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringContains Filter. */
export interface StringContainsFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringContains";
}

export function stringContainsFilterSerializer(item: StringContainsFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringContainsFilterDeserializer(item: any): StringContainsFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** NumberInRange Filter. */
export interface NumberInRangeFilter extends Filter {
  /** The set of filter values. */
  values?: number[][];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberInRange";
}

export function numberInRangeFilterSerializer(item: NumberInRangeFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
  };
}

export function numberInRangeFilterDeserializer(item: any): NumberInRangeFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

/** NumberNotInRange Filter. */
export interface NumberNotInRangeFilter extends Filter {
  /** The set of filter values. */
  values?: number[][];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "NumberNotInRange";
}

export function numberNotInRangeFilterSerializer(item: NumberNotInRangeFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
  };
}

export function numberNotInRangeFilterDeserializer(item: any): NumberNotInRangeFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

/** StringNotBeginsWith Filter. */
export interface StringNotBeginsWithFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotBeginsWith";
}

export function stringNotBeginsWithFilterSerializer(item: StringNotBeginsWithFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotBeginsWithFilterDeserializer(item: any): StringNotBeginsWithFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringNotEndsWith Filter. */
export interface StringNotEndsWithFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotEndsWith";
}

export function stringNotEndsWithFilterSerializer(item: StringNotEndsWithFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotEndsWithFilterDeserializer(item: any): StringNotEndsWithFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** StringNotContains Filter. */
export interface StringNotContainsFilter extends Filter {
  /** The set of filter values. */
  values?: string[];
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "StringNotContains";
}

export function stringNotContainsFilterSerializer(item: StringNotContainsFilter): any {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function stringNotContainsFilterDeserializer(item: any): StringNotContainsFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** IsNullOrUndefined Filter. */
export interface IsNullOrUndefinedFilter extends Filter {
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "IsNullOrUndefined";
}

export function isNullOrUndefinedFilterSerializer(item: IsNullOrUndefinedFilter): any {
  return { operatorType: item["operatorType"], key: item["key"] };
}

export function isNullOrUndefinedFilterDeserializer(item: any): IsNullOrUndefinedFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
  };
}

/** IsNotNull Filter. */
export interface IsNotNullFilter extends Filter {
  /** The operator type used for filtering, e.g., NumberIn, StringContains, BoolEquals and others. */
  operatorType: "IsNotNull";
}

export function isNotNullFilterSerializer(item: IsNotNullFilter): any {
  return { operatorType: item["operatorType"], key: item["key"] };
}

export function isNotNullFilterDeserializer(item: any): IsNotNullFilter {
  return {
    operatorType: item["operatorType"],
    key: item["key"],
  };
}

/** Properties of the Event Subscription update. */
export interface SubscriptionUpdateParameters {
  /** Information about the delivery configuration of the event subscription. */
  deliveryConfiguration?: DeliveryConfiguration;
  /** The event delivery schema for the event subscription. */
  eventDeliverySchema?: DeliverySchema;
  /** Information about the filter for the event subscription. */
  filtersConfiguration?: FiltersConfiguration;
  /** Expiration time of the event subscription. */
  expirationTimeUtc?: Date;
  /** Tags relating to Event Subscription resource. */
  tags?: Record<string, string>;
}

export function subscriptionUpdateParametersSerializer(item: SubscriptionUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "deliveryConfiguration",
      "eventDeliverySchema",
      "filtersConfiguration",
      "expirationTimeUtc",
      "tags",
    ])
      ? undefined
      : _subscriptionUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties of the Event Subscription update parameters. */
export interface SubscriptionUpdateParametersProperties {
  /** Information about the delivery configuration of the event subscription. */
  deliveryConfiguration?: DeliveryConfiguration;
  /** The event delivery schema for the event subscription. */
  eventDeliverySchema?: DeliverySchema;
  /** Information about the filter for the event subscription. */
  filtersConfiguration?: FiltersConfiguration;
  /** Expiration time of the event subscription. */
  expirationTimeUtc?: Date;
  /** Tags relating to Event Subscription resource. */
  tags?: Record<string, string>;
}

export function subscriptionUpdateParametersPropertiesSerializer(
  item: SubscriptionUpdateParametersProperties,
): any {
  return {
    deliveryConfiguration: !item["deliveryConfiguration"]
      ? item["deliveryConfiguration"]
      : deliveryConfigurationSerializer(item["deliveryConfiguration"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    filtersConfiguration: !item["filtersConfiguration"]
      ? item["filtersConfiguration"]
      : filtersConfigurationSerializer(item["filtersConfiguration"]),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    tags: item["tags"],
  };
}

/** Result of the List event subscriptions operation. */
export interface _SubscriptionsListResult {
  /** The Subscription items on this page */
  value: Subscription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _subscriptionsListResultDeserializer(item: any): _SubscriptionsListResult {
  return {
    value: subscriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subscriptionArraySerializer(result: Array<Subscription>): any[] {
  return result.map((item) => {
    return subscriptionSerializer(item);
  });
}

export function subscriptionArrayDeserializer(result: Array<Subscription>): any[] {
  return result.map((item) => {
    return subscriptionDeserializer(item);
  });
}

/** Full endpoint URL of an event subscription */
export interface SubscriptionFullUrl {
  /** The URL that represents the endpoint of the destination of an event subscription. */
  endpointUrl?: string;
}

export function subscriptionFullUrlDeserializer(item: any): SubscriptionFullUrl {
  return {
    endpointUrl: item["endpointUrl"],
  };
}

/** Properties of a topic type info. */
export interface TopicTypeInfo extends ProxyResource {
  /** Namespace of the provider of the topic type. */
  provider?: string;
  /** Display Name for the topic type. */
  displayName?: string;
  /** Description of the topic type. */
  description?: string;
  /** Region type of the resource. */
  resourceRegionType?: ResourceRegionType;
  /** Provisioning state of the topic type. */
  provisioningState?: TopicTypeProvisioningState;
  /** List of locations supported by this topic type. */
  supportedLocations?: string[];
  /** Source resource format. */
  sourceResourceFormat?: string;
  /** Supported source scopes. */
  supportedScopesForSource?: TopicTypeSourceScope[];
  /** Flag to indicate that a topic type can support both regional or global system topics. */
  areRegionalAndGlobalSourcesSupported?: boolean;
  /** Permissions which are enforced for creating and updating system topics of this this topic type. */
  additionalEnforcedPermissions?: TopicTypeAdditionalEnforcedPermission[];
}

export function topicTypeInfoDeserializer(item: any): TopicTypeInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _topicTypeInfoPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a topic type. */
export interface TopicTypeProperties {
  /** Namespace of the provider of the topic type. */
  provider?: string;
  /** Display Name for the topic type. */
  displayName?: string;
  /** Description of the topic type. */
  description?: string;
  /** Region type of the resource. */
  resourceRegionType?: ResourceRegionType;
  /** Provisioning state of the topic type. */
  provisioningState?: TopicTypeProvisioningState;
  /** List of locations supported by this topic type. */
  supportedLocations?: string[];
  /** Source resource format. */
  sourceResourceFormat?: string;
  /** Supported source scopes. */
  supportedScopesForSource?: TopicTypeSourceScope[];
  /** Flag to indicate that a topic type can support both regional or global system topics. */
  areRegionalAndGlobalSourcesSupported?: boolean;
  /** Permissions which are enforced for creating and updating system topics of this this topic type. */
  additionalEnforcedPermissions?: TopicTypeAdditionalEnforcedPermission[];
}

export function topicTypePropertiesDeserializer(item: any): TopicTypeProperties {
  return {
    provider: item["provider"],
    displayName: item["displayName"],
    description: item["description"],
    resourceRegionType: item["resourceRegionType"],
    provisioningState: item["provisioningState"],
    supportedLocations: !item["supportedLocations"]
      ? item["supportedLocations"]
      : item["supportedLocations"].map((p: any) => {
          return p;
        }),
    sourceResourceFormat: item["sourceResourceFormat"],
    supportedScopesForSource: !item["supportedScopesForSource"]
      ? item["supportedScopesForSource"]
      : item["supportedScopesForSource"].map((p: any) => {
          return p;
        }),
    areRegionalAndGlobalSourcesSupported: item["areRegionalAndGlobalSourcesSupported"],
    additionalEnforcedPermissions: !item["additionalEnforcedPermissions"]
      ? item["additionalEnforcedPermissions"]
      : topicTypeAdditionalEnforcedPermissionArrayDeserializer(
          item["additionalEnforcedPermissions"],
        ),
  };
}

/** Region type of the resource. */
export enum KnownResourceRegionType {
  /** RegionalResource */
  RegionalResource = "RegionalResource",
  /** GlobalResource */
  GlobalResource = "GlobalResource",
}

/**
 * Region type of the resource. \
 * {@link KnownResourceRegionType} can be used interchangeably with ResourceRegionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RegionalResource**: RegionalResource \
 * **GlobalResource**: GlobalResource
 */
export type ResourceRegionType = string;

/** Provisioning state of the topic type. */
export enum KnownTopicTypeProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the topic type. \
 * {@link KnownTopicTypeProvisioningState} can be used interchangeably with TopicTypeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type TopicTypeProvisioningState = string;

/** Known values of {@link TopicTypeSourceScope} that the service accepts. */
export enum KnownTopicTypeSourceScope {
  /** Resource */
  Resource = "Resource",
  /** ResourceGroup */
  ResourceGroup = "ResourceGroup",
  /** AzureSubscription */
  AzureSubscription = "AzureSubscription",
  /** ManagementGroup */
  ManagementGroup = "ManagementGroup",
}

/** Type of TopicTypeSourceScope */
export type TopicTypeSourceScope = string;

export function topicTypeAdditionalEnforcedPermissionArrayDeserializer(
  result: Array<TopicTypeAdditionalEnforcedPermission>,
): any[] {
  return result.map((item) => {
    return topicTypeAdditionalEnforcedPermissionDeserializer(item);
  });
}

/** model interface TopicTypeAdditionalEnforcedPermission */
export interface TopicTypeAdditionalEnforcedPermission {
  permissionName?: string;
  isDataAction?: boolean;
}

export function topicTypeAdditionalEnforcedPermissionDeserializer(
  item: any,
): TopicTypeAdditionalEnforcedPermission {
  return {
    permissionName: item["permissionName"],
    isDataAction: item["isDataAction"],
  };
}

/** Result of the List Topic Types operation */
export interface _TopicTypesListResult {
  /** A collection of topic types */
  value?: TopicTypeInfo[];
  nextLink?: string;
}

export function _topicTypesListResultDeserializer(item: any): _TopicTypesListResult {
  return {
    value: !item["value"] ? item["value"] : topicTypeInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topicTypeInfoArrayDeserializer(result: Array<TopicTypeInfo>): any[] {
  return result.map((item) => {
    return topicTypeInfoDeserializer(item);
  });
}

/** Known values of {@link NetworkSecurityPerimeterResourceType} that the service accepts. */
export enum KnownNetworkSecurityPerimeterResourceType {
  /** topics */
  Topics = "topics",
  /** domains */
  Domains = "domains",
}

/** Type of NetworkSecurityPerimeterResourceType */
export type NetworkSecurityPerimeterResourceType = string;

/** Known values of {@link PrivateEndpointConnectionsParentType} that the service accepts. */
export enum KnownPrivateEndpointConnectionsParentType {
  /** topics */
  Topics = "topics",
  /** domains */
  Domains = "domains",
  /** partnerNamespaces */
  PartnerNamespaces = "partnerNamespaces",
  /** namespaces */
  Namespaces = "namespaces",
}

/** Type of PrivateEndpointConnectionsParentType */
export type PrivateEndpointConnectionsParentType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-15-preview API version. */
  V20250715Preview = "2025-07-15-preview",
}

export function _caCertificatePropertiesSerializer(item: CaCertificate): any {
  return { description: item["description"], encodedCertificate: item["encodedCertificate"] };
}

export function _caCertificatePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    encodedCertificate: item["encodedCertificate"],
    issueTimeInUtc: !item["issueTimeInUtc"]
      ? item["issueTimeInUtc"]
      : new Date(item["issueTimeInUtc"]),
    expiryTimeInUtc: !item["expiryTimeInUtc"]
      ? item["expiryTimeInUtc"]
      : new Date(item["expiryTimeInUtc"]),
    provisioningState: item["provisioningState"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateSerializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _namespacePropertiesSerializer(item: Namespace): any {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    topicsConfiguration: !item["topicsConfiguration"]
      ? item["topicsConfiguration"]
      : topicsConfigurationSerializer(item["topicsConfiguration"]),
    topicSpacesConfiguration: !item["topicSpacesConfiguration"]
      ? item["topicSpacesConfiguration"]
      : topicSpacesConfigurationSerializer(item["topicSpacesConfiguration"]),
    isZoneRedundant: item["isZoneRedundant"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
  };
}

export function _namespacePropertiesDeserializer(item: any) {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    topicsConfiguration: !item["topicsConfiguration"]
      ? item["topicsConfiguration"]
      : topicsConfigurationDeserializer(item["topicsConfiguration"]),
    topicSpacesConfiguration: !item["topicSpacesConfiguration"]
      ? item["topicSpacesConfiguration"]
      : topicSpacesConfigurationDeserializer(item["topicSpacesConfiguration"]),
    isZoneRedundant: item["isZoneRedundant"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
  };
}

export function _namespaceUpdateParametersPropertiesSerializer(
  item: NamespaceUpdateParameters,
): any {
  return {
    topicSpacesConfiguration: !item["topicSpacesConfiguration"]
      ? item["topicSpacesConfiguration"]
      : updateTopicSpacesConfigurationInfoSerializer(item["topicSpacesConfiguration"]),
    topicsConfiguration: !item["topicsConfiguration"]
      ? item["topicsConfiguration"]
      : updateTopicsConfigurationInfoSerializer(item["topicsConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
  };
}

export function _azureADPartnerClientAuthenticationPropertiesSerializer(
  item: AzureADPartnerClientAuthentication,
): any {
  return {
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
  };
}

export function _azureADPartnerClientAuthenticationPropertiesDeserializer(item: any) {
  return {
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
  };
}

export function _webhookPartnerDestinationInfoPropertiesSerializer(
  item: WebhookPartnerDestinationInfo,
): any {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : partnerClientAuthenticationUnionSerializer(item["clientAuthentication"]),
  };
}

export function _webhookPartnerDestinationInfoPropertiesDeserializer(item: any) {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : partnerClientAuthenticationUnionDeserializer(item["clientAuthentication"]),
  };
}

export function _channelPropertiesSerializer(item: Channel): any {
  return {
    channelType: item["channelType"],
    partnerTopicInfo: !item["partnerTopicInfo"]
      ? item["partnerTopicInfo"]
      : partnerTopicInfoSerializer(item["partnerTopicInfo"]),
    partnerDestinationInfo: !item["partnerDestinationInfo"]
      ? item["partnerDestinationInfo"]
      : partnerDestinationInfoUnionSerializer(item["partnerDestinationInfo"]),
    messageForActivation: item["messageForActivation"],
    provisioningState: item["provisioningState"],
    readinessState: item["readinessState"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
  };
}

export function _channelPropertiesDeserializer(item: any) {
  return {
    channelType: item["channelType"],
    partnerTopicInfo: !item["partnerTopicInfo"]
      ? item["partnerTopicInfo"]
      : partnerTopicInfoDeserializer(item["partnerTopicInfo"]),
    partnerDestinationInfo: !item["partnerDestinationInfo"]
      ? item["partnerDestinationInfo"]
      : partnerDestinationInfoUnionDeserializer(item["partnerDestinationInfo"]),
    messageForActivation: item["messageForActivation"],
    provisioningState: item["provisioningState"],
    readinessState: item["readinessState"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : new Date(item["expirationTimeIfNotActivatedUtc"]),
  };
}

export function _webhookUpdatePartnerDestinationInfoPropertiesSerializer(
  item: WebhookUpdatePartnerDestinationInfo,
): any {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : partnerClientAuthenticationUnionSerializer(item["clientAuthentication"]),
  };
}

export function _webhookUpdatePartnerDestinationInfoPropertiesDeserializer(item: any) {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    clientAuthentication: !item["clientAuthentication"]
      ? item["clientAuthentication"]
      : partnerClientAuthenticationUnionDeserializer(item["clientAuthentication"]),
  };
}

export function _channelUpdateParametersPropertiesSerializer(item: ChannelUpdateParameters): any {
  return {
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
    partnerDestinationInfo: !item["partnerDestinationInfo"]
      ? item["partnerDestinationInfo"]
      : partnerUpdateDestinationInfoUnionSerializer(item["partnerDestinationInfo"]),
    partnerTopicInfo: !item["partnerTopicInfo"]
      ? item["partnerTopicInfo"]
      : partnerUpdateTopicInfoSerializer(item["partnerTopicInfo"]),
  };
}

export function _partnerNamespacePropertiesSerializer(item: PartnerNamespace): any {
  return {
    partnerRegistrationFullyQualifiedId: item["partnerRegistrationFullyQualifiedId"],
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    partnerTopicRoutingMode: item["partnerTopicRoutingMode"],
  };
}

export function _partnerNamespacePropertiesDeserializer(item: any) {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    partnerRegistrationFullyQualifiedId: item["partnerRegistrationFullyQualifiedId"],
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    endpoint: item["endpoint"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    partnerTopicRoutingMode: item["partnerTopicRoutingMode"],
  };
}

export function _partnerNamespaceUpdateParametersPropertiesSerializer(
  item: PartnerNamespaceUpdateParameters,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function _clientGroupPropertiesSerializer(item: ClientGroup): any {
  return { description: item["description"], query: item["query"] };
}

export function _clientGroupPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    query: item["query"],
    provisioningState: item["provisioningState"],
  };
}

export function _clientPropertiesSerializer(item: Client): any {
  return {
    description: item["description"],
    authenticationName: item["authenticationName"],
    clientCertificateAuthentication: !item["clientCertificateAuthentication"]
      ? item["clientCertificateAuthentication"]
      : clientCertificateAuthenticationSerializer(item["clientCertificateAuthentication"]),
    state: item["state"],
    attributes: item["attributes"],
  };
}

export function _clientPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    authenticationName: item["authenticationName"],
    clientCertificateAuthentication: !item["clientCertificateAuthentication"]
      ? item["clientCertificateAuthentication"]
      : clientCertificateAuthenticationDeserializer(item["clientCertificateAuthentication"]),
    state: item["state"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : Object.fromEntries(
          Object.entries(item["attributes"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    provisioningState: item["provisioningState"],
  };
}

export function _jsonInputSchemaMappingPropertiesSerializer(item: JsonInputSchemaMapping): any {
  return {
    id: !item["id"] ? item["id"] : jsonFieldSerializer(item["id"]),
    topic: !item["topic"] ? item["topic"] : jsonFieldSerializer(item["topic"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : jsonFieldSerializer(item["eventTime"]),
    eventType: !item["eventType"]
      ? item["eventType"]
      : jsonFieldWithDefaultSerializer(item["eventType"]),
    subject: !item["subject"] ? item["subject"] : jsonFieldWithDefaultSerializer(item["subject"]),
    dataVersion: !item["dataVersion"]
      ? item["dataVersion"]
      : jsonFieldWithDefaultSerializer(item["dataVersion"]),
  };
}

export function _jsonInputSchemaMappingPropertiesDeserializer(item: any) {
  return {
    id: !item["id"] ? item["id"] : jsonFieldDeserializer(item["id"]),
    topic: !item["topic"] ? item["topic"] : jsonFieldDeserializer(item["topic"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : jsonFieldDeserializer(item["eventTime"]),
    eventType: !item["eventType"]
      ? item["eventType"]
      : jsonFieldWithDefaultDeserializer(item["eventType"]),
    subject: !item["subject"] ? item["subject"] : jsonFieldWithDefaultDeserializer(item["subject"]),
    dataVersion: !item["dataVersion"]
      ? item["dataVersion"]
      : jsonFieldWithDefaultDeserializer(item["dataVersion"]),
  };
}

export function _domainPropertiesSerializer(item: Domain): any {
  return {
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    inputSchema: item["inputSchema"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionSerializer(item["inputSchemaMapping"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    autoCreateTopicWithFirstSubscription: item["autoCreateTopicWithFirstSubscription"],
    autoDeleteTopicWithLastSubscription: item["autoDeleteTopicWithLastSubscription"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
  };
}

export function _domainPropertiesDeserializer(item: any) {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    endpoint: item["endpoint"],
    inputSchema: item["inputSchema"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoDeserializer(item["eventTypeInfo"]),
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionDeserializer(item["inputSchemaMapping"]),
    metricResourceId: item["metricResourceId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    autoCreateTopicWithFirstSubscription: item["autoCreateTopicWithFirstSubscription"],
    autoDeleteTopicWithLastSubscription: item["autoDeleteTopicWithLastSubscription"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
  };
}

export function _domainUpdateParametersPropertiesSerializer(item: DomainUpdateParameters): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    disableLocalAuth: item["disableLocalAuth"],
    autoCreateTopicWithFirstSubscription: item["autoCreateTopicWithFirstSubscription"],
    autoDeleteTopicWithLastSubscription: item["autoDeleteTopicWithLastSubscription"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
  };
}

export function _domainTopicPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _staticDeliveryAttributeMappingPropertiesSerializer(
  item: StaticDeliveryAttributeMapping,
): any {
  return { value: item["value"], isSecret: item["isSecret"] };
}

export function _staticDeliveryAttributeMappingPropertiesDeserializer(item: any) {
  return {
    value: item["value"],
    isSecret: item["isSecret"],
  };
}

export function _dynamicDeliveryAttributeMappingPropertiesSerializer(
  item: DynamicDeliveryAttributeMapping,
): any {
  return { sourceField: item["sourceField"] };
}

export function _dynamicDeliveryAttributeMappingPropertiesDeserializer(item: any) {
  return {
    sourceField: item["sourceField"],
  };
}

export function _webHookEventSubscriptionDestinationPropertiesSerializer(
  item: WebHookEventSubscriptionDestination,
): any {
  return {
    endpointUrl: item["endpointUrl"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
  };
}

export function _webHookEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    endpointUrl: item["endpointUrl"],
    endpointBaseUrl: item["endpointBaseUrl"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    azureActiveDirectoryTenantId: item["azureActiveDirectoryTenantId"],
    azureActiveDirectoryApplicationIdOrUri: item["azureActiveDirectoryApplicationIdOrUri"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
  };
}

export function _eventHubEventSubscriptionDestinationPropertiesSerializer(
  item: EventHubEventSubscriptionDestination,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function _eventHubEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

export function _storageQueueEventSubscriptionDestinationPropertiesSerializer(
  item: StorageQueueEventSubscriptionDestination,
): any {
  return {
    resourceId: item["resourceId"],
    queueName: item["queueName"],
    queueMessageTimeToLiveInSeconds: item["queueMessageTimeToLiveInSeconds"],
  };
}

export function _storageQueueEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    queueName: item["queueName"],
    queueMessageTimeToLiveInSeconds: item["queueMessageTimeToLiveInSeconds"],
  };
}

export function _hybridConnectionEventSubscriptionDestinationPropertiesSerializer(
  item: HybridConnectionEventSubscriptionDestination,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function _hybridConnectionEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

export function _serviceBusQueueEventSubscriptionDestinationPropertiesSerializer(
  item: ServiceBusQueueEventSubscriptionDestination,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function _serviceBusQueueEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

export function _serviceBusTopicEventSubscriptionDestinationPropertiesSerializer(
  item: ServiceBusTopicEventSubscriptionDestination,
): any {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function _serviceBusTopicEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

export function _azureFunctionEventSubscriptionDestinationPropertiesSerializer(
  item: AzureFunctionEventSubscriptionDestination,
): any {
  return {
    resourceId: item["resourceId"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArraySerializer(item["deliveryAttributeMappings"]),
  };
}

export function _azureFunctionEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    maxEventsPerBatch: item["maxEventsPerBatch"],
    preferredBatchSizeInKilobytes: item["preferredBatchSizeInKilobytes"],
    deliveryAttributeMappings: !item["deliveryAttributeMappings"]
      ? item["deliveryAttributeMappings"]
      : deliveryAttributeMappingUnionArrayDeserializer(item["deliveryAttributeMappings"]),
  };
}

export function _partnerEventSubscriptionDestinationPropertiesSerializer(
  item: PartnerEventSubscriptionDestination,
): any {
  return { resourceId: item["resourceId"] };
}

export function _partnerEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
  };
}

export function _monitorAlertEventSubscriptionDestinationPropertiesSerializer(
  item: MonitorAlertEventSubscriptionDestination,
): any {
  return {
    severity: item["severity"],
    description: item["description"],
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : item["actionGroups"].map((p: any) => {
          return p;
        }),
  };
}

export function _monitorAlertEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    severity: item["severity"],
    description: item["description"],
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : item["actionGroups"].map((p: any) => {
          return p;
        }),
  };
}

export function _namespaceTopicEventSubscriptionDestinationPropertiesSerializer(
  item: NamespaceTopicEventSubscriptionDestination,
): any {
  return { resourceId: item["resourceId"] };
}

export function _namespaceTopicEventSubscriptionDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
  };
}

export function _storageBlobDeadLetterDestinationPropertiesSerializer(
  item: StorageBlobDeadLetterDestination,
): any {
  return { resourceId: item["resourceId"], blobContainerName: item["blobContainerName"] };
}

export function _storageBlobDeadLetterDestinationPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    blobContainerName: item["blobContainerName"],
  };
}

export function _eventSubscriptionPropertiesSerializer(item: EventSubscription): any {
  return {
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionSerializer(item["destination"]),
    deliveryWithResourceIdentity: !item["deliveryWithResourceIdentity"]
      ? item["deliveryWithResourceIdentity"]
      : deliveryWithResourceIdentitySerializer(item["deliveryWithResourceIdentity"]),
    filter: !item["filter"] ? item["filter"] : eventSubscriptionFilterSerializer(item["filter"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    eventDeliverySchema: item["eventDeliverySchema"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicySerializer(item["retryPolicy"]),
    deadLetterDestination: !item["deadLetterDestination"]
      ? item["deadLetterDestination"]
      : deadLetterDestinationUnionSerializer(item["deadLetterDestination"]),
    deadLetterWithResourceIdentity: !item["deadLetterWithResourceIdentity"]
      ? item["deadLetterWithResourceIdentity"]
      : deadLetterWithResourceIdentitySerializer(item["deadLetterWithResourceIdentity"]),
  };
}

export function _eventSubscriptionPropertiesDeserializer(item: any) {
  return {
    topic: item["topic"],
    provisioningState: item["provisioningState"],
    destination: !item["destination"]
      ? item["destination"]
      : eventSubscriptionDestinationUnionDeserializer(item["destination"]),
    deliveryWithResourceIdentity: !item["deliveryWithResourceIdentity"]
      ? item["deliveryWithResourceIdentity"]
      : deliveryWithResourceIdentityDeserializer(item["deliveryWithResourceIdentity"]),
    filter: !item["filter"] ? item["filter"] : eventSubscriptionFilterDeserializer(item["filter"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : new Date(item["expirationTimeUtc"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicyDeserializer(item["retryPolicy"]),
    deadLetterDestination: !item["deadLetterDestination"]
      ? item["deadLetterDestination"]
      : deadLetterDestinationUnionDeserializer(item["deadLetterDestination"]),
    deadLetterWithResourceIdentity: !item["deadLetterWithResourceIdentity"]
      ? item["deadLetterWithResourceIdentity"]
      : deadLetterWithResourceIdentityDeserializer(item["deadLetterWithResourceIdentity"]),
  };
}

export function _namespaceTopicPropertiesSerializer(item: NamespaceTopic): any {
  return {
    publisherType: item["publisherType"],
    inputSchema: item["inputSchema"],
    eventRetentionInDays: item["eventRetentionInDays"],
  };
}

export function _namespaceTopicPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    publisherType: item["publisherType"],
    inputSchema: item["inputSchema"],
    eventRetentionInDays: item["eventRetentionInDays"],
  };
}

export function _namespaceTopicUpdateParametersPropertiesSerializer(
  item: NamespaceTopicUpdateParameters,
): any {
  return { eventRetentionInDays: item["eventRetentionInDays"] };
}

export function _partnerConfigurationPropertiesSerializer(item: PartnerConfiguration): any {
  return {
    partnerAuthorization: !item["partnerAuthorization"]
      ? item["partnerAuthorization"]
      : partnerAuthorizationSerializer(item["partnerAuthorization"]),
    provisioningState: item["provisioningState"],
  };
}

export function _partnerConfigurationPropertiesDeserializer(item: any) {
  return {
    partnerAuthorization: !item["partnerAuthorization"]
      ? item["partnerAuthorization"]
      : partnerAuthorizationDeserializer(item["partnerAuthorization"]),
    provisioningState: item["provisioningState"],
  };
}

export function _partnerConfigurationUpdateParametersPropertiesSerializer(
  item: PartnerConfigurationUpdateParameters,
): any {
  return { defaultMaximumExpirationTimeInDays: item["defaultMaximumExpirationTimeInDays"] };
}

export function _partnerDestinationPropertiesSerializer(item: PartnerDestination): any {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    endpointServiceContext: item["endpointServiceContext"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
    activationState: item["activationState"],
    endpointBaseUrl: item["endpointBaseUrl"],
    messageForActivation: item["messageForActivation"],
  };
}

export function _partnerDestinationPropertiesDeserializer(item: any) {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    endpointServiceContext: item["endpointServiceContext"],
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : new Date(item["expirationTimeIfNotActivatedUtc"]),
    provisioningState: item["provisioningState"],
    activationState: item["activationState"],
    endpointBaseUrl: item["endpointBaseUrl"],
    messageForActivation: item["messageForActivation"],
  };
}

export function _partnerRegistrationPropertiesSerializer(item: PartnerRegistration): any {
  return { partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"] };
}

export function _partnerRegistrationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
  };
}

export function _partnerTopicPropertiesSerializer(item: PartnerTopic): any {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    source: item["source"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : item["expirationTimeIfNotActivatedUtc"].toISOString(),
    activationState: item["activationState"],
    partnerTopicFriendlyDescription: item["partnerTopicFriendlyDescription"],
    messageForActivation: item["messageForActivation"],
  };
}

export function _partnerTopicPropertiesDeserializer(item: any) {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    source: item["source"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoDeserializer(item["eventTypeInfo"]),
    expirationTimeIfNotActivatedUtc: !item["expirationTimeIfNotActivatedUtc"]
      ? item["expirationTimeIfNotActivatedUtc"]
      : new Date(item["expirationTimeIfNotActivatedUtc"]),
    provisioningState: item["provisioningState"],
    activationState: item["activationState"],
    partnerTopicFriendlyDescription: item["partnerTopicFriendlyDescription"],
    messageForActivation: item["messageForActivation"],
  };
}

export function _networkSecurityPerimeterConfigurationIssuesPropertiesDeserializer(item: any) {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : item["suggestedAccessRules"].map((p: any) => {
          return p;
        }),
  };
}

export function _networkSecurityPerimeterProfileAccessRulePropertiesDeserializer(item: any) {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : networkSecurityPerimeterSubscriptionArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterInfoArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : item["phoneNumbers"].map((p: any) => {
          return p;
        }),
  };
}

export function _networkSecurityPerimeterConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : networkSecurityPerimeterConfigurationIssuesArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterInfoDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterConfigurationProfileDeserializer(item["profile"]),
  };
}

export function _permissionBindingPropertiesSerializer(item: PermissionBinding): any {
  return {
    description: item["description"],
    topicSpaceName: item["topicSpaceName"],
    permission: item["permission"],
    clientGroupName: item["clientGroupName"],
  };
}

export function _permissionBindingPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    topicSpaceName: item["topicSpaceName"],
    permission: item["permission"],
    clientGroupName: item["clientGroupName"],
    provisioningState: item["provisioningState"],
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    displayName: item["displayName"],
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

export function _systemTopicPropertiesSerializer(item: SystemTopic): any {
  return {
    source: item["source"],
    topicType: item["topicType"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionSerializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
  };
}

export function _systemTopicPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    source: item["source"],
    topicType: item["topicType"],
    metricResourceId: item["metricResourceId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionDeserializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
  };
}

export function _topicPropertiesSerializer(item: Topic): any {
  return {
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    inputSchema: item["inputSchema"],
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionSerializer(item["inputSchemaMapping"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionSerializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
  };
}

export function _topicPropertiesDeserializer(item: any) {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    endpoint: item["endpoint"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoDeserializer(item["eventTypeInfo"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    inputSchema: item["inputSchema"],
    inputSchemaMapping: !item["inputSchemaMapping"]
      ? item["inputSchemaMapping"]
      : inputSchemaMappingUnionDeserializer(item["inputSchemaMapping"]),
    metricResourceId: item["metricResourceId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArrayDeserializer(item["inboundIpRules"]),
    disableLocalAuth: item["disableLocalAuth"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : keyEncryptionDeserializer(item["encryption"]),
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
  };
}

export function _topicUpdateParametersPropertiesSerializer(item: TopicUpdateParameters): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    inboundIpRules: !item["inboundIpRules"]
      ? item["inboundIpRules"]
      : inboundIpRuleArraySerializer(item["inboundIpRules"]),
    minimumTlsVersionAllowed: item["minimumTlsVersionAllowed"],
    disableLocalAuth: item["disableLocalAuth"],
    dataResidencyBoundary: item["dataResidencyBoundary"],
    eventTypeInfo: !item["eventTypeInfo"]
      ? item["eventTypeInfo"]
      : eventTypeInfoSerializer(item["eventTypeInfo"]),
  };
}

export function _eventTypePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    schemaUrl: item["schemaUrl"],
    isInDefaultSet: item["isInDefaultSet"],
  };
}

export function _extensionTopicPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    systemTopic: item["systemTopic"],
  };
}

export function _topicSpacePropertiesSerializer(item: TopicSpace): any {
  return {
    description: item["description"],
    topicTemplates: !item["topicTemplates"]
      ? item["topicTemplates"]
      : item["topicTemplates"].map((p: any) => {
          return p;
        }),
  };
}

export function _topicSpacePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    topicTemplates: !item["topicTemplates"]
      ? item["topicTemplates"]
      : item["topicTemplates"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _verifiedPartnerPropertiesDeserializer(item: any) {
  return {
    partnerRegistrationImmutableId: item["partnerRegistrationImmutableId"],
    organizationName: item["organizationName"],
    partnerDisplayName: item["partnerDisplayName"],
    partnerTopicDetails: !item["partnerTopicDetails"]
      ? item["partnerTopicDetails"]
      : partnerDetailsDeserializer(item["partnerTopicDetails"]),
    partnerDestinationDetails: !item["partnerDestinationDetails"]
      ? item["partnerDestinationDetails"]
      : partnerDetailsDeserializer(item["partnerDestinationDetails"]),
    provisioningState: item["provisioningState"],
  };
}

export function _subscriptionPropertiesSerializer(item: Subscription): any {
  return {
    deliveryConfiguration: !item["deliveryConfiguration"]
      ? item["deliveryConfiguration"]
      : deliveryConfigurationSerializer(item["deliveryConfiguration"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    filtersConfiguration: !item["filtersConfiguration"]
      ? item["filtersConfiguration"]
      : filtersConfigurationSerializer(item["filtersConfiguration"]),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    tags: item["tags"],
  };
}

export function _subscriptionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    deliveryConfiguration: !item["deliveryConfiguration"]
      ? item["deliveryConfiguration"]
      : deliveryConfigurationDeserializer(item["deliveryConfiguration"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    filtersConfiguration: !item["filtersConfiguration"]
      ? item["filtersConfiguration"]
      : filtersConfigurationDeserializer(item["filtersConfiguration"]),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : new Date(item["expirationTimeUtc"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _subscriptionUpdateParametersPropertiesSerializer(
  item: SubscriptionUpdateParameters,
): any {
  return {
    deliveryConfiguration: !item["deliveryConfiguration"]
      ? item["deliveryConfiguration"]
      : deliveryConfigurationSerializer(item["deliveryConfiguration"]),
    eventDeliverySchema: item["eventDeliverySchema"],
    filtersConfiguration: !item["filtersConfiguration"]
      ? item["filtersConfiguration"]
      : filtersConfigurationSerializer(item["filtersConfiguration"]),
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    tags: item["tags"],
  };
}

export function _topicTypeInfoPropertiesDeserializer(item: any) {
  return {
    provider: item["provider"],
    displayName: item["displayName"],
    description: item["description"],
    resourceRegionType: item["resourceRegionType"],
    provisioningState: item["provisioningState"],
    supportedLocations: !item["supportedLocations"]
      ? item["supportedLocations"]
      : item["supportedLocations"].map((p: any) => {
          return p;
        }),
    sourceResourceFormat: item["sourceResourceFormat"],
    supportedScopesForSource: !item["supportedScopesForSource"]
      ? item["supportedScopesForSource"]
      : item["supportedScopesForSource"].map((p: any) => {
          return p;
        }),
    areRegionalAndGlobalSourcesSupported: item["areRegionalAndGlobalSourcesSupported"],
    additionalEnforcedPermissions: !item["additionalEnforcedPermissions"]
      ? item["additionalEnforcedPermissions"]
      : topicTypeAdditionalEnforcedPermissionArrayDeserializer(
          item["additionalEnforcedPermissions"],
        ),
  };
}
