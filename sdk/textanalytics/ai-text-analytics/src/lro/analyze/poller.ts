// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PollerLike } from "@azure/core-lro";
import type { PagedAnalyzeActionsResult } from "../../analyzeActionsResult.js";
import type { JobManifestTasks as GeneratedActions } from "../../generated/models/index.js";
import { delay } from "../../util.js";

import type { AnalysisPollerOptions } from "../poller.js";
import { AnalysisPoller } from "../poller.js";
import type { AnalyzeActionsOperationState, BeginAnalyzeActionsOptions } from "./operation.js";
import { BeginAnalyzeActionsPollerOperation } from "./operation.js";

/**
 * @internal
 */
interface AnalyzeActionsPollerOptions extends AnalysisPollerOptions {
  actions: GeneratedActions;
  readonly options: BeginAnalyzeActionsOptions;
}

/**
 * Result type of the Begin Analyze Actions Long-Running-Operation (LRO).
 */
export type AnalyzeActionsPollerLike = PollerLike<
  AnalyzeActionsOperationState,
  PagedAnalyzeActionsResult
>;

/**
 * Class that represents a poller that waits for the analyze actions results.
 * @internal
 */
export class BeginAnalyzeActionsPoller extends AnalysisPoller<
  AnalyzeActionsOperationState,
  PagedAnalyzeActionsResult
> {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(pollerOptions: AnalyzeActionsPollerOptions) {
    const {
      client,
      tracing,
      documents,
      actions,
      options,
      updateIntervalInMs = 5000,
      resumeFrom,
    } = pollerOptions;

    let state: AnalyzeActionsOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const operation = new BeginAnalyzeActionsPollerOperation(
      (state || {}) as any,
      client,
      tracing,
      documents,
      actions,
      options,
    );

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
