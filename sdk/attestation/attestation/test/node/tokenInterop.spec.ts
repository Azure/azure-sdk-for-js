// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { sign as nodeSign, verify as nodeVerify } from "node:crypto";
import { base64UrlDecodeString, base64UrlEncodeByteArray } from "../../src/utils/base64.js";
import { stringToBytes } from "../../src/utils/utf8.js";
import { AttestationTokenImpl } from "../../src/models/attestationToken.js";
import {
  certificateToBase64,
  createECDSKey,
  createRSAKey,
  createX509Certificate,
} from "../utils/cryptoUtils.js";
import { assert, describe, it } from "vitest";

type SupportedAlgorithm = "RS256" | "ES256";

function createNodeSignedToken(
  body: string,
  privateKey: string,
  certificate: string,
  algorithm: SupportedAlgorithm,
): string {
  const header = base64UrlEncodeByteArray(
    stringToBytes(JSON.stringify({ alg: algorithm, x5c: [certificateToBase64(certificate)] })),
  );
  const payload = base64UrlEncodeByteArray(stringToBytes(body));
  const signingInput = stringToBytes(`${header}.${payload}`);
  const signature =
    algorithm === "RS256"
      ? nodeSign("sha256", signingInput, privateKey)
      : nodeSign("sha256", signingInput, {
          key: privateKey,
          dsaEncoding: "ieee-p1363",
        });
  return `${header}.${payload}.${base64UrlEncodeByteArray(signature)}`;
}

function verifyTokenWithNode(
  token: string,
  certificate: string,
  algorithm: SupportedAlgorithm,
): boolean {
  const [header, payload, encodedSignature] = token.split(".");
  const signingInput = stringToBytes(`${header}.${payload}`);
  const signature = base64UrlDecodeString(encodedSignature);
  return algorithm === "RS256"
    ? nodeVerify("sha256", signingInput, certificate, signature)
    : nodeVerify(
        "sha256",
        signingInput,
        { key: certificate, dsaEncoding: "ieee-p1363" },
        signature,
      );
}

describe("Attestation token Node interoperability", () => {
  for (const [algorithm, createKey] of [
    ["RS256", createRSAKey],
    ["ES256", createECDSKey],
  ] as const) {
    it(`produces ${algorithm} tokens accepted by Node crypto`, () => {
      const [privateKey, publicKey] = createKey();
      const certificate = createX509Certificate(privateKey, publicKey, "certificate");
      const token = AttestationTokenImpl.create({
        body: JSON.stringify({ source: "attestation" }),
        privateKey,
        certificate,
      });

      assert.isTrue(verifyTokenWithNode(token.serialize(), certificate, algorithm));
    });

    it(`accepts ${algorithm} tokens produced by Node crypto`, () => {
      const [privateKey, publicKey] = createKey();
      const certificate = createX509Certificate(privateKey, publicKey, "certificate");
      const token = new AttestationTokenImpl(
        createNodeSignedToken(
          JSON.stringify({ source: "node" }),
          privateKey,
          certificate,
          algorithm,
        ),
      );

      assert.deepEqual(token.getTokenProblems([{ certificates: [certificate] }]), []);
    });
  }
});
