// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UserGetSharedAccessTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UserGenerateSsoUrlOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UserListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| firstName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| lastName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| email | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| state | filter | eq |     |</br>| registrationDate | filter | ge, le, eq, ne, gt, lt |     |</br>| note | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| groups | expand |     |     |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** Detailed Group in response. */
  expandGroups?: boolean;
}

/** Optional parameters. */
export interface UserDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Whether to delete user's subscription or not. */
  deleteSubscriptions?: boolean;
  /** Send an Account Closed Email notification to the User. */
  notify?: boolean;
  /** Determines the type of application which send the create user request. Default is legacy publisher portal. */
  appType?: AppType;
}

/** Optional parameters. */
export interface UserUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UserCreateOrUpdateOptionalParams extends OperationOptions {
  /** Send an Email notification to the User. */
  notify?: boolean;
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface UserGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UserGetOptionalParams extends OperationOptions {}
