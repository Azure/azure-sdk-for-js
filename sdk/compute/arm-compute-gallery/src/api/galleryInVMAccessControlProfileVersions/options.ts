// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GalleryInVMAccessControlProfileVersionsDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryInVMAccessControlProfileVersionsUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleryInVMAccessControlProfileVersionsGetOptionalParams
  extends OperationOptions {}
