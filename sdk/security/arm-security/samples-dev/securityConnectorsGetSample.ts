// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves details of a specific security connector
 *
 * @summary retrieves details of a specific security connector
 * x-ms-original-file: 2024-08-01-preview/SecurityConnectors/GetSecurityConnectorSingleResource_example.json
 */
async function retrieveASecurityConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityConnectors.get(
    "exampleResourceGroup",
    "exampleSecurityConnectorName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveASecurityConnector();
}

main().catch(console.error);
