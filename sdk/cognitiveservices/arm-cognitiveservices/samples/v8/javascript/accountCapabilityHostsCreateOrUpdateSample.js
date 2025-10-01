// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update account capabilityHost.
 *
 * @summary Create or update account capabilityHost.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/AccountCapabilityHost/createOrUpdate.json
 */
async function createOrUpdateAccountCapabilityHost() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "test-rg";
  const accountName = "account-1";
  const capabilityHostName = "capabilityHostName";
  const capabilityHost = {
    properties: {
      customerSubnet:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroups/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accountCapabilityHosts.beginCreateOrUpdateAndWait(
    resourceGroupName,
    accountName,
    capabilityHostName,
    capabilityHost,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAccountCapabilityHost();
}

main().catch(console.error);
