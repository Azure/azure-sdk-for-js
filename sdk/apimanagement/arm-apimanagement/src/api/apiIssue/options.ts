// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiIssueListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| userId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| state | filter | eq |     |</br> */
  filter?: string;
  /** Expand the comment attachments. */
  expandCommentsAttachments?: boolean;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ApiIssueDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiIssueUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiIssueCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiIssueGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiIssueGetOptionalParams extends OperationOptions {
  /** Expand the comment attachments. */
  expandCommentsAttachments?: boolean;
}
