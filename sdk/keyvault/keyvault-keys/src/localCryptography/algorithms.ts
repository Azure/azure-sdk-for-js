// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { publicEncrypt, createVerify } from "crypto";
import * as constants from "constants";
import { isNode } from "@azure/core-http";
import { JsonWebKey, KeyOperation } from "../keysModels";
import { LocalCryptographyUnsupportedError } from "./models";
import { createHash } from "./hash";

export type LocalValidator = (
  key?: JsonWebKey,
  operationName?: LocalCryptographyOperationName
) => void;

export const validators: Record<"keyOps" | "rsa" | "nodeOnly", LocalValidator> = {
  keyOps(key?: JsonWebKey, operationName?: LocalCryptographyOperationName): void {
    if (key && key.keyOps && !key.keyOps.includes(operationName as KeyOperation)) {
      throw new Error(`Key does not support the ${operationName} operation`);
    }
  },
  rsa(key?: JsonWebKey): void {
    if (key && key.kty! !== "RSA") {
      throw new Error("Key type does not match the algorithm RSA");
    }
  },
  nodeOnly(): void {
    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("This operation is only available in NodeJS");
    }
  }
};

const pipeValidators = (...validators: LocalValidator[]): LocalValidator => (...params): void => {
  for (const validator of validators) {
    validator(...params);
  }
};

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type LocalCryptographyOperationName =
  | "encrypt"
  | "wrapKey"
  | "createHash"
  | "verify";

export type LocalCryptographyOperationFunction = (keyPEM: string, data: Buffer) => Promise<Buffer>;

export type LocalCryptographyOperationFunctionWithSignature = (
  keyPEM: string,
  data: Buffer,
  signature: Buffer
) => Promise<boolean>;

export type LocalCryptographyOperations = Record<
  LocalCryptographyOperationName,
  LocalCryptographyOperationFunction | LocalCryptographyOperationFunctionWithSignature
>;

export interface LocalSupportedAlgorithm {
  validate: LocalValidator;
  signAlgorithm?: string,
  operations: RequireAtLeastOne<LocalCryptographyOperations>;
}

export type LocalSupportedAlgorithmName =
  | "RSA1_5"
  | "RSA-OAEP"
  | "PS256"
  | "RS256"
  | "PS384"
  | "RS384"
  | "PS512"
  | "RS512";

const RSA1_5: LocalSupportedAlgorithm = {
  validate: pipeValidators(validators.keyOps, validators.rsa, validators.nodeOnly),
  operations: {
    async encrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    },
    async wrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    }
  }
};

const RSA_OAEP: LocalSupportedAlgorithm = {
  validate: pipeValidators(validators.keyOps, validators.rsa, validators.nodeOnly),
  operations: {
    async encrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt(keyPEM, data);
    },
    async wrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt(keyPEM, data);
    }
  }
};

export type SignAlgorithmName = "SHA256" | "SHA384" | "SHA512";

const makeSigner = (signAlgorithm: SignAlgorithmName): LocalSupportedAlgorithm => {
  return {
    validate: pipeValidators(validators.keyOps, validators.nodeOnly),
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

export type LocalSupportedAlgorithmsRecord = Record<
  LocalSupportedAlgorithmName,
  LocalSupportedAlgorithm
>;
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
