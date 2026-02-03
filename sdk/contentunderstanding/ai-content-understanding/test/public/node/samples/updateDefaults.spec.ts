// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for updateDefaults.ts - Configure and retrieve default model deployments.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient } from "./sampleTestUtils.js";

describe("Sample: updateDefaults", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should retrieve current model deployment settings", async () => {
    // Retrieve current model deployment settings
    console.log("Retrieving current model deployment settings...");
    const defaults = await client.getDefaults();

    // Assertions
    assert.ok(defaults, "Defaults should not be null");
    console.log("Current model deployment mappings:");

    if (defaults.modelDeployments && Object.keys(defaults.modelDeployments).length > 0) {
      for (const [modelName, deploymentName] of Object.entries(defaults.modelDeployments)) {
        console.log(`  ${modelName}: ${deploymentName}`);
      }
    } else {
      console.log("  No model deployments configured yet.");
    }
  });
});
