// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all certificates in a resource group under a site.
 *
 * @summary get all certificates in a resource group under a site.
 * x-ms-original-file: 2025-05-01/ListSiteCertificatesByResourceGroup.json
 */
async function listCertificatesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.siteCertificates.list("testrg123", "testSiteName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCertificatesByResourceGroup();
}

main().catch(console.error);
