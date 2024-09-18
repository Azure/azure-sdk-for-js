// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { EasmClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Saved Filters Test", () => {
  let recorder: Recorder;
  let client: EasmClient;
  let delete_saved_filter_name: string;
  let put_saved_filter_name: string;
  let known_existing_filter: string;
  let filter: string;

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
    delete_saved_filter_name = "put_filter";
    put_saved_filter_name = "put_filter";
    known_existing_filter = "new_put_filter";
    filter = `name = "${put_saved_filter_name}"`;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should list saved filters", async () => {
    const savedFiltersResponse = await client.path("/savedFilters").get();
    if (isUnexpected(savedFiltersResponse)) {
      throw new Error(savedFiltersResponse.body?.error.message);
    }

    assert.strictEqual(savedFiltersResponse.status, "200");

    const saved_filter = savedFiltersResponse.body.value![0];

    assert.isNotNull(saved_filter.id);
    assert.isNotNull(saved_filter.description);
  });

  it("Should get a given saved filter", async () => {
    const savedFiltersResponse = await client
      .path("/savedFilters/{filterName}", known_existing_filter)
      .get();
    if (isUnexpected(savedFiltersResponse)) {
      throw new Error(savedFiltersResponse.body?.error.message);
    }

    assert.strictEqual(savedFiltersResponse.status, "200");

    const saved_filter = savedFiltersResponse.body;

    assert.isNotNull(saved_filter.displayName);
    assert.isNotNull(saved_filter.id);
    assert.isNotNull(saved_filter.description);
  });

  it("Should put a new saved filter", async () => {
    const savedFiltersResponse = await client
      .path("/savedFilters/{filterName}", put_saved_filter_name)
      .put({
        body: { description: "Sample description", filter: filter },
      });
    if (isUnexpected(savedFiltersResponse)) {
      throw new Error(savedFiltersResponse.body?.error.message);
    }

    const saved_filter = savedFiltersResponse.body;

    assert.strictEqual(put_saved_filter_name, saved_filter.name);
    assert.strictEqual(put_saved_filter_name, saved_filter.id);
    assert.strictEqual(put_saved_filter_name, saved_filter.displayName);
    assert.strictEqual("Sample description", saved_filter.description);
  });

  it("Should delete a saved filter", async () => {
    const savedFiltersResponse = await client
      .path("/savedFilters/{filterName}", delete_saved_filter_name)
      .delete();
    if (isUnexpected(savedFiltersResponse)) {
      throw new Error(savedFiltersResponse.body?.error.message);
    }

    assert.strictEqual(savedFiltersResponse.status, "204");
  });
});
