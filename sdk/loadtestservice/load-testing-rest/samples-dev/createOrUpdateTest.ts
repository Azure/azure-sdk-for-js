// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to create a loadtest
 * @summary creates a loadtest
 * @azsdk-weight 10
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { v4 as uuidv4 } from "uuid";

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const testId = uuidv4(); // ID to be assigned to a test

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Creating the Load test
  const testCreationResult = await client.path("/tests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: "",
      loadTestConfiguration: {
        engineInstances: 1, // number of engine instances to run test
      },
    },
  });

  if (isUnexpected(testCreationResult)) {
    throw testCreationResult.body.error;
  }
}

main().catch(console.error);
