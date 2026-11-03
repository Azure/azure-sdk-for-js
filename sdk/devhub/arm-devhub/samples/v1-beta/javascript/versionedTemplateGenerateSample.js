// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates a VersionedTemplate.
 *
 * @summary generates a VersionedTemplate.
 * x-ms-original-file: 2025-03-01-preview/VersionedTemplate_Generate.json
 */
async function generateVersionedTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.versionedTemplate.generate("example-template", "1.0.0", {
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
  await generateVersionedTemplate();
}

main().catch(console.error);
