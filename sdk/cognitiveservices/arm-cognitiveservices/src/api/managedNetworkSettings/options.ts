// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkSettingsPropertiesBasicResource } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedNetworkSettingsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedNetworkSettingsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedNetworkSettingsPatchOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Managed Network Settings object of the account. */
  body?: ManagedNetworkSettingsPropertiesBasicResource;
}

/** Optional parameters. */
export interface ManagedNetworkSettingsPutOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedNetworkSettingsGetOptionalParams extends OperationOptions {}
