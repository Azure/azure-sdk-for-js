// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Delete OuContainer operation deletes specified OuContainer.
 *
 * @summary the Delete OuContainer operation deletes specified OuContainer.
 * x-ms-original-file: 2025-10-01-preview/DeleteOuContainer.json
 */
async function deleteOuContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  await client.ouContainerOperationGrp.delete(
    "OuContainerResourceGroup",
    "OuContainer.com",
    "OuContainer1",
  );
}

async function main(): Promise<void> {
  await deleteOuContainer();
}

main().catch(console.error);
