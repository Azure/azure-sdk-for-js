// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { ComputationClient } = require("@azure/design-activity");
const { DefaultAzureCredential } = require("@azure/identity");
import * as dotenv from "dotenv";

dotenv.config();
const endpointUrl = process.env.COMPUTATION_ENDPOINT || "";
const credential = new DefaultAzureCredential();

export async function main() {
  console.log("Running Replace ComputeNode Sample...");
  const client = new ComputationClient(endpointUrl, credential);

  console.log("Replacing ComputeNode example-node");
  await client.replaceComputeNode(
    "example-node",
    { kind: "WindowsComputeNode", sshPublicKey: "<key>", userName: "<userName>" },
    { onlyIfUnchanged: true }
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
