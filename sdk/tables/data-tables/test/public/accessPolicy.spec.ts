// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { TableClient } from "@azure/data-tables";
import { createTableClient } from "./utils/recordedClient.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { isPlaybackMode } from "../utils/injectables.js";

describe(`Access Policy operations`, { skip: !isNodeLike }, () => {
  let client: TableClient;
  let unrecordedClient: TableClient;
  let recorder: Recorder;
  const tableName = `AccessPolicy`;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const c = await createTableClient(tableName, "AccountKey", recorder);
    if (!c) {
      ctx.skip("Shared Key Access is not supported");
      return;
    }
    client = c;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  beforeAll(async () => {
    if (!isPlaybackMode()) {
      unrecordedClient = await createTableClient(tableName, "TokenCredential");
      await unrecordedClient.createTable();
    }
  });

  afterAll(async () => {
    if (!isPlaybackMode() && isNodeLike) {
      await unrecordedClient.deleteTable();
    }
  });

  it("should send a null AP", async () => {
    const date = new Date("2021-07-08T09:10:09Z");
    await client.setAccessPolicy([
      { id: "null" },
      { id: "empty", accessPolicy: {} },
      { id: "partial", accessPolicy: { permission: "r" } },
      { id: "full", accessPolicy: { start: date, expiry: date, permission: "r" } },
    ]);

    const acl = await client.getAccessPolicy();

    assert.isDefined(acl);
    assert.lengthOf(acl, 4);

    const nullAcl = acl.find((a) => a.id === "null");
    assert.isDefined(nullAcl);
    assert.deepEqual(nullAcl?.accessPolicy, {});

    const emptyAcl = acl.find((a) => a.id === "empty");
    assert.isDefined(emptyAcl);
    assert.deepEqual(emptyAcl?.accessPolicy, {});

    const partialAcl = acl.find((a) => a.id === "partial");
    assert.isDefined(partialAcl);
    assert.equal(partialAcl?.accessPolicy?.permission, "r");
    assert.isUndefined(partialAcl?.accessPolicy?.start);
    assert.isUndefined(partialAcl?.accessPolicy?.expiry);

    const fullAcl = acl.find((a) => a.id === "full");
    assert.isDefined(fullAcl);
    assert.deepEqual(fullAcl?.accessPolicy, { start: date, expiry: date, permission: "r" });
  });
});
