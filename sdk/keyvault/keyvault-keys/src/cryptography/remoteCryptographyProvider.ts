import {
  createPipelineFromOptions,
  isTokenCredential,
  operationOptionsToRequestOptionsBase,
  RequestOptionsBase,
  signingPolicy
} from "@azure/core-http";
import { getTracer } from "@azure/core-tracing";
import { TokenCredential } from "@azure/identity";
import { Span } from "@opentelemetry/api";
import {
  EncryptParameters,
  EncryptOptions,
  EncryptResult,
  KeyWrapAlgorithm,
  WrapKeyOptions,
  WrapResult,
  VerifyOptions,
  VerifyResult,
  KeyVaultKey,
  CryptographyClientOptions,
  DecryptParameters,
  DecryptOptions,
  DecryptResult,
  UnwrapKeyOptions,
  SignOptions,
  SignResult,
  logger,
  GetKeyOptions
} from "..";
import { challengeBasedAuthenticationPolicy, setParentSpan } from "../../../keyvault-common";
import { SDK_VERSION } from "../constants";
import { SignatureAlgorithm, UnwrapResult } from "../cryptographyClientModels";
import { KeyVaultClient } from "../generated";
import { parseKeyVaultKeyId } from "../identifier";
import { KeyOperation, LATEST_API_VERSION } from "../keysModels";
import { getKeyFromKeyBundle } from "../transformations";
import { createHash } from "./hash";

export interface CryptographyProvider {
  encrypt(encryptParameters: EncryptParameters, options: EncryptOptions): Promise<EncryptResult>;

  decrypt(decryptParameters: DecryptParameters, options: DecryptOptions): Promise<DecryptResult>;

  supportsAlgorithm(algorithm: string): boolean;

  supportsOperation(opertion: KeyOperation): boolean;

  wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions
  ): Promise<WrapResult>;

  unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions
  ): Promise<UnwrapResult>;

  sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions
  ): Promise<SignResult>;

  verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions
  ): Promise<VerifyResult>;
}

export class RemoteCryptographyProvider implements CryptographyProvider {
  constructor(
    key: string | KeyVaultKey,
    credential: TokenCredential,
    pipelineOptions: CryptographyClientOptions = {}
  ) {
    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = isTokenCredential(credential)
      ? challengeBasedAuthenticationPolicy(credential)
      : signingPolicy(credential);

    const internalPipelineOptions = {
      ...pipelineOptions,
      loggingOptions: {
        logger: logger.info,
        allowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version"
        ]
      }
    };

    this.client = new KeyVaultClient(
      pipelineOptions.serviceVersion || LATEST_API_VERSION,
      createPipelineFromOptions(internalPipelineOptions, authPolicy)
    );

    let parsed;
    if (typeof key === "string") {
      this.key = key;
      parsed = parseKeyVaultKeyId(this.key);
    } else if (key.key) {
      this.key = key;
      parsed = parseKeyVaultKeyId(this.key.id!);
    } else {
      throw new Error(
        "The provided key is malformed as it does not have a value for the `key` property."
      );
    }

    if (parsed.name === "") {
      throw new Error("Could not find 'name' of key in key URL");
    }

    if (!parsed.version || parsed.version === "") {
      throw new Error("Could not find 'version' of key in key URL");
    }

    if (!parsed.vaultUrl || parsed.vaultUrl === "") {
      throw new Error("Could not find 'vaultUrl' of key in key URL");
    }

    this.vaultUrl = parsed.vaultUrl;
    this.name = parsed.name;
    this.version = parsed.version;
  }

  async encrypt(
    encryptParameters: EncryptParameters,
    options: EncryptOptions
  ): Promise<EncryptResult> {
    const { algorithm, plaintext, ...params } = encryptParameters;
    const requestOptions = { ...operationOptionsToRequestOptionsBase(options), ...params };
    const span = this.createSpan("encrypt", requestOptions);

    let result;
    try {
      result = await this.client.encrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        plaintext,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return {
      algorithm: encryptParameters.algorithm,
      result: result.result!,
      keyID: this.getKeyID(),
      additionalAuthenticatedData: result.additionalAuthenticatedData,
      authenticationTag: result.authenticationTag,
      iv: result.iv
    };
  }

  async decrypt(
    decryptParameters: DecryptParameters,
    options: DecryptOptions
  ): Promise<DecryptResult> {
    const { algorithm, ciphertext, ...params } = decryptParameters;
    const requestOptions = { ...operationOptionsToRequestOptionsBase(options), ...params };
    const span = this.createSpan("decrypt", requestOptions);

    let result;
    try {
      result = await this.client.decrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        ciphertext,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return {
      result: result.result!,
      keyID: this.getKeyID(),
      algorithm
    };
  }

  // The remote client supports all algorithms and all operations.
  supportsAlgorithm(_algorithm: string): boolean {
    return true;
  }

  supportsOperation(_operation: string): boolean {
    return true;
  }

  async wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions
  ): Promise<WrapResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("decrypt", requestOptions);

    let result;
    try {
      result = await this.client.wrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        keyToWrap,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  async unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions
  ): Promise<UnwrapResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("unwrapKey", requestOptions);

    // Default to the service

    let result;
    try {
      result = await this.client.unwrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        encryptedKey,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  async sign(algorithm: string, digest: Uint8Array, options: SignOptions): Promise<SignResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("sign", requestOptions);

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  async verify(
    algorithm: string,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions
  ): Promise<VerifyResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("verify", requestOptions);

    let response;
    try {
      response = await this.client.verify(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        signature,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: response.value ? response.value : false, keyID: this.getKeyID() };
  }

  async signData(algorithm: string, data: Uint8Array, options: SignOptions): Promise<SignResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("signData", requestOptions);

    const digest = await createHash(algorithm, data);

    // Default to the service

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * The base URL to the vault.
   */
  public readonly vaultUrl: string;

  /**
   * The ID of the key used to perform cryptographic operations for the client.
   */
  public get keyId(): string | undefined {
    return this.getKeyID();
  }

  public async getKey(options: GetKeyOptions): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getKey", requestOptions);

    if (typeof this.key === "string") {
      if (!this.name || this.name === "") {
        throw new Error("getKey requires a key with a name");
      }
      const response = await this.client.getKey(
        this.vaultUrl,
        this.name,
        options && options.version ? options.version : this.version ? this.version : "",
        setParentSpan(span, requestOptions)
      );
      this.key = getKeyFromKeyBundle(response);
    }

    return this.key;
  }

  /**
   * @internal
   * @hidden
   * A reference to the auto-generated KeyVault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * A reference to the key used for the cryptographic operations.
   * Based on what was provided to the CryptographyClient constructor, it can be either a string with the URL of a Key Vault Key, or an already parsed {@link JsonWebKey}.
   */
  private key: string | KeyVaultKey;

  /**
   * Name of the key the client represents
   */
  private name: string;

  /**
   * Version of the key the client represents
   */
  private version: string;

  /**
   * @internal
   * @hidden
   * Attempts to retrieve the ID of the key.
   */
  private getKeyID(): string | undefined {
    let kid;
    if (typeof this.key !== "string") {
      kid = this.key.id;
    } else {
      kid = this.key;
    }

    return kid;
  }
  /**
   * @internal
   * @hidden
   * Creates a span using the tracer that was set by the user.
   * @param methodName - The name of the method creating the span.
   * @param options - The options for the underlying HTTP request.
   */
  private createSpan(methodName: string, requestOptions?: RequestOptionsBase): Span {
    const tracer = getTracer();
    const span = tracer.startSpan(
      `CryptographyClient ${methodName}`,
      requestOptions && requestOptions.spanOptions
    );
    span.setAttribute("az.namespace", "Microsoft.KeyVault");
    return span;
  }

  // /**
  //  * Checks whether the internal key can be used to execute a given operation, by the operation's name.
  //  * @param operation - The name of the operation that is expected to be viable
  //  */
  // private async checkPermissions(operation: KeyOperation): Promise<void> {
  //   if (typeof this.key !== "string" && this.key.keyOps && !this.key.keyOps.includes(operation)) {
  //     throw new Error(`Operation ${operation} is not supported on key ${this.getKeyID()}`);
  //   }
  // }
}
