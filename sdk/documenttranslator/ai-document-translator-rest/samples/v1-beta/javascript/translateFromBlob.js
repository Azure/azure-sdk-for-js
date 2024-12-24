// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how translate a colletion of documents stored in a Azure Storage Blob container
 * and output the translated documents to another container.
 *
 * Translating documents is considered a Long Running Operation because it may take a long time to complete,
 * specially if translating large files or a batch with several files.
 *
 * To handle these long running operations we need to call a few different endpoints, to track the status of the operation
 *
 * @summary translates a collection of documents
 */

const DocumentTranslator = require("@azure-rest/ai-document-translator").default;

require("dotenv").config();

/**
 * These are states of the Long Running Operation considered as terminal
 * that means that the operation has finished
 */
const terminalStates = ["Succeeded", "Failed", "Cancelled", "ValidationFailed"];

// Document Translation service endpoint
const endpoint = process.env["ENDPOINT"] || "document-translator endpoint";
// Api key to authenticate the requests
const apiKey = process.env["DOCUMENT_TRANSLATOR_API_KEY"] || "<api key>";
/**
 * Azure Storage Blob containers, sourceContainer has the documents to be translated
 * and targetContainer is the container where the translated documents will be output
 */
const sourceContainer = process.env["SOURCE_CONTAINER"] || "";
const targetContainer = process.env["TARGET_CONTAINER"] || "";

/**
 * This is the body that we need to send to the /batch endpoint
 * to start a translation job on all the documents in sourceContainer
 */
const batchSubmissionRequest = {
  inputs: [
    {
      source: { sourceUrl: sourceContainer },
      targets: [{ language: "fr", targetUrl: targetContainer }],
    },
  ],
};

async function main() {
  console.log("== Translate documents in a container sample ==");

  // Create a new client
  const client = DocumentTranslator(endpoint, { key: apiKey });

  // Call the /batches path to initiate the translation job
  const formats = await client.path("/batches").post({
    body: batchSubmissionRequest,
  });

  // If we get a non-success status code, throw an error
  if (formats.status !== "202") {
    throw formats.body.error;
  }

  // The initial response contains an operation-location header which indicates
  // the url in which we can poll for the status of the operation
  // this URL is in a format in which the last part of the url is the operationId
  // we can extract that ID and use it to call "/batches/{id}"
  const batchId = extractBatchId(formats.headers["operation-location"]);

  /**
   * We need to keep polling for the operation state until we find a terminal state
   * once we reached the terminal state we can proceed and access the translated documents
   * or throw an error in case something failed
   */
  // Setting up the batch status path to reuse it in the loop
  const checkStatus = client.path("/batches/{id}", batchId);
  let operationState;
  do {
    // We just call get on checkStatus and store the current state
    operationState = await checkStatus.get();

    // If we get a non-success status code, throw the error
    if (operationState.status !== "200") {
      throw operationState.body.error;
    }

    // The checkStatus operation returns a retry-after header that contains the
    // time in seconds to wait before sending the next polling request
    const parsedRetryAfter = Number.parseInt(String(operationState.headers["retry-after"]) || "5");
    const waitTime = Number.isInteger(parsedRetryAfter) ? parsedRetryAfter : 5;
    await wait(waitTime);
  } while (!terminalStates.includes(operationState.body.status));

  // Now that the operation is complete, we can list the translated documents
  const documents = await client.path("/batches/{id}/documents", batchId).get();

  if (documents.status !== "200") {
    throw documents.body.error;
  }

  console.log(documents.body.value.map((doc) => doc.path).join("\n"));
}

// Helper function to wait/sleep for N seconds
function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

// Helper function that extracts the batch id from operation-location header
function extractBatchId(batchUrl = "") {
  const parts = batchUrl.split("/");

  return parts[parts.length - 1];
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
