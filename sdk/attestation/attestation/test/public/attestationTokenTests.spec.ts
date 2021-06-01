// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecorder } from "../utils/recordedClient";

import { bytesToString, stringToBytes } from "../../src/utils/utf8.browser";

import { AttestationSigningKey, AttestationToken } from "../../src";
import { createECDSKey, createRSAKey, createX509Certificate} from "../utils/cryptoUtils";
import { encodeByteArray } from "../utils/base64url";
import { X509 } from "jsrsasign";

describe("AttestationTokenTests", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#testUtf8ConversionFunctions", async() => {
    const buffer = stringToBytes("ABCDEF");
    assert.equal(65, buffer[0]);
    assert.equal(66, buffer[1]);
    assert.equal(67, buffer[2]);
    assert.equal(68, buffer[3]);
    assert.equal(69, buffer[4]);

    const str = bytesToString(buffer);
    assert.equal("ABCDEF", str);
  })

  it("#createRsaSigningKey", async() => {
      const key = createRSAKey();
      const cert = createX509Certificate(key, "testCert");
      assert.isTrue(key.length !== 0);
      assert.isTrue(cert.length !== 0);

      const signingKey = new AttestationSigningKey(key, cert);
      assert.isTrue(signingKey.certificate.length !== 0);
  });

  it("#createEcdsSigningKey", async() => {
    const key = createECDSKey();
    const cert = createX509Certificate(key, "testCert");
    assert.isTrue(key.length !== 0);
    assert.isTrue(cert.length !== 0);

    const signingKey = new AttestationSigningKey(key, cert);
    assert.isTrue(signingKey.certificate.length !== 0);
  });

  // Create a signing key, but use the wrong key - this should throw an
  // exception, because the key doesn't match the certificate.
  it("#createSigningKeyWrongKey", async() => {
    const key = createECDSKey();
    const cert = createX509Certificate(key, "testCert");

    const key2 = createECDSKey();

    assert.isTrue(key.length !== 0);
    assert.isTrue(cert.length !== 0);

    assert.throws( () => new AttestationSigningKey(key2, cert));

  });

  /**
   * Creates an unsecured attestation token.
   */
   it("#createUnsecuredAttestationToken", async() => {

    const sourceObject = JSON.stringify({foo: "foo", bar: 10});
    const token = AttestationToken.create({body: sourceObject});

    const body = token.getBody();
    assert.deepEqual({foo: "foo", bar: 10}, body);
    assert.equal("none", token.algorithm);
  });

  /**
   * Creates an unsecured empty attestation token.
   */
    it("#createUnsecuredEmptyAttestationToken", async() => {
      const token = AttestationToken.create({});
  
      // An empty unsecured attestation token has a well known value, check it.
      assert('eyJhbGciOiJub25lIn0..', token.serialize());
      const body = token.getBody();
      assert.isNull(body);
      assert.equal("none", token.algorithm);
    });

  /**
   * Creates a secured empty attestation token with the specified key.
   */
  it("#createSecuredAttestationToken", async() => {
    const key = createRSAKey();
    const cert = createX509Certificate(key, "certificate");

    const token = AttestationToken.create({signer: new AttestationSigningKey(key, cert)});

    assert.notEqual("none", token.algorithm);
    assert.equal(1, token.certificateChain?.certificates.length);
    if (token.certificateChain) {

      let pemCert: string;
      pemCert = "-----BEGIN CERTIFICATE-----\r\n";
      pemCert += encodeByteArray(token.certificateChain.certificates[0]);
      pemCert += "\r\n-----END CERTIFICATE-----\r\n";

      const expectedCert = new X509();
      expectedCert.readCertPEM(cert);

      const actualCert = new X509();
      actualCert.readCertPEM(pemCert);

      assert.equal(expectedCert.hex, actualCert.hex);
    }


    // The token of course should validate.
    assert.isTrue(token.validate_token());

  });

  
  /**
   * Creates a secured attestation token with the specified key.
   */
  it("#createSecuredAttestationToken", async() => {
    const key = createRSAKey();
    const cert = createX509Certificate(key, "certificate");

    const sourceObject = JSON.stringify({foo: "foo", bar: 10});
    const token = AttestationToken.create({body: sourceObject, signer: new AttestationSigningKey(key, cert)});

    const body = token.getBody();
    assert.deepEqual({foo: "foo", bar: 10}, body);
    assert.notEqual("none", token.algorithm);
  });

});

