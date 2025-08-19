// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update the SourceControl for a Container App.
 *
 * @summary Create or update the SourceControl for a Container App.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/SourceControls_CreateOrUpdate.json
 */

import {
  SourceControl,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateContainerAppSourceControl(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "workerapps-rg-xj";
  const containerAppName = "testcanadacentral";
  const sourceControlName = "current";
  const sourceControlEnvelope: SourceControl = {
    branch: "master",
    githubActionConfiguration: {
      azureCredentials: {
        clientId: "<clientid>",
        clientSecret: "<clientsecret>",
        kind: "feaderated",
        tenantId: "<tenantid>",
      },
      contextPath: "./",
      githubPersonalAccessToken: "test",
      image: "image/tag",
      registryInfo: {
        registryPassword: "<registrypassword>",
        registryUrl: "test-registry.azurecr.io",
        registryUserName: "test-registry",
      },
    },
    repoUrl: "https://github.com/xwang971/ghatest",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result =
    await client.containerAppsSourceControls.beginCreateOrUpdateAndWait(
      resourceGroupName,
      containerAppName,
      sourceControlName,
      sourceControlEnvelope,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateContainerAppSourceControl();
}

main().catch(console.error);
