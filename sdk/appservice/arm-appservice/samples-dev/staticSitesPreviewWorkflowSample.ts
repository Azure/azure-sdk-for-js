// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Generates a preview workflow file for the static site
 *
 * @summary Description for Generates a preview workflow file for the static site
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GenerateStaticSiteWorkflowPreview.json
 */

import {
  StaticSitesWorkflowPreviewRequest,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function generatesAPreviewWorkflowFileForTheStaticSite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const location = "West US 2";
  const staticSitesWorkflowPreviewRequest: StaticSitesWorkflowPreviewRequest = {
    branch: "master",
    buildProperties: {
      apiLocation: "api",
      appArtifactLocation: "build",
      appLocation: "app",
    },
    repositoryUrl: "https://github.com/username/RepoName",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.previewWorkflow(
    location,
    staticSitesWorkflowPreviewRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generatesAPreviewWorkflowFileForTheStaticSite();
}

main().catch(console.error);
