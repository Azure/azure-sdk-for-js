// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AmlFilesystemArchiveInfo } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AmlFilesystemsCancelArchiveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AmlFilesystemsArchiveOptionalParams extends OperationOptions {
  /** Information about the archive operation */
  archiveInfo?: AmlFilesystemArchiveInfo;
}

/** Optional parameters. */
export interface AmlFilesystemsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AmlFilesystemsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AmlFilesystemsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AmlFilesystemsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AmlFilesystemsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AmlFilesystemsGetOptionalParams extends OperationOptions {}
