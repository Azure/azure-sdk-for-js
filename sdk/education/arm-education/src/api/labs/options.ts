// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LabsGenerateInviteCodeOptionalParams extends OperationOptions {
  /** set this flag to true if you want to update student count without generating a new invite code */
  onlyUpdateStudentCountParameter?: boolean;
}

/** Optional parameters. */
export interface LabsListAllOptionalParams extends OperationOptions {
  /** May be used to include budget information. */
  includeBudget?: boolean;
  /** May be used to show deleted items. */
  includeDeleted?: boolean;
}

/** Optional parameters. */
export interface LabsListOptionalParams extends OperationOptions {
  /** May be used to include budget information. */
  includeBudget?: boolean;
}

/** Optional parameters. */
export interface LabsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LabsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LabsGetOptionalParams extends OperationOptions {
  /** May be used to include budget information. */
  includeBudget?: boolean;
}
