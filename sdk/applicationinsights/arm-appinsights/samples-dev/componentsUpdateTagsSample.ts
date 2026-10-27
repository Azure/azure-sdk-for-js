// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing component's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary updates an existing component's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: 2025-01-23-preview/ComponentsUpdateTagsOnly.json
 */
async function componentUpdateTagsOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.updateTags("my-resource-group", "my-component", {
    tags: {
      ApplicationGatewayType: "Internal-Only",
      BillingEntity: "Self",
      Color: "AzureBlue",
      CustomField_01: "Custom text in some random field named randomly",
      NodeType: "Edge",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await componentUpdateTagsOnly();
}

main().catch(console.error);
