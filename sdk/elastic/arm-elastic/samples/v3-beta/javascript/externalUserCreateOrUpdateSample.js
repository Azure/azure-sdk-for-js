// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update external user configurations for your Elastic monitor resource, enabling access and management by external users.
 *
 * @summary create or update external user configurations for your Elastic monitor resource, enabling access and management by external users.
 * x-ms-original-file: 2025-06-01/ExternalUserInfo.json
 */
async function externalUserCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.externalUser.createOrUpdate("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await externalUserCreateOrUpdate();
}

main().catch(console.error);
