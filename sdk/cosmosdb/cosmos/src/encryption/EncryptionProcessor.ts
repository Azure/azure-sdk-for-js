// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionSettings } from "./EncryptionSettings";
import { EncryptionSettingForProperty } from "./EncryptionSettingForProperty";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm";
import { ContainerDefinition, ItemDefinition } from "../client";
import { PartitionKeyInternal } from "../documents";
import { TypeMarker } from "./enums/TypeMarker";
import { ClientContext } from "../ClientContext";
import { ClientEncryptionKeyRequest, ClientEncryptionKeyProperties } from "./ClientEncryptionKey";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import {
  ResourceType,
  StatusCodes,
  createDeserializer,
  createSerializer,
  extractPath,
} from "../common";
import { ErrorResponse, RequestOptions } from "../request";
import { withDiagnostics } from "../utils/diagnostics";
import { EncryptionManager } from "./EncryptionManager";

export class EncryptionProcessor {
  constructor(
    private readonly containerId: string,
    private readonly databaseId: string,
    private readonly clientContext: ClientContext,
    private encryptionManager: EncryptionManager,
  ) {}

  async encrypt<T extends ItemDefinition>(body: T): Promise<T> {
    if (!body) {
      throw new ErrorResponse("Input body is null or undefined.");
    }
    const encryptionSettings = await this.getEncryptionSetting();
    if (!encryptionSettings) return body;
    for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
      const propertyName = pathToEncrypt.slice(1);
      if (!Object.prototype.hasOwnProperty.call(body, propertyName)) {
        continue;
      }

      const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
      if (!settingForProperty) {
        throw new ErrorResponse("Invalid Encryption Setting for the Property: " + propertyName);
      }
      body[propertyName as keyof T] = await this.encryptToken(
        body[propertyName],
        settingForProperty,
        propertyName === "id",
      );
    }
    return body;
  }

  async encryptProperty(path: string, value: any): Promise<any> {
    path = extractPath(path);
    const encryptionSettings = await this.getEncryptionSetting();
    if (!encryptionSettings) return value;
    const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(path);
    if (!settingForProperty) {
      return value;
    }

    value = await this.encryptToken(value, settingForProperty, path === "/id");
    return value;
  }

  async getEncryptedPartitionKeyValue(
    partitionKeyList: PartitionKeyInternal,
  ): Promise<PartitionKeyInternal> {
    const encryptionSettings = await this.getEncryptionSetting();
    if (!encryptionSettings) return partitionKeyList;
    const partitionKeyPaths = encryptionSettings.partitionKeyPaths;
    for (let i = 0; i < partitionKeyPaths.length; i++) {
      const partitionKeyPath = extractPath(partitionKeyPaths[i]);
      if (encryptionSettings.pathsToEncrypt.includes(partitionKeyPath)) {
        const settingForProperty =
          encryptionSettings.getEncryptionSettingForProperty(partitionKeyPath);
        partitionKeyList[i] = await this.encryptToken(
          partitionKeyList[i],
          settingForProperty,
          partitionKeyPath === "/id",
        );
      }
    }
    return partitionKeyList;
  }

  async getEncryptedUrl(id: string): Promise<string> {
    const parts = id.split("/");
    const lastPart = parts[parts.length - 1];
    const encryptedLastPart = await this.getEncryptedId(lastPart);
    parts[parts.length - 1] = encryptedLastPart;
    return parts.join("/");
  }

  async getEncryptedId(id: string): Promise<string> {
    const encryptionSettings = await this.getEncryptionSetting();
    if (!encryptionSettings) return id;
    const settingForProperty = encryptionSettings.getEncryptionSettingForProperty("/id");

    if (!settingForProperty) return id;
    id = await this.encryptToken(id, settingForProperty, true);
    return id;
  }

  async encryptQueryParameter(
    path: string,
    value: any,
    isValueId: boolean,
    type?: TypeMarker,
  ): Promise<string> {
    if (value === null) {
      return value;
    }
    path = extractPath(path);
    const encryptionSettings = await this.getEncryptionSetting();
    if (!encryptionSettings) return value;
    const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(path);
    if (!settingForProperty) {
      return value;
    }
    return this.encryptToken(value, settingForProperty, isValueId, type);
  }

  private async encryptToken(
    valueToEncrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
    type?: TypeMarker,
  ): Promise<any> {
    if (typeof valueToEncrypt === "object" && valueToEncrypt !== null) {
      for (const key in valueToEncrypt) {
        if (Object.prototype.hasOwnProperty.call(valueToEncrypt, key)) {
          valueToEncrypt[key] = await this.encryptToken(
            valueToEncrypt[key],
            propertySetting,
            isValueId,
            type,
          );
        }
      }
    } else if (Array.isArray(type)) {
      for (let i = 0; i < valueToEncrypt.length; i++) {
        valueToEncrypt[i] = await this.encryptToken(
          valueToEncrypt[i],
          propertySetting,
          isValueId,
          type,
        );
      }
    } else {
      valueToEncrypt = await this.serializeAndEncryptValue(
        valueToEncrypt,
        propertySetting,
        isValueId,
        type,
      );
    }
    return valueToEncrypt;
  }

  private async serializeAndEncryptValue(
    valueToEncrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
    type?: TypeMarker,
  ): Promise<string> {
    if (valueToEncrypt === null) {
      return valueToEncrypt;
    }
    const [typeMarker, serializer] = createSerializer(valueToEncrypt, type);
    const plainText = serializer.serialize(valueToEncrypt);
    const encryptionAlgorithm = await this.buildEncryptionAlgorithm(propertySetting);
    const cipherText = encryptionAlgorithm.encrypt(plainText);
    if (isValueId) {
      if (typeof valueToEncrypt !== "string") {
        throw new ErrorResponse("The id should be of string type.");
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

  async decrypt<T extends ItemDefinition>(body: T): Promise<T> {
    if (body == null) {
      return body;
    }
    const encryptionSettings = await this.getEncryptionSetting();
    if (!encryptionSettings) return body;
    for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
      const propertyName = pathToEncrypt.slice(1);
      if (!Object.prototype.hasOwnProperty.call(body, propertyName)) {
        continue;
      }
      const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
      if (settingForProperty == null) {
        throw new ErrorResponse("Invalid Encryption Setting for the Path: " + pathToEncrypt);
      }

      body[propertyName as keyof T] = await this.decryptToken(
        body[propertyName],
        settingForProperty,
        propertyName === "id",
      );
    }
    return body;
  }

  private async decryptToken(
    valueToDecrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
  ): Promise<any> {
    if (typeof valueToDecrypt === "object") {
      for (const key in valueToDecrypt) {
        if (Object.prototype.hasOwnProperty.call(valueToDecrypt, key)) {
          valueToDecrypt[key] = await this.decryptToken(
            valueToDecrypt[key],
            propertySetting,
            isValueId,
          );
        }
      }
    } else if (Array.isArray(valueToDecrypt)) {
      for (let i = 0; i < valueToDecrypt.length; i++) {
        valueToDecrypt[i] = await this.decryptToken(valueToDecrypt[i], propertySetting, isValueId);
      }
    } else {
      valueToDecrypt = await this.deserializeAndDecryptValue(
        valueToDecrypt,
        propertySetting,
        isValueId,
      );
    }
    return valueToDecrypt;
  }

  private async deserializeAndDecryptValue(
    valueToDecrypt: string,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
  ): Promise<any> {
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
      throw new ErrorResponse("returned null plain text");
    }

    const serializer = createDeserializer(cipherTextWithTypeMarker[0] as TypeMarker);
    return serializer.deserialize(plainText);
  }

  async getEncryptionSetting(forceRefresh?: boolean): Promise<EncryptionSettings> {
    const key = this.databaseId + "/" + this.containerId;
    const encryptionSetting =
      this.encryptionManager.encryptionSettingsCache.getEncryptionSettings(key);
    if (forceRefresh || !encryptionSetting) {
      return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
        const path = `/dbs/${this.databaseId}/colls/${this.containerId}`;
        const id = `dbs/${this.databaseId}/colls/${this.containerId}`;
        const response = await this.clientContext.read<ContainerDefinition>({
          path,
          resourceType: ResourceType.container,
          resourceId: id,
          diagnosticNode,
        });
        const containerRid = response.result._rid;
        const clientEncryptionPolicy = response.result.clientEncryptionPolicy;
        const partitionKeyPaths = response.result.partitionKey.paths;
        const updatedEncryptionSetting =
          await this.encryptionManager.encryptionSettingsCache.createAndSetEncryptionSettings(
            key,
            containerRid,
            partitionKeyPaths,
            clientEncryptionPolicy,
          );
        return updatedEncryptionSetting;
      }, this.clientContext);
    }
    return encryptionSetting;
  }
  private async buildEncryptionAlgorithm(
    propertySetting: EncryptionSettingForProperty,
  ): Promise<AeadAes256CbcHmacSha256Algorithm> {
    const key = `${this.databaseId}/${propertySetting.encryptionKeyId}`;

    let clientEncryptionKeyProperties =
      this.encryptionManager.clientEncryptionKeyPropertiesCache.getClientEncryptionKeyProperties(
        key,
      );
    if (!clientEncryptionKeyProperties) {
      clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(
        propertySetting.encryptionKeyId,
      );
    }
    try {
      // the buildEncryptionAlgorithm will build ProtectedDEK which calls unwrapKey  using the masterKey configured in
      // KeyEncryptionKey(created before creating Protected DEK)
      // we get wrapped key and key wrap metadata info from clientEncryptionKeyProperties.
      return await propertySetting.buildEncryptionAlgorithm(
        clientEncryptionKeyProperties,
        this.encryptionManager,
      );
    } catch (err) {
      if (err.code !== StatusCodes.Forbidden) throw err;
      // if access to key is revoked, and in case there's stale value in cache
      clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(
        propertySetting.encryptionKeyId,
      );

      try {
        // This will succeed after if client has rewrapped CEK and gateway cache has updated value.
        return await propertySetting.buildEncryptionAlgorithm(
          clientEncryptionKeyProperties,
          this.encryptionManager,
        );
      } catch (retryErr) {
        if (retryErr.code !== 403) throw retryErr;
        // in case there's stale value in gateway cache. get fresh value from backend
        try {
          clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(
            propertySetting.encryptionKeyId,
            clientEncryptionKeyProperties.etag,
          );
          return await propertySetting.buildEncryptionAlgorithm(
            clientEncryptionKeyProperties,
            this.encryptionManager,
          );
        } catch (finalErr) {
          throw new ErrorResponse(
            `The Client Encryption Key with key id: ${propertySetting.encryptionKeyId} on database: ${this.databaseId} needs to be rewrapped with a valid Key Encryption Key using rewrapClientEncryptionKey. The Key Encryption Key used to wrap the Client Encryption Key has been revoked`,
          );
        }
      }
    }
  }

  private async fetchClientEncryptionKey(
    cekId: string,
    cekEtag?: string,
  ): Promise<ClientEncryptionKeyProperties> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = `/dbs/${this.databaseId}/clientencryptionkeys/${cekId}`;
      const id = `dbs/${this.databaseId}/clientencryptionkeys/${cekId}`;
      const options: RequestOptions = {};
      if (cekEtag) {
        options.accessCondition = { type: "IfNoneMatch", condition: cekEtag };
      }
      const response = await this.clientContext.read<ClientEncryptionKeyRequest>({
        path: path,
        resourceType: ResourceType.clientencryptionkey,
        resourceId: id,
        options: {},
        diagnosticNode,
      });
      const clientEncryptionKeyProperties = new ClientEncryptionKeyProperties(
        response.result.id,
        response.result.encryptionAlgorithm,
        response.result._etag,
        Buffer.from(response.result.wrappedDataEncryptionKey, "base64"),
        response.result.keyWrapMetadata,
      );
      const key = this.databaseId + "/" + cekId;
      this.encryptionManager.clientEncryptionKeyPropertiesCache.setClientEncryptionKeyProperties(
        key,
        clientEncryptionKeyProperties,
      );
      return clientEncryptionKeyProperties;
    }, this.clientContext);
  }
}
