// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to transfer out domain to another registrar
 *
 * @summary transfer out domain to another registrar
 * x-ms-original-file: 2024-11-01/TransferOutDomain.json
 */
async function transferOutDomain(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.transferOut("testrg123", "example.com");
  console.log(result);
}

async function main(): Promise<void> {
  await transferOutDomain();
}

main().catch(console.error);
