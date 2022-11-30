// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { createKeyVaultChallengeCallbacks } from "@azure/keyvault-common";
import { LATEST_API_VERSION } from "./constants";
import { KeyVaultClient, Setting as GeneratedSetting } from "./generated";
import { logger } from "./log";
import {
  UpdateSettingOptions,
  GetSettingOptions,
  ListSettingsOptions,
  ListSettingsResponse,
  KeyVaultSetting,
  SettingsClientOptions,
} from "./settingsClientModels";

function makeSetting(generatedSetting: GeneratedSetting): KeyVaultSetting {
  if (generatedSetting.type === "boolean") {
    return {
      name: generatedSetting.name,
      value: generatedSetting.value === "true" ? true : false,
      kind: "boolean",
    };
  } else {
    return {
      name: generatedSetting.name,
      value: generatedSetting.value,
    };
  }
}

/**
 * The KeyVaultSettingsClient provides asynchronous methods to create, update, get and list
 * settings for the Azure Key Vault.
 */
export class KeyVaultSettingsClient {
  /**
   * The base URL to the vault.
   */
  public readonly vaultUrl: string;

  /**
   * A reference to the auto-generated Key Vault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of the KeyVaultSettingsClient.
   *
   * Example usage:
   * ```ts
   * import { KeyVaultSettingsClient } from "@azure/keyvault-admin";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new KeyVaultSettingsClient(vaultUrl, credentials);
   * ```
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`. You should validate that this URL references a valid Key Vault or Managed HSM resource. See https://aka.ms/azsdk/blog/vault-uri for details.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param options - options used to configure Key Vault API requests.

   */
  constructor(vaultUrl: string, credential: TokenCredential, options: SettingsClientOptions = {}) {
    this.vaultUrl = vaultUrl;

    const apiVersion = options.serviceVersion || LATEST_API_VERSION;

    const clientOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version",
        ],
      },
    };

    this.client = new KeyVaultClient(apiVersion, clientOptions);
    this.client.pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        scopes: [],
        challengeCallbacks: createKeyVaultChallengeCallbacks(options),
      })
    );
  }

  /**
   * Updates the named account setting.
   *
   * @param settingName - the name of the account setting. Must be a valid settings option.
   * @param value - the value of the pool setting.
   * @param options - the optional parameters.
   */
  async updateSetting(
    settingName: string,
    value: boolean,
    options: UpdateSettingOptions = {}
  ): Promise<KeyVaultSetting> {
    return makeSetting(
      await this.client.updateSetting(this.vaultUrl, settingName, String(value), options)
    );
  }

  /**
   * Get the value of a specific account setting.
   *
   * @param settingName - the name of the setting.
   * @param options - the optional parameters.
   */
  async getSetting(settingName: string, options: GetSettingOptions = {}): Promise<KeyVaultSetting> {
    return makeSetting(await this.client.getSetting(this.vaultUrl, settingName, options));
  }

  /**
   * List the account's settings.
   *
   * @param options - the optional parameters.
   */
  async getSettings(options: ListSettingsOptions = {}): Promise<ListSettingsResponse> {
    const { settings } = await this.client.getSettings(this.vaultUrl, options);
    return { settings: settings?.map(makeSetting) ?? [] };
  }
}
