// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generate preview dockerfile and manifests.
 *
 * @summary generate preview dockerfile and manifests.
 * x-ms-original-file: 2025-03-01-preview/GeneratePreviewArtifacts.json
 */
async function artifactGenerationProperties() {
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

async function main() {
  await artifactGenerationProperties();
}

main().catch(console.error);
