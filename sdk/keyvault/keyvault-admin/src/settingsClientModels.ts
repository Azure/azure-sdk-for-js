// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { SUPPORTED_API_VERSIONS } from "./constants.js";

/**
 * The optional parameters accepted by the KeyVaultSettingsClient.
 */
export interface SettingsClientOptions extends CommonClientOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;

  /**
   * Whether to disable verification that the authentication challenge resource matches the Key Vault or Managed HSM domain.
   * Defaults to false.
   */
  disableChallengeResourceVerification?: boolean;
}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultSettingsClient.updateSetting}
 */
export interface UpdateSettingOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultSettingsClient.getSetting}
 */
export interface GetSettingOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultSettingsClient.listSettings}
 */
export interface ListSettingsOptions extends OperationOptions {}

/**
 * A Key Vault setting.
 */
export interface KeyVaultSetting {
  /**
   * The kind of the setting.
   */
  kind?: string;

  /**
   * The name of the setting.
   */
  name: string;

  /**
   * The value of a setting. The type of the value depends on the value of the kind property.
   */
  value: unknown;
}

/**
 * A Key Vault setting of boolean type. To check if a given KeyVaultSetting is a boolean, use {@link isBooleanSetting}.
 */
export interface BooleanKeyVaultSetting extends KeyVaultSetting {
  /**
   * The kind of the setting.
   */
  kind: "boolean";

  /**
   * The value of the setting as a boolean.
   */
  value: boolean;
}

/**
 * An interface representing the response returned by {@link KeyVaultSettingsClient.listSettings}
 */
export interface ListSettingsResponse {
  /**
   * The account's settings.
   */
  settings: KeyVaultSetting[];
}
