// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiagnosticSettingsGetDiagnosticRemoteSupportSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiagnosticSettingsGetDiagnosticProactiveLogCollectionSettingsOptionalParams extends OperationOptions {}
