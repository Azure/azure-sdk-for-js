"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionSettingsCache = void 0;
const EncryptionSettings_js_1 = require("../EncryptionSettings.js");
const EncryptionSettingForProperty_js_1 = require("../EncryptionSettingForProperty.js");
/**
 * The cache used to store encryption settings for a container.
 * see {@link EncryptionSettings}
 * @hidden
 */
class EncryptionSettingsCache {
    constructor() {
        this.cache = new Map();
    }
    async create(id, containerRid, partitionKeyPaths, clientEncryptionPolicy) {
        const encryptionSettings = new EncryptionSettings_js_1.EncryptionSettings(id, containerRid, partitionKeyPaths);
        if (!clientEncryptionPolicy)
            return;
        for (const includedPath of clientEncryptionPolicy.includedPaths) {
            const encryptionSettingForProperty = new EncryptionSettingForProperty_js_1.EncryptionSettingForProperty(includedPath);
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
exports.EncryptionSettingsCache = EncryptionSettingsCache;
//# sourceMappingURL=EncryptionSettingsCache.js.map