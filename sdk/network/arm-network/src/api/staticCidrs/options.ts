// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StaticCidr } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StaticCidrsListOptionalParams extends OperationOptions {
  /** Optional skip token. */
  skipToken?: string;
  /** Optional num entries to skip. */
  skip?: number;
  /** Optional num entries to show. */
  top?: number;
  /** Optional key by which to sort. */
  sortKey?: string;
  /** Optional sort value for pagination. */
  sortValue?: string;
}

/** Optional parameters. */
export interface StaticCidrsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticCidrsCreateOptionalParams extends OperationOptions {
  /** StaticCidr resource object to create/update. */
  body?: StaticCidr;
}

/** Optional parameters. */
export interface StaticCidrsGetOptionalParams extends OperationOptions {}
