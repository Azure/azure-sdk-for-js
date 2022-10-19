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
  const testCreationResult = await client.path("/loadtests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: "",
      loadTestConfig: {
        engineInstances: 1, // number of engine instances to run test
      },
    },
  });

  if (testCreationResult.status !== "200" && testCreationResult.status !== "201") {
    throw testCreationResult.body.error;
  }

  // Uploading .jmx file to a test
  const fileUploadResult = await client
    .path("/loadtests/{testId}/files/{fileId}", testId, fileId)
    .put({
      contentType: "multipart/form-data",
      body: {
        file: readStream,
      },
    });

  if (fileUploadResult.status !== "201") {
    throw fileUploadResult.body.error;
  }

  // Creating app component
  const appComponentCreationResult = await client
    .path("/appcomponents/{name}", appComponentId)
    .patch({
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

  if (appComponentCreationResult.status !== "200" && appComponentCreationResult.status !== "201") {
    throw appComponentCreationResult.body.error;
  }

  // Creating the test run
  const testRunCreationResult = await client.path("/testruns/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
      vusers: 10,
    },
  });

  if (testRunCreationResult.status !== "200") {
    throw testRunCreationResult.body.error;
  }

  // Checking the test run status and printing metrics
  const getTestRunResult = await client.path("/testruns/{testRunId}", testRunId).get();
  console.log(testRunCreationResult);

  if (getTestRunResult.status !== "200") {
    throw getTestRunResult.body.error;
  }
}

main().catch(console.error);
