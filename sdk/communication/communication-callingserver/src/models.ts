// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationOptions } from "@azure/core-http";
import { PhoneNumberIdentifier } from "@azure/communication-common";

export {
  PlayAudioResult
} from "./generated/src/models";


/** Known values of {@link MediaType} that the service accepts. */
export const enum MediaType {
  Audio = "audio",
  Video = "video"
}

/** Known values of {@link EventSubscriptionType} that the service accepts. */
export const enum EventSubscriptionType {
  ParticipantsUpdated = "participantsUpdated",
  DtmfReceived = "dtmfReceived"
}

/**
 * Options to create a call.
 */
export interface CreateCallConnectionOptions extends OperationOptions {
    /** The alternate identity of the source of the call if dialing out to a pstn number */
    alternateCallerId?: PhoneNumberIdentifier;
    /** The subject. */
    subject?: string;
    /** The callback URI. */
    callbackUri: string;
    /** The requested modalities. */
    requestedMediaTypes: MediaType[];
    /** The requested call events to subscribe to. */
    requestedCallEvents: EventSubscriptionType[];
}

/**
 * Options to join a call.
 */
export interface JoinCallOptions extends OperationOptions {
    /** The subject. */
    subject?: string;
    /** The callback URI. */
    callbackUri: string;
    /** The requested modalities. */
    requestedMediaTypes?: MediaType[];
    /** The requested call events to subscribe to. */
    requestedCallEvents?: EventSubscriptionType[];
}

/**
 * Options to hang up a call.
 */
export type HangUpOptions = OperationOptions;

/**
 * Options to play audio.
 */
export type PlayAudioOptions = OperationOptions;
