// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionPolicy } from "./ClientEncryptionPolicy";
import { EncryptionSettingForProperty } from "./EncryptionSettingForProperty";

export class EncryptionSettings {
  public id: string;

  public partitionKeyPaths: string[];

  public pathsToEncrypt: string[] = [];

  private encryptionSettingForProperties: { [key: string]: EncryptionSettingForProperty } = {};

  private constructor(id: string, partitionKeyPaths: string[]) {
    this.id = id;
    this.partitionKeyPaths = partitionKeyPaths;
  }

  public static create(
    id: string,
    partitionKeyPaths: string[],
    clientEncryptionPolicy: ClientEncryptionPolicy,
  ): EncryptionSettings {
    const encryptionSettings = new EncryptionSettings(id, partitionKeyPaths);
    //TODO: basic checks on clientEncryptionPolicy

    for (const includedPath of clientEncryptionPolicy.includedPaths) {
      const encryptionSettingForProperty = new EncryptionSettingForProperty(includedPath);
      encryptionSettings.setEncryptionProperty(includedPath.path, encryptionSettingForProperty);
    }
    return encryptionSettings;
  }

  private setEncryptionProperty(
    key: string,
    encryptionSettingForProperty: EncryptionSettingForProperty,
  ) {
    this.encryptionSettingForProperties[key] = encryptionSettingForProperty;
  }
}
