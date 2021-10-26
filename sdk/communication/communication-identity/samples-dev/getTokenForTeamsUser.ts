// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Exchange an AAD access token of a Teams user for a new Communication Identity access token.
 */

import {
  CommunicationAccessToken,
  CommunicationIdentityClient
} from "@azure/communication-identity";
import { UsernamePasswordCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";
const aadTenant =
  process.env["COMMUNICATION_M365_AAD_TENANT"] || "<azure active directory tenant id>";
const aadAppId = process.env["COMMUNICATION_M365_APP_ID"] || "<azure active directory app id>";
const aadScope = process.env["COMMUNICATION_M365_SCOPE"] || "<azure active directory scope>";
const msalUsername = process.env["COMMUNICATION_MSAL_USERNAME"] || "<msal username>";
const msalPassword = process.env["COMMUNICATION_MSAL_PASSWORD"] || "<msal password>";

export async function main() {
  if (process.env["SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST"] === "true") {
    console.log("Skipping the Get Access Token for Teams User sample");
    return;
  }
  console.log("\n== Get Access Token for Teams User sample ==\n");

  const client = new CommunicationIdentityClient(connectionString);

  // Get an AAD token of a Teams user
  console.log("Getting an AAD token of a Teams user");

  // Create an AAD credential
  const credential = new UsernamePasswordCredential(
    aadTenant,
    aadAppId,
    msalUsername,
    msalPassword
  );

  // Use MSAL to to get the AAD token
  const response = await credential.getToken([aadScope]);

  console.log(`Retrieved a token with the expiration: ${response.expiresOnTimestamp}`);

  console.log("Exchanging the AAD access token for a Communication access token");

  // Exchange the AAD access token of a Teams user for a new Communication Identity access token
  const communicationAccessToken: CommunicationAccessToken = await client.getTokenForTeamsUser(
    response!.token
  );

  console.log(`Exchanged Communication access token: ${communicationAccessToken.token}`);
}

main().catch((error) => {
  console.error("Encountered an error while exchanging token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
