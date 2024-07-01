// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder, isPlaybackMode, testPollingOptions } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import {
  ConfigurationSnapshot,
  ConfigurationSettingsFilter,
  CreateSnapshotResponse,
  ConfigurationSettingId,
} from "../../src/models";
import {
  assertEqualSnapshot,
  assertThrowsAbortError,
  createAppConfigurationClientForTests,
  startRecorder,
} from "./utils/testHelpers";

describe("AppConfigurationClient snapshot", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;
  let key1: string;
  let key2: string;
  let configSetting1: ConfigurationSettingId;
  let configSetting2: ConfigurationSettingId;
  let snapshot1: ConfigurationSnapshot;
  let filter1: ConfigurationSettingsFilter;
  let filter2: ConfigurationSettingsFilter;
  let newSnapshot: CreateSnapshotResponse;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    key1 = recorder.variable("key1", `key1-${new Date().getTime()}`);
    key2 = recorder.variable("key2", `key2-${new Date().getTime()}`);
    const label1 = "label1";
    const label2 = "label2";
    configSetting1 = {
      key: key1,
      label: label1,
    };
    configSetting2 = {
      key: key2,
      label: label2,
    };
    filter1 = {
      keyFilter: key1,
      labelFilter: label1,
    };
    filter2 = {
      keyFilter: key2,
      labelFilter: label2,
    };
    snapshot1 = {
      name: recorder.variable("snapshot1", `snapshot-${new Date().getTime()}`),
      retentionPeriodInSeconds: 2592000,
      filters: [filter1],
    };

    await client.addConfigurationSetting({ ...configSetting1, value: "value1" });
    await client.addConfigurationSetting({ ...configSetting2, value: "value2" });
  });

  afterEach(async function (this: Context) {
    await client.deleteConfigurationSetting({ ...configSetting1 });
    await client.deleteConfigurationSetting({ ...configSetting2 });
    await recorder.stop();
  });

  describe("createSnapshot", () => {
    it("create a snapshot", async () => {
      const poller = await client.beginCreateSnapshot(snapshot1, testPollingOptions);
      newSnapshot = await poller.pollUntilDone();
      assertEqualSnapshot(newSnapshot, snapshot1);

      await client.archiveSnapshot(newSnapshot.name);
    });

    it("service throws error when tried to create a snapshot with same name", async () => {
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);
      assertEqualSnapshot(newSnapshot, snapshot1);

      const errorExpected = {
        type: "https://azconfig.io/errors/already-exists",
        title: "The resource already exists.",
        status: 409,
        detail: "",
      };

      // attempt to add the same snapshot
      try {
        await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);
        throw new Error("Test failure");
      } catch (err: any) {
        assert.equal(err.message, JSON.stringify(errorExpected));
        assert.notEqual((err as { message: string }).message, "Test failure");
      }

      await client.archiveSnapshot(newSnapshot.name);
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts  operation options", async function () {
      if (isPlaybackMode()) this.skip();
      await assertThrowsAbortError(async () => {
        await client.beginCreateSnapshotAndWait(snapshot1, {
          requestOptions: {
            timeout: 1,
          },
          updateIntervalInMs: testPollingOptions.updateIntervalInMs,
        });
      });
    });

    // TODO: Add snapshot test for filter by list
  });

  describe("listConfigurationSettings of a Snapshot", () => {
    it("list configuration settings", async () => {
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);

      await client.setConfigurationSetting({ ...configSetting1, value: "value2" });

      const snapshotConfigurationSettings = client.listConfigurationSettingsForSnapshot(
        newSnapshot.name,
      );

      for await (const setting of snapshotConfigurationSettings) {
        assert.equal(setting.key, key1);
        assert.equal(setting.label, "label1");
        assert.equal(setting.value, "value1", "Should not get the updated value of the setting");
      }

      await client.archiveSnapshot(newSnapshot.name);
    });
  });

  describe("archiveSnapshot", () => {
    it("archive a snapshot", async () => {
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);
      const archivedSnapshot = await client.archiveSnapshot(newSnapshot.name);

      assert.equal(
        archivedSnapshot.status,
        "archived",
        "Unexpected status in result from archiveSnapshot().",
      );
    });

    it.skip("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      await assertThrowsAbortError(async () => {
        await client.archiveSnapshot(newSnapshot.name, {
          requestOptions: {
            timeout: 1,
          },
        });
      });
    });
  });

  describe("recoverSnapshot", () => {
    it("recover a snapshot", async () => {
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1);
      const archivedSnapshot = await client.archiveSnapshot(newSnapshot.name);

      const unarchivedSnapshot = await client.recoverSnapshot(archivedSnapshot.name);
      assert.equal(
        unarchivedSnapshot.status,
        "ready",
        "Unexpected status in result from archiveSnapshot().",
      );

      await client.archiveSnapshot(newSnapshot.name);
    });

    it.skip("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      await assertThrowsAbortError(async () => {
        await client.recoverSnapshot(newSnapshot.name, {
          requestOptions: {
            timeout: 1,
          },
        });
      });
    });
  });

  describe("getSnapshot", () => {
    it("get a snapshot", async () => {
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);

      const snapshot = await client.getSnapshot(newSnapshot.name);
      assertEqualSnapshot(snapshot, newSnapshot);

      await client.archiveSnapshot(newSnapshot.name);
    });

    // Check issue https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts operation options", async function () {
      if (isPlaybackMode()) this.skip();
      newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);
      await assertThrowsAbortError(async () => {
        await client.getSnapshot(newSnapshot.name, {
          requestOptions: {
            timeout: 1,
          },
        });
      });

      await client.archiveSnapshot(newSnapshot.name);
    });
  });

  describe("listSnapshots", () => {
    it("list all snapshots with ready filter", async function () {
      const list = client.listSnapshots();
      for await (const snapshot of list) {
        await client.archiveSnapshot(snapshot.name);
      }
      const readyList = client.listSnapshots({ statusFilter: ["ready"] });
      let num = 0;
      for await (const snapshot of readyList) {
        assert.equal(snapshot, undefined, "There should be no snapshot in ready status");
        num++;
      }
      assert.equal(num, 0, "There should be no snapshot in ready status");

      await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);

      const snapshot2 = {
        name: recorder.variable("snapshot2", `snapshot-${new Date().getTime()}`),
        filters: [filter1, filter2],
      };
      await client.beginCreateSnapshotAndWait(snapshot2, testPollingOptions);

      const listAfter = await client.listSnapshots({ statusFilter: ["ready"] });
      let total = 0;
      for await (const snapshot of listAfter) {
        await client.archiveSnapshot(snapshot.name);
        total++;
      }
      assert.equal(total, 2, "Unexpected number of snapshots in result from listSnapshots().");
    });
  });
});
