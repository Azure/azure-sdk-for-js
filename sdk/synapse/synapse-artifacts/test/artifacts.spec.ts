// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ArtifactsClient } from "../src";
import { assert } from "chai";
import { authenticate, createClient } from "./utils/testAuthentication";
import { Recorder } from "@azure/test-utils-recorder";
import { getSparkpoolName } from "./utils/utils.common";

describe("Synapse Artifacts Client", () => {
  let artifactsClient: ArtifactsClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    artifactsClient = await createClient(ArtifactsClient);
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("successfully get big data pool", async function() {
    let getResult = await artifactsClient.getBigDataPool(getSparkpoolName());
    assert.equal(
      getResult.sparkVersion,
      "2.4",
      "Unexpected spark Version of big data pool by ArtifactsClient.getBigDataPool."
    );
  });
});
