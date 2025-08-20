// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ArtifactsClient } from "$internal/artifactsClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DataFlow", () => {
  const dataFlowName = "testdataflow";
  const renamedDataflow = "testdataflow2";
  let recorder: Recorder;
  let client: ArtifactsClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create dataFlow", { timeout: 30000 }, async () => {
    const poller = await client.dataFlowOperations.beginCreateOrUpdateDataFlow(dataFlowName, {
      properties: { type: "MappingDataFlow" },
    });

    const result = await poller.pollUntilDone();

    assert.equal(result.name, dataFlowName);
  });

  it("should list dataFlows", { timeout: 30000 }, async () => {
    const dataflows = client.dataFlowOperations.listDataFlowsByWorkspace();
    let count = 0;
    for await (const item of dataflows) {
      if (item) {
        count++;
      }
    }

    assert.ok(count > 0, "No data flows found");
  });

  it("should get dataFlow", async () => {
    const dataFlow = await client.dataFlowOperations.getDataFlow(dataFlowName);
    assert.equal(dataFlow.name, dataFlowName);
  });

  it("should rename dataFlow", { timeout: 30000 }, async () => {
    const poller = await client.dataFlowOperations.beginRenameDataFlow(dataFlowName, {
      newName: renamedDataflow,
    });
    await poller.pollUntilDone();

    assert.isTrue(poller.isDone());
  });

  it("should delete dataFlow", { timeout: 30000 }, async () => {
    const poller = await client.dataFlowOperations.beginDeleteDataFlow(renamedDataflow);
    await poller.pollUntilDone();

    assert.isTrue(poller.isDone());
  });
});
