// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperatorApiPlansListBySubscriptionOptionalParams
  extends OperationOptions {
  /** An optional OData based filter expression to apply on the operation. */
  filter?: string;
  /** An optional query parameter which specifies the maximum number of records to be returned. */
  top?: number;
  /** An optional query parameter which specifies the number of records to be skipped. */
  skip?: number;
}

/** Optional parameters. */
export interface OperatorApiPlansGetOptionalParams extends OperationOptions {}
