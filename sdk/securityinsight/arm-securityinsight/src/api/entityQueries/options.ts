// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityQueryTemplateKind } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

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
