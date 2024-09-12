// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionPolicy } from "./ClientEncryptionPolicy";
import { EncryptionSettingForProperty } from "./EncryptionSettingForProperty";
import { EncryptionType } from "./enums";

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

  public validatePolicyFormatVersion(
    clientEncryptionPolicy: ClientEncryptionPolicy,
    partitionKeyPaths: string[],
  ): void {
    const { policyFormatVersion, includedPaths } = clientEncryptionPolicy;

    if (policyFormatVersion !== 1 && policyFormatVersion !== 2) {
      throw new Error("Invalid policy format version. Only versions 1 and 2 are supported.");
    }

    if (policyFormatVersion === 1) {
      const isPartitionKeyEncrypted = includedPaths.some((path) =>
        partitionKeyPaths.includes(path.path),
      );
      const isIdEncrypted = includedPaths.some((path) => path.path === "/id");
      if (isIdEncrypted || isPartitionKeyEncrypted) {
        throw new Error(
          "Encryption of partition key or id is only supported with policy format version 2.",
        );
      }
    }

    if (policyFormatVersion === 2) {
      const isRandomizedEncryption = includedPaths.some(
        (path) =>
          (partitionKeyPaths.includes(path.path) || path.path === "/id") &&
          path.encryptionType === EncryptionType.RANDOMIZED,
      );
      if (isRandomizedEncryption) {
        throw new Error("Encryption Type must be deterministic for encryption of partition key/id");
      }
    }
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
