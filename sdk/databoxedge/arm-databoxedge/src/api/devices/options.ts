// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DevicesGetUpdateSummaryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesUploadCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesUpdateExtendedInformationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesCreateOrUpdateSecuritySettingsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevicesScanForUpdatesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevicesInstallUpdatesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevicesGetExtendedInformationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesGenerateCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesDownloadUpdatesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevicesListBySubscriptionOptionalParams extends OperationOptions {
  /** Specify $expand=details to populate additional fields related to the resource or Specify $skipToken=<token> to populate the next page in the list. */
  expand?: string;
}

/** Optional parameters. */
export interface DevicesListByResourceGroupOptionalParams extends OperationOptions {
  /** Specify $expand=details to populate additional fields related to the resource or Specify $skipToken=<token> to populate the next page in the list. */
  expand?: string;
}

/** Optional parameters. */
export interface DevicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevicesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevicesGetNetworkSettingsOptionalParams extends OperationOptions {}
