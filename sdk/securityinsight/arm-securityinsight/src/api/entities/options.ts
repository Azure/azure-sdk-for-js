// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EntityManualTriggerRequestBody } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EntitiesGetInsightsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesQueriesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesExpandOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesRunPlaybookOptionalParams extends OperationOptions {
  /** Describes the request body for triggering a playbook on an entity. */
  requestBody?: EntityManualTriggerRequestBody;
}

/** Optional parameters. */
export interface EntitiesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesGetOptionalParams extends OperationOptions {}
