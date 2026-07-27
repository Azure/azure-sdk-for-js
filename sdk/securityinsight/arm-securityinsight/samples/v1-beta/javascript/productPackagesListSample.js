// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all packages from the catalog.
 * Expandable properties:
 * - properties/installed
 * - properties/packagedContent
 *
 * @summary gets all packages from the catalog.
 * Expandable properties:
 * - properties/installed
 * - properties/packagedContent
 * x-ms-original-file: 2025-07-01-preview/contentPackages/GetProductPackages.json
 */
async function getAllAvailablePackages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.productPackages.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllAvailablePackages();
}

main().catch(console.error);
