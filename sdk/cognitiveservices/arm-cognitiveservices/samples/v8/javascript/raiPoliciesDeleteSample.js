// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary Deletes the specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/DeleteRaiPolicy.json
 */
async function deleteRaiPolicy() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiPolicyName = "raiPolicyName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicies.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    raiPolicyName,
  );
  console.log(result);
}

async function main() {
  await deleteRaiPolicy();
}

main().catch(console.error);
