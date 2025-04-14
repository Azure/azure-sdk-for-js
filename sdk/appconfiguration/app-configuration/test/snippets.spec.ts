// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient, KnownAppConfigAudience } from "@azure/app-configuration";
import { setLogLevel } from "@azure/logger";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
  });

  it("AuthenticatingWithAzureSovereignCloud", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.azure.cn";
    // Create an AppConfigurationClient that will authenticate through AAD in the China cloud
    const client = new AppConfigurationClient(endpoint, new DefaultAzureCredential(), {
      audience: KnownAppConfigAudience.AzureChina,
    });
  });

  it("ReadmeSampleCreateClientWithConnectionString", async () => {
    const connectionString = "Endpoint=https://example.azconfig.io;XXX=YYYY;YYY=ZZZZ";
    const client = new AppConfigurationClient(connectionString);
  });

  it("ConfigurationSettingPattern", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const setting = await client.getConfigurationSetting({
      key: "hello",
    });
    // @ts-preserve-whitespace
    setting.value = "new value!";
    await client.setConfigurationSetting(setting);
    // @ts-preserve-whitespace
    // fields unrelated to just identifying the setting are simply
    // ignored (for instance, the `value` field)
    await client.setReadOnly(setting, true);
    // @ts-preserve-whitespace
    // delete just needs to identify the setting so other fields are
    // just ignored
    await client.deleteConfigurationSetting(setting);
  });

  it("ReGetSetting", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    let setting = await client.getConfigurationSetting({
      key: "hello",
    });
    // @ts-preserve-whitespace
    // re-get the setting
    setting = await client.getConfigurationSetting(setting);
  });

  it("CreateSetting", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    await client.setConfigurationSetting({
      key: "testkey",
      value: "testvalue",
      // Labels allow you to create variants of a key tailored
      // for specific use-cases like supporting multiple environments.
      // https://learn.microsoft.com/azure/azure-app-configuration/concept-key-value#label-keys
      label: "optional-label",
    });
    // @ts-preserve-whitespace
    const retrievedSetting = await client.getConfigurationSetting({
      key: "testkey",
      label: "optional-label",
    });
    // @ts-preserve-whitespace
    console.log("Retrieved value:", retrievedSetting.value);
  });

  it("CreateSnapshot", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const key = "testkey";
    const value = "testvalue";
    const label = "optional-label";
    // @ts-preserve-whitespace
    await client.addConfigurationSetting({
      key,
      value,
      label,
    });
    // @ts-preserve-whitespace
    const poller = await client.beginCreateSnapshot({
      name: "testsnapshot",
      retentionPeriod: 2592000,
      filters: [{ keyFilter: key, labelFilter: label }],
    });
    const snapshot = await poller.pollUntilDone();
  });

  it("CreateSnapshotAndWait", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const key = "testkey";
    const value = "testvalue";
    const label = "optional-label";
    // @ts-preserve-whitespace
    const snapshot = await client.beginCreateSnapshotAndWait({
      name: "testsnapshot",
      retentionPeriod: 2592000,
      filters: [{ keyFilter: key, labelFilter: label }],
    });
  });

  it("GetSnapshot", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const retrievedSnapshot = await client.getSnapshot("testsnapshot");
    console.log("Retrieved snapshot:", retrievedSnapshot);
  });

  it("ListSnapshotSettings", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const retrievedSnapshotSettings =
      await client.listConfigurationSettingsForSnapshot("testsnapshot");
    // @ts-preserve-whitespace
    for await (const setting of retrievedSnapshotSettings) {
      console.log(`Found key: ${setting.key}, label: ${setting.label}`);
    }
  });

  it("ListSnapshots", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const snapshots = await client.listSnapshots();
    // @ts-preserve-whitespace
    for await (const snapshot of snapshots) {
      console.log(`Found snapshot: ${snapshot.name}`);
    }
  });

  it("RecoverAndArchiveSnapshot", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Snapshot is in ready status
    const archivedSnapshot = await client.archiveSnapshot("testsnapshot");
    console.log("Snapshot updated status is:", archivedSnapshot.status);
    // @ts-preserve-whitespace
    // Snapshot is in archive status
    const recoverSnapshot = await client.recoverSnapshot("testsnapshot");
    console.log("Snapshot updated status is:", recoverSnapshot.status);
  });

  it("AddConfigurationSetting", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await client.addConfigurationSetting({
      key: "MyKey",
      label: "MyLabel",
      value: "MyValue",
    });
  });

  it("DeleteConfigurationSetting", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const deletedSetting = await client.deleteConfigurationSetting({
      key: "MyKey",
      label: "MyLabel",
    });
  });

  it("GetConfigurationSetting", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const setting = await client.getConfigurationSetting({ key: "MyKey", label: "MyLabel" });
  });

  it("ListConfigurationSettings", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const allSettingsWithLabel = client.listConfigurationSettings({ labelFilter: "MyLabel" });
  });

  it("ListConfigurationSettingsForSnashots", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const allSettingsWithLabel = client.listConfigurationSettingsForSnashots({
      snapshotName: "MySnapshot",
    });
  });

  it("ListLabels", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const allSettingsWithLabel = client.listLabels({ nameFilter: "prod*" });
  });

  it("ListRevisions", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const revisionsIterator = client.listRevisions({ keys: ["MyKey"] });
  });

  it("SetConfigurationSetting", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    await client.setConfigurationSetting({ key: "MyKey", value: "MyValue" });
  });

  it("RecoverSnapshot", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await client.recoverSnapshot("MySnapshot");
  });

  it("ArchiveSnapshot", async () => {
    // The endpoint for your App Configuration resource
    const endpoint = "https://example.azconfig.io";
    const credential = new DefaultAzureCredential();
    const client = new AppConfigurationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await client.archiveSnapshot({ name: "MySnapshot" });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
