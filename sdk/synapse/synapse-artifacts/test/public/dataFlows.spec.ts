// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ArtifactsClient } from "../../src/artifactsClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("DataFlow", () => {
  const dataFlowName = "testdataflow";
  const renamedDataflow = "testdataflow2";
  let recorder: Recorder;
  let client: ArtifactsClient;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create dataFlow", async () => {
    const poller = await client.dataFlowOperations.beginCreateOrUpdateDataFlow(dataFlowName, {
      properties: { type: "MappingDataFlow" },
    });

    const result = await poller.pollUntilDone();

    assert.equal(result.name, dataFlowName);
  }).timeout(30000);

  it("should list dataFlows", async () => {
    const dataflows = client.dataFlowOperations.listDataFlowsByWorkspace();
    let count = 0;
    for await (const item of dataflows) {
      if (item) {
        count++;
      }
    }

    assert.ok(count > 0, "No data flows found");
  }).timeout(30000);

  it("should get dataFlow", async () => {
    const dataFlow = await client.dataFlowOperations.getDataFlow(dataFlowName);
    assert.equal(dataFlow.name, dataFlowName);
  });

  it("should rename dataFlow", async () => {
    const poller = await client.dataFlowOperations.beginRenameDataFlow(dataFlowName, {
      newName: renamedDataflow,
    });
    await poller.pollUntilDone();

    assert.isTrue(poller.isDone());
  }).timeout(30000);

  it("should delete dataFlow", async () => {
    const poller = await client.dataFlowOperations.beginDeleteDataFlow(renamedDataflow);
    await poller.pollUntilDone();

    assert.isTrue(poller.isDone());
  }).timeout(30000);
});
