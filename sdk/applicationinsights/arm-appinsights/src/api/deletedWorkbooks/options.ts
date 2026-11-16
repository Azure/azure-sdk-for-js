// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CategoryType } from "../../models/applicationInsightsCommonTypes/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeletedWorkbooksListBySubscriptionOptionalParams extends OperationOptions {
  /** Category of workbook to return. */
  category?: CategoryType;
  /** Tags presents on each workbook returned. */
  tags?: string[];
}
