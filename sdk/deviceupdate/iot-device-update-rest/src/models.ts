// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ImportUpdateInputItem {
  /** Import manifest metadata like source URL, file size/hashes, etc. */
  importManifest: ImportManifestMetadata;
  /** Friendly update name. */
  friendlyName?: string;
  /** One or more update file properties like filename and source URL. */
  files?: Array<FileImportMetadata>;
}

export interface ImportManifestMetadata {
  /** Azure Blob location from which the import manifest can be downloaded by Device Update for IoT Hub. This is typically a read-only SAS-protected blob URL with an expiration set to at least 4 hours. */
  url: string;
  /** File size in number of bytes. */
  sizeInBytes: number;
  /** A JSON object containing the hash(es) of the file. At least SHA256 hash is required. This object can be thought of as a set of key-value pairs where the key is the hash algorithm, and the value is the hash of the file calculated using that algorithm. */
  hashes: Record<string, string>;
}

export interface FileImportMetadata {
  /** Update file name as specified inside import manifest. */
  filename: string;
  /** Azure Blob location from which the update file can be downloaded by Device Update for IoT Hub. This is typically a read-only SAS-protected blob URL with an expiration set to at least 4 hours. */
  url: string;
}

export interface UpdateId {
  /** Update provider. */
  provider: string;
  /** Update name. */
  name: string;
  /** Update version. */
  version: string;
}

export interface Group {
  /** Group identity. */
  groupId: string;
  /** Group type. */
  groupType:
    | "DeviceClassIdAndIoTHubTag"
    | "InvalidDeviceClassIdAndIoTHubTag"
    | "DefaultDeviceClassId";
  /** IoT Hub tags. */
  tags: Array<string>;
  /** Date and time when the update was created. */
  createdDateTime: string;
  /** The number of devices in the group. */
  deviceCount?: number;
  /** The deployment Id for the group. */
  deploymentId?: string;
  /** The device class Id for the group. */
  deviceClassId?: string;
}

export interface Deployment {
  /** The deployment identifier. */
  deploymentId: string;
  /** The deployment start datetime. */
  startDateTime: string;
  /** Update identity. */
  updateId: UpdateId;
  /** The group identity */
  groupId: string;
  /** Boolean flag indicating whether the deployment was canceled. */
  isCanceled?: boolean;
  /** Boolean flag indicating whether the deployment has been retried. */
  isRetried?: boolean;
}

export interface LogCollectionOperation {
  /** The diagnostics operation id. */
  operationId?: string;
  /** Array of Device Update agent ids */
  deviceList: Array<DeviceUpdateAgentId>;
  /** Description of the diagnostics operation. */
  description?: string;
  /** The timestamp when the operation was created. */
  createdDateTime?: string;
  /** A timestamp for when the current state was entered. */
  lastActionDateTime?: string;
  /** Operation status. */
  status?: "Undefined" | "NotStarted" | "Running" | "Succeeded" | "Failed";
}

export interface DeviceUpdateAgentId {
  /** Device Id */
  deviceId: string;
  /** Module Id */
  moduleId?: string;
}
