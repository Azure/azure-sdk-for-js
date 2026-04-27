// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationStatus } from "../common/models.js";
import { operationStatusDeserializer } from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Defender for Storage resource. */
export interface DefenderForStorageSetting extends ExtensionResource {
  /** Defender for Storage resource properties. */
  properties?: DefenderForStorageSettingProperties;
}

export function defenderForStorageSettingSerializer(item: DefenderForStorageSetting): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : defenderForStorageSettingPropertiesSerializer(item["properties"]),
  };
}

export function defenderForStorageSettingDeserializer(item: any): DefenderForStorageSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : defenderForStorageSettingPropertiesDeserializer(item["properties"]),
  };
}

/** Defender for Storage resource properties. */
export interface DefenderForStorageSettingProperties {
  /** Indicates whether Defender for Storage is enabled on this storage account. */
  isEnabled?: boolean;
  /** Properties of Malware Scanning. */
  malwareScanning?: MalwareScanningProperties;
  /** Properties of Sensitive Data Discovery. */
  sensitiveDataDiscovery?: SensitiveDataDiscoveryProperties;
  /** Indicates whether the settings defined for this storage account should override the settings defined for the subscription. */
  overrideSubscriptionLevelSettings?: boolean;
}

export function defenderForStorageSettingPropertiesSerializer(
  item: DefenderForStorageSettingProperties,
): any {
  return {
    isEnabled: item["isEnabled"],
    malwareScanning: !item["malwareScanning"]
      ? item["malwareScanning"]
      : malwareScanningPropertiesSerializer(item["malwareScanning"]),
    sensitiveDataDiscovery: !item["sensitiveDataDiscovery"]
      ? item["sensitiveDataDiscovery"]
      : sensitiveDataDiscoveryPropertiesSerializer(item["sensitiveDataDiscovery"]),
    overrideSubscriptionLevelSettings: item["overrideSubscriptionLevelSettings"],
  };
}

export function defenderForStorageSettingPropertiesDeserializer(
  item: any,
): DefenderForStorageSettingProperties {
  return {
    isEnabled: item["isEnabled"],
    malwareScanning: !item["malwareScanning"]
      ? item["malwareScanning"]
      : malwareScanningPropertiesDeserializer(item["malwareScanning"]),
    sensitiveDataDiscovery: !item["sensitiveDataDiscovery"]
      ? item["sensitiveDataDiscovery"]
      : sensitiveDataDiscoveryPropertiesDeserializer(item["sensitiveDataDiscovery"]),
    overrideSubscriptionLevelSettings: item["overrideSubscriptionLevelSettings"],
  };
}

/** Properties of Malware Scanning. */
export interface MalwareScanningProperties {
  /** Properties of On Upload malware scanning. */
  onUpload?: OnUploadProperties;
  /** Optional. Resource id of an Event Grid Topic to send scan results to. */
  scanResultsEventGridTopicResourceId?: string;
  /** Optional. Write scan result on BlobIndexTags by default. */
  blobScanResultsOptions?: BlobScanResultsOptions;
  /** Optional. Specifies the automated response action to take when malware is detected. */
  automatedResponse?: AutomatedResponseType;
  /** Upon failure or partial success. Additional data describing Malware Scanning enable/disable operation. */
  readonly operationStatus?: OperationStatus;
}

export function malwareScanningPropertiesSerializer(item: MalwareScanningProperties): any {
  return {
    onUpload: !item["onUpload"] ? item["onUpload"] : onUploadPropertiesSerializer(item["onUpload"]),
    scanResultsEventGridTopicResourceId: item["scanResultsEventGridTopicResourceId"],
    blobScanResultsOptions: item["blobScanResultsOptions"],
    automatedResponse: item["automatedResponse"],
  };
}

export function malwareScanningPropertiesDeserializer(item: any): MalwareScanningProperties {
  return {
    onUpload: !item["onUpload"]
      ? item["onUpload"]
      : onUploadPropertiesDeserializer(item["onUpload"]),
    scanResultsEventGridTopicResourceId: item["scanResultsEventGridTopicResourceId"],
    blobScanResultsOptions: item["blobScanResultsOptions"],
    automatedResponse: item["automatedResponse"],
    operationStatus: !item["operationStatus"]
      ? item["operationStatus"]
      : operationStatusDeserializer(item["operationStatus"]),
  };
}

/** Properties of On Upload malware scanning. */
export interface OnUploadProperties {
  /** Indicates whether On Upload malware scanning should be enabled. */
  isEnabled?: boolean;
  /** Defines the max GB to be scanned per Month. Set to -1 if no capping is needed. If not specified, the default value is -1. */
  capGBPerMonth?: number;
  /** Optional. Determine which blobs get scanned by On Upload malware scanning. An Or operation is performed between each filter type. */
  filters?: OnUploadFilters;
}

export function onUploadPropertiesSerializer(item: OnUploadProperties): any {
  return {
    isEnabled: item["isEnabled"],
    capGBPerMonth: item["capGBPerMonth"],
    filters: !item["filters"] ? item["filters"] : onUploadFiltersSerializer(item["filters"]),
  };
}

export function onUploadPropertiesDeserializer(item: any): OnUploadProperties {
  return {
    isEnabled: item["isEnabled"],
    capGBPerMonth: item["capGBPerMonth"],
    filters: !item["filters"] ? item["filters"] : onUploadFiltersDeserializer(item["filters"]),
  };
}

/** Optional. Determine which blobs get scanned by On Upload malware scanning. An Or operation is performed between each filter type. */
export interface OnUploadFilters {
  /**
   * Optional. A list of prefixes to exclude from on-upload malware scanning.
   * Format: `container-name/blob-name` (start with the container name; do not include the storage account name).
   * Exclude entire containers: Use prefix of container names you want to exclude without a trailing `/`.
   * Exclude a single container: Add a trailing slash `/` after the container name to avoid excluding other containers with similar prefixes.
   */
  excludeBlobsWithPrefix?: string[];
  /** Optional. A list of suffixes to exclude from on-upload malware scanning. Suffixes match only the end of blob names, and should be used for file extensions or blob name endings only. */
  excludeBlobsWithSuffix?: string[];
  /** Optional. Specifies the maximum size in bytes for blobs to be scanned. This parameter accepts a single positive integer value. Blobs larger than this value will be excluded from scanning. */
  excludeBlobsLargerThan?: any;
}

export function onUploadFiltersSerializer(item: OnUploadFilters): any {
  return {
    excludeBlobsWithPrefix: !item["excludeBlobsWithPrefix"]
      ? item["excludeBlobsWithPrefix"]
      : item["excludeBlobsWithPrefix"].map((p: any) => {
          return p;
        }),
    excludeBlobsWithSuffix: !item["excludeBlobsWithSuffix"]
      ? item["excludeBlobsWithSuffix"]
      : item["excludeBlobsWithSuffix"].map((p: any) => {
          return p;
        }),
    excludeBlobsLargerThan: item["excludeBlobsLargerThan"],
  };
}

export function onUploadFiltersDeserializer(item: any): OnUploadFilters {
  return {
    excludeBlobsWithPrefix: !item["excludeBlobsWithPrefix"]
      ? item["excludeBlobsWithPrefix"]
      : item["excludeBlobsWithPrefix"].map((p1: any) => {
          return p1;
        }),
    excludeBlobsWithSuffix: !item["excludeBlobsWithSuffix"]
      ? item["excludeBlobsWithSuffix"]
      : item["excludeBlobsWithSuffix"].map((p1: any) => {
          return p1;
        }),
    excludeBlobsLargerThan: item["excludeBlobsLargerThan"],
  };
}

/** Optional. Write scan result on BlobIndexTags by default. */
export enum KnownBlobScanResultsOptions {
  /** Write scan results on the blobs index tags. */
  BlobIndexTags = "BlobIndexTags",
  /** Do not write scan results on the blobs index tags. */
  None = "None",
}

/**
 * Optional. Write scan result on BlobIndexTags by default. \
 * {@link KnownBlobScanResultsOptions} can be used interchangeably with BlobScanResultsOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BlobIndexTags**: Write scan results on the blobs index tags. \
 * **None**: Do not write scan results on the blobs index tags.
 */
export type BlobScanResultsOptions = string;

/** Optional. Specifies the automated response action to take when malware is detected. */
export enum KnownAutomatedResponseType {
  /** No automated response will be taken when malware is detected. */
  None = "None",
  /** The blob will be soft deleted when malware is detected. */
  BlobSoftDelete = "BlobSoftDelete",
}

/**
 * Optional. Specifies the automated response action to take when malware is detected. \
 * {@link KnownAutomatedResponseType} can be used interchangeably with AutomatedResponseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No automated response will be taken when malware is detected. \
 * **BlobSoftDelete**: The blob will be soft deleted when malware is detected.
 */
export type AutomatedResponseType = string;

/** Properties of Sensitive Data Discovery. */
export interface SensitiveDataDiscoveryProperties {
  /** Indicates whether Sensitive Data Discovery should be enabled. */
  isEnabled?: boolean;
  /** Upon failure or partial success. Additional data describing Sensitive Data Discovery enable/disable operation. */
  readonly operationStatus?: OperationStatus;
}

export function sensitiveDataDiscoveryPropertiesSerializer(
  item: SensitiveDataDiscoveryProperties,
): any {
  return { isEnabled: item["isEnabled"] };
}

export function sensitiveDataDiscoveryPropertiesDeserializer(
  item: any,
): SensitiveDataDiscoveryProperties {
  return {
    isEnabled: item["isEnabled"],
    operationStatus: !item["operationStatus"]
      ? item["operationStatus"]
      : operationStatusDeserializer(item["operationStatus"]),
  };
}

/** List of Defender for Storage settings. */
export interface _DefenderForStorageSettingList {
  /** List of Defender for Storage settings. */
  readonly value?: DefenderForStorageSetting[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _defenderForStorageSettingListDeserializer(
  item: any,
): _DefenderForStorageSettingList {
  return {
    value: !item["value"]
      ? item["value"]
      : defenderForStorageSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function defenderForStorageSettingArraySerializer(
  result: Array<DefenderForStorageSetting>,
): any[] {
  return result.map((item) => {
    return defenderForStorageSettingSerializer(item);
  });
}

export function defenderForStorageSettingArrayDeserializer(
  result: Array<DefenderForStorageSetting>,
): any[] {
  return result.map((item) => {
    return defenderForStorageSettingDeserializer(item);
  });
}

/** Describes the state of a malware scan operation. */
export interface MalwareScan {
  properties?: MalwareScanProperties;
}

export function malwareScanDeserializer(item: any): MalwareScan {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : malwareScanPropertiesDeserializer(item["properties"]),
  };
}

/** model interface MalwareScanProperties */
export interface MalwareScanProperties {
  /** The identifier of the scan. */
  scanId?: string;
  /** A status code of the scan operation. */
  scanStatus?: string;
  /** A description of the status of the scan. */
  scanStatusMessage?: string;
  /** The time at which the scan had been initiated. */
  scanStartTime?: string;
  /** The time at which the scan has ended. Only available for a scan which has terminated. */
  scanEndTime?: string;
  /** A summary of the scan results. */
  scanSummary?: ScanSummary;
}

export function malwareScanPropertiesDeserializer(item: any): MalwareScanProperties {
  return {
    scanId: item["scanId"],
    scanStatus: item["scanStatus"],
    scanStatusMessage: item["scanStatusMessage"],
    scanStartTime: item["scanStartTime"],
    scanEndTime: item["scanEndTime"],
    scanSummary: !item["scanSummary"]
      ? item["scanSummary"]
      : scanSummaryDeserializer(item["scanSummary"]),
  };
}

/** A summary of the scan results. */
export interface ScanSummary {
  /** A summary of the scan results of the blobs that were scanned. */
  blobs?: BlobsScanSummary;
  /** A summary of the scan results of the files that were scanned. */
  files?: FilesScanSummary;
  /** The estimated cost of the scan. Only available for a scan which has terminated. */
  estimatedScanCostUSD?: number;
}

export function scanSummaryDeserializer(item: any): ScanSummary {
  return {
    blobs: !item["blobs"] ? item["blobs"] : blobsScanSummaryDeserializer(item["blobs"]),
    files: !item["files"] ? item["files"] : filesScanSummaryDeserializer(item["files"]),
    estimatedScanCostUSD: item["estimatedScanCostUSD"],
  };
}

/** A summary of the scan results of the blobs that were scanned. */
export interface BlobsScanSummary {
  /** The total number of blobs that were scanned. */
  totalBlobsScanned?: number;
  /** The number of malicious blobs that were detected during the scan. */
  maliciousBlobsCount?: number;
  /** The number of blobs that were skipped. */
  skippedBlobsCount?: number;
  /** The number of failed blob scans. */
  failedBlobsCount?: number;
  /** The number of gigabytes of data that were scanned. */
  scannedBlobsInGB?: number;
}

export function blobsScanSummaryDeserializer(item: any): BlobsScanSummary {
  return {
    totalBlobsScanned: item["totalBlobsScanned"],
    maliciousBlobsCount: item["maliciousBlobsCount"],
    skippedBlobsCount: item["skippedBlobsCount"],
    failedBlobsCount: item["failedBlobsCount"],
    scannedBlobsInGB: item["scannedBlobsInGB"],
  };
}

/** A summary of the scan results of the files that were scanned. */
export interface FilesScanSummary {
  /** The total number of files that were scanned. */
  totalFilesScanned?: number;
  /** The number of malicious files that were detected during the scan. */
  maliciousFilesCount?: number;
  /** The number of files that were skipped. */
  skippedFilesCount?: number;
  /** The number of failed file scans. */
  failedFilesCount?: number;
  /** The number of gigabytes of data that were scanned. */
  scannedFilesInGB?: number;
}

export function filesScanSummaryDeserializer(item: any): FilesScanSummary {
  return {
    totalFilesScanned: item["totalFilesScanned"],
    maliciousFilesCount: item["maliciousFilesCount"],
    skippedFilesCount: item["skippedFilesCount"],
    failedFilesCount: item["failedFilesCount"],
    scannedFilesInGB: item["scannedFilesInGB"],
  };
}
