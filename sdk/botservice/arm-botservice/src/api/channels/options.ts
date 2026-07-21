// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Sku, Kind, ChannelUnion } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ChannelsListWithKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChannelsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChannelsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChannelsUpdateOptionalParams extends OperationOptions {
  properties?: ChannelUnion;
  location?: string;
  tags?: Record<string, string>;
  sku?: Sku;
  kind?: Kind;
  etag?: string;
  zones?: string[];
}

/** Optional parameters. */
export interface ChannelsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ChannelsGetOptionalParams extends OperationOptions {}
