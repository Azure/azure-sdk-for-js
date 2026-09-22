// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StudentsListOptionalParams extends OperationOptions {
  /** May be used to show deleted items. */
  includeDeleted?: boolean;
}

/** Optional parameters. */
export interface StudentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StudentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StudentsGetOptionalParams extends OperationOptions {}
