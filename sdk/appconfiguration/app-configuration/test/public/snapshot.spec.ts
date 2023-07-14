// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { Snapshot, ConfigurationSettingsFilter, CreateSnapshotResponse } from "../../src/models";
import {
  assertEqualSnapshot,
  assertThrowsAbortError,
  createAppConfigurationClientForTests,
  startRecorder,
} from "./utils/testHelpers";
import { isNode } from "@azure/core-util";

describe("AppConfigurationClient snapshot", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;
  let key1: string;
  let key2: string;
  let snapshot1: Snapshot;
  let filter1: ConfigurationSettingsFilter;
  let filter2: ConfigurationSettingsFilter;
  let newSnapshot: CreateSnapshotResponse;

  beforeEach(async function (this: Context) {
    if (!isNode) {
      this.skip();
    }
    recorder = await startRecorder(this);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    key1 = recorder.variable("key1", `key1-${new Date().getTime()}`);
    key2 = recorder.variable("key2", `key2-${new Date().getTime()}`);
    filter1 = {
      key: key1,
      label: "label1",
    };
    filter2 = {
      key: key2,
      label: "label2",
    };
    snapshot1 = {
      name: recorder.variable("snapshot1", `snapshot-${new Date().getTime()}`),
      retentionPeriod: 2592000,
      filters: [filter1],
    };

    // creating a new setting for key1
    await client.addConfigurationSetting({ ...filter1, value: "value1" });

    // creating a new setting for key2
    await client.addConfigurationSetting({ ...filter2, value: "value2" });
  });

  afterEach(async function (this: Context) {
    if (!isNode) {
      this.skip();
    }
    // delete a new setting for key1
    await client.deleteConfigurationSetting({ ...filter1 });
    // delete a new setting for key2
    await client.deleteConfigurationSetting({ ...filter2 });
    await recorder.stop();
  });

  describe("createSnapshot", () => {
    it("create a snapshot", async () => {
      // creating a new snapshot
      const poller = await client.beginCreateSnapshot(snapshot1);
      newSnapshot = await poller.pollUntilDone();
      assertEqualSnapshot(newSnapshot, snapshot1);

      await client.archiveSnapshot(newSnapshot);
    });

    it("service throws error when tried to create a snapshot with same name", async () => {
      // creating a new snapshot
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1);
      assertEqualSnapshot(newSnapshot, snapshot1);

      const errorExpected = {
        type: "https://azconfig.io/errors/already-exists",
        title: "The resource already exists.",
        status: 409,
        detail: "",
      };

      // attempt to add the same snapshot
      try {
        await client.beginCreateSnapshotAndWait(snapshot1);
        throw new Error("Test failure");
      } catch (err: any) {
        assert.equal(err.message, JSON.stringify(errorExpected));
        assert.notEqual((err as { message: string }).message, "Test failure");
      }

      await client.archiveSnapshot(newSnapshot);
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts  operation options", async function () {
      if (isPlaybackMode()) this.skip();
      await assertThrowsAbortError(async () => {
        await client.beginCreateSnapshotAndWait(snapshot1, {
          requestOptions: {
            timeout: 1,
          },
        });
      });
    });
  });

  describe("listConfigurationSettings of a Snapshot", () => {
    it("list configuration settings", async () => {
      // creating a new snapshot
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1);

      // change the value of the setting
      await client.setConfigurationSetting({ ...filter1, value: "value2" });

      // getting the configuration settting of the snapshot
      const snapshotConfigurationSettings = client.listConfigurationSettingsForSnapshot(
        newSnapshot.name
      );

      for await (const setting of snapshotConfigurationSettings) {
        assert.equal(setting.key, key1);
        assert.equal(setting.label, "label1");
        assert.equal(setting.value, "value1", "Should not get the updated value of the setting");
      }

      await client.archiveSnapshot(newSnapshot);
    });
  });

  describe("archiveSnapshot", () => {
    it("archive a snapshot", async () => {
      // creating a new snapshot
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1);
      const archivedSnapshot = await client.archiveSnapshot(newSnapshot);

      assert.equal(
        archivedSnapshot.status,
        "archived",
        "Unexpected status in result from archiveSnapshot()."
      );
    });

    it.skip("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      await assertThrowsAbortError(async () => {
        await client.archiveSnapshot(newSnapshot, {
          requestOptions: {
            timeout: 1,
          },
        });
      });
    });
  });

  describe("getSnapshot", () => {
    it("get a snapshot", async () => {
      // creating a new snapshot
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1);

      const snapshot = await client.getSnapshot(newSnapshot.name);
      assertEqualSnapshot(snapshot, newSnapshot);

      await client.archiveSnapshot(newSnapshot);
    });

    it.skip("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      // creating a new snapshot
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1);
      await assertThrowsAbortError(async () => {
        await client.getSnapshot(newSnapshot.name, {
          requestOptions: {
            timeout: 1,
          },
        });
      });

      await client.archiveSnapshot(newSnapshot);
    });
  });

  // Error with the list functions currently
  describe("listSnapshots", () => {
    it("list all snapshots with ready filter", async function () {
      const list = client.listSnapshots();
      for await (const snapshot of list) {
        await client.archiveSnapshot(snapshot);
      }
      const readyList = client.listSnapshots({ statusFilter: ["ready"] });
      let num = 0;
      for await (const snapshot of readyList) {
        assert.equal(snapshot, undefined, "There should be no snapshot in ready status");
        num++;
      }
      assert.equal(num, 0, "There should be no snapshot in ready status");

      // creating a new snapshot 1
      await client.beginCreateSnapshotAndWait(snapshot1);

      // create a new snapshot 2
      const snapshot2 = {
        name: recorder.variable("snapshot2", `snapshot-${new Date().getTime()}`),
        filters: [filter1, filter2],
      };
      await client.beginCreateSnapshotAndWait(snapshot2);

      // new snapshot lists
      const listAfter = await client.listSnapshots({ statusFilter: ["ready"] });
      let total = 0;
      for await (const snapshot of listAfter) {
        await client.archiveSnapshot(snapshot);
        total++;
      }
      assert.equal(total, 2, "Unexpected number of snapshots in result from listSnapshots().");
    });
  });
});
