// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient } from "../../src";
import { Context } from "mocha";
import { record, Recorder, isPlaybackMode } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableClient } from "./utils/recordedClient";
import { isNode } from "@azure/test-utils";
import { assert } from "chai";
import sinon from "sinon";

describe(`Access Policy operations`, () => {
  let client: TableClient;
  let recorder: Recorder;
  const tableName = `AccessPolicy`;
  let clock: sinon.SinonFakeTimers;

  beforeEach(async function(this: Context) {
    const now = new Date("2021-07-08T09:10:09Z");
    clock = sinon.useFakeTimers(now.getTime());
    recorder = record(this, recordedEnvironmentSetup);

    if (!isNode) {
      this.skip();
    }

    client = createTableClient(tableName, "AccountKey");

    try {
      if (!isPlaybackMode()) {
        await client.createTable();
      }
    } catch {
      console.warn("Table already exists");
    }
  });

  afterEach(async function() {
    await recorder.stop();
    clock.restore();
  });

  after(async () => {
    try {
      if (!isPlaybackMode()) {
        await client.deleteTable();
      }
    } catch {
      console.warn("Table was not deleted");
    }
  });

  it("should send a null AP", async function() {
    const date = new Date(2021, 6, 8, 2, 10, 9);
    await client.setAccessPolicy([
      { id: "null" },
      { id: "empty", accessPolicy: {} },
      { id: "partial", accessPolicy: { permission: "r" } },
      { id: "full", accessPolicy: { start: date, expiry: date, permission: "r" } }
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
