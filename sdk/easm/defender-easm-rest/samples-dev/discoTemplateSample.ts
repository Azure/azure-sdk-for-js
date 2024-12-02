// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create discovery groups using a template
 *
 * @description This sample show you how to use the easm defender client to create discovery groups using templates
 *
 * Set the following environment variables before running the sample:
    1) SUBSCRIPTIONID - the subscription id for your resource
    2) WORKSPACENAME - the workspace name for your resource
    3) RESOURCEGROUPNAME - the resource group for your resource
    4) REGION - the azure region your resource is in
    5) PARTIAL_NAME - the search term for the templates. used for a case insensitive "contains" search
 */

import EasmDefender, { isUnexpected } from "@azure-rest/defender-easm";
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

  const partial_name = process.env.PARTIAL_NAME || "";
  console.log(`Partial name is ${partial_name}`);

  const client = EasmDefender(
    endpoint + "/subscriptions/" + subscription_id + "/resourceGroups/" + resource_group + "/workspaces/" + workspace_name,
    credential,
    {}
  );

  // The /discoTemplates path can be called to find a discovery template using a filter.
  // The endpoint will return templates based on a partial match on the name field.
  const disco_templates = await client.path("/discoTemplates").get({
    queryParameters: {
      filter: partial_name,
    },
  });

  if (isUnexpected(disco_templates)) {
    throw new Error(disco_templates.body?.error.message);
  }

  disco_templates.body.value?.forEach((disco_template) => {
    console.log(`${disco_template.id}: ${disco_template.displayName}`);
  });

  // To get more detail about a disco template, we can call the /discoTemplates path with the GET verb.
  // From here, we can see the names and seeds which would be used in a discovery run.
  // Choose a template from one of the ids printed above
  let template_id: string = "43488";

  const disco_template_response = await client
    .path("/discoTemplates/{templateId}", template_id)
    .get();

  if (isUnexpected(disco_template_response)) {
    throw new Error(disco_template_response.body?.error.message);
  }

  const disco_template = disco_template_response.body;

  console.log(`Chosen template id: ${disco_template.id}`);
  console.log(`The following names will be used:`);
  disco_template.names?.forEach(console.log);
  console.log(`The following seeds will be used:`);
  disco_template.seeds?.forEach((seed) => {
    console.log(`${seed.kind}, ${seed.name}`);
  });

  // The discovery template can be used to create a discovery group with using the /discoGroups/{groupName} path with the PUT verb.
  // Don't forget to run your new disco group by calling the /discoGroups/{groupName}:run path
  const group_name: string = "Sample discovery group";

  const disco_group_response = await client.path("/discoGroups/{groupName}", group_name).put({
    body: {
      templateId: template_id,
    },
  });

  if (isUnexpected(disco_group_response)) {
    throw new Error(disco_group_response.body?.error.message);
  }

  await client.path("/discoGroups/{groupName}:run", group_name);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
