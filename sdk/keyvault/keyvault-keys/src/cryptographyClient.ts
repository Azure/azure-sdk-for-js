import { GetKeyOptions, RequestOptions } from "./keysModels";
import { JsonWebKey, JsonWebKeyEncryptionAlgorithm } from "./core/models";
import {
  ServiceClientCredentials, TokenCredential, isNode, RequestPolicyFactory,
  isTokenCredential,
  deserializationPolicy,
  signingPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  userAgentPolicy,
  getDefaultUserAgentValue,
} from "@azure/core-http";
import { parseKeyvaultIdentifier } from "./core/utils";
import { TelemetryOptions } from "./core";
import { RetryConstants, SDK_VERSION } from "./core/utils/constants";
import {
  NewPipelineOptions,
  isNewPipelineOptions,
  Pipeline,
} from "./core/keyVaultBase";
import { KeyVaultClient } from "./core/keyVaultClient";
import { challengeBasedAuthenticationPolicy } from "./core/challengeBasedAuthenticationPolicy";
import * as crypto from "crypto";
import * as constants from "constants";

let keyto: any;
if (isNode) {
  keyto = require("@trust/keyto");
}

/**
 * The client to interact with the KeyVault cryptography functionality
 */
export class CryptographyClient {

  /**
   * Retrieves the complete key from the key vault
   * @param options Options for retrieving key
   */
  public async getKey(options?: GetKeyOptions): Promise<JsonWebKey> {
    if (typeof this.key === "string") {
      if (!this.name || this.name === "") {
        throw new Error("getKey requires a key with a name");
      }
      const key = await this.client.getKey(
        this.vaultBaseUrl,
        this.name,
        options && options.version ? options.version : (this.version ? this.version : ""),
        options
      );
      return key.key!;
    } else {
      return this.key;
    }
  }

  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.encrypt("RSA1_5", Buffer.from("My Message"));
   * ```
   * @param algorithm The algorithm to use
   * @param plaintext The text to encrypt
   * @param options Additional options
   */
  public async encrypt(
    algorithm: JsonWebKeyEncryptionAlgorithm,
    plaintext: Uint8Array,
    options?: EncryptOptions
  ): Promise<EncryptResult> {
    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case "RSA1_5": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("encrypt")) {
              throw new Error("Key does not support the encrypt operation");
            }

            let keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

            let padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
            const encrypted = crypto.publicEncrypt(padded, Buffer.from(plaintext));
            return {result: encrypted};
          };
          case "RSA-OAEP": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("encrypt")) {
              throw new Error("Key does not support the encrypt operation");
            }

            let keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

            const encrypted = crypto.publicEncrypt(keyPEM, Buffer.from(plaintext));
            return {result: encrypted};
          };
        }
      }
    }

    // Default to the service
    let result = await this.client.encrypt(this.vaultBaseUrl, this.name, this.version, algorithm, plaintext, options);
    return {result: result.result!};
  }

  /**
   * Decrypts the given ciphertext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.decrypt("RSA1_5", encryptedBuffer);
   * ```
   * @param algorithm The algorithm to use
   * @param ciphertext The ciphertext to decrypt
   * @param options Additional options
   */  
  public async decrypt(
    algorithm: JsonWebKeyEncryptionAlgorithm,
    ciphertext: Uint8Array,
    options?: DecryptOptions
  ): Promise<DecryptResult> {
    let result = await this.client.decrypt(this.vaultBaseUrl, this.name, this.version, algorithm, ciphertext, options);
    return {result: result.result!};
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.wrapKey("RSA1_5", keyToWrap);
   * ```
   * @param algorithm The encryption algorithm to use to wrap the given key
   * @param key The key to wrap
   * @param options Additional options
   */
  public async wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options?: RequestOptions
  ): Promise<WrapResult> {
    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
        case "RSA1_5": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("wrapKey")) {
              throw new Error("Key does not support the wrapKey operation");
            }

            let keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

            let padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
            const encrypted = crypto.publicEncrypt(padded, Buffer.from(key));
            return {result: encrypted};
          };
          case "RSA-OAEP": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("wrapKey")) {
              throw new Error("Key does not support the wrapKey operation");
            }

            let keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

            const encrypted = crypto.publicEncrypt(keyPEM, Buffer.from(key));
            return {result: encrypted};
          };
        }
      }
    }

    // Default to the service
    let result = await this.client.wrapKey(this.vaultBaseUrl, this.name, this.version, algorithm, key, options);
    return {result: result.result!};
  }

  /**
   * Unwraps the given wrapped key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.unwrapKey("RSA1_5", keyToUnwrap);
   * ```
   * @param algorithm The decryption algorithm to use to unwrap the key
   * @param encryptedKey The encrypted key to unwrap
   * @param options Additional options
   */
  public async unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options?: RequestOptions
  ): Promise<UnwrapResult> {
    let result = await this.client.unwrapKey(this.vaultBaseUrl, this.name, this.version, algorithm, encryptedKey, options);
    return {result: result.result!};
  }

  /**
   * Cryptographically sign the digest of a message
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.sign("RS256", digest);
   * ```
   * @param algorithm The signing algorithm to use
   * @param digest The digest of the data to sign
   * @param options Additional options
   */
  public async sign(
    algorithm: KeySignatureAlgorithm,
    digest: Uint8Array,
    options?: RequestOptions
  ): Promise<SignResult> {
    let result = await this.client.sign(this.vaultBaseUrl, this.name, this.version, algorithm, digest, options);
    return {result: result.result!};
  }

  /**
   * Verify the signed message digest
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.verify("RS256", signedDigest, signature);
   * ```
   * @param algorithm The signing algorithm to use to verify with
   * @param digest The digest to verify
   * @param signature The signature to verify the digest against
   * @param options Additional options
   */
  public async verify(
    algorithm: KeySignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options?: RequestOptions
  ): Promise<VerifyResult> {
    const response = await this.client.verify(this.vaultBaseUrl, this.name, this.version, algorithm, digest, signature, options);
    return {result: response.value ? response.value : false};
  }

  /**
   * Cryptographically sign a block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.signData("RS256", message);
   * ```
   * @param algorithm The signing algorithm to use
   * @param data The data to sign
   * @param options Additional options
   */
  public async signData(
    algorithm: KeySignatureAlgorithm,
    data: Uint8Array,
    options?: RequestOptions
  ): Promise<SignResult> {
    let digest;
    switch (algorithm) {
      case ("ES256"):
      case ("ES256K"):
      case ("PS256"):
      case ("RS256"): {
        digest = await CryptographyClient.createHash("sha256", data);
      } break;
      case ("ES384"):
      case ("PS384"):
      case ("RS384"): {
        digest = await CryptographyClient.createHash("sha384", data);
      } break;
      case ("ES512"):
      case ("PS512"):
      case ("RS512"): {
        digest = await CryptographyClient.createHash("sha512", data);
      } break;
      default: {
        throw new Error("Unsupported signature algorithm");
      }
    }

    let result = await this.client.sign(this.vaultBaseUrl, this.name, this.version, algorithm, digest, options);
    return {result: result.result!};
  }

  /**
   * Verify the signed block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.verifyData("RS256", signedMessage, signature);
   * ```
   * @param algorithm The algorithm to use to verify with
   * @param data The signed block of data to verify
   * @param signature The signature to verify the block against
   * @param options Additional options
   */
  public async verifyData(
    algorithm: KeySignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    options?: RequestOptions
  ): Promise<VerifyResult> {
    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case ("RS256"): {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }

            let keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

            const verifier = crypto.createVerify("SHA256");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {result: verifier.verify(keyPEM, Buffer.from(signature))};
          };
          case ("RS384"): {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }
            
            let keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

            const verifier = crypto.createVerify("SHA384");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {result: verifier.verify(keyPEM, Buffer.from(signature))};
          };
          case ("RS512"): {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }
            
            let keyPEM = keyto.from(this.key, "jwk").toString('pem', 'public_pkcs1');

            const verifier = crypto.createVerify("SHA512");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {result: verifier.verify(keyPEM, Buffer.from(signature))};
          };
        }
      }
    }

    let digest: Buffer;
    switch (algorithm) {
      case ("ES256"):
      case ("ES256K"):
      case ("PS256"):
      case ("RS256"): {
        digest = await CryptographyClient.createHash("sha256", data);
      } break;
      case ("ES384"):
      case ("PS384"):
      case ("RS384"): {
        digest = await CryptographyClient.createHash("sha384", data);
      } break;
      case ("ES512"):
      case ("PS512"):
      case ("RS512"): {
        digest = await CryptographyClient.createHash("sha512", data);
      } break;
      default: {
        throw new Error("Unsupported signature algorithm");
      }
    }

    let result = await this.client.verify(this.vaultBaseUrl, this.name, this.version, algorithm, digest, signature, options);
    return {result: result.value!};
  }

  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {TokenCredential} The credential to use for API requests.
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof CryptographyClient
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = CryptographyClient.getUserAgentString(pipelineOptions.telemetry);

    let requestPolicyFactories: RequestPolicyFactory[] = [];
    if (isNode) {
      requestPolicyFactories.push(
        proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings))
      );
    }
    requestPolicyFactories = requestPolicyFactories.concat([
      userAgentPolicy({ value: userAgentString }),
      generateClientRequestIdPolicy(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      throttlingRetryPolicy(),
      systemErrorRetryPolicy(),
      exponentialRetryPolicy(
        retryOptions.retryCount,
        retryOptions.retryIntervalInMS,
        RetryConstants.MIN_RETRY_INTERVAL_MS, // Minimum retry interval to prevent frequent retries
        retryOptions.maxRetryDelayInMs
      ),
      redirectPolicy(),
      isTokenCredential(credential)
        ? challengeBasedAuthenticationPolicy(credential)
        : signingPolicy(credential)
    ]);

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  private static getUserAgentString(telemetry?: TelemetryOptions): string {
    const userAgentInfo: string[] = [];
    if (telemetry) {
      if (userAgentInfo.indexOf(telemetry.value) === -1) {
        userAgentInfo.push(telemetry.value);
      }
    }
    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;
    if (userAgentInfo.indexOf(libInfo) === -1) {
      userAgentInfo.push(libInfo);
    }
    const defaultUserAgentInfo = getDefaultUserAgentValue();
    if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
      userAgentInfo.push(defaultUserAgentInfo);
    }
    return userAgentInfo.join(" ");
  }

  private async fetchFullKeyIfPossible() {
    if (!this.hasTriedToGetKey) {
      try {
        let result = await this.getKey();
        this.key = result;
      } catch {

      }
      this.hasTriedToGetKey = true;
    }
  }

  private static async createHash(algorithm: string, data: Uint8Array): Promise<Buffer> {
    if (isNode) {
      let hash = crypto.createHash(algorithm);
      hash.update(Buffer.from(data));
      let digest = hash.digest();
      return digest;
    } else {
      if (window && window.crypto && window.crypto.subtle) {
        return Buffer.from(await window.crypto.subtle.digest(algorithm, Buffer.from(data)));
      } else {
        throw new Error("Browser does not support cryptography functions");
      }
    }
  }

  /**
   * The base URL to the vault
   */
  public readonly vaultBaseUrl: string;

  /**
   * The options to create the connection to the service
   */
  public readonly pipeline: Pipeline;

  /**
   * The authentication credentials
   */
  protected readonly credential: ServiceClientCredentials | TokenCredential;
  private readonly client: KeyVaultClient;

  /**
   * If the key is a string, it's a URL, and we'll pass it to the service API directly.
   */
  public key: string | JsonWebKey;

  /**
   * Name of the key the client represents
   */
  private name: string;

  /**
   * Version of the key the client represents
   */
  private version: string;
  
  /**
   * Has the client tried to fetch the full key yet
   */
  private hasTriedToGetKey: boolean;

  /**
   * Constructs a new instance of the Cryptography client for the given key
   *
   * Example usage:
   * ```ts
   * import { CryptographyClient } from "@azure/keyvault-keys";
   * import { EnvironmentCredential } from "@azure/identity";
   *
   * let url = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new EnvironmentCredential();
   *
   * let client = new CryptographyClient(url, keyUrl, credentials);
   * // or
   * let client = new CryptographyClient(url, jsonWebKey, credentials);
   * ```
   * @param url The url of the key vault service
   * @param key The key to use during cryptography tasks
   * @param credential The login credentials of the service
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof CryptographyClient
   */
  constructor(
    url: string,
    key: string | JsonWebKey, // keyUrl or JsonWebKey
    credential: TokenCredential,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = CryptographyClient.getDefaultPipeline(credential, pipelineOrOptions);
    } else {
      this.pipeline = pipelineOrOptions;
    }
    this.client = new KeyVaultClient(credential, this.pipeline);
    this.key = key;

    let parsed;
    if (typeof this.key === "string") {
      parsed = parseKeyvaultIdentifier("keys", this.key);
      this.hasTriedToGetKey = false;
    } else {
      parsed = parseKeyvaultIdentifier("keys", this.key.kid!);
      this.hasTriedToGetKey = true;
    }

    if (parsed.name == "") {
      throw new Error("Could not find 'name' of key in key URL");
    }

    if (!parsed.version || parsed.version == "") {
      throw new Error("Could not find 'version' of key in key URL");
    }

    this.name = parsed.name;
    this.version = parsed.version;
  }
}

/**
 * Options for the encrypt call to the CryptographyClient
 */
export interface EncryptOptions extends RequestOptions {
  /**
   * Initialization vector
   */
  iv?: Uint8Array,
  /**
   * Authentication data
   */
  authenticationData?: Uint8Array,
}

/**
 * Options for the decrypt call to the CryptographyClient
 */

export interface DecryptOptions extends RequestOptions {
  /**
   * Initialization vector
   */
  iv?: Uint8Array,
  /**
   * Authentication data
   */
  authenticationData?: Uint8Array,
  /**
   * Authentication tag
   */
  authenticationTag?: Uint8Array,
}

/**
 * Allow algorithms for key wrapping/unwrapping
 */
export type KeyWrapAlgorithm = "RSA-OAEP" | "RSA-OAEP-256" | "RSA1_5";

/**
 * Defines values for JsonWebKeySignatureAlgorithm.
 * Possible values include: 'PS256', 'PS384', 'PS512', 'RS256', 'RS384', 'RS512',
 * 'ES256', 'ES384', 'ES512', 'ES256K'
 * @readonly
 * @enum {string}
 */
export type KeySignatureAlgorithm =
  | "PS256"
  | "PS384"
  | "PS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "ES256"
  | "ES384"
  | "ES512"
  | "ES256K";

/**
 * Result of a decrypt operation
 */
export interface DecryptResult {
  /**
   * Result of the operation
   */
  result: Uint8Array,
}

/**
 * Reuslt of an encrypt operation
 */
export interface EncryptResult {
  /**
   * Result of the operation
   */
  result: Uint8Array,
}

/**
 * Result of a sign operation
 */
export interface SignResult {
  /**
   * Result of the operation
   */
  result: Uint8Array,
}

/**
 * Result of a verify operation
 */
export interface VerifyResult {
  /**
   * Result of the operation
   */
  result: boolean,
}

/**
 * Result of a wrap operation
 */
export interface WrapResult {
  /**
   * Result of the operation
   */
  result: Uint8Array,
}

/**
 * Result of an unwrap operation
 */
export interface UnwrapResult {
  /**
   * Result of the operation
   */
  result: Uint8Array,
}
