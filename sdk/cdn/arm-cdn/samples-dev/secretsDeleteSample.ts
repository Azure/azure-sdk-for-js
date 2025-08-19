// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an existing Secret within profile.
 *
 * @summary Deletes an existing Secret within profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Secrets_Delete.json
 */
async function secretsDelete(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const secretName = "secret1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.secrets.beginDeleteAndWait(
    resourceGroupName,
    profileName,
    secretName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await secretsDelete();
}

main().catch(console.error);
