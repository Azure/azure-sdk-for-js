// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get all SmtpUsernameResources for a Communication resource.
 *
 * @summary Get all SmtpUsernameResources for a Communication resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/smtpUsername/getAll.json
 */
async function getAllSmtpUsernameResourcesForACommunicationServiceResource() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "contosoResourceGroup";
  const communicationServiceName = "contosoACSService";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.smtpUsernames.list(resourceGroupName, communicationServiceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAllSmtpUsernameResourcesForACommunicationServiceResource();
}

main().catch(console.error);
