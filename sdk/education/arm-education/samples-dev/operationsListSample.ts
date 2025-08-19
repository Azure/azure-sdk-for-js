// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available Microsoft.Education API operations.
 *
 * @summary Lists all of the available Microsoft.Education API operations.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GetOperations.json
 */

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await getOperations();
}

main().catch(console.error);
