// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { EasmDefenderClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";
// import { createClient } from "./utils/recordedClient";
//import { EasmDefenderClient } from "../../src";

describe("Tasks Test", () => {
  let recorder: Recorder;
  let client: EasmDefenderClient;
  let existing_task_id: string;
  let cancel_task_id: string;
  const UUID_REGEX: RegExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    const subscription_id = env.SUBSCRIPTIONID || "";
    const resource_group = env.RESOURCEGROUPNAME || "";
    const workspace_name = env.WORKSPACENAME || "";
    const endpoint = env.ENDPOINT || "";
    const credential = createTestCredential();
    client = EasmDefender(
      endpoint,
      subscription_id,
      resource_group,
      workspace_name,
      credential,
      recorder.configureClientOptions({})
    );
    existing_task_id = "5dcfcf76-a99c-470d-9c45-ac2a18c40c4b";
    cancel_task_id = "5dcfcf76-a99c-470d-9c45-ac2a18c40c4b";
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
