// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-resources-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a resource name is valid if it is not a reserved word, does not contains a reserved word and does not start with a reserved word
 *
 * @summary a resource name is valid if it is not a reserved word, does not contains a reserved word and does not start with a reserved word
 * x-ms-original-file: 2022-12-01/CheckResourceName.json
 */
async function checkValidityForAResourceName() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.checkResourceName({
    resourceNameDefinition: { name: "isxbox", type: "ResourceProviderTestHost/TestResourceType" },
  });
  console.log(result);
}

async function main() {
  await checkValidityForAResourceName();
}

main().catch(console.error);
