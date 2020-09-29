// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";
import { JsonWebKey, KeyOperation } from "../keysModels";
import { LocalCryptographyUnsupportedError } from "./models";

/**
 * This file contains the implementation of local supported algorithms, which
 * consist of wrappers around methods already available as part of NodeJS.
 *
 * The goal of this file is to abstract away how we implement these algorithms,
 * since we might be using environment-specific code or dependencies.
 *
 * Some algorithms can't be implemented neither in the Browser or in Node
 * without third party dependencies or considerable development.
 *
 * We currently don't support any operation that requires the private data of a
 * key. Once we implement support for the private part of JWK keys and PEM keys,
 * we will be able to increase the support of our existing algorithms.
 */

/**
 * @internal
 * @ignore
 * Abstract representation of a assertion.
 * Assertions verify that the requirements to execute a local cryptography operation are met.
 * @param key The JSON Web Key that will be used during the local operation.
 * @param operationName The name of the operation, as in "encrypt", "decrypt", "sign", etc.
 */
export type LocalAssertion = (
  key?: JsonWebKey,
  operationName?: LocalCryptographyOperationName
) => void;

/**
 * @internal
 * @ignore
 * The list of known assertions so far.
 * Assertions verify that the requirements to execute a local cryptography operation are met.
 */
export const assertions: Record<"keyOps" | "rsa" | "nodeOnly", LocalAssertion> = {
  /**
   * Validates that the target local cryptography operation is allowed by the key's "keyOps" property.
   */
  keyOps(key?: JsonWebKey, operationName?: LocalCryptographyOperationName): void {
    if (key && key.keyOps && !key.keyOps.includes(operationName as KeyOperation)) {
      throw new Error(`Key does not support the ${operationName} operation`);
    }
  },
  /**
   * Validates that the key type is "RSA". For operations on RSA keys.
   */
  rsa(key?: JsonWebKey): void {
    if (key && key.kty! !== "RSA" && key.kty! !== "RSA-HSM") {
      throw new Error("Key type does not match the algorithm RSA");
    }
  },
  /**
   * Passes only when the operation is being executed in NodeJS.
   * For operations that can only run in NodeJS.
   */
  nodeOnly(): void {
    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("This operation is only available in NodeJS");
    }
  }
};

/**
 * TypeScript fancy for making plain objects require at least one key-value pair of another set of key-values.
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/**
 * Union type representing the names of the supported local cryptography operations.
 */
export type LocalCryptographyOperationName = "encrypt" | "wrapKey" | "createHash" | "verify";

/**
 * Abstract representation of a Local Cryptography Operation function.
 * @param keyPEM The string representation of a PEM key.
 * @param data The data used on the cryptography operation, in Buffer type.
 */
export type LocalCryptographyOperationFunction = (keyPEM: string, data: Buffer) => Promise<Buffer>;

/**
 * Abstract representation of a Local Cryptography Operation function, this time with an additional signature buffer.
 * @param keyPEM The string representation of a PEM key.
 * @param data The data used on the cryptography operation, in Buffer type.
 * @param signature The signature used on the cryptography operation, in Buffer type.
 */
export type LocalCryptographyOperationFunctionWithSignature = (
  keyPEM: string,
  data: Buffer,
  signature: Buffer
) => Promise<boolean>;

/**
 * Key-value map of local cryptography operations.
 */
export type LocalCryptographyOperations = Record<
  LocalCryptographyOperationName,
  LocalCryptographyOperationFunction | LocalCryptographyOperationFunctionWithSignature
>;

/**
 * Abstract representation of a locally supported cryptography algorithm, with its assertions,
 * and its operations.
 */
export interface LocalSupportedAlgorithm {
  /**
   * List of assertions that need to pass in order to execute this cryptography operation.
   */
  validate: LocalAssertion;
  /**
   * Optional algorithm used to sign or validate data.
   */
  signAlgorithm?: string;
  /**
   * List of local cryptography operations supported by an algorithm.
   */
  operations: RequireAtLeastOne<LocalCryptographyOperations>;
}

/**
 * A union type representing the names of all of the locally supported algorithms.
 */
export type LocalSupportedAlgorithmName =
  | "RSA1_5"
  | "RSA-OAEP"
  | "PS256"
  | "RS256"
  | "PS384"
  | "RS384"
  | "PS512"
  | "RS512";

/**
 * A union type representing the names of all of the locally supported sign algorithms.
 */
export type SignAlgorithmName = "SHA256" | "SHA384" | "SHA512";

/**
 * A Record containing all of the locally supported algorithms.
 */
export type LocalSupportedAlgorithmsRecord = Record<
  LocalSupportedAlgorithmName,
  LocalSupportedAlgorithm | undefined
>;

/**
 * A plain object containing all of the locally supported algorithms.
 */
export const localSupportedAlgorithms: LocalSupportedAlgorithmsRecord = {
  RSA1_5: undefined,
  "RSA-OAEP": undefined,
  PS256: undefined,
  RS256: undefined,
  PS384: undefined,
  RS384: undefined,
  PS512: undefined,
  RS512: undefined
};

/**
 * Checks whether a given algorithm name is supported or not.
 * @param algorithm string name of the algorithm
 */
export function isLocallySupported(algorithm: string): boolean {
  return !!localSupportedAlgorithms[algorithm as LocalSupportedAlgorithmName];
}
