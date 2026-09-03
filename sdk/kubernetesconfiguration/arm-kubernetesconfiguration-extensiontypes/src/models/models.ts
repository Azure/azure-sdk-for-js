// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Extension Type object. */
export interface ExtensionType extends ProxyResource {
  properties?: ExtensionTypeProperties;
}

export function extensionTypeDeserializer(item: any): ExtensionType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : extensionTypePropertiesDeserializer(item["properties"]),
  };
}

/** model interface ExtensionTypeProperties */
export interface ExtensionTypeProperties {
  /** Is this Extension Type a system extension. */
  isSystemExtension?: boolean;
  /** Should an identity for this cluster resource be created */
  isManagedIdentityRequired?: boolean;
  /** Description of the extension type */
  description?: string;
  /** Name of the publisher for the Extension Type */
  publisher?: string;
  /** Plan information only for the Marketplace Extension Type. */
  planInfo?: ExtensionTypePropertiesPlanInfo;
  /** Cluster Types supported for this Extension Type. */
  supportedClusterTypes?: string[];
  /** Supported Kubernetes Scopes for this Extension Type. */
  supportedScopes?: ExtensionTypePropertiesSupportedScopes;
}

export function extensionTypePropertiesDeserializer(item: any): ExtensionTypeProperties {
  return {
    isSystemExtension: item["isSystemExtension"],
    isManagedIdentityRequired: item["isManagedIdentityRequired"],
    description: item["description"],
    publisher: item["publisher"],
    planInfo: !item["planInfo"]
      ? item["planInfo"]
      : extensionTypePropertiesPlanInfoDeserializer(item["planInfo"]),
    supportedClusterTypes: !item["supportedClusterTypes"]
      ? item["supportedClusterTypes"]
      : item["supportedClusterTypes"].map((p: any) => {
          return p;
        }),
    supportedScopes: !item["supportedScopes"]
      ? item["supportedScopes"]
      : extensionTypePropertiesSupportedScopesDeserializer(item["supportedScopes"]),
  };
}

/** Plan information only for the Marketplace Extension Type. */
export interface ExtensionTypePropertiesPlanInfo {
  /** Publisher ID of the Marketplace Extension Type. */
  publisherId?: string;
  /** Plan ID of the Marketplace Extension Type. */
  planId?: string;
  /** Offer or Product ID of the Marketplace Extension Type. */
  offerId?: string;
}

export function extensionTypePropertiesPlanInfoDeserializer(
  item: any,
): ExtensionTypePropertiesPlanInfo {
  return {
    publisherId: item["publisherId"],
    planId: item["planId"],
    offerId: item["offerId"],
  };
}

/** Supported Kubernetes Scopes for this Extension Type. */
export interface ExtensionTypePropertiesSupportedScopes {
  /** The default scope of the extension type. This scope will be used if the user does not provide a scope while creating an extension. */
  defaultScope?: string;
  /** Extension scope settings */
  clusterScopeSettings?: ClusterScopeSettings;
}

export function extensionTypePropertiesSupportedScopesDeserializer(
  item: any,
): ExtensionTypePropertiesSupportedScopes {
  return {
    defaultScope: item["defaultScope"],
    clusterScopeSettings: !item["clusterScopeSettings"]
      ? item["clusterScopeSettings"]
      : clusterScopeSettingsDeserializer(item["clusterScopeSettings"]),
  };
}

/** Extension scope settings */
export interface ClusterScopeSettings extends ProxyResource {
  /** Describes if multiple instances of the extension are allowed */
  allowMultipleInstances?: boolean;
  /** Default extension release namespace */
  defaultReleaseNamespace?: string;
}

export function clusterScopeSettingsDeserializer(item: any): ClusterScopeSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clusterScopeSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** Extension scope settings */
export interface ClusterScopeSettingsProperties {
  /** Describes if multiple instances of the extension are allowed */
  allowMultipleInstances?: boolean;
  /** Default extension release namespace */
  defaultReleaseNamespace?: string;
}

export function clusterScopeSettingsPropertiesDeserializer(
  item: any,
): ClusterScopeSettingsProperties {
  return {
    allowMultipleInstances: item["allowMultipleInstances"],
    defaultReleaseNamespace: item["defaultReleaseNamespace"],
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

/** List Extension Types. It contains a list of ExtensionType objects and a URL link to get the next set of results. */
export interface _ExtensionTypesList {
  /** The ExtensionType items on this page */
  readonly value: ExtensionType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extensionTypesListDeserializer(item: any): _ExtensionTypesList {
  return {
    value: extensionTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionTypeArrayDeserializer(result: Array<ExtensionType>): any[] {
  return result.map((item) => {
    return extensionTypeDeserializer(item);
  });
}

/** The Extension Type Version object. */
export interface ExtensionTypeVersionForReleaseTrain extends ProxyResource {
  properties?: ExtensionTypeVersionForReleaseTrainProperties;
}

export function extensionTypeVersionForReleaseTrainDeserializer(
  item: any,
): ExtensionTypeVersionForReleaseTrain {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : extensionTypeVersionForReleaseTrainPropertiesDeserializer(item["properties"]),
  };
}

/** model interface ExtensionTypeVersionForReleaseTrainProperties */
export interface ExtensionTypeVersionForReleaseTrainProperties {
  /** The version number for the extension type */
  version?: string;
  /** The list of supported Kubernetes cluster versions for this extension type */
  unsupportedKubernetesVersions?: ExtensionTypeVersionForReleaseTrainPropertiesUnsupportedKubernetesVersions;
  /** A list of supported cluster types for this version of the Extension Type */
  supportedClusterTypes?: string[];
}

export function extensionTypeVersionForReleaseTrainPropertiesDeserializer(
  item: any,
): ExtensionTypeVersionForReleaseTrainProperties {
  return {
    version: item["version"],
    unsupportedKubernetesVersions: !item["unsupportedKubernetesVersions"]
      ? item["unsupportedKubernetesVersions"]
      : extensionTypeVersionForReleaseTrainPropertiesUnsupportedKubernetesVersionsDeserializer(
          item["unsupportedKubernetesVersions"],
        ),
    supportedClusterTypes: !item["supportedClusterTypes"]
      ? item["supportedClusterTypes"]
      : item["supportedClusterTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The list of supported Kubernetes cluster versions for this extension type */
export interface ExtensionTypeVersionForReleaseTrainPropertiesUnsupportedKubernetesVersions {
  connectedCluster?: ExtensionTypeVersionUnsupportedKubernetesMatrixItem[];
  appliances?: ExtensionTypeVersionUnsupportedKubernetesMatrixItem[];
  provisionedCluster?: ExtensionTypeVersionUnsupportedKubernetesMatrixItem[];
  managedCluster?: ExtensionTypeVersionUnsupportedKubernetesMatrixItem[];
}

export function extensionTypeVersionForReleaseTrainPropertiesUnsupportedKubernetesVersionsDeserializer(
  item: any,
): ExtensionTypeVersionForReleaseTrainPropertiesUnsupportedKubernetesVersions {
  return {
    connectedCluster: !item["connectedCluster"]
      ? item["connectedCluster"]
      : extensionTypeVersionUnsupportedKubernetesMatrixItemArrayDeserializer(
          item["connectedCluster"],
        ),
    appliances: !item["appliances"]
      ? item["appliances"]
      : extensionTypeVersionUnsupportedKubernetesMatrixItemArrayDeserializer(item["appliances"]),
    provisionedCluster: !item["provisionedCluster"]
      ? item["provisionedCluster"]
      : extensionTypeVersionUnsupportedKubernetesMatrixItemArrayDeserializer(
          item["provisionedCluster"],
        ),
    managedCluster: !item["managedCluster"]
      ? item["managedCluster"]
      : extensionTypeVersionUnsupportedKubernetesMatrixItemArrayDeserializer(
          item["managedCluster"],
        ),
  };
}

export function extensionTypeVersionUnsupportedKubernetesMatrixItemArrayDeserializer(
  result: Array<ExtensionTypeVersionUnsupportedKubernetesMatrixItem>,
): any[] {
  return result.map((item) => {
    return extensionTypeVersionUnsupportedKubernetesMatrixItemDeserializer(item);
  });
}

/** The list of Kubernetes Distribution and Versions that are not supported by this version of this Extension Type */
export interface ExtensionTypeVersionUnsupportedKubernetesMatrixItem {
  /** The list of Kubernetes Cluster Distribution Names not supported */
  distributions?: string[];
  /** The list of Kubernetes Versions not supported by the list of Kubernetes Cluster Distribution names in this object */
  unsupportedVersions?: string[];
}

export function extensionTypeVersionUnsupportedKubernetesMatrixItemDeserializer(
  item: any,
): ExtensionTypeVersionUnsupportedKubernetesMatrixItem {
  return {
    distributions: !item["distributions"]
      ? item["distributions"]
      : item["distributions"].map((p: any) => {
          return p;
        }),
    unsupportedVersions: !item["unsupportedVersions"]
      ? item["unsupportedVersions"]
      : item["unsupportedVersions"].map((p: any) => {
          return p;
        }),
  };
}

/** List Extension Type Versions. It contains a list of ExtensionTypeVersionForReleaseTrain objects. */
export interface _ExtensionTypeVersionsList {
  /** The ExtensionTypeVersionForReleaseTrain items on this page */
  readonly value: ExtensionTypeVersionForReleaseTrain[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extensionTypeVersionsListDeserializer(item: any): _ExtensionTypeVersionsList {
  return {
    value: extensionTypeVersionForReleaseTrainArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionTypeVersionForReleaseTrainArrayDeserializer(
  result: Array<ExtensionTypeVersionForReleaseTrain>,
): any[] {
  return result.map((item) => {
    return extensionTypeVersionForReleaseTrainDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01-preview API version. */
  V20241101Preview = "2024-11-01-preview",
}

export function _clusterScopeSettingsPropertiesDeserializer(item: any) {
  return {
    allowMultipleInstances: item["allowMultipleInstances"],
    defaultReleaseNamespace: item["defaultReleaseNamespace"],
  };
}
