// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionSettingForProperty } from "./EncryptionSettingForProperty";

/**
 * stores partitionKeyPaths, all the pathsToEncrypt, and encryption settings (cekId, encryption type, and algorithm) for each property.
 * see {@link EncryptionSettingForProperty}
 * @hidden
 */
export class EncryptionSettings {
  public id: string; // databaseRid + '/' + containerRid

  public containerRid: string;

  public partitionKeyPaths: string[];

  public pathsToEncrypt: string[] = [];

  // key is property path
  private encryptionSettingForProperties: { [key: string]: EncryptionSettingForProperty } = {};

  // getContainerRid
  public constructor(id: string, containerRid: string, partitionKeyPaths: string[]) {
    this.id = id;
    this.containerRid = containerRid;
    this.partitionKeyPaths = partitionKeyPaths;
  }

  public setEncryptionSettingForProperty(
    key: string,
    encryptionSettingForProperty: EncryptionSettingForProperty,
  ): void {
    this.encryptionSettingForProperties[key] = encryptionSettingForProperty;
  }

  public getEncryptionSettingForProperty(propertyName: string): EncryptionSettingForProperty {
    return this.encryptionSettingForProperties[propertyName];
  }
}
