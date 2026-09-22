// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OpenAIIntegrationRPModel } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OpenAIGetStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OpenAIListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OpenAIDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OpenAICreateOrUpdateOptionalParams extends OperationOptions {
  body?: OpenAIIntegrationRPModel;
}

/** Optional parameters. */
export interface OpenAIGetOptionalParams extends OperationOptions {}
