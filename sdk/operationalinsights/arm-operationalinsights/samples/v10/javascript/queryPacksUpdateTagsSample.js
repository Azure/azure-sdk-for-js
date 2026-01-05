// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary Updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/QueryPacksUpdateTagsOnly.json
 */
async function queryPackUpdateTagsOnly() {
  const subscriptionId = process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const queryPackName = "my-querypack";
  const queryPackTags = {
    tags: { tag1: "Value1", tag2: "Value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.queryPacks.updateTags(
    resourceGroupName,
    queryPackName,
    queryPackTags,
  );
  console.log(result);
}

async function main() {
  await queryPackUpdateTagsOnly();
}

main().catch(console.error);
