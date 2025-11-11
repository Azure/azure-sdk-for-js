// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate configurations for a Connector.
 *
 * @summary generate configurations for a Connector.
 * x-ms-original-file: 2024-07-01-preview/GenerateConfigurations.json
 */
async function generateConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.connector.generateConfigurations(
    "test-rg",
    "westus",
    "connectorName",
    {
      parameters: {
        customizedKeys: {
          ASL_DocumentDb_ConnectionString: "MyConnectionstring",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateConfiguration();
}

main().catch(console.error);
