// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Update identifier. */
export interface UpdateId {
  /** Update provider. */
  provider: string;
  /** Update name. */
  name: string;
  /** Update version. */
  version: string;
}

/** Import update input item metadata. */
export interface ImportUpdateInputItem {
  /** Import manifest metadata like source URL, file size/hashes, etc. */
  importManifest: ImportManifestMetadata;
  /** Friendly update name. */
  friendlyName?: string;
  /** One or more update file properties like filename and source URL. */
  files?: Array<FileImportMetadata>;
}

/** Metadata describing the import manifest, a document which describes the files and other metadata about an update version. */
export interface ImportManifestMetadata {
  /** Azure Blob location from which the import manifest can be downloaded by Device Update for IoT Hub. This is typically a read-only SAS-protected blob URL with an expiration set to at least 4 hours. */
  url: string;
  /** File size in number of bytes. */
  sizeInBytes: number;
  /** A JSON object containing the hash(es) of the file. At least SHA256 hash is required. This object can be thought of as a set of key-value pairs where the key is the hash algorithm, and the value is the hash of the file calculated using that algorithm. */
  hashes: Record<string, string>;
}

/** Metadata describing an update file. */
export interface FileImportMetadata {
  /** Update file name as specified inside import manifest. */
  filename: string;
  /** Azure Blob location from which the update file can be downloaded by Device Update for IoT Hub. This is typically a read-only SAS-protected blob URL with an expiration set to at least 4 hours. */
  url: string;
}

/** Update information. */
export interface UpdateInfo {
  /** Update identifier. */
  updateId: UpdateId;
}

/** Device Class JSON Merge Patch request body */
export interface PatchBody {
  /** The device class friendly name. Friendly name can be 1-100 characters, alphanumeric, dot, and dash. */
  friendlyName: string;
}

/** Deployment metadata. */
export interface Deployment {
  /** The caller-provided deployment identifier. This cannot be longer than 73 characters, must be all lower-case, and cannot contain '&', '^', '[', ']', '{', '}', '|', '<', '>', forward slash, backslash, or double quote. The Updates view in the Azure Portal IoT Hub resource generates a GUID for deploymentId when you create a deployment. */
  deploymentId: string;
  /** The deployment start datetime. */
  startDateTime: Date | string;
  /** Update information for the update in the deployment. */
  update: UpdateInfo;
  /** The group identity for the devices the deployment is intended to update. */
  groupId: string;
  /** The device class subgroups the deployment is compatible with and subgroup deployments have been created for. This is not provided by the caller during CreateOrUpdateDeployment but is automatically determined by Device Update */
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

/** Diagnostics request body */
export interface LogCollection {
  /** The log collection id. */
  operationId?: string;
  /** Array of Device Update agent ids */
  deviceList: Array<DeviceUpdateAgentId>;
  /** Description of the diagnostics operation. */
  description?: string;
}

/** Device Update agent id */
export interface DeviceUpdateAgentId {
  /** Device Id */
  deviceId: string;
  /** Module Id */
  moduleId?: string;
}
