// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Tag assets automatically with external ids
 *
 * @description External IDs can be a useful method of keeping track of assets in multiple systems, but it can be time consuming to manually tag each asset.
 * In this example, we'll take a look at how you can, with a map of name/kind/external id, tag each asset in your inventory with an external id automatically using the SDK
 *
 * Set the following environment variables before running the sample:
    1) SUBSCRIPTIONID - the subscription id for your resource
    2) WORKSPACENAME - the workspace name for your resource
    3) RESOURCEGROUPNAME - the resource group for your resource
    4) REGION - the azure region your resource is in
    5) MAPPING - a json file with an external id mapping.
    The mapping file should be in the following format:
    [
        {
            'name': 'example.com',
            'kind': 'host',
            'external_id': 'EXT040'
        },
        {
            'name': 'example.com',
            'kind': 'domain',
            'external_id': 'EXT041'
        }
    ]
 */

const EasmDefender = require("@azure-rest/defender-easm").default,
  { isUnexpected } = require("@azure-rest/defender-easm");
const { DefaultAzureCredential } = require("@azure/identity");
// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // To create an EasmClient, you need your subscription ID, region, and some sort of credential.
  const subscription_id = process.env.SUBSCRIPTION_ID || "";
  const resource_group = process.env.RESOURCE_GROUP_NAME || "";
  const workspace_name = process.env.WORKSPACE_NAME || "";
  const region = process.env.REGION || "";
  const endpoint = `https://${region}.easm.defender.microsoft.com`;
  const credential = new DefaultAzureCredential();

  // Assets in EASM can be uniquely distinguished by `name` and `kind`, so we can create a simple dictionary containing `name`, `kind`, and `external_id`.
  // In a more realistic case, this could be generated using an export from the external system we're using for tagging
  const external_id_mapping = JSON.parse(process.env.MAPPING);

  const client = EasmDefender(
    endpoint +
    "/subscriptions/" +
    subscription_id +
    "/resourceGroups/" +
    resource_group +
    "/workspaces/" +
    workspace_name,
    credential,
    {},
  );

  // Using the client, we can update each asset and append the tracking id of the update to our update ID list,
  // so that we can keep track of the progress on each update later
  const external_ids = [];
  const update_ids = [];

  external_id_mapping.forEach(async (mapping) => {
    external_ids.push(mapping.external_id);

    const task_response = await client.path("/assets").post({
      body: {
        externalId: mapping.external_id,
      },
      queryParameters: {
        filter: `kind = ${mapping.kind} AND name = ${mapping.name}`,
      },
    });

    if (isUnexpected(task_response)) {
      throw new Error(task_response.body?.error.message);
    }

    update_ids.push(task_response.body.id);
  });

  // By calling the /tasks/{taskId} endpoint, we can view the progress of each update using the `get` method
  update_ids.forEach(async (id) => {
    const task_response = await client.path("/tasks/{taskId}", id).get();

    if (isUnexpected(task_response)) {
      throw new Error(task_response.body?.error.message);
    }

    const task = task_response.body;

    console.log(`${task.id}: ${task.state}`);
  });

  // The updates can be viewed by calling the /assets endpoint by creating a filter that matches on each external id using an `in` query
  const asset_filter = external_ids.join(",");

  const assets_response = await client.path("/assets").get({
    queryParameters: {
      filter: asset_filter,
    },
  });

  if (isUnexpected(assets_response)) {
    throw new Error(assets_response.body?.error.message);
  }

  const assets = assets_response.body.value;

  assets.forEach((asset) => {
    console.log(`${asset.externalId}, ${asset.name}`);
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
