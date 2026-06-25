// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExportRunRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExportsGetExecutionHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExportsExecuteOptionalParams extends OperationOptions {
  /** Parameters supplied to the Execute Export operation. */
  parameters?: ExportRunRequest;
}

/** Optional parameters. */
export interface ExportsListOptionalParams extends OperationOptions {
  /** May be used to expand the properties within an export. Currently only 'runHistory' is supported and will return information for the last run of each export. */
  expand?: string;
}

/** Optional parameters. */
export interface ExportsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExportsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExportsGetOptionalParams extends OperationOptions {
  /** May be used to expand the properties within an export. Currently only 'runHistory' is supported and will return information for the last 10 runs of the export. */
  expand?: string;
}
