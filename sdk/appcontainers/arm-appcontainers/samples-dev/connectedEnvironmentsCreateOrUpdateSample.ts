// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConnectedEnvironment} from "@azure/arm-appcontainers";
import {
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an connectedEnvironment.
 *
 * @summary Creates or updates an connectedEnvironment.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/ConnectedEnvironments_CreateOrUpdate.json
 */
async function createKubeEnvironments(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const connectedEnvironmentName = "testenv";
  const environmentEnvelope: ConnectedEnvironment = {
    customDomainConfiguration: {
      certificatePassword: "private key password",
      certificateValue: Buffer.from("Y2VydA=="),
      dnsSuffix: "www.my-name.com",
    },
    daprAIConnectionString:
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://northcentralus-0.in.applicationinsights.azure.com/",
    location: "East US",
    staticIp: "1.2.3.4",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    connectedEnvironmentName,
    environmentEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createKubeEnvironments();
}

main().catch(console.error);
