// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { PollerOptions } from "./PollerOptions";
import { TrainingPollOperationState } from "../lro/training";

/**
 * Options for the model build operation.
 */
export interface BuildModelOptions
  extends OperationOptions,
    PollerOptions<TrainingPollOperationState> {
  /**
   * A textual description of the model (can be any text).
   */
  description?: string;
}
