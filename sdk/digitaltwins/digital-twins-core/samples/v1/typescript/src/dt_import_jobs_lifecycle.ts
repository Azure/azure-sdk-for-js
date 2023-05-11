// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * This sample illustrates the lifecycle of an import job using a scenario that shows how to:
 * - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
 * - create an import job
 * - get created import job by importJobId
 * - list all import jobs by listing them using the paginated API
 * - cancel the created import job
 * - delete the created import job
 * 
 * @summary demonstrates the lifecycle (create, get, list, decommission, delete) of a model
 */

import { DefaultAzureCredential } from "@azure/identity";
import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { inspect } from "util";
import { v4 } from "uuid";

// For the purpose of this example we will create temporary model and a temporary component model using random Ids.
// We have to make sure these model Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  const importJobId = `import-job-${v4()}`;
  const inputBlobUri = "<input blob uri>"; // Input blob file in a storage container with the correct permissions required;
  const outputBlobUri = "<output blob uri>"; //Storage container with correct permissions required. If output blob file does not exist, one will be created;

  // AZURE_DIGITALTWINS_URL: The URL to your Azure Digital Twins instance
  const url = process.env.AZURE_DIGITALTWINS_URL;
  if (url === undefined) {
    throw new Error("Required environment variable AZURE_DIGITALTWINS_URL is not set.");
  }

  // DefaultAzureCredential is provided by @azure/identity. It supports
  // different authentication mechanisms and determines the appropriate
  // credential type based of the environment it is executing in. See
  // https://www.npmjs.com/package/@azure/identity for more information on
  // authenticating with DefaultAzureCredential or other implementations of
  // TokenCredential.
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // Create import job
  const createdImportJob = await serviceClient.upsertImportJob(importJobId, inputBlobUri, outputBlobUri);
  console.log(`Created import Job:`);
  console.log(inspect(createdImportJob));

  // Get created import job
  const getImportJob = await serviceClient.getImportJob(importJobId);
  console.log(`Get Import Job:`);
  console.log(inspect(getImportJob));

  // List all import jobs
  const listedImportJobs = serviceClient.listImportJobs();
  console.log(`Import Job list`);
  for await (const importJob of listedImportJobs) {
    console.log(`Import Job:`);
    console.log(inspect(importJob));
  }

  // Decommission import jobs
  let response = await serviceClient.cancelImportJob(importJobId);
  console.log(`Cancel Import Job response:`);
  console.log(inspect(response));

  // Delete import jobs
  response = await serviceClient.deleteImportJob(importJobId);
  console.log(`Delete Model response:`);
  console.log(inspect(response));
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
