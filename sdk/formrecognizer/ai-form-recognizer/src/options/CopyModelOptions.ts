// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { PollerOptions } from "./PollerOptions";
import { TrainingPollOperationState } from "../lro/training";

/**
 * Options for the copy model operation.
 */
export interface CopyModelOptions
  extends OperationOptions,
    PollerOptions<TrainingPollOperationState> {}
