// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryUserRulesProperties, SetRulesRequest } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface QueryRulesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SetCollectionRulesOptionalParams extends OperationOptions {
  payload?: SetRulesRequest;
}

/** Optional parameters. */
export interface QueryUserRulesOptionalParams extends OperationOptions {
  payload?: QueryUserRulesProperties;
}
