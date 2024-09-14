// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create and manage a discovery group
 *
 * @description This sample demonstrates how to create and manage discovery runs in a workspace using the EASM defender client
 * 
 * Set the following environment variables before running the sample:
    1) SUBSCRIPTIONID - the subscription id for your resource
    2) WORKSPACENAME - the workspace name for your resource
    3) RESOURCEGROUPNAME - the resource group for your resource
    4) REGION - the azure region your resource is in
    5) HOSTS - a comma separated list of hosts you would like to run discovery on
    6) DOMAINS - a comma separated list of hosts you would like to run discovery on
 */

import EasmDefender, { isUnexpected, DiscoSource } from "@azure-rest/defender-easm";
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

  const discovery_group_name = "Disco Group from Typescript 😎";
  const discovery_group_description = "This is a sample description for a discovery group";

  const client = EasmDefender(
    endpoint + "/subscriptions/" + subscription_id + "/resourceGroups/" + resource_group + "/workspaces/" + workspace_name,
    credential,
    {}
  );

  // In order to start discovery runs, we must first create a discovery group, which is a collection of known assets that we can pivot off of.
  // These are created by calling the /discoGroups/{groupName} path with the PUT verb

  const hosts: string[] = JSON.parse(process.env.HOSTS!);
  const domains: string[] = JSON.parse(process.env.DOMAINS!);

  const seeds: DiscoSource[] = hosts
    .map<DiscoSource>((host) => {
      return { name: host, kind: "host" };
    })
    .concat(
      domains.map<DiscoSource>((domain) => {
        return { name: domain, kind: "domain" };
      })
    );

  await client.path("/discoGroups/{groupName}", discovery_group_name).put({
    body: {
      seeds: seeds,
      description: discovery_group_description,
    },
  });

  // Discovery groups created through the API's `put` method aren't run automatically, so we need to start the run ourselves.
  await client.path("/discoGroups/{groupName}:run", discovery_group_name).post();

  const discovery_groups = await client.path("/discoGroups").get();

  if (isUnexpected(discovery_groups)) {
    throw new Error(discovery_groups.body?.error.message);
  }

  discovery_groups.body.value?.forEach(async (discovery_group) => {
    console.log(discovery_group.name);
    const disco_runs = await client
      .path("/discoGroups/{groupName}/runs", discovery_group.name!)
      .get();

    if (isUnexpected(disco_runs)) {
      throw new Error(disco_runs.body?.error.message);
    }

    disco_runs.body.value?.slice(0, 5).forEach((disco_run) => {
      console.log(
        ` - started: ${disco_run.startedDate}, finished: ${disco_run.completedDate}, assets found: ${disco_run.totalAssetsFoundCount}`
      );
    });
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
