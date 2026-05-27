// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Collection of CustomLocationOperation items */
export interface _CustomLocationOperationsList {
  /** The link to the next page of items */
  nextLink?: string;
  /** The CustomLocationOperation items */
  value: CustomLocationOperation[];
}

export function _customLocationOperationsListDeserializer(
  item: any,
): _CustomLocationOperationsList {
  return {
    nextLink: item["nextLink"],
    value: customLocationOperationArrayDeserializer(item["value"]),
  };
}

export function customLocationOperationArrayDeserializer(
  result: Array<CustomLocationOperation>,
): any[] {
  return result.map((item) => {
    return customLocationOperationDeserializer(item);
  });
}

/** Custom Locations operation. */
export interface CustomLocationOperation {
  /** Is this Operation a data plane operation */
  readonly isDataAction?: boolean;
  /** The name of the compute operation. */
  readonly name?: string;
  /** The origin of the compute operation. */
  readonly origin?: string;
  /** The description of the operation. */
  readonly description?: string;
  /** The display name of the compute operation. */
  readonly operation?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
}

export function customLocationOperationDeserializer(item: any): CustomLocationOperation {
  return {
    ...(!item["display"]
      ? item["display"]
      : _customLocationOperationDisplayDeserializer(item["display"])),
    isDataAction: item["isDataAction"],
    name: item["name"],
    origin: item["origin"],
  };
}

/** Describes the properties of a Custom Locations Operation Value Display. */
export interface CustomLocationOperationValueDisplay {
  /** The description of the operation. */
  readonly description?: string;
  /** The display name of the compute operation. */
  readonly operation?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
}

export function customLocationOperationValueDisplayDeserializer(
  item: any,
): CustomLocationOperationValueDisplay {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
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

/** Custom Locations definition. */
export interface CustomLocation extends TrackedResource {
  /** Identity for the resource. */
  identity?: Identity;
  /** This is optional input that contains the authentication that should be used to generate the namespace. */
  authentication?: CustomLocationPropertiesAuthentication;
  /** Contains the reference to the add-on that contains charts to deploy CRDs and operators. */
  clusterExtensionIds?: string[];
  /** Display name for the Custom Locations location. */
  displayName?: string;
  /** Connected Cluster or AKS Cluster. The Custom Locations RP will perform a checkAccess API for listAdminCredentials permissions. */
  hostResourceId?: string;
  /** Type of host the Custom Locations is referencing (Kubernetes, etc...). */
  hostType?: HostType;
  /** Kubernetes namespace that will be created on the specified cluster. */
  namespace?: string;
  /** Provisioning State for the Custom Location. */
  provisioningState?: string;
}

export function customLocationSerializer(item: CustomLocation): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "authentication",
      "clusterExtensionIds",
      "displayName",
      "hostResourceId",
      "hostType",
      "namespace",
      "provisioningState",
    ])
      ? undefined
      : _customLocationPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function customLocationDeserializer(item: any): CustomLocation {
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
      : _customLocationPropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** Properties for a custom location. */
export interface CustomLocationProperties {
  /** This is optional input that contains the authentication that should be used to generate the namespace. */
  authentication?: CustomLocationPropertiesAuthentication;
  /** Contains the reference to the add-on that contains charts to deploy CRDs and operators. */
  clusterExtensionIds?: string[];
  /** Display name for the Custom Locations location. */
  displayName?: string;
  /** Connected Cluster or AKS Cluster. The Custom Locations RP will perform a checkAccess API for listAdminCredentials permissions. */
  hostResourceId?: string;
  /** Type of host the Custom Locations is referencing (Kubernetes, etc...). */
  hostType?: HostType;
  /** Kubernetes namespace that will be created on the specified cluster. */
  namespace?: string;
  /** Provisioning State for the Custom Location. */
  provisioningState?: string;
}

export function customLocationPropertiesSerializer(item: CustomLocationProperties): any {
  return {
    authentication: !item["authentication"]
      ? item["authentication"]
      : customLocationPropertiesAuthenticationSerializer(item["authentication"]),
    clusterExtensionIds: !item["clusterExtensionIds"]
      ? item["clusterExtensionIds"]
      : item["clusterExtensionIds"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    hostResourceId: item["hostResourceId"],
    hostType: item["hostType"],
    namespace: item["namespace"],
    provisioningState: item["provisioningState"],
  };
}

export function customLocationPropertiesDeserializer(item: any): CustomLocationProperties {
  return {
    authentication: !item["authentication"]
      ? item["authentication"]
      : customLocationPropertiesAuthenticationDeserializer(item["authentication"]),
    clusterExtensionIds: !item["clusterExtensionIds"]
      ? item["clusterExtensionIds"]
      : item["clusterExtensionIds"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    hostResourceId: item["hostResourceId"],
    hostType: item["hostType"],
    namespace: item["namespace"],
    provisioningState: item["provisioningState"],
  };
}

/** This is optional input that contains the authentication that should be used to generate the namespace. */
export interface CustomLocationPropertiesAuthentication {
  /** The type of the Custom Locations authentication */
  type?: string;
  /** The kubeconfig value. */
  value?: string;
}

export function customLocationPropertiesAuthenticationSerializer(
  item: CustomLocationPropertiesAuthentication,
): any {
  return { type: item["type"], value: item["value"] };
}

export function customLocationPropertiesAuthenticationDeserializer(
  item: any,
): CustomLocationPropertiesAuthentication {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Type of host the Custom Locations is referencing (Kubernetes, etc...). */
export enum KnownHostType {
  /** Kubernetes */
  Kubernetes = "Kubernetes",
}

/**
 * Type of host the Custom Locations is referencing (Kubernetes, etc...). \
 * {@link KnownHostType} can be used interchangeably with HostType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Kubernetes**: Kubernetes
 */
export type HostType = string;

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: ResourceIdentityType;
}

export function identitySerializer(item: Identity): any {
  return { type: item["type"] };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** The identity type. */
export enum KnownResourceIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** None */
  None = "None",
}

/**
 * The identity type. \
 * {@link KnownResourceIdentityType} can be used interchangeably with ResourceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **None**: None
 */
export type ResourceIdentityType = string;

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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** The Custom Locations patchable resource definition. */
export interface PatchableCustomLocations {
  /** Identity for the resource. */
  identity?: Identity;
  /** Resource tags */
  tags?: Record<string, string>;
  /** This is optional input that contains the authentication that should be used to generate the namespace. */
  authentication?: CustomLocationPropertiesAuthentication;
  /** Contains the reference to the add-on that contains charts to deploy CRDs and operators. */
  clusterExtensionIds?: string[];
  /** Display name for the Custom Locations location. */
  displayName?: string;
  /** Connected Cluster or AKS Cluster. The Custom Locations RP will perform a checkAccess API for listAdminCredentials permissions. */
  hostResourceId?: string;
  /** Type of host the Custom Locations is referencing (Kubernetes, etc...). */
  hostType?: HostType;
  /** Kubernetes namespace that will be created on the specified cluster. */
  namespace?: string;
  /** Provisioning State for the Custom Location. */
  provisioningState?: string;
}

export function patchableCustomLocationsSerializer(item: PatchableCustomLocations): any {
  return {
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "authentication",
      "clusterExtensionIds",
      "displayName",
      "hostResourceId",
      "hostType",
      "namespace",
      "provisioningState",
    ])
      ? undefined
      : _patchableCustomLocationsPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The List Custom Locations operation response. */
export interface _CustomLocationListResult {
  /** The URL to use for getting the next set of results. */
  readonly nextLink?: string;
  /** The list of Custom Locations. */
  readonly value?: CustomLocation[];
}

export function _customLocationListResultDeserializer(item: any): _CustomLocationListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : customLocationArrayDeserializer(item["value"]),
  };
}

export function customLocationArraySerializer(result: Array<CustomLocation>): any[] {
  return result.map((item) => {
    return customLocationSerializer(item);
  });
}

export function customLocationArrayDeserializer(result: Array<CustomLocation>): any[] {
  return result.map((item) => {
    return customLocationDeserializer(item);
  });
}

/** List of EnabledResourceTypes definition. */
export interface _EnabledResourceTypesListResult {
  /** The URL to use for getting the next set of results. */
  readonly nextLink?: string;
  /** The list of EnabledResourceTypes available for a customLocation. */
  readonly value?: EnabledResourceType[];
}

export function _enabledResourceTypesListResultDeserializer(
  item: any,
): _EnabledResourceTypesListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : enabledResourceTypeArrayDeserializer(item["value"]),
  };
}

export function enabledResourceTypeArrayDeserializer(result: Array<EnabledResourceType>): any[] {
  return result.map((item) => {
    return enabledResourceTypeDeserializer(item);
  });
}

/** EnabledResourceType definition. */
export interface EnabledResourceType extends ProxyResource {
  /** Metadata pertaining to creation and last modification of the resource */
  readonly systemData?: SystemData;
  /** Cluster Extension ID */
  clusterExtensionId?: string;
  /** Cluster Extension Type */
  extensionType?: string;
  /** Metadata of the Resource Type */
  typesMetadata?: EnabledResourceTypePropertiesTypesMetadataItem[];
}

export function enabledResourceTypeDeserializer(item: any): EnabledResourceType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _enabledResourceTypePropertiesDeserializer(item["properties"])),
  };
}

/** Properties for EnabledResourceType of a custom location. */
export interface EnabledResourceTypeProperties {
  /** Cluster Extension ID */
  clusterExtensionId?: string;
  /** Cluster Extension Type */
  extensionType?: string;
  /** Metadata of the Resource Type */
  typesMetadata?: EnabledResourceTypePropertiesTypesMetadataItem[];
}

export function enabledResourceTypePropertiesDeserializer(
  item: any,
): EnabledResourceTypeProperties {
  return {
    clusterExtensionId: item["clusterExtensionId"],
    extensionType: item["extensionType"],
    typesMetadata: !item["typesMetadata"]
      ? item["typesMetadata"]
      : enabledResourceTypePropertiesTypesMetadataItemArrayDeserializer(item["typesMetadata"]),
  };
}

export function enabledResourceTypePropertiesTypesMetadataItemArrayDeserializer(
  result: Array<EnabledResourceTypePropertiesTypesMetadataItem>,
): any[] {
  return result.map((item) => {
    return enabledResourceTypePropertiesTypesMetadataItemDeserializer(item);
  });
}

/** Metadata of the Resource Type. */
export interface EnabledResourceTypePropertiesTypesMetadataItem {
  /** Api Version of Resource Type */
  apiVersion?: string;
  /** Resource Provider Namespace of Resource Type */
  resourceProviderNamespace?: string;
  /** Resource Type */
  resourceType?: string;
}

export function enabledResourceTypePropertiesTypesMetadataItemDeserializer(
  item: any,
): EnabledResourceTypePropertiesTypesMetadataItem {
  return {
    apiVersion: item["apiVersion"],
    resourceProviderNamespace: item["resourceProviderNamespace"],
    resourceType: item["resourceType"],
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

/** The Find Target Resource Group operation request. */
export interface CustomLocationFindTargetResourceGroupProperties {
  /** Labels of the custom resource, this is a map of {key,value} pairs. */
  labels?: Record<string, string>;
}

export function customLocationFindTargetResourceGroupPropertiesSerializer(
  item: CustomLocationFindTargetResourceGroupProperties,
): any {
  return { labels: item["labels"] };
}

/** The Find Target Resource Group operation response. */
export interface CustomLocationFindTargetResourceGroupResult {
  /** The matching resource sync rule is the particular resource sync rule that matched the match expressions and labels and had lowest priority. This is the rule responsible for mapping the target resource to the target resource group. */
  readonly matchedResourceSyncRule?: string;
  /** The target resource group of matching resource sync rule. The labels from the request will be used to find out matching resource sync rule against the selector property of the resource sync rule. The one with highest priority will be returned if there are multiple matching rules. */
  readonly targetResourceGroup?: string;
}

export function customLocationFindTargetResourceGroupResultDeserializer(
  item: any,
): CustomLocationFindTargetResourceGroupResult {
  return {
    matchedResourceSyncRule: item["matchedResourceSyncRule"],
    targetResourceGroup: item["targetResourceGroup"],
  };
}

/** Resource Sync Rules definition. */
export interface ResourceSyncRule extends TrackedResource {
  /** Priority represents a priority of the Resource Sync Rule */
  priority?: number;
  /** Provisioning State for the Resource Sync Rule. */
  readonly provisioningState?: string;
  /** A label selector is composed of two parts, matchLabels and matchExpressions. The first part, matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is 'key', the operator is 'In', and the values array contains only 'value'. The second part, matchExpressions is a list of resource selector requirements. Valid operators include In, NotIn, Exists, and DoesNotExist. The values set must be non-empty in the case of In and NotIn. The values set must be empty in the case of Exists and DoesNotExist. All of the requirements, from both matchLabels and matchExpressions must all be satisfied in order to match. */
  selector?: ResourceSyncRulePropertiesSelector;
  /** For an unmapped custom resource, its labels will be used to find matching resource sync rules. If this resource sync rule is one of the matching rules with highest priority, then the unmapped custom resource will be projected to the target resource group associated with this resource sync rule. The user creating this resource sync rule should have write permissions on the target resource group and this write permission will be validated when creating the resource sync rule. */
  targetResourceGroup?: string;
}

export function resourceSyncRuleSerializer(item: ResourceSyncRule): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["priority", "selector", "targetResourceGroup"])
      ? undefined
      : _resourceSyncRulePropertiesSerializer(item),
  };
}

export function resourceSyncRuleDeserializer(item: any): ResourceSyncRule {
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
      : _resourceSyncRulePropertiesDeserializer(item["properties"])),
  };
}

/** Properties for a resource sync rule. For an unmapped custom resource, its labels will be used to find out matching resource sync rules using the selector property of the resource sync rule. If this resource sync rule has highest priority among all matching rules, then the unmapped custom resource will be projected to the target resource group associated with this resource sync rule. */
export interface ResourceSyncRuleProperties {
  /** Priority represents a priority of the Resource Sync Rule */
  priority?: number;
  /** Provisioning State for the Resource Sync Rule. */
  readonly provisioningState?: string;
  /** A label selector is composed of two parts, matchLabels and matchExpressions. The first part, matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is 'key', the operator is 'In', and the values array contains only 'value'. The second part, matchExpressions is a list of resource selector requirements. Valid operators include In, NotIn, Exists, and DoesNotExist. The values set must be non-empty in the case of In and NotIn. The values set must be empty in the case of Exists and DoesNotExist. All of the requirements, from both matchLabels and matchExpressions must all be satisfied in order to match. */
  selector?: ResourceSyncRulePropertiesSelector;
  /** For an unmapped custom resource, its labels will be used to find matching resource sync rules. If this resource sync rule is one of the matching rules with highest priority, then the unmapped custom resource will be projected to the target resource group associated with this resource sync rule. The user creating this resource sync rule should have write permissions on the target resource group and this write permission will be validated when creating the resource sync rule. */
  targetResourceGroup?: string;
}

export function resourceSyncRulePropertiesSerializer(item: ResourceSyncRuleProperties): any {
  return {
    priority: item["priority"],
    selector: !item["selector"]
      ? item["selector"]
      : resourceSyncRulePropertiesSelectorSerializer(item["selector"]),
    targetResourceGroup: item["targetResourceGroup"],
  };
}

export function resourceSyncRulePropertiesDeserializer(item: any): ResourceSyncRuleProperties {
  return {
    priority: item["priority"],
    provisioningState: item["provisioningState"],
    selector: !item["selector"]
      ? item["selector"]
      : resourceSyncRulePropertiesSelectorDeserializer(item["selector"]),
    targetResourceGroup: item["targetResourceGroup"],
  };
}

/** A label selector is composed of two parts, matchLabels and matchExpressions. The first part, matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is 'key', the operator is 'In', and the values array contains only 'value'. The second part, matchExpressions is a list of resource selector requirements. Valid operators include In, NotIn, Exists, and DoesNotExist. The values set must be non-empty in the case of In and NotIn. The values set must be empty in the case of Exists and DoesNotExist. All of the requirements, from both matchLabels and matchExpressions must all be satisfied in order to match. */
export interface ResourceSyncRulePropertiesSelector {
  /** MatchExpressions is a list of resource selector requirements. Valid operators include In, NotIn, Exists, and DoesNotExist. The values set must be non-empty in the case of In and NotIn. The values set must be empty in the case of Exists and DoesNotExist. */
  matchExpressions?: MatchExpressionsProperties[];
  /** MatchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is 'key', the operator is 'In', and the values array contains only 'value'. */
  matchLabels?: Record<string, string>;
}

export function resourceSyncRulePropertiesSelectorSerializer(
  item: ResourceSyncRulePropertiesSelector,
): any {
  return {
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : matchExpressionsPropertiesArraySerializer(item["matchExpressions"]),
    matchLabels: item["matchLabels"],
  };
}

export function resourceSyncRulePropertiesSelectorDeserializer(
  item: any,
): ResourceSyncRulePropertiesSelector {
  return {
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : matchExpressionsPropertiesArrayDeserializer(item["matchExpressions"]),
    matchLabels: !item["matchLabels"]
      ? item["matchLabels"]
      : Object.fromEntries(
          Object.entries(item["matchLabels"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function matchExpressionsPropertiesArraySerializer(
  result: Array<MatchExpressionsProperties>,
): any[] {
  return result.map((item) => {
    return matchExpressionsPropertiesSerializer(item);
  });
}

export function matchExpressionsPropertiesArrayDeserializer(
  result: Array<MatchExpressionsProperties>,
): any[] {
  return result.map((item) => {
    return matchExpressionsPropertiesDeserializer(item);
  });
}

/** Resource Sync Rules matchExpression property definition. */
export interface MatchExpressionsProperties {
  /** Key is the label key that the selector applies to. */
  key?: string;
  /** The Operator field represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist. */
  operator?: string;
  /** The label value */
  values?: string[];
}

export function matchExpressionsPropertiesSerializer(item: MatchExpressionsProperties): any {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function matchExpressionsPropertiesDeserializer(item: any): MatchExpressionsProperties {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** The Resource Sync Rules patchable resource definition. */
export interface PatchableResourceSyncRule {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Priority represents a priority of the Resource Sync Rule */
  priority?: number;
  /** Provisioning State for the Resource Sync Rule. */
  readonly provisioningState?: string;
  /** A label selector is composed of two parts, matchLabels and matchExpressions. The first part, matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is 'key', the operator is 'In', and the values array contains only 'value'. The second part, matchExpressions is a list of resource selector requirements. Valid operators include In, NotIn, Exists, and DoesNotExist. The values set must be non-empty in the case of In and NotIn. The values set must be empty in the case of Exists and DoesNotExist. All of the requirements, from both matchLabels and matchExpressions must all be satisfied in order to match. */
  selector?: ResourceSyncRulePropertiesSelector;
  /** For an unmapped custom resource, its labels will be used to find matching resource sync rules. If this resource sync rule is one of the matching rules with highest priority, then the unmapped custom resource will be projected to the target resource group associated with this resource sync rule. The user creating this resource sync rule should have write permissions on the target resource group and this write permission will be validated when creating the resource sync rule. */
  targetResourceGroup?: string;
}

export function patchableResourceSyncRuleSerializer(item: PatchableResourceSyncRule): any {
  return {
    properties: areAllPropsUndefined(item, ["priority", "selector", "targetResourceGroup"])
      ? undefined
      : _patchableResourceSyncRulePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The List Resource Sync Rules operation response. */
export interface _ResourceSyncRuleListResult {
  /** The URL to use for getting the next set of results. */
  readonly nextLink?: string;
  /** The list of Resource Sync Rules. */
  readonly value?: ResourceSyncRule[];
}

export function _resourceSyncRuleListResultDeserializer(item: any): _ResourceSyncRuleListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : resourceSyncRuleArrayDeserializer(item["value"]),
  };
}

export function resourceSyncRuleArraySerializer(result: Array<ResourceSyncRule>): any[] {
  return result.map((item) => {
    return resourceSyncRuleSerializer(item);
  });
}

export function resourceSyncRuleArrayDeserializer(result: Array<ResourceSyncRule>): any[] {
  return result.map((item) => {
    return resourceSyncRuleDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2021-08-31-preview API version. */
  V20210831Preview = "2021-08-31-preview",
}

export function _customLocationOperationDisplayDeserializer(item: any) {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

export function _customLocationPropertiesSerializer(item: CustomLocation): any {
  return {
    authentication: !item["authentication"]
      ? item["authentication"]
      : customLocationPropertiesAuthenticationSerializer(item["authentication"]),
    clusterExtensionIds: !item["clusterExtensionIds"]
      ? item["clusterExtensionIds"]
      : item["clusterExtensionIds"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    hostResourceId: item["hostResourceId"],
    hostType: item["hostType"],
    namespace: item["namespace"],
    provisioningState: item["provisioningState"],
  };
}

export function _customLocationPropertiesDeserializer(item: any) {
  return {
    authentication: !item["authentication"]
      ? item["authentication"]
      : customLocationPropertiesAuthenticationDeserializer(item["authentication"]),
    clusterExtensionIds: !item["clusterExtensionIds"]
      ? item["clusterExtensionIds"]
      : item["clusterExtensionIds"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    hostResourceId: item["hostResourceId"],
    hostType: item["hostType"],
    namespace: item["namespace"],
    provisioningState: item["provisioningState"],
  };
}

export function _patchableCustomLocationsPropertiesSerializer(item: PatchableCustomLocations): any {
  return {
    authentication: !item["authentication"]
      ? item["authentication"]
      : customLocationPropertiesAuthenticationSerializer(item["authentication"]),
    clusterExtensionIds: !item["clusterExtensionIds"]
      ? item["clusterExtensionIds"]
      : item["clusterExtensionIds"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    hostResourceId: item["hostResourceId"],
    hostType: item["hostType"],
    namespace: item["namespace"],
    provisioningState: item["provisioningState"],
  };
}

export function _patchableCustomLocationsPropertiesDeserializer(item: any) {
  return {
    authentication: !item["authentication"]
      ? item["authentication"]
      : customLocationPropertiesAuthenticationDeserializer(item["authentication"]),
    clusterExtensionIds: !item["clusterExtensionIds"]
      ? item["clusterExtensionIds"]
      : item["clusterExtensionIds"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    hostResourceId: item["hostResourceId"],
    hostType: item["hostType"],
    namespace: item["namespace"],
    provisioningState: item["provisioningState"],
  };
}

export function _enabledResourceTypePropertiesDeserializer(item: any) {
  return {
    clusterExtensionId: item["clusterExtensionId"],
    extensionType: item["extensionType"],
    typesMetadata: !item["typesMetadata"]
      ? item["typesMetadata"]
      : enabledResourceTypePropertiesTypesMetadataItemArrayDeserializer(item["typesMetadata"]),
  };
}

export function _resourceSyncRulePropertiesSerializer(item: ResourceSyncRule): any {
  return {
    priority: item["priority"],
    selector: !item["selector"]
      ? item["selector"]
      : resourceSyncRulePropertiesSelectorSerializer(item["selector"]),
    targetResourceGroup: item["targetResourceGroup"],
  };
}

export function _resourceSyncRulePropertiesDeserializer(item: any) {
  return {
    priority: item["priority"],
    provisioningState: item["provisioningState"],
    selector: !item["selector"]
      ? item["selector"]
      : resourceSyncRulePropertiesSelectorDeserializer(item["selector"]),
    targetResourceGroup: item["targetResourceGroup"],
  };
}

export function _patchableResourceSyncRulePropertiesSerializer(
  item: PatchableResourceSyncRule,
): any {
  return {
    priority: item["priority"],
    selector: !item["selector"]
      ? item["selector"]
      : resourceSyncRulePropertiesSelectorSerializer(item["selector"]),
    targetResourceGroup: item["targetResourceGroup"],
  };
}

export function _patchableResourceSyncRulePropertiesDeserializer(item: any) {
  return {
    priority: item["priority"],
    provisioningState: item["provisioningState"],
    selector: !item["selector"]
      ? item["selector"]
      : resourceSyncRulePropertiesSelectorDeserializer(item["selector"]),
    targetResourceGroup: item["targetResourceGroup"],
  };
}
