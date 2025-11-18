// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchedulesListRunsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchedulesGetRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchedulesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchedulesListOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SchedulesGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SchedulesDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
