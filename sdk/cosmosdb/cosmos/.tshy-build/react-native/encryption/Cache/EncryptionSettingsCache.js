// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { EncryptionSettings } from "../EncryptionSettings.js";
import { EncryptionSettingForProperty } from "../EncryptionSettingForProperty.js";
/**
 * The cache used to store encryption settings for a container.
 * see {@link EncryptionSettings}
 * @hidden
 */
export class EncryptionSettingsCache {
    constructor() {
        this.cache = new Map();
    }
    async create(id, containerRid, partitionKeyPaths, clientEncryptionPolicy) {
        const encryptionSettings = new EncryptionSettings(id, containerRid, partitionKeyPaths);
        if (!clientEncryptionPolicy)
            return;
        for (const includedPath of clientEncryptionPolicy.includedPaths) {
            const encryptionSettingForProperty = new EncryptionSettingForProperty(includedPath);
            encryptionSettings.pathsToEncrypt.push(includedPath.path);
            encryptionSettings.setEncryptionSettingForProperty(includedPath.path, encryptionSettingForProperty);
        }
        this.set(id, encryptionSettings);
        return encryptionSettings;
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, encryptionSettings) {
        this.cache.set(key, encryptionSettings);
    }
}
//# sourceMappingURL=EncryptionSettingsCache.js.map