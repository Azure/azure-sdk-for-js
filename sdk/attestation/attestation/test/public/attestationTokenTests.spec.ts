// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Serializer} from "@azure/core-http";
import { AttestationResult as AttestationResultMapper } from "../../src/generated/models/mappers";
import { AttestationResult as AttestationResultModel } from "../../src/generated/models";

import { Recorder } from "@azure/test-utils-recorder";

import { createRecorder } from "../utils/recordedClient";

import { AttestationSigningKey, AttestationToken } from "../../src";
import { createECDSKey, createRSAKey, createX509Certificate} from "../utils/cryptoUtils";

describe("AttestationTokenTests", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

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
   * Creates a secured attestation token with the specified key.
   */
  it("#createSecuredAttestationToken", async() => {
    const key = createRSAKey();
    const cert = createX509Certificate(key, "certificate");

    const sourceObject = JSON.stringify({foo: "foo", bar: 10});
    const token = AttestationToken.deserialize(sourceObject, new AttestationSigningKey(key, cert));

    const body = token.get_body();
    assert.deepEqual({foo: "foo", bar: 10}, body);
    assert.notEqual("none", token.algorithm);
  });

  /**
   * Creates an unsecured attestation token.
   */
   it("#createUnsecuredAttestationToken", async() => {

    const sourceObject = JSON.stringify({foo: "foo", bar: 10});
    const token = AttestationToken.deserialize(sourceObject);

    const body = token.get_body();
    assert.deepEqual({foo: "foo", bar: 10}, body);
    assert.equal("none", token.algorithm);
  });

  it("#should serialize", () => {
    const attestationResult: AttestationResultModel = { version: "one" };
    const serializer = new Serializer({ AttestationResultMapper });
    const serialized = serializer.serialize(AttestationResultMapper, attestationResult);

    assert.equal(attestationResult.version, serialized["x-ms-ver"]);
  });

  it("#should deserialize", () => {
    const serialized = { "x-ms-ver": "one" };
    const serializer = new Serializer({ AttestationResultMapper });

    const deserialized: AttestationResultModel = serializer.deserialize(
      AttestationResultMapper,
      serialized,
      "attestationResult"
    );

    assert.equal(deserialized.version, serialized["x-ms-ver"]);
  });

});

