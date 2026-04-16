// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all suppression lists for a domains resource.
 *
 * @summary List all suppression lists for a domains resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/suppressionLists/getSuppressionLists.json
 */
async function getAllSuppressionListsResources() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "contosoResourceGroup";
  const emailServiceName = "contosoEmailService";
  const domainName = "contoso.com";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.suppressionLists.listByDomain(
    resourceGroupName,
    emailServiceName,
    domainName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAllSuppressionListsResources();
}

main().catch(console.error);
