// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { JobExecutionTemplate } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobsGetDetectorOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsListDetectorsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsProxyGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsStopExecutionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsSuspendOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsResumeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsStopMultipleExecutionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Properties used to start a job execution. */
  template?: JobExecutionTemplate;
}

/** Optional parameters. */
export interface JobsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsGetOptionalParams extends OperationOptions {}
