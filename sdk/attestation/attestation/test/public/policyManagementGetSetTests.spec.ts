// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import {
  createRecordedAdminClient,
  createRecorder,
  getIsolatedSigningKey
} from "../utils/recordedClient";
import { createRSAKey, createX509Certificate, generateSha1Hash } from "../utils/cryptoUtils";
import { KnownCertificateModification } from "../../src/generated";

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { byteArrayToHex } from "../../src/utils/base64";

describe("PolicyManagementTests ", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#getPolicyCertificates - AAD", async () => {
    const client = createRecordedAdminClient("AAD");

    const policyResult = await client.getPolicyManagementCertificates();
    const result = policyResult.token;
    assert(policyResult.value.length === 0);
    assert(result, "Expected a token from the service but did not receive one");
  });

  it("#getPolicyCertificates - Shared", async () => {
    const client = createRecordedAdminClient("Shared");
    const policyResult = await client.getPolicyManagementCertificates();

    const result = policyResult.token;
    assert(policyResult.value.length === 0);
    assert(result, "Expected a token from the service but did not receive one");
  });

  it("#getPolicyCertificates - Isolated", async () => {
    const client = createRecordedAdminClient("Isolated");
    const policyResult = await client.getPolicyManagementCertificates();

    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    assert(policyResult.value !== undefined);
    assert(policyResult.value?.length !== 0);
  });

  it("setPolicyCertificates", async () => {
    recorder.skip(
      undefined,
      "setPolicyCertificate APIs require keys and certificates from the environment, which are not available in playback"
    );

    const client = createRecordedAdminClient("Isolated");

    const signingKeys = getIsolatedSigningKey();

    const [rsaKey, rsaPubKey] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsaPubKey, "CertificateName");

    // Decode the PEM encoded certificate for validation later.
    const cert = new jsrsasign.X509();
    cert.readCertPEM(rsaCertificate);

    const expectedThumbprint = byteArrayToHex(generateSha1Hash(cert.hex)).toUpperCase();

    {
      // Add a new signing certificate.
      const setResult = await client.addPolicyManagementCertificate(rsaCertificate, signingKeys);
      assert(setResult.value.certificateResolution === KnownCertificateModification.IsPresent);
      assert(setResult.value.certificateThumbprint === expectedThumbprint);
    }

    {
      // Do it a second time, since these operations are idempotent.
      const setResult = await client.addPolicyManagementCertificate(rsaCertificate, signingKeys);
      assert(setResult.value.certificateResolution === KnownCertificateModification.IsPresent);
      assert(setResult.value.certificateThumbprint === expectedThumbprint);
    }

    {
      const removeResult = await client.removePolicyManagementCertificate(
        rsaCertificate,
        signingKeys
      );
      assert(removeResult.value.certificateResolution === KnownCertificateModification.IsAbsent);
      assert(removeResult.value.certificateThumbprint === expectedThumbprint);
    }

    {
      const removeResult = await client.removePolicyManagementCertificate(
        rsaCertificate,
        signingKeys
      );
      assert(removeResult.value.certificateResolution === KnownCertificateModification.IsAbsent);
      assert(removeResult.value.certificateThumbprint === expectedThumbprint);
    }
  });
});
