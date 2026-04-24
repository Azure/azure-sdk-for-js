// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Generates a preview workflow file for the static site
 *
 * @summary description for Generates a preview workflow file for the static site
 * x-ms-original-file: 2025-05-01/GenerateStaticSiteWorkflowPreview.json
 */
async function generatesAPreviewWorkflowFileForTheStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.previewWorkflow("West US 2", {
    branch: "master",
    buildProperties: { apiLocation: "api", appArtifactLocation: "build", appLocation: "app" },
    repositoryUrl: "https://github.com/username/RepoName",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await generatesAPreviewWorkflowFileForTheStaticSite();
}

main().catch(console.error);
