// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Deploys zipped content to a specific environment of a static site.
 *
 * @summary description for Deploys zipped content to a specific environment of a static site.
 * x-ms-original-file: 2025-05-01/StaticSiteBuildZipDeploy.json
 */
async function deployASiteFromAZippedPackageToAParticularStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.createZipDeploymentForStaticSiteBuild("rg", "testStaticSite0", "12", {
    apiZipUrl:
      "https://[examplestorageaccount].com/happy-sea-15afae3e-master-81828877/api-zipdeploy.zip",
    appZipUrl:
      "https://[examplestorageaccount].com/happy-sea-15afae3e-master-81828877/app-zipdeploy.zip",
    deploymentTitle: "Update index.html",
    functionLanguage: "testFunctionLanguage",
    provider: "testProvider",
  });
}

async function main() {
  await deployASiteFromAZippedPackageToAParticularStaticSiteBuild();
}

main().catch(console.error);
