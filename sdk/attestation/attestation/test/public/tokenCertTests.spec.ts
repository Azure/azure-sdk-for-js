// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference path="../../src/jsrsasign.d.ts"/>

import * as jsrsasign from "jsrsasign";

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { encodeByteArray } from "../utils/base64url";
import { AttestationClient } from "../../src";
describe("TokenCertTests", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetCertificateAAD", async () => {
    const client = createRecordedClient("AAD");
    await getCertificatesTest(client);
  });

  it("#GetCertificatesIsolated", async () => {
    const client = createRecordedClient("Isolated");
    await getCertificatesTest(client);
  });

  it("#GetCertificatesShared", async () => {
    const client = createRecordedClient("Shared");
    await getCertificatesTest(client);
  });

  async function getCertificatesTest(client: AttestationClient): Promise<void> {
    const signingCertificates = await client.getAttestationSigners();
    for (const key of signingCertificates) {
      assert.isDefined(key.keyId);
      assert.isDefined(key.certificates);

      key.certificates.forEach((certBuffer: Uint8Array) => {
        assert.isDefined(certBuffer);

        let pemCert: string;
        pemCert = "-----BEGIN CERTIFICATE-----\r\n";
        pemCert += encodeByteArray(certBuffer);
        pemCert += "\r\n-----END CERTIFICATE-----\r\n";

        const cert = new jsrsasign.X509();
        cert.readCertPEM(pemCert);
      });
    }
  }

  it("#GetMetadataConfigAAD", async () => {
    const client = createRecordedClient("AAD");
    await getMetadataConfigTest(client);
  });

  it("#GetMetadataConfigIsolated", async () => {
    const client = createRecordedClient("Isolated");
    await getMetadataConfigTest(client);
  });

  it("#GetMetadataConfigShared", async () => {
    const client = createRecordedClient("Shared");
    await getMetadataConfigTest(client);
  });

  async function getMetadataConfigTest(client: AttestationClient): Promise<void> {
    const openIdMetadata = await client.getOpenIdMetadata();
    assert.isDefined(openIdMetadata["response_types_supported"]);
    assert.equal(openIdMetadata["jwks_uri"], client.instanceUrl + "/certs");
    assert.equal(openIdMetadata["issuer"], client.instanceUrl);
  }
});
