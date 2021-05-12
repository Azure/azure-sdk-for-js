// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollerLike } from "@azure/core-lro";
import { PagedAnalyzeActionsResult } from "../../analyzeActionsResult";
import { JobManifestTasks as GeneratedActions } from "../../generated/models";
import { delay } from "../../util";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import {
  BeginAnalyzeActionsPollerOperation,
  AnalyzeActionsOperationState,
  BeginAnalyzeActionsOptions
} from "./operation";

/**
 * @internal
 */
export interface AnalyzeActionsPollerOptions extends AnalysisPollerOptions {
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
      documents,
      actions,
      options,
      updateIntervalInMs = 5000,
      resumeFrom
    } = pollerOptions;

    let state: AnalyzeActionsOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const operation = new BeginAnalyzeActionsPollerOperation(
      state || {},
      client,
      documents,
      actions,
      options
    );

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
