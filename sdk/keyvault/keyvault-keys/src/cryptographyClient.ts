// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import type {
  CryptographyClientOptions,
  GetKeyOptions,
  JsonWebKey,
  KeyOperation,
  KeyVaultKey,
} from "./keysModels.js";
import { KnownKeyOperations } from "./keysModels.js";
import type {
  AesCbcEncryptParameters,
  AesCbcEncryptionAlgorithm,
  CryptographyClientKey,
  DecryptOptions,
  DecryptParameters,
  DecryptResult,
  EncryptOptions,
  EncryptParameters,
  EncryptResult,
  EncryptionAlgorithm,
  KeyWrapAlgorithm,
  SignOptions,
  SignResult,
  SignatureAlgorithm,
  UnwrapKeyOptions,
  UnwrapResult,
  VerifyOptions,
  VerifyResult,
  WrapKeyOptions,
  WrapResult,
} from "./cryptographyClientModels.js";
import { RemoteCryptographyProvider } from "./cryptography/remoteCryptographyProvider.js";
import { randomBytes } from "./cryptography/crypto.js";
import type { CryptographyProvider, CryptographyProviderOperation } from "./cryptography/models.js";
import { RsaCryptographyProvider } from "./cryptography/rsaCryptographyProvider.js";
import { AesCryptographyProvider } from "./cryptography/aesCryptographyProvider.js";
import { tracingClient } from "./tracing.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { logger } from "./logger.js";

/**
 * A client used to perform cryptographic operations on an Azure Key vault key
 * or a local {@link JsonWebKey}.
 */
export class CryptographyClient {
  /**
   * The key the CryptographyClient currently holds.
   */
  private key: CryptographyClientKey;

  /**
   * The remote provider, which would be undefined if used in local mode.
   */
  private remoteProvider?: RemoteCryptographyProvider;

  /**
   * Constructs a new instance of the Cryptography client for the given key
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateCryptographyClient
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * // Create or retrieve a key from the keyvault
   * const myKey = await client.createKey("MyKey", "RSA");
   *
   * // Lastly, create our cryptography client and connect to the service
   * const cryptographyClient = new CryptographyClient(myKey, credential);
   * ```
   * @param key - The key to use during cryptography tasks. You can also pass the identifier of the key i.e its url here.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param pipelineOptions - Pipeline options used to configure Key Vault API requests.
   *                          Omit this parameter to use the default pipeline configuration.
   */
  constructor(
    key: string | KeyVaultKey,
    credential: TokenCredential,
    pipelineOptions?: CryptographyClientOptions,
  );
  /**
   * Constructs a new instance of the Cryptography client for the given key in local mode.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateCryptographyClientLocal
   * import { CryptographyClient } from "@azure/keyvault-keys";
   *
   * const jsonWebKey = {
   *   kty: "RSA",
   *   kid: "test-key-123",
   *   use: "sig",
   *   alg: "RS256",
   *   n: new Uint8Array([112, 34, 56, 98, 123, 244, 200, 99]),
   *   e: new Uint8Array([1, 0, 1]),
   *   d: new Uint8Array([45, 67, 89, 23, 144, 200, 76, 233]),
   *   p: new Uint8Array([34, 89, 100, 77, 204, 56, 29, 77]),
   *   q: new Uint8Array([78, 99, 201, 45, 188, 34, 67, 90]),
   *   dp: new Uint8Array([23, 45, 78, 56, 200, 144, 32, 67]),
   *   dq: new Uint8Array([12, 67, 89, 144, 99, 56, 23, 45]),
   *   qi: new Uint8Array([78, 90, 45, 201, 34, 67, 120, 55]),
   * };
   * const client = new CryptographyClient(jsonWebKey);
   * ```
   * @param key - The JsonWebKey to use during cryptography operations.
   */
  constructor(key: JsonWebKey);
  /**
   * Internal constructor implementation for either local or Key Vault backed keys.
   * @param key - The key to use during cryptography tasks.
   * @param credential - Teh credential to use when constructing a Key Vault Cryptography client.
   */
  constructor(
    key: string | KeyVaultKey | JsonWebKey,
    credential?: TokenCredential,
    pipelineOptions: CryptographyClientOptions = {},
  ) {
    if (typeof key === "string") {
      // Key URL for remote-local operations.
      this.key = {
        kind: "identifier",
        value: key,
      };
      this.remoteProvider = new RemoteCryptographyProvider(key, credential!, pipelineOptions);
    } else if ("name" in key) {
      // KeyVault key for remote-local operations.
      this.key = {
        kind: "KeyVaultKey",
        value: key,
      };
      this.remoteProvider = new RemoteCryptographyProvider(key, credential!, pipelineOptions);
    } else {
      // JsonWebKey for local-only operations.
      this.key = {
        kind: "JsonWebKey",
        value: key,
      };
    }
  }

  /**
   * The base URL to the vault. If a local {@link JsonWebKey} is used vaultUrl will be empty.
   */
  get vaultUrl(): string {
    return this.remoteProvider?.vaultUrl || "";
  }

  /**
   * The ID of the key used to perform cryptographic operations for the client.
   */
  get keyID(): string | undefined {
    if (this.key.kind === "identifier" || this.key.kind === "remoteOnlyIdentifier") {
      return this.key.value;
    } else if (this.key.kind === "KeyVaultKey") {
      return this.key.value.id;
    } else {
      return this.key.value.kid;
    }
  }

  /**
   * Encrypts the given plaintext with the specified encryption parameters.
   * Depending on the algorithm set in the encryption parameters, the set of possible encryption parameters will change.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleEncrypt
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey.id, credential);
   *
   * const encryptResult = await cryptographyClient.encrypt({
   *   algorithm: "RSA1_5",
   *   plaintext: Buffer.from("My Message"),
   * });
   * console.log("encrypt result: ", encryptResult.result);
   * ```
   * @param encryptParameters - The encryption parameters, keyed on the encryption algorithm chosen.
   * @param options - Additional options.
   */
  public encrypt(
    encryptParameters: EncryptParameters,
    options?: EncryptOptions,
  ): Promise<EncryptResult>;
  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleEncrypt
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey.id, credential);
   *
   * const encryptResult = await cryptographyClient.encrypt({
   *   algorithm: "RSA1_5",
   *   plaintext: Buffer.from("My Message"),
   * });
   * console.log("encrypt result: ", encryptResult.result);
   * ```
   * @param algorithm - The algorithm to use.
   * @param plaintext - The text to encrypt.
   * @param options - Additional options.
   * @deprecated Use `encrypt({ algorithm, plaintext }, options)` instead.
   */
  public encrypt(
    algorithm: EncryptionAlgorithm,
    plaintext: Uint8Array,
    options?: EncryptOptions,
  ): Promise<EncryptResult>;
  public encrypt(
    ...args:
      | [EncryptParameters, EncryptOptions?]
      | [EncryptionAlgorithm, Uint8Array, EncryptOptions?]
  ): Promise<EncryptResult> {
    const [parameters, options] = this.disambiguateEncryptArguments(args);
    return tracingClient.withSpan("CryptographyClient.encrypt", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Encrypt);
      this.initializeIV(parameters);
      const provider = await this.getProvider("encrypt", parameters.algorithm, updatedOptions);
      try {
        return provider.encrypt(parameters, updatedOptions);
      } catch (error: any) {
        if (this.remoteProvider) {
          return this.remoteProvider.encrypt(parameters, updatedOptions);
        }
        throw error;
      }
    });
  }

  private initializeIV(parameters: EncryptParameters): void {
    // For AES-GCM the service **must** generate the IV, so we only populate it for AES-CBC
    const algorithmsRequiringIV: AesCbcEncryptionAlgorithm[] = [
      "A128CBC",
      "A128CBCPAD",
      "A192CBC",
      "A192CBCPAD",
      "A256CBC",
      "A256CBCPAD",
    ];

    if (parameters.algorithm in algorithmsRequiringIV) {
      try {
        const cbcParams = parameters as AesCbcEncryptParameters;
        if (!cbcParams.iv) {
          cbcParams.iv = randomBytes(16);
        }
      } catch (e: any) {
        throw new Error(
          `Unable to initialize IV for algorithm ${parameters.algorithm}. You may pass a valid IV to avoid this error. Error: ${e.message}`,
        );
      }
    }
  }

  /**
   * Standardizes the arguments of multiple overloads into a single shape.
   * @param args - The encrypt arguments
   */
  private disambiguateEncryptArguments(
    args: [EncryptParameters, EncryptOptions?] | [string, Uint8Array, EncryptOptions?],
  ): [EncryptParameters, EncryptOptions] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", buffer, options]
      return [
        {
          algorithm: args[0],
          plaintext: args[1],
        } as EncryptParameters,
        args[2] || {},
      ];
    } else {
      // Sample shape: [{ algorithm: "RSA1_5", plaintext: buffer }, options]
      return [args[0], (args[1] || {}) as EncryptOptions];
    }
  }

  /**
   * Decrypts the given ciphertext with the specified decryption parameters.
   * Depending on the algorithm used in the decryption parameters, the set of possible decryption parameters will change.
   *
   * Microsoft recommends you not use CBC without first ensuring the integrity of the ciphertext using, for example, an HMAC. See https://learn.microsoft.com/dotnet/standard/security/vulnerabilities-cbc-mode for more information.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleDecrypt
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey.id, credential);
   *
   * const encryptResult = await cryptographyClient.encrypt({
   *   algorithm: "RSA1_5",
   *   plaintext: Buffer.from("My Message"),
   * });
   * console.log("encrypt result: ", encryptResult.result);
   *
   * const decryptResult = await cryptographyClient.decrypt({
   *   algorithm: "RSA1_5",
   *   ciphertext: encryptResult.result,
   * });
   * console.log("decrypt result: ", decryptResult.result.toString());
   * ```
   * @param decryptParameters - The decryption parameters.
   * @param options - Additional options.
   */
  public async decrypt(
    decryptParameters: DecryptParameters,
    options?: DecryptOptions,
  ): Promise<DecryptResult>;
  /**
   * Decrypts the given ciphertext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleDecrypt
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey.id, credential);
   *
   * const encryptResult = await cryptographyClient.encrypt({
   *   algorithm: "RSA1_5",
   *   plaintext: Buffer.from("My Message"),
   * });
   * console.log("encrypt result: ", encryptResult.result);
   *
   * const decryptResult = await cryptographyClient.decrypt({
   *   algorithm: "RSA1_5",
   *   ciphertext: encryptResult.result,
   * });
   * console.log("decrypt result: ", decryptResult.result.toString());
   * ```
   *
   * Microsoft recommends you not use CBC without first ensuring the integrity of the ciphertext using, for example, an HMAC. See https://learn.microsoft.com/dotnet/standard/security/vulnerabilities-cbc-mode for more information.
   *
   * @param algorithm - The algorithm to use.
   * @param ciphertext - The text to decrypt.
   * @param options - Additional options.
   * @deprecated Use `decrypt({ algorithm, ciphertext }, options)` instead.
   */
  public decrypt(
    algorithm: EncryptionAlgorithm,
    ciphertext: Uint8Array,
    options?: DecryptOptions,
  ): Promise<DecryptResult>;
  public decrypt(
    ...args:
      | [DecryptParameters, DecryptOptions?]
      | [EncryptionAlgorithm, Uint8Array, DecryptOptions?]
  ): Promise<DecryptResult> {
    const [parameters, options] = this.disambiguateDecryptArguments(args);

    return tracingClient.withSpan("CryptographyClient.decrypt", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Decrypt);
      const provider = await this.getProvider("decrypt", parameters.algorithm, updatedOptions);
      try {
        return provider.decrypt(parameters, updatedOptions);
      } catch (error: any) {
        if (this.remoteProvider) {
          return this.remoteProvider.decrypt(parameters, updatedOptions);
        }
        throw error;
      }
    });
  }

  /**
   * Standardizes the arguments of multiple overloads into a single shape.
   * @param args - The decrypt arguments
   */
  private disambiguateDecryptArguments(
    args: [DecryptParameters, DecryptOptions?] | [string, Uint8Array, DecryptOptions?],
  ): [DecryptParameters, DecryptOptions] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", encryptedBuffer, options]
      return [
        {
          algorithm: args[0],
          ciphertext: args[1],
        } as DecryptParameters,
        args[2] || {},
      ];
    } else {
      // Sample shape: [{ algorithm: "RSA1_5", ciphertext: encryptedBuffer }, options]
      return [args[0], (args[1] || {}) as DecryptOptions];
    }
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleWrapKey
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey, credential);
   *
   * const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
   * console.log("wrap result:", wrapResult.result);
   * ```
   * @param algorithm - The encryption algorithm to use to wrap the given key.
   * @param key - The key to wrap.
   * @param options - Additional options.
   */
  public wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options: WrapKeyOptions = {},
  ): Promise<WrapResult> {
    return tracingClient.withSpan("CryptographyClient.wrapKey", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.WrapKey);
      const provider = await this.getProvider("wrapKey", algorithm, updatedOptions);
      try {
        return provider.wrapKey(algorithm, key, updatedOptions);
      } catch (err: any) {
        if (this.remoteProvider) {
          return this.remoteProvider.wrapKey(algorithm, key, options);
        }
        throw err;
      }
    });
  }

  /**
   * Unwraps the given wrapped key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleUnwrapKey
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey, credential);
   *
   * const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
   * console.log("wrap result:", wrapResult.result);
   *
   * const unwrapResult = await cryptographyClient.unwrapKey("RSA-OAEP", wrapResult.result);
   * console.log("unwrap result: ", unwrapResult.result);
   * ```
   * @param algorithm - The decryption algorithm to use to unwrap the key.
   * @param encryptedKey - The encrypted key to unwrap.
   * @param options - Additional options.
   */
  public unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions = {},
  ): Promise<UnwrapResult> {
    return tracingClient.withSpan(
      "CryptographyClient.unwrapKey",
      options,
      async (updatedOptions) => {
        this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.UnwrapKey);
        const provider = await this.getProvider("unwrapKey", algorithm, updatedOptions);
        try {
          return provider.unwrapKey(algorithm, encryptedKey, updatedOptions);
        } catch (err: any) {
          if (this.remoteProvider) {
            return this.remoteProvider.unwrapKey(algorithm, encryptedKey, options);
          }
          throw err;
        }
      },
    );
  }

  /**
   * Cryptographically sign the digest of a message
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleSign
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   * import { createHash } from "node:crypto";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * let myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey, credential);
   *
   * const signatureValue = "MySignature";
   * const hash = createHash("sha256");
   *
   * const digest = hash.update(signatureValue).digest();
   * console.log("digest: ", digest);
   *
   * const signResult = await cryptographyClient.sign("RS256", digest);
   * console.log("sign result: ", signResult.result);
   * ```
   * @param algorithm - The signing algorithm to use.
   * @param digest - The digest of the data to sign.
   * @param options - Additional options.
   */
  public sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions = {},
  ): Promise<SignResult> {
    return tracingClient.withSpan("CryptographyClient.sign", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Sign);
      const provider = await this.getProvider("sign", algorithm, updatedOptions);
      try {
        return provider.sign(algorithm, digest, updatedOptions);
      } catch (err: any) {
        if (this.remoteProvider) {
          return this.remoteProvider.sign(algorithm, digest, updatedOptions);
        }
        throw err;
      }
    });
  }

  /**
   * Verify the signed message digest
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleVerify
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   * import { createHash } from "node:crypto";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey, credential);
   *
   * const hash = createHash("sha256");
   * hash.update("My Message");
   * const digest = hash.digest();
   *
   * const signResult = await cryptographyClient.sign("RS256", digest);
   * console.log("sign result: ", signResult.result);
   *
   * const verifyResult = await cryptographyClient.verify("RS256", digest, signResult.result);
   * console.log("verify result: ", verifyResult.result);
   * ```
   * @param algorithm - The signing algorithm to use to verify with.
   * @param digest - The digest to verify.
   * @param signature - The signature to verify the digest against.
   * @param options - Additional options.
   */
  public verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {},
  ): Promise<VerifyResult> {
    return tracingClient.withSpan("CryptographyClient.verify", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Verify);
      const provider = await this.getProvider("verify", algorithm, updatedOptions);
      try {
        return provider.verify(algorithm, digest, signature, updatedOptions);
      } catch (err: any) {
        if (this.remoteProvider) {
          return this.remoteProvider.verify(algorithm, digest, signature, updatedOptions);
        }
        throw err;
      }
    });
  }

  /**
   * Cryptographically sign a block of data
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleSignData
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey, credential);
   *
   * const signResult = await cryptographyClient.signData("RS256", Buffer.from("My Message"));
   * console.log("sign result: ", signResult.result);
   * ```
   * @param algorithm - The signing algorithm to use.
   * @param data - The data to sign.
   * @param options - Additional options.
   */
  public signData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: SignOptions = {},
  ): Promise<SignResult> {
    return tracingClient.withSpan(
      "CryptographyClient.signData",
      options,
      async (updatedOptions) => {
        this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Sign);
        const provider = await this.getProvider("signData", algorithm, updatedOptions);
        try {
          return provider.signData(algorithm, data, updatedOptions);
        } catch (err: any) {
          if (this.remoteProvider) {
            return this.remoteProvider.signData(algorithm, data, options);
          }
          throw err;
        }
      },
    );
  }

  /**
   * Verify the signed block of data
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleVerifyData
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const vaultName = "<YOUR KEYVAULT NAME>";
   * const url = `https://${vaultName}.vault.azure.net`;
   *
   * const client = new KeyClient(url, credential);
   *
   * const myKey = await client.createKey("MyKey", "RSA");
   * const cryptographyClient = new CryptographyClient(myKey, credential);
   *
   * const buffer = Buffer.from("My Message");
   *
   * const signResult = await cryptographyClient.signData("RS256", buffer);
   * console.log("sign result: ", signResult.result);
   *
   * const verifyResult = await cryptographyClient.verifyData("RS256", buffer, signResult.result);
   * console.log("verify result: ", verifyResult.result);
   * ```
   * @param algorithm - The algorithm to use to verify with.
   * @param data - The signed block of data to verify.
   * @param signature - The signature to verify the block against.
   * @param options - Additional options.
   */
  public verifyData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: VerifyOptions = {},
  ): Promise<VerifyResult> {
    return tracingClient.withSpan(
      "CryptographyClient.verifyData",
      options,
      async (updatedOptions) => {
        this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Verify);
        const provider = await this.getProvider("verifyData", algorithm, updatedOptions);
        try {
          return provider.verifyData(algorithm, data, signature, updatedOptions);
        } catch (err: any) {
          if (this.remoteProvider) {
            return this.remoteProvider.verifyData(algorithm, data, signature, updatedOptions);
          }
          throw err;
        }
      },
    );
  }

  /**
   * Retrieves the {@link JsonWebKey} from the Key Vault, if possible. Returns undefined if the key could not be retrieved due to insufficient permissions.
   * @param options - The additional options.
   */
  private async getKeyMaterial(options: GetKeyOptions): Promise<JsonWebKey | undefined> {
    const key = await this.fetchKey(options);

    switch (key.kind) {
      case "JsonWebKey":
        return key.value;
      case "KeyVaultKey":
        return key.value.key!;
      default:
        return undefined;
    }
  }

  /**
   * Returns the underlying key used for cryptographic operations.
   * If needed, attempts to fetch the key from KeyVault and exchanges the ID for the actual key.
   * @param options - The additional options.
   */
  private async fetchKey<T extends OperationOptions>(options: T): Promise<CryptographyClientKey> {
    if (this.key.kind === "identifier") {
      // Exchange the identifier with the actual key when needed
      let key: KeyVaultKey | undefined;
      try {
        key = await this.remoteProvider!.getKey(options);
      } catch (e: unknown) {
        if (isRestError(e) && e.statusCode === 403) {
          // If we don't have permission to get the key, we'll fall back to using the remote provider.
          // Marking the key as a remoteOnlyIdentifier will ensure that we don't attempt to fetch the key again.
          logger.verbose(
            `Permission denied to get key ${this.key.value}. Falling back to remote operation.`,
          );
          this.key = { kind: "remoteOnlyIdentifier", value: this.key.value };
        } else {
          throw e;
        }
      }

      if (key) {
        this.key = { kind: "KeyVaultKey", value: key };
      }
    }

    return this.key;
  }

  private providers?: CryptographyProvider[];
  /**
   * Gets the provider that support this algorithm and operation.
   * The available providers are ordered by priority such that the first provider that supports this
   * operation is the one we should use.
   * @param operation - The {@link KeyOperation}.
   * @param algorithm - The algorithm to use.
   */
  private async getProvider<T extends OperationOptions>(
    operation: CryptographyProviderOperation,
    algorithm: string,
    options: T,
  ): Promise<CryptographyProvider> {
    if (!this.providers) {
      const keyMaterial = await this.getKeyMaterial(options);
      this.providers = [];

      // Add local crypto providers as needed
      if (keyMaterial) {
        this.providers.push(
          new RsaCryptographyProvider(keyMaterial),
          new AesCryptographyProvider(keyMaterial),
        );
      }

      // If the remote provider exists, we're in hybrid-mode. Otherwise we're in local-only mode.
      // If we're in hybrid mode the remote provider is used as a catch-all and should be last in the list.
      if (this.remoteProvider) {
        this.providers.push(this.remoteProvider);
      }
    }

    const providers = this.providers.filter((p) => p.isSupported(algorithm, operation));

    if (providers.length === 0) {
      throw new Error(
        `Unable to support operation: "${operation}" with algorithm: "${algorithm}" ${
          this.key.kind === "JsonWebKey" ? "using a local JsonWebKey" : ""
        }`,
      );
    }

    // Return the first provider that supports this request
    return providers[0];
  }

  private ensureValid(key: CryptographyClientKey, operation?: KeyOperation): void {
    if (key.kind === "KeyVaultKey") {
      const keyOps = key.value.keyOperations;
      const { notBefore, expiresOn } = key.value.properties;
      const now = new Date();

      // Check KeyVault Key Expiration
      if (notBefore && now < notBefore) {
        throw new Error(`Key ${key.value.id} can't be used before ${notBefore.toISOString()}`);
      }

      if (expiresOn && now > expiresOn) {
        throw new Error(`Key ${key.value.id} expired at ${expiresOn.toISOString()}`);
      }

      // Check Key operations
      if (operation && keyOps && !keyOps?.includes(operation)) {
        throw new Error(`Operation ${operation} is not supported on key ${key.value.id}`);
      }
    } else if (key.kind === "JsonWebKey") {
      // Check JsonWebKey Key operations
      if (operation && key.value.keyOps && !key.value.keyOps?.includes(operation)) {
        throw new Error(`Operation ${operation} is not supported on key ${key.value.kid}`);
      }
    }
  }
}
