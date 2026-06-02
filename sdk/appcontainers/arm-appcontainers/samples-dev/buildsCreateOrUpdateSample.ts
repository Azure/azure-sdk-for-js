// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a BuildResource
 *
 * @summary create a BuildResource
 * x-ms-original-file: 2025-10-02-preview/Builds_CreateOrUpdate.json
 */
async function buildsCreateOrUpdateWithConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builds.createOrUpdate("rg", "testBuilder", "testBuild-123456789az", {
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
          httpGet: { fileName: "output.txt", headers: ["foo"], url: "https://microsoft.com" },
          scripts: ["echo 'hello'", "echo 'again'"],
        },
      ],
    },
    destinationContainerRegistry: { image: "test.azurecr.io/repo:tag", server: "test.azurecr.io" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a BuildResource
 *
 * @summary create a BuildResource
 * x-ms-original-file: 2025-10-02-preview/Builds_CreateOrUpdate_NoConfig.json
 */
async function buildsCreateOrUpdateNoConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builds.createOrUpdate("rg", "testBuilder", "testBuild", {});
  console.log(result);
}

async function main(): Promise<void> {
  await buildsCreateOrUpdateWithConfig();
  await buildsCreateOrUpdateNoConfig();
}

main().catch(console.error);
