// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
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

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** The response of a PrivateLinkResource list operation. */
export interface PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
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

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
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

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
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

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** The response of a PrivateEndpointConnection list operation. */
export interface PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateEndpointConnectionListResultDeserializer(
  item: any,
): PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
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

/** An Azure Arc PrivateLinkScope definition. */
export interface KubernetesConfigurationPrivateLinkScope extends TrackedResource {
  /** Properties that define a Azure Arc PrivateLinkScope resource. */
  properties?: KubernetesConfigurationPrivateLinkScopeProperties;
}

export function kubernetesConfigurationPrivateLinkScopeSerializer(
  item: KubernetesConfigurationPrivateLinkScope,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : kubernetesConfigurationPrivateLinkScopePropertiesSerializer(item["properties"]),
  };
}

export function kubernetesConfigurationPrivateLinkScopeDeserializer(
  item: any,
): KubernetesConfigurationPrivateLinkScope {
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
    properties: !item["properties"]
      ? item["properties"]
      : kubernetesConfigurationPrivateLinkScopePropertiesDeserializer(item["properties"]),
  };
}

/** Properties that define a Azure Arc PrivateLinkScope resource. */
export interface KubernetesConfigurationPrivateLinkScopeProperties {
  /** Indicates whether machines associated with the private link scope can also use public Azure Arc service endpoints. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Provisioning ,Succeeded, Canceled and Failed. */
  readonly provisioningState?: ProvisioningState;
  /** Managed Cluster ARM ID for the private link scope  (Required) */
  clusterResourceId: string;
  /** The Guid id of the private link scope. */
  readonly privateLinkScopeId?: string;
  /** The collection of associated Private Endpoint Connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function kubernetesConfigurationPrivateLinkScopePropertiesSerializer(
  item: KubernetesConfigurationPrivateLinkScopeProperties,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    clusterResourceId: item["clusterResourceId"],
  };
}

export function kubernetesConfigurationPrivateLinkScopePropertiesDeserializer(
  item: any,
): KubernetesConfigurationPrivateLinkScopeProperties {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    provisioningState: item["provisioningState"],
    clusterResourceId: item["clusterResourceId"],
    privateLinkScopeId: item["privateLinkScopeId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** The network access policy to determine if Azure Arc agents can use public Azure Arc service endpoints. Defaults to disabled (access to Azure Arc services only via private link). */
export enum KnownPublicNetworkAccessType {
  /** Allows Azure Arc agents to communicate with Azure Arc services over both public (internet) and private endpoints. */
  Enabled = "Enabled",
  /** Does not allow Azure Arc agents to communicate with Azure Arc services over public (internet) endpoints. The agents must use the private link. */
  Disabled = "Disabled",
}

/**
 * The network access policy to determine if Azure Arc agents can use public Azure Arc service endpoints. Defaults to disabled (access to Azure Arc services only via private link). \
 * {@link KnownPublicNetworkAccessType} can be used interchangeably with PublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Allows Azure Arc agents to communicate with Azure Arc services over both public (internet) and private endpoints. \
 * **Disabled**: Does not allow Azure Arc agents to communicate with Azure Arc services over public (internet) endpoints. The agents must use the private link.
 */
export type PublicNetworkAccessType = string;

/** The provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting
 */
export type ProvisioningState = string;

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

/** A container holding only the Tags for a resource, allowing the user to update the tags on a PrivateLinkScope instance. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

/** The response of a KubernetesConfigurationPrivateLinkScope list operation. */
export interface _KubernetesConfigurationPrivateLinkScopeListResult {
  /** The KubernetesConfigurationPrivateLinkScope items on this page */
  value: KubernetesConfigurationPrivateLinkScope[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _kubernetesConfigurationPrivateLinkScopeListResultDeserializer(
  item: any,
): _KubernetesConfigurationPrivateLinkScopeListResult {
  return {
    value: kubernetesConfigurationPrivateLinkScopeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function kubernetesConfigurationPrivateLinkScopeArraySerializer(
  result: Array<KubernetesConfigurationPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return kubernetesConfigurationPrivateLinkScopeSerializer(item);
  });
}

export function kubernetesConfigurationPrivateLinkScopeArrayDeserializer(
  result: Array<KubernetesConfigurationPrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return kubernetesConfigurationPrivateLinkScopeDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01-preview API version. */
  V20241101Preview = "2024-11-01-preview",
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
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
