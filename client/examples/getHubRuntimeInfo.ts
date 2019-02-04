// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { EventHubClient } from "../lib";
import dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
console.log(path);

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const info = await client.getHubRuntimeInformation();
  console.log("RuntimeInfo: ", info);
  const pInfo = await client.getPartitionInformation("0");
  console.log("Partition Information: ", pInfo);
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
