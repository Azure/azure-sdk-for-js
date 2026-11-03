// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a client with the specified parameters.
 *
 * @summary create or update a client with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/Clients_CreateOrUpdate.json
 */
async function clientsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.clients.createOrUpdate(
    "examplerg",
    "exampleNamespaceName1",
    "exampleClientName1",
    {
      description: "This is a test client",
      attributes: { deviceTypes: ["Fan", "Light", "AC"], floor: 3, room: "345" },
      clientCertificateAuthentication: { validationScheme: "SubjectMatchesAuthenticationName" },
      state: "Enabled",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clientsCreateOrUpdate();
}

main().catch(console.error);
