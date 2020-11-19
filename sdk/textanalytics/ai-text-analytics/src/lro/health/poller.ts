// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { PaginatedHealthcareEntities } from "../../healthResult";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import {
  BeginAnalyzeHealthcarePollerOperation,
  BeginAnalyzeHealthcarePollState
} from "./operation";

/**
 * The status of a health operation
 */
export type BeginAnalyzeHealthcareOperationState = PollOperationState<PaginatedHealthcareEntities>;

/**
 * Result type of the Health Long-Running-Operation (LRO)
 */
export type HealthPollerLike = PollerLike<
  BeginAnalyzeHealthcareOperationState,
  PaginatedHealthcareEntities
>;

/**
 * Class that represents a poller that waits for the healthcare results.
 */
export class BeginAnalyzeHealthcarePoller extends AnalysisPoller<
  BeginAnalyzeHealthcarePollState,
  PaginatedHealthcareEntities
> {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(pollerOptions: AnalysisPollerOptions) {
    const {
      client,
      documents,
      analysisOptions,
      updateIntervalInMs = 5000,
      resumeFrom
    } = pollerOptions;

    let state: BeginAnalyzeHealthcarePollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const { includeStatistics, requestOptions, tracingOptions } = analysisOptions || {};
    const operation = new BeginAnalyzeHealthcarePollerOperation(
      state || {},
      client,
      documents,
      {
        health: analysisOptions,
        polling: {
          updateIntervalInMs,
          resumeFrom
        }
      },
      // take out modelVersion from the options that will be sent to the status
      // API because it is not applicable.
      { includeStatistics, requestOptions, tracingOptions }
    );

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
