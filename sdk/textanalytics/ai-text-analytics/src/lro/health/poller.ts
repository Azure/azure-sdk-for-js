// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { PollerLike } from "@azure/core-lro";
import { PagedHealthcareEntities } from "../../healthResult";
import { StringEncodingUnit } from "../../util";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import {
  BeginAnalyzeHealthcarePollerOperation,
  BeginAnalyzeHealthcareOperationState
} from "./operation";

export interface HealthcarePollerOptions extends AnalysisPollerOptions {
  readonly modelVersion?: string;
  readonly includeStatistics?: boolean;
  stringEncodingUnit?: StringEncodingUnit;
}

/**
 * Result type of the Health Long-Running-Operation (LRO)
 */
export type HealthcarePollerLike = PollerLike<
  BeginAnalyzeHealthcareOperationState,
  PagedHealthcareEntities
>;

/**
 * Class that represents a poller that waits for the healthcare results.
 */
export class BeginAnalyzeHealthcarePoller extends AnalysisPoller<
  BeginAnalyzeHealthcareOperationState,
  PagedHealthcareEntities
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
      stringEncodingUnit
    } = pollerOptions;

    let state: BeginAnalyzeHealthcareOperationState | undefined;

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
      stringEncodingUnit
    });

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
