// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebhookListByAutomationAccountOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
}

/** Optional parameters. */
export interface WebhookDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhookUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhookCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhookGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhookGenerateUriOptionalParams extends OperationOptions {}
