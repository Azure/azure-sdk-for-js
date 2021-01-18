// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the CommunicationIdentityClient to
 * issue a user token. Also demonstrates how to export
 * telemetry data to an Azure Monitor resource.
 */

const { CommunicationIdentityClient } = require("@azure/communication-administration");
const tracer = require("./tracing");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

async function main() {
  console.log("\n== Issue Token Javascript Sample ==\n");

  const client = new CommunicationIdentityClient(connectionString);
  const scopes = ["chat"];

  // Create user
  console.log("Creating User");

  const user = await client.createUser();

  console.log(`Created user with id: ${user.communicationUserId}`);
  console.log("Issuing Token");

  // Issue token and get token from response
  const { token } = await client.issueToken(user, scopes);

  console.log(`Issued token: ${token}`);

  // Revoke tokens
  console.log("Revoking Tokens");

  await client.revokeTokens(user, new Date());

  console.log("Tokens Revoked");
}

const rootSpan = tracer.startSpan("IssueToken_Root");
tracer.withSpan(rootSpan, async () => {
    try {
      await main();
    } catch (e) {
      rootSpan.setAttribute("error.request", JSON.stringify(e.request));
      rootSpan.setAttribute("error.response", JSON.stringify(e.response));
      console.error("Error running sample:", JSON.stringify(e));
    } finally {
      // End the optional root span on completion
      rootSpan.end();
    }
  }).then(() => {
    console.log("Awaiting batched span processor to export batched spans...");
  
    setTimeout(() => {
      console.log("Spans exported.");
    }, 6000);
});
