// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The list of updates. */
export interface _UpdateList {
  /** The Update items on this page */
  value: Update[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateListDeserializer(item: any): _UpdateList {
  return {
    value: updateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateArrayDeserializer(result: Array<Update>): any[] {
  return result.map((item) => {
    return updateDeserializer(item);
  });
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
  /**
   * String interpreted by Device Update client to determine if the update is
   * installed on the device. Deprecated in latest import manifest schema.
   */
  installedCriteria?: string;
  /** List of update compatibility information. */
  compatibility: Compatibility[];
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

export function updateDeserializer(item: any): Update {
  return {
    updateId: updateIdDeserializer(item["updateId"]),
    description: item["description"],
    friendlyName: item["friendlyName"],
    isDeployable: item["isDeployable"],
    updateType: item["updateType"],
    installedCriteria: item["installedCriteria"],
    compatibility: compatibilityArrayDeserializer(item["compatibility"]),
    instructions: !item["instructions"]
      ? item["instructions"]
      : instructionsDeserializer(item["instructions"]),
    referencedBy: !item["referencedBy"]
      ? item["referencedBy"]
      : updateIdArrayDeserializer(item["referencedBy"]),
    scanResult: item["scanResult"],
    manifestVersion: item["manifestVersion"],
    importedDateTime: new Date(item["importedDateTime"]),
    createdDateTime: new Date(item["createdDateTime"]),
    etag: item["etag"],
  };
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

export function updateIdSerializer(item: UpdateId): any {
  return { provider: item["provider"], name: item["name"], version: item["version"] };
}

export function updateIdDeserializer(item: any): UpdateId {
  return {
    provider: item["provider"],
    name: item["name"],
    version: item["version"],
  };
}

export function compatibilityArrayDeserializer(result: Array<Compatibility>): any[] {
  return result.map((item) => {
    return compatibilityDeserializer(item);
  });
}

/** Key-value pairs representing update compatibility information. */
export interface Compatibility {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function compatibilityDeserializer(item: any): Compatibility {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

/** Update install instructions container. */
export interface Instructions {
  /** Collection of installation steps. */
  steps: Step[];
}

export function instructionsDeserializer(item: any): Instructions {
  return {
    steps: stepArrayDeserializer(item["steps"]),
  };
}

export function stepArrayDeserializer(result: Array<Step>): any[] {
  return result.map((item) => {
    return stepDeserializer(item);
  });
}

/** Update install instruction step. */
export interface Step {
  /** Step type. */
  type?: StepType;
  /** Step description. */
  description?: string;
  /**
   * Identity of handler that will execute this step. Required if step type is
   * inline.
   */
  handler?: string;
  /** Parameters to be passed to handler during execution. */
  handlerProperties?: Record<string, any>;
  /**
   * Collection of file names to be passed to handler during execution. Required if
   * step type is inline.
   */
  files?: string[];
  /** Referenced child update identity.  Required if step type is reference. */
  updateId?: UpdateId;
}

export function stepDeserializer(item: any): Step {
  return {
    type: item["type"],
    description: item["description"],
    handler: item["handler"],
    handlerProperties: !item["handlerProperties"]
      ? item["handlerProperties"]
      : Object.fromEntries(
          Object.entries(item["handlerProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    files: !item["files"]
      ? item["files"]
      : item["files"].map((p: any) => {
          return p;
        }),
    updateId: !item["updateId"] ? item["updateId"] : updateIdDeserializer(item["updateId"]),
  };
}

/** Step type. */
export type StepType = "inline" | "reference";

export function updateIdArraySerializer(result: Array<UpdateId>): any[] {
  return result.map((item) => {
    return updateIdSerializer(item);
  });
}

export function updateIdArrayDeserializer(result: Array<UpdateId>): any[] {
  return result.map((item) => {
    return updateIdDeserializer(item);
  });
}

/** Common error response. */
export interface ErrorResponse {
  /** The error details. */
  error: ErrorModel;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: errorDeserializer(item["error"]),
  };
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
  /**
   * An object containing more specific information than the current object about
   * the error.
   */
  innererror?: InnerError;
  /** Date and time in UTC when the error occurred. */
  occurredDateTime?: Date;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorArrayDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : innerErrorDeserializer(item["innererror"]),
    occurredDateTime: !item["occurredDateTime"]
      ? item["occurredDateTime"]
      : new Date(item["occurredDateTime"]),
  };
}

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
  });
}

/**
 * An object containing more specific information than the current object about
 * the error.
 */
export interface InnerError {
  /** A more specific error code than what was provided by the containing error. */
  code: string;
  /** A human-readable representation of the error. */
  message?: string;
  /** The internal error or exception message. */
  errorDetail?: string;
  /**
   * An object containing more specific information than the current object about
   * the error.
   */
  innerError?: InnerError;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    code: item["code"],
    message: item["message"],
    errorDetail: item["errorDetail"],
    innerError: !item["innerError"]
      ? item["innerError"]
      : innerErrorDeserializer(item["innerError"]),
  };
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

export function importUpdateInputItemSerializer(item: ImportUpdateInputItem): any {
  return {
    importManifest: importManifestMetadataSerializer(item["importManifest"]),
    friendlyName: item["friendlyName"],
    files: !item["files"] ? item["files"] : fileImportMetadataArraySerializer(item["files"]),
  };
}

/**
 * Metadata describing the import manifest, a document which describes the files
 * and other metadata about an update version.
 */
export interface ImportManifestMetadata {
  /**
   * Azure Blob location from which the import manifest can be downloaded by Device
   * Update for IoT Hub. This is typically a read-only SAS-protected blob URL with
   * an expiration set to at least 4 hours.
   */
  url: string;
  /** File size in number of bytes. */
  sizeInBytes: number;
  /**
   * A JSON object containing the hash(es) of the file. At least SHA256 hash is
   * required. This object can be thought of as a set of key-value pairs where the
   * key is the hash algorithm, and the value is the hash of the file calculated
   * using that algorithm.
   */
  hashes: Record<string, string>;
}

export function importManifestMetadataSerializer(item: ImportManifestMetadata): any {
  return { url: item["url"], sizeInBytes: item["sizeInBytes"], hashes: item["hashes"] };
}

export function fileImportMetadataArraySerializer(result: Array<FileImportMetadata>): any[] {
  return result.map((item) => {
    return fileImportMetadataSerializer(item);
  });
}

/** Metadata describing an update file. */
export interface FileImportMetadata {
  /** Update file name as specified inside import manifest. */
  filename: string;
  /**
   * Azure Blob location from which the update file can be downloaded by Device
   * Update for IoT Hub. This is typically a read-only SAS-protected blob URL with
   * an expiration set to at least 4 hours.
   */
  url: string;
}

export function fileImportMetadataSerializer(item: FileImportMetadata): any {
  return { filename: item["filename"], url: item["url"] };
}

/** Operation metadata. */
export interface UpdateOperation {
  /** Operation Id. */
  operationId: string;
  /** Operation status. */
  status: OperationStatus;
  /**
   * The update being imported or deleted. For import, this property will only be
   * populated after import manifest is processed successfully.
   */
  update?: UpdateInfo;
  /** Location of the imported update when operation is successful. */
  resourceLocation?: string;
  /** Operation error encountered, if any. */
  error?: ErrorModel;
  /**
   * Operation correlation identity that can used by Microsoft Support for
   * troubleshooting.
   */
  traceId?: string;
  /** Date and time in UTC when the operation status was last updated. */
  lastActionDateTime: Date;
  /** Date and time in UTC when the operation was created. */
  createdDateTime: Date;
  /** Operation ETag. */
  etag?: string;
}

export function updateOperationDeserializer(item: any): UpdateOperation {
  return {
    operationId: item["operationId"],
    status: item["status"],
    update: !item["update"] ? item["update"] : updateInfoDeserializer(item["update"]),
    resourceLocation: item["resourceLocation"],
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
    traceId: item["traceId"],
    lastActionDateTime: new Date(item["lastActionDateTime"]),
    createdDateTime: new Date(item["createdDateTime"]),
    etag: item["etag"],
  };
}

/** Operation status. */
export type OperationStatus = "NotStarted" | "Running" | "Succeeded" | "Failed";

/** Update information. */
export interface UpdateInfo {
  /** Update identifier. */
  updateId: UpdateId;
  /** Update description. */
  readonly description?: string;
  /** Friendly update name. */
  readonly friendlyName?: string;
}

export function updateInfoSerializer(item: UpdateInfo): any {
  return { updateId: updateIdSerializer(item["updateId"]) };
}

export function updateInfoDeserializer(item: any): UpdateInfo {
  return {
    updateId: updateIdDeserializer(item["updateId"]),
    description: item["description"],
    friendlyName: item["friendlyName"],
  };
}

/** The list of strings with server paging support. */
export interface _StringsList {
  /** The collection of pageable items. */
  value: string[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _stringsListDeserializer(item: any): _StringsList {
  return {
    value: item["value"].map((p: any) => {
      return p;
    }),
    nextLink: item["nextLink"],
  };
}

/** Update file metadata. */
export interface UpdateFile extends UpdateFileBase {
  /** File identity, generated by server at import time. */
  fileId: string;
  /**
   * Optional related files metadata used together DownloadHandler metadata to
   * download payload file.
   */
  relatedFiles?: UpdateFileBase[];
  /** Optional download handler for utilizing related files to download payload file. */
  downloadHandler?: UpdateFileDownloadHandler;
  /** File ETag. */
  etag?: string;
}

export function updateFileDeserializer(item: any): UpdateFile {
  return {
    fileName: item["fileName"],
    sizeInBytes: item["sizeInBytes"],
    hashes: Object.fromEntries(
      Object.entries(item["hashes"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    mimeType: item["mimeType"],
    scanResult: item["scanResult"],
    scanDetails: item["scanDetails"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    fileId: item["fileId"],
    relatedFiles: !item["relatedFiles"]
      ? item["relatedFiles"]
      : updateFileBaseArrayDeserializer(item["relatedFiles"]),
    downloadHandler: !item["downloadHandler"]
      ? item["downloadHandler"]
      : updateFileDownloadHandlerDeserializer(item["downloadHandler"]),
    etag: item["etag"],
  };
}

export function updateFileBaseArrayDeserializer(result: Array<UpdateFileBase>): any[] {
  return result.map((item) => {
    return updateFileBaseDeserializer(item);
  });
}

/** Update file basic metadata. */
export interface UpdateFileBase {
  /** File name. */
  fileName: string;
  /** File size in number of bytes. */
  sizeInBytes: number;
  /** Mapping of hashing algorithm to base64 encoded hash values. */
  hashes: Record<string, string>;
  /** File MIME type. */
  mimeType?: string;
  /** Anti-malware scan result. */
  scanResult?: string;
  /** Anti-malware scan details. */
  scanDetails?: string;
  /** Optional file properties (not consumed by service but pass-through to device). */
  properties?: Record<string, string>;
}

export function updateFileBaseDeserializer(item: any): UpdateFileBase {
  return {
    fileName: item["fileName"],
    sizeInBytes: item["sizeInBytes"],
    hashes: Object.fromEntries(
      Object.entries(item["hashes"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    mimeType: item["mimeType"],
    scanResult: item["scanResult"],
    scanDetails: item["scanDetails"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Download handler for utilizing related files to download payload file. */
export interface UpdateFileDownloadHandler {
  /** Download handler identifier. */
  id: string;
}

export function updateFileDownloadHandlerDeserializer(item: any): UpdateFileDownloadHandler {
  return {
    id: item["id"],
  };
}

/** The list of operations with server paging support. */
export interface _UpdateOperationsList {
  /** The UpdateOperation items on this page */
  value: UpdateOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateOperationsListDeserializer(item: any): _UpdateOperationsList {
  return {
    value: updateOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateOperationArrayDeserializer(result: Array<UpdateOperation>): any[] {
  return result.map((item) => {
    return updateOperationDeserializer(item);
  });
}

/** The list of device classes. */
export interface _DeviceClassesList {
  /** The DeviceClass items on this page */
  value: DeviceClass[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deviceClassesListDeserializer(item: any): _DeviceClassesList {
  return {
    value: deviceClassArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceClassArrayDeserializer(result: Array<DeviceClass>): any[] {
  return result.map((item) => {
    return deviceClassDeserializer(item);
  });
}

/** Device class metadata. */
export interface DeviceClass {
  /**
   * The device class identifier. This is generated from the model Id and the compat
   * properties reported by the device update agent in the Device Update PnP
   * interface in IoT Hub. It is a hex-encoded SHA1 hash.
   */
  deviceClassId: string;
  /**
   * The device class friendly name. This can be updated by callers after the device
   * class has been automatically created.
   */
  friendlyName?: string;
  /** The device class properties that are used to calculate the device class Id */
  deviceClassProperties: DeviceClassProperties;
  /** Update that is the highest version compatible with this device class. */
  bestCompatibleUpdate?: UpdateInfo;
}

export function deviceClassDeserializer(item: any): DeviceClass {
  return {
    deviceClassId: item["deviceClassId"],
    friendlyName: item["friendlyName"],
    deviceClassProperties: deviceClassPropertiesDeserializer(item["deviceClassProperties"]),
    bestCompatibleUpdate: !item["bestCompatibleUpdate"]
      ? item["bestCompatibleUpdate"]
      : updateInfoDeserializer(item["bestCompatibleUpdate"]),
  };
}

/** The device class properties that are used to calculate the device class Id */
export interface DeviceClassProperties {
  /** The Device Update agent contract model. */
  contractModel?: ContractModel;
  /**
   * The compat properties of the device class. This object can be thought of as a
   * set of key-value pairs where the key is the name of the compatibility property
   * and the value is the value of the compatibility property. There will always be
   * at least 1 compat property
   */
  compatProperties: Record<string, string>;
}

export function deviceClassPropertiesDeserializer(item: any): DeviceClassProperties {
  return {
    contractModel: !item["contractModel"]
      ? item["contractModel"]
      : contractModelDeserializer(item["contractModel"]),
    compatProperties: Object.fromEntries(
      Object.entries(item["compatProperties"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The Device Update agent contract model. */
export interface ContractModel {
  /**
   * The Device Update agent contract model Id of the device class. This is also
   * used to calculate the device class Id.
   */
  id: string;
  /**
   * The Device Update agent contract model name of the device class. Intended to be
   * a more readable form of the contract model Id.
   */
  name: string;
}

export function contractModelDeserializer(item: any): ContractModel {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** Device Class JSON Merge Patch request body */
export interface PatchBody {
  /**
   * The device class friendly name. Friendly name can be 1-100 characters,
   * alphanumeric, dot, and dash.
   */
  friendlyName: string;
}

export function patchBodySerializer(item: PatchBody): any {
  return { friendlyName: item["friendlyName"] };
}

/** List of update information. */
export interface _UpdateInfoList {
  /** The UpdateInfo items on this page */
  value: UpdateInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateInfoListDeserializer(item: any): _UpdateInfoList {
  return {
    value: updateInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateInfoArraySerializer(result: Array<UpdateInfo>): any[] {
  return result.map((item) => {
    return updateInfoSerializer(item);
  });
}

export function updateInfoArrayDeserializer(result: Array<UpdateInfo>): any[] {
  return result.map((item) => {
    return updateInfoDeserializer(item);
  });
}

/** The list of devices. */
export interface _DevicesList {
  /** The Device items on this page */
  value: Device[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _devicesListDeserializer(item: any): _DevicesList {
  return {
    value: deviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceArrayDeserializer(result: Array<Device>): any[] {
  return result.map((item) => {
    return deviceDeserializer(item);
  });
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
  /**
   * Boolean flag indicating whether the latest update (the best compatible update
   * for the device's device class and group) is installed on the device
   */
  onLatestUpdate: boolean;
  /** The deployment identifier for the last deployment to the device */
  lastDeploymentId?: string;
  /** Last install result. */
  lastInstallResult?: InstallResult;
}

export function deviceDeserializer(item: any): Device {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
    deviceClassId: item["deviceClassId"],
    groupId: item["groupId"],
    lastAttemptedUpdate: !item["lastAttemptedUpdate"]
      ? item["lastAttemptedUpdate"]
      : updateInfoDeserializer(item["lastAttemptedUpdate"]),
    deploymentStatus: item["deploymentStatus"],
    installedUpdate: !item["installedUpdate"]
      ? item["installedUpdate"]
      : updateInfoDeserializer(item["installedUpdate"]),
    onLatestUpdate: item["onLatestUpdate"],
    lastDeploymentId: item["lastDeploymentId"],
    lastInstallResult: !item["lastInstallResult"]
      ? item["lastInstallResult"]
      : installResultDeserializer(item["lastInstallResult"]),
  };
}

/** Deployment state. */
export type DeviceDeploymentState = "Succeeded" | "InProgress" | "Canceled" | "Failed";

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

export function installResultDeserializer(item: any): InstallResult {
  return {
    resultCode: item["resultCode"],
    extendedResultCode: item["extendedResultCode"],
    resultDetails: item["resultDetails"],
    stepResults: !item["stepResults"]
      ? item["stepResults"]
      : stepResultArrayDeserializer(item["stepResults"]),
  };
}

export function stepResultArrayDeserializer(result: Array<StepResult>): any[] {
  return result.map((item) => {
    return stepResultDeserializer(item);
  });
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

export function stepResultDeserializer(item: any): StepResult {
  return {
    update: !item["update"] ? item["update"] : updateInfoDeserializer(item["update"]),
    description: item["description"],
    resultCode: item["resultCode"],
    extendedResultCode: item["extendedResultCode"],
    resultDetails: item["resultDetails"],
  };
}

/** Operation metadata. */
export interface DeviceOperation {
  /** Operation Id. */
  operationId: string;
  /** Operation status. */
  status: OperationStatus;
  /** Operation error encountered, if any. */
  error?: ErrorModel;
  /**
   * Operation correlation identity that can used by Microsoft Support for
   * troubleshooting.
   */
  traceId?: string;
  /** Date and time in UTC when the operation status was last updated. */
  lastActionDateTime: Date;
  /** Date and time in UTC when the operation was created. */
  createdDateTime: Date;
  /** Operation ETag. */
  etag?: string;
}

export function deviceOperationDeserializer(item: any): DeviceOperation {
  return {
    operationId: item["operationId"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
    traceId: item["traceId"],
    lastActionDateTime: new Date(item["lastActionDateTime"]),
    createdDateTime: new Date(item["createdDateTime"]),
    etag: item["etag"],
  };
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

export function updateComplianceDeserializer(item: any): UpdateCompliance {
  return {
    totalDeviceCount: item["totalDeviceCount"],
    onLatestUpdateDeviceCount: item["onLatestUpdateDeviceCount"],
    newUpdatesAvailableDeviceCount: item["newUpdatesAvailableDeviceCount"],
    updatesInProgressDeviceCount: item["updatesInProgressDeviceCount"],
  };
}

/** The list of groups. */
export interface _GroupsList {
  /** The Group items on this page */
  value: Group[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _groupsListDeserializer(item: any): _GroupsList {
  return {
    value: groupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function groupArrayDeserializer(result: Array<Group>): any[] {
  return result.map((item) => {
    return groupDeserializer(item);
  });
}

/** Group details. */
export interface Group {
  /**
   * Group identity. This is created from the value of the ADUGroup tag in the Iot
   * Hub's device/module twin or $default for devices with no tag.
   */
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

export function groupDeserializer(item: any): Group {
  return {
    groupId: item["groupId"],
    groupType: item["groupType"],
    createdDateTime: item["createdDateTime"],
    deviceCount: item["deviceCount"],
    subgroupsWithNewUpdatesAvailableCount: item["subgroupsWithNewUpdatesAvailableCount"],
    subgroupsWithUpdatesInProgressCount: item["subgroupsWithUpdatesInProgressCount"],
    subgroupsWithOnLatestUpdateCount: item["subgroupsWithOnLatestUpdateCount"],
    deployments: !item["deployments"]
      ? item["deployments"]
      : item["deployments"].map((p: any) => {
          return p;
        }),
  };
}

/** Supported group types. */
export type GroupType = "IoTHubTag" | "DefaultNoTag";

/** The list of updatable devices for a device class subgroup. */
export interface _DeviceClassSubgroupUpdatableDevicesList {
  /** The DeviceClassSubgroupUpdatableDevices items on this page */
  value: DeviceClassSubgroupUpdatableDevices[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deviceClassSubgroupUpdatableDevicesListDeserializer(
  item: any,
): _DeviceClassSubgroupUpdatableDevicesList {
  return {
    value: deviceClassSubgroupUpdatableDevicesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceClassSubgroupUpdatableDevicesArrayDeserializer(
  result: Array<DeviceClassSubgroupUpdatableDevices>,
): any[] {
  return result.map((item) => {
    return deviceClassSubgroupUpdatableDevicesDeserializer(item);
  });
}

/**
 * Device class subgroup, update information, and the number of devices for which
 * the update is applicable.
 */
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

export function deviceClassSubgroupUpdatableDevicesDeserializer(
  item: any,
): DeviceClassSubgroupUpdatableDevices {
  return {
    groupId: item["groupId"],
    deviceClassId: item["deviceClassId"],
    update: updateInfoDeserializer(item["update"]),
    deviceCount: item["deviceCount"],
  };
}

/** The list of deployments. */
export interface _DeploymentsList {
  /** The Deployment items on this page */
  value: Deployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentsListDeserializer(item: any): _DeploymentsList {
  return {
    value: deploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentArraySerializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentSerializer(item);
  });
}

export function deploymentArrayDeserializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentDeserializer(item);
  });
}

/** Deployment metadata. */
export interface Deployment {
  /**
   * The caller-provided deployment identifier. This cannot be longer than 73
   * characters, must be all lower-case, and cannot contain '&', '^', '[', ']', '{',
   * '}', '|', '<', '>', forward slash, backslash, or double quote. The Updates view
   * in the Azure Portal IoT Hub resource generates a GUID for deploymentId when you
   * create a deployment.
   */
  deploymentId: string;
  /** The deployment start datetime. */
  startDateTime: Date;
  /** Update information for the update in the deployment. */
  update: UpdateInfo;
  /** The group identity for the devices the deployment is intended to update. */
  groupId: string;
  /**
   * The device class subgroups the deployment is compatible with and subgroup
   * deployments have been created for. This is not provided by the caller during
   * CreateOrUpdateDeployment but is automatically determined by Device Update
   */
  deviceClassSubgroups?: string[];
  /** Boolean flag indicating whether the deployment was canceled. */
  isCanceled?: boolean;
  /** Boolean flag indicating whether the deployment has been retried. */
  isRetried?: boolean;
  /** The rollback policy for the deployment. */
  rollbackPolicy?: CloudInitiatedRollbackPolicy;
  /** Boolean flag indicating whether the deployment is a rollback deployment. */
  isCloudInitiatedRollback?: boolean;
  /**
   * The protocol the device should use when downloading the update payload.
   * Defaults to "https".
   */
  downloadSecurity?: DownloadSecurity;
}

export function deploymentSerializer(item: Deployment): any {
  return {
    deploymentId: item["deploymentId"],
    startDateTime: item["startDateTime"].toISOString(),
    update: updateInfoSerializer(item["update"]),
    groupId: item["groupId"],
    deviceClassSubgroups: !item["deviceClassSubgroups"]
      ? item["deviceClassSubgroups"]
      : item["deviceClassSubgroups"].map((p: any) => {
          return p;
        }),
    isCanceled: item["isCanceled"],
    isRetried: item["isRetried"],
    rollbackPolicy: !item["rollbackPolicy"]
      ? item["rollbackPolicy"]
      : cloudInitiatedRollbackPolicySerializer(item["rollbackPolicy"]),
    isCloudInitiatedRollback: item["isCloudInitiatedRollback"],
    downloadSecurity: item["downloadSecurity"],
  };
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    deploymentId: item["deploymentId"],
    startDateTime: new Date(item["startDateTime"]),
    update: updateInfoDeserializer(item["update"]),
    groupId: item["groupId"],
    deviceClassSubgroups: !item["deviceClassSubgroups"]
      ? item["deviceClassSubgroups"]
      : item["deviceClassSubgroups"].map((p: any) => {
          return p;
        }),
    isCanceled: item["isCanceled"],
    isRetried: item["isRetried"],
    rollbackPolicy: !item["rollbackPolicy"]
      ? item["rollbackPolicy"]
      : cloudInitiatedRollbackPolicyDeserializer(item["rollbackPolicy"]),
    isCloudInitiatedRollback: item["isCloudInitiatedRollback"],
    downloadSecurity: item["downloadSecurity"],
  };
}

/** Rollback policy for deployment */
export interface CloudInitiatedRollbackPolicy {
  /** Update to rollback to. */
  update: UpdateInfo;
  /** Failure conditions to initiate rollback policy. */
  failure: CloudInitiatedRollbackPolicyFailure;
}

export function cloudInitiatedRollbackPolicySerializer(item: CloudInitiatedRollbackPolicy): any {
  return {
    update: updateInfoSerializer(item["update"]),
    failure: cloudInitiatedRollbackPolicyFailureSerializer(item["failure"]),
  };
}

export function cloudInitiatedRollbackPolicyDeserializer(item: any): CloudInitiatedRollbackPolicy {
  return {
    update: updateInfoDeserializer(item["update"]),
    failure: cloudInitiatedRollbackPolicyFailureDeserializer(item["failure"]),
  };
}

/** Failure conditions to initiate rollback policy */
export interface CloudInitiatedRollbackPolicyFailure {
  /** Percentage of devices that failed. */
  devicesFailedPercentage: number;
  /** Number of devices that failed. */
  devicesFailedCount: number;
}

export function cloudInitiatedRollbackPolicyFailureSerializer(
  item: CloudInitiatedRollbackPolicyFailure,
): any {
  return {
    devicesFailedPercentage: item["devicesFailedPercentage"],
    devicesFailedCount: item["devicesFailedCount"],
  };
}

export function cloudInitiatedRollbackPolicyFailureDeserializer(
  item: any,
): CloudInitiatedRollbackPolicyFailure {
  return {
    devicesFailedPercentage: item["devicesFailedPercentage"],
    devicesFailedCount: item["devicesFailedCount"],
  };
}

/** The protocol the device should use when downloading the update payload. */
export type DownloadSecurity = "https" | "http";

/** Deployment status metadata. */
export interface DeploymentStatus {
  /** The group identity */
  groupId: string;
  /** The state of the deployment. */
  deploymentState: DeploymentState;
  /**
   * The error details of the Failed state.  This is not present if the deployment
   * state is not Failed.
   */
  error?: ErrorModel;
  /** The collection of device class subgroup status objects */
  subgroupStatus: DeviceClassSubgroupDeploymentStatus[];
}

export function deploymentStatusDeserializer(item: any): DeploymentStatus {
  return {
    groupId: item["groupId"],
    deploymentState: item["deploymentState"],
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
    subgroupStatus: deviceClassSubgroupDeploymentStatusArrayDeserializer(item["subgroupStatus"]),
  };
}

/** Deployment state. */
export type DeploymentState =
  | "Active"
  | "ActiveWithSubgroupFailures"
  | "Failed"
  | "Inactive"
  | "Canceled";

export function deviceClassSubgroupDeploymentStatusArrayDeserializer(
  result: Array<DeviceClassSubgroupDeploymentStatus>,
): any[] {
  return result.map((item) => {
    return deviceClassSubgroupDeploymentStatusDeserializer(item);
  });
}

/** Device class subgroup deployment status metadata. */
export interface DeviceClassSubgroupDeploymentStatus {
  /** The group identity */
  groupId: string;
  /** The device class subgroup identity */
  deviceClassId: string;
  /** The state of the subgroup deployment. */
  deploymentState: DeviceClassSubgroupDeploymentState;
  /**
   * The error details of the Failed state.  This is not present if the deployment
   * state is not Failed.
   */
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

export function deviceClassSubgroupDeploymentStatusDeserializer(
  item: any,
): DeviceClassSubgroupDeploymentStatus {
  return {
    groupId: item["groupId"],
    deviceClassId: item["deviceClassId"],
    deploymentState: item["deploymentState"],
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
    totalDevices: item["totalDevices"],
    devicesInProgressCount: item["devicesInProgressCount"],
    devicesCompletedFailedCount: item["devicesCompletedFailedCount"],
    devicesCompletedSucceededCount: item["devicesCompletedSucceededCount"],
    devicesCanceledCount: item["devicesCanceledCount"],
  };
}

/** Device class subgroup deployment state. */
export type DeviceClassSubgroupDeploymentState = "Active" | "Failed" | "Inactive" | "Canceled";

/** The list of device class subgroups within a group. */
export interface _DeviceClassSubgroupsList {
  /** The DeviceClassSubgroup items on this page */
  value: DeviceClassSubgroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deviceClassSubgroupsListDeserializer(item: any): _DeviceClassSubgroupsList {
  return {
    value: deviceClassSubgroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceClassSubgroupArrayDeserializer(result: Array<DeviceClassSubgroup>): any[] {
  return result.map((item) => {
    return deviceClassSubgroupDeserializer(item);
  });
}

/**
 * Device class subgroup details. A device class subgroup is a subset of devices
 * in a group that share the same device class id.
 */
export interface DeviceClassSubgroup {
  /**
   * Device class subgroup identity. This is generated from the model Id and the
   * compat properties reported by the device update agent in the Device Update PnP
   * interface in IoT Hub. It is a hex-encoded SHA1 hash.
   */
  deviceClassId: string;
  /** Group identity. */
  groupId: string;
  /** Date and time when the device class subgroup was created. */
  createdDateTime: string;
  /** The number of devices in the device class subgroup. */
  deviceCount?: number;
  /** The active deployment Id for the device class subgroup. */
  deploymentId?: string;
}

export function deviceClassSubgroupDeserializer(item: any): DeviceClassSubgroup {
  return {
    deviceClassId: item["deviceClassId"],
    groupId: item["groupId"],
    createdDateTime: item["createdDateTime"],
    deviceCount: item["deviceCount"],
    deploymentId: item["deploymentId"],
  };
}

/** The list of deployment device states. */
export interface _DeploymentDeviceStatesList {
  /** The DeploymentDeviceState items on this page */
  value: DeploymentDeviceState[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentDeviceStatesListDeserializer(item: any): _DeploymentDeviceStatesList {
  return {
    value: deploymentDeviceStateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentDeviceStateArrayDeserializer(
  result: Array<DeploymentDeviceState>,
): any[] {
  return result.map((item) => {
    return deploymentDeviceStateDeserializer(item);
  });
}

/** Deployment device status. */
export interface DeploymentDeviceState {
  /** Device identity. */
  deviceId: string;
  /** Device module identity. */
  moduleId?: string;
  /** The number of times this deployment has been retried on this device. */
  retryCount: number;
  /**
   * Boolean flag indicating whether this device is in a newer deployment and can no
   * longer retry this deployment.
   */
  movedOnToNewDeployment: boolean;
  /** Deployment device state. */
  deviceState: DeviceDeploymentState;
}

export function deploymentDeviceStateDeserializer(item: any): DeploymentDeviceState {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
    retryCount: item["retryCount"],
    movedOnToNewDeployment: item["movedOnToNewDeployment"],
    deviceState: item["deviceState"],
  };
}

/** The list of device operations with server paging support. */
export interface _DeviceOperationsList {
  /** The DeviceOperation items on this page */
  value: DeviceOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deviceOperationsListDeserializer(item: any): _DeviceOperationsList {
  return {
    value: deviceOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceOperationArrayDeserializer(result: Array<DeviceOperation>): any[] {
  return result.map((item) => {
    return deviceOperationDeserializer(item);
  });
}

/** Diagnostics request body */
export interface LogCollection {
  /** The log collection id. */
  logCollectionId?: string;
  /** Array of Device Update agent ids */
  deviceList: DeviceUpdateAgentId[];
  /** Description of the diagnostics operation. */
  description?: string;
  /** The timestamp when the operation was created. */
  readonly createdDateTime?: string;
  /** A timestamp for when the current state was entered. */
  readonly lastActionDateTime?: string;
  /** Operation status. */
  readonly status?: OperationStatus;
}

export function logCollectionSerializer(item: LogCollection): any {
  return {
    operationId: item["logCollectionId"],
    deviceList: deviceUpdateAgentIdArraySerializer(item["deviceList"]),
    description: item["description"],
  };
}

export function logCollectionDeserializer(item: any): LogCollection {
  return {
    logCollectionId: item["operationId"],
    deviceList: deviceUpdateAgentIdArrayDeserializer(item["deviceList"]),
    description: item["description"],
    createdDateTime: item["createdDateTime"],
    lastActionDateTime: item["lastActionDateTime"],
    status: item["status"],
  };
}

export function deviceUpdateAgentIdArraySerializer(result: Array<DeviceUpdateAgentId>): any[] {
  return result.map((item) => {
    return deviceUpdateAgentIdSerializer(item);
  });
}

export function deviceUpdateAgentIdArrayDeserializer(result: Array<DeviceUpdateAgentId>): any[] {
  return result.map((item) => {
    return deviceUpdateAgentIdDeserializer(item);
  });
}

/** Device Update agent id */
export interface DeviceUpdateAgentId {
  /** Device Id */
  deviceId: string;
  /** Module Id */
  moduleId?: string;
}

export function deviceUpdateAgentIdSerializer(item: DeviceUpdateAgentId): any {
  return { deviceId: item["deviceId"], moduleId: item["moduleId"] };
}

export function deviceUpdateAgentIdDeserializer(item: any): DeviceUpdateAgentId {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
  };
}

/** The list of log collections with server paging support. */
export interface _LogCollectionList {
  /** The LogCollection items on this page */
  value: LogCollection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logCollectionListDeserializer(item: any): _LogCollectionList {
  return {
    value: logCollectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logCollectionArraySerializer(result: Array<LogCollection>): any[] {
  return result.map((item) => {
    return logCollectionSerializer(item);
  });
}

export function logCollectionArrayDeserializer(result: Array<LogCollection>): any[] {
  return result.map((item) => {
    return logCollectionDeserializer(item);
  });
}

/** Device diagnostics operation detailed status */
export interface LogCollectionOperationDetailedStatus {
  /** The device diagnostics operation id. */
  logCollectionId?: string;
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

export function logCollectionOperationDetailedStatusDeserializer(
  item: any,
): LogCollectionOperationDetailedStatus {
  return {
    logCollectionId: item["operationId"],
    createdDateTime: item["createdDateTime"],
    lastActionDateTime: item["lastActionDateTime"],
    status: item["status"],
    deviceStatus: !item["deviceStatus"]
      ? item["deviceStatus"]
      : logCollectionOperationDeviceStatusArrayDeserializer(item["deviceStatus"]),
    description: item["description"],
  };
}

export function logCollectionOperationDeviceStatusArrayDeserializer(
  result: Array<LogCollectionOperationDeviceStatus>,
): any[] {
  return result.map((item) => {
    return logCollectionOperationDeviceStatusDeserializer(item);
  });
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

export function logCollectionOperationDeviceStatusDeserializer(
  item: any,
): LogCollectionOperationDeviceStatus {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
    status: item["status"],
    resultCode: item["resultCode"],
    extendedResultCode: item["extendedResultCode"],
    logLocation: item["logLocation"],
  };
}

/** Array of Device Health, with server paging support. */
export interface _DeviceHealthList {
  /** The DeviceHealth items on this page */
  value: DeviceHealth[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deviceHealthListDeserializer(item: any): _DeviceHealthList {
  return {
    value: deviceHealthArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceHealthArrayDeserializer(result: Array<DeviceHealth>): any[] {
  return result.map((item) => {
    return deviceHealthDeserializer(item);
  });
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

export function deviceHealthDeserializer(item: any): DeviceHealth {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
    state: item["state"],
    digitalTwinModelId: item["digitalTwinModelId"],
    healthChecks: healthCheckArrayDeserializer(item["healthChecks"]),
  };
}

/** Device health states */
export type DeviceHealthState = "healthy" | "unhealthy";

export function healthCheckArrayDeserializer(result: Array<HealthCheck>): any[] {
  return result.map((item) => {
    return healthCheckDeserializer(item);
  });
}

/** Health check */
export interface HealthCheck {
  /** Health check name */
  name?: string;
  /** Health check result */
  result?: HealthCheckResult;
}

export function healthCheckDeserializer(item: any): HealthCheck {
  return {
    name: item["name"],
    result: item["result"],
  };
}

/** Health check result */
export type HealthCheckResult = "success" | "userError";
/** The device import type. */
export type ImportType = "Devices" | "Modules" | "All";

/** The available API versions. */
export enum KnownVersions {
  /** The 2022-10-01 API version. */
  V20221001 = "2022-10-01",
  /**
   * The 2026-06-01 API version. Adds the optional `downloadSecurity` field on
   * Deployment so callers can choose the protocol the device should use when
   * downloading update payload (defaults to "https").
   */
  V20260601 = "2026-06-01",
}

export function importUpdateInputItemArraySerializer(result: Array<ImportUpdateInputItem>): any[] {
  return result.map((item) => {
    return importUpdateInputItemSerializer(item);
  });
}
