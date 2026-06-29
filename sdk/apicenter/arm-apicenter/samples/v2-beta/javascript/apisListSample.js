// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a collection of APIs.
 *
 * @summary returns a collection of APIs.
 * x-ms-original-file: 2024-06-01-preview/Apis_List.json
 */
async function apisListByWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apis.list("contoso-resources", "contoso", "default")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apisListByWorkspace();
}

main().catch(console.error);
