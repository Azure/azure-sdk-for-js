// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReplicationStatusTypes } from "../../models/computeGallery/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GalleryImageVersionsListByGalleryImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GalleryImageVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Specifies whether to bypass the gallery's soft-delete policy and permanently delete the gallery image version. If true, the version is not retained in the recycle bin and cannot be restored. If false or omitted, the version is soft-deleted when the gallery's soft-delete policy is enabled and permanently deleted when the policy is disabled. */
  bypassSoftDelete?: boolean;
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
