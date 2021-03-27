// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import { MockEventHub } from "@azure/mock-hub";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  const service = new MockEventHub({
    name: "mock-hub",
    partitionCount: 4,
    consumerGroups: ["foo"],
    connectionInactivityTimeoutInMs: 300000, // 5 minutes
    port: 5671,
    tlsOptions: {
      pfx: readFileSync(resolvePath(__dirname, "certs", "my-cert.pfx")),
      passphrase: process.env["CERT_PASSPHRASE"]
    }
  });

  await service.start();

  // Wait a minute then shut the service down.
  await new Promise((resolve) => setTimeout(resolve, 60000));

  return service.stop();
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
