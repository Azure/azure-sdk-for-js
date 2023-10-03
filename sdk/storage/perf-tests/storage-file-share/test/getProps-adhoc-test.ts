// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShareServiceClient } from "@azure/storage-file-share";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const serviceClient = ShareServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING || "");
  let promiseArray = [];
  const start = Date.now();
  for (let i = 0; i < 10000; ++i) {
    promiseArray.push(serviceClient.getProperties());
    if (i % 10 == 9) {
      await Promise.all(promiseArray);
      promiseArray = [];
    }
  }
  const end = Date.now();
  console.log(`Time taken in seconds: ${(end - start) / 1000}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
