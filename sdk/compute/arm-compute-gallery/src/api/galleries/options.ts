// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SelectPermissions, GalleryExpandParams } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GalleriesGallerySharingProfileUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleriesListByArtifactNameOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GalleriesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GalleriesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GalleriesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleriesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleriesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GalleriesGetOptionalParams extends OperationOptions {
  /** The select expression to apply on the operation. */
  select?: SelectPermissions;
  /** The expand query option to apply on the operation. */
  expand?: GalleryExpandParams;
}
