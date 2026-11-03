// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get ownership identifier for domain
 *
 * @summary description for Get ownership identifier for domain
 * x-ms-original-file: 2024-11-01/GetDomainOwnershipIdentifier.json
 */
async function getDomainOwnershipIdentifier(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.getOwnershipIdentifier(
    "testrg123",
    "example.com",
    "SampleOwnershipId",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDomainOwnershipIdentifier();
}

main().catch(console.error);
