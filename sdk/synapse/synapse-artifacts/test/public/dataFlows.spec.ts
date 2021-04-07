import { ArtifactsClient } from "../../src/artifactsClient";
import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("DataFlow", () => {
  let recorder: Recorder;
  let client: ArtifactsClient;
  const dataFlowName = "testdataflow";
  const renamedDataflow = "testdataflow2";

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create dataFlow", async () => {
    const poller = await client.dataFlow.createOrUpdateDataFlow(dataFlowName, {
      properties: { type: "MappingDataFlow" }
    });

    const result = await poller.pollUntilDone();

    assert.equal(result.name, dataFlowName);
  }).timeout(30000);

  it("should list dataFlows", async () => {
    const dataflows = client.dataFlow.listDataFlowsByWorkspace();
    let count = 0;
    for await (const item of dataflows) {
      if (item) {
        count++;
      }
    }

    assert.ok(count > 0, "No data flows found");
  }).timeout(30000);

  it("should get dataFlow", async () => {
    const dataFlow = await client.dataFlow.getDataFlow(dataFlowName);
    assert.equal(dataFlow.name, dataFlowName);
  });

  it("should rename dataFlow", async () => {
    const poller = await client.dataFlow.renameDataFlow(dataFlowName, {
      newName: renamedDataflow
    });
    const result = await poller.pollUntilDone();

    assert.equal(result._response.status, 200);
  }).timeout(30000);

  it("should delete dataFlow", async () => {
    const poller = await client.dataFlow.deleteDataFlow(renamedDataflow);
    const result = await poller.pollUntilDone();

    assert.equal(result._response.status, 200);
  }).timeout(30000);
});
