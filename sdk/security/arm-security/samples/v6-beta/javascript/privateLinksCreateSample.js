// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a private link resource. This operation creates the necessary infrastructure to enable private endpoint connections to Microsoft Defender for Cloud services. For updates to existing resources, use the PATCH operation. The operation is asynchronous and may take several minutes to complete.
 *
 * @summary create a private link resource. This operation creates the necessary infrastructure to enable private endpoint connections to Microsoft Defender for Cloud services. For updates to existing resources, use the PATCH operation. The operation is asynchronous and may take several minutes to complete.
 * x-ms-original-file: 2026-01-01/PrivateLinks/PrivateLinks_Create.json
 */
async function createPrivateLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.privateLinks.create("rg", "spl", {
    location: "eastus",
    tags: { environment: "production", owner: "security-team", project: "private-links" },
  });
  console.log(result);
}

async function main() {
  await createPrivateLink();
}

main().catch(console.error);
