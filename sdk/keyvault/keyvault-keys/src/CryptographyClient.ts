import { GetKeyOptions } from "./keysModels";
import { Pipeline } from "./core/keyVaultBase";
import { JsonWebKey } from "./core/models";
import { ServiceClientCredentials, TokenCredential } from "@azure/core-http";

export class CryptographyClient {
  public async getKey(options?: GetKeyOptions): Promise<JsonWebKey> {
    if (typeof this.key === "string") {
      const name: string; // TODO: How to get the name from the URL?
      const key = await this.client.getKey(
        this.vaultBaseUrl,
        name,
        options && options.version ? options.version : "",
        options
      );
      return key.keyMaterial;
    } else {
      return this.key;
    }
  }

  public async encrypt(
    plaintext: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    iv?: Uint8Array,
    authenticationData?: Uint8Array,
    options?: RequestOptions
  ): Promise<KeyOperationResult> {
    // TODO: How do we distinguish between doing a service call or encrypting locally?
    // TODO: How do we derive the remote key from a JWK object?

    const name: string; // TODO: How to get the name from the Key URL?
    const version: string; // TODO: How to get the version from the Key URL?

    return this.client.encrypt(this.vaultBaseUrl, name, version, algorithm, plaintext, options);
  }

  public async decrypt(
    ciphertext: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    iv?: Uint8Array,
    authenticationData?: Uint8Array,
    authenticationTag?: Uint8Array,
    options?: RequestOptions
  ): Promise<KeyOperationResult> {
    const name: string;
    const version: string;

    return this.client.decrypt(this.vaultBaseUrl, name, version, algorithm, ciphertext, options);
  }

  public async wrapKey(
    key: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    options?: RequestOptions
  ): Promise<KeyOperationResult> {
    const name: string;
    const version: string;

    return this.client.wrapKey(this.vaultBaseUrl, name, version, algorithm, key, options);
  }

  public async unwrapKey(
    encryptedKey: Uint8Array,
    algorithm: JsonWebKeyEncryptionAlgorithm,
    options?: RequestOptions
  ): Promise<KeyOperationResult> {
    const name: string;
    const version: string;

    return this.client.unwrapKey(this.vaultBaseUrl, name, version, algorithm, encryptedKey, options);
  }

  public async sign(
    digest: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<KeyOperationResult> {
    const name: string;
    const version: string;

    return this.client.sign(this.vaultBaseUrl, name, version, algorithm, digest, options);
  }

  public async verify(
    digest: Uint8Array,
    signature: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<boolean> {
    const name: string;
    const version: string;

    const response = await this.client.verify(this.vaultBaseUrl, name, version, algorithm, digest, signature, options);
    return response.value;
  }

  public async signData(
    data: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<KeyOperationResult> {
  }

  public async verifyData(
    data: Uint8Array,
    signature: Uint8Array,
    algorithm: JsonWebKeySignatureAlgorithm,
    options?: RequestOptions
  ): Promise<bool> {
  }

  public static getDefaultPipeline(
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = KeysClient.getUserAgentString(pipelineOptions.telemetry);

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
    this.key = key; // TODO
  }
}
