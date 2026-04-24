// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonOperationStatus } from "../common/models.js";
import { commonOperationStatusDeserializer } from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Defender for Storage resource. */
export interface DefenderForStorageAPIDefenderForStorageSetting extends ExtensionResource {
  /** Defender for Storage resource properties. */
  properties?: DefenderForStorageAPIDefenderForStorageSettingProperties;
}

export function defenderForStorageAPIDefenderForStorageSettingSerializer(
  item: DefenderForStorageAPIDefenderForStorageSetting,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : defenderForStorageAPIDefenderForStorageSettingPropertiesSerializer(item["properties"]),
  };
}

export function defenderForStorageAPIDefenderForStorageSettingDeserializer(
  item: any,
): DefenderForStorageAPIDefenderForStorageSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : defenderForStorageAPIDefenderForStorageSettingPropertiesDeserializer(item["properties"]),
  };
}

/** Defender for Storage resource properties. */
export interface DefenderForStorageAPIDefenderForStorageSettingProperties {
  /** Indicates whether Defender for Storage is enabled on this storage account. */
  isEnabled?: boolean;
  /** Properties of Malware Scanning. */
  malwareScanning?: DefenderForStorageAPIMalwareScanningProperties;
  /** Properties of Sensitive Data Discovery. */
  sensitiveDataDiscovery?: DefenderForStorageAPISensitiveDataDiscoveryProperties;
  /** Indicates whether the settings defined for this storage account should override the settings defined for the subscription. */
  overrideSubscriptionLevelSettings?: boolean;
}

export function defenderForStorageAPIDefenderForStorageSettingPropertiesSerializer(
  item: DefenderForStorageAPIDefenderForStorageSettingProperties,
): any {
  return {
    isEnabled: item["isEnabled"],
    malwareScanning: !item["malwareScanning"]
      ? item["malwareScanning"]
      : defenderForStorageAPIMalwareScanningPropertiesSerializer(item["malwareScanning"]),
    sensitiveDataDiscovery: !item["sensitiveDataDiscovery"]
      ? item["sensitiveDataDiscovery"]
      : defenderForStorageAPISensitiveDataDiscoveryPropertiesSerializer(
          item["sensitiveDataDiscovery"],
        ),
    overrideSubscriptionLevelSettings: item["overrideSubscriptionLevelSettings"],
  };
}

export function defenderForStorageAPIDefenderForStorageSettingPropertiesDeserializer(
  item: any,
): DefenderForStorageAPIDefenderForStorageSettingProperties {
  return {
    isEnabled: item["isEnabled"],
    malwareScanning: !item["malwareScanning"]
      ? item["malwareScanning"]
      : defenderForStorageAPIMalwareScanningPropertiesDeserializer(item["malwareScanning"]),
    sensitiveDataDiscovery: !item["sensitiveDataDiscovery"]
      ? item["sensitiveDataDiscovery"]
      : defenderForStorageAPISensitiveDataDiscoveryPropertiesDeserializer(
          item["sensitiveDataDiscovery"],
        ),
    overrideSubscriptionLevelSettings: item["overrideSubscriptionLevelSettings"],
  };
}

/** Properties of Malware Scanning. */
export interface DefenderForStorageAPIMalwareScanningProperties {
  /** Properties of On Upload malware scanning. */
  onUpload?: DefenderForStorageAPIOnUploadProperties;
  /** Optional. Resource id of an Event Grid Topic to send scan results to. */
  scanResultsEventGridTopicResourceId?: string;
  /** Optional. Write scan result on BlobIndexTags by default. */
  blobScanResultsOptions?: DefenderForStorageAPIBlobScanResultsOptions;
  /** Optional. Specifies the automated response action to take when malware is detected. */
  automatedResponse?: DefenderForStorageAPIAutomatedResponseType;
  /** Upon failure or partial success. Additional data describing Malware Scanning enable/disable operation. */
  readonly operationStatus?: CommonOperationStatus;
}

export function defenderForStorageAPIMalwareScanningPropertiesSerializer(
  item: DefenderForStorageAPIMalwareScanningProperties,
): any {
  return {
    onUpload: !item["onUpload"]
      ? item["onUpload"]
      : defenderForStorageAPIOnUploadPropertiesSerializer(item["onUpload"]),
    scanResultsEventGridTopicResourceId: item["scanResultsEventGridTopicResourceId"],
    blobScanResultsOptions: item["blobScanResultsOptions"],
    automatedResponse: item["automatedResponse"],
  };
}

export function defenderForStorageAPIMalwareScanningPropertiesDeserializer(
  item: any,
): DefenderForStorageAPIMalwareScanningProperties {
  return {
    onUpload: !item["onUpload"]
      ? item["onUpload"]
      : defenderForStorageAPIOnUploadPropertiesDeserializer(item["onUpload"]),
    scanResultsEventGridTopicResourceId: item["scanResultsEventGridTopicResourceId"],
    blobScanResultsOptions: item["blobScanResultsOptions"],
    automatedResponse: item["automatedResponse"],
    operationStatus: !item["operationStatus"]
      ? item["operationStatus"]
      : commonOperationStatusDeserializer(item["operationStatus"]),
  };
}

/** Properties of On Upload malware scanning. */
export interface DefenderForStorageAPIOnUploadProperties {
  /** Indicates whether On Upload malware scanning should be enabled. */
  isEnabled?: boolean;
  /** Defines the max GB to be scanned per Month. Set to -1 if no capping is needed. If not specified, the default value is -1. */
  capGBPerMonth?: number;
  /** Optional. Determine which blobs get scanned by On Upload malware scanning. An Or operation is performed between each filter type. */
  filters?: DefenderForStorageAPIOnUploadFilters;
}

export function defenderForStorageAPIOnUploadPropertiesSerializer(
  item: DefenderForStorageAPIOnUploadProperties,
): any {
  return {
    isEnabled: item["isEnabled"],
    capGBPerMonth: item["capGBPerMonth"],
    filters: !item["filters"]
      ? item["filters"]
      : defenderForStorageAPIOnUploadFiltersSerializer(item["filters"]),
  };
}

export function defenderForStorageAPIOnUploadPropertiesDeserializer(
  item: any,
): DefenderForStorageAPIOnUploadProperties {
  return {
    isEnabled: item["isEnabled"],
    capGBPerMonth: item["capGBPerMonth"],
    filters: !item["filters"]
      ? item["filters"]
      : defenderForStorageAPIOnUploadFiltersDeserializer(item["filters"]),
  };
}

/** Optional. Determine which blobs get scanned by On Upload malware scanning. An Or operation is performed between each filter type. */
export interface DefenderForStorageAPIOnUploadFilters {
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

export function defenderForStorageAPIOnUploadFiltersSerializer(
  item: DefenderForStorageAPIOnUploadFilters,
): any {
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

export function defenderForStorageAPIOnUploadFiltersDeserializer(
  item: any,
): DefenderForStorageAPIOnUploadFilters {
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
export enum KnownDefenderForStorageAPIBlobScanResultsOptions {
  /** Write scan results on the blobs index tags. */
  BlobIndexTags = "BlobIndexTags",
  /** Do not write scan results on the blobs index tags. */
  None = "None",
}

/**
 * Optional. Write scan result on BlobIndexTags by default. \
 * {@link KnownDefenderForStorageAPIBlobScanResultsOptions} can be used interchangeably with DefenderForStorageAPIBlobScanResultsOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BlobIndexTags**: Write scan results on the blobs index tags. \
 * **None**: Do not write scan results on the blobs index tags.
 */
export type DefenderForStorageAPIBlobScanResultsOptions = string;

/** Optional. Specifies the automated response action to take when malware is detected. */
export enum KnownDefenderForStorageAPIAutomatedResponseType {
  /** No automated response will be taken when malware is detected. */
  None = "None",
  /** The blob will be soft deleted when malware is detected. */
  BlobSoftDelete = "BlobSoftDelete",
}

/**
 * Optional. Specifies the automated response action to take when malware is detected. \
 * {@link KnownDefenderForStorageAPIAutomatedResponseType} can be used interchangeably with DefenderForStorageAPIAutomatedResponseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No automated response will be taken when malware is detected. \
 * **BlobSoftDelete**: The blob will be soft deleted when malware is detected.
 */
export type DefenderForStorageAPIAutomatedResponseType = string;

/** Properties of Sensitive Data Discovery. */
export interface DefenderForStorageAPISensitiveDataDiscoveryProperties {
  /** Indicates whether Sensitive Data Discovery should be enabled. */
  isEnabled?: boolean;
  /** Upon failure or partial success. Additional data describing Sensitive Data Discovery enable/disable operation. */
  readonly operationStatus?: CommonOperationStatus;
}

export function defenderForStorageAPISensitiveDataDiscoveryPropertiesSerializer(
  item: DefenderForStorageAPISensitiveDataDiscoveryProperties,
): any {
  return { isEnabled: item["isEnabled"] };
}

export function defenderForStorageAPISensitiveDataDiscoveryPropertiesDeserializer(
  item: any,
): DefenderForStorageAPISensitiveDataDiscoveryProperties {
  return {
    isEnabled: item["isEnabled"],
    operationStatus: !item["operationStatus"]
      ? item["operationStatus"]
      : commonOperationStatusDeserializer(item["operationStatus"]),
  };
}

/** List of Defender for Storage settings. */
export interface _DefenderForStorageAPIDefenderForStorageSettingList {
  /** List of Defender for Storage settings. */
  readonly value?: DefenderForStorageAPIDefenderForStorageSetting[];
  /** The URI to fetch the next page. */
  nextLink?: string;
}

export function _defenderForStorageAPIDefenderForStorageSettingListDeserializer(
  item: any,
): _DefenderForStorageAPIDefenderForStorageSettingList {
  return {
    value: !item["value"]
      ? item["value"]
      : defenderForStorageAPIDefenderForStorageSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function defenderForStorageAPIDefenderForStorageSettingArraySerializer(
  result: Array<DefenderForStorageAPIDefenderForStorageSetting>,
): any[] {
  return result.map((item) => {
    return defenderForStorageAPIDefenderForStorageSettingSerializer(item);
  });
}

export function defenderForStorageAPIDefenderForStorageSettingArrayDeserializer(
  result: Array<DefenderForStorageAPIDefenderForStorageSetting>,
): any[] {
  return result.map((item) => {
    return defenderForStorageAPIDefenderForStorageSettingDeserializer(item);
  });
}

/** Describes the state of a malware scan operation. */
export interface DefenderForStorageAPIMalwareScan {
  properties?: DefenderForStorageAPIMalwareScanProperties;
}

export function defenderForStorageAPIMalwareScanDeserializer(
  item: any,
): DefenderForStorageAPIMalwareScan {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : defenderForStorageAPIMalwareScanPropertiesDeserializer(item["properties"]),
  };
}

/** model interface DefenderForStorageAPIMalwareScanProperties */
export interface DefenderForStorageAPIMalwareScanProperties {
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
  scanSummary?: DefenderForStorageAPIScanSummary;
}

export function defenderForStorageAPIMalwareScanPropertiesDeserializer(
  item: any,
): DefenderForStorageAPIMalwareScanProperties {
  return {
    scanId: item["scanId"],
    scanStatus: item["scanStatus"],
    scanStatusMessage: item["scanStatusMessage"],
    scanStartTime: item["scanStartTime"],
    scanEndTime: item["scanEndTime"],
    scanSummary: !item["scanSummary"]
      ? item["scanSummary"]
      : defenderForStorageAPIScanSummaryDeserializer(item["scanSummary"]),
  };
}

/** A summary of the scan results. */
export interface DefenderForStorageAPIScanSummary {
  /** A summary of the scan results of the blobs that were scanned. */
  blobs?: DefenderForStorageAPIBlobsScanSummary;
  /** A summary of the scan results of the files that were scanned. */
  files?: DefenderForStorageAPIFilesScanSummary;
  /** The estimated cost of the scan. Only available for a scan which has terminated. */
  estimatedScanCostUSD?: number;
}

export function defenderForStorageAPIScanSummaryDeserializer(
  item: any,
): DefenderForStorageAPIScanSummary {
  return {
    blobs: !item["blobs"]
      ? item["blobs"]
      : defenderForStorageAPIBlobsScanSummaryDeserializer(item["blobs"]),
    files: !item["files"]
      ? item["files"]
      : defenderForStorageAPIFilesScanSummaryDeserializer(item["files"]),
    estimatedScanCostUSD: item["estimatedScanCostUSD"],
  };
}

/** A summary of the scan results of the blobs that were scanned. */
export interface DefenderForStorageAPIBlobsScanSummary {
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

export function defenderForStorageAPIBlobsScanSummaryDeserializer(
  item: any,
): DefenderForStorageAPIBlobsScanSummary {
  return {
    totalBlobsScanned: item["totalBlobsScanned"],
    maliciousBlobsCount: item["maliciousBlobsCount"],
    skippedBlobsCount: item["skippedBlobsCount"],
    failedBlobsCount: item["failedBlobsCount"],
    scannedBlobsInGB: item["scannedBlobsInGB"],
  };
}

/** A summary of the scan results of the files that were scanned. */
export interface DefenderForStorageAPIFilesScanSummary {
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

export function defenderForStorageAPIFilesScanSummaryDeserializer(
  item: any,
): DefenderForStorageAPIFilesScanSummary {
  return {
    totalFilesScanned: item["totalFilesScanned"],
    maliciousFilesCount: item["maliciousFilesCount"],
    skippedFilesCount: item["skippedFilesCount"],
    failedFilesCount: item["failedFilesCount"],
    scannedFilesInGB: item["scannedFilesInGB"],
  };
}
