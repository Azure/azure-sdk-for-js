// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BicepClient } from "@azure/arm-resourcesbicep";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to decompiles an ARM json template into a Bicep template
 *
 * @summary decompiles an ARM json template into a Bicep template
 * x-ms-original-file: 2023-11-01/DecompileBicep.json
 */
async function decompileAnARMJsonTemplateIntoABicepFile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new BicepClient(credential, subscriptionId);
  const result = await client.decompileOperationGroup.bicep({
    template:
      '{\r\n "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",\r\n "contentVersion": "1.0.0.0",\r\n "metadata": {\r\n "_generator": {\r\n "name": "bicep",\r\n "version": "0.15.31.15270",\r\n "templateHash": "9249505596133208719"\r\n }\r\n },\r\n "parameters": {\r\n "storageAccountName": {\r\n "type": "string"\r\n }\r\n },\r\n "resources": []\r\n}',
  });
  console.log(result);
}

async function main(): Promise<void> {
  await decompileAnARMJsonTemplateIntoABicepFile();
}

main().catch(console.error);
