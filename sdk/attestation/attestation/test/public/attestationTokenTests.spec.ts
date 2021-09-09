// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";

import { assert, expect, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure-tools/test-recorder";

import { createRecorder } from "../utils/recordedClient";

import { bytesToString, stringToBytes } from "../../src/utils/utf8";

import { createECDSKey, createRSAKey, createX509Certificate } from "../utils/cryptoUtils";
import { verifyAttestationSigningKey } from "../../src/utils/helpers";
import { AttestationTokenImpl } from "../../src/models/attestationToken";

describe("AttestationTokenTests", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#testUtf8ConversionFunctions", async () => {
    const buffer = stringToBytes("ABCDEF");
    assert.equal(65, buffer[0]);
    assert.equal(66, buffer[1]);
    assert.equal(67, buffer[2]);
    assert.equal(68, buffer[3]);
    assert.equal(69, buffer[4]);

    const str = bytesToString(buffer);
    assert.equal("ABCDEF", str);
  });

  it("#createRsaSigningKey", async () => {
    const [privKey, pubKey] = createRSAKey();
    const cert = createX509Certificate(privKey, pubKey, "testCert");
    assert.isTrue(privKey.length !== 0);
    assert.isTrue(cert.length !== 0);

    const signingKey = verifyAttestationSigningKey(privKey, cert);
    assert.isTrue(signingKey.certificate.length !== 0);
  });

  it("#createEcdsSigningKey", async () => {
    const [privKey, pubKey] = createECDSKey();
    const cert = createX509Certificate(privKey, pubKey, "testCert");
    assert.isTrue(privKey.length !== 0);
    assert.isTrue(cert.length !== 0);

    const signingKey = verifyAttestationSigningKey(privKey, cert);
    assert.isTrue(signingKey.certificate.length !== 0);
  });

  // Create a signing key, but use the wrong key - this should throw an
  // exception, because the key doesn't match the certificate.
  it("#createSigningKeyWrongKey", async () => {
    const [privKey, pubKey] = createECDSKey();
    const cert = createX509Certificate(privKey, pubKey, "testCert");

    const [key2] = createECDSKey();

    assert.isTrue(privKey.length !== 0);
    assert.isTrue(cert.length !== 0);

    assert.throws(() => verifyAttestationSigningKey(key2, cert));
  });

  /**
   * Creates an unsecured attestation token.
   */
  it("#createUnsecuredAttestationToken", async () => {
    const sourceObject = JSON.stringify({ foo: "foo", bar: 10 });
    const token = AttestationTokenImpl.create({ body: sourceObject });

    const body = token.getBody();
    assert.deepEqual({ foo: "foo", bar: 10 }, body);
    assert.equal("none", token.algorithm);
  });

  /**
   * Creates an unsecured empty attestation token.
   */
  it("#createUnsecuredEmptyAttestationToken", async () => {
    const token = AttestationTokenImpl.create({});

    // An empty unsecured attestation token has a well known value, check it.
    assert("eyJhbGciOiJub25lIn0..", token.serialize());
    const body = token.getBody();
    assert.isNull(body);
    assert.equal("none", token.algorithm);
  });

  /**
   * Creates a secured empty attestation token with the specified key.
   */
  it("#createEmptySecuredAttestationToken", async () => {
    const [privKey, pubKey] = createRSAKey();
    const cert = createX509Certificate(privKey, pubKey, "certificate");

    const token = AttestationTokenImpl.create({ privateKey: privKey, certificate: cert });

    assert.notEqual("none", token.algorithm);
    assert.equal(1, token.certificateChain?.certificates.length);
    if (token.certificateChain) {
      const pemCert: string = token.certificateChain.certificates[0];

      const expectedCert = new jsrsasign.X509();
      expectedCert.readCertPEM(cert);

      const actualCert = new jsrsasign.X509();
      actualCert.readCertPEM(pemCert);

      assert.equal(expectedCert.hex, actualCert.hex);
    }

    // The token of course should validate.
    assert.deepEqual([], token.getTokenProblems());
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
      iss: "this is an issuer"
    };

    const sourceJson = JSON.stringify(sourceObject);
    const token = AttestationTokenImpl.create({
      body: sourceJson,
      privateKey: privKey,
      certificate: cert
    });

    // Let's look at some of the properties on the token and confirm they match
    // expectations.
    const body = token.getBody();
    expect(sourceObject).to.deep.equal(body);
    assert.deepEqual(sourceObject, body);
    assert.notEqual("none", token.algorithm);

    expect(token.issuedAt?.getTime()).to.equal(currentDate.getTime());
    expect(token.notBefore?.getTime()).to.equal(currentDate.getTime());
    expect(token.expiresOn?.getTime()).to.equal(currentDate.getTime() + 30 * 1000);
    expect(token.issuer).to.equal("this is an issuer");
  });

  it("#verifyAttestationTokenCallback", async () => {
    const sourceObject = JSON.stringify({ foo: "foo", bar: 10 });

    const token = AttestationTokenImpl.create({ body: sourceObject });

    assert.deepEqual(
      [],
      token.getTokenProblems(undefined, {
        validateToken: true,
        validateAttestationToken: (tokenToCheck) => {
          console.log("In callback, token algorithm: " + tokenToCheck.algorithm);
          return undefined;
        }
      })
    );

    assert.isTrue(
      token
        .getTokenProblems(undefined, {
          validateToken: true,
          validateAttestationToken: (tokenToCheck) => {
            console.log("In callback, token algorithm: " + tokenToCheck.algorithm);
            return ["There was a validation failure"];
          }
        })
        .find((s) => s.search("validation")) !== undefined
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
        bar: 10
      });

      const token = AttestationTokenImpl.create({ body: sourceObject });

      assert.deepEqual(
        [],
        token.getTokenProblems(undefined, {
          validateToken: true,
          validateIssuer: true,
          expectedIssuer: "this is an issuer"
        })
      );

      assert.isTrue(
        token
          .getTokenProblems(undefined, {
            validateToken: true,
            validateIssuer: true,
            expectedIssuer: "this is a different issuer"
          })
          .find((s) => s.search("different issuer")) !== undefined
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
        bar: 10
      });

      const token = AttestationTokenImpl.create({ body: sourceObject });

      assert.deepEqual(
        [],
        token.getTokenProblems(undefined, {
          validateToken: true,
          validateExpirationTime: true,
          validateNotBeforeTime: true
        })
      );
    }

    {
      // Source expired 5 seconds ago.
      const sourceObject = JSON.stringify({
        exp: currentTime - 5,
        iat: currentTime,
        nbf: currentTime,
        foo: "foo",
        bar: 10
      });

      const token = AttestationTokenImpl.create({ body: sourceObject });

      assert.isTrue(
        token
          .getTokenProblems(undefined, {
            validateToken: true,
            validateExpirationTime: true,
            validateNotBeforeTime: true
          })
          .find((s) => s.search("expired")) !== undefined
      );

      // Validate the token again, this time specifying a validation slack of
      // 10 seconds. The token should be fine with that slack.
      assert.deepEqual(
        [],
        token.getTokenProblems(undefined, {
          validateToken: true,
          validateExpirationTime: true,
          validateNotBeforeTime: true,
          timeValidationSlack: 10
        })
      );
    }
    {
      // Source is only valid 5 seconds from now.
      const sourceObject = JSON.stringify({
        exp: currentTime + 10,
        iat: currentTime + 5,
        nbf: currentTime + 5,
        foo: "foo",
        bar: 10
      });

      const token = AttestationTokenImpl.create({ body: sourceObject });
      assert.isTrue(
        token
          .getTokenProblems(undefined, {
            validateToken: true,
            validateExpirationTime: true,
            validateNotBeforeTime: true
          })
          .find((s) => s.search("not yet")) !== undefined
      );

      // Validate the token again, this time specifying a validation slack of
      // 10 seconds. The token should be fine with that slack.
      assert.deepEqual(
        [],
        token.getTokenProblems(undefined, {
          validateToken: true,
          validateExpirationTime: true,
          validateNotBeforeTime: true,
          timeValidationSlack: 10
        })
      );
    }
  });
});
