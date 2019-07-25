import { GetKeyOptions, RequestOptions } from "./keysModels";
import { JsonWebKey, JsonWebKeyEncryptionAlgorithm, JsonWebKeySignatureAlgorithm } from "./core/models";
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

export class CryptographyClient {
  public async getKey(options?: GetKeyOptions): Promise<JsonWebKey> {
    if (typeof this.key === "string") {
      if (!this.name || this.name == "") {
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

  public async encrypt(
    plaintext: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    _iv?: Uint8Array,
    _authenticationData?: Uint8Array,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    // TODO: How do we distinguish between doing a service call or encrypting locally?
    // TODO: How do we derive the remote key from a JWK object?

    if (this.name && this.version) {
      let result = await this.client.encrypt(this.vaultBaseUrl, this.name, this.version, algorithm, plaintext, options);
      return result.result!;
    } else {
      throw new Error("Local crypto not yet supported");
    }
  }

  public async decrypt(
    ciphertext: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    _iv?: Uint8Array,
    _authenticationData?: Uint8Array,
    _authenticationTag?: Uint8Array,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    if (this.name && this.version) {
      let result = await this.client.decrypt(this.vaultBaseUrl, this.name, this.version, algorithm, ciphertext, options);
      return result.result!;
    } else {
      throw new Error("Local crypto not yet supported");
    }
  }

  public async wrapKey(
    key: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    if (this.name && this.version) {
      let result = await this.client.wrapKey(this.vaultBaseUrl, this.name, this.version, algorithm, key, options);
      return result.result!;
    } else {
      throw new Error("Local crypto not yet supported");
    }
  }

  public async unwrapKey(
    encryptedKey: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    if (this.name && this.version) {
      let result = await this.client.unwrapKey(this.vaultBaseUrl, this.name, this.version, algorithm, encryptedKey, options);
      return result.result!;
    } else {
      throw new Error("Local crypto not yet supported");
    }
  }

  public async sign(
    digest: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<Uint8Array> {
    if (this.name && this.version) {
      let result = await this.client.sign(this.vaultBaseUrl, this.name, this.version, algorithm, digest, options);
      return result.result!;
    } else {
      throw new Error("Local crypto not yet supported");
    }
  }

  public async verify(
    digest: Uint8Array,
    signature: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<boolean> {
    if (this.name && this.version) {
      const response = await this.client.verify(this.vaultBaseUrl, this.name, this.version, algorithm, digest, signature, options);
      return response.value ? response.value : false;
    } else {
      throw new Error("Local crypto not yet supported");
    }
  }

  public async signData(
    _data: Uint8Array,
    _algorithm: JsonWebKeySignatureAlgorithm,
    _options?: RequestOptions
  ): Promise<Uint8Array> {
    throw new Error("INCOMPLETE: Needs hash/digest function");
  }

  public async verifyData(
    _data: Uint8Array,
    _signature: Uint8Array,
    _algorithm: JsonWebKeySignatureAlgorithm,
    _options?: RequestOptions
  ): Promise<boolean> {
    throw new Error("INCOMPLETE: Needs hash/digest function");
  }

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
  public readonly key: string | JsonWebKey;

  /**
   * Name of the key the client represents
   */
  private name: string | undefined;

  /**
   * Version of the key the client represents
   */
  private version: string | undefined;

  constructor(
    url: string,
    key: string | JsonWebKey, // keyUrl or JsonWebKey
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = CryptographyClient.getDefaultPipeline(credential, pipelineOrOptions);
    } else {
      this.pipeline = pipelineOrOptions;
    }
    // this.pipeline.requestPolicyFactories;
    this.client = new KeyVaultClient(credential, this.pipeline);
    this.key = key;

    if (typeof this.key === "string") {
      let parsed = parseKeyvaultIdentifier("keys", this.key);

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
}
