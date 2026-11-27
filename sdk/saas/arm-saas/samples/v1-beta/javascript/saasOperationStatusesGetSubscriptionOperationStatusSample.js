// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of a long-running SaaS operation at the subscription scope.
 *
 * @summary gets the status of a long-running SaaS operation at the subscription scope.
 * x-ms-original-file: 2026-04-01/SaasGetSubscriptionOperationStatus.json
 */
async function getSaaSOperationStatusAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasOperationStatuses.getSubscriptionOperationStatus(
    "e24b5b6b-2dfc-41ea-c457-46d0c42494af",
  );
  console.log(result);
}

async function main() {
  await getSaaSOperationStatusAtSubscriptionScope();
}

main().catch(console.error);
