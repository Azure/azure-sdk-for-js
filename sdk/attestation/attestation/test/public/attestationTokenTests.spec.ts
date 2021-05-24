// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Serializer} from "@azure/core-http";
import { AttestationResult } from "../../src/generated/models/mappers";
import { AttestationResult as AttestationResultModel } from "../../src/generated/models";

import { Recorder } from "@azure/test-utils-recorder";

import { /*createRecordedClient,*/ createRecorder } from "../utils/recordedClient";

import { KJUR, KEYUTIL } from "jsrsasign"
//import { encodeByteArray } from "../utils/base64url"
import { AttestationSigningKey, AttestationToken } from "../../src";
describe("AttestationTokenTests", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#createRsaSigningKey", async() => {
      let key = createRSAKey();
      let cert = createX509Certificate(key, "testCert");
      assert.isTrue(key.length != 0);
      assert.isTrue(cert.length != 0);

      var signingKey = new AttestationSigningKey(key, cert);
      signingKey.certificate.length;

      console.log('Cert: ', cert);

  });

  it("#createEcdsSigningKey", async() => {
    let key = createECDSKey();
    let cert = createX509Certificate(key, "testCert");
    assert.isTrue(key.length != 0);
    assert.isTrue(cert.length != 0);

    var signingKey = new AttestationSigningKey(key, cert);
    signingKey.certificate.length;

    console.log('Cert: ', cert);

  });

  // Create a signing key, but use the wrong key - this should throw an
  // exception, because the key doesn't match the certificate.
  it("#createSigningKeyWrongKey", async() => {
    let key = createECDSKey();
    let cert = createX509Certificate(key, "testCert");

    let key2 = createECDSKey();

    assert.isTrue(key.length != 0);
    assert.isTrue(cert.length != 0);

    assert.throws( () => new AttestationSigningKey(key2, cert));

  });

  it("#createSecuredAttestationToken", async() => {
    let key = createRSAKey();
    let cert = createX509Certificate(key, "certificate");

    let sourceObject = JSON.stringify({foo: "foo", bar: 10});
    let token = AttestationToken.serialize(sourceObject, new AttestationSigningKey(key, cert));

    let body = token.get_body();
    assert.deepEqual({foo: "foo", bar: 10}, body);
  });

  it("#createunSecuredAttestationToken", async() => {

    let sourceObject = JSON.stringify({foo: "foo", bar: 10});
    let token = AttestationToken.serialize(sourceObject);

    let body = token.get_body();
    assert.deepEqual({foo: "foo", bar: 10}, body);
  });

  it("#should serialize", () => {
    const attestationResult: AttestationResultModel = { version: "one" };
    const serializer = new Serializer({ AttestationResult });
    const serialized = serializer.serialize(AttestationResult, attestationResult);

    assert.equal(attestationResult.version, serialized["x-ms-ver"]);
  });

  it("#should deserialize", () => {
    const serialized = { "x-ms-ver": "one" };
    const serializer = new Serializer({ AttestationResult });

    const deserialized: AttestationResultModel = serializer.deserialize(
      AttestationResult,
      serialized,
      "attestationResult"
    );

    assert.equal(deserialized.version, serialized["x-ms-ver"]);
  });

  function createECDSKey() : string
  {
      let keyPair = KEYUTIL.generateKeypair("EC", "secp256r1");
      return KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
  }

  function createRSAKey() : string
  {
      let keyPair = KEYUTIL.generateKeypair("RSA", 2048);
      return KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
  }

  // Create a self-signed X.509 certificZTe
  function createX509Certificate(key: string, subject_name: string) : string
  {
    var signing_key = KEYUTIL.getKey(key);

    var tbs = new KJUR.asn1.x509.TBSCertificate();
    tbs.setSerialNumberByParam({'int': 4});
    tbs.setSignatureAlgByParam({'name': 'SHA1withRSA'});

    let timeEnd = new Date();
    timeEnd.setFullYear(timeEnd.getFullYear()+1);
    tbs.setNotBeforeByParam({'str':  new KJUR.asn1.DERUTCTime({'date': new Date()}).getString()});
    tbs.setNotAfterByParam({'str': new KJUR.asn1.DERUTCTime({'date': timeEnd}).getString()});
    tbs.setSubjectPublicKey(signing_key);
    tbs.appendExtension(new KJUR.asn1.x509.BasicConstraints({'cA':false, pathLen: 0}));
    tbs.setSubjectByParam({'str': '/CN=' + subject_name});
    tbs.setIssuerByParam({'str': '/CN=' + subject_name});
    
    let cert = new KJUR.asn1.x509.Certificate({
        tbscertobj: tbs,
        prvkeyobj: signing_key,
    });
    cert.sign();

    return cert.getPEMString();

//    builder = builder.add_extension(SubjectAlternativeName([x509.DNSName(subject_name)]), critical=False)
  }

});

