// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for Investigations operations (WorkspaceClient).
 *
 * Mirrors the Python suite (test_investigations.py) in the SAME order. The
 * first test seeds the investigation that the read tests depend on; vitest runs
 * `it` blocks top-to-bottom within this file, preserving that ordering.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { Investigation, Task, WorkspaceClient } from "../../src/index.js";
import {
  captureOperationId,
  createRecorder,
  createWorkspaceClient,
  testEnv,
} from "./utils/recordedClient.js";

describe("Investigations operations (WorkspaceClient)", () => {
  let recorder: Recorder;
  let client: WorkspaceClient;
  const projectName = testEnv("AZURE_DISCOVERY_PROJECT_NAME");
  const investigationName = testEnv("AZURE_DISCOVERY_INVESTIGATION_NAME");

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createWorkspaceClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("createOrReplace creates a new investigation (PUT)", async () => {
    const investigation = await client.investigations.createOrReplace(
      projectName,
      investigationName,
      {
        description: "New investigation",
        displayName: "New Test",
      } as Investigation,
    );
    assert.isDefined(investigation);
    assert.equal(investigation.description, "New investigation");
    assert.equal(investigation.displayName, "New Test");
  });

  it("list returns investigations for the project", async () => {
    const page = await client.investigations.list(projectName);
    assert.isDefined(page.value);
    assert.isAtLeast(page.value.length, 1);
    for (const inv of page.value) {
      assert.equal(inv.projectName, projectName);
      assert.isDefined(inv.status);
      assert.isDefined(inv.createdAt);
    }
  });

  it("get returns a specific investigation", async () => {
    const investigation = await client.investigations.get(projectName, investigationName);
    assert.isDefined(investigation);
    assert.equal(investigation.projectName, projectName);
    assert.isDefined(investigation.status);
    assert.isDefined(investigation.createdAt);
    assert.isDefined(investigation.lastModifiedAt);
  });

  it("updateDiscoveryEngine updates the discovery engine", async () => {
    const engine = await client.investigations.updateDiscoveryEngine(
      projectName,
      investigationName,
      {
        systemPrompt: "Updated system prompt for test",
      },
    );
    assert.isDefined(engine);
    assert.property(engine, "discoveryEngineStatus");
  });

  it("getDiscoveryEngine returns the discovery engine", async () => {
    const engine = await client.investigations.getDiscoveryEngine(projectName, investigationName);
    assert.isDefined(engine);
    assert.property(engine, "discoveryEngineStatus");
  });

  it("startDiscoveryEngine starts the discovery engine (requires a task)", async () => {
    // Discovery Engine requires at least one task in the investigation before starting.
    const task = await client.tasks.create(projectName, investigationName, {
      title: "test-task",
      description: "Task for engine start test",
    } as Task);
    const engine = await client.investigations.startDiscoveryEngine(projectName, investigationName);
    await client.tasks.delete(projectName, investigationName, task.name);
    assert.isDefined(engine);
    assert.property(engine, "discoveryEngineStatus");
  });

  it("getDiscoveryEngineMemory returns working memory entries", async () => {
    const memory = await client.investigations.getDiscoveryEngineMemory(
      projectName,
      investigationName,
    );
    assert.isDefined(memory);
    assert.isDefined(memory.value);
  });

  it("stopDiscoveryEngine stops the discovery engine", async () => {
    const engine = await client.investigations.stopDiscoveryEngine(projectName, investigationName);
    assert.isDefined(engine);
  });

  it("createOrReplace updates an existing investigation (PUT)", async () => {
    const investigation = await client.investigations.createOrReplace(
      projectName,
      investigationName,
      {
        description: "Updated via replace",
        displayName: "updated-new-test",
      } as Investigation,
    );
    assert.isDefined(investigation);
    assert.equal(investigation.description, "Updated via replace");
    assert.equal(investigation.displayName, "updated-new-test");
  });

  it("update patches an investigation (PATCH)", async () => {
    const investigation = await client.investigations.update(projectName, investigationName, {
      description: "Updated description",
      displayName: "updated-test",
    } as Investigation);
    assert.isDefined(investigation);
    assert.equal(investigation.description, "Updated description");
  });

  it("getOperationStatus returns status for an investigation LRO", async () => {
    const opStatusName = "test-op-status";
    await client.investigations.createOrReplace(projectName, opStatusName, {
      description: "Sacrificial investigation for getOperationStatus test",
      displayName: "Op Status Test",
    } as Investigation);

    // Start the delete LRO without waiting and capture its operation id.
    const capture = captureOperationId();
    const poller = client.investigations.delete(projectName, opStatusName, {
      onResponse: capture.onResponse,
    });
    await poller.submitted();
    const operationId = capture.operationId();

    const status = await client.investigations.getOperationStatus(
      projectName,
      opStatusName,
      operationId,
    );
    assert.isDefined(status);
    assert.isDefined(status.status);
  });

  it("delete removes a sacrificial investigation (LRO)", async () => {
    const deleteName = "sdk-test-delete";
    await client.investigations.createOrReplace(projectName, deleteName, {
      description: "Sacrificial investigation for delete test",
      displayName: "Delete Status Test",
    } as Investigation);

    const poller = client.investigations.delete(projectName, deleteName);
    await poller.pollUntilDone();
    assert.isTrue(poller.isDone);
    assert.equal(poller.operationState?.status, "succeeded");
  });
});
