// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MarketplaceGalleryImagesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MarketplaceGalleryImagesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MarketplaceGalleryImagesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MarketplaceGalleryImagesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MarketplaceGalleryImagesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MarketplaceGalleryImagesGetOptionalParams extends OperationOptions {}
