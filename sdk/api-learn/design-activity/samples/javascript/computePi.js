// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ComputationClient } from "@azure/design-activity";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();
const endpointUrl = process.env.COMPUTATION_ENDPOINT || "";
const credential = new DefaultAzureCredential();

export async function main() {
  console.log("Running Compute Pi Sample...");
  const client = new ComputationClient(endpointUrl, credential);

  const nodeClient = client.getComputeNodeClient("example-node");

  console.log("Computing Pi on example-node");
  const poller = await nodeClient.beginComputePi({ precision: 20 });
  const { value, precision } = await poller.pollUntilDone();
  console.log(`Pi is ${value} with precision ${precision}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
