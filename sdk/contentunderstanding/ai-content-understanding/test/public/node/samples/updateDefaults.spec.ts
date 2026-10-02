// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for updateDefaults.ts - Configure and retrieve default model deployments.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient } from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: updateDefaults", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // ========== getDefaults structural verification ==========
    // Python `test_sample_update_defaults` iteration:
    //   1. `modelDeployments` (if present) must be an object whose entries are
    //      non-empty string -> non-empty string pairs. That contract holds
    //      regardless of which concrete model names the Foundry resource is
    //      configured for, so it is portable across environments and stable in
    //      playback.
    //   2. Well-known keys (`prebuilt-analyzer-completion` + `-completion-mini`
    //      + `-embedding` aliases, plus common concrete completion / embedding
    //      names) are checked as a SOFT assertion — we only log which of them
    //      were found, we do NOT fail when a resource is configured with a
    //      different model set. Mirrors Python's `expected_keys` behavior.
    const modelDeployments = defaults.modelDeployments;
    if (modelDeployments && Object.keys(modelDeployments).length > 0) {
      for (const [modelName, deploymentName] of Object.entries(modelDeployments)) {
        assert.strictEqual(
          typeof modelName,
          "string",
          `modelDeployments key '${modelName}' should be a string`,
        );
        assert.ok(modelName.trim(), "modelDeployments key should not be empty or whitespace");
        assert.strictEqual(
          typeof deploymentName,
          "string",
          `modelDeployments['${modelName}'] should be a string`,
        );
        assert.ok(
          (deploymentName as string).trim(),
          `modelDeployments['${modelName}'] should not be empty`,
        );
        console.log(`  ${modelName}: ${deploymentName}`);
      }

      // Soft check: log which well-known keys are present. We do not assert
      // failure when a resource is configured for a different model set.
      // The set of expected keys mirrors what `updateDefaults.ts` writes when
      // run with the recommended CU_* env vars, plus the two Python-canonical
      // concrete names for GA back-compat.
      const expectedKeys = new Set([
        "gpt-5.2",
        "gpt-4.1",
        "gpt-4.1-mini",
        "text-embedding-3-large",
        "prebuilt-analyzer-completion",
        "prebuilt-analyzer-completion-mini",
        "prebuilt-analyzer-embedding",
      ]);
      const foundKeys = Object.keys(modelDeployments).filter((k) => expectedKeys.has(k));
      if (foundKeys.length > 0) {
        console.log(
          `[PASS] Found ${foundKeys.length} well-known model key(s): ${foundKeys.sort().join(", ")}`,
        );
      }
    } else {
      console.log("  No model deployments configured yet.");
    }
  });
});
