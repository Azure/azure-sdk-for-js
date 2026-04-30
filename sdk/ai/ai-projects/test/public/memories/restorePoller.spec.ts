// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { it, describe, beforeEach, afterEach, assert } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import { restorePoller } from "../../../src/index.js";

describe("restorePoller", () => {
  let projectsClient: AIProjectClient;
  let recorder: Recorder;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skip("should serialize and restore an updateMemories LRO poller", async function () {
    // TODO(restorePoller): unskip after recording added
    const memoryStoreName = "test_restore_poller_store";
    const scope = "user_restore_test";

    // Start the LRO
    const poller = projectsClient.beta.memoryStores.updateMemories(memoryStoreName, scope, {
      items: [{ role: "user", type: "message", content: "Hello" }],
    });

    // Serialize the poller state
    const serializedState = (await poller).toString();
    assert.isString(serializedState, "Serialized state should be a non-empty string");

    // Restore and complete via restorePoller
    const restoredPoller = restorePoller(
      projectsClient,
      serializedState,
      projectsClient.beta.memoryStores.updateMemories.bind(projectsClient.beta.memoryStores),
    );

    const result = await restoredPoller.pollUntilDone();
    assert.isDefined(result, "Restored poller should complete and return a result");
  });
});
