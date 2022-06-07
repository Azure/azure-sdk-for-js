// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface UpdateId {
  /** Update provider. */
  provider: string;
  /** Update name. */
  name: string;
  /** Update version. */
  version: string;
}

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

export interface UpdateInfo {
  /** Update identifier. */
  updateId: UpdateId;
  /** Update description. */
  description?: string;
  /** Friendly update name. */
  friendlyName?: string;
}

export interface PatchBody {
  /** The device class friendly name. */
  friendlyName: string;
}

export interface Deployment {
  /** The deployment identifier. */
  deploymentId: string;
  /** The deployment start datetime. */
  startDateTime: Date | string;
  /** Update information. */
  update: UpdateInfo;
  /** The group identity */
  groupId: string;
  /** The device class subgroups for the deployment. */
  deviceClassSubgroups?: Array<string>;
  /** Boolean flag indicating whether the deployment was canceled. */
  isCanceled?: boolean;
  /** Boolean flag indicating whether the deployment has been retried. */
  isRetried?: boolean;
  /** The rollback policy for the deployment. */
  rollbackPolicy?: CloudInitiatedRollbackPolicy;
  /** Boolean flag indicating whether the deployment is a rollback deployment. */
  isCloudInitiatedRollback?: boolean;
}

export interface CloudInitiatedRollbackPolicy {
  /** Update to rollback to. */
  update: UpdateInfo;
  /** Failure conditions to initiate rollback policy. */
  failure: CloudInitiatedRollbackPolicyFailure;
}

export interface CloudInitiatedRollbackPolicyFailure {
  /** Percentage of devices that failed. */
  devicesFailedPercentage: number;
  /** Number of devices that failed. */
  devicesFailedCount: number;
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
  status?: "NotStarted" | "Running" | "Succeeded" | "Failed";
}

export interface DeviceUpdateAgentId {
  /** Device Id */
  deviceId: string;
  /** Module Id */
  moduleId?: string;
}
