// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a JWT authenticator and updates the managed cluster to apply the settings.
 *
 * @summary Deletes a JWT authenticator and updates the managed cluster to apply the settings.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/JWTAuthenticators_Delete.json
 */
async function deleteJwtAuthenticator() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const jwtAuthenticatorName = "jwt1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.jWTAuthenticators.beginDeleteAndWait(
    resourceGroupName,
    resourceName,
    jwtAuthenticatorName,
  );
  console.log(result);
}

async function main() {
  await deleteJwtAuthenticator();
}

main().catch(console.error);
