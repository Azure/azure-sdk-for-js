// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobResumeOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobStopOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobSuspendOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobGetRunbookContentOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobGetOutputOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobCreateOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobGetOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobListByAutomationAccountOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  /** Identifies this specific client request. */
  clientRequestId?: string;
}
