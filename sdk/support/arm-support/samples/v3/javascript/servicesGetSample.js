// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a specific Azure service for support ticket creation.
 *
 * @summary Gets a specific Azure service for support ticket creation.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetService.json
 */

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function getsDetailsOfTheAzureService() {
  const serviceName = "service_guid";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.services.get(serviceName);
  console.log(result);
}

async function main() {
  await getsDetailsOfTheAzureService();
}

main().catch(console.error);
