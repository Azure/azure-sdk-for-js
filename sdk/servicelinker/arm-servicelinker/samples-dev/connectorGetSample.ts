// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns Connector resource for a given name.
 *
 * @summary Returns Connector resource for a given name.
 * x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/preview/2024-07-01-preview/examples/Connectors.json
 */

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function connector(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SERVICELINKER_RESOURCE_GROUP"] || "test-rg";
  const location = "westus";
  const connectorName = "connectorName";
  const credential = new DefaultAzureCredential();
  const client = new ServiceLinkerManagementClient(credential);
  const result = await client.connector.get(
    subscriptionId,
    resourceGroupName,
    location,
    connectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connector();
}

main().catch(console.error);
