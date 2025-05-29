"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionSettings = void 0;
/**
 * stores partitionKeyPaths, all the pathsToEncrypt, and encryption settings (cekId, encryption type, and algorithm) for each property.
 * see {@link EncryptionSettingForProperty}
 * @hidden
 */
class EncryptionSettings {
    // getContainerRid
    constructor(id, containerRid, partitionKeyPaths) {
        this.pathsToEncrypt = [];
        // key is property path
        this.encryptionSettingForProperties = {};
        this.id = id;
        this.containerRid = containerRid;
        this.partitionKeyPaths = partitionKeyPaths;
    }
    setEncryptionSettingForProperty(key, encryptionSettingForProperty) {
        this.encryptionSettingForProperties[key] = encryptionSettingForProperty;
    }
    getEncryptionSettingForProperty(propertyName) {
        return this.encryptionSettingForProperties[propertyName];
    }
}
exports.EncryptionSettings = EncryptionSettings;
//# sourceMappingURL=EncryptionSettings.js.map