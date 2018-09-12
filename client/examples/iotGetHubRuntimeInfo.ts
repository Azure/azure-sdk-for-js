// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { EventHubClient } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "IOTHUB_CONNECTION_STRING";
const str = process.env[connectionString] || "";

async function main(): Promise<void> {
  const client = await EventHubClient.createFromIotHubConnectionString(str);
  let info = await client.getHubRuntimeInformation();
  console.log("RuntimeInfo: ", info);
  let pInfo = await client.getPartitionInformation(info.partitionIds[0]);
  console.log("Partition Information: ", pInfo);
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
