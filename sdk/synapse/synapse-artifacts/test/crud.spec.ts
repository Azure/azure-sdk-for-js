// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DataFlowClient } from "../src";
import { assert } from "chai";
import { authenticate, createClient } from "./utils/testAuthentication";
import { Recorder } from "@azure/test-utils-recorder";
// import { DataFlowResource } from "../src/models";
// import { getSparkpoolName } from "./utils/utils.common";

describe("Synapse Artifacts Client", () => {
  //   let client: ArtifactsClient;
  let dataflowClient: DataFlowClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    dataflowClient = await createClient(DataFlowClient);
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  //   it("successfully create data flow", async function() {
  //     let dataflow : DataFlowResource =  {
  //         properties : {
  //             type : "MappingDataFlow"
  //         }
  //     };
  //     let getResult = await client.beginCreateOrUpdateDataFlow("shangweidataflow", dataflow);
  //     const response = await getResult.pollUntilDone();
  //     assert.equal(
  //       response.name,
  //       "shangweidataflow",
  //       "Unexpected name of datafloe by beginCreateOrUpdateDataFlow."
  //     );
  //     assert.equal(
  //       response.type,
  //       "Microsoft.Synapse/workspaces/dataflows",
  //       "Unexpected type of datafloe by beginCreateOrUpdateDataFlow."
  //     );
  //   });

  //   it("successfully get big data pool", async function() {
  //     let getResult = await client.GetBigDataPool(getSparkpoolName());
  //     assert.equal(
  //         getResult.sparkVersion,
  //       "2.4",
  //       "Unexpected spark Version of big data pool by GetBigDataPool."
  //     );
  //   });

  //   it("successfully get data flow", async function() {
  //     let getResult = await client.getDataFlow("shangweitest");
  //     assert.equal(
  //         getResult.name,
  //       "shangweitest",
  //       "Unexpected name of datafloe by beginCreateOrUpdateDataFlow."
  //     );
  //     assert.equal(
  //         getResult.type,
  //       "Microsoft.Synapse/workspaces/dataflows",
  //       "Unexpected type of datafloe by beginCreateOrUpdateDataFlow."
  //     );
  //   });

  it("successfully get data flow by dataflow client", async function() {
    let getResult = await dataflowClient.get("shangweitest");
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
