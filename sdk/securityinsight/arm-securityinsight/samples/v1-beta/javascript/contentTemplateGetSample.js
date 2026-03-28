// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a template byt its identifier.
 * Expandable properties:
 * - properties/mainTemplate
 * - properties/dependantTemplates
 *
 * @summary gets a template byt its identifier.
 * Expandable properties:
 * - properties/mainTemplate
 * - properties/dependantTemplates
 * x-ms-original-file: 2025-07-01-preview/contentTemplates/GetTemplateById.json
 */
async function getATemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.contentTemplate.get(
    "myRg",
    "myWorkspace",
    "8365ebfe-a381-45b7-ad08-7d818070e11f",
  );
  console.log(result);
}

async function main() {
  await getATemplate();
}

main().catch(console.error);
