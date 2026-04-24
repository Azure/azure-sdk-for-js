// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AssessmentAPIExpandEnum } from "../../models/assessmentAPI/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AssessmentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsGetOptionalParams extends OperationOptions {
  /** OData expand. Optional. */
  expand?: AssessmentAPIExpandEnum;
}
