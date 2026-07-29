// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing Secret within a profile.
 *
 * @summary gets an existing Secret within a profile.
 * x-ms-original-file: 2025-12-01/Secrets_Get.json
 */
async function secretsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.secrets.get("RG", "profile1", "secret1");
  console.log(result);
}

async function main() {
  await secretsGet();
}

main().catch(console.error);
