// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific Azure service for support ticket creation.
 *
 * @summary gets a specific Azure service for support ticket creation.
 * x-ms-original-file: 2025-06-01-preview/GetService.json
 */
async function getsDetailsOfTheAzureService() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.services.get("service_guid");
  console.log(result);
}

async function main() {
  await getsDetailsOfTheAzureService();
}

main().catch(console.error);
