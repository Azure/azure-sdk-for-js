// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how list all role assignments
 *
 * @summary list role assignments
 */

import AccessControl, { paginate } from "@azure-rest/synapse-access-control";
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

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
