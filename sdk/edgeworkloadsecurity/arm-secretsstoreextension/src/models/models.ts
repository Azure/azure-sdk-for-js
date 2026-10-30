// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
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

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

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

/** The AzureKeyVaultSecretProviderClass resource. */
export interface AzureKeyVaultSecretProviderClass extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AzureKeyVaultSecretProviderClassProperties;
  /** The extended location of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function azureKeyVaultSecretProviderClassSerializer(
  item: AzureKeyVaultSecretProviderClass,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : azureKeyVaultSecretProviderClassPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function azureKeyVaultSecretProviderClassDeserializer(
  item: any,
): AzureKeyVaultSecretProviderClass {
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
      : azureKeyVaultSecretProviderClassPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** The properties of the AzureKeyVaultSecretProviderClass. */
export interface AzureKeyVaultSecretProviderClassProperties {
  /** The name of the Azure Key Vault to sync secrets from. */
  keyvaultName: string;
  /**
   * The Azure cloud containing the key vault.
   * If omitted, the in-cluster Azure Key Vault provider's configured default cloud is used.
   */
  cloudName?: AzureCloudName;
  /** The user assigned managed identity client ID that should be used to access the Azure Key Vault. */
  clientId: string;
  /** The Azure Active Directory tenant ID that should be used for authenticating requests to the Azure Key Vault. */
  tenantId: string;
  /** Objects defines the desired state of synced K8s secret objects */
  objects?: string;
  /** Provisioning state of the AzureKeyVaultSecretProviderClass instance. */
  readonly provisioningState?: ProvisioningState;
}

export function azureKeyVaultSecretProviderClassPropertiesSerializer(
  item: AzureKeyVaultSecretProviderClassProperties,
): any {
  return {
    keyvaultName: item["keyvaultName"],
    cloudName: item["cloudName"],
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    objects: item["objects"],
  };
}

export function azureKeyVaultSecretProviderClassPropertiesDeserializer(
  item: any,
): AzureKeyVaultSecretProviderClassProperties {
  return {
    keyvaultName: item["keyvaultName"],
    cloudName: item["cloudName"],
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    objects: item["objects"],
    provisioningState: item["provisioningState"],
  };
}

/** Azure clouds for the in-cluster Azure Key Vault provider. */
export enum KnownAzureCloudName {
  /** Azure public cloud. */
  AzurePublicCloud = "AzurePublicCloud",
  /** Azure US Government cloud. */
  AzureUSGovernmentCloud = "AzureUSGovernmentCloud",
  /** Azure China cloud. */
  AzureChinaCloud = "AzureChinaCloud",
  /** Azure Germany cloud. */
  AzureGermanCloud = "AzureGermanCloud",
  /** Azure Stack cloud. */
  AzureStackCloud = "AzureStackCloud",
}

/**
 * Azure clouds for the in-cluster Azure Key Vault provider. \
 * {@link KnownAzureCloudName} can be used interchangeably with AzureCloudName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzurePublicCloud**: Azure public cloud. \
 * **AzureUSGovernmentCloud**: Azure US Government cloud. \
 * **AzureChinaCloud**: Azure China cloud. \
 * **AzureGermanCloud**: Azure Germany cloud. \
 * **AzureStackCloud**: Azure Stack cloud.
 */
export type AzureCloudName = string;

/** Provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ProvisioningState = string;

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name: string;
  /** The type of the extended location. */
  type: ExtendedLocationType;
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

/** The supported ExtendedLocation types. */
export enum KnownExtendedLocationType {
  /** Azure Edge Zones location type */
  EdgeZone = "EdgeZone",
  /** Azure Custom Locations type */
  CustomLocation = "CustomLocation",
}

/**
 * The supported ExtendedLocation types. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: Azure Edge Zones location type \
 * **CustomLocation**: Azure Custom Locations type
 */
export type ExtendedLocationType = string;

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

/** The type used for update operations of the AzureKeyVaultSecretProviderClass. */
export interface AzureKeyVaultSecretProviderClassUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AzureKeyVaultSecretProviderClassUpdateProperties;
}

export function azureKeyVaultSecretProviderClassUpdateSerializer(
  item: AzureKeyVaultSecretProviderClassUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : azureKeyVaultSecretProviderClassUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AzureKeyVaultSecretProviderClass. */
export interface AzureKeyVaultSecretProviderClassUpdateProperties {
  /** The name of the Azure Key Vault to sync secrets from. */
  keyvaultName?: string;
  /**
   * The Azure cloud containing the key vault.
   * If omitted, the in-cluster Azure Key Vault provider's configured default cloud is used.
   */
  cloudName?: AzureCloudName;
  /** The user assigned managed identity client ID that should be used to access the Azure Key Vault. */
  clientId?: string;
  /** The Azure Active Directory tenant ID that should be used for authenticating requests to the Azure Key Vault. */
  tenantId?: string;
  /** Objects defines the desired state of synced K8s secret objects */
  objects?: string;
}

export function azureKeyVaultSecretProviderClassUpdatePropertiesSerializer(
  item: AzureKeyVaultSecretProviderClassUpdateProperties,
): any {
  return {
    keyvaultName: item["keyvaultName"],
    cloudName: item["cloudName"],
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    objects: item["objects"],
  };
}

/** The response of a AzureKeyVaultSecretProviderClass list operation. */
export interface _AzureKeyVaultSecretProviderClassListResult {
  /** The AzureKeyVaultSecretProviderClass items on this page */
  value: AzureKeyVaultSecretProviderClass[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _azureKeyVaultSecretProviderClassListResultDeserializer(
  item: any,
): _AzureKeyVaultSecretProviderClassListResult {
  return {
    value: azureKeyVaultSecretProviderClassArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureKeyVaultSecretProviderClassArraySerializer(
  result: Array<AzureKeyVaultSecretProviderClass>,
): any[] {
  return result.map((item) => {
    return azureKeyVaultSecretProviderClassSerializer(item);
  });
}

export function azureKeyVaultSecretProviderClassArrayDeserializer(
  result: Array<AzureKeyVaultSecretProviderClass>,
): any[] {
  return result.map((item) => {
    return azureKeyVaultSecretProviderClassDeserializer(item);
  });
}

/** The SecretSync resource. */
export interface SecretSync extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SecretSyncProperties;
  /** The extended location of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function secretSyncSerializer(item: SecretSync): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : secretSyncPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function secretSyncDeserializer(item: any): SecretSync {
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
      : secretSyncPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** The properties of the SecretSync instance. */
export interface SecretSyncProperties {
  /** SecretProviderClassName specifies the name of the SecretProviderClass resource, which contains the information needed to access the cloud provider secret store. */
  secretProviderClassName: string;
  /** ServiceAccountName specifies the name of the service account used to access the cloud provider secret store. The audience field in the service account token must be passed as parameter in the controller configuration. The audience is used when requesting a token from the API server for the service account; the supported audiences are defined by each provider. */
  serviceAccountName: string;
  /** Type specifies the type of the Kubernetes secret object, e.g. `Opaque` or `kubernetes.io/tls`. The controller must have permission to create secrets of the specified type. */
  kubernetesSecretType: KubernetesSecretType;
  /** ForceSynchronization can be used to force the secret synchronization. The secret synchronization is triggered by changing the value in this field. This field is not used to resolve synchronization conflicts. */
  forceSynchronization?: string;
  /** An array of SecretObjectData that maps secret data from the external secret provider to the Kubernetes secret. Each entry specifies the source secret in the external provider and the corresponding key in the Kubernetes secret. */
  objectSecretMapping: KubernetesSecretObjectMapping[];
  /** SecretSyncStatus defines the observed state of the secret synchronization process. */
  readonly status?: SecretSyncStatus;
  /** Provisioning state of the SecretSync instance. */
  readonly provisioningState?: ProvisioningState;
}

export function secretSyncPropertiesSerializer(item: SecretSyncProperties): any {
  return {
    secretProviderClassName: item["secretProviderClassName"],
    serviceAccountName: item["serviceAccountName"],
    kubernetesSecretType: item["kubernetesSecretType"],
    forceSynchronization: item["forceSynchronization"],
    objectSecretMapping: kubernetesSecretObjectMappingArraySerializer(item["objectSecretMapping"]),
  };
}

export function secretSyncPropertiesDeserializer(item: any): SecretSyncProperties {
  return {
    secretProviderClassName: item["secretProviderClassName"],
    serviceAccountName: item["serviceAccountName"],
    kubernetesSecretType: item["kubernetesSecretType"],
    forceSynchronization: item["forceSynchronization"],
    objectSecretMapping: kubernetesSecretObjectMappingArrayDeserializer(
      item["objectSecretMapping"],
    ),
    status: !item["status"] ? item["status"] : secretSyncStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Supported Kubernetes secret types. */
export enum KnownKubernetesSecretType {
  /** Opaque is the default secret type. */
  Opaque = "Opaque",
  /** The kubernetes.io/tls secret type is for storing a certificate and its associated key that are typically used for TLS. */
  Tls = "kubernetes.io/tls",
}

/**
 * Supported Kubernetes secret types. \
 * {@link KnownKubernetesSecretType} can be used interchangeably with KubernetesSecretType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Opaque**: Opaque is the default secret type. \
 * **kubernetes.io\/tls**: The kubernetes.io\/tls secret type is for storing a certificate and its associated key that are typically used for TLS.
 */
export type KubernetesSecretType = string;

export function kubernetesSecretObjectMappingArraySerializer(
  result: Array<KubernetesSecretObjectMapping>,
): any[] {
  return result.map((item) => {
    return kubernetesSecretObjectMappingSerializer(item);
  });
}

export function kubernetesSecretObjectMappingArrayDeserializer(
  result: Array<KubernetesSecretObjectMapping>,
): any[] {
  return result.map((item) => {
    return kubernetesSecretObjectMappingDeserializer(item);
  });
}

/** Properties defining the mapping between a cloud secret store object and a Kubernetes Secret. */
export interface KubernetesSecretObjectMapping {
  /** SourcePath is the identifier for the secret data as defined by the external secret provider. This is the key or path to the secret in the provider's system, which gets mounted to a specific path in the pod. The value should match the name of the secret as specified in the SecretProviderClass's objects array. */
  sourcePath: string;
  /** TargetKey is the key in the Kubernetes secret's data field where the secret value will be stored. This key is used to reference the secret data within Kubernetes, and it should be unique within the secret. */
  targetKey: string;
}

export function kubernetesSecretObjectMappingSerializer(item: KubernetesSecretObjectMapping): any {
  return { sourcePath: item["sourcePath"], targetKey: item["targetKey"] };
}

export function kubernetesSecretObjectMappingDeserializer(
  item: any,
): KubernetesSecretObjectMapping {
  return {
    sourcePath: item["sourcePath"],
    targetKey: item["targetKey"],
  };
}

/** SecretSyncStatus defines the observed state of the secret synchronization process. */
export interface SecretSyncStatus {
  /** LastSuccessfulSyncTime represents the last time the secret was retrieved from the Provider and updated. */
  readonly lastSuccessfulSyncTime?: Date;
  /** Conditions represent the status of the secret create and update processes. The status can be True, False, or Unknown with various reasons and messages explaining the state. Examples of reasons include CreateSucceeded, ProviderError, InvalidClusterSecretLabelError, InvalidClusterSecretAnnotationError, UnknownError, ValidatingAdmissionPolicyCheckFailed, UserInputValidationFailed, ControllerSpcError, ControllerInternalError, NoValueChange, and ValueChangeOrForceUpdateDetected. */
  readonly conditions?: SecretSyncCondition[];
}

export function secretSyncStatusDeserializer(item: any): SecretSyncStatus {
  return {
    lastSuccessfulSyncTime: !item["lastSuccessfulSyncTime"]
      ? item["lastSuccessfulSyncTime"]
      : new Date(item["lastSuccessfulSyncTime"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : secretSyncConditionArrayDeserializer(item["conditions"]),
  };
}

export function secretSyncConditionArrayDeserializer(result: Array<SecretSyncCondition>): any[] {
  return result.map((item) => {
    return secretSyncConditionDeserializer(item);
  });
}

/** A condition represents the status of the secret create and update processes. */
export interface SecretSyncCondition {
  /** LastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed. If that is not known, then using the time when the API field changed is acceptable. */
  readonly lastTransitionTime?: Date;
  /** Message is a human readable message indicating details about the transition. This may be an empty string. */
  readonly message: string;
  /** ObservedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance. */
  readonly observedGeneration?: number;
  /** Reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty. */
  readonly reason: string;
  /** Status of the condition, one of True, False, Unknown. */
  readonly status: StatusConditionType;
  /** Type of condition in CamelCase or in foo.example.com/CamelCase. Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to de-conflict is important. The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt) */
  readonly type: string;
}

export function secretSyncConditionDeserializer(item: any): SecretSyncCondition {
  return {
    lastTransitionTime: !item["lastTransitionTime"]
      ? item["lastTransitionTime"]
      : new Date(item["lastTransitionTime"]),
    message: item["message"],
    observedGeneration: item["observedGeneration"],
    reason: item["reason"],
    status: item["status"],
    type: item["type"],
  };
}

/** Status conditions types */
export enum KnownStatusConditionType {
  /** The status is true */
  True = "True",
  /** The status is false */
  False = "False",
  /** The status is unknown */
  Unknown = "Unknown",
}

/**
 * Status conditions types \
 * {@link KnownStatusConditionType} can be used interchangeably with StatusConditionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: The status is true \
 * **False**: The status is false \
 * **Unknown**: The status is unknown
 */
export type StatusConditionType = string;

/** The type used for update operations of the SecretSync. */
export interface SecretSyncUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: SecretSyncUpdateProperties;
}

export function secretSyncUpdateSerializer(item: SecretSyncUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : secretSyncUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the SecretSync. */
export interface SecretSyncUpdateProperties {
  /** SecretProviderClassName specifies the name of the SecretProviderClass resource, which contains the information needed to access the cloud provider secret store. */
  secretProviderClassName?: string;
  /** ServiceAccountName specifies the name of the service account used to access the cloud provider secret store. The audience field in the service account token must be passed as parameter in the controller configuration. The audience is used when requesting a token from the API server for the service account; the supported audiences are defined by each provider. */
  serviceAccountName?: string;
  /** ForceSynchronization can be used to force the secret synchronization. The secret synchronization is triggered by changing the value in this field. This field is not used to resolve synchronization conflicts. */
  forceSynchronization?: string;
  /** An array of SecretObjectData that maps secret data from the external secret provider to the Kubernetes secret. Each entry specifies the source secret in the external provider and the corresponding key in the Kubernetes secret. */
  objectSecretMapping?: KubernetesSecretObjectMapping[];
}

export function secretSyncUpdatePropertiesSerializer(item: SecretSyncUpdateProperties): any {
  return {
    secretProviderClassName: item["secretProviderClassName"],
    serviceAccountName: item["serviceAccountName"],
    forceSynchronization: item["forceSynchronization"],
    objectSecretMapping: !item["objectSecretMapping"]
      ? item["objectSecretMapping"]
      : kubernetesSecretObjectMappingArraySerializer(item["objectSecretMapping"]),
  };
}

/** The response of a SecretSync list operation. */
export interface _SecretSyncListResult {
  /** The SecretSync items on this page */
  value: SecretSync[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _secretSyncListResultDeserializer(item: any): _SecretSyncListResult {
  return {
    value: secretSyncArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secretSyncArraySerializer(result: Array<SecretSync>): any[] {
  return result.map((item) => {
    return secretSyncSerializer(item);
  });
}

export function secretSyncArrayDeserializer(result: Array<SecretSync>): any[] {
  return result.map((item) => {
    return secretSyncDeserializer(item);
  });
}

/** Supported API versions for the Microsoft.SecretSyncController resource provider. */
export enum KnownVersions {
  /** The 2024-08-21-preview API. */
  V20240821Preview = "2024-08-21-preview",
  /** The 2026-09-25-preview API. */
  V20260925Preview = "2026-09-25-preview",
}
