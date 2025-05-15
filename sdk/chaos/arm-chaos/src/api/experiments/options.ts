// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExperimentsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExperimentsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExperimentsListAllOptionalParams extends OperationOptions {
  /** Optional value that indicates whether to filter results based on if the Experiment is currently running. If null, then the results will not be filtered. */
  running?: boolean;
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface ExperimentsListOptionalParams extends OperationOptions {
  /** Optional value that indicates whether to filter results based on if the Experiment is currently running. If null, then the results will not be filtered. */
  running?: boolean;
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface ExperimentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExperimentsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExperimentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExperimentsGetOptionalParams extends OperationOptions {}
