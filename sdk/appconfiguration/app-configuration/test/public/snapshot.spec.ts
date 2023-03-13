// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { assert } from "chai";
import { Context } from "mocha";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { Snapshot, ConfigurationSettingsFilter, CreateSnapshotResponse } from "../../src/models";
import { assertEqualSnapshot, assertThrowsAbortError, createAppConfigurationClientForTests, startRecorder, toSortedSnapshotArray } from "./utils/testHelpers";

describe("AppConfigurationClient snapshot", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;
  let key1: string;
  let key2: string;
  let snapshot1: Snapshot;
  let snapshot2: Snapshot;
  let filter1: ConfigurationSettingsFilter;
  let filter2: ConfigurationSettingsFilter;
  let newSnapshot: CreateSnapshotResponse;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    key1 = recorder.variable("key1", `key1-${new Date().getTime()}`);
    key2 = recorder.variable("key2", `key2-${new Date().getTime()}`);
    filter1 = {
      key: key1,
    };
    filter2 = {
      key: key2,
    };
    snapshot1 = {
      name: recorder.variable("snapshopt1", `snapshot-${new Date().getTime()}`),
      retentionPeriod: 0,
      filters: [filter1],
    };
    snapshot2 = {
      name: recorder.variable("snapshopt2", `snapshot-${new Date().getTime()}`),
      filters: [filter1, filter2],
    };

    // creating a new setting for key1
    await client.addConfigurationSetting({ key: key1, value: "value1" });

    // creating a new setting for key2
    await client.addConfigurationSetting({ key: key2, value: "value2" });
  });

  afterEach(async function (this: Context) {
    // delete a new setting for key2
    await client.deleteConfigurationSetting({ key: key1 });
    // delete a new setting for key2
    await client.deleteConfigurationSetting({ key: key2 });
    await recorder.stop();
  });


  describe("createSnapshot", () => {
    it.only("create a snapshot", async () => {
      // creating a new snapshot
      newSnapshot = await client.createSnapshot(snapshot1);
      assert.equal(
        newSnapshot.name,
        snapshot1.name,
        "Unexpected name in result from createSnapshot()."
      );
      assert.equal(
        newSnapshot.retentionPeriod,
        0,
        "Unexpected retentionPeriod in result from createSnapshot()."
      );

      console.log(newSnapshot.filters[0], filter1)
      assert.equal(
        newSnapshot.filters[0].key,
        filter1.key,
        "Unexpected filters in result from createSnapshot()."
      );
      assert.equal(
        newSnapshot.filters.length,
        1,
        "Unexpected filters in result from createSnapshot()."
      );

      // when the snapshot status is not ready, please get it again until it is ready
      while (newSnapshot.status !== "ready") {
        console.log("Snapshot is not ready yet. Please wait...");
        newSnapshot = await client.getSnapshot(newSnapshot.name);
        await delay(1000);
      }
      console.log("Snapshot is ready now.. ", newSnapshot);
    });

    it("service will throw error when try to create a snapshot of the same name", async () => {
      // creating a new snapshot
      newSnapshot = await client.createSnapshot(snapshot1);
      assert.equal(
        newSnapshot.name,
        "testSnapshot1",
        "Unexpected name in result from createSnapshot()."
      );
    });


    it("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      const name = recorder.variable(
        "snapshotTest1",
        `snapshotTest1${Math.floor(Math.random() * 1000)}`
      );

      const snapshot: Snapshot = {
        name,
        retentionPeriod: 0,
        filters: [filter1],
      };

      await assertThrowsAbortError(async () => {
        await client.createSnapshot(
          snapshot,

          {
            requestOptions: {
              timeout: 1,
            },
          }
        );
      });
    });
  });
  
  describe("listConfigurationSettings for Snapshot", () => {
    it("list a snapshot configuration setting", async () => {
      // getting the configuration settting of the snapshot
      const snapshotConfigurationSettings = await client.listConfigurationSettings({
        snapshotName: newSnapshot.name,
      });

      for await (const setting of snapshotConfigurationSettings) {
        console.log(`  Found key: ${setting.key}, label: ${setting.label}`);
      }
    });
  });

  describe("listSnapshots", () => {
    it("list all snapshots", async () => {
      // creating a new snapshot
      const newSnapshot2 = await client.createSnapshot(snapshot2);
      console.log(`New snapshot object added ${newSnapshot2}`);

      // list all the snapshots
      console.log(`List all the snapshots`);
      await client.listSnapshots();
    });
  });


  describe("archiveSnapshot", () => {
    it("archive a snapshot", async () => {
      const name = recorder.variable(
        "snapshotTest1",
        `snapshotTest1${Math.floor(Math.random() * 1000)}`
      );

      const snapshot: Snapshot = {
        name,
        retentionPeriod: 30,
        filters: [filter1],
      };

      // creating a new snapshot
      let newSnapshot = await client.createSnapshot(snapshot);
      assertEqualSnapshot(newSnapshot, snapshot);

      while (newSnapshot.status != "ready") {
        newSnapshot = await client.getSnapshot(newSnapshot.name);
        await delay(2000);
      }

      assert.equal(
        newSnapshot.itemCount,
        1,
        "Unexpected itemCount in result from createSnapshot()."
      );

      newSnapshot = await client.archiveSnapshot(newSnapshot);
      assert.equal(
        newSnapshot.status,
        "archived",
        "Unexpected status in result from archiveSnapshot()."
      );
    });

    it("service throws error if snapshot is not ready to archive", async () => {
      const name = recorder.variable(
        "snapshotTest1",
        `snapshotTest1${Math.floor(Math.random() * 1000)}`
      );

      const snapshot: Snapshot = {
        name,
        retentionPeriod: 30,
        filters: [filter1],
      };

      // creating a new snapshot
      let newSnapshot = await client.createSnapshot(snapshot);
      assertEqualSnapshot(newSnapshot, snapshot);

      const errorExpected = {
        type: "https://azconfig.io/errors/invalid-state",
        title: "Target resource state invalid.",
        status: 409,
        detail: "The target resource is not in a valid state to perform the requested operation.",
      };

      // attempt to archive the snapshot when it's not ready
      try {
        await client.archiveSnapshot(snapshot);
        throw new Error("Test failure");
      } catch (err: any) {
        assert.equal(err.message, JSON.stringify(errorExpected));
        assert.notEqual((err as { message: string }).message, "Test failure");
      }

      while (newSnapshot.status != "ready") {
        newSnapshot = await client.getSnapshot(newSnapshot.name);
        await delay(2000);
      }

      await client.archiveSnapshot(newSnapshot);
    });

    it("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      const name = recorder.variable(
        "snapshotTest1",
        `snapshotTest1${Math.floor(Math.random() * 1000)}`
      );

      const snapshot: Snapshot = {
        name,
        retentionPeriod: 0,
        filters: [filter1],
      };

      let newSnapshot = await client.createSnapshot(snapshot);
      assertEqualSnapshot(newSnapshot, snapshot);

      await assertThrowsAbortError(async () => {
        await client.archiveSnapshot(
          snapshot,

          {
            requestOptions: {
              timeout: 1,
            },
          }
        );
      });
    });
  });

  describe("getSnapshot", () => {
    it("get a snapshot", async () => {
      const name = recorder.variable(
        "getSnapshot",
        `getSnapshot${Math.floor(Math.random() * 1000)}`
      );

      const snapshot: Snapshot = {
        name,
        retentionPeriod: 30,
        filters: [filter1],
      };

      // creating a new snapshot
      let newSnapshot = await client.createSnapshot(snapshot);
      assertEqualSnapshot(newSnapshot, snapshot);

      newSnapshot = await client.getSnapshot(newSnapshot.name);
      assertEqualSnapshot(newSnapshot, snapshot);

      while (newSnapshot.status != "ready") {
        newSnapshot = await client.getSnapshot(newSnapshot.name);
        await delay(2000);
      }

      assert.equal(
        newSnapshot.itemCount,
        1,
        "Unexpected itemCount in result from createSnapshot()."
      );

      await client.archiveSnapshot(newSnapshot);
    });

    it("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      const name = recorder.variable(
        "snapshotTest1",
        `snapshotTest1${Math.floor(Math.random() * 1000)}`
      );

      const snapshot: Snapshot = {
        name,
        retentionPeriod: 0,
        filters: [filter1],
      };

      let newSnapshot = await client.createSnapshot(snapshot);
      assertEqualSnapshot(newSnapshot, snapshot);

      await assertThrowsAbortError(async () => {
        await client.getSnapshot(snapshot.name, {
          requestOptions: {
            timeout: 1,
          },
        });
      });
    });
  });

  describe("listSnapshots", () => {
    it("list all snapshots with status filter", async () => {
      const list = await client.listSnapshots({ statusFilter: ["ready", "provisioning"] });
      const listLength = (await toSortedSnapshotArray(list)).length;
      const name = recorder.variable(
        "listSnapshot",
        `listSnapshot${Math.floor(Math.random() * 1000)}`
      );

      const name2 = recorder.variable(
        "listSnapshot2",
        `listSnapshot2${Math.floor(Math.random() * 1000)}`
      );

      const name3 = recorder.variable(
        "listSnapshot3",
        `listSnapshot3${Math.floor(Math.random() * 1000)}`
      );

      const snapshot: Snapshot = {
        name,
        retentionPeriod: 0,
        filters: [filter1],
      };

      const snapshot2: Snapshot = {
        name: name2,
        retentionPeriod: 0,
        filters: [filter2],
      };

      const snapshot3: Snapshot = {
        name: name3,
        retentionPeriod: 0,
        filters: [filter1, filter2],
      };

      // creating a new snapshot
      let newSnapshot = await client.createSnapshot(snapshot);
      let newSnapshot2 = await client.createSnapshot(snapshot2);
      let newSnapshot3 = await client.createSnapshot(snapshot3);
      const snapshots = await client.listSnapshots({ statusFilter: ["ready", "provisioning"] });
      const snapshotArray = await toSortedSnapshotArray(snapshots);
      assert.equal(
        snapshotArray.length,
        listLength + 3,
        "Unexpected number of snapshots in result from listSnapshots()."
      );

      while (newSnapshot.status != "ready") {
        newSnapshot = await client.getSnapshot(newSnapshot.name);
        await delay(2000);
      }

      while (newSnapshot2.status != "ready") {
        newSnapshot2 = await client.getSnapshot(newSnapshot2.name);
        await delay(2000);
      }

      while (newSnapshot3.status != "ready") {
        newSnapshot3 = await client.getSnapshot(newSnapshot3.name);
        await delay(2000);
      }

      await client.archiveSnapshot(newSnapshot);
      await client.archiveSnapshot(newSnapshot2);
      await client.archiveSnapshot(newSnapshot3);
    });
  });
});
