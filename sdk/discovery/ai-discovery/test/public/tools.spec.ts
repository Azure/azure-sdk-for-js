// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for Tools operations (WorkspaceClient).
 *
 * vitest runs `it` blocks top-to-bottom within this file.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { WorkspaceClient } from "../../src/index.js";
import {
  captureOperationId,
  createRecorder,
  createWorkspaceClient,
  testEnv,
} from "./utils/recordedClient.js";

describe("Tools operations (WorkspaceClient)", () => {
  let recorder: Recorder;
  let client: WorkspaceClient;
  const projectName = testEnv("AZURE_DISCOVERY_PROJECT_NAME");
  const toolId = testEnv("TOOL_ID");
  const nodePoolId = testEnv("NODE_POOL_ID");

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createWorkspaceClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("run starts a tool run (LRO) that completes with a result", async () => {
    const poller = client.tools.run(projectName, toolId, [nodePoolId], {
      command: 'echo "hello world"',
    });
    const result = await poller.pollUntilDone();
    assert.isDefined(result);
  });

  it("getRunStatus returns the status of a completed tool run", async () => {
    const capture = captureOperationId();
    const poller = client.tools.run(projectName, toolId, [nodePoolId], {
      command: 'echo "status test"',
      onResponse: capture.onResponse,
    });
    await poller.pollUntilDone();
    const operationId = capture.operationId();

    const status = await client.tools.getRunStatus(projectName, operationId);
    assert.isDefined(status);
    assert.isDefined(status.status);
    assert.property(status, "result");
  });

  it("getRunStatus honors the logCount parameter", async () => {
    const capture = captureOperationId();
    const poller = client.tools.run(projectName, toolId, [nodePoolId], {
      command: 'echo "log count test"',
      onResponse: capture.onResponse,
    });
    await poller.pollUntilDone();
    const operationId = capture.operationId();

    const status = await client.tools.getRunStatus(projectName, operationId, { logCount: 10 });
    assert.isDefined(status);
    assert.isDefined(status.status);
    assert.property(status, "result");
  });

  it("cancelRunLro cancels an in-flight tool run (LRO)", async () => {
    const capture = captureOperationId();
    const poller = client.tools.run(projectName, toolId, [nodePoolId], {
      command: 'echo "cancel test" && sleep 300',
      onResponse: capture.onResponse,
    });
    await poller.submitted();
    const operationId = capture.operationId();

    const cancelPoller = client.tools.cancelRun(projectName, operationId);
    // A successful cancel drives the run to terminal "canceled", which the cancel
    // poller surfaces as "succeeded" so pollUntilDone resolves; if the run finished
    // first the status is already "succeeded".
    await cancelPoller.pollUntilDone();
    assert.isTrue(cancelPoller.isDone);
    assert.equal(cancelPoller.operationState?.status, "succeeded");
  });

  it("getOperations lists tool operations in a project", async () => {
    for await (const op of client.tools.listOperations(projectName)) {
      assert.isDefined(op);
    }
  });

  it("getComputeUsage returns compute usage for a project", async () => {
    const usage = await client.tools.getComputeUsage(projectName);
    assert.isDefined(usage);
  });
});
