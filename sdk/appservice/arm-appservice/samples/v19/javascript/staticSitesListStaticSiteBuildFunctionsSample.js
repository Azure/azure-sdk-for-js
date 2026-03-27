// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the functions of a particular static site build.
 *
 * @summary description for Gets the functions of a particular static site build.
 * x-ms-original-file: 2025-05-01/ListStaticSiteBuildFunctions.json
 */
async function getsTheFunctionsOfAParticularStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.listStaticSiteBuildFunctions(
    "rg",
    "testStaticSite0",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheFunctionsOfAParticularStaticSiteBuild();
}

main().catch(console.error);
