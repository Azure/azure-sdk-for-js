// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 *
 * @summary check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 * x-ms-original-file: 2025-12-01/CheckNameAvailability.json
 */
async function checkNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.checkNameAvailability({
    name: "sampleName",
    type: "Microsoft.Cdn/Profiles/Endpoints",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailability();
}

main().catch(console.error);
