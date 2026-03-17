// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { Tool, ToolUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Discovery ARM Client - Tools", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;
  let resourceGroupName: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new DiscoveryClient(credential, subscriptionId, recorder.configureClientOptions({}));
    resourceGroupName = env.DISCOVERY_RESOURCE_GROUP || "olawal";
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it("should list tools in subscription", async () => {
    const tools: any[] = [];
    for await (const tool of client.tools.listBySubscription()) {
      tools.push(tool);
    }
    assert.isArray(tools);
  });

  it("should list tools in resource group", async () => {
    const tools: any[] = [];
    for await (const tool of client.tools.listByResourceGroup(resourceGroupName)) {
      tools.push(tool);
    }
    assert.isArray(tools);
  });

  it("should get a tool", async () => {
    const tool = await client.tools.get(resourceGroupName, "test-tool-50d87c62");
    assert.isDefined(tool);
    assert.isDefined(tool.name);
    assert.isDefined(tool.location);
  });

  it("should create a tool", async () => {
    const toolData: Tool = {
      location: "uksouth",
      properties: {
        version: "1.0.0",
        definitionContent: {
          name: "molpredictor",
          description: "Molecular property prediction for single SMILES strings.",
          version: "1.0.0",
          category: "cheminformatics",
          license: "MIT",
          infra: [
            {
              name: "worker",
              infra_type: "container",
              image: { acr: "demodiscoveryacr.azurecr.io/molpredictor:latest" },
              compute: {
                min_resources: { cpu: "1", ram: "1Gi", storage: "32", gpu: "0" },
                max_resources: { cpu: "2", ram: "1Gi", storage: "64", gpu: "0" },
                recommended_sku: ["Standard_D4s_v6"],
                pool_type: "static",
                pool_size: 1,
              },
            },
          ],
          actions: [
            {
              name: "predict",
              description: "Predict molecular properties for SMILES strings.",
              input_schema: {
                type: "object",
                properties: {
                  action: {
                    type: "string",
                    description:
                      "The property to predict. Must be one of [log_p, boiling_point, solubility, density, critical_point]",
                  },
                },
                required: ["action"],
              },
              command: "python molpredictor.py --action {{ action }}",
              infra_node: "worker",
            },
          ],
        },
      },
    };
    const poller = client.tools.createOrUpdate(
      resourceGroupName,
      "test-tool-50d87c62",
      toolData,
      testPollingOptions,
    );
    const tool = await poller.pollUntilDone();
    assert.isDefined(tool);
  });

  it("should update a tool", async () => {
    const updateData: ToolUpdate = { tags: { SkipAutoDeleteTill: "2026-12-31" } };
    const poller = client.tools.update(
      resourceGroupName,
      "test-tool-50d87c62",
      updateData,
      testPollingOptions,
    );
    const tool = await poller.pollUntilDone();
    assert.isDefined(tool);
  });

  it("should delete a tool", async () => {
    const poller = client.tools.delete(
      resourceGroupName,
      "test-tool-50d87c62",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
