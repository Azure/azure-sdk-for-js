// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to upload a JMX test script file
 *
 * @summary Demonstrates how to upload a test script file.
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected, getLongRunningPoller } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");
const { createReadStream } = require("node:fs");

const readStream = createReadStream("./sample.jmx");

async function main() {
  /**
   * The dataplane endpoint for the Azure Load Testing resource.
   * Refer to https://learn.microsoft.com/rest/api/loadtesting/data-plane-uri to understand how to obtain the data-plane endpoint.
   */
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";

  /** Microsoft Entra ID authentication */
  /**
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth
   */
  const credential = new DefaultAzureCredential();
  const testId = process.env["LOADTESTSERVICE_TESTID"] || ""; // TestId of a test already created.

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  // Uploading .jmx test script file for a test
  const fileUploadResult = await client
    .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
    .put({
      contentType: "application/octet-stream",
      body: readStream,
    });

  if (isUnexpected(fileUploadResult)) {
    throw fileUploadResult.body.error;
  }

  let fileValidationResult;
  const fileValidationPoller = await getLongRunningPoller(client, fileUploadResult);
  try {
    fileValidationResult = await fileValidationPoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(120 * 1000), // Time out polling in 120 seconds
    });
  } catch (ex) {
    throw new Error("Error in polling file validation status: " + ex.message); // Validation might have timed out.
  }

  if (fileValidationPoller.getOperationState().status !== "succeeded" && fileValidationResult) {
    throw new Error(
      "There is some issue in validation, please make sure the upload file is a valid JMX file.",
    );
  }
}

main().catch(console.error);
