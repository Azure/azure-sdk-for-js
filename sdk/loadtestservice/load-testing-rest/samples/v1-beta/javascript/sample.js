// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to a) create a loadtest, b) upload a jmx file, c) create appcomponent, d) run test and e) get test status
 *
 * @summary creates and run a loadtest
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default;
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
const createReadStream = require("fs");
const { v4: uuidv4 } = require("uuid");

const readStream = createReadStream.readFileSync("./sample.jmx");
dotenv.config();

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const SUBSCRIPTION_ID = process.env["SUBSCRIPTION_ID"] || "";
  const testId = uuidv4(); // ID to be assigned to a test
  const fileId = uuidv4(); // ID to be assigned to the file being uploaded
  const testRunId = uuidv4(); // ID to be assigned to a testRun
  const appComponentId = uuidv4(); // ID of the app components

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Creating a load test
  await client.path("/loadtests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: "",
      loadTestConfig: {
        engineInstances: 1, // number of engine instances to run test
      },
    },
  });

  // Uploading .jmx file to a test
  await client.path("/loadtests/{testId}/files/{fileId}", testId, fileId).put({
    contentType: "multipart/form-data",
    body: {
      file: readStream,
    },
  });

  // Creating app component
  await client.path("/appcomponents/{name}", appComponentId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "app_component",
      testId: testId,
      value: {
        "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo":
          {
            resourceId:
              "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo",
            resourceName: "App-Service-Sample-Demo",
            resourceType: "Microsoft.Web/sites",
            subscriptionId: SUBSCRIPTION_ID,
          },
      },
    },
  });

  // Creating the test run
  await client.path("/testruns/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
      vusers: 10,
    },
  });

  // Checking the test run status and printing metrics
  var result = await client.path("/testruns/{testRunId}", testRunId).get();
  console.log(result);
}

main().catch(console.error);
