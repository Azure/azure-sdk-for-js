// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CallAutomationClient, FileSource } from "@azure/communication-call-automation";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    // Your unique Azure Communication service endpoint
    const credential = new DefaultAzureCredential();
    const endpointUrl = "<ENDPOINT>";
    const callAutomationClient = new CallAutomationClient(endpointUrl, credential);
  });

  it("ReadmeSampleCreateCall", async () => {
    // Your unique Azure Communication service endpoint
    const credential = new DefaultAzureCredential();
    const endpointUrl = "<ENDPOINT>";
    const callAutomationClient = new CallAutomationClient(endpointUrl, credential);
    // @ts-preserve-whitespace
    // target endpoint for ACS User
    const target = {
      communicationUserId: "8:acs:...",
    };
    // @ts-preserve-whitespace
    // make invitation
    const callInvite = {
      targetParticipant: target,
    };
    // @ts-preserve-whitespace
    // callback url to receive callback events
    const callbackUrl = "https://<MY-EVENT-HANDLER-URL>/events";
    // @ts-preserve-whitespace
    // send out the invitation, creating call
    const response = await callAutomationClient.createCall(callInvite, callbackUrl);
  });

  it("ReadmeSamplePlayMedia", async () => {
    // Your unique Azure Communication service endpoint
    const credential = new DefaultAzureCredential();
    const endpointUrl = "<ENDPOINT>";
    const callAutomationClient = new CallAutomationClient(endpointUrl, credential);
    // @ts-preserve-whitespace
    const target = { communicationUserId: "8:acs:..." };
    const callInvite = { targetParticipant: target };
    const callbackUrl = "https://<MY-EVENT-HANDLER-URL>/events";
    // @ts-preserve-whitespace
    const createCallResult = await callAutomationClient.createCall(callInvite, callbackUrl);
    const callConnection = createCallResult.callConnection;
    // from callconnection of response above, play media of media file
    const myFile: FileSource = { url: "https://<FILE-SOURCE>/<SOME-FILE>.wav", kind: "fileSource" };
    const response = await callConnection.getCallMedia().playToAll([myFile]);
  });

  it("ReadmeSampleEventProcessor", async () => {
    // Your unique Azure Communication service endpoint
    const credential = new DefaultAzureCredential();
    const endpointUrl = "<ENDPOINT>";
    const callAutomationClient = new CallAutomationClient(endpointUrl, credential);
    // @ts-preserve-whitespace
    const eventProcessor = callAutomationClient.getEventProcessor();
    eventProcessor.processEvents("CallConnected");
  });

  it("ReadmeSampleEventProcessorExample", async () => {
    // Your unique Azure Communication service endpoint
    const credential = new DefaultAzureCredential();
    const endpointUrl = "<ENDPOINT>";
    const callAutomationClient = new CallAutomationClient(endpointUrl, credential);
    // @ts-preserve-whitespace
    // send out the invitation, creating call
    const target = { communicationUserId: "8:acs:..." };
    const callInvite = { targetParticipant: target };
    const callbackUrl = "https://<MY-EVENT-HANDLER-URL>/events";
    const callResult = await callAutomationClient.createCall(callInvite, callbackUrl);
    // @ts-preserve-whitespace
    // giving 30 seconds timeout for waiting on createCall's event, 'CallConnected'
    const createCallEventResult = await callResult.waitForEventProcessor(undefined, 30000);
    // once this returns, call is now established!
    // @ts-preserve-whitespace
    // check if it was successful
    if (createCallEventResult.isSuccess) {
      // work with callConnected event
      const callConnectedEvent = createCallEventResult.successResult!;
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
