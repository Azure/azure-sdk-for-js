// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AssociationContract } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GatewayApiDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayApiCreateOrUpdateOptionalParams extends OperationOptions {
  parameters?: AssociationContract;
}

/** Optional parameters. */
export interface GatewayApiGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayApiListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}
