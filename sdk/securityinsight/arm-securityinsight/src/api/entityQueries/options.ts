// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EntityQueryTemplateKind } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EntityQueriesListOptionalParams extends OperationOptions {
  /** The entity query kind we want to fetch */
  kind?: EntityQueryTemplateKind;
}

/** Optional parameters. */
export interface EntityQueriesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntityQueriesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntityQueriesGetOptionalParams extends OperationOptions {}
