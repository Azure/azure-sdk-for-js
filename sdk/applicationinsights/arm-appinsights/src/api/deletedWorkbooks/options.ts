// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CategoryType } from "../../models/applicationInsightsCommonTypes/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeletedWorkbooksListBySubscriptionOptionalParams extends OperationOptions {
  /** Category of workbook to return. */
  category?: CategoryType;
  /** Tags presents on each workbook returned. */
  tags?: string[];
}
