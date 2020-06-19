// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { publicDecrypt, publicEncrypt, createVerify, createSign } from "crypto";
import * as constants from "constants";
import { isNode } from "@azure/core-http";
import { JsonWebKey, KeyOperation } from "../keysModels";
import { LocalCryptographyUnsupportedError } from "./models";
import { createHash } from "./hash";

export type LocalValidator = (
  key: JsonWebKey,
  operationName: LocalCryptographyOperationName,
  algorithmName: LocalSupportedAlgorithmName
) => void;

const validators: Record<"keyOps" | "rsa" | "nodeOnly", LocalValidator> = {
  keyOps(key: JsonWebKey, operationName: LocalCryptographyOperationName): void {
    if (key.keyOps && !key.keyOps.includes(operationName as KeyOperation)) {
      throw new Error(`Key does not support the ${operationName} operation`);
    }
  },
  rsa(key: JsonWebKey): void {
    if (key.kty! !== "RSA") {
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
  | "decrypt"
  | "wrapKey"
  | "unwrapKey"
  | "createHash"
  | "signData"
  | "verifyData";

export type LocalCryptographyOperationFunction = (
  keyPem: string,
  ...params: Buffer[]
) => Promise<Buffer | boolean>;

export type LocalCryptographyOperations = Record<
  LocalCryptographyOperationName,
  LocalCryptographyOperationFunction
>;

export interface LocalSupportedAlgorithm {
  validate: LocalValidator;
  operations: RequireAtLeastOne<LocalCryptographyOperations>;
}

export type LocalSupportedAlgorithmName =
  | "RSA1_5"
  | "RSA-OAEP"
  | "ES256"
  | "PS256"
  | "RS256"
  | "ES384"
  | "PS384"
  | "RS384"
  | "ES512"
  | "PS512"
  | "RS512";

const RSA1_5: LocalSupportedAlgorithm = {
  validate: pipeValidators(validators.keyOps, validators.rsa, validators.nodeOnly),
  operations: {
    async encrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    },
    async decrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicDecrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    },
    async wrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    },
    async unwrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicDecrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    }
  }
};

const RSA_OAEP: LocalSupportedAlgorithm = {
  validate: pipeValidators(validators.keyOps, validators.rsa, validators.nodeOnly),
  operations: {
    async encrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt(keyPEM, data);
    },
    async decrypt(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicDecrypt(keyPEM, data);
    },
    async wrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicEncrypt(keyPEM, data);
    },
    async unwrapKey(keyPEM: string, data: Buffer): Promise<Buffer> {
      return publicDecrypt(keyPEM, data);
    }
  }
};

const makeSigner: (signAlgorithm: string) => LocalSupportedAlgorithm = (signAlgorithm: string) => {
  return {
    validate: pipeValidators(validators.keyOps, validators.nodeOnly),
    operations: {
      async createHash(_keyPEM: string, data: Buffer): Promise<Buffer> {
        return createHash(signAlgorithm, data)
      },
      async signData(keyPEM: string, data: Buffer): Promise<Buffer> {
        const digest = await createHash(signAlgorithm, data);
        const sign = createSign(signAlgorithm);
        sign.write(digest);
        sign.end();
        return sign.sign(keyPEM);
      },
      async verifyData(keyPEM: string, data: Buffer, signature: Buffer): Promise<boolean> {
        const verifier = createVerify(signAlgorithm);
        verifier.update(data);
        verifier.end();
        return verifier.verify(keyPEM, signature);
      }
    }
  };
};

export const localSupportedAlgorithms: Record<
  LocalSupportedAlgorithmName,
  LocalSupportedAlgorithm
> = {
  RSA1_5,
  "RSA-OAEP": RSA_OAEP,
  ES256: makeSigner("SHA256"),
  PS256: makeSigner("SHA256"),
  RS256: makeSigner("SHA256"),
  ES384: makeSigner("SHA384"),
  PS384: makeSigner("SHA384"),
  RS384: makeSigner("SHA384"),
  ES512: makeSigner("SHA512"),
  PS512: makeSigner("SHA512"),
  RS512: makeSigner("SHA512")
};
