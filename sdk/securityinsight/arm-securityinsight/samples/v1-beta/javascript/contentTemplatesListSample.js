// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all installed templates.
 * Expandable properties:
 * - properties/mainTemplate
 * - properties/dependantTemplates
 *
 * @summary gets all installed templates.
 * Expandable properties:
 * - properties/mainTemplate
 * - properties/dependantTemplates
 * x-ms-original-file: 2025-07-01-preview/contentTemplates/GetTemplates.json
 */
async function getAllInstalledTemplates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contentTemplates.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllInstalledTemplates();
}

main().catch(console.error);
