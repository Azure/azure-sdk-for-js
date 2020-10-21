// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ComputationClient } from "@azure/design-activity";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();
const endpointUrl = process.env.COMPUTATION_ENDPOINT || "";
const credential = new DefaultAzureCredential();

export async function main() {
  console.log("Running List ComputeNode Sample...");
  const client = new ComputationClient(endpointUrl, credential);

  console.log("Listing all ComputeNodes");
  for await (const node of await client.listComputeNodes()) {
    console.dir(node);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
