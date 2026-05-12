// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the inbound rules in the specified NAT gateway. Use the nextLink property in the response to get the next page of inbound rules.
 *
 * @summary lists all of the inbound rules in the specified NAT gateway. Use the nextLink property in the response to get the next page of inbound rules.
 * x-ms-original-file: 2026-04-01-preview/InboundRules_ListByNatGateway.json
 */
async function listInboundRulesByNatGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.inboundRules.listByNatGateway("test-rg", "test-nat-gw")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listInboundRulesByNatGateway();
}

main().catch(console.error);
