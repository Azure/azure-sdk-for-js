// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExpandEnum } from "../../models/assessmentAPI/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AssessmentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsGetOptionalParams extends OperationOptions {
  /** OData expand. Optional. */
  expand?: ExpandEnum;
}
