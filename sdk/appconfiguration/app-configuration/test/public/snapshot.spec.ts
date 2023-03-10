// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { assert } from "chai";
import { Context } from "mocha";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { Snapshot, ConfigurationSettingsFilter, CreateSnapshotResponse } from "../../src/models";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";


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
    it("archive all snapshot", async () => {
      // archive snapshot
      await client.archiveSnapshot(newSnapshot);
      console.log(`${newSnapshot.name} has been archived. Status is ${newSnapshot.status}`);
    });
  });

  describe("recoverSnapshot", () => {
    it("recover a snapshot", async () => {
      // archive snapshot
      await client.recoverSnapshot(newSnapshot);
      console.log(`${newSnapshot.name} has been archived. Status is ${newSnapshot.status}`);
    });
  });
});
