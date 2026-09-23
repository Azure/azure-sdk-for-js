// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConversationsListOptionalParams extends OperationOptions {
  /** The name of the associated Investigation */
  investigationName?: string;
  /** The name of the associated Project */
  projectName?: string;
  /** The oldest creation timestamp to keep */
  createdSince?: Date;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxPageSize?: number;
}
/** Optional parameters. */
export interface ConversationsDeleteOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface ConversationsUpdateOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface ConversationsCreateOptionalParams extends OperationOptions {
  /** The Name of the associated Investigation */
  investigationName?: string;
  /** The title */
  displayName?: string;
}
/** Optional parameters. */
export interface ConversationsGetOptionalParams extends OperationOptions {}
