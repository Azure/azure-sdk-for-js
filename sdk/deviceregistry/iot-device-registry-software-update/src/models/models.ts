// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import { ErrorModel } from "@azure-rest/core-client";

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

/**
 * A device class groups devices that share compatibility properties and agent
 * profile, allowing the service to determine the best compatible update for them.
 */
export interface DeviceClass {
  /**
   * Identifier derived from deviceClassProperties encoded as a 16-character
   * lowercase hexadecimal string.
   */
  readonly deviceClassId: string;
  /** The properties that identify this device class. */
  readonly deviceClassProperties: DeviceClassProperties;
  /** The best compatible update for the devices in this class, if any. */
  readonly bestCompatibleUpdate?: BestCompatibleUpdate;
}

export function deviceClassDeserializer(item: any): DeviceClass {
  return {
    deviceClassId: item["deviceClassId"],
    deviceClassProperties: deviceClassPropertiesDeserializer(item["deviceClassProperties"]),
    bestCompatibleUpdate: !item["bestCompatibleUpdate"]
      ? item["bestCompatibleUpdate"]
      : bestCompatibleUpdateDeserializer(item["bestCompatibleUpdate"]),
  };
}

/** Properties that identify a device class. */
export interface DeviceClassProperties {
  /**
   * Free-form compatibility properties (e.g. manufacturer, model) used to match
   * devices. This object can be thought of as a set of key-value pairs where the key
   * is the name of the compatibility property and the value is the value of the
   * compatibility property. There will always be at least 1 compat property. At most
   * 5 entries are allowed.
   */
  compatProperties: Record<string, string>;
  /** The agent profile that devices in this class implement. */
  agentProfile: number;
}

export function deviceClassPropertiesDeserializer(item: any): DeviceClassProperties {
  return {
    compatProperties: Object.fromEntries(
      Object.entries(item["compatProperties"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    agentProfile: item["agentProfile"],
  };
}

/** The best compatible update for a device class. */
export interface BestCompatibleUpdate {
  /** The identifier of the best-available compatible update. */
  updateId: UpdateId;
}

export function bestCompatibleUpdateDeserializer(item: any): BestCompatibleUpdate {
  return {
    updateId: updateIdDeserializer(item["updateId"]),
  };
}

/** Update identifier. */
export interface UpdateId {
  /** Update provider. Must be between 1 and 64 characters and contain only letters, digits, periods, and hyphens. */
  provider: string;
  /** Update name. Must be between 1 and 64 characters and contain only letters, digits, periods, and hyphens. */
  name: string;
  /** Update version as a two- to four-part dot-separated numeric string. */
  version: string;
}

export function updateIdDeserializer(item: any): UpdateId {
  return {
    provider: item["provider"],
    name: item["name"],
    version: item["version"],
  };
}

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
  fileNames?: string[];
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
    fileNames: !item["fileNames"]
      ? item["fileNames"]
      : item["fileNames"].map((p: any) => {
          return p;
        }),
    updateId: !item["updateId"] ? item["updateId"] : updateIdDeserializer(item["updateId"]),
  };
}

/** Step type. */
export type StepType = "inline" | "reference";

export function updateIdArrayDeserializer(result: Array<UpdateId>): any[] {
  return result.map((item) => {
    return updateIdDeserializer(item);
  });
}

/** Import update input metadata. */
export interface ImportUpdateRequest {
  /** Import update input metadata. */
  importUpdateInput: ImportUpdateInputItem[];
  /** Whether to enable anti-malware scan of the imported update payload files. */
  enableScan?: boolean;
}

export function importUpdateRequestSerializer(item: ImportUpdateRequest): any {
  return {
    importUpdateInput: importUpdateInputItemArraySerializer(item["importUpdateInput"]),
    enableScan: item["enableScan"],
  };
}

export function importUpdateInputItemArraySerializer(result: Array<ImportUpdateInputItem>): any[] {
  return result.map((item) => {
    return importUpdateInputItemSerializer(item);
  });
}

/** Import update input item metadata. */
export interface ImportUpdateInputItem {
  /** Import manifest metadata like source URL, file size/hashes, etc. */
  importManifest: ImportManifestMetadata;
  /** Friendly update name. */
  friendlyName?: string;
  /** One or more update file properties like file name and source URL. */
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
   * Update for Device Registry. This is typically a read-only SAS-protected blob URL
   * with an expiration set to at least 4 hours.
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
  fileName: string;
  /**
   * Azure Blob location from which the update file can be downloaded by Device
   * Update for Device Registry. This is typically a read-only SAS-protected blob URL
   * with an expiration set to at least 4 hours.
   */
  url: string;
}

export function fileImportMetadataSerializer(item: FileImportMetadata): any {
  return { fileName: item["fileName"], url: item["url"] };
}

/** Operation metadata. */
export interface UpdateOperation {
  /** Operation Id. */
  operationId: string;
  /** Operation status. */
  status: OperationState;
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
    error: !item["error"] ? item["error"] : item["error"],
    traceId: item["traceId"],
    lastActionDateTime: new Date(item["lastActionDateTime"]),
    createdDateTime: new Date(item["createdDateTime"]),
    etag: item["etag"],
  };
}

/** Enum describing allowed operation states. */
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

/** Update information. */
export interface UpdateInfo {
  /** Update identifier. */
  updateId: UpdateId;
  /** Update description. */
  readonly description?: string;
  /** Friendly update name. */
  readonly friendlyName?: string;
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

/** The available API versions. */
export enum KnownVersions {
  /**
   * The 2026-11-02-preview API version. First public preview of the Device
   * Software Update for Device Registry data-plane service. Exposes update (content)
   * management operations and device class operations.
   */
  V20261102Preview = "2026-11-02-preview",
}
