// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Represents a KeyVault identifier and its parsed contents.
 */
export interface ParsedKeyVaultSecretsIdentifier {
  /**
   * The type of resource under KeyVault that this identifier is referring to.
   */
  collection: "secrets";

  /**
   * The originally received identifier.
   */
  id: string;

  /**
   * The KeyVault Key unique identifier (an URl).
   */
  vaultUrl: string;

  /**
   * The version of KeyVault Key. May be undefined.
   */
  version?: string;

  /**
   * The name of the KeyVault Key.
   */
  name: string;
}

/**
 * Parser of the KeyVaultIdentifier for the KeyVault Keys Client.
 */
export class KeyVaultSecretsIdentifier implements ParsedKeyVaultSecretsIdentifier {
  /**
   * The type of resource under KeyVault that this identifier is referring to.
   */
  collection: "secrets";

  /**
   * The originally received identifier.
   */
  public id: string;

  /**
   * The KeyVault Key unique identifier (an URl).
   */
  public vaultUrl: string;

  /**
   * The version of KeyVault Key. May be undefined.
   */
  public version?: string;

  /**
   * The name of the KeyVault Key.
   */
  public name: string;

  constructor(url: string) {
    const collection = "secrets";
    const coreParsedIdentifier = parseKeyvaultIdentifier(collection, url);

    this.collection = collection;
    this.id = url;
    this.vaultUrl = coreParsedIdentifier.vaultUrl;
    this.version = coreParsedIdentifier.version;
    this.name = coreParsedIdentifier.name;
  }
}
