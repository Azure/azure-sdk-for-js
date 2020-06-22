// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultKeysIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   * In this case, only "keys" is valid.
   */
  collection: "keys";

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
   * In this case, only "keys" is valid.
   */
  collection: "keys";

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

  constructor(url: string) {
    const collection = "keys";
    const coreParsedIdentifier = parseKeyvaultIdentifier(collection, url);

    this.collection = collection;
    this.id = url;
    this.vaultUrl = coreParsedIdentifier.vaultUrl;
    this.version = coreParsedIdentifier.version;
    this.name = coreParsedIdentifier.name;
  }
}
