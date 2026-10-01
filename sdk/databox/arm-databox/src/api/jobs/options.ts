// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobsMarkDevicesShippedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsListCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsBookShipmentPickUpOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsListOptionalParams extends OperationOptions {
  /** $skipToken is supported on Get list of jobs, which provides the next page in the list of jobs. */
  skipToken?: string;
}

/** Optional parameters. */
export interface JobsListByResourceGroupOptionalParams extends OperationOptions {
  /** $skipToken is supported on Get list of jobs, which provides the next page in the list of jobs. */
  skipToken?: string;
}

/** Optional parameters. */
export interface JobsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Defines the If-Match condition. The patch will be performed only if the ETag of the job on the server matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface JobsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsGetOptionalParams extends OperationOptions {
  /** $expand is supported on details parameter for job, which provides details on the job stages. */
  expand?: string;
}
