// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to add a recovery services provider.
 *
 * @summary the operation to add a recovery services provider.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryServicesProviders_Create.json
 */
async function addsARecoveryServicesProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryServicesProviders.create(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareprovider1",
    {
      properties: {
        authenticationIdentityInput: {
          aadAuthority: "https://login.microsoftonline.com",
          applicationId: "f66fce08-c0c6-47a1-beeb-0ede5ea94f90",
          audience: "https://microsoft.onmicrosoft.com/cf19e349-644c-4c6a-bcae-9c8f35357874",
          objectId: "141360b8-5686-4240-a027-5e24e6affeba",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
        machineName: "vmwareprovider1",
        resourceAccessIdentityInput: {
          aadAuthority: "https://login.microsoftonline.com",
          applicationId: "f66fce08-c0c6-47a1-beeb-0ede5ea94f90",
          audience: "https://microsoft.onmicrosoft.com/cf19e349-644c-4c6a-bcae-9c8f35357874",
          objectId: "141360b8-5686-4240-a027-5e24e6affeba",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addsARecoveryServicesProvider();
}

main().catch(console.error);
