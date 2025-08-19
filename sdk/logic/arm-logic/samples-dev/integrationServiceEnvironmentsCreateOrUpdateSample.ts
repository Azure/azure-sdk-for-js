// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an integration service environment.
 *
 * @summary Creates or updates an integration service environment.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationServiceEnvironments_Put.json
 */

import type { IntegrationServiceEnvironment } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAnIntegrationServiceEnvironment(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "f34b22a3-2202-4fb1-b040-1332bd928c84";
  const resourceGroup = "testResourceGroup";
  const integrationServiceEnvironmentName = "testIntegrationServiceEnvironment";
  const integrationServiceEnvironment: IntegrationServiceEnvironment = {
    location: "brazilsouth",
    properties: {
      encryptionConfiguration: {
        encryptionKeyReference: {
          keyName: "testKeyName",
          keyVault: {
            id: "/subscriptions/f34b22a3-2202-4fb1-b040-1332bd928c84/resourceGroups/testResourceGroup/providers/Microsoft.KeyVault/vaults/testKeyVault",
          },
          keyVersion: "13b261d30b984753869902d7f47f4d55",
        },
      },
      networkConfiguration: {
        accessEndpoint: { type: "Internal" },
        subnets: [
          {
            id: "/subscriptions/f34b22a3-2202-4fb1-b040-1332bd928c84/resourceGroups/testResourceGroup/providers/Microsoft.Network/virtualNetworks/testVNET/subnets/s1",
          },
          {
            id: "/subscriptions/f34b22a3-2202-4fb1-b040-1332bd928c84/resourceGroups/testResourceGroup/providers/Microsoft.Network/virtualNetworks/testVNET/subnets/s2",
          },
          {
            id: "/subscriptions/f34b22a3-2202-4fb1-b040-1332bd928c84/resourceGroups/testResourceGroup/providers/Microsoft.Network/virtualNetworks/testVNET/subnets/s3",
          },
          {
            id: "/subscriptions/f34b22a3-2202-4fb1-b040-1332bd928c84/resourceGroups/testResourceGroup/providers/Microsoft.Network/virtualNetworks/testVNET/subnets/s4",
          },
        ],
      },
    },
    sku: { name: "Premium", capacity: 2 },
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationServiceEnvironments.beginCreateOrUpdateAndWait(
    resourceGroup,
    integrationServiceEnvironmentName,
    integrationServiceEnvironment,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnIntegrationServiceEnvironment();
}

main().catch(console.error);
