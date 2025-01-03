// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary CreateCall using CallAutomationClient
 */

const { CallAutomationClient } = require("@azure/communication-call-automation");
const { CommunicationIdentityClient } = require("@azure/communication-identity");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

async function main() {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
  const callbackUri = "https://<my-event-endpoint>/events";

  const identityClient = new CommunicationIdentityClient(connectionString);
  const user = await identityClient.createUser();

  // create call automation client
  const callAutomationClient = new CallAutomationClient(connectionString);

  // create invitation
  const callInvite = { targetParticipant: user };

  // Create Call
  console.log("Creating call...");
  const createCallResult = await callAutomationClient.createCall(callInvite, callbackUri);

  const callConnection = createCallResult.callConnection;
  const callConnectionId = createCallResult.callConnectionProperties.callConnectionId;

  console.log(`Creating call with Call Connection: ${callConnectionId}.`);

  // hang up call once answered
  await callConnection.hangUp(true);
}

main().catch((error) => {
  console.error("Encountered an error in create call operation: ", error);
  process.exit(1);
});

module.exports = { main };
