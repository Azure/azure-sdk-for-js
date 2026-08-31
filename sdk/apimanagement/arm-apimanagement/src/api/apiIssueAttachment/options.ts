// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiIssueAttachmentListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| userId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ApiIssueAttachmentDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiIssueAttachmentCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiIssueAttachmentGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiIssueAttachmentGetOptionalParams extends OperationOptions {}
