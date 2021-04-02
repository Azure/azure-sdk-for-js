// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { publicEncrypt, createVerify } from "crypto";
import * as constants from "constants";
import { isNode } from "@azure/core-http";
import { JsonWebKey, KeyOperation } from "../keysModels";
import {
  LocalAssertion,
  LocalCryptographyOperationName,
  LocalCryptographyUnsupportedError,
  LocalSupportedAlgorithm,
  LocalSupportedAlgorithmName,
  LocalSupportedAlgorithmsRecord
} from "./models";
import { createHash } from "./hash";

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
 * pipeAssertions allows us to execute a sequence of assertions.
 * @param assertions - One or more LocalAssertions
 */
const pipeAssertions = (...assertionsParam: LocalAssertion[]): LocalAssertion => (
  ...params
): void => {
  for (const assertion of assertionsParam) {
    assertion(...params);
  }
};

/**
 * Local support of the RSA1_5 algorithm.
 * We currently only support encrypting and wrapping keys with it.
 */
const RSA1_5: LocalSupportedAlgorithm = {
  validate: pipeAssertions(assertions.keyOps, assertions.rsa, assertions.nodeOnly),
  operations: {
    async encrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    },
    async wrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    }
  }
};

/**
 * Local support of the RSA-OAEP algorithm.
 * We currently only support encrypting and wrapping keys with it.
 */
const RSA_OAEP: LocalSupportedAlgorithm = {
  validate: pipeAssertions(assertions.keyOps, assertions.rsa, assertions.nodeOnly),
  operations: {
    async encrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt(keyPEM, data);
    },
    async wrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt(keyPEM, data);
    }
  }
};

/**
 * A union type representing the names of all of the locally supported sign algorithms.
 */
export type SignAlgorithmName = "SHA256" | "SHA384" | "SHA512";

/**
 * Since sign algorithms behave almost the same, we're making a generator to save up code.
 * We receive the sign algorithm, from the list of names in `SignAlgorithmName`,
 * then we generate a `LocalSupportedAlgorithm` that only create hashes and verifies signatures.
 */
const makeSigner = (signAlgorithm: SignAlgorithmName): LocalSupportedAlgorithm => {
  return {
    validate: pipeAssertions(assertions.keyOps, assertions.nodeOnly),
    signAlgorithm,
    operations: {
      async createHash(_keyPEM: string, data: Buffer): Promise<Buffer> {
        return createHash(signAlgorithm, data);
      },
      async verify(keyPEM: string, data: Buffer, signature: Buffer): Promise<boolean> {
        const verifier = createVerify(signAlgorithm);
        verifier.update(data);
        verifier.end();
        return verifier.verify(keyPEM, signature);
      }
    }
  };
};

/**
 * A plain object containing all of the locally supported algorithms.
 */
export const localSupportedAlgorithms: LocalSupportedAlgorithmsRecord = {
  RSA1_5,
  "RSA-OAEP": RSA_OAEP,
  PS256: makeSigner("SHA256"),
  RS256: makeSigner("SHA256"),
  PS384: makeSigner("SHA384"),
  RS384: makeSigner("SHA384"),
  PS512: makeSigner("SHA512"),
  RS512: makeSigner("SHA512")
};

/**
 * Checks whether a given algorithm name is supported or not.
 * @param algorithm - Name of the algorithm
 */
export function isLocallySupported(algorithm: string): boolean {
  return !!localSupportedAlgorithms[algorithm as LocalSupportedAlgorithmName];
}
