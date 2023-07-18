// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the CRUD operations on the snapshot.
 */
import { AppConfigurationClient } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running snapshot sample`);

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  const key2 = "Samples:key2";
  const key1 = "Samples:key1";

  // creating a new setting
  console.log(`Adding in new setting ${key1}`);
  await client.addConfigurationSetting({ key: key1, value: "value1" });

  // creating a new setting
  console.log(`Adding in new setting ${key2}`);
  await client.addConfigurationSetting({ key: key2, value: "value2" });

  // creating a new snapshot
  const newSnapshot = await client.beginCreateSnapshotAndWait({
    name: "mySnapshot",
    filters: [
      {
        key: key1,
      },
    ],
  });
  console.log(`New snapshot object added ${newSnapshot}`);

  // getting the configuration settting of the snapshot
  const snapshotConfigurationSettings = await client.listConfigurationSettingsForSnapshot(
    newSnapshot.name
  );

  for await (const setting of snapshotConfigurationSettings) {
    console.log(`  Found key: ${setting.key}, label: ${setting.label}`);
  }

  await client.getSnapshot(newSnapshot.name);

  // creating a new snapshot
  const newSnapshot2 = await client.beginCreateSnapshotAndWait({
    name: "mySnapshot2",
    filters: [
      {
        key: key2,
      },
    ],
  });
  console.log(`New snapshot object added ${newSnapshot2}`);

  // list all the snapshots
  console.log(`List all the snapshots`);
  const snapshotsList = await client.listSnapshots();
  for await (const snapshot of snapshotsList) {
    console.log(`  Found snapshot: ${snapshot.name}`);
  }
  // archive snapshot
  await client.archiveSnapshot(newSnapshot);
  console.log(`${newSnapshot.name} has been archived with the status ${newSnapshot.status}`);

  // removing the setting
  await client.archiveSnapshot({ name: newSnapshot.name as string, etag: newSnapshot.etag });
  console.log(`${newSnapshot.name} has been archived`);

  await cleanupSampleValues([key1], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
