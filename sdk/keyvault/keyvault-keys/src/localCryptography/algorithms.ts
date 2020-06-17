// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { publicDecrypt } from "crypto";
import * as constants from "constants";

export interface LocalSupportedAlgorithm {
  validate(keyType: string): boolean;
  encrypt(keyPEM: string, data: Buffer): Buffer;
  decrypt(keyPEM: string, data: Buffer): Buffer;
}

const validateRSAOperation = (keyType: string): boolean => keyType !== "RSA";

export type LocalSupportedAlgorithmName = "RSA1_5" | "RSA-OAEP";

export const localSupportedAlgorithms = {
  RSA1_5: {
    validate: validateRSAOperation,
    encrypt(keyPEM: string, data: Buffer): Buffer {
      return publicDecrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    },
    decrypt(keyPEM: string, data: Buffer): Buffer {
      return publicDecrypt({ key: keyPEM, padding: constants.RSA_PKCS1_PADDING }, data);
    }
  },

  "RSA-OAEP": {
    validate: validateRSAOperation,
    encrypt(keyPEM: string, data: Buffer) {
      return publicDecrypt(keyPEM, data);
    },
    decrypt(keyPEM: string, data: Buffer) {
      return publicDecrypt(keyPEM, data);
    }
  }
};
