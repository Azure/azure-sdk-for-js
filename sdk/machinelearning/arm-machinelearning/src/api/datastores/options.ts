// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecretExpiry } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatastoresListSecretsOptionalParams extends OperationOptions {
  /** Secret expiry information. */
  body?: SecretExpiry;
}

/** Optional parameters. */
export interface DatastoresListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Maximum number of results to return. */
  count?: number;
  /** Filter down to the workspace default datastore. */
  isDefault?: boolean;
  /** Names of datastores to return. */
  names?: string[];
  /** Text to search for in the datastore names. */
  searchText?: string;
  /** Order by property (createdtime | modifiedtime | name). */
  orderBy?: string;
  /** Order by property in ascending order. */
  orderByAsc?: boolean;
}

/** Optional parameters. */
export interface DatastoresDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatastoresCreateOrUpdateOptionalParams extends OperationOptions {
  /** Flag to skip validation. */
  skipValidation?: boolean;
}

/** Optional parameters. */
export interface DatastoresGetOptionalParams extends OperationOptions {}
