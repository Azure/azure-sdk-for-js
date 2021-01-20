// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { PollerLike } from "@azure/core-lro";
import { PagedAnalyzeResults } from "../../analyzeBatchTasksResult";
import { JobManifestTasks } from "../../generated/models";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import { BeginAnalyzePollerOperation, BeginAnalyzeOperationState } from "./operation";

export interface AnalyzePollerOptions extends AnalysisPollerOptions {
  tasks: JobManifestTasks;
  readonly displayName?: string;
  readonly includeStatistics?: boolean;
}

/**
 * Result type of the Analyze Long-Running-Operation (LRO)
 */
export type AnalyzePollerLike = PollerLike<BeginAnalyzeOperationState, PagedAnalyzeResults>;

/**
 * Class that represents a poller that waits for the analyze results.
 */
export class BeginAnalyzePoller extends AnalysisPoller<
  BeginAnalyzeOperationState,
  PagedAnalyzeResults
> {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(pollerOptions: AnalyzePollerOptions) {
    const {
      client,
      documents,
      analysisOptions,
      tasks,
      displayName,
      includeStatistics,
      updateIntervalInMs = 5000,
      resumeFrom
    } = pollerOptions;

    let state: BeginAnalyzeOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const { requestOptions, tracingOptions, abortSignal } = analysisOptions || {};
    const operation = new BeginAnalyzePollerOperation(state || {}, client, documents, tasks, {
      requestOptions,
      tracingOptions,
      displayName,
      updateIntervalInMs,
      resumeFrom,
      includeStatistics,
      abortSignal
    });

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
