// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Exchange an AAD access token of a Teams user for a new Communication Identity access token.
 */

const { CommunicationIdentityClient } = require("@azure/communication-identity");
const { PublicClientApplication } = require("@azure/msal-node");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";
const aadTenant =
  process.env["COMMUNICATION_M365_AAD_TENANT"] || "<azure active directory tenant id>";
const aadAppId = process.env["COMMUNICATION_M365_APP_ID"] || "<azure active directory app id>";
const aadScope = process.env["COMMUNICATION_M365_SCOPE"] || "<azure active directory scope>";
const aadAuthority =
  process.env["COMMUNICATION_M365_AAD_AUTHORITY"] || "<azure active directory authority>";
const msalUsername = process.env["COMMUNICATION_MSAL_USERNAME"] || "<msal username>";
const msalPassword = process.env["COMMUNICATION_MSAL_PASSWORD"] || "<msal password>";

async function main() {
  if (process.env["SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST"] === "true") {
    console.log("Skipping the Get Access Token for Teams User sample");
    return;
  }
  console.log("\n== Get Access Token for Teams User sample ==\n");

  const client = new CommunicationIdentityClient(connectionString);

  // Get an AAD token and object ID of a Teams user
  console.log("Getting an AAD token and an object ID of a Teams user");

  // Use MSAL to get the AAD token and object ID of a Teams user
  // Create configuration object for PublicClientApplication
  const msalConfig = {
    auth: {
      clientId: aadAppId,
      authority: aadAuthority + "/" + aadTenant,
    },
  };

  // Create an instance of PublicClientApplication
  const msalInstance = new PublicClientApplication(msalConfig);

  // Create request parameters object for acquiring the AAD token and object ID of a Teams user
  const usernamePasswordRequest = {
    scopes: [aadScope],
    username: msalUsername,
    password: msalPassword,
  };

  // Retrieve the AAD token and object ID of a Teams user
  const response = await msalInstance.acquireTokenByUsernamePassword(usernamePasswordRequest);
  let teamsToken = response.accessToken;
  console.log(`Retrieved a token with the expiration: ${response.extExpiresOn}`);

  // Retrieve the user object ID
  let userObjectId = response.uniqueId;

  console.log("Exchanging the AAD access token for a Communication access token");

  // Exchange the AAD access token of a Teams user for a new Communication Identity access token
  const communicationAccessToken = await client.getTokenForTeamsUser({
    teamsUserAadToken: teamsToken,
    clientId: aadAppId,
    userObjectId: userObjectId,
  });

  console.log(`Exchanged Communication access token: ${communicationAccessToken.token}`);
}

main().catch((error) => {
  console.error("Encountered an error while exchanging token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});

module.exports = { main };
