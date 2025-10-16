// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReplicationStatusTypes } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GalleryApplicationVersionsListByGalleryApplicationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GalleryApplicationVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryApplicationVersionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryApplicationVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryApplicationVersionsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: ReplicationStatusTypes;
}
