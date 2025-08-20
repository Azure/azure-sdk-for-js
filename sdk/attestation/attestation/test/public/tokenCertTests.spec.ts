// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { Recorder } from "@azure-tools/test-recorder";
import {
  createRecordedClient,
  getAttestationUri,
  recorderOptions,
} from "../utils/recordedClient.js";
import type { AttestationClient } from "@azure/attestation";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("TokenCertTests", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
  });

  afterEach(async () => {
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
    instanceUrl: string,
  ): Promise<void> {
    const openIdMetadata = await client.getOpenIdMetadata();
    assert.isDefined(openIdMetadata["response_types_supported"]);
    assert.equal(openIdMetadata["jwks_uri"], instanceUrl + "/certs");
    assert.equal(openIdMetadata["issuer"], instanceUrl);
  }
});
