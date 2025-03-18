// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { AgentsUploadFileOptionalParams } from "../index.js";

/**
 * Options for configuring polling behavior.
 */
export interface PollingOptions {
  /**
   * The interval, in milliseconds, to wait between polling attempts. If not specified, a default interval of 1000ms will be used.
   */
  sleepIntervalInMs?: number;

  /**
   * An AbortSignalLike object (as defined by \@azure/abort-controller) that can be used to cancel the polling operation.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Optional parameters configuring polling behavior.
 */
export interface PollingOptionsParams {
  /** Options for configuring polling behavior. */
  pollingOptions?: PollingOptions;
}

export interface AgentUploadFileWithPollingOptionalParams
  extends AgentsUploadFileOptionalParams,
  PollingOptionsParams { }
