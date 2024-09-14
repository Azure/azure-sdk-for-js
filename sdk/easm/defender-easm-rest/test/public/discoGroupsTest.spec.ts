// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { DiscoSource, EasmClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Discovery Groups Test", () => {
  let recorder: Recorder;
  let client: EasmClient;

  let known_group_name: string;
  let new_group_name: string;
  let new_group_description: string;
  let seed_kind: string;
  let seed_name: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    const subscription_id = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const resource_group = assertEnvironmentVariable("RESOURCEGROUPNAME");
    const workspace_name = assertEnvironmentVariable("WORKSPACENAME");
    const endpoint = assertEnvironmentVariable("ENDPOINT");
    const credential = createTestCredential();
    client = EasmDefender(
      endpoint +
        "/subscriptions/" +
        subscription_id +
        "/resourceGroups/" +
        resource_group +
        "/workspaces/" +
        workspace_name,
      credential,
      recorder.configureClientOptions({}),
    );
    known_group_name = "University of Kansas";
    new_group_name = "New disco group name from ts";
    new_group_description = "Here is a description";
    seed_kind = "domain";
    seed_name = "example.org";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should list discovery groups", async () => {
    const discoGroupResponse = await client.path("/discoGroups").get();
    if (isUnexpected(discoGroupResponse)) {
      throw new Error(discoGroupResponse.body?.error.message);
    }

    assert.strictEqual(discoGroupResponse.status, "200");

    const disco_group = discoGroupResponse.body.value![0];

    assert.isNotNull(disco_group.name);
    assert.isNotNull(disco_group.displayName);
    assert.isNotNull(disco_group.description);
    assert.isNotNull(disco_group.tier);
    assert.isNotNull(disco_group.id);
  });

  // it("Should validate a discovery group", async () => {
  //   const discoGroupResponse = await client
  //     .path("/discoGroups:validate/{groupName}", known_group_name)
  //     .post({ body: { name: known_group_name } });
  //   if (isUnexpected(discoGroupResponse)) {
  //     throw new Error(discoGroupResponse.body?.error.message);
  //   }

  //   assert.strictEqual(discoGroupResponse.status, "200");

  //   const validate_response = discoGroupResponse.body;

  //   assert.isNull(validate_response.error);
  // });

  it("Should get a given discovery group", async () => {
    const discoGroupResponse = await client
      .path("/discoGroups/{groupName}", known_group_name)
      .get();
    if (isUnexpected(discoGroupResponse)) {
      throw new Error(discoGroupResponse.body?.error.message);
    }

    assert.strictEqual(discoGroupResponse.status, "200");

    const disco_group = discoGroupResponse.body;

    assert.isNotNull(disco_group.name);
    assert.isNotNull(disco_group.displayName);
    assert.isNotNull(disco_group.description);
    assert.isNotNull(disco_group.tier);
    assert.isNotNull(disco_group.id);
  });

  it("Should put a new discovery group", async () => {
    const seeds: DiscoSource[] = [{ kind: seed_kind, name: seed_name }];
    const discoGroupResponse = await client.path("/discoGroups/{groupName}", new_group_name).put({
      body: {
        seeds: seeds,
        description: new_group_description,
      },
    });
    if (isUnexpected(discoGroupResponse)) {
      throw new Error(discoGroupResponse.body?.error.message);
    }

    const disco_group_response = discoGroupResponse.body;

    assert.strictEqual(new_group_name, disco_group_response.name);
    // assert.strictEqual(new_group_name, disco_group_response.displayName);
    assert.strictEqual(new_group_description, disco_group_response.description);
    assert.strictEqual(seeds[0].kind, disco_group_response.seeds![0].kind);
    assert.strictEqual(seeds[0].name, disco_group_response.seeds![0].name);
  });

  it("Should run a discovery group", async () => {
    const discoGroupResponse = await client
      .path("/discoGroups/{groupName}:run", known_group_name)
      .post({});
    if (isUnexpected(discoGroupResponse)) {
      throw new Error(discoGroupResponse.body?.error.message);
    }
  });

  it("Should list discovery group runs", async () => {
    const discoGroupResponse = await client
      .path("/discoGroups/{groupName}/runs", known_group_name)
      .get();
    if (isUnexpected(discoGroupResponse)) {
      throw new Error(discoGroupResponse.body?.error.message);
    }

    const discovery_run = discoGroupResponse.body.value![0];

    assert.isNotNull(discovery_run.state);
    assert.isNotNull(discovery_run.tier);
  });
});
