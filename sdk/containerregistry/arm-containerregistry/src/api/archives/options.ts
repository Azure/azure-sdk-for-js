// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ArchivesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArchivesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArchivesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArchivesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArchivesGetOptionalParams extends OperationOptions {}
