// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccessReviewHistoryDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Only standard filters on definition name and created date are supported */
  filter?: string;
}

/** Optional parameters. */
export interface AccessReviewHistoryDefinitionsGetByIdOptionalParams extends OperationOptions {}
