// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Create OuContainer operation creates a new OuContainer under the specified Domain Service instance.
 *
 * @summary the Create OuContainer operation creates a new OuContainer under the specified Domain Service instance.
 * x-ms-original-file: 2025-10-01-preview/CreateOuContainer.json
 */
async function createOuContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.ouContainerOperationGrp.create(
    "OuContainerResourceGroup",
    "OuContainer.com",
    "OuContainer1",
    { accountName: "AccountName1", password: "<password>", spn: "Spn1" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOuContainer();
}

main().catch(console.error);
