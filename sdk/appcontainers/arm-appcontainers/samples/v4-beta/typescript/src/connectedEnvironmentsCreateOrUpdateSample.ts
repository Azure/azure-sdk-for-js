// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an connectedEnvironment.
 *
 * @summary creates or updates an connectedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironments_CreateOrUpdate.json
 */
async function createKubeEnvironments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironments.createOrUpdate("examplerg", "testenv", {
    location: "East US",
    customDomainConfiguration: {
      certificatePassword: "private key password",
      certificateValue: Buffer.from("Y2VydA==", "base64"),
      dnsSuffix: "www.my-name.com",
    },
    daprAIConnectionString:
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://northcentralus-0.in.applicationinsights.azure.com/",
    staticIp: "1.2.3.4",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createKubeEnvironments();
}

main().catch(console.error);
