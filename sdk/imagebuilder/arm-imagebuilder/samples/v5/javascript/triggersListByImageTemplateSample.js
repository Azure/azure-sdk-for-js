// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all triggers for the specified Image Template resource
 *
 * @summary list all triggers for the specified Image Template resource
 * x-ms-original-file: 2025-10-01/ListTriggers.json
 */
async function listTriggersByImageTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.triggers.listByImageTemplate(
    "myResourceGroup",
    "myImageTemplate",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTriggersByImageTemplate();
}

main().catch(console.error);
