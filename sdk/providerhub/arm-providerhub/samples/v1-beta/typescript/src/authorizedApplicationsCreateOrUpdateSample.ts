// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the authorized application.
 *
 * @summary creates or updates the authorized application.
 * x-ms-original-file: 2024-09-01/AuthorizedApplications_CreateOrUpdate.json
 */
async function authorizedApplicationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.authorizedApplications.createOrUpdate(
    "Microsoft.Contoso",
    "760505bf-dcfa-4311-b890-18da392a00b2",
    {
      properties: {
        dataAuthorizations: [{ resourceTypes: ["*"], role: "ServiceOwner" }],
        providerAuthorization: {
          managedByRoleDefinitionId: "1a3b5c7d-8e9f-10g1-1h12-i13j14k1",
          roleDefinitionId: "123456bf-gkur-2098-b890-98da392a00b2",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await authorizedApplicationsCreateOrUpdate();
}

main().catch(console.error);
