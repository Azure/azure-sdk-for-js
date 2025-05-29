"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyVaultSettingsClient = void 0;
exports.isBooleanSetting = isBooleanSetting;
const createKeyVaultClient_js_1 = require("./createKeyVaultClient.js");
function makeSetting(generatedSetting) {
    if (generatedSetting.type === "boolean") {
        return {
            kind: "boolean",
            name: generatedSetting.name,
            value: generatedSetting.value === "true" ? true : false,
        };
    }
    else {
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
function isBooleanSetting(setting) {
    return setting.kind === "boolean" && typeof setting.value === "boolean";
}
/**
 * The KeyVaultSettingsClient provides asynchronous methods to create, update, get and list
 * settings for the Azure Key Vault.
 */
class KeyVaultSettingsClient {
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    constructor(vaultUrl, credential, options = {}) {
        this.vaultUrl = vaultUrl;
        this.client = (0, createKeyVaultClient_js_1.createKeyVaultClient)(vaultUrl, credential, options);
    }
    /**
     * Updates the named account setting.
     *
     * @param setting - the setting to update. The name of the setting must be a valid settings option.
     * @param options - the optional parameters.
     */
    async updateSetting(setting, options = {}) {
        return makeSetting(await this.client.updateSetting(setting.name, { value: String(setting.value) }, options));
    }
    /**
     * Get the value of a specific account setting.
     *
     * @param settingName - the name of the setting.
     * @param options - the optional parameters.
     */
    async getSetting(settingName, options = {}) {
        return makeSetting(await this.client.getSetting(settingName, options));
    }
    /**
     * List the account's settings.
     *
     * @param options - the optional parameters.
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    async getSettings(options = {}) {
        var _a;
        const { settings } = await this.client.getSettings(options);
        return { settings: (_a = settings === null || settings === void 0 ? void 0 : settings.map(makeSetting)) !== null && _a !== void 0 ? _a : [] };
    }
}
exports.KeyVaultSettingsClient = KeyVaultSettingsClient;
//# sourceMappingURL=settingsClient.js.map