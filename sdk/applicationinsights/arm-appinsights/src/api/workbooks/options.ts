// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkbookUpdateParameters } from "../../models/workbooksApi/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkbooksListByResourceGroupOptionalParams extends OperationOptions {
  /** Tags presents on each workbook returned. */
  tags?: string[];
  /** Azure Resource Id that will fetch all linked workbooks. */
  sourceId?: string;
  /** Flag indicating whether or not to return the full content for each applicable workbook. If false, only return summary content for workbooks. */
  canFetchContent?: boolean;
}

/** Optional parameters. */
export interface WorkbooksRevisionGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkbooksListRevisionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkbooksListBySubscriptionOptionalParams extends OperationOptions {
  /** Tags presents on each workbook returned. */
  tags?: string[];
  /** Flag indicating whether or not to return the full content for each applicable workbook. If false, only return summary content for workbooks. */
  canFetchContent?: boolean;
}

/** Optional parameters. */
export interface WorkbooksDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkbooksUpdateOptionalParams extends OperationOptions {
  /** Azure Resource Id that will fetch all linked workbooks. */
  sourceId?: string;
  /** Properties that need to be specified to create a new workbook. */
  workbookUpdateParameters?: WorkbookUpdateParameters;
}

/** Optional parameters. */
export interface WorkbooksCreateOrUpdateOptionalParams extends OperationOptions {
  /** Azure Resource Id that will fetch all linked workbooks. */
  sourceId?: string;
}

/** Optional parameters. */
export interface WorkbooksGetOptionalParams extends OperationOptions {
  /** Flag indicating whether or not to return the full content for each applicable workbook. If false, only return summary content for workbooks. */
  canFetchContent?: boolean;
}
