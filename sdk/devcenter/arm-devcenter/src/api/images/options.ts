// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ImagesListByProjectOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ImagesGetByProjectOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ImagesListByDevCenterOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface ImagesListByGalleryOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface ImagesGetOptionalParams extends OperationOptions {}
