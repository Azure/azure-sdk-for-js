import { CryptographyProvider } from "./CryptographyProvider";

import { RSA_PKCS1_OAEP_PADDING, RSA_PKCS1_PADDING } from "constants";
import { JsonWebKey, KeyOperation, KnownKeyOperations } from "../keysModels";
import { publicEncrypt } from "crypto";
import { createVerify } from "./hash";
import {
  EncryptOptions,
  EncryptParameters,
  EncryptResult,
  KeyWrapAlgorithm,
  VerifyOptions,
  VerifyResult,
  WrapKeyOptions,
  WrapResult
} from "..";
import { convertJWKtoPEM } from "./conversions";
import { LocalCryptographyUnsupportedError, LocalSupportedAlgorithmName } from "./models";
import {
  DecryptOptions,
  DecryptParameters,
  DecryptResult,
  SignatureAlgorithm,
  SignOptions,
  SignResult,
  UnwrapKeyOptions,
  UnwrapResult
} from "../cryptographyClientModels";

/**
 * An RSA cryptography provider supporting RSA algorithms.
 */
export class RsaCryptographyProvider implements CryptographyProvider {
  private key: JsonWebKey;
  providerName = "RSA Provider";

  constructor(key: JsonWebKey) {
    this.key = key;
  }

  supportsAlgorithm(algorithm: LocalSupportedAlgorithmName): boolean {
    return this.applicableAlgorithms.includes(algorithm);
  }

  supportsOperation(operation: KeyOperation): boolean {
    return this.applicableOperations.includes(operation);
  }

  encrypt(encryptParameters: EncryptParameters, _options: EncryptOptions): Promise<EncryptResult> {
    const keyPEM = convertJWKtoPEM(this.key);

    const padding =
      encryptParameters.algorithm === "RSA1_5" ? RSA_PKCS1_PADDING : RSA_PKCS1_OAEP_PADDING;

    return Promise.resolve({
      algorithm: encryptParameters.algorithm,
      keyID: this.key.kid,
      result: publicEncrypt(
        { key: keyPEM, padding: padding },
        Buffer.from(encryptParameters.plaintext)
      )
    });
  }

  decrypt(_decryptParameters: DecryptParameters, _options: DecryptOptions): Promise<DecryptResult> {
    throw new LocalCryptographyUnsupportedError(
      "Decrypting using a local JsonWebKey is not supported."
    );
  }

  wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    _options: WrapKeyOptions
  ): Promise<WrapResult> {
    const keyPEM = convertJWKtoPEM(this.key);

    const padding = algorithm === "RSA1_5" ? RSA_PKCS1_PADDING : RSA_PKCS1_OAEP_PADDING;

    return Promise.resolve({
      algorithm: algorithm as KeyWrapAlgorithm,
      result: publicEncrypt({ key: keyPEM, padding }, Buffer.from(keyToWrap)),
      keyID: this.key.kid
    });
  }

  unwrapKey(
    _algorithm: KeyWrapAlgorithm,
    _encryptedKey: Uint8Array,
    _options: UnwrapKeyOptions
  ): Promise<UnwrapResult> {
    throw new LocalCryptographyUnsupportedError(
      "Unwrapping a key using a local JsonWebKey is not supported."
    );
  }

  sign(
    _algorithm: SignatureAlgorithm,
    _digest: Uint8Array,
    _options: SignOptions
  ): Promise<SignResult> {
    throw new LocalCryptographyUnsupportedError(
      "Signing a digest using a local JsonWebKey is not supported."
    );
  }

  verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    _options: VerifyOptions
  ): Promise<VerifyResult> {
    const keyPEM = convertJWKtoPEM(this.key);

    const verifier = createVerify(algorithm, digest);
    return Promise.resolve({
      result: verifier.verify(keyPEM, Buffer.from(signature)),
      keyID: this.key.kid
    });
  }

  private applicableAlgorithms: LocalSupportedAlgorithmName[] = [
    "RSA1_5",
    "RSA-OAEP",
    "PS256",
    "RS256",
    "PS384",
    "RS384",
    "PS512",
    "RS512"
  ];

  private applicableOperations: KeyOperation[] = [
    KnownKeyOperations.Encrypt,
    KnownKeyOperations.Verify,
    KnownKeyOperations.WrapKey
  ];

  /** Mapping between signature algorithms and their corresponding hash algorithms. Externally used for testing. */
  signatureAlgorithmToHashAlgorithm: { [s: string]: string } = {
    PS256: "SHA256",
    RS256: "SHA256",
    PS384: "SHA384",
    RS384: "SHA384",
    PS512: "SHA512",
    RS512: "SHA512"
  };
}
