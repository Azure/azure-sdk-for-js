// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how list all role assignments
 *
 * @summary list role assignments
 * @azsdk-weight 20
 */

import AccessControl, { paginate } from "@azure-rest/synapse-access-control";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  const client = AccessControl(endpoint, new DefaultAzureCredential());
  const initialResponse = await client.path("/roleAssignments").get();

  if (initialResponse.status !== "200") {
    throw initialResponse.body.error;
  }

  const assignments = paginate(client, initialResponse);

  for await (const assignment of assignments) {
    console.log(assignment.id);
  }
}

main().catch(console.error);
