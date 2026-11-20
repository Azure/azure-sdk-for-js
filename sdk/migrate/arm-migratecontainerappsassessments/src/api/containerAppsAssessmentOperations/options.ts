// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppsAssessmentOperationsDownloadUrlOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsAssessmentOperationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsAssessmentOperationsListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsAssessmentOperationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsAssessmentOperationsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
