// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ListLocalUserIncludeParam } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LocalUsersRegeneratePasswordOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalUsersListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalUsersListOptionalParams extends OperationOptions {
  /** Optional, specifies the maximum number of local users that will be included in the list response. */
  maxpagesize?: number;
  /** Optional. When specified, only local user names starting with the filter will be listed. */
  filter?: string;
  /** Optional, when specified, will list local users enabled for the specific protocol. Lists all users by default. */
  include?: ListLocalUserIncludeParam;
}

/** Optional parameters. */
export interface LocalUsersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalUsersCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalUsersGetOptionalParams extends OperationOptions {}
