// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CsmPublishingCredentialsPoliciesEntity} from "@azure/arm-appservice";
import {
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Updates whether user publishing credentials are allowed on the site or not.
 *
 * @summary Description for Updates whether user publishing credentials are allowed on the site or not.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/UpdatePublishingCredentialsPolicy.json
 */
async function updateScmAllowed(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testSite";
  const csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity =
    { allow: true };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateScmAllowed(
    resourceGroupName,
    name,
    csmPublishingAccessPoliciesEntity,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateScmAllowed();
}

main().catch(console.error);
