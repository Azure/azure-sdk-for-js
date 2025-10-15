// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReplicationStatusTypes } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GalleryImageVersionsListByGalleryImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GalleryImageVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryImageVersionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryImageVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryImageVersionsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: ReplicationStatusTypes;
}
