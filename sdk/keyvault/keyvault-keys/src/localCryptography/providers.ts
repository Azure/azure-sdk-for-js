import { RSA_PKCS1_OAEP_PADDING, RSA_PKCS1_PADDING } from "constants";
import { JsonWebKey } from "../keysModels";
import { createVerify, publicEncrypt } from "crypto";
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
import { isNode } from "@azure/core-http";
import { convertJWKtoPEM } from "./conversions";
import { LocalCryptographyUnsupportedError, LocalSupportedAlgorithmName } from "./models";
import { SignatureAlgorithm } from "../cryptographyClientModels";
import { createHash } from "./hash";

export interface LocalCryptographyProvider {
  encrypt(
    key: JsonWebKey,
    encryptParameters: EncryptParameters,
    options: EncryptOptions
  ): Promise<EncryptResult>;

  isApplicable(algorithm: LocalSupportedAlgorithmName): boolean;

  wrapKey(
    key: JsonWebKey,
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions
  ): Promise<WrapResult>;

  verifyData(
    key: JsonWebKey,
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions
  ): Promise<VerifyResult>;

  createHash(algorithm: SignatureAlgorithm, data: Uint8Array): Promise<Buffer>;
}

export class RsaCryptographyProvider implements LocalCryptographyProvider {
  ensureValid(key?: JsonWebKey) {
    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("This operation is only available in NodeJS");
    }
    if (key && key.kty! !== "RSA" && key.kty! !== "RSA-HSM") {
      throw new Error("Key type does not match the algorithm RSA");
    }
    if (key && key.kty! !== "RSA" && key.kty! !== "RSA-HSM") {
      throw new Error("Key type does not match the algorithm RSA");
    }
  }

  isApplicable(algorithm: LocalSupportedAlgorithmName) {
    return this.applicableAlgorithms.includes(algorithm);
  }

  encrypt(
    key: JsonWebKey,
    encryptParameters: EncryptParameters,
    _options: EncryptOptions
  ): Promise<EncryptResult> {
    this.ensureValid(key);
    const keyPEM = convertJWKtoPEM(key);

    const padding =
      encryptParameters.algorithm === "RSA1_5" ? RSA_PKCS1_PADDING : RSA_PKCS1_OAEP_PADDING;

    return Promise.resolve({
      algorithm: encryptParameters.algorithm,
      keyID: key.kid,
      result: publicEncrypt(
        { key: keyPEM, padding: padding },
        Buffer.from(encryptParameters.plaintext)
      )
    });
  }

  wrapKey(
    key: JsonWebKey,
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    _options: WrapKeyOptions
  ): Promise<WrapResult> {
    this.ensureValid(key);
    const keyPEM = convertJWKtoPEM(key);

    const padding = algorithm === "RSA1_5" ? RSA_PKCS1_PADDING : RSA_PKCS1_OAEP_PADDING;

    return Promise.resolve({
      algorithm: algorithm as KeyWrapAlgorithm,
      result: publicEncrypt({ key: keyPEM, padding }, Buffer.from(keyToWrap)),
      keyID: key.kid
    });
  }

  verifyData(
    key: JsonWebKey,
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    _options: VerifyOptions
  ): Promise<VerifyResult> {
    this.ensureValid(key);
    const keyPEM = convertJWKtoPEM(key);

    const verifyAlgorithm = this.signatureAlgorithmToHashAlgorithm[algorithm];
    if (!verifyAlgorithm) {
      throw new Error(`Invalid signature algorithm ${algorithm} passed to local verifyData`);
    }

    const verifier = createVerify(verifyAlgorithm);
    verifier.update(Buffer.from(data));
    verifier.end();
    return Promise.resolve({
      result: verifier.verify(keyPEM, Buffer.from(signature)),
      keyID: key.kid
    });
  }

  createHash(algorithm: SignatureAlgorithm, data: Uint8Array): Promise<Buffer> {
    return createHash(this.signatureAlgorithmToHashAlgorithm[algorithm], data);
  }

  private signatureAlgorithmToHashAlgorithm: { [s: string]: string } = {
    PS256: "SHA256",
    RS256: "SHA256",
    PS384: "SHA384",
    RS384: "SHA384",
    PS512: "SHA512",
    RS512: "SHA512"
  };

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
}

export const localCryptographyProviders = [new RsaCryptographyProvider()];

export function isLocallySupported(algorithm: string): boolean {
  return (
    isNode &&
    localCryptographyProviders.some((provider) =>
      provider.isApplicable(algorithm as LocalSupportedAlgorithmName)
    )
  );
}

export function findLocalProvider(
  algorithm: LocalSupportedAlgorithmName
): LocalCryptographyProvider {
  const applicableProviders = localCryptographyProviders.filter((provider) =>
    provider.isApplicable(algorithm)
  );

  if (applicableProviders.length === 0) {
    // LocalCryptographyUnsupportedError will make us defer to the remote service.
    throw new LocalCryptographyUnsupportedError(
      `No local providers apply to algorithm ${algorithm}.`
    );
  }

  if (applicableProviders.length > 1) {
    // We should never have more than one local crypto provider, so failing fast will help us catch it in development.
    throw new Error(
      `Found multiple local providers that apply to algorithm ${algorithm} when expected at most one.`
    );
  }

  return applicableProviders[0];
}
