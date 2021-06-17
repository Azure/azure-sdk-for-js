import { ArtifactsClientRestClient } from "../../src";
import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { getLongRunningPoller, paginate } from "../../src";

describe("DataFlow", () => {
  let recorder: Recorder;
  let client: ArtifactsClientRestClient;
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
    const beginCreateOrUpdate = await client
      .path("/dataflows/{dataFlowName}", dataFlowName)
      .put({ body: { properties: { type: "MappingDataFlow" } } });

    const poller = getLongRunningPoller(client, beginCreateOrUpdate);

    const result = await poller.pollUntilDone();

    if (result.status !== "200") {
      throw new Error(`Unexpected status ${result.status}`);
    }

    assert.equal(result.body.name, dataFlowName);
  }).timeout(30000);

  it("should list dataFlows", async () => {
    const dataflows = paginate(client, "/dataflows");
    let count = 0;
    for await (const item of dataflows) {
      if (item) {
        count++;
      }
    }

    assert.ok(count > 0, "No data flows found");
  }).timeout(30000);

  it("should get dataFlow", async () => {
    const dataFlow = await client.path("/dataflows/{dataFlowName}", dataFlowName).get();

    if (dataFlow.status !== "200") {
      throw new Error(`Unexpected status ${dataFlow.status}`);
    }

    assert.equal(dataFlow.body.name, dataFlowName);
  });

  it("should rename dataFlow", async () => {
    const renameOperation = await client
      .path("/dataflows/{dataFlowName}/rename", dataFlowName)
      .post({ body: { newName: renamedDataflow } });

    const poller = getLongRunningPoller(client, renameOperation);
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
  }).timeout(30000);

  it("should delete dataFlow", async () => {
    const deleteOperation = await client
      .path("/dataflows/{dataFlowName}", renamedDataflow)
      .delete();
    const poller = getLongRunningPoller(client, deleteOperation);
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
  }).timeout(30000);
});
