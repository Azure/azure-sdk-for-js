// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all health reports inside a scope. Valid scopes are: subscription (format: 'subscriptions/{subscriptionId}'), or security connector (format: 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
 *
 * @summary get a list of all health reports inside a scope. Valid scopes are: subscription (format: 'subscriptions/{subscriptionId}'), or security connector (format: 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
 * x-ms-original-file: 2023-05-01-preview/HealthReports/ListHealthReports_example.json
 */
async function listHealthReports() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.healthReports.list(
    "subscriptions/a1efb6ca-fbc5-4782-9aaa-5c7daded1ce2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHealthReports();
}

main().catch(console.error);
