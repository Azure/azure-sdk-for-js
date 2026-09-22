// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns details of a specific file in a work space.
 *
 * @summary returns details of a specific file in a work space.
 * x-ms-original-file: 2025-06-01-preview/GetFileDetailsForSubscription.json
 */
async function getDetailsOfASubscriptionFile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.files.get("testworkspace", "test.txt");
  console.log(result);
}

async function main() {
  await getDetailsOfASubscriptionFile();
}

main().catch(console.error);
