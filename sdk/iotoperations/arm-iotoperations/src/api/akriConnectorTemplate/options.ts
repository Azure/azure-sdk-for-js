// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AkriConnectorTemplateListByInstanceResourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface AkriConnectorTemplateDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AkriConnectorTemplateCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AkriConnectorTemplateGetOptionalParams extends OperationOptions {}
