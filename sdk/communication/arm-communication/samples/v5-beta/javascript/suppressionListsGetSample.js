// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SuppressionList resource.
 *
 * @summary get a SuppressionList resource.
 * x-ms-original-file: 2026-03-18/suppressionLists/getSuppressionList.json
 */
async function getASuppressionListResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.suppressionLists.get(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
    "aaaa1111-bbbb-2222-3333-aaaa11112222",
  );
  console.log(result);
}

async function main() {
  await getASuppressionListResource();
}

main().catch(console.error);
