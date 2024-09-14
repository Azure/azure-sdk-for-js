// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Use saved filters to synchronize queries across multiple scripts
 * 
 * @description Saved Filters are used to store a query within EASM, these saved queries can be used to synchronize exact queries across multiple scripts, or to ensure a team is looking at the same assets
    In this example, we'll go over how a saved filter could be used to synchronize the a query across multiple scripts
    Set the following environment variables before running the sample:
    1) SUBSCRIPTIONID - the subscription id for your resource
    2) WORKSPACENAME - the workspace name for your resource
    3) RESOURCEGROUPNAME - the resource group for your resource
    4) REGION - the azure region your resource is in
 */

import EasmDefender, { SavedFilterOutput, isUnexpected } from "@azure-rest/defender-easm";
import { DefaultAzureCredential } from "@azure/identity";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // To create an EasmClient, you need your subscription ID, region, and some sort of credential.
  const subscription_id = process.env.SUBSCRIPTION_ID || "";
  const resource_group = process.env.RESOURCE_GROUP_NAME || "";
  const workspace_name = process.env.WORKSPACE_NAME || "";
  const region = process.env.REGION || "";
  const endpoint = `https://${region}.easm.defender.microsoft.com`;
  const credential = new DefaultAzureCredential();

  const saved_filter_name = "Sample saved filter";

  const client = EasmDefender(
    endpoint + "/subscriptions/" + subscription_id + "/resourceGroups/" + resource_group + "/workspaces/" + workspace_name,
    credential,
    {}
  );

  // To create a Saved Filter, we need to send a filter, name, and description to the /savedFilters/{filterName} endpoint
  await client.path("/savedFilters/{filterName}", saved_filter_name).put({
    body: {
      filter: "IP Address = 1.1.1.1",
      description: "Monitored Addresses",
    },
  });

  // The saved filter can now be used in scripts to monitor the assets
  // First, retrieve the saved filter by name, then use it in an asset list or update call

  // A sample asset list call that could be used to monitor the assets:
  const monitor = (saved_filter: SavedFilterOutput) => {
    // your monitor logic here
    console.log(saved_filter.name);
  };

  const saved_filter_response = await client
    .path("/savedFilters/{filterName}", saved_filter_name)
    .get();

  if (isUnexpected(saved_filter_response)) {
    throw new Error(saved_filter_response.body?.error.message);
  }

  const monitor_filter = saved_filter_response.body.filter!;

  const saved_filters_list_response = await client.path("/savedFilters").get({
    queryParameters: {
      filter: monitor_filter,
    },
  });

  if (isUnexpected(saved_filters_list_response)) {
    throw new Error(saved_filters_list_response.body?.error.message);
  }

  const saved_filters = saved_filters_list_response.body.value;

  saved_filters!.forEach(monitor);

  // A sample asset update call, which could be used to update the monitored assets:
  await client.path("/assets").post({
    body: {
      state: "confirmed",
    },
    queryParameters: {
      filter: monitor_filter,
    },
  });

  // Should your needs change, the filter can be updated with no need to update the scripts it's used in
  // Simply submit a new put request to replace the old description and filter with a new set
  await client.path("/savedFilters/{filterName}", saved_filter_name).put({
    body: {
      filter: "IP Address = 0.0.0.0",
      description: "Monitoring Addresses",
    },
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
