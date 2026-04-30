// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to performs ownership validation via checking TXT records for all custom domains in a namespace.
 *
 * @summary performs ownership validation via checking TXT records for all custom domains in a namespace.
 * x-ms-original-file: 2025-07-15-preview/Namespaces_ValidateCustomDomainOwnership.json
 */
async function namespacesValidateCustomDomainOwnership(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaces.validateCustomDomainOwnership(
    "examplerg",
    "exampleNamespaceName1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesValidateCustomDomainOwnership();
}

main().catch(console.error);
