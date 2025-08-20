// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns an Application Insights component.
 *
 * @summary Returns an Application Insights component.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2020-02-02/examples/ComponentsGet.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function componentGet(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-component";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.components.get(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await componentGet();
}

main().catch(console.error);
