// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions, TransferProgressEvent } from "@azure/core-http";
import { PhoneNumberIdentifier } from "@azure/communication-common";

import {
  CallMediaType,
  CallRejectReason,
  CallingEventSubscriptionType,
  RecordingContentType,
  RecordingChannelType,
  RecordingFormatType
} from "./generated/src/";

export {
  CallLocatorKindModel,
  CallLocatorModel,
  CallMediaType,
  CallConnectionState,
  CallRecordingState,
  CallingEventSubscriptionType,
  CallingOperationStatus,
  CallingOperationResultDetails,
  CallRecordingProperties,
  PlayAudioResult,
  PlayAudioResultEvent,
  AddParticipantResult,
  StartCallRecordingResult,
  ToneReceivedEvent,
  AddParticipantResultEvent,
  CallConnectionStateChangedEvent,
  ToneValue,
  ToneInfo,
  RecordingContentType,
  RecordingChannelType,
  RecordingFormatType
} from "./generated/src/models";

/**
 * Options to create a call.
 */
export interface CreateCallConnectionOptions extends OperationOptions {
  /** The alternate identity of the source of the call if dialing out to a pstn number */
  alternateCallerId?: PhoneNumberIdentifier;
  /** The subject. */
  subject?: string;
  /** The callback URL. */
  callbackUrl: string;
  /** The requested modalities. */
  requestedMediaTypes: CallMediaType[];
  /** The requested call events to subscribe to. */
  requestedCallEvents: CallingEventSubscriptionType[];
}

/**
 * Options to join a call.
 */
export interface JoinCallOptions extends OperationOptions {
  /** The subject. */
  subject?: string;
  /** The callback URL. */
  callbackUrl: string;
  /** The requested modalities. */
  requestedMediaTypes?: CallMediaType[];
  /** The requested call events to subscribe to. */
  requestedCallEvents?: CallingEventSubscriptionType[];
}

/**
 * Options to play audio.
 */
export interface PlayAudioOptions extends OperationOptions {
  /** The flag indicating whether audio file needs to be played in loop or not. */
  loop: boolean;
  /** The value to identify context of the operation. */
  operationContext: string;
  /** An id for the media in the AudioUrl, using which we cache the media resource. */
  audioFileId: string;
  /** The callback Url to receive PlayAudio status notifications. */
  callbackUrl: string;
}

/**
 * Options to transfer call.
 */
export interface TransferToParticipantOptions extends OperationOptions {
  /** The alternate identity of the source of the call if dialing out to a pstn number */
  alternateCallerId?: PhoneNumberIdentifier;
  /** The user to user information. */
  userToUserInformation?: string;
  /** The value to identify context of the operation. */
  operationContext?: string;
}

/**
 * Options to transfer call.
 */
export interface TransferToCallOptions extends OperationOptions {
  /** The user to user information. */
  userToUserInformation?: string;
  /** The value to identify context of the operation. */
  operationContext?: string;
}

/**
 * Options to play audio to participant.
 */
export type PlayAudioToParticipantOptions = PlayAudioOptions;

/**
 * Options to add participant to the call.
 */
export interface AddParticipantOptions extends OperationOptions {
  /** The phone number identity to use when adding a pstn participant. */
  alternateCallerId?: PhoneNumberIdentifier;
  /** The operation context. */
  operationContext?: string;
}

/**
 * Options to answer call.
 */
export interface AnswerCallOptions extends OperationOptions {
  /** The callback url. */
  callbackUrl?: string;
  /** The requested modalities. */
  requestedMediaTypes?: CallMediaType[];
  /** The requested call events to subscribe to. */
  requestedCallEvents?: CallingEventSubscriptionType[];
}

/**
 * Options to reject call.
 */
export interface RejectCallOptions extends OperationOptions {
  /** The rejection reason. */
  callRejectReason?: CallRejectReason;
}

/**
 * Options to redirect call.
 */
export type RedirectCallOptions = OperationOptions;

/**
 * Options to mute the participant.
 */
export type MuteParticipantOptions = OperationOptions;

/**
 * Options to mute the participant.
 */
export type UnmuteParticipantOptions = OperationOptions;

/**
 * Options to get the participant.
 */
export type GetParticipantOptions = OperationOptions;

/**
 * Options to list the participants.
 */
export type GetParticipantsOptions = OperationOptions;

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
export type HangUpOptions = OperationOptions;

/**
 * Options to delete a call.
 */
export type DeleteOptions = OperationOptions;

/**
 * Options to cancel all media operations.
 */
export type CancelAllMediaOperationsOptions = OperationOptions;

/**
 * Options to keepAlive call.
 */
export type KeepAliveOptions = OperationOptions;

/**
 * Options to create audio group in a call.
 */
export type CreateAudioGroupOptions = OperationOptions;

/**
 * Options to delete audio group from a call.
 */
export type DeleteAudioGroupOptions = OperationOptions;

/**
 * Options to list audio groups in a call.
 */
export type GetAudioGroupsOptions = OperationOptions;

/**
 * Options to update audio group in a call.
 */
export type UpdateAudioGroupOptions = OperationOptions;

/**
 * Options to remove participant meeting audio in a call.
 */
export type RemoveFromDefaultAudioGroupOptions = OperationOptions;

/**
 * Options to add participant meeting audio in a call.
 */
export type AddToDefaultAudioGroupOptions = OperationOptions;

/**
 * Options to get call.
 */
export type GetCallOptions = OperationOptions;

/**
 * Options to start recording.
 */
export interface StartRecordingOptions extends OperationOptions {
  /** The content type of call recording. */
  recordingContentType?: RecordingContentType;

  /** The channel type of call recording. */
  recordingChannelType?: RecordingChannelType;

  /** The format type of call recording. */
  recordingFormatType?: RecordingFormatType;
}
/**
 * Options to pause recording.
 */
export type PauseRecordingOptions = OperationOptions;
/**
 * Options to resume recording.
 */
export type ResumeRecordingOptions = OperationOptions;
/**
 * Options to stop recording.
 */
export type StopRecordingOptions = OperationOptions;
/**
 * Options to get recording properties.
 */
export type GetRecordingPropertiesOptions = OperationOptions;
/**
 * Options to delete recording.
 */
export type DeleteRecordingOptions = OperationOptions;

/**
 * Call Locator.
 */
export type CallLocator = GroupCallLocator | ServerCallLocator;

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
export const isGroupCallLocator = (locator: CallLocator): locator is GroupCallLocator => {
  return typeof (locator as any).groupCallId === "string";
};

/**
 * Tests an locator to determine whether it implements ServerCallLocator.
 *
 * @param locator - The assumed ServerCallLocator to be tested.
 */
export const isServerCallLocator = (locator: CallLocator): locator is ServerCallLocator => {
  return typeof (locator as any).serverCallId === "string";
};

/**
 * The CallLocatorKind is a discriminated union that adds a property `kind` to an CallLocator.
 */
export type CallLocatorKind = GroupCallLocatorKind | ServerCallLocatorKind;

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
export const getLocatorKind = (locator: CallLocator): CallLocatorKind => {
  if (isGroupCallLocator(locator)) {
    return { ...locator, kind: "groupCall" };
  }
  if (isServerCallLocator(locator)) {
    return { ...locator, kind: "serverCall" };
  }
  throw "unknow CallLocator type.";
};

/** The options parameters for download api. */
export interface DownloadOptions extends OperationOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Call back to receive events on the progress of download operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional `FileClient.download()` request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   */
  maxRetryRequests?: number;

  /**
   * Optional.
   *
   * How much data to be downloaded, greater than 0. Will download to the end when undefined
   */
  count?: number;
}

/** The options parameters for downloadContent api. */
export interface DownloadContentOptions extends DownloadOptions {
  /** Return only the bytes of the blob in the specified range. */
  range?: string;
}

/** Values of {@link CallingServerEventType} that the service accepts. */
export enum CallingServerEventTypeValue {
  /** The call connection state change event type. */
  CallConnectionStateChangedEvent = "Microsoft.Communication.CallConnectionStateChanged",

  /** The add participant result event type. */
  AddParticipantResultEvent = "Microsoft.Communication.AddParticipantResult",

  /** The call recording state change event type. */
  CallRecordingStateChangedEvent = "Microsoft.Communication.CallRecordingStateChanged",

  /** The play audio result event type. */
  PlayAudioResultEvent = "Microsoft.Communication.PlayAudioResult",

  /** The participants updated event type. */
  ParticipantsUpdatedEvent = "Microsoft.Communication.ParticipantsUpdated",

  /** The subscribe to tone event type. */
  ToneReceivedEvent = "Microsoft.Communication.ToneReceived"
}

/**
 * Defines values for CallingServerEventType.
 * {@link CallingServerEventTypeValue} can be used interchangeably with CallingServerEventType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Microsoft.Communication.CallConnectionStateChanged**
 * **Microsoft.Communication.AddParticipantResult**
 * **Microsoft.Communication.CallRecordingStateChanged**
 * **Microsoft.Communication.PlayAudioResult**
 * **Microsoft.Communication.ParticipantsUpdated**
 * **Microsoft.Communication.ToneReceived**
 */
export type CallingServerEventType = string;
