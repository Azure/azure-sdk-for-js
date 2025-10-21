// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified encryptionScope associated with the Cognitive Services account.
 *
 * @summary Deletes the specified encryptionScope associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/DeleteEncryptionScope.json
 */
async function deleteEncryptionScope() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const encryptionScopeName = "encryptionScopeName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    encryptionScopeName,
  );
  console.log(result);
}

async function main() {
  await deleteEncryptionScope();
}

main().catch(console.error);
