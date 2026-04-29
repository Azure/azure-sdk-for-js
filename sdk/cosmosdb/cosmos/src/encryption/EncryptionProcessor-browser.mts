// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ItemDefinition } from "../client/Item/ItemDefinition.js";
import type { PartitionKeyInternal } from "../documents/index.js";
import type { JSONValue } from "../queryExecutionContext/index.js";
import type { TypeMarker } from "./enums/TypeMarker.js";
import type { EncryptionSettings } from "./EncryptionSettings.js";

/**
 * @hidden
 * Client-side Encryption not supported in browser environment.
 */
export class EncryptionProcessor {
  public containerRid: string;

  constructor(
    _containerId: string,
    containerRid: string,
    _database: unknown,
    _clientContext: unknown,
    _encryptionManager: unknown,
  ) {
    this.containerRid = containerRid;
  }

  async encrypt<T extends ItemDefinition>(
    _document: T,
  ): Promise<{ body: T; propertiesEncryptedCount: number }> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async isPathEncrypted(_path: string): Promise<boolean> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async encryptProperty(_path: string, _value: JSONValue): Promise<JSONValue> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async getEncryptedPartitionKeyValue(
    _partitionKeyList: PartitionKeyInternal,
  ): Promise<{ partitionKeyList: PartitionKeyInternal; encryptedCount: number }> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async getEncryptedUrl(_id: string): Promise<string> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async getEncryptedId(_id: string): Promise<string> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async encryptQueryParameter(
    _path: string,
    _value: JSONValue,
    _isValueId: boolean,
    _type?: TypeMarker,
  ): Promise<JSONValue> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async decrypt<T extends ItemDefinition>(
    _document: T,
  ): Promise<{ body: T; propertiesDecryptedCount: number }> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  async getEncryptionSetting(_forceRefresh?: boolean): Promise<EncryptionSettings> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}
