// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate preview dockerfile and manifests.
 *
 * @summary generate preview dockerfile and manifests.
 * x-ms-original-file: 2025-03-01-preview/GeneratePreviewArtifacts.json
 */
async function artifactGenerationProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.generatePreviewArtifacts("location1", {
    appName: "my-app",
    dockerfileGenerationMode: "enabled",
    dockerfileOutputDirectory: "./",
    generationLanguage: "javascript",
    imageName: "myimage",
    imageTag: "latest",
    languageVersion: "14",
    manifestGenerationMode: "enabled",
    manifestOutputDirectory: "./",
    manifestType: "kube",
    namespace: "my-namespace",
    port: "80",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await artifactGenerationProperties();
}

main().catch(console.error);
