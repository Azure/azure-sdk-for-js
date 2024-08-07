// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { isNode } from "@azure/core-util";
import fs from "fs";
import {
  Recorder,
  RecorderStartOptions,
  env,
  assertEnvironmentVariable,
  isRecordMode,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { generateToken } from "./connectionUtils";
import {
  CommunicationIdentityClient,
  CommunicationIdentityClientOptions,
} from "@azure/communication-identity";
import {
  CommunicationUserIdentifier,
  CommunicationIdentifier,
  serializeCommunicationIdentifier,
  isPhoneNumberIdentifier,
  createIdentifierFromRawId,
  CommunicationIdentifierKind,
} from "@azure/communication-common";
import {
  CallAutomationClient,
  CallAutomationClientOptions,
  CallAutomationEvent,
  parseCallAutomationEvent,
} from "../../src";
import { CommunicationIdentifierModel } from "../../src/generated/src";
import { assert } from "chai";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import {
  ServiceBusClient,
  ServiceBusReceiver,
  ServiceBusReceivedMessage,
  ProcessErrorArgs,
} from "@azure/service-bus";
import { PhoneNumbersClient, PhoneNumbersClientOptions } from "@azure/communication-phone-numbers";

if (isNode) {
  dotenv.config();
}

const envSetupForPlayback: Record<string, string> = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=redacted",
  DISPATCHER_ENDPOINT: "https://redacted.azurewebsites.net",
  SERVICEBUS_STRING:
    "Endpoint=sb://REDACTED.servicebus.windows.net/;SharedAccessKeyName=REDACTED;SharedAccessKey=REDACTED",
  FILE_SOURCE_URL: "https://example.com/audio/test.wav",
};

const fakeToken = generateToken();
const dispatcherEndpoint: string = !isPlaybackMode()
  ? (env["DISPATCHER_ENDPOINT"] ?? envSetupForPlayback["DISPATCHER_ENDPOINT"])
  : envSetupForPlayback["DISPATCHER_ENDPOINT"];
const serviceBusConnectionString: string = !isPlaybackMode()
  ? (env["SERVICEBUS_STRING"] ?? envSetupForPlayback["DISPATCHER_ENDPOINT"])
  : envSetupForPlayback["SERVICEBUS_STRING"];
export const fileSourceUrl: string = !isPlaybackMode()
  ? (env["FILE_SOURCE_URL"] ?? envSetupForPlayback["DISPATCHER_ENDPOINT"])
  : envSetupForPlayback["FILE_SOURCE_URL"];

export const dispatcherCallback: string = dispatcherEndpoint + "/api/servicebuscallback/events";
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

function encodePhoneNumber(input: string): string {
  // Enocding + to UTF-16 to match unique id with Service bus queue
  return input.replace("+", "\\u002B");
}

export function parseIdsFromIdentifier(identifier: CommunicationIdentifier): string {
  const communicationIdentifierModel: CommunicationIdentifierModel =
    serializeCommunicationIdentifier(identifier);
  assert.isDefined(communicationIdentifierModel?.rawId);
  if (isPhoneNumberIdentifier(identifier)) {
    return communicationIdentifierModel?.rawId
      ? removeAllNonChar(encodePhoneNumber(communicationIdentifierModel.rawId))
      : "";
  } else {
    return communicationIdentifierModel?.rawId
      ? removeAllNonChar(communicationIdentifierModel.rawId)
      : "";
  }
}

function createServiceBusClient(): ServiceBusClient {
  return new ServiceBusClient(serviceBusConnectionString);
}

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    connectionStringSanitizers: [
      {
        fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
        actualConnString: env["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"] || undefined,
      },
    ],
    bodyKeySanitizers: [{ jsonPath: "$.accessToken.token", value: fakeToken }],
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export async function createTestUser(recorder: Recorder): Promise<CommunicationUserIdentifier> {
  const identityClient = new CommunicationIdentityClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"),
    recorder.configureClientOptions({}) as CommunicationIdentityClientOptions,
  );
  return identityClient.createUser();
}

export function createCallAutomationClient(
  recorder: Recorder,
  sourceIdentity: CommunicationUserIdentifier,
): CallAutomationClient {
  const connectionString = assertEnvironmentVariable(
    "COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING",
  );
  const options: CallAutomationClientOptions = {
    sourceIdentity: sourceIdentity,
  };
  return new CallAutomationClient(connectionString, recorder.configureClientOptions(options));
}

async function eventBodyHandler(body: any): Promise<void> {
  if (body.incomingCallContext) {
    const incomingCallContext: string = body.incomingCallContext;
    const callerRawId: CommunicationIdentifierKind = createIdentifierFromRawId(body.from.rawId);
    const calleeRawId: CommunicationIdentifierKind = createIdentifierFromRawId(body.to.rawId);
    const key: string = parseIdsFromIdentifier(callerRawId) + parseIdsFromIdentifier(calleeRawId);
    incomingCallContexts.set(key, incomingCallContext);
  } else {
    const event: CallAutomationEvent = await parseCallAutomationEvent(body);
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
    const sanatizedEvents: any[] = [];
    for (const event of eventsToPersist) {
      const jsonData = JSON.parse(event);
      sanitizeObject(jsonData, [
        "rawId",
        "id",
        "incomingCallContext",
        "value",
        "correlationId",
        "serverCallId",
      ]);
      sanatizedEvents.push(jsonData);
    }

    const jsonArrayString = JSON.stringify(sanatizedEvents, null, 2);
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
    // Different OS has differnt file system path format.
    try {
      data = fs.readFileSync(`recordings\\${testName}.json`, "utf-8");
    } catch (e) {
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
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"),
    recorder.configureClientOptions({}) as PhoneNumbersClientOptions,
  );
  const purchasedPhoneNumbers = phoneNumbersClient.listPurchasedPhoneNumbers();
  const phoneNumbers: string[] = [];
  for await (const purchasedNumber of purchasedPhoneNumbers) {
    phoneNumbers.push(purchasedNumber.phoneNumber);
  }
  return phoneNumbers;
}

function sanitizeObject(obj: any, keysToSanitize: string[]) {
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
