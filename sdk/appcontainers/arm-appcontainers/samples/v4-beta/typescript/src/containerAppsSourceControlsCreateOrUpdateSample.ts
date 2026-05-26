// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the SourceControl for a Container App.
 *
 * @summary create or update the SourceControl for a Container App.
 * x-ms-original-file: 2025-10-02-preview/SourceControls_CreateOrUpdate.json
 */
async function createOrUpdateContainerAppSourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSourceControls.createOrUpdate(
    "workerapps-rg-xj",
    "testcanadacentral",
    "current",
    {
      branch: "master",
      githubActionConfiguration: {
        azureCredentials: {
          clientId: "<clientid>",
          clientSecret: "<clientsecret>",
          kind: "feaderated",
          tenantId: "<tenantid>",
        },
        buildEnvironmentVariables: [
          { name: "foo1", value: "bar1" },
          { name: "foo2", value: "bar2" },
        ],
        contextPath: "./",
        dockerfilePath: "./Dockerfile",
        githubPersonalAccessToken: "test",
        image: "image/tag",
        registryInfo: {
          registryPassword: "<registrypassword>",
          registryUrl: "test-registry.azurecr.io",
          registryUserName: "test-registry",
        },
      },
      repoUrl: "https://github.com/xwang971/ghatest",
    },
    { xMsGithubAuxiliary: "githubaccesstoken" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateContainerAppSourceControl();
}

main().catch(console.error);
