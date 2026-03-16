// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ChangeDataCaptureStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChangeDataCaptureStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChangeDataCaptureStartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChangeDataCaptureListByFactoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChangeDataCaptureDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChangeDataCaptureCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the change data capture entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ChangeDataCaptureGetOptionalParams extends OperationOptions {
  /** ETag of the change data capture entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}
