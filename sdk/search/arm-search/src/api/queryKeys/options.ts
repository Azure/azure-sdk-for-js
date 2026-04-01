// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { SearchManagementRequestOptions } from "../../models/models.js";

/** Optional parameters. */
export interface QueryKeysDeleteOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface QueryKeysListBySearchServiceOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface QueryKeysCreateOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}
