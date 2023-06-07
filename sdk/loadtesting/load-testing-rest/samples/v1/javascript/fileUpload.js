// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to a) create a loadtest, b) upload a jmx file, c) create appcomponent, d) run test and e) get test status
 *
 * @summary creates and run a loadtest
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");
const { createReadStream } = require("fs");
const { v4: uuidv4 } = require("uuid");

const readStream = createReadStream("./sample.jmx");

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const testId = uuidv4(); // ID to be assigned to a test
  const fileId = uuidv4(); // ID to be assigned to the file being uploaded

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Creating a load test
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
  // Checking for error response
  if (isUnexpected(testCreationResult)) {
    throw testCreationResult.body.error;
  }

  if (testCreationResult.body.testId === undefined)
    throw new Error("Test ID returned as undefined.");

  // Uploading .jmx file to a test
  const fileUploadResult = await client
    .path("/tests/{testId}/files/{fileName}", testCreationResult.body.testId, fileId)
    .put({
      contentType: "application/octet-stream",
      body: readStream,
    });

  if (isUnexpected(fileUploadResult)) {
    throw fileUploadResult.body.error;
  }
}

main().catch(console.error);
