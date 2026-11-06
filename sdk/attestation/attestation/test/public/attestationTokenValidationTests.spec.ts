// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import * as jsrsasign from "jsrsasign";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { AttestationClient } from "../../src/index.js";
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

  const claims = (expiresInSeconds: number): string => {
    const now = Math.floor(Date.now() / 1000);
    return JSON.stringify({
      iat: now,
      nbf: now,
      exp: now + expiresInSeconds,
      "x-ms-sgx-is-debuggable": true,
    });
  };

  // Serves /certs and /attest/* like the attestation service, without any network traffic.
  const fakeService = (signingCertificate: string | undefined, token: string): HttpClient => ({
    sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
      const keys = signingCertificate
        ? [{ kty: "RSA", x5c: [signingCertificate.replace(/-----[A-Z ]+-----|\s/g, "")] }]
        : [];
      const body = new URL(request.url).pathname === "/certs" ? { keys } : { token };
      return {
        request,
        status: 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: JSON.stringify(body),
      };
    },
  });

  it("rejects a service token signed by a key other than the trusted signers", () => {
    const trusted = createSigner("trusted");
    const attacker = createSigner("attacker");
    const forged = new AttestationTokenImpl(
      AttestationTokenImpl.create({
        body: claims(60),
        privateKey: attacker.privKey,
        certificate: attacker.cert,
      }).serialize(),
    );

    assert.deepEqual(
      forged._getServiceTokenProblems([{ certificates: [trusted.cert] }], {}, false),
      ["Attestation Token is not properly signed."],
    );
    assert.deepEqual(forged._getServiceTokenProblems([], {}, false), [
      "Attestation Token is not properly signed.",
    ]);
  });

  it("accepts a service token signed by a trusted signer", () => {
    const trusted = createSigner("trusted");
    const token = new AttestationTokenImpl(
      AttestationTokenImpl.create({
        body: claims(60),
        privateKey: trusted.privKey,
        certificate: trusted.cert,
      }).serialize(),
    );

    assert.deepEqual(
      token._getServiceTokenProblems([{ certificates: [trusted.cert] }], {}, false),
      [],
    );
  });

  it("uses only the trusted signer whose key ID matches the token's kid", () => {
    const first = createSigner("first");
    const second = createSigner("second");
    const token = new AttestationTokenImpl(
      jsrsasign.KJUR.jws.JWS.sign(
        "RS256",
        { alg: "RS256", kid: "second" },
        claims(60),
        second.privKey,
      ),
    );

    assert.deepEqual(
      token._getServiceTokenProblems([{ keyId: "first", certificates: [second.cert] }], {}, false),
      ["Attestation Token is not properly signed."],
    );
    assert.deepEqual(
      token._getServiceTokenProblems(
        [
          { keyId: "first", certificates: [first.cert] },
          { keyId: "second", certificates: [second.cert] },
        ],
        {},
        false,
      ),
      [],
    );
  });

  it("tries every trusted signer when the token has no kid", () => {
    const first = createSigner("first");
    const second = createSigner("second");
    const token = new AttestationTokenImpl(
      jsrsasign.KJUR.jws.JWS.sign("RS256", { alg: "RS256" }, claims(60), second.privKey),
    );

    assert.deepEqual(
      token._getServiceTokenProblems(
        [
          { keyId: "first", certificates: [first.cert] },
          { keyId: "second", certificates: [second.cert] },
        ],
        {},
        false,
      ),
      [],
    );
  });

  it("rejects an unsigned service token unless unsigned tokens are allowed", () => {
    const unsigned = new AttestationTokenImpl(
      AttestationTokenImpl.create({ body: claims(60) }).serialize(),
    );

    assert.deepEqual(unsigned._getServiceTokenProblems([], {}, false), [
      "Attestation Token is not signed.",
    ]);
    assert.deepEqual(unsigned._getServiceTokenProblems([], {}, true), []);
  });

  it("rejects a token signed with an unsupported algorithm", () => {
    const encode = (value: object): string =>
      base64UrlEncodeByteArray(stringToBytes(JSON.stringify(value)));
    const token = new AttestationTokenImpl(
      `${encode({ alg: "HS256" })}.${encode({ foo: "foo" })}.c2lnbmF0dXJl`,
    );

    assert.deepEqual(token._getServiceTokenProblems([], {}, false), [
      "Unsupported attestation token algorithm: HS256",
    ]);
  });

  it("runs the validation callback when it is the only option provided", () => {
    const token = AttestationTokenImpl.create({ body: claims(60) });

    assert.deepEqual(
      token.getTokenProblems(undefined, { validateAttestationToken: () => ["rejected by policy"] }),
      ["rejected by policy"],
    );
  });

  it("accepts the unsigned response to a draft policy request only", async () => {
    const unsignedToken = AttestationTokenImpl.create({ body: claims(60) }).serialize();
    const client = new AttestationClient("https://attestation.test", {
      httpClient: fakeService(undefined, unsignedToken),
    });

    await client.attestSgxEnclave(new Uint8Array([1]), { draftPolicyForAttestation: "policy" });
    await expect(client.attestSgxEnclave(new Uint8Array([1]))).rejects.toThrow(
      "Attestation Token is not signed.",
    );
  });

  it("keeps the client's validation callback when an operation passes its own options", async () => {
    const service = createSigner("service");
    const signedToken = AttestationTokenImpl.create({
      body: claims(60),
      privateKey: service.privKey,
      certificate: service.cert,
    }).serialize();
    const client = new AttestationClient("https://attestation.test", {
      httpClient: fakeService(service.cert, signedToken),
      validationOptions: { validateAttestationToken: () => ["rejected by policy"] },
    });

    await expect(
      client.attestSgxEnclave(new Uint8Array([1]), {
        validationOptions: { timeValidationSlack: 30 },
      }),
    ).rejects.toThrow("rejected by policy");
  });
});
