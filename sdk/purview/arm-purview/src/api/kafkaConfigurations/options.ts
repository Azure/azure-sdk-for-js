// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface KafkaConfigurationsListByAccountOptionalParams extends OperationOptions {
  /** The skip token. */
  skipToken?: string;
}

/** Optional parameters. */
export interface KafkaConfigurationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface KafkaConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface KafkaConfigurationsGetOptionalParams extends OperationOptions {}
