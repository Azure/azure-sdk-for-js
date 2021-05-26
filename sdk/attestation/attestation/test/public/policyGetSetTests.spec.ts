// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import {
  createRecordedAdminClient,
  createRecordedClient,
  createRecorder,
  EndpointType,
  getIsolatedSigningKey } from "../utils/recordedClient";
import { KnownAttestationType } from "../../src";
import { verifyAttestationToken } from "../utils/helpers";

describe("PolicyGetSetTests ", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetPolicyAad", async () => {
    await testGetPolicy("AAD");
  });

  it("#GetPolicyIsolated", async () => {
    await testGetPolicy("Isolated");
  });

  it("#GetPolicyShared", async () => {
    await testGetPolicy("Shared");
  });

  it("#SetPolicyIsolated", async() => {
    recorder.skip(undefined, "SetPolicy APIs require keys and certificates which aren't available in playback");
    let signingKeys = getIsolatedSigningKey();
    console.log(signingKeys.key);
  });

  async function testGetPolicy(clientLocation: EndpointType) : Promise<void>{
    const adminClient = createRecordedAdminClient(clientLocation);
    const policyResult = await adminClient.getPolicy(KnownAttestationType.SgxEnclave);
    const result = policyResult.token;
    assert.isTrue(policyResult.value.startsWith("version="));


    assert(policyResult.token, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      const client = createRecordedClient(clientLocation);
      const signers = await client.getAttestationSigners();
      await verifyAttestationToken(policyResult.token.serialize(), signers, clientLocation);
    }
   }
});
