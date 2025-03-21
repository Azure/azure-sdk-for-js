// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import {
  Recorder,
  assertEnvironmentVariable,
  isRecordMode,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { generateToken } from "./connectionUtils.js";
import type { CommunicationIdentityClientOptions } from "@azure/communication-identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import type {
  CommunicationUserIdentifier,
  CommunicationIdentifier,
} from "@azure/communication-common";
import {
  serializeCommunicationIdentifier,
  isPhoneNumberIdentifier,
  createIdentifierFromRawId,
} from "@azure/communication-common";
import type { CallAutomationClientOptions, CallAutomationEvent } from "../../src/index.js";
import { CallAutomationClient, parseCallAutomationEvent } from "../../src/index.js";
import type { CommunicationIdentifierModel } from "../../src/generated/src/index.js";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import type {
  ServiceBusReceiver,
  ServiceBusReceivedMessage,
  ProcessErrorArgs,
} from "@azure/service-bus";
import { ServiceBusClient } from "@azure/service-bus";
import type { PhoneNumbersClientOptions } from "@azure/communication-phone-numbers";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import { assert } from "vitest";

const envSetupForPlayback: Record<string, string> = {
  COMMUNICATION_SERVICE_ENDPOINT: "https://Sanitized",
  DISPATCHER_ENDPOINT: "https://Sanitized",
  SERVICEBUS_FQDN: "redacted.servicebus.windows.net",
  FILE_SOURCE_URL: "https:///Sanitized/audio/test.wav",
  TRANSPORT_URL: "https://Sanitized",
  COGNITIVE_SERVICE_ENDPOINT: "https://Sanitized",
};

const fakeToken = generateToken();
const dispatcherEndpoint = assertEnvironmentVariable("DISPATCHER_ENDPOINT");
const serviceBusString = assertEnvironmentVariable("SERVICEBUS_FQDN");
export const fileSourceUrl = assertEnvironmentVariable("FILE_SOURCE_URL");
export const transportUrl = assertEnvironmentVariable("TRANSPORT_URL");
export const cognitiveServiceEndpoint = assertEnvironmentVariable("COGNITIVE_SERVICE_ENDPOINT");

export const dispatcherCallback: string = dispatcherEndpoint + "/api/servicebuscallback/events";
export const dummyFileSource: string = !isPlaybackMode()
  ? "https://dummy.com/dummyurl.wav"
  : "https://Sanitized/dummyurl.wav";
export const serviceBusReceivers: Map<string, ServiceBusReceiver> = new Map<
  string,
  ServiceBusReceiver
>();
export const incomingCallContexts: Map<string, string> = new Map<string, string>();
export const events: Map<string, Map<string, CallAutomationEvent>> = new Map<
  string,
  Map<string, CallAutomationEvent>
>();
export const eventsToPersist: string[] = [];
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

function removeAllNonChar(input: string): string {
  const regex = new RegExp("[^a-zA-Z0-9_-]", "g");
  return input.replace(regex, "");
}

export function parseIdsFromIdentifier(identifier: CommunicationIdentifier): string {
  const communicationIdentifierModel: CommunicationIdentifierModel =
    serializeCommunicationIdentifier(identifier);
  assert.isDefined(communicationIdentifierModel?.rawId);
  if (isPhoneNumberIdentifier(identifier)) {
    return communicationIdentifierModel?.rawId
      ? removeAllNonChar(communicationIdentifierModel.rawId)
      : "";
  } else {
    return communicationIdentifierModel?.rawId
      ? removeAllNonChar(communicationIdentifierModel.rawId)
      : "";
  }
}

function createServiceBusClient(): ServiceBusClient {
  const credential = createTestCredential();
  return new ServiceBusClient(serviceBusString, credential);
}

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    bodyKeySanitizers: [
      {
        jsonPath: "$.accessToken.token",
        value: fakeToken,
      },
      {
        jsonPath: "$..incomingCallContext",
        value: "Sanitized",
      },
      {
        jsonPath: "$..serverCallId",
        value: "Sanitized",
      },
    ],
    generalSanitizers: [
      {
        regex: true,
        target: "[1]{1}[0-9]{10}",
        value: "18880001111",
      },
      {
        regex: true,
        target: "https://[^/]+/",
        value: "https://Sanitized/",
      },
      {
        regex: true,
        target:
          "[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}_[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}",
        value: "00000000-0000-0000-0000-000000000000_00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export async function createRecorder(context: TestInfo | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export async function createTestUser(recorder: Recorder): Promise<CommunicationUserIdentifier> {
  const identityClient = new CommunicationIdentityClient(
    assertEnvironmentVariable("COMMUNICATION_SERVICE_ENDPOINT"),
    createTestCredential(),
    recorder.configureClientOptions({}) as CommunicationIdentityClientOptions,
  );
  return identityClient.createUser();
}

export function createCallAutomationClient(
  recorder: Recorder,
  sourceIdentity: CommunicationUserIdentifier,
): CallAutomationClient {
  const options: CallAutomationClientOptions = {
    sourceIdentity: sourceIdentity,
  };
  return new CallAutomationClient(
    assertEnvironmentVariable("COMMUNICATION_SERVICE_ENDPOINT"),
    createTestCredential(),
    recorder.configureClientOptions(options),
  );
}

async function eventBodyHandler(body: any): Promise<void> {
  if (body.incomingCallContext) {
    const incomingCallContext: string = body.incomingCallContext;
    const callerRawId = createIdentifierFromRawId(body.from.rawId);
    const calleeRawId = createIdentifierFromRawId(body.to.rawId);
    const key = parseIdsFromIdentifier(callerRawId) + parseIdsFromIdentifier(calleeRawId);
    incomingCallContexts.set(key, incomingCallContext);
  } else {
    const event = parseCallAutomationEvent(body);
    if (event.callConnectionId) {
      if (events.has(event.callConnectionId)) {
        events.get(event.callConnectionId)?.set(event.kind, event);
      } else {
        const temp: Map<string, CallAutomationEvent> = new Map<string, CallAutomationEvent>();
        temp.set(event.kind, event);
        events.set(event.callConnectionId, temp);
      }
    }
  }
}

export async function serviceBusWithNewCall(
  caller: CommunicationIdentifier,
  receiver: CommunicationIdentifier,
): Promise<string> {
  const callerId: string = parseIdsFromIdentifier(caller);
  const receiverId: string = parseIdsFromIdentifier(receiver);
  const uniqueId: string = callerId + receiverId;

  if (!isPlaybackMode()) {
    // subscribe to event dispatcher
    const dispatcherUrl: string =
      dispatcherEndpoint + `/api/servicebuscallback/subscribe?q=${uniqueId}`;
    try {
      const client = createDefaultHttpClient();
      const request = createPipelineRequest({
        url: dispatcherUrl,
        method: "POST",
        body: JSON.stringify({}),
        headers: createHttpHeaders({
          cookie: "",
        }),
      });
      request.allowInsecureConnection = true;
      await client.sendRequest(request);
    } catch (e) {
      console.log("Error occurred at posting to dispatcher", e);
    }

    // create a service bus processor
    const serviceBusClient = createServiceBusClient();
    const serviceBusReceiver: ServiceBusReceiver = serviceBusClient.createReceiver(uniqueId);

    // function to handle messages
    const messageHandler = async (messageReceived: ServiceBusReceivedMessage): Promise<void> => {
      if (isRecordMode()) {
        const messageInString: string = JSON.stringify(messageReceived.body);
        eventsToPersist.push(messageInString);
      }
      await eventBodyHandler(messageReceived.body);
    };

    // function to handle any errors
    const errorHandler = async (error: ProcessErrorArgs): Promise<void> => {
      console.log(error);
    };

    // subscribe and specify the message and error handlers
    serviceBusReceiver.subscribe({
      processMessage: messageHandler,
      processError: errorHandler,
    });

    serviceBusReceivers.set(uniqueId, serviceBusReceiver);
  }
  return uniqueId;
}

export async function waitForIncomingCallContext(
  uniqueId: string,
  timeOut: number,
): Promise<string | undefined> {
  if (!isPlaybackMode()) {
    let currentTime = new Date().getTime();
    const timeOutTime = currentTime + timeOut;
    while (currentTime < timeOutTime) {
      const incomingCallContext = incomingCallContexts.get(uniqueId);
      if (incomingCallContext) {
        return incomingCallContext;
      }
      await sleep(1000);
      currentTime += 1000;
    }
  }
  return "";
}

export async function waitForEvent(
  eventName: string,
  callConnectionId: string,
  timeOut: number,
): Promise<CallAutomationEvent | undefined> {
  let currentTime = new Date().getTime();
  const timeOutTime = currentTime + timeOut;
  while (currentTime < timeOutTime) {
    const eventGroup = events.get(callConnectionId);
    if (eventGroup && eventGroup.has(eventName)) {
      return eventGroup.get(eventName);
    }
    await sleep(1000);
    currentTime += 1000;
  }
  return undefined;
}

export function persistEvents(testName: string): void {
  if (isRecordMode()) {
    // sanitize the events values accordingly
    const sanitizedEvents: any[] = [];
    for (const event of eventsToPersist) {
      const jsonData = JSON.parse(event);
      sanitizeObject(jsonData, ["rawId", "id", "incomingCallContext", "value", "serverCallId"]);
      sanitizedEvents.push(jsonData);
    }

    const jsonArrayString = JSON.stringify(sanitizedEvents, null, 2);
    fs.writeFile(`recordings\\${testName}.json`, jsonArrayString, (err) => {
      if (err) throw err;
    });
    // Clear the array for next test to use
    while (eventsToPersist.length > 0) {
      eventsToPersist.pop();
    }
  }
}

export async function loadPersistedEvents(testName: string): Promise<void> {
  if (isPlaybackMode()) {
    let data: string = "";
    // Different OS has different file system path format.
    try {
      data = fs.readFileSync(`recordings\\${testName}.json`, "utf-8");
    } catch {
      console.log("original path doesn't work");
      data = fs.readFileSync(`recordings/${testName}.json`, "utf-8");
    }
    const loadedEvents = JSON.parse(data);

    loadedEvents.forEach(async (oneEvent: any) => {
      await eventBodyHandler(oneEvent);
    });
  }
}

export async function getPhoneNumbers(recorder: Recorder): Promise<string[]> {
  const phoneNumbersClient = new PhoneNumbersClient(
    assertEnvironmentVariable("COMMUNICATION_SERVICE_ENDPOINT"),
    createTestCredential(),
    recorder.configureClientOptions({}) as PhoneNumbersClientOptions,
  );
  const purchasedPhoneNumbers = phoneNumbersClient.listPurchasedPhoneNumbers();
  const phoneNumbers: string[] = [];
  for await (const purchasedNumber of purchasedPhoneNumbers) {
    phoneNumbers.push(purchasedNumber.phoneNumber);
  }
  return phoneNumbers;
}

function sanitizeObject(obj: any, keysToSanitize: string[]): void {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      sanitizeObject(obj[key], keysToSanitize);
    } else {
      // Replace keys in the keysToSanitize array with 'sanitized'
      if (keysToSanitize.includes(key)) {
        obj[key] = "sanitized";
      }
    }
  }
}
