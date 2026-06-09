// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IssueSetBackgroundVisualizationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueFetchBackgroundVisualizationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueAddOrUpdateResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueListResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueAddOrUpdateAlertsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueListAlertsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueFetchInvestigationResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueAddInvestigationResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IssueCreateOptionalParams extends OperationOptions {
  /** Related resource or alert that is to be added to the issue (default: empty - the issue will be created without any related resources or alerts) */
  related?: string;
}
