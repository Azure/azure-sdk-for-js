// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollerLike } from "@azure/core-lro";
import { PagedAnalyzeHealthcareEntitiesResult } from "../../analyzeHealthcareEntitiesResult";
import { delay } from "../../util";

import { AnalysisPoller, AnalysisPollerOptions } from "../poller";
import {
  BeginAnalyzeHealthcarePollerOperation,
  AnalyzeHealthcareOperationState,
  BeginAnalyzeHealthcareEntitiesOptions
} from "./operation";

/**
 * @internal
 */
export interface HealthcarePollerOptions extends AnalysisPollerOptions {
  readonly options?: BeginAnalyzeHealthcareEntitiesOptions;
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
  constructor(inputs: HealthcarePollerOptions) {
    const { client, documents, options, updateIntervalInMs = 5000, resumeFrom } = inputs;

    let state: AnalyzeHealthcareOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }
    const operation = new BeginAnalyzeHealthcarePollerOperation(
      state || {},
      client,
      documents,
      options
    );

    super(operation);

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}
