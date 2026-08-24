// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DrillRunFailoverRequest,
  DrillRunReprotectRequest,
  ListReportDownloadUrlRequest,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DrillRunsListReportDownloadUrlOptionalParams extends OperationOptions {
  /** The content of the action request */
  body?: ListReportDownloadUrlRequest;
}

/** Optional parameters. */
export interface DrillRunsGenerateReportOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DrillRunsMarkAsCompleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DrillRunsResumeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DrillRunsAddNotesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DrillRunsReprotectOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The content of the action request */
  body?: DrillRunReprotectRequest;
}

/** Optional parameters. */
export interface DrillRunsFailOverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The content of the action request */
  body?: DrillRunFailoverRequest;
}

/** Optional parameters. */
export interface DrillRunsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DrillRunsGetOptionalParams extends OperationOptions {}
