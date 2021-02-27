import { RSA_PKCS1_PADDING } from "constants";
import { JsonWebKey } from "../keysModels";
import { publicEncrypt } from "crypto";
import { EncryptOptions, EncryptParameters, EncryptResult } from "..";
import { isNode } from "@azure/core-http";
import { convertJWKtoPEM } from "./conversions";
import { LocalCryptographyUnsupportedError } from "./models";

export abstract class LocalCryptographyProvider {
  encrypt(
    key: JsonWebKey,
    encryptParameters: EncryptParameters,
    options: EncryptOptions
  ): Promise<EncryptResult> {
    this.ensureValid(key);
    return this.runEncrypt(key, encryptParameters, options);
  }

  protected abstract ensureValid(key: JsonWebKey): void;

  protected abstract runEncrypt(
    key: JsonWebKey,
    encryptParameters: EncryptParameters,
    options: EncryptOptions
  ): Promise<EncryptResult>;
}

export class Rsa15CryptographyProvider extends LocalCryptographyProvider {
  ensureValid(key: JsonWebKey) {
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

  runEncrypt(
    key: JsonWebKey,
    encryptParameters: EncryptParameters,
    _options: EncryptOptions
  ): Promise<EncryptResult> {
    console.log("FFFFFFFFFFFFFFF");
    const keyPEM = convertJWKtoPEM(key);
    return Promise.resolve({
      algorithm: encryptParameters.algorithm,
      keyID: key.kid,
      result: publicEncrypt(
        { key: keyPEM, padding: RSA_PKCS1_PADDING },
        Buffer.from(encryptParameters.plaintext)
      )
    });
  }
}

export const localProviders: { [s: string]: LocalCryptographyProvider | undefined } = {
  RSA1_5: new Rsa15CryptographyProvider()
} as const;
