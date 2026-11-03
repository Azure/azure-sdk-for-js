// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SolutionResource,
  SolutionPatchRequestBody,
  SolutionWarmUpRequestBody,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SolutionWarmUpOptionalParams extends OperationOptions {
  /** The required request body for warming up a solution resource. */
  solutionWarmUpRequestBody?: SolutionWarmUpRequestBody;
}

/** Optional parameters. */
export interface SolutionUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required request body for updating a solution resource. */
  solutionPatchRequestBody?: SolutionPatchRequestBody;
}

/** Optional parameters. */
export interface SolutionCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required request body for this solution resource creation. */
  solutionRequestBody?: SolutionResource;
}

/** Optional parameters. */
export interface SolutionGetOptionalParams extends OperationOptions {}
