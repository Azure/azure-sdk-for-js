// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StartMalwareScanRequest } from "../../models/defenderForStorageAPI/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DefenderForStorageGetMalwareScanOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefenderForStorageStartMalwareScanOptionalParams extends OperationOptions {
  /** Optional request body to filter which blobs and files to scan. */
  body?: StartMalwareScanRequest;
}

/** Optional parameters. */
export interface DefenderForStorageCancelMalwareScanOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefenderForStorageListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefenderForStorageCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefenderForStorageGetOptionalParams extends OperationOptions {}
