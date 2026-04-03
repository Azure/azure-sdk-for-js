// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Handles requests to list all Domains resources under the parent EmailServices resource.
 *
 * @summary Handles requests to list all Domains resources under the parent EmailServices resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/domains/listByEmailService.json
 */
async function listDomainsResourcesByEmailServiceName() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domains.listByEmailServiceResource(
    resourceGroupName,
    emailServiceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDomainsResourcesByEmailServiceName();
}

main().catch(console.error);
