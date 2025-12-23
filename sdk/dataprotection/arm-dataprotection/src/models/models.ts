// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Localized display information for and operation. */
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

/** BackupInstance Resource */
export interface BackupInstanceResource extends ProxyResource {
  /** BackupInstanceResource properties */
  properties?: BackupInstance;
  /** Proxy Resource tags. */
  tags?: Record<string, string>;
}

export function backupInstanceResourceSerializer(item: BackupInstanceResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : backupInstanceSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function backupInstanceResourceDeserializer(item: any): BackupInstanceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : backupInstanceDeserializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Backup Instance */
export interface BackupInstance {
  /** Gets or sets the Backup Instance friendly name. */
  friendlyName?: string;
  /** Gets or sets the data source information. */
  dataSourceInfo: Datasource;
  /** Gets or sets the data source set information. */
  dataSourceSetInfo?: DatasourceSet;
  /** Gets or sets the policy information. */
  policyInfo: PolicyInfo;
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
  /** Specifies the protection status of the resource */
  readonly protectionStatus?: ProtectionStatusDetails;
  /** Specifies the current protection state of the resource */
  readonly currentProtectionState?: CurrentProtectionState;
  /** Specifies the protection error of the resource */
  readonly protectionErrorDetails?: UserFacingError;
  /** Specifies the provisioning state of the resource i.e. provisioning/updating/Succeeded/Failed */
  readonly provisioningState?: string;
  /** Credentials to use to authenticate with data source provider. */
  datasourceAuthCredentials?: AuthCredentialsUnion;
  /** Specifies the type of validation. In case of DeepValidation, all validations from /validateForBackup API will run again. */
  validationType?: ValidationType;
  /**
   * Contains information of the Identity Details for the BI.
   * If it is null, default will be considered as System Assigned.
   */
  identityDetails?: IdentityDetails;
  objectType: string;
}

export function backupInstanceSerializer(item: BackupInstance): any {
  return {
    friendlyName: item["friendlyName"],
    dataSourceInfo: datasourceSerializer(item["dataSourceInfo"]),
    dataSourceSetInfo: !item["dataSourceSetInfo"]
      ? item["dataSourceSetInfo"]
      : datasourceSetSerializer(item["dataSourceSetInfo"]),
    policyInfo: policyInfoSerializer(item["policyInfo"]),
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    datasourceAuthCredentials: !item["datasourceAuthCredentials"]
      ? item["datasourceAuthCredentials"]
      : authCredentialsUnionSerializer(item["datasourceAuthCredentials"]),
    validationType: item["validationType"],
    identityDetails: !item["identityDetails"]
      ? item["identityDetails"]
      : identityDetailsSerializer(item["identityDetails"]),
    objectType: item["objectType"],
  };
}

export function backupInstanceDeserializer(item: any): BackupInstance {
  return {
    friendlyName: item["friendlyName"],
    dataSourceInfo: datasourceDeserializer(item["dataSourceInfo"]),
    dataSourceSetInfo: !item["dataSourceSetInfo"]
      ? item["dataSourceSetInfo"]
      : datasourceSetDeserializer(item["dataSourceSetInfo"]),
    policyInfo: policyInfoDeserializer(item["policyInfo"]),
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    protectionStatus: !item["protectionStatus"]
      ? item["protectionStatus"]
      : protectionStatusDetailsDeserializer(item["protectionStatus"]),
    currentProtectionState: item["currentProtectionState"],
    protectionErrorDetails: !item["protectionErrorDetails"]
      ? item["protectionErrorDetails"]
      : userFacingErrorDeserializer(item["protectionErrorDetails"]),
    provisioningState: item["provisioningState"],
    datasourceAuthCredentials: !item["datasourceAuthCredentials"]
      ? item["datasourceAuthCredentials"]
      : authCredentialsUnionDeserializer(item["datasourceAuthCredentials"]),
    validationType: item["validationType"],
    identityDetails: !item["identityDetails"]
      ? item["identityDetails"]
      : identityDetailsDeserializer(item["identityDetails"]),
    objectType: item["objectType"],
  };
}

/** Datasource to be backed up */
export interface Datasource {
  /** DatasourceType of the resource. */
  datasourceType?: string;
  /** Type of Datasource object, used to initialize the right inherited type */
  objectType?: string;
  /** Full ARM ID of the resource. For azure resources, this is ARM ID. For non azure resources, this will be the ID created by backup service via Fabric/Vault. */
  resourceID: string;
  /** Location of datasource. */
  resourceLocation?: string;
  /** Unique identifier of the resource in the context of parent. */
  resourceName?: string;
  /** Resource Type of Datasource. */
  resourceType?: string;
  /** Uri of the resource. */
  resourceUri?: string;
  /** Properties specific to data source */
  resourceProperties?: BaseResourcePropertiesUnion;
}

export function datasourceSerializer(item: Datasource): any {
  return {
    datasourceType: item["datasourceType"],
    objectType: item["objectType"],
    resourceID: item["resourceID"],
    resourceLocation: item["resourceLocation"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    resourceUri: item["resourceUri"],
    resourceProperties: !item["resourceProperties"]
      ? item["resourceProperties"]
      : baseResourcePropertiesUnionSerializer(item["resourceProperties"]),
  };
}

export function datasourceDeserializer(item: any): Datasource {
  return {
    datasourceType: item["datasourceType"],
    objectType: item["objectType"],
    resourceID: item["resourceID"],
    resourceLocation: item["resourceLocation"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    resourceUri: item["resourceUri"],
    resourceProperties: !item["resourceProperties"]
      ? item["resourceProperties"]
      : baseResourcePropertiesUnionDeserializer(item["resourceProperties"]),
  };
}

/** Properties which are specific to datasource/datasourceSets */
export interface BaseResourceProperties {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: DefaultResourceProperties */
  objectType: ResourcePropertiesObjectType;
}

export function baseResourcePropertiesSerializer(item: BaseResourceProperties): any {
  return { objectType: item["objectType"] };
}

export function baseResourcePropertiesDeserializer(item: any): BaseResourceProperties {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for BaseResourcePropertiesUnion */
export type BaseResourcePropertiesUnion = DefaultResourceProperties | BaseResourceProperties;

export function baseResourcePropertiesUnionSerializer(item: BaseResourcePropertiesUnion): any {
  switch (item.objectType) {
    case "DefaultResourceProperties":
      return defaultResourcePropertiesSerializer(item as DefaultResourceProperties);

    default:
      return baseResourcePropertiesSerializer(item);
  }
}

export function baseResourcePropertiesUnionDeserializer(item: any): BaseResourcePropertiesUnion {
  switch (item.objectType) {
    case "DefaultResourceProperties":
      return defaultResourcePropertiesDeserializer(item as DefaultResourceProperties);

    default:
      return baseResourcePropertiesDeserializer(item);
  }
}

/** Type of the specific object - used for deserializing */
export enum KnownResourcePropertiesObjectType {
  /** DefaultResourceProperties */
  DefaultResourceProperties = "DefaultResourceProperties",
}

/**
 * Type of the specific object - used for deserializing \
 * {@link KnownResourcePropertiesObjectType} can be used interchangeably with ResourcePropertiesObjectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DefaultResourceProperties**
 */
export type ResourcePropertiesObjectType = string;

/** Default source properties */
export interface DefaultResourceProperties extends BaseResourceProperties {
  /** Type of the specific object - used for deserializing */
  objectType: "DefaultResourceProperties";
}

export function defaultResourcePropertiesSerializer(item: DefaultResourceProperties): any {
  return { objectType: item["objectType"] };
}

export function defaultResourcePropertiesDeserializer(item: any): DefaultResourceProperties {
  return {
    objectType: item["objectType"],
  };
}

/** DatasourceSet details of datasource to be backed up */
export interface DatasourceSet {
  /** DatasourceType of the resource. */
  datasourceType?: string;
  /** Type of Datasource object, used to initialize the right inherited type */
  objectType?: string;
  /** Full ARM ID of the resource. For azure resources, this is ARM ID. For non azure resources, this will be the ID created by backup service via Fabric/Vault. */
  resourceID: string;
  /** Location of datasource. */
  resourceLocation?: string;
  /** Unique identifier of the resource in the context of parent. */
  resourceName?: string;
  /** Resource Type of Datasource. */
  resourceType?: string;
  /** Uri of the resource. */
  resourceUri?: string;
  /** Properties specific to data source set */
  resourceProperties?: BaseResourcePropertiesUnion;
}

export function datasourceSetSerializer(item: DatasourceSet): any {
  return {
    datasourceType: item["datasourceType"],
    objectType: item["objectType"],
    resourceID: item["resourceID"],
    resourceLocation: item["resourceLocation"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    resourceUri: item["resourceUri"],
    resourceProperties: !item["resourceProperties"]
      ? item["resourceProperties"]
      : baseResourcePropertiesUnionSerializer(item["resourceProperties"]),
  };
}

export function datasourceSetDeserializer(item: any): DatasourceSet {
  return {
    datasourceType: item["datasourceType"],
    objectType: item["objectType"],
    resourceID: item["resourceID"],
    resourceLocation: item["resourceLocation"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    resourceUri: item["resourceUri"],
    resourceProperties: !item["resourceProperties"]
      ? item["resourceProperties"]
      : baseResourcePropertiesUnionDeserializer(item["resourceProperties"]),
  };
}

/** Policy Info in backupInstance */
export interface PolicyInfo {
  policyId: string;
  readonly policyVersion?: string;
  /** Policy parameters for the backup instance */
  policyParameters?: PolicyParameters;
}

export function policyInfoSerializer(item: PolicyInfo): any {
  return {
    policyId: item["policyId"],
    policyParameters: !item["policyParameters"]
      ? item["policyParameters"]
      : policyParametersSerializer(item["policyParameters"]),
  };
}

export function policyInfoDeserializer(item: any): PolicyInfo {
  return {
    policyId: item["policyId"],
    policyVersion: item["policyVersion"],
    policyParameters: !item["policyParameters"]
      ? item["policyParameters"]
      : policyParametersDeserializer(item["policyParameters"]),
  };
}

/** Parameters in Policy */
export interface PolicyParameters {
  /** Gets or sets the DataStore Parameters */
  dataStoreParametersList?: DataStoreParametersUnion[];
  /** Gets or sets the Backup Data Source Parameters */
  backupDatasourceParametersList?: BackupDatasourceParametersUnion[];
}

export function policyParametersSerializer(item: PolicyParameters): any {
  return {
    dataStoreParametersList: !item["dataStoreParametersList"]
      ? item["dataStoreParametersList"]
      : dataStoreParametersUnionArraySerializer(item["dataStoreParametersList"]),
    backupDatasourceParametersList: !item["backupDatasourceParametersList"]
      ? item["backupDatasourceParametersList"]
      : backupDatasourceParametersUnionArraySerializer(item["backupDatasourceParametersList"]),
  };
}

export function policyParametersDeserializer(item: any): PolicyParameters {
  return {
    dataStoreParametersList: !item["dataStoreParametersList"]
      ? item["dataStoreParametersList"]
      : dataStoreParametersUnionArrayDeserializer(item["dataStoreParametersList"]),
    backupDatasourceParametersList: !item["backupDatasourceParametersList"]
      ? item["backupDatasourceParametersList"]
      : backupDatasourceParametersUnionArrayDeserializer(item["backupDatasourceParametersList"]),
  };
}

export function dataStoreParametersUnionArraySerializer(
  result: Array<DataStoreParametersUnion>,
): any[] {
  return result.map((item) => {
    return dataStoreParametersUnionSerializer(item);
  });
}

export function dataStoreParametersUnionArrayDeserializer(
  result: Array<DataStoreParametersUnion>,
): any[] {
  return result.map((item) => {
    return dataStoreParametersUnionDeserializer(item);
  });
}

/** Parameters for DataStore */
export interface DataStoreParameters {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: AzureOperationalStoreParameters */
  objectType: string;
  /** type of datastore; Operational/Vault/Archive */
  dataStoreType: DataStoreTypes;
}

export function dataStoreParametersSerializer(item: DataStoreParameters): any {
  return {
    objectType: item["objectType"],
    dataStoreType: item["dataStoreType"],
  };
}

export function dataStoreParametersDeserializer(item: any): DataStoreParameters {
  return {
    objectType: item["objectType"],
    dataStoreType: item["dataStoreType"],
  };
}

/** Alias for DataStoreParametersUnion */
export type DataStoreParametersUnion = AzureOperationalStoreParameters | DataStoreParameters;

export function dataStoreParametersUnionSerializer(item: DataStoreParametersUnion): any {
  switch (item.objectType) {
    case "AzureOperationalStoreParameters":
      return azureOperationalStoreParametersSerializer(item as AzureOperationalStoreParameters);

    default:
      return dataStoreParametersSerializer(item);
  }
}

export function dataStoreParametersUnionDeserializer(item: any): DataStoreParametersUnion {
  switch (item.objectType) {
    case "AzureOperationalStoreParameters":
      return azureOperationalStoreParametersDeserializer(item as AzureOperationalStoreParameters);

    default:
      return dataStoreParametersDeserializer(item);
  }
}

/** type of datastore; Operational/Vault/Archive */
export enum KnownDataStoreTypes {
  /** OperationalStore */
  OperationalStore = "OperationalStore",
  /** VaultStore */
  VaultStore = "VaultStore",
  /** ArchiveStore */
  ArchiveStore = "ArchiveStore",
}

/**
 * type of datastore; Operational/Vault/Archive \
 * {@link KnownDataStoreTypes} can be used interchangeably with DataStoreTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OperationalStore** \
 * **VaultStore** \
 * **ArchiveStore**
 */
export type DataStoreTypes = string;

/** Parameters for Operational-Tier DataStore */
export interface AzureOperationalStoreParameters extends DataStoreParameters {
  /** Gets or sets the Snapshot Resource Group Uri. */
  resourceGroupId?: string;
  /** Type of the specific object - used for deserializing */
  objectType: "AzureOperationalStoreParameters";
}

export function azureOperationalStoreParametersSerializer(
  item: AzureOperationalStoreParameters,
): any {
  return {
    objectType: item["objectType"],
    dataStoreType: item["dataStoreType"],
    resourceGroupId: item["resourceGroupId"],
  };
}

export function azureOperationalStoreParametersDeserializer(
  item: any,
): AzureOperationalStoreParameters {
  return {
    objectType: item["objectType"],
    dataStoreType: item["dataStoreType"],
    resourceGroupId: item["resourceGroupId"],
  };
}

export function backupDatasourceParametersUnionArraySerializer(
  result: Array<BackupDatasourceParametersUnion>,
): any[] {
  return result.map((item) => {
    return backupDatasourceParametersUnionSerializer(item);
  });
}

export function backupDatasourceParametersUnionArrayDeserializer(
  result: Array<BackupDatasourceParametersUnion>,
): any[] {
  return result.map((item) => {
    return backupDatasourceParametersUnionDeserializer(item);
  });
}

/** Parameters for Backup Datasource */
export interface BackupDatasourceParameters {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: KubernetesClusterBackupDatasourceParameters, BlobBackupDatasourceParameters, AdlsBlobBackupDatasourceParameters */
  objectType: string;
}

export function backupDatasourceParametersSerializer(item: BackupDatasourceParameters): any {
  return { objectType: item["objectType"] };
}

export function backupDatasourceParametersDeserializer(item: any): BackupDatasourceParameters {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for BackupDatasourceParametersUnion */
export type BackupDatasourceParametersUnion =
  | KubernetesClusterBackupDatasourceParameters
  | BlobBackupDatasourceParametersUnion
  | BackupDatasourceParameters;

export function backupDatasourceParametersUnionSerializer(
  item: BackupDatasourceParametersUnion,
): any {
  switch (item.objectType) {
    case "KubernetesClusterBackupDatasourceParameters":
      return kubernetesClusterBackupDatasourceParametersSerializer(
        item as KubernetesClusterBackupDatasourceParameters,
      );

    case "BlobBackupDatasourceParameters":
    case "AdlsBlobBackupDatasourceParameters":
      return blobBackupDatasourceParametersUnionSerializer(
        item as BlobBackupDatasourceParametersUnion,
      );

    default:
      return backupDatasourceParametersSerializer(item);
  }
}

export function backupDatasourceParametersUnionDeserializer(
  item: any,
): BackupDatasourceParametersUnion {
  switch (item.objectType) {
    case "KubernetesClusterBackupDatasourceParameters":
      return kubernetesClusterBackupDatasourceParametersDeserializer(
        item as KubernetesClusterBackupDatasourceParameters,
      );

    case "BlobBackupDatasourceParameters":
    case "AdlsBlobBackupDatasourceParameters":
      return blobBackupDatasourceParametersUnionDeserializer(
        item as BlobBackupDatasourceParametersUnion,
      );

    default:
      return backupDatasourceParametersDeserializer(item);
  }
}

/** Parameters for Kubernetes Cluster Backup Datasource */
export interface KubernetesClusterBackupDatasourceParameters extends BackupDatasourceParameters {
  /** Gets or sets the volume snapshot property. This property if enabled will take volume snapshots during backup. */
  snapshotVolumes: boolean;
  /** Gets or sets the include volume types property. This property sets the volume types to be included during backup. */
  includedVolumeTypes?: AKSVolumeTypes[];
  /** Gets or sets the include cluster resources property. This property if enabled will include cluster scope resources during backup. */
  includeClusterScopeResources: boolean;
  /** Gets or sets the include namespaces property. This property sets the namespaces to be included during backup. */
  includedNamespaces?: string[];
  /** Gets or sets the exclude namespaces property. This property sets the namespaces to be excluded during backup. */
  excludedNamespaces?: string[];
  /** Gets or sets the include resource types property. This property sets the resource types to be included during backup. */
  includedResourceTypes?: string[];
  /** Gets or sets the exclude resource types property. This property sets the resource types to be excluded during backup. */
  excludedResourceTypes?: string[];
  /** Gets or sets the LabelSelectors property. This property sets the resource with such label selectors to be included during backup. */
  labelSelectors?: string[];
  /** Gets or sets the backup hook references. This property sets the hook reference to be executed during backup. */
  backupHookReferences?: NamespacedNameResource[];
  /** Type of the specific object - used for deserializing */
  objectType: "KubernetesClusterBackupDatasourceParameters";
}

export function kubernetesClusterBackupDatasourceParametersSerializer(
  item: KubernetesClusterBackupDatasourceParameters,
): any {
  return {
    objectType: item["objectType"],
    snapshotVolumes: item["snapshotVolumes"],
    includedVolumeTypes: !item["includedVolumeTypes"]
      ? item["includedVolumeTypes"]
      : item["includedVolumeTypes"].map((p: any) => {
          return p;
        }),
    includeClusterScopeResources: item["includeClusterScopeResources"],
    includedNamespaces: !item["includedNamespaces"]
      ? item["includedNamespaces"]
      : item["includedNamespaces"].map((p: any) => {
          return p;
        }),
    excludedNamespaces: !item["excludedNamespaces"]
      ? item["excludedNamespaces"]
      : item["excludedNamespaces"].map((p: any) => {
          return p;
        }),
    includedResourceTypes: !item["includedResourceTypes"]
      ? item["includedResourceTypes"]
      : item["includedResourceTypes"].map((p: any) => {
          return p;
        }),
    excludedResourceTypes: !item["excludedResourceTypes"]
      ? item["excludedResourceTypes"]
      : item["excludedResourceTypes"].map((p: any) => {
          return p;
        }),
    labelSelectors: !item["labelSelectors"]
      ? item["labelSelectors"]
      : item["labelSelectors"].map((p: any) => {
          return p;
        }),
    backupHookReferences: !item["backupHookReferences"]
      ? item["backupHookReferences"]
      : namespacedNameResourceArraySerializer(item["backupHookReferences"]),
  };
}

export function kubernetesClusterBackupDatasourceParametersDeserializer(
  item: any,
): KubernetesClusterBackupDatasourceParameters {
  return {
    objectType: item["objectType"],
    snapshotVolumes: item["snapshotVolumes"],
    includedVolumeTypes: !item["includedVolumeTypes"]
      ? item["includedVolumeTypes"]
      : item["includedVolumeTypes"].map((p: any) => {
          return p;
        }),
    includeClusterScopeResources: item["includeClusterScopeResources"],
    includedNamespaces: !item["includedNamespaces"]
      ? item["includedNamespaces"]
      : item["includedNamespaces"].map((p: any) => {
          return p;
        }),
    excludedNamespaces: !item["excludedNamespaces"]
      ? item["excludedNamespaces"]
      : item["excludedNamespaces"].map((p: any) => {
          return p;
        }),
    includedResourceTypes: !item["includedResourceTypes"]
      ? item["includedResourceTypes"]
      : item["includedResourceTypes"].map((p: any) => {
          return p;
        }),
    excludedResourceTypes: !item["excludedResourceTypes"]
      ? item["excludedResourceTypes"]
      : item["excludedResourceTypes"].map((p: any) => {
          return p;
        }),
    labelSelectors: !item["labelSelectors"]
      ? item["labelSelectors"]
      : item["labelSelectors"].map((p: any) => {
          return p;
        }),
    backupHookReferences: !item["backupHookReferences"]
      ? item["backupHookReferences"]
      : namespacedNameResourceArrayDeserializer(item["backupHookReferences"]),
  };
}

/** Known values of {@link AKSVolumeTypes} that the service accepts. */
export enum KnownAKSVolumeTypes {
  /** AzureDisk */
  AzureDisk = "AzureDisk",
  /** AzureFileShareSMB */
  AzureFileShareSMB = "AzureFileShareSMB",
}

/** Type of AKSVolumeTypes */
export type AKSVolumeTypes = string;

export function namespacedNameResourceArraySerializer(
  result: Array<NamespacedNameResource>,
): any[] {
  return result.map((item) => {
    return namespacedNameResourceSerializer(item);
  });
}

export function namespacedNameResourceArrayDeserializer(
  result: Array<NamespacedNameResource>,
): any[] {
  return result.map((item) => {
    return namespacedNameResourceDeserializer(item);
  });
}

/** Class to refer resources which contains namespace and name */
export interface NamespacedNameResource {
  /** Name of the resource */
  name?: string;
  /** Namespace in which the resource exists */
  namespace?: string;
}

export function namespacedNameResourceSerializer(item: NamespacedNameResource): any {
  return { name: item["name"], namespace: item["namespace"] };
}

export function namespacedNameResourceDeserializer(item: any): NamespacedNameResource {
  return {
    name: item["name"],
    namespace: item["namespace"],
  };
}

/** Parameters to be used during configuration of backup of blobs */
export interface BlobBackupDatasourceParameters extends BackupDatasourceParameters {
  /** List of containers to be backed up during configuration of backup of blobs */
  containersList: string[];
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: AdlsBlobBackupDatasourceParameters */
  objectType: "BlobBackupDatasourceParameters" | "AdlsBlobBackupDatasourceParameters";
}

export function blobBackupDatasourceParametersSerializer(
  item: BlobBackupDatasourceParameters,
): any {
  return {
    objectType: item["objectType"],
    containersList: item["containersList"].map((p: any) => {
      return p;
    }),
  };
}

export function blobBackupDatasourceParametersDeserializer(
  item: any,
): BlobBackupDatasourceParameters {
  return {
    objectType: item["objectType"],
    containersList: item["containersList"].map((p: any) => {
      return p;
    }),
  };
}

/** Alias for BlobBackupDatasourceParametersUnion */
export type BlobBackupDatasourceParametersUnion =
  | AdlsBlobBackupDatasourceParameters
  | BlobBackupDatasourceParameters;

export function blobBackupDatasourceParametersUnionSerializer(
  item: BlobBackupDatasourceParametersUnion,
): any {
  switch (item.objectType) {
    case "AdlsBlobBackupDatasourceParameters":
      return adlsBlobBackupDatasourceParametersSerializer(
        item as AdlsBlobBackupDatasourceParameters,
      );

    default:
      return blobBackupDatasourceParametersSerializer(item);
  }
}

export function blobBackupDatasourceParametersUnionDeserializer(
  item: any,
): BlobBackupDatasourceParametersUnion {
  switch (item.objectType) {
    case "AdlsBlobBackupDatasourceParameters":
      return adlsBlobBackupDatasourceParametersDeserializer(
        item as AdlsBlobBackupDatasourceParameters,
      );

    default:
      return blobBackupDatasourceParametersDeserializer(item);
  }
}

/** Parameters to be used during configuration of backup of azure data lake storage account blobs */
export interface AdlsBlobBackupDatasourceParameters extends BlobBackupDatasourceParameters {
  /** Type of the specific object - used for deserializing */
  objectType: "AdlsBlobBackupDatasourceParameters";
}

export function adlsBlobBackupDatasourceParametersSerializer(
  item: AdlsBlobBackupDatasourceParameters,
): any {
  return {
    containersList: item["containersList"].map((p: any) => {
      return p;
    }),
    objectType: item["objectType"],
  };
}

export function adlsBlobBackupDatasourceParametersDeserializer(
  item: any,
): AdlsBlobBackupDatasourceParameters {
  return {
    containersList: item["containersList"].map((p: any) => {
      return p;
    }),
    objectType: item["objectType"],
  };
}

/** Protection status details */
export interface ProtectionStatusDetails {
  /** Specifies the protection status error of the resource */
  errorDetails?: UserFacingError;
  /** Specifies the protection status of the resource */
  status?: Status;
}

export function protectionStatusDetailsDeserializer(item: any): ProtectionStatusDetails {
  return {
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : userFacingErrorDeserializer(item["errorDetails"]),
    status: item["status"],
  };
}

/** Error object used by layers that have access to localized content, and propagate that to user */
export interface UserFacingError {
  /** Unique code for this error */
  code?: string;
  /** Additional related Errors */
  details?: UserFacingError[];
  /** Inner Error */
  innerError?: InnerError;
  /** Whether the operation will be retryable or not */
  isRetryable?: boolean;
  /** Whether the operation is due to a user error or service error */
  isUserError?: boolean;
  /** Any key value pairs that can be injected inside error object */
  properties?: Record<string, string>;
  message?: string;
  /** RecommendedAction � localized. */
  recommendedAction?: string[];
  /** Target of the error. */
  target?: string;
}

export function userFacingErrorDeserializer(item: any): UserFacingError {
  return {
    code: item["code"],
    details: !item["details"] ? item["details"] : userFacingErrorArrayDeserializer(item["details"]),
    innerError: !item["innerError"]
      ? item["innerError"]
      : innerErrorDeserializer(item["innerError"]),
    isRetryable: item["isRetryable"],
    isUserError: item["isUserError"],
    properties: item["properties"],
    message: item["message"],
    recommendedAction: !item["recommendedAction"]
      ? item["recommendedAction"]
      : item["recommendedAction"].map((p: any) => {
          return p;
        }),
    target: item["target"],
  };
}

export function userFacingErrorArrayDeserializer(result: Array<UserFacingError>): any[] {
  return result.map((item) => {
    return userFacingErrorDeserializer(item);
  });
}

/** Inner Error */
export interface InnerError {
  /** Any Key value pairs that can be provided to the client for additional  verbose information. */
  additionalInfo?: Record<string, string>;
  /** Unique code for this error */
  code?: string;
  /** Child Inner Error, to allow Nesting. */
  embeddedInnerError?: InnerError;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    additionalInfo: item["additionalInfo"],
    code: item["code"],
    embeddedInnerError: !item["embeddedInnerError"]
      ? item["embeddedInnerError"]
      : innerErrorDeserializer(item["embeddedInnerError"]),
  };
}

/** Specifies the protection status of the resource */
export enum KnownStatus {
  /** ConfiguringProtection */
  ConfiguringProtection = "ConfiguringProtection",
  /** ConfiguringProtectionFailed */
  ConfiguringProtectionFailed = "ConfiguringProtectionFailed",
  /** ProtectionConfigured */
  ProtectionConfigured = "ProtectionConfigured",
  /** ProtectionStopped */
  ProtectionStopped = "ProtectionStopped",
  /** SoftDeleted */
  SoftDeleted = "SoftDeleted",
  /** SoftDeleting */
  SoftDeleting = "SoftDeleting",
}

/**
 * Specifies the protection status of the resource \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ConfiguringProtection** \
 * **ConfiguringProtectionFailed** \
 * **ProtectionConfigured** \
 * **ProtectionStopped** \
 * **SoftDeleted** \
 * **SoftDeleting**
 */
export type Status = string;

/** Specifies the current protection state of the resource */
export enum KnownCurrentProtectionState {
  /** Invalid */
  Invalid = "Invalid",
  /** NotProtected */
  NotProtected = "NotProtected",
  /** ConfiguringProtection */
  ConfiguringProtection = "ConfiguringProtection",
  /** ProtectionConfigured */
  ProtectionConfigured = "ProtectionConfigured",
  /** BackupSchedulesSuspended */
  BackupSchedulesSuspended = "BackupSchedulesSuspended",
  /** RetentionSchedulesSuspended */
  RetentionSchedulesSuspended = "RetentionSchedulesSuspended",
  /** ProtectionStopped */
  ProtectionStopped = "ProtectionStopped",
  /** ProtectionError */
  ProtectionError = "ProtectionError",
  /** ConfiguringProtectionFailed */
  ConfiguringProtectionFailed = "ConfiguringProtectionFailed",
  /** SoftDeleting */
  SoftDeleting = "SoftDeleting",
  /** SoftDeleted */
  SoftDeleted = "SoftDeleted",
  /** UpdatingProtection */
  UpdatingProtection = "UpdatingProtection",
}

/**
 * Specifies the current protection state of the resource \
 * {@link KnownCurrentProtectionState} can be used interchangeably with CurrentProtectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **NotProtected** \
 * **ConfiguringProtection** \
 * **ProtectionConfigured** \
 * **BackupSchedulesSuspended** \
 * **RetentionSchedulesSuspended** \
 * **ProtectionStopped** \
 * **ProtectionError** \
 * **ConfiguringProtectionFailed** \
 * **SoftDeleting** \
 * **SoftDeleted** \
 * **UpdatingProtection**
 */
export type CurrentProtectionState = string;

/** Base class for different types of authentication credentials. */
export interface AuthCredentials {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: SecretStoreBasedAuthCredentials */
  objectType: string;
}

export function authCredentialsSerializer(item: AuthCredentials): any {
  return { objectType: item["objectType"] };
}

export function authCredentialsDeserializer(item: any): AuthCredentials {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for AuthCredentialsUnion */
export type AuthCredentialsUnion = SecretStoreBasedAuthCredentials | AuthCredentials;

export function authCredentialsUnionSerializer(item: AuthCredentialsUnion): any {
  switch (item.objectType) {
    case "SecretStoreBasedAuthCredentials":
      return secretStoreBasedAuthCredentialsSerializer(item as SecretStoreBasedAuthCredentials);

    default:
      return authCredentialsSerializer(item);
  }
}

export function authCredentialsUnionDeserializer(item: any): AuthCredentialsUnion {
  switch (item.objectType) {
    case "SecretStoreBasedAuthCredentials":
      return secretStoreBasedAuthCredentialsDeserializer(item as SecretStoreBasedAuthCredentials);

    default:
      return authCredentialsDeserializer(item);
  }
}

/** Secret store based authentication credentials. */
export interface SecretStoreBasedAuthCredentials extends AuthCredentials {
  /** Secret store resource */
  secretStoreResource?: SecretStoreResource;
  /** Type of the specific object - used for deserializing */
  objectType: "SecretStoreBasedAuthCredentials";
}

export function secretStoreBasedAuthCredentialsSerializer(
  item: SecretStoreBasedAuthCredentials,
): any {
  return {
    objectType: item["objectType"],
    secretStoreResource: !item["secretStoreResource"]
      ? item["secretStoreResource"]
      : secretStoreResourceSerializer(item["secretStoreResource"]),
  };
}

export function secretStoreBasedAuthCredentialsDeserializer(
  item: any,
): SecretStoreBasedAuthCredentials {
  return {
    objectType: item["objectType"],
    secretStoreResource: !item["secretStoreResource"]
      ? item["secretStoreResource"]
      : secretStoreResourceDeserializer(item["secretStoreResource"]),
  };
}

/** Class representing a secret store resource. */
export interface SecretStoreResource {
  /** Uri to get to the resource */
  uri?: string;
  /** Gets or sets the type of secret store */
  secretStoreType: SecretStoreType;
  /** Gets or sets value stored in secret store resource */
  value?: string;
}

export function secretStoreResourceSerializer(item: SecretStoreResource): any {
  return {
    uri: item["uri"],
    secretStoreType: item["secretStoreType"],
    value: item["value"],
  };
}

export function secretStoreResourceDeserializer(item: any): SecretStoreResource {
  return {
    uri: item["uri"],
    secretStoreType: item["secretStoreType"],
    value: item["value"],
  };
}

/** Gets or sets the type of secret store */
export enum KnownSecretStoreType {
  /** Invalid */
  Invalid = "Invalid",
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
}

/**
 * Gets or sets the type of secret store \
 * {@link KnownSecretStoreType} can be used interchangeably with SecretStoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AzureKeyVault**
 */
export type SecretStoreType = string;

/** Specifies the type of validation. In case of DeepValidation, all validations from /validateForBackup API will run again. */
export enum KnownValidationType {
  /** ShallowValidation */
  ShallowValidation = "ShallowValidation",
  /** DeepValidation */
  DeepValidation = "DeepValidation",
}

/**
 * Specifies the type of validation. In case of DeepValidation, all validations from /validateForBackup API will run again. \
 * {@link KnownValidationType} can be used interchangeably with ValidationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ShallowValidation** \
 * **DeepValidation**
 */
export type ValidationType = string;

/** model interface IdentityDetails */
export interface IdentityDetails {
  /** Specifies if the BI is protected by System Identity. */
  useSystemAssignedIdentity?: boolean;
  /** ARM URL for User Assigned Identity. */
  userAssignedIdentityArmUrl?: string;
}

export function identityDetailsSerializer(item: IdentityDetails): any {
  return {
    useSystemAssignedIdentity: item["useSystemAssignedIdentity"],
    userAssignedIdentityArmUrl: item["userAssignedIdentityArmUrl"],
  };
}

export function identityDetailsDeserializer(item: any): IdentityDetails {
  return {
    useSystemAssignedIdentity: item["useSystemAssignedIdentity"],
    userAssignedIdentityArmUrl: item["userAssignedIdentityArmUrl"],
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

/** An error response from Azure Backup. */
export interface CloudError {
  /** The resource management error response. */
  error?: ErrorModel;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
  };
}

/** The resource management error response. */
export interface ErrorModel {
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
  /** The error code. */
  readonly code?: string;
  /** The error details. */
  readonly details?: ErrorModel[];
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
    code: item["code"],
    details: !item["details"] ? item["details"] : errorArrayDeserializer(item["details"]),
    message: item["message"],
    target: item["target"],
  };
}

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
  });
}

/** BackupInstance Resource list response */
export interface _BackupInstanceResourceList extends DppResourceList {
  /** List of resources. */
  value?: BackupInstanceResource[];
}

export function _backupInstanceResourceListDeserializer(item: any): _BackupInstanceResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : backupInstanceResourceArrayDeserializer(item["value"]),
  };
}

export function backupInstanceResourceArraySerializer(
  result: Array<BackupInstanceResource>,
): any[] {
  return result.map((item) => {
    return backupInstanceResourceSerializer(item);
  });
}

export function backupInstanceResourceArrayDeserializer(
  result: Array<BackupInstanceResource>,
): any[] {
  return result.map((item) => {
    return backupInstanceResourceDeserializer(item);
  });
}

/** ListResource */
export interface DppResourceList {
  /** The uri to fetch the next page of resources. Call ListNext() fetches next page of resources. */
  nextLink?: string;
}

export function dppResourceListDeserializer(item: any): DppResourceList {
  return {
    nextLink: item["nextLink"],
  };
}

/** Validate for backup request */
export interface ValidateForBackupRequest {
  /** Backup Instance */
  backupInstance: BackupInstance;
}

export function validateForBackupRequestSerializer(item: ValidateForBackupRequest): any {
  return { backupInstance: backupInstanceSerializer(item["backupInstance"]) };
}

/** Operation Job Extended Info */
export interface OperationJobExtendedInfo extends OperationExtendedInfo {
  /** Name or Arm Id of the job created for this operation. */
  jobId?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "OperationJobExtendedInfo";
}

export function operationJobExtendedInfoDeserializer(item: any): OperationJobExtendedInfo {
  return {
    objectType: item["objectType"],
    jobId: item["jobId"],
  };
}

/** Operation Extended Info */
export interface OperationExtendedInfo {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: OperationJobExtendedInfo */
  objectType: string;
}

export function operationExtendedInfoDeserializer(item: any): OperationExtendedInfo {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for OperationExtendedInfoUnion */
export type OperationExtendedInfoUnion = OperationJobExtendedInfo | OperationExtendedInfo;

export function operationExtendedInfoUnionDeserializer(item: any): OperationExtendedInfoUnion {
  switch (item.objectType) {
    case "OperationJobExtendedInfo":
      return operationJobExtendedInfoDeserializer(item as OperationJobExtendedInfo);

    default:
      return operationExtendedInfoDeserializer(item);
  }
}

/** Trigger backup request */
export interface TriggerBackupRequest {
  /** Name for the Rule of the Policy which needs to be applied for this backup */
  backupRuleOptions: AdHocBackupRuleOptions;
}

export function triggerBackupRequestSerializer(item: TriggerBackupRequest): any {
  return {
    backupRuleOptions: adHocBackupRuleOptionsSerializer(item["backupRuleOptions"]),
  };
}

/** Adhoc backup rules */
export interface AdHocBackupRuleOptions {
  ruleName: string;
  /** Adhoc backup trigger option */
  triggerOption: AdhocBackupTriggerOption;
}

export function adHocBackupRuleOptionsSerializer(item: AdHocBackupRuleOptions): any {
  return {
    ruleName: item["ruleName"],
    triggerOption: adhocBackupTriggerOptionSerializer(item["triggerOption"]),
  };
}

/** Adhoc backup trigger option */
export interface AdhocBackupTriggerOption {
  retentionTagOverride?: string;
}

export function adhocBackupTriggerOptionSerializer(item: AdhocBackupTriggerOption): any {
  return { retentionTagOverride: item["retentionTagOverride"] };
}

/** Validate for modify backup request */
export interface ValidateForModifyBackupRequest {
  /** Backup Instance */
  backupInstance: BackupInstance;
}

export function validateForModifyBackupRequestSerializer(
  item: ValidateForModifyBackupRequest,
): any {
  return { backupInstance: backupInstanceSerializer(item["backupInstance"]) };
}

/** Azure Backup Rehydrate Request */
export interface AzureBackupRehydrationRequest {
  /** Id of the recovery point to be recovered */
  recoveryPointId: string;
  /** Priority to be used for rehydration. Values High or Standard */
  rehydrationPriority?: RehydrationPriority;
  /** Retention duration in ISO 8601 format i.e P10D . */
  rehydrationRetentionDuration: string;
}

export function azureBackupRehydrationRequestSerializer(item: AzureBackupRehydrationRequest): any {
  return {
    recoveryPointId: item["recoveryPointId"],
    rehydrationPriority: item["rehydrationPriority"],
    rehydrationRetentionDuration: item["rehydrationRetentionDuration"],
  };
}

/** Priority to be used for rehydration. Values High or Standard */
export enum KnownRehydrationPriority {
  /** Invalid */
  Invalid = "Invalid",
  /** High */
  High = "High",
  /** Standard */
  Standard = "Standard",
}

/**
 * Priority to be used for rehydration. Values High or Standard \
 * {@link KnownRehydrationPriority} can be used interchangeably with RehydrationPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **High** \
 * **Standard**
 */
export type RehydrationPriority = string;

/** Azure backup restore request */
export interface AzureBackupRestoreRequest {
  objectType: string;
  /** Gets or sets the restore target information. */
  restoreTargetInfo: RestoreTargetInfoBaseUnion;
  /** Gets or sets the type of the source data store. */
  sourceDataStoreType: SourceDataStoreType;
  /** Fully qualified Azure Resource Manager ID of the datasource which is being recovered. */
  sourceResourceId?: string;
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
  /**
   * Contains information of the Identity Details for the BI.
   * If it is null, default will be considered as System Assigned.
   */
  identityDetails?: IdentityDetails;
}

export function azureBackupRestoreRequestSerializer(item: AzureBackupRestoreRequest): any {
  return {
    objectType: item["objectType"],
    restoreTargetInfo: restoreTargetInfoBaseUnionSerializer(item["restoreTargetInfo"]),
    sourceDataStoreType: item["sourceDataStoreType"],
    sourceResourceId: item["sourceResourceId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    identityDetails: !item["identityDetails"]
      ? item["identityDetails"]
      : identityDetailsSerializer(item["identityDetails"]),
  };
}

/** Alias for AzureBackupRestoreRequestUnion */
export type AzureBackupRestoreRequestUnion =
  | AzureBackupRecoveryPointBasedRestoreRequestUnion
  | AzureBackupRecoveryTimeBasedRestoreRequest
  | AzureBackupRestoreRequest;

export function azureBackupRestoreRequestUnionSerializer(
  item: AzureBackupRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureBackupRecoveryPointBasedRestoreRequest":
    case "AzureBackupRestoreWithRehydrationRequest":
      return azureBackupRecoveryPointBasedRestoreRequestUnionSerializer(
        item as AzureBackupRecoveryPointBasedRestoreRequestUnion,
      );

    case "AzureBackupRecoveryTimeBasedRestoreRequest":
      return azureBackupRecoveryTimeBasedRestoreRequestSerializer(
        item as AzureBackupRecoveryTimeBasedRestoreRequest,
      );

    default:
      return azureBackupRestoreRequestSerializer(item);
  }
}

/** Base class common to RestoreTargetInfo and RestoreFilesTargetInfo */
export interface RestoreTargetInfoBase {
  /** Type of Datasource object, used to initialize the right inherited type */
  /** The discriminator possible values: ItemLevelRestoreTargetInfo, RestoreFilesTargetInfo, RestoreTargetInfo */
  objectType: string;
  /** Recovery Option */
  recoveryOption: RecoveryOption;
  /** Target Restore region */
  restoreLocation?: string;
}

export function restoreTargetInfoBaseSerializer(item: RestoreTargetInfoBase): any {
  return {
    objectType: item["objectType"],
    recoveryOption: item["recoveryOption"],
    restoreLocation: item["restoreLocation"],
  };
}

/** Alias for RestoreTargetInfoBaseUnion */
export type RestoreTargetInfoBaseUnion =
  | ItemLevelRestoreTargetInfo
  | RestoreFilesTargetInfo
  | RestoreTargetInfo
  | RestoreTargetInfoBase;

export function restoreTargetInfoBaseUnionSerializer(item: RestoreTargetInfoBaseUnion): any {
  switch (item.objectType) {
    case "ItemLevelRestoreTargetInfo":
      return itemLevelRestoreTargetInfoSerializer(item as ItemLevelRestoreTargetInfo);

    case "RestoreFilesTargetInfo":
      return restoreFilesTargetInfoSerializer(item as RestoreFilesTargetInfo);

    case "RestoreTargetInfo":
      return restoreTargetInfoSerializer(item as RestoreTargetInfo);

    default:
      return restoreTargetInfoBaseSerializer(item);
  }
}

/** Recovery Option */
export enum KnownRecoveryOption {
  /** FailIfExists */
  FailIfExists = "FailIfExists",
}

/**
 * Recovery Option \
 * {@link KnownRecoveryOption} can be used interchangeably with RecoveryOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FailIfExists**
 */
export type RecoveryOption = string;

/** Restore target info for Item level restore operation */
export interface ItemLevelRestoreTargetInfo extends RestoreTargetInfoBase {
  /** Restore Criteria */
  restoreCriteria: ItemLevelRestoreCriteriaUnion[];
  /** Information of target DS */
  datasourceInfo: Datasource;
  /** Information of target DS Set */
  datasourceSetInfo?: DatasourceSet;
  /** Credentials to use to authenticate with data source provider. */
  datasourceAuthCredentials?: AuthCredentialsUnion;
  /** Type of Datasource object, used to initialize the right inherited type */
  objectType: "ItemLevelRestoreTargetInfo";
}

export function itemLevelRestoreTargetInfoSerializer(item: ItemLevelRestoreTargetInfo): any {
  return {
    objectType: item["objectType"],
    recoveryOption: item["recoveryOption"],
    restoreLocation: item["restoreLocation"],
    restoreCriteria: itemLevelRestoreCriteriaUnionArraySerializer(item["restoreCriteria"]),
    datasourceInfo: datasourceSerializer(item["datasourceInfo"]),
    datasourceSetInfo: !item["datasourceSetInfo"]
      ? item["datasourceSetInfo"]
      : datasourceSetSerializer(item["datasourceSetInfo"]),
    datasourceAuthCredentials: !item["datasourceAuthCredentials"]
      ? item["datasourceAuthCredentials"]
      : authCredentialsUnionSerializer(item["datasourceAuthCredentials"]),
  };
}

export function itemLevelRestoreCriteriaUnionArraySerializer(
  result: Array<ItemLevelRestoreCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return itemLevelRestoreCriteriaUnionSerializer(item);
  });
}

/** Class to contain criteria for item level restore */
export interface ItemLevelRestoreCriteria {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: ItemPathBasedRestoreCriteria, RangeBasedItemLevelRestoreCriteria, KubernetesStorageClassRestoreCriteria, KubernetesPVRestoreCriteria, KubernetesClusterRestoreCriteria, KubernetesClusterVaultTierRestoreCriteria */
  objectType: string;
}

export function itemLevelRestoreCriteriaSerializer(item: ItemLevelRestoreCriteria): any {
  return { objectType: item["objectType"] };
}

/** Alias for ItemLevelRestoreCriteriaUnion */
export type ItemLevelRestoreCriteriaUnion =
  | ItemPathBasedRestoreCriteria
  | RangeBasedItemLevelRestoreCriteria
  | KubernetesStorageClassRestoreCriteria
  | KubernetesPVRestoreCriteria
  | KubernetesClusterRestoreCriteria
  | KubernetesClusterVaultTierRestoreCriteria
  | ItemLevelRestoreCriteria;

export function itemLevelRestoreCriteriaUnionSerializer(item: ItemLevelRestoreCriteriaUnion): any {
  switch (item.objectType) {
    case "ItemPathBasedRestoreCriteria":
      return itemPathBasedRestoreCriteriaSerializer(item as ItemPathBasedRestoreCriteria);

    case "RangeBasedItemLevelRestoreCriteria":
      return rangeBasedItemLevelRestoreCriteriaSerializer(
        item as RangeBasedItemLevelRestoreCriteria,
      );

    case "KubernetesStorageClassRestoreCriteria":
      return kubernetesStorageClassRestoreCriteriaSerializer(
        item as KubernetesStorageClassRestoreCriteria,
      );

    case "KubernetesPVRestoreCriteria":
      return kubernetesPVRestoreCriteriaSerializer(item as KubernetesPVRestoreCriteria);

    case "KubernetesClusterRestoreCriteria":
      return kubernetesClusterRestoreCriteriaSerializer(item as KubernetesClusterRestoreCriteria);

    case "KubernetesClusterVaultTierRestoreCriteria":
      return kubernetesClusterVaultTierRestoreCriteriaSerializer(
        item as KubernetesClusterVaultTierRestoreCriteria,
      );

    default:
      return itemLevelRestoreCriteriaSerializer(item);
  }
}

/** Prefix criteria to be used to during restore */
export interface ItemPathBasedRestoreCriteria extends ItemLevelRestoreCriteria {
  /** The path of the item to be restored. It could be the full path of the item or the path relative to the backup item */
  itemPath: string;
  /** Flag to specify if the path is relative to backup item or full path */
  isPathRelativeToBackupItem: boolean;
  /** The list of prefix strings to be used as filter criteria during restore. These are relative to the item path specified. */
  subItemPathPrefix?: string[];
  /** Rename the item to be restored. Restore will rename the itemPath to this new name if the value is specified otherwise the itemPath will be restored as same name. */
  renameTo?: string;
  /** Type of the specific object - used for deserializing */
  objectType: "ItemPathBasedRestoreCriteria";
}

export function itemPathBasedRestoreCriteriaSerializer(item: ItemPathBasedRestoreCriteria): any {
  return {
    objectType: item["objectType"],
    itemPath: item["itemPath"],
    isPathRelativeToBackupItem: item["isPathRelativeToBackupItem"],
    subItemPathPrefix: !item["subItemPathPrefix"]
      ? item["subItemPathPrefix"]
      : item["subItemPathPrefix"].map((p: any) => {
          return p;
        }),
    renameTo: item["renameTo"],
  };
}

/** Item Level target info for restore operation */
export interface RangeBasedItemLevelRestoreCriteria extends ItemLevelRestoreCriteria {
  /** minimum value for range prefix match */
  minMatchingValue?: string;
  /** maximum value for range prefix match */
  maxMatchingValue?: string;
  /** Type of the specific object - used for deserializing */
  objectType: "RangeBasedItemLevelRestoreCriteria";
}

export function rangeBasedItemLevelRestoreCriteriaSerializer(
  item: RangeBasedItemLevelRestoreCriteria,
): any {
  return {
    objectType: item["objectType"],
    minMatchingValue: item["minMatchingValue"],
    maxMatchingValue: item["maxMatchingValue"],
  };
}

/** Item Level kubernetes storage class target info for restore operation */
export interface KubernetesStorageClassRestoreCriteria extends ItemLevelRestoreCriteria {
  /** Selected storage class name */
  selectedStorageClassName?: string;
  /** Provisioner of the storage class */
  provisioner?: string;
  /** Type of the specific object - used for deserializing */
  objectType: "KubernetesStorageClassRestoreCriteria";
}

export function kubernetesStorageClassRestoreCriteriaSerializer(
  item: KubernetesStorageClassRestoreCriteria,
): any {
  return {
    objectType: item["objectType"],
    selectedStorageClassName: item["selectedStorageClassName"],
    provisioner: item["provisioner"],
  };
}

/** Item Level kubernetes persistent volume target info for restore operation */
export interface KubernetesPVRestoreCriteria extends ItemLevelRestoreCriteria {
  /** Selected persistent volume claim name */
  name?: string;
  /** Selected storage class name for restore operation */
  storageClassName?: string;
  /** Type of the specific object - used for deserializing */
  objectType: "KubernetesPVRestoreCriteria";
}

export function kubernetesPVRestoreCriteriaSerializer(item: KubernetesPVRestoreCriteria): any {
  return {
    objectType: item["objectType"],
    name: item["name"],
    storageClassName: item["storageClassName"],
  };
}

/** kubernetes Cluster Backup target info for restore operation */
export interface KubernetesClusterRestoreCriteria extends ItemLevelRestoreCriteria {
  /** Gets or sets the include cluster resources property. This property if enabled will include cluster scope resources during restore. */
  includeClusterScopeResources: boolean;
  /** Gets or sets the include namespaces property. This property sets the namespaces to be included during restore. */
  includedNamespaces?: string[];
  /** Gets or sets the exclude namespaces property. This property sets the namespaces to be excluded during restore. */
  excludedNamespaces?: string[];
  /** Gets or sets the include resource types property. This property sets the resource types to be included during restore. */
  includedResourceTypes?: string[];
  /** Gets or sets the exclude resource types property. This property sets the resource types to be excluded during restore. */
  excludedResourceTypes?: string[];
  /** Gets or sets the LabelSelectors property. This property sets the resource with such label selectors to be included during restore. */
  labelSelectors?: string[];
  /** Gets or sets the PV (Persistent Volume) Restore Mode property. This property sets whether volumes needs to be restored. */
  persistentVolumeRestoreMode?: PersistentVolumeRestoreMode;
  /** Gets or sets the Conflict Policy property. This property sets policy during conflict of resources during restore. */
  conflictPolicy?: ExistingResourcePolicy;
  /** Gets or sets the Namespace Mappings property. This property sets if namespace needs to be change during restore. */
  namespaceMappings?: Record<string, string>;
  /** Gets or sets the restore hook references. This property sets the hook reference to be executed during restore. */
  restoreHookReferences?: NamespacedNameResource[];
  /** Gets or sets the resource modifier reference. This property sets the reference for resource modifier during restore. */
  resourceModifierReference?: NamespacedNameResource;
  /** Type of the specific object - used for deserializing */
  objectType: "KubernetesClusterRestoreCriteria";
}

export function kubernetesClusterRestoreCriteriaSerializer(
  item: KubernetesClusterRestoreCriteria,
): any {
  return {
    objectType: item["objectType"],
    includeClusterScopeResources: item["includeClusterScopeResources"],
    includedNamespaces: !item["includedNamespaces"]
      ? item["includedNamespaces"]
      : item["includedNamespaces"].map((p: any) => {
          return p;
        }),
    excludedNamespaces: !item["excludedNamespaces"]
      ? item["excludedNamespaces"]
      : item["excludedNamespaces"].map((p: any) => {
          return p;
        }),
    includedResourceTypes: !item["includedResourceTypes"]
      ? item["includedResourceTypes"]
      : item["includedResourceTypes"].map((p: any) => {
          return p;
        }),
    excludedResourceTypes: !item["excludedResourceTypes"]
      ? item["excludedResourceTypes"]
      : item["excludedResourceTypes"].map((p: any) => {
          return p;
        }),
    labelSelectors: !item["labelSelectors"]
      ? item["labelSelectors"]
      : item["labelSelectors"].map((p: any) => {
          return p;
        }),
    persistentVolumeRestoreMode: item["persistentVolumeRestoreMode"],
    conflictPolicy: item["conflictPolicy"],
    namespaceMappings: item["namespaceMappings"],
    restoreHookReferences: !item["restoreHookReferences"]
      ? item["restoreHookReferences"]
      : namespacedNameResourceArraySerializer(item["restoreHookReferences"]),
    resourceModifierReference: !item["resourceModifierReference"]
      ? item["resourceModifierReference"]
      : namespacedNameResourceSerializer(item["resourceModifierReference"]),
  };
}

/** Gets or sets the PV (Persistent Volume) Restore Mode property. This property sets whether volumes needs to be restored. */
export enum KnownPersistentVolumeRestoreMode {
  /** RestoreWithVolumeData */
  RestoreWithVolumeData = "RestoreWithVolumeData",
  /** RestoreWithoutVolumeData */
  RestoreWithoutVolumeData = "RestoreWithoutVolumeData",
}

/**
 * Gets or sets the PV (Persistent Volume) Restore Mode property. This property sets whether volumes needs to be restored. \
 * {@link KnownPersistentVolumeRestoreMode} can be used interchangeably with PersistentVolumeRestoreMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RestoreWithVolumeData** \
 * **RestoreWithoutVolumeData**
 */
export type PersistentVolumeRestoreMode = string;

/** Gets or sets the Conflict Policy property. This property sets policy during conflict of resources during restore. */
export enum KnownExistingResourcePolicy {
  /** Skip */
  Skip = "Skip",
  /** Patch */
  Patch = "Patch",
}

/**
 * Gets or sets the Conflict Policy property. This property sets policy during conflict of resources during restore. \
 * {@link KnownExistingResourcePolicy} can be used interchangeably with ExistingResourcePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Skip** \
 * **Patch**
 */
export type ExistingResourcePolicy = string;

/** kubernetes Cluster Backup target info for restore operation from vault */
export interface KubernetesClusterVaultTierRestoreCriteria extends ItemLevelRestoreCriteria {
  /** Gets or sets the include cluster resources property. This property if enabled will include cluster scope resources during restore from vault. */
  includeClusterScopeResources: boolean;
  /** Gets or sets the include namespaces property. This property sets the namespaces to be included during restore from vault. */
  includedNamespaces?: string[];
  /** Gets or sets the exclude namespaces property. This property sets the namespaces to be excluded during restore from vault. */
  excludedNamespaces?: string[];
  /** Gets or sets the include resource types property. This property sets the resource types to be included during restore from vault. */
  includedResourceTypes?: string[];
  /** Gets or sets the exclude resource types property. This property sets the resource types to be excluded during restore from vault. */
  excludedResourceTypes?: string[];
  /** Gets or sets the LabelSelectors property. This property sets the resource with such label selectors to be included during restore from vault. */
  labelSelectors?: string[];
  /** Gets or sets the PV (Persistent Volume) Restore Mode property. This property sets whether volumes needs to be restored from vault. */
  persistentVolumeRestoreMode?: PersistentVolumeRestoreMode;
  /** Gets or sets the Conflict Policy property. This property sets policy during conflict of resources during restore from vault. */
  conflictPolicy?: ExistingResourcePolicy;
  /** Gets or sets the Namespace Mappings property. This property sets if namespace needs to be change during restore from vault. */
  namespaceMappings?: Record<string, string>;
  /** Gets or sets the restore hook references. This property sets the hook reference to be executed during restore from vault. */
  restoreHookReferences?: NamespacedNameResource[];
  /** Gets or sets the staging RG Id for creating staging disks and snapshots during restore from vault. */
  stagingResourceGroupId?: string;
  /** Gets or sets the staging Storage Account Id for creating backup extension object store data during restore from vault. */
  stagingStorageAccountId?: string;
  /** Gets or sets the resource modifier reference. This property sets the reference for resource modifier during restore. */
  resourceModifierReference?: NamespacedNameResource;
  /** Type of the specific object - used for deserializing */
  objectType: "KubernetesClusterVaultTierRestoreCriteria";
}

export function kubernetesClusterVaultTierRestoreCriteriaSerializer(
  item: KubernetesClusterVaultTierRestoreCriteria,
): any {
  return {
    objectType: item["objectType"],
    includeClusterScopeResources: item["includeClusterScopeResources"],
    includedNamespaces: !item["includedNamespaces"]
      ? item["includedNamespaces"]
      : item["includedNamespaces"].map((p: any) => {
          return p;
        }),
    excludedNamespaces: !item["excludedNamespaces"]
      ? item["excludedNamespaces"]
      : item["excludedNamespaces"].map((p: any) => {
          return p;
        }),
    includedResourceTypes: !item["includedResourceTypes"]
      ? item["includedResourceTypes"]
      : item["includedResourceTypes"].map((p: any) => {
          return p;
        }),
    excludedResourceTypes: !item["excludedResourceTypes"]
      ? item["excludedResourceTypes"]
      : item["excludedResourceTypes"].map((p: any) => {
          return p;
        }),
    labelSelectors: !item["labelSelectors"]
      ? item["labelSelectors"]
      : item["labelSelectors"].map((p: any) => {
          return p;
        }),
    persistentVolumeRestoreMode: item["persistentVolumeRestoreMode"],
    conflictPolicy: item["conflictPolicy"],
    namespaceMappings: item["namespaceMappings"],
    restoreHookReferences: !item["restoreHookReferences"]
      ? item["restoreHookReferences"]
      : namespacedNameResourceArraySerializer(item["restoreHookReferences"]),
    stagingResourceGroupId: item["stagingResourceGroupId"],
    stagingStorageAccountId: item["stagingStorageAccountId"],
    resourceModifierReference: !item["resourceModifierReference"]
      ? item["resourceModifierReference"]
      : namespacedNameResourceSerializer(item["resourceModifierReference"]),
  };
}

/** Class encapsulating restore as files target parameters */
export interface RestoreFilesTargetInfo extends RestoreTargetInfoBase {
  /** Destination of RestoreAsFiles operation, when destination is not a datasource */
  targetDetails: TargetDetails;
  /** Type of Datasource object, used to initialize the right inherited type */
  objectType: "RestoreFilesTargetInfo";
}

export function restoreFilesTargetInfoSerializer(item: RestoreFilesTargetInfo): any {
  return {
    objectType: item["objectType"],
    recoveryOption: item["recoveryOption"],
    restoreLocation: item["restoreLocation"],
    targetDetails: targetDetailsSerializer(item["targetDetails"]),
  };
}

/** Class encapsulating target details, used where the destination is not a datasource */
export interface TargetDetails {
  /**
   * Restore operation may create multiple files inside location pointed by Url
   * Below will be the common prefix for all of them
   */
  filePrefix: string;
  /**
   * Denotes the target location where the data will be restored,
   * string value for the enum {Microsoft.Internal.AzureBackup.DataProtection.Common.Interface.RestoreTargetLocationType}
   */
  restoreTargetLocationType: RestoreTargetLocationType;
  /** Url denoting the restore destination. It can point to container / file share etc */
  url: string;
  /**
   * Full ARM Id denoting the restore destination. It is the ARM Id pointing to container / file share
   * This is optional if the target subscription can be identified with the URL field. If not
   * then this is needed if CrossSubscriptionRestore field of BackupVault is in any of the disabled states
   */
  targetResourceArmId?: string;
}

export function targetDetailsSerializer(item: TargetDetails): any {
  return {
    filePrefix: item["filePrefix"],
    restoreTargetLocationType: item["restoreTargetLocationType"],
    url: item["url"],
    targetResourceArmId: item["targetResourceArmId"],
  };
}

/**
 * Denotes the target location where the data will be restored,
 * string value for the enum {Microsoft.Internal.AzureBackup.DataProtection.Common.Interface.RestoreTargetLocationType}
 */
export enum KnownRestoreTargetLocationType {
  /** Invalid */
  Invalid = "Invalid",
  /** AzureBlobs */
  AzureBlobs = "AzureBlobs",
  /** AzureFiles */
  AzureFiles = "AzureFiles",
}

/**
 * Denotes the target location where the data will be restored,
 * string value for the enum {Microsoft.Internal.AzureBackup.DataProtection.Common.Interface.RestoreTargetLocationType} \
 * {@link KnownRestoreTargetLocationType} can be used interchangeably with RestoreTargetLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AzureBlobs** \
 * **AzureFiles**
 */
export type RestoreTargetLocationType = string;

/** Class encapsulating restore target parameters */
export interface RestoreTargetInfo extends RestoreTargetInfoBase {
  /** Information of target DS */
  datasourceInfo: Datasource;
  /** Information of target DS Set */
  datasourceSetInfo?: DatasourceSet;
  /** Credentials to use to authenticate with data source provider. */
  datasourceAuthCredentials?: AuthCredentialsUnion;
  /** Type of Datasource object, used to initialize the right inherited type */
  objectType: "RestoreTargetInfo";
}

export function restoreTargetInfoSerializer(item: RestoreTargetInfo): any {
  return {
    objectType: item["objectType"],
    recoveryOption: item["recoveryOption"],
    restoreLocation: item["restoreLocation"],
    datasourceInfo: datasourceSerializer(item["datasourceInfo"]),
    datasourceSetInfo: !item["datasourceSetInfo"]
      ? item["datasourceSetInfo"]
      : datasourceSetSerializer(item["datasourceSetInfo"]),
    datasourceAuthCredentials: !item["datasourceAuthCredentials"]
      ? item["datasourceAuthCredentials"]
      : authCredentialsUnionSerializer(item["datasourceAuthCredentials"]),
  };
}

/** Gets or sets the type of the source data store. */
export enum KnownSourceDataStoreType {
  /** ArchiveStore */
  ArchiveStore = "ArchiveStore",
  /** SnapshotStore */
  SnapshotStore = "SnapshotStore",
  /** OperationalStore */
  OperationalStore = "OperationalStore",
  /** VaultStore */
  VaultStore = "VaultStore",
}

/**
 * Gets or sets the type of the source data store. \
 * {@link KnownSourceDataStoreType} can be used interchangeably with SourceDataStoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ArchiveStore** \
 * **SnapshotStore** \
 * **OperationalStore** \
 * **VaultStore**
 */
export type SourceDataStoreType = string;

/** Azure backup recoveryPoint based restore request */
export interface AzureBackupRecoveryPointBasedRestoreRequest extends AzureBackupRestoreRequest {
  recoveryPointId: string;
  objectType:
    | "AzureBackupRecoveryPointBasedRestoreRequest"
    | "AzureBackupRestoreWithRehydrationRequest";
}

export function azureBackupRecoveryPointBasedRestoreRequestSerializer(
  item: AzureBackupRecoveryPointBasedRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    restoreTargetInfo: restoreTargetInfoBaseUnionSerializer(item["restoreTargetInfo"]),
    sourceDataStoreType: item["sourceDataStoreType"],
    sourceResourceId: item["sourceResourceId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    identityDetails: !item["identityDetails"]
      ? item["identityDetails"]
      : identityDetailsSerializer(item["identityDetails"]),
    recoveryPointId: item["recoveryPointId"],
  };
}

/** Alias for AzureBackupRecoveryPointBasedRestoreRequestUnion */
export type AzureBackupRecoveryPointBasedRestoreRequestUnion =
  | AzureBackupRestoreWithRehydrationRequest
  | AzureBackupRecoveryPointBasedRestoreRequest;

export function azureBackupRecoveryPointBasedRestoreRequestUnionSerializer(
  item: AzureBackupRecoveryPointBasedRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureBackupRestoreWithRehydrationRequest":
      return azureBackupRestoreWithRehydrationRequestSerializer(
        item as AzureBackupRestoreWithRehydrationRequest,
      );

    default:
      return azureBackupRecoveryPointBasedRestoreRequestSerializer(item);
  }
}

/** AzureBackup Restore with Rehydration Request */
export interface AzureBackupRestoreWithRehydrationRequest extends AzureBackupRecoveryPointBasedRestoreRequest {
  /** Priority to be used for rehydration. Values High or Standard */
  rehydrationPriority: RehydrationPriority;
  /** Retention duration in ISO 8601 format i.e P10D . */
  rehydrationRetentionDuration: string;
  objectType: "AzureBackupRestoreWithRehydrationRequest";
}

export function azureBackupRestoreWithRehydrationRequestSerializer(
  item: AzureBackupRestoreWithRehydrationRequest,
): any {
  return {
    recoveryPointId: item["recoveryPointId"],
    objectType: item["objectType"],
    restoreTargetInfo: restoreTargetInfoBaseUnionSerializer(item["restoreTargetInfo"]),
    sourceDataStoreType: item["sourceDataStoreType"],
    sourceResourceId: item["sourceResourceId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    identityDetails: !item["identityDetails"]
      ? item["identityDetails"]
      : identityDetailsSerializer(item["identityDetails"]),
    rehydrationPriority: item["rehydrationPriority"],
    rehydrationRetentionDuration: item["rehydrationRetentionDuration"],
  };
}

/** AzureBackup RecoveryPointTime Based Restore Request */
export interface AzureBackupRecoveryTimeBasedRestoreRequest extends AzureBackupRestoreRequest {
  /** The recovery time in ISO 8601 format example - 2020-08-14T17:30:00.0000000Z. */
  recoveryPointTime: string;
  objectType: "AzureBackupRecoveryTimeBasedRestoreRequest";
}

export function azureBackupRecoveryTimeBasedRestoreRequestSerializer(
  item: AzureBackupRecoveryTimeBasedRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    restoreTargetInfo: restoreTargetInfoBaseUnionSerializer(item["restoreTargetInfo"]),
    sourceDataStoreType: item["sourceDataStoreType"],
    sourceResourceId: item["sourceResourceId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    identityDetails: !item["identityDetails"]
      ? item["identityDetails"]
      : identityDetailsSerializer(item["identityDetails"]),
    recoveryPointTime: item["recoveryPointTime"],
  };
}

/** Request body of Stop protection when MUA is Enabled */
export interface StopProtectionRequest {
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
}

export function stopProtectionRequestSerializer(item: StopProtectionRequest): any {
  return {
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** Request body of Suspend backup when MUA is Enabled */
export interface SuspendBackupRequest {
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
}

export function suspendBackupRequestSerializer(item: SuspendBackupRequest): any {
  return {
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** Sync BackupInstance Request */
export interface SyncBackupInstanceRequest {
  /** Field indicating sync type e.g. to sync only in case of failure or in all cases */
  syncType?: SyncType;
}

export function syncBackupInstanceRequestSerializer(item: SyncBackupInstanceRequest): any {
  return { syncType: item["syncType"] };
}

/** Field indicating sync type e.g. to sync only in case of failure or in all cases */
export enum KnownSyncType {
  /** Default */
  Default = "Default",
  /** ForceResync */
  ForceResync = "ForceResync",
}

/**
 * Field indicating sync type e.g. to sync only in case of failure or in all cases \
 * {@link KnownSyncType} can be used interchangeably with SyncType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **ForceResync**
 */
export type SyncType = string;

/** Validate restore request object */
export interface ValidateRestoreRequestObject {
  /** Gets or sets the restore request object. */
  restoreRequestObject: AzureBackupRestoreRequestUnion;
}

export function validateRestoreRequestObjectSerializer(item: ValidateRestoreRequestObject): any {
  return {
    restoreRequestObject: azureBackupRestoreRequestUnionSerializer(item["restoreRequestObject"]),
  };
}

/** Cross Region Restore Request Object */
export interface CrossRegionRestoreRequestObject {
  /** Gets or sets the restore request object. */
  restoreRequestObject: AzureBackupRestoreRequestUnion;
  /** Cross region restore details. */
  crossRegionRestoreDetails: CrossRegionRestoreDetails;
}

export function crossRegionRestoreRequestObjectSerializer(
  item: CrossRegionRestoreRequestObject,
): any {
  return {
    restoreRequestObject: azureBackupRestoreRequestUnionSerializer(item["restoreRequestObject"]),
    crossRegionRestoreDetails: crossRegionRestoreDetailsSerializer(
      item["crossRegionRestoreDetails"],
    ),
  };
}

/** Cross Region Restore details */
export interface CrossRegionRestoreDetails {
  sourceRegion: string;
  sourceBackupInstanceId: string;
}

export function crossRegionRestoreDetailsSerializer(item: CrossRegionRestoreDetails): any {
  return {
    sourceRegion: item["sourceRegion"],
    sourceBackupInstanceId: item["sourceBackupInstanceId"],
  };
}

/** Cross Region Restore Request Object */
export interface ValidateCrossRegionRestoreRequestObject {
  /** Gets or sets the restore request object. */
  restoreRequestObject: AzureBackupRestoreRequestUnion;
  /** Cross region restore details. */
  crossRegionRestoreDetails: CrossRegionRestoreDetails;
}

export function validateCrossRegionRestoreRequestObjectSerializer(
  item: ValidateCrossRegionRestoreRequestObject,
): any {
  return {
    restoreRequestObject: azureBackupRestoreRequestUnionSerializer(item["restoreRequestObject"]),
    crossRegionRestoreDetails: crossRegionRestoreDetailsSerializer(
      item["crossRegionRestoreDetails"],
    ),
  };
}

/** Backup Vault Resource */
export interface BackupVaultResource extends TrackedResource {
  /** BackupVaultResource properties */
  properties: BackupVault;
  /** Input Managed Identity Details */
  identity?: DppIdentityDetails;
  /** Optional ETag. */
  eTag?: string;
}

export function backupVaultResourceSerializer(item: BackupVaultResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: backupVaultSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : dppIdentityDetailsSerializer(item["identity"]),
    eTag: item["eTag"],
  };
}

export function backupVaultResourceDeserializer(item: any): BackupVaultResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: backupVaultDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : dppIdentityDetailsDeserializer(item["identity"]),
    eTag: item["eTag"],
  };
}

/** Backup Vault */
export interface BackupVault {
  /** Monitoring Settings */
  monitoringSettings?: MonitoringSettings;
  /** Provisioning state of the BackupVault resource */
  readonly provisioningState?: ProvisioningState;
  /** Resource move state for backup vault */
  readonly resourceMoveState?: ResourceMoveState;
  /** Resource move details for backup vault */
  readonly resourceMoveDetails?: ResourceMoveDetails;
  /** Security Settings */
  securitySettings?: SecuritySettings;
  /** Storage Settings */
  storageSettings: StorageSetting[];
  /** Is vault protected by resource guard */
  readonly isVaultProtectedByResourceGuard?: boolean;
  /** Feature Settings */
  featureSettings?: FeatureSettings;
  /** Secure Score of Backup Vault */
  readonly secureScore?: SecureScoreLevel;
  /** Security Level of Backup Vault */
  readonly bcdrSecurityLevel?: BcdrSecurityLevel;
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
  /** List of replicated regions for Backup Vault */
  replicatedRegions?: string[];
}

export function backupVaultSerializer(item: BackupVault): any {
  return {
    monitoringSettings: !item["monitoringSettings"]
      ? item["monitoringSettings"]
      : monitoringSettingsSerializer(item["monitoringSettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : securitySettingsSerializer(item["securitySettings"]),
    storageSettings: storageSettingArraySerializer(item["storageSettings"]),
    featureSettings: !item["featureSettings"]
      ? item["featureSettings"]
      : featureSettingsSerializer(item["featureSettings"]),
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    replicatedRegions: !item["replicatedRegions"]
      ? item["replicatedRegions"]
      : item["replicatedRegions"].map((p: any) => {
          return p;
        }),
  };
}

export function backupVaultDeserializer(item: any): BackupVault {
  return {
    monitoringSettings: !item["monitoringSettings"]
      ? item["monitoringSettings"]
      : monitoringSettingsDeserializer(item["monitoringSettings"]),
    provisioningState: item["provisioningState"],
    resourceMoveState: item["resourceMoveState"],
    resourceMoveDetails: !item["resourceMoveDetails"]
      ? item["resourceMoveDetails"]
      : resourceMoveDetailsDeserializer(item["resourceMoveDetails"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : securitySettingsDeserializer(item["securitySettings"]),
    storageSettings: storageSettingArrayDeserializer(item["storageSettings"]),
    isVaultProtectedByResourceGuard: item["isVaultProtectedByResourceGuard"],
    featureSettings: !item["featureSettings"]
      ? item["featureSettings"]
      : featureSettingsDeserializer(item["featureSettings"]),
    secureScore: item["secureScore"],
    bcdrSecurityLevel: item["bcdrSecurityLevel"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    replicatedRegions: !item["replicatedRegions"]
      ? item["replicatedRegions"]
      : item["replicatedRegions"].map((p: any) => {
          return p;
        }),
  };
}

/** Monitoring Settings */
export interface MonitoringSettings {
  /** Settings for Azure Monitor based alerts */
  azureMonitorAlertSettings?: AzureMonitorAlertSettings;
}

export function monitoringSettingsSerializer(item: MonitoringSettings): any {
  return {
    azureMonitorAlertSettings: !item["azureMonitorAlertSettings"]
      ? item["azureMonitorAlertSettings"]
      : azureMonitorAlertSettingsSerializer(item["azureMonitorAlertSettings"]),
  };
}

export function monitoringSettingsDeserializer(item: any): MonitoringSettings {
  return {
    azureMonitorAlertSettings: !item["azureMonitorAlertSettings"]
      ? item["azureMonitorAlertSettings"]
      : azureMonitorAlertSettingsDeserializer(item["azureMonitorAlertSettings"]),
  };
}

/** Settings for Azure Monitor based alerts */
export interface AzureMonitorAlertSettings {
  alertsForAllJobFailures?: AlertsState;
}

export function azureMonitorAlertSettingsSerializer(item: AzureMonitorAlertSettings): any {
  return { alertsForAllJobFailures: item["alertsForAllJobFailures"] };
}

export function azureMonitorAlertSettingsDeserializer(item: any): AzureMonitorAlertSettings {
  return {
    alertsForAllJobFailures: item["alertsForAllJobFailures"],
  };
}

/** Known values of {@link AlertsState} that the service accepts. */
export enum KnownAlertsState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of AlertsState */
export type AlertsState = string;

/** Provisioning state of the BackupVault resource */
export enum KnownProvisioningState {
  /** Failed */
  Failed = "Failed",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Unknown */
  Unknown = "Unknown",
  /** Updating */
  Updating = "Updating",
}

/**
 * Provisioning state of the BackupVault resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failed** \
 * **Provisioning** \
 * **Succeeded** \
 * **Unknown** \
 * **Updating**
 */
export type ProvisioningState = string;

/** Resource move state for backup vault */
export enum KnownResourceMoveState {
  /** Unknown */
  Unknown = "Unknown",
  /** InProgress */
  InProgress = "InProgress",
  /** PrepareFailed */
  PrepareFailed = "PrepareFailed",
  /** CommitFailed */
  CommitFailed = "CommitFailed",
  /** Failed */
  Failed = "Failed",
  /** PrepareTimedout */
  PrepareTimedout = "PrepareTimedout",
  /** CommitTimedout */
  CommitTimedout = "CommitTimedout",
  /** CriticalFailure */
  CriticalFailure = "CriticalFailure",
  /** PartialSuccess */
  PartialSuccess = "PartialSuccess",
  /** MoveSucceeded */
  MoveSucceeded = "MoveSucceeded",
}

/**
 * Resource move state for backup vault \
 * {@link KnownResourceMoveState} can be used interchangeably with ResourceMoveState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **PrepareFailed** \
 * **CommitFailed** \
 * **Failed** \
 * **PrepareTimedout** \
 * **CommitTimedout** \
 * **CriticalFailure** \
 * **PartialSuccess** \
 * **MoveSucceeded**
 */
export type ResourceMoveState = string;

/** ResourceMoveDetails will be returned in response to GetResource call from ARM */
export interface ResourceMoveDetails {
  /** CorrelationId of latest ResourceMove operation attempted */
  operationId?: string;
  /** Start time in UTC of latest ResourceMove operation attempted. ISO 8601 format. */
  startTimeUtc?: string;
  /** Completion time in UTC of latest ResourceMove operation attempted. ISO 8601 format. */
  completionTimeUtc?: string;
  /** ARM resource path of source resource */
  sourceResourcePath?: string;
  /** ARM resource path of target resource used in latest ResourceMove operation */
  targetResourcePath?: string;
}

export function resourceMoveDetailsDeserializer(item: any): ResourceMoveDetails {
  return {
    operationId: item["operationId"],
    startTimeUtc: item["startTimeUtc"],
    completionTimeUtc: item["completionTimeUtc"],
    sourceResourcePath: item["sourceResourcePath"],
    targetResourcePath: item["targetResourcePath"],
  };
}

/** Class containing security settings of vault */
export interface SecuritySettings {
  /** Soft delete related settings */
  softDeleteSettings?: SoftDeleteSettings;
  /** Immutability Settings at vault level */
  immutabilitySettings?: ImmutabilitySettings;
  /** Customer Managed Key details of the resource. */
  encryptionSettings?: EncryptionSettings;
}

export function securitySettingsSerializer(item: SecuritySettings): any {
  return {
    softDeleteSettings: !item["softDeleteSettings"]
      ? item["softDeleteSettings"]
      : softDeleteSettingsSerializer(item["softDeleteSettings"]),
    immutabilitySettings: !item["immutabilitySettings"]
      ? item["immutabilitySettings"]
      : immutabilitySettingsSerializer(item["immutabilitySettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsSerializer(item["encryptionSettings"]),
  };
}

export function securitySettingsDeserializer(item: any): SecuritySettings {
  return {
    softDeleteSettings: !item["softDeleteSettings"]
      ? item["softDeleteSettings"]
      : softDeleteSettingsDeserializer(item["softDeleteSettings"]),
    immutabilitySettings: !item["immutabilitySettings"]
      ? item["immutabilitySettings"]
      : immutabilitySettingsDeserializer(item["immutabilitySettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsDeserializer(item["encryptionSettings"]),
  };
}

/** Soft delete related settings */
export interface SoftDeleteSettings {
  /** State of soft delete */
  state?: SoftDeleteState;
  /** Soft delete retention duration */
  retentionDurationInDays?: number;
}

export function softDeleteSettingsSerializer(item: SoftDeleteSettings): any {
  return {
    state: item["state"],
    retentionDurationInDays: item["retentionDurationInDays"],
  };
}

export function softDeleteSettingsDeserializer(item: any): SoftDeleteSettings {
  return {
    state: item["state"],
    retentionDurationInDays: item["retentionDurationInDays"],
  };
}

/** State of soft delete */
export enum KnownSoftDeleteState {
  /** Soft Delete is turned off for the BackupVault */
  Off = "Off",
  /** Soft Delete is enabled for the BackupVault but can be turned off */
  On = "On",
  /** Soft Delete is permanently enabled for the BackupVault and the setting cannot be changed */
  AlwaysOn = "AlwaysOn",
}

/**
 * State of soft delete \
 * {@link KnownSoftDeleteState} can be used interchangeably with SoftDeleteState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Off**: Soft Delete is turned off for the BackupVault \
 * **On**: Soft Delete is enabled for the BackupVault but can be turned off \
 * **AlwaysOn**: Soft Delete is permanently enabled for the BackupVault and the setting cannot be changed
 */
export type SoftDeleteState = string;

/** Immutability Settings at vault level */
export interface ImmutabilitySettings {
  /** Immutability state */
  state?: ImmutabilityState;
}

export function immutabilitySettingsSerializer(item: ImmutabilitySettings): any {
  return { state: item["state"] };
}

export function immutabilitySettingsDeserializer(item: any): ImmutabilitySettings {
  return {
    state: item["state"],
  };
}

/** Immutability state */
export enum KnownImmutabilityState {
  /** Disabled */
  Disabled = "Disabled",
  /** Unlocked */
  Unlocked = "Unlocked",
  /** Locked */
  Locked = "Locked",
}

/**
 * Immutability state \
 * {@link KnownImmutabilityState} can be used interchangeably with ImmutabilityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Unlocked** \
 * **Locked**
 */
export type ImmutabilityState = string;

/** Customer Managed Key details of the resource. */
export interface EncryptionSettings {
  /** Encryption state of the Backup Vault. */
  state?: EncryptionState;
  /** The properties of the Key Vault which hosts CMK */
  keyVaultProperties?: CmkKeyVaultProperties;
  /** The details of the managed identity used for CMK */
  kekIdentity?: CmkKekIdentity;
  /** Enabling/Disabling the Double Encryption state */
  infrastructureEncryption?: InfrastructureEncryptionState;
}

export function encryptionSettingsSerializer(item: EncryptionSettings): any {
  return {
    state: item["state"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : cmkKeyVaultPropertiesSerializer(item["keyVaultProperties"]),
    kekIdentity: !item["kekIdentity"]
      ? item["kekIdentity"]
      : cmkKekIdentitySerializer(item["kekIdentity"]),
    infrastructureEncryption: item["infrastructureEncryption"],
  };
}

export function encryptionSettingsDeserializer(item: any): EncryptionSettings {
  return {
    state: item["state"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : cmkKeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    kekIdentity: !item["kekIdentity"]
      ? item["kekIdentity"]
      : cmkKekIdentityDeserializer(item["kekIdentity"]),
    infrastructureEncryption: item["infrastructureEncryption"],
  };
}

/** Encryption state of the Backup Vault. */
export enum KnownEncryptionState {
  /** CMK encryption is enabled on the Backup Vault */
  Enabled = "Enabled",
  /** CMK encryption is disabled on the Backup Vault. User can not set this state once Encryption State is 'Enabled'. */
  Disabled = "Disabled",
  /** CMK encryption is in inconsistent state on the Backup Vault. This state indicates that user needs to retry the encryption settings operation immediately to correct the state. */
  Inconsistent = "Inconsistent",
}

/**
 * Encryption state of the Backup Vault. \
 * {@link KnownEncryptionState} can be used interchangeably with EncryptionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: CMK encryption is enabled on the Backup Vault \
 * **Disabled**: CMK encryption is disabled on the Backup Vault. User can not set this state once Encryption State is 'Enabled'. \
 * **Inconsistent**: CMK encryption is in inconsistent state on the Backup Vault. This state indicates that user needs to retry the encryption settings operation immediately to correct the state.
 */
export type EncryptionState = string;

/** The properties of the Key Vault which hosts CMK */
export interface CmkKeyVaultProperties {
  /** The key uri of the Customer Managed Key */
  keyUri?: string;
}

export function cmkKeyVaultPropertiesSerializer(item: CmkKeyVaultProperties): any {
  return { keyUri: item["keyUri"] };
}

export function cmkKeyVaultPropertiesDeserializer(item: any): CmkKeyVaultProperties {
  return {
    keyUri: item["keyUri"],
  };
}

/** The details of the managed identity used for CMK */
export interface CmkKekIdentity {
  /** The identity type. 'SystemAssigned' and 'UserAssigned' are mutually exclusive. 'SystemAssigned' will use implicitly created managed identity. */
  identityType?: IdentityType;
  /** The managed identity to be used which has access permissions to the Key Vault. Provide a value here in case identity types: 'UserAssigned' only. */
  identityId?: string;
}

export function cmkKekIdentitySerializer(item: CmkKekIdentity): any {
  return { identityType: item["identityType"], identityId: item["identityId"] };
}

export function cmkKekIdentityDeserializer(item: any): CmkKekIdentity {
  return {
    identityType: item["identityType"],
    identityId: item["identityId"],
  };
}

/** The identity type. 'SystemAssigned' and 'UserAssigned' are mutually exclusive. 'SystemAssigned' will use implicitly created managed identity. */
export enum KnownIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The identity type. 'SystemAssigned' and 'UserAssigned' are mutually exclusive. 'SystemAssigned' will use implicitly created managed identity. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **UserAssigned**
 */
export type IdentityType = string;

/** Enabling/Disabling the Double Encryption state */
export enum KnownInfrastructureEncryptionState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enabling/Disabling the Double Encryption state \
 * {@link KnownInfrastructureEncryptionState} can be used interchangeably with InfrastructureEncryptionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type InfrastructureEncryptionState = string;

export function storageSettingArraySerializer(result: Array<StorageSetting>): any[] {
  return result.map((item) => {
    return storageSettingSerializer(item);
  });
}

export function storageSettingArrayDeserializer(result: Array<StorageSetting>): any[] {
  return result.map((item) => {
    return storageSettingDeserializer(item);
  });
}

/** Storage setting */
export interface StorageSetting {
  /** Gets or sets the type of the datastore. */
  datastoreType?: StorageSettingStoreTypes;
  /** Gets or sets the type. */
  type?: StorageSettingTypes;
}

export function storageSettingSerializer(item: StorageSetting): any {
  return { datastoreType: item["datastoreType"], type: item["type"] };
}

export function storageSettingDeserializer(item: any): StorageSetting {
  return {
    datastoreType: item["datastoreType"],
    type: item["type"],
  };
}

/** Gets or sets the type of the datastore. */
export enum KnownStorageSettingStoreTypes {
  /** ArchiveStore */
  ArchiveStore = "ArchiveStore",
  /** OperationalStore */
  OperationalStore = "OperationalStore",
  /** VaultStore */
  VaultStore = "VaultStore",
}

/**
 * Gets or sets the type of the datastore. \
 * {@link KnownStorageSettingStoreTypes} can be used interchangeably with StorageSettingStoreTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ArchiveStore** \
 * **OperationalStore** \
 * **VaultStore**
 */
export type StorageSettingStoreTypes = string;

/** Gets or sets the type. */
export enum KnownStorageSettingTypes {
  /** GeoRedundant */
  GeoRedundant = "GeoRedundant",
  /** LocallyRedundant */
  LocallyRedundant = "LocallyRedundant",
  /** ZoneRedundant */
  ZoneRedundant = "ZoneRedundant",
}

/**
 * Gets or sets the type. \
 * {@link KnownStorageSettingTypes} can be used interchangeably with StorageSettingTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeoRedundant** \
 * **LocallyRedundant** \
 * **ZoneRedundant**
 */
export type StorageSettingTypes = string;

/** Class containing feature settings of vault */
export interface FeatureSettings {
  /** CrossSubscriptionRestore Settings */
  crossSubscriptionRestoreSettings?: CrossSubscriptionRestoreSettings;
  crossRegionRestoreSettings?: CrossRegionRestoreSettings;
}

export function featureSettingsSerializer(item: FeatureSettings): any {
  return {
    crossSubscriptionRestoreSettings: !item["crossSubscriptionRestoreSettings"]
      ? item["crossSubscriptionRestoreSettings"]
      : crossSubscriptionRestoreSettingsSerializer(item["crossSubscriptionRestoreSettings"]),
    crossRegionRestoreSettings: !item["crossRegionRestoreSettings"]
      ? item["crossRegionRestoreSettings"]
      : crossRegionRestoreSettingsSerializer(item["crossRegionRestoreSettings"]),
  };
}

export function featureSettingsDeserializer(item: any): FeatureSettings {
  return {
    crossSubscriptionRestoreSettings: !item["crossSubscriptionRestoreSettings"]
      ? item["crossSubscriptionRestoreSettings"]
      : crossSubscriptionRestoreSettingsDeserializer(item["crossSubscriptionRestoreSettings"]),
    crossRegionRestoreSettings: !item["crossRegionRestoreSettings"]
      ? item["crossRegionRestoreSettings"]
      : crossRegionRestoreSettingsDeserializer(item["crossRegionRestoreSettings"]),
  };
}

/** CrossSubscriptionRestore Settings */
export interface CrossSubscriptionRestoreSettings {
  /** CrossSubscriptionRestore state */
  state?: CrossSubscriptionRestoreState;
}

export function crossSubscriptionRestoreSettingsSerializer(
  item: CrossSubscriptionRestoreSettings,
): any {
  return { state: item["state"] };
}

export function crossSubscriptionRestoreSettingsDeserializer(
  item: any,
): CrossSubscriptionRestoreSettings {
  return {
    state: item["state"],
  };
}

/** CrossSubscriptionRestore state */
export enum KnownCrossSubscriptionRestoreState {
  /** Disabled */
  Disabled = "Disabled",
  /** PermanentlyDisabled */
  PermanentlyDisabled = "PermanentlyDisabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * CrossSubscriptionRestore state \
 * {@link KnownCrossSubscriptionRestoreState} can be used interchangeably with CrossSubscriptionRestoreState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **PermanentlyDisabled** \
 * **Enabled**
 */
export type CrossSubscriptionRestoreState = string;

/** model interface CrossRegionRestoreSettings */
export interface CrossRegionRestoreSettings {
  /** CrossRegionRestore state */
  state?: CrossRegionRestoreState;
}

export function crossRegionRestoreSettingsSerializer(item: CrossRegionRestoreSettings): any {
  return { state: item["state"] };
}

export function crossRegionRestoreSettingsDeserializer(item: any): CrossRegionRestoreSettings {
  return {
    state: item["state"],
  };
}

/** CrossRegionRestore state */
export enum KnownCrossRegionRestoreState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * CrossRegionRestore state \
 * {@link KnownCrossRegionRestoreState} can be used interchangeably with CrossRegionRestoreState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type CrossRegionRestoreState = string;

/** Secure Score of Backup Vault */
export enum KnownSecureScoreLevel {
  /** None */
  None = "None",
  /** Minimum */
  Minimum = "Minimum",
  /** Adequate */
  Adequate = "Adequate",
  /** Maximum */
  Maximum = "Maximum",
  /** NotSupported */
  NotSupported = "NotSupported",
}

/**
 * Secure Score of Backup Vault \
 * {@link KnownSecureScoreLevel} can be used interchangeably with SecureScoreLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Minimum** \
 * **Adequate** \
 * **Maximum** \
 * **NotSupported**
 */
export type SecureScoreLevel = string;

/** Security Level of Backup Vault */
export enum KnownBcdrSecurityLevel {
  /** Poor */
  Poor = "Poor",
  /** Fair */
  Fair = "Fair",
  /** Good */
  Good = "Good",
  /** Excellent */
  Excellent = "Excellent",
  /** NotSupported */
  NotSupported = "NotSupported",
}

/**
 * Security Level of Backup Vault \
 * {@link KnownBcdrSecurityLevel} can be used interchangeably with BcdrSecurityLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Poor** \
 * **Fair** \
 * **Good** \
 * **Excellent** \
 * **NotSupported**
 */
export type BcdrSecurityLevel = string;

/** Identity details */
export interface DppIdentityDetails {
  /** The object ID of the service principal object for the managed identity that is used to grant role-based access to an Azure resource. */
  readonly principalId?: string;
  /** A Globally Unique Identifier (GUID) that represents the Azure AD tenant where the resource is now a member. */
  readonly tenantId?: string;
  /** The identityType which can be either SystemAssigned, UserAssigned, 'SystemAssigned,UserAssigned' or None */
  type?: string;
  /** Gets or sets the user assigned identities. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function dppIdentityDetailsSerializer(item: DppIdentityDetails): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function dppIdentityDetailsDeserializer(item: any): DppIdentityDetails {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
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
    tags: item["tags"],
    location: item["location"],
  };
}

/** Base resource under Microsoft.DataProtection provider namespace */
export interface DppBaseResource extends ProxyResource {}

export function dppBaseResourceDeserializer(item: any): DppBaseResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Base for all lists of V2 resources. */
export interface _DppBaseResourceList {
  /** The DppBaseResource items on this page */
  value: DppBaseResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dppBaseResourceListDeserializer(item: any): _DppBaseResourceList {
  return {
    value: dppBaseResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dppBaseResourceArrayDeserializer(result: Array<DppBaseResource>): any[] {
  return result.map((item) => {
    return dppBaseResourceDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface ResourceGuardResource extends TrackedResource {
  /** ResourceGuardResource properties */
  properties?: ResourceGuard;
  /** Optional ETag. */
  eTag?: string;
}

export function resourceGuardResourceSerializer(item: ResourceGuardResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : resourceGuardSerializer(item["properties"]),
    eTag: item["eTag"],
  };
}

export function resourceGuardResourceDeserializer(item: any): ResourceGuardResource {
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
      : resourceGuardDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** model interface ResourceGuard */
export interface ResourceGuard {
  /** Provisioning state of the BackupVault resource */
  readonly provisioningState?: ProvisioningState;
  /** This flag indicates whether auto approval is allowed or not. */
  readonly allowAutoApprovals?: boolean;
  /** {readonly} List of operation details those are protected by the ResourceGuard resource */
  readonly resourceGuardOperations?: ResourceGuardOperation[];
  /** List of critical operations which are not protected by this resourceGuard */
  vaultCriticalOperationExclusionList?: string[];
  /** Description about the pre-req steps to perform all the critical operations. */
  readonly description?: string;
}

export function resourceGuardSerializer(item: ResourceGuard): any {
  return {
    vaultCriticalOperationExclusionList: !item["vaultCriticalOperationExclusionList"]
      ? item["vaultCriticalOperationExclusionList"]
      : item["vaultCriticalOperationExclusionList"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceGuardDeserializer(item: any): ResourceGuard {
  return {
    provisioningState: item["provisioningState"],
    allowAutoApprovals: item["allowAutoApprovals"],
    resourceGuardOperations: !item["resourceGuardOperations"]
      ? item["resourceGuardOperations"]
      : resourceGuardOperationArrayDeserializer(item["resourceGuardOperations"]),
    vaultCriticalOperationExclusionList: !item["vaultCriticalOperationExclusionList"]
      ? item["vaultCriticalOperationExclusionList"]
      : item["vaultCriticalOperationExclusionList"].map((p: any) => {
          return p;
        }),
    description: item["description"],
  };
}

export function resourceGuardOperationArrayDeserializer(
  result: Array<ResourceGuardOperation>,
): any[] {
  return result.map((item) => {
    return resourceGuardOperationDeserializer(item);
  });
}

/** This class contains all the details about a critical operation. */
export interface ResourceGuardOperation {
  /** Name of the critical operation. */
  readonly vaultCriticalOperation?: string;
  /** Type of resource request. */
  readonly requestResourceType?: string;
}

export function resourceGuardOperationDeserializer(item: any): ResourceGuardOperation {
  return {
    vaultCriticalOperation: item["vaultCriticalOperation"],
    requestResourceType: item["requestResourceType"],
  };
}

/** Patch Request content for Microsoft.DataProtection Resource Guard resources */
export interface PatchResourceGuardInput {
  /** Resource Guard tags. */
  tags?: Record<string, string>;
}

export function patchResourceGuardInputSerializer(item: PatchResourceGuardInput): any {
  return { tags: item["tags"] };
}

/** List of ResourceGuard resources */
export interface _ResourceGuardResourceList extends DppTrackedResourceList {
  /** List of resources. */
  value?: ResourceGuardResource[];
}

export function _resourceGuardResourceListDeserializer(item: any): _ResourceGuardResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : resourceGuardResourceArrayDeserializer(item["value"]),
  };
}

export function resourceGuardResourceArraySerializer(result: Array<ResourceGuardResource>): any[] {
  return result.map((item) => {
    return resourceGuardResourceSerializer(item);
  });
}

export function resourceGuardResourceArrayDeserializer(
  result: Array<ResourceGuardResource>,
): any[] {
  return result.map((item) => {
    return resourceGuardResourceDeserializer(item);
  });
}

/** model interface DppTrackedResourceList */
export interface DppTrackedResourceList {
  /** The uri to fetch the next page of resources. Call ListNext() fetches next page of resources. */
  nextLink?: string;
}

export function dppTrackedResourceListDeserializer(item: any): DppTrackedResourceList {
  return {
    nextLink: item["nextLink"],
  };
}

/** Patch Request content for Microsoft.DataProtection resources */
export interface PatchResourceRequestInput {
  /** Input Managed Identity Details */
  identity?: DppIdentityDetails;
  /** Resource properties. */
  properties?: PatchBackupVaultInput;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function patchResourceRequestInputSerializer(item: PatchResourceRequestInput): any {
  return {
    identity: !item["identity"] ? item["identity"] : dppIdentityDetailsSerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : patchBackupVaultInputSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Backup Vault Contract for Patch Backup Vault API. */
export interface PatchBackupVaultInput {
  /** Monitoring Settings */
  monitoringSettings?: MonitoringSettings;
  /** Security Settings */
  securitySettings?: SecuritySettings;
  /** Feature Settings */
  featureSettings?: FeatureSettings;
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
}

export function patchBackupVaultInputSerializer(item: PatchBackupVaultInput): any {
  return {
    monitoringSettings: !item["monitoringSettings"]
      ? item["monitoringSettings"]
      : monitoringSettingsSerializer(item["monitoringSettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : securitySettingsSerializer(item["securitySettings"]),
    featureSettings: !item["featureSettings"]
      ? item["featureSettings"]
      : featureSettingsSerializer(item["featureSettings"]),
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** List of BackupVault resources */
export interface _BackupVaultResourceList extends DppResourceList {
  /** List of resources. */
  value?: BackupVaultResource[];
}

export function _backupVaultResourceListDeserializer(item: any): _BackupVaultResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : backupVaultResourceArrayDeserializer(item["value"]),
  };
}

export function backupVaultResourceArraySerializer(result: Array<BackupVaultResource>): any[] {
  return result.map((item) => {
    return backupVaultResourceSerializer(item);
  });
}

export function backupVaultResourceArrayDeserializer(result: Array<BackupVaultResource>): any[] {
  return result.map((item) => {
    return backupVaultResourceDeserializer(item);
  });
}

/** CheckNameAvailability Request */
export interface CheckNameAvailabilityRequest {
  /** Resource name for which availability needs to be checked */
  name?: string;
  /** Describes the Resource type: Microsoft.DataProtection/BackupVaults */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** CheckNameAvailability Result */
export interface CheckNameAvailabilityResult {
  /** Gets or sets the message. */
  message?: string;
  /** Gets or sets a value indicating whether [name available]. */
  nameAvailable?: boolean;
  /** Gets or sets the reason. */
  reason?: string;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    message: item["message"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
  };
}

/** Operation Resource */
export interface OperationResource {
  /** End time of the operation */
  endTime?: Date;
  /**
   * Required if status == failed or status == canceled. This is the OData v4 error format, used by the RPC and will go into the v2.2 Azure REST API guidelines.
   * The full set of optional properties (e.g. inner errors / details) can be found in the "Error Response" section.
   */
  error?: ErrorModel;
  /** It should match what is used to GET the operation result */
  id?: string;
  /** It must match the last segment of the "id" field, and will typically be a GUID / system generated value */
  name?: string;
  /** End time of the operation */
  properties?: OperationExtendedInfoUnion;
  /** Start time of the operation */
  startTime?: Date;
  status?: string;
}

export function operationResourceDeserializer(item: any): OperationResource {
  return {
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
    id: item["id"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : operationExtendedInfoUnionDeserializer(item["properties"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    status: item["status"],
  };
}

/** The result for export jobs containing blob details. */
export interface ExportJobsResult {
  /** URL of the blob into which the serialized string of list of jobs is exported. */
  readonly blobUrl?: string;
  /** SAS key to access the blob. */
  readonly blobSasKey?: string;
  /** URL of the blob into which the ExcelFile is uploaded. */
  readonly excelFileBlobUrl?: string;
  /** SAS key to access the ExcelFile blob. */
  readonly excelFileBlobSasKey?: string;
}

export function exportJobsResultDeserializer(item: any): ExportJobsResult {
  return {
    blobUrl: item["blobUrl"],
    blobSasKey: item["blobSasKey"],
    excelFileBlobUrl: item["excelFileBlobUrl"],
    excelFileBlobSasKey: item["excelFileBlobSasKey"],
  };
}

/** BaseBackupPolicy resource */
export interface BaseBackupPolicyResource extends ProxyResource {
  /** BaseBackupPolicyResource properties */
  properties?: BaseBackupPolicyUnion;
}

export function baseBackupPolicyResourceSerializer(item: BaseBackupPolicyResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : baseBackupPolicyUnionSerializer(item["properties"]),
  };
}

export function baseBackupPolicyResourceDeserializer(item: any): BaseBackupPolicyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : baseBackupPolicyUnionDeserializer(item["properties"]),
  };
}

/** BackupPolicy base */
export interface BaseBackupPolicy {
  /** Type of datasource for the backup management */
  datasourceTypes: string[];
  objectType: string;
}

export function baseBackupPolicySerializer(item: BaseBackupPolicy): any {
  return {
    datasourceTypes: item["datasourceTypes"].map((p: any) => {
      return p;
    }),
    objectType: item["objectType"],
  };
}

export function baseBackupPolicyDeserializer(item: any): BaseBackupPolicy {
  return {
    datasourceTypes: item["datasourceTypes"].map((p: any) => {
      return p;
    }),
    objectType: item["objectType"],
  };
}

/** Alias for BaseBackupPolicyUnion */
export type BaseBackupPolicyUnion = BackupPolicy | BaseBackupPolicy;

export function baseBackupPolicyUnionSerializer(item: BaseBackupPolicyUnion): any {
  switch (item.objectType) {
    case "BackupPolicy":
      return backupPolicySerializer(item as BackupPolicy);

    default:
      return baseBackupPolicySerializer(item);
  }
}

export function baseBackupPolicyUnionDeserializer(item: any): BaseBackupPolicyUnion {
  switch (item.objectType) {
    case "BackupPolicy":
      return backupPolicyDeserializer(item as BackupPolicy);

    default:
      return baseBackupPolicyDeserializer(item);
  }
}

/** Rule based backup policy */
export interface BackupPolicy extends BaseBackupPolicy {
  /** Policy rule dictionary that contains rules for each backuptype i.e Full/Incremental/Logs etc */
  policyRules: BasePolicyRuleUnion[];
  objectType: "BackupPolicy";
}

export function backupPolicySerializer(item: BackupPolicy): any {
  return {
    datasourceTypes: item["datasourceTypes"].map((p: any) => {
      return p;
    }),
    objectType: item["objectType"],
    policyRules: basePolicyRuleUnionArraySerializer(item["policyRules"]),
  };
}

export function backupPolicyDeserializer(item: any): BackupPolicy {
  return {
    datasourceTypes: item["datasourceTypes"].map((p: any) => {
      return p;
    }),
    objectType: item["objectType"],
    policyRules: basePolicyRuleUnionArrayDeserializer(item["policyRules"]),
  };
}

export function basePolicyRuleUnionArraySerializer(result: Array<BasePolicyRuleUnion>): any[] {
  return result.map((item) => {
    return basePolicyRuleUnionSerializer(item);
  });
}

export function basePolicyRuleUnionArrayDeserializer(result: Array<BasePolicyRuleUnion>): any[] {
  return result.map((item) => {
    return basePolicyRuleUnionDeserializer(item);
  });
}

/** BasePolicy Rule */
export interface BasePolicyRule {
  name: string;
  objectType: string;
}

export function basePolicyRuleSerializer(item: BasePolicyRule): any {
  return { name: item["name"], objectType: item["objectType"] };
}

export function basePolicyRuleDeserializer(item: any): BasePolicyRule {
  return {
    name: item["name"],
    objectType: item["objectType"],
  };
}

/** Alias for BasePolicyRuleUnion */
export type BasePolicyRuleUnion = AzureBackupRule | AzureRetentionRule | BasePolicyRule;

export function basePolicyRuleUnionSerializer(item: BasePolicyRuleUnion): any {
  switch (item.objectType) {
    case "AzureBackupRule":
      return azureBackupRuleSerializer(item as AzureBackupRule);

    case "AzureRetentionRule":
      return azureRetentionRuleSerializer(item as AzureRetentionRule);

    default:
      return basePolicyRuleSerializer(item);
  }
}

export function basePolicyRuleUnionDeserializer(item: any): BasePolicyRuleUnion {
  switch (item.objectType) {
    case "AzureBackupRule":
      return azureBackupRuleDeserializer(item as AzureBackupRule);

    case "AzureRetentionRule":
      return azureRetentionRuleDeserializer(item as AzureRetentionRule);

    default:
      return basePolicyRuleDeserializer(item);
  }
}

/** Azure backup rule */
export interface AzureBackupRule extends BasePolicyRule {
  /** BackupParameters base */
  backupParameters?: BackupParametersUnion;
  /** DataStoreInfo base */
  dataStore: DataStoreInfoBase;
  /** Trigger context */
  trigger: TriggerContextUnion;
  objectType: "AzureBackupRule";
}

export function azureBackupRuleSerializer(item: AzureBackupRule): any {
  return {
    name: item["name"],
    objectType: item["objectType"],
    backupParameters: !item["backupParameters"]
      ? item["backupParameters"]
      : backupParametersUnionSerializer(item["backupParameters"]),
    dataStore: dataStoreInfoBaseSerializer(item["dataStore"]),
    trigger: triggerContextUnionSerializer(item["trigger"]),
  };
}

export function azureBackupRuleDeserializer(item: any): AzureBackupRule {
  return {
    name: item["name"],
    objectType: item["objectType"],
    backupParameters: !item["backupParameters"]
      ? item["backupParameters"]
      : backupParametersUnionDeserializer(item["backupParameters"]),
    dataStore: dataStoreInfoBaseDeserializer(item["dataStore"]),
    trigger: triggerContextUnionDeserializer(item["trigger"]),
  };
}

/** BackupParameters base */
export interface BackupParameters {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: AzureBackupParams */
  objectType: string;
}

export function backupParametersSerializer(item: BackupParameters): any {
  return { objectType: item["objectType"] };
}

export function backupParametersDeserializer(item: any): BackupParameters {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for BackupParametersUnion */
export type BackupParametersUnion = AzureBackupParams | BackupParameters;

export function backupParametersUnionSerializer(item: BackupParametersUnion): any {
  switch (item.objectType) {
    case "AzureBackupParams":
      return azureBackupParamsSerializer(item as AzureBackupParams);

    default:
      return backupParametersSerializer(item);
  }
}

export function backupParametersUnionDeserializer(item: any): BackupParametersUnion {
  switch (item.objectType) {
    case "AzureBackupParams":
      return azureBackupParamsDeserializer(item as AzureBackupParams);

    default:
      return backupParametersDeserializer(item);
  }
}

/** Azure backup parameters */
export interface AzureBackupParams extends BackupParameters {
  /** BackupType ; Full/Incremental etc */
  backupType: string;
  /** Type of the specific object - used for deserializing */
  objectType: "AzureBackupParams";
}

export function azureBackupParamsSerializer(item: AzureBackupParams): any {
  return { objectType: item["objectType"], backupType: item["backupType"] };
}

export function azureBackupParamsDeserializer(item: any): AzureBackupParams {
  return {
    objectType: item["objectType"],
    backupType: item["backupType"],
  };
}

/** DataStoreInfo base */
export interface DataStoreInfoBase {
  /** type of datastore; Operational/Vault/Archive */
  dataStoreType: DataStoreTypes;
  /** Type of Datasource object, used to initialize the right inherited type */
  objectType: string;
}

export function dataStoreInfoBaseSerializer(item: DataStoreInfoBase): any {
  return {
    dataStoreType: item["dataStoreType"],
    objectType: item["objectType"],
  };
}

export function dataStoreInfoBaseDeserializer(item: any): DataStoreInfoBase {
  return {
    dataStoreType: item["dataStoreType"],
    objectType: item["objectType"],
  };
}

/** Trigger context */
export interface TriggerContext {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: AdhocBasedTriggerContext, ScheduleBasedTriggerContext */
  objectType: string;
}

export function triggerContextSerializer(item: TriggerContext): any {
  return { objectType: item["objectType"] };
}

export function triggerContextDeserializer(item: any): TriggerContext {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for TriggerContextUnion */
export type TriggerContextUnion =
  | AdhocBasedTriggerContext
  | ScheduleBasedTriggerContext
  | TriggerContext;

export function triggerContextUnionSerializer(item: TriggerContextUnion): any {
  switch (item.objectType) {
    case "AdhocBasedTriggerContext":
      return adhocBasedTriggerContextSerializer(item as AdhocBasedTriggerContext);

    case "ScheduleBasedTriggerContext":
      return scheduleBasedTriggerContextSerializer(item as ScheduleBasedTriggerContext);

    default:
      return triggerContextSerializer(item);
  }
}

export function triggerContextUnionDeserializer(item: any): TriggerContextUnion {
  switch (item.objectType) {
    case "AdhocBasedTriggerContext":
      return adhocBasedTriggerContextDeserializer(item as AdhocBasedTriggerContext);

    case "ScheduleBasedTriggerContext":
      return scheduleBasedTriggerContextDeserializer(item as ScheduleBasedTriggerContext);

    default:
      return triggerContextDeserializer(item);
  }
}

/** Adhoc trigger context */
export interface AdhocBasedTriggerContext extends TriggerContext {
  /** Tagging Criteria containing retention tag for adhoc backup. */
  taggingCriteria: AdhocBasedTaggingCriteria;
  /** Type of the specific object - used for deserializing */
  objectType: "AdhocBasedTriggerContext";
}

export function adhocBasedTriggerContextSerializer(item: AdhocBasedTriggerContext): any {
  return {
    objectType: item["objectType"],
    taggingCriteria: adhocBasedTaggingCriteriaSerializer(item["taggingCriteria"]),
  };
}

export function adhocBasedTriggerContextDeserializer(item: any): AdhocBasedTriggerContext {
  return {
    objectType: item["objectType"],
    taggingCriteria: adhocBasedTaggingCriteriaDeserializer(item["taggingCriteria"]),
  };
}

/** Adhoc backup tagging criteria */
export interface AdhocBasedTaggingCriteria {
  /** Retention tag information */
  tagInfo?: RetentionTag;
}

export function adhocBasedTaggingCriteriaSerializer(item: AdhocBasedTaggingCriteria): any {
  return {
    tagInfo: !item["tagInfo"] ? item["tagInfo"] : retentionTagSerializer(item["tagInfo"]),
  };
}

export function adhocBasedTaggingCriteriaDeserializer(item: any): AdhocBasedTaggingCriteria {
  return {
    tagInfo: !item["tagInfo"] ? item["tagInfo"] : retentionTagDeserializer(item["tagInfo"]),
  };
}

/** Retention tag */
export interface RetentionTag {
  /** Retention Tag version. */
  readonly eTag?: string;
  /** Retention Tag version. */
  readonly id?: string;
  /** Retention Tag Name to relate it to retention rule. */
  tagName: string;
}

export function retentionTagSerializer(item: RetentionTag): any {
  return { tagName: item["tagName"] };
}

export function retentionTagDeserializer(item: any): RetentionTag {
  return {
    eTag: item["eTag"],
    id: item["id"],
    tagName: item["tagName"],
  };
}

/** Schedule based trigger context */
export interface ScheduleBasedTriggerContext extends TriggerContext {
  /** Schedule for this backup */
  schedule: BackupSchedule;
  /** List of tags that can be applicable for given schedule. */
  taggingCriteria: TaggingCriteria[];
  /** Type of the specific object - used for deserializing */
  objectType: "ScheduleBasedTriggerContext";
}

export function scheduleBasedTriggerContextSerializer(item: ScheduleBasedTriggerContext): any {
  return {
    objectType: item["objectType"],
    schedule: backupScheduleSerializer(item["schedule"]),
    taggingCriteria: taggingCriteriaArraySerializer(item["taggingCriteria"]),
  };
}

export function scheduleBasedTriggerContextDeserializer(item: any): ScheduleBasedTriggerContext {
  return {
    objectType: item["objectType"],
    schedule: backupScheduleDeserializer(item["schedule"]),
    taggingCriteria: taggingCriteriaArrayDeserializer(item["taggingCriteria"]),
  };
}

/** Schedule for backup */
export interface BackupSchedule {
  /** Repeating time interval which only support the following ISO 8601 format [R/startDateTime/Duration]. Example: R/2007-03-01T13:00:00Z/P1Y2M10DT2H30M */
  repeatingTimeIntervals: string[];
  /** Time zone for a schedule. Example: Pacific Standard Time */
  timeZone?: string;
}

export function backupScheduleSerializer(item: BackupSchedule): any {
  return {
    repeatingTimeIntervals: item["repeatingTimeIntervals"].map((p: any) => {
      return p;
    }),
    timeZone: item["timeZone"],
  };
}

export function backupScheduleDeserializer(item: any): BackupSchedule {
  return {
    repeatingTimeIntervals: item["repeatingTimeIntervals"].map((p: any) => {
      return p;
    }),
    timeZone: item["timeZone"],
  };
}

export function taggingCriteriaArraySerializer(result: Array<TaggingCriteria>): any[] {
  return result.map((item) => {
    return taggingCriteriaSerializer(item);
  });
}

export function taggingCriteriaArrayDeserializer(result: Array<TaggingCriteria>): any[] {
  return result.map((item) => {
    return taggingCriteriaDeserializer(item);
  });
}

/** Tagging criteria */
export interface TaggingCriteria {
  /** Criteria which decides whether the tag can be applied to a triggered backup. */
  criteria?: BackupCriteriaUnion[];
  /** Specifies if tag is default. */
  isDefault: boolean;
  /** Retention Tag priority. */
  taggingPriority: number;
  /** Retention tag information */
  tagInfo: RetentionTag;
}

export function taggingCriteriaSerializer(item: TaggingCriteria): any {
  return {
    criteria: !item["criteria"]
      ? item["criteria"]
      : backupCriteriaUnionArraySerializer(item["criteria"]),
    isDefault: item["isDefault"],
    taggingPriority: item["taggingPriority"],
    tagInfo: retentionTagSerializer(item["tagInfo"]),
  };
}

export function taggingCriteriaDeserializer(item: any): TaggingCriteria {
  return {
    criteria: !item["criteria"]
      ? item["criteria"]
      : backupCriteriaUnionArrayDeserializer(item["criteria"]),
    isDefault: item["isDefault"],
    taggingPriority: item["taggingPriority"],
    tagInfo: retentionTagDeserializer(item["tagInfo"]),
  };
}

export function backupCriteriaUnionArraySerializer(result: Array<BackupCriteriaUnion>): any[] {
  return result.map((item) => {
    return backupCriteriaUnionSerializer(item);
  });
}

export function backupCriteriaUnionArrayDeserializer(result: Array<BackupCriteriaUnion>): any[] {
  return result.map((item) => {
    return backupCriteriaUnionDeserializer(item);
  });
}

/** BackupCriteria base class */
export interface BackupCriteria {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: ScheduleBasedBackupCriteria */
  objectType: string;
}

export function backupCriteriaSerializer(item: BackupCriteria): any {
  return { objectType: item["objectType"] };
}

export function backupCriteriaDeserializer(item: any): BackupCriteria {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for BackupCriteriaUnion */
export type BackupCriteriaUnion = ScheduleBasedBackupCriteria | BackupCriteria;

export function backupCriteriaUnionSerializer(item: BackupCriteriaUnion): any {
  switch (item.objectType) {
    case "ScheduleBasedBackupCriteria":
      return scheduleBasedBackupCriteriaSerializer(item as ScheduleBasedBackupCriteria);

    default:
      return backupCriteriaSerializer(item);
  }
}

export function backupCriteriaUnionDeserializer(item: any): BackupCriteriaUnion {
  switch (item.objectType) {
    case "ScheduleBasedBackupCriteria":
      return scheduleBasedBackupCriteriaDeserializer(item as ScheduleBasedBackupCriteria);

    default:
      return backupCriteriaDeserializer(item);
  }
}

/** Schedule based backup criteria */
export interface ScheduleBasedBackupCriteria extends BackupCriteria {
  /**
   * it contains absolute values like "AllBackup" / "FirstOfDay" / "FirstOfWeek" / "FirstOfMonth"
   * and should be part of AbsoluteMarker enum
   */
  absoluteCriteria?: AbsoluteMarker[];
  /** This is day of the month from 1 to 28 other wise last of month */
  daysOfMonth?: Day[];
  /** It should be Sunday/Monday/T..../Saturday */
  daysOfTheWeek?: DayOfWeek[];
  /** It should be January/February/....../December */
  monthsOfYear?: Month[];
  /** List of schedule times for backup */
  scheduleTimes?: Date[];
  /** It should be First/Second/Third/Fourth/Last */
  weeksOfTheMonth?: WeekNumber[];
  /** Type of the specific object - used for deserializing */
  objectType: "ScheduleBasedBackupCriteria";
}

export function scheduleBasedBackupCriteriaSerializer(item: ScheduleBasedBackupCriteria): any {
  return {
    objectType: item["objectType"],
    absoluteCriteria: !item["absoluteCriteria"]
      ? item["absoluteCriteria"]
      : item["absoluteCriteria"].map((p: any) => {
          return p;
        }),
    daysOfMonth: !item["daysOfMonth"]
      ? item["daysOfMonth"]
      : dayArraySerializer(item["daysOfMonth"]),
    daysOfTheWeek: !item["daysOfTheWeek"]
      ? item["daysOfTheWeek"]
      : item["daysOfTheWeek"].map((p: any) => {
          return p;
        }),
    monthsOfYear: !item["monthsOfYear"]
      ? item["monthsOfYear"]
      : item["monthsOfYear"].map((p: any) => {
          return p;
        }),
    scheduleTimes: !item["scheduleTimes"]
      ? item["scheduleTimes"]
      : item["scheduleTimes"].map((p: any) => {
          return p.toISOString();
        }),
    weeksOfTheMonth: !item["weeksOfTheMonth"]
      ? item["weeksOfTheMonth"]
      : item["weeksOfTheMonth"].map((p: any) => {
          return p;
        }),
  };
}

export function scheduleBasedBackupCriteriaDeserializer(item: any): ScheduleBasedBackupCriteria {
  return {
    objectType: item["objectType"],
    absoluteCriteria: !item["absoluteCriteria"]
      ? item["absoluteCriteria"]
      : item["absoluteCriteria"].map((p: any) => {
          return p;
        }),
    daysOfMonth: !item["daysOfMonth"]
      ? item["daysOfMonth"]
      : dayArrayDeserializer(item["daysOfMonth"]),
    daysOfTheWeek: !item["daysOfTheWeek"]
      ? item["daysOfTheWeek"]
      : item["daysOfTheWeek"].map((p: any) => {
          return p;
        }),
    monthsOfYear: !item["monthsOfYear"]
      ? item["monthsOfYear"]
      : item["monthsOfYear"].map((p: any) => {
          return p;
        }),
    scheduleTimes: !item["scheduleTimes"]
      ? item["scheduleTimes"]
      : item["scheduleTimes"].map((p: any) => {
          return new Date(p);
        }),
    weeksOfTheMonth: !item["weeksOfTheMonth"]
      ? item["weeksOfTheMonth"]
      : item["weeksOfTheMonth"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link AbsoluteMarker} that the service accepts. */
export enum KnownAbsoluteMarker {
  /** AllBackup */
  AllBackup = "AllBackup",
  /** FirstOfDay */
  FirstOfDay = "FirstOfDay",
  /** FirstOfMonth */
  FirstOfMonth = "FirstOfMonth",
  /** FirstOfWeek */
  FirstOfWeek = "FirstOfWeek",
  /** FirstOfYear */
  FirstOfYear = "FirstOfYear",
}

/** Type of AbsoluteMarker */
export type AbsoluteMarker = string;

export function dayArraySerializer(result: Array<Day>): any[] {
  return result.map((item) => {
    return daySerializer(item);
  });
}

export function dayArrayDeserializer(result: Array<Day>): any[] {
  return result.map((item) => {
    return dayDeserializer(item);
  });
}

/** Day of the week */
export interface Day {
  /** Date of the month */
  date?: number;
  /** Whether Date is last date of month */
  isLast?: boolean;
}

export function daySerializer(item: Day): any {
  return { date: item["date"], isLast: item["isLast"] };
}

export function dayDeserializer(item: any): Day {
  return {
    date: item["date"],
    isLast: item["isLast"],
  };
}

/** Known values of {@link DayOfWeek} that the service accepts. */
export enum KnownDayOfWeek {
  /** Friday */
  Friday = "Friday",
  /** Monday */
  Monday = "Monday",
  /** Saturday */
  Saturday = "Saturday",
  /** Sunday */
  Sunday = "Sunday",
  /** Thursday */
  Thursday = "Thursday",
  /** Tuesday */
  Tuesday = "Tuesday",
  /** Wednesday */
  Wednesday = "Wednesday",
}

/** Type of DayOfWeek */
export type DayOfWeek = string;

/** Known values of {@link Month} that the service accepts. */
export enum KnownMonth {
  /** April */
  April = "April",
  /** August */
  August = "August",
  /** December */
  December = "December",
  /** February */
  February = "February",
  /** January */
  January = "January",
  /** July */
  July = "July",
  /** June */
  June = "June",
  /** March */
  March = "March",
  /** May */
  May = "May",
  /** November */
  November = "November",
  /** October */
  October = "October",
  /** September */
  September = "September",
}

/** Type of Month */
export type Month = string;

/** Known values of {@link WeekNumber} that the service accepts. */
export enum KnownWeekNumber {
  /** First */
  First = "First",
  /** Fourth */
  Fourth = "Fourth",
  /** Last */
  Last = "Last",
  /** Second */
  Second = "Second",
  /** Third */
  Third = "Third",
}

/** Type of WeekNumber */
export type WeekNumber = string;

/** Azure retention rule */
export interface AzureRetentionRule extends BasePolicyRule {
  isDefault?: boolean;
  lifecycles: SourceLifeCycle[];
  objectType: "AzureRetentionRule";
}

export function azureRetentionRuleSerializer(item: AzureRetentionRule): any {
  return {
    name: item["name"],
    objectType: item["objectType"],
    isDefault: item["isDefault"],
    lifecycles: sourceLifeCycleArraySerializer(item["lifecycles"]),
  };
}

export function azureRetentionRuleDeserializer(item: any): AzureRetentionRule {
  return {
    name: item["name"],
    objectType: item["objectType"],
    isDefault: item["isDefault"],
    lifecycles: sourceLifeCycleArrayDeserializer(item["lifecycles"]),
  };
}

export function sourceLifeCycleArraySerializer(result: Array<SourceLifeCycle>): any[] {
  return result.map((item) => {
    return sourceLifeCycleSerializer(item);
  });
}

export function sourceLifeCycleArrayDeserializer(result: Array<SourceLifeCycle>): any[] {
  return result.map((item) => {
    return sourceLifeCycleDeserializer(item);
  });
}

/** Source LifeCycle */
export interface SourceLifeCycle {
  /** Delete Option */
  deleteAfter: DeleteOptionUnion;
  /** DataStoreInfo base */
  sourceDataStore: DataStoreInfoBase;
  targetDataStoreCopySettings?: TargetCopySetting[];
}

export function sourceLifeCycleSerializer(item: SourceLifeCycle): any {
  return {
    deleteAfter: deleteOptionUnionSerializer(item["deleteAfter"]),
    sourceDataStore: dataStoreInfoBaseSerializer(item["sourceDataStore"]),
    targetDataStoreCopySettings: !item["targetDataStoreCopySettings"]
      ? item["targetDataStoreCopySettings"]
      : targetCopySettingArraySerializer(item["targetDataStoreCopySettings"]),
  };
}

export function sourceLifeCycleDeserializer(item: any): SourceLifeCycle {
  return {
    deleteAfter: deleteOptionUnionDeserializer(item["deleteAfter"]),
    sourceDataStore: dataStoreInfoBaseDeserializer(item["sourceDataStore"]),
    targetDataStoreCopySettings: !item["targetDataStoreCopySettings"]
      ? item["targetDataStoreCopySettings"]
      : targetCopySettingArrayDeserializer(item["targetDataStoreCopySettings"]),
  };
}

/** Delete Option */
export interface DeleteOption {
  /** Duration of deletion after given timespan */
  duration: string;
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: AbsoluteDeleteOption */
  objectType: string;
}

export function deleteOptionSerializer(item: DeleteOption): any {
  return { duration: item["duration"], objectType: item["objectType"] };
}

export function deleteOptionDeserializer(item: any): DeleteOption {
  return {
    duration: item["duration"],
    objectType: item["objectType"],
  };
}

/** Alias for DeleteOptionUnion */
export type DeleteOptionUnion = AbsoluteDeleteOption | DeleteOption;

export function deleteOptionUnionSerializer(item: DeleteOptionUnion): any {
  switch (item.objectType) {
    case "AbsoluteDeleteOption":
      return absoluteDeleteOptionSerializer(item as AbsoluteDeleteOption);

    default:
      return deleteOptionSerializer(item);
  }
}

export function deleteOptionUnionDeserializer(item: any): DeleteOptionUnion {
  switch (item.objectType) {
    case "AbsoluteDeleteOption":
      return absoluteDeleteOptionDeserializer(item as AbsoluteDeleteOption);

    default:
      return deleteOptionDeserializer(item);
  }
}

/** Delete option with duration */
export interface AbsoluteDeleteOption extends DeleteOption {
  /** Type of the specific object - used for deserializing */
  objectType: "AbsoluteDeleteOption";
}

export function absoluteDeleteOptionSerializer(item: AbsoluteDeleteOption): any {
  return { duration: item["duration"], objectType: item["objectType"] };
}

export function absoluteDeleteOptionDeserializer(item: any): AbsoluteDeleteOption {
  return {
    duration: item["duration"],
    objectType: item["objectType"],
  };
}

export function targetCopySettingArraySerializer(result: Array<TargetCopySetting>): any[] {
  return result.map((item) => {
    return targetCopySettingSerializer(item);
  });
}

export function targetCopySettingArrayDeserializer(result: Array<TargetCopySetting>): any[] {
  return result.map((item) => {
    return targetCopySettingDeserializer(item);
  });
}

/** Target copy settings */
export interface TargetCopySetting {
  /** It can be CustomCopyOption or ImmediateCopyOption. */
  copyAfter: CopyOptionUnion;
  /** Info of target datastore */
  dataStore: DataStoreInfoBase;
}

export function targetCopySettingSerializer(item: TargetCopySetting): any {
  return {
    copyAfter: copyOptionUnionSerializer(item["copyAfter"]),
    dataStore: dataStoreInfoBaseSerializer(item["dataStore"]),
  };
}

export function targetCopySettingDeserializer(item: any): TargetCopySetting {
  return {
    copyAfter: copyOptionUnionDeserializer(item["copyAfter"]),
    dataStore: dataStoreInfoBaseDeserializer(item["dataStore"]),
  };
}

/** Options to copy */
export interface CopyOption {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: CopyOnExpiryOption, CustomCopyOption, ImmediateCopyOption */
  objectType: string;
}

export function copyOptionSerializer(item: CopyOption): any {
  return { objectType: item["objectType"] };
}

export function copyOptionDeserializer(item: any): CopyOption {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for CopyOptionUnion */
export type CopyOptionUnion =
  | CopyOnExpiryOption
  | CustomCopyOption
  | ImmediateCopyOption
  | CopyOption;

export function copyOptionUnionSerializer(item: CopyOptionUnion): any {
  switch (item.objectType) {
    case "CopyOnExpiryOption":
      return copyOnExpiryOptionSerializer(item as CopyOnExpiryOption);

    case "CustomCopyOption":
      return customCopyOptionSerializer(item as CustomCopyOption);

    case "ImmediateCopyOption":
      return immediateCopyOptionSerializer(item as ImmediateCopyOption);

    default:
      return copyOptionSerializer(item);
  }
}

export function copyOptionUnionDeserializer(item: any): CopyOptionUnion {
  switch (item.objectType) {
    case "CopyOnExpiryOption":
      return copyOnExpiryOptionDeserializer(item as CopyOnExpiryOption);

    case "CustomCopyOption":
      return customCopyOptionDeserializer(item as CustomCopyOption);

    case "ImmediateCopyOption":
      return immediateCopyOptionDeserializer(item as ImmediateCopyOption);

    default:
      return copyOptionDeserializer(item);
  }
}

/** Copy on Expiry Option */
export interface CopyOnExpiryOption extends CopyOption {
  /** Type of the specific object - used for deserializing */
  objectType: "CopyOnExpiryOption";
}

export function copyOnExpiryOptionSerializer(item: CopyOnExpiryOption): any {
  return { objectType: item["objectType"] };
}

export function copyOnExpiryOptionDeserializer(item: any): CopyOnExpiryOption {
  return {
    objectType: item["objectType"],
  };
}

/** Duration based custom options to copy */
export interface CustomCopyOption extends CopyOption {
  /** Data copied after given timespan */
  duration?: string;
  /** Type of the specific object - used for deserializing */
  objectType: "CustomCopyOption";
}

export function customCopyOptionSerializer(item: CustomCopyOption): any {
  return { objectType: item["objectType"], duration: item["duration"] };
}

export function customCopyOptionDeserializer(item: any): CustomCopyOption {
  return {
    objectType: item["objectType"],
    duration: item["duration"],
  };
}

/** Immediate copy Option */
export interface ImmediateCopyOption extends CopyOption {
  /** Type of the specific object - used for deserializing */
  objectType: "ImmediateCopyOption";
}

export function immediateCopyOptionSerializer(item: ImmediateCopyOption): any {
  return { objectType: item["objectType"] };
}

export function immediateCopyOptionDeserializer(item: any): ImmediateCopyOption {
  return {
    objectType: item["objectType"],
  };
}

/** List of BaseBackupPolicy resources */
export interface _BaseBackupPolicyResourceList extends DppResourceList {
  /** List of resources. */
  value?: BaseBackupPolicyResource[];
}

export function _baseBackupPolicyResourceListDeserializer(
  item: any,
): _BaseBackupPolicyResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : baseBackupPolicyResourceArrayDeserializer(item["value"]),
  };
}

export function baseBackupPolicyResourceArraySerializer(
  result: Array<BaseBackupPolicyResource>,
): any[] {
  return result.map((item) => {
    return baseBackupPolicyResourceSerializer(item);
  });
}

export function baseBackupPolicyResourceArrayDeserializer(
  result: Array<BaseBackupPolicyResource>,
): any[] {
  return result.map((item) => {
    return baseBackupPolicyResourceDeserializer(item);
  });
}

/** List Restore Ranges Request */
export interface AzureBackupFindRestorableTimeRangesRequest {
  /** Gets or sets the type of the source data store. */
  sourceDataStoreType: RestoreSourceDataStoreType;
  /** Start time for the List Restore Ranges request. ISO 8601 format. */
  startTime?: string;
  /** End time for the List Restore Ranges request. ISO 8601 format. */
  endTime?: string;
}

export function azureBackupFindRestorableTimeRangesRequestSerializer(
  item: AzureBackupFindRestorableTimeRangesRequest,
): any {
  return {
    sourceDataStoreType: item["sourceDataStoreType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

/** Gets or sets the type of the source data store. */
export enum KnownRestoreSourceDataStoreType {
  /** OperationalStore */
  OperationalStore = "OperationalStore",
  /** VaultStore */
  VaultStore = "VaultStore",
  /** ArchiveStore */
  ArchiveStore = "ArchiveStore",
}

/**
 * Gets or sets the type of the source data store. \
 * {@link KnownRestoreSourceDataStoreType} can be used interchangeably with RestoreSourceDataStoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OperationalStore** \
 * **VaultStore** \
 * **ArchiveStore**
 */
export type RestoreSourceDataStoreType = string;

/** List Restore Ranges Response */
export interface AzureBackupFindRestorableTimeRangesResponseResource extends DppResource {
  /** AzureBackupFindRestorableTimeRangesResponseResource properties */
  properties?: AzureBackupFindRestorableTimeRangesResponse;
}

export function azureBackupFindRestorableTimeRangesResponseResourceDeserializer(
  item: any,
): AzureBackupFindRestorableTimeRangesResponseResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : azureBackupFindRestorableTimeRangesResponseDeserializer(item["properties"]),
  };
}

/** List Restore Ranges Response */
export interface AzureBackupFindRestorableTimeRangesResponse {
  /** Returns the Restore Ranges available on the Backup Instance. */
  restorableTimeRanges?: RestorableTimeRange[];
  objectType?: string;
}

export function azureBackupFindRestorableTimeRangesResponseDeserializer(
  item: any,
): AzureBackupFindRestorableTimeRangesResponse {
  return {
    restorableTimeRanges: !item["restorableTimeRanges"]
      ? item["restorableTimeRanges"]
      : restorableTimeRangeArrayDeserializer(item["restorableTimeRanges"]),
    objectType: item["objectType"],
  };
}

export function restorableTimeRangeArrayDeserializer(result: Array<RestorableTimeRange>): any[] {
  return result.map((item) => {
    return restorableTimeRangeDeserializer(item);
  });
}

/** model interface RestorableTimeRange */
export interface RestorableTimeRange {
  /** Start time for the available restore range */
  startTime: string;
  /** End time for the available restore range */
  endTime: string;
  objectType?: string;
}

export function restorableTimeRangeDeserializer(item: any): RestorableTimeRange {
  return {
    startTime: item["startTime"],
    endTime: item["endTime"],
    objectType: item["objectType"],
  };
}

/** Resource class */
export interface DppResource {
  /** Resource Id represents the complete path to the resource. */
  readonly id?: string;
  /** Resource name associated with the resource. */
  readonly name?: string;
  /** Resource type represents the complete path of the form Namespace/ResourceType/ResourceType/... */
  readonly type?: string;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function dppResourceDeserializer(item: any): DppResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Azure backup recoveryPoint resource */
export interface AzureBackupRecoveryPointResource extends ProxyResource {
  /** AzureBackupRecoveryPointResource properties */
  properties?: AzureBackupRecoveryPointUnion;
}

export function azureBackupRecoveryPointResourceDeserializer(
  item: any,
): AzureBackupRecoveryPointResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : azureBackupRecoveryPointUnionDeserializer(item["properties"]),
  };
}

/** Azure backup recoveryPoint */
export interface AzureBackupRecoveryPoint {
  objectType: string;
}

export function azureBackupRecoveryPointDeserializer(item: any): AzureBackupRecoveryPoint {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for AzureBackupRecoveryPointUnion */
export type AzureBackupRecoveryPointUnion =
  | AzureBackupDiscreteRecoveryPoint
  | AzureBackupRecoveryPoint;

export function azureBackupRecoveryPointUnionDeserializer(
  item: any,
): AzureBackupRecoveryPointUnion {
  switch (item.objectType) {
    case "AzureBackupDiscreteRecoveryPoint":
      return azureBackupDiscreteRecoveryPointDeserializer(item as AzureBackupDiscreteRecoveryPoint);

    default:
      return azureBackupRecoveryPointDeserializer(item);
  }
}

/** Azure backup discrete RecoveryPoint */
export interface AzureBackupDiscreteRecoveryPoint extends AzureBackupRecoveryPoint {
  friendlyName?: string;
  recoveryPointDataStoresDetails?: RecoveryPointDataStoreDetails[];
  recoveryPointTime: Date;
  policyName?: string;
  policyVersion?: string;
  recoveryPointId?: string;
  recoveryPointType?: string;
  retentionTagName?: string;
  retentionTagVersion?: string;
  readonly expiryTime?: Date;
  /** Specifies recovery point completeness. Partial (i.e., only some of the intended items were backed up), or Completed (i.e., ALL intended items were backed up). */
  recoveryPointState?: RecoveryPointCompletionState;
  objectType: "AzureBackupDiscreteRecoveryPoint";
}

export function azureBackupDiscreteRecoveryPointDeserializer(
  item: any,
): AzureBackupDiscreteRecoveryPoint {
  return {
    objectType: item["objectType"],
    friendlyName: item["friendlyName"],
    recoveryPointDataStoresDetails: !item["recoveryPointDataStoresDetails"]
      ? item["recoveryPointDataStoresDetails"]
      : recoveryPointDataStoreDetailsArrayDeserializer(item["recoveryPointDataStoresDetails"]),
    recoveryPointTime: new Date(item["recoveryPointTime"]),
    policyName: item["policyName"],
    policyVersion: item["policyVersion"],
    recoveryPointId: item["recoveryPointId"],
    recoveryPointType: item["recoveryPointType"],
    retentionTagName: item["retentionTagName"],
    retentionTagVersion: item["retentionTagVersion"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    recoveryPointState: item["recoveryPointState"],
  };
}

export function recoveryPointDataStoreDetailsArrayDeserializer(
  result: Array<RecoveryPointDataStoreDetails>,
): any[] {
  return result.map((item) => {
    return recoveryPointDataStoreDetailsDeserializer(item);
  });
}

/** RecoveryPoint datastore details */
export interface RecoveryPointDataStoreDetails {
  creationTime?: Date;
  expiryTime?: Date;
  id?: string;
  metaData?: string;
  state?: string;
  type?: string;
  visible?: boolean;
  readonly rehydrationExpiryTime?: Date;
  readonly rehydrationStatus?: RehydrationStatus;
}

export function recoveryPointDataStoreDetailsDeserializer(
  item: any,
): RecoveryPointDataStoreDetails {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    id: item["id"],
    metaData: item["metaData"],
    state: item["state"],
    type: item["type"],
    visible: item["visible"],
    rehydrationExpiryTime: !item["rehydrationExpiryTime"]
      ? item["rehydrationExpiryTime"]
      : new Date(item["rehydrationExpiryTime"]),
    rehydrationStatus: item["rehydrationStatus"],
  };
}

/** Known values of {@link RehydrationStatus} that the service accepts. */
export enum KnownRehydrationStatus {
  /** CREATE_IN_PROGRESS */
  CreateINProgress = "CREATE_IN_PROGRESS",
  /** COMPLETED */
  Completed = "COMPLETED",
  /** DELETE_IN_PROGRESS */
  DeleteINProgress = "DELETE_IN_PROGRESS",
  /** DELETED */
  Deleted = "DELETED",
  /** FAILED */
  Failed = "FAILED",
}

/** Type of RehydrationStatus */
export type RehydrationStatus = string;

/** Specifies recovery point completeness. Partial (i.e., only some of the intended items were backed up), or Completed (i.e., ALL intended items were backed up). */
export enum KnownRecoveryPointCompletionState {
  /** Completed */
  Completed = "Completed",
  /** Partial */
  Partial = "Partial",
}

/**
 * Specifies recovery point completeness. Partial (i.e., only some of the intended items were backed up), or Completed (i.e., ALL intended items were backed up). \
 * {@link KnownRecoveryPointCompletionState} can be used interchangeably with RecoveryPointCompletionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed** \
 * **Partial**
 */
export type RecoveryPointCompletionState = string;

/** Azure backup recoveryPoint resource list */
export interface _AzureBackupRecoveryPointResourceList extends DppResourceList {
  /** List of resources. */
  value?: AzureBackupRecoveryPointResource[];
}

export function _azureBackupRecoveryPointResourceListDeserializer(
  item: any,
): _AzureBackupRecoveryPointResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : azureBackupRecoveryPointResourceArrayDeserializer(item["value"]),
  };
}

export function azureBackupRecoveryPointResourceArrayDeserializer(
  result: Array<AzureBackupRecoveryPointResource>,
): any[] {
  return result.map((item) => {
    return azureBackupRecoveryPointResourceDeserializer(item);
  });
}

/** AzureBackup Job Resource Class */
export interface AzureBackupJobResource extends ProxyResource {
  /** AzureBackupJobResource properties */
  properties?: AzureBackupJob;
}

export function azureBackupJobResourceDeserializer(item: any): AzureBackupJobResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : azureBackupJobDeserializer(item["properties"]),
  };
}

/** AzureBackup Job Class */
export interface AzureBackupJob {
  /** Job Activity Id */
  activityID: string;
  /** Name of the Backup Instance */
  backupInstanceFriendlyName: string;
  /** ARM ID of the Backup Instance */
  readonly backupInstanceId?: string;
  /** ARM ID of the DataSource */
  dataSourceId: string;
  /** Location of the DataSource */
  dataSourceLocation: string;
  /** User Friendly Name of the DataSource */
  dataSourceName: string;
  /** Data Source Set Name of the DataSource */
  dataSourceSetName?: string;
  /** Type of DataSource */
  dataSourceType: string;
  /** Total run time of the job. ISO 8601 format. */
  duration?: string;
  /** EndTime of the job(in UTC) */
  readonly endTime?: Date;
  /** A List, detailing the errors related to the job */
  readonly errorDetails?: UserFacingError[];
  /** Extended Information about the job */
  readonly extendedInfo?: JobExtendedInfo;
  /** Indicated that whether the job is adhoc(true) or scheduled(false) */
  isUserTriggered: boolean;
  /** It indicates the type of Job i.e. Backup:full/log/diff ;Restore:ALR/OLR; Tiering:Backup/Archive ; Management:ConfigureProtection/UnConfigure */
  operation: string;
  /** It indicates the type of Job i.e. Backup/Restore/Tiering/Management */
  operationCategory: string;
  /** ARM ID of the policy */
  readonly policyId?: string;
  /** Name of the policy */
  readonly policyName?: string;
  /** Indicated whether progress is enabled for the job */
  progressEnabled: boolean;
  /** Url which contains job's progress */
  readonly progressUrl?: string;
  /** Priority to be used for rehydration */
  readonly rehydrationPriority?: string;
  /** It indicates the sub type of operation i.e. in case of Restore it can be ALR/OLR */
  readonly restoreType?: string;
  /** Resource Group Name of the Datasource */
  sourceResourceGroup: string;
  /** SubscriptionId corresponding to the DataSource */
  sourceSubscriptionID: string;
  /** StartTime of the job(in UTC) */
  startTime: Date;
  /** Status of the job like InProgress/Completed/Failed/Cancelled/CompletedWithWarnings/Cancelling/Paused */
  status: string;
  /** Subscription Id of the corresponding backup vault */
  subscriptionId: string;
  /** List of supported actions */
  supportedActions: string[];
  /** Name of the vault */
  vaultName: string;
  etag?: string;
  sourceDataStoreName?: string;
  destinationDataStoreName?: string;
}

export function azureBackupJobDeserializer(item: any): AzureBackupJob {
  return {
    activityID: item["activityID"],
    backupInstanceFriendlyName: item["backupInstanceFriendlyName"],
    backupInstanceId: item["backupInstanceId"],
    dataSourceId: item["dataSourceId"],
    dataSourceLocation: item["dataSourceLocation"],
    dataSourceName: item["dataSourceName"],
    dataSourceSetName: item["dataSourceSetName"],
    dataSourceType: item["dataSourceType"],
    duration: item["duration"],
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : userFacingErrorArrayDeserializer(item["errorDetails"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : jobExtendedInfoDeserializer(item["extendedInfo"]),
    isUserTriggered: item["isUserTriggered"],
    operation: item["operation"],
    operationCategory: item["operationCategory"],
    policyId: item["policyId"],
    policyName: item["policyName"],
    progressEnabled: item["progressEnabled"],
    progressUrl: item["progressUrl"],
    rehydrationPriority: item["rehydrationPriority"],
    restoreType: item["restoreType"],
    sourceResourceGroup: item["sourceResourceGroup"],
    sourceSubscriptionID: item["sourceSubscriptionID"],
    startTime: new Date(item["startTime"]),
    status: item["status"],
    subscriptionId: item["subscriptionId"],
    supportedActions: item["supportedActions"].map((p: any) => {
      return p;
    }),
    vaultName: item["vaultName"],
    etag: item["etag"],
    sourceDataStoreName: item["sourceDataStoreName"],
    destinationDataStoreName: item["destinationDataStoreName"],
  };
}

/** Extended Information about the job */
export interface JobExtendedInfo {
  /** Job's Additional Details */
  additionalDetails?: Record<string, string>;
  /** State of the Backup Instance */
  readonly backupInstanceState?: string;
  /** Number of bytes transferred */
  readonly dataTransferredInBytes?: number;
  /** Destination where restore is done */
  readonly recoveryDestination?: string;
  /** Details of the Source Recovery Point */
  readonly sourceRecoverPoint?: RestoreJobRecoveryPointDetails;
  /** List of Sub Tasks of the job */
  readonly subTasks?: JobSubTask[];
  /** Details of the Target Recovery Point */
  readonly targetRecoverPoint?: RestoreJobRecoveryPointDetails;
  /** A List, detailing the warnings related to the job */
  readonly warningDetails?: UserFacingWarningDetail[];
}

export function jobExtendedInfoDeserializer(item: any): JobExtendedInfo {
  return {
    additionalDetails: item["additionalDetails"],
    backupInstanceState: item["backupInstanceState"],
    dataTransferredInBytes: item["dataTransferredInBytes"],
    recoveryDestination: item["recoveryDestination"],
    sourceRecoverPoint: !item["sourceRecoverPoint"]
      ? item["sourceRecoverPoint"]
      : restoreJobRecoveryPointDetailsDeserializer(item["sourceRecoverPoint"]),
    subTasks: !item["subTasks"] ? item["subTasks"] : jobSubTaskArrayDeserializer(item["subTasks"]),
    targetRecoverPoint: !item["targetRecoverPoint"]
      ? item["targetRecoverPoint"]
      : restoreJobRecoveryPointDetailsDeserializer(item["targetRecoverPoint"]),
    warningDetails: !item["warningDetails"]
      ? item["warningDetails"]
      : userFacingWarningDetailArrayDeserializer(item["warningDetails"]),
  };
}

/** model interface RestoreJobRecoveryPointDetails */
export interface RestoreJobRecoveryPointDetails {
  recoveryPointID?: string;
  recoveryPointTime?: Date;
}

export function restoreJobRecoveryPointDetailsDeserializer(
  item: any,
): RestoreJobRecoveryPointDetails {
  return {
    recoveryPointID: item["recoveryPointID"],
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
  };
}

export function jobSubTaskArrayDeserializer(result: Array<JobSubTask>): any[] {
  return result.map((item) => {
    return jobSubTaskDeserializer(item);
  });
}

/** Details of Job's Sub Task */
export interface JobSubTask {
  /** Additional details of Sub Tasks */
  additionalDetails?: Record<string, string>;
  /** Task Id of the Sub Task */
  taskId: number;
  /** Name of the Sub Task */
  taskName: string;
  /** Progress of the Sub Task */
  readonly taskProgress?: string;
  /** Status of the Sub Task */
  taskStatus: string;
}

export function jobSubTaskDeserializer(item: any): JobSubTask {
  return {
    additionalDetails: item["additionalDetails"],
    taskId: item["taskId"],
    taskName: item["taskName"],
    taskProgress: item["taskProgress"],
    taskStatus: item["taskStatus"],
  };
}

export function userFacingWarningDetailArrayDeserializer(
  result: Array<UserFacingWarningDetail>,
): any[] {
  return result.map((item) => {
    return userFacingWarningDetailDeserializer(item);
  });
}

/** Warning object used by layers that have access to localized content, and propagate that to user */
export interface UserFacingWarningDetail {
  /** Name of resource for which warning is raised. */
  resourceName?: string;
  /** Error details for the warning. */
  warning: UserFacingError;
}

export function userFacingWarningDetailDeserializer(item: any): UserFacingWarningDetail {
  return {
    resourceName: item["resourceName"],
    warning: userFacingErrorDeserializer(item["warning"]),
  };
}

/** List of AzureBackup Job resources */
export interface _AzureBackupJobResourceList extends DppResourceList {
  /** List of resources. */
  value?: AzureBackupJobResource[];
}

export function _azureBackupJobResourceListDeserializer(item: any): _AzureBackupJobResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : azureBackupJobResourceArrayDeserializer(item["value"]),
  };
}

export function azureBackupJobResourceArrayDeserializer(
  result: Array<AzureBackupJobResource>,
): any[] {
  return result.map((item) => {
    return azureBackupJobResourceDeserializer(item);
  });
}

/** Deleted Backup Instance */
export interface DeletedBackupInstanceResource extends ProxyResource {
  /** DeletedBackupInstanceResource properties */
  properties?: DeletedBackupInstance;
}

export function deletedBackupInstanceResourceDeserializer(
  item: any,
): DeletedBackupInstanceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deletedBackupInstanceDeserializer(item["properties"]),
  };
}

/** Deleted Backup Instance */
export interface DeletedBackupInstance extends BackupInstance {
  /** Deletion info of Backup Instance */
  readonly deletionInfo?: DeletionInfo;
}

export function deletedBackupInstanceDeserializer(item: any): DeletedBackupInstance {
  return {
    friendlyName: item["friendlyName"],
    dataSourceInfo: datasourceDeserializer(item["dataSourceInfo"]),
    dataSourceSetInfo: !item["dataSourceSetInfo"]
      ? item["dataSourceSetInfo"]
      : datasourceSetDeserializer(item["dataSourceSetInfo"]),
    policyInfo: policyInfoDeserializer(item["policyInfo"]),
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    protectionStatus: !item["protectionStatus"]
      ? item["protectionStatus"]
      : protectionStatusDetailsDeserializer(item["protectionStatus"]),
    currentProtectionState: item["currentProtectionState"],
    protectionErrorDetails: !item["protectionErrorDetails"]
      ? item["protectionErrorDetails"]
      : userFacingErrorDeserializer(item["protectionErrorDetails"]),
    provisioningState: item["provisioningState"],
    datasourceAuthCredentials: !item["datasourceAuthCredentials"]
      ? item["datasourceAuthCredentials"]
      : authCredentialsUnionDeserializer(item["datasourceAuthCredentials"]),
    validationType: item["validationType"],
    identityDetails: !item["identityDetails"]
      ? item["identityDetails"]
      : identityDetailsDeserializer(item["identityDetails"]),
    objectType: item["objectType"],
    deletionInfo: !item["deletionInfo"]
      ? item["deletionInfo"]
      : deletionInfoDeserializer(item["deletionInfo"]),
  };
}

/** Deletion Info */
export interface DeletionInfo {
  /** Specifies time of deletion */
  readonly deletionTime?: string;
  /** Specifies billing end date */
  readonly billingEndDate?: string;
  /** Specifies purge time */
  readonly scheduledPurgeTime?: string;
  /** Delete activity ID for troubleshooting purpose */
  readonly deleteActivityID?: string;
}

export function deletionInfoDeserializer(item: any): DeletionInfo {
  return {
    deletionTime: item["deletionTime"],
    billingEndDate: item["billingEndDate"],
    scheduledPurgeTime: item["scheduledPurgeTime"],
    deleteActivityID: item["deleteActivityID"],
  };
}

/** List of DeletedBackupInstance resources */
export interface _DeletedBackupInstanceResourceList extends DppResourceList {
  /** List of resources. */
  value?: DeletedBackupInstanceResource[];
}

export function _deletedBackupInstanceResourceListDeserializer(
  item: any,
): _DeletedBackupInstanceResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : deletedBackupInstanceResourceArrayDeserializer(item["value"]),
  };
}

export function deletedBackupInstanceResourceArrayDeserializer(
  result: Array<DeletedBackupInstanceResource>,
): any[] {
  return result.map((item) => {
    return deletedBackupInstanceResourceDeserializer(item);
  });
}

/** ResourceGuardProxyBaseResource object, used for response and request bodies for ResourceGuardProxy APIs */
export interface ResourceGuardProxyBaseResource extends ProxyResource {
  /** ResourceGuardProxyBaseResource properties */
  properties?: ResourceGuardProxyBase;
}

export function resourceGuardProxyBaseResourceSerializer(
  item: ResourceGuardProxyBaseResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : resourceGuardProxyBaseSerializer(item["properties"]),
  };
}

export function resourceGuardProxyBaseResourceDeserializer(
  item: any,
): ResourceGuardProxyBaseResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : resourceGuardProxyBaseDeserializer(item["properties"]),
  };
}

/** ResourceGuardProxyBase object, used in ResourceGuardProxyBaseResource */
export interface ResourceGuardProxyBase {
  resourceGuardResourceId?: string;
  resourceGuardOperationDetails?: ResourceGuardOperationDetail[];
  lastUpdatedTime?: string;
  description?: string;
}

export function resourceGuardProxyBaseSerializer(item: ResourceGuardProxyBase): any {
  return {
    resourceGuardResourceId: item["resourceGuardResourceId"],
    resourceGuardOperationDetails: !item["resourceGuardOperationDetails"]
      ? item["resourceGuardOperationDetails"]
      : resourceGuardOperationDetailArraySerializer(item["resourceGuardOperationDetails"]),
    lastUpdatedTime: item["lastUpdatedTime"],
    description: item["description"],
  };
}

export function resourceGuardProxyBaseDeserializer(item: any): ResourceGuardProxyBase {
  return {
    resourceGuardResourceId: item["resourceGuardResourceId"],
    resourceGuardOperationDetails: !item["resourceGuardOperationDetails"]
      ? item["resourceGuardOperationDetails"]
      : resourceGuardOperationDetailArrayDeserializer(item["resourceGuardOperationDetails"]),
    lastUpdatedTime: item["lastUpdatedTime"],
    description: item["description"],
  };
}

export function resourceGuardOperationDetailArraySerializer(
  result: Array<ResourceGuardOperationDetail>,
): any[] {
  return result.map((item) => {
    return resourceGuardOperationDetailSerializer(item);
  });
}

export function resourceGuardOperationDetailArrayDeserializer(
  result: Array<ResourceGuardOperationDetail>,
): any[] {
  return result.map((item) => {
    return resourceGuardOperationDetailDeserializer(item);
  });
}

/** VaultCritical Operation protected by a resource guard */
export interface ResourceGuardOperationDetail {
  vaultCriticalOperation?: string;
  defaultResourceRequest?: string;
}

export function resourceGuardOperationDetailSerializer(item: ResourceGuardOperationDetail): any {
  return {
    vaultCriticalOperation: item["vaultCriticalOperation"],
    defaultResourceRequest: item["defaultResourceRequest"],
  };
}

export function resourceGuardOperationDetailDeserializer(item: any): ResourceGuardOperationDetail {
  return {
    vaultCriticalOperation: item["vaultCriticalOperation"],
    defaultResourceRequest: item["defaultResourceRequest"],
  };
}

/** List of ResourceGuardProxyBase resources */
export interface _ResourceGuardProxyBaseResourceList extends DppResourceList {
  /** List of resources. */
  value?: ResourceGuardProxyBaseResource[];
}

export function _resourceGuardProxyBaseResourceListDeserializer(
  item: any,
): _ResourceGuardProxyBaseResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : resourceGuardProxyBaseResourceArrayDeserializer(item["value"]),
  };
}

export function resourceGuardProxyBaseResourceArraySerializer(
  result: Array<ResourceGuardProxyBaseResource>,
): any[] {
  return result.map((item) => {
    return resourceGuardProxyBaseResourceSerializer(item);
  });
}

export function resourceGuardProxyBaseResourceArrayDeserializer(
  result: Array<ResourceGuardProxyBaseResource>,
): any[] {
  return result.map((item) => {
    return resourceGuardProxyBaseResourceDeserializer(item);
  });
}

/** Request body of unlock delete API. */
export interface UnlockDeleteRequest {
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
  resourceToBeDeleted?: string;
}

export function unlockDeleteRequestSerializer(item: UnlockDeleteRequest): any {
  return {
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    resourceToBeDeleted: item["resourceToBeDeleted"],
  };
}

/** Response of Unlock Delete API. */
export interface UnlockDeleteResponse {
  /** This is the time when unlock delete privileges will get expired. */
  unlockDeleteExpiryTime?: string;
}

export function unlockDeleteResponseDeserializer(item: any): UnlockDeleteResponse {
  return {
    unlockDeleteExpiryTime: item["unlockDeleteExpiryTime"],
  };
}

/** Base class for Backup Feature support */
export interface FeatureValidationRequestBase {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: FeatureValidationRequest */
  objectType: string;
}

export function featureValidationRequestBaseSerializer(item: FeatureValidationRequestBase): any {
  return { objectType: item["objectType"] };
}

/** Alias for FeatureValidationRequestBaseUnion */
export type FeatureValidationRequestBaseUnion =
  | FeatureValidationRequest
  | FeatureValidationRequestBase;

export function featureValidationRequestBaseUnionSerializer(
  item: FeatureValidationRequestBaseUnion,
): any {
  switch (item.objectType) {
    case "FeatureValidationRequest":
      return featureValidationRequestSerializer(item as FeatureValidationRequest);

    default:
      return featureValidationRequestBaseSerializer(item);
  }
}

/** Base class for feature object */
export interface FeatureValidationRequest extends FeatureValidationRequestBase {
  /** backup support feature type. */
  featureType?: FeatureType;
  /** backup support feature name. */
  featureName?: string;
  /** Type of the specific object - used for deserializing */
  objectType: "FeatureValidationRequest";
}

export function featureValidationRequestSerializer(item: FeatureValidationRequest): any {
  return {
    objectType: item["objectType"],
    featureType: item["featureType"],
    featureName: item["featureName"],
  };
}

/** backup support feature type. */
export enum KnownFeatureType {
  /** Invalid */
  Invalid = "Invalid",
  /** DataSourceType */
  DataSourceType = "DataSourceType",
}

/**
 * backup support feature type. \
 * {@link KnownFeatureType} can be used interchangeably with FeatureType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **DataSourceType**
 */
export type FeatureType = string;

/** Base class for Backup Feature support */
export interface FeatureValidationResponseBase {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: FeatureValidationResponse */
  objectType: string;
}

export function featureValidationResponseBaseDeserializer(
  item: any,
): FeatureValidationResponseBase {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for FeatureValidationResponseBaseUnion */
export type FeatureValidationResponseBaseUnion =
  | FeatureValidationResponse
  | FeatureValidationResponseBase;

export function featureValidationResponseBaseUnionDeserializer(
  item: any,
): FeatureValidationResponseBaseUnion {
  switch (item.objectType) {
    case "FeatureValidationResponse":
      return featureValidationResponseDeserializer(item as FeatureValidationResponse);

    default:
      return featureValidationResponseBaseDeserializer(item);
  }
}

/** Feature Validation Response */
export interface FeatureValidationResponse extends FeatureValidationResponseBase {
  /** backup support feature type. */
  featureType?: FeatureType;
  /** Response features */
  features?: SupportedFeature[];
  /** Type of the specific object - used for deserializing */
  objectType: "FeatureValidationResponse";
}

export function featureValidationResponseDeserializer(item: any): FeatureValidationResponse {
  return {
    objectType: item["objectType"],
    featureType: item["featureType"],
    features: !item["features"]
      ? item["features"]
      : supportedFeatureArrayDeserializer(item["features"]),
  };
}

export function supportedFeatureArrayDeserializer(result: Array<SupportedFeature>): any[] {
  return result.map((item) => {
    return supportedFeatureDeserializer(item);
  });
}

/** Elements class for feature request */
export interface SupportedFeature {
  /** support feature type. */
  featureName?: string;
  /** feature support status */
  supportStatus?: FeatureSupportStatus;
  /** support feature type. */
  exposureControlledFeatures?: string[];
}

export function supportedFeatureDeserializer(item: any): SupportedFeature {
  return {
    featureName: item["featureName"],
    supportStatus: item["supportStatus"],
    exposureControlledFeatures: !item["exposureControlledFeatures"]
      ? item["exposureControlledFeatures"]
      : item["exposureControlledFeatures"].map((p: any) => {
          return p;
        }),
  };
}

/** feature support status */
export enum KnownFeatureSupportStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** NotSupported */
  NotSupported = "NotSupported",
  /** AlphaPreview */
  AlphaPreview = "AlphaPreview",
  /** PrivatePreview */
  PrivatePreview = "PrivatePreview",
  /** PublicPreview */
  PublicPreview = "PublicPreview",
  /** GenerallyAvailable */
  GenerallyAvailable = "GenerallyAvailable",
}

/**
 * feature support status \
 * {@link KnownFeatureSupportStatus} can be used interchangeably with FeatureSupportStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **NotSupported** \
 * **AlphaPreview** \
 * **PrivatePreview** \
 * **PublicPreview** \
 * **GenerallyAvailable**
 */
export type FeatureSupportStatus = string;

/**
 * Information about BI whose secondary RecoveryPoints are requested
 * Source region and
 * BI ARM path
 */
export interface FetchSecondaryRPsRequestParameters {
  /** Source region in which BackupInstance is located */
  sourceRegion?: string;
  /** ARM Path of BackupInstance */
  sourceBackupInstanceId?: string;
}

export function fetchSecondaryRPsRequestParametersSerializer(
  item: FetchSecondaryRPsRequestParameters,
): any {
  return {
    sourceRegion: item["sourceRegion"],
    sourceBackupInstanceId: item["sourceBackupInstanceId"],
  };
}

/** Details of CRR Job to be fetched */
export interface CrossRegionRestoreJobRequest {
  sourceRegion: string;
  sourceBackupVaultId: string;
  jobId: string;
}

export function crossRegionRestoreJobRequestSerializer(item: CrossRegionRestoreJobRequest): any {
  return {
    sourceRegion: item["sourceRegion"],
    sourceBackupVaultId: item["sourceBackupVaultId"],
    jobId: item["jobId"],
  };
}

/** Details of Backup Vault for which CRR Jobs are to be fetched */
export interface CrossRegionRestoreJobsRequest {
  sourceRegion: string;
  sourceBackupVaultId: string;
}

export function crossRegionRestoreJobsRequestSerializer(item: CrossRegionRestoreJobsRequest): any {
  return {
    sourceRegion: item["sourceRegion"],
    sourceBackupVaultId: item["sourceBackupVaultId"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-01 API version. */
  V20250701 = "2025-07-01",
}
