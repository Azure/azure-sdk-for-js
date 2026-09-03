// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkbookTemplateUpdateParameters } from "../../models/workbookTemplatesApi/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkbookTemplatesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkbookTemplatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkbookTemplatesUpdateOptionalParams extends OperationOptions {
  /** Properties that need to be specified to patch a workbook template. */
  workbookTemplateUpdateParameters?: WorkbookTemplateUpdateParameters;
}

/** Optional parameters. */
export interface WorkbookTemplatesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkbookTemplatesGetOptionalParams extends OperationOptions {}
