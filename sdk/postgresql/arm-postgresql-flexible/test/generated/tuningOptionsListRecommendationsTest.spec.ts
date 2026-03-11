// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("lists available object recommendations", () => {
  let recorder: Recorder;
  let client: PostgreSQLManagementFlexibleServerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new PostgreSQLManagementFlexibleServerClient(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should lists available object recommendations for listAvailableIndexRecommendations", async function () {
    const resArray = new Array();
    for await (const item of client.tuningOptions.listRecommendations(
      "exampleresourcegroup",
      "exampleserver",
      "index",
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 2);
    assert.strictEqual(resArray[0].name, "CreateIndex_ecommerce_public_ps_suppkey_idx");
    assert.strictEqual(
      resArray[0].type,
      "Microsoft.DBforPostgreSQL/flexibleServers/tuningOptions/index",
    );
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/tuningOptions/index/recommendations/1",
    );
    assert.strictEqual(resArray[0].kind, "");
  });

  it("should lists available object recommendations for listAvailableIndexRecommendationsFilteredToExclusivelyGetThoseOfCreateIndexType", async function () {
    const resArray = new Array();
    for await (const item of client.tuningOptions.listRecommendations(
      "exampleresourcegroup",
      "exampleserver",
      "index",
      { recommendationType: "CreateIndex" },
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 2);
    assert.strictEqual(resArray[0].name, "CreateIndex_ecommerce_public_ps_suppkey_idx");
    assert.strictEqual(
      resArray[0].type,
      "Microsoft.DBforPostgreSQL/flexibleServers/tuningOptions/index",
    );
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/tuningOptions/index/recommendations/1",
    );
    assert.strictEqual(resArray[0].kind, "");
  });

  it("should lists available object recommendations for listAvailableTableRecommendations", async function () {
    const resArray = new Array();
    for await (const item of client.tuningOptions.listRecommendations(
      "exampleresourcegroup",
      "exampleserver",
      "table",
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 2);
    assert.strictEqual(resArray[0].name, "Analyze_postgres_public_nation");
    assert.strictEqual(
      resArray[0].type,
      "Microsoft.DBforPostgreSQL/flexibleServers/tuningOptions/table",
    );
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/tuningOptions/table/recommendations/1",
    );
    assert.strictEqual(resArray[0].kind, "");
  });

  it("should lists available object recommendations for listAvailableTableRecommendationsFilteredToExclusivelyGetThoseOfAnalyzeTableType", async function () {
    const resArray = new Array();
    for await (const item of client.tuningOptions.listRecommendations(
      "exampleresourcegroup",
      "exampleserver",
      "table",
      { recommendationType: "AnalyzeTable" },
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 2);
    assert.strictEqual(resArray[0].name, "Analyze_postgres_public_nation");
    assert.strictEqual(
      resArray[0].type,
      "Microsoft.DBforPostgreSQL/flexibleServers/tuningOptions/table",
    );
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/tuningOptions/table/recommendations/1",
    );
    assert.strictEqual(resArray[0].kind, "");
  });
});
