// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { base64UrlEncodeByteArray } from "../../src/utils/base64.js";
import { bytesToString, stringToBytes } from "../../src/utils/utf8.js";
import {
  certificateToBase64,
  createECDSKey,
  createRSAKey,
  createX509Certificate,
} from "../utils/cryptoUtils.js";
import { verifyAttestationSigningKey } from "../../src/utils/helpers.js";
import { AttestationTokenImpl } from "../../src/models/attestationToken.js";
import { describe, it, assert, expect } from "vitest";

describe("AttestationTokenTests", () => {
  it("#testUtf8ConversionFunctions", async () => {
    const buffer = stringToBytes("ABCDEF");
    assert.equal(buffer[0], 65);
    assert.equal(buffer[1], 66);
    assert.equal(buffer[2], 67);
    assert.equal(buffer[3], 68);
    assert.equal(buffer[4], 69);

    const str = bytesToString(buffer);
    assert.equal(str, "ABCDEF");
  });

  it("#createRsaSigningKey", async () => {
    const [privKey, pubKey] = createRSAKey();
    const cert = createX509Certificate(privKey, pubKey, "testCert");
    assert.isTrue(privKey.length !== 0);
    assert.isTrue(cert.length !== 0);

    const signingKey = await verifyAttestationSigningKey(privKey, cert);
    assert.isTrue(signingKey.certificate.length !== 0);
  });

  it("#createEcdsSigningKey", async () => {
    const [privKey, pubKey] = createECDSKey();
    const cert = createX509Certificate(privKey, pubKey, "testCert");
    assert.isTrue(privKey.length !== 0);
    assert.isTrue(cert.length !== 0);

    const signingKey = await verifyAttestationSigningKey(privKey, cert);
    assert.isTrue(signingKey.certificate.length !== 0);
  });

  // Create a signing key, but use the wrong key - this should throw an
  // exception, because the key doesn't match the certificate.
  it("#createSigningKeyWrongKey", async () => {
    const [privKey, pubKey] = createECDSKey();
    const cert = createX509Certificate(privKey, pubKey, "testCert");

    const [key2] = createECDSKey(1);

    assert.isTrue(privKey.length !== 0);
    assert.isTrue(cert.length !== 0);

    await expect(verifyAttestationSigningKey(key2, cert)).rejects.toThrow(
      "Key does not match Certificate",
    );
  });

  it("#createRsaSigningKeyWrongKey", async () => {
    const [privateKey, publicKey] = createRSAKey();
    const certificate = createX509Certificate(privateKey, publicKey, "testCert");
    const [mismatchedKey] = createRSAKey(1);

    await expect(verifyAttestationSigningKey(mismatchedKey, certificate)).rejects.toThrow(
      "Key does not match Certificate",
    );
  });

  it("#rejectMalformedSigningMaterial", async () => {
    const [privateKey, publicKey] = createRSAKey();
    const certificate = createX509Certificate(privateKey, publicKey, "testCert");

    await expect(verifyAttestationSigningKey("not a key", certificate)).rejects.toThrow();
    await expect(verifyAttestationSigningKey(privateKey, "not a certificate")).rejects.toThrow(
      "Invalid PEM encoded certificate",
    );

    const truncatedCertificate = `-----BEGIN CERTIFICATE-----
${certificateToBase64(certificate).slice(0, -4)}
-----END CERTIFICATE-----`;
    await expect(verifyAttestationSigningKey(privateKey, truncatedCertificate)).rejects.toThrow();
  });

  /**
   * Creates an unsecured attestation token.
   */
  it("#createUnsecuredAttestationToken", async () => {
    const sourceObject = JSON.stringify({ foo: "foo", bar: 10 });
    const token = await AttestationTokenImpl.create({ body: sourceObject });

    const body = token.getBody();
    assert.deepEqual(body, { foo: "foo", bar: 10 });
    assert.equal(token.algorithm, "none");
  });

  /**
   * Creates an unsecured empty attestation token.
   */
  it("#createUnsecuredEmptyAttestationToken", async () => {
    const token = await AttestationTokenImpl.create({});

    // An empty unsecured attestation token has a well known value, check it.
    assert("eyJhbGciOiJub25lIn0..", token.serialize());
    const body = token.getBody();
    assert.isNull(body);
    assert.equal(token.algorithm, "none");
  });

  /**
   * Creates a secured empty attestation token with the specified key.
   */
  it("#createEmptySecuredAttestationToken", async () => {
    const [privKey, pubKey] = createRSAKey();
    const cert = createX509Certificate(privKey, pubKey, "certificate");

    const token = await AttestationTokenImpl.create({ privateKey: privKey, certificate: cert });

    assert.notEqual(token.algorithm, "none");
    assert.equal(token.certificateChain?.certificates.length, 1);
    if (token.certificateChain) {
      const pemCert: string = token.certificateChain.certificates[0];

      assert.equal(certificateToBase64(cert), certificateToBase64(pemCert));
    }

    // The token of course should validate.
    assert.deepEqual(await token.getTokenProblems(), []);
  });

  /**
   * Creates a secured attestation token with the specified key.
   */
  it("#createSecuredAttestationToken", async () => {
    const [privKey, pubKey] = createRSAKey();
    const cert = createX509Certificate(privKey, pubKey, "certificate");

    const currentTime = Math.floor(new Date().getTime() / 1000);
    const currentDate = new Date(currentTime * 1000);

    const sourceObject = {
      foo: "foo",
      bar: 10,
      exp: currentTime + 30,
      iat: currentTime,
      nbf: currentTime,
      iss: "this is an issuer",
    };

    const sourceJson = JSON.stringify(sourceObject);
    const token = await AttestationTokenImpl.create({
      body: sourceJson,
      privateKey: privKey,
      certificate: cert,
    });

    // Let's look at some of the properties on the token and confirm they match
    // expectations.
    const body = token.getBody();
    expect(sourceObject).to.deep.equal(body);
    assert.deepEqual(sourceObject, body);
    assert.notEqual(token.algorithm, "none");

    expect(token.issuedAt?.getTime()).to.equal(currentDate.getTime());
    expect(token.notBefore?.getTime()).to.equal(currentDate.getTime());
    expect(token.expiresOn?.getTime()).to.equal(currentDate.getTime() + 30 * 1000);
    expect(token.issuer).to.equal("this is an issuer");
  });

  it("#createEcSecuredAttestationToken", async () => {
    const [privateKey, publicKey] = createECDSKey();
    const certificate = createX509Certificate(privateKey, publicKey, "certificate");
    const token = await AttestationTokenImpl.create({
      body: JSON.stringify({ foo: "bar" }),
      privateKey,
      certificate,
    });

    assert.equal(token.algorithm, "ES256");
    assert.equal(token.certificateChain?.certificates.length, 1);
    assert.deepEqual(await token.getTokenProblems([{ certificates: [certificate] }]), []);
  });

  it("#rejectTamperedRsaAndEcTokens", async () => {
    for (const createKey of [createRSAKey, createECDSKey]) {
      const [privateKey, publicKey] = createKey();
      const certificate = createX509Certificate(privateKey, publicKey, "certificate");
      const token = await AttestationTokenImpl.create({
        body: JSON.stringify({ foo: "bar" }),
        privateKey,
        certificate,
      });
      const pieces = token.serialize().split(".");
      pieces[1] = base64UrlEncodeByteArray(stringToBytes(JSON.stringify({ foo: "tampered" })));
      const tamperedToken = new AttestationTokenImpl(pieces.join("."));
      assert.deepEqual(await tamperedToken.getTokenProblems([{ certificates: [certificate] }]), [
        "Attestation Token is not properly signed.",
      ]);

      const nonCanonicalToken = new AttestationTokenImpl(`${token.serialize()}=`);
      assert.deepEqual(
        await nonCanonicalToken.getTokenProblems([{ certificates: [certificate] }]),
        ["Attestation Token is not properly signed."],
      );
    }
  });

  it("#verifyAttestationTokenCallback", async () => {
    const sourceObject = JSON.stringify({ foo: "foo", bar: 10 });

    const token = await AttestationTokenImpl.create({ body: sourceObject });

    assert.deepEqual(
      [],
      await token.getTokenProblems(undefined, {
        validateToken: true,
        validateAttestationToken: (tokenToCheck) => {
          console.log("In callback, token algorithm: " + tokenToCheck.algorithm);
          return undefined;
        },
      }),
    );

    assert.isTrue(
      (
        await token.getTokenProblems(undefined, {
          validateToken: true,
          validateAttestationToken: (tokenToCheck) => {
            console.log("In callback, token algorithm: " + tokenToCheck.algorithm);
            return ["There was a validation failure"];
          },
        })
      ).find((s) => s.search("validation")) !== undefined,
    );
  });

  it("#verifyAttestationTokenIssuer", async () => {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    {
      // Source expires in 30 seconds.
      const sourceObject = JSON.stringify({
        exp: currentTime + 30,
        iat: currentTime,
        nbf: currentTime,
        iss: "this is an issuer",
        foo: "foo",
        bar: 10,
      });

      const token = await AttestationTokenImpl.create({ body: sourceObject });

      assert.deepEqual(
        [],
        await token.getTokenProblems(undefined, {
          validateToken: true,
          validateIssuer: true,
          expectedIssuer: "this is an issuer",
        }),
      );

      assert.isTrue(
        (
          await token.getTokenProblems(undefined, {
            validateToken: true,
            validateIssuer: true,
            expectedIssuer: "this is a different issuer",
          })
        ).find((s) => s.search("different issuer")) !== undefined,
      );
    }
  });
  it("#verifyAttestationTimeouts", async () => {
    const currentTime = Math.floor(new Date().getTime() / 1000);

    {
      // Source expires in 30 seconds.
      const sourceObject = JSON.stringify({
        exp: currentTime + 30,
        iat: currentTime,
        nbf: currentTime,
        foo: "foo",
        bar: 10,
      });

      const token = await AttestationTokenImpl.create({ body: sourceObject });

      assert.deepEqual(
        [],
        await token.getTokenProblems(undefined, {
          validateToken: true,
          validateExpirationTime: true,
          validateNotBeforeTime: true,
        }),
      );
    }

    {
      // Source expired 5 seconds ago.
      const sourceObject = JSON.stringify({
        exp: currentTime - 5,
        iat: currentTime,
        nbf: currentTime,
        foo: "foo",
        bar: 10,
      });

      const token = await AttestationTokenImpl.create({ body: sourceObject });

      assert.isTrue(
        (
          await token.getTokenProblems(undefined, {
            validateToken: true,
            validateExpirationTime: true,
            validateNotBeforeTime: true,
          })
        ).find((s) => s.search("expired")) !== undefined,
      );

      // Validate the token again, this time specifying a validation slack of
      // 10 seconds. The token should be fine with that slack.
      assert.deepEqual(
        [],
        await token.getTokenProblems(undefined, {
          validateToken: true,
          validateExpirationTime: true,
          validateNotBeforeTime: true,
          timeValidationSlack: 10,
        }),
      );
    }
    {
      // Source is only valid 5 seconds from now.
      const sourceObject = JSON.stringify({
        exp: currentTime + 10,
        iat: currentTime + 5,
        nbf: currentTime + 5,
        foo: "foo",
        bar: 10,
      });

      const token = await AttestationTokenImpl.create({ body: sourceObject });
      assert.isTrue(
        (
          await token.getTokenProblems(undefined, {
            validateToken: true,
            validateExpirationTime: true,
            validateNotBeforeTime: true,
          })
        ).find((s) => s.search("not yet")) !== undefined,
      );

      // Validate the token again, this time specifying a validation slack of
      // 10 seconds. The token should be fine with that slack.
      assert.deepEqual(
        [],
        await token.getTokenProblems(undefined, {
          validateToken: true,
          validateExpirationTime: true,
          validateNotBeforeTime: true,
          timeValidationSlack: 10,
        }),
      );
    }
  });
});
