import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Represents a KeyVault identifier and its parsed contents.
 */
export interface ParsedKeyVaultIdentifier {
  /**
   * The type of resource under KeyVault that this identifier is referring to.
   */
  collection: "keys" | "secrets" | "certificates";

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
export class KeyVaultIdentifier implements ParsedKeyVaultIdentifier {
  /**
   * The type of resource under KeyVault that this identifier is referring to.
   */
  collection: "keys" | "secrets" | "certificates";

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
    const coreParsedIdentifier = parseKeyvaultIdentifier("keys", url);

    this.collection = "keys";
    this.vaultUrl = coreParsedIdentifier.vaultUrl;
    this.version = coreParsedIdentifier.version;
    this.name = coreParsedIdentifier.name;
  }
}
