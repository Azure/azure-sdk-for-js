// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { AttestationTokenImpl } from "../../src/models/attestationToken.js";
import { base64UrlEncodeByteArray } from "../../src/utils/base64.js";
import { stringToBytes } from "../../src/utils/utf8.js";
import { createRSAKey, createX509Certificate } from "../utils/cryptoUtils.js";

// Offline tests: token validation needs no recorded HTTP traffic.
describe("AttestationTokenValidation", () => {
  const createSigner = (name: string): { privKey: string; cert: string } => {
    const [privKey, pubKey] = createRSAKey();
    const cert = createX509Certificate(privKey, pubKey, name);
    return { privKey, cert };
  };

  it("rejects a token signed by an untrusted key with its own embedded certificate", () => {
    const trusted = createSigner("trusted");
    const attacker = createSigner("attacker");
    const trustedSigner = AttestationTokenImpl.create({
      privateKey: trusted.privKey,
      certificate: trusted.cert,
    }).certificateChain!;

    const forged = AttestationTokenImpl.create({
      body: JSON.stringify({ "x-ms-sgx-is-debuggable": false }),
      privateKey: attacker.privKey,
      certificate: attacker.cert,
    });

    assert.deepEqual(forged.getTokenProblems([trustedSigner]), [
      "Attestation Token is not properly signed.",
    ]);
    assert.deepEqual(forged.getTokenProblems([]), ["Attestation Token is not properly signed."]);
  });

  it("rejects an unsigned token by default", () => {
    const unsigned = AttestationTokenImpl.create({ body: JSON.stringify({ foo: "foo" }) });
    assert.deepEqual(unsigned.getTokenProblems(), ["Attestation Token is not signed."]);
    assert.deepEqual(unsigned.getTokenProblems(undefined, { validateIssuer: true }), [
      "Attestation Token is not signed.",
    ]);
    assert.deepEqual(unsigned.getTokenProblems(undefined, { allowUnsignedToken: true }), []);
  });

  it("rejects a token signed with an unsupported algorithm", () => {
    const encode = (value: object): string =>
      base64UrlEncodeByteArray(stringToBytes(JSON.stringify(value)));
    const token = new AttestationTokenImpl(
      `${encode({ alg: "HS256" })}.${encode({ foo: "foo" })}.c2lnbmF0dXJl`,
    );
    const trusted = createSigner("trusted");
    const trustedSigner = AttestationTokenImpl.create({
      privateKey: trusted.privKey,
      certificate: trusted.cert,
    }).certificateChain!;

    assert.deepEqual(token.getTokenProblems([trustedSigner]), [
      "Unsupported attestation token algorithm: HS256",
    ]);
  });

  it("accepts a token signed by a trusted signer", () => {
    const trusted = createSigner("trusted");
    const token = AttestationTokenImpl.create({
      body: JSON.stringify({ foo: "foo" }),
      privateKey: trusted.privKey,
      certificate: trusted.cert,
    });
    assert.deepEqual(token.getTokenProblems([token.certificateChain!]), []);
  });
});
