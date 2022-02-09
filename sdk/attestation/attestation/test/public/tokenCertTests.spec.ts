// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure-tools/test-recorder";

import { createRecordedClient, getAttestationUri, recorderOptions } from "../utils/recordedClient";
import { AttestationClient } from "../../src";
describe("TokenCertTests", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("#GetCertificateAAD", async () => {
    const client = createRecordedClient(recorder, "AAD");
    await getCertificatesTest(client);
  });

  it("#GetCertificatesIsolated", async () => {
    const client = createRecordedClient(recorder, "Isolated");
    await getCertificatesTest(client);
  });

  it("#GetCertificatesShared", async () => {
    const client = createRecordedClient(recorder, "Shared");
    await getCertificatesTest(client);
  });

  async function getCertificatesTest(client: AttestationClient): Promise<void> {
    const signingCertificates = await client.getAttestationSigners();
    for (const key of signingCertificates) {
      assert.isDefined(key.keyId);
      assert.isDefined(key.certificates);

      key.certificates.forEach((certBuffer) => {
        assert.isDefined(certBuffer);

        const cert = new jsrsasign.X509();
        cert.readCertPEM(certBuffer);
      });
    }
  }

  it("#GetMetadataConfigAAD", async () => {
    const client = createRecordedClient(recorder, "AAD");
    await getMetadataConfigTest(client, getAttestationUri("AAD"));
  });

  it("#GetMetadataConfigIsolated", async () => {
    const client = createRecordedClient(recorder, "Isolated");
    await getMetadataConfigTest(client, getAttestationUri("Isolated"));
  });

  it("#GetMetadataConfigShared", async () => {
    const client = createRecordedClient(recorder, "Shared");
    await getMetadataConfigTest(client, getAttestationUri("Shared"));
  });

  async function getMetadataConfigTest(
    client: AttestationClient,
    instanceUrl: string
  ): Promise<void> {
    const openIdMetadata = await client.getOpenIdMetadata();
    assert.isDefined(openIdMetadata["response_types_supported"]);
    assert.equal(openIdMetadata["jwks_uri"], instanceUrl + "/certs");
    assert.equal(openIdMetadata["issuer"], instanceUrl);
  }
});
