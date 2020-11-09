// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DataFlowClient } from "../src";
import { assert } from "chai";
import { authenticate, createClient } from "./utils/testAuthentication";
import { Recorder } from "@azure/test-utils-recorder";
import { DataFlowResource } from "../src"

describe("Synapse Dataset Client", () => {
  let client : DataFlowClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = await createClient(DataFlowClient);
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("successfully create data flow", async function() {
    let dataflow : DataFlowResource =  {
        properties : {
            type : "MappingDataFlow"
        }
    };
    let getResult = await client.beginUpsert("shangweidataflow", dataflow);
    const response = await getResult.pollUntilDone();
    assert.equal(
      response.name,
      "shangweidataflow",
      "Unexpected name of dataflow by DataFlowClient.beginUpsert."
    );
    assert.equal(
      response.type,
      "Microsoft.Synapse/workspaces/dataflows",
      "Unexpected type of dataflow by DataFlowClient.beginUpsert."
    );
  });

  it("successfully get data se by dataflow client", async function() {
    let getResult = await client.get("shangweitest");
    assert.equal(
        getResult.name,
      "shangweitest",
      "Unexpected name of dataflow by DataFlowClient.get."
    );
    assert.equal(
        getResult.type,
      "Microsoft.Synapse/workspaces/dataflows",
      "Unexpected type of dataflow by DataFlowClient.get."
    );
  });
});