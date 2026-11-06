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

/** The singleton HorizonDB capability catalog entry available to a subscription in a location. */
export interface Capability extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CapabilityProperties;
}

export function capabilityDeserializer(item: any): Capability {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : capabilityPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the HorizonDB capabilities available to a subscription in a location. */
export interface CapabilityProperties {
  /** The provisioning state of the capability catalog entry. */
  readonly provisioningState?: ProvisioningState;
  /** The Cluster capabilities available in the region. */
  readonly clusterCapabilities: ClusterCapability;
  /** The Pool capabilities available in the region, including processor, generation, and compute-model details. */
  readonly poolCapabilities: PoolCapability;
}

export function capabilityPropertiesDeserializer(item: any): CapabilityProperties {
  return {
    provisioningState: item["provisioningState"],
    clusterCapabilities: clusterCapabilityDeserializer(item["clusterCapabilities"]),
    poolCapabilities: poolCapabilityDeserializer(item["poolCapabilities"]),
  };
}

/** The provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The HorizonDB resource operation is actively running. */
  InProgress = "InProgress",
  /** The HorizonDB resource is still provisioning. */
  Provisioning = "Provisioning",
}

/**
 * The provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **InProgress**: The HorizonDB resource operation is actively running. \
 * **Provisioning**: The HorizonDB resource is still provisioning.
 */
export type ProvisioningState = string;

/** The HorizonDB Cluster capabilities available in a location. */
export interface ClusterCapability {
  /** The PostgreSQL major version recommended for clients to select for HorizonDB Clusters in the region. This recommendation does not describe backend behavior when the PostgreSQL version is omitted from a request. */
  readonly recommendedPostgreSqlVersion: PostgreSqlCapabilityVersion;
  /** The PostgreSQL major versions supported by Clusters in the region. */
  readonly supportedPostgreSqlVersions: PostgreSqlVersionCapability[];
  /** Additional Cluster features supported in the region. */
  readonly supportedFeatures: ClusterFeatureCapability[];
}

export function clusterCapabilityDeserializer(item: any): ClusterCapability {
  return {
    recommendedPostgreSqlVersion: item["recommendedPostgreSqlVersion"],
    supportedPostgreSqlVersions: postgreSqlVersionCapabilityArrayDeserializer(
      item["supportedPostgreSqlVersions"],
    ),
    supportedFeatures: clusterFeatureCapabilityArrayDeserializer(item["supportedFeatures"]),
  };
}

/** A PostgreSQL major version advertised by the HorizonDB capabilities API. */
export enum KnownPostgreSqlCapabilityVersion {
  /** PostgreSQL major version 17. */
  V17 = "17",
  /** PostgreSQL major version 18. */
  V18 = "18",
}

/**
 * A PostgreSQL major version advertised by the HorizonDB capabilities API. \
 * {@link KnownPostgreSqlCapabilityVersion} can be used interchangeably with PostgreSqlCapabilityVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **17**: PostgreSQL major version 17. \
 * **18**: PostgreSQL major version 18.
 */
export type PostgreSqlCapabilityVersion = string;

export function postgreSqlVersionCapabilityArrayDeserializer(
  result: Array<PostgreSqlVersionCapability>,
): any[] {
  return result.map((item) => {
    return postgreSqlVersionCapabilityDeserializer(item);
  });
}

/** The capabilities of a PostgreSQL major version supported by HorizonDB. */
export interface PostgreSqlVersionCapability {
  /** The PostgreSQL major version. */
  readonly name: PostgreSqlCapabilityVersion;
  /** The PostgreSQL major versions to which this version can be upgraded in place. API version 2026-10-01-preview does not support in-place PostgreSQL major-version upgrades, so this array is always empty. */
  readonly supportedVersionsToUpgrade: PostgreSqlCapabilityVersion[];
}

export function postgreSqlVersionCapabilityDeserializer(item: any): PostgreSqlVersionCapability {
  return {
    name: item["name"],
    supportedVersionsToUpgrade: item["supportedVersionsToUpgrade"].map((p: any) => {
      return p;
    }),
  };
}

export function clusterFeatureCapabilityArrayDeserializer(
  result: Array<ClusterFeatureCapability>,
): any[] {
  return result.map((item) => {
    return clusterFeatureCapabilityDeserializer(item);
  });
}

/** A HorizonDB Cluster feature supported in a location. */
export interface ClusterFeatureCapability {
  /** The name of the Cluster feature. */
  readonly name: string;
}

export function clusterFeatureCapabilityDeserializer(item: any): ClusterFeatureCapability {
  return {
    name: item["name"],
  };
}

/** The HorizonDB Pool capabilities available in a location. */
export interface PoolCapability {
  /** The compute processor recommended for clients to select for HorizonDB Pools in the region. This recommendation does not describe backend behavior when the compute processor is omitted from a request. */
  readonly recommendedComputeProcessor: ComputeProcessorType;
  /** The processor families and their compute capabilities supported by Pools in the region. */
  readonly supportedProcessors: ComputeProcessorCapability[];
  /** Additional Pool features supported in the region independently of a processor, generation, or compute model. */
  readonly supportedFeatures: PoolFeatureCapability[];
}

export function poolCapabilityDeserializer(item: any): PoolCapability {
  return {
    recommendedComputeProcessor: item["recommendedComputeProcessor"],
    supportedProcessors: computeProcessorCapabilityArrayDeserializer(item["supportedProcessors"]),
    supportedFeatures: poolFeatureCapabilityArrayDeserializer(item["supportedFeatures"]),
  };
}

/** The compute processor type. */
export enum KnownComputeProcessorType {
  /** Intel processor */
  Intel = "Intel",
  /** AMD processor */
  AMD = "AMD",
}

/**
 * The compute processor type. \
 * {@link KnownComputeProcessorType} can be used interchangeably with ComputeProcessorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Intel**: Intel processor \
 * **AMD**: AMD processor
 */
export type ComputeProcessorType = string;

export function computeProcessorCapabilityArrayDeserializer(
  result: Array<ComputeProcessorCapability>,
): any[] {
  return result.map((item) => {
    return computeProcessorCapabilityDeserializer(item);
  });
}

/** The capabilities of a processor family supported by HorizonDB. */
export interface ComputeProcessorCapability {
  /** The name of the processor family. */
  readonly name: ComputeProcessorType;
  /** The compute generations supported by the processor family. */
  readonly supportedGenerations: ComputeGenerationCapability[];
}

export function computeProcessorCapabilityDeserializer(item: any): ComputeProcessorCapability {
  return {
    name: item["name"],
    supportedGenerations: computeGenerationCapabilityArrayDeserializer(
      item["supportedGenerations"],
    ),
  };
}

export function computeGenerationCapabilityArrayDeserializer(
  result: Array<ComputeGenerationCapability>,
): any[] {
  return result.map((item) => {
    return computeGenerationCapabilityDeserializer(item);
  });
}

/** The capabilities of a HorizonDB compute generation. */
export interface ComputeGenerationCapability {
  /** The numeric compute generation used when configuring a HorizonDB pool. */
  readonly computeGeneration: number;
  /** The compute model type recommended for clients to select for this compute generation. This recommendation does not describe backend behavior when the compute model type is omitted from a request. */
  readonly recommendedComputeModelType: PoolComputeModelType;
  /** The compute models supported by the compute generation. */
  readonly supportedComputeModels: ComputeModelCapabilityUnion[];
}

export function computeGenerationCapabilityDeserializer(item: any): ComputeGenerationCapability {
  return {
    computeGeneration: item["computeGeneration"],
    recommendedComputeModelType: item["recommendedComputeModelType"],
    supportedComputeModels: computeModelCapabilityUnionArrayDeserializer(
      item["supportedComputeModels"],
    ),
  };
}

/** The compute model type. */
export enum KnownPoolComputeModelType {
  /** Provisioned compute model */
  Provisioned = "Provisioned",
}

/**
 * The compute model type. \
 * {@link KnownPoolComputeModelType} can be used interchangeably with PoolComputeModelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioned**: Provisioned compute model
 */
export type PoolComputeModelType = string;

export function computeModelCapabilityUnionArrayDeserializer(
  result: Array<ComputeModelCapabilityUnion>,
): any[] {
  return result.map((item) => {
    return computeModelCapabilityUnionDeserializer(item);
  });
}

/** The capabilities of a HorizonDB compute model. */
export interface ComputeModelCapability {
  /** The compute model represented by these capabilities. */
  /** The discriminator possible values: Provisioned */
  readonly type: PoolComputeModelType;
}

export function computeModelCapabilityDeserializer(item: any): ComputeModelCapability {
  return {
    type: item["type"],
  };
}

/** Alias for ComputeModelCapabilityUnion */
export type ComputeModelCapabilityUnion =
  ProvisionedComputeModelCapability | ComputeModelCapability;

export function computeModelCapabilityUnionDeserializer(item: any): ComputeModelCapabilityUnion {
  switch (item["type"]) {
    case "Provisioned":
      return provisionedComputeModelCapabilityDeserializer(
        item as ProvisionedComputeModelCapability,
      );

    default:
      return computeModelCapabilityDeserializer(item);
  }
}

/** The capabilities of the Provisioned compute model. */
export interface ProvisionedComputeModelCapability extends ComputeModelCapability {
  /** The compute model represented by these capabilities. */
  type: "Provisioned";
  /** The provisioned vCore count recommended for clients to select. This recommendation does not describe backend behavior when vCores is omitted from a request. */
  readonly recommendedVCoreCount: number;
  /** The supported provisioned compute sizes. */
  readonly supportedComputeSizes: ComputeSizeCapability[];
}

export function provisionedComputeModelCapabilityDeserializer(
  item: any,
): ProvisionedComputeModelCapability {
  return {
    type: item["type"],
    recommendedVCoreCount: item["recommendedVCoreCount"],
    supportedComputeSizes: computeSizeCapabilityArrayDeserializer(item["supportedComputeSizes"]),
  };
}

export function computeSizeCapabilityArrayDeserializer(
  result: Array<ComputeSizeCapability>,
): any[] {
  return result.map((item) => {
    return computeSizeCapabilityDeserializer(item);
  });
}

/** A vCore configuration supported by a HorizonDB processor generation. */
export interface ComputeSizeCapability {
  /** The number of vCores in the configuration. */
  readonly vCores: number;
  /** The memory in megabytes available for each vCore. */
  readonly memoryPerVCoreInMb: number;
}

export function computeSizeCapabilityDeserializer(item: any): ComputeSizeCapability {
  return {
    vCores: item["vCores"],
    memoryPerVCoreInMb: item["memoryPerVCoreInMb"],
  };
}

export function poolFeatureCapabilityArrayDeserializer(
  result: Array<PoolFeatureCapability>,
): any[] {
  return result.map((item) => {
    return poolFeatureCapabilityDeserializer(item);
  });
}

/** A HorizonDB Pool feature supported in a location. */
export interface PoolFeatureCapability {
  /** The name of the Pool feature. */
  readonly name: string;
}

export function poolFeatureCapabilityDeserializer(item: any): PoolFeatureCapability {
  return {
    name: item["name"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

/** The response of a Capability list operation. */
export interface _CapabilityListResult {
  /** The Capability items on this page */
  value: Capability[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capabilityListResultDeserializer(item: any): _CapabilityListResult {
  return {
    value: capabilityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
}

/** Represents the HorizonDB cluster. */
export interface Cluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ClusterProperties;
  /** The managed service identities assigned to this resource. Omitting the entire identity property from PUT or PATCH preserves all current assignments. When provided, PUT replaces the user-assigned identity set and PATCH merges it; null PATCH dictionary entries remove individual identities. Setting type to None clears all assignments. */
  identity?: HorizonDbClusterManagedServiceIdentity;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : horizonDbClusterManagedServiceIdentitySerializer(item["identity"]),
  };
}

export function clusterDeserializer(item: any): Cluster {
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
      : clusterPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : horizonDbClusterManagedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a HorizonDB cluster. */
export interface ClusterProperties {
  /** The PostgreSQL major version used by the HorizonDB cluster. API version 2026-10-01-preview supports versions 17 and 18. For ordinary cluster creation, the version is supplied in the request and is immutable after creation. For point-in-time restore, the service obtains the version from the source backup metadata and the request must omit this property. This API version does not support in-place PostgreSQL major-version upgrades. */
  postgreSqlVersion?: PostgreSqlVersion;
  /** The mode used to create the cluster. When this property is omitted while creating a new cluster, the service records Create. PointInTimeRestore creates a new cluster from an available backup; pointInTimeUtc and creationSourceClusterResourceId are then required, postgreSqlVersion must be omitted because it is obtained from the backup metadata, and creationSourceClusterLocation is required when the source and target cluster locations differ. This property is immutable and is returned as creation provenance. On replacement, omission preserves the recorded value, resubmitting the same value is accepted, and changing it is rejected. */
  creationMode?: ClusterCreateMode;
  /** The requested point in time, in UTC. This property is required in every PointInTimeRestore request. For a same-location restore, the service restores the latest backup available at or before this value. For a cross-location restore, the service requires but ignores this value and restores the latest available backup; cross-location responses omit this property. This property must be absent for other creation modes or when creationMode is omitted and can only be specified during resource creation. */
  pointInTimeUtc?: Date;
  /** The Azure resource ID of the source HorizonDB cluster used by the selected creation mode. This property is required for PointInTimeRestore and other source-based creation modes, and must be absent when creationMode is Create or omitted. A source cluster does not need to have a pool to be restored, provided an available backup exists. This immutable creation-provenance value does not change after creation. */
  creationSourceClusterResourceId?: string;
  /** The Azure location of the source HorizonDB cluster used for point-in-time restore. This property is optional when the source and target cluster locations are the same. It is required when the source cluster location differs from the target cluster location and must identify the source cluster's location. This property must be absent for creation modes other than PointInTimeRestore or when creationMode is omitted. This immutable creation-provenance value does not change after creation. */
  creationSourceClusterLocation?: string;
  /** The network configuration for the cluster. When this object is omitted, the service defaults it to publicAccess Disabled. */
  network?: Network;
  /** The backup configuration for the cluster. */
  backup?: BackupProperties;
  /** The data encryption configuration for the cluster. When omitted during initial cluster creation, the service uses SystemManaged encryption. When supplied during initial cluster creation, type is required. For PUT updates of an existing cluster, type may be omitted; if provided, it must match the existing encryption type. The encryption type is selected at cluster creation; switching between SystemManaged and AzureKeyVault after creation is not supported. */
  dataEncryption?: HorizonDbClusterDataEncryption;
  /** Specifies whether AI Model Management is enabled for the cluster. */
  aiModelManagement?: AiModelManagementStatus;
  /** Current state of the cluster. */
  readonly state: ClusterState;
  /** The provisioning state of the cluster. */
  readonly provisioningState: ProvisioningState;
  /** The pool currently designated to host the cluster's read-write node. */
  readonly readWritePool: ReadWritePoolProperties;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    postgreSqlVersion: item["postgreSqlVersion"],
    creationMode: item["creationMode"],
    pointInTimeUtc: !item["pointInTimeUtc"]
      ? item["pointInTimeUtc"]
      : item["pointInTimeUtc"].toISOString(),
    creationSourceClusterResourceId: item["creationSourceClusterResourceId"],
    creationSourceClusterLocation: item["creationSourceClusterLocation"],
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    backup: !item["backup"] ? item["backup"] : backupPropertiesSerializer(item["backup"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : horizonDbClusterDataEncryptionSerializer(item["dataEncryption"]),
    aiModelManagement: item["aiModelManagement"],
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    postgreSqlVersion: item["postgreSqlVersion"],
    creationMode: item["creationMode"],
    pointInTimeUtc: !item["pointInTimeUtc"]
      ? item["pointInTimeUtc"]
      : new Date(item["pointInTimeUtc"]),
    creationSourceClusterResourceId: item["creationSourceClusterResourceId"],
    creationSourceClusterLocation: item["creationSourceClusterLocation"],
    network: !item["network"] ? item["network"] : networkDeserializer(item["network"]),
    backup: !item["backup"] ? item["backup"] : backupPropertiesDeserializer(item["backup"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : horizonDbClusterDataEncryptionDeserializer(item["dataEncryption"]),
    aiModelManagement: item["aiModelManagement"],
    state: item["state"],
    provisioningState: item["provisioningState"],
    readWritePool: readWritePoolPropertiesDeserializer(item["readWritePool"]),
  };
}

/** A PostgreSQL major version supported by HorizonDB. API version 2026-10-01-preview accepts 17 and 18. Future API versions may add named values, and clients must tolerate unknown values returned by the service. */
export enum KnownPostgreSqlVersion {
  /** PostgreSQL major version 17. */
  V17 = "17",
  /** PostgreSQL major version 18. */
  V18 = "18",
}

/**
 * A PostgreSQL major version supported by HorizonDB. API version 2026-10-01-preview accepts 17 and 18. Future API versions may add named values, and clients must tolerate unknown values returned by the service. \
 * {@link KnownPostgreSqlVersion} can be used interchangeably with PostgreSqlVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **17**: PostgreSQL major version 17. \
 * **18**: PostgreSQL major version 18.
 */
export type PostgreSqlVersion = string;

/** Controls how a HorizonDB cluster PUT request is processed. */
export enum KnownClusterCreateMode {
  /** Process the request as a normal cluster creation. */
  Create = "Create",
  /** Create the cluster from a point-in-time restore. */
  PointInTimeRestore = "PointInTimeRestore",
}

/**
 * Controls how a HorizonDB cluster PUT request is processed. \
 * {@link KnownClusterCreateMode} can be used interchangeably with ClusterCreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Create**: Process the request as a normal cluster creation. \
 * **PointInTimeRestore**: Create the cluster from a point-in-time restore.
 */
export type ClusterCreateMode = string;

/** Network properties. */
export interface Network {
  /** Specifies whether public access is enabled for the cluster. The service defaults to Disabled when this property is omitted. */
  publicAccess?: PublicNetworkAccessState;
}

export function networkSerializer(item: Network): any {
  return { publicAccess: item["publicAccess"] };
}

export function networkDeserializer(item: any): Network {
  return {
    publicAccess: item["publicAccess"],
  };
}

/** Indicates if public network access is enabled or not. */
export enum KnownPublicNetworkAccessState {
  /** Public network access is enabled */
  Enabled = "Enabled",
  /** Public network access is disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if public network access is enabled or not. \
 * {@link KnownPublicNetworkAccessState} can be used interchangeably with PublicNetworkAccessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Public network access is enabled \
 * **Disabled**: Public network access is disabled
 */
export type PublicNetworkAccessState = string;

/** Backup configuration properties for a HorizonDB cluster. */
export interface BackupProperties {
  /** The geo-redundancy state. Geo-redundant backup is not supported when dataEncryption.type is AzureKeyVault. */
  geoRedundancy: GeoRedundancyState;
  /** The number of days that automatic backups are retained. The service defaults to 7 days when this property is omitted. */
  retentionDays?: number;
  /** The earliest point in time, in UTC, to which the cluster can currently be restored. */
  readonly earliestRestorePointUtc?: Date;
}

export function backupPropertiesSerializer(item: BackupProperties): any {
  return { geoRedundancy: item["geoRedundancy"], retentionDays: item["retentionDays"] };
}

export function backupPropertiesDeserializer(item: any): BackupProperties {
  return {
    geoRedundancy: item["geoRedundancy"],
    retentionDays: item["retentionDays"],
    earliestRestorePointUtc: !item["earliestRestorePointUtc"]
      ? item["earliestRestorePointUtc"]
      : new Date(item["earliestRestorePointUtc"]),
  };
}

/** Indicates the geo-redundancy state. */
export enum KnownGeoRedundancyState {
  /** Geo-redundancy is enabled. This value is not supported when dataEncryption.type is AzureKeyVault. */
  Enabled = "Enabled",
  /** Geo-redundancy is disabled */
  Disabled = "Disabled",
}

/**
 * Indicates the geo-redundancy state. \
 * {@link KnownGeoRedundancyState} can be used interchangeably with GeoRedundancyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Geo-redundancy is enabled. This value is not supported when dataEncryption.type is AzureKeyVault. \
 * **Disabled**: Geo-redundancy is disabled
 */
export type GeoRedundancyState = string;

/** The Cluster-level data encryption configuration. The encryption type is selected at cluster creation; switching between SystemManaged and AzureKeyVault after creation is not supported. For AzureKeyVault encryption, primaryKeyUri and primaryUserAssignedIdentityId are required, and backup.geoRedundancy must be Disabled. Both primaryKeyUri and primaryUserAssignedIdentityId can be provided during initial cluster creation. For updates to an existing cluster through PUT or PATCH, only one of these properties can change per request, and that update must complete before submitting a separate update to change the other property. Customer-managed key identities must also be assigned to the Cluster through its top-level identity property. Only versionless Azure Key Vault key URIs are supported; key version paths are rejected. For SystemManaged encryption, key and identity properties must be omitted. */
export interface HorizonDbClusterDataEncryption {
  /** The type of data encryption used by the cluster. When the data encryption configuration is supplied during initial cluster creation, this property is required. For PUT updates of an existing cluster, this property may be omitted; if provided, it must match the existing encryption type. This value is selected at cluster creation and cannot later be changed from SystemManaged to AzureKeyVault or from AzureKeyVault to SystemManaged. */
  type?: HorizonDbClusterDataEncryptionType;
  /** The versionless Azure Key Vault key URI used to encrypt the cluster's primary storage. Key version paths are not supported. During initial cluster creation, this property can be provided together with primaryUserAssignedIdentityId. For updates to an existing cluster through PUT or PATCH, this property and primaryUserAssignedIdentityId cannot both change in the same request; the first update must complete before submitting a separate update for the other property. */
  primaryKeyUri?: string;
  /** The Azure resource ID of the user-assigned managed identity used to access the primary encryption key. The identity must also be assigned to the Cluster through its top-level identity property. During initial cluster creation, this property can be provided together with primaryKeyUri. For updates to an existing cluster through PUT or PATCH, this property and primaryKeyUri cannot both change in the same request; the first update must complete before submitting a separate update for the other property. */
  primaryUserAssignedIdentityId?: string;
  /** The validation status of the primary encryption key. This property is returned for AzureKeyVault encryption and is absent for SystemManaged encryption. */
  readonly primaryEncryptionKeyStatus?: HorizonDbClusterEncryptionKeyStatus;
  /** The current version of the primary encryption key used by the cluster. This property is returned for AzureKeyVault encryption and is absent for SystemManaged encryption. */
  readonly primaryEncryptionKeyCurrentVersion?: string;
}

export function horizonDbClusterDataEncryptionSerializer(
  item: HorizonDbClusterDataEncryption,
): any {
  return {
    type: item["type"],
    primaryKeyUri: item["primaryKeyUri"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
  };
}

export function horizonDbClusterDataEncryptionDeserializer(
  item: any,
): HorizonDbClusterDataEncryption {
  return {
    type: item["type"],
    primaryKeyUri: item["primaryKeyUri"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    primaryEncryptionKeyStatus: item["primaryEncryptionKeyStatus"],
    primaryEncryptionKeyCurrentVersion: item["primaryEncryptionKeyCurrentVersion"],
  };
}

/** The type of data encryption used by a HorizonDB cluster. The type is selected at cluster creation; switching between SystemManaged and AzureKeyVault after creation is not supported. */
export enum KnownHorizonDbClusterDataEncryptionType {
  /** Data encryption is managed by Azure using platform-managed keys. */
  SystemManaged = "SystemManaged",
  /** Data encryption uses customer-managed keys stored in Azure Key Vault. */
  AzureKeyVault = "AzureKeyVault",
}

/**
 * The type of data encryption used by a HorizonDB cluster. The type is selected at cluster creation; switching between SystemManaged and AzureKeyVault after creation is not supported. \
 * {@link KnownHorizonDbClusterDataEncryptionType} can be used interchangeably with HorizonDbClusterDataEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemManaged**: Data encryption is managed by Azure using platform-managed keys. \
 * **AzureKeyVault**: Data encryption uses customer-managed keys stored in Azure Key Vault.
 */
export type HorizonDbClusterDataEncryptionType = string;

/** The validation status of a customer-managed encryption key used by a HorizonDB cluster. */
export enum KnownHorizonDbClusterEncryptionKeyStatus {
  /** The encryption key is valid and accessible to the configured user-assigned managed identity. */
  Valid = "Valid",
  /** The encryption key is invalid or inaccessible to the configured user-assigned managed identity. */
  Invalid = "Invalid",
}

/**
 * The validation status of a customer-managed encryption key used by a HorizonDB cluster. \
 * {@link KnownHorizonDbClusterEncryptionKeyStatus} can be used interchangeably with HorizonDbClusterEncryptionKeyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: The encryption key is valid and accessible to the configured user-assigned managed identity. \
 * **Invalid**: The encryption key is invalid or inaccessible to the configured user-assigned managed identity.
 */
export type HorizonDbClusterEncryptionKeyStatus = string;

/** The AI Model Management status for a HorizonDB cluster. */
export enum KnownAiModelManagementStatus {
  /** AI Model Management is enabled. */
  Enabled = "Enabled",
  /** AI Model Management is disabled. */
  Disabled = "Disabled",
}

/**
 * The AI Model Management status for a HorizonDB cluster. \
 * {@link KnownAiModelManagementStatus} can be used interchangeably with AiModelManagementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: AI Model Management is enabled. \
 * **Disabled**: AI Model Management is disabled.
 */
export type AiModelManagementStatus = string;

/** Current state of a HorizonDB cluster. */
export enum KnownClusterState {
  /** Is ready and operational */
  Ready = "Ready",
  /** Is provisioning */
  Provisioning = "Provisioning",
  /** Is being deleted */
  Deleting = "Deleting",
  /** Is inaccessible */
  Inaccessible = "Inaccessible",
  /** Is being updated */
  Updating = "Updating",
}

/**
 * Current state of a HorizonDB cluster. \
 * {@link KnownClusterState} can be used interchangeably with ClusterState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Is ready and operational \
 * **Provisioning**: Is provisioning \
 * **Deleting**: Is being deleted \
 * **Inaccessible**: Is inaccessible \
 * **Updating**: Is being updated
 */
export type ClusterState = string;

/** The pool currently designated to host a HorizonDB cluster's read-write node. When a pool is created while the cluster currently has no pools, the service automatically designates the new pool as the read-write pool. This behavior also applies after all pools that existed earlier in the cluster's lifetime have been deleted. */
export interface ReadWritePoolProperties {
  /** The Azure resource ID of the pool designated to host the cluster's read-write node. The pool is a child resource of this cluster. When a pool is created while the cluster currently has no pools, the service automatically sets this property to the new pool's resource ID, including when all pools that existed earlier in the cluster's lifetime were deleted. This property is absent when no pool is designated, such as after clearReadWritePool succeeds. */
  readonly designatedPoolResourceId?: string;
}

export function readWritePoolPropertiesDeserializer(item: any): ReadWritePoolProperties {
  return {
    designatedPoolResourceId: item["designatedPoolResourceId"],
  };
}

/** The user-assigned managed identities assigned to a HorizonDB cluster. Omitting the entire top-level identity property from PUT or PATCH preserves all current assignments. When userAssignedIdentities is supplied, PUT replaces the complete set and PATCH merges the supplied entries with the existing set; a null PATCH entry removes that individual identity. Setting type to None clears all assignments. Removing an identity referenced by a change data capture identity assignment is rejected until the referencing assignment is deleted. */
export interface HorizonDbClusterManagedServiceIdentity {
  /** The managed identity type assigned to the cluster. Setting this property to None clears all managed identity assignments. */
  type: HorizonDbClusterIdentityType;
  /** The user-assigned managed identities associated with the cluster. When supplied on PUT, this dictionary replaces the complete set of assignments. When supplied on PATCH, entries are merged with the existing set and a null value removes the corresponding identity. Each dictionary key must be the full Azure resource ID of a Microsoft.ManagedIdentity/userAssignedIdentities resource. Non-null request values can be empty objects; response values contain the service-populated clientId and principalId. Assigning an identity does not grant it access to destination resources; required role assignments must be configured separately. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function horizonDbClusterManagedServiceIdentitySerializer(
  item: HorizonDbClusterManagedServiceIdentity,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function horizonDbClusterManagedServiceIdentityDeserializer(
  item: any,
): HorizonDbClusterManagedServiceIdentity {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** The managed identity types supported by a HorizonDB cluster. */
export enum KnownHorizonDbClusterIdentityType {
  /** No managed identity is assigned. Setting type to None clears all managed identity assignments. */
  None = "None",
  /** User-assigned managed identities are assigned. */
  UserAssigned = "UserAssigned",
}

/**
 * The managed identity types supported by a HorizonDB cluster. \
 * {@link KnownHorizonDbClusterIdentityType} can be used interchangeably with HorizonDbClusterIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity is assigned. Setting type to None clears all managed identity assignments. \
 * **UserAssigned**: User-assigned managed identities are assigned.
 */
export type HorizonDbClusterIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
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

/** HorizonDB cluster for update operations. */
export interface ClusterForPatchUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. Omitting the entire identity property from PUT or PATCH preserves all current assignments. When provided, PUT replaces the user-assigned identity set and PATCH merges it; null PATCH dictionary entries remove individual identities. Setting type to None clears all assignments. */
  identity?: HorizonDbClusterManagedServiceIdentity;
  /** The properties that can be updated for a HorizonDB cluster. */
  properties?: ClusterPropertiesForPatchUpdate;
}

export function clusterForPatchUpdateSerializer(item: ClusterForPatchUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : horizonDbClusterManagedServiceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDB cluster for update operations. */
export interface ClusterPropertiesForPatchUpdate {
  /** The network configuration to update for the cluster. */
  network?: NetworkForPatchUpdate;
  /** The backup configuration for the cluster. */
  backup?: BackupPropertiesForPatchUpdate;
  /** The data encryption configuration to update for the cluster. Omitted properties preserve their current values. Updates can modify settings within the existing encryption type, but switching between SystemManaged and AzureKeyVault after cluster creation is not supported. */
  dataEncryption?: HorizonDbClusterDataEncryptionForPatchUpdate;
  /** Specifies whether AI Model Management is enabled for the cluster. */
  aiModelManagement?: AiModelManagementStatus;
}

export function clusterPropertiesForPatchUpdateSerializer(
  item: ClusterPropertiesForPatchUpdate,
): any {
  return {
    network: !item["network"] ? item["network"] : networkForPatchUpdateSerializer(item["network"]),
    backup: !item["backup"]
      ? item["backup"]
      : backupPropertiesForPatchUpdateSerializer(item["backup"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : horizonDbClusterDataEncryptionForPatchUpdateSerializer(item["dataEncryption"]),
    aiModelManagement: item["aiModelManagement"],
  };
}

/** Network properties for updating a HorizonDB cluster. */
export interface NetworkForPatchUpdate {
  /** Specifies whether public access is enabled for the cluster. Omission preserves the current value. */
  publicAccess?: PublicNetworkAccessState;
}

export function networkForPatchUpdateSerializer(item: NetworkForPatchUpdate): any {
  return { publicAccess: item["publicAccess"] };
}

/** Backup configuration properties for updating a HorizonDB cluster. */
export interface BackupPropertiesForPatchUpdate {
  /** The number of days that automatic backups are retained. */
  retentionDays?: number;
}

export function backupPropertiesForPatchUpdateSerializer(
  item: BackupPropertiesForPatchUpdate,
): any {
  return { retentionDays: item["retentionDays"] };
}

/** Properties for sparsely updating Cluster-level data encryption. Omitted properties preserve their current values. Updates can modify settings within the existing encryption type, such as the primary Azure Key Vault key URI, but switching between SystemManaged and AzureKeyVault after cluster creation is not supported. AzureKeyVault encryption is not supported when backup.geoRedundancy is Enabled. An update can change only one of primaryKeyUri or primaryUserAssignedIdentityId; that update must complete before submitting a separate update to change the other property. */
export interface HorizonDbClusterDataEncryptionForPatchUpdate {
  /** The existing data encryption type used by the cluster. PATCH is a sparse update, so this property may be omitted. If provided, it must match the existing encryption type. This value cannot be changed from SystemManaged to AzureKeyVault or from AzureKeyVault to SystemManaged after cluster creation. */
  type?: HorizonDbClusterDataEncryptionType;
  /** The versionless Azure Key Vault key URI used to encrypt the cluster's primary storage. Key version paths are not supported. This property and primaryUserAssignedIdentityId cannot both change in the same update; the first update must complete before submitting a separate update for the other property. */
  primaryKeyUri?: string;
  /** The Azure resource ID of the user-assigned managed identity used to access the primary encryption key. The identity must also be assigned to the Cluster through its top-level identity property. This property and primaryKeyUri cannot both change in the same update; the first update must complete before submitting a separate update for the other property. */
  primaryUserAssignedIdentityId?: string;
}

export function horizonDbClusterDataEncryptionForPatchUpdateSerializer(
  item: HorizonDbClusterDataEncryptionForPatchUpdate,
): any {
  return {
    type: item["type"],
    primaryKeyUri: item["primaryKeyUri"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
  };
}

/** The response of a Cluster list operation. */
export interface _ClusterListResult {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListResultDeserializer(item: any): _ClusterListResult {
  return {
    value: clusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterArraySerializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterSerializer(item);
  });
}

export function clusterArrayDeserializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterDeserializer(item);
  });
}

/** Represents the HorizonDB pool. */
export interface Pool extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PoolProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function poolSerializer(item: Pool): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : poolPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function poolDeserializer(item: any): Pool {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : poolPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of a HorizonDB pool. */
export interface PoolProperties {
  /** Current state of the pool. */
  readonly state?: PoolState;
  /** The required compute model for the HorizonDB pool. */
  computeModel: PoolComputeModel;
  /** The required number of nodes to allocate and assign to the pool. Allowed values are 1 through 16. To deallocate runtime compute without changing the configured node count, stop the pool. */
  nodeCount: number;
  /** The required high-availability configuration for the pool. mode must be Disabled when nodeCount is 1, and must be AnyZone or ZoneRedundant when nodeCount is 2 through 16. */
  highAvailability: PoolHighAvailability;
  /** The required parameter group associated with the pool. When creating a new pool in this API version, the caller must supply the corresponding default parameter group; customer-created parameter groups are not accepted during creation. For an existing pool, PUT or PATCH can associate either the corresponding default parameter group or a customer-created parameter group. The create-visible shape intentionally supports both resource ID forms so a future API version can allow customer-created parameter groups during creation without a breaking schema change. */
  parameterGroup: PoolParameterGroupReference;
  /** The scheduled maintenance configuration for the pool. The properties available depend on the selected maintenance management type. */
  scheduledMaintenance?: ScheduledMaintenancePropertiesUnion;
  /** The provisioning state of the pool. */
  readonly provisioningState?: ProvisioningState;
}

export function poolPropertiesSerializer(item: PoolProperties): any {
  return {
    computeModel: poolComputeModelSerializer(item["computeModel"]),
    nodeCount: item["nodeCount"],
    highAvailability: poolHighAvailabilitySerializer(item["highAvailability"]),
    parameterGroup: poolParameterGroupReferenceSerializer(item["parameterGroup"]),
    scheduledMaintenance: !item["scheduledMaintenance"]
      ? item["scheduledMaintenance"]
      : scheduledMaintenancePropertiesUnionSerializer(item["scheduledMaintenance"]),
  };
}

export function poolPropertiesDeserializer(item: any): PoolProperties {
  return {
    state: item["state"],
    computeModel: poolComputeModelDeserializer(item["computeModel"]),
    nodeCount: item["nodeCount"],
    highAvailability: poolHighAvailabilityDeserializer(item["highAvailability"]),
    parameterGroup: poolParameterGroupReferenceDeserializer(item["parameterGroup"]),
    scheduledMaintenance: !item["scheduledMaintenance"]
      ? item["scheduledMaintenance"]
      : scheduledMaintenancePropertiesUnionDeserializer(item["scheduledMaintenance"]),
    provisioningState: item["provisioningState"],
  };
}

/** Current state of a HorizonDB pool. */
export enum KnownPoolState {
  /** Is ready and operational */
  Ready = "Ready",
  /** Is provisioning */
  Provisioning = "Provisioning",
  /** Is being deleted */
  Deleting = "Deleting",
  /** Is inaccessible */
  Inaccessible = "Inaccessible",
  /** Is being updated */
  Updating = "Updating",
  /** Is starting up */
  Starting = "Starting",
  /** Is restarting */
  Restarting = "Restarting",
  /** Is stopping */
  Stopping = "Stopping",
  /** Is stopped */
  Stopped = "Stopped",
}

/**
 * Current state of a HorizonDB pool. \
 * {@link KnownPoolState} can be used interchangeably with PoolState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Is ready and operational \
 * **Provisioning**: Is provisioning \
 * **Deleting**: Is being deleted \
 * **Inaccessible**: Is inaccessible \
 * **Updating**: Is being updated \
 * **Starting**: Is starting up \
 * **Restarting**: Is restarting \
 * **Stopping**: Is stopping \
 * **Stopped**: Is stopped
 */
export type PoolState = string;

/** The compute model for a HorizonDB pool. */
export interface PoolComputeModel {
  /** The type of compute model. */
  type: PoolComputeModelType;
  /** The processor type for the compute model. */
  computeProcessor: ComputeProcessorType;
  /** The compute generation for the compute model. */
  computeGeneration: number;
  /** The number of vCores. Allowed values are 1 through 192. */
  vCores: number;
}

export function poolComputeModelSerializer(item: PoolComputeModel): any {
  return {
    type: item["type"],
    computeProcessor: item["computeProcessor"],
    computeGeneration: item["computeGeneration"],
    vCores: item["vCores"],
  };
}

export function poolComputeModelDeserializer(item: any): PoolComputeModel {
  return {
    type: item["type"],
    computeProcessor: item["computeProcessor"],
    computeGeneration: item["computeGeneration"],
    vCores: item["vCores"],
  };
}

/** The high-availability configuration for a HorizonDB pool. */
export interface PoolHighAvailability {
  /** The high-availability mode. Disabled is required when nodeCount is 1. AnyZone or ZoneRedundant is required when nodeCount is 2 through 16. */
  mode: PoolHighAvailabilityMode;
}

export function poolHighAvailabilitySerializer(item: PoolHighAvailability): any {
  return { mode: item["mode"] };
}

export function poolHighAvailabilityDeserializer(item: any): PoolHighAvailability {
  return {
    mode: item["mode"],
  };
}

/** The high-availability mode requested for a HorizonDB pool. */
export enum KnownPoolHighAvailabilityMode {
  /** High availability is disabled. This mode is valid only when nodeCount is 1. */
  Disabled = "Disabled",
  /** The service may allocate nodes in the same availability zone or across availability zones. This mode is valid only when nodeCount is 2 through 16. */
  AnyZone = "AnyZone",
  /** The service must allocate nodes across availability zones. This mode is valid only when nodeCount is 2 through 16. */
  ZoneRedundant = "ZoneRedundant",
}

/**
 * The high-availability mode requested for a HorizonDB pool. \
 * {@link KnownPoolHighAvailabilityMode} can be used interchangeably with PoolHighAvailabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: High availability is disabled. This mode is valid only when nodeCount is 1. \
 * **AnyZone**: The service may allocate nodes in the same availability zone or across availability zones. This mode is valid only when nodeCount is 2 through 16. \
 * **ZoneRedundant**: The service must allocate nodes across availability zones. This mode is valid only when nodeCount is 2 through 16.
 */
export type PoolHighAvailabilityMode = string;

/** A reference to the parameter group associated with a HorizonDB pool. The schema represents both default and customer-created parameter groups for create and update compatibility. In this API version, initial pool creation accepts only the corresponding default parameter group; PUT updates to an existing pool can associate either group type. */
export interface PoolParameterGroupReference {
  /** The Azure resource ID of the associated parameter group. Initial pool creation in this API version requires the corresponding Microsoft.HorizonDb/locations/parameterGroups resource. For an existing pool, PUT can specify either the corresponding default group or a customer-created Microsoft.HorizonDb/parameterGroups resource. */
  parameterGroupResourceId: string;
  /** Determines when dynamic parameter changes from the associated parameter group become effective. Static parameter changes always require a customer-initiated pool Restart, regardless of this value. Stop followed by Start and scheduled maintenance do not apply pending parameter changes. */
  applyMethod: ParameterApplyMethod;
  /** The synchronization status between the pool and its parameter group. PendingReboot changes remain pending across Stop, Start, and scheduled maintenance and become effective only after a customer-initiated Restart. */
  readonly syncStatus?: ParameterGroupSyncStatus;
}

export function poolParameterGroupReferenceSerializer(item: PoolParameterGroupReference): any {
  return {
    parameterGroupResourceId: item["parameterGroupResourceId"],
    applyMethod: item["applyMethod"],
  };
}

export function poolParameterGroupReferenceDeserializer(item: any): PoolParameterGroupReference {
  return {
    parameterGroupResourceId: item["parameterGroupResourceId"],
    applyMethod: item["applyMethod"],
    syncStatus: item["syncStatus"],
  };
}

/** Controls when dynamic parameter changes become effective. Static parameter changes always become effective only after a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply pending parameter changes. */
export enum KnownParameterApplyMethod {
  /** Apply dynamic parameter changes immediately. Static parameter changes remain pending until a customer-initiated pool Restart. */
  Immediate = "Immediate",
  /** Keep dynamic and static parameter changes pending until a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply them. */
  PendingReboot = "PendingReboot",
}

/**
 * Controls when dynamic parameter changes become effective. Static parameter changes always become effective only after a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply pending parameter changes. \
 * {@link KnownParameterApplyMethod} can be used interchangeably with ParameterApplyMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Immediate**: Apply dynamic parameter changes immediately. Static parameter changes remain pending until a customer-initiated pool Restart. \
 * **PendingReboot**: Keep dynamic and static parameter changes pending until a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply them.
 */
export type ParameterApplyMethod = string;

/** Indicates synchronization status between a HorizonDB resource and its parameter group. */
export enum KnownParameterGroupSyncStatus {
  /** Parameter updates are currently being applied. */
  Applying = "Applying",
  /** Parameter values are synchronized and up to date. */
  InSync = "InSync",
  /** Applying parameter updates failed. */
  FailedToApply = "FailedToApply",
  /** Parameter updates are pending and require a customer-initiated pool Restart to take effect. Stop followed by Start and scheduled maintenance preserve this status. */
  PendingReboot = "PendingReboot",
}

/**
 * Indicates synchronization status between a HorizonDB resource and its parameter group. \
 * {@link KnownParameterGroupSyncStatus} can be used interchangeably with ParameterGroupSyncStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Applying**: Parameter updates are currently being applied. \
 * **InSync**: Parameter values are synchronized and up to date. \
 * **FailedToApply**: Applying parameter updates failed. \
 * **PendingReboot**: Parameter updates are pending and require a customer-initiated pool Restart to take effect. Stop followed by Start and scheduled maintenance preserve this status.
 */
export type ParameterGroupSyncStatus = string;

/** The scheduled maintenance configuration for a HorizonDB pool. */
export interface ScheduledMaintenanceProperties {
  /** Specifies whether scheduled maintenance is managed by the system or by the user. */
  /** The discriminator possible values: System */
  maintenanceManagementType: ScheduledMaintenanceManagementType;
}

export function scheduledMaintenancePropertiesSerializer(
  item: ScheduledMaintenanceProperties,
): any {
  return { maintenanceManagementType: item["maintenanceManagementType"] };
}

export function scheduledMaintenancePropertiesDeserializer(
  item: any,
): ScheduledMaintenanceProperties {
  return {
    maintenanceManagementType: item["maintenanceManagementType"],
  };
}

/** Alias for ScheduledMaintenancePropertiesUnion */
export type ScheduledMaintenancePropertiesUnion =
  SystemScheduledMaintenanceProperties | ScheduledMaintenanceProperties;

export function scheduledMaintenancePropertiesUnionSerializer(
  item: ScheduledMaintenancePropertiesUnion,
): any {
  switch (item.maintenanceManagementType) {
    case "System":
      return systemScheduledMaintenancePropertiesSerializer(
        item as SystemScheduledMaintenanceProperties,
      );

    default:
      return scheduledMaintenancePropertiesSerializer(item);
  }
}

export function scheduledMaintenancePropertiesUnionDeserializer(
  item: any,
): ScheduledMaintenancePropertiesUnion {
  switch (item["maintenanceManagementType"]) {
    case "System":
      return systemScheduledMaintenancePropertiesDeserializer(
        item as SystemScheduledMaintenanceProperties,
      );

    default:
      return scheduledMaintenancePropertiesDeserializer(item);
  }
}

/** Specifies who manages scheduled maintenance for a HorizonDB pool. */
export enum KnownScheduledMaintenanceManagementType {
  /** Scheduled maintenance is managed by the system. */
  System = "System",
}

/**
 * Specifies who manages scheduled maintenance for a HorizonDB pool. \
 * {@link KnownScheduledMaintenanceManagementType} can be used interchangeably with ScheduledMaintenanceManagementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **System**: Scheduled maintenance is managed by the system.
 */
export type ScheduledMaintenanceManagementType = string;

/** The system-managed scheduled maintenance configuration for a HorizonDB pool. User-managed schedule properties must be absent. */
export interface SystemScheduledMaintenanceProperties extends ScheduledMaintenanceProperties {
  /** Specifies that scheduled maintenance is managed by the system. */
  maintenanceManagementType: "System";
}

export function systemScheduledMaintenancePropertiesSerializer(
  item: SystemScheduledMaintenanceProperties,
): any {
  return { maintenanceManagementType: item["maintenanceManagementType"] };
}

export function systemScheduledMaintenancePropertiesDeserializer(
  item: any,
): SystemScheduledMaintenanceProperties {
  return {
    maintenanceManagementType: item["maintenanceManagementType"],
  };
}

/** HorizonDB pool for update operations. */
export interface PoolForPatchUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The properties that can be updated for a HorizonDB pool. */
  properties?: PoolPropertiesForPatchUpdate;
}

export function poolForPatchUpdateSerializer(item: PoolForPatchUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : poolPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDB pool for update operations. */
export interface PoolPropertiesForPatchUpdate {
  /** The compute model properties to update. Omitted properties preserve their current values. To change the compute model type, supply the complete target compute model, including type, computeProcessor, computeGeneration, and all properties required by the target type. */
  computeModel?: PoolComputeModelForPatchUpdate;
  /** The number of nodes to allocate and assign to the pool. Allowed values are 1 through 16. Omission preserves the current configured value. To deallocate runtime compute without changing the configured node count, stop the pool. */
  nodeCount?: number;
  /** The high-availability configuration to update. Omission preserves the current mode. The service recursively merges omitted PATCH properties with the existing resource before validating the effective nodeCount and mode together. */
  highAvailability?: PoolHighAvailabilityPatch;
  /** The corresponding default or a customer-created parameter group to associate with the existing pool. Customers can switch in either direction between these group types. Omission preserves the current association. */
  parameterGroup?: PoolParameterGroupReferenceForPatchUpdate;
  /** The scheduled maintenance configuration to update for the pool. When supplied, the complete configuration for the selected maintenance management type is required. Omission preserves the current configuration. */
  scheduledMaintenance?: ScheduledMaintenancePropertiesForPatchUpdate;
}

export function poolPropertiesForPatchUpdateSerializer(item: PoolPropertiesForPatchUpdate): any {
  return {
    computeModel: !item["computeModel"]
      ? item["computeModel"]
      : poolComputeModelForPatchUpdateSerializer(item["computeModel"]),
    nodeCount: item["nodeCount"],
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : poolHighAvailabilityPatchSerializer(item["highAvailability"]),
    parameterGroup: !item["parameterGroup"]
      ? item["parameterGroup"]
      : poolParameterGroupReferenceForPatchUpdateSerializer(item["parameterGroup"]),
    scheduledMaintenance: !item["scheduledMaintenance"]
      ? item["scheduledMaintenance"]
      : scheduledMaintenancePropertiesForPatchUpdateSerializer(item["scheduledMaintenance"]),
  };
}

/** The compute model properties of a HorizonDB pool that can be updated. The object is recursively mergeable: omitted properties preserve their current values. Properties that do not apply to the current or target compute model type are rejected. When type changes, the request must include the complete target compute model. Subtype-specific constraints are validated against the effective merged configuration; invalid requests are rejected without changing the resource. */
export interface PoolComputeModelForPatchUpdate {
  /** The compute model type. Omit this property to retain the current type. Resubmitting the current type succeeds as an idempotent no-op. To change the type, supply all common properties and all properties required by the target type. */
  type?: PoolComputeModelType;
  /** The processor type for the compute model. Omission preserves the current processor type. */
  computeProcessor?: ComputeProcessorType;
  /** The compute generation for the compute model. Omission preserves the current compute generation. */
  computeGeneration?: number;
  /** The number of provisioned vCores. Allowed values are 1 through 192. This property applies only to a Provisioned compute model. Omission preserves the current value. */
  vCores?: number;
}

export function poolComputeModelForPatchUpdateSerializer(
  item: PoolComputeModelForPatchUpdate,
): any {
  return {
    type: item["type"],
    computeProcessor: item["computeProcessor"],
    computeGeneration: item["computeGeneration"],
    vCores: item["vCores"],
  };
}

/** The high-availability configuration for a HorizonDB pool update. */
export interface PoolHighAvailabilityPatch {
  /** The high-availability mode. Omission preserves the current mode before the service validates it with the effective nodeCount. */
  mode?: PoolHighAvailabilityMode;
}

export function poolHighAvailabilityPatchSerializer(item: PoolHighAvailabilityPatch): any {
  return { mode: item["mode"] };
}

/** A parameter group reference for updating an existing HorizonDB pool. The pool can switch in either direction between its corresponding default parameter group and a customer-created parameter group. */
export interface PoolParameterGroupReferenceForPatchUpdate {
  /** The Azure resource ID of the corresponding default or customer-created parameter group to associate with the existing pool. */
  parameterGroupResourceId?: string;
  /** Determines when dynamic parameter changes from the associated parameter group become effective. Static parameter changes always require a customer-initiated pool Restart, regardless of this value. Stop followed by Start and scheduled maintenance do not apply pending parameter changes. */
  applyMethod?: ParameterApplyMethod;
}

export function poolParameterGroupReferenceForPatchUpdateSerializer(
  item: PoolParameterGroupReferenceForPatchUpdate,
): any {
  return {
    parameterGroupResourceId: item["parameterGroupResourceId"],
    applyMethod: item["applyMethod"],
  };
}

/** The scheduled maintenance configuration for a pool update operation. */
export interface ScheduledMaintenancePropertiesForPatchUpdate {
  /** Specifies whether scheduled maintenance is managed by the system or by the user. When scheduledMaintenance is supplied, this property is required by the service. */
  maintenanceManagementType?: ScheduledMaintenanceManagementType;
}

export function scheduledMaintenancePropertiesForPatchUpdateSerializer(
  item: ScheduledMaintenancePropertiesForPatchUpdate,
): any {
  return { maintenanceManagementType: item["maintenanceManagementType"] };
}

/** The response of a Pool list operation. */
export interface _PoolListResult {
  /** The Pool items on this page */
  value: Pool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _poolListResultDeserializer(item: any): _PoolListResult {
  return {
    value: poolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function poolArraySerializer(result: Array<Pool>): any[] {
  return result.map((item) => {
    return poolSerializer(item);
  });
}

export function poolArrayDeserializer(result: Array<Pool>): any[] {
  return result.map((item) => {
    return poolDeserializer(item);
  });
}

/** Represents a customer-managed firewall rule for a HorizonDB pool. */
export interface FirewallRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRuleProperties;
}

export function firewallRuleSerializer(item: FirewallRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : firewallRulePropertiesSerializer(item["properties"]),
  };
}

export function firewallRuleDeserializer(item: any): FirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : firewallRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a HorizonDB firewall rule. */
export interface FirewallRuleProperties {
  /** The start IPv4 address of the firewall rule in dotted-decimal notation. */
  startIpAddress: string;
  /** The end IPv4 address of the firewall rule in dotted-decimal notation. This address must be numerically greater than or equal to startIpAddress. */
  endIpAddress: string;
  /** The description of the HorizonDB firewall rule. The maximum length is 1024 characters. */
  description?: string;
  /** The provisioning state of the firewall rule. */
  readonly provisioningState?: ProvisioningState;
}

export function firewallRulePropertiesSerializer(item: FirewallRuleProperties): any {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
    description: item["description"],
  };
}

export function firewallRulePropertiesDeserializer(item: any): FirewallRuleProperties {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
    description: item["description"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a FirewallRule list operation. */
export interface _FirewallRuleListResult {
  /** The FirewallRule items on this page */
  value: FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallRuleListResultDeserializer(item: any): _FirewallRuleListResult {
  return {
    value: firewallRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function firewallRuleArraySerializer(result: Array<FirewallRule>): any[] {
  return result.map((item) => {
    return firewallRuleSerializer(item);
  });
}

export function firewallRuleArrayDeserializer(result: Array<FirewallRule>): any[] {
  return result.map((item) => {
    return firewallRuleDeserializer(item);
  });
}

/** A private endpoint connection resource */
export interface PrivateEndpointConnectionResource extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionResourceSerializer(
  item: PrivateEndpointConnectionResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionResourceDeserializer(
  item: any,
): PrivateEndpointConnectionResource {
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

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
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

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
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

/** The response of a PrivateEndpointConnectionResource list operation. */
export interface _PrivateEndpointConnectionResourceListResult {
  /** The PrivateEndpointConnectionResource items on this page */
  value: PrivateEndpointConnectionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionResourceListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionResourceListResult {
  return {
    value: privateEndpointConnectionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionResourceArraySerializer(
  result: Array<PrivateEndpointConnectionResource>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionResourceSerializer(item);
  });
}

export function privateEndpointConnectionResourceArrayDeserializer(
  result: Array<PrivateEndpointConnectionResource>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionResourceDeserializer(item);
  });
}

/** Represents the HorizonDB private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
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

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
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

/** Represents the HorizonDB parameter group. */
export interface ParameterGroup extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ParameterGroupProperties;
}

export function parameterGroupSerializer(item: ParameterGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : parameterGroupPropertiesSerializer(item["properties"]),
  };
}

export function parameterGroupDeserializer(item: any): ParameterGroup {
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
      : parameterGroupPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a HorizonDB parameter group. */
export interface ParameterGroupProperties {
  /** Parameters in the parameter group. */
  parameters?: ParameterProperties[];
  /** Description of the parameter group. The maximum length is 1024 characters. */
  description?: string;
  /** The PostgreSQL major version for the parameter group. This property is required during creation and is immutable thereafter. The service selects the unique location-scoped default parameter group for this version in the resource location. The DefaultParameterGroups APIs return at most one default parameter group for each PostgreSQL version in a location, so this selection is unambiguous. */
  postgreSqlVersion: PostgreSqlVersion;
  /** The provisioning state of the parameter group. */
  readonly provisioningState?: ProvisioningState;
}

export function parameterGroupPropertiesSerializer(item: ParameterGroupProperties): any {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesArraySerializer(item["parameters"]),
    description: item["description"],
    postgreSqlVersion: item["postgreSqlVersion"],
  };
}

export function parameterGroupPropertiesDeserializer(item: any): ParameterGroupProperties {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesArrayDeserializer(item["parameters"]),
    description: item["description"],
    postgreSqlVersion: item["postgreSqlVersion"],
    provisioningState: item["provisioningState"],
  };
}

export function parameterPropertiesArraySerializer(result: Array<ParameterProperties>): any[] {
  return result.map((item) => {
    return parameterPropertiesSerializer(item);
  });
}

export function parameterPropertiesArrayDeserializer(result: Array<ParameterProperties>): any[] {
  return result.map((item) => {
    return parameterPropertiesDeserializer(item);
  });
}

/** Properties of a HorizonDB parameter. */
export interface ParameterProperties {
  /** The name of the parameter. */
  name?: string;
  /** The description of the parameter. */
  readonly description?: string;
  /** The value of the configuration. */
  value?: string;
  /** The system-defined default value of the parameter, independent of the effective value. */
  readonly defaultValue?: string;
  /** The source of the effective parameter value. UserOverride means that the value was explicitly supplied by the user, even when it equals defaultValue. */
  readonly valueSource?: ParameterValueSource;
  /** The data type of the parameter. */
  readonly dataType?: string;
  /** The allowed values for the parameter. */
  readonly allowedValues?: string;
  /** Whether the parameter can be changed dynamically. */
  readonly isDynamic?: boolean;
  /** Whether the parameter is read-only. Read-only parameters cannot be overridden. */
  readonly isReadOnly?: boolean;
  /** Link to parameter documentation. */
  readonly documentationLink?: string;
  /** The unit of measurement for the parameter. */
  readonly unit?: string;
}

export function parameterPropertiesSerializer(item: ParameterProperties): any {
  return { name: item["name"], value: item["value"] };
}

export function parameterPropertiesDeserializer(item: any): ParameterProperties {
  return {
    name: item["name"],
    description: item["description"],
    value: item["value"],
    defaultValue: item["defaultValue"],
    valueSource: item["valueSource"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    isDynamic: item["isDynamic"],
    isReadOnly: item["isReadOnly"],
    documentationLink: item["documentationLink"],
    unit: item["unit"],
  };
}

/** The source of the effective value assigned to a HorizonDB parameter. */
export enum KnownParameterValueSource {
  /** The effective value is the system-defined default. */
  SystemDefault = "SystemDefault",
  /** The effective value was explicitly supplied by the user, even when it equals the system-defined default value. */
  UserOverride = "UserOverride",
}

/**
 * The source of the effective value assigned to a HorizonDB parameter. \
 * {@link KnownParameterValueSource} can be used interchangeably with ParameterValueSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemDefault**: The effective value is the system-defined default. \
 * **UserOverride**: The effective value was explicitly supplied by the user, even when it equals the system-defined default value.
 */
export type ParameterValueSource = string;

/** HorizonDB parameter group for update operations. */
export interface ParameterGroupForPatchUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The properties that can be updated for a HorizonDB parameter group. */
  properties?: ParameterGroupPropertiesForPatchUpdate;
}

export function parameterGroupForPatchUpdateSerializer(item: ParameterGroupForPatchUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : parameterGroupPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDB parameter group for update operations. */
export interface ParameterGroupPropertiesForPatchUpdate {
  /** Parameters in the parameter group. */
  parameters?: ParameterProperties[];
  /** Description of the parameter group. The maximum length is 1024 characters. */
  description?: string;
}

export function parameterGroupPropertiesForPatchUpdateSerializer(
  item: ParameterGroupPropertiesForPatchUpdate,
): any {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesArraySerializer(item["parameters"]),
    description: item["description"],
  };
}

/** The response of a ParameterGroup list operation. */
export interface _ParameterGroupListResult {
  /** The ParameterGroup items on this page */
  value: ParameterGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _parameterGroupListResultDeserializer(item: any): _ParameterGroupListResult {
  return {
    value: parameterGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function parameterGroupArraySerializer(result: Array<ParameterGroup>): any[] {
  return result.map((item) => {
    return parameterGroupSerializer(item);
  });
}

export function parameterGroupArrayDeserializer(result: Array<ParameterGroup>): any[] {
  return result.map((item) => {
    return parameterGroupDeserializer(item);
  });
}

/** A page of HorizonDB parameter group connections. */
export interface _PagedParameterGroupConnectionProperties {
  /** The parameter group connection items on this page. */
  value: ParameterGroupConnectionProperties[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _pagedParameterGroupConnectionPropertiesDeserializer(
  item: any,
): _PagedParameterGroupConnectionProperties {
  return {
    value: parameterGroupConnectionPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function parameterGroupConnectionPropertiesArrayDeserializer(
  result: Array<ParameterGroupConnectionProperties>,
): any[] {
  return result.map((item) => {
    return parameterGroupConnectionPropertiesDeserializer(item);
  });
}

/** Connection information for HorizonDB parameter group. */
export interface ParameterGroupConnectionProperties {
  /** The Azure resource ID of the connected HorizonDB pool. */
  readonly poolResourceId: string;
}

export function parameterGroupConnectionPropertiesDeserializer(
  item: any,
): ParameterGroupConnectionProperties {
  return {
    poolResourceId: item["poolResourceId"],
  };
}

/** The response of a DefaultParameterGroup list operation. */
export interface _DefaultParameterGroupListResult {
  /** The DefaultParameterGroup items on this page */
  value: DefaultParameterGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _defaultParameterGroupListResultDeserializer(
  item: any,
): _DefaultParameterGroupListResult {
  return {
    value: defaultParameterGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function defaultParameterGroupArrayDeserializer(
  result: Array<DefaultParameterGroup>,
): any[] {
  return result.map((item) => {
    return defaultParameterGroupDeserializer(item);
  });
}

/** A default parameter group available in a specific region. It contains engine-defined parameters and excludes service and other non-engine entries. For each PostgreSQL version, the DefaultParameterGroups APIs return at most one default parameter group in a location. */
export interface DefaultParameterGroup extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DefaultParameterGroupProperties;
}

export function defaultParameterGroupDeserializer(item: any): DefaultParameterGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : defaultParameterGroupPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a default parameter group. */
export interface DefaultParameterGroupProperties {
  /** The provisioning state of the default parameter group. */
  readonly provisioningState?: ProvisioningState;
  /** Engine-defined parameters in the default parameter group. Service and other non-engine entries are excluded. */
  parameters: ParameterProperties[];
  /** Description of the default parameter group. */
  description?: string;
  /** PostgreSQL version for which this default parameter group is valid. */
  postgreSqlVersion: PostgreSqlVersion;
}

export function defaultParameterGroupPropertiesDeserializer(
  item: any,
): DefaultParameterGroupProperties {
  return {
    provisioningState: item["provisioningState"],
    parameters: parameterPropertiesArrayDeserializer(item["parameters"]),
    description: item["description"],
    postgreSqlVersion: item["postgreSqlVersion"],
  };
}

/** Represents a PostgreSQL role that is a member of the azure_pg_admin role and is mapped to a Microsoft Entra principal. */
export interface MicrosoftEntraAdministrator extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MicrosoftEntraAdministratorProperties;
}

export function microsoftEntraAdministratorDeserializer(item: any): MicrosoftEntraAdministrator {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : microsoftEntraAdministratorPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
export interface MicrosoftEntraAdministratorProperties {
  /** The display name or user principal name of the Microsoft Entra principal mapped to the PostgreSQL role. For users, this is typically the user principal name, such as admin@contoso.com. For groups, this is the group display name. For service principals, this is the application display name. */
  principalName: string;
  /** The type of Microsoft Entra principal mapped to the PostgreSQL role. */
  principalType: PrincipalTypes;
  /** The Microsoft Entra object identifier of the principal mapped to the PostgreSQL role, represented as an RFC 4122 GUID. On PUT requests, this value comes from the URI path parameter. */
  readonly objectId?: string;
  /** The identifier of the Microsoft Entra tenant containing the mapped principal, represented as an RFC 4122 GUID. If omitted, this value defaults to the tenant of the subscription. */
  tenantId?: string;
  /** The provisioning state of the PostgreSQL role and Microsoft Entra principal mapping. */
  readonly provisioningState?: ProvisioningState;
}

export function microsoftEntraAdministratorPropertiesDeserializer(
  item: any,
): MicrosoftEntraAdministratorProperties {
  return {
    principalName: item["principalName"],
    principalType: item["principalType"],
    objectId: item["objectId"],
    tenantId: item["tenantId"],
    provisioningState: item["provisioningState"],
  };
}

/** The type of Microsoft Entra principal mapped to a PostgreSQL role. */
export enum KnownPrincipalTypes {
  /** An unknown or unrecognized type. This value is for internal use and is not accepted in requests. */
  Unknown = "Unknown",
  /** A Microsoft Entra ID user account. */
  User = "User",
  /** A Microsoft Entra ID security group. All members of the group inherit administrator privileges. */
  Group = "Group",
  /** A Microsoft Entra ID application or service principal used for automated workloads. */
  ServicePrincipal = "ServicePrincipal",
}

/**
 * The type of Microsoft Entra principal mapped to a PostgreSQL role. \
 * {@link KnownPrincipalTypes} can be used interchangeably with PrincipalTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: An unknown or unrecognized type. This value is for internal use and is not accepted in requests. \
 * **User**: A Microsoft Entra ID user account. \
 * **Group**: A Microsoft Entra ID security group. All members of the group inherit administrator privileges. \
 * **ServicePrincipal**: A Microsoft Entra ID application or service principal used for automated workloads.
 */
export type PrincipalTypes = string;

/** The request body for creating or updating a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
export interface MicrosoftEntraAdministratorAdd {
  /** The PostgreSQL role and Microsoft Entra principal mapping properties. */
  properties: MicrosoftEntraAdministratorPropertiesForAdd;
}

export function microsoftEntraAdministratorAddSerializer(
  item: MicrosoftEntraAdministratorAdd,
): any {
  return { properties: microsoftEntraAdministratorPropertiesForAddSerializer(item["properties"]) };
}

/** Properties for creating or updating a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
export interface MicrosoftEntraAdministratorPropertiesForAdd {
  /** The display name or user principal name of the Microsoft Entra principal to map to the PostgreSQL role. For users, this is typically the user principal name, such as admin@contoso.com. For groups, this is the group display name. For service principals, this is the application display name. */
  principalName: string;
  /** The type of Microsoft Entra principal to map to the PostgreSQL role. */
  principalType: PrincipalTypes;
  /** The identifier of the Microsoft Entra tenant containing the principal to map, represented as an RFC 4122 GUID. If omitted, this value defaults to the tenant of the subscription. */
  tenantId?: string;
}

export function microsoftEntraAdministratorPropertiesForAddSerializer(
  item: MicrosoftEntraAdministratorPropertiesForAdd,
): any {
  return {
    principalName: item["principalName"],
    principalType: item["principalType"],
    tenantId: item["tenantId"],
  };
}

/** The response of a MicrosoftEntraAdministrator list operation. */
export interface _MicrosoftEntraAdministratorListResult {
  /** The MicrosoftEntraAdministrator items on this page */
  value: MicrosoftEntraAdministrator[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _microsoftEntraAdministratorListResultDeserializer(
  item: any,
): _MicrosoftEntraAdministratorListResult {
  return {
    value: microsoftEntraAdministratorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftEntraAdministratorArrayDeserializer(
  result: Array<MicrosoftEntraAdministrator>,
): any[] {
  return result.map((item) => {
    return microsoftEntraAdministratorDeserializer(item);
  });
}

/** The response of a Authentication list operation. */
export interface _AuthenticationListResult {
  /** The Authentication items on this page */
  value: Authentication[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _authenticationListResultDeserializer(item: any): _AuthenticationListResult {
  return {
    value: authenticationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function authenticationArrayDeserializer(result: Array<Authentication>): any[] {
  return result.map((item) => {
    return authenticationDeserializer(item);
  });
}

/** A service-created authentication configuration returned by the authentications collection. The resource name is passwordMethod or microsoftEntra. */
export interface Authentication extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AuthenticationProperties;
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : authenticationPropertiesDeserializer(item["properties"]),
  };
}

/** Common read-only properties of a service-created authentication configuration. */
export interface AuthenticationProperties {
  /** The state of the authentication configuration. */
  readonly state: AuthenticationState;
  /** The provisioning state of the authentication configuration. */
  readonly provisioningState?: ProvisioningState;
}

export function authenticationPropertiesDeserializer(item: any): AuthenticationProperties {
  return {
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** Indicates if authentication state is enabled or not. */
export enum KnownAuthenticationState {
  /** Is enabled */
  Enabled = "Enabled",
  /** Is disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if authentication state is enabled or not. \
 * {@link KnownAuthenticationState} can be used interchangeably with AuthenticationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Is enabled \
 * **Disabled**: Is disabled
 */
export type AuthenticationState = string;

/** The name of a service-created authentication configuration. */
export enum KnownAuthenticationName {
  /** PostgreSQL username-and-password authentication. */
  PasswordMethod = "passwordMethod",
  /** Microsoft Entra authentication. */
  MicrosoftEntra = "microsoftEntra",
}

/**
 * The name of a service-created authentication configuration. \
 * {@link KnownAuthenticationName} can be used interchangeably with AuthenticationName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **passwordMethod**: PostgreSQL username-and-password authentication. \
 * **microsoftEntra**: Microsoft Entra authentication.
 */
export type AuthenticationName = string;

/** The service-created PostgreSQL username-and-password authentication method for a HorizonDB cluster. This resource configures the authentication mechanism, including its enabled state and administrator login credentials; it is not a password-only resource. */
export interface PasswordAuthentication extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PasswordAuthenticationProperties;
}

export function passwordAuthenticationSerializer(item: PasswordAuthentication): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : passwordAuthenticationPropertiesSerializer(item["properties"]),
  };
}

export function passwordAuthenticationDeserializer(item: any): PasswordAuthentication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : passwordAuthenticationPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the service-created PostgreSQL username-and-password authentication method. */
export interface PasswordAuthenticationProperties {
  /** The state of PostgreSQL username-and-password authentication. */
  state: AuthenticationState;
  /** The provisioning state of the PostgreSQL username-and-password authentication method. */
  readonly provisioningState?: ProvisioningState;
}

export function passwordAuthenticationPropertiesSerializer(
  item: PasswordAuthenticationProperties,
): any {
  return { state: item["state"] };
}

export function passwordAuthenticationPropertiesDeserializer(
  item: any,
): PasswordAuthenticationProperties {
  return {
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** The name of the PostgreSQL username-and-password authentication method. */
export enum KnownPasswordAuthenticationName {
  /** PostgreSQL username-and-password authentication. */
  PasswordMethod = "passwordMethod",
}

/**
 * The name of the PostgreSQL username-and-password authentication method. \
 * {@link KnownPasswordAuthenticationName} can be used interchangeably with PasswordAuthenticationName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **passwordMethod**: PostgreSQL username-and-password authentication.
 */
export type PasswordAuthenticationName = string;

/** A sparse update request for PostgreSQL username-and-password authentication. */
export interface PasswordAuthenticationForPatchUpdate {
  /** The PostgreSQL username-and-password authentication properties to update. */
  properties?: PasswordAuthenticationPropertiesForPatchUpdate;
}

export function passwordAuthenticationForPatchUpdateSerializer(
  item: PasswordAuthenticationForPatchUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : passwordAuthenticationPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating PostgreSQL username-and-password authentication. Omitted properties preserve their current values. This API version supports enabling or disabling the authentication method, and resetting its password. Supported changes can be combined. */
export interface PasswordAuthenticationPropertiesForPatchUpdate {
  /** The target password-authentication state. Enabled can be combined with administratorLoginPassword to re-enable password authentication and reset the password for a cluster that already has an administrator. Disabling password authentication does not remove or modify existing database users or roles. Disabled cannot be combined with administratorLoginPassword. */
  state?: AuthenticationState;
  /** The PostgreSQL administrator password. Supplying this property resets the configured administrator's password. When password authentication is currently disabled for a cluster that already has an administrator, this property can be combined with state Enabled to re-enable password authentication and reset the password. */
  administratorLoginPassword?: string;
}

export function passwordAuthenticationPropertiesForPatchUpdateSerializer(
  item: PasswordAuthenticationPropertiesForPatchUpdate,
): any {
  return { state: item["state"], administratorLoginPassword: item["administratorLoginPassword"] };
}

/** The service-created Microsoft Entra authentication method for a HorizonDB cluster. */
export interface MicrosoftEntraAuthentication extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MicrosoftEntraAuthenticationProperties;
}

export function microsoftEntraAuthenticationSerializer(item: MicrosoftEntraAuthentication): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : microsoftEntraAuthenticationPropertiesSerializer(item["properties"]),
  };
}

export function microsoftEntraAuthenticationDeserializer(item: any): MicrosoftEntraAuthentication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : microsoftEntraAuthenticationPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the service-created Microsoft Entra authentication method. */
export interface MicrosoftEntraAuthenticationProperties {
  /** The state of Microsoft Entra authentication. */
  state: AuthenticationState;
  /** The provisioning state of the Microsoft Entra authentication method. */
  readonly provisioningState?: ProvisioningState;
}

export function microsoftEntraAuthenticationPropertiesSerializer(
  item: MicrosoftEntraAuthenticationProperties,
): any {
  return { state: item["state"] };
}

export function microsoftEntraAuthenticationPropertiesDeserializer(
  item: any,
): MicrosoftEntraAuthenticationProperties {
  return {
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** The name of the Microsoft Entra authentication method. */
export enum KnownMicrosoftEntraAuthenticationName {
  /** Microsoft Entra authentication. */
  MicrosoftEntra = "microsoftEntra",
}

/**
 * The name of the Microsoft Entra authentication method. \
 * {@link KnownMicrosoftEntraAuthenticationName} can be used interchangeably with MicrosoftEntraAuthenticationName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **microsoftEntra**: Microsoft Entra authentication.
 */
export type MicrosoftEntraAuthenticationName = string;

/** A sparse update request for Microsoft Entra authentication. */
export interface MicrosoftEntraAuthenticationForPatchUpdate {
  /** The Microsoft Entra authentication properties to update. */
  properties?: MicrosoftEntraAuthenticationPropertiesForPatchUpdate;
}

export function microsoftEntraAuthenticationForPatchUpdateSerializer(
  item: MicrosoftEntraAuthenticationForPatchUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : microsoftEntraAuthenticationPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating Microsoft Entra authentication. State Enabled enables the feature and State Disabled disables it. Disabling Microsoft Entra authentication does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions. */
export interface MicrosoftEntraAuthenticationPropertiesForPatchUpdate {
  /** The target Microsoft Entra authentication state. Omission preserves the current state. */
  state?: AuthenticationState;
}

export function microsoftEntraAuthenticationPropertiesForPatchUpdateSerializer(
  item: MicrosoftEntraAuthenticationPropertiesForPatchUpdate,
): any {
  return { state: item["state"] };
}

/** The singleton change data capture capability for a HorizonDB cluster. */
export interface ChangeDataCaptureCapability extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureCapabilityProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function changeDataCaptureCapabilitySerializer(item: ChangeDataCaptureCapability): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureCapabilityPropertiesSerializer(item["properties"]),
  };
}

export function changeDataCaptureCapabilityDeserializer(item: any): ChangeDataCaptureCapability {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureCapabilityPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the singleton change data capture capability. */
export interface ChangeDataCaptureCapabilityProperties {
  /** The requested capability state. */
  desiredState: ChangeDataCaptureDesiredState;
  /** The current effective capability state. */
  readonly effectiveState: ChangeDataCaptureEffectiveState;
  /** The provisioning state of the latest capability mutation. */
  readonly provisioningState?: ProvisioningState;
  /** Whether HorizonDB may automatically upgrade the service-owned change data capture extension within the supported compatibility policy. */
  autoUpgradeExtension?: boolean;
  /** The implementation architecture currently used for change capture. */
  readonly replicationArchitecture: ChangeDataCaptureReplicationArchitecture;
  /** The installed change data capture extension and its current lifecycle state. */
  readonly extension: ChangeDataCaptureExtensionStatus;
  /** The current readiness of change data capture engine and read-write endpoint prerequisites. */
  readonly prerequisites: ChangeDataCapturePrerequisiteStatus;
  /** The number of change data capture destinations under this cluster. */
  readonly destinationCount: number;
  /** The number of change data capture configurations under this cluster. */
  readonly configurationCount: number;
  /** Customer-safe health information for the capability. */
  readonly status: ChangeDataCaptureStatus;
}

export function changeDataCaptureCapabilityPropertiesSerializer(
  item: ChangeDataCaptureCapabilityProperties,
): any {
  return { desiredState: item["desiredState"], autoUpgradeExtension: item["autoUpgradeExtension"] };
}

export function changeDataCaptureCapabilityPropertiesDeserializer(
  item: any,
): ChangeDataCaptureCapabilityProperties {
  return {
    desiredState: item["desiredState"],
    effectiveState: item["effectiveState"],
    provisioningState: item["provisioningState"],
    autoUpgradeExtension: item["autoUpgradeExtension"],
    replicationArchitecture: item["replicationArchitecture"],
    extension: changeDataCaptureExtensionStatusDeserializer(item["extension"]),
    prerequisites: changeDataCapturePrerequisiteStatusDeserializer(item["prerequisites"]),
    destinationCount: item["destinationCount"],
    configurationCount: item["configurationCount"],
    status: changeDataCaptureStatusDeserializer(item["status"]),
  };
}

/** The requested state of a HorizonDB change data capture capability, destination, or configuration. */
export enum KnownChangeDataCaptureDesiredState {
  /** The resource should be enabled. */
  Enabled = "Enabled",
  /** The resource should be disabled. */
  Disabled = "Disabled",
}

/**
 * The requested state of a HorizonDB change data capture capability, destination, or configuration. \
 * {@link KnownChangeDataCaptureDesiredState} can be used interchangeably with ChangeDataCaptureDesiredState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The resource should be enabled. \
 * **Disabled**: The resource should be disabled.
 */
export type ChangeDataCaptureDesiredState = string;

/** The effective state of a HorizonDB change data capture capability or configuration. */
export enum KnownChangeDataCaptureEffectiveState {
  /** The resource is being enabled. */
  Enabling = "Enabling",
  /** The resource is enabled. */
  Enabled = "Enabled",
  /** The resource is being disabled. */
  Disabling = "Disabling",
  /** The resource is disabled. */
  Disabled = "Disabled",
  /** The resource is available with reduced functionality or impaired health. */
  Degraded = "Degraded",
  /** The resource is not operational because reconciliation failed. */
  Failed = "Failed",
}

/**
 * The effective state of a HorizonDB change data capture capability or configuration. \
 * {@link KnownChangeDataCaptureEffectiveState} can be used interchangeably with ChangeDataCaptureEffectiveState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabling**: The resource is being enabled. \
 * **Enabled**: The resource is enabled. \
 * **Disabling**: The resource is being disabled. \
 * **Disabled**: The resource is disabled. \
 * **Degraded**: The resource is available with reduced functionality or impaired health. \
 * **Failed**: The resource is not operational because reconciliation failed.
 */
export type ChangeDataCaptureEffectiveState = string;

/** The implementation architecture used to capture and publish changes. */
export enum KnownChangeDataCaptureReplicationArchitecture {
  /** Change capture runs with the HorizonDB compute layer. */
  ComputeBased = "ComputeBased",
  /** Change capture runs with the HorizonDB storage layer. */
  StorageBased = "StorageBased",
  /** Change capture uses both compute and storage components. */
  Hybrid = "Hybrid",
}

/**
 * The implementation architecture used to capture and publish changes. \
 * {@link KnownChangeDataCaptureReplicationArchitecture} can be used interchangeably with ChangeDataCaptureReplicationArchitecture,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ComputeBased**: Change capture runs with the HorizonDB compute layer. \
 * **StorageBased**: Change capture runs with the HorizonDB storage layer. \
 * **Hybrid**: Change capture uses both compute and storage components.
 */
export type ChangeDataCaptureReplicationArchitecture = string;

/** The installed HorizonDB change data capture extension and its current state. */
export interface ChangeDataCaptureExtensionStatus {
  /** The extension name. */
  readonly name: string;
  /** The installed extension version. */
  readonly version: string;
  /** The current extension lifecycle state. */
  readonly state: ChangeDataCaptureExtensionState;
}

export function changeDataCaptureExtensionStatusDeserializer(
  item: any,
): ChangeDataCaptureExtensionStatus {
  return {
    name: item["name"],
    version: item["version"],
    state: item["state"],
  };
}

/** The lifecycle state of the HorizonDB change data capture extension. */
export enum KnownChangeDataCaptureExtensionState {
  /** The extension is not installed. */
  NotInstalled = "NotInstalled",
  /** The extension is being installed. */
  Installing = "Installing",
  /** The extension is ready. */
  Ready = "Ready",
  /** The extension is being upgraded. */
  Upgrading = "Upgrading",
  /** The extension is being removed. */
  Removing = "Removing",
  /** The extension operation failed. */
  Failed = "Failed",
}

/**
 * The lifecycle state of the HorizonDB change data capture extension. \
 * {@link KnownChangeDataCaptureExtensionState} can be used interchangeably with ChangeDataCaptureExtensionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotInstalled**: The extension is not installed. \
 * **Installing**: The extension is being installed. \
 * **Ready**: The extension is ready. \
 * **Upgrading**: The extension is being upgraded. \
 * **Removing**: The extension is being removed. \
 * **Failed**: The extension operation failed.
 */
export type ChangeDataCaptureExtensionState = string;

/** The current readiness of prerequisites shared by change data capture configurations. */
export interface ChangeDataCapturePrerequisiteStatus {
  /** The readiness of the required engine configuration. */
  readonly engineConfigurationState: ChangeDataCaptureEngineConfigurationState;
  /** The availability of the read-write endpoint required for engine mutations. */
  readonly readWriteEndpointState: ChangeDataCaptureReadWriteEndpointState;
}

export function changeDataCapturePrerequisiteStatusDeserializer(
  item: any,
): ChangeDataCapturePrerequisiteStatus {
  return {
    engineConfigurationState: item["engineConfigurationState"],
    readWriteEndpointState: item["readWriteEndpointState"],
  };
}

/** The readiness of HorizonDB engine settings required for change data capture. */
export enum KnownChangeDataCaptureEngineConfigurationState {
  /** The required engine settings are ready. */
  Ready = "Ready",
  /** One or more required engine settings are not ready. */
  NotReady = "NotReady",
  /** The service is reconciling required engine settings. */
  Reconciling = "Reconciling",
  /** Engine-setting reconciliation failed. */
  Failed = "Failed",
}

/**
 * The readiness of HorizonDB engine settings required for change data capture. \
 * {@link KnownChangeDataCaptureEngineConfigurationState} can be used interchangeably with ChangeDataCaptureEngineConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: The required engine settings are ready. \
 * **NotReady**: One or more required engine settings are not ready. \
 * **Reconciling**: The service is reconciling required engine settings. \
 * **Failed**: Engine-setting reconciliation failed.
 */
export type ChangeDataCaptureEngineConfigurationState = string;

/** The availability of a read-write endpoint for change data capture engine mutations. */
export enum KnownChangeDataCaptureReadWriteEndpointState {
  /** An eligible read-write endpoint is ready. */
  Ready = "Ready",
  /** No eligible read-write endpoint is currently available. */
  Unavailable = "Unavailable",
}

/**
 * The availability of a read-write endpoint for change data capture engine mutations. \
 * {@link KnownChangeDataCaptureReadWriteEndpointState} can be used interchangeably with ChangeDataCaptureReadWriteEndpointState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: An eligible read-write endpoint is ready. \
 * **Unavailable**: No eligible read-write endpoint is currently available.
 */
export type ChangeDataCaptureReadWriteEndpointState = string;

/** Customer-safe health information for a HorizonDB change data capture resource. */
export interface ChangeDataCaptureStatus {
  /** A stable machine-readable status code. */
  readonly code: string;
  /** A localized customer-safe description of the current status. */
  readonly message: string;
}

export function changeDataCaptureStatusDeserializer(item: any): ChangeDataCaptureStatus {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** A sparse update request for the singleton change data capture capability. */
export interface ChangeDataCaptureCapabilityForPatchUpdate {
  /** The capability properties to update. */
  properties?: ChangeDataCaptureCapabilityPropertiesForPatchUpdate;
}

export function changeDataCaptureCapabilityForPatchUpdateSerializer(
  item: ChangeDataCaptureCapabilityForPatchUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureCapabilityPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating the singleton change data capture capability. Omitted properties preserve their current values. */
export interface ChangeDataCaptureCapabilityPropertiesForPatchUpdate {
  /** The requested capability state. */
  desiredState?: ChangeDataCaptureDesiredState;
  /** Whether HorizonDB may automatically upgrade the service-owned change data capture extension within the supported compatibility policy. */
  autoUpgradeExtension?: boolean;
}

export function changeDataCaptureCapabilityPropertiesForPatchUpdateSerializer(
  item: ChangeDataCaptureCapabilityPropertiesForPatchUpdate,
): any {
  return { desiredState: item["desiredState"], autoUpgradeExtension: item["autoUpgradeExtension"] };
}

/** The response of a ChangeDataCaptureCapability list operation. */
export interface _ChangeDataCaptureCapabilityListResult {
  /** The ChangeDataCaptureCapability items on this page */
  value: ChangeDataCaptureCapability[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _changeDataCaptureCapabilityListResultDeserializer(
  item: any,
): _ChangeDataCaptureCapabilityListResult {
  return {
    value: changeDataCaptureCapabilityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function changeDataCaptureCapabilityArraySerializer(
  result: Array<ChangeDataCaptureCapability>,
): any[] {
  return result.map((item) => {
    return changeDataCaptureCapabilitySerializer(item);
  });
}

export function changeDataCaptureCapabilityArrayDeserializer(
  result: Array<ChangeDataCaptureCapability>,
): any[] {
  return result.map((item) => {
    return changeDataCaptureCapabilityDeserializer(item);
  });
}

/** A reusable Microsoft Fabric destination for HorizonDB change data capture configurations. */
export interface ChangeDataCaptureDestination extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureDestinationProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function changeDataCaptureDestinationSerializer(item: ChangeDataCaptureDestination): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureDestinationPropertiesSerializer(item["properties"]),
  };
}

export function changeDataCaptureDestinationDeserializer(item: any): ChangeDataCaptureDestination {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureDestinationPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of a Microsoft Fabric change data capture destination. */
export interface ChangeDataCaptureDestinationProperties {
  /** The immutable Microsoft Fabric destination settings. Resubmitting the same values is accepted; changing them requires deleting and recreating the destination. */
  destination: ChangeDataCaptureDestinationDetailsUnion;
  /** The requested destination state. */
  desiredState: ChangeDataCaptureDesiredState;
  /** The current effective destination state. */
  readonly effectiveState: ChangeDataCaptureDestinationEffectiveState;
  /** The provisioning state of the latest destination mutation. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of the currently active identity assignment, if one is active. */
  readonly activeIdentityAssignmentResourceId?: string;
  /** The number of change data capture configurations that reference this destination. */
  readonly configurationCount: number;
  /** Customer-safe health information for the destination. */
  readonly status: ChangeDataCaptureStatus;
}

export function changeDataCaptureDestinationPropertiesSerializer(
  item: ChangeDataCaptureDestinationProperties,
): any {
  return {
    destination: changeDataCaptureDestinationDetailsUnionSerializer(item["destination"]),
    desiredState: item["desiredState"],
  };
}

export function changeDataCaptureDestinationPropertiesDeserializer(
  item: any,
): ChangeDataCaptureDestinationProperties {
  return {
    destination: changeDataCaptureDestinationDetailsUnionDeserializer(item["destination"]),
    desiredState: item["desiredState"],
    effectiveState: item["effectiveState"],
    provisioningState: item["provisioningState"],
    activeIdentityAssignmentResourceId: item["activeIdentityAssignmentResourceId"],
    configurationCount: item["configurationCount"],
    status: changeDataCaptureStatusDeserializer(item["status"]),
  };
}

/** Destination-specific settings discriminated by destinationType. */
export interface ChangeDataCaptureDestinationDetails {
  /** The destination family. */
  /** The discriminator possible values: Fabric */
  destinationType: ChangeDataCaptureDestinationType;
  /** The protocol used to communicate with the destination. */
  protocol: ChangeDataCaptureProtocol;
}

export function changeDataCaptureDestinationDetailsSerializer(
  item: ChangeDataCaptureDestinationDetails,
): any {
  return { destinationType: item["destinationType"], protocol: item["protocol"] };
}

export function changeDataCaptureDestinationDetailsDeserializer(
  item: any,
): ChangeDataCaptureDestinationDetails {
  return {
    destinationType: item["destinationType"],
    protocol: item["protocol"],
  };
}

/** Alias for ChangeDataCaptureDestinationDetailsUnion */
export type ChangeDataCaptureDestinationDetailsUnion =
  FabricDestinationDetails | ChangeDataCaptureDestinationDetails;

export function changeDataCaptureDestinationDetailsUnionSerializer(
  item: ChangeDataCaptureDestinationDetailsUnion,
): any {
  switch (item.destinationType) {
    case "Fabric":
      return fabricDestinationDetailsSerializer(item as FabricDestinationDetails);

    default:
      return changeDataCaptureDestinationDetailsSerializer(item);
  }
}

export function changeDataCaptureDestinationDetailsUnionDeserializer(
  item: any,
): ChangeDataCaptureDestinationDetailsUnion {
  switch (item["destinationType"]) {
    case "Fabric":
      return fabricDestinationDetailsDeserializer(item as FabricDestinationDetails);

    default:
      return changeDataCaptureDestinationDetailsDeserializer(item);
  }
}

/** The destination type supported by this API version. */
export enum KnownChangeDataCaptureDestinationType {
  /** A Microsoft Fabric destination. */
  Fabric = "Fabric",
}

/**
 * The destination type supported by this API version. \
 * {@link KnownChangeDataCaptureDestinationType} can be used interchangeably with ChangeDataCaptureDestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fabric**: A Microsoft Fabric destination.
 */
export type ChangeDataCaptureDestinationType = string;

/** The protocol used to communicate with a change data capture destination. */
export enum KnownChangeDataCaptureProtocol {
  /** The destination's native protocol. */
  Native = "Native",
}

/**
 * The protocol used to communicate with a change data capture destination. \
 * {@link KnownChangeDataCaptureProtocol} can be used interchangeably with ChangeDataCaptureProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Native**: The destination's native protocol.
 */
export type ChangeDataCaptureProtocol = string;

/** Settings for a Microsoft Fabric destination. */
export interface FabricDestinationDetails extends ChangeDataCaptureDestinationDetails {
  /** Specifies a Microsoft Fabric destination. */
  destinationType: "Fabric";
  /** Specifies the Microsoft Fabric native destination protocol. */
  protocol: "Native";
  /** The opaque identifier of the Microsoft Fabric workspace that owns the destination artifact. */
  workspaceId: string;
}

export function fabricDestinationDetailsSerializer(item: FabricDestinationDetails): any {
  return {
    destinationType: item["destinationType"],
    protocol: item["protocol"],
    workspaceId: item["workspaceId"],
  };
}

export function fabricDestinationDetailsDeserializer(item: any): FabricDestinationDetails {
  return {
    destinationType: item["destinationType"],
    protocol: item["protocol"],
    workspaceId: item["workspaceId"],
  };
}

/** The effective state of a HorizonDB change data capture destination. */
export enum KnownChangeDataCaptureDestinationEffectiveState {
  /** The destination is waiting for a validated active identity assignment. */
  WaitingForIdentity = "WaitingForIdentity",
  /** The destination is being enabled. */
  Enabling = "Enabling",
  /** The destination is enabled. */
  Enabled = "Enabled",
  /** The destination is being disabled. */
  Disabling = "Disabling",
  /** The destination is disabled. */
  Disabled = "Disabled",
  /** The destination is available with reduced functionality or impaired health. */
  Degraded = "Degraded",
  /** The destination is not operational because reconciliation failed. */
  Failed = "Failed",
}

/**
 * The effective state of a HorizonDB change data capture destination. \
 * {@link KnownChangeDataCaptureDestinationEffectiveState} can be used interchangeably with ChangeDataCaptureDestinationEffectiveState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WaitingForIdentity**: The destination is waiting for a validated active identity assignment. \
 * **Enabling**: The destination is being enabled. \
 * **Enabled**: The destination is enabled. \
 * **Disabling**: The destination is being disabled. \
 * **Disabled**: The destination is disabled. \
 * **Degraded**: The destination is available with reduced functionality or impaired health. \
 * **Failed**: The destination is not operational because reconciliation failed.
 */
export type ChangeDataCaptureDestinationEffectiveState = string;

/** A sparse update request for a change data capture destination. */
export interface ChangeDataCaptureDestinationForPatchUpdate {
  /** The destination properties to update. */
  properties?: ChangeDataCaptureDestinationPropertiesForPatchUpdate;
}

export function changeDataCaptureDestinationForPatchUpdateSerializer(
  item: ChangeDataCaptureDestinationForPatchUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureDestinationPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating a change data capture destination. Omitted properties preserve their current values. */
export interface ChangeDataCaptureDestinationPropertiesForPatchUpdate {
  /** The requested destination state. */
  desiredState?: ChangeDataCaptureDesiredState;
}

export function changeDataCaptureDestinationPropertiesForPatchUpdateSerializer(
  item: ChangeDataCaptureDestinationPropertiesForPatchUpdate,
): any {
  return { desiredState: item["desiredState"] };
}

/** The response of a ChangeDataCaptureDestination list operation. */
export interface _ChangeDataCaptureDestinationListResult {
  /** The ChangeDataCaptureDestination items on this page */
  value: ChangeDataCaptureDestination[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _changeDataCaptureDestinationListResultDeserializer(
  item: any,
): _ChangeDataCaptureDestinationListResult {
  return {
    value: changeDataCaptureDestinationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function changeDataCaptureDestinationArraySerializer(
  result: Array<ChangeDataCaptureDestination>,
): any[] {
  return result.map((item) => {
    return changeDataCaptureDestinationSerializer(item);
  });
}

export function changeDataCaptureDestinationArrayDeserializer(
  result: Array<ChangeDataCaptureDestination>,
): any[] {
  return result.map((item) => {
    return changeDataCaptureDestinationDeserializer(item);
  });
}

/** The request to activate an identity assignment for a change data capture destination. */
export interface ActivateChangeDataCaptureIdentityRequest {
  /** The resource ID of an inactive, successfully validated identity assignment under the destination receiving the action. */
  identityAssignmentResourceId: string;
  /** Whether existing destination sessions should drain before the identity cutover. The default is false. */
  drainExistingSessions?: boolean;
}

export function activateChangeDataCaptureIdentityRequestSerializer(
  item: ActivateChangeDataCaptureIdentityRequest,
): any {
  return {
    identityAssignmentResourceId: item["identityAssignmentResourceId"],
    drainExistingSessions: item["drainExistingSessions"],
  };
}

/** The completed result of activating a change data capture destination identity. */
export interface ActivateChangeDataCaptureIdentityResult {
  /** The completed activation status. */
  readonly status: "Succeeded";
  /** The resource ID of the newly active identity assignment. */
  readonly targetIdentityAssignmentResourceId: string;
  /** The resource ID of the previously active identity assignment, when one existed. */
  readonly previousIdentityAssignmentResourceId?: string;
}

export function activateChangeDataCaptureIdentityResultDeserializer(
  item: any,
): ActivateChangeDataCaptureIdentityResult {
  return {
    status: item["status"],
    targetIdentityAssignmentResourceId: item["targetIdentityAssignmentResourceId"],
    previousIdentityAssignmentResourceId: item["previousIdentityAssignmentResourceId"],
  };
}

/** A user-assigned managed identity authorized for a HorizonDB change data capture destination. */
export interface IdentityAssignment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureIdentityAssignmentProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function identityAssignmentSerializer(item: IdentityAssignment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureIdentityAssignmentPropertiesSerializer(item["properties"]),
  };
}

export function identityAssignmentDeserializer(item: any): IdentityAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureIdentityAssignmentPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of a change data capture identity assignment. */
export interface ChangeDataCaptureIdentityAssignmentProperties {
  /** The immutable resource ID of the user-assigned managed identity selected for this destination. The ID must exactly match a key in the parent cluster's top-level identity.userAssignedIdentities dictionary; otherwise creation is rejected. Attaching the identity to the cluster does not grant destination access, so required role assignments must be configured separately. Resubmitting the same value is accepted; changing it requires deleting and recreating the assignment. */
  identityResourceId: string;
  /** The current assignment lifecycle state. */
  readonly effectiveState: ChangeDataCaptureIdentityAssignmentState;
  /** The current activation state within the parent destination. */
  readonly activationState: ChangeDataCaptureIdentityActivationState;
  /** The Microsoft Entra principal ID resolved from the user-assigned managed identity, represented as an RFC 4122 GUID. */
  readonly principalId: string;
  /** The Microsoft Entra tenant ID resolved from the user-assigned managed identity, represented as an RFC 4122 GUID. */
  readonly tenantId: string;
  /** The provisioning state of the latest identity-assignment mutation. */
  readonly provisioningState?: ProvisioningState;
  /** The latest validation result for this identity assignment. */
  readonly validation: IdentityValidationStatus;
  /** Customer-safe health information for the identity assignment. */
  readonly status: ChangeDataCaptureStatus;
}

export function changeDataCaptureIdentityAssignmentPropertiesSerializer(
  item: ChangeDataCaptureIdentityAssignmentProperties,
): any {
  return { identityResourceId: item["identityResourceId"] };
}

export function changeDataCaptureIdentityAssignmentPropertiesDeserializer(
  item: any,
): ChangeDataCaptureIdentityAssignmentProperties {
  return {
    identityResourceId: item["identityResourceId"],
    effectiveState: item["effectiveState"],
    activationState: item["activationState"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    provisioningState: item["provisioningState"],
    validation: identityValidationStatusDeserializer(item["validation"]),
    status: changeDataCaptureStatusDeserializer(item["status"]),
  };
}

/** The lifecycle state of a change data capture identity assignment. */
export enum KnownChangeDataCaptureIdentityAssignmentState {
  /** The identity is being assigned. */
  Assigning = "Assigning",
  /** The identity is assigned. */
  Assigned = "Assigned",
  /** The identity assignment is being removed. */
  Removing = "Removing",
  /** The identity assignment operation failed. */
  Failed = "Failed",
}

/**
 * The lifecycle state of a change data capture identity assignment. \
 * {@link KnownChangeDataCaptureIdentityAssignmentState} can be used interchangeably with ChangeDataCaptureIdentityAssignmentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assigning**: The identity is being assigned. \
 * **Assigned**: The identity is assigned. \
 * **Removing**: The identity assignment is being removed. \
 * **Failed**: The identity assignment operation failed.
 */
export type ChangeDataCaptureIdentityAssignmentState = string;

/** The activation state of a change data capture identity assignment. */
export enum KnownChangeDataCaptureIdentityActivationState {
  /** The identity assignment is not active. */
  Inactive = "Inactive",
  /** The identity assignment is being activated. */
  Activating = "Activating",
  /** The identity assignment is active. */
  Active = "Active",
  /** The identity assignment is being deactivated. */
  Deactivating = "Deactivating",
  /** The identity activation transition failed. */
  Failed = "Failed",
}

/**
 * The activation state of a change data capture identity assignment. \
 * {@link KnownChangeDataCaptureIdentityActivationState} can be used interchangeably with ChangeDataCaptureIdentityActivationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive**: The identity assignment is not active. \
 * **Activating**: The identity assignment is being activated. \
 * **Active**: The identity assignment is active. \
 * **Deactivating**: The identity assignment is being deactivated. \
 * **Failed**: The identity activation transition failed.
 */
export type ChangeDataCaptureIdentityActivationState = string;

/** The current validation result for a change data capture identity assignment. */
export interface IdentityValidationStatus {
  /** The current validation state. */
  readonly state: ChangeDataCaptureIdentityValidationState;
  /** The date and time, in UTC, when validation most recently completed. */
  readonly validatedAtUtc?: Date;
  /** The customer-safe validation error when validation failed. */
  readonly error?: ErrorDetail;
}

export function identityValidationStatusDeserializer(item: any): IdentityValidationStatus {
  return {
    state: item["state"],
    validatedAtUtc: !item["validatedAtUtc"]
      ? item["validatedAtUtc"]
      : new Date(item["validatedAtUtc"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The validation state of a change data capture identity assignment. */
export enum KnownChangeDataCaptureIdentityValidationState {
  /** Identity validation has not started. */
  NotStarted = "NotStarted",
  /** Identity validation is running. */
  Running = "Running",
  /** Identity validation succeeded. */
  Succeeded = "Succeeded",
  /** Identity validation failed. */
  Failed = "Failed",
}

/**
 * The validation state of a change data capture identity assignment. \
 * {@link KnownChangeDataCaptureIdentityValidationState} can be used interchangeably with ChangeDataCaptureIdentityValidationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Identity validation has not started. \
 * **Running**: Identity validation is running. \
 * **Succeeded**: Identity validation succeeded. \
 * **Failed**: Identity validation failed.
 */
export type ChangeDataCaptureIdentityValidationState = string;

/** The response of a IdentityAssignment list operation. */
export interface _IdentityAssignmentListResult {
  /** The IdentityAssignment items on this page */
  value: IdentityAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _identityAssignmentListResultDeserializer(
  item: any,
): _IdentityAssignmentListResult {
  return {
    value: identityAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function identityAssignmentArraySerializer(result: Array<IdentityAssignment>): any[] {
  return result.map((item) => {
    return identityAssignmentSerializer(item);
  });
}

export function identityAssignmentArrayDeserializer(result: Array<IdentityAssignment>): any[] {
  return result.map((item) => {
    return identityAssignmentDeserializer(item);
  });
}

/** A HorizonDB database enrollment for Microsoft Fabric Mirroring. */
export interface ChangeDataCaptureConfiguration extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureConfigurationProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function changeDataCaptureConfigurationSerializer(
  item: ChangeDataCaptureConfiguration,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function changeDataCaptureConfigurationDeserializer(
  item: any,
): ChangeDataCaptureConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureConfigurationPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of a Microsoft Fabric Mirroring configuration. */
export interface ChangeDataCaptureConfigurationProperties {
  /** The exact PostgreSQL database name enrolled in this logical stream. This value is immutable. */
  databaseName: string;
  /** The immutable usage profile. API version 2026-10-01-preview accepts Mirroring only. */
  usageProfile: ChangeDataCaptureUsageProfile;
  /** The immutable resource ID of an enabled change data capture destination under the same cluster. */
  destinationResourceId: string;
  /** A service-generated identifier for the logical stream, represented as an RFC 4122 GUID. This value remains stable when a writer role moves and the service materializes a replacement ARM resource under the new writer cluster. */
  readonly logicalStreamId: string;
  /** The requested configuration state. */
  desiredState: ChangeDataCaptureDesiredState;
  /** The current effective configuration state. */
  readonly effectiveState: ChangeDataCaptureEffectiveState;
  /** The provisioning state of the latest configuration mutation. */
  readonly provisioningState?: ProvisioningState;
  /** The change data capture extension state for the enrolled database. */
  readonly extension: ChangeDataCaptureExtensionStatus;
  /** The known status of the destination-owned replication session. */
  readonly replication: ChangeDataCaptureReplicationStatus;
  /** The current writer-topology binding for this logical stream. */
  readonly topology: ChangeDataCaptureTopologyBindingStatus;
  /** Customer-safe health information for the configuration. */
  readonly status: ChangeDataCaptureStatus;
}

export function changeDataCaptureConfigurationPropertiesSerializer(
  item: ChangeDataCaptureConfigurationProperties,
): any {
  return {
    databaseName: item["databaseName"],
    usageProfile: item["usageProfile"],
    destinationResourceId: item["destinationResourceId"],
    desiredState: item["desiredState"],
  };
}

export function changeDataCaptureConfigurationPropertiesDeserializer(
  item: any,
): ChangeDataCaptureConfigurationProperties {
  return {
    databaseName: item["databaseName"],
    usageProfile: item["usageProfile"],
    destinationResourceId: item["destinationResourceId"],
    logicalStreamId: item["logicalStreamId"],
    desiredState: item["desiredState"],
    effectiveState: item["effectiveState"],
    provisioningState: item["provisioningState"],
    extension: changeDataCaptureExtensionStatusDeserializer(item["extension"]),
    replication: changeDataCaptureReplicationStatusDeserializer(item["replication"]),
    topology: changeDataCaptureTopologyBindingStatusDeserializer(item["topology"]),
    status: changeDataCaptureStatusDeserializer(item["status"]),
  };
}

/** The reason that a change data capture configuration exists. */
export enum KnownChangeDataCaptureUsageProfile {
  /** The configuration publishes database changes for Microsoft Fabric Mirroring. */
  Mirroring = "Mirroring",
}

/**
 * The reason that a change data capture configuration exists. \
 * {@link KnownChangeDataCaptureUsageProfile} can be used interchangeably with ChangeDataCaptureUsageProfile,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mirroring**: The configuration publishes database changes for Microsoft Fabric Mirroring.
 */
export type ChangeDataCaptureUsageProfile = string;

/** The destination-owned replication-session status known to HorizonDB. */
export interface ChangeDataCaptureReplicationStatus {
  /** The current replication-session state. */
  readonly state: ChangeDataCaptureReplicationState;
  /** An opaque identifier of a destination-owned artifact, such as a Microsoft Fabric mirrored-database item. HorizonDB does not create, update, or delete the identified artifact. */
  readonly externalArtifactId?: string;
  /** The date and time, in UTC, when a destination session most recently connected. */
  readonly lastConnectedAtUtc?: Date;
}

export function changeDataCaptureReplicationStatusDeserializer(
  item: any,
): ChangeDataCaptureReplicationStatus {
  return {
    state: item["state"],
    externalArtifactId: item["externalArtifactId"],
    lastConnectedAtUtc: !item["lastConnectedAtUtc"]
      ? item["lastConnectedAtUtc"]
      : new Date(item["lastConnectedAtUtc"]),
  };
}

/** The state of a destination-owned replication session. */
export enum KnownChangeDataCaptureReplicationState {
  /** A destination session does not apply to the current resource state. */
  NotApplicable = "NotApplicable",
  /** No destination session is connected. */
  NotConnected = "NotConnected",
  /** A destination session is connecting. */
  Connecting = "Connecting",
  /** A destination session is replicating changes. */
  Replicating = "Replicating",
  /** A destination session is reconnecting after an interruption. */
  Reconnecting = "Reconnecting",
  /** The destination session is paused. */
  Paused = "Paused",
  /** The destination session is stopping. */
  Stopping = "Stopping",
  /** The destination session is operating with impaired health. */
  Degraded = "Degraded",
  /** The destination session failed. */
  Failed = "Failed",
}

/**
 * The state of a destination-owned replication session. \
 * {@link KnownChangeDataCaptureReplicationState} can be used interchangeably with ChangeDataCaptureReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: A destination session does not apply to the current resource state. \
 * **NotConnected**: No destination session is connected. \
 * **Connecting**: A destination session is connecting. \
 * **Replicating**: A destination session is replicating changes. \
 * **Reconnecting**: A destination session is reconnecting after an interruption. \
 * **Paused**: The destination session is paused. \
 * **Stopping**: The destination session is stopping. \
 * **Degraded**: The destination session is operating with impaired health. \
 * **Failed**: The destination session failed.
 */
export type ChangeDataCaptureReplicationState = string;

/** The current writer-topology binding of a change data capture configuration. */
export interface ChangeDataCaptureTopologyBindingStatus {
  /** The configuration's relationship to the current writer topology. */
  readonly state: ChangeDataCaptureTopologyBindingState;
  /** A monotonically increasing topology generation for this logical stream. */
  readonly generation: number;
  /** The Azure resource ID of the cluster that currently owns the active configuration projection. */
  readonly activeClusterResourceId: string;
  /** The replacement configuration resource ID when this projection has been superseded or requires rebinding. */
  readonly replacementConfigurationResourceId?: string;
}

export function changeDataCaptureTopologyBindingStatusDeserializer(
  item: any,
): ChangeDataCaptureTopologyBindingStatus {
  return {
    state: item["state"],
    generation: item["generation"],
    activeClusterResourceId: item["activeClusterResourceId"],
    replacementConfigurationResourceId: item["replacementConfigurationResourceId"],
  };
}

/** The relationship of a change data capture configuration to the current writer topology. */
export enum KnownChangeDataCaptureTopologyBindingState {
  /** The configuration belongs to the current active writer. */
  Active = "Active",
  /** The service is reconciling the configuration after a writer change. */
  Reconciling = "Reconciling",
  /** The destination session must bind to a replacement configuration resource ID. */
  RebindRequired = "RebindRequired",
  /** The configuration belongs to a former writer and has been replaced. */
  Superseded = "Superseded",
  /** Equivalent change data capture state could not be materialized without overwriting unrelated state. */
  Conflict = "Conflict",
}

/**
 * The relationship of a change data capture configuration to the current writer topology. \
 * {@link KnownChangeDataCaptureTopologyBindingState} can be used interchangeably with ChangeDataCaptureTopologyBindingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The configuration belongs to the current active writer. \
 * **Reconciling**: The service is reconciling the configuration after a writer change. \
 * **RebindRequired**: The destination session must bind to a replacement configuration resource ID. \
 * **Superseded**: The configuration belongs to a former writer and has been replaced. \
 * **Conflict**: Equivalent change data capture state could not be materialized without overwriting unrelated state.
 */
export type ChangeDataCaptureTopologyBindingState = string;

/** A sparse update request for a change data capture configuration. */
export interface ChangeDataCaptureConfigurationForPatchUpdate {
  /** The configuration properties to update. */
  properties?: ChangeDataCaptureConfigurationPropertiesForPatchUpdate;
}

export function changeDataCaptureConfigurationForPatchUpdateSerializer(
  item: ChangeDataCaptureConfigurationForPatchUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureConfigurationPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating a change data capture configuration. Omitted properties preserve their current values. */
export interface ChangeDataCaptureConfigurationPropertiesForPatchUpdate {
  /** The requested configuration state. */
  desiredState?: ChangeDataCaptureDesiredState;
}

export function changeDataCaptureConfigurationPropertiesForPatchUpdateSerializer(
  item: ChangeDataCaptureConfigurationPropertiesForPatchUpdate,
): any {
  return { desiredState: item["desiredState"] };
}

/** The response of a ChangeDataCaptureConfiguration list operation. */
export interface _ChangeDataCaptureConfigurationListResult {
  /** The ChangeDataCaptureConfiguration items on this page */
  value: ChangeDataCaptureConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _changeDataCaptureConfigurationListResultDeserializer(
  item: any,
): _ChangeDataCaptureConfigurationListResult {
  return {
    value: changeDataCaptureConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function changeDataCaptureConfigurationArraySerializer(
  result: Array<ChangeDataCaptureConfiguration>,
): any[] {
  return result.map((item) => {
    return changeDataCaptureConfigurationSerializer(item);
  });
}

export function changeDataCaptureConfigurationArrayDeserializer(
  result: Array<ChangeDataCaptureConfiguration>,
): any[] {
  return result.map((item) => {
    return changeDataCaptureConfigurationDeserializer(item);
  });
}

/** Represents a service-generated, service-managed HorizonDB endpoint. The Cluster-scoped Endpoint is created and deleted with its parent Cluster. A Pool-scoped Endpoint is created and deleted with the Pool identified by associatedResourceId. Endpoints cannot be created or deleted independently from their lifecycle owner. */
export interface Endpoint extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EndpointProperties;
}

export function endpointDeserializer(item: any): Endpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : endpointPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a service-generated HorizonDB endpoint. */
export interface EndpointProperties {
  /** The scope of the endpoint. Cluster-scoped Endpoints provide the cluster connection, and Pool-scoped Endpoints provide read-only connections to eligible nodes in one pool. */
  readonly scope: EndpointScope;
  /** The Azure resource ID of the Endpoint's lifecycle owner. For Cluster scope, this identifies the parent Cluster with which the Endpoint is created and deleted. For Pool scope, this identifies the Pool with which the Endpoint is created and deleted; the Pool must be a child of the Endpoint's parent Cluster. */
  readonly associatedResourceId: string;
  /** The service-generated fully qualified domain name of the endpoint. A Cluster-scoped Endpoint uses <cluster>.<clusterid>.<region>.horizondb.azure.com. A Pool-scoped Endpoint uses <poolid>.<cluster>.<clusterid>.<region>.horizondb.azure.com. */
  readonly fullyQualifiedDomainName: string;
  /** The routing role of the endpoint. A Cluster-scoped Endpoint normally has the ReadWrite role. Pool-scoped Endpoints have the ReadOnly role and route only to allocated nodes in the associated Pool that are not currently playing the read-write role. A Pool-scoped ReadOnly Endpoint has no routing destination unless at least one such node exists, including when the Pool is Stopped, has zero allocated nodes, or has only one allocated node and that node is playing the read-write role. */
  readonly role: EndpointRole;
}

export function endpointPropertiesDeserializer(item: any): EndpointProperties {
  return {
    scope: item["scope"],
    associatedResourceId: item["associatedResourceId"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    role: item["role"],
  };
}

/** The scope of a HorizonDB endpoint. */
export enum KnownEndpointScope {
  /** The Endpoint is associated with its parent Cluster. */
  Cluster = "Cluster",
  /** The Endpoint is associated with a Pool under its parent Cluster and has the ReadOnly role. */
  Pool = "Pool",
}

/**
 * The scope of a HorizonDB endpoint. \
 * {@link KnownEndpointScope} can be used interchangeably with EndpointScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cluster**: The Endpoint is associated with its parent Cluster. \
 * **Pool**: The Endpoint is associated with a Pool under its parent Cluster and has the ReadOnly role.
 */
export type EndpointScope = string;

/** Role of the endpoint. */
export enum KnownEndpointRole {
  /** The Endpoint accepts read-only traffic. This applies to Pool-scoped Endpoints and may apply to other endpoint scenarios introduced by later API versions. */
  ReadOnly = "ReadOnly",
  /** The Cluster-scoped Endpoint accepts read and write traffic. */
  ReadWrite = "ReadWrite",
}

/**
 * Role of the endpoint. \
 * {@link KnownEndpointRole} can be used interchangeably with EndpointRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadOnly**: The Endpoint accepts read-only traffic. This applies to Pool-scoped Endpoints and may apply to other endpoint scenarios introduced by later API versions. \
 * **ReadWrite**: The Cluster-scoped Endpoint accepts read and write traffic.
 */
export type EndpointRole = string;

/** The response of a Endpoint list operation. */
export interface _EndpointListResult {
  /** The Endpoint items on this page */
  value: Endpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _endpointListResultDeserializer(item: any): _EndpointListResult {
  return {
    value: endpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function endpointArrayDeserializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointDeserializer(item);
  });
}

/** Represents a maintenance event for a HorizonDB pool. */
export interface MaintenanceEvent extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MaintenanceEventProperties;
}

export function maintenanceEventDeserializer(item: any): MaintenanceEvent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : maintenanceEventPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a maintenance event resource. */
export interface MaintenanceEventProperties {
  /** A service-generated identifier for this maintenance event, assigned by the platform. The format is not contractual, and clients should not attempt to parse or construct this value. */
  readonly maintenanceEventId?: string;
  /** The maintenance type. */
  readonly maintenanceType: MaintenanceType;
  /** The human-readable description of the maintenance event. */
  readonly description?: string;
  /** The customer-facing status of the maintenance event. */
  readonly status: MaintenanceEventStatus;
  /** The scheduled start time of the maintenance event in UTC. */
  readonly startTimeUtc: Date;
  /** The scheduled end time of the maintenance event in UTC. */
  readonly endTimeUtc: Date;
  /** The estimated downtime as an ISO 8601 duration string, for example, 'PT60S' for 60 seconds. */
  readonly estimatedDowntime?: string;
  /** Indicates whether the customer can reschedule this maintenance event. */
  readonly deferrable: boolean;
  /** The latest date and time to which this maintenance event can be postponed, in UTC. This property is present only when deferrable is true. */
  readonly deferralDeadlineUtc?: Date;
  /** The scheduled start time before the most recent reschedule, in UTC. This property is absent if the event has never been rescheduled. */
  readonly rescheduledFromUtc?: Date;
  /** The time when this maintenance event record was last updated, in UTC. */
  readonly lastUpdatedTimeUtc?: Date;
  /** The initially scheduled start time before any reschedule, in UTC. This value equals startTimeUtc when the event has never been rescheduled. */
  readonly originalStartTimeUtc: Date;
}

export function maintenanceEventPropertiesDeserializer(item: any): MaintenanceEventProperties {
  return {
    maintenanceEventId: item["maintenanceEventId"],
    maintenanceType: item["maintenanceType"],
    description: item["description"],
    status: item["status"],
    startTimeUtc: new Date(item["startTimeUtc"]),
    endTimeUtc: new Date(item["endTimeUtc"]),
    estimatedDowntime: item["estimatedDowntime"],
    deferrable: item["deferrable"],
    deferralDeadlineUtc: !item["deferralDeadlineUtc"]
      ? item["deferralDeadlineUtc"]
      : new Date(item["deferralDeadlineUtc"]),
    rescheduledFromUtc: !item["rescheduledFromUtc"]
      ? item["rescheduledFromUtc"]
      : new Date(item["rescheduledFromUtc"]),
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : new Date(item["lastUpdatedTimeUtc"]),
    originalStartTimeUtc: new Date(item["originalStartTimeUtc"]),
  };
}

/** The type of a maintenance event. */
export enum KnownMaintenanceType {
  /** A planned maintenance event. */
  PlannedMaintenance = "PlannedMaintenance",
}

/**
 * The type of a maintenance event. \
 * {@link KnownMaintenanceType} can be used interchangeably with MaintenanceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PlannedMaintenance**: A planned maintenance event.
 */
export type MaintenanceType = string;

/** The status of a maintenance event. */
export enum KnownMaintenanceEventStatus {
  /** The maintenance event is scheduled and has not yet started. */
  Planned = "Planned",
  /** The maintenance event is currently in progress. */
  InProgress = "InProgress",
  /** The maintenance event completed successfully. */
  Complete = "Complete",
  /** The customer rescheduled the maintenance event. */
  Rescheduled = "Rescheduled",
  /** The maintenance event was canceled, failed, or timed out. */
  Canceled = "Canceled",
}

/**
 * The status of a maintenance event. \
 * {@link KnownMaintenanceEventStatus} can be used interchangeably with MaintenanceEventStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Planned**: The maintenance event is scheduled and has not yet started. \
 * **InProgress**: The maintenance event is currently in progress. \
 * **Complete**: The maintenance event completed successfully. \
 * **Rescheduled**: The customer rescheduled the maintenance event. \
 * **Canceled**: The maintenance event was canceled, failed, or timed out.
 */
export type MaintenanceEventStatus = string;

/** The response of a MaintenanceEvent list operation. */
export interface _MaintenanceEventListResult {
  /** The MaintenanceEvent items on this page */
  value: MaintenanceEvent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _maintenanceEventListResultDeserializer(item: any): _MaintenanceEventListResult {
  return {
    value: maintenanceEventArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function maintenanceEventArrayDeserializer(result: Array<MaintenanceEvent>): any[] {
  return result.map((item) => {
    return maintenanceEventDeserializer(item);
  });
}

/** Parameters for rescheduling a maintenance event. */
export interface MaintenanceEventRescheduleRequest {
  /** The new start time in RFC 3339 format. */
  postponeToDateTimeUtc: Date;
}

export function maintenanceEventRescheduleRequestSerializer(
  item: MaintenanceEventRescheduleRequest,
): any {
  return { postponeToDateTimeUtc: item["postponeToDateTimeUtc"].toISOString() };
}

/** The response from a maintenance event reschedule or apply-now action. */
export interface MaintenanceEventActionResponse {
  /** The maintenance event identifier. */
  maintenanceEventId?: string;
  /** The full Azure resource ID of the HorizonDB pool. */
  poolResourceId?: string;
  /** The status of the maintenance event. */
  status?: MaintenanceEventStatus;
  /** The planned start time of the maintenance event in UTC. */
  plannedStartTimeUtc?: Date;
  /** The planned end time of the maintenance event in UTC. */
  plannedEndTimeUtc?: Date;
  /** Indicates whether the maintenance event was requested to be applied immediately. The value is true for apply-now and false for reschedule. */
  appliedNow?: boolean;
  /** The time when this maintenance event record was last updated, in UTC. */
  lastUpdatedTimeUtc?: Date;
}

export function maintenanceEventActionResponseDeserializer(
  item: any,
): MaintenanceEventActionResponse {
  return {
    maintenanceEventId: item["maintenanceEventId"],
    poolResourceId: item["poolResourceId"],
    status: item["status"],
    plannedStartTimeUtc: !item["plannedStartTimeUtc"]
      ? item["plannedStartTimeUtc"]
      : new Date(item["plannedStartTimeUtc"]),
    plannedEndTimeUtc: !item["plannedEndTimeUtc"]
      ? item["plannedEndTimeUtc"]
      : new Date(item["plannedEndTimeUtc"]),
    appliedNow: item["appliedNow"],
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : new Date(item["lastUpdatedTimeUtc"]),
  };
}

/** A service-managed node allocated to a HorizonDB pool. */
export interface Node extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: NodeProperties;
}

export function nodeDeserializer(item: any): Node {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : nodePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a service-managed HorizonDB node. */
export interface NodeProperties {
  /** The current role performed by the node within its pool. */
  readonly role: NodeRole;
  /** The availability zone in which the node is deployed. */
  readonly availabilityZone: string;
}

export function nodePropertiesDeserializer(item: any): NodeProperties {
  return {
    role: item["role"],
    availabilityZone: item["availabilityZone"],
  };
}

/** The role performed by a node within its HorizonDB pool. */
export enum KnownNodeRole {
  /** The node accepts read and write traffic for its cluster. */
  ReadWrite = "ReadWrite",
  /** The node accepts read-only traffic. */
  ReadOnly = "ReadOnly",
  /** The node is not currently assigned a read-write or read-only role. */
  Unassigned = "Unassigned",
}

/**
 * The role performed by a node within its HorizonDB pool. \
 * {@link KnownNodeRole} can be used interchangeably with NodeRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadWrite**: The node accepts read and write traffic for its cluster. \
 * **ReadOnly**: The node accepts read-only traffic. \
 * **Unassigned**: The node is not currently assigned a read-write or read-only role.
 */
export type NodeRole = string;

/** The response of a Node list operation. */
export interface _NodeListResult {
  /** The Node items on this page */
  value: Node[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nodeListResultDeserializer(item: any): _NodeListResult {
  return {
    value: nodeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nodeArrayDeserializer(result: Array<Node>): any[] {
  return result.map((item) => {
    return nodeDeserializer(item);
  });
}

/** A predefined log capture configuration created by the service for a HorizonDB cluster. */
export interface LogCaptureConfiguration extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: LogCaptureConfigurationProperties;
}

export function logCaptureConfigurationDeserializer(item: any): LogCaptureConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : logCaptureConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** The settings for capturing a specific type of HorizonDB log. */
export interface LogCaptureConfigurationProperties {
  /** Specifies whether HorizonDB captures this type of log. Disabling capture stops the production of new log files; existing files remain available until their retention period expires. */
  state: LogCaptureState;
  /** The number of days captured log files are retained. */
  retentionDays: number;
  /** The provisioning state of the log capture configuration. */
  readonly provisioningState?: ProvisioningState;
}

export function logCaptureConfigurationPropertiesDeserializer(
  item: any,
): LogCaptureConfigurationProperties {
  return {
    state: item["state"],
    retentionDays: item["retentionDays"],
    provisioningState: item["provisioningState"],
  };
}

/** Specifies whether HorizonDB captures log files. */
export enum KnownLogCaptureState {
  /** Log capture is enabled. */
  Enabled = "Enabled",
  /** Log capture is disabled. */
  Disabled = "Disabled",
}

/**
 * Specifies whether HorizonDB captures log files. \
 * {@link KnownLogCaptureState} can be used interchangeably with LogCaptureState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Log capture is enabled. \
 * **Disabled**: Log capture is disabled.
 */
export type LogCaptureState = string;

/** A sparse update request for a log capture configuration. */
export interface LogCaptureConfigurationForPatchUpdate {
  /** The log capture properties to update. */
  properties?: LogCaptureConfigurationPropertiesForPatchUpdate;
}

export function logCaptureConfigurationForPatchUpdateSerializer(
  item: LogCaptureConfigurationForPatchUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : logCaptureConfigurationPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating the log capture configuration. Omitted properties preserve their current values. */
export interface LogCaptureConfigurationPropertiesForPatchUpdate {
  /** Specifies whether HorizonDB captures this type of log. Disabling capture stops the production of new log files; existing files remain available until their retention period expires. */
  state?: LogCaptureState;
  /** The number of days captured log files are retained. */
  retentionDays?: number;
}

export function logCaptureConfigurationPropertiesForPatchUpdateSerializer(
  item: LogCaptureConfigurationPropertiesForPatchUpdate,
): any {
  return { state: item["state"], retentionDays: item["retentionDays"] };
}

/** The response of a LogCaptureConfiguration list operation. */
export interface _LogCaptureConfigurationListResult {
  /** The LogCaptureConfiguration items on this page */
  value: LogCaptureConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logCaptureConfigurationListResultDeserializer(
  item: any,
): _LogCaptureConfigurationListResult {
  return {
    value: logCaptureConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logCaptureConfigurationArrayDeserializer(
  result: Array<LogCaptureConfiguration>,
): any[] {
  return result.map((item) => {
    return logCaptureConfigurationDeserializer(item);
  });
}

/** A service-generated log file captured for a HorizonDB cluster. */
export interface LogFile extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: LogFileProperties;
}

export function logFileDeserializer(item: any): LogFile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : logFilePropertiesDeserializer(item["properties"]),
  };
}

/** Metadata for a service-generated HorizonDB log file. */
export interface LogFileProperties {
  /** The type of the captured log file. */
  readonly logType: LogFileType;
  /** The date and time when the log file was created, in UTC. */
  readonly createdAtUtc: Date;
  /** The date and time when the log file was last modified, in UTC. */
  readonly lastModifiedAtUtc: Date;
  /** The date and time when the log file expires according to its retention period, in UTC. */
  readonly retentionExpiresAtUtc: Date;
  /** Whether the platform can still append to or otherwise modify the log file. */
  readonly isMutable: boolean;
  /** The size of the log file in kilobytes, where one kilobyte is 1024 bytes. */
  readonly sizeInKilobytes: number;
  /** The name of the HorizonDB pool that the node generating the log file belongs to. */
  readonly pool: string;
  /** The node that generated the log file in the HorizonDB cluster. */
  readonly node: string;
  /** The role performed by the node that generated the log file. */
  readonly role: NodeRole;
}

export function logFilePropertiesDeserializer(item: any): LogFileProperties {
  return {
    logType: item["logType"],
    createdAtUtc: new Date(item["createdAtUtc"]),
    lastModifiedAtUtc: new Date(item["lastModifiedAtUtc"]),
    retentionExpiresAtUtc: new Date(item["retentionExpiresAtUtc"]),
    isMutable: item["isMutable"],
    sizeInKilobytes: item["sizeInKilobytes"],
    pool: item["pool"],
    node: item["node"],
    role: item["role"],
  };
}

/** The type of a captured HorizonDB log file. */
export enum KnownLogFileType {
  /** A PostgreSQL server log file. */
  PostgreSqlServer = "PostgreSqlServer",
}

/**
 * The type of a captured HorizonDB log file. \
 * {@link KnownLogFileType} can be used interchangeably with LogFileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PostgreSqlServer**: A PostgreSQL server log file.
 */
export type LogFileType = string;

/** The response of a LogFile list operation. */
export interface _LogFileListResult {
  /** The LogFile items on this page */
  value: LogFile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logFileListResultDeserializer(item: any): _LogFileListResult {
  return {
    value: logFileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logFileArrayDeserializer(result: Array<LogFile>): any[] {
  return result.map((item) => {
    return logFileDeserializer(item);
  });
}

/** A short-lived signed URL for downloading a captured log file. */
export interface LogFileDownloadUrl {
  /** A short-lived signed URL from which the original log file can be downloaded. */
  downloadUri: string;
  /** The date and time when the signed download URL expires, in UTC. */
  expiresAtUtc: Date;
}

export function logFileDownloadUrlDeserializer(item: any): LogFileDownloadUrl {
  return {
    downloadUri: item["downloadUri"],
    expiresAtUtc: new Date(item["expiresAtUtc"]),
  };
}

/** A sparse update request for a log capture configuration. */
export interface LogCaptureConfigurationForPatchUpdateUpdate {
  /** The log capture properties to update. */
  properties?: LogCaptureConfigurationPropertiesForPatchUpdateUpdate;
}

export function logCaptureConfigurationForPatchUpdateUpdateSerializer(
  item: LogCaptureConfigurationForPatchUpdateUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : logCaptureConfigurationPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating the log capture configuration. Omitted properties preserve their current values. */
export interface LogCaptureConfigurationPropertiesForPatchUpdateUpdate {
  /** Specifies whether HorizonDB captures this type of log. Disabling capture stops the production of new log files; existing files remain available until their retention period expires. */
  state?: LogCaptureState;
  /** The number of days captured log files are retained. */
  retentionDays?: number;
}

export function logCaptureConfigurationPropertiesForPatchUpdateUpdateSerializer(
  item: LogCaptureConfigurationPropertiesForPatchUpdateUpdate,
): any {
  return { state: item["state"], retentionDays: item["retentionDays"] };
}

/** A HorizonDB database enrollment for Microsoft Fabric Mirroring. */
export interface ChangeDataCaptureConfigurationCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureConfigurationPropertiesCreateOrUpdate;
}

export function changeDataCaptureConfigurationCreateOrUpdateSerializer(
  item: ChangeDataCaptureConfigurationCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureConfigurationPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** The properties of a Microsoft Fabric Mirroring configuration. */
export interface ChangeDataCaptureConfigurationPropertiesCreateOrUpdate {
  /** The exact PostgreSQL database name enrolled in this logical stream. This value is immutable. */
  databaseName: string;
  /** The immutable usage profile. API version 2026-10-01-preview accepts Mirroring only. */
  usageProfile: ChangeDataCaptureUsageProfile;
  /** The immutable resource ID of an enabled change data capture destination under the same cluster. */
  destinationResourceId: string;
  /** The requested configuration state. */
  desiredState: ChangeDataCaptureDesiredState;
}

export function changeDataCaptureConfigurationPropertiesCreateOrUpdateSerializer(
  item: ChangeDataCaptureConfigurationPropertiesCreateOrUpdate,
): any {
  return {
    databaseName: item["databaseName"],
    usageProfile: item["usageProfile"],
    destinationResourceId: item["destinationResourceId"],
    desiredState: item["desiredState"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResourceCreateOrUpdate extends ResourceCreateOrUpdate {}

export function proxyResourceCreateOrUpdateSerializer(_item: ProxyResourceCreateOrUpdate): any {
  return {};
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface ResourceCreateOrUpdate {}

export function resourceCreateOrUpdateSerializer(_item: ResourceCreateOrUpdate): any {
  return {};
}

/** A sparse update request for a change data capture configuration. */
export interface ChangeDataCaptureConfigurationForPatchUpdateUpdate {
  /** The configuration properties to update. */
  properties?: ChangeDataCaptureConfigurationPropertiesForPatchUpdateUpdate;
}

export function changeDataCaptureConfigurationForPatchUpdateUpdateSerializer(
  item: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureConfigurationPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating a change data capture configuration. Omitted properties preserve their current values. */
export interface ChangeDataCaptureConfigurationPropertiesForPatchUpdateUpdate {
  /** The requested configuration state. */
  desiredState?: ChangeDataCaptureDesiredState;
}

export function changeDataCaptureConfigurationPropertiesForPatchUpdateUpdateSerializer(
  item: ChangeDataCaptureConfigurationPropertiesForPatchUpdateUpdate,
): any {
  return { desiredState: item["desiredState"] };
}

/** A user-assigned managed identity authorized for a HorizonDB change data capture destination. */
export interface IdentityAssignmentCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureIdentityAssignmentPropertiesCreateOrUpdate;
}

export function identityAssignmentCreateOrUpdateSerializer(
  item: IdentityAssignmentCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureIdentityAssignmentPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** The properties of a change data capture identity assignment. */
export interface ChangeDataCaptureIdentityAssignmentPropertiesCreateOrUpdate {
  /** The immutable resource ID of the user-assigned managed identity selected for this destination. The ID must exactly match a key in the parent cluster's top-level identity.userAssignedIdentities dictionary; otherwise creation is rejected. Attaching the identity to the cluster does not grant destination access, so required role assignments must be configured separately. Resubmitting the same value is accepted; changing it requires deleting and recreating the assignment. */
  identityResourceId: string;
}

export function changeDataCaptureIdentityAssignmentPropertiesCreateOrUpdateSerializer(
  item: ChangeDataCaptureIdentityAssignmentPropertiesCreateOrUpdate,
): any {
  return { identityResourceId: item["identityResourceId"] };
}

/** A reusable Microsoft Fabric destination for HorizonDB change data capture configurations. */
export interface ChangeDataCaptureDestinationCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureDestinationPropertiesCreateOrUpdate;
}

export function changeDataCaptureDestinationCreateOrUpdateSerializer(
  item: ChangeDataCaptureDestinationCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureDestinationPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** The properties of a Microsoft Fabric change data capture destination. */
export interface ChangeDataCaptureDestinationPropertiesCreateOrUpdate {
  /** The immutable Microsoft Fabric destination settings. Resubmitting the same values is accepted; changing them requires deleting and recreating the destination. */
  destination: ChangeDataCaptureDestinationDetailsUnion;
  /** The requested destination state. */
  desiredState: ChangeDataCaptureDesiredState;
}

export function changeDataCaptureDestinationPropertiesCreateOrUpdateSerializer(
  item: ChangeDataCaptureDestinationPropertiesCreateOrUpdate,
): any {
  return {
    destination: changeDataCaptureDestinationDetailsUnionSerializer(item["destination"]),
    desiredState: item["desiredState"],
  };
}

/** A sparse update request for a change data capture destination. */
export interface ChangeDataCaptureDestinationForPatchUpdateUpdate {
  /** The destination properties to update. */
  properties?: ChangeDataCaptureDestinationPropertiesForPatchUpdateUpdate;
}

export function changeDataCaptureDestinationForPatchUpdateUpdateSerializer(
  item: ChangeDataCaptureDestinationForPatchUpdateUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureDestinationPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating a change data capture destination. Omitted properties preserve their current values. */
export interface ChangeDataCaptureDestinationPropertiesForPatchUpdateUpdate {
  /** The requested destination state. */
  desiredState?: ChangeDataCaptureDesiredState;
}

export function changeDataCaptureDestinationPropertiesForPatchUpdateUpdateSerializer(
  item: ChangeDataCaptureDestinationPropertiesForPatchUpdateUpdate,
): any {
  return { desiredState: item["desiredState"] };
}

/** The singleton change data capture capability for a HorizonDB cluster. */
export interface ChangeDataCaptureCapabilityCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ChangeDataCaptureCapabilityPropertiesCreateOrUpdate;
}

export function changeDataCaptureCapabilityCreateOrUpdateSerializer(
  item: ChangeDataCaptureCapabilityCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureCapabilityPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** The properties of the singleton change data capture capability. */
export interface ChangeDataCaptureCapabilityPropertiesCreateOrUpdate {
  /** The requested capability state. */
  desiredState: ChangeDataCaptureDesiredState;
  /** Whether HorizonDB may automatically upgrade the service-owned change data capture extension within the supported compatibility policy. */
  autoUpgradeExtension?: boolean;
}

export function changeDataCaptureCapabilityPropertiesCreateOrUpdateSerializer(
  item: ChangeDataCaptureCapabilityPropertiesCreateOrUpdate,
): any {
  return { desiredState: item["desiredState"], autoUpgradeExtension: item["autoUpgradeExtension"] };
}

/** A sparse update request for the singleton change data capture capability. */
export interface ChangeDataCaptureCapabilityForPatchUpdateUpdate {
  /** The capability properties to update. */
  properties?: ChangeDataCaptureCapabilityPropertiesForPatchUpdateUpdate;
}

export function changeDataCaptureCapabilityForPatchUpdateUpdateSerializer(
  item: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeDataCaptureCapabilityPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating the singleton change data capture capability. Omitted properties preserve their current values. */
export interface ChangeDataCaptureCapabilityPropertiesForPatchUpdateUpdate {
  /** The requested capability state. */
  desiredState?: ChangeDataCaptureDesiredState;
  /** Whether HorizonDB may automatically upgrade the service-owned change data capture extension within the supported compatibility policy. */
  autoUpgradeExtension?: boolean;
}

export function changeDataCaptureCapabilityPropertiesForPatchUpdateUpdateSerializer(
  item: ChangeDataCaptureCapabilityPropertiesForPatchUpdateUpdate,
): any {
  return { desiredState: item["desiredState"], autoUpgradeExtension: item["autoUpgradeExtension"] };
}

/** The service-created Microsoft Entra authentication method for a HorizonDB cluster. */
export interface MicrosoftEntraAuthenticationCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: MicrosoftEntraAuthenticationPropertiesCreateOrUpdate;
}

export function microsoftEntraAuthenticationCreateOrUpdateSerializer(
  item: MicrosoftEntraAuthenticationCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : microsoftEntraAuthenticationPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** Properties of the service-created Microsoft Entra authentication method. */
export interface MicrosoftEntraAuthenticationPropertiesCreateOrUpdate {
  /** The state of Microsoft Entra authentication. */
  state: AuthenticationState;
}

export function microsoftEntraAuthenticationPropertiesCreateOrUpdateSerializer(
  item: MicrosoftEntraAuthenticationPropertiesCreateOrUpdate,
): any {
  return { state: item["state"] };
}

/** A sparse update request for Microsoft Entra authentication. */
export interface MicrosoftEntraAuthenticationForPatchUpdateUpdate {
  /** The Microsoft Entra authentication properties to update. */
  properties?: MicrosoftEntraAuthenticationPropertiesForPatchUpdateUpdate;
}

export function microsoftEntraAuthenticationForPatchUpdateUpdateSerializer(
  item: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : microsoftEntraAuthenticationPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating Microsoft Entra authentication. State Enabled enables the feature and State Disabled disables it. Disabling Microsoft Entra authentication does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions. */
export interface MicrosoftEntraAuthenticationPropertiesForPatchUpdateUpdate {
  /** The target Microsoft Entra authentication state. Omission preserves the current state. */
  state?: AuthenticationState;
}

export function microsoftEntraAuthenticationPropertiesForPatchUpdateUpdateSerializer(
  item: MicrosoftEntraAuthenticationPropertiesForPatchUpdateUpdate,
): any {
  return { state: item["state"] };
}

/** The service-created PostgreSQL username-and-password authentication method for a HorizonDB cluster. This resource configures the authentication mechanism, including its enabled state and administrator login credentials; it is not a password-only resource. */
export interface PasswordAuthenticationCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: PasswordAuthenticationPropertiesCreateOrUpdate;
}

export function passwordAuthenticationCreateOrUpdateSerializer(
  item: PasswordAuthenticationCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : passwordAuthenticationPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** Properties of the service-created PostgreSQL username-and-password authentication method. */
export interface PasswordAuthenticationPropertiesCreateOrUpdate {
  /** The state of PostgreSQL username-and-password authentication. */
  state: AuthenticationState;
  /** The PostgreSQL administrator login name. This value is not returned in responses. After it is set, renaming is not supported. Setting the login requires password authentication state to be Enabled in the same request. */
  administratorLogin?: string;
  /** The PostgreSQL administrator password. Setting the password requires password authentication state to be Enabled in the same request. */
  administratorLoginPassword?: string;
}

export function passwordAuthenticationPropertiesCreateOrUpdateSerializer(
  item: PasswordAuthenticationPropertiesCreateOrUpdate,
): any {
  return {
    state: item["state"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
  };
}

/** A sparse update request for PostgreSQL username-and-password authentication. */
export interface PasswordAuthenticationForPatchUpdateUpdate {
  /** The PostgreSQL username-and-password authentication properties to update. */
  properties?: PasswordAuthenticationPropertiesForPatchUpdateUpdate;
}

export function passwordAuthenticationForPatchUpdateUpdateSerializer(
  item: PasswordAuthenticationForPatchUpdateUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : passwordAuthenticationPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties for updating PostgreSQL username-and-password authentication. Omitted properties preserve their current values. This API version supports enabling or disabling the authentication method, and resetting its password. Supported changes can be combined. */
export interface PasswordAuthenticationPropertiesForPatchUpdateUpdate {
  /** The target password-authentication state. Enabled can be combined with administratorLoginPassword to re-enable password authentication and reset the password for a cluster that already has an administrator. Disabling password authentication does not remove or modify existing database users or roles. Disabled cannot be combined with administratorLoginPassword. */
  state?: AuthenticationState;
  /** The PostgreSQL administrator password. Supplying this property resets the configured administrator's password. When password authentication is currently disabled for a cluster that already has an administrator, this property can be combined with state Enabled to re-enable password authentication and reset the password. */
  administratorLoginPassword?: string;
}

export function passwordAuthenticationPropertiesForPatchUpdateUpdateSerializer(
  item: PasswordAuthenticationPropertiesForPatchUpdateUpdate,
): any {
  return { state: item["state"], administratorLoginPassword: item["administratorLoginPassword"] };
}

/** Represents the HorizonDB parameter group. */
export interface ParameterGroupCreateOrUpdate extends TrackedResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ParameterGroupPropertiesCreateOrUpdate;
}

export function parameterGroupCreateOrUpdateSerializer(item: ParameterGroupCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : parameterGroupPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDB parameter group. */
export interface ParameterGroupPropertiesCreateOrUpdate {
  /** Parameters in the parameter group. */
  parameters?: ParameterPropertiesCreateOrUpdate[];
  /** Description of the parameter group. The maximum length is 1024 characters. */
  description?: string;
  /** The PostgreSQL major version for the parameter group. This property is required during creation and is immutable thereafter. The service selects the unique location-scoped default parameter group for this version in the resource location. The DefaultParameterGroups APIs return at most one default parameter group for each PostgreSQL version in a location, so this selection is unambiguous. */
  postgreSqlVersion: PostgreSqlVersion;
}

export function parameterGroupPropertiesCreateOrUpdateSerializer(
  item: ParameterGroupPropertiesCreateOrUpdate,
): any {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesCreateOrUpdateArraySerializer(item["parameters"]),
    description: item["description"],
    postgreSqlVersion: item["postgreSqlVersion"],
  };
}

export function parameterPropertiesCreateOrUpdateArraySerializer(
  result: Array<ParameterPropertiesCreateOrUpdate>,
): any[] {
  return result.map((item) => {
    return parameterPropertiesCreateOrUpdateSerializer(item);
  });
}

/** Properties of a HorizonDB parameter. */
export interface ParameterPropertiesCreateOrUpdate {
  /** The name of the parameter. */
  name?: string;
  /** The value of the configuration. */
  value?: string;
}

export function parameterPropertiesCreateOrUpdateSerializer(
  item: ParameterPropertiesCreateOrUpdate,
): any {
  return { name: item["name"], value: item["value"] };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResourceCreateOrUpdate extends ResourceCreateOrUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceCreateOrUpdateSerializer(item: TrackedResourceCreateOrUpdate): any {
  return { tags: item["tags"], location: item["location"] };
}

/** HorizonDB parameter group for update operations. */
export interface ParameterGroupForPatchUpdateUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The properties that can be updated for a HorizonDB parameter group. */
  properties?: ParameterGroupPropertiesForPatchUpdateUpdate;
}

export function parameterGroupForPatchUpdateUpdateSerializer(
  item: ParameterGroupForPatchUpdateUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : parameterGroupPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDB parameter group for update operations. */
export interface ParameterGroupPropertiesForPatchUpdateUpdate {
  /** Parameters in the parameter group. */
  parameters?: ParameterPropertiesUpdate[];
  /** Description of the parameter group. The maximum length is 1024 characters. */
  description?: string;
}

export function parameterGroupPropertiesForPatchUpdateUpdateSerializer(
  item: ParameterGroupPropertiesForPatchUpdateUpdate,
): any {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesUpdateArraySerializer(item["parameters"]),
    description: item["description"],
  };
}

export function parameterPropertiesUpdateArraySerializer(
  result: Array<ParameterPropertiesUpdate>,
): any[] {
  return result.map((item) => {
    return parameterPropertiesUpdateSerializer(item);
  });
}

/** Properties of a HorizonDB parameter. */
export interface ParameterPropertiesUpdate {
  /** The name of the parameter. */
  name?: string;
  /** The value of the configuration. */
  value?: string;
}

export function parameterPropertiesUpdateSerializer(item: ParameterPropertiesUpdate): any {
  return { name: item["name"], value: item["value"] };
}

/** A private endpoint connection resource */
export interface PrivateEndpointConnectionResourceCreateOrUpdate extends ResourceCreateOrUpdate {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionPropertiesCreateOrUpdate;
}

export function privateEndpointConnectionResourceCreateOrUpdateSerializer(
  item: PrivateEndpointConnectionResourceCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionPropertiesCreateOrUpdate {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpointCreateOrUpdate;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesCreateOrUpdateSerializer(
  item: PrivateEndpointConnectionPropertiesCreateOrUpdate,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointCreateOrUpdateSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

/** The private endpoint resource. */
export interface PrivateEndpointCreateOrUpdate {}

export function privateEndpointCreateOrUpdateSerializer(_item: PrivateEndpointCreateOrUpdate): any {
  return {};
}

/** Represents a customer-managed firewall rule for a HorizonDB pool. */
export interface FirewallRuleCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRulePropertiesCreateOrUpdate;
}

export function firewallRuleCreateOrUpdateSerializer(item: FirewallRuleCreateOrUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : firewallRulePropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDB firewall rule. */
export interface FirewallRulePropertiesCreateOrUpdate {
  /** The start IPv4 address of the firewall rule in dotted-decimal notation. */
  startIpAddress: string;
  /** The end IPv4 address of the firewall rule in dotted-decimal notation. This address must be numerically greater than or equal to startIpAddress. */
  endIpAddress: string;
  /** The description of the HorizonDB firewall rule. The maximum length is 1024 characters. */
  description?: string;
}

export function firewallRulePropertiesCreateOrUpdateSerializer(
  item: FirewallRulePropertiesCreateOrUpdate,
): any {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
    description: item["description"],
  };
}

/** Represents the HorizonDB pool. */
export interface PoolCreateOrUpdate extends ProxyResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: PoolPropertiesCreateOrUpdate;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function poolCreateOrUpdateSerializer(item: PoolCreateOrUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : poolPropertiesCreateOrUpdateSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Properties of a HorizonDB pool. */
export interface PoolPropertiesCreateOrUpdate {
  /** The required compute model for the HorizonDB pool. */
  computeModel: PoolComputeModel;
  /** The required number of nodes to allocate and assign to the pool. Allowed values are 1 through 16. To deallocate runtime compute without changing the configured node count, stop the pool. */
  nodeCount: number;
  /** The required high-availability configuration for the pool. mode must be Disabled when nodeCount is 1, and must be AnyZone or ZoneRedundant when nodeCount is 2 through 16. */
  highAvailability: PoolHighAvailability;
  /** The required parameter group associated with the pool. When creating a new pool in this API version, the caller must supply the corresponding default parameter group; customer-created parameter groups are not accepted during creation. For an existing pool, PUT or PATCH can associate either the corresponding default parameter group or a customer-created parameter group. The create-visible shape intentionally supports both resource ID forms so a future API version can allow customer-created parameter groups during creation without a breaking schema change. */
  parameterGroup: PoolParameterGroupReferenceCreateOrUpdate;
  /** The scheduled maintenance configuration for the pool. The properties available depend on the selected maintenance management type. */
  scheduledMaintenance?: ScheduledMaintenancePropertiesUnion;
}

export function poolPropertiesCreateOrUpdateSerializer(item: PoolPropertiesCreateOrUpdate): any {
  return {
    computeModel: poolComputeModelSerializer(item["computeModel"]),
    nodeCount: item["nodeCount"],
    highAvailability: poolHighAvailabilitySerializer(item["highAvailability"]),
    parameterGroup: poolParameterGroupReferenceCreateOrUpdateSerializer(item["parameterGroup"]),
    scheduledMaintenance: !item["scheduledMaintenance"]
      ? item["scheduledMaintenance"]
      : scheduledMaintenancePropertiesUnionSerializer(item["scheduledMaintenance"]),
  };
}

/** A reference to the parameter group associated with a HorizonDB pool. The schema represents both default and customer-created parameter groups for create and update compatibility. In this API version, initial pool creation accepts only the corresponding default parameter group; PUT updates to an existing pool can associate either group type. */
export interface PoolParameterGroupReferenceCreateOrUpdate {
  /** The Azure resource ID of the associated parameter group. Initial pool creation in this API version requires the corresponding Microsoft.HorizonDb/locations/parameterGroups resource. For an existing pool, PUT can specify either the corresponding default group or a customer-created Microsoft.HorizonDb/parameterGroups resource. */
  parameterGroupResourceId: string;
  /** Determines when dynamic parameter changes from the associated parameter group become effective. Static parameter changes always require a customer-initiated pool Restart, regardless of this value. Stop followed by Start and scheduled maintenance do not apply pending parameter changes. */
  applyMethod: ParameterApplyMethod;
}

export function poolParameterGroupReferenceCreateOrUpdateSerializer(
  item: PoolParameterGroupReferenceCreateOrUpdate,
): any {
  return {
    parameterGroupResourceId: item["parameterGroupResourceId"],
    applyMethod: item["applyMethod"],
  };
}

/** HorizonDB pool for update operations. */
export interface PoolForPatchUpdateUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The properties that can be updated for a HorizonDB pool. */
  properties?: PoolPropertiesForPatchUpdateUpdate;
}

export function poolForPatchUpdateUpdateSerializer(item: PoolForPatchUpdateUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : poolPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDB pool for update operations. */
export interface PoolPropertiesForPatchUpdateUpdate {
  /** The compute model properties to update. Omitted properties preserve their current values. To change the compute model type, supply the complete target compute model, including type, computeProcessor, computeGeneration, and all properties required by the target type. */
  computeModel?: PoolComputeModelForPatchUpdateUpdate;
  /** The number of nodes to allocate and assign to the pool. Allowed values are 1 through 16. Omission preserves the current configured value. To deallocate runtime compute without changing the configured node count, stop the pool. */
  nodeCount?: number;
  /** The high-availability configuration to update. Omission preserves the current mode. The service recursively merges omitted PATCH properties with the existing resource before validating the effective nodeCount and mode together. */
  highAvailability?: PoolHighAvailabilityPatchUpdate;
  /** The corresponding default or a customer-created parameter group to associate with the existing pool. Customers can switch in either direction between these group types. Omission preserves the current association. */
  parameterGroup?: PoolParameterGroupReferenceForPatchUpdateUpdate;
  /** The scheduled maintenance configuration to update for the pool. When supplied, the complete configuration for the selected maintenance management type is required. Omission preserves the current configuration. */
  scheduledMaintenance?: ScheduledMaintenancePropertiesForPatchUpdateUpdate;
}

export function poolPropertiesForPatchUpdateUpdateSerializer(
  item: PoolPropertiesForPatchUpdateUpdate,
): any {
  return {
    computeModel: !item["computeModel"]
      ? item["computeModel"]
      : poolComputeModelForPatchUpdateUpdateSerializer(item["computeModel"]),
    nodeCount: item["nodeCount"],
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : poolHighAvailabilityPatchUpdateSerializer(item["highAvailability"]),
    parameterGroup: !item["parameterGroup"]
      ? item["parameterGroup"]
      : poolParameterGroupReferenceForPatchUpdateUpdateSerializer(item["parameterGroup"]),
    scheduledMaintenance: !item["scheduledMaintenance"]
      ? item["scheduledMaintenance"]
      : scheduledMaintenancePropertiesForPatchUpdateUpdateSerializer(item["scheduledMaintenance"]),
  };
}

/** The compute model properties of a HorizonDB pool that can be updated. The object is recursively mergeable: omitted properties preserve their current values. Properties that do not apply to the current or target compute model type are rejected. When type changes, the request must include the complete target compute model. Subtype-specific constraints are validated against the effective merged configuration; invalid requests are rejected without changing the resource. */
export interface PoolComputeModelForPatchUpdateUpdate {
  /** The compute model type. Omit this property to retain the current type. Resubmitting the current type succeeds as an idempotent no-op. To change the type, supply all common properties and all properties required by the target type. */
  type?: PoolComputeModelType;
  /** The processor type for the compute model. Omission preserves the current processor type. */
  computeProcessor?: ComputeProcessorType;
  /** The compute generation for the compute model. Omission preserves the current compute generation. */
  computeGeneration?: number;
  /** The number of provisioned vCores. Allowed values are 1 through 192. This property applies only to a Provisioned compute model. Omission preserves the current value. */
  vCores?: number;
}

export function poolComputeModelForPatchUpdateUpdateSerializer(
  item: PoolComputeModelForPatchUpdateUpdate,
): any {
  return {
    type: item["type"],
    computeProcessor: item["computeProcessor"],
    computeGeneration: item["computeGeneration"],
    vCores: item["vCores"],
  };
}

/** The high-availability configuration for a HorizonDB pool update. */
export interface PoolHighAvailabilityPatchUpdate {
  /** The high-availability mode. Omission preserves the current mode before the service validates it with the effective nodeCount. */
  mode?: PoolHighAvailabilityMode;
}

export function poolHighAvailabilityPatchUpdateSerializer(
  item: PoolHighAvailabilityPatchUpdate,
): any {
  return { mode: item["mode"] };
}

/** A parameter group reference for updating an existing HorizonDB pool. The pool can switch in either direction between its corresponding default parameter group and a customer-created parameter group. */
export interface PoolParameterGroupReferenceForPatchUpdateUpdate {
  /** The Azure resource ID of the corresponding default or customer-created parameter group to associate with the existing pool. */
  parameterGroupResourceId?: string;
  /** Determines when dynamic parameter changes from the associated parameter group become effective. Static parameter changes always require a customer-initiated pool Restart, regardless of this value. Stop followed by Start and scheduled maintenance do not apply pending parameter changes. */
  applyMethod?: ParameterApplyMethod;
}

export function poolParameterGroupReferenceForPatchUpdateUpdateSerializer(
  item: PoolParameterGroupReferenceForPatchUpdateUpdate,
): any {
  return {
    parameterGroupResourceId: item["parameterGroupResourceId"],
    applyMethod: item["applyMethod"],
  };
}

/** The scheduled maintenance configuration for a pool update operation. */
export interface ScheduledMaintenancePropertiesForPatchUpdateUpdate {
  /** Specifies whether scheduled maintenance is managed by the system or by the user. When scheduledMaintenance is supplied, this property is required by the service. */
  maintenanceManagementType?: ScheduledMaintenanceManagementType;
}

export function scheduledMaintenancePropertiesForPatchUpdateUpdateSerializer(
  item: ScheduledMaintenancePropertiesForPatchUpdateUpdate,
): any {
  return { maintenanceManagementType: item["maintenanceManagementType"] };
}

/** Represents the HorizonDB cluster. */
export interface ClusterCreateOrUpdate extends TrackedResourceCreateOrUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ClusterPropertiesCreateOrUpdate;
  /** The managed service identities assigned to this resource. Omitting the entire identity property from PUT or PATCH preserves all current assignments. When provided, PUT replaces the user-assigned identity set and PATCH merges it; null PATCH dictionary entries remove individual identities. Setting type to None clears all assignments. */
  identity?: HorizonDbClusterManagedServiceIdentityCreateOrUpdate;
}

export function clusterCreateOrUpdateSerializer(item: ClusterCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesCreateOrUpdateSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : horizonDbClusterManagedServiceIdentityCreateOrUpdateSerializer(item["identity"]),
  };
}

/** Properties of a HorizonDB cluster. */
export interface ClusterPropertiesCreateOrUpdate {
  /** The PostgreSQL major version used by the HorizonDB cluster. API version 2026-10-01-preview supports versions 17 and 18. For ordinary cluster creation, the version is supplied in the request and is immutable after creation. For point-in-time restore, the service obtains the version from the source backup metadata and the request must omit this property. This API version does not support in-place PostgreSQL major-version upgrades. */
  postgreSqlVersion?: PostgreSqlVersion;
  /** The mode used to create the cluster. When this property is omitted while creating a new cluster, the service records Create. PointInTimeRestore creates a new cluster from an available backup; pointInTimeUtc and creationSourceClusterResourceId are then required, postgreSqlVersion must be omitted because it is obtained from the backup metadata, and creationSourceClusterLocation is required when the source and target cluster locations differ. This property is immutable and is returned as creation provenance. On replacement, omission preserves the recorded value, resubmitting the same value is accepted, and changing it is rejected. */
  creationMode?: ClusterCreateMode;
  /** The requested point in time, in UTC. This property is required in every PointInTimeRestore request. For a same-location restore, the service restores the latest backup available at or before this value. For a cross-location restore, the service requires but ignores this value and restores the latest available backup; cross-location responses omit this property. This property must be absent for other creation modes or when creationMode is omitted and can only be specified during resource creation. */
  pointInTimeUtc?: Date;
  /** The Azure resource ID of the source HorizonDB cluster used by the selected creation mode. This property is required for PointInTimeRestore and other source-based creation modes, and must be absent when creationMode is Create or omitted. A source cluster does not need to have a pool to be restored, provided an available backup exists. This immutable creation-provenance value does not change after creation. */
  creationSourceClusterResourceId?: string;
  /** The Azure location of the source HorizonDB cluster used for point-in-time restore. This property is optional when the source and target cluster locations are the same. It is required when the source cluster location differs from the target cluster location and must identify the source cluster's location. This property must be absent for creation modes other than PointInTimeRestore or when creationMode is omitted. This immutable creation-provenance value does not change after creation. */
  creationSourceClusterLocation?: string;
  /** The network configuration for the cluster. When this object is omitted, the service defaults it to publicAccess Disabled. */
  network?: Network;
  /** The backup configuration for the cluster. */
  backup?: BackupPropertiesCreateOrUpdate;
  /** The data encryption configuration for the cluster. When omitted during initial cluster creation, the service uses SystemManaged encryption. When supplied during initial cluster creation, type is required. For PUT updates of an existing cluster, type may be omitted; if provided, it must match the existing encryption type. The encryption type is selected at cluster creation; switching between SystemManaged and AzureKeyVault after creation is not supported. */
  dataEncryption?: HorizonDbClusterDataEncryptionCreateOrUpdate;
  /** Specifies whether AI Model Management is enabled for the cluster. */
  aiModelManagement?: AiModelManagementStatus;
}

export function clusterPropertiesCreateOrUpdateSerializer(
  item: ClusterPropertiesCreateOrUpdate,
): any {
  return {
    postgreSqlVersion: item["postgreSqlVersion"],
    creationMode: item["creationMode"],
    pointInTimeUtc: !item["pointInTimeUtc"]
      ? item["pointInTimeUtc"]
      : item["pointInTimeUtc"].toISOString(),
    creationSourceClusterResourceId: item["creationSourceClusterResourceId"],
    creationSourceClusterLocation: item["creationSourceClusterLocation"],
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    backup: !item["backup"]
      ? item["backup"]
      : backupPropertiesCreateOrUpdateSerializer(item["backup"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : horizonDbClusterDataEncryptionCreateOrUpdateSerializer(item["dataEncryption"]),
    aiModelManagement: item["aiModelManagement"],
  };
}

/** Backup configuration properties for a HorizonDB cluster. */
export interface BackupPropertiesCreateOrUpdate {
  /** The geo-redundancy state. Geo-redundant backup is not supported when dataEncryption.type is AzureKeyVault. */
  geoRedundancy: GeoRedundancyState;
  /** The number of days that automatic backups are retained. The service defaults to 7 days when this property is omitted. */
  retentionDays?: number;
}

export function backupPropertiesCreateOrUpdateSerializer(
  item: BackupPropertiesCreateOrUpdate,
): any {
  return { geoRedundancy: item["geoRedundancy"], retentionDays: item["retentionDays"] };
}

/** The Cluster-level data encryption configuration. The encryption type is selected at cluster creation; switching between SystemManaged and AzureKeyVault after creation is not supported. For AzureKeyVault encryption, primaryKeyUri and primaryUserAssignedIdentityId are required, and backup.geoRedundancy must be Disabled. Both primaryKeyUri and primaryUserAssignedIdentityId can be provided during initial cluster creation. For updates to an existing cluster through PUT or PATCH, only one of these properties can change per request, and that update must complete before submitting a separate update to change the other property. Customer-managed key identities must also be assigned to the Cluster through its top-level identity property. Only versionless Azure Key Vault key URIs are supported; key version paths are rejected. For SystemManaged encryption, key and identity properties must be omitted. */
export interface HorizonDbClusterDataEncryptionCreateOrUpdate {
  /** The type of data encryption used by the cluster. When the data encryption configuration is supplied during initial cluster creation, this property is required. For PUT updates of an existing cluster, this property may be omitted; if provided, it must match the existing encryption type. This value is selected at cluster creation and cannot later be changed from SystemManaged to AzureKeyVault or from AzureKeyVault to SystemManaged. */
  type?: HorizonDbClusterDataEncryptionType;
  /** The versionless Azure Key Vault key URI used to encrypt the cluster's primary storage. Key version paths are not supported. During initial cluster creation, this property can be provided together with primaryUserAssignedIdentityId. For updates to an existing cluster through PUT or PATCH, this property and primaryUserAssignedIdentityId cannot both change in the same request; the first update must complete before submitting a separate update for the other property. */
  primaryKeyUri?: string;
  /** The Azure resource ID of the user-assigned managed identity used to access the primary encryption key. The identity must also be assigned to the Cluster through its top-level identity property. During initial cluster creation, this property can be provided together with primaryKeyUri. For updates to an existing cluster through PUT or PATCH, this property and primaryKeyUri cannot both change in the same request; the first update must complete before submitting a separate update for the other property. */
  primaryUserAssignedIdentityId?: string;
}

export function horizonDbClusterDataEncryptionCreateOrUpdateSerializer(
  item: HorizonDbClusterDataEncryptionCreateOrUpdate,
): any {
  return {
    type: item["type"],
    primaryKeyUri: item["primaryKeyUri"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
  };
}

/** The user-assigned managed identities assigned to a HorizonDB cluster. Omitting the entire top-level identity property from PUT or PATCH preserves all current assignments. When userAssignedIdentities is supplied, PUT replaces the complete set and PATCH merges the supplied entries with the existing set; a null PATCH entry removes that individual identity. Setting type to None clears all assignments. Removing an identity referenced by a change data capture identity assignment is rejected until the referencing assignment is deleted. */
export interface HorizonDbClusterManagedServiceIdentityCreateOrUpdate {
  /** The managed identity type assigned to the cluster. Setting this property to None clears all managed identity assignments. */
  type: HorizonDbClusterIdentityType;
  /** The user-assigned managed identities associated with the cluster. When supplied on PUT, this dictionary replaces the complete set of assignments. When supplied on PATCH, entries are merged with the existing set and a null value removes the corresponding identity. Each dictionary key must be the full Azure resource ID of a Microsoft.ManagedIdentity/userAssignedIdentities resource. Non-null request values can be empty objects; response values contain the service-populated clientId and principalId. Assigning an identity does not grant it access to destination resources; required role assignments must be configured separately. */
  userAssignedIdentities?: Record<string, UserAssignedIdentityCreateOrUpdate>;
}

export function horizonDbClusterManagedServiceIdentityCreateOrUpdateSerializer(
  item: HorizonDbClusterManagedServiceIdentityCreateOrUpdate,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

/** User assigned identity properties */
export interface UserAssignedIdentityCreateOrUpdate {}

export function userAssignedIdentityCreateOrUpdateSerializer(
  _item: UserAssignedIdentityCreateOrUpdate,
): any {
  return {};
}

/** HorizonDB cluster for update operations. */
export interface ClusterForPatchUpdateUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. Omitting the entire identity property from PUT or PATCH preserves all current assignments. When provided, PUT replaces the user-assigned identity set and PATCH merges it; null PATCH dictionary entries remove individual identities. Setting type to None clears all assignments. */
  identity?: HorizonDbClusterManagedServiceIdentityUpdate;
  /** The properties that can be updated for a HorizonDB cluster. */
  properties?: ClusterPropertiesForPatchUpdateUpdate;
}

export function clusterForPatchUpdateUpdateSerializer(item: ClusterForPatchUpdateUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : horizonDbClusterManagedServiceIdentityUpdateSerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesForPatchUpdateUpdateSerializer(item["properties"]),
  };
}

/** The user-assigned managed identities assigned to a HorizonDB cluster. Omitting the entire top-level identity property from PUT or PATCH preserves all current assignments. When userAssignedIdentities is supplied, PUT replaces the complete set and PATCH merges the supplied entries with the existing set; a null PATCH entry removes that individual identity. Setting type to None clears all assignments. Removing an identity referenced by a change data capture identity assignment is rejected until the referencing assignment is deleted. */
export interface HorizonDbClusterManagedServiceIdentityUpdate {
  /** The managed identity type assigned to the cluster. Setting this property to None clears all managed identity assignments. */
  type: HorizonDbClusterIdentityType;
  /** The user-assigned managed identities associated with the cluster. When supplied on PUT, this dictionary replaces the complete set of assignments. When supplied on PATCH, entries are merged with the existing set and a null value removes the corresponding identity. Each dictionary key must be the full Azure resource ID of a Microsoft.ManagedIdentity/userAssignedIdentities resource. Non-null request values can be empty objects; response values contain the service-populated clientId and principalId. Assigning an identity does not grant it access to destination resources; required role assignments must be configured separately. */
  userAssignedIdentities?: Record<string, UserAssignedIdentityUpdate>;
}

export function horizonDbClusterManagedServiceIdentityUpdateSerializer(
  item: HorizonDbClusterManagedServiceIdentityUpdate,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

/** User assigned identity properties */
export interface UserAssignedIdentityUpdate {}

export function userAssignedIdentityUpdateSerializer(_item: UserAssignedIdentityUpdate): any {
  return {};
}

/** Properties of a HorizonDB cluster for update operations. */
export interface ClusterPropertiesForPatchUpdateUpdate {
  /** The network configuration to update for the cluster. */
  network?: NetworkForPatchUpdateUpdate;
  /** The backup configuration for the cluster. */
  backup?: BackupPropertiesForPatchUpdateUpdate;
  /** The data encryption configuration to update for the cluster. Omitted properties preserve their current values. Updates can modify settings within the existing encryption type, but switching between SystemManaged and AzureKeyVault after cluster creation is not supported. */
  dataEncryption?: HorizonDbClusterDataEncryptionForPatchUpdateUpdate;
  /** Specifies whether AI Model Management is enabled for the cluster. */
  aiModelManagement?: AiModelManagementStatus;
}

export function clusterPropertiesForPatchUpdateUpdateSerializer(
  item: ClusterPropertiesForPatchUpdateUpdate,
): any {
  return {
    network: !item["network"]
      ? item["network"]
      : networkForPatchUpdateUpdateSerializer(item["network"]),
    backup: !item["backup"]
      ? item["backup"]
      : backupPropertiesForPatchUpdateUpdateSerializer(item["backup"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : horizonDbClusterDataEncryptionForPatchUpdateUpdateSerializer(item["dataEncryption"]),
    aiModelManagement: item["aiModelManagement"],
  };
}

/** Network properties for updating a HorizonDB cluster. */
export interface NetworkForPatchUpdateUpdate {
  /** Specifies whether public access is enabled for the cluster. Omission preserves the current value. */
  publicAccess?: PublicNetworkAccessState;
}

export function networkForPatchUpdateUpdateSerializer(item: NetworkForPatchUpdateUpdate): any {
  return { publicAccess: item["publicAccess"] };
}

/** Backup configuration properties for updating a HorizonDB cluster. */
export interface BackupPropertiesForPatchUpdateUpdate {
  /** The number of days that automatic backups are retained. */
  retentionDays?: number;
}

export function backupPropertiesForPatchUpdateUpdateSerializer(
  item: BackupPropertiesForPatchUpdateUpdate,
): any {
  return { retentionDays: item["retentionDays"] };
}

/** Properties for sparsely updating Cluster-level data encryption. Omitted properties preserve their current values. Updates can modify settings within the existing encryption type, such as the primary Azure Key Vault key URI, but switching between SystemManaged and AzureKeyVault after cluster creation is not supported. AzureKeyVault encryption is not supported when backup.geoRedundancy is Enabled. An update can change only one of primaryKeyUri or primaryUserAssignedIdentityId; that update must complete before submitting a separate update to change the other property. */
export interface HorizonDbClusterDataEncryptionForPatchUpdateUpdate {
  /** The existing data encryption type used by the cluster. PATCH is a sparse update, so this property may be omitted. If provided, it must match the existing encryption type. This value cannot be changed from SystemManaged to AzureKeyVault or from AzureKeyVault to SystemManaged after cluster creation. */
  type?: HorizonDbClusterDataEncryptionType;
  /** The versionless Azure Key Vault key URI used to encrypt the cluster's primary storage. Key version paths are not supported. This property and primaryUserAssignedIdentityId cannot both change in the same update; the first update must complete before submitting a separate update for the other property. */
  primaryKeyUri?: string;
  /** The Azure resource ID of the user-assigned managed identity used to access the primary encryption key. The identity must also be assigned to the Cluster through its top-level identity property. This property and primaryKeyUri cannot both change in the same update; the first update must complete before submitting a separate update for the other property. */
  primaryUserAssignedIdentityId?: string;
}

export function horizonDbClusterDataEncryptionForPatchUpdateUpdateSerializer(
  item: HorizonDbClusterDataEncryptionForPatchUpdateUpdate,
): any {
  return {
    type: item["type"],
    primaryKeyUri: item["primaryKeyUri"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-10-01-preview API version. */
  V20261001Preview = "2026-10-01-preview",
}
