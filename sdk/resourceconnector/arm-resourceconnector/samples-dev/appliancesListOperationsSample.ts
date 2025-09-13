// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all available Appliances operations.
 *
 * @summary Lists all available Appliances operations.
 * x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListOperations.json
 */

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAppliancesOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ResourceConnectorManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.appliances.listOperations()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAppliancesOperations();
}

main().catch(console.error);
