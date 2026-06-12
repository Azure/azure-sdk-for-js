// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all run outputs for the specified Image Template resource
 *
 * @summary list all run outputs for the specified Image Template resource
 * x-ms-original-file: 2025-10-01/ListRunOutputs.json
 */
async function retrieveAListOfAllOutputsCreatedByTheLastRunOfAnImageTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineImageTemplates.listRunOutputs(
    "myResourceGroup",
    "myImageTemplate",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await retrieveAListOfAllOutputsCreatedByTheLastRunOfAnImageTemplate();
}

main().catch(console.error);
