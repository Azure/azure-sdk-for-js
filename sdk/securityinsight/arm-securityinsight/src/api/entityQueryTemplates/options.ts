// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EntityQueryTemplateKind } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EntityQueryTemplatesListOptionalParams extends OperationOptions {
  /** The entity template query kind we want to fetch */
  kind?: EntityQueryTemplateKind;
}

/** Optional parameters. */
export interface EntityQueryTemplatesGetOptionalParams extends OperationOptions {}
