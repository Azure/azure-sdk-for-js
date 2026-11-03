// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a custom domain.
 *
 * @summary create or update a custom domain.
 * x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_CreateOrUpdate.json
 */
async function signalRCustomDomainsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRCustomDomains.createOrUpdate(
    "myResourceGroup",
    "mySignalRService",
    "myDomain",
    {
      customCertificate: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.SignalRService/SignalR/mySignalRService/customCertificates/myCert",
      },
      domainName: "example.com",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRCustomDomainsCreateOrUpdate();
}

main().catch(console.error);
