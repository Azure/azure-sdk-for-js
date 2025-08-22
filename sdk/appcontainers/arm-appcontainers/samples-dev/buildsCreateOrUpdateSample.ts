// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BuildResource,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a BuildResource
 *
 * @summary Create a BuildResource
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/Builds_CreateOrUpdate_NoConfig.json
 */
async function buildsCreateOrUpdateNoConfig(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const builderName = "testBuilder";
  const buildName = "testBuild";
  const buildEnvelope: BuildResource = {};
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builds.beginCreateOrUpdateAndWait(
    resourceGroupName,
    builderName,
    buildName,
    buildEnvelope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a BuildResource
 *
 * @summary Create a BuildResource
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/Builds_CreateOrUpdate.json
 */
async function buildsCreateOrUpdateWithConfig(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const builderName = "testBuilder";
  const buildName = "testBuild-123456789az";
  const buildEnvelope: BuildResource = {
    configuration: {
      baseOs: "DebianBullseye",
      environmentVariables: [
        { name: "foo1", value: "bar1" },
        { name: "foo2", value: "bar2" },
      ],
      platform: "dotnetcore",
      platformVersion: "7.0",
      preBuildSteps: [
        {
          description: "First pre build step.",
          httpGet: {
            fileName: "output.txt",
            headers: ["foo", "bar"],
            url: "https://microsoft.com",
          },
          scripts: ["echo 'hello'", "echo 'world'"],
        },
        {
          description: "Second pre build step.",
          httpGet: {
            fileName: "output.txt",
            headers: ["foo"],
            url: "https://microsoft.com",
          },
          scripts: ["echo 'hello'", "echo 'again'"],
        },
      ],
    },
    destinationContainerRegistry: {
      image: "test.azurecr.io/repo:tag",
      server: "test.azurecr.io",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builds.beginCreateOrUpdateAndWait(
    resourceGroupName,
    builderName,
    buildName,
    buildEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await buildsCreateOrUpdateNoConfig();
  await buildsCreateOrUpdateWithConfig();
}

main().catch(console.error);
