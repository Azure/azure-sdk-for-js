// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions, TransferProgressEvent } from "@azure/core-http";
import { PhoneNumberIdentifier } from "@azure/communication-common";

export {
  PlayAudioResult,
  PlayAudioResultEvent,
  AddParticipantResult,
  ToneReceivedEvent,
  AddParticipantResultEvent,
  CallConnectionStateChangedEvent,
  ToneInfo,
  CallConnectionsAddParticipantResponse,
  CallConnectionsPlayAudioResponse,
  PhoneNumberIdentifierModel,
  CommunicationIdentifierModel,
  CommunicationUserIdentifierModel,
  KnownToneValue,
  KnownCallConnectionState,
  CallConnectionsCancelAllMediaOperationsResponse
} from "./generated/src/models";

/** Known values of {@link MediaType} that the service accepts. */
export enum MediaType {
  Audio = "audio",
  Video = "video"
}

/** Known values of {@link EventSubscriptionType} that the service accepts. */
export enum EventSubscriptionType {
  ParticipantsUpdated = "participantsUpdated",
  ToneReceived = "toneReceived"
}

/** Known values of {@link OperationStatus} that the service accepts. */
export enum KnownOperationStatus {
  NotStarted = "notStarted",
  Running = "running",
  Completed = "completed",
  Failed = "failed"
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

export type PlayAudioToParticipantOptions = PlayAudioOptions;

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
export type HangUpOptions = OperationOptions;

/**
 * Options to cancel all media operations.
 */
export type CancelAllMediaOperationsOptions = OperationOptions;

/**
 * Options to transfer call.
 */
export type TransferCallOptions = OperationOptions;

/**
 * Options to start recording.
 */
export type StartRecordingOptions = OperationOptions;
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

/** Defines values for CallingServerEventType. */
enum CallingServerEventType {
  /** The call connection state change event type. */
  CALL_CONNECTION_STATE_CHANGED_EVENT = "Microsoft.Communication.CallConnectionStateChanged",

  /** The add participant result event type. */
  ADD_PARTICIPANT_RESULT_EVENT = "Microsoft.Communication.AddParticipantResult",

  /** The call recording state change event type. */
  CALL_RECORDING_STATE_CHANGED_EVENT = "Microsoft.Communication.CallRecordingStateChanged",

  /** The play audio result event type. */
  PLAY_AUDIO_RESULT_EVENT = "Microsoft.Communication.PlayAudioResult",

  /** The participants updated event type. */
  PARTICIPANTS_UPDATED_EVENT = "Microsoft.Communication.ParticipantsUpdated",

  /** The subscribe to tone event type. */
  TONE_RECEIVED_EVENT = "Microsoft.Communication.DtmfReceived"
}

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
}

export interface DownloadContentOptions extends DownloadOptions {
  /** Return only the bytes of the blob in the specified range. */
  range?: string;
}

export class KnownCallingServerEventType {
  public static CALL_CONNECTION_STATE_CHANGED_EVENT:
    | string
    | null = KnownCallingServerEventType.fromString(
    "Microsoft.Communication.CallConnectionStateChanged"
  );
  public static ADD_PARTICIPANT_RESULT_EVENT:
    | string
    | null = KnownCallingServerEventType.fromString("Microsoft.Communication.AddParticipantResult");
  public static CALL_RECORDING_STATE_CHANGED_EVENT:
    | string
    | null = KnownCallingServerEventType.fromString(
    "Microsoft.Communication.CallRecordingStateChanged"
  );
  public static PLAY_AUDIO_RESULT_EVENT: string | null = KnownCallingServerEventType.fromString(
    "Microsoft.Communication.PlayAudioResult"
  );
  public static PARTICIPANTS_UPDATED_EVENT: string | null = KnownCallingServerEventType.fromString(
    "Microsoft.Communication.ParticipantsUpdated"
  );
  public static TONE_RECEIVED_EVENT: string | null = KnownCallingServerEventType.fromString(
    "Microsoft.Communication.DtmfReceived"
  );

  public static fromString(value: string): string | null {
    const allEvents = Object.values(CallingServerEventType);
    for (const entry of allEvents) {
      if (entry.toString().toUpperCase() === value.toUpperCase()) {
        return value;
      }
    }
    return null;
  }
}
