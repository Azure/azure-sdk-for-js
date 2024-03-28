// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionSettings } from "./EncryptionSettings";
import { EncryptionSettingForProperty } from "./EncryptionSettingForProperty";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
import { Container, ItemDefinition } from "../client";
import { Serializer } from "./Serializers/Serializer";
import { BitSerializer, FloatSerializer, NumberSerializer, StringSerializer } from "./Serializers";
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKey";

enum TypeMarker {
  Null = 1,
  Boolean = 2,
  Double = 3,
  Long = 4,
  String = 5,
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class EncryptionProcessor {
  static async encrypt<T extends ItemDefinition>(
    body: T,
    encryptionSettings: EncryptionSettings,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    container: Container,
  ): Promise<T> {
    if (body == null) {
      throw new Error("Input body is null or undefined.");
    }

    for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
      const propertyName = pathToEncrypt.slice(1);
      if (!Object.prototype.hasOwnProperty.call(body, propertyName)) {
        continue;
      }

      const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
      if (settingForProperty == null) {
        throw new Error("Invalid Encryption Setting for the Property: " + propertyName);
      }
      const clientEncryptionKeyProperties =
        await container.getClientEncryptionKeyProperties(pathToEncrypt);
      body[propertyName as keyof T] = await EncryptionProcessor.encryptToken(
        body[propertyName],
        settingForProperty,
        propertyName === "id",
        encryptionKeyStoreProvider,
        clientEncryptionKeyProperties,
      );
    }
    return body;
  }

  static async encryptToken(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    valueToEncrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
  ): Promise<any> {
    if (typeof valueToEncrypt === "object" && valueToEncrypt !== null) {
      for (const key in valueToEncrypt) {
        if (Object.prototype.hasOwnProperty.call(valueToEncrypt, key)) {
          valueToEncrypt[key] = await this.encryptToken(
            valueToEncrypt[key],
            propertySetting,
            isValueId,
            encryptionKeyStoreProvider,
            clientEncryptionKeyProperties,
          );
        }
      }
    } else if (Array.isArray(valueToEncrypt)) {
      for (let i = 0; i < valueToEncrypt.length; i++) {
        valueToEncrypt[i] = await this.encryptToken(
          valueToEncrypt[i],
          propertySetting,
          isValueId,
          encryptionKeyStoreProvider,
          clientEncryptionKeyProperties,
        );
      }
    } else {
      valueToEncrypt = await this.serializeAndEncryptValue(
        valueToEncrypt,
        propertySetting,
        isValueId,
        encryptionKeyStoreProvider,
        clientEncryptionKeyProperties,
      );
    }
    return valueToEncrypt;
  }

  private static async serializeAndEncryptValue(
    valueToEncrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
  ): Promise<string> {
    if (valueToEncrypt === null) {
      return valueToEncrypt;
    }
    const [typeMarker, serializer] = EncryptionProcessor.createSerializer(valueToEncrypt);
    const plainText = serializer.serialize(valueToEncrypt);

    const encryptionAlgorithm: AeadAes256CbcHmacSha256Algorithm =
      await propertySetting.buildEncryptionAlgorithm(
        clientEncryptionKeyProperties,
        encryptionKeyStoreProvider,
      );
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

  public static createSerializer(
    propertyValue: boolean | string | number,
  ): [TypeMarker, Serializer] {
    switch (typeof propertyValue) {
      case "boolean":
        return [TypeMarker.Boolean, BitSerializer.getInstance()];
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

  static async decrypt<T extends ItemDefinition>(
    document: T,
    encryptionSettings: EncryptionSettings,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    container: Container,
  ): Promise<T> {
    if (document == null) {
      return document;
    }
    for (const pathToEncrypt of encryptionSettings.pathsToEncrypt) {
      const propertyName = pathToEncrypt.slice(1);
      if (!Object.prototype.hasOwnProperty.call(document, propertyName)) {
        continue;
      }
      const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(pathToEncrypt);
      if (settingForProperty == null) {
        throw new Error("Invalid Encryption Setting for the Path: " + pathToEncrypt);
      }

      const clientEncryptionKeyProperties =
        await container.getClientEncryptionKeyProperties(pathToEncrypt);
      document[propertyName as keyof T] = await EncryptionProcessor.decryptToken(
        document[propertyName],
        settingForProperty,
        propertyName === "id",
        encryptionKeyStoreProvider,
        clientEncryptionKeyProperties,
      );
    }
    return document;
  }

  private static async decryptToken(
    valueToDecrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
  ): Promise<any> {
    if (typeof valueToDecrypt === "object") {
      for (const key in valueToDecrypt) {
        if (Object.prototype.hasOwnProperty.call(valueToDecrypt, key)) {
          valueToDecrypt[key] = await this.decryptToken(
            valueToDecrypt[key],
            propertySetting,
            isValueId,
            encryptionKeyStoreProvider,
            clientEncryptionKeyProperties,
          );
        }
      }
    } else if (Array.isArray(valueToDecrypt)) {
      for (let i = 0; i < valueToDecrypt.length; i++) {
        valueToDecrypt[i] = await this.decryptToken(
          valueToDecrypt[i],
          propertySetting,
          isValueId,
          encryptionKeyStoreProvider,
          clientEncryptionKeyProperties,
        );
      }
    } else {
      valueToDecrypt = await EncryptionProcessor.deserializeAndDecryptValue(
        valueToDecrypt,
        propertySetting,
        isValueId,
        encryptionKeyStoreProvider,
        clientEncryptionKeyProperties,
      );
    }
    return valueToDecrypt;
  }

  private static async deserializeAndDecryptValue(
    valueToDecrypt: any,
    propertySetting: EncryptionSettingForProperty,
    isValueId: boolean,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
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

    const encryptionAlgorithm = await propertySetting.buildEncryptionAlgorithm(
      clientEncryptionKeyProperties,
      encryptionKeyStoreProvider,
    );
    const plainText = encryptionAlgorithm.decrypt(cipherText);
    if (plainText === null) {
      throw new Error("returned null plain text");
    }

    const serializer = EncryptionProcessor.createDeserializer(
      cipherTextWithTypeMarker[0] as TypeMarker,
    );
    return serializer.deserialize(plainText);
  }

  static createDeserializer(typeMarker: TypeMarker): Serializer {
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
        return BitSerializer.getInstance();
      default:
        throw new Error("Invalid or Unsupported data type passed.");
    }
  }
}
