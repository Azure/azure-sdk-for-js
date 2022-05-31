import * as coreClient from "@azure/core-client";

/** The list of updates. */
export interface UpdateList {
  /** The collection of pageable items. */
  value: Update[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Update metadata. */
export interface Update {
  /** Update identity. */
  updateId: UpdateId;
  /** Update description specified by creator. */
  description?: string;
  /** Friendly update name specified by importer. */
  friendlyName?: string;
  /** Whether the update can be deployed to a device on its own. */
  isDeployable?: boolean;
  /** Update type. Deprecated in latest import manifest schema. */
  updateType?: string;
  /** String interpreted by Device Update client to determine if the update is installed on the device. Deprecated in latest import manifest schema. */
  installedCriteria?: string;
  /** List of update compatibility information. */
  compatibility: { [propertyName: string]: string }[];
  /** Update install instructions. */
  instructions?: Instructions;
  /** List of update identities that reference this update. */
  referencedBy?: UpdateId[];
  /** Update aggregate scan result (calculated from payload file scan results). */
  scanResult?: string;
  /** Schema version of manifest used to import the update. */
  manifestVersion: string;
  /** Date and time in UTC when the update was imported. */
  importedDateTime: Date;
  /** Date and time in UTC when the update was created. */
  createdDateTime: Date;
  /** Update ETag. */
  etag?: string;
}

/** Update identifier. */
export interface UpdateId {
  /** Update provider. */
  provider: string;
  /** Update name. */
  name: string;
  /** Update version. */
  version: string;
}

export interface Instructions {
  /** Collection of installation steps. */
  steps: Step[];
}

/** Update install instruction step. */
export interface Step {
  /** Step type. */
  type?: StepType;
  /** Step description. */
  description?: string;
  /** Identity of handler that will execute this step. Required if step type is inline. */
  handler?: string;
  /** Parameters to be passed to handler during execution. */
  handlerProperties?: Record<string, unknown>;
  /** Collection of file names to be passed to handler during execution. Required if step type is inline. */
  files?: string[];
  /** Referenced child update identity.  Required if step type is reference. */
  updateId?: UpdateId;
}

/** Common error response. */
export interface ErrorResponse {
  /** The error details. */
  error: ErrorModel;
}

/** Error details. */
export interface ErrorModel {
  /** Server defined error code. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of errors that led to the reported error. */
  details?: ErrorModel[];
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerError;
  /** Date and time in UTC when the error occurred. */
  occurredDateTime?: Date;
}

/** An object containing more specific information than the current object about the error. */
export interface InnerError {
  /** A more specific error code than what was provided by the containing error. */
  code: string;
  /** A human-readable representation of the error. */
  message?: string;
  /** The internal error or exception message. */
  errorDetail?: string;
  /** An object containing more specific information than the current object about the error. */
  innerError?: InnerError;
}

/** Import update input item metadata. */
export interface ImportUpdateInputItem {
  /** Import manifest metadata like source URL, file size/hashes, etc. */
  importManifest: ImportManifestMetadata;
  /** Friendly update name. */
  friendlyName?: string;
  /** One or more update file properties like filename and source URL. */
  files?: FileImportMetadata[];
}

/** Metadata describing the import manifest, a document which describes the files and other metadata about an update version. */
export interface ImportManifestMetadata {
  /** Azure Blob location from which the import manifest can be downloaded by Device Update for IoT Hub. This is typically a read-only SAS-protected blob URL with an expiration set to at least 4 hours. */
  url: string;
  /** File size in number of bytes. */
  sizeInBytes: number;
  /** A JSON object containing the hash(es) of the file. At least SHA256 hash is required. This object can be thought of as a set of key-value pairs where the key is the hash algorithm, and the value is the hash of the file calculated using that algorithm. */
  hashes: { [propertyName: string]: string };
}

/** Metadata describing an update file. */
export interface FileImportMetadata {
  /** Update file name as specified inside import manifest. */
  filename: string;
  /** Azure Blob location from which the update file can be downloaded by Device Update for IoT Hub. This is typically a read-only SAS-protected blob URL with an expiration set to at least 4 hours. */
  url: string;
}

/** The list of strings with server paging support. */
export interface StringsList {
  /** The collection of pageable items. */
  value: string[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Update file basic metadata. */
export interface UpdateFileBase {
  /** File name. */
  fileName: string;
  /** File size in number of bytes. */
  sizeInBytes: number;
  /** Mapping of hashing algorithm to base64 encoded hash values. */
  hashes: { [propertyName: string]: string };
  /** File MIME type. */
  mimeType?: string;
  /** Anti-malware scan result. */
  scanResult?: string;
  /** Anti-malware scan details. */
  scanDetails?: string;
  /** Optional file properties (not consumed by service but pass-through to device). */
  properties?: { [propertyName: string]: string };
}

/** Download handler for utilizing related files to download payload file. */
export interface UpdateFileDownloadHandler {
  /** Download handler identifier. */
  id: string;
}

/** The list of operations with server paging support. */
export interface UpdateOperationsList {
  /** The collection of pageable items. */
  value: UpdateOperation[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Operation metadata. */
export interface UpdateOperation {
  /** Operation Id. */
  operationId: string;
  /** Operation status. */
  status: OperationStatus;
  /** The update being imported or deleted. For import, this property will only be populated after import manifest is processed successfully. */
  update?: UpdateInfo;
  /** Location of the imported update when operation is successful. */
  resourceLocation?: string;
  /** Operation error encountered, if any. */
  error?: ErrorModel;
  /** Operation correlation identity that can used by Microsoft Support for troubleshooting. */
  traceId?: string;
  /** Date and time in UTC when the operation status was last updated. */
  lastActionDateTime: Date;
  /** Date and time in UTC when the operation was created. */
  createdDateTime: Date;
  /** Operation ETag. */
  etag?: string;
}

/** Update information. */
export interface UpdateInfo {
  /** Update identifier. */
  updateId: UpdateId;
  /**
   * Update description.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly description?: string;
  /**
   * Friendly update name.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly friendlyName?: string;
}

/** The list of device classes. */
export interface DeviceClassesList {
  /** The collection of pageable items. */
  value: DeviceClass[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Device class metadata. */
export interface DeviceClass {
  /** The device class identifier. */
  deviceClassId: string;
  /** The device class friendly name. This can be updated by callers after the device class has been automatically created. */
  friendlyName?: string;
  /** The device class properties that are used to calculate the device class Id */
  deviceClassProperties: DeviceClassProperties;
  /** Update that is best compatible with this device class. */
  bestCompatibleUpdate?: UpdateInfo;
}

/** The device class properties that are used to calculate the device class Id */
export interface DeviceClassProperties {
  /** The Device Update agent contract model. */
  contractModel?: ContractModel;
  /** The compat properties of the device class. This object can be thought of as a set of key-value pairs where the key is the name of the compatibility property and the value is the value of the compatibility property. There will always be at least 1 compat property */
  compatProperties: { [propertyName: string]: string };
}

/** The Device Update agent contract model. */
export interface ContractModel {
  /** The Device Update agent contract model Id of the device class. This is also used to calculate the device class Id. */
  id: string;
  /** The Device Update agent contract model name of the device class. Intended to be a more readable form of the contract model Id. */
  name: string;
}

/** Device Class JSON Merge Patch request body */
export interface PatchBody {
  /** The device class friendly name. */
  friendlyName: string;
}

/** List of update information. */
export interface UpdateInfoList {
  /** The collection of pageable items. */
  value: UpdateInfo[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** The list of devices. */
export interface DevicesList {
  /** The collection of pageable items. */
  value: Device[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Device metadata. */
export interface Device {
  /** Device identity. */
  deviceId: string;
  /** Device module identity. */
  moduleId?: string;
  /** Device class identity. */
  deviceClassId: string;
  /** Device group identity. */
  groupId?: string;
  /** The update that device last attempted to install. */
  lastAttemptedUpdate?: UpdateInfo;
  /** State of the device in its last deployment. */
  deploymentStatus?: DeviceDeploymentState;
  /** Currently installed update on device. */
  installedUpdate?: UpdateInfo;
  /** Boolean flag indicating whether the latest update is installed on the device */
  onLatestUpdate: boolean;
  /** The deployment identifier for the last deployment to the device */
  lastDeploymentId?: string;
  /** Last install result. */
  lastInstallResult?: InstallResult;
}

/** The install result of an update and any step results under it. */
export interface InstallResult {
  /** Install result code. */
  resultCode: number;
  /** Install extended result code */
  extendedResultCode: number;
  /** A string containing further details about the install result */
  resultDetails?: string;
  /** Array of step results */
  stepResults?: StepResult[];
}

/** The step result under an update. */
export interface StepResult {
  /** The update that this step installs if it is of reference type. */
  update?: UpdateInfo;
  /** Step description. */
  description?: string;
  /** Install result code. */
  resultCode: number;
  /** Install extended result code */
  extendedResultCode: number;
  /** A string containing further details about the install result */
  resultDetails?: string;
}

/** Update compliance information. */
export interface UpdateCompliance {
  /** Total number of devices. */
  totalDeviceCount: number;
  /** Number of devices on the latest update. */
  onLatestUpdateDeviceCount: number;
  /** Number of devices with a newer update available. */
  newUpdatesAvailableDeviceCount: number;
  /** Number of devices with update in-progress. */
  updatesInProgressDeviceCount: number;
}

/** The list of groups. */
export interface GroupsList {
  /** The collection of pageable items. */
  value: Group[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Group details. */
export interface Group {
  /** Group identity. */
  groupId: string;
  /** Group type. */
  groupType: GroupType;
  /** Date and time when the update was created. */
  createdDateTime: string;
  /** The number of devices in the group. */
  deviceCount?: number;
  /** The count of subgroups with new updates available. */
  subgroupsWithNewUpdatesAvailableCount?: number;
  /** The count of subgroups with updates in progress. */
  subgroupsWithUpdatesInProgressCount?: number;
  /** The count of subgroups with devices on the latest update. */
  subgroupsWithOnLatestUpdateCount?: number;
  /** The active deployment Ids for the group */
  deployments?: string[];
}

/** The list of updatable devices for a device class subgroup. */
export interface DeviceClassSubgroupUpdatableDevicesList {
  /** The collection of pageable items. */
  value: DeviceClassSubgroupUpdatableDevices[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Device class subgroup, update information, and the number of devices for which the update is applicable. */
export interface DeviceClassSubgroupUpdatableDevices {
  /** The group Id */
  groupId: string;
  /** The device class subgroup's device class Id */
  deviceClassId: string;
  /** Update information. */
  update: UpdateInfo;
  /** Total number of devices for which the update is applicable. */
  deviceCount: number;
}

/** The list of deployments. */
export interface DeploymentsList {
  /** The collection of pageable items. */
  value: Deployment[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Deployment metadata. */
export interface Deployment {
  /** The deployment identifier. */
  deploymentId: string;
  /** The deployment start datetime. */
  startDateTime: Date;
  /** Update information. */
  update: UpdateInfo;
  /** The group identity */
  groupId: string;
  /** The device class subgroups for the deployment. */
  deviceClassSubgroups?: string[];
  /** Boolean flag indicating whether the deployment was canceled. */
  isCanceled?: boolean;
  /** Boolean flag indicating whether the deployment has been retried. */
  isRetried?: boolean;
  /** The rollback policy for the deployment. */
  rollbackPolicy?: CloudInitiatedRollbackPolicy;
  /** Boolean flag indicating whether the deployment is a rollback deployment. */
  isCloudInitiatedRollback?: boolean;
}

/** Rollback policy for deployment */
export interface CloudInitiatedRollbackPolicy {
  /** Update to rollback to. */
  update: UpdateInfo;
  /** Failure conditions to initiate rollback policy. */
  failure: CloudInitiatedRollbackPolicyFailure;
}

/** Failure conditions to initiate rollback policy */
export interface CloudInitiatedRollbackPolicyFailure {
  /** Percentage of devices that failed. */
  devicesFailedPercentage: number;
  /** Number of devices that failed. */
  devicesFailedCount: number;
}

/** Deployment status metadata. */
export interface DeploymentStatus {
  /** The group identity */
  groupId: string;
  /** The state of the deployment. */
  deploymentState: DeploymentState;
  /** The error details of the Failed state.  This is not present if the deployment state is not Failed. */
  error?: ErrorModel;
  /** The collection of device class subgroup status objects */
  subgroupStatus: DeviceClassSubgroupDeploymentStatus[];
}

/** Device class subgroup deployment status metadata. */
export interface DeviceClassSubgroupDeploymentStatus {
  /** The group identity */
  groupId: string;
  /** The device class subgroup identity */
  deviceClassId: string;
  /** The state of the subgroup deployment. */
  deploymentState: DeviceClassSubgroupDeploymentState;
  /** The error details of the Failed state.  This is not present if the deployment state is not Failed. */
  error?: ErrorModel;
  /** The total number of devices in the deployment. */
  totalDevices?: number;
  /** The number of devices that are currently in deployment. */
  devicesInProgressCount?: number;
  /** The number of devices that have completed deployment with a failure. */
  devicesCompletedFailedCount?: number;
  /** The number of devices which have successfully completed deployment. */
  devicesCompletedSucceededCount?: number;
  /** The number of devices which have had their deployment canceled. */
  devicesCanceledCount?: number;
}

/** The list of device class subgroups within a group. */
export interface DeviceClassSubgroupsList {
  /** The collection of pageable items. */
  value: DeviceClassSubgroup[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Device class subgroup details. */
export interface DeviceClassSubgroup {
  /** Device class subgroup identity. */
  deviceClassId: string;
  /** Group identity. */
  groupId: string;
  /** Date and time when the deviceclass subgroup was created. */
  createdDateTime: string;
  /** The number of devices in the deviceclass subgroup. */
  deviceCount?: number;
  /** The active deployment Id for the deviceclass subgroup. */
  deploymentId?: string;
}

/** The list of deployment device states. */
export interface DeploymentDeviceStatesList {
  /** The collection of pageable items. */
  value: DeploymentDeviceState[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Deployment device status. */
export interface DeploymentDeviceState {
  /** Device identity. */
  deviceId: string;
  /** Device module identity. */
  moduleId?: string;
  /** The number of times this deployment has been retried on this device. */
  retryCount: number;
  /** Boolean flag indicating whether this device is in a newer deployment and can no longer retry this deployment. */
  movedOnToNewDeployment: boolean;
  /** Deployment device state. */
  deviceState: DeviceDeploymentState;
}

/** Operation metadata. */
export interface DeviceOperation {
  /** Operation Id. */
  operationId: string;
  /** Operation status. */
  status: OperationStatus;
  /** Operation error encountered, if any. */
  error?: ErrorModel;
  /** Operation correlation identity that can used by Microsoft Support for troubleshooting. */
  traceId?: string;
  /** Date and time in UTC when the operation status was last updated. */
  lastActionDateTime: Date;
  /** Date and time in UTC when the operation was created. */
  createdDateTime: Date;
  /** Operation ETag. */
  etag?: string;
}

/** The list of device operations with server paging support. */
export interface DeviceOperationsList {
  /** The collection of pageable items. */
  value: DeviceOperation[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Diagnostics request body */
export interface LogCollectionOperation {
  /** The diagnostics operation id. */
  operationId?: string;
  /** Array of Device Update agent ids */
  deviceList: DeviceUpdateAgentId[];
  /** Description of the diagnostics operation. */
  description?: string;
  /**
   * The timestamp when the operation was created.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly createdDateTime?: string;
  /**
   * A timestamp for when the current state was entered.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastActionDateTime?: string;
  /**
   * Operation status.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: OperationStatus;
}

/** Device Update agent id */
export interface DeviceUpdateAgentId {
  /** Device Id */
  deviceId: string;
  /** Module Id */
  moduleId?: string;
}

/** The list of diagnostics operations with server paging support. */
export interface LogCollectionOperationList {
  /** The collection of pageable items. */
  value: LogCollectionOperation[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Device diagnostics operation detailed status */
export interface LogCollectionOperationDetailedStatus {
  /** The device diagnostics operation id. */
  operationId?: string;
  /** The timestamp when the operation was created. */
  createdDateTime?: string;
  /** A timestamp for when the current state was entered. */
  lastActionDateTime?: string;
  /** Operation status. */
  status?: OperationStatus;
  /** Status of the devices in the operation */
  deviceStatus?: LogCollectionOperationDeviceStatus[];
  /** Device diagnostics operation description. */
  description?: string;
}

/** Diagnostics operation device status */
export interface LogCollectionOperationDeviceStatus {
  /** Device id */
  deviceId: string;
  /** Module id. */
  moduleId?: string;
  /** Log upload status */
  status: OperationStatus;
  /** Log upload result code */
  resultCode?: string;
  /** Log upload extended result code */
  extendedResultCode?: string;
  /** Log upload location */
  logLocation?: string;
}

/** Array of Device Health, with server paging support. */
export interface DeviceHealthList {
  /** The collection of pageable items. */
  value: DeviceHealth[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Device Health */
export interface DeviceHealth {
  /** Device id */
  deviceId: string;
  /** Module id */
  moduleId?: string;
  /** Aggregate device health state */
  state: DeviceHealthState;
  /** Digital twin model Id */
  digitalTwinModelId?: string;
  /** Array of health checks and their results */
  healthChecks: HealthCheck[];
}

/** Health check */
export interface HealthCheck {
  /** Health check name */
  name?: string;
  /** Health check result */
  result?: HealthCheckResult;
}

/** Device filter. */
export interface DeviceFilter {
  /** Device group identity. */
  groupId?: string;
  /** Device class identity. */
  deviceClassId?: string;
  /** State of the device in its last deployment. */
  deploymentStatus?: DeviceDeploymentState;
}

/** Update filter. */
export interface UpdateFilter {
  /** Update isDeployable property. */
  isDeployable?: boolean;
}

/** Operation status filter. */
export interface OperationFilter {
  /** Operation status filter. */
  status?: OperationFilterStatus;
}

/** Groups order by. */
export interface GroupOrderBy {
  /** The group Id. */
  groupId?: string;
  /** The group device count. */
  deviceCount?: string;
  /** The group created date. */
  createdDate?: string;
  /** The number of subgroups with new updates available */
  subgroupsWithNewUpdatesAvailableCount?: string;
  /** The number of subgroups with updates in progress */
  subgroupsWithUpdatesInProgressCount?: string;
  /** The number of subgroups with devices on the latest update */
  subgroupsOnLatestUpdateCount?: string;
}

/** Deployment order by. */
export interface DeploymentOrderBy {
  /** The deployment start datetime. */
  startDateTime?: Date;
}

/** Deployment device state filter. */
export interface DeploymentDeviceStatesFilter {
  /** Device Identifier. */
  deviceId?: string;
  /** Device module Identifier. */
  moduleId?: string;
  /** The deployment device state. */
  deviceState?: DeviceState;
}

/** The list of diagnostics operations with detailed status, with server paging support. */
export interface LogCollectionOperationDetailedStatusList {
  /** The collection of pageable items. */
  value: LogCollectionOperationDetailedStatus[];
  /** The link to the next page of items. */
  nextLink?: string;
}

/** Device health filter. */
export interface DeviceHealthFilter {
  /** Device health state */
  state?: DeviceHealthState;
  /** Device Id */
  deviceId?: string;
  /** Module Id */
  moduleId?: string;
}

/** Update file metadata. */
export type UpdateFile = UpdateFileBase & {
  /** File identity, generated by server at import time. */
  fileId: string;
  /** Optional related files metadata used together DownloadHandler metadata to download payload file. */
  relatedFiles?: UpdateFileBase[];
  /** Optional download handler for utilizing related files to download payload file. */
  downloadHandler?: UpdateFileDownloadHandler;
  /** File ETag. */
  etag?: string;
};

/** Defines headers for DeviceUpdate_importUpdate operation. */
export interface DeviceUpdateImportUpdateHeaders {
  /** Url to retrieve the import operation status. */
  operationLocation?: string;
}

/** Defines headers for DeviceUpdate_deleteUpdate operation. */
export interface DeviceUpdateDeleteUpdateHeaders {
  /** Url to retrieve the operation status */
  operationLocation?: string;
}

/** Defines headers for DeviceUpdate_getOperation operation. */
export interface DeviceUpdateGetOperationHeaders {
  /** Number of seconds to wait before checking the operation status again. */
  retryAfter?: string;
}

/** Defines headers for DeviceManagement_importDevices operation. */
export interface DeviceManagementImportDevicesHeaders {
  /** Url to retrieve the device import operation status. */
  operationLocation?: string;
}

/** Defines headers for DeviceManagement_getOperation operation. */
export interface DeviceManagementGetOperationHeaders {
  /** Number of seconds to wait before checking the operation status again. */
  retryAfter?: string;
}

/** Parameter group */
export interface AccessCondition {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
}

/** Known values of {@link StepType} that the service accepts. */
export enum KnownStepType {
  /** Step type that performs code execution. */
  Inline = "Inline",
  /** Step type that installs another update. */
  Reference = "Reference"
}

/**
 * Defines values for StepType. \
 * {@link KnownStepType} can be used interchangeably with StepType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inline**: Step type that performs code execution. \
 * **Reference**: Step type that installs another update.
 */
export type StepType = string;

/** Known values of {@link OperationStatus} that the service accepts. */
export enum KnownOperationStatus {
  /** Background operation created but not started yet. */
  NotStarted = "NotStarted",
  /** Background operation is currently running. */
  Running = "Running",
  /** Background operation finished with success. */
  Succeeded = "Succeeded",
  /** Background operation finished with failure. */
  Failed = "Failed"
}

/**
 * Defines values for OperationStatus. \
 * {@link KnownOperationStatus} can be used interchangeably with OperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Background operation created but not started yet. \
 * **Running**: Background operation is currently running. \
 * **Succeeded**: Background operation finished with success. \
 * **Failed**: Background operation finished with failure.
 */
export type OperationStatus = string;

/** Known values of {@link DeviceDeploymentState} that the service accepts. */
export enum KnownDeviceDeploymentState {
  /** Deployment has completed with success. */
  Succeeded = "Succeeded",
  /** Deployment is in progress. */
  InProgress = "InProgress",
  /** Deployment was canceled. */
  Canceled = "Canceled",
  /** Deployment has completed with failure. */
  Failed = "Failed"
}

/**
 * Defines values for DeviceDeploymentState. \
 * {@link KnownDeviceDeploymentState} can be used interchangeably with DeviceDeploymentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Deployment has completed with success. \
 * **InProgress**: Deployment is in progress. \
 * **Canceled**: Deployment was canceled. \
 * **Failed**: Deployment has completed with failure.
 */
export type DeviceDeploymentState = string;

/** Known values of {@link ImportType} that the service accepts. */
export enum KnownImportType {
  /** Import only devices but not modules. */
  Devices = "Devices",
  /** Import only modules but not devices. */
  Modules = "Modules",
  /** Import both devices and modules. */
  All = "All"
}

/**
 * Defines values for ImportType. \
 * {@link KnownImportType} can be used interchangeably with ImportType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Devices**: Import only devices but not modules. \
 * **Modules**: Import only modules but not devices. \
 * **All**: Import both devices and modules.
 */
export type ImportType = string;

/** Known values of {@link GroupType} that the service accepts. */
export enum KnownGroupType {
  /** IoT Hub tag based group, all devices in the group share an ADUGroup tag value. */
  IoTHubTag = "IoTHubTag",
  /** Default group for untagged devices. */
  DefaultNoTag = "DefaultNoTag"
}

/**
 * Defines values for GroupType. \
 * {@link KnownGroupType} can be used interchangeably with GroupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IoTHubTag**: IoT Hub tag based group, all devices in the group share an ADUGroup tag value. \
 * **DefaultNoTag**: Default group for untagged devices.
 */
export type GroupType = string;

/** Known values of {@link DeploymentState} that the service accepts. */
export enum KnownDeploymentState {
  /** The deployment can be sent to devices targeted in the deployment. */
  Active = "Active",
  /** The deployment can be sent to some devices targeted in the deployment but at least 1 subgroup is in a failed state. */
  ActiveWithSubgroupFailures = "ActiveWithSubgroupFailures",
  /** The deployment will not be sent to any devices.  Consult error for more details about what failed. */
  Failed = "Failed",
  /** A newer deployment for this group has been created and no devices in the group will receive this deployment. */
  Inactive = "Inactive",
  /** The deployment has been canceled and no devices will receive it. */
  Canceled = "Canceled"
}

/**
 * Defines values for DeploymentState. \
 * {@link KnownDeploymentState} can be used interchangeably with DeploymentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The deployment can be sent to devices targeted in the deployment. \
 * **ActiveWithSubgroupFailures**: The deployment can be sent to some devices targeted in the deployment but at least 1 subgroup is in a failed state. \
 * **Failed**: The deployment will not be sent to any devices.  Consult error for more details about what failed. \
 * **Inactive**: A newer deployment for this group has been created and no devices in the group will receive this deployment. \
 * **Canceled**: The deployment has been canceled and no devices will receive it.
 */
export type DeploymentState = string;

/** Known values of {@link DeviceClassSubgroupDeploymentState} that the service accepts. */
export enum KnownDeviceClassSubgroupDeploymentState {
  /** The subgroup deployment can be sent to devices targeted in the deployment. */
  Active = "Active",
  /** The subgroup deployment failed and will not be sent to any devices. */
  Failed = "Failed",
  /** A newer deployment for this subgroup has been created and no devices in the subgroup will receive this deployment. */
  Inactive = "Inactive",
  /** The subgroup deployment has been canceled and no devices will receive it. */
  Canceled = "Canceled"
}

/**
 * Defines values for DeviceClassSubgroupDeploymentState. \
 * {@link KnownDeviceClassSubgroupDeploymentState} can be used interchangeably with DeviceClassSubgroupDeploymentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The subgroup deployment can be sent to devices targeted in the deployment. \
 * **Failed**: The subgroup deployment failed and will not be sent to any devices. \
 * **Inactive**: A newer deployment for this subgroup has been created and no devices in the subgroup will receive this deployment. \
 * **Canceled**: The subgroup deployment has been canceled and no devices will receive it.
 */
export type DeviceClassSubgroupDeploymentState = string;

/** Known values of {@link DeviceHealthState} that the service accepts. */
export enum KnownDeviceHealthState {
  /** Agent is healthy */
  Healthy = "healthy",
  /** Agent is in an unhealthy state */
  Unhealthy = "unhealthy"
}

/**
 * Defines values for DeviceHealthState. \
 * {@link KnownDeviceHealthState} can be used interchangeably with DeviceHealthState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **healthy**: Agent is healthy \
 * **unhealthy**: Agent is in an unhealthy state
 */
export type DeviceHealthState = string;

/** Known values of {@link HealthCheckResult} that the service accepts. */
export enum KnownHealthCheckResult {
  /** Health check succeeded */
  Success = "success",
  /** Health check failed due to user error */
  UserError = "userError"
}

/**
 * Defines values for HealthCheckResult. \
 * {@link KnownHealthCheckResult} can be used interchangeably with HealthCheckResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **success**: Health check succeeded \
 * **userError**: Health check failed due to user error
 */
export type HealthCheckResult = string;

/** Known values of {@link OperationFilterStatus} that the service accepts. */
export enum KnownOperationFilterStatus {
  Running = "Running",
  NotStarted = "NotStarted"
}

/**
 * Defines values for OperationFilterStatus. \
 * {@link KnownOperationFilterStatus} can be used interchangeably with OperationFilterStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running** \
 * **NotStarted**
 */
export type OperationFilterStatus = string;

/** Known values of {@link DeviceState} that the service accepts. */
export enum KnownDeviceState {
  /** Not started (or uninitialized) */
  NotStarted = "NotStarted",
  /** Deployment incompatible for this device. */
  Incompatible = "Incompatible",
  /** Another Deployment is underway for this device. */
  AlreadyInDeployment = "AlreadyInDeployment",
  /** Deployment has been canceled for this device. */
  Canceled = "Canceled",
  /** Deployment underway. */
  InProgress = "InProgress",
  /** Deployment failed. */
  Failed = "Failed",
  /** Deployment completed successfully. */
  Succeeded = "Succeeded"
}

/**
 * Defines values for DeviceState. \
 * {@link KnownDeviceState} can be used interchangeably with DeviceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Not started (or uninitialized) \
 * **Incompatible**: Deployment incompatible for this device. \
 * **AlreadyInDeployment**: Another Deployment is underway for this device. \
 * **Canceled**: Deployment has been canceled for this device. \
 * **InProgress**: Deployment underway. \
 * **Failed**: Deployment failed. \
 * **Succeeded**: Deployment completed successfully.
 */
export type DeviceState = string;

/** Optional parameters. */
export interface DeviceUpdateListUpdatesOptionalParams
  extends coreClient.OperationOptions {
  /** Request updates matching a free-text search expression. */
  search?: string;
  /** Filter updates by its properties. */
  filter?: string;
}

/** Contains response data for the listUpdates operation. */
export type DeviceUpdateListUpdatesResponse = UpdateList;

/** Optional parameters. */
export interface DeviceUpdateImportUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the importUpdate operation. */
export type DeviceUpdateImportUpdateResponse = DeviceUpdateImportUpdateHeaders;

/** Optional parameters. */
export interface DeviceUpdateGetUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Parameter group */
  accessCondition?: AccessCondition;
}

/** Contains response data for the getUpdate operation. */
export type DeviceUpdateGetUpdateResponse = Update;

/** Optional parameters. */
export interface DeviceUpdateDeleteUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the deleteUpdate operation. */
export type DeviceUpdateDeleteUpdateResponse = DeviceUpdateDeleteUpdateHeaders;

/** Optional parameters. */
export interface DeviceUpdateListProvidersOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listProviders operation. */
export type DeviceUpdateListProvidersResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateListNamesOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listNames operation. */
export type DeviceUpdateListNamesResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateListVersionsOptionalParams
  extends coreClient.OperationOptions {
  /** Filter updates by its properties. */
  filter?: string;
}

/** Contains response data for the listVersions operation. */
export type DeviceUpdateListVersionsResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateListFilesOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listFiles operation. */
export type DeviceUpdateListFilesResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateGetFileOptionalParams
  extends coreClient.OperationOptions {
  /** Parameter group */
  accessCondition?: AccessCondition;
}

/** Contains response data for the getFile operation. */
export type DeviceUpdateGetFileResponse = UpdateFile;

/** Optional parameters. */
export interface DeviceUpdateListOperationsOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
}

/** Contains response data for the listOperations operation. */
export type DeviceUpdateListOperationsResponse = UpdateOperationsList;

/** Optional parameters. */
export interface DeviceUpdateGetOperationOptionalParams
  extends coreClient.OperationOptions {
  /** Parameter group */
  accessCondition?: AccessCondition;
}

/** Contains response data for the getOperation operation. */
export type DeviceUpdateGetOperationResponse = DeviceUpdateGetOperationHeaders &
  UpdateOperation;

/** Optional parameters. */
export interface DeviceUpdateListUpdatesNextOptionalParams
  extends coreClient.OperationOptions {
  /** Request updates matching a free-text search expression. */
  search?: string;
  /** Filter updates by its properties. */
  filter?: string;
}

/** Contains response data for the listUpdatesNext operation. */
export type DeviceUpdateListUpdatesNextResponse = UpdateList;

/** Optional parameters. */
export interface DeviceUpdateListProvidersNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listProvidersNext operation. */
export type DeviceUpdateListProvidersNextResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateListNamesNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listNamesNext operation. */
export type DeviceUpdateListNamesNextResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateListVersionsNextOptionalParams
  extends coreClient.OperationOptions {
  /** Filter updates by its properties. */
  filter?: string;
}

/** Contains response data for the listVersionsNext operation. */
export type DeviceUpdateListVersionsNextResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateListFilesNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listFilesNext operation. */
export type DeviceUpdateListFilesNextResponse = StringsList;

/** Optional parameters. */
export interface DeviceUpdateListOperationsNextOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
}

/** Contains response data for the listOperationsNext operation. */
export type DeviceUpdateListOperationsNextResponse = UpdateOperationsList;

/** Optional parameters. */
export interface DeviceManagementListDeviceClassesOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listDeviceClasses operation. */
export type DeviceManagementListDeviceClassesResponse = DeviceClassesList;

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeviceClass operation. */
export type DeviceManagementGetDeviceClassResponse = DeviceClass;

/** Optional parameters. */
export interface DeviceManagementUpdateDeviceClassOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the updateDeviceClass operation. */
export type DeviceManagementUpdateDeviceClassResponse = DeviceClass;

/** Optional parameters. */
export interface DeviceManagementDeleteDeviceClassOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listInstallableUpdatesForDeviceClass operation. */
export type DeviceManagementListInstallableUpdatesForDeviceClassResponse = UpdateInfoList;

/** Optional parameters. */
export interface DeviceManagementListDevicesOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of devices returned. You can filter on GroupId, DeviceClassId, or GroupId and DeploymentStatus. */
  filter?: string;
}

/** Contains response data for the listDevices operation. */
export type DeviceManagementListDevicesResponse = DevicesList;

/** Optional parameters. */
export interface DeviceManagementImportDevicesOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the importDevices operation. */
export type DeviceManagementImportDevicesResponse = DeviceManagementImportDevicesHeaders;

/** Optional parameters. */
export interface DeviceManagementGetDeviceOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDevice operation. */
export type DeviceManagementGetDeviceResponse = Device;

/** Optional parameters. */
export interface DeviceManagementGetDeviceModuleOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeviceModule operation. */
export type DeviceManagementGetDeviceModuleResponse = Device;

/** Optional parameters. */
export interface DeviceManagementGetUpdateComplianceOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getUpdateCompliance operation. */
export type DeviceManagementGetUpdateComplianceResponse = UpdateCompliance;

/** Optional parameters. */
export interface DeviceManagementListGroupsOptionalParams
  extends coreClient.OperationOptions {
  /** Orders the set of groups returned. You can order by any combination of groupId, device count, created date, subgroupsWithNewUpdatesAvailableCount, subgroupsWithUpdatesInProgressCount, or subgroupsOnLatestUpdateCount. */
  orderby?: string;
}

/** Contains response data for the listGroups operation. */
export type DeviceManagementListGroupsResponse = GroupsList;

/** Optional parameters. */
export interface DeviceManagementGetGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getGroup operation. */
export type DeviceManagementGetGroupResponse = Group;

/** Optional parameters. */
export interface DeviceManagementDeleteGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetGroupUpdateComplianceOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getGroupUpdateCompliance operation. */
export type DeviceManagementGetGroupUpdateComplianceResponse = UpdateCompliance;

/** Optional parameters. */
export interface DeviceManagementListBestUpdatesForGroupOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of bestUpdates returned. You can filter on update Provider, Name and Version property. */
  filter?: string;
}

/** Contains response data for the listBestUpdatesForGroup operation. */
export type DeviceManagementListBestUpdatesForGroupResponse = DeviceClassSubgroupUpdatableDevicesList;

/** Optional parameters. */
export interface DeviceManagementListDeploymentsForGroupOptionalParams
  extends coreClient.OperationOptions {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

/** Contains response data for the listDeploymentsForGroup operation. */
export type DeviceManagementListDeploymentsForGroupResponse = DeploymentsList;

/** Optional parameters. */
export interface DeviceManagementGetDeploymentOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeployment operation. */
export type DeviceManagementGetDeploymentResponse = Deployment;

/** Optional parameters. */
export interface DeviceManagementCreateOrUpdateDeploymentOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the createOrUpdateDeployment operation. */
export type DeviceManagementCreateOrUpdateDeploymentResponse = Deployment;

/** Optional parameters. */
export interface DeviceManagementDeleteDeploymentOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeploymentStatusOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeploymentStatus operation. */
export type DeviceManagementGetDeploymentStatusResponse = DeploymentStatus;

/** Optional parameters. */
export interface DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of device class subgroups returned. You can filter on compat properties by name and value. */
  filter?: string;
}

/** Contains response data for the listDeviceClassSubgroupsForGroup operation. */
export type DeviceManagementListDeviceClassSubgroupsForGroupResponse = DeviceClassSubgroupsList;

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassSubgroupDetailsOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeviceClassSubgroupDetails operation. */
export type DeviceManagementGetDeviceClassSubgroupDetailsResponse = DeviceClassSubgroup;

/** Optional parameters. */
export interface DeviceManagementDeleteDeviceClassSubgroupOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeviceClassSubgroupUpdateCompliance operation. */
export type DeviceManagementGetDeviceClassSubgroupUpdateComplianceResponse = UpdateCompliance;

/** Optional parameters. */
export interface DeviceManagementListBestUpdatesForDeviceClassSubgroupOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listBestUpdatesForDeviceClassSubgroup operation. */
export type DeviceManagementListBestUpdatesForDeviceClassSubgroupResponse = DeviceClassSubgroupUpdatableDevices;

/** Optional parameters. */
export interface DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams
  extends coreClient.OperationOptions {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

/** Contains response data for the listDeploymentsForDeviceClassSubgroup operation. */
export type DeviceManagementListDeploymentsForDeviceClassSubgroupResponse = DeploymentsList;

/** Optional parameters. */
export interface DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeploymentForDeviceClassSubgroup operation. */
export type DeviceManagementGetDeploymentForDeviceClassSubgroupResponse = Deployment;

/** Optional parameters. */
export interface DeviceManagementDeleteDeviceClassSubgroupDeploymentOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementStopDeploymentOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the stopDeployment operation. */
export type DeviceManagementStopDeploymentResponse = Deployment;

/** Optional parameters. */
export interface DeviceManagementRetryDeploymentOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the retryDeployment operation. */
export type DeviceManagementRetryDeploymentResponse = Deployment;

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getDeviceClassSubgroupDeploymentStatus operation. */
export type DeviceManagementGetDeviceClassSubgroupDeploymentStatusResponse = DeviceClassSubgroupDeploymentStatus;

/** Optional parameters. */
export interface DeviceManagementListDevicesForDeviceClassSubgroupDeploymentOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of deployment device states returned. You can filter on deviceId and moduleId and/or deviceState. */
  filter?: string;
}

/** Contains response data for the listDevicesForDeviceClassSubgroupDeployment operation. */
export type DeviceManagementListDevicesForDeviceClassSubgroupDeploymentResponse = DeploymentDeviceStatesList;

/** Optional parameters. */
export interface DeviceManagementGetOperationOptionalParams
  extends coreClient.OperationOptions {
  /** Parameter group */
  accessCondition?: AccessCondition;
}

/** Contains response data for the getOperation operation. */
export type DeviceManagementGetOperationResponse = DeviceManagementGetOperationHeaders &
  DeviceOperation;

/** Optional parameters. */
export interface DeviceManagementListOperationsOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
}

/** Contains response data for the listOperations operation. */
export type DeviceManagementListOperationsResponse = DeviceOperationsList;

/** Optional parameters. */
export interface DeviceManagementCollectLogsOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the collectLogs operation. */
export type DeviceManagementCollectLogsResponse = LogCollectionOperation;

/** Optional parameters. */
export interface DeviceManagementGetLogCollectionOperationOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getLogCollectionOperation operation. */
export type DeviceManagementGetLogCollectionOperationResponse = LogCollectionOperation;

/** Optional parameters. */
export interface DeviceManagementListLogCollectionOperationsOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listLogCollectionOperations operation. */
export type DeviceManagementListLogCollectionOperationsResponse = LogCollectionOperationList;

/** Optional parameters. */
export interface DeviceManagementGetLogCollectionOperationDetailedStatusOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getLogCollectionOperationDetailedStatus operation. */
export type DeviceManagementGetLogCollectionOperationDetailedStatusResponse = LogCollectionOperationDetailedStatus;

/** Optional parameters. */
export interface DeviceManagementListDeviceHealthOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listDeviceHealth operation. */
export type DeviceManagementListDeviceHealthResponse = DeviceHealthList;

/** Optional parameters. */
export interface DeviceManagementListDeviceClassesNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listDeviceClassesNext operation. */
export type DeviceManagementListDeviceClassesNextResponse = DeviceClassesList;

/** Optional parameters. */
export interface DeviceManagementListInstallableUpdatesForDeviceClassNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listInstallableUpdatesForDeviceClassNext operation. */
export type DeviceManagementListInstallableUpdatesForDeviceClassNextResponse = UpdateInfoList;

/** Optional parameters. */
export interface DeviceManagementListDevicesNextOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of devices returned. You can filter on GroupId, DeviceClassId, or GroupId and DeploymentStatus. */
  filter?: string;
}

/** Contains response data for the listDevicesNext operation. */
export type DeviceManagementListDevicesNextResponse = DevicesList;

/** Optional parameters. */
export interface DeviceManagementListGroupsNextOptionalParams
  extends coreClient.OperationOptions {
  /** Orders the set of groups returned. You can order by any combination of groupId, device count, created date, subgroupsWithNewUpdatesAvailableCount, subgroupsWithUpdatesInProgressCount, or subgroupsOnLatestUpdateCount. */
  orderby?: string;
}

/** Contains response data for the listGroupsNext operation. */
export type DeviceManagementListGroupsNextResponse = GroupsList;

/** Optional parameters. */
export interface DeviceManagementListBestUpdatesForGroupNextOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of bestUpdates returned. You can filter on update Provider, Name and Version property. */
  filter?: string;
}

/** Contains response data for the listBestUpdatesForGroupNext operation. */
export type DeviceManagementListBestUpdatesForGroupNextResponse = DeviceClassSubgroupUpdatableDevicesList;

/** Optional parameters. */
export interface DeviceManagementListDeploymentsForGroupNextOptionalParams
  extends coreClient.OperationOptions {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

/** Contains response data for the listDeploymentsForGroupNext operation. */
export type DeviceManagementListDeploymentsForGroupNextResponse = DeploymentsList;

/** Optional parameters. */
export interface DeviceManagementListDeploymentsForDeviceClassSubgroupNextOptionalParams
  extends coreClient.OperationOptions {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

/** Contains response data for the listDeploymentsForDeviceClassSubgroupNext operation. */
export type DeviceManagementListDeploymentsForDeviceClassSubgroupNextResponse = DeploymentsList;

/** Optional parameters. */
export interface DeviceManagementListDevicesForDeviceClassSubgroupDeploymentNextOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of deployment device states returned. You can filter on deviceId and moduleId and/or deviceState. */
  filter?: string;
}

/** Contains response data for the listDevicesForDeviceClassSubgroupDeploymentNext operation. */
export type DeviceManagementListDevicesForDeviceClassSubgroupDeploymentNextResponse = DeploymentDeviceStatesList;

/** Optional parameters. */
export interface DeviceManagementListOperationsNextOptionalParams
  extends coreClient.OperationOptions {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
}

/** Contains response data for the listOperationsNext operation. */
export type DeviceManagementListOperationsNextResponse = DeviceOperationsList;

/** Optional parameters. */
export interface DeviceManagementListLogCollectionOperationsNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listLogCollectionOperationsNext operation. */
export type DeviceManagementListLogCollectionOperationsNextResponse = LogCollectionOperationList;

/** Optional parameters. */
export interface DeviceUpdateClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
