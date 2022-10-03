// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RSA_PKCS1_OAEP_PADDING, RSA_PKCS1_PADDING } from "constants";
import { publicEncrypt } from "crypto";
import { createVerify } from "./crypto";
import {
  DecryptOptions,
  DecryptParameters,
  DecryptResult,
  EncryptOptions,
  EncryptParameters,
  EncryptResult,
  JsonWebKey,
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
} from "..";
import { convertJWKtoPEM } from "./conversions";
import {
  CryptographyProvider,
  CryptographyProviderOperation,
  LocalCryptographyUnsupportedError,
} from "./models";

/**
 * An RSA cryptography provider supporting RSA algorithms.
 */
export class RsaCryptographyProvider implements CryptographyProvider {
  constructor(key: JsonWebKey) {
    this.key = key;
  }

  isSupported(algorithm: string, operation: CryptographyProviderOperation): boolean {
    return (
      this.applicableAlgorithms.includes(algorithm) && this.applicableOperations.includes(operation)
    );
  }

  encrypt(encryptParameters: EncryptParameters, _options?: EncryptOptions): Promise<EncryptResult> {
    this.ensureValid();
    const keyPEM = convertJWKtoPEM(this.key);

    const padding =
      encryptParameters.algorithm === "RSA1_5" ? RSA_PKCS1_PADDING : RSA_PKCS1_OAEP_PADDING;

    return Promise.resolve({
      algorithm: encryptParameters.algorithm,
      keyID: this.key.kid,
      result: publicEncrypt(
        { key: keyPEM, padding: padding },
        Buffer.from(encryptParameters.plaintext)
      ),
    });
  }

  decrypt(
    _decryptParameters: DecryptParameters,
    _options?: DecryptOptions
  ): Promise<DecryptResult> {
    throw new LocalCryptographyUnsupportedError(
      "Decrypting using a local JsonWebKey is not supported."
    );
  }

  wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    _options?: WrapKeyOptions
  ): Promise<WrapResult> {
    this.ensureValid();
    const keyPEM = convertJWKtoPEM(this.key);

    const padding = algorithm === "RSA1_5" ? RSA_PKCS1_PADDING : RSA_PKCS1_OAEP_PADDING;

    return Promise.resolve({
      algorithm: algorithm as KeyWrapAlgorithm,
      result: publicEncrypt({ key: keyPEM, padding }, Buffer.from(keyToWrap)),
      keyID: this.key.kid,
    });
  }

  unwrapKey(
    _algorithm: KeyWrapAlgorithm,
    _encryptedKey: Uint8Array,
    _options?: UnwrapKeyOptions
  ): Promise<UnwrapResult> {
    throw new LocalCryptographyUnsupportedError(
      "Unwrapping a key using a local JsonWebKey is not supported."
    );
  }

  sign(
    _algorithm: SignatureAlgorithm,
    _digest: Uint8Array,
    _options?: SignOptions
  ): Promise<SignResult> {
    throw new LocalCryptographyUnsupportedError(
      "Signing a digest using a local JsonWebKey is not supported."
    );
  }

  signData(
    _algorithm: SignatureAlgorithm,
    _data: Uint8Array,
    _options?: SignOptions
  ): Promise<SignResult> {
    throw new LocalCryptographyUnsupportedError(
      "Signing a block of data using a local JsonWebKey is not supported."
    );
  }

  async verify(
    _algorithm: SignatureAlgorithm,
    _digest: Uint8Array,
    _signature: Uint8Array,
    _options?: VerifyOptions
  ): Promise<VerifyResult> {
    throw new LocalCryptographyUnsupportedError(
      "Verifying a digest using a local JsonWebKey is not supported."
    );
  }

  verifyData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    _options?: VerifyOptions
  ): Promise<VerifyResult> {
    this.ensureValid();
    const keyPEM = convertJWKtoPEM(this.key);

    const verifier = createVerify(algorithm, data);
    return Promise.resolve({
      result: verifier.verify(keyPEM, Buffer.from(signature)),
      keyID: this.key.kid,
    });
  }

  /**
   * The {@link JsonWebKey} used to perform crypto operations.
   */
  private key: JsonWebKey;

  /**
   * The set of algorithms this provider supports
   */
  private applicableAlgorithms: string[] = [
    "RSA1_5",
    "RSA-OAEP",
    "PS256",
    "RS256",
    "PS384",
    "RS384",
    "PS512",
    "RS512",
  ];

  /**
   * The set of operations this provider supports
   */
  private applicableOperations: CryptographyProviderOperation[] = [
    "encrypt",
    "wrapKey",
    "verifyData",
  ];

  /**
   * Mapping between signature algorithms and their corresponding hash algorithms. Externally used for testing.
   * @internal
   */
  signatureAlgorithmToHashAlgorithm: { [s: string]: string } = {
    PS256: "SHA256",
    RS256: "SHA256",
    PS384: "SHA384",
    RS384: "SHA384",
    PS512: "SHA512",
    RS512: "SHA512",
  };

  private ensureValid(): void {
    if (
      this.key &&
      this.key.kty?.toUpperCase() !== "RSA" &&
      this.key.kty?.toUpperCase() !== "RSA-HSM"
    ) {
      throw new Error("Key type does not match the algorithm RSA");
    }
  }
}
