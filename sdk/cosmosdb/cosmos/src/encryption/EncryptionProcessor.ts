// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionSettings } from "./EncryptionSettings";
import { EncryptionSettingForProperty } from "./EncryptionSettingForProperty";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm";
import { ContainerDefinition, ItemDefinition } from "../client";
import { Serializer } from "./Serializers/Serializer";
import {
  BooleanSerializer,
  FloatSerializer,
  NumberSerializer,
  StringSerializer,
} from "./Serializers";
import { ClientEncryptionKeyPropertiesCache, EncryptionSettingsCache } from "./Cache";
import { PartitionKeyInternal } from "../documents";
import { TypeMarker } from "./enums/TypeMarker";
import {
  ClientContext,
  ClientEncryptionKeyProperties,
  ClientEncryptionKeyRequest,
  DiagnosticNodeInternal,
  RequestOptions,
  ResourceType,
} from "..";
import { withDiagnostics } from "../utils/diagnostics";

export class EncryptionProcessor {
  constructor(
    private readonly containerId: string,
    private readonly databaseId: string,
    private readonly clientContext: ClientContext,
  ) {}

  async encrypt<T extends ItemDefinition>(body: T): Promise<T> {
    if (!body) {
      throw new Error("Input body is null or undefined.");
    }

    const encryptionSettings = await this.getEncryptionSetting();
    for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
      const propertyName = pathToEncrypt.slice(1);
      if (!Object.prototype.hasOwnProperty.call(body, propertyName)) {
        continue;
      }

      const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
      if (!settingForProperty) {
        throw new Error("Invalid Encryption Setting for the Property: " + propertyName);
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
    const encryptionSettings = await this.getEncryptionSetting();
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
    const partitionKeyPaths = encryptionSettings.partitionKeyPaths;
    for (let i = 0; i < partitionKeyPaths.length; i++) {
      const partitionKeyPath = EncryptionProcessor.extractPartitionKeyPath(partitionKeyPaths[i]);
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
    const settingForProperty = encryptionSettings.getEncryptionSettingForProperty("/id");

    if (!settingForProperty) return id;
    id = await this.encryptToken(id, settingForProperty, true);
    return id;
  }

  static extractPartitionKeyPath(path: string): string {
    const secondSlashIndex = path.indexOf("/", path.indexOf("/") + 1);
    return secondSlashIndex === -1 ? path : path.substring(0, secondSlashIndex);
  }

  private async encryptToken(
    valueToEncrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
  ): Promise<any> {
    if (typeof valueToEncrypt === "object" && valueToEncrypt !== null) {
      for (const key in valueToEncrypt) {
        if (Object.prototype.hasOwnProperty.call(valueToEncrypt, key)) {
          valueToEncrypt[key] = await this.encryptToken(
            valueToEncrypt[key],
            propertySetting,
            isValueId,
          );
        }
      }
    } else if (Array.isArray(valueToEncrypt)) {
      for (let i = 0; i < valueToEncrypt.length; i++) {
        valueToEncrypt[i] = await this.encryptToken(valueToEncrypt[i], propertySetting, isValueId);
      }
    } else {
      valueToEncrypt = await this.serializeAndEncryptValue(
        valueToEncrypt,
        propertySetting,
        isValueId,
      );
    }
    return valueToEncrypt;
  }

  async serializeAndEncryptQueryParameter(
    path: string,
    value: any,
    typeMarker: TypeMarker,
    isValueId: boolean,
  ): Promise<string> {
    if (value === null) {
      return value;
    }
    const encryptionSettings = await this.getEncryptionSetting();
    const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(path);
    if (!settingForProperty) {
      return value;
    }
    let serializer: Serializer;
    switch (typeMarker) {
      case TypeMarker.Boolean:
        serializer = BooleanSerializer.getInstance();
        break;
      case TypeMarker.String:
        serializer = StringSerializer.getInstance();
        break;
      case TypeMarker.Double:
        serializer = FloatSerializer.getInstance();
        break;
      case TypeMarker.Long:
        serializer = NumberSerializer.getInstance();
        break;
      default:
        throw new Error("Invalid or Unsupported data type passed.");
    }
    const plainText = serializer.serialize(value);
    const encryptionAlgorithm = await this.buildEncryptionAlgorithm(settingForProperty);
    const cipherText = encryptionAlgorithm.encrypt(plainText);
    if (isValueId) {
      if (typeof value !== "string") {
        throw new Error("The id should be of string type.");
      }
    }

    const cipherTextWithTypeMarker = Buffer.alloc(cipherText.length + 1);
    cipherTextWithTypeMarker[0] = typeMarker;
    cipherText.forEach((val, index) => {
      cipherTextWithTypeMarker[index + 1] = val;
    });

    let encryptedValue = Buffer.from(cipherTextWithTypeMarker).toString("base64");
    if (isValueId) {
      encryptedValue = encryptedValue.replace(/\//g, "_").replace(/\+/g, "-");
    }
    return encryptedValue;
  }

  private async serializeAndEncryptValue(
    valueToEncrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
  ): Promise<string> {
    if (valueToEncrypt === null) {
      return valueToEncrypt;
    }
    const [typeMarker, serializer] = EncryptionProcessor.createSerializer(valueToEncrypt);
    const plainText = serializer.serialize(valueToEncrypt);

    const encryptionAlgorithm = await this.buildEncryptionAlgorithm(propertySetting);
    const cipherText = encryptionAlgorithm.encrypt(plainText);

    if (isValueId) {
      if (typeof valueToEncrypt !== "string") {
        throw new Error("The id should be of string type.");
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

  private static createSerializer(
    propertyValue: boolean | string | number,
  ): [TypeMarker, Serializer] {
    switch (typeof propertyValue) {
      case "boolean":
        return [TypeMarker.Boolean, BooleanSerializer.getInstance()];
      case "string":
        return [TypeMarker.String, StringSerializer.getInstance()];
      case "number":
        if (!Number.isInteger(propertyValue)) {
          return [TypeMarker.Double, FloatSerializer.getInstance()];
        } else {
          return [TypeMarker.Long, NumberSerializer.getInstance()];
        }
      default:
        throw new Error("Invalid or Unsupported data type passed.");
    }
  }

  async decrypt<T extends ItemDefinition>(body: T): Promise<T> {
    if (body == null) {
      return body;
    }
    const encryptionSettings = await this.getEncryptionSetting();
    for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
      const propertyName = pathToEncrypt.slice(1);
      if (!Object.prototype.hasOwnProperty.call(body, propertyName)) {
        continue;
      }
      const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
      if (settingForProperty == null) {
        throw new Error("Invalid Encryption Setting for the Path: " + pathToEncrypt);
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
    valueToDecrypt: any,
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
      throw new Error("returned null plain text");
    }

    const serializer = EncryptionProcessor.createDeserializer(
      cipherTextWithTypeMarker[0] as TypeMarker,
    );
    return serializer.deserialize(plainText);
  }

  private static createDeserializer(typeMarker: TypeMarker): Serializer {
    switch (typeMarker) {
      case TypeMarker.Long: {
        // return instance
        return NumberSerializer.getInstance();
      }
      case TypeMarker.Double:
        return FloatSerializer.getInstance();
      case TypeMarker.String:
        return StringSerializer.getInstance();
      case TypeMarker.Boolean:
        return BooleanSerializer.getInstance();
      default:
        throw new Error("Invalid or Unsupported data type passed.");
    }
  }

  private async getEncryptionSetting(): Promise<EncryptionSettings> {
    const key = this.databaseId + "/" + this.containerId;
    const encryptionSettingsCache = EncryptionSettingsCache.getInstance();
    const encryptionSetting = encryptionSettingsCache.getEncryptionSettings(key);
    if (!encryptionSetting) {
      return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
        const path = `/dbs/${this.databaseId}/colls/${this.containerId}`;
        const id = `dbs/${this.databaseId}/colls/${this.containerId}`;
        const response = await this.clientContext.read<ContainerDefinition>({
          path,
          resourceType: ResourceType.container,
          resourceId: id,
          diagnosticNode,
        });
        const clientEncryptionPolicy = response.result.clientEncryptionPolicy;
        const partitionKeyPaths = response.result.partitionKey.paths;
        const updatedEncryptionSetting = EncryptionSettings.create(
          key,
          partitionKeyPaths,
          clientEncryptionPolicy,
        );
        encryptionSettingsCache.setEncryptionSettings(key, updatedEncryptionSetting);
        return updatedEncryptionSetting;
      }, this.clientContext);
    }
    return encryptionSetting;
  }

  private async buildEncryptionAlgorithm(
    propertySetting: EncryptionSettingForProperty,
  ): Promise<AeadAes256CbcHmacSha256Algorithm> {
    const key = this.databaseId + "/" + propertySetting.encryptionKeyId;
    const clientEncryptionKeyPropertiesCache = ClientEncryptionKeyPropertiesCache.getInstance();
    let clientEncryptionKeyProperties =
      clientEncryptionKeyPropertiesCache.getClientEncryptionKeyProperties(key);
    if (!clientEncryptionKeyProperties) {
      clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(
        propertySetting.encryptionKeyId,
      );
    }
    let encryptionAlgorithm: AeadAes256CbcHmacSha256Algorithm;
    try {
      encryptionAlgorithm = await propertySetting.buildEncryptionAlgorithm(
        clientEncryptionKeyProperties,
        this.clientContext.encryptionKeyStoreProvider,
      );
    } catch {
      // stale value in local cache
      clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(
        propertySetting.encryptionKeyId,
      );
      try {
        encryptionAlgorithm = await propertySetting.buildEncryptionAlgorithm(
          clientEncryptionKeyProperties,
          this.clientContext.encryptionKeyStoreProvider,
        );
      } catch {
        // stale value in gateway cache. fetch from backend
        clientEncryptionKeyProperties = await this.fetchClientEncryptionKey(
          propertySetting.encryptionKeyId,
          clientEncryptionKeyProperties.etag,
        );
        try {
          encryptionAlgorithm = await propertySetting.buildEncryptionAlgorithm(
            clientEncryptionKeyProperties,
            this.clientContext.encryptionKeyStoreProvider,
          );
        } catch {
          throw new Error(
            "The Client Encryption Key with key id: " +
              propertySetting.encryptionKeyId +
              "on database: " +
              this.databaseId +
              "needs to be rewrapped with a valid Key Encryption Key using rewrapClientEncryptionKey." +
              " The Key Encryption Key used to wrap the Client Encryption Key has been revoked",
          );
        }
      }
    }
    return encryptionAlgorithm;
  }

  private async fetchClientEncryptionKey(
    cekId: string,
    cekEtag?: string,
  ): Promise<ClientEncryptionKeyProperties> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = `/dbs/${this.databaseId}/clientencryptionkeys/${cekId}`;
      const id = `dbs/${this.databaseId}/clientencryptionkeys/${cekId}`;
      let options: RequestOptions;
      if (cekEtag) {
        options.accessCondition.type = "IfNoneMatch";
        options.accessCondition.condition = cekEtag;
      }
      const response = await this.clientContext.read<ClientEncryptionKeyRequest>({
        path: path,
        resourceType: ResourceType.clientencryptionkey,
        resourceId: id,
        options: {},
        diagnosticNode,
      });
      const clientEncryptionKeyPropertiesCache = ClientEncryptionKeyPropertiesCache.getInstance();
      const clientEncryptionKeyProperties = new ClientEncryptionKeyProperties(
        response.result.id,
        response.result.encryptionAlgorithm,
        response.result._etag,
        Buffer.from(response.result.wrappedDataEncryptionKey, "base64"),
        response.result.keyWrapMetadata,
      );
      const key = this.databaseId + "/" + cekId;
      clientEncryptionKeyPropertiesCache.setClientEncryptionKeyProperties(
        key,
        clientEncryptionKeyProperties,
      );
      return clientEncryptionKeyProperties;
    }, this.clientContext);
  }
}
