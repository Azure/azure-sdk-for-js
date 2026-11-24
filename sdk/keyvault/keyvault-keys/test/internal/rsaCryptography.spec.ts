// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyObject } from "node:crypto";
import { constants, generateKeyPairSync, sign } from "node:crypto";
import type { JsonWebKey, KeyVaultKey } from "../../src/index.js";
import { CryptographyClient } from "../../src/index.js";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

describe("RSA local signature verification", () => {
  const keyID = "https://my.vault.azure.net/keys/key/v1";
  const data = Buffer.from("RSA signature verification");
  const algorithms = [
    { name: "RS256", hash: "sha256", padding: constants.RSA_PKCS1_PADDING, saltLength: 32 },
    { name: "PS256", hash: "sha256", padding: constants.RSA_PKCS1_PSS_PADDING, saltLength: 32 },
    { name: "RS384", hash: "sha384", padding: constants.RSA_PKCS1_PADDING, saltLength: 48 },
    { name: "PS384", hash: "sha384", padding: constants.RSA_PKCS1_PSS_PADDING, saltLength: 48 },
    { name: "RS512", hash: "sha512", padding: constants.RSA_PKCS1_PADDING, saltLength: 64 },
    { name: "PS512", hash: "sha512", padding: constants.RSA_PKCS1_PSS_PADDING, saltLength: 64 },
  ] as const;
  let privateKey: KeyObject;
  let publicKey: JsonWebKey;

  beforeAll(() => {
    const keyPair = generateKeyPairSync("rsa", { modulusLength: 2048 });
    privateKey = keyPair.privateKey;
    const { n, e } = keyPair.publicKey.export({ format: "jwk" });
    if (!n || !e) {
      throw new Error("The generated RSA public key must have a modulus and exponent.");
    }
    publicKey = {
      kid: keyID,
      keyOps: ["verify"],
      n: Buffer.from(n, "base64url"),
      e: Buffer.from(e, "base64url"),
    };
  });

  for (const kty of ["RSA", "RSA-HSM"]) {
    for (const keySource of ["JsonWebKey", "KeyVaultKey"]) {
      describe(`${kty} ${keySource}`, () => {
        let client: CryptographyClient;
        const getToken = vi.fn(async () => {
          throw new Error("Local verification must not request credentials.");
        });
        const sendRequest = vi.fn(async () => {
          throw new Error("Local verification must not send HTTP requests.");
        });

        beforeEach(() => {
          getToken.mockClear();
          sendRequest.mockClear();
          const jwk: JsonWebKey = { ...publicKey, kty };
          if (keySource === "JsonWebKey") {
            client = new CryptographyClient(jwk);
          } else {
            const key: KeyVaultKey = {
              id: keyID,
              name: "key",
              key: jwk,
              keyOperations: ["verify"],
              properties: { name: "key", vaultUrl: "https://my.vault.azure.net" },
            };
            client = new CryptographyClient(key, { getToken }, { httpClient: { sendRequest } });
          }
        });

        afterEach(() => {
          expect(getToken).not.toHaveBeenCalled();
          expect(sendRequest).not.toHaveBeenCalled();
        });

        for (const signingAlgorithm of algorithms) {
          describe(`a ${signingAlgorithm.name} signature`, () => {
            let signature: Buffer;

            beforeAll(() => {
              signature = sign(signingAlgorithm.hash, data, {
                key: privateKey,
                padding: signingAlgorithm.padding,
                saltLength: signingAlgorithm.saltLength,
              });
            });

            for (const verificationAlgorithm of algorithms) {
              const shouldVerify = verificationAlgorithm.name === signingAlgorithm.name;
              it(`${shouldVerify ? "accepts" : "rejects"} verification as ${verificationAlgorithm.name}`, async () => {
                const result = await client.verifyData(verificationAlgorithm.name, data, signature);
                expect(result).toEqual({ keyID, result: shouldVerify });
              });
            }

            it("rejects modified data", async () => {
              const result = await client.verifyData(
                signingAlgorithm.name,
                Buffer.from("Different data"),
                signature,
              );
              expect(result.result).toBe(false);
            });

            it("rejects a modified signature", async () => {
              const modifiedSignature = Buffer.from(signature);
              modifiedSignature[0] ^= 1;
              const result = await client.verifyData(
                signingAlgorithm.name,
                data,
                modifiedSignature,
              );
              expect(result.result).toBe(false);
            });

            if (signingAlgorithm.padding === constants.RSA_PKCS1_PSS_PADDING) {
              for (const saltLength of [
                0,
                signingAlgorithm.saltLength - 1,
                signingAlgorithm.saltLength + 1,
                constants.RSA_PSS_SALTLEN_MAX_SIGN,
              ]) {
                it(`rejects a PSS signature with non-digest salt length ${saltLength}`, async () => {
                  const nonstandardSignature = sign(signingAlgorithm.hash, data, {
                    key: privateKey,
                    padding: constants.RSA_PKCS1_PSS_PADDING,
                    saltLength,
                  });
                  const result = await client.verifyData(
                    signingAlgorithm.name,
                    data,
                    nonstandardSignature,
                  );
                  expect(result.result).toBe(false);
                });
              }
            }
          });
        }
      });
    }
  }
});
