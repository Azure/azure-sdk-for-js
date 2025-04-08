// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import type { AIProjectClient, ConnectionsOperations } from "../../../src/index.js";
import { createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - assistants", () => {
  // let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let connections: ConnectionsOperations;

  beforeEach(async function (_context: VitestTestContext) {
    // recorder = await createRecorder(context);
    projectsClient = createProjectsClient();
    connections = projectsClient.connections;
  });

  afterEach(async function () {
    // await recorder.stop();
  });

  it("client and connection operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(connections);
  });
});
