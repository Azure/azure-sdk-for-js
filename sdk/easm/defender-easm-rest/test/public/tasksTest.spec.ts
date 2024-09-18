// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { EasmClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Tasks Test", () => {
  let recorder: Recorder;
  let client: EasmClient;
  let existing_task_id: string;
  let cancel_task_id: string;
  const UUID_REGEX: RegExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    const subscription_id = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const resource_group = assertEnvironmentVariable("RESOURCEGROUPNAME");
    const workspace_name = assertEnvironmentVariable("WORKSPACENAME");
    const endpoint = assertEnvironmentVariable("ENDPOINT");
    const credential = createTestCredential();
    client = EasmDefender(
      endpoint,
      subscription_id,
      resource_group,
      workspace_name,
      credential,
      recorder.configureClientOptions({}),
    );
    existing_task_id = "efad1fac-52d5-4ea9-b601-d5bf54a83780";
    cancel_task_id = "efad1fac-52d5-4ea9-b601-d5bf54a83780";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should list tasks", async () => {
    const tasksResponse = await client.path("/tasks").get({});
    if (isUnexpected(tasksResponse)) {
      throw new Error(tasksResponse.body?.error.message);
    }

    assert.strictEqual(tasksResponse.status, "200");

    const task_response = tasksResponse.body.value![0];

    assert.isNotEmpty(task_response.id?.match(UUID_REGEX));
  });

  it("Should get a given task", async () => {
    const tasksResponse = await client.path("/tasks/{taskId}", existing_task_id).get();
    if (isUnexpected(tasksResponse)) {
      throw new Error(tasksResponse.body?.error.message);
    }

    assert.strictEqual(tasksResponse.status, "200");

    const task_response = tasksResponse.body;

    assert.isNotEmpty(task_response.id?.match(UUID_REGEX));
  });

  it("Should cancel tasks", async () => {
    const tasksResponse = await client.path("/tasks/{taskId}:cancel", cancel_task_id).post();
    if (isUnexpected(tasksResponse)) {
      throw new Error(tasksResponse.body?.error.message);
    }

    assert.strictEqual(tasksResponse.status, "200");

    const task_response = tasksResponse.body;

    assert.isNotEmpty(task_response.id?.match(UUID_REGEX));
  });
});
