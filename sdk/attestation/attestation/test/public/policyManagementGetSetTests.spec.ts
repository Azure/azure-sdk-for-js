// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { verifyAttestationToken } from "../utils/helpers";

describe("PolicyManagementTests ", function() {
  let recorder: Recorder;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetPolicyManagementCertificatesAad", async () => {
    const client = createRecordedClient("AAD");

    const policyResult = await client.policyCertificates.get();
    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      const tokenResult = await verifyAttestationToken(result, client);
      assert.isDefined(tokenResult);
      if (tokenResult) {
        const tokenKeys = tokenResult["x-ms-policy-certificates"];
        assert.equal(tokenKeys.keys.length, 0);
      }
    }
  });

  it("#GetPolicyShared", async () => {
    const client = createRecordedClient("Shared");
    const policyResult = await client.policyCertificates.get();

    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      const tokenResult = await verifyAttestationToken(result, client);
      assert.isDefined(tokenResult);
      if (tokenResult) {
        const tokenKeys = tokenResult["x-ms-policy-certificates"];
        assert.equal(tokenKeys.keys.length, 0);
      }
    }
  });

  it("#GetPolicyIsolated", async () => {
    const client = createRecordedClient("Isolated");
    const policyResult = await client.policyCertificates.get();

    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      const tokenResult = await verifyAttestationToken(result, client);
      assert.isDefined(tokenResult);
      if (tokenResult) {
        const tokenKeys = tokenResult["x-ms-policy-certificates"];
        // The isolated client has a single management client, unlike the others.
        assert.equal(tokenKeys.keys.length, 1);
      }
    }
  });
});
