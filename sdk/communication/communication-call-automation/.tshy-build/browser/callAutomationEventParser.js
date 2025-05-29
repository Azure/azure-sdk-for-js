// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
import { createSerializer } from "@azure/core-client";
import { communicationIdentifierConverter, callParticipantConverter } from "./utli/converters.js";
import { CloudEventMapper } from "./models/mapper.js";
const serializer = createSerializer();
/**
 * Helper function for parsing Acs callback events.
 */
export function parseCallAutomationEvent(encodedEvents) {
    const decodedInput = parseAndWrap(encodedEvents);
    // parse cloudevent
    const deserialized = serializer.deserialize(CloudEventMapper, decodedInput, "");
    const data = deserialized.data;
    const eventType = deserialized.type;
    // get proper callbackevent and its parser
    let callbackEvent;
    let parsed = data;
    switch (eventType) {
        case "Microsoft.Communication.AddParticipantSucceeded":
            callbackEvent = { kind: "AddParticipantSucceeded" };
            parsed.participant = communicationIdentifierConverter(data.participant);
            break;
        case "Microsoft.Communication.AddParticipantFailed":
            callbackEvent = { kind: "AddParticipantFailed" };
            parsed.participant = communicationIdentifierConverter(data.participant);
            break;
        case "Microsoft.Communication.RemoveParticipantSucceeded":
            callbackEvent = { kind: "RemoveParticipantSucceeded" };
            parsed.participant = communicationIdentifierConverter(data.participant);
            break;
        case "Microsoft.Communication.RemoveParticipantFailed":
            callbackEvent = { kind: "RemoveParticipantFailed" };
            parsed.participant = communicationIdentifierConverter(data.participant);
            break;
        case "Microsoft.Communication.CallConnected":
            callbackEvent = { kind: "CallConnected" };
            break;
        case "Microsoft.Communication.IncomingCall":
            callbackEvent = { kind: "IncomingCall" };
            break;
        case "Microsoft.Communication.CallDisconnected":
            callbackEvent = { kind: "CallDisconnected" };
            break;
        case "Microsoft.Communication.CallTransferAccepted":
            callbackEvent = { kind: "CallTransferAccepted" };
            break;
        case "Microsoft.Communication.CallTransferFailed":
            callbackEvent = { kind: "CallTransferFailed" };
            break;
        case "Microsoft.Communication.ParticipantsUpdated":
            callbackEvent = { kind: "ParticipantsUpdated" };
            parsed = participantsParserForEvent(data);
            break;
        case "Microsoft.Communication.RecordingStateChanged":
            callbackEvent = { kind: "RecordingStateChanged" };
            break;
        case "Microsoft.Communication.PlayCompleted":
            callbackEvent = { kind: "PlayCompleted" };
            break;
        case "Microsoft.Communication.PlayFailed":
            callbackEvent = { kind: "PlayFailed" };
            break;
        case "Microsoft.Communication.PlayCanceled":
            callbackEvent = { kind: "PlayCanceled" };
            break;
        case "Microsoft.Communication.RecognizeCompleted":
            callbackEvent = { kind: "RecognizeCompleted" };
            break;
        case "Microsoft.Communication.RecognizeCanceled":
            callbackEvent = { kind: "RecognizeCanceled" };
            break;
        case "Microsoft.Communication.RecognizeFailed":
            callbackEvent = { kind: "RecognizeFailed" };
            break;
        case "Microsoft.Communication.ContinuousDtmfRecognitionToneReceived":
            callbackEvent = {
                kind: "ContinuousDtmfRecognitionToneReceived",
            };
            break;
        case "Microsoft.Communication.ContinuousDtmfRecognitionToneFailed":
            callbackEvent = {
                kind: "ContinuousDtmfRecognitionToneFailed",
            };
            break;
        case "Microsoft.Communication.ContinuousDtmfRecognitionStopped":
            callbackEvent = {
                kind: "ContinuousDtmfRecognitionStopped",
            };
            break;
        case "Microsoft.Communication.SendDtmfTonesCompleted":
            callbackEvent = { kind: "SendDtmfTonesCompleted" };
            break;
        case "Microsoft.Communication.SendDtmfTonesFailed":
            callbackEvent = { kind: "SendDtmfTonesFailed" };
            break;
        case "Microsoft.Communication.CancelAddParticipantSucceeded":
            callbackEvent = { kind: "CancelAddParticipantSucceeded" };
            break;
        case "Microsoft.Communication.CancelAddParticipantFailed":
            callbackEvent = { kind: "CancelAddParticipantFailed" };
            break;
        case "Microsoft.Communication.TranscriptionStarted":
            callbackEvent = { kind: "TranscriptionStarted" };
            break;
        case "Microsoft.Communication.TranscriptionStopped":
            callbackEvent = { kind: "TranscriptionStopped" };
            break;
        case "Microsoft.Communication.TranscriptionUpdated":
            callbackEvent = { kind: "TranscriptionUpdated" };
            break;
        case "Microsoft.Communication.TranscriptionFailed":
            callbackEvent = { kind: "TranscriptionFailed" };
            break;
        case "Microsoft.Communication.CreateCallFailed":
            callbackEvent = { kind: "CreateCallFailed" };
            break;
        case "Microsoft.Communication.AnswerFailed":
            callbackEvent = { kind: "AnswerFailed" };
            break;
        case "Microsoft.Communication.HoldFailed":
            callbackEvent = { kind: "HoldFailed" };
            break;
        case "Microsoft.Communication.ConnectFailed":
            callbackEvent = { kind: "ConnectFailed" };
            break;
        case "Microsoft.Communication.MediaStreamingStarted":
            callbackEvent = { kind: "MediaStreamingStarted" };
            break;
        case "Microsoft.Communication.MediaStreamingStopped":
            callbackEvent = { kind: "MediaStreamingStopped" };
            break;
        case "Microsoft.Communication.MediaStreamingFailed":
            callbackEvent = { kind: "MediaStreamingFailed" };
            break;
        case "Microsoft.Communication.StartRecordingFailed":
            callbackEvent = { kind: "StartRecordingFailed" };
            break;
        case "Microsoft.Communication.PlayStarted":
            callbackEvent = { kind: "PlayStarted" };
            break;
        case "Microsoft.Communication.PlayPaused":
            callbackEvent = { kind: "PlayPaused" };
            break;
        case "Microsoft.Communication.PlayResumed":
            callbackEvent = { kind: "PlayResumed" };
            break;
        case "Microsoft.Communication.HoldAudioStarted":
            callbackEvent = { kind: "HoldAudioStarted" };
            break;
        case "Microsoft.Communication.HoldAudioPaused":
            callbackEvent = { kind: "HoldAudioPaused" };
            break;
        case "Microsoft.Communication.HoldAudioResumed":
            callbackEvent = { kind: "HoldAudioResumed" };
            break;
        case "Microsoft.Communication.HoldAudioCompleted":
            callbackEvent = { kind: "HoldAudioCompleted" };
            break;
        default:
            throw new TypeError(`Unknown Call Automation Event type: ${eventType}`);
    }
    return Object.assign(Object.assign({}, parsed), callbackEvent);
}
function parseAndWrap(jsonStringOrObject) {
    if (typeof jsonStringOrObject === "string") {
        const o = JSON.parse(jsonStringOrObject);
        if (Array.isArray(o)) {
            if (o.length === 0) {
                throw Error("Empty event array.");
            }
            return o[0];
        }
        else {
            return o;
        }
    }
    if (Array.isArray(jsonStringOrObject)) {
        if (jsonStringOrObject.length === 0) {
            throw Error("Empty event array.");
        }
        return jsonStringOrObject[0];
    }
    else {
        return jsonStringOrObject;
    }
}
function participantsParserForEvent(data) {
    const { participants } = data, rest = __rest(data, ["participants"]);
    return Object.assign(Object.assign({}, rest), { participants: participants === null || participants === void 0 ? void 0 : participants.map((participant) => callParticipantConverter(participant)) });
}
//# sourceMappingURL=callAutomationEventParser.js.map