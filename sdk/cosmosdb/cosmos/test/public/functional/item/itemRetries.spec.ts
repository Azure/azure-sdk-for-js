// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../../src/index.js";
import { endpoint } from "../../common/_testConfig.js";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { describe, it, assert, beforeAll } from "vitest";
import { removeAllDatabases } from "../../common/TestHelpers.js";

// TODO: Non-deterministic test. We can't guarantee we see any response with a 429 status code since the retries happen within the response
describe("item read retries", async () => {
  beforeAll(async () => {
    await removeAllDatabases();
  });
  it("retries on 429", async () => {
    const client = new CosmosClient({ key: masterKey, endpoint });
    const { resource: db } = await client.databases.create({
      id: `small db ${Math.random() * 1000}`,
    });
    const containerResponse = await client
      .database(db.id)
      .containers.create({ id: `small container ${Math.random() * 1000}`, throughput: 400 });
    const container = containerResponse.container;
    await container.items.create({ id: "readme" });
    const arr = new Array(400);
    const promises = [];
    for (let i = 0; i < arr.length; i++) {
      promises.push(container.item("readme").read());
    }
    const resp = await Promise.all(promises);
    assert.equal(resp[0].statusCode, 200);
  });
});
