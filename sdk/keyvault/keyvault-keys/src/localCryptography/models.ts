// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonWebKey } from "../keysModels";

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
 * @internal
 * Abstract representation of a assertion.
 * Assertions verify that the requirements to execute a local cryptography operation are met.
 * @param key - The JSON Web Key that will be used during the local operation.
 * @param operationName - The name of the operation, as in "encrypt", "decrypt", "sign", etc.
 */
export type LocalAssertion = (
  key?: JsonWebKey,
  operationName?: LocalCryptographyOperationName
) => void;

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
 * Abstract representation of a Local Cryptography Operation function.
 * @param keyPEM - The string representation of a PEM key.
 * @param data - The data used on the cryptography operation, in Buffer type.
 */
export type LocalCryptographyOperationFunction = (keyPEM: string, data: Buffer) => Promise<Buffer>;

/**
 * Abstract representation of a Local Cryptography Operation function, this time with an additional signature buffer.
 * @param keyPEM - The string representation of a PEM key.
 * @param data - The data used on the cryptography operation, in Buffer type.
 * @param signature - The signature used on the cryptography operation, in Buffer type.
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
 * A Record containing all of the locally supported algorithms.
 */
export type LocalSupportedAlgorithmsRecord = Record<
  LocalSupportedAlgorithmName,
  LocalSupportedAlgorithm | undefined
>;

export class LocalCryptographyUnsupportedError extends Error {}
