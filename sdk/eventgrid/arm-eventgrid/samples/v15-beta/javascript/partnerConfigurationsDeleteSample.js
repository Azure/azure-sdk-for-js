// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete existing partner configuration.
 *
 * @summary delete existing partner configuration.
 * x-ms-original-file: 2025-07-15-preview/PartnerConfigurations_Delete.json
 */
async function partnerConfigurationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.partnerConfigurations.delete("examplerg");
}

async function main() {
  await partnerConfigurationsDelete();
}

main().catch(console.error);
