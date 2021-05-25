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

import { KJUR, KEYUTIL } from "jsrsasign"
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
      const key = createRSAKey();
      const cert = createX509Certificate(key, "testCert");
      assert.isTrue(key.length !== 0);
      assert.isTrue(cert.length !== 0);

      const signingKey = new AttestationSigningKey(key, cert);
      assert.isTrue(signingKey.certificate.length !== 0);

      console.log('Cert: ', cert);

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
    const token = AttestationToken.serialize(sourceObject, new AttestationSigningKey(key, cert));

    const body = token.get_body();
    assert.deepEqual({foo: "foo", bar: 10}, body);
    assert.notEqual("none", token.algorithm);
  });

  /**
   * Creates an unsecured attestation token.
   */
   it("#createUnsecuredAttestationToken", async() => {

    const sourceObject = JSON.stringify({foo: "foo", bar: 10});
    const token = AttestationToken.serialize(sourceObject);

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

  function createECDSKey() : string
  {
      const keyPair = KEYUTIL.generateKeypair("EC", "secp256r1");
      return KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
  }

  function createRSAKey() : string
  {
      const keyPair = KEYUTIL.generateKeypair("RSA", 2048);
      return KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
  }

  function localDateToUtc(d : Date) : Date {
    const  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc);
  }

  function zeroPadding(s : string, len : number) : any {
      if (s.length >= len) return s;
      return new Array(len - s.length + 1).join('0') + s;
  };

  function formatDateString(dateObject : Date) : string {
    const  pad = zeroPadding;
    const d = localDateToUtc(dateObject);
    let year = String(d.getFullYear());
    // Extract first two digits of year for UTC encoding.
    year = year.substr(2, 2);
    const month = pad(String(d.getMonth() + 1), 2);
    const day = pad(String(d.getDate()), 2);
    const hour = pad(String(d.getHours()), 2);
    const min = pad(String(d.getMinutes()), 2);
    const sec = pad(String(d.getSeconds()), 2);
    const s = year + month + day + hour + min + sec;
    return s + "Z";
  }

  // Create a self-signed X.509 certificZTe
  function createX509Certificate(key: string, subject_name: string) : string
  {
    const signing_key = KEYUTIL.getKey(key);

    const  tbs = new KJUR.asn1.x509.TBSCertificate();
    tbs.setSerialNumberByParam({'int': 4});
    tbs.setSignatureAlgByParam({'name': 'SHA1withRSA'});

    const timeEnd = new Date();
    timeEnd.setFullYear(timeEnd.getFullYear() + 1);

    tbs.setNotBeforeByParam({'str': formatDateString(timeEnd)});
    tbs.setNotAfterByParam({'str': formatDateString(new Date())});
    tbs.setSubjectPublicKey(signing_key);
    tbs.appendExtension(new KJUR.asn1.x509.BasicConstraints({'cA':false, pathLen: 0}));
    tbs.setSubjectByParam({'str': '/CN=' + subject_name});
    tbs.setIssuerByParam({'str': '/CN=' + subject_name});
    
    const cert = new KJUR.asn1.x509.Certificate({
        tbscertobj: tbs,
        prvkeyobj: signing_key,
    });
    cert.sign();

    return cert.getPEMString();

//    builder = builder.add_extension(SubjectAlternativeName([x509.DNSName(subject_name)]), critical=False)
  }

});

