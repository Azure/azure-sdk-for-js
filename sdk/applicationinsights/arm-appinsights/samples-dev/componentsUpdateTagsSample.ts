// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an existing component's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary Updates an existing component's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2020-02-02/examples/ComponentsUpdateTagsOnly.json
 */

import {
  TagsResource,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function componentUpdateTagsOnly(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-component";
  const componentTags: TagsResource = {
    tags: {
      applicationGatewayType: "Internal-Only",
      billingEntity: "Self",
      color: "AzureBlue",
      customField01: "Custom text in some random field named randomly",
      nodeType: "Edge",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.components.updateTags(
    resourceGroupName,
    resourceName,
    componentTags,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await componentUpdateTagsOnly();
}

main().catch(console.error);
