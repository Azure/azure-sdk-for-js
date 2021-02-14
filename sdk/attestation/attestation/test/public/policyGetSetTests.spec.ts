// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { AttestationClient, KnownAttestationType } from "../../src";
import { verifyAttestationToken } from "../utils/helpers";

describe("PolicyGetSetTests ", function() {
  let recorder: Recorder;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetPolicyAad", async () => {
    let client: AttestationClient;
    client = createRecordedClient("AAD");
    const policyResult = await client.policy.get(KnownAttestationType.SgxEnclave);
    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      await verifyAttestationToken(result, client);
    }
  });

  it("#GetPolicyIsolated", async () => {
    let client: AttestationClient;
    client = createRecordedClient("Isolated");
    const policyResult = await client.policy.get(KnownAttestationType.SgxEnclave);
    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      await verifyAttestationToken(result, client);
    }
  });

  it("#GetPolicyShared", async () => {
    let client: AttestationClient;
    client = createRecordedClient("Shared");
    const policyResult = await client.policy.get(KnownAttestationType.SgxEnclave);
    const result = policyResult.token;
    assert(result, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      await verifyAttestationToken(result, client);
    }
  });
});
