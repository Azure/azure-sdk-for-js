// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get and Update a Program Brief (application for a short code)
 */

import {
  ShortCodesClient,
  ShortCodesUpsertUSProgramBriefOptionalParams
} from "@azure-tools/communication-short-codes";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get and Update Program Brief Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new ShortCodesClient(connectionString);

  // get a program briefs for a resource
  const programBriefId = process.env.PROGRAM_BRIEF_TO_GET || "00000000-0000-0000-0000-000000000000";
  var programBrief = await client.getUSProgramBrief(programBriefId);
  console.log(
    `Program brief with Id ${programBrief.id} has status ${programBrief.status} which was last updated ${programBrief.statusUpdatedDate}`
  );

  // update the program brief
  var updateRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
    body: {
      id: programBriefId,
      programDetails: {
        privacyPolicyUrl: "https://contoso.com/updated-privacy",
        termsOfServiceUrl: "https://contoso.com/updated-terms-of-service"
      }
    }
  };
  var upsertResponse = await client.upsertUSProgramBrief(programBriefId, updateRequest);
  if (upsertResponse._response.status == 200) {
    console.log(
      `Successfully updated terms of service and privacy policy for program brief ${programBriefId}`
    );
  } else {
    throw new Error(`Failed to update program brief with Id ${programBriefId}.
      Status code: ${upsertResponse._response.status}; Error: ${
      upsertResponse._response.bodyAsText
    }; CV: ${upsertResponse._response.headers.get("MS-CV")}`);
  }
}

main().catch((error) => {
  console.log("The sample getAndUpdateProgramBriefs encountered an error:", error);
  process.exit(1);
});
