// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Prepare DataMove Request */
export interface PrepareDataMoveRequest {
  /** ARM Id of target vault */
  targetResourceId: string;
  /** Target Region */
  targetRegion: string;
  /** DataMove Level */
  dataMoveLevel: DataMoveLevel;
  /**
   * Source Container ArmIds
   * This needs to be populated only if DataMoveLevel is set to container
   */
  sourceContainerArmIds?: string[];
  /** Ignore the artifacts which are already moved. */
  ignoreMoved?: boolean;
}

export function prepareDataMoveRequestSerializer(item: PrepareDataMoveRequest): any {
  return {
    targetResourceId: item["targetResourceId"],
    targetRegion: item["targetRegion"],
    dataMoveLevel: item["dataMoveLevel"],
    sourceContainerArmIds: !item["sourceContainerArmIds"]
      ? item["sourceContainerArmIds"]
      : item["sourceContainerArmIds"].map((p: any) => {
          return p;
        }),
    ignoreMoved: item["ignoreMoved"],
  };
}

/** DataMove Level */
export enum KnownDataMoveLevel {
  /** Invalid */
  Invalid = "Invalid",
  /** Vault */
  Vault = "Vault",
  /** Container */
  Container = "Container",
}

/**
 * DataMove Level \
 * {@link KnownDataMoveLevel} can be used interchangeably with DataMoveLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Vault** \
 * **Container**
 */
export type DataMoveLevel = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ArmErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : armErrorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ArmErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ArmErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function armErrorDetailDeserializer(item: any): ArmErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : armErrorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function armErrorDetailArrayDeserializer(result: Array<ArmErrorDetail>): any[] {
  return result.map((item) => {
    return armErrorDetailDeserializer(item);
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

/** The request has succeeded. */
export interface OkResponse {}

export function okResponseDeserializer(item: any): OkResponse {
  return item;
}

/** Trigger DataMove Request */
export interface TriggerDataMoveRequest {
  /** ARM Id of source vault */
  sourceResourceId: string;
  /** Source Region */
  sourceRegion: string;
  /** DataMove Level */
  dataMoveLevel: DataMoveLevel;
  /** Correlation Id */
  correlationId: string;
  /** Source Container ArmIds */
  sourceContainerArmIds?: string[];
  /** Pause GC */
  pauseGC?: boolean;
}

export function triggerDataMoveRequestSerializer(item: TriggerDataMoveRequest): any {
  return {
    sourceResourceId: item["sourceResourceId"],
    sourceRegion: item["sourceRegion"],
    dataMoveLevel: item["dataMoveLevel"],
    correlationId: item["correlationId"],
    sourceContainerArmIds: !item["sourceContainerArmIds"]
      ? item["sourceContainerArmIds"]
      : item["sourceContainerArmIds"].map((p: any) => {
          return p;
        }),
    pauseGC: item["pauseGC"],
  };
}

/** Operation status. */
export interface OperationStatus {
  /** ID of the operation. */
  id?: string;
  /** Name of the operation. */
  name?: string;
  /** Operation status. */
  status?: OperationStatusValues;
  /** Operation start time. Format: ISO-8601. */
  startTime?: Date;
  /** Operation end time. Format: ISO-8601. */
  endTime?: Date;
  /** Error information related to this operation. */
  error?: OperationStatusError;
  /** Additional information associated with this operation. */
  properties?: OperationStatusExtendedInfoUnion;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    error: !item["error"] ? item["error"] : operationStatusErrorDeserializer(item["error"]),
    properties: !item["properties"]
      ? item["properties"]
      : operationStatusExtendedInfoUnionDeserializer(item["properties"]),
  };
}

/** Operation status. */
export enum KnownOperationStatusValues {
  /** Invalid */
  Invalid = "Invalid",
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Operation status. \
 * {@link KnownOperationStatusValues} can be used interchangeably with OperationStatusValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **InProgress** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type OperationStatusValues = string;

/** Error information associated with operation status call. */
export interface OperationStatusError {
  /** Error code of the operation failure. */
  code?: string;
  /** Error message displayed if the operation failure. */
  message?: string;
}

export function operationStatusErrorDeserializer(item: any): OperationStatusError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Base class for additional information of operation status. */
export interface OperationStatusExtendedInfo {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: OperationStatusJobExtendedInfo, OperationStatusJobsExtendedInfo, OperationStatusProvisionILRExtendedInfo, OperationStatusValidateOperationExtendedInfo */
  objectType: string;
}

export function operationStatusExtendedInfoDeserializer(item: any): OperationStatusExtendedInfo {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for OperationStatusExtendedInfoUnion */
export type OperationStatusExtendedInfoUnion =
  | OperationStatusJobExtendedInfo
  | OperationStatusJobsExtendedInfo
  | OperationStatusProvisionILRExtendedInfo
  | OperationStatusValidateOperationExtendedInfo
  | OperationStatusExtendedInfo;

export function operationStatusExtendedInfoUnionDeserializer(
  item: any,
): OperationStatusExtendedInfoUnion {
  switch (item.objectType) {
    case "OperationStatusJobExtendedInfo":
      return operationStatusJobExtendedInfoDeserializer(item as OperationStatusJobExtendedInfo);

    case "OperationStatusJobsExtendedInfo":
      return operationStatusJobsExtendedInfoDeserializer(item as OperationStatusJobsExtendedInfo);

    case "OperationStatusProvisionILRExtendedInfo":
      return operationStatusProvisionILRExtendedInfoDeserializer(
        item as OperationStatusProvisionILRExtendedInfo,
      );

    case "OperationStatusValidateOperationExtendedInfo":
      return operationStatusValidateOperationExtendedInfoDeserializer(
        item as OperationStatusValidateOperationExtendedInfo,
      );

    default:
      return operationStatusExtendedInfoDeserializer(item);
  }
}

/** Operation status job extended info. */
export interface OperationStatusJobExtendedInfo extends OperationStatusExtendedInfo {
  /** ID of the job created for this protected item. */
  jobId?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "OperationStatusJobExtendedInfo";
}

export function operationStatusJobExtendedInfoDeserializer(
  item: any,
): OperationStatusJobExtendedInfo {
  return {
    objectType: item["objectType"],
    jobId: item["jobId"],
  };
}

/** Operation status extended info for list of jobs. */
export interface OperationStatusJobsExtendedInfo extends OperationStatusExtendedInfo {
  /** IDs of the jobs created for the protected item. */
  jobIds?: string[];
  /** Stores all the failed jobs along with the corresponding error codes. */
  failedJobsError?: Record<string, string>;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "OperationStatusJobsExtendedInfo";
}

export function operationStatusJobsExtendedInfoDeserializer(
  item: any,
): OperationStatusJobsExtendedInfo {
  return {
    objectType: item["objectType"],
    jobIds: !item["jobIds"]
      ? item["jobIds"]
      : item["jobIds"].map((p: any) => {
          return p;
        }),
    failedJobsError: !item["failedJobsError"]
      ? item["failedJobsError"]
      : Object.fromEntries(
          Object.entries(item["failedJobsError"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Operation status extended info for ILR provision action. */
export interface OperationStatusProvisionILRExtendedInfo extends OperationStatusExtendedInfo {
  /** Target details for file / folder restore. */
  recoveryTarget?: InstantItemRecoveryTarget;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "OperationStatusProvisionILRExtendedInfo";
}

export function operationStatusProvisionILRExtendedInfoDeserializer(
  item: any,
): OperationStatusProvisionILRExtendedInfo {
  return {
    objectType: item["objectType"],
    recoveryTarget: !item["recoveryTarget"]
      ? item["recoveryTarget"]
      : instantItemRecoveryTargetDeserializer(item["recoveryTarget"]),
  };
}

/** Target details for file / folder restore. */
export interface InstantItemRecoveryTarget {
  /** List of client scripts. */
  clientScripts?: ClientScriptForConnect[];
}

export function instantItemRecoveryTargetDeserializer(item: any): InstantItemRecoveryTarget {
  return {
    clientScripts: !item["clientScripts"]
      ? item["clientScripts"]
      : clientScriptForConnectArrayDeserializer(item["clientScripts"]),
  };
}

export function clientScriptForConnectArrayDeserializer(
  result: Array<ClientScriptForConnect>,
): any[] {
  return result.map((item) => {
    return clientScriptForConnectDeserializer(item);
  });
}

/** Client script details for file / folder restore. */
export interface ClientScriptForConnect {
  /** File content of the client script for file / folder restore. */
  scriptContent?: string;
  /** File extension of the client script for file / folder restore - .ps1 , .sh , etc. */
  scriptExtension?: string;
  /** OS type - Windows, Linux etc. for which this file / folder restore client script works. */
  osType?: string;
  /** URL of Executable from where to source the content. If this is not null then ScriptContent should not be used */
  url?: string;
  /**
   * Mandatory suffix that should be added to the name of script that is given for download to user.
   * If its null or empty then , ignore it.
   */
  scriptNameSuffix?: string;
}

export function clientScriptForConnectDeserializer(item: any): ClientScriptForConnect {
  return {
    scriptContent: item["scriptContent"],
    scriptExtension: item["scriptExtension"],
    osType: item["osType"],
    url: item["url"],
    scriptNameSuffix: item["scriptNameSuffix"],
  };
}

/** Operation status extended info for ValidateOperation action. */
export interface OperationStatusValidateOperationExtendedInfo extends OperationStatusExtendedInfo {
  /** Gets the validation operation response */
  validateOperationResponse?: ValidateOperationResponse;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "OperationStatusValidateOperationExtendedInfo";
}

export function operationStatusValidateOperationExtendedInfoDeserializer(
  item: any,
): OperationStatusValidateOperationExtendedInfo {
  return {
    objectType: item["objectType"],
    validateOperationResponse: !item["validateOperationResponse"]
      ? item["validateOperationResponse"]
      : validateOperationResponseDeserializer(item["validateOperationResponse"]),
  };
}

/** Base class for validate operation response. */
export interface ValidateOperationResponse {
  /** Gets the validation result */
  validationResults?: ErrorDetail[];
}

export function validateOperationResponseDeserializer(item: any): ValidateOperationResponse {
  return {
    validationResults: !item["validationResults"]
      ? item["validationResults"]
      : errorDetailArrayDeserializer(item["validationResults"]),
  };
}

export function errorDetailArraySerializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailSerializer(item);
  });
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

/** Error Detail class which encapsulates Code, Message and Recommendations. */
export interface ErrorDetail {
  /** Error code. */
  readonly code?: string;
  /** Error Message related to the Code. */
  readonly message?: string;
  /** List of recommendation strings. */
  readonly recommendations?: string[];
}

export function errorDetailSerializer(item: ErrorDetail): any {
  return item;
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface MoveRPAcrossTiersRequest */
export interface MoveRPAcrossTiersRequest {
  /** Gets the class type. */
  objectType?: string;
  /** Source tier from where RP needs to be moved */
  sourceTierType?: RecoveryPointTierType;
  /** Target tier where RP needs to be moved */
  targetTierType?: RecoveryPointTierType;
}

export function moveRPAcrossTiersRequestSerializer(item: MoveRPAcrossTiersRequest): any {
  return {
    objectType: item["objectType"],
    sourceTierType: item["sourceTierType"],
    targetTierType: item["targetTierType"],
  };
}

/** Recovery point tier type. */
export type RecoveryPointTierType = "Invalid" | "InstantRP" | "HardenedRP" | "ArchivedRP";

/** Operations List response which contains list of available APIs. */
export interface _ClientDiscoveryResponse {
  /** List of available operations. */
  value?: ClientDiscoveryValueForSingleApi[];
  /** Link to the next chunk of Response. */
  nextLink?: string;
}

export function _clientDiscoveryResponseDeserializer(item: any): _ClientDiscoveryResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : clientDiscoveryValueForSingleApiArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clientDiscoveryValueForSingleApiArrayDeserializer(
  result: Array<ClientDiscoveryValueForSingleApi>,
): any[] {
  return result.map((item) => {
    return clientDiscoveryValueForSingleApiDeserializer(item);
  });
}

/** Available operation details. */
export interface ClientDiscoveryValueForSingleApi {
  /** Name of the Operation. */
  name?: string;
  /** Contains the localized display information for this particular operation */
  display?: ClientDiscoveryDisplay;
  /** The intended executor of the operation;governs the display of the operation in the RBAC UX and the audit logs UX */
  origin?: string;
  /** ShoeBox properties for the given operation. */
  properties?: ClientDiscoveryForProperties;
}

export function clientDiscoveryValueForSingleApiDeserializer(
  item: any,
): ClientDiscoveryValueForSingleApi {
  return {
    name: item["name"],
    display: !item["display"]
      ? item["display"]
      : clientDiscoveryDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : clientDiscoveryForPropertiesDeserializer(item["properties"]),
  };
}

/** Localized display information of an operation. */
export interface ClientDiscoveryDisplay {
  /** Name of the provider for display purposes */
  provider?: string;
  /** ResourceType for which this Operation can be performed. */
  resource?: string;
  /** Operations Name itself. */
  operation?: string;
  /** Description of the operation having details of what operation is about. */
  description?: string;
}

export function clientDiscoveryDisplayDeserializer(item: any): ClientDiscoveryDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Class to represent shoebox properties in json client discovery. */
export interface ClientDiscoveryForProperties {
  /** Operation properties. */
  serviceSpecification?: ClientDiscoveryForServiceSpecification;
}

export function clientDiscoveryForPropertiesDeserializer(item: any): ClientDiscoveryForProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : clientDiscoveryForServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Class to represent shoebox service specification in json client discovery. */
export interface ClientDiscoveryForServiceSpecification {
  /** List of log specifications of this operation. */
  logSpecifications?: ClientDiscoveryForLogSpecification[];
}

export function clientDiscoveryForServiceSpecificationDeserializer(
  item: any,
): ClientDiscoveryForServiceSpecification {
  return {
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : clientDiscoveryForLogSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function clientDiscoveryForLogSpecificationArrayDeserializer(
  result: Array<ClientDiscoveryForLogSpecification>,
): any[] {
  return result.map((item) => {
    return clientDiscoveryForLogSpecificationDeserializer(item);
  });
}

/** Class to represent shoebox log specification in json client discovery. */
export interface ClientDiscoveryForLogSpecification {
  /** Name for shoebox log specification. */
  name?: string;
  /** Localized display name */
  displayName?: string;
  /** blob duration of shoebox log specification */
  blobDuration?: string;
}

export function clientDiscoveryForLogSpecificationDeserializer(
  item: any,
): ClientDiscoveryForLogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
  };
}

/** The resource storage details. */
export interface BackupResourceConfigResource extends Resource {
  /** BackupResourceConfigResource properties */
  properties?: BackupResourceConfig;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function backupResourceConfigResourceSerializer(item: BackupResourceConfigResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : backupResourceConfigSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
  };
}

export function backupResourceConfigResourceDeserializer(item: any): BackupResourceConfigResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : backupResourceConfigDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** The resource storage details. */
export interface BackupResourceConfig {
  /** Storage type */
  storageModelType?: StorageType;
  /** Storage type. */
  storageType?: StorageType;
  /** Locked or Unlocked. Once a machine is registered against a resource, the storageTypeState is always Locked. */
  storageTypeState?: StorageTypeState;
  /** Opt in details of Cross Region Restore feature. */
  crossRegionRestoreFlag?: boolean;
  /** Vault Dedup state */
  dedupState?: DedupState;
  /** Vault x-cool state */
  xcoolState?: XcoolState;
}

export function backupResourceConfigSerializer(item: BackupResourceConfig): any {
  return {
    storageModelType: item["storageModelType"],
    storageType: item["storageType"],
    storageTypeState: item["storageTypeState"],
    crossRegionRestoreFlag: item["crossRegionRestoreFlag"],
    dedupState: item["dedupState"],
    xcoolState: item["xcoolState"],
  };
}

export function backupResourceConfigDeserializer(item: any): BackupResourceConfig {
  return {
    storageModelType: item["storageModelType"],
    storageType: item["storageType"],
    storageTypeState: item["storageTypeState"],
    crossRegionRestoreFlag: item["crossRegionRestoreFlag"],
    dedupState: item["dedupState"],
    xcoolState: item["xcoolState"],
  };
}

/** Storage type */
export enum KnownStorageType {
  /** Invalid */
  Invalid = "Invalid",
  /** GeoRedundant */
  GeoRedundant = "GeoRedundant",
  /** LocallyRedundant */
  LocallyRedundant = "LocallyRedundant",
  /** ZoneRedundant */
  ZoneRedundant = "ZoneRedundant",
  /** ReadAccessGeoZoneRedundant */
  ReadAccessGeoZoneRedundant = "ReadAccessGeoZoneRedundant",
}

/**
 * Storage type \
 * {@link KnownStorageType} can be used interchangeably with StorageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **GeoRedundant** \
 * **LocallyRedundant** \
 * **ZoneRedundant** \
 * **ReadAccessGeoZoneRedundant**
 */
export type StorageType = string;

/** Locked or Unlocked. Once a machine is registered against a resource, the storageTypeState is always Locked. */
export enum KnownStorageTypeState {
  /** Invalid */
  Invalid = "Invalid",
  /** Locked */
  Locked = "Locked",
  /** Unlocked */
  Unlocked = "Unlocked",
}

/**
 * Locked or Unlocked. Once a machine is registered against a resource, the storageTypeState is always Locked. \
 * {@link KnownStorageTypeState} can be used interchangeably with StorageTypeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Locked** \
 * **Unlocked**
 */
export type StorageTypeState = string;

/** Vault Dedup state */
export enum KnownDedupState {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Vault Dedup state \
 * {@link KnownDedupState} can be used interchangeably with DedupState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Enabled** \
 * **Disabled**
 */
export type DedupState = string;

/** Vault x-cool state */
export enum KnownXcoolState {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Vault x-cool state \
 * {@link KnownXcoolState} can be used interchangeably with XcoolState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Enabled** \
 * **Disabled**
 */
export type XcoolState = string;

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

/** Operation result response for Vault Storage Config */
export interface VaultStorageConfigOperationResultResponse {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: PrepareDataMoveResponse */
  objectType: string;
}

export function vaultStorageConfigOperationResultResponseDeserializer(
  item: any,
): VaultStorageConfigOperationResultResponse {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for VaultStorageConfigOperationResultResponseUnion */
export type VaultStorageConfigOperationResultResponseUnion =
  | PrepareDataMoveResponse
  | VaultStorageConfigOperationResultResponse;

export function vaultStorageConfigOperationResultResponseUnionDeserializer(
  item: any,
): VaultStorageConfigOperationResultResponseUnion {
  switch (item.objectType) {
    case "PrepareDataMoveResponse":
      return prepareDataMoveResponseDeserializer(item as PrepareDataMoveResponse);

    default:
      return vaultStorageConfigOperationResultResponseDeserializer(item);
  }
}

/** Prepare DataMove Response */
export interface PrepareDataMoveResponse extends VaultStorageConfigOperationResultResponse {
  /** Co-relationId for move operation */
  correlationId?: string;
  /** Source Vault Properties */
  sourceVaultProperties?: Record<string, string>;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "PrepareDataMoveResponse";
}

export function prepareDataMoveResponseDeserializer(item: any): PrepareDataMoveResponse {
  return {
    objectType: item["objectType"],
    correlationId: item["correlationId"],
    sourceVaultProperties: !item["sourceVaultProperties"]
      ? item["sourceVaultProperties"]
      : Object.fromEntries(
          Object.entries(item["sourceVaultProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Backup resource vault config details. */
export interface BackupResourceVaultConfigResource extends Resource {
  /** BackupResourceVaultConfigResource properties */
  properties?: BackupResourceVaultConfig;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function backupResourceVaultConfigResourceSerializer(
  item: BackupResourceVaultConfigResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : backupResourceVaultConfigSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
  };
}

export function backupResourceVaultConfigResourceDeserializer(
  item: any,
): BackupResourceVaultConfigResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : backupResourceVaultConfigDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Backup resource vault config details. */
export interface BackupResourceVaultConfig {
  /** Storage type. */
  storageModelType?: StorageType;
  /** Storage type. */
  storageType?: StorageType;
  /** Locked or Unlocked. Once a machine is registered against a resource, the storageTypeState is always Locked. */
  storageTypeState?: StorageTypeState;
  /** Enabled or Disabled. */
  enhancedSecurityState?: EnhancedSecurityState;
  /** Soft Delete feature state */
  softDeleteFeatureState?: SoftDeleteFeatureState;
  /** Soft delete retention period in days */
  softDeleteRetentionPeriodInDays?: number;
  /** ResourceGuard Operation Requests */
  resourceGuardOperationRequests?: string[];
  /** This flag is no longer in use. Please use 'softDeleteFeatureState' to set the soft delete state for the vault */
  isSoftDeleteFeatureStateEditable?: boolean;
}

export function backupResourceVaultConfigSerializer(item: BackupResourceVaultConfig): any {
  return {
    storageModelType: item["storageModelType"],
    storageType: item["storageType"],
    storageTypeState: item["storageTypeState"],
    enhancedSecurityState: item["enhancedSecurityState"],
    softDeleteFeatureState: item["softDeleteFeatureState"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isSoftDeleteFeatureStateEditable: item["isSoftDeleteFeatureStateEditable"],
  };
}

export function backupResourceVaultConfigDeserializer(item: any): BackupResourceVaultConfig {
  return {
    storageModelType: item["storageModelType"],
    storageType: item["storageType"],
    storageTypeState: item["storageTypeState"],
    enhancedSecurityState: item["enhancedSecurityState"],
    softDeleteFeatureState: item["softDeleteFeatureState"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isSoftDeleteFeatureStateEditable: item["isSoftDeleteFeatureStateEditable"],
  };
}

/** Enabled or Disabled. */
export enum KnownEnhancedSecurityState {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enabled or Disabled. \
 * {@link KnownEnhancedSecurityState} can be used interchangeably with EnhancedSecurityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Enabled** \
 * **Disabled**
 */
export type EnhancedSecurityState = string;

/** Soft Delete feature state */
export enum KnownSoftDeleteFeatureState {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** AlwaysON */
  AlwaysON = "AlwaysON",
}

/**
 * Soft Delete feature state \
 * {@link KnownSoftDeleteFeatureState} can be used interchangeably with SoftDeleteFeatureState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Enabled** \
 * **Disabled** \
 * **AlwaysON**
 */
export type SoftDeleteFeatureState = string;

/** */
export interface BackupResourceEncryptionConfigExtendedResource extends Resource {
  /** BackupResourceEncryptionConfigExtendedResource properties */
  properties?: BackupResourceEncryptionConfigExtended;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function backupResourceEncryptionConfigExtendedResourceDeserializer(
  item: any,
): BackupResourceEncryptionConfigExtendedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : backupResourceEncryptionConfigExtendedDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** model interface BackupResourceEncryptionConfigExtended */
export interface BackupResourceEncryptionConfigExtended extends BackupResourceEncryptionConfig {
  /** User Assigned Identity Id */
  userAssignedIdentity?: string;
  /** bool to indicate whether to use system Assigned Identity or not */
  useSystemAssignedIdentity?: boolean;
}

export function backupResourceEncryptionConfigExtendedDeserializer(
  item: any,
): BackupResourceEncryptionConfigExtended {
  return {
    encryptionAtRestType: item["encryptionAtRestType"],
    keyUri: item["keyUri"],
    subscriptionId: item["subscriptionId"],
    lastUpdateStatus: item["lastUpdateStatus"],
    infrastructureEncryptionState: item["infrastructureEncryptionState"],
    userAssignedIdentity: item["userAssignedIdentity"],
    useSystemAssignedIdentity: item["useSystemAssignedIdentity"],
  };
}

/** model interface BackupResourceEncryptionConfig */
export interface BackupResourceEncryptionConfig {
  /** Encryption At Rest Type */
  encryptionAtRestType?: EncryptionAtRestType;
  /** Key Vault Key URI */
  keyUri?: string;
  /** Key Vault Subscription Id */
  subscriptionId?: string;
  lastUpdateStatus?: LastUpdateStatus;
  infrastructureEncryptionState?: InfrastructureEncryptionState;
}

export function backupResourceEncryptionConfigSerializer(
  item: BackupResourceEncryptionConfig,
): any {
  return {
    encryptionAtRestType: item["encryptionAtRestType"],
    keyUri: item["keyUri"],
    subscriptionId: item["subscriptionId"],
    lastUpdateStatus: item["lastUpdateStatus"],
    infrastructureEncryptionState: item["infrastructureEncryptionState"],
  };
}

export function backupResourceEncryptionConfigDeserializer(
  item: any,
): BackupResourceEncryptionConfig {
  return {
    encryptionAtRestType: item["encryptionAtRestType"],
    keyUri: item["keyUri"],
    subscriptionId: item["subscriptionId"],
    lastUpdateStatus: item["lastUpdateStatus"],
    infrastructureEncryptionState: item["infrastructureEncryptionState"],
  };
}

/** Encryption At Rest Type */
export enum KnownEncryptionAtRestType {
  /** Invalid */
  Invalid = "Invalid",
  /** MicrosoftManaged */
  MicrosoftManaged = "MicrosoftManaged",
  /** CustomerManaged */
  CustomerManaged = "CustomerManaged",
}

/**
 * Encryption At Rest Type \
 * {@link KnownEncryptionAtRestType} can be used interchangeably with EncryptionAtRestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **MicrosoftManaged** \
 * **CustomerManaged**
 */
export type EncryptionAtRestType = string;

/** Known values of {@link LastUpdateStatus} that the service accepts. */
export enum KnownLastUpdateStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** NotEnabled */
  NotEnabled = "NotEnabled",
  /** PartiallySucceeded */
  PartiallySucceeded = "PartiallySucceeded",
  /** PartiallyFailed */
  PartiallyFailed = "PartiallyFailed",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Initialized */
  Initialized = "Initialized",
  /** FirstInitialization */
  FirstInitialization = "FirstInitialization",
}

/** Type of LastUpdateStatus */
export type LastUpdateStatus = string;

/** Known values of {@link InfrastructureEncryptionState} that the service accepts. */
export enum KnownInfrastructureEncryptionState {
  /** Invalid */
  Invalid = "Invalid",
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/** Type of InfrastructureEncryptionState */
export type InfrastructureEncryptionState = string;

/** */
export interface BackupResourceEncryptionConfigResource extends Resource {
  /** BackupResourceEncryptionConfigResource properties */
  properties?: BackupResourceEncryptionConfig;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function backupResourceEncryptionConfigResourceSerializer(
  item: BackupResourceEncryptionConfigResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : backupResourceEncryptionConfigSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Base class for backup items. */
export interface ProtectedItemResource extends Resource {
  /** ProtectedItemResource properties */
  properties?: ProtectedItemUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function protectedItemResourceSerializer(item: ProtectedItemResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : protectedItemUnionSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
  };
}

export function protectedItemResourceDeserializer(item: any): ProtectedItemResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectedItemUnionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Base class for backup items. */
export interface ProtectedItem {
  /** backup item type. */
  /** The discriminator possible values: AzureFileShareProtectedItem, Microsoft.ClassicCompute/virtualMachines, AzureIaaSVMProtectedItem, Microsoft.Compute/virtualMachines, Microsoft.Sql/servers/databases, AzureVmWorkloadProtectedItem, AzureVmWorkloadSAPAseDatabase, AzureVmWorkloadSAPHanaDatabase, AzureVmWorkloadSAPHanaDBInstance, AzureVmWorkloadSQLDatabase, AzureVmWorkloadSQLInstance, DPMProtectedItem, GenericProtectedItem, MabFileFolderProtectedItem */
  protectedItemType: string;
  /** Type of backup management for the backed up item. */
  readonly backupManagementType?: BackupManagementType;
  /** Type of workload this item represents. */
  readonly workloadType?: DataSourceType;
  /** Unique name of container */
  containerName?: string;
  /** ARM ID of the resource to be backed up. */
  sourceResourceId?: string;
  /** ID of the backup policy with which this item is backed up. */
  policyId?: string;
  /** Timestamp when the last (latest) backup copy was created for this backup item. */
  lastRecoveryPoint?: Date;
  /** Name of the backup set the backup item belongs to */
  backupSetName?: string;
  /** Create mode to indicate recovery of existing soft deleted data source or creation of new data source. */
  createMode?: CreateMode;
  /** Time for deferred deletion in UTC */
  deferredDeleteTimeInUTC?: Date;
  /** Flag to identify whether the DS is scheduled for deferred delete */
  isScheduledForDeferredDelete?: boolean;
  /** Time remaining before the DS marked for deferred delete is permanently deleted */
  deferredDeleteTimeRemaining?: string;
  /** Flag to identify whether the deferred deleted DS is to be purged soon */
  isDeferredDeleteScheduleUpcoming?: boolean;
  /** Flag to identify that deferred deleted DS is to be moved into Pause state */
  isRehydrate?: boolean;
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
  /** Flag to identify whether datasource is protected in archive */
  isArchiveEnabled?: boolean;
  /** Name of the policy used for protection */
  policyName?: string;
  /** Soft delete retention period in days */
  softDeleteRetentionPeriodInDays?: number;
  /** ID of the vault which protects this item */
  readonly vaultId?: string;
  /** Source side threat information */
  sourceSideScanInfo?: SourceSideScanInfo;
}

export function protectedItemSerializer(item: ProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
  };
}

export function protectedItemDeserializer(item: any): ProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
  };
}

/** Alias for ProtectedItemUnion */
export type ProtectedItemUnion =
  | AzureFileshareProtectedItem
  | AzureIaaSVMProtectedItemUnion
  | AzureSqlProtectedItem
  | AzureVmWorkloadProtectedItemUnion
  | DPMProtectedItem
  | GenericProtectedItem
  | MabFileFolderProtectedItem
  | ProtectedItem;

export function protectedItemUnionSerializer(item: ProtectedItemUnion): any {
  switch (item.protectedItemType) {
    case "AzureFileShareProtectedItem":
      return azureFileshareProtectedItemSerializer(item as AzureFileshareProtectedItem);

    case "AzureIaaSVMProtectedItem":
    case "Microsoft.ClassicCompute/virtualMachines":
    case "Microsoft.Compute/virtualMachines":
      return azureIaaSVMProtectedItemUnionSerializer(item as AzureIaaSVMProtectedItemUnion);

    case "Microsoft.Sql/servers/databases":
      return azureSqlProtectedItemSerializer(item as AzureSqlProtectedItem);

    case "AzureVmWorkloadProtectedItem":
    case "AzureVmWorkloadSAPAseDatabase":
    case "AzureVmWorkloadSAPHanaDatabase":
    case "AzureVmWorkloadSAPHanaDBInstance":
    case "AzureVmWorkloadSQLDatabase":
    case "AzureVmWorkloadSQLInstance":
      return azureVmWorkloadProtectedItemUnionSerializer(item as AzureVmWorkloadProtectedItemUnion);

    case "DPMProtectedItem":
      return dpmProtectedItemSerializer(item as DPMProtectedItem);

    case "GenericProtectedItem":
      return genericProtectedItemSerializer(item as GenericProtectedItem);

    case "MabFileFolderProtectedItem":
      return mabFileFolderProtectedItemSerializer(item as MabFileFolderProtectedItem);

    default:
      return protectedItemSerializer(item);
  }
}

export function protectedItemUnionDeserializer(item: any): ProtectedItemUnion {
  switch (item.protectedItemType) {
    case "AzureFileShareProtectedItem":
      return azureFileshareProtectedItemDeserializer(item as AzureFileshareProtectedItem);

    case "AzureIaaSVMProtectedItem":
    case "Microsoft.ClassicCompute/virtualMachines":
    case "Microsoft.Compute/virtualMachines":
      return azureIaaSVMProtectedItemUnionDeserializer(item as AzureIaaSVMProtectedItemUnion);

    case "Microsoft.Sql/servers/databases":
      return azureSqlProtectedItemDeserializer(item as AzureSqlProtectedItem);

    case "AzureVmWorkloadProtectedItem":
    case "AzureVmWorkloadSAPAseDatabase":
    case "AzureVmWorkloadSAPHanaDatabase":
    case "AzureVmWorkloadSAPHanaDBInstance":
    case "AzureVmWorkloadSQLDatabase":
    case "AzureVmWorkloadSQLInstance":
      return azureVmWorkloadProtectedItemUnionDeserializer(
        item as AzureVmWorkloadProtectedItemUnion,
      );

    case "DPMProtectedItem":
      return dpmProtectedItemDeserializer(item as DPMProtectedItem);

    case "GenericProtectedItem":
      return genericProtectedItemDeserializer(item as GenericProtectedItem);

    case "MabFileFolderProtectedItem":
      return mabFileFolderProtectedItemDeserializer(item as MabFileFolderProtectedItem);

    default:
      return protectedItemDeserializer(item);
  }
}

/** Backup management type to execute the current job. */
export enum KnownBackupManagementType {
  /** Invalid */
  Invalid = "Invalid",
  /** AzureIaasVM */
  AzureIaasVM = "AzureIaasVM",
  /** MAB */
  MAB = "MAB",
  /** DPM */
  DPM = "DPM",
  /** AzureBackupServer */
  AzureBackupServer = "AzureBackupServer",
  /** AzureSql */
  AzureSql = "AzureSql",
  /** AzureStorage */
  AzureStorage = "AzureStorage",
  /** AzureWorkload */
  AzureWorkload = "AzureWorkload",
  /** DefaultBackup */
  DefaultBackup = "DefaultBackup",
}

/**
 * Backup management type to execute the current job. \
 * {@link KnownBackupManagementType} can be used interchangeably with BackupManagementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AzureIaasVM** \
 * **MAB** \
 * **DPM** \
 * **AzureBackupServer** \
 * **AzureSql** \
 * **AzureStorage** \
 * **AzureWorkload** \
 * **DefaultBackup**
 */
export type BackupManagementType = string;

/** Type of workload this item represents. */
export enum KnownDataSourceType {
  /** Invalid */
  Invalid = "Invalid",
  /** VM */
  VM = "VM",
  /** FileFolder */
  FileFolder = "FileFolder",
  /** AzureSqlDb */
  AzureSqlDb = "AzureSqlDb",
  /** SQLDB */
  Sqldb = "SQLDB",
  /** Exchange */
  Exchange = "Exchange",
  /** Sharepoint */
  Sharepoint = "Sharepoint",
  /** VMwareVM */
  VMwareVM = "VMwareVM",
  /** SystemState */
  SystemState = "SystemState",
  /** Client */
  Client = "Client",
  /** GenericDataSource */
  GenericDataSource = "GenericDataSource",
  /** SQLDataBase */
  SQLDataBase = "SQLDataBase",
  /** AzureFileShare */
  AzureFileShare = "AzureFileShare",
  /** SAPHanaDatabase */
  SAPHanaDatabase = "SAPHanaDatabase",
  /** SAPAseDatabase */
  SAPAseDatabase = "SAPAseDatabase",
  /** SAPHanaDBInstance */
  SAPHanaDBInstance = "SAPHanaDBInstance",
}

/**
 * Type of workload this item represents. \
 * {@link KnownDataSourceType} can be used interchangeably with DataSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **VM** \
 * **FileFolder** \
 * **AzureSqlDb** \
 * **SQLDB** \
 * **Exchange** \
 * **Sharepoint** \
 * **VMwareVM** \
 * **SystemState** \
 * **Client** \
 * **GenericDataSource** \
 * **SQLDataBase** \
 * **AzureFileShare** \
 * **SAPHanaDatabase** \
 * **SAPAseDatabase** \
 * **SAPHanaDBInstance**
 */
export type DataSourceType = string;

/** Create mode to indicate recovery of existing soft deleted data source or creation of new data source. */
export enum KnownCreateMode {
  /** Invalid */
  Invalid = "Invalid",
  /** Default */
  Default = "Default",
  /** Recover */
  Recover = "Recover",
}

/**
 * Create mode to indicate recovery of existing soft deleted data source or creation of new data source. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Default** \
 * **Recover**
 */
export type CreateMode = string;

/** Source side threat information */
export interface SourceSideScanInfo {
  /** Threat status of the container */
  sourceSideScanStatus?: SourceSideScanStatus;
  /** Threat summary for the container */
  sourceSideScanSummary?: SourceSideScanSummary;
}

export function sourceSideScanInfoSerializer(item: SourceSideScanInfo): any {
  return {
    sourceSideScanStatus: item["sourceSideScanStatus"],
    sourceSideScanSummary: item["sourceSideScanSummary"],
  };
}

export function sourceSideScanInfoDeserializer(item: any): SourceSideScanInfo {
  return {
    sourceSideScanStatus: item["sourceSideScanStatus"],
    sourceSideScanSummary: item["sourceSideScanSummary"],
  };
}

/** Threat status of the container */
export enum KnownSourceSideScanStatus {
  /** Configured */
  Configured = "Configured",
  /** NotConfigured */
  NotConfigured = "NotConfigured",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/**
 * Threat status of the container \
 * {@link KnownSourceSideScanStatus} can be used interchangeably with SourceSideScanStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Configured** \
 * **NotConfigured** \
 * **NotApplicable**
 */
export type SourceSideScanStatus = string;

/** Threat summary for the container */
export enum KnownSourceSideScanSummary {
  /** Unknown */
  Unknown = "Unknown",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
  /** Suspicious */
  Suspicious = "Suspicious",
  /** Healthy */
  Healthy = "Healthy",
}

/**
 * Threat summary for the container \
 * {@link KnownSourceSideScanSummary} can be used interchangeably with SourceSideScanSummary,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **NotApplicable** \
 * **Suspicious** \
 * **Healthy**
 */
export type SourceSideScanSummary = string;

/** Azure File Share workload-specific backup item. */
export interface AzureFileshareProtectedItem extends ProtectedItem {
  /** Friendly name of the fileshare represented by this backup item. */
  friendlyName?: string;
  /** Backup status of this backup item. */
  protectionStatus?: string;
  /** Backup state of this backup item. */
  protectionState?: ProtectionState;
  /** Last backup operation status. Possible values: Healthy, Unhealthy. */
  lastBackupStatus?: string;
  /** Timestamp of the last backup operation on this backup item. */
  lastBackupTime?: Date;
  /** Health details of different KPIs */
  kpisHealths?: Record<string, KPIResourceHealthDetails>;
  /** Additional information with this backup item. */
  extendedInfo?: AzureFileshareProtectedItemExtendedInfo;
  /** backup item type. */
  protectedItemType: "AzureFileShareProtectedItem";
}

export function azureFileshareProtectedItemSerializer(item: AzureFileshareProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureFileshareProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
  };
}

export function azureFileshareProtectedItemDeserializer(item: any): AzureFileshareProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureFileshareProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Backup state of this backup item. */
export enum KnownProtectionState {
  /** Invalid */
  Invalid = "Invalid",
  /** IRPending */
  IRPending = "IRPending",
  /** Protected */
  Protected = "Protected",
  /** ProtectionError */
  ProtectionError = "ProtectionError",
  /** ProtectionStopped */
  ProtectionStopped = "ProtectionStopped",
  /** ProtectionPaused */
  ProtectionPaused = "ProtectionPaused",
  /** BackupsSuspended */
  BackupsSuspended = "BackupsSuspended",
}

/**
 * Backup state of this backup item. \
 * {@link KnownProtectionState} can be used interchangeably with ProtectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **IRPending** \
 * **Protected** \
 * **ProtectionError** \
 * **ProtectionStopped** \
 * **ProtectionPaused** \
 * **BackupsSuspended**
 */
export type ProtectionState = string;

export function kpiResourceHealthDetailsRecordSerializer(
  item: Record<string, KPIResourceHealthDetails>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : kpiResourceHealthDetailsSerializer(item[key]);
  });
  return result;
}

export function kpiResourceHealthDetailsRecordDeserializer(
  item: Record<string, any>,
): Record<string, KPIResourceHealthDetails> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : kpiResourceHealthDetailsDeserializer(item[key]);
  });
  return result;
}

/** KPI Resource Health Details */
export interface KPIResourceHealthDetails {
  /** Resource Health Status */
  resourceHealthStatus?: ResourceHealthStatus;
  /** Resource Health Status */
  resourceHealthDetails?: ResourceHealthDetails[];
}

export function kpiResourceHealthDetailsSerializer(item: KPIResourceHealthDetails): any {
  return {
    resourceHealthStatus: item["resourceHealthStatus"],
    resourceHealthDetails: !item["resourceHealthDetails"]
      ? item["resourceHealthDetails"]
      : resourceHealthDetailsArraySerializer(item["resourceHealthDetails"]),
  };
}

export function kpiResourceHealthDetailsDeserializer(item: any): KPIResourceHealthDetails {
  return {
    resourceHealthStatus: item["resourceHealthStatus"],
    resourceHealthDetails: !item["resourceHealthDetails"]
      ? item["resourceHealthDetails"]
      : resourceHealthDetailsArrayDeserializer(item["resourceHealthDetails"]),
  };
}

/** Resource Health Status */
export enum KnownResourceHealthStatus {
  /** Healthy */
  Healthy = "Healthy",
  /** TransientDegraded */
  TransientDegraded = "TransientDegraded",
  /** PersistentDegraded */
  PersistentDegraded = "PersistentDegraded",
  /** TransientUnhealthy */
  TransientUnhealthy = "TransientUnhealthy",
  /** PersistentUnhealthy */
  PersistentUnhealthy = "PersistentUnhealthy",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * Resource Health Status \
 * {@link KnownResourceHealthStatus} can be used interchangeably with ResourceHealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy** \
 * **TransientDegraded** \
 * **PersistentDegraded** \
 * **TransientUnhealthy** \
 * **PersistentUnhealthy** \
 * **Invalid**
 */
export type ResourceHealthStatus = string;

export function resourceHealthDetailsArraySerializer(result: Array<ResourceHealthDetails>): any[] {
  return result.map((item) => {
    return resourceHealthDetailsSerializer(item);
  });
}

export function resourceHealthDetailsArrayDeserializer(
  result: Array<ResourceHealthDetails>,
): any[] {
  return result.map((item) => {
    return resourceHealthDetailsDeserializer(item);
  });
}

/** Health Details for backup items. */
export interface ResourceHealthDetails {
  /** Health Code */
  readonly code?: number;
  /** Health Title */
  readonly title?: string;
  /** Health Message */
  readonly message?: string;
  /** Health Recommended Actions */
  readonly recommendations?: string[];
}

export function resourceHealthDetailsSerializer(item: ResourceHealthDetails): any {
  return item;
}

export function resourceHealthDetailsDeserializer(item: any): ResourceHealthDetails {
  return {
    code: item["code"],
    title: item["title"],
    message: item["message"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Additional information about Azure File Share backup item. */
export interface AzureFileshareProtectedItemExtendedInfo {
  /** The oldest backup copy available for this item in the service. */
  oldestRecoveryPoint?: Date;
  /** Number of available backup copies associated with this backup item. */
  recoveryPointCount?: number;
  /** Indicates consistency of policy object and policy applied to this backup item. */
  policyState?: string;
  /** Indicates the state of this resource. Possible values are from enum ResourceState {Invalid, Active, SoftDeleted, Deleted} */
  readonly resourceState?: string;
  /** The resource state sync time for this backup item. */
  readonly resourceStateSyncTime?: Date;
}

export function azureFileshareProtectedItemExtendedInfoSerializer(
  item: AzureFileshareProtectedItemExtendedInfo,
): any {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : item["oldestRecoveryPoint"].toISOString(),
    recoveryPointCount: item["recoveryPointCount"],
    policyState: item["policyState"],
  };
}

export function azureFileshareProtectedItemExtendedInfoDeserializer(
  item: any,
): AzureFileshareProtectedItemExtendedInfo {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : new Date(item["oldestRecoveryPoint"]),
    recoveryPointCount: item["recoveryPointCount"],
    policyState: item["policyState"],
    resourceState: item["resourceState"],
    resourceStateSyncTime: !item["resourceStateSyncTime"]
      ? item["resourceStateSyncTime"]
      : new Date(item["resourceStateSyncTime"]),
  };
}

/** IaaS VM workload-specific backup item representing the Classic Compute VM. */
export interface AzureIaaSClassicComputeVMProtectedItem extends AzureIaaSVMProtectedItem {
  /** backup item type. */
  protectedItemType: "Microsoft.ClassicCompute/virtualMachines";
}

export function azureIaaSClassicComputeVMProtectedItemSerializer(
  item: AzureIaaSClassicComputeVMProtectedItem,
): any {
  return {
    protectedItemType: item["protectedItemType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    healthDetails: !item["healthDetails"]
      ? item["healthDetails"]
      : azureIaaSVMHealthDetailsArraySerializer(item["healthDetails"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    lastBackupStatus: item["lastBackupStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : extendedPropertiesSerializer(item["extendedProperties"]),
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
  };
}

export function azureIaaSClassicComputeVMProtectedItemDeserializer(
  item: any,
): AzureIaaSClassicComputeVMProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    friendlyName: item["friendlyName"],
    virtualMachineId: item["virtualMachineId"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    healthStatus: item["healthStatus"],
    healthDetails: !item["healthDetails"]
      ? item["healthDetails"]
      : azureIaaSVMHealthDetailsArrayDeserializer(item["healthDetails"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    protectedItemDataId: item["protectedItemDataId"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : extendedPropertiesDeserializer(item["extendedProperties"]),
    policyType: item["policyType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
  };
}

/** IaaS VM workload-specific backup item. */
export interface AzureIaaSVMProtectedItem extends ProtectedItem {
  /** backup item type. */
  /** The discriminator possible values: Microsoft.ClassicCompute/virtualMachines, Microsoft.Compute/virtualMachines */
  protectedItemType:
    | "AzureIaaSVMProtectedItem"
    | "Microsoft.ClassicCompute/virtualMachines"
    | "Microsoft.Compute/virtualMachines";
  /** Friendly name of the VM represented by this backup item. */
  readonly friendlyName?: string;
  /** Fully qualified ARM ID of the virtual machine represented by this item. */
  readonly virtualMachineId?: string;
  /** Backup status of this backup item. */
  protectionStatus?: string;
  /** Backup state of this backup item. */
  protectionState?: ProtectionState;
  /** Health status of protected item. */
  readonly healthStatus?: HealthStatus;
  /** Health details on this backup item. */
  healthDetails?: AzureIaaSVMHealthDetails[];
  /** Health details of different KPIs */
  kpisHealths?: Record<string, KPIResourceHealthDetails>;
  /** Last backup operation status. */
  lastBackupStatus?: string;
  /** Timestamp of the last backup operation on this backup item. */
  readonly lastBackupTime?: Date;
  /** Data ID of the protected item. */
  readonly protectedItemDataId?: string;
  /** Additional information for this backup item. */
  extendedInfo?: AzureIaaSVMProtectedItemExtendedInfo;
  /** Extended Properties for Azure IaasVM Backup. */
  extendedProperties?: ExtendedProperties;
  /** Type of the policy used for protection */
  readonly policyType?: string;
}

export function azureIaaSVMProtectedItemSerializer(item: AzureIaaSVMProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    healthDetails: !item["healthDetails"]
      ? item["healthDetails"]
      : azureIaaSVMHealthDetailsArraySerializer(item["healthDetails"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    lastBackupStatus: item["lastBackupStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : extendedPropertiesSerializer(item["extendedProperties"]),
  };
}

export function azureIaaSVMProtectedItemDeserializer(item: any): AzureIaaSVMProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    virtualMachineId: item["virtualMachineId"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    healthStatus: item["healthStatus"],
    healthDetails: !item["healthDetails"]
      ? item["healthDetails"]
      : azureIaaSVMHealthDetailsArrayDeserializer(item["healthDetails"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    protectedItemDataId: item["protectedItemDataId"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : extendedPropertiesDeserializer(item["extendedProperties"]),
    policyType: item["policyType"],
  };
}

/** Alias for AzureIaaSVMProtectedItemUnion */
export type AzureIaaSVMProtectedItemUnion =
  | AzureIaaSClassicComputeVMProtectedItem
  | AzureIaaSComputeVMProtectedItem
  | AzureIaaSVMProtectedItem;

export function azureIaaSVMProtectedItemUnionSerializer(item: AzureIaaSVMProtectedItemUnion): any {
  switch (item.protectedItemType) {
    case "Microsoft.ClassicCompute/virtualMachines":
      return azureIaaSClassicComputeVMProtectedItemSerializer(
        item as AzureIaaSClassicComputeVMProtectedItem,
      );

    case "Microsoft.Compute/virtualMachines":
      return azureIaaSComputeVMProtectedItemSerializer(item as AzureIaaSComputeVMProtectedItem);

    default:
      return azureIaaSVMProtectedItemSerializer(item);
  }
}

export function azureIaaSVMProtectedItemUnionDeserializer(
  item: any,
): AzureIaaSVMProtectedItemUnion {
  switch (item.protectedItemType) {
    case "Microsoft.ClassicCompute/virtualMachines":
      return azureIaaSClassicComputeVMProtectedItemDeserializer(
        item as AzureIaaSClassicComputeVMProtectedItem,
      );

    case "Microsoft.Compute/virtualMachines":
      return azureIaaSComputeVMProtectedItemDeserializer(item as AzureIaaSComputeVMProtectedItem);

    default:
      return azureIaaSVMProtectedItemDeserializer(item);
  }
}

/** Health status of protected item. */
export enum KnownHealthStatus {
  /** Passed */
  Passed = "Passed",
  /** ActionRequired */
  ActionRequired = "ActionRequired",
  /** ActionSuggested */
  ActionSuggested = "ActionSuggested",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * Health status of protected item. \
 * {@link KnownHealthStatus} can be used interchangeably with HealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Passed** \
 * **ActionRequired** \
 * **ActionSuggested** \
 * **Invalid**
 */
export type HealthStatus = string;

export function azureIaaSVMHealthDetailsArraySerializer(
  result: Array<AzureIaaSVMHealthDetails>,
): any[] {
  return result.map((item) => {
    return azureIaaSVMHealthDetailsSerializer(item);
  });
}

export function azureIaaSVMHealthDetailsArrayDeserializer(
  result: Array<AzureIaaSVMHealthDetails>,
): any[] {
  return result.map((item) => {
    return azureIaaSVMHealthDetailsDeserializer(item);
  });
}

/** Azure IaaS VM workload-specific Health Details. */
export interface AzureIaaSVMHealthDetails extends ResourceHealthDetails {}

export function azureIaaSVMHealthDetailsSerializer(item: AzureIaaSVMHealthDetails): any {
  return item;
}

export function azureIaaSVMHealthDetailsDeserializer(item: any): AzureIaaSVMHealthDetails {
  return {
    code: item["code"],
    title: item["title"],
    message: item["message"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Additional information on Azure IaaS VM specific backup item. */
export interface AzureIaaSVMProtectedItemExtendedInfo {
  /** The oldest backup copy available for this backup item across all tiers. */
  oldestRecoveryPoint?: Date;
  /** The oldest backup copy available for this backup item in vault tier */
  oldestRecoveryPointInVault?: Date;
  /** The oldest backup copy available for this backup item in archive tier */
  oldestRecoveryPointInArchive?: Date;
  /** The latest backup copy available for this backup item in archive tier */
  newestRecoveryPointInArchive?: Date;
  /** Number of backup copies available for this backup item. */
  recoveryPointCount?: number;
  /** Specifies if backup policy associated with the backup item is inconsistent. */
  policyInconsistent?: boolean;
}

export function azureIaaSVMProtectedItemExtendedInfoSerializer(
  item: AzureIaaSVMProtectedItemExtendedInfo,
): any {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : item["oldestRecoveryPoint"].toISOString(),
    oldestRecoveryPointInVault: !item["oldestRecoveryPointInVault"]
      ? item["oldestRecoveryPointInVault"]
      : item["oldestRecoveryPointInVault"].toISOString(),
    oldestRecoveryPointInArchive: !item["oldestRecoveryPointInArchive"]
      ? item["oldestRecoveryPointInArchive"]
      : item["oldestRecoveryPointInArchive"].toISOString(),
    newestRecoveryPointInArchive: !item["newestRecoveryPointInArchive"]
      ? item["newestRecoveryPointInArchive"]
      : item["newestRecoveryPointInArchive"].toISOString(),
    recoveryPointCount: item["recoveryPointCount"],
    policyInconsistent: item["policyInconsistent"],
  };
}

export function azureIaaSVMProtectedItemExtendedInfoDeserializer(
  item: any,
): AzureIaaSVMProtectedItemExtendedInfo {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : new Date(item["oldestRecoveryPoint"]),
    oldestRecoveryPointInVault: !item["oldestRecoveryPointInVault"]
      ? item["oldestRecoveryPointInVault"]
      : new Date(item["oldestRecoveryPointInVault"]),
    oldestRecoveryPointInArchive: !item["oldestRecoveryPointInArchive"]
      ? item["oldestRecoveryPointInArchive"]
      : new Date(item["oldestRecoveryPointInArchive"]),
    newestRecoveryPointInArchive: !item["newestRecoveryPointInArchive"]
      ? item["newestRecoveryPointInArchive"]
      : new Date(item["newestRecoveryPointInArchive"]),
    recoveryPointCount: item["recoveryPointCount"],
    policyInconsistent: item["policyInconsistent"],
  };
}

/** Extended Properties for Azure IaasVM Backup. */
export interface ExtendedProperties {
  /** Extended Properties for Disk Exclusion. */
  diskExclusionProperties?: DiskExclusionProperties;
  /** Linux VM name */
  linuxVmApplicationName?: string;
}

export function extendedPropertiesSerializer(item: ExtendedProperties): any {
  return {
    diskExclusionProperties: !item["diskExclusionProperties"]
      ? item["diskExclusionProperties"]
      : diskExclusionPropertiesSerializer(item["diskExclusionProperties"]),
    linuxVmApplicationName: item["linuxVmApplicationName"],
  };
}

export function extendedPropertiesDeserializer(item: any): ExtendedProperties {
  return {
    diskExclusionProperties: !item["diskExclusionProperties"]
      ? item["diskExclusionProperties"]
      : diskExclusionPropertiesDeserializer(item["diskExclusionProperties"]),
    linuxVmApplicationName: item["linuxVmApplicationName"],
  };
}

/** model interface DiskExclusionProperties */
export interface DiskExclusionProperties {
  /** List of Disks' Logical Unit Numbers (LUN) to be used for VM Protection. */
  diskLunList?: number[];
  /** Flag to indicate whether DiskLunList is to be included/ excluded from backup. */
  isInclusionList?: boolean;
}

export function diskExclusionPropertiesSerializer(item: DiskExclusionProperties): any {
  return {
    diskLunList: !item["diskLunList"]
      ? item["diskLunList"]
      : item["diskLunList"].map((p: any) => {
          return p;
        }),
    isInclusionList: item["isInclusionList"],
  };
}

export function diskExclusionPropertiesDeserializer(item: any): DiskExclusionProperties {
  return {
    diskLunList: !item["diskLunList"]
      ? item["diskLunList"]
      : item["diskLunList"].map((p: any) => {
          return p;
        }),
    isInclusionList: item["isInclusionList"],
  };
}

/** IaaS VM workload-specific backup item representing the Azure Resource Manager VM. */
export interface AzureIaaSComputeVMProtectedItem extends AzureIaaSVMProtectedItem {
  /** backup item type. */
  protectedItemType: "Microsoft.Compute/virtualMachines";
}

export function azureIaaSComputeVMProtectedItemSerializer(
  item: AzureIaaSComputeVMProtectedItem,
): any {
  return {
    protectedItemType: item["protectedItemType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    healthDetails: !item["healthDetails"]
      ? item["healthDetails"]
      : azureIaaSVMHealthDetailsArraySerializer(item["healthDetails"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    lastBackupStatus: item["lastBackupStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : extendedPropertiesSerializer(item["extendedProperties"]),
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
  };
}

export function azureIaaSComputeVMProtectedItemDeserializer(
  item: any,
): AzureIaaSComputeVMProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    friendlyName: item["friendlyName"],
    virtualMachineId: item["virtualMachineId"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    healthStatus: item["healthStatus"],
    healthDetails: !item["healthDetails"]
      ? item["healthDetails"]
      : azureIaaSVMHealthDetailsArrayDeserializer(item["healthDetails"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    protectedItemDataId: item["protectedItemDataId"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : extendedPropertiesDeserializer(item["extendedProperties"]),
    policyType: item["policyType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
  };
}

/** Azure SQL workload-specific backup item. */
export interface AzureSqlProtectedItem extends ProtectedItem {
  /** Internal ID of a backup item. Used by Azure SQL Backup engine to contact Recovery Services. */
  protectedItemDataId?: string;
  /** Backup state of the backed up item. */
  protectionState?: ProtectedItemState;
  /** Additional information for this backup item. */
  extendedInfo?: AzureSqlProtectedItemExtendedInfo;
  /** backup item type. */
  protectedItemType: "Microsoft.Sql/servers/databases";
}

export function azureSqlProtectedItemSerializer(item: AzureSqlProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    protectedItemDataId: item["protectedItemDataId"],
    protectionState: item["protectionState"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureSqlProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
  };
}

export function azureSqlProtectedItemDeserializer(item: any): AzureSqlProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    protectedItemDataId: item["protectedItemDataId"],
    protectionState: item["protectionState"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureSqlProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Backup state of the backed up item. */
export enum KnownProtectedItemState {
  /** Invalid */
  Invalid = "Invalid",
  /** IRPending */
  IRPending = "IRPending",
  /** Protected */
  Protected = "Protected",
  /** ProtectionError */
  ProtectionError = "ProtectionError",
  /** ProtectionStopped */
  ProtectionStopped = "ProtectionStopped",
  /** ProtectionPaused */
  ProtectionPaused = "ProtectionPaused",
  /** BackupsSuspended */
  BackupsSuspended = "BackupsSuspended",
}

/**
 * Backup state of the backed up item. \
 * {@link KnownProtectedItemState} can be used interchangeably with ProtectedItemState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **IRPending** \
 * **Protected** \
 * **ProtectionError** \
 * **ProtectionStopped** \
 * **ProtectionPaused** \
 * **BackupsSuspended**
 */
export type ProtectedItemState = string;

/** Additional information on Azure Sql specific protected item. */
export interface AzureSqlProtectedItemExtendedInfo {
  /** The oldest backup copy available for this item in the service. */
  oldestRecoveryPoint?: Date;
  /** Number of available backup copies associated with this backup item. */
  recoveryPointCount?: number;
  /** State of the backup policy associated with this backup item. */
  policyState?: string;
}

export function azureSqlProtectedItemExtendedInfoSerializer(
  item: AzureSqlProtectedItemExtendedInfo,
): any {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : item["oldestRecoveryPoint"].toISOString(),
    recoveryPointCount: item["recoveryPointCount"],
    policyState: item["policyState"],
  };
}

export function azureSqlProtectedItemExtendedInfoDeserializer(
  item: any,
): AzureSqlProtectedItemExtendedInfo {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : new Date(item["oldestRecoveryPoint"]),
    recoveryPointCount: item["recoveryPointCount"],
    policyState: item["policyState"],
  };
}

/** Azure VM workload-specific protected item. */
export interface AzureVmWorkloadProtectedItem extends ProtectedItem {
  /** backup item type. */
  /** The discriminator possible values: AzureVmWorkloadSAPAseDatabase, AzureVmWorkloadSAPHanaDatabase, AzureVmWorkloadSAPHanaDBInstance, AzureVmWorkloadSQLDatabase, AzureVmWorkloadSQLInstance */
  protectedItemType:
    | "AzureVmWorkloadProtectedItem"
    | "AzureVmWorkloadSAPAseDatabase"
    | "AzureVmWorkloadSAPHanaDatabase"
    | "AzureVmWorkloadSAPHanaDBInstance"
    | "AzureVmWorkloadSQLDatabase"
    | "AzureVmWorkloadSQLInstance";
  /** Friendly name of the DB represented by this backup item. */
  readonly friendlyName?: string;
  /** Host/Cluster Name for instance or AG */
  serverName?: string;
  /** Parent name of the DB such as Instance or Availability Group. */
  parentName?: string;
  /** Parent type of protected item, example: for a DB, standalone server or distributed */
  parentType?: string;
  /** Backup status of this backup item. */
  readonly protectionStatus?: string;
  /** Backup state of this backup item. */
  protectionState?: ProtectionState;
  /** Last backup operation status. Possible values: Healthy, Unhealthy. */
  lastBackupStatus?: LastBackupStatus;
  /** Timestamp of the last backup operation on this backup item. */
  lastBackupTime?: Date;
  /** Error details in last backup */
  lastBackupErrorDetail?: ErrorDetail;
  /** Data ID of the protected item. */
  protectedItemDataSourceId?: string;
  /** Health status of the backup item, evaluated based on last heartbeat received */
  protectedItemHealthStatus?: ProtectedItemHealthStatus;
  /** Additional information for this backup item. */
  extendedInfo?: AzureVmWorkloadProtectedItemExtendedInfo;
  /** Health details of different KPIs */
  kpisHealths?: Record<string, KPIResourceHealthDetails>;
  /** List of the nodes in case of distributed container. */
  nodesList?: DistributedNodesInfo[];
}

export function azureVmWorkloadProtectedItemSerializer(item: AzureVmWorkloadProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailSerializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArraySerializer(item["nodesList"]),
  };
}

export function azureVmWorkloadProtectedItemDeserializer(item: any): AzureVmWorkloadProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailDeserializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
  };
}

/** Alias for AzureVmWorkloadProtectedItemUnion */
export type AzureVmWorkloadProtectedItemUnion =
  | AzureVmWorkloadSAPAseDatabaseProtectedItem
  | AzureVmWorkloadSAPHanaDatabaseProtectedItem
  | AzureVmWorkloadSAPHanaDBInstanceProtectedItem
  | AzureVmWorkloadSQLDatabaseProtectedItem
  | AzureVmWorkloadSQLInstanceProtectedItem
  | AzureVmWorkloadProtectedItem;

export function azureVmWorkloadProtectedItemUnionSerializer(
  item: AzureVmWorkloadProtectedItemUnion,
): any {
  switch (item.protectedItemType) {
    case "AzureVmWorkloadSAPAseDatabase":
      return azureVmWorkloadSAPAseDatabaseProtectedItemSerializer(
        item as AzureVmWorkloadSAPAseDatabaseProtectedItem,
      );

    case "AzureVmWorkloadSAPHanaDatabase":
      return azureVmWorkloadSAPHanaDatabaseProtectedItemSerializer(
        item as AzureVmWorkloadSAPHanaDatabaseProtectedItem,
      );

    case "AzureVmWorkloadSAPHanaDBInstance":
      return azureVmWorkloadSAPHanaDBInstanceProtectedItemSerializer(
        item as AzureVmWorkloadSAPHanaDBInstanceProtectedItem,
      );

    case "AzureVmWorkloadSQLDatabase":
      return azureVmWorkloadSQLDatabaseProtectedItemSerializer(
        item as AzureVmWorkloadSQLDatabaseProtectedItem,
      );

    case "AzureVmWorkloadSQLInstance":
      return azureVmWorkloadSQLInstanceProtectedItemSerializer(
        item as AzureVmWorkloadSQLInstanceProtectedItem,
      );

    default:
      return azureVmWorkloadProtectedItemSerializer(item);
  }
}

export function azureVmWorkloadProtectedItemUnionDeserializer(
  item: any,
): AzureVmWorkloadProtectedItemUnion {
  switch (item.protectedItemType) {
    case "AzureVmWorkloadSAPAseDatabase":
      return azureVmWorkloadSAPAseDatabaseProtectedItemDeserializer(
        item as AzureVmWorkloadSAPAseDatabaseProtectedItem,
      );

    case "AzureVmWorkloadSAPHanaDatabase":
      return azureVmWorkloadSAPHanaDatabaseProtectedItemDeserializer(
        item as AzureVmWorkloadSAPHanaDatabaseProtectedItem,
      );

    case "AzureVmWorkloadSAPHanaDBInstance":
      return azureVmWorkloadSAPHanaDBInstanceProtectedItemDeserializer(
        item as AzureVmWorkloadSAPHanaDBInstanceProtectedItem,
      );

    case "AzureVmWorkloadSQLDatabase":
      return azureVmWorkloadSQLDatabaseProtectedItemDeserializer(
        item as AzureVmWorkloadSQLDatabaseProtectedItem,
      );

    case "AzureVmWorkloadSQLInstance":
      return azureVmWorkloadSQLInstanceProtectedItemDeserializer(
        item as AzureVmWorkloadSQLInstanceProtectedItem,
      );

    default:
      return azureVmWorkloadProtectedItemDeserializer(item);
  }
}

/** Last backup operation status. Possible values: Healthy, Unhealthy. */
export enum KnownLastBackupStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Healthy */
  Healthy = "Healthy",
  /** Unhealthy */
  Unhealthy = "Unhealthy",
  /** IRPending */
  IRPending = "IRPending",
}

/**
 * Last backup operation status. Possible values: Healthy, Unhealthy. \
 * {@link KnownLastBackupStatus} can be used interchangeably with LastBackupStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Healthy** \
 * **Unhealthy** \
 * **IRPending**
 */
export type LastBackupStatus = string;

/** Health status of the backup item, evaluated based on last heartbeat received */
export enum KnownProtectedItemHealthStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Healthy */
  Healthy = "Healthy",
  /** Unhealthy */
  Unhealthy = "Unhealthy",
  /** NotReachable */
  NotReachable = "NotReachable",
  /** IRPending */
  IRPending = "IRPending",
}

/**
 * Health status of the backup item, evaluated based on last heartbeat received \
 * {@link KnownProtectedItemHealthStatus} can be used interchangeably with ProtectedItemHealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Healthy** \
 * **Unhealthy** \
 * **NotReachable** \
 * **IRPending**
 */
export type ProtectedItemHealthStatus = string;

/** Additional information on Azure Workload for SQL specific backup item. */
export interface AzureVmWorkloadProtectedItemExtendedInfo {
  /** The oldest backup copy available for this backup item across all tiers. */
  oldestRecoveryPoint?: Date;
  /** The oldest backup copy available for this backup item in vault tier */
  oldestRecoveryPointInVault?: Date;
  /** The oldest backup copy available for this backup item in archive tier */
  oldestRecoveryPointInArchive?: Date;
  /** The latest backup copy available for this backup item in archive tier */
  newestRecoveryPointInArchive?: Date;
  /** Number of backup copies available for this backup item. */
  recoveryPointCount?: number;
  /** Indicates consistency of policy object and policy applied to this backup item. */
  policyState?: string;
  /** Indicates consistency of policy object and policy applied to this backup item. */
  recoveryModel?: string;
}

export function azureVmWorkloadProtectedItemExtendedInfoSerializer(
  item: AzureVmWorkloadProtectedItemExtendedInfo,
): any {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : item["oldestRecoveryPoint"].toISOString(),
    oldestRecoveryPointInVault: !item["oldestRecoveryPointInVault"]
      ? item["oldestRecoveryPointInVault"]
      : item["oldestRecoveryPointInVault"].toISOString(),
    oldestRecoveryPointInArchive: !item["oldestRecoveryPointInArchive"]
      ? item["oldestRecoveryPointInArchive"]
      : item["oldestRecoveryPointInArchive"].toISOString(),
    newestRecoveryPointInArchive: !item["newestRecoveryPointInArchive"]
      ? item["newestRecoveryPointInArchive"]
      : item["newestRecoveryPointInArchive"].toISOString(),
    recoveryPointCount: item["recoveryPointCount"],
    policyState: item["policyState"],
    recoveryModel: item["recoveryModel"],
  };
}

export function azureVmWorkloadProtectedItemExtendedInfoDeserializer(
  item: any,
): AzureVmWorkloadProtectedItemExtendedInfo {
  return {
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : new Date(item["oldestRecoveryPoint"]),
    oldestRecoveryPointInVault: !item["oldestRecoveryPointInVault"]
      ? item["oldestRecoveryPointInVault"]
      : new Date(item["oldestRecoveryPointInVault"]),
    oldestRecoveryPointInArchive: !item["oldestRecoveryPointInArchive"]
      ? item["oldestRecoveryPointInArchive"]
      : new Date(item["oldestRecoveryPointInArchive"]),
    newestRecoveryPointInArchive: !item["newestRecoveryPointInArchive"]
      ? item["newestRecoveryPointInArchive"]
      : new Date(item["newestRecoveryPointInArchive"]),
    recoveryPointCount: item["recoveryPointCount"],
    policyState: item["policyState"],
    recoveryModel: item["recoveryModel"],
  };
}

export function distributedNodesInfoArraySerializer(result: Array<DistributedNodesInfo>): any[] {
  return result.map((item) => {
    return distributedNodesInfoSerializer(item);
  });
}

export function distributedNodesInfoArrayDeserializer(result: Array<DistributedNodesInfo>): any[] {
  return result.map((item) => {
    return distributedNodesInfoDeserializer(item);
  });
}

/** This is used to represent the various nodes of the distributed container. */
export interface DistributedNodesInfo {
  /** Name of the node under a distributed container. */
  nodeName?: string;
  /**
   * Status of this Node.
   * Failed | Succeeded
   */
  status?: string;
  /** Error Details if the Status is non-success. */
  errorDetail?: ErrorDetail;
  /** ARM resource id of the node */
  sourceResourceId?: string;
}

export function distributedNodesInfoSerializer(item: DistributedNodesInfo): any {
  return {
    nodeName: item["nodeName"],
    status: item["status"],
    errorDetail: !item["errorDetail"]
      ? item["errorDetail"]
      : errorDetailSerializer(item["errorDetail"]),
    sourceResourceId: item["sourceResourceId"],
  };
}

export function distributedNodesInfoDeserializer(item: any): DistributedNodesInfo {
  return {
    nodeName: item["nodeName"],
    status: item["status"],
    errorDetail: !item["errorDetail"]
      ? item["errorDetail"]
      : errorDetailDeserializer(item["errorDetail"]),
    sourceResourceId: item["sourceResourceId"],
  };
}

/** Azure VM workload-specific protected item representing SAP ASE Database. */
export interface AzureVmWorkloadSAPAseDatabaseProtectedItem extends AzureVmWorkloadProtectedItem {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  protectedItemType: "AzureVmWorkloadSAPAseDatabase";
}

export function azureVmWorkloadSAPAseDatabaseProtectedItemSerializer(
  item: AzureVmWorkloadSAPAseDatabaseProtectedItem,
): any {
  return {
    protectedItemType: item["protectedItemType"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailSerializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArraySerializer(item["nodesList"]),
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
  };
}

export function azureVmWorkloadSAPAseDatabaseProtectedItemDeserializer(
  item: any,
): AzureVmWorkloadSAPAseDatabaseProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    friendlyName: item["friendlyName"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailDeserializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
  };
}

/** Azure VM workload-specific protected item representing SAP HANA Database. */
export interface AzureVmWorkloadSAPHanaDatabaseProtectedItem extends AzureVmWorkloadProtectedItem {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  protectedItemType: "AzureVmWorkloadSAPHanaDatabase";
}

export function azureVmWorkloadSAPHanaDatabaseProtectedItemSerializer(
  item: AzureVmWorkloadSAPHanaDatabaseProtectedItem,
): any {
  return {
    protectedItemType: item["protectedItemType"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailSerializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArraySerializer(item["nodesList"]),
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
  };
}

export function azureVmWorkloadSAPHanaDatabaseProtectedItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaDatabaseProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    friendlyName: item["friendlyName"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailDeserializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
  };
}

/** Azure VM workload-specific protected item representing SAP HANA DBInstance. */
export interface AzureVmWorkloadSAPHanaDBInstanceProtectedItem extends AzureVmWorkloadProtectedItem {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  protectedItemType: "AzureVmWorkloadSAPHanaDBInstance";
}

export function azureVmWorkloadSAPHanaDBInstanceProtectedItemSerializer(
  item: AzureVmWorkloadSAPHanaDBInstanceProtectedItem,
): any {
  return {
    protectedItemType: item["protectedItemType"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailSerializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArraySerializer(item["nodesList"]),
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
  };
}

export function azureVmWorkloadSAPHanaDBInstanceProtectedItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaDBInstanceProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    friendlyName: item["friendlyName"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailDeserializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
  };
}

/** Azure VM workload-specific protected item representing SQL Database. */
export interface AzureVmWorkloadSQLDatabaseProtectedItem extends AzureVmWorkloadProtectedItem {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  protectedItemType: "AzureVmWorkloadSQLDatabase";
  /** Parent Protected item in case protected as part of a parent. */
  parentProtectedItem?: string;
  /** Protection type in case protected as part of a parent. */
  protectionLevel?: ProtectionLevel;
}

export function azureVmWorkloadSQLDatabaseProtectedItemSerializer(
  item: AzureVmWorkloadSQLDatabaseProtectedItem,
): any {
  return {
    protectedItemType: item["protectedItemType"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailSerializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArraySerializer(item["nodesList"]),
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    parentProtectedItem: item["parentProtectedItem"],
    protectionLevel: item["protectionLevel"],
  };
}

export function azureVmWorkloadSQLDatabaseProtectedItemDeserializer(
  item: any,
): AzureVmWorkloadSQLDatabaseProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    friendlyName: item["friendlyName"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailDeserializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    parentProtectedItem: item["parentProtectedItem"],
    protectionLevel: item["protectionLevel"],
  };
}

/** Protection type in case protected as part of a parent. */
export enum KnownProtectionLevel {
  /** Database */
  Database = "Database",
  /** DatabaseUnderInstance */
  DatabaseUnderInstance = "DatabaseUnderInstance",
}

/**
 * Protection type in case protected as part of a parent. \
 * {@link KnownProtectionLevel} can be used interchangeably with ProtectionLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Database** \
 * **DatabaseUnderInstance**
 */
export type ProtectionLevel = string;

/** Azure VM workload-specific protected item representing SQL Instance. */
export interface AzureVmWorkloadSQLInstanceProtectedItem extends AzureVmWorkloadProtectedItem {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  protectedItemType: "AzureVmWorkloadSQLInstance";
  /** Name of Child Dbs protected under this parent. */
  childDBNames?: string[];
  /** The state of instance protection. */
  instanceProtectionReadiness?: InstanceProtectionReadiness;
}

export function azureVmWorkloadSQLInstanceProtectedItemSerializer(
  item: AzureVmWorkloadSQLInstanceProtectedItem,
): any {
  return {
    protectedItemType: item["protectedItemType"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailSerializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordSerializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArraySerializer(item["nodesList"]),
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    childDBNames: !item["childDBNames"]
      ? item["childDBNames"]
      : item["childDBNames"].map((p: any) => {
          return p;
        }),
    instanceProtectionReadiness: item["instanceProtectionReadiness"],
  };
}

export function azureVmWorkloadSQLInstanceProtectedItemDeserializer(
  item: any,
): AzureVmWorkloadSQLInstanceProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    friendlyName: item["friendlyName"],
    serverName: item["serverName"],
    parentName: item["parentName"],
    parentType: item["parentType"],
    protectionStatus: item["protectionStatus"],
    protectionState: item["protectionState"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    lastBackupErrorDetail: !item["lastBackupErrorDetail"]
      ? item["lastBackupErrorDetail"]
      : errorDetailDeserializer(item["lastBackupErrorDetail"]),
    protectedItemDataSourceId: item["protectedItemDataSourceId"],
    protectedItemHealthStatus: item["protectedItemHealthStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureVmWorkloadProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
    kpisHealths: !item["kpisHealths"]
      ? item["kpisHealths"]
      : kpiResourceHealthDetailsRecordDeserializer(item["kpisHealths"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    childDBNames: !item["childDBNames"]
      ? item["childDBNames"]
      : item["childDBNames"].map((p: any) => {
          return p;
        }),
    instanceProtectionReadiness: item["instanceProtectionReadiness"],
  };
}

/** The state of instance protection. */
export enum KnownInstanceProtectionReadiness {
  /** Unknown */
  Unknown = "Unknown",
  /** Ready */
  Ready = "Ready",
  /** ScheduleDisabled */
  ScheduleDisabled = "ScheduleDisabled",
  /** PartialProtection */
  PartialProtection = "PartialProtection",
  /** ProtectionError */
  ProtectionError = "ProtectionError",
}

/**
 * The state of instance protection. \
 * {@link KnownInstanceProtectionReadiness} can be used interchangeably with InstanceProtectionReadiness,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Ready** \
 * **ScheduleDisabled** \
 * **PartialProtection** \
 * **ProtectionError**
 */
export type InstanceProtectionReadiness = string;

/** Additional information on Backup engine specific backup item. */
export interface DPMProtectedItem extends ProtectedItem {
  /** Friendly name of the managed item */
  friendlyName?: string;
  /** Backup Management server protecting this backup item */
  backupEngineName?: string;
  /** Protection state of the backup engine */
  protectionState?: ProtectedItemState;
  /** Extended info of the backup item. */
  extendedInfo?: DPMProtectedItemExtendedInfo;
  /** backup item type. */
  protectedItemType: "DPMProtectedItem";
}

export function dpmProtectedItemSerializer(item: DPMProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    backupEngineName: item["backupEngineName"],
    protectionState: item["protectionState"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : dpmProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
  };
}

export function dpmProtectedItemDeserializer(item: any): DPMProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    backupEngineName: item["backupEngineName"],
    protectionState: item["protectionState"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : dpmProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Additional information of DPM Protected item. */
export interface DPMProtectedItemExtendedInfo {
  /** Attribute to provide information on various DBs. */
  protectableObjectLoadPath?: Record<string, string>;
  /** To check if backup item is disk protected. */
  protected?: boolean;
  /** To check if backup item is cloud protected. */
  isPresentOnCloud?: boolean;
  /** Last backup status information on backup item. */
  lastBackupStatus?: string;
  /** Last refresh time on backup item. */
  lastRefreshedAt?: Date;
  /** Oldest cloud recovery point time. */
  oldestRecoveryPoint?: Date;
  /** cloud recovery point count. */
  recoveryPointCount?: number;
  /** Oldest disk recovery point time. */
  onPremiseOldestRecoveryPoint?: Date;
  /** latest disk recovery point time. */
  onPremiseLatestRecoveryPoint?: Date;
  /** disk recovery point count. */
  onPremiseRecoveryPointCount?: number;
  /** To check if backup item is collocated. */
  isCollocated?: boolean;
  /** Protection group name of the backup item. */
  protectionGroupName?: string;
  /** Used Disk storage in bytes. */
  diskStorageUsedInBytes?: string;
  /** total Disk storage in bytes. */
  totalDiskStorageSizeInBytes?: string;
}

export function dpmProtectedItemExtendedInfoSerializer(item: DPMProtectedItemExtendedInfo): any {
  return {
    protectableObjectLoadPath: item["protectableObjectLoadPath"],
    protected: item["protected"],
    isPresentOnCloud: item["isPresentOnCloud"],
    lastBackupStatus: item["lastBackupStatus"],
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : item["lastRefreshedAt"].toISOString(),
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : item["oldestRecoveryPoint"].toISOString(),
    recoveryPointCount: item["recoveryPointCount"],
    onPremiseOldestRecoveryPoint: !item["onPremiseOldestRecoveryPoint"]
      ? item["onPremiseOldestRecoveryPoint"]
      : item["onPremiseOldestRecoveryPoint"].toISOString(),
    onPremiseLatestRecoveryPoint: !item["onPremiseLatestRecoveryPoint"]
      ? item["onPremiseLatestRecoveryPoint"]
      : item["onPremiseLatestRecoveryPoint"].toISOString(),
    onPremiseRecoveryPointCount: item["onPremiseRecoveryPointCount"],
    isCollocated: item["isCollocated"],
    protectionGroupName: item["protectionGroupName"],
    diskStorageUsedInBytes: item["diskStorageUsedInBytes"],
    totalDiskStorageSizeInBytes: item["totalDiskStorageSizeInBytes"],
  };
}

export function dpmProtectedItemExtendedInfoDeserializer(item: any): DPMProtectedItemExtendedInfo {
  return {
    protectableObjectLoadPath: !item["protectableObjectLoadPath"]
      ? item["protectableObjectLoadPath"]
      : Object.fromEntries(
          Object.entries(item["protectableObjectLoadPath"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    protected: item["protected"],
    isPresentOnCloud: item["isPresentOnCloud"],
    lastBackupStatus: item["lastBackupStatus"],
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : new Date(item["lastRefreshedAt"]),
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : new Date(item["oldestRecoveryPoint"]),
    recoveryPointCount: item["recoveryPointCount"],
    onPremiseOldestRecoveryPoint: !item["onPremiseOldestRecoveryPoint"]
      ? item["onPremiseOldestRecoveryPoint"]
      : new Date(item["onPremiseOldestRecoveryPoint"]),
    onPremiseLatestRecoveryPoint: !item["onPremiseLatestRecoveryPoint"]
      ? item["onPremiseLatestRecoveryPoint"]
      : new Date(item["onPremiseLatestRecoveryPoint"]),
    onPremiseRecoveryPointCount: item["onPremiseRecoveryPointCount"],
    isCollocated: item["isCollocated"],
    protectionGroupName: item["protectionGroupName"],
    diskStorageUsedInBytes: item["diskStorageUsedInBytes"],
    totalDiskStorageSizeInBytes: item["totalDiskStorageSizeInBytes"],
  };
}

/** Base class for backup items. */
export interface GenericProtectedItem extends ProtectedItem {
  /** Friendly name of the container. */
  friendlyName?: string;
  /** Indicates consistency of policy object and policy applied to this backup item. */
  policyState?: string;
  /** Backup state of this backup item. */
  protectionState?: ProtectionState;
  /** Data Plane Service ID of the protected item. */
  protectedItemId?: number;
  /** Loosely coupled (type, value) associations (example - parent of a protected item) */
  sourceAssociations?: Record<string, string>;
  /** Name of this backup item's fabric. */
  fabricName?: string;
  /** backup item type. */
  protectedItemType: "GenericProtectedItem";
}

export function genericProtectedItemSerializer(item: GenericProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    policyState: item["policyState"],
    protectionState: item["protectionState"],
    protectedItemId: item["protectedItemId"],
    sourceAssociations: item["sourceAssociations"],
    fabricName: item["fabricName"],
  };
}

export function genericProtectedItemDeserializer(item: any): GenericProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    policyState: item["policyState"],
    protectionState: item["protectionState"],
    protectedItemId: item["protectedItemId"],
    sourceAssociations: !item["sourceAssociations"]
      ? item["sourceAssociations"]
      : Object.fromEntries(
          Object.entries(item["sourceAssociations"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    fabricName: item["fabricName"],
  };
}

/** MAB workload-specific backup item. */
export interface MabFileFolderProtectedItem extends ProtectedItem {
  /** Friendly name of this backup item. */
  friendlyName?: string;
  /** Name of the computer associated with this backup item. */
  computerName?: string;
  /** Status of last backup operation. */
  lastBackupStatus?: string;
  /** Timestamp of the last backup operation on this backup item. */
  lastBackupTime?: Date;
  /** Protected, ProtectionStopped, IRPending or ProtectionError */
  protectionState?: string;
  /** Sync time for deferred deletion in UTC */
  deferredDeleteSyncTimeInUTC?: number;
  /** Additional information with this backup item. */
  extendedInfo?: MabFileFolderProtectedItemExtendedInfo;
  /** backup item type. */
  protectedItemType: "MabFileFolderProtectedItem";
}

export function mabFileFolderProtectedItemSerializer(item: MabFileFolderProtectedItem): any {
  return {
    protectedItemType: item["protectedItemType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : item["lastRecoveryPoint"].toISOString(),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : item["deferredDeleteTimeInUTC"].toISOString(),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoSerializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    computerName: item["computerName"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : item["lastBackupTime"].toISOString(),
    protectionState: item["protectionState"],
    deferredDeleteSyncTimeInUTC: item["deferredDeleteSyncTimeInUTC"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : mabFileFolderProtectedItemExtendedInfoSerializer(item["extendedInfo"]),
  };
}

export function mabFileFolderProtectedItemDeserializer(item: any): MabFileFolderProtectedItem {
  return {
    protectedItemType: item["protectedItemType"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    containerName: item["containerName"],
    sourceResourceId: item["sourceResourceId"],
    policyId: item["policyId"],
    lastRecoveryPoint: !item["lastRecoveryPoint"]
      ? item["lastRecoveryPoint"]
      : new Date(item["lastRecoveryPoint"]),
    backupSetName: item["backupSetName"],
    createMode: item["createMode"],
    deferredDeleteTimeInUTC: !item["deferredDeleteTimeInUTC"]
      ? item["deferredDeleteTimeInUTC"]
      : new Date(item["deferredDeleteTimeInUTC"]),
    isScheduledForDeferredDelete: item["isScheduledForDeferredDelete"],
    deferredDeleteTimeRemaining: item["deferredDeleteTimeRemaining"],
    isDeferredDeleteScheduleUpcoming: item["isDeferredDeleteScheduleUpcoming"],
    isRehydrate: item["isRehydrate"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    isArchiveEnabled: item["isArchiveEnabled"],
    policyName: item["policyName"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    vaultId: item["vaultId"],
    sourceSideScanInfo: !item["sourceSideScanInfo"]
      ? item["sourceSideScanInfo"]
      : sourceSideScanInfoDeserializer(item["sourceSideScanInfo"]),
    friendlyName: item["friendlyName"],
    computerName: item["computerName"],
    lastBackupStatus: item["lastBackupStatus"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    protectionState: item["protectionState"],
    deferredDeleteSyncTimeInUTC: item["deferredDeleteSyncTimeInUTC"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : mabFileFolderProtectedItemExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Additional information on the backed up item. */
export interface MabFileFolderProtectedItemExtendedInfo {
  /** Last time when the agent data synced to service. */
  lastRefreshedAt?: Date;
  /** The oldest backup copy available. */
  oldestRecoveryPoint?: Date;
  /** Number of backup copies associated with the backup item. */
  recoveryPointCount?: number;
}

export function mabFileFolderProtectedItemExtendedInfoSerializer(
  item: MabFileFolderProtectedItemExtendedInfo,
): any {
  return {
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : item["lastRefreshedAt"].toISOString(),
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : item["oldestRecoveryPoint"].toISOString(),
    recoveryPointCount: item["recoveryPointCount"],
  };
}

export function mabFileFolderProtectedItemExtendedInfoDeserializer(
  item: any,
): MabFileFolderProtectedItemExtendedInfo {
  return {
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : new Date(item["lastRefreshedAt"]),
    oldestRecoveryPoint: !item["oldestRecoveryPoint"]
      ? item["oldestRecoveryPoint"]
      : new Date(item["oldestRecoveryPoint"]),
    recoveryPointCount: item["recoveryPointCount"],
  };
}

/** Base class for backup request. Workload-specific backup requests are derived from this class. */
export interface BackupRequestResource extends Resource {
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Optional ETag. */
  eTag?: string;
  /** BackupRequestResource properties */
  properties?: BackupRequestUnion;
}

export function backupRequestResourceSerializer(item: BackupRequestResource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    eTag: item["eTag"],
    properties: !item["properties"]
      ? item["properties"]
      : backupRequestUnionSerializer(item["properties"]),
  };
}

/** Base class for backup request. Workload-specific backup requests are derived from this class. */
export interface BackupRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureFileShareBackupRequest, AzureWorkloadBackupRequest, IaasVMBackupRequest */
  objectType: string;
}

export function backupRequestSerializer(item: BackupRequest): any {
  return { objectType: item["objectType"] };
}

/** Alias for BackupRequestUnion */
export type BackupRequestUnion =
  | AzureFileShareBackupRequest
  | AzureWorkloadBackupRequest
  | IaasVMBackupRequest
  | BackupRequest;

export function backupRequestUnionSerializer(item: BackupRequestUnion): any {
  switch (item.objectType) {
    case "AzureFileShareBackupRequest":
      return azureFileShareBackupRequestSerializer(item as AzureFileShareBackupRequest);

    case "AzureWorkloadBackupRequest":
      return azureWorkloadBackupRequestSerializer(item as AzureWorkloadBackupRequest);

    case "IaasVMBackupRequest":
      return iaasVMBackupRequestSerializer(item as IaasVMBackupRequest);

    default:
      return backupRequestSerializer(item);
  }
}

/** AzureFileShare workload-specific backup request. */
export interface AzureFileShareBackupRequest extends BackupRequest {
  /** Backup copy will expire after the time specified (UTC). */
  recoveryPointExpiryTimeInUTC?: Date;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureFileShareBackupRequest";
}

export function azureFileShareBackupRequestSerializer(item: AzureFileShareBackupRequest): any {
  return {
    objectType: item["objectType"],
    recoveryPointExpiryTimeInUTC: !item["recoveryPointExpiryTimeInUTC"]
      ? item["recoveryPointExpiryTimeInUTC"]
      : item["recoveryPointExpiryTimeInUTC"].toISOString(),
  };
}

/** AzureWorkload workload-specific backup request. */
export interface AzureWorkloadBackupRequest extends BackupRequest {
  /** Type of backup, viz. Full, Differential, Log or CopyOnlyFull */
  backupType?: BackupType;
  /** Bool for Compression setting */
  enableCompression?: boolean;
  /** Backup copy will expire after the time specified (UTC). */
  recoveryPointExpiryTimeInUTC?: Date;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadBackupRequest";
}

export function azureWorkloadBackupRequestSerializer(item: AzureWorkloadBackupRequest): any {
  return {
    objectType: item["objectType"],
    backupType: item["backupType"],
    enableCompression: item["enableCompression"],
    recoveryPointExpiryTimeInUTC: !item["recoveryPointExpiryTimeInUTC"]
      ? item["recoveryPointExpiryTimeInUTC"]
      : item["recoveryPointExpiryTimeInUTC"].toISOString(),
  };
}

/** Type of backup, viz. Full, Differential, Log or CopyOnlyFull */
export enum KnownBackupType {
  /** Invalid */
  Invalid = "Invalid",
  /** Full */
  Full = "Full",
  /** Differential */
  Differential = "Differential",
  /** Log */
  Log = "Log",
  /** CopyOnlyFull */
  CopyOnlyFull = "CopyOnlyFull",
  /** Incremental */
  Incremental = "Incremental",
  /** SnapshotFull */
  SnapshotFull = "SnapshotFull",
  /** SnapshotCopyOnlyFull */
  SnapshotCopyOnlyFull = "SnapshotCopyOnlyFull",
}

/**
 * Type of backup, viz. Full, Differential, Log or CopyOnlyFull \
 * {@link KnownBackupType} can be used interchangeably with BackupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Full** \
 * **Differential** \
 * **Log** \
 * **CopyOnlyFull** \
 * **Incremental** \
 * **SnapshotFull** \
 * **SnapshotCopyOnlyFull**
 */
export type BackupType = string;

/** IaaS VM workload-specific backup request. */
export interface IaasVMBackupRequest extends BackupRequest {
  /** Backup copy will expire after the time specified (UTC). */
  recoveryPointExpiryTimeInUTC?: Date;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "IaasVMBackupRequest";
}

export function iaasVMBackupRequestSerializer(item: IaasVMBackupRequest): any {
  return {
    objectType: item["objectType"],
    recoveryPointExpiryTimeInUTC: !item["recoveryPointExpiryTimeInUTC"]
      ? item["recoveryPointExpiryTimeInUTC"]
      : item["recoveryPointExpiryTimeInUTC"].toISOString(),
  };
}

/** ListRecoveryPointsRecommendedForMoveRequest Request */
export interface ListRecoveryPointsRecommendedForMoveRequest {
  /** Gets the class type. */
  objectType?: string;
  /** List of Recovery Points excluded from Move */
  excludedRPList?: string[];
}

export function listRecoveryPointsRecommendedForMoveRequestSerializer(
  item: ListRecoveryPointsRecommendedForMoveRequest,
): any {
  return {
    objectType: item["objectType"],
    excludedRPList: !item["excludedRPList"]
      ? item["excludedRPList"]
      : item["excludedRPList"].map((p: any) => {
          return p;
        }),
  };
}

/** List of RecoveryPoint resources */
export interface _RecoveryPointResourceList extends ResourceList {
  /** List of resources. */
  value?: RecoveryPointResource[];
}

export function _recoveryPointResourceListDeserializer(item: any): _RecoveryPointResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : recoveryPointResourceArrayDeserializer(item["value"]),
  };
}

export function recoveryPointResourceArrayDeserializer(
  result: Array<RecoveryPointResource>,
): any[] {
  return result.map((item) => {
    return recoveryPointResourceDeserializer(item);
  });
}

/** Base class for backup copies. Workload-specific backup copies are derived from this class. */
export interface RecoveryPointResource extends Resource {
  /** RecoveryPointResource properties */
  properties?: RecoveryPointUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function recoveryPointResourceDeserializer(item: any): RecoveryPointResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryPointUnionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Base class for backup copies. Workload-specific backup copies are derived from this class. */
export interface RecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureFileShareRecoveryPoint, AzureWorkloadPointInTimeRecoveryPoint, AzureWorkloadRecoveryPoint, AzureWorkloadSAPHanaPointInTimeRecoveryPoint, AzureWorkloadSAPHanaRecoveryPoint, AzureWorkloadSAPAsePointInTimeRecoveryPoint, AzureWorkloadSAPAseRecoveryPoint, AzureWorkloadSQLPointInTimeRecoveryPoint, AzureWorkloadSQLRecoveryPoint, GenericRecoveryPoint, IaasVMRecoveryPoint */
  objectType: string;
  /** Threat status of the recovery point */
  threatStatus?: ThreatStatus;
  /** Recovery point threat information. */
  threatInfo?: ThreatInfo[];
}

export function recoveryPointDeserializer(item: any): RecoveryPoint {
  return {
    objectType: item["objectType"],
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
  };
}

/** Alias for RecoveryPointUnion */
export type RecoveryPointUnion =
  | AzureFileShareRecoveryPoint
  | AzureWorkloadRecoveryPointUnion
  | GenericRecoveryPoint
  | IaasVMRecoveryPoint
  | RecoveryPoint;

export function recoveryPointUnionDeserializer(item: any): RecoveryPointUnion {
  switch (item.objectType) {
    case "AzureFileShareRecoveryPoint":
      return azureFileShareRecoveryPointDeserializer(item as AzureFileShareRecoveryPoint);

    case "AzureWorkloadRecoveryPoint":
    case "AzureWorkloadPointInTimeRecoveryPoint":
    case "AzureWorkloadSAPHanaRecoveryPoint":
    case "AzureWorkloadSAPAseRecoveryPoint":
    case "AzureWorkloadSQLRecoveryPoint":
    case "AzureWorkloadSAPHanaPointInTimeRecoveryPoint":
    case "AzureWorkloadSAPAsePointInTimeRecoveryPoint":
    case "AzureWorkloadSQLPointInTimeRecoveryPoint":
      return azureWorkloadRecoveryPointUnionDeserializer(item as AzureWorkloadRecoveryPointUnion);

    case "GenericRecoveryPoint":
      return genericRecoveryPointDeserializer(item as GenericRecoveryPoint);

    case "IaasVMRecoveryPoint":
      return iaasVMRecoveryPointDeserializer(item as IaasVMRecoveryPoint);

    default:
      return recoveryPointDeserializer(item);
  }
}

/** Threat status of the recovery point */
export enum KnownThreatStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Healthy */
  Healthy = "Healthy",
  /** UnHealthy */
  UnHealthy = "UnHealthy",
  /** Warning */
  Warning = "Warning",
  /** NotAvailable */
  NotAvailable = "NotAvailable",
}

/**
 * Threat status of the recovery point \
 * {@link KnownThreatStatus} can be used interchangeably with ThreatStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Healthy** \
 * **UnHealthy** \
 * **Warning** \
 * **NotAvailable**
 */
export type ThreatStatus = string;

export function threatInfoArrayDeserializer(result: Array<ThreatInfo>): any[] {
  return result.map((item) => {
    return threatInfoDeserializer(item);
  });
}

/** Recovery Point Threat information */
export interface ThreatInfo {
  /** Threat Subject */
  readonly threatTitle?: string;
  /** Threat Description */
  readonly threatDescription?: string;
  /** Timestamp when the last (latest)threat information was sent */
  readonly lastUpdatedTime?: Date;
  /** Threat Status Types */
  threatState?: ThreatState;
  /** Start timestamp of the threat */
  readonly threatStartTime?: Date;
  /** End timestamp of the threat */
  readonly threatEndTime?: Date;
  /** threat details link */
  readonly threatURI?: string;
  /** Threat Severity Types */
  threatSeverity?: ThreatSeverity;
}

export function threatInfoDeserializer(item: any): ThreatInfo {
  return {
    threatTitle: item["threatTitle"],
    threatDescription: item["threatDescription"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    threatState: item["threatState"],
    threatStartTime: !item["threatStartTime"]
      ? item["threatStartTime"]
      : new Date(item["threatStartTime"]),
    threatEndTime: !item["threatEndTime"] ? item["threatEndTime"] : new Date(item["threatEndTime"]),
    threatURI: item["threatURI"],
    threatSeverity: item["threatSeverity"],
  };
}

/** Threat Status Types */
export enum KnownThreatState {
  /** Active */
  Active = "Active",
  /** InProgress */
  InProgress = "InProgress",
  /** Ignored */
  Ignored = "Ignored",
  /** Resolved */
  Resolved = "Resolved",
}

/**
 * Threat Status Types \
 * {@link KnownThreatState} can be used interchangeably with ThreatState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **InProgress** \
 * **Ignored** \
 * **Resolved**
 */
export type ThreatState = string;

/** Threat Severity Types */
export enum KnownThreatSeverity {
  /** Critical */
  Critical = "Critical",
  /** High */
  High = "High",
  /** Warning */
  Warning = "Warning",
  /** Informational */
  Informational = "Informational",
}

/**
 * Threat Severity Types \
 * {@link KnownThreatSeverity} can be used interchangeably with ThreatSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical** \
 * **High** \
 * **Warning** \
 * **Informational**
 */
export type ThreatSeverity = string;

/** Azure File Share workload specific backup copy. */
export interface AzureFileShareRecoveryPoint extends RecoveryPoint {
  /** Type of the backup copy. Specifies whether it is a crash consistent backup or app consistent. */
  recoveryPointType?: string;
  /** Time at which this backup copy was created. */
  recoveryPointTime?: Date;
  /** Contains Url to the snapshot of fileshare, if applicable */
  fileShareSnapshotUri?: string;
  /** Contains recovery point size */
  recoveryPointSizeInGB?: number;
  /** Properties of Recovery Point */
  recoveryPointProperties?: RecoveryPointProperties;
  /** Recovery point tier information. */
  recoveryPointTierDetails?: RecoveryPointTierInformation[];
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureFileShareRecoveryPoint";
}

export function azureFileShareRecoveryPointDeserializer(item: any): AzureFileShareRecoveryPoint {
  return {
    objectType: item["objectType"],
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
    recoveryPointType: item["recoveryPointType"],
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
    fileShareSnapshotUri: item["fileShareSnapshotUri"],
    recoveryPointSizeInGB: item["recoveryPointSizeInGB"],
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationArrayDeserializer(item["recoveryPointTierDetails"]),
  };
}

/** Properties of Recovery Point */
export interface RecoveryPointProperties {
  /** Expiry time of Recovery Point in UTC. */
  expiryTime?: string;
  /** Rule name tagged on Recovery Point that governs life cycle */
  ruleName?: string;
  /** Bool to indicate whether RP is in soft delete state or not */
  isSoftDeleted?: boolean;
}

export function recoveryPointPropertiesDeserializer(item: any): RecoveryPointProperties {
  return {
    expiryTime: item["expiryTime"],
    ruleName: item["ruleName"],
    isSoftDeleted: item["isSoftDeleted"],
  };
}

export function recoveryPointTierInformationArrayDeserializer(
  result: Array<RecoveryPointTierInformation>,
): any[] {
  return result.map((item) => {
    return recoveryPointTierInformationDeserializer(item);
  });
}

/** Recovery point tier information. */
export interface RecoveryPointTierInformation {
  /** Recovery point tier type. */
  type?: RecoveryPointTierType;
  /** Recovery point tier status. */
  status?: RecoveryPointTierStatus;
  /** Recovery point tier status. */
  extendedInfo?: Record<string, string>;
}

export function recoveryPointTierInformationDeserializer(item: any): RecoveryPointTierInformation {
  return {
    type: item["type"],
    status: item["status"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : Object.fromEntries(
          Object.entries(item["extendedInfo"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Recovery point tier status. */
export enum KnownRecoveryPointTierStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Valid */
  Valid = "Valid",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
  /** Rehydrated */
  Rehydrated = "Rehydrated",
}

/**
 * Recovery point tier status. \
 * {@link KnownRecoveryPointTierStatus} can be used interchangeably with RecoveryPointTierStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Valid** \
 * **Disabled** \
 * **Deleted** \
 * **Rehydrated**
 */
export type RecoveryPointTierStatus = string;

/** Recovery point specific to PointInTime */
export interface AzureWorkloadPointInTimeRecoveryPoint extends AzureWorkloadRecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadSAPHanaPointInTimeRecoveryPoint, AzureWorkloadSAPAsePointInTimeRecoveryPoint */
  objectType:
    | "AzureWorkloadPointInTimeRecoveryPoint"
    | "AzureWorkloadSAPHanaPointInTimeRecoveryPoint"
    | "AzureWorkloadSAPAsePointInTimeRecoveryPoint";
  /** List of log ranges */
  timeRanges?: PointInTimeRange[];
}

export function azureWorkloadPointInTimeRecoveryPointDeserializer(
  item: any,
): AzureWorkloadPointInTimeRecoveryPoint {
  return {
    objectType: item["objectType"],
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : pointInTimeRangeArrayDeserializer(item["timeRanges"]),
  };
}

/** Alias for AzureWorkloadPointInTimeRecoveryPointUnion */
export type AzureWorkloadPointInTimeRecoveryPointUnion =
  | AzureWorkloadSAPHanaPointInTimeRecoveryPoint
  | AzureWorkloadSAPAsePointInTimeRecoveryPoint
  | AzureWorkloadPointInTimeRecoveryPoint;

export function azureWorkloadPointInTimeRecoveryPointUnionDeserializer(
  item: any,
): AzureWorkloadPointInTimeRecoveryPointUnion {
  switch (item.objectType) {
    case "AzureWorkloadSAPHanaPointInTimeRecoveryPoint":
      return azureWorkloadSAPHanaPointInTimeRecoveryPointDeserializer(
        item as AzureWorkloadSAPHanaPointInTimeRecoveryPoint,
      );

    case "AzureWorkloadSAPAsePointInTimeRecoveryPoint":
      return azureWorkloadSAPAsePointInTimeRecoveryPointDeserializer(
        item as AzureWorkloadSAPAsePointInTimeRecoveryPoint,
      );

    default:
      return azureWorkloadPointInTimeRecoveryPointDeserializer(item);
  }
}

export function pointInTimeRangeArrayDeserializer(result: Array<PointInTimeRange>): any[] {
  return result.map((item) => {
    return pointInTimeRangeDeserializer(item);
  });
}

/** Provides details for log ranges */
export interface PointInTimeRange {
  /** Start time of the time range for log recovery. */
  startTime?: Date;
  /** End time of the time range for log recovery. */
  endTime?: Date;
}

export function pointInTimeRangeDeserializer(item: any): PointInTimeRange {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
  };
}

/** Recovery point specific to PointInTime in SAPHana */
export interface AzureWorkloadSAPHanaPointInTimeRecoveryPoint extends AzureWorkloadPointInTimeRecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSAPHanaPointInTimeRecoveryPoint";
}

export function azureWorkloadSAPHanaPointInTimeRecoveryPointDeserializer(
  item: any,
): AzureWorkloadSAPHanaPointInTimeRecoveryPoint {
  return {
    objectType: item["objectType"],
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : pointInTimeRangeArrayDeserializer(item["timeRanges"]),
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
  };
}

/** Recovery point specific to PointInTime in SAPAse */
export interface AzureWorkloadSAPAsePointInTimeRecoveryPoint extends AzureWorkloadPointInTimeRecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSAPAsePointInTimeRecoveryPoint";
}

export function azureWorkloadSAPAsePointInTimeRecoveryPointDeserializer(
  item: any,
): AzureWorkloadSAPAsePointInTimeRecoveryPoint {
  return {
    objectType: item["objectType"],
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : pointInTimeRangeArrayDeserializer(item["timeRanges"]),
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
  };
}

/** Workload specific recovery point, specifically encapsulates full/diff recovery point */
export interface AzureWorkloadRecoveryPoint extends RecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadPointInTimeRecoveryPoint, AzureWorkloadSAPHanaPointInTimeRecoveryPoint, AzureWorkloadSAPHanaRecoveryPoint, AzureWorkloadSAPAsePointInTimeRecoveryPoint, AzureWorkloadSAPAseRecoveryPoint, AzureWorkloadSQLPointInTimeRecoveryPoint, AzureWorkloadSQLRecoveryPoint */
  objectType:
    | "AzureWorkloadRecoveryPoint"
    | "AzureWorkloadPointInTimeRecoveryPoint"
    | "AzureWorkloadSAPHanaRecoveryPoint"
    | "AzureWorkloadSAPAseRecoveryPoint"
    | "AzureWorkloadSQLRecoveryPoint"
    | "AzureWorkloadSAPHanaPointInTimeRecoveryPoint"
    | "AzureWorkloadSAPAsePointInTimeRecoveryPoint"
    | "AzureWorkloadSQLPointInTimeRecoveryPoint";
  /** UTC time at which recovery point was created */
  recoveryPointTimeInUTC?: Date;
  /** Type of restore point */
  type?: RestorePointType;
  /** Recovery point tier information. */
  recoveryPointTierDetails?: RecoveryPointTierInformationV2[];
  /** Eligibility of RP to be moved to another tier */
  recoveryPointMoveReadinessInfo?: Record<string, RecoveryPointMoveReadinessInfo>;
  /** Properties of Recovery Point */
  recoveryPointProperties?: RecoveryPointProperties;
}

export function azureWorkloadRecoveryPointDeserializer(item: any): AzureWorkloadRecoveryPoint {
  return {
    objectType: item["objectType"],
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
  };
}

/** Alias for AzureWorkloadRecoveryPointUnion */
export type AzureWorkloadRecoveryPointUnion =
  | AzureWorkloadPointInTimeRecoveryPointUnion
  | AzureWorkloadSAPHanaRecoveryPoint
  | AzureWorkloadSAPAseRecoveryPoint
  | AzureWorkloadSQLRecoveryPointUnion
  | AzureWorkloadRecoveryPoint;

export function azureWorkloadRecoveryPointUnionDeserializer(
  item: any,
): AzureWorkloadRecoveryPointUnion {
  switch (item.objectType) {
    case "AzureWorkloadPointInTimeRecoveryPoint":
    case "AzureWorkloadSAPHanaPointInTimeRecoveryPoint":
    case "AzureWorkloadSAPAsePointInTimeRecoveryPoint":
      return azureWorkloadPointInTimeRecoveryPointUnionDeserializer(
        item as AzureWorkloadPointInTimeRecoveryPointUnion,
      );

    case "AzureWorkloadSAPHanaRecoveryPoint":
      return azureWorkloadSAPHanaRecoveryPointDeserializer(
        item as AzureWorkloadSAPHanaRecoveryPoint,
      );

    case "AzureWorkloadSAPAseRecoveryPoint":
      return azureWorkloadSAPAseRecoveryPointDeserializer(item as AzureWorkloadSAPAseRecoveryPoint);

    case "AzureWorkloadSQLRecoveryPoint":
    case "AzureWorkloadSQLPointInTimeRecoveryPoint":
      return azureWorkloadSQLRecoveryPointUnionDeserializer(
        item as AzureWorkloadSQLRecoveryPointUnion,
      );

    default:
      return azureWorkloadRecoveryPointDeserializer(item);
  }
}

/** Type of restore point */
export enum KnownRestorePointType {
  /** Invalid */
  Invalid = "Invalid",
  /** Full */
  Full = "Full",
  /** Log */
  Log = "Log",
  /** Differential */
  Differential = "Differential",
  /** Incremental */
  Incremental = "Incremental",
  /** SnapshotFull */
  SnapshotFull = "SnapshotFull",
  /** SnapshotCopyOnlyFull */
  SnapshotCopyOnlyFull = "SnapshotCopyOnlyFull",
}

/**
 * Type of restore point \
 * {@link KnownRestorePointType} can be used interchangeably with RestorePointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Full** \
 * **Log** \
 * **Differential** \
 * **Incremental** \
 * **SnapshotFull** \
 * **SnapshotCopyOnlyFull**
 */
export type RestorePointType = string;

export function recoveryPointTierInformationV2ArrayDeserializer(
  result: Array<RecoveryPointTierInformationV2>,
): any[] {
  return result.map((item) => {
    return recoveryPointTierInformationV2Deserializer(item);
  });
}

/** RecoveryPoint Tier Information V2 */
export interface RecoveryPointTierInformationV2 extends RecoveryPointTierInformation {
  /** Recovery point tier type. */
  type?: RecoveryPointTierType;
  /** Recovery point tier status. */
  status?: RecoveryPointTierStatus;
}

export function recoveryPointTierInformationV2Deserializer(
  item: any,
): RecoveryPointTierInformationV2 {
  return {
    type: item["type"],
    status: item["status"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : Object.fromEntries(
          Object.entries(item["extendedInfo"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function recoveryPointMoveReadinessInfoRecordDeserializer(
  item: Record<string, any>,
): Record<string, RecoveryPointMoveReadinessInfo> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : recoveryPointMoveReadinessInfoDeserializer(item[key]);
  });
  return result;
}

/** model interface RecoveryPointMoveReadinessInfo */
export interface RecoveryPointMoveReadinessInfo {
  isReadyForMove?: boolean;
  additionalInfo?: string;
}

export function recoveryPointMoveReadinessInfoDeserializer(
  item: any,
): RecoveryPointMoveReadinessInfo {
  return {
    isReadyForMove: item["isReadyForMove"],
    additionalInfo: item["additionalInfo"],
  };
}

/** SAPHana specific recoverypoint, specifically encapsulates full/diff recoverypoints */
export interface AzureWorkloadSAPHanaRecoveryPoint extends AzureWorkloadRecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSAPHanaRecoveryPoint";
}

export function azureWorkloadSAPHanaRecoveryPointDeserializer(
  item: any,
): AzureWorkloadSAPHanaRecoveryPoint {
  return {
    objectType: item["objectType"],
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
  };
}

/** SAPAse specific recoverypoint, specifically encapsulates full/diff recoverypoints */
export interface AzureWorkloadSAPAseRecoveryPoint extends AzureWorkloadRecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSAPAseRecoveryPoint";
}

export function azureWorkloadSAPAseRecoveryPointDeserializer(
  item: any,
): AzureWorkloadSAPAseRecoveryPoint {
  return {
    objectType: item["objectType"],
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
  };
}

/** Recovery point specific to PointInTime */
export interface AzureWorkloadSQLPointInTimeRecoveryPoint extends AzureWorkloadSQLRecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSQLPointInTimeRecoveryPoint";
  /** List of log ranges */
  timeRanges?: PointInTimeRange[];
}

export function azureWorkloadSQLPointInTimeRecoveryPointDeserializer(
  item: any,
): AzureWorkloadSQLPointInTimeRecoveryPoint {
  return {
    objectType: item["objectType"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadSQLRecoveryPointExtendedInfoDeserializer(item["extendedInfo"]),
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : pointInTimeRangeArrayDeserializer(item["timeRanges"]),
  };
}

/** SQL specific recoverypoint, specifically encapsulates full/diff recoverypoint along with extended info */
export interface AzureWorkloadSQLRecoveryPoint extends AzureWorkloadRecoveryPoint {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadSQLPointInTimeRecoveryPoint */
  objectType: "AzureWorkloadSQLRecoveryPoint" | "AzureWorkloadSQLPointInTimeRecoveryPoint";
  /**
   * Extended Info that provides data directory details. Will be populated in two cases:
   * When a specific recovery point is accessed using GetRecoveryPoint
   * Or when ListRecoveryPoints is called for Log RP only with ExtendedInfo query filter
   */
  extendedInfo?: AzureWorkloadSQLRecoveryPointExtendedInfo;
}

export function azureWorkloadSQLRecoveryPointDeserializer(
  item: any,
): AzureWorkloadSQLRecoveryPoint {
  return {
    objectType: item["objectType"],
    recoveryPointTimeInUTC: !item["recoveryPointTimeInUTC"]
      ? item["recoveryPointTimeInUTC"]
      : new Date(item["recoveryPointTimeInUTC"]),
    type: item["type"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadSQLRecoveryPointExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Alias for AzureWorkloadSQLRecoveryPointUnion */
export type AzureWorkloadSQLRecoveryPointUnion =
  | AzureWorkloadSQLPointInTimeRecoveryPoint
  | AzureWorkloadSQLRecoveryPoint;

export function azureWorkloadSQLRecoveryPointUnionDeserializer(
  item: any,
): AzureWorkloadSQLRecoveryPointUnion {
  switch (item.objectType) {
    case "AzureWorkloadSQLPointInTimeRecoveryPoint":
      return azureWorkloadSQLPointInTimeRecoveryPointDeserializer(
        item as AzureWorkloadSQLPointInTimeRecoveryPoint,
      );

    default:
      return azureWorkloadSQLRecoveryPointDeserializer(item);
  }
}

/** Extended info class details */
export interface AzureWorkloadSQLRecoveryPointExtendedInfo {
  /** UTC time at which data directory info was captured */
  dataDirectoryTimeInUTC?: Date;
  /** List of data directory paths during restore operation. */
  dataDirectoryPaths?: SQLDataDirectory[];
  /** List of databases included in recovery point. */
  includedDatabases?: DatabaseInRP[];
}

export function azureWorkloadSQLRecoveryPointExtendedInfoDeserializer(
  item: any,
): AzureWorkloadSQLRecoveryPointExtendedInfo {
  return {
    dataDirectoryTimeInUTC: !item["dataDirectoryTimeInUTC"]
      ? item["dataDirectoryTimeInUTC"]
      : new Date(item["dataDirectoryTimeInUTC"]),
    dataDirectoryPaths: !item["dataDirectoryPaths"]
      ? item["dataDirectoryPaths"]
      : sqlDataDirectoryArrayDeserializer(item["dataDirectoryPaths"]),
    includedDatabases: !item["includedDatabases"]
      ? item["includedDatabases"]
      : databaseInRPArrayDeserializer(item["includedDatabases"]),
  };
}

export function sqlDataDirectoryArrayDeserializer(result: Array<SQLDataDirectory>): any[] {
  return result.map((item) => {
    return sqlDataDirectoryDeserializer(item);
  });
}

/** SQLDataDirectory info */
export interface SQLDataDirectory {
  /** Type of data directory mapping */
  type?: SQLDataDirectoryType;
  /** File path */
  path?: string;
  /** Logical name of the file */
  logicalName?: string;
}

export function sqlDataDirectoryDeserializer(item: any): SQLDataDirectory {
  return {
    type: item["type"],
    path: item["path"],
    logicalName: item["logicalName"],
  };
}

/** Type of data directory mapping */
export enum KnownSQLDataDirectoryType {
  /** Invalid */
  Invalid = "Invalid",
  /** Data */
  Data = "Data",
  /** Log */
  Log = "Log",
}

/**
 * Type of data directory mapping \
 * {@link KnownSQLDataDirectoryType} can be used interchangeably with SQLDataDirectoryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Data** \
 * **Log**
 */
export type SQLDataDirectoryType = string;

export function databaseInRPArrayDeserializer(result: Array<DatabaseInRP>): any[] {
  return result.map((item) => {
    return databaseInRPDeserializer(item);
  });
}

/** Database included in RP. */
export interface DatabaseInRP {
  /** Datasource Id for the database. */
  datasourceId?: string;
  /** Datasource name for the database. */
  datasourceName?: string;
}

export function databaseInRPDeserializer(item: any): DatabaseInRP {
  return {
    datasourceId: item["datasourceId"],
    datasourceName: item["datasourceName"],
  };
}

/** Generic backup copy. */
export interface GenericRecoveryPoint extends RecoveryPoint {
  /** Friendly name of the backup copy. */
  friendlyName?: string;
  /** Type of the backup copy. */
  recoveryPointType?: string;
  /** Time at which this backup copy was created. */
  recoveryPointTime?: Date;
  /** Additional information associated with this backup copy. */
  recoveryPointAdditionalInfo?: string;
  /** Properties of Recovery Point */
  recoveryPointProperties?: RecoveryPointProperties;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "GenericRecoveryPoint";
}

export function genericRecoveryPointDeserializer(item: any): GenericRecoveryPoint {
  return {
    objectType: item["objectType"],
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
    friendlyName: item["friendlyName"],
    recoveryPointType: item["recoveryPointType"],
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
    recoveryPointAdditionalInfo: item["recoveryPointAdditionalInfo"],
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
  };
}

/** IaaS VM workload specific backup copy. */
export interface IaasVMRecoveryPoint extends RecoveryPoint {
  /** Type of the backup copy. */
  recoveryPointType?: string;
  /** Time at which this backup copy was created. */
  recoveryPointTime?: Date;
  /** Additional information associated with this backup copy. */
  recoveryPointAdditionalInfo?: string;
  /** Storage type of the VM whose backup copy is created. */
  sourceVMStorageType?: string;
  /** Identifies whether the VM was encrypted when the backup copy is created. */
  isSourceVMEncrypted?: boolean;
  /** Required details for recovering an encrypted VM. Applicable only when IsSourceVMEncrypted is true. */
  keyAndSecret?: KeyAndSecretDetails;
  /** Is the session to recover items from this backup copy still active. */
  isInstantIlrSessionActive?: boolean;
  /** Recovery point tier information. */
  recoveryPointTierDetails?: RecoveryPointTierInformationV2[];
  /** Whether VM is with Managed Disks */
  isManagedVirtualMachine?: boolean;
  /** Virtual Machine Size */
  virtualMachineSize?: string;
  /** Original Storage Account Option */
  originalStorageAccountOption?: boolean;
  /** OS type */
  osType?: string;
  /** Disk configuration */
  recoveryPointDiskConfiguration?: RecoveryPointDiskConfiguration;
  /** Identifies the zone of the VM at the time of backup. Applicable only for zone-pinned Vms */
  zones?: string[];
  /** Eligibility of RP to be moved to another tier */
  recoveryPointMoveReadinessInfo?: Record<string, RecoveryPointMoveReadinessInfo>;
  /** Security Type of the Disk */
  securityType?: string;
  /** Properties of Recovery Point */
  recoveryPointProperties?: RecoveryPointProperties;
  /** This flag denotes if any of the disks in the VM are using Private access network setting */
  isPrivateAccessEnabledOnAnyDisk?: boolean;
  /**
   * Extended location of the VM recovery point,
   * should be null if VM is in public cloud
   */
  extendedLocation?: ExtendedLocation;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "IaasVMRecoveryPoint";
}

export function iaasVMRecoveryPointDeserializer(item: any): IaasVMRecoveryPoint {
  return {
    objectType: item["objectType"],
    threatStatus: item["threatStatus"],
    threatInfo: !item["threatInfo"]
      ? item["threatInfo"]
      : threatInfoArrayDeserializer(item["threatInfo"]),
    recoveryPointType: item["recoveryPointType"],
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
    recoveryPointAdditionalInfo: item["recoveryPointAdditionalInfo"],
    sourceVMStorageType: item["sourceVMStorageType"],
    isSourceVMEncrypted: item["isSourceVMEncrypted"],
    keyAndSecret: !item["keyAndSecret"]
      ? item["keyAndSecret"]
      : keyAndSecretDetailsDeserializer(item["keyAndSecret"]),
    isInstantIlrSessionActive: item["isInstantIlrSessionActive"],
    recoveryPointTierDetails: !item["recoveryPointTierDetails"]
      ? item["recoveryPointTierDetails"]
      : recoveryPointTierInformationV2ArrayDeserializer(item["recoveryPointTierDetails"]),
    isManagedVirtualMachine: item["isManagedVirtualMachine"],
    virtualMachineSize: item["virtualMachineSize"],
    originalStorageAccountOption: item["originalStorageAccountOption"],
    osType: item["osType"],
    recoveryPointDiskConfiguration: !item["recoveryPointDiskConfiguration"]
      ? item["recoveryPointDiskConfiguration"]
      : recoveryPointDiskConfigurationDeserializer(item["recoveryPointDiskConfiguration"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    recoveryPointMoveReadinessInfo: !item["recoveryPointMoveReadinessInfo"]
      ? item["recoveryPointMoveReadinessInfo"]
      : recoveryPointMoveReadinessInfoRecordDeserializer(item["recoveryPointMoveReadinessInfo"]),
    securityType: item["securityType"],
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : recoveryPointPropertiesDeserializer(item["recoveryPointProperties"]),
    isPrivateAccessEnabledOnAnyDisk: item["isPrivateAccessEnabledOnAnyDisk"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/**
 * BEK is bitlocker key.
 * KEK is encryption key for BEK
 * If the VM was encrypted then we will store following details :
 * 1. Secret(BEK) - Url + Backup Data + vaultId.
 * 2. Key(KEK) - Url + Backup Data + vaultId.
 * 3. EncryptionMechanism
 * BEK and KEK can potentially have different vault ids.
 */
export interface KeyAndSecretDetails {
  /** KEK is encryption key for BEK. */
  kekDetails?: KEKDetails;
  /** BEK is bitlocker encryption key. */
  bekDetails?: BEKDetails;
  /** Encryption mechanism: None/ SinglePass/ DoublePass */
  encryptionMechanism?: string;
}

export function keyAndSecretDetailsDeserializer(item: any): KeyAndSecretDetails {
  return {
    kekDetails: !item["kekDetails"]
      ? item["kekDetails"]
      : kekDetailsDeserializer(item["kekDetails"]),
    bekDetails: !item["bekDetails"]
      ? item["bekDetails"]
      : bekDetailsDeserializer(item["bekDetails"]),
    encryptionMechanism: item["encryptionMechanism"],
  };
}

/** KEK is encryption key for BEK. */
export interface KEKDetails {
  /** Key is KEK. */
  keyUrl?: string;
  /** Key Vault ID where this Key is stored. */
  keyVaultId?: string;
  /** KEK data. */
  keyBackupData?: string;
}

export function kekDetailsDeserializer(item: any): KEKDetails {
  return {
    keyUrl: item["keyUrl"],
    keyVaultId: item["keyVaultId"],
    keyBackupData: item["keyBackupData"],
  };
}

/** BEK is bitlocker encryption key. */
export interface BEKDetails {
  /** Secret is BEK. */
  secretUrl?: string;
  /** ID of the Key Vault where this Secret is stored. */
  secretVaultId?: string;
  /** BEK data. */
  secretData?: string;
}

export function bekDetailsDeserializer(item: any): BEKDetails {
  return {
    secretUrl: item["secretUrl"],
    secretVaultId: item["secretVaultId"],
    secretData: item["secretData"],
  };
}

/** Disk configuration */
export interface RecoveryPointDiskConfiguration {
  /** Number of disks included in backup */
  numberOfDisksIncludedInBackup?: number;
  /** Number of disks attached to the VM */
  numberOfDisksAttachedToVm?: number;
  /** Information of disks included in backup */
  includedDiskList?: DiskInformation[];
  /** Information of disks excluded from backup */
  excludedDiskList?: DiskInformation[];
}

export function recoveryPointDiskConfigurationDeserializer(
  item: any,
): RecoveryPointDiskConfiguration {
  return {
    numberOfDisksIncludedInBackup: item["numberOfDisksIncludedInBackup"],
    numberOfDisksAttachedToVm: item["numberOfDisksAttachedToVm"],
    includedDiskList: !item["includedDiskList"]
      ? item["includedDiskList"]
      : diskInformationArrayDeserializer(item["includedDiskList"]),
    excludedDiskList: !item["excludedDiskList"]
      ? item["excludedDiskList"]
      : diskInformationArrayDeserializer(item["excludedDiskList"]),
  };
}

export function diskInformationArrayDeserializer(result: Array<DiskInformation>): any[] {
  return result.map((item) => {
    return diskInformationDeserializer(item);
  });
}

/** Disk information */
export interface DiskInformation {
  lun?: number;
  name?: string;
}

export function diskInformationDeserializer(item: any): DiskInformation {
  return {
    lun: item["lun"],
    name: item["name"],
  };
}

/** The extended location of Recovery point where VM was present. */
export interface ExtendedLocation {
  /** Name of the extended location. */
  name?: string;
  /** Type of the extended location. Possible values include: 'EdgeZone' */
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

/** Base for all lists of resources. */
export interface ResourceList {
  /** The URI to fetch the next page of resources, with each API call returning up to 200 resources per page. Use ListNext() to fetch the next page if the total number of resources exceeds 200. */
  nextLink?: string;
}

export function resourceListDeserializer(item: any): ResourceList {
  return {
    nextLink: item["nextLink"],
  };
}

/** Base class for container with backup items. Containers with specific workloads are derived from this class. */
export interface ProtectionContainerResource extends Resource {
  /** ProtectionContainerResource properties */
  properties?: ProtectionContainerUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function protectionContainerResourceSerializer(item: ProtectionContainerResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : protectionContainerUnionSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
  };
}

export function protectionContainerResourceDeserializer(item: any): ProtectionContainerResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectionContainerUnionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Base class for container with backup items. Containers with specific workloads are derived from this class. */
export interface ProtectionContainer {
  /** Friendly name of the container. */
  friendlyName?: string;
  /** Type of backup management for the container. */
  backupManagementType?: BackupManagementType;
  /** Status of registration of the container with the Recovery Services Vault. */
  registrationStatus?: string;
  /** Status of health of the container. */
  healthStatus?: string;
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  /** The discriminator possible values: AzureBackupServerContainer, DPMContainer, Microsoft.ClassicCompute/virtualMachines, IaasVMContainer, Microsoft.Compute/virtualMachines, SQLAGWorkLoadContainer, AzureWorkloadContainer, AzureSqlContainer, StorageContainer, VMAppContainer, GenericContainer, Windows */
  containerType: ProtectableContainerType;
  /** Type of the protectable object associated with this container */
  protectableObjectType?: string;
}

export function protectionContainerSerializer(item: ProtectionContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
  };
}

export function protectionContainerDeserializer(item: any): ProtectionContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
  };
}

/** Alias for ProtectionContainerUnion */
export type ProtectionContainerUnion =
  | DpmContainerUnion
  | IaaSVMContainerUnion
  | AzureWorkloadContainerUnion
  | AzureSqlContainer
  | AzureStorageContainer
  | GenericContainer
  | MabContainer
  | ProtectionContainer;

export function protectionContainerUnionSerializer(item: ProtectionContainerUnion): any {
  switch (item.containerType) {
    case "DPMContainer":
    case "AzureBackupServerContainer":
      return dpmContainerUnionSerializer(item as DpmContainerUnion);

    case "IaasVMContainer":
    case "Microsoft.ClassicCompute/virtualMachines":
    case "Microsoft.Compute/virtualMachines":
      return iaaSVMContainerUnionSerializer(item as IaaSVMContainerUnion);

    case "AzureWorkloadContainer":
    case "SQLAGWorkLoadContainer":
    case "VMAppContainer":
      return azureWorkloadContainerUnionSerializer(item as AzureWorkloadContainerUnion);

    case "AzureSqlContainer":
      return azureSqlContainerSerializer(item as AzureSqlContainer);

    case "StorageContainer":
      return azureStorageContainerSerializer(item as AzureStorageContainer);

    case "GenericContainer":
      return genericContainerSerializer(item as GenericContainer);

    case "Windows":
      return mabContainerSerializer(item as MabContainer);

    default:
      return protectionContainerSerializer(item);
  }
}

export function protectionContainerUnionDeserializer(item: any): ProtectionContainerUnion {
  switch (item.containerType) {
    case "DPMContainer":
    case "AzureBackupServerContainer":
      return dpmContainerUnionDeserializer(item as DpmContainerUnion);

    case "IaasVMContainer":
    case "Microsoft.ClassicCompute/virtualMachines":
    case "Microsoft.Compute/virtualMachines":
      return iaaSVMContainerUnionDeserializer(item as IaaSVMContainerUnion);

    case "AzureWorkloadContainer":
    case "SQLAGWorkLoadContainer":
    case "VMAppContainer":
      return azureWorkloadContainerUnionDeserializer(item as AzureWorkloadContainerUnion);

    case "AzureSqlContainer":
      return azureSqlContainerDeserializer(item as AzureSqlContainer);

    case "StorageContainer":
      return azureStorageContainerDeserializer(item as AzureStorageContainer);

    case "GenericContainer":
      return genericContainerDeserializer(item as GenericContainer);

    case "Windows":
      return mabContainerDeserializer(item as MabContainer);

    default:
      return protectionContainerDeserializer(item);
  }
}

/**
 * Type of the container. The value of this property for
 * 1. Compute Azure VM is Microsoft.Compute/virtualMachines
 * 2. Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines
 */
export type ProtectableContainerType =
  | "Invalid"
  | "Unknown"
  | "IaasVMContainer"
  | "IaasVMServiceContainer"
  | "DPMContainer"
  | "AzureBackupServerContainer"
  | "MABContainer"
  | "Cluster"
  | "AzureSqlContainer"
  | "Windows"
  | "VCenter"
  | "VMAppContainer"
  | "SQLAGWorkLoadContainer"
  | "StorageContainer"
  | "GenericContainer"
  | "Microsoft.ClassicCompute/virtualMachines"
  | "Microsoft.Compute/virtualMachines"
  | "AzureWorkloadContainer";

/** AzureBackupServer (DPMVenus) workload-specific protection container. */
export interface AzureBackupServerContainer extends DpmContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "AzureBackupServerContainer";
}

export function azureBackupServerContainerSerializer(item: AzureBackupServerContainer): any {
  return {
    containerType: item["containerType"],
    canReRegister: item["canReRegister"],
    containerId: item["containerId"],
    protectedItemCount: item["protectedItemCount"],
    dpmAgentVersion: item["dpmAgentVersion"],
    dpmServers: !item["dpmServers"]
      ? item["dpmServers"]
      : item["dpmServers"].map((p: any) => {
          return p;
        }),
    upgradeAvailable: item["upgradeAvailable"],
    protectionStatus: item["protectionStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : dpmContainerExtendedInfoSerializer(item["extendedInfo"]),
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

export function azureBackupServerContainerDeserializer(item: any): AzureBackupServerContainer {
  return {
    containerType: item["containerType"],
    canReRegister: item["canReRegister"],
    containerId: item["containerId"],
    protectedItemCount: item["protectedItemCount"],
    dpmAgentVersion: item["dpmAgentVersion"],
    dpmServers: !item["dpmServers"]
      ? item["dpmServers"]
      : item["dpmServers"].map((p: any) => {
          return p;
        }),
    upgradeAvailable: item["upgradeAvailable"],
    protectionStatus: item["protectionStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : dpmContainerExtendedInfoDeserializer(item["extendedInfo"]),
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

/** DPM workload-specific protection container. */
export interface DpmContainer extends ProtectionContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  /** The discriminator possible values: AzureBackupServerContainer */
  containerType: "DPMContainer" | "AzureBackupServerContainer";
  /** Specifies whether the container is re-registrable. */
  canReRegister?: boolean;
  /** ID of container. */
  containerId?: string;
  /** Number of protected items in the BackupEngine */
  protectedItemCount?: number;
  /** Backup engine Agent version */
  dpmAgentVersion?: string;
  /** List of BackupEngines protecting the container */
  dpmServers?: string[];
  /** To check if upgrade available */
  upgradeAvailable?: boolean;
  /** Protection status of the container. */
  protectionStatus?: string;
  /** Extended Info of the container. */
  extendedInfo?: DPMContainerExtendedInfo;
}

export function dpmContainerSerializer(item: DpmContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    canReRegister: item["canReRegister"],
    containerId: item["containerId"],
    protectedItemCount: item["protectedItemCount"],
    dpmAgentVersion: item["dpmAgentVersion"],
    dpmServers: !item["dpmServers"]
      ? item["dpmServers"]
      : item["dpmServers"].map((p: any) => {
          return p;
        }),
    upgradeAvailable: item["upgradeAvailable"],
    protectionStatus: item["protectionStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : dpmContainerExtendedInfoSerializer(item["extendedInfo"]),
  };
}

export function dpmContainerDeserializer(item: any): DpmContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    canReRegister: item["canReRegister"],
    containerId: item["containerId"],
    protectedItemCount: item["protectedItemCount"],
    dpmAgentVersion: item["dpmAgentVersion"],
    dpmServers: !item["dpmServers"]
      ? item["dpmServers"]
      : item["dpmServers"].map((p: any) => {
          return p;
        }),
    upgradeAvailable: item["upgradeAvailable"],
    protectionStatus: item["protectionStatus"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : dpmContainerExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Alias for DpmContainerUnion */
export type DpmContainerUnion = AzureBackupServerContainer | DpmContainer;

export function dpmContainerUnionSerializer(item: DpmContainerUnion): any {
  switch (item.containerType) {
    case "AzureBackupServerContainer":
      return azureBackupServerContainerSerializer(item as AzureBackupServerContainer);

    default:
      return dpmContainerSerializer(item);
  }
}

export function dpmContainerUnionDeserializer(item: any): DpmContainerUnion {
  switch (item.containerType) {
    case "AzureBackupServerContainer":
      return azureBackupServerContainerDeserializer(item as AzureBackupServerContainer);

    default:
      return dpmContainerDeserializer(item);
  }
}

/** Additional information of the DPMContainer. */
export interface DPMContainerExtendedInfo {
  /** Last refresh time of the DPMContainer. */
  lastRefreshedAt?: Date;
}

export function dpmContainerExtendedInfoSerializer(item: DPMContainerExtendedInfo): any {
  return {
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : item["lastRefreshedAt"].toISOString(),
  };
}

export function dpmContainerExtendedInfoDeserializer(item: any): DPMContainerExtendedInfo {
  return {
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : new Date(item["lastRefreshedAt"]),
  };
}

/** IaaS VM workload-specific backup item representing a classic virtual machine. */
export interface AzureIaaSClassicComputeVMContainer extends IaaSVMContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "Microsoft.ClassicCompute/virtualMachines";
}

export function azureIaaSClassicComputeVMContainerSerializer(
  item: AzureIaaSClassicComputeVMContainer,
): any {
  return {
    containerType: item["containerType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

export function azureIaaSClassicComputeVMContainerDeserializer(
  item: any,
): AzureIaaSClassicComputeVMContainer {
  return {
    containerType: item["containerType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

/** IaaS VM workload-specific container. */
export interface IaaSVMContainer extends ProtectionContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  /** The discriminator possible values: Microsoft.ClassicCompute/virtualMachines, Microsoft.Compute/virtualMachines */
  containerType:
    | "IaasVMContainer"
    | "Microsoft.ClassicCompute/virtualMachines"
    | "Microsoft.Compute/virtualMachines";
  /** Fully qualified ARM url of the virtual machine represented by this Azure IaaS VM container. */
  virtualMachineId?: string;
  /** Specifies whether the container represents a Classic or an Azure Resource Manager VM. */
  virtualMachineVersion?: string;
  /** Resource group name of Recovery Services Vault. */
  resourceGroup?: string;
}

export function iaaSVMContainerSerializer(item: IaaSVMContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
  };
}

export function iaaSVMContainerDeserializer(item: any): IaaSVMContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
  };
}

/** Alias for IaaSVMContainerUnion */
export type IaaSVMContainerUnion =
  | AzureIaaSClassicComputeVMContainer
  | AzureIaaSComputeVMContainer
  | IaaSVMContainer;

export function iaaSVMContainerUnionSerializer(item: IaaSVMContainerUnion): any {
  switch (item.containerType) {
    case "Microsoft.ClassicCompute/virtualMachines":
      return azureIaaSClassicComputeVMContainerSerializer(
        item as AzureIaaSClassicComputeVMContainer,
      );

    case "Microsoft.Compute/virtualMachines":
      return azureIaaSComputeVMContainerSerializer(item as AzureIaaSComputeVMContainer);

    default:
      return iaaSVMContainerSerializer(item);
  }
}

export function iaaSVMContainerUnionDeserializer(item: any): IaaSVMContainerUnion {
  switch (item.containerType) {
    case "Microsoft.ClassicCompute/virtualMachines":
      return azureIaaSClassicComputeVMContainerDeserializer(
        item as AzureIaaSClassicComputeVMContainer,
      );

    case "Microsoft.Compute/virtualMachines":
      return azureIaaSComputeVMContainerDeserializer(item as AzureIaaSComputeVMContainer);

    default:
      return iaaSVMContainerDeserializer(item);
  }
}

/** IaaS VM workload-specific backup item representing an Azure Resource Manager virtual machine. */
export interface AzureIaaSComputeVMContainer extends IaaSVMContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "Microsoft.Compute/virtualMachines";
}

export function azureIaaSComputeVMContainerSerializer(item: AzureIaaSComputeVMContainer): any {
  return {
    containerType: item["containerType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

export function azureIaaSComputeVMContainerDeserializer(item: any): AzureIaaSComputeVMContainer {
  return {
    containerType: item["containerType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

/** Container for SQL workloads under SQL Availability Group. */
export interface AzureSqlagWorkloadContainerProtectionContainer extends AzureWorkloadContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "SQLAGWorkLoadContainer";
}

export function azureSqlagWorkloadContainerProtectionContainerSerializer(
  item: AzureSqlagWorkloadContainerProtectionContainer,
): any {
  return {
    containerType: item["containerType"],
    sourceResourceId: item["sourceResourceId"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : item["lastUpdatedTime"].toISOString(),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadContainerExtendedInfoSerializer(item["extendedInfo"]),
    workloadType: item["workloadType"],
    operationType: item["operationType"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

export function azureSqlagWorkloadContainerProtectionContainerDeserializer(
  item: any,
): AzureSqlagWorkloadContainerProtectionContainer {
  return {
    containerType: item["containerType"],
    sourceResourceId: item["sourceResourceId"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadContainerExtendedInfoDeserializer(item["extendedInfo"]),
    workloadType: item["workloadType"],
    operationType: item["operationType"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

/** Container for the workloads running inside Azure Compute or Classic Compute. */
export interface AzureWorkloadContainer extends ProtectionContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  /** The discriminator possible values: SQLAGWorkLoadContainer, VMAppContainer */
  containerType: "AzureWorkloadContainer" | "SQLAGWorkLoadContainer" | "VMAppContainer";
  /** ARM ID of the virtual machine represented by this Azure Workload Container */
  sourceResourceId?: string;
  /** Time stamp when this container was updated. */
  lastUpdatedTime?: Date;
  /** Additional details of a workload container. */
  extendedInfo?: AzureWorkloadContainerExtendedInfo;
  /** Workload type for which registration was sent. */
  workloadType?: WorkloadType;
  /** Re-Do Operation */
  operationType?: OperationType;
}

export function azureWorkloadContainerSerializer(item: AzureWorkloadContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    sourceResourceId: item["sourceResourceId"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : item["lastUpdatedTime"].toISOString(),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadContainerExtendedInfoSerializer(item["extendedInfo"]),
    workloadType: item["workloadType"],
    operationType: item["operationType"],
  };
}

export function azureWorkloadContainerDeserializer(item: any): AzureWorkloadContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    sourceResourceId: item["sourceResourceId"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadContainerExtendedInfoDeserializer(item["extendedInfo"]),
    workloadType: item["workloadType"],
    operationType: item["operationType"],
  };
}

/** Alias for AzureWorkloadContainerUnion */
export type AzureWorkloadContainerUnion =
  | AzureSqlagWorkloadContainerProtectionContainer
  | AzureVMAppContainerProtectionContainer
  | AzureWorkloadContainer;

export function azureWorkloadContainerUnionSerializer(item: AzureWorkloadContainerUnion): any {
  switch (item.containerType) {
    case "SQLAGWorkLoadContainer":
      return azureSqlagWorkloadContainerProtectionContainerSerializer(
        item as AzureSqlagWorkloadContainerProtectionContainer,
      );

    case "VMAppContainer":
      return azureVMAppContainerProtectionContainerSerializer(
        item as AzureVMAppContainerProtectionContainer,
      );

    default:
      return azureWorkloadContainerSerializer(item);
  }
}

export function azureWorkloadContainerUnionDeserializer(item: any): AzureWorkloadContainerUnion {
  switch (item.containerType) {
    case "SQLAGWorkLoadContainer":
      return azureSqlagWorkloadContainerProtectionContainerDeserializer(
        item as AzureSqlagWorkloadContainerProtectionContainer,
      );

    case "VMAppContainer":
      return azureVMAppContainerProtectionContainerDeserializer(
        item as AzureVMAppContainerProtectionContainer,
      );

    default:
      return azureWorkloadContainerDeserializer(item);
  }
}

/** Extended information of the container. */
export interface AzureWorkloadContainerExtendedInfo {
  /** Host Os Name in case of Stand Alone and Cluster Name in case of distributed container. */
  hostServerName?: string;
  /** Inquiry Status for the container. */
  inquiryInfo?: InquiryInfo;
  /** List of the nodes in case of distributed container. */
  nodesList?: DistributedNodesInfo[];
}

export function azureWorkloadContainerExtendedInfoSerializer(
  item: AzureWorkloadContainerExtendedInfo,
): any {
  return {
    hostServerName: item["hostServerName"],
    inquiryInfo: !item["inquiryInfo"]
      ? item["inquiryInfo"]
      : inquiryInfoSerializer(item["inquiryInfo"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArraySerializer(item["nodesList"]),
  };
}

export function azureWorkloadContainerExtendedInfoDeserializer(
  item: any,
): AzureWorkloadContainerExtendedInfo {
  return {
    hostServerName: item["hostServerName"],
    inquiryInfo: !item["inquiryInfo"]
      ? item["inquiryInfo"]
      : inquiryInfoDeserializer(item["inquiryInfo"]),
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
  };
}

/** Details about inquired protectable items under a given container. */
export interface InquiryInfo {
  /**
   * Inquiry Status for this container such as
   * InProgress | Failed | Succeeded
   */
  status?: string;
  /** Error Details if the Status is non-success. */
  errorDetail?: ErrorDetail;
  /**
   * Inquiry Details which will have workload specific details.
   * For e.g. - For SQL and oracle this will contain different details.
   */
  inquiryDetails?: WorkloadInquiryDetails[];
}

export function inquiryInfoSerializer(item: InquiryInfo): any {
  return {
    status: item["status"],
    errorDetail: !item["errorDetail"]
      ? item["errorDetail"]
      : errorDetailSerializer(item["errorDetail"]),
    inquiryDetails: !item["inquiryDetails"]
      ? item["inquiryDetails"]
      : workloadInquiryDetailsArraySerializer(item["inquiryDetails"]),
  };
}

export function inquiryInfoDeserializer(item: any): InquiryInfo {
  return {
    status: item["status"],
    errorDetail: !item["errorDetail"]
      ? item["errorDetail"]
      : errorDetailDeserializer(item["errorDetail"]),
    inquiryDetails: !item["inquiryDetails"]
      ? item["inquiryDetails"]
      : workloadInquiryDetailsArrayDeserializer(item["inquiryDetails"]),
  };
}

export function workloadInquiryDetailsArraySerializer(
  result: Array<WorkloadInquiryDetails>,
): any[] {
  return result.map((item) => {
    return workloadInquiryDetailsSerializer(item);
  });
}

export function workloadInquiryDetailsArrayDeserializer(
  result: Array<WorkloadInquiryDetails>,
): any[] {
  return result.map((item) => {
    return workloadInquiryDetailsDeserializer(item);
  });
}

/** Details of an inquired protectable item. */
export interface WorkloadInquiryDetails {
  /** Type of the Workload such as SQL, Oracle etc. */
  type?: string;
  /** Contains the protectable item Count inside this Container. */
  itemCount?: number;
  /** Inquiry validation such as permissions and other backup validations. */
  inquiryValidation?: InquiryValidation;
}

export function workloadInquiryDetailsSerializer(item: WorkloadInquiryDetails): any {
  return {
    type: item["type"],
    itemCount: item["itemCount"],
    inquiryValidation: !item["inquiryValidation"]
      ? item["inquiryValidation"]
      : inquiryValidationSerializer(item["inquiryValidation"]),
  };
}

export function workloadInquiryDetailsDeserializer(item: any): WorkloadInquiryDetails {
  return {
    type: item["type"],
    itemCount: item["itemCount"],
    inquiryValidation: !item["inquiryValidation"]
      ? item["inquiryValidation"]
      : inquiryValidationDeserializer(item["inquiryValidation"]),
  };
}

/** Validation for inquired protectable items under a given container. */
export interface InquiryValidation {
  /** Status for the Inquiry Validation. */
  status?: string;
  /** Error Detail in case the status is non-success. */
  errorDetail?: ErrorDetail;
  /** Error Additional Detail in case the status is non-success. */
  readonly additionalDetail?: string;
  /** Dictionary to store the count of ProtectableItems with key POType. */
  readonly protectableItemCount?: any;
}

export function inquiryValidationSerializer(item: InquiryValidation): any {
  return {
    status: item["status"],
    errorDetail: !item["errorDetail"]
      ? item["errorDetail"]
      : errorDetailSerializer(item["errorDetail"]),
  };
}

export function inquiryValidationDeserializer(item: any): InquiryValidation {
  return {
    status: item["status"],
    errorDetail: !item["errorDetail"]
      ? item["errorDetail"]
      : errorDetailDeserializer(item["errorDetail"]),
    additionalDetail: item["additionalDetail"],
    protectableItemCount: item["protectableItemCount"],
  };
}

/** Type of workload for the backup management */
export enum KnownWorkloadType {
  /** Invalid */
  Invalid = "Invalid",
  /** VM */
  VM = "VM",
  /** FileFolder */
  FileFolder = "FileFolder",
  /** AzureSqlDb */
  AzureSqlDb = "AzureSqlDb",
  /** SQLDB */
  Sqldb = "SQLDB",
  /** Exchange */
  Exchange = "Exchange",
  /** Sharepoint */
  Sharepoint = "Sharepoint",
  /** VMwareVM */
  VMwareVM = "VMwareVM",
  /** SystemState */
  SystemState = "SystemState",
  /** Client */
  Client = "Client",
  /** GenericDataSource */
  GenericDataSource = "GenericDataSource",
  /** SQLDataBase */
  SQLDataBase = "SQLDataBase",
  /** AzureFileShare */
  AzureFileShare = "AzureFileShare",
  /** SAPHanaDatabase */
  SAPHanaDatabase = "SAPHanaDatabase",
  /** SAPAseDatabase */
  SAPAseDatabase = "SAPAseDatabase",
  /** SAPHanaDBInstance */
  SAPHanaDBInstance = "SAPHanaDBInstance",
}

/**
 * Type of workload for the backup management \
 * {@link KnownWorkloadType} can be used interchangeably with WorkloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **VM** \
 * **FileFolder** \
 * **AzureSqlDb** \
 * **SQLDB** \
 * **Exchange** \
 * **Sharepoint** \
 * **VMwareVM** \
 * **SystemState** \
 * **Client** \
 * **GenericDataSource** \
 * **SQLDataBase** \
 * **AzureFileShare** \
 * **SAPHanaDatabase** \
 * **SAPAseDatabase** \
 * **SAPHanaDBInstance**
 */
export type WorkloadType = string;

/** Re-Do Operation */
export enum KnownOperationType {
  /** Invalid */
  Invalid = "Invalid",
  /** Register */
  Register = "Register",
  /** Reregister */
  Reregister = "Reregister",
  /** Rehydrate */
  Rehydrate = "Rehydrate",
}

/**
 * Re-Do Operation \
 * {@link KnownOperationType} can be used interchangeably with OperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Register** \
 * **Reregister** \
 * **Rehydrate**
 */
export type OperationType = string;

/** Container for SQL workloads under Azure Virtual Machines. */
export interface AzureVMAppContainerProtectionContainer extends AzureWorkloadContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "VMAppContainer";
}

export function azureVMAppContainerProtectionContainerSerializer(
  item: AzureVMAppContainerProtectionContainer,
): any {
  return {
    containerType: item["containerType"],
    sourceResourceId: item["sourceResourceId"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : item["lastUpdatedTime"].toISOString(),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadContainerExtendedInfoSerializer(item["extendedInfo"]),
    workloadType: item["workloadType"],
    operationType: item["operationType"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

export function azureVMAppContainerProtectionContainerDeserializer(
  item: any,
): AzureVMAppContainerProtectionContainer {
  return {
    containerType: item["containerType"],
    sourceResourceId: item["sourceResourceId"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadContainerExtendedInfoDeserializer(item["extendedInfo"]),
    workloadType: item["workloadType"],
    operationType: item["operationType"],
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    protectableObjectType: item["protectableObjectType"],
  };
}

/** Azure Sql workload-specific container. */
export interface AzureSqlContainer extends ProtectionContainer {
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "AzureSqlContainer";
}

export function azureSqlContainerSerializer(item: AzureSqlContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
  };
}

export function azureSqlContainerDeserializer(item: any): AzureSqlContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
  };
}

/** Azure Storage Account workload-specific container. */
export interface AzureStorageContainer extends ProtectionContainer {
  /** Fully qualified ARM url. */
  sourceResourceId?: string;
  /** Storage account version. */
  storageAccountVersion?: string;
  /** Resource group name of Recovery Services Vault. */
  resourceGroup?: string;
  /** Number of items backed up in this container. */
  protectedItemCount?: number;
  /** Whether storage account lock is to be acquired for this container or not. */
  acquireStorageAccountLock?: AcquireStorageAccountLock;
  /** Re-Do Operation */
  operationType?: OperationType;
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "StorageContainer";
}

export function azureStorageContainerSerializer(item: AzureStorageContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    sourceResourceId: item["sourceResourceId"],
    storageAccountVersion: item["storageAccountVersion"],
    resourceGroup: item["resourceGroup"],
    protectedItemCount: item["protectedItemCount"],
    acquireStorageAccountLock: item["acquireStorageAccountLock"],
    operationType: item["operationType"],
  };
}

export function azureStorageContainerDeserializer(item: any): AzureStorageContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    sourceResourceId: item["sourceResourceId"],
    storageAccountVersion: item["storageAccountVersion"],
    resourceGroup: item["resourceGroup"],
    protectedItemCount: item["protectedItemCount"],
    acquireStorageAccountLock: item["acquireStorageAccountLock"],
    operationType: item["operationType"],
  };
}

/** Whether storage account lock is to be acquired for this container or not. */
export enum KnownAcquireStorageAccountLock {
  /** Acquire */
  Acquire = "Acquire",
  /** NotAcquire */
  NotAcquire = "NotAcquire",
}

/**
 * Whether storage account lock is to be acquired for this container or not. \
 * {@link KnownAcquireStorageAccountLock} can be used interchangeably with AcquireStorageAccountLock,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Acquire** \
 * **NotAcquire**
 */
export type AcquireStorageAccountLock = string;

/** Base class for generic container of backup items */
export interface GenericContainer extends ProtectionContainer {
  /** Name of the container's fabric */
  fabricName?: string;
  /** Extended information (not returned in List container API calls) */
  extendedInformation?: GenericContainerExtendedInfo;
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "GenericContainer";
}

export function genericContainerSerializer(item: GenericContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    fabricName: item["fabricName"],
    extendedInformation: !item["extendedInformation"]
      ? item["extendedInformation"]
      : genericContainerExtendedInfoSerializer(item["extendedInformation"]),
  };
}

export function genericContainerDeserializer(item: any): GenericContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    fabricName: item["fabricName"],
    extendedInformation: !item["extendedInformation"]
      ? item["extendedInformation"]
      : genericContainerExtendedInfoDeserializer(item["extendedInformation"]),
  };
}

/** Container extended information */
export interface GenericContainerExtendedInfo {
  /** Public key of container cert */
  rawCertData?: string;
  /** Container identity information */
  containerIdentityInfo?: ContainerIdentityInfo;
  /** Azure Backup Service Endpoints for the container */
  serviceEndpoints?: Record<string, string>;
}

export function genericContainerExtendedInfoSerializer(item: GenericContainerExtendedInfo): any {
  return {
    rawCertData: item["rawCertData"],
    containerIdentityInfo: !item["containerIdentityInfo"]
      ? item["containerIdentityInfo"]
      : containerIdentityInfoSerializer(item["containerIdentityInfo"]),
    serviceEndpoints: item["serviceEndpoints"],
  };
}

export function genericContainerExtendedInfoDeserializer(item: any): GenericContainerExtendedInfo {
  return {
    rawCertData: item["rawCertData"],
    containerIdentityInfo: !item["containerIdentityInfo"]
      ? item["containerIdentityInfo"]
      : containerIdentityInfoDeserializer(item["containerIdentityInfo"]),
    serviceEndpoints: !item["serviceEndpoints"]
      ? item["serviceEndpoints"]
      : Object.fromEntries(
          Object.entries(item["serviceEndpoints"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Container identity information */
export interface ContainerIdentityInfo {
  /** Unique name of the container */
  uniqueName?: string;
  /** Protection container identity - AAD Tenant */
  aadTenantId?: string;
  /** Protection container identity - AAD Service Principal */
  servicePrincipalClientId?: string;
  /** Protection container identity - Audience */
  audience?: string;
}

export function containerIdentityInfoSerializer(item: ContainerIdentityInfo): any {
  return {
    uniqueName: item["uniqueName"],
    aadTenantId: item["aadTenantId"],
    servicePrincipalClientId: item["servicePrincipalClientId"],
    audience: item["audience"],
  };
}

export function containerIdentityInfoDeserializer(item: any): ContainerIdentityInfo {
  return {
    uniqueName: item["uniqueName"],
    aadTenantId: item["aadTenantId"],
    servicePrincipalClientId: item["servicePrincipalClientId"],
    audience: item["audience"],
  };
}

/** Container with items backed up using MAB backup engine. */
export interface MabContainer extends ProtectionContainer {
  /** Can the container be registered one more time. */
  canReRegister?: boolean;
  /** ContainerID represents the container. */
  containerId?: number;
  /** Number of items backed up in this container. */
  protectedItemCount?: number;
  /** Agent version of this container. */
  agentVersion?: string;
  /** Additional information for this container */
  extendedInfo?: MabContainerExtendedInfo;
  /** Health details on this mab container. */
  mabContainerHealthDetails?: MABContainerHealthDetails[];
  /** Health state of mab container. */
  containerHealthState?: string;
  /**
   * Type of the container. The value of this property for: 1. Compute Azure VM is Microsoft.Compute/virtualMachines 2.
   * Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines 3. Windows machines (like MAB, DPM etc) is
   * Windows 4. Azure SQL instance is AzureSqlContainer. 5. Storage containers is StorageContainer. 6. Azure workload
   * Backup is VMAppContainer
   */
  containerType: "Windows";
}

export function mabContainerSerializer(item: MabContainer): any {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    canReRegister: item["canReRegister"],
    containerId: item["containerId"],
    protectedItemCount: item["protectedItemCount"],
    agentVersion: item["agentVersion"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : mabContainerExtendedInfoSerializer(item["extendedInfo"]),
    mabContainerHealthDetails: !item["mabContainerHealthDetails"]
      ? item["mabContainerHealthDetails"]
      : mabContainerHealthDetailsArraySerializer(item["mabContainerHealthDetails"]),
    containerHealthState: item["containerHealthState"],
  };
}

export function mabContainerDeserializer(item: any): MabContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    healthStatus: item["healthStatus"],
    containerType: item["containerType"],
    protectableObjectType: item["protectableObjectType"],
    canReRegister: item["canReRegister"],
    containerId: item["containerId"],
    protectedItemCount: item["protectedItemCount"],
    agentVersion: item["agentVersion"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : mabContainerExtendedInfoDeserializer(item["extendedInfo"]),
    mabContainerHealthDetails: !item["mabContainerHealthDetails"]
      ? item["mabContainerHealthDetails"]
      : mabContainerHealthDetailsArrayDeserializer(item["mabContainerHealthDetails"]),
    containerHealthState: item["containerHealthState"],
  };
}

/** Additional information of the container. */
export interface MabContainerExtendedInfo {
  /** Time stamp when this container was refreshed. */
  lastRefreshedAt?: Date;
  /** Type of backup items associated with this container. */
  backupItemType?: BackupItemType;
  /** List of backup items associated with this container. */
  backupItems?: string[];
  /** Backup policy associated with this container. */
  policyName?: string;
  /** Latest backup status of this container. */
  lastBackupStatus?: string;
}

export function mabContainerExtendedInfoSerializer(item: MabContainerExtendedInfo): any {
  return {
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : item["lastRefreshedAt"].toISOString(),
    backupItemType: item["backupItemType"],
    backupItems: !item["backupItems"]
      ? item["backupItems"]
      : item["backupItems"].map((p: any) => {
          return p;
        }),
    policyName: item["policyName"],
    lastBackupStatus: item["lastBackupStatus"],
  };
}

export function mabContainerExtendedInfoDeserializer(item: any): MabContainerExtendedInfo {
  return {
    lastRefreshedAt: !item["lastRefreshedAt"]
      ? item["lastRefreshedAt"]
      : new Date(item["lastRefreshedAt"]),
    backupItemType: item["backupItemType"],
    backupItems: !item["backupItems"]
      ? item["backupItems"]
      : item["backupItems"].map((p: any) => {
          return p;
        }),
    policyName: item["policyName"],
    lastBackupStatus: item["lastBackupStatus"],
  };
}

/** Type of backup items associated with this container. */
export enum KnownBackupItemType {
  /** Invalid */
  Invalid = "Invalid",
  /** VM */
  VM = "VM",
  /** FileFolder */
  FileFolder = "FileFolder",
  /** AzureSqlDb */
  AzureSqlDb = "AzureSqlDb",
  /** SQLDB */
  Sqldb = "SQLDB",
  /** Exchange */
  Exchange = "Exchange",
  /** Sharepoint */
  Sharepoint = "Sharepoint",
  /** VMwareVM */
  VMwareVM = "VMwareVM",
  /** SystemState */
  SystemState = "SystemState",
  /** Client */
  Client = "Client",
  /** GenericDataSource */
  GenericDataSource = "GenericDataSource",
  /** SQLDataBase */
  SQLDataBase = "SQLDataBase",
  /** AzureFileShare */
  AzureFileShare = "AzureFileShare",
  /** SAPHanaDatabase */
  SAPHanaDatabase = "SAPHanaDatabase",
  /** SAPAseDatabase */
  SAPAseDatabase = "SAPAseDatabase",
  /** SAPHanaDBInstance */
  SAPHanaDBInstance = "SAPHanaDBInstance",
}

/**
 * Type of backup items associated with this container. \
 * {@link KnownBackupItemType} can be used interchangeably with BackupItemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **VM** \
 * **FileFolder** \
 * **AzureSqlDb** \
 * **SQLDB** \
 * **Exchange** \
 * **Sharepoint** \
 * **VMwareVM** \
 * **SystemState** \
 * **Client** \
 * **GenericDataSource** \
 * **SQLDataBase** \
 * **AzureFileShare** \
 * **SAPHanaDatabase** \
 * **SAPAseDatabase** \
 * **SAPHanaDBInstance**
 */
export type BackupItemType = string;

export function mabContainerHealthDetailsArraySerializer(
  result: Array<MABContainerHealthDetails>,
): any[] {
  return result.map((item) => {
    return mabContainerHealthDetailsSerializer(item);
  });
}

export function mabContainerHealthDetailsArrayDeserializer(
  result: Array<MABContainerHealthDetails>,
): any[] {
  return result.map((item) => {
    return mabContainerHealthDetailsDeserializer(item);
  });
}

/** MAB workload-specific Health Details. */
export interface MABContainerHealthDetails {
  /** Health Code */
  code?: number;
  /** Health Title */
  title?: string;
  /** Health Message */
  message?: string;
  /** Health Recommended Actions */
  recommendations?: string[];
}

export function mabContainerHealthDetailsSerializer(item: MABContainerHealthDetails): any {
  return {
    code: item["code"],
    title: item["title"],
    message: item["message"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

export function mabContainerHealthDetailsDeserializer(item: any): MABContainerHealthDetails {
  return {
    code: item["code"],
    title: item["title"],
    message: item["message"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** List of WorkloadItem resources */
export interface _WorkloadItemResourceList extends ResourceList {
  /** List of resources. */
  value?: WorkloadItemResource[];
}

export function _workloadItemResourceListDeserializer(item: any): _WorkloadItemResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : workloadItemResourceArrayDeserializer(item["value"]),
  };
}

export function workloadItemResourceArrayDeserializer(result: Array<WorkloadItemResource>): any[] {
  return result.map((item) => {
    return workloadItemResourceDeserializer(item);
  });
}

/** Base class for backup item. Workload-specific backup items are derived from this class. */
export interface WorkloadItemResource extends Resource {
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Optional ETag. */
  eTag?: string;
  /** WorkloadItemResource properties */
  properties?: WorkloadItemUnion;
}

export function workloadItemResourceDeserializer(item: any): WorkloadItemResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    eTag: item["eTag"],
    properties: !item["properties"]
      ? item["properties"]
      : workloadItemUnionDeserializer(item["properties"]),
  };
}

/** Base class for backup item. Workload-specific backup items are derived from this class. */
export interface WorkloadItem {
  /** Type of backup management to backup an item. */
  backupManagementType?: string;
  /** Type of workload for the backup management */
  workloadType?: string;
  /** Type of the backup item. */
  /** The discriminator possible values: AzureVmWorkloadItem, SAPAseDatabase, SAPAseSystem, SAPHanaDatabase, SAPHanaSystem, SQLDataBase, SQLInstance */
  workloadItemType: string;
  /** Friendly name of the backup item. */
  friendlyName?: string;
  /** State of the back up item. */
  protectionState?: ProtectionStatus;
}

export function workloadItemDeserializer(item: any): WorkloadItem {
  return {
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    workloadItemType: item["workloadItemType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Alias for WorkloadItemUnion */
export type WorkloadItemUnion = AzureVmWorkloadItemUnion | WorkloadItem;

export function workloadItemUnionDeserializer(item: any): WorkloadItemUnion {
  switch (item.workloadItemType) {
    case "AzureVmWorkloadItem":
    case "SAPAseDatabase":
    case "SAPAseSystem":
    case "SAPHanaDatabase":
    case "SAPHanaSystem":
    case "SQLDataBase":
    case "SQLInstance":
      return azureVmWorkloadItemUnionDeserializer(item as AzureVmWorkloadItemUnion);

    default:
      return workloadItemDeserializer(item);
  }
}

/** Specifies whether the container is registered or not */
export enum KnownProtectionStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** NotProtected */
  NotProtected = "NotProtected",
  /** Protecting */
  Protecting = "Protecting",
  /** Protected */
  Protected = "Protected",
  /** ProtectionFailed */
  ProtectionFailed = "ProtectionFailed",
}

/**
 * Specifies whether the container is registered or not \
 * {@link KnownProtectionStatus} can be used interchangeably with ProtectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **NotProtected** \
 * **Protecting** \
 * **Protected** \
 * **ProtectionFailed**
 */
export type ProtectionStatus = string;

/** Azure VM workload-specific workload item. */
export interface AzureVmWorkloadItem extends WorkloadItem {
  /** Type of the backup item. */
  /** The discriminator possible values: SAPAseDatabase, SAPAseSystem, SAPHanaDatabase, SAPHanaSystem, SQLDataBase, SQLInstance */
  workloadItemType:
    | "AzureVmWorkloadItem"
    | "SAPAseDatabase"
    | "SAPAseSystem"
    | "SAPHanaDatabase"
    | "SAPHanaSystem"
    | "SQLDataBase"
    | "SQLInstance";
  /** Name for instance or AG */
  parentName?: string;
  /** Host/Cluster Name for instance or AG */
  serverName?: string;
  /** Indicates if workload item is auto-protectable */
  isAutoProtectable?: boolean;
  /** For instance or AG, indicates number of DB's present */
  subinquireditemcount?: number;
  /** For instance or AG, indicates number of DB's to be protected */
  subWorkloadItemCount?: number;
}

export function azureVmWorkloadItemDeserializer(item: any): AzureVmWorkloadItem {
  return {
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    workloadItemType: item["workloadItemType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
    parentName: item["parentName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    subinquireditemcount: item["subinquireditemcount"],
    subWorkloadItemCount: item["subWorkloadItemCount"],
  };
}

/** Alias for AzureVmWorkloadItemUnion */
export type AzureVmWorkloadItemUnion =
  | AzureVmWorkloadSAPAseDatabaseWorkloadItem
  | AzureVmWorkloadSAPAseSystemWorkloadItem
  | AzureVmWorkloadSAPHanaDatabaseWorkloadItem
  | AzureVmWorkloadSAPHanaSystemWorkloadItem
  | AzureVmWorkloadSQLDatabaseWorkloadItem
  | AzureVmWorkloadSQLInstanceWorkloadItem
  | AzureVmWorkloadItem;

export function azureVmWorkloadItemUnionDeserializer(item: any): AzureVmWorkloadItemUnion {
  switch (item.workloadItemType) {
    case "SAPAseDatabase":
      return azureVmWorkloadSAPAseDatabaseWorkloadItemDeserializer(
        item as AzureVmWorkloadSAPAseDatabaseWorkloadItem,
      );

    case "SAPAseSystem":
      return azureVmWorkloadSAPAseSystemWorkloadItemDeserializer(
        item as AzureVmWorkloadSAPAseSystemWorkloadItem,
      );

    case "SAPHanaDatabase":
      return azureVmWorkloadSAPHanaDatabaseWorkloadItemDeserializer(
        item as AzureVmWorkloadSAPHanaDatabaseWorkloadItem,
      );

    case "SAPHanaSystem":
      return azureVmWorkloadSAPHanaSystemWorkloadItemDeserializer(
        item as AzureVmWorkloadSAPHanaSystemWorkloadItem,
      );

    case "SQLDataBase":
      return azureVmWorkloadSQLDatabaseWorkloadItemDeserializer(
        item as AzureVmWorkloadSQLDatabaseWorkloadItem,
      );

    case "SQLInstance":
      return azureVmWorkloadSQLInstanceWorkloadItemDeserializer(
        item as AzureVmWorkloadSQLInstanceWorkloadItem,
      );

    default:
      return azureVmWorkloadItemDeserializer(item);
  }
}

/** Azure VM workload-specific workload item representing SAP ASE Database. */
export interface AzureVmWorkloadSAPAseDatabaseWorkloadItem extends AzureVmWorkloadItem {
  /** Type of the backup item. */
  workloadItemType: "SAPAseDatabase";
}

export function azureVmWorkloadSAPAseDatabaseWorkloadItemDeserializer(
  item: any,
): AzureVmWorkloadSAPAseDatabaseWorkloadItem {
  return {
    workloadItemType: item["workloadItemType"],
    parentName: item["parentName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    subinquireditemcount: item["subinquireditemcount"],
    subWorkloadItemCount: item["subWorkloadItemCount"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific workload item representing SAP ASE System. */
export interface AzureVmWorkloadSAPAseSystemWorkloadItem extends AzureVmWorkloadItem {
  /** Type of the backup item. */
  workloadItemType: "SAPAseSystem";
}

export function azureVmWorkloadSAPAseSystemWorkloadItemDeserializer(
  item: any,
): AzureVmWorkloadSAPAseSystemWorkloadItem {
  return {
    workloadItemType: item["workloadItemType"],
    parentName: item["parentName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    subinquireditemcount: item["subinquireditemcount"],
    subWorkloadItemCount: item["subWorkloadItemCount"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific workload item representing SAP HANA Database. */
export interface AzureVmWorkloadSAPHanaDatabaseWorkloadItem extends AzureVmWorkloadItem {
  /** Type of the backup item. */
  workloadItemType: "SAPHanaDatabase";
}

export function azureVmWorkloadSAPHanaDatabaseWorkloadItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaDatabaseWorkloadItem {
  return {
    workloadItemType: item["workloadItemType"],
    parentName: item["parentName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    subinquireditemcount: item["subinquireditemcount"],
    subWorkloadItemCount: item["subWorkloadItemCount"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific workload item representing SAP HANA System. */
export interface AzureVmWorkloadSAPHanaSystemWorkloadItem extends AzureVmWorkloadItem {
  /** Type of the backup item. */
  workloadItemType: "SAPHanaSystem";
}

export function azureVmWorkloadSAPHanaSystemWorkloadItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaSystemWorkloadItem {
  return {
    workloadItemType: item["workloadItemType"],
    parentName: item["parentName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    subinquireditemcount: item["subinquireditemcount"],
    subWorkloadItemCount: item["subWorkloadItemCount"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific workload item representing SQL Database. */
export interface AzureVmWorkloadSQLDatabaseWorkloadItem extends AzureVmWorkloadItem {
  /** Type of the backup item. */
  workloadItemType: "SQLDataBase";
}

export function azureVmWorkloadSQLDatabaseWorkloadItemDeserializer(
  item: any,
): AzureVmWorkloadSQLDatabaseWorkloadItem {
  return {
    workloadItemType: item["workloadItemType"],
    parentName: item["parentName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    subinquireditemcount: item["subinquireditemcount"],
    subWorkloadItemCount: item["subWorkloadItemCount"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific workload item representing SQL Instance. */
export interface AzureVmWorkloadSQLInstanceWorkloadItem extends AzureVmWorkloadItem {
  /** Type of the backup item. */
  workloadItemType: "SQLInstance";
  /** Data Directory Paths for default directories */
  dataDirectoryPaths?: SQLDataDirectory[];
}

export function azureVmWorkloadSQLInstanceWorkloadItemDeserializer(
  item: any,
): AzureVmWorkloadSQLInstanceWorkloadItem {
  return {
    workloadItemType: item["workloadItemType"],
    parentName: item["parentName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    subinquireditemcount: item["subinquireditemcount"],
    subWorkloadItemCount: item["subWorkloadItemCount"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
    dataDirectoryPaths: !item["dataDirectoryPaths"]
      ? item["dataDirectoryPaths"]
      : sqlDataDirectoryArrayDeserializer(item["dataDirectoryPaths"]),
  };
}

/** Patch Request content to update recovery point for given RecoveryPointId */
export interface UpdateRecoveryPointRequest {
  /** Resource properties. */
  properties?: PatchRecoveryPointInput;
}

export function updateRecoveryPointRequestSerializer(item: UpdateRecoveryPointRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : patchRecoveryPointInputSerializer(item["properties"]),
  };
}

/** Recovery Point Contract for Update Recovery Point API. */
export interface PatchRecoveryPointInput {
  /** Properties of Recovery Point */
  recoveryPointProperties?: PatchRecoveryPointPropertiesInput;
}

export function patchRecoveryPointInputSerializer(item: PatchRecoveryPointInput): any {
  return {
    recoveryPointProperties: !item["recoveryPointProperties"]
      ? item["recoveryPointProperties"]
      : patchRecoveryPointPropertiesInputSerializer(item["recoveryPointProperties"]),
  };
}

/** Recovery Point Properties Contract for Update Recovery Point API. */
export interface PatchRecoveryPointPropertiesInput {
  /** Expiry time of Recovery Point in UTC. */
  expiryTime?: Date;
}

export function patchRecoveryPointPropertiesInputSerializer(
  item: PatchRecoveryPointPropertiesInput,
): any {
  return {
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
  };
}

/** Base class for restore request. Workload-specific restore requests are derived from this class. */
export interface RestoreRequestResource extends Resource {
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Optional ETag. */
  eTag?: string;
  /** RestoreRequestResource properties */
  properties?: RestoreRequestUnion;
}

export function restoreRequestResourceSerializer(item: RestoreRequestResource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    eTag: item["eTag"],
    properties: !item["properties"]
      ? item["properties"]
      : restoreRequestUnionSerializer(item["properties"]),
  };
}

/** Base class for restore request. Workload-specific restore requests are derived from this class. */
export interface RestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureFileShareRestoreRequest, AzureWorkloadPointInTimeRestoreRequest, AzureWorkloadRestoreRequest, AzureWorkloadSAPHanaPointInTimeRestoreRequest, AzureWorkloadSAPHanaRestoreRequest, AzureWorkloadSAPAsePointInTimeRestoreRequest, AzureWorkloadSAPAseRestoreRequest, AzureWorkloadSQLPointInTimeRestoreRequest, AzureWorkloadSQLRestoreRequest, IaasVMRestoreRequest, AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest, AzureWorkloadSAPHanaRestoreWithRehydrateRequest, AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest, AzureWorkloadSQLRestoreWithRehydrateRequest, IaasVMRestoreWithRehydrationRequest */
  objectType: string;
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
}

export function restoreRequestSerializer(item: RestoreRequest): any {
  return {
    objectType: item["objectType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for RestoreRequestUnion */
export type RestoreRequestUnion =
  | AzureFileShareRestoreRequest
  | AzureWorkloadRestoreRequestUnion
  | IaasVMRestoreRequestUnion
  | RestoreRequest;

export function restoreRequestUnionSerializer(item: RestoreRequestUnion): any {
  switch (item.objectType) {
    case "AzureFileShareRestoreRequest":
      return azureFileShareRestoreRequestSerializer(item as AzureFileShareRestoreRequest);

    case "AzureWorkloadRestoreRequest":
    case "AzureWorkloadPointInTimeRestoreRequest":
    case "AzureWorkloadSAPHanaRestoreRequest":
    case "AzureWorkloadSAPAseRestoreRequest":
    case "AzureWorkloadSQLRestoreRequest":
    case "AzureWorkloadSAPHanaPointInTimeRestoreRequest":
    case "AzureWorkloadSAPHanaRestoreWithRehydrateRequest":
    case "AzureWorkloadSAPAsePointInTimeRestoreRequest":
    case "AzureWorkloadSQLPointInTimeRestoreRequest":
    case "AzureWorkloadSQLRestoreWithRehydrateRequest":
    case "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest":
    case "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest":
      return azureWorkloadRestoreRequestUnionSerializer(item as AzureWorkloadRestoreRequestUnion);

    case "IaasVMRestoreRequest":
    case "IaasVMRestoreWithRehydrationRequest":
      return iaasVMRestoreRequestUnionSerializer(item as IaasVMRestoreRequestUnion);

    default:
      return restoreRequestSerializer(item);
  }
}

/** AzureFileShare Restore Request */
export interface AzureFileShareRestoreRequest extends RestoreRequest {
  /** Type of this recovery. */
  recoveryType?: RecoveryType;
  /** Source storage account ARM Id */
  sourceResourceId?: string;
  /** Options to resolve copy conflicts. */
  copyOptions?: CopyOptions;
  /** Restore Type (FullShareRestore or ItemLevelRestore) */
  restoreRequestType?: RestoreRequestType;
  /** List of Source Files/Folders(which need to recover) and TargetFolderPath details */
  restoreFileSpecs?: RestoreFileSpecs[];
  /** Target File Share Details */
  targetDetails?: TargetAFSRestoreInfo;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureFileShareRestoreRequest";
}

export function azureFileShareRestoreRequestSerializer(item: AzureFileShareRestoreRequest): any {
  return {
    objectType: item["objectType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    copyOptions: item["copyOptions"],
    restoreRequestType: item["restoreRequestType"],
    restoreFileSpecs: !item["restoreFileSpecs"]
      ? item["restoreFileSpecs"]
      : restoreFileSpecsArraySerializer(item["restoreFileSpecs"]),
    targetDetails: !item["targetDetails"]
      ? item["targetDetails"]
      : targetAFSRestoreInfoSerializer(item["targetDetails"]),
  };
}

/** Type of this recovery. */
export enum KnownRecoveryType {
  /** Invalid */
  Invalid = "Invalid",
  /** OriginalLocation */
  OriginalLocation = "OriginalLocation",
  /** AlternateLocation */
  AlternateLocation = "AlternateLocation",
  /** RestoreDisks */
  RestoreDisks = "RestoreDisks",
  /** Offline */
  Offline = "Offline",
}

/**
 * Type of this recovery. \
 * {@link KnownRecoveryType} can be used interchangeably with RecoveryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **OriginalLocation** \
 * **AlternateLocation** \
 * **RestoreDisks** \
 * **Offline**
 */
export type RecoveryType = string;

/** Options to resolve copy conflicts. */
export enum KnownCopyOptions {
  /** Invalid */
  Invalid = "Invalid",
  /** CreateCopy */
  CreateCopy = "CreateCopy",
  /** Skip */
  Skip = "Skip",
  /** Overwrite */
  Overwrite = "Overwrite",
  /** FailOnConflict */
  FailOnConflict = "FailOnConflict",
}

/**
 * Options to resolve copy conflicts. \
 * {@link KnownCopyOptions} can be used interchangeably with CopyOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **CreateCopy** \
 * **Skip** \
 * **Overwrite** \
 * **FailOnConflict**
 */
export type CopyOptions = string;

/** Restore Type (FullShareRestore or ItemLevelRestore) */
export enum KnownRestoreRequestType {
  /** Invalid */
  Invalid = "Invalid",
  /** FullShareRestore */
  FullShareRestore = "FullShareRestore",
  /** ItemLevelRestore */
  ItemLevelRestore = "ItemLevelRestore",
}

/**
 * Restore Type (FullShareRestore or ItemLevelRestore) \
 * {@link KnownRestoreRequestType} can be used interchangeably with RestoreRequestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **FullShareRestore** \
 * **ItemLevelRestore**
 */
export type RestoreRequestType = string;

export function restoreFileSpecsArraySerializer(result: Array<RestoreFileSpecs>): any[] {
  return result.map((item) => {
    return restoreFileSpecsSerializer(item);
  });
}

/** Restore file specs like file path, type and target folder path info. */
export interface RestoreFileSpecs {
  /** Source File/Folder path */
  path?: string;
  /** Indicates what the Path variable stands for */
  fileSpecType?: string;
  /** Destination folder path in target FileShare */
  targetFolderPath?: string;
}

export function restoreFileSpecsSerializer(item: RestoreFileSpecs): any {
  return {
    path: item["path"],
    fileSpecType: item["fileSpecType"],
    targetFolderPath: item["targetFolderPath"],
  };
}

/** Target Azure File Share Info. */
export interface TargetAFSRestoreInfo {
  /** File share name */
  name?: string;
  /** Target file share resource ARM ID */
  targetResourceId?: string;
}

export function targetAFSRestoreInfoSerializer(item: TargetAFSRestoreInfo): any {
  return { name: item["name"], targetResourceId: item["targetResourceId"] };
}

/** AzureWorkload SAP Hana -specific restore. Specifically for PointInTime/Log restore */
export interface AzureWorkloadPointInTimeRestoreRequest extends AzureWorkloadRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadPointInTimeRestoreRequest";
  /** PointInTime value */
  pointInTime?: Date;
}

export function azureWorkloadPointInTimeRestoreRequestSerializer(
  item: AzureWorkloadPointInTimeRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    pointInTime: !item["pointInTime"] ? item["pointInTime"] : item["pointInTime"].toISOString(),
  };
}

/** AzureWorkload-specific restore. */
export interface AzureWorkloadRestoreRequest extends RestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadPointInTimeRestoreRequest, AzureWorkloadSAPHanaPointInTimeRestoreRequest, AzureWorkloadSAPHanaRestoreRequest, AzureWorkloadSAPAsePointInTimeRestoreRequest, AzureWorkloadSAPAseRestoreRequest, AzureWorkloadSQLPointInTimeRestoreRequest, AzureWorkloadSQLRestoreRequest, AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest, AzureWorkloadSAPHanaRestoreWithRehydrateRequest, AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest, AzureWorkloadSQLRestoreWithRehydrateRequest */
  objectType:
    | "AzureWorkloadRestoreRequest"
    | "AzureWorkloadPointInTimeRestoreRequest"
    | "AzureWorkloadSAPHanaRestoreRequest"
    | "AzureWorkloadSAPAseRestoreRequest"
    | "AzureWorkloadSQLRestoreRequest"
    | "AzureWorkloadSAPHanaPointInTimeRestoreRequest"
    | "AzureWorkloadSAPHanaRestoreWithRehydrateRequest"
    | "AzureWorkloadSAPAsePointInTimeRestoreRequest"
    | "AzureWorkloadSQLPointInTimeRestoreRequest"
    | "AzureWorkloadSQLRestoreWithRehydrateRequest"
    | "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest"
    | "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest";
  /** Type of this recovery. */
  recoveryType?: RecoveryType;
  /** Fully qualified ARM ID of the VM on which workload that was running is being recovered. */
  sourceResourceId?: string;
  /** Workload specific property bag. */
  propertyBag?: Record<string, string>;
  /** Details of target database */
  targetInfo?: TargetRestoreInfo;
  /** Defines whether the current recovery mode is file restore or database restore */
  recoveryMode?: RecoveryMode;
  /** Defines the Resource group of the Target VM */
  targetResourceGroupName?: string;
  /**
   * User Assigned managed identity details
   * Currently used for snapshot.
   */
  userAssignedManagedIdentityDetails?: UserAssignedManagedIdentityDetails;
  /**
   * Additional details for snapshot recovery
   * Currently used for snapshot for SAP Hana.
   */
  snapshotRestoreParameters?: SnapshotRestoreParameters;
  /**
   * This is the complete ARM Id of the target VM
   * For e.g. /subscriptions/{subId}/resourcegroups/{rg}/provider/Microsoft.Compute/virtualmachines/{vm}
   */
  targetVirtualMachineId?: string;
}

export function azureWorkloadRestoreRequestSerializer(item: AzureWorkloadRestoreRequest): any {
  return {
    objectType: item["objectType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
  };
}

/** Alias for AzureWorkloadRestoreRequestUnion */
export type AzureWorkloadRestoreRequestUnion =
  | AzureWorkloadPointInTimeRestoreRequest
  | AzureWorkloadSAPHanaRestoreRequestUnion
  | AzureWorkloadSAPAseRestoreRequestUnion
  | AzureWorkloadSQLRestoreRequestUnion
  | AzureWorkloadRestoreRequest;

export function azureWorkloadRestoreRequestUnionSerializer(
  item: AzureWorkloadRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureWorkloadPointInTimeRestoreRequest":
      return azureWorkloadPointInTimeRestoreRequestSerializer(
        item as AzureWorkloadPointInTimeRestoreRequest,
      );

    case "AzureWorkloadSAPHanaRestoreRequest":
    case "AzureWorkloadSAPHanaPointInTimeRestoreRequest":
    case "AzureWorkloadSAPHanaRestoreWithRehydrateRequest":
    case "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest":
      return azureWorkloadSAPHanaRestoreRequestUnionSerializer(
        item as AzureWorkloadSAPHanaRestoreRequestUnion,
      );

    case "AzureWorkloadSAPAseRestoreRequest":
    case "AzureWorkloadSAPAsePointInTimeRestoreRequest":
      return azureWorkloadSAPAseRestoreRequestUnionSerializer(
        item as AzureWorkloadSAPAseRestoreRequestUnion,
      );

    case "AzureWorkloadSQLRestoreRequest":
    case "AzureWorkloadSQLPointInTimeRestoreRequest":
    case "AzureWorkloadSQLRestoreWithRehydrateRequest":
    case "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest":
      return azureWorkloadSQLRestoreRequestUnionSerializer(
        item as AzureWorkloadSQLRestoreRequestUnion,
      );

    default:
      return azureWorkloadRestoreRequestSerializer(item);
  }
}

/** Details about target workload during restore operation. */
export interface TargetRestoreInfo {
  /** Can Overwrite if Target DataBase already exists */
  overwriteOption?: OverwriteOptions;
  /** Resource Id name of the container in which Target DataBase resides */
  containerId?: string;
  /** Database name InstanceName/DataBaseName for SQL or System/DbName for SAP Hana */
  databaseName?: string;
  /** Target directory location for restore as files. */
  targetDirectoryForFileRestore?: string;
}

export function targetRestoreInfoSerializer(item: TargetRestoreInfo): any {
  return {
    overwriteOption: item["overwriteOption"],
    containerId: item["containerId"],
    databaseName: item["databaseName"],
    targetDirectoryForFileRestore: item["targetDirectoryForFileRestore"],
  };
}

/** Can Overwrite if Target DataBase already exists */
export enum KnownOverwriteOptions {
  /** Invalid */
  Invalid = "Invalid",
  /** FailOnConflict */
  FailOnConflict = "FailOnConflict",
  /** Overwrite */
  Overwrite = "Overwrite",
}

/**
 * Can Overwrite if Target DataBase already exists \
 * {@link KnownOverwriteOptions} can be used interchangeably with OverwriteOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **FailOnConflict** \
 * **Overwrite**
 */
export type OverwriteOptions = string;

/** Defines whether the current recovery mode is file restore or database restore */
export enum KnownRecoveryMode {
  /** Invalid */
  Invalid = "Invalid",
  /** FileRecovery */
  FileRecovery = "FileRecovery",
  /** WorkloadRecovery */
  WorkloadRecovery = "WorkloadRecovery",
  /** SnapshotAttach */
  SnapshotAttach = "SnapshotAttach",
  /** RecoveryUsingSnapshot */
  RecoveryUsingSnapshot = "RecoveryUsingSnapshot",
  /** SnapshotAttachAndRecover */
  SnapshotAttachAndRecover = "SnapshotAttachAndRecover",
}

/**
 * Defines whether the current recovery mode is file restore or database restore \
 * {@link KnownRecoveryMode} can be used interchangeably with RecoveryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **FileRecovery** \
 * **WorkloadRecovery** \
 * **SnapshotAttach** \
 * **RecoveryUsingSnapshot** \
 * **SnapshotAttachAndRecover**
 */
export type RecoveryMode = string;

/** User assigned managed identity details */
export interface UserAssignedManagedIdentityDetails {
  /** The ARM id of the assigned identity. */
  identityArmId?: string;
  /** The name of the assigned identity. */
  identityName?: string;
  /** User assigned managed identity properties */
  userAssignedIdentityProperties?: UserAssignedIdentityProperties;
}

export function userAssignedManagedIdentityDetailsSerializer(
  item: UserAssignedManagedIdentityDetails,
): any {
  return {
    identityArmId: item["identityArmId"],
    identityName: item["identityName"],
    userAssignedIdentityProperties: !item["userAssignedIdentityProperties"]
      ? item["userAssignedIdentityProperties"]
      : userAssignedIdentityPropertiesSerializer(item["userAssignedIdentityProperties"]),
  };
}

export function userAssignedManagedIdentityDetailsDeserializer(
  item: any,
): UserAssignedManagedIdentityDetails {
  return {
    identityArmId: item["identityArmId"],
    identityName: item["identityName"],
    userAssignedIdentityProperties: !item["userAssignedIdentityProperties"]
      ? item["userAssignedIdentityProperties"]
      : userAssignedIdentityPropertiesDeserializer(item["userAssignedIdentityProperties"]),
  };
}

/** User assigned managed identity properties */
export interface UserAssignedIdentityProperties {
  /** The client ID of the assigned identity. */
  clientId?: string;
  /** The principal ID of the assigned identity. */
  principalId?: string;
}

export function userAssignedIdentityPropertiesSerializer(
  item: UserAssignedIdentityProperties,
): any {
  return { clientId: item["clientId"], principalId: item["principalId"] };
}

export function userAssignedIdentityPropertiesDeserializer(
  item: any,
): UserAssignedIdentityProperties {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
  };
}

/** Encapsulates information regarding snapshot recovery for SAP Hana */
export interface SnapshotRestoreParameters {
  skipAttachAndMount?: boolean;
  logPointInTimeForDBRecovery?: string;
}

export function snapshotRestoreParametersSerializer(item: SnapshotRestoreParameters): any {
  return {
    skipAttachAndMount: item["skipAttachAndMount"],
    logPointInTimeForDBRecovery: item["logPointInTimeForDBRecovery"],
  };
}

/** AzureWorkload SAP Hana -specific restore. Specifically for PointInTime/Log restore */
export interface AzureWorkloadSAPHanaPointInTimeRestoreRequest extends AzureWorkloadSAPHanaRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest */
  objectType:
    | "AzureWorkloadSAPHanaPointInTimeRestoreRequest"
    | "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest";
  /** PointInTime value */
  pointInTime?: Date;
}

export function azureWorkloadSAPHanaPointInTimeRestoreRequestSerializer(
  item: AzureWorkloadSAPHanaPointInTimeRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    pointInTime: !item["pointInTime"] ? item["pointInTime"] : item["pointInTime"].toISOString(),
  };
}

/** Alias for AzureWorkloadSAPHanaPointInTimeRestoreRequestUnion */
export type AzureWorkloadSAPHanaPointInTimeRestoreRequestUnion =
  | AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest
  | AzureWorkloadSAPHanaPointInTimeRestoreRequest;

export function azureWorkloadSAPHanaPointInTimeRestoreRequestUnionSerializer(
  item: AzureWorkloadSAPHanaPointInTimeRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest":
      return azureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequestSerializer(
        item as AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest,
      );

    default:
      return azureWorkloadSAPHanaPointInTimeRestoreRequestSerializer(item);
  }
}

/** AzureWorkload SAP Hana-specific restore with integrated rehydration of recovery point. */
export interface AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest extends AzureWorkloadSAPHanaPointInTimeRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest";
  /** RP Rehydration Info */
  recoveryPointRehydrationInfo?: RecoveryPointRehydrationInfo;
}

export function azureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequestSerializer(
  item: AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest,
): any {
  return {
    objectType: item["objectType"],
    pointInTime: !item["pointInTime"] ? item["pointInTime"] : item["pointInTime"].toISOString(),
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryPointRehydrationInfo: !item["recoveryPointRehydrationInfo"]
      ? item["recoveryPointRehydrationInfo"]
      : recoveryPointRehydrationInfoSerializer(item["recoveryPointRehydrationInfo"]),
  };
}

/** RP Rehydration Info */
export interface RecoveryPointRehydrationInfo {
  /**
   * How long the rehydrated RP should be kept
   * Should be ISO8601 Duration format e.g. "P7D"
   */
  rehydrationRetentionDuration?: string;
  /** Rehydration Priority */
  rehydrationPriority?: RehydrationPriority;
}

export function recoveryPointRehydrationInfoSerializer(item: RecoveryPointRehydrationInfo): any {
  return {
    rehydrationRetentionDuration: item["rehydrationRetentionDuration"],
    rehydrationPriority: item["rehydrationPriority"],
  };
}

/** Rehydration Priority */
export enum KnownRehydrationPriority {
  /** Standard */
  Standard = "Standard",
  /** High */
  High = "High",
}

/**
 * Rehydration Priority \
 * {@link KnownRehydrationPriority} can be used interchangeably with RehydrationPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **High**
 */
export type RehydrationPriority = string;

/** AzureWorkload SAP Hana-specific restore. */
export interface AzureWorkloadSAPHanaRestoreRequest extends AzureWorkloadRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadSAPHanaPointInTimeRestoreRequest, AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest, AzureWorkloadSAPHanaRestoreWithRehydrateRequest */
  objectType:
    | "AzureWorkloadSAPHanaRestoreRequest"
    | "AzureWorkloadSAPHanaPointInTimeRestoreRequest"
    | "AzureWorkloadSAPHanaRestoreWithRehydrateRequest"
    | "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest";
}

export function azureWorkloadSAPHanaRestoreRequestSerializer(
  item: AzureWorkloadSAPHanaRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for AzureWorkloadSAPHanaRestoreRequestUnion */
export type AzureWorkloadSAPHanaRestoreRequestUnion =
  | AzureWorkloadSAPHanaPointInTimeRestoreRequestUnion
  | AzureWorkloadSAPHanaRestoreWithRehydrateRequest
  | AzureWorkloadSAPHanaRestoreRequest;

export function azureWorkloadSAPHanaRestoreRequestUnionSerializer(
  item: AzureWorkloadSAPHanaRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureWorkloadSAPHanaPointInTimeRestoreRequest":
    case "AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest":
      return azureWorkloadSAPHanaPointInTimeRestoreRequestUnionSerializer(
        item as AzureWorkloadSAPHanaPointInTimeRestoreRequestUnion,
      );

    case "AzureWorkloadSAPHanaRestoreWithRehydrateRequest":
      return azureWorkloadSAPHanaRestoreWithRehydrateRequestSerializer(
        item as AzureWorkloadSAPHanaRestoreWithRehydrateRequest,
      );

    default:
      return azureWorkloadSAPHanaRestoreRequestSerializer(item);
  }
}

/** AzureWorkload SAP Hana-specific restore with integrated rehydration of recovery point. */
export interface AzureWorkloadSAPHanaRestoreWithRehydrateRequest extends AzureWorkloadSAPHanaRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSAPHanaRestoreWithRehydrateRequest";
  /** RP Rehydration Info */
  recoveryPointRehydrationInfo?: RecoveryPointRehydrationInfo;
}

export function azureWorkloadSAPHanaRestoreWithRehydrateRequestSerializer(
  item: AzureWorkloadSAPHanaRestoreWithRehydrateRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryPointRehydrationInfo: !item["recoveryPointRehydrationInfo"]
      ? item["recoveryPointRehydrationInfo"]
      : recoveryPointRehydrationInfoSerializer(item["recoveryPointRehydrationInfo"]),
  };
}

/** AzureWorkload SAP Ase-specific restore. Specifically for PointInTime/Log restore */
export interface AzureWorkloadSAPAsePointInTimeRestoreRequest extends AzureWorkloadSAPAseRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSAPAsePointInTimeRestoreRequest";
  /** PointInTime value */
  pointInTime?: Date;
}

export function azureWorkloadSAPAsePointInTimeRestoreRequestSerializer(
  item: AzureWorkloadSAPAsePointInTimeRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    pointInTime: !item["pointInTime"] ? item["pointInTime"] : item["pointInTime"].toISOString(),
  };
}

/** AzureWorkload SAP Ase-specific restore. */
export interface AzureWorkloadSAPAseRestoreRequest extends AzureWorkloadRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadSAPAsePointInTimeRestoreRequest */
  objectType: "AzureWorkloadSAPAseRestoreRequest" | "AzureWorkloadSAPAsePointInTimeRestoreRequest";
}

export function azureWorkloadSAPAseRestoreRequestSerializer(
  item: AzureWorkloadSAPAseRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for AzureWorkloadSAPAseRestoreRequestUnion */
export type AzureWorkloadSAPAseRestoreRequestUnion =
  | AzureWorkloadSAPAsePointInTimeRestoreRequest
  | AzureWorkloadSAPAseRestoreRequest;

export function azureWorkloadSAPAseRestoreRequestUnionSerializer(
  item: AzureWorkloadSAPAseRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureWorkloadSAPAsePointInTimeRestoreRequest":
      return azureWorkloadSAPAsePointInTimeRestoreRequestSerializer(
        item as AzureWorkloadSAPAsePointInTimeRestoreRequest,
      );

    default:
      return azureWorkloadSAPAseRestoreRequestSerializer(item);
  }
}

/** AzureWorkload SQL -specific restore. Specifically for PointInTime/Log restore */
export interface AzureWorkloadSQLPointInTimeRestoreRequest extends AzureWorkloadSQLRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest */
  objectType:
    | "AzureWorkloadSQLPointInTimeRestoreRequest"
    | "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest";
  /** PointInTime value */
  pointInTime?: Date;
}

export function azureWorkloadSQLPointInTimeRestoreRequestSerializer(
  item: AzureWorkloadSQLPointInTimeRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    shouldUseAlternateTargetLocation: item["shouldUseAlternateTargetLocation"],
    isNonRecoverable: item["isNonRecoverable"],
    alternateDirectoryPaths: !item["alternateDirectoryPaths"]
      ? item["alternateDirectoryPaths"]
      : sqlDataDirectoryMappingArraySerializer(item["alternateDirectoryPaths"]),
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    pointInTime: !item["pointInTime"] ? item["pointInTime"] : item["pointInTime"].toISOString(),
  };
}

/** Alias for AzureWorkloadSQLPointInTimeRestoreRequestUnion */
export type AzureWorkloadSQLPointInTimeRestoreRequestUnion =
  | AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest
  | AzureWorkloadSQLPointInTimeRestoreRequest;

export function azureWorkloadSQLPointInTimeRestoreRequestUnionSerializer(
  item: AzureWorkloadSQLPointInTimeRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest":
      return azureWorkloadSQLPointInTimeRestoreWithRehydrateRequestSerializer(
        item as AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest,
      );

    default:
      return azureWorkloadSQLPointInTimeRestoreRequestSerializer(item);
  }
}

/** AzureWorkload SQL-specific restore with integrated rehydration of recovery point. */
export interface AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest extends AzureWorkloadSQLPointInTimeRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest";
  /** RP Rehydration Info */
  recoveryPointRehydrationInfo?: RecoveryPointRehydrationInfo;
}

export function azureWorkloadSQLPointInTimeRestoreWithRehydrateRequestSerializer(
  item: AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest,
): any {
  return {
    objectType: item["objectType"],
    pointInTime: !item["pointInTime"] ? item["pointInTime"] : item["pointInTime"].toISOString(),
    shouldUseAlternateTargetLocation: item["shouldUseAlternateTargetLocation"],
    isNonRecoverable: item["isNonRecoverable"],
    alternateDirectoryPaths: !item["alternateDirectoryPaths"]
      ? item["alternateDirectoryPaths"]
      : sqlDataDirectoryMappingArraySerializer(item["alternateDirectoryPaths"]),
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryPointRehydrationInfo: !item["recoveryPointRehydrationInfo"]
      ? item["recoveryPointRehydrationInfo"]
      : recoveryPointRehydrationInfoSerializer(item["recoveryPointRehydrationInfo"]),
  };
}

/** AzureWorkload SQL -specific restore. Specifically for full/diff restore */
export interface AzureWorkloadSQLRestoreRequest extends AzureWorkloadRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkloadSQLPointInTimeRestoreRequest, AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest, AzureWorkloadSQLRestoreWithRehydrateRequest */
  objectType:
    | "AzureWorkloadSQLRestoreRequest"
    | "AzureWorkloadSQLPointInTimeRestoreRequest"
    | "AzureWorkloadSQLRestoreWithRehydrateRequest"
    | "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest";
  /** Default option set to true. If this is set to false, alternate data directory must be provided */
  shouldUseAlternateTargetLocation?: boolean;
  /** SQL specific property where user can chose to set no-recovery when restore operation is tried */
  isNonRecoverable?: boolean;
  /** Data directory details */
  alternateDirectoryPaths?: SQLDataDirectoryMapping[];
}

export function azureWorkloadSQLRestoreRequestSerializer(
  item: AzureWorkloadSQLRestoreRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    shouldUseAlternateTargetLocation: item["shouldUseAlternateTargetLocation"],
    isNonRecoverable: item["isNonRecoverable"],
    alternateDirectoryPaths: !item["alternateDirectoryPaths"]
      ? item["alternateDirectoryPaths"]
      : sqlDataDirectoryMappingArraySerializer(item["alternateDirectoryPaths"]),
  };
}

/** Alias for AzureWorkloadSQLRestoreRequestUnion */
export type AzureWorkloadSQLRestoreRequestUnion =
  | AzureWorkloadSQLPointInTimeRestoreRequestUnion
  | AzureWorkloadSQLRestoreWithRehydrateRequest
  | AzureWorkloadSQLRestoreRequest;

export function azureWorkloadSQLRestoreRequestUnionSerializer(
  item: AzureWorkloadSQLRestoreRequestUnion,
): any {
  switch (item.objectType) {
    case "AzureWorkloadSQLPointInTimeRestoreRequest":
    case "AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest":
      return azureWorkloadSQLPointInTimeRestoreRequestUnionSerializer(
        item as AzureWorkloadSQLPointInTimeRestoreRequestUnion,
      );

    case "AzureWorkloadSQLRestoreWithRehydrateRequest":
      return azureWorkloadSQLRestoreWithRehydrateRequestSerializer(
        item as AzureWorkloadSQLRestoreWithRehydrateRequest,
      );

    default:
      return azureWorkloadSQLRestoreRequestSerializer(item);
  }
}

export function sqlDataDirectoryMappingArraySerializer(
  result: Array<SQLDataDirectoryMapping>,
): any[] {
  return result.map((item) => {
    return sqlDataDirectoryMappingSerializer(item);
  });
}

/** Encapsulates information regarding data directory */
export interface SQLDataDirectoryMapping {
  /** Type of data directory mapping */
  mappingType?: SQLDataDirectoryType;
  /** Restore source logical name path */
  sourceLogicalName?: string;
  /** Restore source path */
  sourcePath?: string;
  /** Target path */
  targetPath?: string;
}

export function sqlDataDirectoryMappingSerializer(item: SQLDataDirectoryMapping): any {
  return {
    mappingType: item["mappingType"],
    sourceLogicalName: item["sourceLogicalName"],
    sourcePath: item["sourcePath"],
    targetPath: item["targetPath"],
  };
}

/** AzureWorkload SQL-specific restore with integrated rehydration of recovery point */
export interface AzureWorkloadSQLRestoreWithRehydrateRequest extends AzureWorkloadSQLRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureWorkloadSQLRestoreWithRehydrateRequest";
  /** RP Rehydration Info */
  recoveryPointRehydrationInfo?: RecoveryPointRehydrationInfo;
}

export function azureWorkloadSQLRestoreWithRehydrateRequestSerializer(
  item: AzureWorkloadSQLRestoreWithRehydrateRequest,
): any {
  return {
    objectType: item["objectType"],
    shouldUseAlternateTargetLocation: item["shouldUseAlternateTargetLocation"],
    isNonRecoverable: item["isNonRecoverable"],
    alternateDirectoryPaths: !item["alternateDirectoryPaths"]
      ? item["alternateDirectoryPaths"]
      : sqlDataDirectoryMappingArraySerializer(item["alternateDirectoryPaths"]),
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    propertyBag: item["propertyBag"],
    targetInfo: !item["targetInfo"]
      ? item["targetInfo"]
      : targetRestoreInfoSerializer(item["targetInfo"]),
    recoveryMode: item["recoveryMode"],
    targetResourceGroupName: item["targetResourceGroupName"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
    snapshotRestoreParameters: !item["snapshotRestoreParameters"]
      ? item["snapshotRestoreParameters"]
      : snapshotRestoreParametersSerializer(item["snapshotRestoreParameters"]),
    targetVirtualMachineId: item["targetVirtualMachineId"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryPointRehydrationInfo: !item["recoveryPointRehydrationInfo"]
      ? item["recoveryPointRehydrationInfo"]
      : recoveryPointRehydrationInfoSerializer(item["recoveryPointRehydrationInfo"]),
  };
}

/** IaaS VM workload-specific restore. */
export interface IaasVMRestoreRequest extends RestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: IaasVMRestoreWithRehydrationRequest */
  objectType: "IaasVMRestoreRequest" | "IaasVMRestoreWithRehydrationRequest";
  /** ID of the backup copy to be recovered. */
  recoveryPointId?: string;
  /** Type of this recovery. */
  recoveryType?: RecoveryType;
  /** Fully qualified ARM ID of the VM which is being recovered. */
  sourceResourceId?: string;
  /**
   * This is the complete ARM Id of the VM that will be created.
   * For e.g. /subscriptions/{subId}/resourcegroups/{rg}/provider/Microsoft.Compute/virtualmachines/{vm}
   */
  targetVirtualMachineId?: string;
  /**
   * This is the ARM Id of the resource group that you want to create for this Virtual machine and other artifacts.
   * For e.g. /subscriptions/{subId}/resourcegroups/{rg}
   */
  targetResourceGroupId?: string;
  /** Fully qualified ARM ID of the storage account to which the VM has to be restored. */
  storageAccountId?: string;
  /**
   * This is the virtual network Id of the vnet that will be attached to the virtual machine.
   * User will be validated for join action permissions in the linked access.
   */
  virtualNetworkId?: string;
  /**
   * Subnet ID, is the subnet ID associated with the to be restored VM. For Classic VMs it would be
   * {VnetID}/Subnet/{SubnetName} and, for the Azure Resource Manager VMs it would be ARM resource ID used to represent
   * the subnet.
   */
  subnetId?: string;
  /**
   * Fully qualified ARM ID of the domain name to be associated to the VM being restored. This applies only to Classic
   * Virtual Machines.
   */
  targetDomainNameId?: string;
  /** Region in which the virtual machine is restored. */
  region?: string;
  /** Affinity group associated to VM to be restored. Used only for Classic Compute Virtual Machines. */
  affinityGroup?: string;
  /**
   * Should a new cloud service be created while restoring the VM. If this is false, VM will be restored to the same
   * cloud service as it was at the time of backup.
   */
  createNewCloudService?: boolean;
  /** Original Storage Account Option */
  originalStorageAccountOption?: boolean;
  /** Details needed if the VM was encrypted at the time of backup. */
  encryptionDetails?: EncryptionDetails;
  /** List of Disk LUNs for partial restore */
  restoreDiskLunList?: number[];
  /** Flag to denote of an Unmanaged disk VM should be restored with Managed disks. */
  restoreWithManagedDisks?: boolean;
  /** DiskEncryptionSet's ID - needed if the VM needs to be encrypted at rest during restore with customer managed key. */
  diskEncryptionSetId?: string;
  /** Target zone where the VM and its disks should be restored. */
  zones?: string[];
  /** Managed Identity information required to access customer storage account. */
  identityInfo?: IdentityInfo;
  /** IaaS VM workload specific restore details for restores using managed identity. */
  identityBasedRestoreDetails?: IdentityBasedRestoreDetails;
  /**
   * Target extended location where the VM should be restored,
   * should be null if restore is to be done in public cloud
   */
  extendedLocation?: ExtendedLocation;
  /** Stores Secured VM Details */
  securedVMDetails?: SecuredVMDetails;
  /** Specifies target network access settings for disks of VM to be restored, */
  targetDiskNetworkAccessSettings?: TargetDiskNetworkAccessSettings;
}

export function iaasVMRestoreRequestSerializer(item: IaasVMRestoreRequest): any {
  return {
    objectType: item["objectType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryPointId: item["recoveryPointId"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    targetVirtualMachineId: item["targetVirtualMachineId"],
    targetResourceGroupId: item["targetResourceGroupId"],
    storageAccountId: item["storageAccountId"],
    virtualNetworkId: item["virtualNetworkId"],
    subnetId: item["subnetId"],
    targetDomainNameId: item["targetDomainNameId"],
    region: item["region"],
    affinityGroup: item["affinityGroup"],
    createNewCloudService: item["createNewCloudService"],
    originalStorageAccountOption: item["originalStorageAccountOption"],
    encryptionDetails: !item["encryptionDetails"]
      ? item["encryptionDetails"]
      : encryptionDetailsSerializer(item["encryptionDetails"]),
    restoreDiskLunList: !item["restoreDiskLunList"]
      ? item["restoreDiskLunList"]
      : item["restoreDiskLunList"].map((p: any) => {
          return p;
        }),
    restoreWithManagedDisks: item["restoreWithManagedDisks"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identityInfo: !item["identityInfo"]
      ? item["identityInfo"]
      : identityInfoSerializer(item["identityInfo"]),
    identityBasedRestoreDetails: !item["identityBasedRestoreDetails"]
      ? item["identityBasedRestoreDetails"]
      : identityBasedRestoreDetailsSerializer(item["identityBasedRestoreDetails"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    securedVMDetails: !item["securedVMDetails"]
      ? item["securedVMDetails"]
      : securedVMDetailsSerializer(item["securedVMDetails"]),
    targetDiskNetworkAccessSettings: !item["targetDiskNetworkAccessSettings"]
      ? item["targetDiskNetworkAccessSettings"]
      : targetDiskNetworkAccessSettingsSerializer(item["targetDiskNetworkAccessSettings"]),
  };
}

/** Alias for IaasVMRestoreRequestUnion */
export type IaasVMRestoreRequestUnion = IaasVMRestoreWithRehydrationRequest | IaasVMRestoreRequest;

export function iaasVMRestoreRequestUnionSerializer(item: IaasVMRestoreRequestUnion): any {
  switch (item.objectType) {
    case "IaasVMRestoreWithRehydrationRequest":
      return iaasVMRestoreWithRehydrationRequestSerializer(
        item as IaasVMRestoreWithRehydrationRequest,
      );

    default:
      return iaasVMRestoreRequestSerializer(item);
  }
}

/** Details needed if the VM was encrypted at the time of backup. */
export interface EncryptionDetails {
  /** Identifies whether this backup copy represents an encrypted VM at the time of backup. */
  encryptionEnabled?: boolean;
  /** Key Url. */
  kekUrl?: string;
  /** Secret Url. */
  secretKeyUrl?: string;
  /** ID of Key Vault where KEK is stored. */
  kekVaultId?: string;
  /** ID of Key Vault where Secret is stored. */
  secretKeyVaultId?: string;
}

export function encryptionDetailsSerializer(item: EncryptionDetails): any {
  return {
    encryptionEnabled: item["encryptionEnabled"],
    kekUrl: item["kekUrl"],
    secretKeyUrl: item["secretKeyUrl"],
    kekVaultId: item["kekVaultId"],
    secretKeyVaultId: item["secretKeyVaultId"],
  };
}

/** Encapsulates Managed Identity related information */
export interface IdentityInfo {
  /** To differentiate if the managed identity is system assigned or user assigned */
  isSystemAssignedIdentity?: boolean;
  /**
   * Managed Identity Resource Id
   * Optional: Might not be required in the case of system assigned managed identity
   */
  managedIdentityResourceId?: string;
}

export function identityInfoSerializer(item: IdentityInfo): any {
  return {
    isSystemAssignedIdentity: item["isSystemAssignedIdentity"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

/** IaaS VM workload specific restore details for restores using managed identity */
export interface IdentityBasedRestoreDetails {
  /** Gets the class type. */
  objectType?: string;
  /** Fully qualified ARM ID of the target storage account. */
  targetStorageAccountId?: string;
}

export function identityBasedRestoreDetailsSerializer(item: IdentityBasedRestoreDetails): any {
  return { objectType: item["objectType"], targetStorageAccountId: item["targetStorageAccountId"] };
}

/** Restore request parameters for Secured VMs */
export interface SecuredVMDetails {
  /** Gets or Sets Disk Encryption Set Id for Secured VM OS Disk */
  securedVMOsDiskEncryptionSetId?: string;
}

export function securedVMDetailsSerializer(item: SecuredVMDetails): any {
  return { securedVMOsDiskEncryptionSetId: item["securedVMOsDiskEncryptionSetId"] };
}

/** Specifies target network access settings for disks of VM to be restored. */
export interface TargetDiskNetworkAccessSettings {
  /** Network access settings to be used for restored disks */
  targetDiskNetworkAccessOption?: TargetDiskNetworkAccessOption;
  /** Gets or sets the ARM resource ID of the target disk access to be used when TargetDiskNetworkAccessOption is set to TargetDiskNetworkAccessOption.UseNew */
  targetDiskAccessId?: string;
}

export function targetDiskNetworkAccessSettingsSerializer(
  item: TargetDiskNetworkAccessSettings,
): any {
  return {
    targetDiskNetworkAccessOption: item["targetDiskNetworkAccessOption"],
    targetDiskAccessId: item["targetDiskAccessId"],
  };
}

/** Network access settings to be used for restored disks */
export type TargetDiskNetworkAccessOption =
  | "SameAsOnSourceDisks"
  | "EnablePrivateAccessForAllDisks"
  | "EnablePublicAccessForAllDisks";

/** IaaS VM workload-specific restore with integrated rehydration of recovery point. */
export interface IaasVMRestoreWithRehydrationRequest extends IaasVMRestoreRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "IaasVMRestoreWithRehydrationRequest";
  /** RP Rehydration Info */
  recoveryPointRehydrationInfo?: RecoveryPointRehydrationInfo;
}

export function iaasVMRestoreWithRehydrationRequestSerializer(
  item: IaasVMRestoreWithRehydrationRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryPointId: item["recoveryPointId"],
    recoveryType: item["recoveryType"],
    sourceResourceId: item["sourceResourceId"],
    targetVirtualMachineId: item["targetVirtualMachineId"],
    targetResourceGroupId: item["targetResourceGroupId"],
    storageAccountId: item["storageAccountId"],
    virtualNetworkId: item["virtualNetworkId"],
    subnetId: item["subnetId"],
    targetDomainNameId: item["targetDomainNameId"],
    region: item["region"],
    affinityGroup: item["affinityGroup"],
    createNewCloudService: item["createNewCloudService"],
    originalStorageAccountOption: item["originalStorageAccountOption"],
    encryptionDetails: !item["encryptionDetails"]
      ? item["encryptionDetails"]
      : encryptionDetailsSerializer(item["encryptionDetails"]),
    restoreDiskLunList: !item["restoreDiskLunList"]
      ? item["restoreDiskLunList"]
      : item["restoreDiskLunList"].map((p: any) => {
          return p;
        }),
    restoreWithManagedDisks: item["restoreWithManagedDisks"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identityInfo: !item["identityInfo"]
      ? item["identityInfo"]
      : identityInfoSerializer(item["identityInfo"]),
    identityBasedRestoreDetails: !item["identityBasedRestoreDetails"]
      ? item["identityBasedRestoreDetails"]
      : identityBasedRestoreDetailsSerializer(item["identityBasedRestoreDetails"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    securedVMDetails: !item["securedVMDetails"]
      ? item["securedVMDetails"]
      : securedVMDetailsSerializer(item["securedVMDetails"]),
    targetDiskNetworkAccessSettings: !item["targetDiskNetworkAccessSettings"]
      ? item["targetDiskNetworkAccessSettings"]
      : targetDiskNetworkAccessSettingsSerializer(item["targetDiskNetworkAccessSettings"]),
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    recoveryPointRehydrationInfo: !item["recoveryPointRehydrationInfo"]
      ? item["recoveryPointRehydrationInfo"]
      : recoveryPointRehydrationInfoSerializer(item["recoveryPointRehydrationInfo"]),
  };
}

/** Parameters to Provision ILR API. */
export interface ILRRequestResource extends Resource {
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Optional ETag. */
  eTag?: string;
  /** ILRRequestResource properties */
  properties?: ILRRequestUnion;
}

export function ilrRequestResourceSerializer(item: ILRRequestResource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    eTag: item["eTag"],
    properties: !item["properties"]
      ? item["properties"]
      : ilrRequestUnionSerializer(item["properties"]),
  };
}

/** Parameters to Provision ILR API. */
export interface ILRRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureFileShareProvisionILRRequest, IaasVMILRRegistrationRequest */
  objectType: string;
}

export function ilrRequestSerializer(item: ILRRequest): any {
  return { objectType: item["objectType"] };
}

/** Alias for ILRRequestUnion */
export type ILRRequestUnion =
  | AzureFileShareProvisionILRRequest
  | IaasVmilrRegistrationRequest
  | ILRRequest;

export function ilrRequestUnionSerializer(item: ILRRequestUnion): any {
  switch (item.objectType) {
    case "AzureFileShareProvisionILRRequest":
      return azureFileShareProvisionILRRequestSerializer(item as AzureFileShareProvisionILRRequest);

    case "IaasVMILRRegistrationRequest":
      return iaasVmilrRegistrationRequestSerializer(item as IaasVmilrRegistrationRequest);

    default:
      return ilrRequestSerializer(item);
  }
}

/** Update snapshot Uri with the correct friendly Name of the source Azure file share. */
export interface AzureFileShareProvisionILRRequest extends ILRRequest {
  /** Recovery point ID. */
  recoveryPointId?: string;
  /** Source Storage account ARM Id */
  sourceResourceId?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "AzureFileShareProvisionILRRequest";
}

export function azureFileShareProvisionILRRequestSerializer(
  item: AzureFileShareProvisionILRRequest,
): any {
  return {
    objectType: item["objectType"],
    recoveryPointId: item["recoveryPointId"],
    sourceResourceId: item["sourceResourceId"],
  };
}

/** Restore files/folders from a backup copy of IaaS VM. */
export interface IaasVmilrRegistrationRequest extends ILRRequest {
  /** ID of the IaaS VM backup copy from where the files/folders have to be restored. */
  recoveryPointId?: string;
  /** Fully qualified ARM ID of the virtual machine whose the files / folders have to be restored. */
  virtualMachineId?: string;
  /** iSCSI initiator name. */
  initiatorName?: string;
  /** Whether to renew existing registration with the iSCSI server. */
  renewExistingRegistration?: boolean;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "IaasVMILRRegistrationRequest";
}

export function iaasVmilrRegistrationRequestSerializer(item: IaasVmilrRegistrationRequest): any {
  return {
    objectType: item["objectType"],
    recoveryPointId: item["recoveryPointId"],
    virtualMachineId: item["virtualMachineId"],
    initiatorName: item["initiatorName"],
    renewExistingRegistration: item["renewExistingRegistration"],
  };
}

/** Base class for backup policy. Workload-specific backup policies are derived from this class. */
export interface ProtectionPolicyResource extends Resource {
  /** ProtectionPolicyResource properties */
  properties?: ProtectionPolicyUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function protectionPolicyResourceSerializer(item: ProtectionPolicyResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : protectionPolicyUnionSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
  };
}

export function protectionPolicyResourceDeserializer(item: any): ProtectionPolicyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectionPolicyUnionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Base class for backup policy. Workload-specific backup policies are derived from this class. */
export interface ProtectionPolicy {
  /** Number of items associated with this policy. */
  protectedItemsCount?: number;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureWorkload, AzureStorage, AzureIaasVM, AzureSql, GenericProtectionPolicy, MAB */
  backupManagementType: string;
  /** ResourceGuard Operation Requests */
  resourceGuardOperationRequests?: string[];
}

export function protectionPolicySerializer(item: ProtectionPolicy): any {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

export function protectionPolicyDeserializer(item: any): ProtectionPolicy {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for ProtectionPolicyUnion */
export type ProtectionPolicyUnion =
  | AzureVmWorkloadProtectionPolicy
  | AzureFileShareProtectionPolicy
  | AzureIaaSVMProtectionPolicy
  | AzureSqlProtectionPolicy
  | GenericProtectionPolicy
  | MabProtectionPolicy
  | ProtectionPolicy;

export function protectionPolicyUnionSerializer(item: ProtectionPolicyUnion): any {
  switch (item.backupManagementType) {
    case "AzureWorkload":
      return azureVmWorkloadProtectionPolicySerializer(item as AzureVmWorkloadProtectionPolicy);

    case "AzureStorage":
      return azureFileShareProtectionPolicySerializer(item as AzureFileShareProtectionPolicy);

    case "AzureIaasVM":
      return azureIaaSVMProtectionPolicySerializer(item as AzureIaaSVMProtectionPolicy);

    case "AzureSql":
      return azureSqlProtectionPolicySerializer(item as AzureSqlProtectionPolicy);

    case "GenericProtectionPolicy":
      return genericProtectionPolicySerializer(item as GenericProtectionPolicy);

    case "MAB":
      return mabProtectionPolicySerializer(item as MabProtectionPolicy);

    default:
      return protectionPolicySerializer(item);
  }
}

export function protectionPolicyUnionDeserializer(item: any): ProtectionPolicyUnion {
  switch (item.backupManagementType) {
    case "AzureWorkload":
      return azureVmWorkloadProtectionPolicyDeserializer(item as AzureVmWorkloadProtectionPolicy);

    case "AzureStorage":
      return azureFileShareProtectionPolicyDeserializer(item as AzureFileShareProtectionPolicy);

    case "AzureIaasVM":
      return azureIaaSVMProtectionPolicyDeserializer(item as AzureIaaSVMProtectionPolicy);

    case "AzureSql":
      return azureSqlProtectionPolicyDeserializer(item as AzureSqlProtectionPolicy);

    case "GenericProtectionPolicy":
      return genericProtectionPolicyDeserializer(item as GenericProtectionPolicy);

    case "MAB":
      return mabProtectionPolicyDeserializer(item as MabProtectionPolicy);

    default:
      return protectionPolicyDeserializer(item);
  }
}

/** Azure VM (Mercury) workload-specific backup policy. */
export interface AzureVmWorkloadProtectionPolicy extends ProtectionPolicy {
  /** Type of workload for the backup management */
  workLoadType?: WorkloadType;
  /** Type of the protection policy */
  vmWorkloadPolicyType?: VMWorkloadPolicyType;
  /** Common settings for the backup management */
  settings?: Settings;
  /** List of sub-protection policies which includes schedule and retention */
  subProtectionPolicy?: SubProtectionPolicy[];
  /** Fix the policy inconsistency */
  makePolicyConsistent?: boolean;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  backupManagementType: "AzureWorkload";
}

export function azureVmWorkloadProtectionPolicySerializer(
  item: AzureVmWorkloadProtectionPolicy,
): any {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    workLoadType: item["workLoadType"],
    vmWorkloadPolicyType: item["vmWorkloadPolicyType"],
    settings: !item["settings"] ? item["settings"] : settingsSerializer(item["settings"]),
    subProtectionPolicy: !item["subProtectionPolicy"]
      ? item["subProtectionPolicy"]
      : subProtectionPolicyArraySerializer(item["subProtectionPolicy"]),
    makePolicyConsistent: item["makePolicyConsistent"],
  };
}

export function azureVmWorkloadProtectionPolicyDeserializer(
  item: any,
): AzureVmWorkloadProtectionPolicy {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    workLoadType: item["workLoadType"],
    vmWorkloadPolicyType: item["vmWorkloadPolicyType"],
    settings: !item["settings"] ? item["settings"] : settingsDeserializer(item["settings"]),
    subProtectionPolicy: !item["subProtectionPolicy"]
      ? item["subProtectionPolicy"]
      : subProtectionPolicyArrayDeserializer(item["subProtectionPolicy"]),
    makePolicyConsistent: item["makePolicyConsistent"],
  };
}

/** Type of the protection policy */
export enum KnownVMWorkloadPolicyType {
  /** Invalid */
  Invalid = "Invalid",
  /** SnapshotV1 */
  SnapshotV1 = "SnapshotV1",
  /** SnapshotV2 */
  SnapshotV2 = "SnapshotV2",
  /** Streaming */
  Streaming = "Streaming",
}

/**
 * Type of the protection policy \
 * {@link KnownVMWorkloadPolicyType} can be used interchangeably with VMWorkloadPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **SnapshotV1** \
 * **SnapshotV2** \
 * **Streaming**
 */
export type VMWorkloadPolicyType = string;

/** Common settings field for backup management */
export interface Settings {
  /** TimeZone optional input as string. For example: TimeZone = "Pacific Standard Time". */
  timeZone?: string;
  /** SQL compression flag */
  issqlcompression?: boolean;
  /**
   * Workload compression flag. This has been added so that 'isSqlCompression'
   * will be deprecated once clients upgrade to consider this flag.
   */
  isCompression?: boolean;
}

export function settingsSerializer(item: Settings): any {
  return {
    timeZone: item["timeZone"],
    issqlcompression: item["issqlcompression"],
    isCompression: item["isCompression"],
  };
}

export function settingsDeserializer(item: any): Settings {
  return {
    timeZone: item["timeZone"],
    issqlcompression: item["issqlcompression"],
    isCompression: item["isCompression"],
  };
}

export function subProtectionPolicyArraySerializer(result: Array<SubProtectionPolicy>): any[] {
  return result.map((item) => {
    return subProtectionPolicySerializer(item);
  });
}

export function subProtectionPolicyArrayDeserializer(result: Array<SubProtectionPolicy>): any[] {
  return result.map((item) => {
    return subProtectionPolicyDeserializer(item);
  });
}

/** Sub-protection policy which includes schedule and retention */
export interface SubProtectionPolicy {
  /** Type of backup policy type */
  policyType?: PolicyType;
  /** Backup schedule specified as part of backup policy. */
  schedulePolicy?: SchedulePolicyUnion;
  /** Retention policy with the details on backup copy retention ranges. */
  retentionPolicy?: RetentionPolicyUnion;
  /**
   * Tiering policy to automatically move RPs to another tier.
   * Key is Target Tier, defined in RecoveryPointTierType enum.
   * Tiering policy specifies the criteria to move RP to the target tier.
   */
  tieringPolicy?: Record<string, TieringPolicy>;
  /** Snapshot Backup related fields for WorkloadType SaPHanaSystem */
  snapshotBackupAdditionalDetails?: SnapshotBackupAdditionalDetails;
}

export function subProtectionPolicySerializer(item: SubProtectionPolicy): any {
  return {
    policyType: item["policyType"],
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionSerializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionSerializer(item["retentionPolicy"]),
    tieringPolicy: !item["tieringPolicy"]
      ? item["tieringPolicy"]
      : tieringPolicyRecordSerializer(item["tieringPolicy"]),
    snapshotBackupAdditionalDetails: !item["snapshotBackupAdditionalDetails"]
      ? item["snapshotBackupAdditionalDetails"]
      : snapshotBackupAdditionalDetailsSerializer(item["snapshotBackupAdditionalDetails"]),
  };
}

export function subProtectionPolicyDeserializer(item: any): SubProtectionPolicy {
  return {
    policyType: item["policyType"],
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionDeserializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionDeserializer(item["retentionPolicy"]),
    tieringPolicy: !item["tieringPolicy"]
      ? item["tieringPolicy"]
      : tieringPolicyRecordDeserializer(item["tieringPolicy"]),
    snapshotBackupAdditionalDetails: !item["snapshotBackupAdditionalDetails"]
      ? item["snapshotBackupAdditionalDetails"]
      : snapshotBackupAdditionalDetailsDeserializer(item["snapshotBackupAdditionalDetails"]),
  };
}

/** Type of backup policy type */
export enum KnownPolicyType {
  /** Invalid */
  Invalid = "Invalid",
  /** Full */
  Full = "Full",
  /** Differential */
  Differential = "Differential",
  /** Log */
  Log = "Log",
  /** CopyOnlyFull */
  CopyOnlyFull = "CopyOnlyFull",
  /** Incremental */
  Incremental = "Incremental",
  /** SnapshotFull */
  SnapshotFull = "SnapshotFull",
  /** SnapshotCopyOnlyFull */
  SnapshotCopyOnlyFull = "SnapshotCopyOnlyFull",
}

/**
 * Type of backup policy type \
 * {@link KnownPolicyType} can be used interchangeably with PolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Full** \
 * **Differential** \
 * **Log** \
 * **CopyOnlyFull** \
 * **Incremental** \
 * **SnapshotFull** \
 * **SnapshotCopyOnlyFull**
 */
export type PolicyType = string;

/** Base class for backup schedule. */
export interface SchedulePolicy {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: LogSchedulePolicy, LongTermSchedulePolicy, SimpleSchedulePolicy, SimpleSchedulePolicyV2 */
  schedulePolicyType: string;
}

export function schedulePolicySerializer(item: SchedulePolicy): any {
  return { schedulePolicyType: item["schedulePolicyType"] };
}

export function schedulePolicyDeserializer(item: any): SchedulePolicy {
  return {
    schedulePolicyType: item["schedulePolicyType"],
  };
}

/** Alias for SchedulePolicyUnion */
export type SchedulePolicyUnion =
  | LogSchedulePolicy
  | LongTermSchedulePolicy
  | SimpleSchedulePolicy
  | SimpleSchedulePolicyV2
  | SchedulePolicy;

export function schedulePolicyUnionSerializer(item: SchedulePolicyUnion): any {
  switch (item.schedulePolicyType) {
    case "LogSchedulePolicy":
      return logSchedulePolicySerializer(item as LogSchedulePolicy);

    case "LongTermSchedulePolicy":
      return longTermSchedulePolicySerializer(item as LongTermSchedulePolicy);

    case "SimpleSchedulePolicy":
      return simpleSchedulePolicySerializer(item as SimpleSchedulePolicy);

    case "SimpleSchedulePolicyV2":
      return simpleSchedulePolicyV2Serializer(item as SimpleSchedulePolicyV2);

    default:
      return schedulePolicySerializer(item);
  }
}

export function schedulePolicyUnionDeserializer(item: any): SchedulePolicyUnion {
  switch (item.schedulePolicyType) {
    case "LogSchedulePolicy":
      return logSchedulePolicyDeserializer(item as LogSchedulePolicy);

    case "LongTermSchedulePolicy":
      return longTermSchedulePolicyDeserializer(item as LongTermSchedulePolicy);

    case "SimpleSchedulePolicy":
      return simpleSchedulePolicyDeserializer(item as SimpleSchedulePolicy);

    case "SimpleSchedulePolicyV2":
      return simpleSchedulePolicyV2Deserializer(item as SimpleSchedulePolicyV2);

    default:
      return schedulePolicyDeserializer(item);
  }
}

/** Log policy schedule. */
export interface LogSchedulePolicy extends SchedulePolicy {
  /** Frequency of the log schedule operation of this policy in minutes. */
  scheduleFrequencyInMins?: number;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  schedulePolicyType: "LogSchedulePolicy";
}

export function logSchedulePolicySerializer(item: LogSchedulePolicy): any {
  return {
    schedulePolicyType: item["schedulePolicyType"],
    scheduleFrequencyInMins: item["scheduleFrequencyInMins"],
  };
}

export function logSchedulePolicyDeserializer(item: any): LogSchedulePolicy {
  return {
    schedulePolicyType: item["schedulePolicyType"],
    scheduleFrequencyInMins: item["scheduleFrequencyInMins"],
  };
}

/** Long term policy schedule. */
export interface LongTermSchedulePolicy extends SchedulePolicy {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  schedulePolicyType: "LongTermSchedulePolicy";
}

export function longTermSchedulePolicySerializer(item: LongTermSchedulePolicy): any {
  return { schedulePolicyType: item["schedulePolicyType"] };
}

export function longTermSchedulePolicyDeserializer(item: any): LongTermSchedulePolicy {
  return {
    schedulePolicyType: item["schedulePolicyType"],
  };
}

/** Simple policy schedule. */
export interface SimpleSchedulePolicy extends SchedulePolicy {
  /** Frequency of the schedule operation of this policy. */
  scheduleRunFrequency?: ScheduleRunType;
  /** List of days of week this schedule has to be run. */
  scheduleRunDays?: DayOfWeek[];
  /** List of times of day this schedule has to be run. */
  scheduleRunTimes?: Date[];
  /** Hourly Schedule of this Policy */
  hourlySchedule?: HourlySchedule;
  /** At every number weeks this schedule has to be run. */
  scheduleWeeklyFrequency?: number;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  schedulePolicyType: "SimpleSchedulePolicy";
}

export function simpleSchedulePolicySerializer(item: SimpleSchedulePolicy): any {
  return {
    schedulePolicyType: item["schedulePolicyType"],
    scheduleRunFrequency: item["scheduleRunFrequency"],
    scheduleRunDays: !item["scheduleRunDays"]
      ? item["scheduleRunDays"]
      : item["scheduleRunDays"].map((p: any) => {
          return p;
        }),
    scheduleRunTimes: !item["scheduleRunTimes"]
      ? item["scheduleRunTimes"]
      : item["scheduleRunTimes"].map((p: any) => {
          return p.toISOString();
        }),
    hourlySchedule: !item["hourlySchedule"]
      ? item["hourlySchedule"]
      : hourlyScheduleSerializer(item["hourlySchedule"]),
    scheduleWeeklyFrequency: item["scheduleWeeklyFrequency"],
  };
}

export function simpleSchedulePolicyDeserializer(item: any): SimpleSchedulePolicy {
  return {
    schedulePolicyType: item["schedulePolicyType"],
    scheduleRunFrequency: item["scheduleRunFrequency"],
    scheduleRunDays: !item["scheduleRunDays"]
      ? item["scheduleRunDays"]
      : item["scheduleRunDays"].map((p: any) => {
          return p;
        }),
    scheduleRunTimes: !item["scheduleRunTimes"]
      ? item["scheduleRunTimes"]
      : item["scheduleRunTimes"].map((p: any) => {
          return new Date(p);
        }),
    hourlySchedule: !item["hourlySchedule"]
      ? item["hourlySchedule"]
      : hourlyScheduleDeserializer(item["hourlySchedule"]),
    scheduleWeeklyFrequency: item["scheduleWeeklyFrequency"],
  };
}

/** Frequency of the schedule operation of this policy. */
export enum KnownScheduleRunType {
  /** Invalid */
  Invalid = "Invalid",
  /** Daily */
  Daily = "Daily",
  /** Weekly */
  Weekly = "Weekly",
  /** Hourly */
  Hourly = "Hourly",
}

/**
 * Frequency of the schedule operation of this policy. \
 * {@link KnownScheduleRunType} can be used interchangeably with ScheduleRunType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Daily** \
 * **Weekly** \
 * **Hourly**
 */
export type ScheduleRunType = string;
/** Type of DayOfWeek */
export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

/** model interface HourlySchedule */
export interface HourlySchedule {
  /**
   * Interval at which backup needs to be triggered. For hourly the value
   * can be 4/6/8/12
   */
  interval?: number;
  /** To specify start time of the backup window */
  scheduleWindowStartTime?: Date;
  /** To specify duration of the backup window */
  scheduleWindowDuration?: number;
}

export function hourlyScheduleSerializer(item: HourlySchedule): any {
  return {
    interval: item["interval"],
    scheduleWindowStartTime: !item["scheduleWindowStartTime"]
      ? item["scheduleWindowStartTime"]
      : item["scheduleWindowStartTime"].toISOString(),
    scheduleWindowDuration: item["scheduleWindowDuration"],
  };
}

export function hourlyScheduleDeserializer(item: any): HourlySchedule {
  return {
    interval: item["interval"],
    scheduleWindowStartTime: !item["scheduleWindowStartTime"]
      ? item["scheduleWindowStartTime"]
      : new Date(item["scheduleWindowStartTime"]),
    scheduleWindowDuration: item["scheduleWindowDuration"],
  };
}

/** The V2 policy schedule for IaaS that supports hourly backups. */
export interface SimpleSchedulePolicyV2 extends SchedulePolicy {
  /** Frequency of the schedule operation of this policy. */
  scheduleRunFrequency?: ScheduleRunType;
  /** hourly schedule of this policy */
  hourlySchedule?: HourlySchedule;
  /** Daily schedule of this policy */
  dailySchedule?: DailySchedule;
  /** Weekly schedule of this policy */
  weeklySchedule?: WeeklySchedule;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  schedulePolicyType: "SimpleSchedulePolicyV2";
}

export function simpleSchedulePolicyV2Serializer(item: SimpleSchedulePolicyV2): any {
  return {
    schedulePolicyType: item["schedulePolicyType"],
    scheduleRunFrequency: item["scheduleRunFrequency"],
    hourlySchedule: !item["hourlySchedule"]
      ? item["hourlySchedule"]
      : hourlyScheduleSerializer(item["hourlySchedule"]),
    dailySchedule: !item["dailySchedule"]
      ? item["dailySchedule"]
      : dailyScheduleSerializer(item["dailySchedule"]),
    weeklySchedule: !item["weeklySchedule"]
      ? item["weeklySchedule"]
      : weeklyScheduleSerializer(item["weeklySchedule"]),
  };
}

export function simpleSchedulePolicyV2Deserializer(item: any): SimpleSchedulePolicyV2 {
  return {
    schedulePolicyType: item["schedulePolicyType"],
    scheduleRunFrequency: item["scheduleRunFrequency"],
    hourlySchedule: !item["hourlySchedule"]
      ? item["hourlySchedule"]
      : hourlyScheduleDeserializer(item["hourlySchedule"]),
    dailySchedule: !item["dailySchedule"]
      ? item["dailySchedule"]
      : dailyScheduleDeserializer(item["dailySchedule"]),
    weeklySchedule: !item["weeklySchedule"]
      ? item["weeklySchedule"]
      : weeklyScheduleDeserializer(item["weeklySchedule"]),
  };
}

/** model interface DailySchedule */
export interface DailySchedule {
  /** List of times of day this schedule has to be run. */
  scheduleRunTimes?: Date[];
}

export function dailyScheduleSerializer(item: DailySchedule): any {
  return {
    scheduleRunTimes: !item["scheduleRunTimes"]
      ? item["scheduleRunTimes"]
      : item["scheduleRunTimes"].map((p: any) => {
          return p.toISOString();
        }),
  };
}

export function dailyScheduleDeserializer(item: any): DailySchedule {
  return {
    scheduleRunTimes: !item["scheduleRunTimes"]
      ? item["scheduleRunTimes"]
      : item["scheduleRunTimes"].map((p: any) => {
          return new Date(p);
        }),
  };
}

/** model interface WeeklySchedule */
export interface WeeklySchedule {
  scheduleRunDays?: DayOfWeek[];
  /** List of times of day this schedule has to be run. */
  scheduleRunTimes?: Date[];
}

export function weeklyScheduleSerializer(item: WeeklySchedule): any {
  return {
    scheduleRunDays: !item["scheduleRunDays"]
      ? item["scheduleRunDays"]
      : item["scheduleRunDays"].map((p: any) => {
          return p;
        }),
    scheduleRunTimes: !item["scheduleRunTimes"]
      ? item["scheduleRunTimes"]
      : item["scheduleRunTimes"].map((p: any) => {
          return p.toISOString();
        }),
  };
}

export function weeklyScheduleDeserializer(item: any): WeeklySchedule {
  return {
    scheduleRunDays: !item["scheduleRunDays"]
      ? item["scheduleRunDays"]
      : item["scheduleRunDays"].map((p: any) => {
          return p;
        }),
    scheduleRunTimes: !item["scheduleRunTimes"]
      ? item["scheduleRunTimes"]
      : item["scheduleRunTimes"].map((p: any) => {
          return new Date(p);
        }),
  };
}

/** Base class for retention policy. */
export interface RetentionPolicy {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: LongTermRetentionPolicy, SimpleRetentionPolicy */
  retentionPolicyType: string;
}

export function retentionPolicySerializer(item: RetentionPolicy): any {
  return { retentionPolicyType: item["retentionPolicyType"] };
}

export function retentionPolicyDeserializer(item: any): RetentionPolicy {
  return {
    retentionPolicyType: item["retentionPolicyType"],
  };
}

/** Alias for RetentionPolicyUnion */
export type RetentionPolicyUnion =
  | LongTermRetentionPolicy
  | SimpleRetentionPolicy
  | RetentionPolicy;

export function retentionPolicyUnionSerializer(item: RetentionPolicyUnion): any {
  switch (item.retentionPolicyType) {
    case "LongTermRetentionPolicy":
      return longTermRetentionPolicySerializer(item as LongTermRetentionPolicy);

    case "SimpleRetentionPolicy":
      return simpleRetentionPolicySerializer(item as SimpleRetentionPolicy);

    default:
      return retentionPolicySerializer(item);
  }
}

export function retentionPolicyUnionDeserializer(item: any): RetentionPolicyUnion {
  switch (item.retentionPolicyType) {
    case "LongTermRetentionPolicy":
      return longTermRetentionPolicyDeserializer(item as LongTermRetentionPolicy);

    case "SimpleRetentionPolicy":
      return simpleRetentionPolicyDeserializer(item as SimpleRetentionPolicy);

    default:
      return retentionPolicyDeserializer(item);
  }
}

/** Long term retention policy. */
export interface LongTermRetentionPolicy extends RetentionPolicy {
  /** Daily retention schedule of the protection policy. */
  dailySchedule?: DailyRetentionSchedule;
  /** Weekly retention schedule of the protection policy. */
  weeklySchedule?: WeeklyRetentionSchedule;
  /** Monthly retention schedule of the protection policy. */
  monthlySchedule?: MonthlyRetentionSchedule;
  /** Yearly retention schedule of the protection policy. */
  yearlySchedule?: YearlyRetentionSchedule;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  retentionPolicyType: "LongTermRetentionPolicy";
}

export function longTermRetentionPolicySerializer(item: LongTermRetentionPolicy): any {
  return {
    retentionPolicyType: item["retentionPolicyType"],
    dailySchedule: !item["dailySchedule"]
      ? item["dailySchedule"]
      : dailyRetentionScheduleSerializer(item["dailySchedule"]),
    weeklySchedule: !item["weeklySchedule"]
      ? item["weeklySchedule"]
      : weeklyRetentionScheduleSerializer(item["weeklySchedule"]),
    monthlySchedule: !item["monthlySchedule"]
      ? item["monthlySchedule"]
      : monthlyRetentionScheduleSerializer(item["monthlySchedule"]),
    yearlySchedule: !item["yearlySchedule"]
      ? item["yearlySchedule"]
      : yearlyRetentionScheduleSerializer(item["yearlySchedule"]),
  };
}

export function longTermRetentionPolicyDeserializer(item: any): LongTermRetentionPolicy {
  return {
    retentionPolicyType: item["retentionPolicyType"],
    dailySchedule: !item["dailySchedule"]
      ? item["dailySchedule"]
      : dailyRetentionScheduleDeserializer(item["dailySchedule"]),
    weeklySchedule: !item["weeklySchedule"]
      ? item["weeklySchedule"]
      : weeklyRetentionScheduleDeserializer(item["weeklySchedule"]),
    monthlySchedule: !item["monthlySchedule"]
      ? item["monthlySchedule"]
      : monthlyRetentionScheduleDeserializer(item["monthlySchedule"]),
    yearlySchedule: !item["yearlySchedule"]
      ? item["yearlySchedule"]
      : yearlyRetentionScheduleDeserializer(item["yearlySchedule"]),
  };
}

/** Daily retention schedule. */
export interface DailyRetentionSchedule {
  /** Retention times of retention policy. */
  retentionTimes?: Date[];
  /** Retention duration of retention Policy. */
  retentionDuration?: RetentionDuration;
}

export function dailyRetentionScheduleSerializer(item: DailyRetentionSchedule): any {
  return {
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return p.toISOString();
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationSerializer(item["retentionDuration"]),
  };
}

export function dailyRetentionScheduleDeserializer(item: any): DailyRetentionSchedule {
  return {
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return new Date(p);
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationDeserializer(item["retentionDuration"]),
  };
}

/** Retention duration. */
export interface RetentionDuration {
  /**
   * Count of duration types. Retention duration is obtained by the counting the duration type Count times.
   * For example, when Count = 3 and DurationType = Weeks, retention duration will be three weeks.
   */
  count?: number;
  /** Retention duration type of retention policy. */
  durationType?: RetentionDurationType;
}

export function retentionDurationSerializer(item: RetentionDuration): any {
  return { count: item["count"], durationType: item["durationType"] };
}

export function retentionDurationDeserializer(item: any): RetentionDuration {
  return {
    count: item["count"],
    durationType: item["durationType"],
  };
}

/** Retention duration type of retention policy. */
export enum KnownRetentionDurationType {
  /** Invalid */
  Invalid = "Invalid",
  /** Days */
  Days = "Days",
  /** Weeks */
  Weeks = "Weeks",
  /** Months */
  Months = "Months",
  /** Years */
  Years = "Years",
}

/**
 * Retention duration type of retention policy. \
 * {@link KnownRetentionDurationType} can be used interchangeably with RetentionDurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Days** \
 * **Weeks** \
 * **Months** \
 * **Years**
 */
export type RetentionDurationType = string;

/** Weekly retention schedule. */
export interface WeeklyRetentionSchedule {
  /** List of days of week for weekly retention policy. */
  daysOfTheWeek?: DayOfWeek[];
  /** Retention times of retention policy. */
  retentionTimes?: Date[];
  /** Retention duration of retention Policy. */
  retentionDuration?: RetentionDuration;
}

export function weeklyRetentionScheduleSerializer(item: WeeklyRetentionSchedule): any {
  return {
    daysOfTheWeek: !item["daysOfTheWeek"]
      ? item["daysOfTheWeek"]
      : item["daysOfTheWeek"].map((p: any) => {
          return p;
        }),
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return p.toISOString();
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationSerializer(item["retentionDuration"]),
  };
}

export function weeklyRetentionScheduleDeserializer(item: any): WeeklyRetentionSchedule {
  return {
    daysOfTheWeek: !item["daysOfTheWeek"]
      ? item["daysOfTheWeek"]
      : item["daysOfTheWeek"].map((p: any) => {
          return p;
        }),
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return new Date(p);
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationDeserializer(item["retentionDuration"]),
  };
}

/** Monthly retention schedule. */
export interface MonthlyRetentionSchedule {
  /** Retention schedule format type for monthly retention policy. */
  retentionScheduleFormatType?: RetentionScheduleFormat;
  /** Daily retention format for monthly retention policy. */
  retentionScheduleDaily?: DailyRetentionFormat;
  /** Weekly retention format for monthly retention policy. */
  retentionScheduleWeekly?: WeeklyRetentionFormat;
  /** Retention times of retention policy. */
  retentionTimes?: Date[];
  /** Retention duration of retention Policy. */
  retentionDuration?: RetentionDuration;
}

export function monthlyRetentionScheduleSerializer(item: MonthlyRetentionSchedule): any {
  return {
    retentionScheduleFormatType: item["retentionScheduleFormatType"],
    retentionScheduleDaily: !item["retentionScheduleDaily"]
      ? item["retentionScheduleDaily"]
      : dailyRetentionFormatSerializer(item["retentionScheduleDaily"]),
    retentionScheduleWeekly: !item["retentionScheduleWeekly"]
      ? item["retentionScheduleWeekly"]
      : weeklyRetentionFormatSerializer(item["retentionScheduleWeekly"]),
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return p.toISOString();
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationSerializer(item["retentionDuration"]),
  };
}

export function monthlyRetentionScheduleDeserializer(item: any): MonthlyRetentionSchedule {
  return {
    retentionScheduleFormatType: item["retentionScheduleFormatType"],
    retentionScheduleDaily: !item["retentionScheduleDaily"]
      ? item["retentionScheduleDaily"]
      : dailyRetentionFormatDeserializer(item["retentionScheduleDaily"]),
    retentionScheduleWeekly: !item["retentionScheduleWeekly"]
      ? item["retentionScheduleWeekly"]
      : weeklyRetentionFormatDeserializer(item["retentionScheduleWeekly"]),
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return new Date(p);
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationDeserializer(item["retentionDuration"]),
  };
}

/** Retention schedule format type for monthly retention policy. */
export enum KnownRetentionScheduleFormat {
  /** Invalid */
  Invalid = "Invalid",
  /** Daily */
  Daily = "Daily",
  /** Weekly */
  Weekly = "Weekly",
}

/**
 * Retention schedule format type for monthly retention policy. \
 * {@link KnownRetentionScheduleFormat} can be used interchangeably with RetentionScheduleFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Daily** \
 * **Weekly**
 */
export type RetentionScheduleFormat = string;

/** Daily retention format. */
export interface DailyRetentionFormat {
  /** List of days of the month. */
  daysOfTheMonth?: Day[];
}

export function dailyRetentionFormatSerializer(item: DailyRetentionFormat): any {
  return {
    daysOfTheMonth: !item["daysOfTheMonth"]
      ? item["daysOfTheMonth"]
      : dayArraySerializer(item["daysOfTheMonth"]),
  };
}

export function dailyRetentionFormatDeserializer(item: any): DailyRetentionFormat {
  return {
    daysOfTheMonth: !item["daysOfTheMonth"]
      ? item["daysOfTheMonth"]
      : dayArrayDeserializer(item["daysOfTheMonth"]),
  };
}

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

/** Day of the week. */
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

/** Weekly retention format. */
export interface WeeklyRetentionFormat {
  /** List of days of the week. */
  daysOfTheWeek?: DayOfWeek[];
  /** List of weeks of month. */
  weeksOfTheMonth?: WeekOfMonth[];
}

export function weeklyRetentionFormatSerializer(item: WeeklyRetentionFormat): any {
  return {
    daysOfTheWeek: !item["daysOfTheWeek"]
      ? item["daysOfTheWeek"]
      : item["daysOfTheWeek"].map((p: any) => {
          return p;
        }),
    weeksOfTheMonth: !item["weeksOfTheMonth"]
      ? item["weeksOfTheMonth"]
      : item["weeksOfTheMonth"].map((p: any) => {
          return p;
        }),
  };
}

export function weeklyRetentionFormatDeserializer(item: any): WeeklyRetentionFormat {
  return {
    daysOfTheWeek: !item["daysOfTheWeek"]
      ? item["daysOfTheWeek"]
      : item["daysOfTheWeek"].map((p: any) => {
          return p;
        }),
    weeksOfTheMonth: !item["weeksOfTheMonth"]
      ? item["weeksOfTheMonth"]
      : item["weeksOfTheMonth"].map((p: any) => {
          return p;
        }),
  };
}

/** Type of WeekOfMonth */
export type WeekOfMonth = "First" | "Second" | "Third" | "Fourth" | "Last" | "Invalid";

/** Yearly retention schedule. */
export interface YearlyRetentionSchedule {
  /** Retention schedule format for yearly retention policy. */
  retentionScheduleFormatType?: RetentionScheduleFormat;
  /** List of months of year of yearly retention policy. */
  monthsOfYear?: MonthOfYear[];
  /** Daily retention format for yearly retention policy. */
  retentionScheduleDaily?: DailyRetentionFormat;
  /** Weekly retention format for yearly retention policy. */
  retentionScheduleWeekly?: WeeklyRetentionFormat;
  /** Retention times of retention policy. */
  retentionTimes?: Date[];
  /** Retention duration of retention Policy. */
  retentionDuration?: RetentionDuration;
}

export function yearlyRetentionScheduleSerializer(item: YearlyRetentionSchedule): any {
  return {
    retentionScheduleFormatType: item["retentionScheduleFormatType"],
    monthsOfYear: !item["monthsOfYear"]
      ? item["monthsOfYear"]
      : item["monthsOfYear"].map((p: any) => {
          return p;
        }),
    retentionScheduleDaily: !item["retentionScheduleDaily"]
      ? item["retentionScheduleDaily"]
      : dailyRetentionFormatSerializer(item["retentionScheduleDaily"]),
    retentionScheduleWeekly: !item["retentionScheduleWeekly"]
      ? item["retentionScheduleWeekly"]
      : weeklyRetentionFormatSerializer(item["retentionScheduleWeekly"]),
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return p.toISOString();
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationSerializer(item["retentionDuration"]),
  };
}

export function yearlyRetentionScheduleDeserializer(item: any): YearlyRetentionSchedule {
  return {
    retentionScheduleFormatType: item["retentionScheduleFormatType"],
    monthsOfYear: !item["monthsOfYear"]
      ? item["monthsOfYear"]
      : item["monthsOfYear"].map((p: any) => {
          return p;
        }),
    retentionScheduleDaily: !item["retentionScheduleDaily"]
      ? item["retentionScheduleDaily"]
      : dailyRetentionFormatDeserializer(item["retentionScheduleDaily"]),
    retentionScheduleWeekly: !item["retentionScheduleWeekly"]
      ? item["retentionScheduleWeekly"]
      : weeklyRetentionFormatDeserializer(item["retentionScheduleWeekly"]),
    retentionTimes: !item["retentionTimes"]
      ? item["retentionTimes"]
      : item["retentionTimes"].map((p: any) => {
          return new Date(p);
        }),
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationDeserializer(item["retentionDuration"]),
  };
}

/** Type of MonthOfYear */
export type MonthOfYear =
  | "Invalid"
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

/** Simple policy retention. */
export interface SimpleRetentionPolicy extends RetentionPolicy {
  /** Retention duration of the protection policy. */
  retentionDuration?: RetentionDuration;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  retentionPolicyType: "SimpleRetentionPolicy";
}

export function simpleRetentionPolicySerializer(item: SimpleRetentionPolicy): any {
  return {
    retentionPolicyType: item["retentionPolicyType"],
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationSerializer(item["retentionDuration"]),
  };
}

export function simpleRetentionPolicyDeserializer(item: any): SimpleRetentionPolicy {
  return {
    retentionPolicyType: item["retentionPolicyType"],
    retentionDuration: !item["retentionDuration"]
      ? item["retentionDuration"]
      : retentionDurationDeserializer(item["retentionDuration"]),
  };
}

export function tieringPolicyRecordSerializer(
  item: Record<string, TieringPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : tieringPolicySerializer(item[key]);
  });
  return result;
}

export function tieringPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, TieringPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : tieringPolicyDeserializer(item[key]);
  });
  return result;
}

/**
 * Tiering Policy for a target tier.
 * If the policy is not specified for a given target tier, service retains the existing configured tiering policy for that tier
 */
export interface TieringPolicy {
  /**
   * Tiering Mode to control automatic tiering of recovery points. Supported values are:
   * 1. TierRecommended: Tier all recovery points recommended to be tiered
   * 2. TierAfter: Tier all recovery points after a fixed period, as specified in duration + durationType below.
   * 3. DoNotTier: Do not tier any recovery points
   */
  tieringMode?: TieringMode;
  /**
   * Number of days/weeks/months/years to retain backups in current tier before tiering.
   * Used only if TieringMode is set to TierAfter
   */
  duration?: number;
  /**
   * Retention duration type: days/weeks/months/years
   * Used only if TieringMode is set to TierAfter
   */
  durationType?: RetentionDurationType;
}

export function tieringPolicySerializer(item: TieringPolicy): any {
  return {
    tieringMode: item["tieringMode"],
    duration: item["duration"],
    durationType: item["durationType"],
  };
}

export function tieringPolicyDeserializer(item: any): TieringPolicy {
  return {
    tieringMode: item["tieringMode"],
    duration: item["duration"],
    durationType: item["durationType"],
  };
}

/**
 * Tiering Mode to control automatic tiering of recovery points. Supported values are:
 * 1. TierRecommended: Tier all recovery points recommended to be tiered
 * 2. TierAfter: Tier all recovery points after a fixed period, as specified in duration + durationType below.
 * 3. DoNotTier: Do not tier any recovery points
 */
export enum KnownTieringMode {
  /** Invalid */
  Invalid = "Invalid",
  /** TierRecommended */
  TierRecommended = "TierRecommended",
  /** TierAfter */
  TierAfter = "TierAfter",
  /** DoNotTier */
  DoNotTier = "DoNotTier",
}

/**
 * Tiering Mode to control automatic tiering of recovery points. Supported values are:
 * 1. TierRecommended: Tier all recovery points recommended to be tiered
 * 2. TierAfter: Tier all recovery points after a fixed period, as specified in duration + durationType below.
 * 3. DoNotTier: Do not tier any recovery points \
 * {@link KnownTieringMode} can be used interchangeably with TieringMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **TierRecommended** \
 * **TierAfter** \
 * **DoNotTier**
 */
export type TieringMode = string;

/** Snapshot Backup related fields for WorkloadType SaPHanaSystem */
export interface SnapshotBackupAdditionalDetails {
  instantRpRetentionRangeInDays?: number;
  instantRPDetails?: string;
  /** User assigned managed identity details */
  userAssignedManagedIdentityDetails?: UserAssignedManagedIdentityDetails;
}

export function snapshotBackupAdditionalDetailsSerializer(
  item: SnapshotBackupAdditionalDetails,
): any {
  return {
    instantRpRetentionRangeInDays: item["instantRpRetentionRangeInDays"],
    instantRPDetails: item["instantRPDetails"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsSerializer(item["userAssignedManagedIdentityDetails"]),
  };
}

export function snapshotBackupAdditionalDetailsDeserializer(
  item: any,
): SnapshotBackupAdditionalDetails {
  return {
    instantRpRetentionRangeInDays: item["instantRpRetentionRangeInDays"],
    instantRPDetails: item["instantRPDetails"],
    userAssignedManagedIdentityDetails: !item["userAssignedManagedIdentityDetails"]
      ? item["userAssignedManagedIdentityDetails"]
      : userAssignedManagedIdentityDetailsDeserializer(item["userAssignedManagedIdentityDetails"]),
  };
}

/** AzureStorage backup policy. */
export interface AzureFileShareProtectionPolicy extends ProtectionPolicy {
  /** Type of workload for the backup management */
  workLoadType?: WorkloadType;
  /** Backup schedule specified as part of backup policy. */
  schedulePolicy?: SchedulePolicyUnion;
  /** Retention policy with the details on backup copy retention ranges. */
  retentionPolicy?: RetentionPolicyUnion;
  /** Retention policy with the details on hardened backup copy retention ranges. */
  vaultRetentionPolicy?: VaultRetentionPolicy;
  /** TimeZone optional input as string. For example: TimeZone = "Pacific Standard Time". */
  timeZone?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  backupManagementType: "AzureStorage";
}

export function azureFileShareProtectionPolicySerializer(
  item: AzureFileShareProtectionPolicy,
): any {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    workLoadType: item["workLoadType"],
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionSerializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionSerializer(item["retentionPolicy"]),
    vaultRetentionPolicy: !item["vaultRetentionPolicy"]
      ? item["vaultRetentionPolicy"]
      : vaultRetentionPolicySerializer(item["vaultRetentionPolicy"]),
    timeZone: item["timeZone"],
  };
}

export function azureFileShareProtectionPolicyDeserializer(
  item: any,
): AzureFileShareProtectionPolicy {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    workLoadType: item["workLoadType"],
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionDeserializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionDeserializer(item["retentionPolicy"]),
    vaultRetentionPolicy: !item["vaultRetentionPolicy"]
      ? item["vaultRetentionPolicy"]
      : vaultRetentionPolicyDeserializer(item["vaultRetentionPolicy"]),
    timeZone: item["timeZone"],
  };
}

/** Vault retention policy for AzureFileShare */
export interface VaultRetentionPolicy {
  /** Base class for retention policy. */
  vaultRetention: RetentionPolicyUnion;
  snapshotRetentionInDays: number;
}

export function vaultRetentionPolicySerializer(item: VaultRetentionPolicy): any {
  return {
    vaultRetention: retentionPolicyUnionSerializer(item["vaultRetention"]),
    snapshotRetentionInDays: item["snapshotRetentionInDays"],
  };
}

export function vaultRetentionPolicyDeserializer(item: any): VaultRetentionPolicy {
  return {
    vaultRetention: retentionPolicyUnionDeserializer(item["vaultRetention"]),
    snapshotRetentionInDays: item["snapshotRetentionInDays"],
  };
}

/** IaaS VM workload-specific backup policy. */
export interface AzureIaaSVMProtectionPolicy extends ProtectionPolicy {
  instantRPDetails?: InstantRPAdditionalDetails;
  /** Backup schedule specified as part of backup policy. */
  schedulePolicy?: SchedulePolicyUnion;
  /** Retention policy with the details on backup copy retention ranges. */
  retentionPolicy?: RetentionPolicyUnion;
  /**
   * Tiering policy to automatically move RPs to another tier
   * Key is Target Tier, defined in RecoveryPointTierType enum.
   * Tiering policy specifies the criteria to move RP to the target tier.
   */
  tieringPolicy?: Record<string, TieringPolicy>;
  /** Instant RP retention policy range in days */
  instantRpRetentionRangeInDays?: number;
  /** TimeZone optional input as string. For example: TimeZone = "Pacific Standard Time". */
  timeZone?: string;
  policyType?: IaasvmPolicyType;
  snapshotConsistencyType?: IaasVMSnapshotConsistencyType;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  backupManagementType: "AzureIaasVM";
}

export function azureIaaSVMProtectionPolicySerializer(item: AzureIaaSVMProtectionPolicy): any {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    instantRPDetails: !item["instantRPDetails"]
      ? item["instantRPDetails"]
      : instantRPAdditionalDetailsSerializer(item["instantRPDetails"]),
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionSerializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionSerializer(item["retentionPolicy"]),
    tieringPolicy: !item["tieringPolicy"]
      ? item["tieringPolicy"]
      : tieringPolicyRecordSerializer(item["tieringPolicy"]),
    instantRpRetentionRangeInDays: item["instantRpRetentionRangeInDays"],
    timeZone: item["timeZone"],
    policyType: item["policyType"],
    snapshotConsistencyType: item["snapshotConsistencyType"],
  };
}

export function azureIaaSVMProtectionPolicyDeserializer(item: any): AzureIaaSVMProtectionPolicy {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    instantRPDetails: !item["instantRPDetails"]
      ? item["instantRPDetails"]
      : instantRPAdditionalDetailsDeserializer(item["instantRPDetails"]),
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionDeserializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionDeserializer(item["retentionPolicy"]),
    tieringPolicy: !item["tieringPolicy"]
      ? item["tieringPolicy"]
      : tieringPolicyRecordDeserializer(item["tieringPolicy"]),
    instantRpRetentionRangeInDays: item["instantRpRetentionRangeInDays"],
    timeZone: item["timeZone"],
    policyType: item["policyType"],
    snapshotConsistencyType: item["snapshotConsistencyType"],
  };
}

/** model interface InstantRPAdditionalDetails */
export interface InstantRPAdditionalDetails {
  azureBackupRGNamePrefix?: string;
  azureBackupRGNameSuffix?: string;
}

export function instantRPAdditionalDetailsSerializer(item: InstantRPAdditionalDetails): any {
  return {
    azureBackupRGNamePrefix: item["azureBackupRGNamePrefix"],
    azureBackupRGNameSuffix: item["azureBackupRGNameSuffix"],
  };
}

export function instantRPAdditionalDetailsDeserializer(item: any): InstantRPAdditionalDetails {
  return {
    azureBackupRGNamePrefix: item["azureBackupRGNamePrefix"],
    azureBackupRGNameSuffix: item["azureBackupRGNameSuffix"],
  };
}

/** Known values of {@link IAASVMPolicyType} that the service accepts. */
export enum KnownIaasvmPolicyType {
  /** Invalid */
  Invalid = "Invalid",
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/** Type of IaasvmPolicyType */
export type IaasvmPolicyType = string;

/** Known values of {@link IaasVMSnapshotConsistencyType} that the service accepts. */
export enum KnownIaasVMSnapshotConsistencyType {
  /** OnlyCrashConsistent */
  OnlyCrashConsistent = "OnlyCrashConsistent",
}

/** Type of IaasVMSnapshotConsistencyType */
export type IaasVMSnapshotConsistencyType = string;

/** Azure SQL workload-specific backup policy. */
export interface AzureSqlProtectionPolicy extends ProtectionPolicy {
  /** Retention policy details. */
  retentionPolicy?: RetentionPolicyUnion;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  backupManagementType: "AzureSql";
}

export function azureSqlProtectionPolicySerializer(item: AzureSqlProtectionPolicy): any {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionSerializer(item["retentionPolicy"]),
  };
}

export function azureSqlProtectionPolicyDeserializer(item: any): AzureSqlProtectionPolicy {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionDeserializer(item["retentionPolicy"]),
  };
}

/** Azure VM (Mercury) workload-specific backup policy. */
export interface GenericProtectionPolicy extends ProtectionPolicy {
  /** List of sub-protection policies which includes schedule and retention */
  subProtectionPolicy?: SubProtectionPolicy[];
  /** TimeZone optional input as string. For example: TimeZone = "Pacific Standard Time". */
  timeZone?: string;
  /** Name of this policy's fabric. */
  fabricName?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  backupManagementType: "GenericProtectionPolicy";
}

export function genericProtectionPolicySerializer(item: GenericProtectionPolicy): any {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    subProtectionPolicy: !item["subProtectionPolicy"]
      ? item["subProtectionPolicy"]
      : subProtectionPolicyArraySerializer(item["subProtectionPolicy"]),
    timeZone: item["timeZone"],
    fabricName: item["fabricName"],
  };
}

export function genericProtectionPolicyDeserializer(item: any): GenericProtectionPolicy {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    subProtectionPolicy: !item["subProtectionPolicy"]
      ? item["subProtectionPolicy"]
      : subProtectionPolicyArrayDeserializer(item["subProtectionPolicy"]),
    timeZone: item["timeZone"],
    fabricName: item["fabricName"],
  };
}

/** Mab container-specific backup policy. */
export interface MabProtectionPolicy extends ProtectionPolicy {
  /** Backup schedule of backup policy. */
  schedulePolicy?: SchedulePolicyUnion;
  /** Retention policy details. */
  retentionPolicy?: RetentionPolicyUnion;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  backupManagementType: "MAB";
}

export function mabProtectionPolicySerializer(item: MabProtectionPolicy): any {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionSerializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionSerializer(item["retentionPolicy"]),
  };
}

export function mabProtectionPolicyDeserializer(item: any): MabProtectionPolicy {
  return {
    protectedItemsCount: item["protectedItemsCount"],
    backupManagementType: item["backupManagementType"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
    schedulePolicy: !item["schedulePolicy"]
      ? item["schedulePolicy"]
      : schedulePolicyUnionDeserializer(item["schedulePolicy"]),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyUnionDeserializer(item["retentionPolicy"]),
  };
}

/** List of ProtectionPolicy resources */
export interface _ProtectionPolicyResourceList extends ResourceList {
  /** List of resources. */
  value?: ProtectionPolicyResource[];
}

export function _protectionPolicyResourceListDeserializer(
  item: any,
): _ProtectionPolicyResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : protectionPolicyResourceArrayDeserializer(item["value"]),
  };
}

export function protectionPolicyResourceArraySerializer(
  result: Array<ProtectionPolicyResource>,
): any[] {
  return result.map((item) => {
    return protectionPolicyResourceSerializer(item);
  });
}

export function protectionPolicyResourceArrayDeserializer(
  result: Array<ProtectionPolicyResource>,
): any[] {
  return result.map((item) => {
    return protectionPolicyResourceDeserializer(item);
  });
}

/** Defines workload agnostic properties for a job. */
export interface JobResource extends Resource {
  /** JobResource properties */
  properties?: JobUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function jobResourceDeserializer(item: any): JobResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"] ? item["properties"] : jobUnionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Defines workload agnostic properties for a job. */
export interface Job {
  /** Friendly name of the entity on which the current job is executing. */
  entityFriendlyName?: string;
  /** Backup management type to execute the current job. */
  backupManagementType?: BackupManagementType;
  /** The operation name. */
  operation?: string;
  /** Job status. */
  status?: string;
  /** The start time. */
  startTime?: Date;
  /** The end time. */
  endTime?: Date;
  /** ActivityId of job. */
  activityId?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureIaaSVMJob, AzureIaaSVMJobV2, AzureStorageJob, AzureWorkloadJob, DpmJob, MabJob, VaultJob */
  jobType: string;
}

export function jobDeserializer(item: any): Job {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
  };
}

/** Alias for JobUnion */
export type JobUnion =
  | AzureIaaSVMJob
  | AzureIaaSVMJobV2
  | AzureStorageJob
  | AzureWorkloadJob
  | DpmJob
  | MabJob
  | VaultJob
  | Job;

export function jobUnionDeserializer(item: any): JobUnion {
  switch (item.jobType) {
    case "AzureIaaSVMJob":
      return azureIaaSVMJobDeserializer(item as AzureIaaSVMJob);

    case "AzureIaaSVMJobV2":
      return azureIaaSVMJobV2Deserializer(item as AzureIaaSVMJobV2);

    case "AzureStorageJob":
      return azureStorageJobDeserializer(item as AzureStorageJob);

    case "AzureWorkloadJob":
      return azureWorkloadJobDeserializer(item as AzureWorkloadJob);

    case "DpmJob":
      return dpmJobDeserializer(item as DpmJob);

    case "MabJob":
      return mabJobDeserializer(item as MabJob);

    case "VaultJob":
      return vaultJobDeserializer(item as VaultJob);

    default:
      return jobDeserializer(item);
  }
}

/** Azure IaaS VM workload-specific job object. */
export interface AzureIaaSVMJob extends Job {
  /** Time elapsed during the execution of this job. */
  duration?: string;
  /** Gets or sets the state/actions applicable on this job like cancel/retry. */
  actionsInfo?: JobSupportedAction[];
  /** Error details on execution of this job. */
  errorDetails?: AzureIaaSVMErrorInfo[];
  /** Specifies whether the backup item is a Classic or an Azure Resource Manager VM. */
  virtualMachineVersion?: string;
  /** Additional information for this job. */
  extendedInfo?: AzureIaaSVMJobExtendedInfo;
  /** Container name of the entity on which the current job is executing. */
  containerName?: string;
  /** Indicated that whether the job is adhoc(true) or scheduled(false) */
  isUserTriggered?: boolean;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  jobType: "AzureIaaSVMJob";
}

export function azureIaaSVMJobDeserializer(item: any): AzureIaaSVMJob {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
    duration: item["duration"],
    actionsInfo: !item["actionsInfo"]
      ? item["actionsInfo"]
      : item["actionsInfo"].map((p: any) => {
          return p;
        }),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : azureIaaSVMErrorInfoArrayDeserializer(item["errorDetails"]),
    virtualMachineVersion: item["virtualMachineVersion"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMJobExtendedInfoDeserializer(item["extendedInfo"]),
    containerName: item["containerName"],
    isUserTriggered: item["isUserTriggered"],
  };
}

/** Type of JobSupportedAction */
export type JobSupportedAction = "Invalid" | "Cancellable" | "Retriable";

export function azureIaaSVMErrorInfoArrayDeserializer(result: Array<AzureIaaSVMErrorInfo>): any[] {
  return result.map((item) => {
    return azureIaaSVMErrorInfoDeserializer(item);
  });
}

/** Azure IaaS VM workload-specific error information. */
export interface AzureIaaSVMErrorInfo {
  /** Error code. */
  readonly errorCode?: number;
  /** Title: Typically, the entity that the error pertains to. */
  readonly errorTitle?: string;
  /** Localized error string. */
  readonly errorString?: string;
  /** List of localized recommendations for above error code. */
  readonly recommendations?: string[];
}

export function azureIaaSVMErrorInfoDeserializer(item: any): AzureIaaSVMErrorInfo {
  return {
    errorCode: item["errorCode"],
    errorTitle: item["errorTitle"],
    errorString: item["errorString"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Azure IaaS VM workload-specific additional information for job. */
export interface AzureIaaSVMJobExtendedInfo {
  /** List of tasks associated with this job. */
  tasksList?: AzureIaaSVMJobTaskDetails[];
  /** Job properties. */
  propertyBag?: Record<string, string>;
  /** Job internal properties. */
  internalPropertyBag?: Record<string, string>;
  /** Indicates progress of the job. Null if it has not started or completed. */
  progressPercentage?: number;
  /** Time remaining for execution of this job. */
  estimatedRemainingDuration?: string;
  /** Non localized error message on job execution. */
  dynamicErrorMessage?: string;
}

export function azureIaaSVMJobExtendedInfoDeserializer(item: any): AzureIaaSVMJobExtendedInfo {
  return {
    tasksList: !item["tasksList"]
      ? item["tasksList"]
      : azureIaaSVMJobTaskDetailsArrayDeserializer(item["tasksList"]),
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : Object.fromEntries(
          Object.entries(item["propertyBag"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    internalPropertyBag: !item["internalPropertyBag"]
      ? item["internalPropertyBag"]
      : Object.fromEntries(
          Object.entries(item["internalPropertyBag"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    progressPercentage: item["progressPercentage"],
    estimatedRemainingDuration: item["estimatedRemainingDuration"],
    dynamicErrorMessage: item["dynamicErrorMessage"],
  };
}

export function azureIaaSVMJobTaskDetailsArrayDeserializer(
  result: Array<AzureIaaSVMJobTaskDetails>,
): any[] {
  return result.map((item) => {
    return azureIaaSVMJobTaskDetailsDeserializer(item);
  });
}

/** Azure IaaS VM workload-specific job task details. */
export interface AzureIaaSVMJobTaskDetails {
  /** The task display name. */
  taskId?: string;
  /** The start time. */
  startTime?: Date;
  /** The end time. */
  endTime?: Date;
  /** The instanceId. */
  instanceId?: string;
  /** Time elapsed for task. */
  duration?: string;
  /** The status. */
  status?: string;
  /** Progress of the task. */
  progressPercentage?: number;
  /**
   * Details about execution of the task.
   * eg: number of bytes transferred etc
   */
  taskExecutionDetails?: string;
}

export function azureIaaSVMJobTaskDetailsDeserializer(item: any): AzureIaaSVMJobTaskDetails {
  return {
    taskId: item["taskId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    instanceId: item["instanceId"],
    duration: item["duration"],
    status: item["status"],
    progressPercentage: item["progressPercentage"],
    taskExecutionDetails: item["taskExecutionDetails"],
  };
}

/** Azure IaaS VM workload-specific job object. */
export interface AzureIaaSVMJobV2 extends Job {
  /** Gets or sets the state/actions applicable on this job like cancel/retry. */
  actionsInfo?: JobSupportedAction[];
  /** Container name of the entity on which the current job is executing. */
  containerName?: string;
  /** Time elapsed during the execution of this job. */
  duration?: string;
  /** Error details on execution of this job. */
  errorDetails?: AzureIaaSVMErrorInfo[];
  /** Specifies whether the backup item is a Classic or an Azure Resource Manager VM. */
  virtualMachineVersion?: string;
  /** Additional information for this job. */
  extendedInfo?: AzureIaaSVMJobExtendedInfo;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  jobType: "AzureIaaSVMJobV2";
}

export function azureIaaSVMJobV2Deserializer(item: any): AzureIaaSVMJobV2 {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
    actionsInfo: !item["actionsInfo"]
      ? item["actionsInfo"]
      : item["actionsInfo"].map((p: any) => {
          return p;
        }),
    containerName: item["containerName"],
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : azureIaaSVMErrorInfoArrayDeserializer(item["errorDetails"]),
    virtualMachineVersion: item["virtualMachineVersion"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureIaaSVMJobExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Azure storage specific job. */
export interface AzureStorageJob extends Job {
  /** Time elapsed during the execution of this job. */
  duration?: string;
  /** Gets or sets the state/actions applicable on this job like cancel/retry. */
  actionsInfo?: JobSupportedAction[];
  /** Error details on execution of this job. */
  errorDetails?: AzureStorageErrorInfo[];
  /** Specifies friendly name of the storage account. */
  storageAccountName?: string;
  /** Specifies whether the Storage account is a Classic or an Azure Resource Manager Storage account. */
  storageAccountVersion?: string;
  /** Additional information about the job. */
  extendedInfo?: AzureStorageJobExtendedInfo;
  /** Indicated that whether the job is adhoc(true) or scheduled(false) */
  isUserTriggered?: boolean;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  jobType: "AzureStorageJob";
}

export function azureStorageJobDeserializer(item: any): AzureStorageJob {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
    duration: item["duration"],
    actionsInfo: !item["actionsInfo"]
      ? item["actionsInfo"]
      : item["actionsInfo"].map((p: any) => {
          return p;
        }),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : azureStorageErrorInfoArrayDeserializer(item["errorDetails"]),
    storageAccountName: item["storageAccountName"],
    storageAccountVersion: item["storageAccountVersion"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureStorageJobExtendedInfoDeserializer(item["extendedInfo"]),
    isUserTriggered: item["isUserTriggered"],
  };
}

export function azureStorageErrorInfoArrayDeserializer(
  result: Array<AzureStorageErrorInfo>,
): any[] {
  return result.map((item) => {
    return azureStorageErrorInfoDeserializer(item);
  });
}

/** Azure storage specific error information */
export interface AzureStorageErrorInfo {
  /** Error code. */
  errorCode?: number;
  /** Localized error string. */
  errorString?: string;
  /** List of localized recommendations for above error code. */
  recommendations?: string[];
}

export function azureStorageErrorInfoDeserializer(item: any): AzureStorageErrorInfo {
  return {
    errorCode: item["errorCode"],
    errorString: item["errorString"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Azure Storage workload-specific additional information for job. */
export interface AzureStorageJobExtendedInfo {
  /** List of tasks for this job */
  tasksList?: AzureStorageJobTaskDetails[];
  /** Job properties. */
  propertyBag?: Record<string, string>;
  /** Non localized error message on job execution. */
  dynamicErrorMessage?: string;
}

export function azureStorageJobExtendedInfoDeserializer(item: any): AzureStorageJobExtendedInfo {
  return {
    tasksList: !item["tasksList"]
      ? item["tasksList"]
      : azureStorageJobTaskDetailsArrayDeserializer(item["tasksList"]),
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : Object.fromEntries(
          Object.entries(item["propertyBag"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    dynamicErrorMessage: item["dynamicErrorMessage"],
  };
}

export function azureStorageJobTaskDetailsArrayDeserializer(
  result: Array<AzureStorageJobTaskDetails>,
): any[] {
  return result.map((item) => {
    return azureStorageJobTaskDetailsDeserializer(item);
  });
}

/** Azure storage workload specific job task details. */
export interface AzureStorageJobTaskDetails {
  /** The task display name. */
  taskId?: string;
  /** The status. */
  status?: string;
}

export function azureStorageJobTaskDetailsDeserializer(item: any): AzureStorageJobTaskDetails {
  return {
    taskId: item["taskId"],
    status: item["status"],
  };
}

/** Azure storage specific job. */
export interface AzureWorkloadJob extends Job {
  /** Workload type of the job */
  workloadType?: string;
  /** Time elapsed during the execution of this job. */
  duration?: string;
  /** Gets or sets the state/actions applicable on this job like cancel/retry. */
  actionsInfo?: JobSupportedAction[];
  /** Error details on execution of this job. */
  errorDetails?: AzureWorkloadErrorInfo[];
  /** Additional information about the job. */
  extendedInfo?: AzureWorkloadJobExtendedInfo;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  jobType: "AzureWorkloadJob";
}

export function azureWorkloadJobDeserializer(item: any): AzureWorkloadJob {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
    workloadType: item["workloadType"],
    duration: item["duration"],
    actionsInfo: !item["actionsInfo"]
      ? item["actionsInfo"]
      : item["actionsInfo"].map((p: any) => {
          return p;
        }),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : azureWorkloadErrorInfoArrayDeserializer(item["errorDetails"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : azureWorkloadJobExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

export function azureWorkloadErrorInfoArrayDeserializer(
  result: Array<AzureWorkloadErrorInfo>,
): any[] {
  return result.map((item) => {
    return azureWorkloadErrorInfoDeserializer(item);
  });
}

/** Azure storage specific error information */
export interface AzureWorkloadErrorInfo {
  /** Error code. */
  errorCode?: number;
  /** Localized error string. */
  errorString?: string;
  /** Title: Typically, the entity that the error pertains to. */
  errorTitle?: string;
  /** List of localized recommendations for above error code. */
  recommendations?: string[];
  /** Additional details for above error code. */
  additionalDetails?: string;
}

export function azureWorkloadErrorInfoDeserializer(item: any): AzureWorkloadErrorInfo {
  return {
    errorCode: item["errorCode"],
    errorString: item["errorString"],
    errorTitle: item["errorTitle"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
    additionalDetails: item["additionalDetails"],
  };
}

/** Azure VM workload-specific additional information for job. */
export interface AzureWorkloadJobExtendedInfo {
  /** List of tasks for this job */
  tasksList?: AzureWorkloadJobTaskDetails[];
  /** Job properties. */
  propertyBag?: Record<string, string>;
  /** Non localized error message on job execution. */
  dynamicErrorMessage?: string;
}

export function azureWorkloadJobExtendedInfoDeserializer(item: any): AzureWorkloadJobExtendedInfo {
  return {
    tasksList: !item["tasksList"]
      ? item["tasksList"]
      : azureWorkloadJobTaskDetailsArrayDeserializer(item["tasksList"]),
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : Object.fromEntries(
          Object.entries(item["propertyBag"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    dynamicErrorMessage: item["dynamicErrorMessage"],
  };
}

export function azureWorkloadJobTaskDetailsArrayDeserializer(
  result: Array<AzureWorkloadJobTaskDetails>,
): any[] {
  return result.map((item) => {
    return azureWorkloadJobTaskDetailsDeserializer(item);
  });
}

/** Azure VM workload specific job task details. */
export interface AzureWorkloadJobTaskDetails {
  /** The task display name. */
  taskId?: string;
  /** The status. */
  status?: string;
}

export function azureWorkloadJobTaskDetailsDeserializer(item: any): AzureWorkloadJobTaskDetails {
  return {
    taskId: item["taskId"],
    status: item["status"],
  };
}

/** DPM workload-specific job object. */
export interface DpmJob extends Job {
  /** Time elapsed for job. */
  duration?: string;
  /** DPM server name managing the backup item or backup job. */
  dpmServerName?: string;
  /** Name of cluster/server protecting current backup item, if any. */
  containerName?: string;
  /** Type of container. */
  containerType?: string;
  /** Type of backup item. */
  workloadType?: string;
  /** The state/actions applicable on this job like cancel/retry. */
  actionsInfo?: JobSupportedAction[];
  /** The errors. */
  errorDetails?: DpmErrorInfo[];
  /** Additional information for this job. */
  extendedInfo?: DpmJobExtendedInfo;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  jobType: "DpmJob";
}

export function dpmJobDeserializer(item: any): DpmJob {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
    duration: item["duration"],
    dpmServerName: item["dpmServerName"],
    containerName: item["containerName"],
    containerType: item["containerType"],
    workloadType: item["workloadType"],
    actionsInfo: !item["actionsInfo"]
      ? item["actionsInfo"]
      : item["actionsInfo"].map((p: any) => {
          return p;
        }),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : dpmErrorInfoArrayDeserializer(item["errorDetails"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : dpmJobExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

export function dpmErrorInfoArrayDeserializer(result: Array<DpmErrorInfo>): any[] {
  return result.map((item) => {
    return dpmErrorInfoDeserializer(item);
  });
}

/** DPM workload-specific error information. */
export interface DpmErrorInfo {
  /** Localized error string. */
  errorString?: string;
  /** List of localized recommendations for above error code. */
  recommendations?: string[];
}

export function dpmErrorInfoDeserializer(item: any): DpmErrorInfo {
  return {
    errorString: item["errorString"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Additional information on the DPM workload-specific job. */
export interface DpmJobExtendedInfo {
  /** List of tasks associated with this job. */
  tasksList?: DpmJobTaskDetails[];
  /** The job properties. */
  propertyBag?: Record<string, string>;
  /** Non localized error message on job execution. */
  dynamicErrorMessage?: string;
}

export function dpmJobExtendedInfoDeserializer(item: any): DpmJobExtendedInfo {
  return {
    tasksList: !item["tasksList"]
      ? item["tasksList"]
      : dpmJobTaskDetailsArrayDeserializer(item["tasksList"]),
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : Object.fromEntries(
          Object.entries(item["propertyBag"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    dynamicErrorMessage: item["dynamicErrorMessage"],
  };
}

export function dpmJobTaskDetailsArrayDeserializer(result: Array<DpmJobTaskDetails>): any[] {
  return result.map((item) => {
    return dpmJobTaskDetailsDeserializer(item);
  });
}

/** DPM workload-specific job task details. */
export interface DpmJobTaskDetails {
  /** The task display name. */
  taskId?: string;
  /** The start time. */
  startTime?: Date;
  /** The end time. */
  endTime?: Date;
  /** Time elapsed for task. */
  duration?: string;
  /** The status. */
  status?: string;
}

export function dpmJobTaskDetailsDeserializer(item: any): DpmJobTaskDetails {
  return {
    taskId: item["taskId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    status: item["status"],
  };
}

/** MAB workload-specific job. */
export interface MabJob extends Job {
  /** Time taken by job to run. */
  duration?: string;
  /** The state/actions applicable on jobs like cancel/retry. */
  actionsInfo?: JobSupportedAction[];
  /** Name of server protecting the DS. */
  mabServerName?: string;
  /** Server type of MAB container. */
  mabServerType?: MabServerType;
  /** Workload type of backup item. */
  workloadType?: WorkloadType;
  /** The errors. */
  errorDetails?: MabErrorInfo[];
  /** Additional information on the job. */
  extendedInfo?: MabJobExtendedInfo;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  jobType: "MabJob";
}

export function mabJobDeserializer(item: any): MabJob {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
    duration: item["duration"],
    actionsInfo: !item["actionsInfo"]
      ? item["actionsInfo"]
      : item["actionsInfo"].map((p: any) => {
          return p;
        }),
    mabServerName: item["mabServerName"],
    mabServerType: item["mabServerType"],
    workloadType: item["workloadType"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : mabErrorInfoArrayDeserializer(item["errorDetails"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : mabJobExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Server type of MAB container. */
export enum KnownMabServerType {
  /** Invalid */
  Invalid = "Invalid",
  /** Unknown */
  Unknown = "Unknown",
  /** IaasVMContainer */
  IaasVMContainer = "IaasVMContainer",
  /** IaasVMServiceContainer */
  IaasVMServiceContainer = "IaasVMServiceContainer",
  /** DPMContainer */
  DPMContainer = "DPMContainer",
  /** AzureBackupServerContainer */
  AzureBackupServerContainer = "AzureBackupServerContainer",
  /** MABContainer */
  MABContainer = "MABContainer",
  /** Cluster */
  Cluster = "Cluster",
  /** AzureSqlContainer */
  AzureSqlContainer = "AzureSqlContainer",
  /** Windows */
  Windows = "Windows",
  /** VCenter */
  VCenter = "VCenter",
  /** VMAppContainer */
  VMAppContainer = "VMAppContainer",
  /** SQLAGWorkLoadContainer */
  SqlagWorkLoadContainer = "SQLAGWorkLoadContainer",
  /** StorageContainer */
  StorageContainer = "StorageContainer",
  /** GenericContainer */
  GenericContainer = "GenericContainer",
}

/**
 * Server type of MAB container. \
 * {@link KnownMabServerType} can be used interchangeably with MabServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Unknown** \
 * **IaasVMContainer** \
 * **IaasVMServiceContainer** \
 * **DPMContainer** \
 * **AzureBackupServerContainer** \
 * **MABContainer** \
 * **Cluster** \
 * **AzureSqlContainer** \
 * **Windows** \
 * **VCenter** \
 * **VMAppContainer** \
 * **SQLAGWorkLoadContainer** \
 * **StorageContainer** \
 * **GenericContainer**
 */
export type MabServerType = string;

export function mabErrorInfoArrayDeserializer(result: Array<MabErrorInfo>): any[] {
  return result.map((item) => {
    return mabErrorInfoDeserializer(item);
  });
}

/** MAB workload-specific error information. */
export interface MabErrorInfo {
  /** Localized error string. */
  readonly errorString?: string;
  /** List of localized recommendations. */
  readonly recommendations?: string[];
}

export function mabErrorInfoDeserializer(item: any): MabErrorInfo {
  return {
    errorString: item["errorString"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Additional information for the MAB workload-specific job. */
export interface MabJobExtendedInfo {
  /** List of tasks for this job. */
  tasksList?: MabJobTaskDetails[];
  /** The job properties. */
  propertyBag?: Record<string, string>;
  /** Non localized error message specific to this job. */
  dynamicErrorMessage?: string;
}

export function mabJobExtendedInfoDeserializer(item: any): MabJobExtendedInfo {
  return {
    tasksList: !item["tasksList"]
      ? item["tasksList"]
      : mabJobTaskDetailsArrayDeserializer(item["tasksList"]),
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : Object.fromEntries(
          Object.entries(item["propertyBag"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    dynamicErrorMessage: item["dynamicErrorMessage"],
  };
}

export function mabJobTaskDetailsArrayDeserializer(result: Array<MabJobTaskDetails>): any[] {
  return result.map((item) => {
    return mabJobTaskDetailsDeserializer(item);
  });
}

/** MAB workload-specific job task details. */
export interface MabJobTaskDetails {
  /** The task display name. */
  taskId?: string;
  /** The start time. */
  startTime?: Date;
  /** The end time. */
  endTime?: Date;
  /** Time elapsed for task. */
  duration?: string;
  /** The status. */
  status?: string;
}

export function mabJobTaskDetailsDeserializer(item: any): MabJobTaskDetails {
  return {
    taskId: item["taskId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    status: item["status"],
  };
}

/** Vault level Job */
export interface VaultJob extends Job {
  /** Time elapsed during the execution of this job. */
  duration?: string;
  /** Gets or sets the state/actions applicable on this job like cancel/retry. */
  actionsInfo?: JobSupportedAction[];
  /** Error details on execution of this job. */
  errorDetails?: VaultJobErrorInfo[];
  /** Additional information about the job. */
  extendedInfo?: VaultJobExtendedInfo;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  jobType: "VaultJob";
}

export function vaultJobDeserializer(item: any): VaultJob {
  return {
    entityFriendlyName: item["entityFriendlyName"],
    backupManagementType: item["backupManagementType"],
    operation: item["operation"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    activityId: item["activityId"],
    jobType: item["jobType"],
    duration: item["duration"],
    actionsInfo: !item["actionsInfo"]
      ? item["actionsInfo"]
      : item["actionsInfo"].map((p: any) => {
          return p;
        }),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : vaultJobErrorInfoArrayDeserializer(item["errorDetails"]),
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : vaultJobExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

export function vaultJobErrorInfoArrayDeserializer(result: Array<VaultJobErrorInfo>): any[] {
  return result.map((item) => {
    return vaultJobErrorInfoDeserializer(item);
  });
}

/** Vault Job specific error information */
export interface VaultJobErrorInfo {
  /** Error code. */
  errorCode?: number;
  /** Localized error string. */
  errorString?: string;
  /** List of localized recommendations for above error code. */
  recommendations?: string[];
}

export function vaultJobErrorInfoDeserializer(item: any): VaultJobErrorInfo {
  return {
    errorCode: item["errorCode"],
    errorString: item["errorString"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Vault Job for CMK - has CMK specific info. */
export interface VaultJobExtendedInfo {
  /** Job properties. */
  propertyBag?: Record<string, string>;
}

export function vaultJobExtendedInfoDeserializer(item: any): VaultJobExtendedInfo {
  return {
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : Object.fromEntries(
          Object.entries(item["propertyBag"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** List of Job resources */
export interface _JobResourceList extends ResourceList {
  /** List of resources. */
  value?: JobResource[];
}

export function _jobResourceListDeserializer(item: any): _JobResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : jobResourceArrayDeserializer(item["value"]),
  };
}

export function jobResourceArrayDeserializer(result: Array<JobResource>): any[] {
  return result.map((item) => {
    return jobResourceDeserializer(item);
  });
}

/** Base class for operation result info. */
export interface OperationResultInfoBaseResource extends OperationWorkerResponse {
  /** OperationResultInfoBaseResource operation */
  operation?: OperationResultInfoBaseUnion;
}

export function operationResultInfoBaseResourceDeserializer(
  item: any,
): OperationResultInfoBaseResource {
  return {
    statusCode: item["statusCode"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    operation: !item["operation"]
      ? item["operation"]
      : operationResultInfoBaseUnionDeserializer(item["operation"]),
  };
}

/** Base class for operation result info. */
export interface OperationResultInfoBase {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: ExportJobsOperationResultInfo, OperationResultInfo */
  objectType: string;
}

export function operationResultInfoBaseDeserializer(item: any): OperationResultInfoBase {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for OperationResultInfoBaseUnion */
export type OperationResultInfoBaseUnion =
  | ExportJobsOperationResultInfo
  | OperationResultInfo
  | OperationResultInfoBase;

export function operationResultInfoBaseUnionDeserializer(item: any): OperationResultInfoBaseUnion {
  switch (item.objectType) {
    case "ExportJobsOperationResultInfo":
      return exportJobsOperationResultInfoDeserializer(item as ExportJobsOperationResultInfo);

    case "OperationResultInfo":
      return operationResultInfoDeserializer(item as OperationResultInfo);

    default:
      return operationResultInfoBaseDeserializer(item);
  }
}

/** This class is used to send blob details after exporting jobs. */
export interface ExportJobsOperationResultInfo extends OperationResultInfoBase {
  /** URL of the blob into which the serialized string of list of jobs is exported. */
  blobUrl?: string;
  /** SAS key to access the blob. It expires in 15 mins. */
  blobSasKey?: string;
  /** URL of the blob into which the ExcelFile is uploaded. */
  excelFileBlobUrl?: string;
  /** SAS key to access the blob. It expires in 15 mins. */
  excelFileBlobSasKey?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "ExportJobsOperationResultInfo";
}

export function exportJobsOperationResultInfoDeserializer(
  item: any,
): ExportJobsOperationResultInfo {
  return {
    objectType: item["objectType"],
    blobUrl: item["blobUrl"],
    blobSasKey: item["blobSasKey"],
    excelFileBlobUrl: item["excelFileBlobUrl"],
    excelFileBlobSasKey: item["excelFileBlobSasKey"],
  };
}

/** Operation result info. */
export interface OperationResultInfo extends OperationResultInfoBase {
  /** List of jobs created by this operation. */
  jobList?: string[];
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "OperationResultInfo";
}

export function operationResultInfoDeserializer(item: any): OperationResultInfo {
  return {
    objectType: item["objectType"],
    jobList: !item["jobList"]
      ? item["jobList"]
      : item["jobList"].map((p: any) => {
          return p;
        }),
  };
}

/** This is the base class for operation result responses. */
export interface OperationWorkerResponse {
  /** HTTP Status Code of the operation. */
  statusCode?: HttpStatusCode;
  /** HTTP headers associated with this operation. */
  headers?: Record<string, string[]>;
}

export function operationWorkerResponseDeserializer(item: any): OperationWorkerResponse {
  return {
    statusCode: item["statusCode"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
  };
}

/** HTTP Status Code of the operation. */
export type HttpStatusCode =
  | "Continue"
  | "SwitchingProtocols"
  | "OK"
  | "Created"
  | "Accepted"
  | "NonAuthoritativeInformation"
  | "NoContent"
  | "ResetContent"
  | "PartialContent"
  | "MultipleChoices"
  | "Ambiguous"
  | "MovedPermanently"
  | "Moved"
  | "Found"
  | "Redirect"
  | "SeeOther"
  | "RedirectMethod"
  | "NotModified"
  | "UseProxy"
  | "Unused"
  | "TemporaryRedirect"
  | "RedirectKeepVerb"
  | "BadRequest"
  | "Unauthorized"
  | "PaymentRequired"
  | "Forbidden"
  | "NotFound"
  | "MethodNotAllowed"
  | "NotAcceptable"
  | "ProxyAuthenticationRequired"
  | "RequestTimeout"
  | "Conflict"
  | "Gone"
  | "LengthRequired"
  | "PreconditionFailed"
  | "RequestEntityTooLarge"
  | "RequestUriTooLong"
  | "UnsupportedMediaType"
  | "RequestedRangeNotSatisfiable"
  | "ExpectationFailed"
  | "UpgradeRequired"
  | "InternalServerError"
  | "NotImplemented"
  | "BadGateway"
  | "ServiceUnavailable"
  | "GatewayTimeout"
  | "HttpVersionNotSupported";

/** The base backup engine class. All workload specific backup engines derive from this class. */
export interface BackupEngineBaseResource extends Resource {
  /** BackupEngineBaseResource properties */
  properties?: BackupEngineBaseUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function backupEngineBaseResourceDeserializer(item: any): BackupEngineBaseResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : backupEngineBaseUnionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** The base backup engine class. All workload specific backup engines derive from this class. */
export interface BackupEngineBase {
  /** Friendly name of the backup engine. */
  friendlyName?: string;
  /** Type of backup management for the backup engine. */
  backupManagementType?: BackupManagementType;
  /** Registration status of the backup engine with the Recovery Services Vault. */
  registrationStatus?: string;
  /** Status of the backup engine with the Recovery Services Vault. = {Active/Deleting/DeleteFailed} */
  backupEngineState?: string;
  /** Backup status of the backup engine. */
  healthStatus?: string;
  /** Type of the backup engine. */
  /** The discriminator possible values: AzureBackupServerEngine, DpmBackupEngine */
  backupEngineType: BackupEngineType;
  /** Flag indicating if the backup engine be registered, once already registered. */
  canReRegister?: boolean;
  /** ID of the backup engine. */
  backupEngineId?: string;
  /** Backup engine version */
  dpmVersion?: string;
  /** Backup agent version */
  azureBackupAgentVersion?: string;
  /** To check if backup agent upgrade available */
  isAzureBackupAgentUpgradeAvailable?: boolean;
  /** To check if backup engine upgrade available */
  isDpmUpgradeAvailable?: boolean;
  /** Extended info of the backupengine */
  extendedInfo?: BackupEngineExtendedInfo;
}

export function backupEngineBaseDeserializer(item: any): BackupEngineBase {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    backupEngineState: item["backupEngineState"],
    healthStatus: item["healthStatus"],
    backupEngineType: item["backupEngineType"],
    canReRegister: item["canReRegister"],
    backupEngineId: item["backupEngineId"],
    dpmVersion: item["dpmVersion"],
    azureBackupAgentVersion: item["azureBackupAgentVersion"],
    isAzureBackupAgentUpgradeAvailable: item["isAzureBackupAgentUpgradeAvailable"],
    isDpmUpgradeAvailable: item["isDpmUpgradeAvailable"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : backupEngineExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Alias for BackupEngineBaseUnion */
export type BackupEngineBaseUnion = AzureBackupServerEngine | DpmBackupEngine | BackupEngineBase;

export function backupEngineBaseUnionDeserializer(item: any): BackupEngineBaseUnion {
  switch (item.backupEngineType) {
    case "AzureBackupServerEngine":
      return azureBackupServerEngineDeserializer(item as AzureBackupServerEngine);

    case "DpmBackupEngine":
      return dpmBackupEngineDeserializer(item as DpmBackupEngine);

    default:
      return backupEngineBaseDeserializer(item);
  }
}

/** Type of the backup engine. */
export enum KnownBackupEngineType {
  /** Invalid */
  Invalid = "Invalid",
  /** DpmBackupEngine */
  DpmBackupEngine = "DpmBackupEngine",
  /** AzureBackupServerEngine */
  AzureBackupServerEngine = "AzureBackupServerEngine",
}

/**
 * Type of the backup engine. \
 * {@link KnownBackupEngineType} can be used interchangeably with BackupEngineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **DpmBackupEngine** \
 * **AzureBackupServerEngine**
 */
export type BackupEngineType = string;

/** Additional information on backup engine. */
export interface BackupEngineExtendedInfo {
  /** Database name of backup engine. */
  databaseName?: string;
  /** Number of protected items in the backup engine. */
  protectedItemsCount?: number;
  /** Number of protected servers in the backup engine. */
  protectedServersCount?: number;
  /** Number of disks in the backup engine. */
  diskCount?: number;
  /** Disk space used in the backup engine. */
  usedDiskSpace?: number;
  /** Disk space currently available in the backup engine. */
  availableDiskSpace?: number;
  /** Last refresh time in the backup engine. */
  refreshedAt?: Date;
  /** Protected instances in the backup engine. */
  azureProtectedInstances?: number;
}

export function backupEngineExtendedInfoDeserializer(item: any): BackupEngineExtendedInfo {
  return {
    databaseName: item["databaseName"],
    protectedItemsCount: item["protectedItemsCount"],
    protectedServersCount: item["protectedServersCount"],
    diskCount: item["diskCount"],
    usedDiskSpace: item["usedDiskSpace"],
    availableDiskSpace: item["availableDiskSpace"],
    refreshedAt: !item["refreshedAt"] ? item["refreshedAt"] : new Date(item["refreshedAt"]),
    azureProtectedInstances: item["azureProtectedInstances"],
  };
}

/** Backup engine type when Azure Backup Server is used to manage the backups. */
export interface AzureBackupServerEngine extends BackupEngineBase {
  /** Type of the backup engine. */
  backupEngineType: "AzureBackupServerEngine";
}

export function azureBackupServerEngineDeserializer(item: any): AzureBackupServerEngine {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    backupEngineState: item["backupEngineState"],
    healthStatus: item["healthStatus"],
    backupEngineType: item["backupEngineType"],
    canReRegister: item["canReRegister"],
    backupEngineId: item["backupEngineId"],
    dpmVersion: item["dpmVersion"],
    azureBackupAgentVersion: item["azureBackupAgentVersion"],
    isAzureBackupAgentUpgradeAvailable: item["isAzureBackupAgentUpgradeAvailable"],
    isDpmUpgradeAvailable: item["isDpmUpgradeAvailable"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : backupEngineExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** Data Protection Manager (DPM) specific backup engine. */
export interface DpmBackupEngine extends BackupEngineBase {
  /** Type of the backup engine. */
  backupEngineType: "DpmBackupEngine";
}

export function dpmBackupEngineDeserializer(item: any): DpmBackupEngine {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    registrationStatus: item["registrationStatus"],
    backupEngineState: item["backupEngineState"],
    healthStatus: item["healthStatus"],
    backupEngineType: item["backupEngineType"],
    canReRegister: item["canReRegister"],
    backupEngineId: item["backupEngineId"],
    dpmVersion: item["dpmVersion"],
    azureBackupAgentVersion: item["azureBackupAgentVersion"],
    isAzureBackupAgentUpgradeAvailable: item["isAzureBackupAgentUpgradeAvailable"],
    isDpmUpgradeAvailable: item["isDpmUpgradeAvailable"],
    extendedInfo: !item["extendedInfo"]
      ? item["extendedInfo"]
      : backupEngineExtendedInfoDeserializer(item["extendedInfo"]),
  };
}

/** List of BackupEngineBase resources */
export interface _BackupEngineBaseResourceList extends ResourceList {
  /** List of resources. */
  value?: BackupEngineBaseResource[];
}

export function _backupEngineBaseResourceListDeserializer(
  item: any,
): _BackupEngineBaseResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : backupEngineBaseResourceArrayDeserializer(item["value"]),
  };
}

export function backupEngineBaseResourceArrayDeserializer(
  result: Array<BackupEngineBaseResource>,
): any[] {
  return result.map((item) => {
    return backupEngineBaseResourceDeserializer(item);
  });
}

/** */
export interface ResourceGuardProxyBaseResource extends Resource {
  /** ResourceGuardProxyBaseResource properties */
  properties?: ResourceGuardProxyBase;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function resourceGuardProxyBaseResourceSerializer(
  item: ResourceGuardProxyBaseResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : resourceGuardProxyBaseSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** model interface ResourceGuardProxyBase */
export interface ResourceGuardProxyBase {
  resourceGuardResourceId: string;
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

/** model interface ResourceGuardOperationDetail */
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

/** Request body of unlock delete API. */
export interface UnlockDeleteRequest {
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

/** List of ResourceGuardProxyBase resources */
export interface _ResourceGuardProxyBaseResourceList extends ResourceList {
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

/** BackupStatus request. */
export interface BackupStatusRequest {
  /** Container Type - VM, SQLPaaS, DPM, AzureFileShare... */
  resourceType?: DataSourceType;
  /** Entire ARM resource id of the resource */
  resourceId?: string;
  /** Protectable Item Logical Name */
  poLogicalName?: string;
}

export function backupStatusRequestSerializer(item: BackupStatusRequest): any {
  return {
    resourceType: item["resourceType"],
    resourceId: item["resourceId"],
    poLogicalName: item["poLogicalName"],
  };
}

/** BackupStatus response. */
export interface BackupStatusResponse {
  /** Specifies whether the container is registered or not */
  protectionStatus?: ProtectionStatus;
  /** Specifies the arm resource id of the vault */
  vaultId?: string;
  /** Specifies the fabric name - Azure or AD */
  fabricName?: FabricName;
  /** Specifies the product specific container name. E.g. iaasvmcontainer;iaasvmcontainer;csname;vmname. */
  containerName?: string;
  /** Specifies the product specific ds name. E.g. vm;iaasvmcontainer;csname;vmname. */
  protectedItemName?: string;
  /** ErrorCode in case of intent failed */
  errorCode?: string;
  /** ErrorMessage in case of intent failed. */
  errorMessage?: string;
  /** Specifies the policy name which is used for protection */
  policyName?: string;
  /** Container registration status */
  registrationStatus?: string;
  /** Number of protected items */
  protectedItemsCount?: number;
  /** Specifies whether the storage account lock has been acquired or not */
  acquireStorageAccountLock?: AcquireStorageAccountLock;
}

export function backupStatusResponseDeserializer(item: any): BackupStatusResponse {
  return {
    protectionStatus: item["protectionStatus"],
    vaultId: item["vaultId"],
    fabricName: item["fabricName"],
    containerName: item["containerName"],
    protectedItemName: item["protectedItemName"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    policyName: item["policyName"],
    registrationStatus: item["registrationStatus"],
    protectedItemsCount: item["protectedItemsCount"],
    acquireStorageAccountLock: item["acquireStorageAccountLock"],
  };
}

/** Specifies the fabric name - Azure or AD */
export enum KnownFabricName {
  /** Invalid */
  Invalid = "Invalid",
  /** Azure */
  Azure = "Azure",
}

/**
 * Specifies the fabric name - Azure or AD \
 * {@link KnownFabricName} can be used interchangeably with FabricName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Azure**
 */
export type FabricName = string;

/** Base class for feature request */
export interface FeatureSupportRequest {
  /** backup support feature type. */
  /** The discriminator possible values: AzureBackupGoals, AzureVMResourceBackup */
  featureType: string;
}

export function featureSupportRequestSerializer(item: FeatureSupportRequest): any {
  return { featureType: item["featureType"] };
}

/** Alias for FeatureSupportRequestUnion */
export type FeatureSupportRequestUnion =
  | AzureBackupGoalFeatureSupportRequest
  | AzureVMResourceFeatureSupportRequest
  | FeatureSupportRequest;

export function featureSupportRequestUnionSerializer(item: FeatureSupportRequestUnion): any {
  switch (item.featureType) {
    case "AzureBackupGoals":
      return azureBackupGoalFeatureSupportRequestSerializer(
        item as AzureBackupGoalFeatureSupportRequest,
      );

    case "AzureVMResourceBackup":
      return azureVMResourceFeatureSupportRequestSerializer(
        item as AzureVMResourceFeatureSupportRequest,
      );

    default:
      return featureSupportRequestSerializer(item);
  }
}

/** Azure backup goal feature specific request. */
export interface AzureBackupGoalFeatureSupportRequest extends FeatureSupportRequest {
  /** backup support feature type. */
  featureType: "AzureBackupGoals";
}

export function azureBackupGoalFeatureSupportRequestSerializer(
  item: AzureBackupGoalFeatureSupportRequest,
): any {
  return { featureType: item["featureType"] };
}

/** AzureResource(IaaS VM) Specific feature support request */
export interface AzureVMResourceFeatureSupportRequest extends FeatureSupportRequest {
  /** Size of the resource: VM size(A/D series etc) in case of IaasVM */
  vmSize?: string;
  /** SKUs (Premium/Managed etc) in case of IaasVM */
  vmSku?: string;
  /** backup support feature type. */
  featureType: "AzureVMResourceBackup";
}

export function azureVMResourceFeatureSupportRequestSerializer(
  item: AzureVMResourceFeatureSupportRequest,
): any {
  return { featureType: item["featureType"], vmSize: item["vmSize"], vmSku: item["vmSku"] };
}

/** Response for feature support requests for Azure IaasVm */
export interface AzureVMResourceFeatureSupportResponse {
  /** Support status of feature */
  supportStatus?: SupportStatus;
}

export function azureVMResourceFeatureSupportResponseDeserializer(
  item: any,
): AzureVMResourceFeatureSupportResponse {
  return {
    supportStatus: item["supportStatus"],
  };
}

/** Support status of feature */
export enum KnownSupportStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Supported */
  Supported = "Supported",
  /** DefaultOFF */
  DefaultOFF = "DefaultOFF",
  /** DefaultON */
  DefaultON = "DefaultON",
  /** NotSupported */
  NotSupported = "NotSupported",
}

/**
 * Support status of feature \
 * {@link KnownSupportStatus} can be used interchangeably with SupportStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Supported** \
 * **DefaultOFF** \
 * **DefaultON** \
 * **NotSupported**
 */
export type SupportStatus = string;

/** List of ProtectionIntent resources */
export interface _ProtectionIntentResourceList extends ResourceList {
  /** List of resources. */
  value?: ProtectionIntentResource[];
}

export function _protectionIntentResourceListDeserializer(
  item: any,
): _ProtectionIntentResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : protectionIntentResourceArrayDeserializer(item["value"]),
  };
}

export function protectionIntentResourceArraySerializer(
  result: Array<ProtectionIntentResource>,
): any[] {
  return result.map((item) => {
    return protectionIntentResourceSerializer(item);
  });
}

export function protectionIntentResourceArrayDeserializer(
  result: Array<ProtectionIntentResource>,
): any[] {
  return result.map((item) => {
    return protectionIntentResourceDeserializer(item);
  });
}

/** Base class for backup ProtectionIntent. */
export interface ProtectionIntentResource extends Resource {
  /** ProtectionIntentResource properties */
  properties?: ProtectionIntentUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function protectionIntentResourceSerializer(item: ProtectionIntentResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : protectionIntentUnionSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
  };
}

export function protectionIntentResourceDeserializer(item: any): ProtectionIntentResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectionIntentUnionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Base class for backup ProtectionIntent. */
export interface ProtectionIntent {
  /** backup protectionIntent type. */
  /** The discriminator possible values: RecoveryServiceVaultItem, AzureResourceItem, AzureWorkloadContainerAutoProtectionIntent, AzureWorkloadAutoProtectionIntent, AzureWorkloadSQLAutoProtectionIntent */
  protectionIntentItemType: ProtectionIntentItemType;
  /** Type of backup management for the backed up item. */
  backupManagementType?: BackupManagementType;
  /** ARM ID of the resource to be backed up. */
  sourceResourceId?: string;
  /** ID of the item which is getting protected, In case of Azure Vm , it is ProtectedItemId */
  itemId?: string;
  /** ID of the backup policy with which this item is backed up. */
  policyId?: string;
  /** Backup state of this backup item. */
  protectionState?: ProtectionStatus;
}

export function protectionIntentSerializer(item: ProtectionIntent): any {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

export function protectionIntentDeserializer(item: any): ProtectionIntent {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

/** Alias for ProtectionIntentUnion */
export type ProtectionIntentUnion =
  | AzureRecoveryServiceVaultProtectionIntentUnion
  | AzureResourceProtectionIntent
  | AzureWorkloadContainerAutoProtectionIntent
  | ProtectionIntent;

export function protectionIntentUnionSerializer(item: ProtectionIntentUnion): any {
  switch (item.protectionIntentItemType) {
    case "RecoveryServiceVaultItem":
    case "AzureWorkloadAutoProtectionIntent":
    case "AzureWorkloadSQLAutoProtectionIntent":
      return azureRecoveryServiceVaultProtectionIntentUnionSerializer(
        item as AzureRecoveryServiceVaultProtectionIntentUnion,
      );

    case "AzureResourceItem":
      return azureResourceProtectionIntentSerializer(item as AzureResourceProtectionIntent);

    case "AzureWorkloadContainerAutoProtectionIntent":
      return azureWorkloadContainerAutoProtectionIntentSerializer(
        item as AzureWorkloadContainerAutoProtectionIntent,
      );

    default:
      return protectionIntentSerializer(item);
  }
}

export function protectionIntentUnionDeserializer(item: any): ProtectionIntentUnion {
  switch (item.protectionIntentItemType) {
    case "RecoveryServiceVaultItem":
    case "AzureWorkloadAutoProtectionIntent":
    case "AzureWorkloadSQLAutoProtectionIntent":
      return azureRecoveryServiceVaultProtectionIntentUnionDeserializer(
        item as AzureRecoveryServiceVaultProtectionIntentUnion,
      );

    case "AzureResourceItem":
      return azureResourceProtectionIntentDeserializer(item as AzureResourceProtectionIntent);

    case "AzureWorkloadContainerAutoProtectionIntent":
      return azureWorkloadContainerAutoProtectionIntentDeserializer(
        item as AzureWorkloadContainerAutoProtectionIntent,
      );

    default:
      return protectionIntentDeserializer(item);
  }
}

/** backup protectionIntent type. */
export enum KnownProtectionIntentItemType {
  /** Invalid */
  Invalid = "Invalid",
  /** AzureResourceItem */
  AzureResourceItem = "AzureResourceItem",
  /** RecoveryServiceVaultItem */
  RecoveryServiceVaultItem = "RecoveryServiceVaultItem",
  /** AzureWorkloadContainerAutoProtectionIntent */
  AzureWorkloadContainerAutoProtectionIntent = "AzureWorkloadContainerAutoProtectionIntent",
  /** AzureWorkloadAutoProtectionIntent */
  AzureWorkloadAutoProtectionIntent = "AzureWorkloadAutoProtectionIntent",
  /** AzureWorkloadSQLAutoProtectionIntent */
  AzureWorkloadSQLAutoProtectionIntent = "AzureWorkloadSQLAutoProtectionIntent",
}

/**
 * backup protectionIntent type. \
 * {@link KnownProtectionIntentItemType} can be used interchangeably with ProtectionIntentItemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AzureResourceItem** \
 * **RecoveryServiceVaultItem** \
 * **AzureWorkloadContainerAutoProtectionIntent** \
 * **AzureWorkloadAutoProtectionIntent** \
 * **AzureWorkloadSQLAutoProtectionIntent**
 */
export type ProtectionIntentItemType = string;

/** Azure Recovery Services Vault specific protection intent item. */
export interface AzureRecoveryServiceVaultProtectionIntent extends ProtectionIntent {
  /** backup protectionIntent type. */
  /** The discriminator possible values: AzureWorkloadAutoProtectionIntent, AzureWorkloadSQLAutoProtectionIntent */
  protectionIntentItemType:
    | "RecoveryServiceVaultItem"
    | "AzureWorkloadAutoProtectionIntent"
    | "AzureWorkloadSQLAutoProtectionIntent";
}

export function azureRecoveryServiceVaultProtectionIntentSerializer(
  item: AzureRecoveryServiceVaultProtectionIntent,
): any {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

export function azureRecoveryServiceVaultProtectionIntentDeserializer(
  item: any,
): AzureRecoveryServiceVaultProtectionIntent {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

/** Alias for AzureRecoveryServiceVaultProtectionIntentUnion */
export type AzureRecoveryServiceVaultProtectionIntentUnion =
  | AzureWorkloadAutoProtectionIntentUnion
  | AzureRecoveryServiceVaultProtectionIntent;

export function azureRecoveryServiceVaultProtectionIntentUnionSerializer(
  item: AzureRecoveryServiceVaultProtectionIntentUnion,
): any {
  switch (item.protectionIntentItemType) {
    case "AzureWorkloadAutoProtectionIntent":
    case "AzureWorkloadSQLAutoProtectionIntent":
      return azureWorkloadAutoProtectionIntentUnionSerializer(
        item as AzureWorkloadAutoProtectionIntentUnion,
      );

    default:
      return azureRecoveryServiceVaultProtectionIntentSerializer(item);
  }
}

export function azureRecoveryServiceVaultProtectionIntentUnionDeserializer(
  item: any,
): AzureRecoveryServiceVaultProtectionIntentUnion {
  switch (item.protectionIntentItemType) {
    case "AzureWorkloadAutoProtectionIntent":
    case "AzureWorkloadSQLAutoProtectionIntent":
      return azureWorkloadAutoProtectionIntentUnionDeserializer(
        item as AzureWorkloadAutoProtectionIntentUnion,
      );

    default:
      return azureRecoveryServiceVaultProtectionIntentDeserializer(item);
  }
}

/** Azure Recovery Services Vault specific protection intent item. */
export interface AzureWorkloadAutoProtectionIntent extends AzureRecoveryServiceVaultProtectionIntent {
  /** backup protectionIntent type. */
  /** The discriminator possible values: AzureWorkloadSQLAutoProtectionIntent */
  protectionIntentItemType:
    | "AzureWorkloadAutoProtectionIntent"
    | "AzureWorkloadSQLAutoProtectionIntent";
}

export function azureWorkloadAutoProtectionIntentSerializer(
  item: AzureWorkloadAutoProtectionIntent,
): any {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

export function azureWorkloadAutoProtectionIntentDeserializer(
  item: any,
): AzureWorkloadAutoProtectionIntent {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

/** Alias for AzureWorkloadAutoProtectionIntentUnion */
export type AzureWorkloadAutoProtectionIntentUnion =
  | AzureWorkloadSQLAutoProtectionIntent
  | AzureWorkloadAutoProtectionIntent;

export function azureWorkloadAutoProtectionIntentUnionSerializer(
  item: AzureWorkloadAutoProtectionIntentUnion,
): any {
  switch (item.protectionIntentItemType) {
    case "AzureWorkloadSQLAutoProtectionIntent":
      return azureWorkloadSQLAutoProtectionIntentSerializer(
        item as AzureWorkloadSQLAutoProtectionIntent,
      );

    default:
      return azureWorkloadAutoProtectionIntentSerializer(item);
  }
}

export function azureWorkloadAutoProtectionIntentUnionDeserializer(
  item: any,
): AzureWorkloadAutoProtectionIntentUnion {
  switch (item.protectionIntentItemType) {
    case "AzureWorkloadSQLAutoProtectionIntent":
      return azureWorkloadSQLAutoProtectionIntentDeserializer(
        item as AzureWorkloadSQLAutoProtectionIntent,
      );

    default:
      return azureWorkloadAutoProtectionIntentDeserializer(item);
  }
}

/** Azure Workload SQL Auto Protection intent item. */
export interface AzureWorkloadSQLAutoProtectionIntent extends AzureWorkloadAutoProtectionIntent {
  /** backup protectionIntent type. */
  protectionIntentItemType: "AzureWorkloadSQLAutoProtectionIntent";
  /** Workload item type of the item for which intent is to be set */
  workloadItemType?: WorkloadItemType;
}

export function azureWorkloadSQLAutoProtectionIntentSerializer(
  item: AzureWorkloadSQLAutoProtectionIntent,
): any {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
    workloadItemType: item["workloadItemType"],
  };
}

export function azureWorkloadSQLAutoProtectionIntentDeserializer(
  item: any,
): AzureWorkloadSQLAutoProtectionIntent {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
    workloadItemType: item["workloadItemType"],
  };
}

/** Workload item type of the item for which intent is to be set */
export enum KnownWorkloadItemType {
  /** Invalid */
  Invalid = "Invalid",
  /** SQLInstance */
  SQLInstance = "SQLInstance",
  /** SQLDataBase */
  SQLDataBase = "SQLDataBase",
  /** SAPHanaSystem */
  SAPHanaSystem = "SAPHanaSystem",
  /** SAPHanaDatabase */
  SAPHanaDatabase = "SAPHanaDatabase",
  /** SAPAseSystem */
  SAPAseSystem = "SAPAseSystem",
  /** SAPAseDatabase */
  SAPAseDatabase = "SAPAseDatabase",
  /** SAPHanaDBInstance */
  SAPHanaDBInstance = "SAPHanaDBInstance",
}

/**
 * Workload item type of the item for which intent is to be set \
 * {@link KnownWorkloadItemType} can be used interchangeably with WorkloadItemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **SQLInstance** \
 * **SQLDataBase** \
 * **SAPHanaSystem** \
 * **SAPHanaDatabase** \
 * **SAPAseSystem** \
 * **SAPAseDatabase** \
 * **SAPHanaDBInstance**
 */
export type WorkloadItemType = string;

/** IaaS VM specific backup protection intent item. */
export interface AzureResourceProtectionIntent extends ProtectionIntent {
  /** Friendly name of the VM represented by this backup item. */
  friendlyName?: string;
  /** backup protectionIntent type. */
  protectionIntentItemType: "AzureResourceItem";
}

export function azureResourceProtectionIntentSerializer(item: AzureResourceProtectionIntent): any {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
    friendlyName: item["friendlyName"],
  };
}

export function azureResourceProtectionIntentDeserializer(
  item: any,
): AzureResourceProtectionIntent {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
    friendlyName: item["friendlyName"],
  };
}

/** Azure workload specific protection intent item. */
export interface AzureWorkloadContainerAutoProtectionIntent extends ProtectionIntent {
  /** backup protectionIntent type. */
  protectionIntentItemType: "AzureWorkloadContainerAutoProtectionIntent";
}

export function azureWorkloadContainerAutoProtectionIntentSerializer(
  item: AzureWorkloadContainerAutoProtectionIntent,
): any {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

export function azureWorkloadContainerAutoProtectionIntentDeserializer(
  item: any,
): AzureWorkloadContainerAutoProtectionIntent {
  return {
    protectionIntentItemType: item["protectionIntentItemType"],
    backupManagementType: item["backupManagementType"],
    sourceResourceId: item["sourceResourceId"],
    itemId: item["itemId"],
    policyId: item["policyId"],
    protectionState: item["protectionState"],
  };
}

/** Backup management usage for vault. */
export interface _BackupManagementUsageList extends ResourceList {
  /** The list of backup management usages for the given vault. */
  value?: BackupManagementUsage[];
}

export function _backupManagementUsageListDeserializer(item: any): _BackupManagementUsageList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : backupManagementUsageArrayDeserializer(item["value"]),
  };
}

export function backupManagementUsageArrayDeserializer(
  result: Array<BackupManagementUsage>,
): any[] {
  return result.map((item) => {
    return backupManagementUsageDeserializer(item);
  });
}

/** Backup management usages of a vault. */
export interface BackupManagementUsage {
  /** Unit of the usage. */
  unit?: UsagesUnit;
  /** Quota period of usage. */
  quotaPeriod?: string;
  /** Next reset time of usage. */
  nextResetTime?: Date;
  /** Current value of usage. */
  currentValue?: number;
  /** Limit of usage. */
  limit?: number;
  /** Name of usage. */
  name?: NameInfo;
}

export function backupManagementUsageDeserializer(item: any): BackupManagementUsage {
  return {
    unit: item["unit"],
    quotaPeriod: item["quotaPeriod"],
    nextResetTime: !item["nextResetTime"] ? item["nextResetTime"] : new Date(item["nextResetTime"]),
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : nameInfoDeserializer(item["name"]),
  };
}

/** Unit of the usage. */
export enum KnownUsagesUnit {
  /** Count */
  Count = "Count",
  /** Bytes */
  Bytes = "Bytes",
  /** Seconds */
  Seconds = "Seconds",
  /** Percent */
  Percent = "Percent",
  /** CountPerSecond */
  CountPerSecond = "CountPerSecond",
  /** BytesPerSecond */
  BytesPerSecond = "BytesPerSecond",
}

/**
 * Unit of the usage. \
 * {@link KnownUsagesUnit} can be used interchangeably with UsagesUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count** \
 * **Bytes** \
 * **Seconds** \
 * **Percent** \
 * **CountPerSecond** \
 * **BytesPerSecond**
 */
export type UsagesUnit = string;

/** The name of usage. */
export interface NameInfo {
  /** Value of usage. */
  value?: string;
  /** Localized value of usage. */
  localizedValue?: string;
}

export function nameInfoDeserializer(item: any): NameInfo {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** List of ProtectedItem resources */
export interface _ProtectedItemResourceList extends ResourceList {
  /** List of resources. */
  value?: ProtectedItemResource[];
}

export function _protectedItemResourceListDeserializer(item: any): _ProtectedItemResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : protectedItemResourceArrayDeserializer(item["value"]),
  };
}

export function protectedItemResourceArraySerializer(result: Array<ProtectedItemResource>): any[] {
  return result.map((item) => {
    return protectedItemResourceSerializer(item);
  });
}

export function protectedItemResourceArrayDeserializer(
  result: Array<ProtectedItemResource>,
): any[] {
  return result.map((item) => {
    return protectedItemResourceDeserializer(item);
  });
}

/** Base class for validate operation request. */
export interface ValidateOperationRequestResource {
  /** Recovery point ID. */
  id: string;
  /** ValidateOperationRequestResource properties */
  properties: ValidateOperationRequestUnion;
}

export function validateOperationRequestResourceSerializer(
  item: ValidateOperationRequestResource,
): any {
  return {
    id: item["id"],
    properties: validateOperationRequestUnionSerializer(item["properties"]),
  };
}

/** Base class for validate operation request. */
export interface ValidateOperationRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: ValidateIaasVMRestoreOperationRequest, ValidateRestoreOperationRequest */
  objectType: string;
}

export function validateOperationRequestSerializer(item: ValidateOperationRequest): any {
  return { objectType: item["objectType"] };
}

/** Alias for ValidateOperationRequestUnion */
export type ValidateOperationRequestUnion =
  | ValidateRestoreOperationRequestUnion
  | ValidateOperationRequest;

export function validateOperationRequestUnionSerializer(item: ValidateOperationRequestUnion): any {
  switch (item.objectType) {
    case "ValidateRestoreOperationRequest":
    case "ValidateIaasVMRestoreOperationRequest":
      return validateRestoreOperationRequestUnionSerializer(
        item as ValidateRestoreOperationRequestUnion,
      );

    default:
      return validateOperationRequestSerializer(item);
  }
}

/** AzureRestoreValidation request. */
export interface ValidateIaasVMRestoreOperationRequest extends ValidateRestoreOperationRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "ValidateIaasVMRestoreOperationRequest";
}

export function validateIaasVMRestoreOperationRequestSerializer(
  item: ValidateIaasVMRestoreOperationRequest,
): any {
  return {
    objectType: item["objectType"],
    restoreRequest: !item["restoreRequest"]
      ? item["restoreRequest"]
      : restoreRequestUnionSerializer(item["restoreRequest"]),
  };
}

/** AzureRestoreValidation request. */
export interface ValidateRestoreOperationRequest extends ValidateOperationRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: ValidateIaasVMRestoreOperationRequest */
  objectType: "ValidateRestoreOperationRequest" | "ValidateIaasVMRestoreOperationRequest";
  /** Sets restore request to be validated */
  restoreRequest?: RestoreRequestUnion;
}

export function validateRestoreOperationRequestSerializer(
  item: ValidateRestoreOperationRequest,
): any {
  return {
    objectType: item["objectType"],
    restoreRequest: !item["restoreRequest"]
      ? item["restoreRequest"]
      : restoreRequestUnionSerializer(item["restoreRequest"]),
  };
}

/** Alias for ValidateRestoreOperationRequestUnion */
export type ValidateRestoreOperationRequestUnion =
  | ValidateIaasVMRestoreOperationRequest
  | ValidateRestoreOperationRequest;

export function validateRestoreOperationRequestUnionSerializer(
  item: ValidateRestoreOperationRequestUnion,
): any {
  switch (item.objectType) {
    case "ValidateIaasVMRestoreOperationRequest":
      return validateIaasVMRestoreOperationRequestSerializer(
        item as ValidateIaasVMRestoreOperationRequest,
      );

    default:
      return validateRestoreOperationRequestSerializer(item);
  }
}

/** model interface ValidateOperationsResponse */
export interface ValidateOperationsResponse {
  /** Base class for validate operation response. */
  validateOperationResponse?: ValidateOperationResponse;
}

export function validateOperationsResponseDeserializer(item: any): ValidateOperationsResponse {
  return {
    validateOperationResponse: !item["validateOperationResponse"]
      ? item["validateOperationResponse"]
      : validateOperationResponseDeserializer(item["validateOperationResponse"]),
  };
}

/** List of ProtectableContainer resources */
export interface _ProtectableContainerResourceList extends ResourceList {
  /** List of resources. */
  value?: ProtectableContainerResource[];
}

export function _protectableContainerResourceListDeserializer(
  item: any,
): _ProtectableContainerResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : protectableContainerResourceArrayDeserializer(item["value"]),
  };
}

export function protectableContainerResourceArrayDeserializer(
  result: Array<ProtectableContainerResource>,
): any[] {
  return result.map((item) => {
    return protectableContainerResourceDeserializer(item);
  });
}

/** Protectable Container Class. */
export interface ProtectableContainerResource extends Resource {
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Optional ETag. */
  eTag?: string;
  /** ProtectableContainerResource properties */
  properties?: ProtectableContainerUnion;
}

export function protectableContainerResourceDeserializer(item: any): ProtectableContainerResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    eTag: item["eTag"],
    properties: !item["properties"]
      ? item["properties"]
      : protectableContainerUnionDeserializer(item["properties"]),
  };
}

/** Protectable Container Class. */
export interface ProtectableContainer {
  /** Friendly name of the container. */
  friendlyName?: string;
  /** Type of backup management for the container. */
  backupManagementType?: BackupManagementType;
  /**
   * Type of the container. The value of this property for
   * 1. Compute Azure VM is Microsoft.Compute/virtualMachines
   * 2. Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines
   */
  /** The discriminator possible values: StorageContainer, VMAppContainer */
  protectableContainerType: ProtectableContainerType;
  /** Status of health of the container. */
  healthStatus?: string;
  /** Fabric Id of the container such as ARM Id. */
  containerId?: string;
}

export function protectableContainerDeserializer(item: any): ProtectableContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    protectableContainerType: item["protectableContainerType"],
    healthStatus: item["healthStatus"],
    containerId: item["containerId"],
  };
}

/** Alias for ProtectableContainerUnion */
export type ProtectableContainerUnion =
  | AzureStorageProtectableContainer
  | AzureVMAppContainerProtectableContainer
  | ProtectableContainer;

export function protectableContainerUnionDeserializer(item: any): ProtectableContainerUnion {
  switch (item.protectableContainerType) {
    case "StorageContainer":
      return azureStorageProtectableContainerDeserializer(item as AzureStorageProtectableContainer);

    case "VMAppContainer":
      return azureVMAppContainerProtectableContainerDeserializer(
        item as AzureVMAppContainerProtectableContainer,
      );

    default:
      return protectableContainerDeserializer(item);
  }
}

/** Azure Storage-specific protectable containers */
export interface AzureStorageProtectableContainer extends ProtectableContainer {
  /**
   * Type of the container. The value of this property for
   * 1. Compute Azure VM is Microsoft.Compute/virtualMachines
   * 2. Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines
   */
  readonly protectableContainerType: "StorageContainer";
}

export function azureStorageProtectableContainerDeserializer(
  item: any,
): AzureStorageProtectableContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    protectableContainerType: item["protectableContainerType"],
    healthStatus: item["healthStatus"],
    containerId: item["containerId"],
  };
}

/** Azure workload-specific container */
export interface AzureVMAppContainerProtectableContainer extends ProtectableContainer {
  /**
   * Type of the container. The value of this property for
   * 1. Compute Azure VM is Microsoft.Compute/virtualMachines
   * 2. Classic Compute Azure VM is Microsoft.ClassicCompute/virtualMachines
   */
  protectableContainerType: "VMAppContainer";
}

export function azureVMAppContainerProtectableContainerDeserializer(
  item: any,
): AzureVMAppContainerProtectableContainer {
  return {
    friendlyName: item["friendlyName"],
    backupManagementType: item["backupManagementType"],
    protectableContainerType: item["protectableContainerType"],
    healthStatus: item["healthStatus"],
    containerId: item["containerId"],
  };
}

/** List of WorkloadProtectableItem resources */
export interface _WorkloadProtectableItemResourceList extends ResourceList {
  /** List of resources. */
  value?: WorkloadProtectableItemResource[];
}

export function _workloadProtectableItemResourceListDeserializer(
  item: any,
): _WorkloadProtectableItemResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : workloadProtectableItemResourceArrayDeserializer(item["value"]),
  };
}

export function workloadProtectableItemResourceArrayDeserializer(
  result: Array<WorkloadProtectableItemResource>,
): any[] {
  return result.map((item) => {
    return workloadProtectableItemResourceDeserializer(item);
  });
}

/** Base class for backup item. Workload-specific backup items are derived from this class. */
export interface WorkloadProtectableItemResource extends Resource {
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Optional ETag. */
  eTag?: string;
  /** WorkloadProtectableItemResource properties */
  properties?: WorkloadProtectableItemUnion;
}

export function workloadProtectableItemResourceDeserializer(
  item: any,
): WorkloadProtectableItemResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    eTag: item["eTag"],
    properties: !item["properties"]
      ? item["properties"]
      : workloadProtectableItemUnionDeserializer(item["properties"]),
  };
}

/** Base class for backup item. Workload-specific backup items are derived from this class. */
export interface WorkloadProtectableItem {
  /** Type of backup management to backup an item. */
  backupManagementType?: string;
  /** Type of workload for the backup management */
  workloadType?: string;
  /** Type of the backup item. */
  /** The discriminator possible values: AzureFileShare, Microsoft.ClassicCompute/virtualMachines, IaaSVMProtectableItem, Microsoft.Compute/virtualMachines, AzureVmWorkloadProtectableItem, SAPAseDatabase, SAPAseSystem, SAPHanaDatabase, SAPHanaSystem, SAPHanaDBInstance, HanaHSRContainer, HanaScaleoutContainer, SQLAvailabilityGroupContainer, SQLDataBase, SQLInstance */
  protectableItemType: string;
  /** Friendly name of the backup item. */
  friendlyName?: string;
  /** State of the back up item. */
  protectionState?: ProtectionStatus;
}

export function workloadProtectableItemDeserializer(item: any): WorkloadProtectableItem {
  return {
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    protectableItemType: item["protectableItemType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Alias for WorkloadProtectableItemUnion */
export type WorkloadProtectableItemUnion =
  | AzureFileShareProtectableItem
  | IaaSVMProtectableItemUnion
  | AzureVmWorkloadProtectableItemUnion
  | WorkloadProtectableItem;

export function workloadProtectableItemUnionDeserializer(item: any): WorkloadProtectableItemUnion {
  switch (item.protectableItemType) {
    case "AzureFileShare":
      return azureFileShareProtectableItemDeserializer(item as AzureFileShareProtectableItem);

    case "IaaSVMProtectableItem":
    case "Microsoft.ClassicCompute/virtualMachines":
    case "Microsoft.Compute/virtualMachines":
      return iaaSVMProtectableItemUnionDeserializer(item as IaaSVMProtectableItemUnion);

    case "AzureVmWorkloadProtectableItem":
    case "SAPAseDatabase":
    case "SAPAseSystem":
    case "SAPHanaDatabase":
    case "SAPHanaSystem":
    case "SAPHanaDBInstance":
    case "HanaHSRContainer":
    case "HanaScaleoutContainer":
    case "SQLAvailabilityGroupContainer":
    case "SQLDataBase":
    case "SQLInstance":
      return azureVmWorkloadProtectableItemUnionDeserializer(
        item as AzureVmWorkloadProtectableItemUnion,
      );

    default:
      return workloadProtectableItemDeserializer(item);
  }
}

/** Protectable item for Azure Fileshare workloads. */
export interface AzureFileShareProtectableItem extends WorkloadProtectableItem {
  /** Full Fabric ID of container to which this protectable item belongs. For example, ARM ID. */
  parentContainerFabricId?: string;
  /** Friendly name of container to which this protectable item belongs. */
  parentContainerFriendlyName?: string;
  /** File Share type XSync or XSMB. */
  azureFileShareType?: AzureFileShareType;
  /** Type of the backup item. */
  protectableItemType: "AzureFileShare";
}

export function azureFileShareProtectableItemDeserializer(
  item: any,
): AzureFileShareProtectableItem {
  return {
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    protectableItemType: item["protectableItemType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
    parentContainerFabricId: item["parentContainerFabricId"],
    parentContainerFriendlyName: item["parentContainerFriendlyName"],
    azureFileShareType: item["azureFileShareType"],
  };
}

/** File Share type XSync or XSMB. */
export enum KnownAzureFileShareType {
  /** Invalid */
  Invalid = "Invalid",
  /** XSMB */
  Xsmb = "XSMB",
  /** XSync */
  XSync = "XSync",
}

/**
 * File Share type XSync or XSMB. \
 * {@link KnownAzureFileShareType} can be used interchangeably with AzureFileShareType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **XSMB** \
 * **XSync**
 */
export type AzureFileShareType = string;

/** IaaS VM workload-specific backup item representing the Classic Compute VM. */
export interface AzureIaaSClassicComputeVMProtectableItem extends IaaSVMProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "Microsoft.ClassicCompute/virtualMachines";
}

export function azureIaaSClassicComputeVMProtectableItemDeserializer(
  item: any,
): AzureIaaSClassicComputeVMProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** IaaS VM workload-specific backup item. */
export interface IaaSVMProtectableItem extends WorkloadProtectableItem {
  /** Type of the backup item. */
  /** The discriminator possible values: Microsoft.ClassicCompute/virtualMachines, Microsoft.Compute/virtualMachines */
  protectableItemType:
    | "IaaSVMProtectableItem"
    | "Microsoft.ClassicCompute/virtualMachines"
    | "Microsoft.Compute/virtualMachines";
  /** Fully qualified ARM ID of the virtual machine. */
  virtualMachineId?: string;
  /** Specifies whether the container represents a Classic or an Azure Resource Manager VM. */
  virtualMachineVersion?: string;
  /** Resource group name of Recovery Services Vault. */
  resourceGroup?: string;
}

export function iaaSVMProtectableItemDeserializer(item: any): IaaSVMProtectableItem {
  return {
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    protectableItemType: item["protectableItemType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
  };
}

/** Alias for IaaSVMProtectableItemUnion */
export type IaaSVMProtectableItemUnion =
  | AzureIaaSClassicComputeVMProtectableItem
  | AzureIaaSComputeVMProtectableItem
  | IaaSVMProtectableItem;

export function iaaSVMProtectableItemUnionDeserializer(item: any): IaaSVMProtectableItemUnion {
  switch (item.protectableItemType) {
    case "Microsoft.ClassicCompute/virtualMachines":
      return azureIaaSClassicComputeVMProtectableItemDeserializer(
        item as AzureIaaSClassicComputeVMProtectableItem,
      );

    case "Microsoft.Compute/virtualMachines":
      return azureIaaSComputeVMProtectableItemDeserializer(
        item as AzureIaaSComputeVMProtectableItem,
      );

    default:
      return iaaSVMProtectableItemDeserializer(item);
  }
}

/** IaaS VM workload-specific backup item representing the Azure Resource Manager VM. */
export interface AzureIaaSComputeVMProtectableItem extends IaaSVMProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "Microsoft.Compute/virtualMachines";
}

export function azureIaaSComputeVMProtectableItemDeserializer(
  item: any,
): AzureIaaSComputeVMProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    virtualMachineId: item["virtualMachineId"],
    virtualMachineVersion: item["virtualMachineVersion"],
    resourceGroup: item["resourceGroup"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item. */
export interface AzureVmWorkloadProtectableItem extends WorkloadProtectableItem {
  /** Type of the backup item. */
  /** The discriminator possible values: SAPAseDatabase, SAPAseSystem, SAPHanaDatabase, SAPHanaSystem, SAPHanaDBInstance, HanaHSRContainer, HanaScaleoutContainer, SQLAvailabilityGroupContainer, SQLDataBase, SQLInstance */
  protectableItemType:
    | "AzureVmWorkloadProtectableItem"
    | "SAPAseDatabase"
    | "SAPAseSystem"
    | "SAPHanaDatabase"
    | "SAPHanaSystem"
    | "SAPHanaDBInstance"
    | "HanaHSRContainer"
    | "HanaScaleoutContainer"
    | "SQLAvailabilityGroupContainer"
    | "SQLDataBase"
    | "SQLInstance";
  /** Name for instance or AG */
  parentName?: string;
  /**
   * Parent Unique Name is added to provide the service formatted URI Name of the Parent
   * Only Applicable for data bases where the parent would be either Instance or a SQL AG.
   */
  parentUniqueName?: string;
  /** Host/Cluster Name for instance or AG */
  serverName?: string;
  /** Indicates if protectable item is auto-protectable */
  isAutoProtectable?: boolean;
  /** Indicates if protectable item is auto-protected */
  isAutoProtected?: boolean;
  /** For instance or AG, indicates number of DB's present */
  subinquireditemcount?: number;
  /** For instance or AG, indicates number of DB's to be protected */
  subprotectableitemcount?: number;
  /** Pre-backup validation for protectable objects */
  prebackupvalidation?: PreBackupValidation;
  /** Indicates if item is protectable */
  isProtectable?: boolean;
}

export function azureVmWorkloadProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadProtectableItem {
  return {
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    protectableItemType: item["protectableItemType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
  };
}

/** Alias for AzureVmWorkloadProtectableItemUnion */
export type AzureVmWorkloadProtectableItemUnion =
  | AzureVmWorkloadSAPAseDatabaseProtectableItem
  | AzureVmWorkloadSAPAseSystemProtectableItem
  | AzureVmWorkloadSAPHanaDatabaseProtectableItem
  | AzureVmWorkloadSAPHanaSystemProtectableItem
  | AzureVmWorkloadSAPHanaDBInstance
  | AzureVmWorkloadSAPHanaHSRProtectableItem
  | AzureVmWorkloadSAPHanaScaleoutProtectableItem
  | AzureVmWorkloadSQLAvailabilityGroupProtectableItem
  | AzureVmWorkloadSQLDatabaseProtectableItem
  | AzureVmWorkloadSQLInstanceProtectableItem
  | AzureVmWorkloadProtectableItem;

export function azureVmWorkloadProtectableItemUnionDeserializer(
  item: any,
): AzureVmWorkloadProtectableItemUnion {
  switch (item.protectableItemType) {
    case "SAPAseDatabase":
      return azureVmWorkloadSAPAseDatabaseProtectableItemDeserializer(
        item as AzureVmWorkloadSAPAseDatabaseProtectableItem,
      );

    case "SAPAseSystem":
      return azureVmWorkloadSAPAseSystemProtectableItemDeserializer(
        item as AzureVmWorkloadSAPAseSystemProtectableItem,
      );

    case "SAPHanaDatabase":
      return azureVmWorkloadSAPHanaDatabaseProtectableItemDeserializer(
        item as AzureVmWorkloadSAPHanaDatabaseProtectableItem,
      );

    case "SAPHanaSystem":
      return azureVmWorkloadSAPHanaSystemProtectableItemDeserializer(
        item as AzureVmWorkloadSAPHanaSystemProtectableItem,
      );

    case "SAPHanaDBInstance":
      return azureVmWorkloadSAPHanaDBInstanceDeserializer(item as AzureVmWorkloadSAPHanaDBInstance);

    case "HanaHSRContainer":
      return azureVmWorkloadSAPHanaHSRProtectableItemDeserializer(
        item as AzureVmWorkloadSAPHanaHSRProtectableItem,
      );

    case "HanaScaleoutContainer":
      return azureVmWorkloadSAPHanaScaleoutProtectableItemDeserializer(
        item as AzureVmWorkloadSAPHanaScaleoutProtectableItem,
      );

    case "SQLAvailabilityGroupContainer":
      return azureVmWorkloadSQLAvailabilityGroupProtectableItemDeserializer(
        item as AzureVmWorkloadSQLAvailabilityGroupProtectableItem,
      );

    case "SQLDataBase":
      return azureVmWorkloadSQLDatabaseProtectableItemDeserializer(
        item as AzureVmWorkloadSQLDatabaseProtectableItem,
      );

    case "SQLInstance":
      return azureVmWorkloadSQLInstanceProtectableItemDeserializer(
        item as AzureVmWorkloadSQLInstanceProtectableItem,
      );

    default:
      return azureVmWorkloadProtectableItemDeserializer(item);
  }
}

/** Pre-backup validation for Azure VM Workload provider. */
export interface PreBackupValidation {
  /** Status of protectable item, i.e. InProgress,Succeeded,Failed */
  status?: InquiryStatus;
  /** Error code of protectable item */
  code?: string;
  /** Message corresponding to the error code for the protectable item */
  message?: string;
}

export function preBackupValidationDeserializer(item: any): PreBackupValidation {
  return {
    status: item["status"],
    code: item["code"],
    message: item["message"],
  };
}

/** Status of protectable item, i.e. InProgress,Succeeded,Failed */
export enum KnownInquiryStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Success */
  Success = "Success",
  /** Failed */
  Failed = "Failed",
}

/**
 * Status of protectable item, i.e. InProgress,Succeeded,Failed \
 * {@link KnownInquiryStatus} can be used interchangeably with InquiryStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Success** \
 * **Failed**
 */
export type InquiryStatus = string;

/** Azure VM workload-specific protectable item representing SAP ASE Database. */
export interface AzureVmWorkloadSAPAseDatabaseProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SAPAseDatabase";
}

export function azureVmWorkloadSAPAseDatabaseProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSAPAseDatabaseProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing SAP ASE System. */
export interface AzureVmWorkloadSAPAseSystemProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SAPAseSystem";
}

export function azureVmWorkloadSAPAseSystemProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSAPAseSystemProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing SAP HANA Database. */
export interface AzureVmWorkloadSAPHanaDatabaseProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SAPHanaDatabase";
}

export function azureVmWorkloadSAPHanaDatabaseProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaDatabaseProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing SAP HANA System. */
export interface AzureVmWorkloadSAPHanaSystemProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SAPHanaSystem";
}

export function azureVmWorkloadSAPHanaSystemProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaSystemProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing SAP HANA Dbinstance. */
export interface AzureVmWorkloadSAPHanaDBInstance extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SAPHanaDBInstance";
}

export function azureVmWorkloadSAPHanaDBInstanceDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaDBInstance {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing HANA HSR. */
export interface AzureVmWorkloadSAPHanaHSRProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "HanaHSRContainer";
}

export function azureVmWorkloadSAPHanaHSRProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaHSRProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing HANA scale out. */
export interface AzureVmWorkloadSAPHanaScaleoutProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "HanaScaleoutContainer";
}

export function azureVmWorkloadSAPHanaScaleoutProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSAPHanaScaleoutProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing SQL Availability Group. */
export interface AzureVmWorkloadSQLAvailabilityGroupProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SQLAvailabilityGroupContainer";
  /** List of the nodes in case of distributed container. */
  nodesList?: DistributedNodesInfo[];
}

export function azureVmWorkloadSQLAvailabilityGroupProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSQLAvailabilityGroupProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
    nodesList: !item["nodesList"]
      ? item["nodesList"]
      : distributedNodesInfoArrayDeserializer(item["nodesList"]),
  };
}

/** Azure VM workload-specific protectable item representing SQL Database. */
export interface AzureVmWorkloadSQLDatabaseProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SQLDataBase";
}

export function azureVmWorkloadSQLDatabaseProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSQLDatabaseProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** Azure VM workload-specific protectable item representing SQL Instance. */
export interface AzureVmWorkloadSQLInstanceProtectableItem extends AzureVmWorkloadProtectableItem {
  /** Type of the backup item. */
  protectableItemType: "SQLInstance";
}

export function azureVmWorkloadSQLInstanceProtectableItemDeserializer(
  item: any,
): AzureVmWorkloadSQLInstanceProtectableItem {
  return {
    protectableItemType: item["protectableItemType"],
    parentName: item["parentName"],
    parentUniqueName: item["parentUniqueName"],
    serverName: item["serverName"],
    isAutoProtectable: item["isAutoProtectable"],
    isAutoProtected: item["isAutoProtected"],
    subinquireditemcount: item["subinquireditemcount"],
    subprotectableitemcount: item["subprotectableitemcount"],
    prebackupvalidation: !item["prebackupvalidation"]
      ? item["prebackupvalidation"]
      : preBackupValidationDeserializer(item["prebackupvalidation"]),
    isProtectable: item["isProtectable"],
    backupManagementType: item["backupManagementType"],
    workloadType: item["workloadType"],
    friendlyName: item["friendlyName"],
    protectionState: item["protectionState"],
  };
}

/** List of ProtectionContainer resources */
export interface _ProtectionContainerResourceList extends ResourceList {
  /** List of resources. */
  value?: ProtectionContainerResource[];
}

export function _protectionContainerResourceListDeserializer(
  item: any,
): _ProtectionContainerResourceList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : protectionContainerResourceArrayDeserializer(item["value"]),
  };
}

export function protectionContainerResourceArraySerializer(
  result: Array<ProtectionContainerResource>,
): any[] {
  return result.map((item) => {
    return protectionContainerResourceSerializer(item);
  });
}

export function protectionContainerResourceArrayDeserializer(
  result: Array<ProtectionContainerResource>,
): any[] {
  return result.map((item) => {
    return protectionContainerResourceDeserializer(item);
  });
}

/** Base class for get security pin request body */
export interface SecurityPinBase {
  /** ResourceGuard Operation Requests */
  resourceGuardOperationRequests?: string[];
}

export function securityPinBaseSerializer(item: SecurityPinBase): any {
  return {
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** The token information details. */
export interface TokenInformation {
  /** Token value. */
  token?: string;
  /** Expiry time of token. */
  expiryTimeInUtcTicks?: number;
  /** Security PIN */
  securityPIN?: string;
}

export function tokenInformationDeserializer(item: any): TokenInformation {
  return {
    token: item["token"],
    expiryTimeInUtcTicks: item["expiryTimeInUtcTicks"],
    securityPIN: item["securityPIN"],
  };
}

/**
 * Base class for tiering cost request.
 * Specific cost request types are derived from this class.
 */
export interface FetchTieringCostInfoRequest {
  /** Source tier for the request */
  sourceTierType: RecoveryPointTierType;
  /** target tier for the request */
  targetTierType: RecoveryPointTierType;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: FetchTieringCostInfoForRehydrationRequest, FetchTieringCostSavingsInfoForPolicyRequest, FetchTieringCostSavingsInfoForProtectedItemRequest, FetchTieringCostSavingsInfoForVaultRequest */
  objectType: string;
}

export function fetchTieringCostInfoRequestSerializer(item: FetchTieringCostInfoRequest): any {
  return {
    sourceTierType: item["sourceTierType"],
    targetTierType: item["targetTierType"],
    objectType: item["objectType"],
  };
}

/** Alias for FetchTieringCostInfoRequestUnion */
export type FetchTieringCostInfoRequestUnion =
  | FetchTieringCostInfoForRehydrationRequest
  | FetchTieringCostSavingsInfoForPolicyRequest
  | FetchTieringCostSavingsInfoForProtectedItemRequest
  | FetchTieringCostSavingsInfoForVaultRequest
  | FetchTieringCostInfoRequest;

export function fetchTieringCostInfoRequestUnionSerializer(
  item: FetchTieringCostInfoRequestUnion,
): any {
  switch (item.objectType) {
    case "FetchTieringCostInfoForRehydrationRequest":
      return fetchTieringCostInfoForRehydrationRequestSerializer(
        item as FetchTieringCostInfoForRehydrationRequest,
      );

    case "FetchTieringCostSavingsInfoForPolicyRequest":
      return fetchTieringCostSavingsInfoForPolicyRequestSerializer(
        item as FetchTieringCostSavingsInfoForPolicyRequest,
      );

    case "FetchTieringCostSavingsInfoForProtectedItemRequest":
      return fetchTieringCostSavingsInfoForProtectedItemRequestSerializer(
        item as FetchTieringCostSavingsInfoForProtectedItemRequest,
      );

    case "FetchTieringCostSavingsInfoForVaultRequest":
      return fetchTieringCostSavingsInfoForVaultRequestSerializer(
        item as FetchTieringCostSavingsInfoForVaultRequest,
      );

    default:
      return fetchTieringCostInfoRequestSerializer(item);
  }
}

/** Request parameters for fetching cost info of rehydration */
export interface FetchTieringCostInfoForRehydrationRequest extends FetchTieringCostInfoRequest {
  /** Name of the protected item container */
  containerName: string;
  /** Name of the protectedItemName */
  protectedItemName: string;
  /** ID of the backup copy for rehydration cost info needs to be fetched. */
  recoveryPointId: string;
  /** Rehydration Priority */
  rehydrationPriority: RehydrationPriority;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "FetchTieringCostInfoForRehydrationRequest";
}

export function fetchTieringCostInfoForRehydrationRequestSerializer(
  item: FetchTieringCostInfoForRehydrationRequest,
): any {
  return {
    sourceTierType: item["sourceTierType"],
    targetTierType: item["targetTierType"],
    objectType: item["objectType"],
    containerName: item["containerName"],
    protectedItemName: item["protectedItemName"],
    recoveryPointId: item["recoveryPointId"],
    rehydrationPriority: item["rehydrationPriority"],
  };
}

/** Request parameters for tiering cost info for policy */
export interface FetchTieringCostSavingsInfoForPolicyRequest extends FetchTieringCostInfoRequest {
  /** Name of the backup policy for which the cost savings information is requested */
  policyName: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "FetchTieringCostSavingsInfoForPolicyRequest";
}

export function fetchTieringCostSavingsInfoForPolicyRequestSerializer(
  item: FetchTieringCostSavingsInfoForPolicyRequest,
): any {
  return {
    sourceTierType: item["sourceTierType"],
    targetTierType: item["targetTierType"],
    objectType: item["objectType"],
    policyName: item["policyName"],
  };
}

/** Request parameters for tiering cost info for protected item */
export interface FetchTieringCostSavingsInfoForProtectedItemRequest extends FetchTieringCostInfoRequest {
  /** Name of the protected item container */
  containerName: string;
  /** Name of the protectedItemName */
  protectedItemName: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "FetchTieringCostSavingsInfoForProtectedItemRequest";
}

export function fetchTieringCostSavingsInfoForProtectedItemRequestSerializer(
  item: FetchTieringCostSavingsInfoForProtectedItemRequest,
): any {
  return {
    sourceTierType: item["sourceTierType"],
    targetTierType: item["targetTierType"],
    objectType: item["objectType"],
    containerName: item["containerName"],
    protectedItemName: item["protectedItemName"],
  };
}

/** Request parameters for tiering cost info for vault */
export interface FetchTieringCostSavingsInfoForVaultRequest extends FetchTieringCostInfoRequest {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "FetchTieringCostSavingsInfoForVaultRequest";
}

export function fetchTieringCostSavingsInfoForVaultRequestSerializer(
  item: FetchTieringCostSavingsInfoForVaultRequest,
): any {
  return {
    sourceTierType: item["sourceTierType"],
    targetTierType: item["targetTierType"],
    objectType: item["objectType"],
  };
}

/** Base class for tiering cost response */
export interface TieringCostInfo {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: TieringCostRehydrationInfo, TieringCostSavingInfo */
  objectType: string;
}

export function tieringCostInfoDeserializer(item: any): TieringCostInfo {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for TieringCostInfoUnion */
export type TieringCostInfoUnion =
  | TieringCostRehydrationInfo
  | TieringCostSavingInfo
  | TieringCostInfo;

export function tieringCostInfoUnionDeserializer(item: any): TieringCostInfoUnion {
  switch (item.objectType) {
    case "TieringCostRehydrationInfo":
      return tieringCostRehydrationInfoDeserializer(item as TieringCostRehydrationInfo);

    case "TieringCostSavingInfo":
      return tieringCostSavingInfoDeserializer(item as TieringCostSavingInfo);

    default:
      return tieringCostInfoDeserializer(item);
  }
}

/** Response parameters for tiering cost info for rehydration */
export interface TieringCostRehydrationInfo extends TieringCostInfo {
  /** Rehydration size in bytes */
  rehydrationSizeInBytes: number;
  /** Source tier to target tier rehydration cost per GB per month */
  retailRehydrationCostPerGBPerMonth: number;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "TieringCostRehydrationInfo";
}

export function tieringCostRehydrationInfoDeserializer(item: any): TieringCostRehydrationInfo {
  return {
    objectType: item["objectType"],
    rehydrationSizeInBytes: item["rehydrationSizeInBytes"],
    retailRehydrationCostPerGBPerMonth: item["retailRehydrationCostPerGBPerMonth"],
  };
}

/** Response parameters for tiering cost info for savings */
export interface TieringCostSavingInfo extends TieringCostInfo {
  /** Source tier size reduction in bytes after moving all the recommended backup points to target tier */
  sourceTierSizeReductionInBytes: number;
  /** Target tier size increase in bytes after moving all the recommended backup points to target tier */
  targetTierSizeIncreaseInBytes: number;
  /** Source tier retail cost per GB per month */
  retailSourceTierCostPerGBPerMonth: number;
  /** Target tier retail cost per GB per month */
  retailTargetTierCostPerGBPerMonth: number;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  objectType: "TieringCostSavingInfo";
}

export function tieringCostSavingInfoDeserializer(item: any): TieringCostSavingInfo {
  return {
    objectType: item["objectType"],
    sourceTierSizeReductionInBytes: item["sourceTierSizeReductionInBytes"],
    targetTierSizeIncreaseInBytes: item["targetTierSizeIncreaseInBytes"],
    retailSourceTierCostPerGBPerMonth: item["retailSourceTierCostPerGBPerMonth"],
    retailTargetTierCostPerGBPerMonth: item["retailTargetTierCostPerGBPerMonth"],
  };
}

/**
 * Contract to validate if backup can be enabled on the given resource in a given vault and given configuration.
 * It will validate followings
 * 1. Vault capacity
 * 2. VM is already protected
 * 3. Any VM related configuration passed in properties.
 */
export interface PreValidateEnableBackupRequest {
  /** ProtectedItem Type- VM, SqlDataBase, AzureFileShare etc */
  resourceType?: DataSourceType;
  /** ARM Virtual Machine Id */
  resourceId?: string;
  /** ARM id of the Recovery Services Vault */
  vaultId?: string;
  /** Configuration of VM if any needs to be validated like OS type etc */
  properties?: string;
}

export function preValidateEnableBackupRequestSerializer(
  item: PreValidateEnableBackupRequest,
): any {
  return {
    resourceType: item["resourceType"],
    resourceId: item["resourceId"],
    vaultId: item["vaultId"],
    properties: item["properties"],
  };
}

/** Response contract for enable backup validation request */
export interface PreValidateEnableBackupResponse {
  /** Validation Status */
  status?: ValidationStatus;
  /** Response error code */
  errorCode?: string;
  /** Response error message */
  errorMessage?: string;
  /** Recommended action for user */
  recommendation?: string;
  /**
   * Specifies the product specific container name. E.g. iaasvmcontainer;iaasvmcontainer;rgname;vmname. This is required
   * for portal
   */
  containerName?: string;
  /** Specifies the product specific ds name. E.g. vm;iaasvmcontainer;rgname;vmname. This is required for portal */
  protectedItemName?: string;
}

export function preValidateEnableBackupResponseDeserializer(
  item: any,
): PreValidateEnableBackupResponse {
  return {
    status: item["status"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    recommendation: item["recommendation"],
    containerName: item["containerName"],
    protectedItemName: item["protectedItemName"],
  };
}

/** Validation Status */
export enum KnownValidationStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * Validation Status \
 * {@link KnownValidationStatus} can be used interchangeably with ValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Succeeded** \
 * **Failed**
 */
export type ValidationStatus = string;

/** Private Endpoint Connection Response Properties */
export interface PrivateEndpointConnectionResource extends Resource {
  /** PrivateEndpointConnectionResource properties */
  properties?: PrivateEndpointConnection;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Optional ETag. */
  eTag?: string;
}

export function privateEndpointConnectionResourceSerializer(
  item: PrivateEndpointConnectionResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    eTag: item["eTag"],
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
      : privateEndpointConnectionDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Private Endpoint Connection Response Properties */
export interface PrivateEndpointConnection {
  /** Gets or sets provisioning state of the private endpoint connection */
  provisioningState?: ProvisioningState;
  /** Gets or sets private endpoint associated with the private endpoint connection */
  privateEndpoint?: PrivateEndpoint;
  /** Group Ids for the Private Endpoint */
  groupIds?: VaultSubResourceType[];
  /** Gets or sets private link service connection state */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    provisioningState: item["provisioningState"],
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
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    provisioningState: item["provisioningState"],
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
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

/** Gets or sets provisioning state of the private endpoint connection */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Pending */
  Pending = "Pending",
}

/**
 * Gets or sets provisioning state of the private endpoint connection \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Deleting** \
 * **Failed** \
 * **Pending**
 */
export type ProvisioningState = string;

/** The Private Endpoint network resource that is linked to the Private Endpoint connection */
export interface PrivateEndpoint {
  /** Gets or sets id */
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

/** GroupId for the PrivateEndpointConnection - AzureBackup, AzureBackup_secondary or AzureSiteRecovery */
export enum KnownVaultSubResourceType {
  /** AzureBackup */
  AzureBackup = "AzureBackup",
  /** AzureBackup_secondary */
  AzureBackupSecondary = "AzureBackup_secondary",
  /** AzureSiteRecovery */
  AzureSiteRecovery = "AzureSiteRecovery",
}

/**
 * GroupId for the PrivateEndpointConnection - AzureBackup, AzureBackup_secondary or AzureSiteRecovery \
 * {@link KnownVaultSubResourceType} can be used interchangeably with VaultSubResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureBackup** \
 * **AzureBackup_secondary** \
 * **AzureSiteRecovery**
 */
export type VaultSubResourceType = string;

/** Private Link Service Connection State */
export interface PrivateLinkServiceConnectionState {
  /** Gets or sets the status */
  status?: PrivateEndpointConnectionStatus;
  /** Gets or sets description */
  description?: string;
  /** Gets or sets actions required */
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

/** Gets or sets the status */
export enum KnownPrivateEndpointConnectionStatus {
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
 * Gets or sets the status \
 * {@link KnownPrivateEndpointConnectionStatus} can be used interchangeably with PrivateEndpointConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateEndpointConnectionStatus = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-02-01 API version. */
  V20250201 = "2025-02-01",
  /** The 2025-08-01 API version. */
  V20250801 = "2025-08-01",
  /** The 2026-01-01-preview API version. */
  V20260101Preview = "2026-01-01-preview",
}
