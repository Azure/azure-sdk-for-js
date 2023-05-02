// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSerializer } from "@azure/core-client";

import { communicationIdentifierConverter, callParticipantConverter } from "./utli/converters";

import {
  CallAutomationEvent,
  AddParticipantSucceededEventData,
  AddParticipantFailedEventData,
  CallConnectedEventData,
  CallDisconnectedEventData,
  CallTransferAcceptedEventData,
  CallTransferFailedEventData,
  ParticipantsUpdatedEventData,
  RecordingStateChangedEventData,
  PlayCompletedEventData,
  PlayFailedEventData,
  PlayCanceledEventData,
  RecognizeCompletedEventData,
  RecognizeCanceledEventData,
  RecognizeFailedEventData,
  RemoveParticipantSucceededEventData,
  RemoveParticipantFailedEventData,
} from "./models/events";

import { CloudEventMapper } from "./models/mapper";
import { CallParticipantInternal } from "./generated/src";

const serializer = createSerializer();

/**
 * Helper function for parsing Acs callback events.
 */
export function parseCallAutomationEvent(
  encodedEvents: string | Record<string, unknown>
): CallAutomationEvent {
  const decodedInput = parseAndWrap(encodedEvents);

  // parse cloudevent
  const deserialized = serializer.deserialize(CloudEventMapper, decodedInput, "");
  const data = deserialized.data;
  const eventType = deserialized.type;

  // get proper callbackevent and its parser
  let callbackEvent: CallAutomationEvent;
  let parsed: any = data;
  switch (eventType) {
    case "Microsoft.Communication.AddParticipantSucceeded":
      callbackEvent = { kind: "AddParticipantSucceeded" } as AddParticipantSucceededEventData;
      parsed.participant = communicationIdentifierConverter(data.participant);
      break;
    case "Microsoft.Communication.AddParticipantFailed":
      callbackEvent = { kind: "AddParticipantFailed" } as AddParticipantFailedEventData;
      parsed.participant = communicationIdentifierConverter(data.participant);
      break;
    case "Microsoft.Communication.RemoveParticipantSucceeded":
      callbackEvent = { kind: "RemoveParticipantSucceeded" } as RemoveParticipantSucceededEventData;
      parsed.participant = communicationIdentifierConverter(data.participant);
      break;
    case "Microsoft.Communication.RemoveParticipantFailed":
      callbackEvent = { kind: "RemoveParticipantFailed" } as RemoveParticipantFailedEventData;
      parsed.participant = communicationIdentifierConverter(data.participant);
      break;
    case "Microsoft.Communication.CallConnected":
      callbackEvent = { kind: "CallConnected" } as CallConnectedEventData;
      break;
    case "Microsoft.Communication.CallDisconnected":
      callbackEvent = { kind: "CallDisconnected" } as CallDisconnectedEventData;
      break;
    case "Microsoft.Communication.CallTransferAccepted":
      callbackEvent = { kind: "CallTransferAccepted" } as CallTransferAcceptedEventData;
      break;
    case "Microsoft.Communication.CallTransferFailed":
      callbackEvent = { kind: "CallTransferFailed" } as CallTransferFailedEventData;
      break;
    case "Microsoft.Communication.ParticipantsUpdated":
      callbackEvent = { kind: "ParticipantsUpdated" } as ParticipantsUpdatedEventData;
      parsed = participantsParserForEvent(data);
      break;
    case "Microsoft.Communication.RecordingStateChanged":
      callbackEvent = { kind: "RecordingStateChanged" } as RecordingStateChangedEventData;
      break;
    case "Microsoft.Communication.PlayCompleted":
      callbackEvent = { kind: "PlayCompleted" } as PlayCompletedEventData;
      break;
    case "Microsoft.Communication.PlayFailed":
      callbackEvent = { kind: "PlayFailed" } as PlayFailedEventData;
      break;
    case "Microsoft.Communication.PlayCanceled":
      callbackEvent = { kind: "PlayCanceled" } as PlayCanceledEventData;
      break;
    case "Microsoft.Communication.RecognizeCompleted":
      callbackEvent = { kind: "RecognizeCompleted" } as RecognizeCompletedEventData;
      break;
    case "Microsoft.Communication.RecognizeCanceled":
      callbackEvent = { kind: "RecognizeCanceled" } as RecognizeCanceledEventData;
      break;
    case "Microsoft.Communication.RecognizeFailed":
      callbackEvent = { kind: "RecognizeFailed" } as RecognizeFailedEventData;
      break;
    default:
      throw new TypeError(`Unknown Call Automation Event type: ${eventType}`);
  }

  return { ...parsed, ...callbackEvent } as CallAutomationEvent;
}

function parseAndWrap(jsonStringOrObject: string | Record<string, unknown>): any {
  if (typeof jsonStringOrObject === "string") {
    const o = JSON.parse(jsonStringOrObject);
    if (Array.isArray(o)) {
      if (o.length === 0) {
        throw Error("Empty event array.");
      }
      return o[0];
    } else {
      return o;
    }
  }

  if (Array.isArray(jsonStringOrObject)) {
    if (jsonStringOrObject.length === 0) {
      throw Error("Empty event array.");
    }
    return jsonStringOrObject[0];
  } else {
    return jsonStringOrObject;
  }
}

function participantsParserForEvent(data: any): any {
  const { participants, ...rest } = data;
  return {
    ...rest,
    participants: participants?.map((participant: CallParticipantInternal) =>
      callParticipantConverter(participant)
    ),
  };
}
