// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a collection of API deployments.
 *
 * @summary returns a collection of API deployments.
 * x-ms-original-file: 2024-06-01-preview/Deployments_List.json
 */
async function deploymentsListByApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deployments.list(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await deploymentsListByApi();
}

main().catch(console.error);
