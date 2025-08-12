// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Relationship resources by HealthModel
 *
 * @summary list Relationship resources by HealthModel
 * x-ms-original-file: 2025-05-01-preview/Relationships_ListByHealthModel.json
 */
async function relationshipsListByHealthModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.relationships.listByHealthModel("rgopenapi", "model1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await relationshipsListByHealthModel();
}

main().catch(console.error);
