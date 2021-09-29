// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationOptions } from "@azure/core-http";
import { PhoneNumberIdentifier } from "@azure/communication-common";

export { PlayAudioResult } from "./generated/src/models";

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
export interface CreateCallOptions extends OperationOptions {
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

export interface PlayAudioOptions extends OperationOptions {
  /** The flag indicating whether audio file needs to be played in loop or not. */
  loop: boolean;
  /** The value to identify context of the operation. */
  operationContext: string;
  /** An id for the media in the AudioFileUri, using which we cache the media resource. */
  audioFileId: string;
  /** The callback Uri to receive PlayAudio status notifications. */
  callbackUri: string;
}

/**
 * Options to add participant to the call.
 */
export type AddParticipantOptions = OperationOptions;

/**
 * Options to remove participant from the call.
 */
export type RemoveParticipantOptions = OperationOptions;

/**
 * Options to cancel media operation in the call.
 */
export type CancelMediaOperationOptions = OperationOptions;

/**
 * Options to hang up a call.
 */
export type HangUpOptions = OperationOptions

/**
 * Options to cancel all media operations.
 */
export type CancelAllMediaOperationsOptions = OperationOptions

/**
 * Options to transfer call.
 */
 export type TransferCallOptions = OperationOptions

/**
 * Call Locator.
 */
export type CallLocator =
| GroupCallLocator
| ServerCallLocator;


 /**
 * The group call locator.
 */
export interface GroupCallLocator {
  /**
   * The group call id.
   */
   groupCallId: string;
}


 /**
 * An Azure Communication user.
 */
export interface ServerCallLocator {
  /**
   * The server call id.
   */
    serverCallId: string;
}

/**
 * Tests an locator to determine whether it implements GroupCallLocator.
 *
 * @param locator - The assumed GroupCallLocator to be tested.
 */
 export const isGroupCallLocator = (
  locator: CallLocator
): locator is GroupCallLocator => {
  return typeof (locator as any).groupCallId === "string";
};

/**
 * Tests an locator to determine whether it implements ServerCallLocator.
 *
 * @param locator - The assumed ServerCallLocator to be tested.
 */
 export const isServerCallLocator = (
  locator: CallLocator
): locator is ServerCallLocator => {
  return typeof (locator as any).serverCallId === "string";
};

/**
 * The CallLocatorKind is a discriminated union that adds a property `kind` to an CallLocator.
 */
 export type CallLocatorKind =
 | GroupCallLocatorKind
 | ServerCallLocatorKind;

/**
 * LocatorKind for a GroupCallLocator.
 */
export interface GroupCallLocatorKind extends GroupCallLocator {
  /**
   * The locator kind.
   */
  kind: "groupCall";
}

/**
 * LocatorKind for ServerCallLocator.
 */
export interface ServerCallLocatorKind extends ServerCallLocator {
  /**
   * The locator kind.
   */
  kind: "serverCall";
}

/**
 * Returns the CallLocatorKind for a given CallLocator. Returns undefined if the kind couldn't be inferred.
 *
 * @param locator - The locator whose kind is to be inferred.
 */
export const getLocatorKind = (
  locator: CallLocator
): CallLocatorKind => {
  if (isGroupCallLocator(locator)) {
    return { ...locator, kind: "groupCall" };
  }
  if (isServerCallLocator(locator)) {
    return { ...locator, kind: "serverCall" };
  }
  throw "unknow CallLocator type.";
};
