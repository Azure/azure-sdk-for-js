// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { startWebPubSubServer } from "@azure-tools/web-pubsub-simulator";
import { delay } from "@azure/core-util";

async function main(): Promise<void> {
  const server = await startWebPubSubServer({ port: 3000 });
  console.log(`Server started at ${server.webPubSubClientUrl}`);
  await delay(5000);
  server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
