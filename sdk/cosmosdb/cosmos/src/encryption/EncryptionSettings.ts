// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionSettingForProperty } from "./EncryptionSettingForProperty";

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

  public setEncryptionProperty(
    key: string,
    encryptionSettingForProperty: EncryptionSettingForProperty,
  ): void {
    this.encryptionSettingForProperties[key] = encryptionSettingForProperty;
  }

  public getEncryptionSettingForProperty(propertyName: string): EncryptionSettingForProperty {
    return this.encryptionSettingForProperties[propertyName];
  }
}
