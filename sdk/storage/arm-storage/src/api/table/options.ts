// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Table } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TableListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TableDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TableUpdateOptionalParams extends OperationOptions {
  /** The parameters to provide to create a table. */
  parameters?: Table;
}

/** Optional parameters. */
export interface TableCreateOptionalParams extends OperationOptions {
  /** The parameters to provide to create a table. */
  parameters?: Table;
}

/** Optional parameters. */
export interface TableGetOptionalParams extends OperationOptions {}
