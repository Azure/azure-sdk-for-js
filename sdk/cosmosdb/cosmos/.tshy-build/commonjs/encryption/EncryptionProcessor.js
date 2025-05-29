"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionProcessor = void 0;
const index_js_1 = require("../common/index.js");
const index_js_2 = require("../request/index.js");
const diagnostics_js_1 = require("../utils/diagnostics.js");
class EncryptionProcessor {
    constructor(containerId, containerRid, database, clientContext, encryptionManager) {
        this.containerId = containerId;
        this.containerRid = containerRid;
        this.database = database;
        this.clientContext = clientContext;
        this.encryptionManager = encryptionManager;
    }
    async encrypt(body) {
        if (!body) {
            throw new index_js_2.ErrorResponse("Input body is null or undefined.");
        }
        let propertiesEncryptedCount = 0;
        const encryptionSettings = await this.getEncryptionSetting();
        if (!encryptionSettings)
            return { body, propertiesEncryptedCount };
        for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
            const propertyName = pathToEncrypt.slice(1);
            if (!Object.prototype.hasOwnProperty.call(body, propertyName)) {
                continue;
            }
            const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
            if (!settingForProperty) {
                throw new index_js_2.ErrorResponse("Invalid Encryption Setting for the Property: " + propertyName);
            }
            body[propertyName] = await this.encryptToken(body[propertyName], settingForProperty, propertyName === "id");
            propertiesEncryptedCount++;
        }
        return { body, propertiesEncryptedCount };
    }
    async isPathEncrypted(path) {
        path = (0, index_js_1.extractPath)(path);
        const encryptionSettings = await this.getEncryptionSetting();
        const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(path);
        if (!settingForProperty)
            return false;
        return true;
    }
    async encryptProperty(path, value) {
        path = (0, index_js_1.extractPath)(path);
        const encryptionSettings = await this.getEncryptionSetting();
        if (!encryptionSettings)
            return value;
        const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(path);
        if (!settingForProperty) {
            return value;
        }
        value = await this.encryptToken(value, settingForProperty, path === "/id");
        return value;
    }
    async getEncryptedPartitionKeyValue(partitionKeyList) {
        const encryptionSettings = await this.getEncryptionSetting();
        let encryptedCount = 0;
        if (!encryptionSettings)
            return { partitionKeyList, encryptedCount };
        const partitionKeyPaths = encryptionSettings.partitionKeyPaths;
        for (let i = 0; i < partitionKeyPaths.length; i++) {
            const partitionKeyPath = (0, index_js_1.extractPath)(partitionKeyPaths[i]);
            if (encryptionSettings.pathsToEncrypt.includes(partitionKeyPath)) {
                const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(partitionKeyPath);
                partitionKeyList[i] = await this.encryptToken(partitionKeyList[i], settingForProperty, partitionKeyPath === "/id");
                encryptedCount++;
            }
        }
        return { partitionKeyList, encryptedCount };
    }
    async getEncryptedUrl(id) {
        const parts = id.split("/");
        const lastPart = parts[parts.length - 1];
        const encryptedLastPart = await this.getEncryptedId(lastPart);
        parts[parts.length - 1] = encryptedLastPart;
        return parts.join("/");
    }
    async getEncryptedId(id) {
        const encryptionSettings = await this.getEncryptionSetting();
        if (!encryptionSettings)
            return id;
        const settingForProperty = encryptionSettings.getEncryptionSettingForProperty("/id");
        if (!settingForProperty)
            return id;
        id = await this.encryptToken(id, settingForProperty, true);
        return id;
    }
    async encryptQueryParameter(path, value, isValueId, type) {
        if (value === null) {
            return value;
        }
        path = (0, index_js_1.extractPath)(path);
        const encryptionSettings = await this.getEncryptionSetting();
        if (!encryptionSettings)
            return value;
        const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(path);
        if (!settingForProperty) {
            return value;
        }
        return this.encryptToken(value, settingForProperty, isValueId, type);
    }
    async encryptToken(valueToEncrypt, propertySetting, isValueId, type) {
        if (typeof valueToEncrypt === "object" && valueToEncrypt !== null) {
            for (const key in valueToEncrypt) {
                if (Object.prototype.hasOwnProperty.call(valueToEncrypt, key)) {
                    valueToEncrypt[key] = await this.encryptToken(valueToEncrypt[key], propertySetting, isValueId, type);
                }
            }
        }
        else if (Array.isArray(type)) {
            for (let i = 0; i < valueToEncrypt.length; i++) {
                valueToEncrypt[i] = await this.encryptToken(valueToEncrypt[i], propertySetting, isValueId, type);
            }
        }
        else {
            valueToEncrypt = await this.serializeAndEncryptValue(valueToEncrypt, propertySetting, isValueId, type);
        }
        return valueToEncrypt;
    }
    async serializeAndEncryptValue(valueToEncrypt, propertySetting, isValueId, type) {
        if (valueToEncrypt === null) {
            return valueToEncrypt;
        }
        const [typeMarker, serializer] = (0, index_js_1.createSerializer)(valueToEncrypt, type);
        const plainText = serializer.serialize(valueToEncrypt);
        const encryptionAlgorithm = await this.buildEncryptionAlgorithm(propertySetting);
        const cipherText = encryptionAlgorithm.encrypt(plainText);
        if (isValueId) {
            if (typeof valueToEncrypt !== "string") {
                throw new index_js_2.ErrorResponse("The id should be of string type.");
            }
        }
        const cipherTextWithTypeMarker = Buffer.alloc(cipherText.length + 1);
        cipherTextWithTypeMarker[0] = typeMarker;
        cipherText.forEach((value, index) => {
            cipherTextWithTypeMarker[index + 1] = value;
        });
        let encryptedValue = Buffer.from(cipherTextWithTypeMarker).toString("base64");
        if (isValueId) {
            encryptedValue = encryptedValue.replace(/\//g, "_").replace(/\+/g, "-");
        }
        return encryptedValue;
    }
    async decrypt(body) {
        let propertiesDecryptedCount = 0;
        if (body == null) {
            return { body, propertiesDecryptedCount };
        }
        const encryptionSettings = await this.getEncryptionSetting();
        if (!encryptionSettings)
            return { body, propertiesDecryptedCount };
        for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
            const propertyName = pathToEncrypt.slice(1);
            if (!Object.prototype.hasOwnProperty.call(body, propertyName)) {
                continue;
            }
            const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
            if (settingForProperty == null) {
                throw new index_js_2.ErrorResponse("Invalid Encryption Setting for the Path: " + pathToEncrypt);
            }
            body[propertyName] = await this.decryptToken(body[propertyName], settingForProperty, propertyName === "id");
            propertiesDecryptedCount++;
        }
        return { body, propertiesDecryptedCount };
    }
    async decryptToken(valueToDecrypt, propertySetting, isValueId) {
        if (typeof valueToDecrypt === "object") {
            for (const key in valueToDecrypt) {
                if (Object.prototype.hasOwnProperty.call(valueToDecrypt, key)) {
                    valueToDecrypt[key] = await this.decryptToken(valueToDecrypt[key], propertySetting, isValueId);
                }
            }
        }
        else if (Array.isArray(valueToDecrypt)) {
            for (let i = 0; i < valueToDecrypt.length; i++) {
                valueToDecrypt[i] = await this.decryptToken(valueToDecrypt[i], propertySetting, isValueId);
            }
        }
        else {
            valueToDecrypt = await this.deserializeAndDecryptValue(valueToDecrypt, propertySetting, isValueId);
        }
        return valueToDecrypt;
    }
    async deserializeAndDecryptValue(valueToDecrypt, propertySetting, isValueId) {
        if (isValueId) {
            valueToDecrypt = valueToDecrypt.replace(/_/g, "/").replace(/-/g, "+");
        }
        const cipherTextWithTypeMarker = Buffer.from(valueToDecrypt, "base64");
        if (cipherTextWithTypeMarker === null) {
            return null;
        }
        let cipherText = Buffer.alloc(cipherTextWithTypeMarker.length - 1);
        cipherText = Buffer.from(cipherTextWithTypeMarker.slice(1));
        const encryptionAlgorithm = await this.buildEncryptionAlgorithm(propertySetting);
        const plainText = encryptionAlgorithm.decrypt(cipherText);
        if (plainText === null) {
            throw new index_js_2.ErrorResponse("returned null plain text");
        }
        const serializer = (0, index_js_1.createDeserializer)(cipherTextWithTypeMarker[0]);
        return serializer.deserialize(plainText);
    }
    async getEncryptionSetting(forceRefresh) {
        const key = this.database._rid + "/" + this.containerRid;
        const encryptionSetting = this.encryptionManager.encryptionSettingsCache.get(key);
        if (forceRefresh || !encryptionSetting) {
            return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
                const path = `/dbs/${this.database.id}/colls/${this.containerId}`;
                const id = `dbs/${this.database.id}/colls/${this.containerId}`;
                const response = await this.clientContext.read({
                    path,
                    resourceType: index_js_1.ResourceType.container,
                    resourceId: id,
                    diagnosticNode,
                });
                if (!response || !response.result) {
                    throw new index_js_2.ErrorResponse("Failed to fetch container definition");
                }
                const containerRid = response.result._rid;
                const clientEncryptionPolicy = response.result.clientEncryptionPolicy;
                const partitionKeyPaths = response.result.partitionKey.paths;
                const updatedEncryptionSetting = await this.encryptionManager.encryptionSettingsCache.create(key, containerRid, partitionKeyPaths, clientEncryptionPolicy);
                return updatedEncryptionSetting;
            }, this.clientContext);
        }
        return encryptionSetting;
    }
    async buildEncryptionAlgorithm(propertySetting) {
        const key = `${this.database._rid}/${propertySetting.encryptionKeyId}`;
        let clientEncryptionKeyProperties = this.encryptionManager.clientEncryptionKeyPropertiesCache.get(key);
        if (!clientEncryptionKeyProperties) {
            clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(propertySetting.encryptionKeyId);
        }
        try {
            // the buildEncryptionAlgorithm will build ProtectedDEK which calls unwrapKey  using the masterKey configured in
            // KeyEncryptionKey(created before creating Protected DEK)
            // we get wrapped key and key wrap metadata info from clientEncryptionKeyProperties.
            return await propertySetting.buildEncryptionAlgorithm(clientEncryptionKeyProperties, this.encryptionManager);
        }
        catch (err) {
            if (err.statusCode !== index_js_1.StatusCodes.Forbidden)
                throw err;
            // if access to key is revoked, and in case there's stale value in cache
            clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(propertySetting.encryptionKeyId);
            try {
                // This will succeed after if client has rewrapped CEK and gateway cache has updated value.
                return await propertySetting.buildEncryptionAlgorithm(clientEncryptionKeyProperties, this.encryptionManager, true);
            }
            catch (retryErr) {
                if (retryErr.statusCode !== index_js_1.StatusCodes.Forbidden)
                    throw retryErr;
                // in case there's stale value in gateway cache. get fresh value from backend
                clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(propertySetting.encryptionKeyId, clientEncryptionKeyProperties.etag);
                return propertySetting.buildEncryptionAlgorithm(clientEncryptionKeyProperties, this.encryptionManager);
            }
        }
    }
    async fetchClientEncryptionKey(cekId, cekEtag) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = `/dbs/${this.database.id}/clientencryptionkeys/${cekId}`;
            const id = `dbs/${this.database.id}/clientencryptionkeys/${cekId}`;
            const options = {};
            if (cekEtag) {
                options.accessCondition = {
                    type: index_js_1.Constants.HttpHeaders.IfNoneMatch,
                    condition: cekEtag,
                };
            }
            options.databaseRid = this.database._rid;
            const response = await this.clientContext.read({
                path: path,
                resourceType: index_js_1.ResourceType.clientencryptionkey,
                resourceId: id,
                options: options,
                diagnosticNode,
            });
            if (!response) {
                throw new index_js_2.ErrorResponse(`Failed to fetch client encryption key ${cekId}`);
            }
            if (response.code === index_js_1.StatusCodes.NotModified) {
                throw new index_js_2.ErrorResponse(`The Client Encryption Key with key id: ${cekId} on database: ${this.database.id} needs to be rewrapped with a valid Key Encryption Key using rewrapClientEncryptionKey. The Key Encryption Key used to wrap the Client Encryption Key has been revoked`);
            }
            const clientEncryptionKeyProperties = {
                id: response.result.id,
                encryptionAlgorithm: response.result.encryptionAlgorithm,
                wrappedDataEncryptionKey: new Uint8Array(Buffer.from(response.result.wrappedDataEncryptionKey, "base64")),
                encryptionKeyWrapMetadata: response.result.keyWrapMetadata,
                etag: response.result._etag,
            };
            const key = this.database._rid + "/" + cekId;
            this.encryptionManager.clientEncryptionKeyPropertiesCache.set(key, clientEncryptionKeyProperties);
            return clientEncryptionKeyProperties;
        }, this.clientContext);
    }
}
exports.EncryptionProcessor = EncryptionProcessor;
//# sourceMappingURL=EncryptionProcessor.js.map