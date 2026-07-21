// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing custom domain within an endpoint.
 *
 * @summary deletes an existing custom domain within an endpoint.
 * x-ms-original-file: 2025-12-01/CustomDomains_Delete.json
 */
async function customDomainsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.customDomains.delete(
    "RG",
    "profile1",
    "endpoint1",
    "www-someDomain-net",
  );
  console.log(result);
}

async function main() {
  await customDomainsDelete();
}

main().catch(console.error);
