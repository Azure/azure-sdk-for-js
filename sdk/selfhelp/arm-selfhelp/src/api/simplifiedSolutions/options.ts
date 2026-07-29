// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SimplifiedSolutionsResource } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SimplifiedSolutionsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required request body for simplified Solutions resource creation. */
  simplifiedSolutionsRequestBody?: SimplifiedSolutionsResource;
}

/** Optional parameters. */
export interface SimplifiedSolutionsGetOptionalParams extends OperationOptions {}
