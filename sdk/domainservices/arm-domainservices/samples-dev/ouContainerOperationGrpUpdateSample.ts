// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Update OuContainer operation can be used to update the existing OuContainers.
 *
 * @summary the Update OuContainer operation can be used to update the existing OuContainers.
 * x-ms-original-file: 2025-10-01-preview/UpdateOuContainer.json
 */
async function updateOuContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.ouContainerOperationGrp.update(
    "OuContainerResourceGroup",
    "OuContainer.com",
    "OuContainer1",
    { accountName: "AccountName1", password: "<password>", spn: "Spn1" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateOuContainer();
}

main().catch(console.error);
