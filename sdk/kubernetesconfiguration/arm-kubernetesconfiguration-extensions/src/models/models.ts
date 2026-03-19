// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Extension object. */
export interface Extension extends ProxyResource {
  /** Identity of the Extension resource */
  identity?: Identity;
  /** Details of the resource plan. */
  plan?: Plan;
  /** Type of the Extension, of which this resource is an instance of.  It must be one of the Extension Types registered with Microsoft.KubernetesConfiguration by the Extension publisher. */
  extensionType?: string;
  /** Flag to note if this extension participates in auto upgrade of minor version, or not. */
  autoUpgradeMinorVersion?: boolean;
  /** ReleaseTrain this extension participates in for auto-upgrade (e.g. Stable, Preview, etc.) - only if autoUpgradeMinorVersion is 'true'. */
  releaseTrain?: string;
  /** User-specified version of the extension for this extension to 'pin'. To use 'version', autoUpgradeMinorVersion must be 'false'. */
  version?: string;
  /** Scope at which the extension is installed. */
  scope?: Scope;
  /** Configuration settings, as name-value pairs for configuring this extension. */
  configurationSettings?: Record<string, string>;
  /** Configuration settings that are sensitive, as name-value pairs for configuring this extension. */
  configurationProtectedSettings?: Record<string, string>;
  /** Currently installed version of the extension. */
  readonly currentVersion?: string;
  /** Status of installation of this extension. */
  readonly provisioningState?: ProvisioningState;
  /** Status from this extension. */
  statuses?: ExtensionStatus[];
  /** Error information from the Agent - e.g. errors during installation. */
  readonly errorInfo?: ErrorDetail;
  /** Custom Location settings properties. */
  readonly customLocationSettings?: Record<string, string>;
  /** Uri of the Helm package */
  readonly packageUri?: string;
  /** Identity of the Extension resource in an AKS cluster */
  aksAssignedIdentity?: ExtensionPropertiesAksAssignedIdentity;
  /** Flag to note if this extension is a system extension */
  readonly isSystemExtension?: boolean;
}

export function extensionSerializer(item: Extension): any {
  return {
    properties: areAllPropsUndefined(item, [
      "extensionType",
      "autoUpgradeMinorVersion",
      "releaseTrain",
      "version",
      "scope",
      "configurationSettings",
      "configurationProtectedSettings",
      "statuses",
      "aksAssignedIdentity",
    ])
      ? undefined
      : _extensionPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function extensionDeserializer(item: any): Extension {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _extensionPropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Properties of an Extension resource */
export interface ExtensionProperties {
  /** Type of the Extension, of which this resource is an instance of.  It must be one of the Extension Types registered with Microsoft.KubernetesConfiguration by the Extension publisher. */
  extensionType?: string;
  /** Flag to note if this extension participates in auto upgrade of minor version, or not. */
  autoUpgradeMinorVersion?: boolean;
  /** ReleaseTrain this extension participates in for auto-upgrade (e.g. Stable, Preview, etc.) - only if autoUpgradeMinorVersion is 'true'. */
  releaseTrain?: string;
  /** User-specified version of the extension for this extension to 'pin'. To use 'version', autoUpgradeMinorVersion must be 'false'. */
  version?: string;
  /** Scope at which the extension is installed. */
  scope?: Scope;
  /** Configuration settings, as name-value pairs for configuring this extension. */
  configurationSettings?: Record<string, string>;
  /** Configuration settings that are sensitive, as name-value pairs for configuring this extension. */
  configurationProtectedSettings?: Record<string, string>;
  /** Currently installed version of the extension. */
  readonly currentVersion?: string;
  /** Status of installation of this extension. */
  readonly provisioningState?: ProvisioningState;
  /** Status from this extension. */
  statuses?: ExtensionStatus[];
  /** Error information from the Agent - e.g. errors during installation. */
  readonly errorInfo?: ErrorDetail;
  /** Custom Location settings properties. */
  readonly customLocationSettings?: Record<string, string>;
  /** Uri of the Helm package */
  readonly packageUri?: string;
  /** Identity of the Extension resource in an AKS cluster */
  aksAssignedIdentity?: ExtensionPropertiesAksAssignedIdentity;
  /** Flag to note if this extension is a system extension */
  readonly isSystemExtension?: boolean;
}

export function extensionPropertiesSerializer(item: ExtensionProperties): any {
  return {
    extensionType: item["extensionType"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    releaseTrain: item["releaseTrain"],
    version: item["version"],
    scope: !item["scope"] ? item["scope"] : scopeSerializer(item["scope"]),
    configurationSettings: item["configurationSettings"],
    configurationProtectedSettings: item["configurationProtectedSettings"],
    statuses: !item["statuses"]
      ? item["statuses"]
      : extensionStatusArraySerializer(item["statuses"]),
    aksAssignedIdentity: !item["aksAssignedIdentity"]
      ? item["aksAssignedIdentity"]
      : extensionPropertiesAksAssignedIdentitySerializer(item["aksAssignedIdentity"]),
  };
}

export function extensionPropertiesDeserializer(item: any): ExtensionProperties {
  return {
    extensionType: item["extensionType"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    releaseTrain: item["releaseTrain"],
    version: item["version"],
    scope: !item["scope"] ? item["scope"] : scopeDeserializer(item["scope"]),
    configurationSettings: !item["configurationSettings"]
      ? item["configurationSettings"]
      : Object.fromEntries(
          Object.entries(item["configurationSettings"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    configurationProtectedSettings: !item["configurationProtectedSettings"]
      ? item["configurationProtectedSettings"]
      : Object.fromEntries(
          Object.entries(item["configurationProtectedSettings"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    currentVersion: item["currentVersion"],
    provisioningState: item["provisioningState"],
    statuses: !item["statuses"]
      ? item["statuses"]
      : extensionStatusArrayDeserializer(item["statuses"]),
    errorInfo: !item["errorInfo"] ? item["errorInfo"] : errorDetailDeserializer(item["errorInfo"]),
    customLocationSettings: !item["customLocationSettings"]
      ? item["customLocationSettings"]
      : Object.fromEntries(
          Object.entries(item["customLocationSettings"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    packageUri: item["packageUri"],
    aksAssignedIdentity: !item["aksAssignedIdentity"]
      ? item["aksAssignedIdentity"]
      : extensionPropertiesAksAssignedIdentityDeserializer(item["aksAssignedIdentity"]),
    isSystemExtension: item["isSystemExtension"],
  };
}

/** Scope of the extension. It can be either Cluster or Namespace; but not both. */
export interface Scope {
  /** Specifies that the scope of the extension is Cluster */
  cluster?: ScopeCluster;
  /** Specifies that the scope of the extension is Namespace */
  namespace?: ScopeNamespace;
}

export function scopeSerializer(item: Scope): any {
  return {
    cluster: !item["cluster"] ? item["cluster"] : scopeClusterSerializer(item["cluster"]),
    namespace: !item["namespace"] ? item["namespace"] : scopeNamespaceSerializer(item["namespace"]),
  };
}

export function scopeDeserializer(item: any): Scope {
  return {
    cluster: !item["cluster"] ? item["cluster"] : scopeClusterDeserializer(item["cluster"]),
    namespace: !item["namespace"]
      ? item["namespace"]
      : scopeNamespaceDeserializer(item["namespace"]),
  };
}

/** Specifies that the scope of the extension is Cluster */
export interface ScopeCluster {
  /** Namespace where the extension Release must be placed, for a Cluster scoped extension.  If this namespace does not exist, it will be created */
  releaseNamespace?: string;
}

export function scopeClusterSerializer(item: ScopeCluster): any {
  return { releaseNamespace: item["releaseNamespace"] };
}

export function scopeClusterDeserializer(item: any): ScopeCluster {
  return {
    releaseNamespace: item["releaseNamespace"],
  };
}

/** Specifies that the scope of the extension is Namespace */
export interface ScopeNamespace {
  /** Namespace where the extension will be created for an Namespace scoped extension.  If this namespace does not exist, it will be created */
  targetNamespace?: string;
}

export function scopeNamespaceSerializer(item: ScopeNamespace): any {
  return { targetNamespace: item["targetNamespace"] };
}

export function scopeNamespaceDeserializer(item: any): ScopeNamespace {
  return {
    targetNamespace: item["targetNamespace"],
  };
}

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

export function extensionStatusArraySerializer(result: Array<ExtensionStatus>): any[] {
  return result.map((item) => {
    return extensionStatusSerializer(item);
  });
}

export function extensionStatusArrayDeserializer(result: Array<ExtensionStatus>): any[] {
  return result.map((item) => {
    return extensionStatusDeserializer(item);
  });
}

/** Status from the extension. */
export interface ExtensionStatus {
  /** Status code provided by the Extension */
  code?: string;
  /** Short description of status of the extension. */
  displayStatus?: string;
  /** Level of the status. */
  level?: LevelType;
  /** Detailed message of the status from the Extension. */
  message?: string;
  /** DateLiteral (per ISO8601) noting the time of installation status. */
  time?: string;
}

export function extensionStatusSerializer(item: ExtensionStatus): any {
  return {
    code: item["code"],
    displayStatus: item["displayStatus"],
    level: item["level"],
    message: item["message"],
    time: item["time"],
  };
}

export function extensionStatusDeserializer(item: any): ExtensionStatus {
  return {
    code: item["code"],
    displayStatus: item["displayStatus"],
    level: item["level"],
    message: item["message"],
    time: item["time"],
  };
}

/** Level of the status. */
export enum KnownLevelType {
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
  /** Information */
  Information = "Information",
}

/**
 * Level of the status. \
 * {@link KnownLevelType} can be used interchangeably with LevelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: Error \
 * **Warning**: Warning \
 * **Information**: Information
 */
export type LevelType = string;

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

/** Identity of the Extension resource in an AKS cluster */
export interface ExtensionPropertiesAksAssignedIdentity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: AKSIdentityType;
}

export function extensionPropertiesAksAssignedIdentitySerializer(
  item: ExtensionPropertiesAksAssignedIdentity,
): any {
  return { type: item["type"] };
}

export function extensionPropertiesAksAssignedIdentityDeserializer(
  item: any,
): ExtensionPropertiesAksAssignedIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** The identity type. */
export type AKSIdentityType = "SystemAssigned" | "UserAssigned";

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. The value must be an UUID. */
  readonly principalId?: string;
  /** The tenant ID of resource. The value must be an UUID. */
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

/** Type of ResourceIdentityType */
export type ResourceIdentityType = "SystemAssigned";

/** Plan for the resource. */
export interface Plan {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

export function planDeserializer(item: any): Plan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
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

/** The Extension Patch Request object. */
export interface PatchExtension {
  /** Flag to note if this extension participates in auto upgrade of minor version, or not. */
  autoUpgradeMinorVersion?: boolean;
  /** ReleaseTrain this extension participates in for auto-upgrade (e.g. Stable, Preview, etc.) - only if autoUpgradeMinorVersion is 'true'. */
  releaseTrain?: string;
  /** Version of the extension for this extension, if it is 'pinned' to a specific version. autoUpgradeMinorVersion must be 'false'. */
  version?: string;
  /** Configuration settings, as name-value pairs for configuring this extension. */
  configurationSettings?: Record<string, string>;
  /** Configuration settings that are sensitive, as name-value pairs for configuring this extension. */
  configurationProtectedSettings?: Record<string, string>;
}

export function patchExtensionSerializer(item: PatchExtension): any {
  return {
    properties: areAllPropsUndefined(item, [
      "autoUpgradeMinorVersion",
      "releaseTrain",
      "version",
      "configurationSettings",
      "configurationProtectedSettings",
    ])
      ? undefined
      : _patchExtensionPropertiesSerializer(item),
  };
}

/** Updatable properties of an Extension Patch Request */
export interface PatchExtensionProperties {
  /** Flag to note if this extension participates in auto upgrade of minor version, or not. */
  autoUpgradeMinorVersion?: boolean;
  /** ReleaseTrain this extension participates in for auto-upgrade (e.g. Stable, Preview, etc.) - only if autoUpgradeMinorVersion is 'true'. */
  releaseTrain?: string;
  /** Version of the extension for this extension, if it is 'pinned' to a specific version. autoUpgradeMinorVersion must be 'false'. */
  version?: string;
  /** Configuration settings, as name-value pairs for configuring this extension. */
  configurationSettings?: Record<string, string>;
  /** Configuration settings that are sensitive, as name-value pairs for configuring this extension. */
  configurationProtectedSettings?: Record<string, string>;
}

export function patchExtensionPropertiesSerializer(item: PatchExtensionProperties): any {
  return {
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    releaseTrain: item["releaseTrain"],
    version: item["version"],
    configurationSettings: item["configurationSettings"],
    configurationProtectedSettings: item["configurationProtectedSettings"],
  };
}

/** Result of the request to list Extensions.  It contains a list of Extension objects and a URL link to get the next set of results. */
export interface _ExtensionsList {
  /** The Extension items on this page */
  value: Extension[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extensionsListDeserializer(item: any): _ExtensionsList {
  return {
    value: extensionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionArraySerializer(result: Array<Extension>): any[] {
  return result.map((item) => {
    return extensionSerializer(item);
  });
}

export function extensionArrayDeserializer(result: Array<Extension>): any[] {
  return result.map((item) => {
    return extensionDeserializer(item);
  });
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Additional information, if available. */
  properties?: Record<string, string>;
  /** If present, details of the operation error. */
  readonly error?: ErrorDetail;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01 API version. */
  V20241101 = "2024-11-01",
}

export function _extensionPropertiesSerializer(item: Extension): any {
  return {
    extensionType: item["extensionType"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    releaseTrain: item["releaseTrain"],
    version: item["version"],
    scope: !item["scope"] ? item["scope"] : scopeSerializer(item["scope"]),
    configurationSettings: item["configurationSettings"],
    configurationProtectedSettings: item["configurationProtectedSettings"],
    statuses: !item["statuses"]
      ? item["statuses"]
      : extensionStatusArraySerializer(item["statuses"]),
    aksAssignedIdentity: !item["aksAssignedIdentity"]
      ? item["aksAssignedIdentity"]
      : extensionPropertiesAksAssignedIdentitySerializer(item["aksAssignedIdentity"]),
  };
}

export function _extensionPropertiesDeserializer(item: any) {
  return {
    extensionType: item["extensionType"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    releaseTrain: item["releaseTrain"],
    version: item["version"],
    scope: !item["scope"] ? item["scope"] : scopeDeserializer(item["scope"]),
    configurationSettings: !item["configurationSettings"]
      ? item["configurationSettings"]
      : Object.fromEntries(
          Object.entries(item["configurationSettings"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    configurationProtectedSettings: !item["configurationProtectedSettings"]
      ? item["configurationProtectedSettings"]
      : Object.fromEntries(
          Object.entries(item["configurationProtectedSettings"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    currentVersion: item["currentVersion"],
    provisioningState: item["provisioningState"],
    statuses: !item["statuses"]
      ? item["statuses"]
      : extensionStatusArrayDeserializer(item["statuses"]),
    errorInfo: !item["errorInfo"] ? item["errorInfo"] : errorDetailDeserializer(item["errorInfo"]),
    customLocationSettings: !item["customLocationSettings"]
      ? item["customLocationSettings"]
      : Object.fromEntries(
          Object.entries(item["customLocationSettings"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    packageUri: item["packageUri"],
    aksAssignedIdentity: !item["aksAssignedIdentity"]
      ? item["aksAssignedIdentity"]
      : extensionPropertiesAksAssignedIdentityDeserializer(item["aksAssignedIdentity"]),
    isSystemExtension: item["isSystemExtension"],
  };
}

export function _patchExtensionPropertiesSerializer(item: PatchExtension): any {
  return {
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    releaseTrain: item["releaseTrain"],
    version: item["version"],
    configurationSettings: item["configurationSettings"],
    configurationProtectedSettings: item["configurationProtectedSettings"],
  };
}
