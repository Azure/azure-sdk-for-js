// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { AttestationClient } from "../../src";

describe("PolicyGetSetTests ", function() {
  let recorder: Recorder;
  let client: AttestationClient;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = createRecorder(this);
    client = createRecordedClient("AAD");
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetPolicyAad", async () => {
    const policyResult = await client.policy.get("SgxEnclave");
    const result = policyResult.token;
    assert(result);
  });
});
