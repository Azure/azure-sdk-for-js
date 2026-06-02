// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update specific properties of a private link resource. Use this operation to update mutable properties like tags without affecting the entire resource configuration.
 *
 * @summary update specific properties of a private link resource. Use this operation to update mutable properties like tags without affecting the entire resource configuration.
 * x-ms-original-file: 2026-01-01/PrivateLinks/PrivateLinks_Update.json
 */
async function updatePrivateLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.privateLinks.update("rg", "spl", {
    tags: { environment: "development", owner: "security-team-updated", project: "private-links" },
  });
  console.log(result);
}

async function main() {
  await updatePrivateLink();
}

main().catch(console.error);
