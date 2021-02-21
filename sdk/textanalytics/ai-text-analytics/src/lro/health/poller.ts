// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { PollerLike } from "@azure/core-lro";
import { PagedAnalyzeHealthcareEntitiesResult } from "../../analyzeHealthcareEntitiesResult";
import { StringIndexType } from "../../util";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import {
  BeginAnalyzeHealthcarePollerOperation,
  AnalyzeHealthcareOperationState
} from "./operation";

/**
 * @internal
 */
export interface HealthcarePollerOptions extends AnalysisPollerOptions {
  readonly modelVersion?: string;
  readonly includeStatistics?: boolean;
  stringIndexType?: StringIndexType;
}

/**
 * Result type of the Health Long-Running-Operation (LRO)
 */
export type AnalyzeHealthcareEntitiesPollerLike = PollerLike<
  AnalyzeHealthcareOperationState,
  PagedAnalyzeHealthcareEntitiesResult
>;

/**
 * Class that represents a poller that waits for the healthcare results.
 * @internal
 */
export class BeginAnalyzeHealthcarePoller extends AnalysisPoller<
  AnalyzeHealthcareOperationState,
  PagedAnalyzeHealthcareEntitiesResult
> {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(pollerOptions: HealthcarePollerOptions) {
    const {
      client,
      documents,
      analysisOptions,
      includeStatistics,
      modelVersion,
      updateIntervalInMs = 5000,
      resumeFrom,
      stringIndexType
    } = pollerOptions;

    let state: AnalyzeHealthcareOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const { abortSignal, requestOptions, tracingOptions } = analysisOptions || {};
    const operation = new BeginAnalyzeHealthcarePollerOperation(state || {}, client, documents, {
      requestOptions,
      modelVersion,
      updateIntervalInMs,
      resumeFrom,
      tracingOptions,
      includeStatistics,
      abortSignal,
      stringIndexType
    });

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
