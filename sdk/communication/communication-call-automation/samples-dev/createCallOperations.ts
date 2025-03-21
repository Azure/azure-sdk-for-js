// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary CreateCall using CallAutomationClient
 */

import type { CallInvite } from "@azure/communication-call-automation";
import { CallAutomationClient } from "@azure/communication-call-automation";
import {
  serializeCommunicationIdentifier,
  type CommunicationIdentifier,
} from "@azure/communication-common";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { DefaultAzureCredential } from "@azure/identity";
import { getClient } from "@azure-rest/core-client";
import { delay, ServiceBusClient } from "@azure/service-bus";

// Load the .env file (you will need to set these environment variables)
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint =
    process.env["COMMUNICATION_SERVICE_ENDPOINT"] ||
    "https://<resource-name>.communication.azure.com/";
  const dispatchUri = process.env["DISPATCHER_ENDPOINT"] || "https://<my-event-endpoint>";
  const serviceBusFQNS = process.env["SERVICEBUS_FQDN"] || "<connection-string>";

  const credential = new DefaultAzureCredential();
  const identityClient = new CommunicationIdentityClient(endpoint, credential);
  const caller = await identityClient.createUser();
  const receiver = await identityClient.createUser();

  const callerId = parseIdsFromIdentifier(caller);
  const receiverId = parseIdsFromIdentifier(receiver);
  const uniqueId = callerId + receiverId;

  // subscribe to event dispatcher
  await getClient(dispatchUri, { allowInsecureConnection: true })
    .pathUnchecked(`/api/servicebuscallback/subscribe?q=${uniqueId}`)
    .post({ body: {}, headers: { cookie: "" } });

  const sbClient = new ServiceBusClient(serviceBusFQNS, credential);
  const serviceBusReceiver = sbClient.createReceiver(uniqueId);
  serviceBusReceiver.subscribe({
    processMessage: async (msg) => {
      console.log(msg.body);
    },
    processError: async (err) => {
      console.log(err);
    },
  });

  // create call automation client
  const callAutomationClient = new CallAutomationClient(endpoint, credential);

  // create invitation
  const callInvite: CallInvite = { targetParticipant: caller };

  // Create Call
  console.log("Creating call...");
  const res = await callAutomationClient.createCall(
    callInvite,
    dispatchUri,
  );

  const callConnectionId = res.callConnectionProperties.callConnectionId;

  console.log(`Creating call with Call Connection: ${callConnectionId}.`);

  await res.waitForEventProcessor(undefined, 20000);

  // hang up call once answered
  await res.callConnection.hangUp(true);
  await delay(15000);
  await serviceBusReceiver.close();
}

main().catch((error) => {
  console.error("Encountered an error in create call operation: ", error);
  process.exit(1);
});

export function parseIdsFromIdentifier(identifier: CommunicationIdentifier): string {
  const communicationIdentifierModel = serializeCommunicationIdentifier(identifier);
  if (!communicationIdentifierModel?.rawId) {
    return "";
  }
  const regex = new RegExp("[^a-zA-Z0-9_-]", "g");
  return communicationIdentifierModel.rawId.replace(regex, "");
}
