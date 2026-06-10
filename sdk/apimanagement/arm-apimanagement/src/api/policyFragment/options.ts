// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyFragmentContentFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyFragmentListReferencesOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface PolicyFragmentListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter, orderBy | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| value | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** OData order by query option. */
  orderby?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface PolicyFragmentDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyFragmentCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PolicyFragmentGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyFragmentGetOptionalParams extends OperationOptions {
  /** Policy fragment content format. */
  format?: PolicyFragmentContentFormat;
}
