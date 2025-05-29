import type { TokenCredential } from "@azure/core-auth";
import type { UpdateSettingOptions, GetSettingOptions, ListSettingsOptions, ListSettingsResponse, KeyVaultSetting, SettingsClientOptions, BooleanKeyVaultSetting } from "./settingsClientModels.js";
/**
 * Determines whether a given {@link KeyVaultSetting} is a {@link BooleanKeyVaultSetting}, i.e. has a boolean value.
 */
export declare function isBooleanSetting(setting: KeyVaultSetting): setting is BooleanKeyVaultSetting;
/**
 * The KeyVaultSettingsClient provides asynchronous methods to create, update, get and list
 * settings for the Azure Key Vault.
 */
export declare class KeyVaultSettingsClient {
    /**
     * The base URL to the vault.
     */
    readonly vaultUrl: string;
    /**
     * A reference to the auto-generated Key Vault HTTP client.
     */
    private readonly client;
    /**
     * Creates an instance of the KeyVaultSettingsClient.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateSettingsClient
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultSettingsClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultSettingsClient(vaultUrl, credentials);
     * ```
     * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`. You should validate that this URL references a valid Key Vault or Managed HSM resource. See https://aka.ms/azsdk/blog/vault-uri for details.
     * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
     * @param options - options used to configure Key Vault API requests.
     */
    constructor(vaultUrl: string, credential: TokenCredential, options?: SettingsClientOptions);
    /**
     * Updates the named account setting.
     *
     * @param setting - the setting to update. The name of the setting must be a valid settings option.
     * @param options - the optional parameters.
     */
    updateSetting(setting: KeyVaultSetting, options?: UpdateSettingOptions): Promise<KeyVaultSetting>;
    /**
     * Get the value of a specific account setting.
     *
     * @param settingName - the name of the setting.
     * @param options - the optional parameters.
     */
    getSetting(settingName: string, options?: GetSettingOptions): Promise<KeyVaultSetting>;
    /**
     * List the account's settings.
     *
     * @param options - the optional parameters.
     */
    getSettings(options?: ListSettingsOptions): Promise<ListSettingsResponse>;
}
//# sourceMappingURL=settingsClient.d.ts.map