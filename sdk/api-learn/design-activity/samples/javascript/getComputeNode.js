// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { ComputationClient } = require("@azure/design-activity");
const { DefaultAzureCredential } = require("@azure/identity");
import * as dotenv from "dotenv";

dotenv.config();
const endpointUrl = process.env.COMPUTATION_ENDPOINT || "";
const credential = new DefaultAzureCredential();

export async function main() {
  console.log("Running Get ComputeNode Sample...");
  const client = new ComputationClient(endpointUrl, credential);

  console.log("Getting ComputeNode example-node");
  const result = await client.getComputeNode("example-node");
  console.dir(result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
