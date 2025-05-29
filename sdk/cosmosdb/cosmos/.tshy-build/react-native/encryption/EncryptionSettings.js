// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * stores partitionKeyPaths, all the pathsToEncrypt, and encryption settings (cekId, encryption type, and algorithm) for each property.
 * see {@link EncryptionSettingForProperty}
 * @hidden
 */
export class EncryptionSettings {
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
//# sourceMappingURL=EncryptionSettings.js.map