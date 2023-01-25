// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier, PhoneNumberIdentifier } from "@azure/communication-common";
import { CallConnectionStateModel } from "../generated/src";

export {
    CallRejectReason,
    KnownCallRejectReason,
    MediaStreamingConfiguration,
    MediaStreamingTransportType,
    MediaStreamingContentType,
    MediaStreamingAudioChannelType
} from "../generated/src/models/index";

export {
    CallConnectionStateModel
} from "../generated/src";

/** The caller. */
export interface CallSourceDto {
    /**
    * The source caller Id, a phone number, that's shown to the PSTN participant being invited.
    * Required only when calling a PSTN callee.
    */
    callerId?: PhoneNumberIdentifier;
    /** Display name of the call if dialing out to a pstn number */
    displayName?: string;
    /** The identifier of the source of the call */
    identifier: CommunicationIdentifier;
}

/** Properties of a call connection */
export interface CallConnectionPropertiesDto {
    /** The call connection id. */
    callConnectionId?: string;
    /** The server call id. */
    serverCallId?: string;
    /** The source of the call, which is the caller. */
    source?: CallSourceDto;
    /** The targets of the call. */
    targets?: CommunicationIdentifier[];
    /** The state of the call connection. */
    callConnectionState?: CallConnectionStateModel;
    /** The callback URI. */
    callbackUri?: string;
    /** SubscriptionId for media streaming */
    mediaSubscriptionId?: string;
}