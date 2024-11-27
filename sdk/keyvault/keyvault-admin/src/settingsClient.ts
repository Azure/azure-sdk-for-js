// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { keyVaultAuthenticationPolicy } from "@azure/keyvault-common";
import { LATEST_API_VERSION } from "./constants.js";
import type { Setting as GeneratedSetting } from "./generated/index.js";
import { KeyVaultClient } from "./generated/index.js";
import { logger } from "./log.js";
import type {
  UpdateSettingOptions,
  GetSettingOptions,
  ListSettingsOptions,
  ListSettingsResponse,
  KeyVaultSetting,
  SettingsClientOptions,
  BooleanKeyVaultSetting,
} from "./settingsClientModels.js";

function makeSetting(generatedSetting: GeneratedSetting): KeyVaultSetting {
  if (generatedSetting.type === "boolean") {
    return {
      kind: "boolean",
      name: generatedSetting.name,
      value: generatedSetting.value === "true" ? true : false,
    };
  } else {
    return {
      kind: generatedSetting.type,
      name: generatedSetting.name,
      value: generatedSetting.value,
    };
  }
}

/**
 * Determines whether a given {@link KeyVaultSetting} is a {@link BooleanKeyVaultSetting}, i.e. has a boolean value.
 */
export function isBooleanSetting(setting: KeyVaultSetting): setting is BooleanKeyVaultSetting {
  return setting.kind === "boolean" && typeof setting.value === "boolean";
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
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

    // The authentication policy must come after the deserialization policy since the deserialization policy
    // converts 401 responses to an Error, and we don't want to deal with that.
    this.client.pipeline.addPolicy(keyVaultAuthenticationPolicy(credential, clientOptions), {
      afterPolicies: ["deserializationPolicy"],
    });
  }

  /**
   * Updates the named account setting.
   *
   * @param setting - the setting to update. The name of the setting must be a valid settings option.
   * @param options - the optional parameters.
   */
  async updateSetting(
    setting: KeyVaultSetting,
    options: UpdateSettingOptions = {},
  ): Promise<KeyVaultSetting> {
    return makeSetting(
      await this.client.updateSetting(this.vaultUrl, setting.name, String(setting.value), options),
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  async getSettings(options: ListSettingsOptions = {}): Promise<ListSettingsResponse> {
    const { settings } = await this.client.getSettings(this.vaultUrl, options);
    return { settings: settings?.map(makeSetting) ?? [] };
  }
}
