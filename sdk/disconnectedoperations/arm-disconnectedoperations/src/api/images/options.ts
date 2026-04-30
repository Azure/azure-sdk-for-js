// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ImagesListDownloadUriOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ImagesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ImagesListByDisconnectedOperationOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
}
