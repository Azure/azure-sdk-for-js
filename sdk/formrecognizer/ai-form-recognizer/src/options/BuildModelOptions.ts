// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { TrainingPollOperationState } from "../lro/training";
import { PollerOptions } from "./PollerOptions";

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
