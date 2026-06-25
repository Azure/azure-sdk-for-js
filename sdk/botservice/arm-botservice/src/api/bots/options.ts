// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotProperties, Sku, Kind } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BotsGetCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsUpdateOptionalParams extends OperationOptions {
  properties?: BotProperties;
  location?: string;
  tags?: Record<string, string>;
  sku?: Sku;
  kind?: Kind;
  etag?: string;
  zones?: string[];
}

/** Optional parameters. */
export interface BotsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsGetOptionalParams extends OperationOptions {}
