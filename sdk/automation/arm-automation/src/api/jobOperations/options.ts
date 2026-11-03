// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobOperationsResumeOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobOperationsStopOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobOperationsSuspendOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobOperationsGetRunbookContentOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobOperationsGetOutputOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobOperationsCreateOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobOperationsGetOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobOperationsListByAutomationAccountOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  /** Identifies this specific client request. */
  clientRequestId?: string;
}
