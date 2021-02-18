// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CryptographyOptions } from "./keysModels";

import {
  JsonWebKeyCurveName as KeyCurveName,
  KnownJsonWebKeyCurveName as KnownKeyCurveNames,
  JsonWebKeyEncryptionAlgorithm as EncryptionAlgorithm,
  KnownJsonWebKeyEncryptionAlgorithm as KnownEncryptionAlgorithms,
  JsonWebKeySignatureAlgorithm as SignatureAlgorithm,
  KnownJsonWebKeySignatureAlgorithm as KnownSignatureAlgorithms
} from "./generated/models";

export {
  KeyCurveName,
  KnownKeyCurveNames,
  EncryptionAlgorithm,
  KnownEncryptionAlgorithms,
  SignatureAlgorithm,
  KnownSignatureAlgorithms
};

/**
 * Supported algorithms for key wrapping/unwrapping
 */
export type KeyWrapAlgorithm =
  | "A128KW"
  | "A192KW"
  | "A256KW"
  | "RSA-OAEP"
  | "RSA-OAEP-256"
  | "RSA1_5";

/**
 * Result of the {@link encrypt} operation.
 */
export interface EncryptResult {
  /**
   * Result of the {@link encrypt} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The {@link EncryptionAlgorithm} used to encrypt the data.
   */
  algorithm: EncryptionAlgorithm;
  /**
   * The ID of the Key Vault Key used to encrypt the data.
   */
  keyID?: string;
  /**
   * The initialization vector used for encryption.
   */
  iv?: Uint8Array;
  /**
   * The authentication tag resulting from encryption with a symmetric key including A128GCM, A192GCM, and A256GCM.
   */
  authenticationTag?: Uint8Array;
  /**
   * Additional data that is authenticated during decryption but not encrypted.
   */
  additionalAuthenticatedData?: Uint8Array;
}
// TODO: test the additional values set above

/**
 * Result of the {@link wrap} operation.
 */
export interface WrapResult {
  /**
   * Result of the {@link wrap} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the Key Vault Key used to wrap the data.
   */
  keyID?: string;
  /**
   * The {@link EncryptionAlgorithm} used to wrap the data.
   */
  algorithm: KeyWrapAlgorithm;
}

/**
 * Result of the {@link unwrap} operation.
 */
export interface UnwrapResult {
  /**
   * Result of the {@link unwrap} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the Key Vault Key used to unwrap the data.
   */
  keyID?: string;
  /**
   * The {@link KeyWrapAlgorithm} used to unwrap the data.
   */
  algorithm: KeyWrapAlgorithm;
}
/**
 * Result of the {@link decrypt} operation.
 */
export interface DecryptResult {
  /**
   * Result of the {@link decrypt} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the Key Vault Key used to decrypt the encrypted data.
   */
  keyID?: string;
  /**
   * The {@link EncryptionAlgorithm} used to decrypt the encrypted data.
   */
  algorithm: EncryptionAlgorithm;
}

/**
 * Result of the {@link sign} operation.
 */
export interface SignResult {
  /**
   * Result of the {@link sign} operation in bytes.
   */
  result: Uint8Array;
  /**
   * The ID of the Key Vault Key used to sign the data.
   */
  keyID?: string;
  /**
   * The {@link EncryptionAlgorithm} used to sign the data.
   */
  algorithm: SignatureAlgorithm;
}

/**
 * Result of the {@link verify} operation.
 */
export interface VerifyResult {
  /**
   * Result of the {@link verify} operation in bytes.
   */
  result: boolean;
  /**
   * The ID of the Key Vault Key used to verify the data.
   */
  keyID?: string;
}

/**
 * Common optional properties for encrypt, decrypt, wrap and unwrap.
 */
export interface KeyOperationsOptions extends CryptographyOptions {}

/**
 * Options for {@link encrypt}.
 */
export interface EncryptOptions extends KeyOperationsOptions {}

/**
 * Options for {@link decrypt}.
 */
export interface DecryptOptions extends KeyOperationsOptions {}

/**
 * Options for {@link sign}.
 */
export interface SignOptions extends CryptographyOptions {}

/**
 * Options for {@link verify}.
 */
export interface VerifyOptions extends CryptographyOptions {}

/**
 * Options for {@link wrapKey}.
 */
export interface WrapKeyOptions extends KeyOperationsOptions {}

/**
 * Options for {@link unwrapKey}.
 */
export interface UnwrapKeyOptions extends KeyOperationsOptions {}

interface BaseEncryptionParameters {
  /**
   *
   */
  plaintext: Uint8Array;
}

export interface RsaEncryptionParameters extends BaseEncryptionParameters {
  algorithm: "RSA1_5" | "RSA-OAEP" | "RSA-OAEP-256";
}

export interface AesGcmEncryptionParameters extends BaseEncryptionParameters {
  algorithm: "A128GCM" | "A192GCM" | "A256GCM";
  additionalAuthenticatedData?: Uint8Array;
}

export interface AesCbcEncryptionParameters extends BaseEncryptionParameters {
  algorithm: "A128CBC" | "A192CBC" | "A256CBC";
  iv?: Uint8Array;
}

export interface AesCbcPadEncryptionParameters extends BaseEncryptionParameters {
  algorithm: "A128CBCPAD" | "A192CBCPAD" | "A256CBCPAD";
  iv?: Uint8Array;
}

export type EncryptParameters =
  | RsaEncryptionParameters
  | AesGcmEncryptionParameters
  | AesCbcEncryptionParameters
  | AesCbcPadEncryptionParameters;

interface BaseDecryptionParameters {
  ciphertext: Uint8Array;
}

export interface RsaDecryptionParameters extends BaseDecryptionParameters {
  algorithm: "RSA1_5" | "RSA-OAEP" | "RSA-OAEP-256";
}

export interface AesGcmDecryptionParameters extends BaseDecryptionParameters {
  algorithm: "A128GCM" | "A192GCM" | "A256GCM";
  iv?: Uint8Array;
  authenticationTag?: Uint8Array;
  additionalAuthenticatedData?: Uint8Array;
}

export interface AesCbcDecryptionParameters extends BaseDecryptionParameters {
  algorithm: "A128CBC" | "A192CBC" | "A256CBC";
  iv?: Uint8Array;
}

export interface AesCbcPadDecryptionParameters extends BaseDecryptionParameters {
  algorithm: "A128CBCPAD" | "A192CBCPAD" | "A256CBCPAD";
  iv?: Uint8Array;
}

export type DecryptParameters =
  | RsaDecryptionParameters
  | AesGcmDecryptionParameters
  | AesCbcDecryptionParameters
  | AesCbcPadDecryptionParameters;
