// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an associated tenant for the billing account.
 *
 * @summary create or update an associated tenant for the billing account.
 * x-ms-original-file: 2024-04-01/associatedTenantsCreateOrUpdate.json
 */
async function associatedTenantsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.associatedTenants.createOrUpdate(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
    {
      properties: {
        billingManagementState: "Active",
        displayName: "Contoso Finance",
        provisioningManagementState: "Pending",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await associatedTenantsCreateOrUpdate();
}

main().catch(console.error);
