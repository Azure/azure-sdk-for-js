// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update account capabilityHost.
 *
 * @summary create or update account capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/AccountCapabilityHost/createOrUpdate.json
 */
async function createOrUpdateAccountCapabilityHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accountCapabilityHosts.createOrUpdate(
    "test-rg",
    "account-1",
    "capabilityHostName",
    {
      properties: {
        customerSubnet:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroups/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
        enablePublicHostingEnvironment: true,
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAccountCapabilityHost();
}

main().catch(console.error);
