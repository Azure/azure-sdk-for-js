// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the service-created Microsoft Entra authentication method.
 *
 * @summary gets the service-created Microsoft Entra authentication method.
 * x-ms-original-file: 2026-10-01-preview/MicrosoftEntraAuthentications_Get.json
 */
async function getTheMicrosoftEntraAuthenticationMethod() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.microsoftEntraAuthentications.get(
    "example-resource-group",
    "example-cluster",
  );
  console.log(result);
}

async function main() {
  await getTheMicrosoftEntraAuthenticationMethod();
}

main().catch(console.error);
