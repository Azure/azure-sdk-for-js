// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 *
 * @summary description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 * x-ms-original-file: 2024-11-01/UpdateAppServiceDomainOwnershipIdentifier.json
 */
async function updateAppServiceDomainOwnershipIdentifier(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.updateOwnershipIdentifier(
    "testrg123",
    "example.com",
    "SampleOwnershipId",
    { ownershipId: "SampleOwnershipId" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAppServiceDomainOwnershipIdentifier();
}

main().catch(console.error);
