// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationTokenImpl } from "../../src/models/attestationToken.js";
import { createECDSKey, createRSAKey, createX509Certificate } from "../utils/cryptoUtils.js";
import { assert, describe, it } from "vitest";

describe("Attestation token cryptography in browser", () => {
  for (const [algorithm, createKey] of [
    ["RS256", createRSAKey],
    ["ES256", createECDSKey],
  ] as const) {
    it(`creates and validates ${algorithm} tokens`, () => {
      const [privateKey, publicKey] = createKey();
      const certificate = createX509Certificate(privateKey, publicKey, "certificate");
      const token = AttestationTokenImpl.create({
        body: JSON.stringify({ runtime: "browser" }),
        privateKey,
        certificate,
      });

      assert.equal(token.algorithm, algorithm);
      assert.deepEqual(token.getTokenProblems([{ certificates: [certificate] }]), []);
    });
  }
});
