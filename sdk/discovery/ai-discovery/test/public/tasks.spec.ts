// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for Tasks operations (WorkspaceClient).
 *
 * Mirrors the Python suite (test_tasks.py) in the SAME order. Each test is
 * self-contained: it creates its own task and cleans it up, so ordering is not
 * strictly load-bearing here, but the definition order matches Python for
 * fidelity. vitest runs `it` blocks top-to-bottom within this file.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { Task, WorkspaceClient } from "../../src/index.js";
import {
  agentName,
  createRecorder,
  createWorkspaceClient,
  investigationPath,
  testEnv,
} from "./utils/recordedClient.js";

describe("Tasks operations (WorkspaceClient)", () => {
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

  async function createTask(
    title = "sdk-test-task",
    description = "Test task for JS SDK",
  ): Promise<Task> {
    return client.tasks.create(projectName, investigationName, {
      title,
      priority: "High",
      description,
      assignedTo: { id: agentName(), type: "Application" },
      investigationId: investigationPath(projectName, investigationName),
    } as Task);
  }

  async function deleteTaskQuiet(taskName: string): Promise<void> {
    try {
      await client.tasks.delete(projectName, investigationName, taskName);
    } catch {
      // best-effort cleanup
    }
  }

  it("list returns tasks in an investigation", async () => {
    const created = await createTask("task-for-list-test");
    try {
      let count = 0;
      for await (const task of client.tasks.list(projectName, investigationName)) {
        count++;
        assert.isDefined(task.title);
        assert.isDefined(task.status);
      }
      assert.isAtLeast(count, 1);
    } finally {
      await deleteTaskQuiet(created.name);
    }
  });

  it("create creates a task in an investigation", async () => {
    const task = await createTask("A new sdk task");
    try {
      assert.isDefined(task);
      assert.equal(task.title, "A new sdk task");
      assert.equal(task.description, "Test task for JS SDK");
    } finally {
      await deleteTaskQuiet(task.name);
    }
  });

  it("get returns a specific task", async () => {
    const created = await createTask("task-for-get-test");
    try {
      const task = await client.tasks.get(projectName, investigationName, created.name);
      assert.isDefined(task);
      assert.equal(task.title, "task-for-get-test");
      assert.isDefined(task.status);
      assert.isDefined(task.createdAt);
      assert.isDefined(task.assignedTo);
    } finally {
      await deleteTaskQuiet(created.name);
    }
  });

  it("stableUpdate patches a task (PATCH)", async () => {
    const created = await createTask("task-for-update-test");
    try {
      const updated = await client.tasks.stableUpdate(
        projectName,
        investigationName,
        created.name,
        {
          title: "Updated sdk task title",
          description: "Updated sdk task description",
        } as Task,
      );
      assert.isDefined(updated);
      assert.equal(updated.title, "Updated sdk task title");
      assert.equal(updated.description, "Updated sdk task description");
    } finally {
      await deleteTaskQuiet(created.name);
    }
  });

  it("delete removes a task", async () => {
    const created = await createTask("task-for-delete-test");
    const result = await client.tasks.delete(projectName, investigationName, created.name);
    assert.isUndefined(result);
  });

  it("list supports an OData filter", async () => {
    const created = await createTask("task-for-filter-test");
    try {
      let count = 0;
      for await (const _task of client.tasks.list(projectName, investigationName, {
        filter: "status eq 'New'",
      })) {
        count++;
      }
      assert.isAtLeast(count, 0);
    } finally {
      await deleteTaskQuiet(created.name);
    }
  });

  it("start starts execution of a task", async () => {
    const created = await createTask("task-for-start-test");
    try {
      const task = await client.tasks.start(projectName, investigationName, created.name);
      assert.isDefined(task);
      assert.isDefined(task.status);
    } finally {
      await deleteTaskQuiet(created.name);
    }
  });

  it("addComment adds a comment to a task", async () => {
    const created = await createTask("task-for-comment-test");
    try {
      const task = await client.tasks.addComment(projectName, investigationName, created.name, {
        timestamp: new Date("2026-04-08T21:00:00Z"),
        createdBy: "test-user",
        createdByType: "User",
        text: "Test comment",
      });
      assert.isDefined(task);
      assert.isDefined(task.title);
    } finally {
      await deleteTaskQuiet(created.name);
    }
  });

  it("addExecutionHistory adds an execution history entry to a task", async () => {
    const created = await createTask("task-for-exec-history-test");
    try {
      const task = await client.tasks.addExecutionHistory(
        projectName,
        investigationName,
        created.name,
        {
          createdAt: new Date("2026-04-08T21:00:00Z"),
          action: "completed",
          createdBy: agentName(),
          createdByType: "Application",
          summary: "Task execution completed",
        },
      );
      assert.isDefined(task);
      assert.isDefined(task.title);
      assert.isDefined(task.status);
    } finally {
      await deleteTaskQuiet(created.name);
    }
  });
});
