// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get all Program Briefs for an ACS Resource and Delete some
 */

import {
  ShortCodesClient,
} from "@azure-tools/communication-short-codes";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get All Program Briefs and Delete Program Brief Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new ShortCodesClient(connectionString);

  // get all program briefs for a resource
  var programBriefs = await client.listUSProgramBriefs();

  // find draft program briefs, and delete them
  for await (const programBrief of programBriefs) {
    console.log(`Program Brief with Id ${programBrief.id} has status ${programBrief.status}`);

    // identify drafts
    if (programBrief.status == 'draft') {
      var unsubmittedProgramBriefId = programBrief.id;

      // delete draft program brief
      var deleteResponse = await client.deleteUSProgramBrief(unsubmittedProgramBriefId);
      if (deleteResponse._response.status == 200) {
        console.log(`Successfully deleted draft program brief with Id ${unsubmittedProgramBriefId}`);
      } else {
        console.log(`Failed to delete draft program brief with Id ${unsubmittedProgramBriefId}.
          Status code: ${deleteResponse._response.status}; Error: ${deleteResponse._response.bodyAsText}; CV: ${deleteResponse._response.headers.get("MS-CV")}`);
      }
    }
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
