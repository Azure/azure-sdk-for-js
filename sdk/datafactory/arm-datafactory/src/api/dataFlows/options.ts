// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataFlowsListByFactoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataFlowsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataFlowsCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the data flow entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface DataFlowsGetOptionalParams extends OperationOptions {
  /** ETag of the data flow entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}
