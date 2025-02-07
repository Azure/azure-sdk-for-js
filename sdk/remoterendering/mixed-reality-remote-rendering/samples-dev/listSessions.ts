// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using the Azure Remote Rendering SDK to list conversions.
 */

import { RemoteRenderingClient } from "@azure/mixed-reality-remote-rendering";
import { AzureKeyCredential } from "@azure/core-auth";
import { delay } from "@azure/core-util";
import { randomUUID } from "node:crypto";
import "dotenv/config";

// You will need to set this environment variables or edit the following values
const accountDomain = process.env["REMOTERENDERING_ARR_ACCOUNT_DOMAIN"] || "<account domain>";
const accountId = process.env["REMOTERENDERING_ARR_ACCOUNT_ID"] || "<account ID>";
const accountKey = process.env["REMOTERENDERING_ARR_ACCOUNT_KEY"] || "<account key>";
const serviceEndpoint = process.env["REMOTERENDERING_ARR_SERVICE_ENDPOINT"] || "<serviceEndpoint>";

export async function main(): Promise<void> {
  console.log("== Convert an asset example ==");

  console.log("== Creating a client ==");

  const credential = new AzureKeyCredential(accountKey);

  const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);

  console.log("== Creating a test session to query ==");

  const sessionId: string = randomUUID();
  await client.beginSession(sessionId, {
    maxLeaseTimeInMinutes: 5,
    size: "Standard",
  });
  await delay(10000);

  console.log("== Starting listing sessions ==");

  for await (const session of client.listSessions()) {
    if (session.status === "Starting") {
      console.log(`Session ${session.sessionId} is starting`);
    } else if (session.status === "Ready") {
      console.log(`Session ${session.sessionId} is ready`);
    }
  }

  console.log("== All sessions listed ==");

  console.log("== Stop the test session ==");

  await client.endSession(sessionId);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
