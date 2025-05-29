import type { EncryptionSettingForProperty } from "./EncryptionSettingForProperty.js";
/**
 * stores partitionKeyPaths, all the pathsToEncrypt, and encryption settings (cekId, encryption type, and algorithm) for each property.
 * see {@link EncryptionSettingForProperty}
 * @hidden
 */
export declare class EncryptionSettings {
    id: string;
    containerRid: string;
    partitionKeyPaths: string[];
    pathsToEncrypt: string[];
    private encryptionSettingForProperties;
    constructor(id: string, containerRid: string, partitionKeyPaths: string[]);
    setEncryptionSettingForProperty(key: string, encryptionSettingForProperty: EncryptionSettingForProperty): void;
    getEncryptionSettingForProperty(propertyName: string): EncryptionSettingForProperty;
}
//# sourceMappingURL=EncryptionSettings.d.ts.map