// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Valid collection names for Key Vault Key identifiers.
 */
export type KeyVaultKeysIdentifierCollectionName = "keys" | "deletedkeys";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultKeysIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultKeysIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  id: string;

  /**
   * The Key Vault Key unique identifier (an URl).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Key. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Key.
   */
  name: string;
}

/**
 * Parser of the KeyVaultKeysIdentifier for the Key Vault Keys Client.
 */
export class KeyVaultKeysIdentifier implements ParsedKeyVaultKeysIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultKeysIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  public id: string;

  /**
   * The KeyVault Key unique identifier (an URl).
   */
  public vaultUrl: string;

  /**
   * The version of KeyVault Key. Might be undefined.
   */
  public version?: string;

  /**
   * The name of the KeyVault Key.
   */
  public name: string;

  /**
   * Parses a Key Vault identifier.
   * @param url Key Vault identifier
   */
  constructor(url: string) {
    const collections: KeyVaultKeysIdentifierCollectionName[] = ["keys", "deletedkeys"];
    const urlParts = url.split("/");
    const collection: KeyVaultKeysIdentifierCollectionName =
      collections.filter((x) => urlParts.includes(x))[0] || "keys";

    this.collection = collection;
    this.id = url;

    const { vaultUrl, name, version } = parseKeyvaultIdentifier(collection, url);

    this.vaultUrl = vaultUrl;
    this.name = name;
    this.version = version;
  }
}
