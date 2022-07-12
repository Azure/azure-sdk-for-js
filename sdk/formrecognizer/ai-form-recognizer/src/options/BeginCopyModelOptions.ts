// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { TrainingPollOperationState } from "../lro/training";
import { PollerOptions } from "./PollerOptions";

/**
 * Options for the copy model operation.
 */
export interface BeginCopyModelOptions
  extends OperationOptions,
  PollerOptions<TrainingPollOperationState> { }
