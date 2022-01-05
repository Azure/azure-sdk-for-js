// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import * as crypto from "crypto";
import {
  EncryptOptions,
  EncryptResult,
  DecryptOptions,
  DecryptResult,
  KeyWrapAlgorithm,
  WrapKeyOptions,
  WrapResult,
  UnwrapKeyOptions,
  UnwrapResult,
  SignOptions,
  SignResult,
  VerifyOptions,
  VerifyResult,
  AesCbcEncryptParameters,
  JsonWebKey,
} from "..";
import { AesCbcDecryptParameters } from "../cryptographyClientModels";
import {
  CryptographyProvider,
  CryptographyProviderOperation,
  LocalCryptographyUnsupportedError,
} from "./models";

/**
 * An AES cryptography provider supporting AES algorithms.
 * @internal
 */
export class AesCryptographyProvider implements CryptographyProvider {
  private key: JsonWebKey;
  constructor(key: JsonWebKey) {
    this.key = key;
  }
  encrypt(
    encryptParameters: AesCbcEncryptParameters,
    _options?: EncryptOptions
  ): Promise<EncryptResult> {
    const { algorithm, keySizeInBytes } = this.supportedAlgorithms[encryptParameters.algorithm];
    const iv = encryptParameters.iv || crypto.randomBytes(16);

    this.ensureValid(keySizeInBytes);

    const cipher = crypto.createCipheriv(algorithm, this.key.k!.subarray(0, keySizeInBytes), iv);
    let encrypted = cipher.update(Buffer.from(encryptParameters.plaintext));
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return Promise.resolve({
      algorithm: encryptParameters.algorithm,
      result: encrypted,
      iv: iv,
    });
  }

  decrypt(
    decryptParameters: AesCbcDecryptParameters,
    _options?: DecryptOptions
  ): Promise<DecryptResult> {
    const { algorithm, keySizeInBytes } = this.supportedAlgorithms[decryptParameters.algorithm];

    this.ensureValid(keySizeInBytes);

    const decipher = crypto.createDecipheriv(
      algorithm,
      this.key.k!.subarray(0, keySizeInBytes),
      decryptParameters.iv
    );
    let dec = decipher.update(Buffer.from(decryptParameters.ciphertext));
    dec = Buffer.concat([dec, decipher.final()]);

    return Promise.resolve({
      algorithm: decryptParameters.algorithm,
      result: dec,
    });
  }

  isSupported(algorithm: string, operation: CryptographyProviderOperation): boolean {
    if (!this.key.k) {
      return false;
    }

    if (!Object.keys(this.supportedAlgorithms).includes(algorithm)) {
      return false;
    }

    if (!this.supportedOperations.includes(operation)) {
      return false;
    }

    return true;
  }

  /**
   * The set of algorithms this provider supports.
   * For AES encryption, the values include the underlying algorithm used in crypto
   * as well as the key size in bytes.
   *
   * We start with support for A[SIZE]CBCPAD which uses the PKCS padding (the default padding scheme in node crypto)
   */
  private supportedAlgorithms: { [s: string]: { algorithm: string; keySizeInBytes: number } } = {
    A128CBCPAD: {
      algorithm: "aes-128-cbc",
      keySizeInBytes: 128 >> 3,
    },
    A192CBCPAD: {
      algorithm: "aes-192-cbc",
      keySizeInBytes: 192 >> 3,
    },
    A256CBCPAD: {
      algorithm: "aes-256-cbc",
      keySizeInBytes: 256 >> 3,
    },
  };

  private supportedOperations: CryptographyProviderOperation[] = ["encrypt", "decrypt"];

  wrapKey(
    _algorithm: KeyWrapAlgorithm,
    _keyToWrap: Uint8Array,
    _options?: WrapKeyOptions
  ): Promise<WrapResult> {
    throw new LocalCryptographyUnsupportedError(
      "Wrapping a key using a local JsonWebKey is not supported for AES."
    );
  }

  unwrapKey(
    _algorithm: KeyWrapAlgorithm,
    _encryptedKey: Uint8Array,
    _options?: UnwrapKeyOptions
  ): Promise<UnwrapResult> {
    throw new LocalCryptographyUnsupportedError(
      "Unwrapping a key using a local JsonWebKey is not supported for AES."
    );
  }

  sign(_algorithm: string, _digest: Uint8Array, _options?: SignOptions): Promise<SignResult> {
    throw new LocalCryptographyUnsupportedError(
      "Signing using a local JsonWebKey is not supported for AES."
    );
  }

  signData(_algorithm: string, _data: Uint8Array, _options?: SignOptions): Promise<SignResult> {
    throw new LocalCryptographyUnsupportedError(
      "Signing using a local JsonWebKey is not supported for AES."
    );
  }

  verify(
    _algorithm: string,
    _digest: Uint8Array,
    _signature: Uint8Array,
    _options?: VerifyOptions
  ): Promise<VerifyResult> {
    throw new LocalCryptographyUnsupportedError(
      "Verifying using a local JsonWebKey is not supported for AES."
    );
  }
  verifyData(
    _algorithm: string,
    _data: Uint8Array,
    _signature: Uint8Array,
    _updatedOptions: OperationOptions
  ): Promise<VerifyResult> {
    throw new LocalCryptographyUnsupportedError(
      "Verifying using a local JsonWebKey is not supported for AES."
    );
  }

  private ensureValid(keySizeInBytes: number): void {
    if (
      this.key &&
      this.key.kty?.toUpperCase() !== "OCT" &&
      this.key.kty?.toUpperCase() !== "OCT-HSM"
    ) {
      throw new Error("Key type does not match the key type oct or oct-hsm");
    }

    if (!this.key.k) {
      throw new Error("Symmetric key is required");
    }

    if (this.key.k.length < keySizeInBytes) {
      throw new Error(`Key must be at least ${keySizeInBytes << 3} bits`);
    }
  }
}
