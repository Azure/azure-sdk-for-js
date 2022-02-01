// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse, expect } from "chai";
import { Context } from "mocha";
import chaiAsPromised from "chai-as-promised";
chaiUse(chaiAsPromised);
/* eslint-disable @typescript-eslint/no-invalid-this */

import { Recorder, isLiveMode } from "@azure-tools/test-recorder";

import {
  createRecordedAdminClient,
  getIsolatedSigningKey,
  recorderOptions,
} from "../utils/recordedClient";
import { createRSAKey, createX509Certificate, generateSha1Hash } from "../utils/cryptoUtils";
import { KnownCertificateModification } from "../../src/generated";

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { byteArrayToHex } from "../../src/utils/base64";

describe("PolicyManagementTests ", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("#getPolicyCertificates - AAD", async () => {
    const client = createRecordedAdminClient(recorder, "AAD");

    const policyResult = await client.getPolicyManagementCertificates();
    const result = policyResult.token;
    assert(policyResult.body.length === 0);
    assert(result, "Expected a token from the service but did not receive one");
  });

  it("#getPolicyCertificates - Shared", async () => {
    const client = createRecordedAdminClient(recorder, "Shared");
    const policyResult = await client.getPolicyManagementCertificates();

    const result = policyResult.token;
    assert(policyResult.body.length === 0);
    assert(result, "Expected a token from the service but did not receive one");
  });

  it("#getPolicyCertificates - Isolated", async () => {
    const client = createRecordedAdminClient(recorder, "Isolated");
    const policyResult = await client.getPolicyManagementCertificates();

    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    assert(policyResult.body !== undefined);
    assert(policyResult.body.length !== 0);
  });

  it("Add Policy Certificates failure conditions", async () => {
    const adminClient = createRecordedAdminClient(recorder, "Isolated");

    const [rsaKey, rsapubKey] = createRSAKey();
    const [rsaKey2] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsapubKey, "CertificateName");

    await expect(
      adminClient.addPolicyManagementCertificate(rsaCertificate, "Foo", "Bar")
    ).to.be.rejectedWith("can't find PEM header");

    await expect(
      adminClient.addPolicyManagementCertificate(rsaCertificate, rsaKey2, rsaCertificate)
    ).to.be.rejectedWith("Key does not match Certificate");
  });

  it("Remove Policy failure conditions", async () => {
    const adminClient = createRecordedAdminClient(recorder, "Isolated");

    const [rsaKey, rsapubKey] = createRSAKey();
    const [rsaKey2] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsapubKey, "CertificateName");

    await expect(
      adminClient.removePolicyManagementCertificate(rsaCertificate, "Foo", "Bar")
    ).to.be.rejectedWith("can't find PEM header");

    await expect(
      adminClient.removePolicyManagementCertificate(rsaCertificate, rsaKey2, rsaCertificate)
    ).to.be.rejectedWith("Key does not match Certificate");
  });

  it("setPolicyCertificates", async function () {
    if (!isLiveMode()) this.skip(); // "setPolicyCertificate APIs require keys and certificates from the environment, which are not available in playback"

    const client = createRecordedAdminClient(recorder, "Isolated");

    const signingKeys = getIsolatedSigningKey();

    const [rsaKey, rsaPubKey] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsaPubKey, "CertificateName");

    // Decode the PEM encoded certificate for validation later.
    const cert = new jsrsasign.X509();
    cert.readCertPEM(rsaCertificate);

    const expectedThumbprint = byteArrayToHex(generateSha1Hash(cert.hex)).toUpperCase();

    {
      // Add a new signing certificate.
      const setResult = await client.addPolicyManagementCertificate(
        rsaCertificate,
        signingKeys.privateKey,
        signingKeys.certificate
      );
      assert(setResult.body.certificateResolution === KnownCertificateModification.IsPresent);
      assert(setResult.body.certificateThumbprint === expectedThumbprint);
    }

    {
      // Do it a second time, since these operations are idempotent.
      const setResult = await client.addPolicyManagementCertificate(
        rsaCertificate,
        signingKeys.privateKey,
        signingKeys.certificate
      );
      assert(setResult.body.certificateResolution === KnownCertificateModification.IsPresent);
      assert(setResult.body.certificateThumbprint === expectedThumbprint);
    }

    {
      const removeResult = await client.removePolicyManagementCertificate(
        rsaCertificate,
        signingKeys.privateKey,
        signingKeys.certificate
      );
      assert(removeResult.body.certificateResolution === KnownCertificateModification.IsAbsent);
      assert(removeResult.body.certificateThumbprint === expectedThumbprint);
    }

    {
      const removeResult = await client.removePolicyManagementCertificate(
        rsaCertificate,
        signingKeys.privateKey,
        signingKeys.certificate
      );
      assert(removeResult.body.certificateResolution === KnownCertificateModification.IsAbsent);
      assert(removeResult.body.certificateThumbprint === expectedThumbprint);
    }
  });
});
