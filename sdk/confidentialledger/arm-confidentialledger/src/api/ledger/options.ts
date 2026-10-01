// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LedgerFilesExportOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerListBySubscriptionOptionalParams extends OperationOptions {
  /** The filter to apply on the list operation. eg. $filter=ledgerType eq 'Public' */
  filter?: string;
}

/** Optional parameters. */
export interface LedgerListByResourceGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the list operation. eg. $filter=ledgerType eq 'Public' */
  filter?: string;
}

/** Optional parameters. */
export interface LedgerDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LedgerGetOptionalParams extends OperationOptions {}
