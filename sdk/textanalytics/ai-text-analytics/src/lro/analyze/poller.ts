// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { PollerLike } from "@azure/core-lro";
import { PagedAnalyzeBatchActionsResult } from "../../analyzeBatchActionsResult";
import { JobManifestTasks as GeneratedActions } from "../../generated/models";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import {
  BeginAnalyzeBatchActionsPollerOperation,
  AnalyzeBatchActionsOperationState
} from "./operation";

export interface AnalyzeBatchActionsPollerOptions extends AnalysisPollerOptions {
  actions: GeneratedActions;
  readonly displayName?: string;
  readonly includeStatistics?: boolean;
}

/**
 * Result type of the Analyze Long-Running-Operation (LRO)
 */
export type AnalyzeBatchActionsPollerLike = PollerLike<
  AnalyzeBatchActionsOperationState,
  PagedAnalyzeBatchActionsResult
>;

/**
 * Class that represents a poller that waits for the analyze results.
 */
export class BeginAnalyzeBatchActionsPoller extends AnalysisPoller<
  AnalyzeBatchActionsOperationState,
  PagedAnalyzeBatchActionsResult
> {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(pollerOptions: AnalyzeBatchActionsPollerOptions) {
    const {
      client,
      documents,
      analysisOptions,
      actions,
      displayName,
      includeStatistics,
      updateIntervalInMs = 5000,
      resumeFrom
    } = pollerOptions;

    let state: AnalyzeBatchActionsOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const { requestOptions, tracingOptions, abortSignal } = analysisOptions || {};
    const operation = new BeginAnalyzeBatchActionsPollerOperation(
      state || {},
      client,
      documents,
      actions,
      {
        requestOptions,
        tracingOptions,
        displayName,
        updateIntervalInMs,
        resumeFrom,
        includeStatistics,
        abortSignal
      }
    );

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
