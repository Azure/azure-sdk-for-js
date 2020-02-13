import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Represents a KeyVault identifier and its parsed contents.
 */
export interface ParsedKeyVaultIdentifier {
  /**
   * The ID of the KeyVault Key.
   */
  id: string;

  /**
   * The KeyVault's URI.
   */
  vaultUri: string;

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
 * What collections the KeyVaultIdentifer can receive.
 */
export type KeyVaultIdentifierCollections = "keys" | "secrets" | "certificates";

/**
 * Parser of the KeyVaultIdentifier.
 */
export class KeyVaultIdentifier implements ParsedKeyVaultIdentifier {
  /**
   * The ID of the KeyVault Key.
   */
  public id: string;

  /**
   * The KeyVault's URI.
   */
  public vaultUri: string;

  /**
   * The version of KeyVault Key. May be undefined.
   */
  public version?: string;

  /**
   * The name of the KeyVault Key.
   */
  public name: string;

  constructor(collection: KeyVaultIdentifierCollections, identifier: string) {
    const coreParsedIdentifier = parseKeyvaultIdentifier(collection, identifier);

    this.id = identifier;
    this.vaultUri = coreParsedIdentifier.vaultUrl;
    this.version = coreParsedIdentifier.version;
    this.name = coreParsedIdentifier.name;
  }
}
