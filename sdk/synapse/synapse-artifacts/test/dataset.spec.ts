// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DataFlowClient } from "../src";
import { assert } from "chai";
import { authenticate, createClient } from "./utils/testAuthentication";
import { Recorder } from "@azure/test-utils-recorder";

describe("Synapse Dataset Client", () => {
  let client: DataFlowClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = await createClient(DataFlowClient);
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("successfully get data flow by dataflow client", async function() {
    let getResult = await client.get("shangweitest");
    assert.equal(
      getResult.name,
      "shangweitest",
      "Unexpected name of datafloe by beginCreateOrUpdateDataFlow."
    );
    assert.equal(
      getResult.type,
      "Microsoft.Synapse/workspaces/dataflows",
      "Unexpected type of datafloe by beginCreateOrUpdateDataFlow."
    );
  });
});
