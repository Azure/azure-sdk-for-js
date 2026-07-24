// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disable https delivery of the custom domain.
 *
 * @summary disable https delivery of the custom domain.
 * x-ms-original-file: 2025-12-01/CustomDomains_DisableCustomHttps.json
 */
async function customDomainsDisableCustomHttps() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.customDomains.disableCustomHttps(
    "RG",
    "profile1",
    "endpoint1",
    "www-someDomain-net",
  );
  console.log(result);
}

async function main() {
  await customDomainsDisableCustomHttps();
}

main().catch(console.error);
