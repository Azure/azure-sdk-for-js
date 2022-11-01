// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { SUPPORTED_API_VERSIONS } from "./constants";

/**
 * The optional parameters accepted by the KeyVaultSettingsClient.
 */
export interface KeyVaultSettingsClientOptions extends CommonClientOptions {
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
 * An interface representing the optional parameters that can be passed to {@link KeyVaultSettingsClient.createOrUpdateSetting}
 */
export interface CreateOrUpdateSettingOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultSettingsClient.getSetting}
 */
export interface GetSettingOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultSettingsClient.getSettings}
 */
export interface GetSettingsOptions extends OperationOptions {}

/**
 * Known values of {@link SettingType} that the service accepts.
 */
export enum KnownSettingType {
  /**
   * A boolean setting.
   */
  Boolean = "boolean",
}

/**
 * Defines values for KeyVaultSettingType.
 * {@link KnownSettingType} can be used interchangeably with KeyVaultSettingType. This enum contains
 * the known values that the service supports.
 */
export type KeyVaultSettingType = string;

/**
 * A setting with a boolean value.
 */
export interface BooleanKeyVaultSetting {
  /**
   * The name of the setting.
   */
  name: string;

  /**
   * The value of the setting.
   */
  value: boolean;

  /**
   * The type of the setting.
   */
  type: KnownSettingType.Boolean;
}

/**
 * A setting with an unknown type.
 */
export interface DefaultKeyVaultSetting {
  /**
   * The name of the setting.
   */
  name: string;

  /**
   * The value of the setting.
   */
  value: string;

  /**
   * The type of the setting.
   */
  type?: never;
}

/**
 * A Key Vault setting.
 */
export type KeyVaultSetting = BooleanKeyVaultSetting | DefaultKeyVaultSetting;

/**
 * An interface representing the response returned by {@link KeyVaultSettingsClient.getSettings}
 */
export interface GetSettingsResponse {
  /**
   * The account's settings.
   */
  value: KeyVaultSetting[];
}
