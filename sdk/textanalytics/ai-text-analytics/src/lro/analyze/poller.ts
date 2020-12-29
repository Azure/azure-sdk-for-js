// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { PollerLike } from "@azure/core-lro";
import { PaginatedAnalyzeResults } from "../../analyzeResult";
import { JobManifestTasks } from "../../generated/models";
import { AnalyzeJobOptions } from "../../textAnalyticsClient";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import { BeginAnalyzePollerOperation, BeginAnalyzePollState } from "./operation";

export interface AnalyzePollerOptions extends AnalysisPollerOptions {
  tasks: JobManifestTasks;
  readonly analysisOptions?: AnalyzeJobOptions;
}

/**
 * Result type of the Analyze Long-Running-Operation (LRO)
 */
export type AnalyzePollerLike = PollerLike<BeginAnalyzePollState, PaginatedAnalyzeResults>;

/**
 * Class that represents a poller that waits for the analyze results.
 */
export class BeginAnalyzePoller extends AnalysisPoller<
  BeginAnalyzePollState,
  PaginatedAnalyzeResults
> {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(pollerOptions: AnalyzePollerOptions) {
    const {
      client,
      documents,
      analysisOptions,
      tasks,
      updateIntervalInMs = 5000,
      resumeFrom
    } = pollerOptions;

    let state: BeginAnalyzePollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const { requestOptions, tracingOptions, displayName, includeStatistics, abortSignal } =
      analysisOptions || {};
    const operation = new BeginAnalyzePollerOperation(
      state || {},
      client,
      documents,
      tasks,
      {
        analyze: { requestOptions, tracingOptions, displayName },
        polling: {
          updateIntervalInMs,
          resumeFrom
        }
      },
      {
        tracingOptions,
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
